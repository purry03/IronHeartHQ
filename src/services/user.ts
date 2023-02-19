import { Request, Response } from 'express';
import {getUserByName} from '../database/read';

export async function getIndex(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	res.render('user/index',{user});
}