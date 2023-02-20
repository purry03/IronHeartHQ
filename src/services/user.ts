import { Request, Response } from 'express';
import {getAllTransactionsByName, getUserByName} from '../database/read';
import { timeSince } from '../utils/date';

export async function getIndex(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	res.render('user/index',{user});
}

export async function getWalletHistory(req: Request,res: Response){
	const transactions = await getAllTransactionsByName(req.user!.name);
	transactions.forEach(transaction => {
		const day = new Date(transaction.createdAt);
		const interval = timeSince(day);
		transaction['timeAgo'] = `${interval} ago`;
	});
	res.render('user/wallet-history',{user:req.user, transactions});
}