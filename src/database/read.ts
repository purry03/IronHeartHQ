import { AccessCode, Payout, Transaction, User } from '../declarations';
import database from './index';

export async function getUserByName(name: string): Promise<User>{
	const text = 'SELECT * FROM users WHERE name = $1';
	const values = [name.toUpperCase()];
	const user = await (await database.query(text,values)).rows[0];
	return user;
}

export async function getUserByID(id: number|string): Promise<User>{
	const text = 'SELECT * FROM users WHERE id = $1';
	const values = [id];
	const user = await (await database.query(text,values)).rows[0];
	return user;
}

export async function getAllUsers(): Promise<User[]>{
	const text = 'SELECT * FROM users ORDER BY id ASC';
	const users = await (await database.query(text)).rows;
	return users;
}

export async function getAllTransactions(): Promise<Transaction[]>{
	const text = 'SELECT transactions."createdAt", name, operation, amount FROM transactions INNER JOIN users ON transactions.user_id = users.id ORDER BY transactions."createdAt" DESC';
	const transactions = await (await database.query(text)).rows;
	return transactions;
}

export async function getAllTransactionsByName(username: string): Promise<Transaction[]>{
	const text = 'SELECT transactions."createdAt", name, operation, amount FROM transactions INNER JOIN users ON transactions.user_id = users.id WHERE name=$1 ORDER BY transactions."createdAt" DESC';
	const values = [username.toUpperCase()];
	const transactions = (await database.query(text,values)).rows;
	return transactions;
}

export async function getAllPayouts(): Promise<Payout[]>{
	const text = 'SELECT payouts.id, payouts."createdAt", name, amount, balance FROM payouts INNER JOIN users ON payouts.user_id = users.id ORDER BY payouts."createdAt" DESC';
	const payouts = await (await database.query(text)).rows;
	return payouts;
}

export async function getAllPayoutsByName(username: string): Promise<Payout[]>{
	const text = 'SELECT payouts."createdAt", name, amount, balance FROM payouts INNER JOIN users ON payouts.user_id = users.id WHERE name=$1 ORDER BY payouts."createdAt" DESC';
	const values = [username.toUpperCase()];
	const payouts = await (await database.query(text,values)).rows;
	return payouts;
}


export async function getPayoutByID(id: number): Promise<Payout>{
	const text = 'SELECT * FROM payouts WHERE id = $1';
	const values = [id];
	const payout = (await database.query(text, values)).rows[0];
	return payout;
}

export async function getAllAccessCodes(): Promise<AccessCode[]>{
	const text = 'SELECT * FROM accesscodes ORDER BY id ASC';
	const accessCodes = await (await database.query(text)).rows;
	return accessCodes;
}

export async function getAccessCodeByName(name: string): Promise<AccessCode>{
	const text = 'SELECT * FROM accesscodes WHERE user_name = $1';
	const values = [name.toUpperCase()];
	const accessCode = await (await database.query(text,values)).rows[0];
	return accessCode;
}