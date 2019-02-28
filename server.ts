import * as express from 'express';
import * as env from 'dotenv';

import middlewares from './src/middlewares';

const app = express();

env.config();

middlewares(app);

export default app;
