import express from 'express';
import * as auth from '../../services/auth';
import * as user from '../../services/user';
import * as admin from '../../services/admin';
import { requireAdminAuth, requireUserAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/501',(req,res)=>{
	user.get501(req,res);
});

router.get('/auth',(req,res)=>{
	auth.getIndex(req,res);
});

router.get('/auth/signin',(req,res)=>{
	auth.getSignin(req,res);
});

router.post('/auth/signin',(req,res)=>{
	auth.postSignin(req,res);
});

router.get('/auth/register',(req,res)=>{
	auth.getRegister(req,res);
});

router.post('/auth/register',(req,res)=>{
	auth.postRegister(req,res);
});

router.get('/', requireUserAuth ,(req,res)=> {
	user.getIndex(req,res);
});

router.get('/wallet/history', requireUserAuth ,(req,res)=> {
	user.getWalletHistory(req,res);
});

router.post('/wallet/payout/request', requireUserAuth ,(req,res)=> {
	user.postPayoutRequest(req,res);
});

router.get('/admin', requireAdminAuth, (req,res)=>{
	admin.getIndex(req,res);
});

router.get('/admin/transaction', requireAdminAuth, (req,res)=>{
	admin.getTransaction(req,res);
});

router.post('/admin/transaction', requireAdminAuth, (req,res)=>{
	admin.postTransaction(req,res);
});

router.get('/admin/payouts', requireAdminAuth, (req,res)=>{
	admin.getPayouts(req,res);
});

router.get('/admin/payout/:id/:action', requireAdminAuth, (req,res)=>{
	admin.getPayoutAction(req,res);
});

router.get('/admin/users', requireAdminAuth, (req,res)=>{
	admin.getUsers(req,res);
});

router.get('/admin/user/:id/toggleAdmin', requireAdminAuth, (req,res)=>{
	admin.getToggleAdmin(req,res);
});

router.get('/admin/user/:id/remove', requireAdminAuth, (req,res)=>{
	admin.getRemove(req,res);
});

router.get('/admin/accessCodes', requireAdminAuth, (req,res)=>{
	admin.getAccessCodes(req,res);
});

router.post('/admin/accessCodes', requireAdminAuth, (req,res)=>{
	admin.postAccessCodes(req,res);
});

export default router;
