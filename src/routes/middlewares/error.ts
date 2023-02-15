import { Request, Response } from 'express';
import logger from '../../utils/logger';

export function errorHandler(req:Request, res: Response, error: any){
	logger.error(error);
	res.sendStatus(500);
}