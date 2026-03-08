export const getProductQuery = `SELECT id, stock FROM products WHERE id=?`;

export const checkExisitingCartQuery = `SELECT id, quantity FROM cart WHERE user_id=? AND product_id=?`;

export const updateExistingCartQuery = `UPDATE cart SET quantity=? WHERE id=?`;

export const addToCartQuery = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)`;

export const getCartQuery = `SELECT c.id,p.id as product_id,p.product,p.price,p.image,c.quantity,(p.price * c.quantity) AS total FROM cart c JOIN products p ON p.id = c.product_id WHERE c.user_id=?`;

export const updateCartQuery = `UPDATE cart SET quantity=? WHERE id=? AND user_id=?`;

export const checkCartIdQuery = `SELECT id,product_id FROM cart where id=?`;

export const deleteCartQuery = "DELETE FROM cart WHERE id=? AND user_id=?";
