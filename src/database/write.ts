import database from './index';

export async function addUser(name: string,password: string){
	const text = 'INSERT INTO users(name,password) VALUES($1, $2)';
	const values = [name.toUpperCase(), password];
	await database.query(text,values);
	return;
}

export async function updateUserBalance(name: string,balance: number){
	const text = 'UPDATE users SET balance = $1 WHERE name = $2';
	const values = [balance, name.toUpperCase()];
	await database.query(text,values);
	return;
}

export async function addTransaction(userId: number, operation: string, amount: number){
	const text = 'INSERT INTO transactions(user_id,operation,amount) VALUES($1,$2,$3)';
	const values = [userId,operation,amount];
	await database.query(text,values);
	return;
}

export async function addPayoutRequest(userId: number, amount: number){
	const text = 'INSERT INTO payouts(user_id,amount) VALUES($1,$2)';
	const values = [userId,amount];
	await database.query(text,values);
	return;
}