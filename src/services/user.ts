import { Request, Response } from 'express';

export async function getIndex(req: Request,res: Response){
	res.render('user/index');
}