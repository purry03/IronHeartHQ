import jwt from 'jsonwebtoken';
import config from '../../config';

import { NextFunction, Request, Response } from 'express';

export async function authExtract(req: Request, res: Response, next: NextFunction) {
	const sessionToken = req.cookies.sessionToken;
	if(sessionToken === undefined){
		// no session cookie found
		req.user = null;
	}
	else{
		const token = await jwt.verify(sessionToken,config.JWTSECRET!) as {sub:string,admin:boolean,roles: string[]};
		req.user = {
			name: token.sub,
			admin: token.admin,
			roles: token.roles
		};
	}	
	next();
}

export async function requireUserAuth(req: Request, res: Response, next: NextFunction) {
	if(req.user != null){
		if(req.user.roles.includes('user')){
			next();
		}
		else{
			res.redirect('/auth/signin');
		}
	}
	else{
		// redirect to login page
		res.redirect('/auth/signin');
	}
}