import Stripe from "stripe";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import { deleteCartItemsQuery, updateOrdersQuery } from "../dbOperations/orderStatements.js";

export const stripeWebhook = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const order_id = session.metadata.order_id;

    await db.query(updateOrdersQuery, [order_id]);
    await db.query(deleteCartItemsQuery, [session.metadata.user_id]);

    console.log("Order updated:", order_id);
  }

  res.json({ received: true });
});
