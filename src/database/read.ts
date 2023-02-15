import { User } from '../declarations/types';
import database from './index';

export default async function getUser(name: string): Promise<User>{
	const text = 'SELECT * FROM users WHERE name = $1';
	const values = [name.toUpperCase()];
	const user = await (await database.query(text,values)).rows[0];
	return user;
}