import express from 'express';
import helmet from 'helmet';
import minify from 'express-minify';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { authExtract } from './routes/middlewares/auth';


import path from 'node:path';

import config from './config';
import logger from './utils/logger';
import router from './routes/';

const app = express();

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

app.listen(config.PORT || 80,()=>{
	logger.info(`server online on port ${config.PORT}`);
});
