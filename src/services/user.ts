import { Request, Response } from 'express';
import {getAllPayouts, getAllPayoutsByName, getAllTransactionsByName, getUserByName} from '../database/read';
import { addPayoutRequest } from '../database/write';
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

export async function postPayoutRequest(req: Request,res: Response){
	const {amount} = req.body;
	const user = await getUserByName(req.user!.name);
	if(parseInt(user.balance) < parseInt(amount)){
		res.status(400).send('payout request amount exceeds available balance');
		return;
	}
	// get all pending payout requests for the user
	const pendingPayoutRequests = await getAllPayoutsByName(req.user!.name);
	// sum of all pending requests + this request must not exceed balance
	let sumOfRequests = parseInt(amount) ;
	for(const payoutRequest of pendingPayoutRequests){
		sumOfRequests += parseInt(payoutRequest.amount);
	}
	if(sumOfRequests > parseInt(user.balance)){
		res.status(400).send('pending payout request amount exceeds available balance');
		return;
	}
	await addPayoutRequest(user.id, amount);
	res.sendStatus(200);
}