import { Transactions, User } from '../declarations';
import database from './index';

export async function getUserByName(name: string): Promise<User>{
	const text = 'SELECT * FROM users WHERE name = $1';
	const values = [name.toUpperCase()];
	const user = await (await database.query(text,values)).rows[0];
	return user;
}

export async function getAllUsers(): Promise<User[]>{
	const text = 'SELECT * FROM users ORDER BY id ASC';
	const users = await (await database.query(text)).rows;
	return users;
}

export async function getAllTransactions(): Promise<Transactions[]>{
	const text = 'SELECT transactions."createdAt", name, operation, amount FROM transactions INNER JOIN users ON transactions.user_id = users.id ORDER BY transactions."createdAt" DESC';
	const transactions = await (await database.query(text)).rows;
	return transactions;
}

export async function getAllTransactionsByName(username: string): Promise<Transactions[]>{
	const text = 'SELECT transactions."createdAt", name, operation, amount FROM transactions INNER JOIN users ON transactions.user_id = users.id WHERE name=$1 ORDER BY transactions."createdAt" DESC';
	const values = [username.toUpperCase()];
	const transactions = await (await database.query(text,values)).rows;
	return transactions;
}