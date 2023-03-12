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

export async function updateUserAdmin(name: string,admin: boolean){
	const text = 'UPDATE users SET admin = $1 WHERE name = $2';
	const values = [admin, name.toUpperCase()];
	await database.query(text,values);
	return;
}

export async function removeUser(name: string){
	const text = 'DELETE FROM users WHERE name = $1';
	const values = [name.toUpperCase()];
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

export async function deletePayoutRequest(id: number){
	const text = 'DELETE FROM payouts WHERE id = $1';
	const values = [id];
	await database.query(text,values);
	return;
}

export async function addAccessCode(name: string,accessCode: string){
	const text = 'INSERT INTO accesscodes(user_name, code) VALUES($1, $2)';
	const values = [name.toUpperCase(), accessCode];
	await database.query(text,values);
	return;
}

export async function updateAccessCodeConsumed(name: string,consumed: boolean){
	const text = 'UPDATE accesscodes SET consumed = $1 WHERE user_name = $2';
	const values = [consumed, name.toUpperCase()];
	await database.query(text,values);
	return;
}