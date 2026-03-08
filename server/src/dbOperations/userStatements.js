export const signupUserQuery = `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`;

export const loginUserQuery = `SELECT id,name,email,password FROM users WHERE email=?`;

export const getUserQuery = `SELECT id, name, email FROM users WHERE id=?`;
