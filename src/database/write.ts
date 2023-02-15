import database from './index';

export default async function addUser(name: string,password: string){
	const text = 'INSERT INTO users(name,password) VALUES($1, $2)';
	const values = [name.toUpperCase(), password];
	await database.query(text,values);
	return;
}