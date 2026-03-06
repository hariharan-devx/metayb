export const createCategoryQuery = `INSERT INTO categories(category,created_by) VALUES (?,?)`;

export const listCategoryQuery = `SELECT id,category,created_by,created_at FROM categories`;

export const checkCategoryExistQuery = `SELECT id FROM categories WHERE id=?`;
