import { Request, Response } from 'express';
import {getUserByName,getAllUsers, getAllTransactions, getAllPayouts, getPayoutByID, getUserByID, getAllAccessCodes} from '../database/read';
import { addAccessCode, addTransaction, deletePayoutRequest, removeUser, updateUserAdmin, updateUserBalance } from '../database/write';
import { timeSince } from '../utils/date';
import uid from 'uid-safe';


export async function getIndex(req: Request,res: Response){
	res.render('admin/index',{user:req.user});
}

export async function getTransaction(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const allUsers = await getAllUsers();
	const allTransactions = await getAllTransactions();
	allTransactions.forEach(transaction => {
		const day = new Date(transaction.createdAt);
		const interval = timeSince(day);
		transaction['timeAgo'] = `${interval} ago`;
	});
	res.render('admin/transaction',{user,allUsers,allTransactions});
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
	res.redirect('/admin/transaction');
}

export async function getPayouts(req: Request,res: Response){
	const allPayouts = await getAllPayouts();
	allPayouts.forEach(payout => {
		const day = new Date(payout.createdAt);
		const interval = timeSince(day);
		payout['timeAgo'] = `${interval} ago`;
	});
	res.render('admin/payouts',{user: req.user, allPayouts});
}

export async function getPayoutAction(req: Request,res: Response){
	const {id,action} = req.params;
	if (action === 'accept'){
		const payoutDetails= await getPayoutByID(parseInt(id));
		const userDetails = await getUserByID(payoutDetails.user_id);
		const newUserBalance = parseInt(userDetails.balance) - parseInt(payoutDetails.amount);
		await updateUserBalance(req.user!.name, newUserBalance);
		await deletePayoutRequest(parseInt(id));
	}
	else if (action === 'reject'){ 
		await deletePayoutRequest(parseInt(id));
	}
	else{
		throw new Error('unknown payout action type');
	}
	res.redirect('/admin/payouts');
}

export async function getUsers(req: Request,res: Response){
	const allUsers = await getAllUsers();
	res.render('admin/users',{user: req.user, allUsers});
}

export async function getToggleAdmin(req: Request,res: Response){
	const {id} = req.params;
	const user = await getUserByID(id);
	await updateUserAdmin(user.name, !user.admin);
	res.redirect('/admin/users');
}

export async function getRemove(req: Request,res: Response){
	const {id} = req.params;
	const user = await getUserByID(id);
	await removeUser(user.name);
	res.redirect('/admin/users');
}

export async function getAccessCodes(req: Request,res: Response){
	const allAccessCodes = await getAllAccessCodes();
	res.render('admin/accessCodes',{user: req.user, allAccessCodes});
}

export async function postAccessCodes(req: Request,res: Response){
	const {name} = req.body;
	const accessCode = uid.sync(8);
	await addAccessCode(name,accessCode);
	res.redirect('/admin/accessCodes');
}