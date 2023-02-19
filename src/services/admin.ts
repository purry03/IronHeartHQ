import { Request, Response } from 'express';
import {getUserByName,getAllUsers, getAllTransactions} from '../database/read';
import { addTransaction, updateUserBalance } from '../database/write';

export async function getIndex(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const allUsers = await getAllUsers();
	const allTransactions = await getAllTransactions();
	res.render('admin/index',{user,allUsers,allTransactions});
}

export async function postTransaction(req: Request,res: Response){
	const {amount,operation,username} = req.body;
	const intAmount = parseInt(amount.replace(/,/g, ''));	// required because incoming amount is a string with commas
	const user = await getUserByName(username);
	let newBalance = parseInt(user.balance);
	if(operation === 'credit'){
		newBalance += intAmount;
	}
	else{
		newBalance -= intAmount;
	}
	await updateUserBalance(username,newBalance);
	await addTransaction(user.id,operation,intAmount);
	res.redirect('/admin');
}