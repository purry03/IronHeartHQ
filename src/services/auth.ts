import { Request, Response } from 'express';

export async function getIndex(req: Request,res: Response){
	res.render('auth/index');
}

export async function getSignin(req: Request,res: Response){
	res.render('auth/signin');
}

export async function getRegister(req: Request,res: Response){
	res.render('auth/register');
}

export async function postRegister(req: Request,res: Response){
	console.log(req.body);
	res.sendStatus(200);
}