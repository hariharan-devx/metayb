import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import CustomError from "../utils/CustomError.js";
import stripe from "../config/stripe.js";
import {
  addOrderItemsQuery,
  addOrdersQuery,
  getCartItemsQuery,
  getMyOrdersQuery,
} from "../dbOperations/orderStatements.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  const { shipping_address } = req.body;
  const user_id = req.user.id;

  const [cartItems] = await db.query(getCartItemsQuery, [user_id]);

  if (cartItems.length === 0) {
    return next(new CustomError(404, "Cart is empty"));
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.total), 0);

  if (totalAmount < 50) {
    return next(new CustomError(400, "Minimum order amount is ₹50"));
  }

  const [orderResult] = await db.query(addOrdersQuery, [user_id, totalAmount, "stripe", "PENDING", shipping_address]);
  const order_id = orderResult.insertId;

  for (let item of cartItems) {
    await db.query(addOrderItemsQuery, [order_id, item.product_id, item.quantity, item.price]);
  }

  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.product,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/order-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: {
      order_id: order_id,
      user_id: user_id,
    },
  });

  res.status(200).json({
    status: "success",
    checkout_url: session.url,
  });
});

export const getMyOrders = asyncHandler(async (req, res, next) => {
  const user_id = req.user.id;

  const [ordersResult] = await db.query(getMyOrdersQuery, [user_id]);

  const orders = [];
  const orderMap = {};

  for (let row of ordersResult) {
    if (!orderMap[row.order_id]) {
      orderMap[row.order_id] = {
        id: row.order_id,
        total_amount: row.total_amount,
        payment_status: row.payment_status,
        created_at: row.created_at,
        items: [],
      };
      orders.push(orderMap[row.order_id]);
    }
    orderMap[row.order_id].items.push({
      id: row.order_item_id,
      product: row.product,
      image: row.image,
      quantity: row.quantity,
      price: row.price,
    });
  }

  res.status(200).json({
    status: "success",
    data: orders,
  });
});
