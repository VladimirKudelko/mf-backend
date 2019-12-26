import * as express from 'express';
import * as env from 'dotenv';

import './src/passport';
import middlewares from './src/middlewares';
import timers from './src/timers';

const app = express();

env.config();
middlewares(app);
timers();

export default app;
