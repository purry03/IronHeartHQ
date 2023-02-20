import express from 'express';
import helmet from 'helmet';
import minify from 'express-minify';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { authExtract } from './routes/middlewares/auth';

import { Server, Socket } from 'socket.io';
import { Tail } from 'tail';

import path from 'path';
import { exec } from 'child_process';


import config from './config';
import logger from './utils/logger';
import router from './routes/';
import { notFoundHandler } from './routes/middlewares/error';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http').Server(app);

// Basic Configuration
app.set('view engine', 'ejs');  // set default view engine to ejs
app.set('views', path.join(__dirname,'..', '/views'));   // set views directory

// Basic Middlewares
helmet({
	contentSecurityPolicy: false,
});  // obscure headers for security
app.use(minify());
app.use('/static', express.static(path.join(__dirname,'..','/public'))); // set static directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authExtract);
app.use(router.v0); // use v0 routes

// Since this is the last non-error-handling
// middleware used, we assume 404, as nothing else
// responded.

app.use(notFoundHandler);

http.listen(config.PORT || 80,()=>{
	logger.info(`server online on port ${config.PORT}`);
});


const io = new Server(http, {});
const logFile = path.join(__dirname,'..','application.log')
const tail = new Tail(logFile);
let socket: Socket|null = null;

// for livestreaming server logs
io.on('connection', (sk) => {
	socket = sk;
	exec(`tail -n 50 ${logFile}`,  (error, stdout) => {
		sk.emit('log', stdout);
	});
});

tail.on('line', function(data) {
	if(socket !== null){
		socket.emit('log', data);
	}
});	  

io.listen(3001);

process
	.on('unhandledRejection', (reason, p) => {
		logger.error(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', err => {
		logger.error(err, 'Uncaught Exception thrown');
	});