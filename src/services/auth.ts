import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import getUser from '../database/read';
import addUser from '../database/write';

import { errorHandler } from '../routes/middlewares/error';

export async function getIndex(req: Request,res: Response){
	res.render('auth/index');
}

export async function getSignin(req: Request,res: Response){
	res.render('auth/signin');
}

export async function postSignin(req: Request,res: Response){
	try{
		const {name,password} = req.body;
		const user = await getUser(name);
		if(user === undefined){
			// user not found with this name
			res.sendStatus(403);
			return;
		}
		const isPasswordSame = await bcrypt.compare(password, user.password);
		if(isPasswordSame){
			const token = jwt.sign({
				sub: name,
				admin: false,
				roles: ['user']
			},
			config.JWTSECRET!
			);
			res.cookie('sessionToken',token);
			res.redirect('/');
			return;
		}
		else{
			res.sendStatus(403);
			return;
		}
	}
	catch(err){
		errorHandler(req,res,err);
	}
}


export async function getRegister(req: Request,res: Response){
	res.render('auth/register');
}

export async function postRegister(req: Request,res: Response){
	try{
		const {name,password} = req.body;
		const user = await getUser(name);
		if(user !== undefined){
			// user not found with this name
			res.sendStatus(403);
			return;
		}
		const hashedPassword = await bcrypt.hash(password,10);
		await addUser(name, hashedPassword);
		res.sendStatus(200);
	}
	catch(err){
		errorHandler(req,res,err);
	}
}