export const createProductQuery = `INSERT INTO products(category_id, product, description, price, image, stock, created_by) VALUES (?,?,?,?,?,?,?)`;

export const listProductQuery = `SELECT category_id, product, description, price, image, stock FROM products`;

export const listProductByIdQuery = `SELECT category_id, product, description, price, image, stock FROM products WHERE id=?`;

export const listProductByCategoryQuery = `SELECT p.product, p.description, p.price, p.image, p.stock FROM products p INNER JOIN categories c ON p.category_id=c.id WHERE c.id=?`;
