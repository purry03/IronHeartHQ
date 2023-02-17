import { Request, Response } from 'express';
import getUser from '../database/read';

export async function getIndex(req: Request,res: Response){
	const user = await getUser(req.user!.name);
	res.render('user/index',{user});
}