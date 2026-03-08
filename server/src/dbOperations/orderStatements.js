export const getCartItemsQuery = `SELECT  cart.id, cart.product_id, products.product, products.price, cart.quantity, (products.price * cart.quantity) AS total FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?`;

export const addOrdersQuery = `INSERT INTO orders(user_id,total_amount,payment_method,payment_status,shipping_address) VALUES (?,?,?,?,?)`;

export const addOrderItemsQuery = `INSERT INTO order_items(order_id,product_id,quantity,price) VALUES (?,?,?,?)`;

export const updateOrdersQuery = `UPDATE orders SET payment_status = 'PAID' WHERE id = ?`;

export const deleteCartItemsQuery = `DELETE FROM cart WHERE user_id = ?`;

export const getMyOrdersQuery = `SELECT  o.id AS order_id, o.total_amount, o.payment_status, o.created_at, oi.id AS order_item_id, p.product, p.image, oi.quantity, oi.price FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.user_id = ? ORDER BY o.created_at DESC`;
