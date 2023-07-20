
import { Request, Response } from 'express';

import * as fs from 'fs';
import { key_value_pair_path, sol_auction_house } from '../helpers/constants';

import {
    loadWalletKey
} from '../helpers/functions';

import log from 'loglevel';

import {
    Connection,
    clusterApiUrl,
    PublicKey, Keypair, LAMPORTS_PER_SOL
} from "@solana/web3.js";

import {
    mintNft
} from "../blockchain/actions/nft";

import { CandyMachineV2AddItemConstraintsViolatedError, keypairIdentity, Metaplex } from "@metaplex-foundation/js";

import {
    SuccessResponse,
    BadRequestResponse,
} from '../core/APIresponse';

import dotenv from 'dotenv';
dotenv.config();
export class Nft {

    public static async mintNft(req: Request, res: Response) {
        let cluster = clusterApiUrl('devnet');
        let connection = new Connection(cluster, 'confirmed');
        let walletKeyPair: Keypair = loadWalletKey(key_value_pair_path);
                let _nft = await mintNft(cluster,
                    connection,
                    walletKeyPair
                );
                if (_nft == undefined) {
                    return new BadRequestResponse('NFT has not been created due to some error.').send(res);
                } else {
                    return new SuccessResponse("NFT Addresses", _nft).send(res);
                }

        
    }
    
}