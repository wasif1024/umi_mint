import { Router } from 'express';

import Blockchain from './routes/Blockchain';
export default () => {
    const app = Router();

    Blockchain(app);

    return app;
};