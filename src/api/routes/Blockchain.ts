import { Router } from 'express';

import { Nft } from '../../controller/Nft';

const route = Router();

export default (app: Router) => {
    app.use('', route);

    route.post('/mintNft', (req, res, next) => {

        Nft.mintNft(req, res);

    });
    
};