import fs from 'fs';
import { bundlrStorage, keypairIdentity, Metaplex, toMetaplexFile,BigNumber } from "@metaplex-foundation/js";
import path from 'path';
import { COLLECTION_NAME, RULE_SET, } from '../../helpers/constants';
import {
    Keypair,
    Connection,
    PublicKey,
} from '@solana/web3.js';
import {
    TokenStandard,
    verifyCollectionV1,
    createNft,
    findMetadataPda,
    mplTokenMetadata, burnV1,createProgrammableNft,transferV1
} from '@metaplex-foundation/mpl-token-metadata';
import { createUmi, } from '@metaplex-foundation/umi-bundle-defaults';
import {
    generateSigner,
    transactionBuilder,
    keypairIdentity as umiKeypairIdentity,
    publicKey,
    percentAmount,
    some,
} from '@metaplex-foundation/umi';
export const mintNft = async (
    cluster: any,
    connection: Connection,
    walletKeypair: Keypair,
  ): Promise<PublicKey> => {
    let nftAddress = '';
    const umi = createUmi('https://api.devnet.solana.com');
    
  
    const umiKeypair = umi.eddsa.createKeypairFromSecretKey(
      walletKeypair.secretKey
    );
    //console.log("umiKeypair",umiKeypair);
    umi.use(umiKeypairIdentity(umiKeypair)).use(mplTokenMetadata());
    const mint = generateSigner(umi);

    try {
  
      let creators = [];
  
      let ownerCreatedObj = {
        address: walletKeypair.publicKey,
        share: 100,
        verified: 1,
      };
      creators.push(ownerCreatedObj);
  
      const metadataAccount = findMetadataPda(umi, {
        mint: mint.publicKey,
      });
      const sellerFeeBasisPoints = 0;
      await transactionBuilder()
        .add(
          createProgrammableNft(umi, {
            mint: mint,
            sellerFeeBasisPoints: percentAmount(5),
            name: "test_name",
            symbol: "opt",
            uri: "https://arweave.net/yIgHNXiELgQqW8QIbFM9ibVV37jhvfyW3mFcZGRX-PA",
            isMutable: true,
            creators: some(creators),
            tokenOwner: publicKey(walletKeypair.publicKey.toBase58()),
            ruleSet: some(publicKey(RULE_SET)),
            isCollection:false
          })
        )
        .sendAndConfirm(umi);
  
      const mintAddress = new PublicKey(mint.publicKey.bytes).toBase58();
      return new PublicKey(mint.publicKey.bytes);
    } catch (err) {
      console.log(err);
    }
  };
  export const transferNft = async (
    cluster: any,
    connection: Connection,
    walletKeypair: Keypair,
  ): Promise<PublicKey> => {
    let nftAddress = '';
    const umi = createUmi('https://api.devnet.solana.com');
    
  
    const umiKeypair = umi.eddsa.createKeypairFromSecretKey(
      walletKeypair.secretKey
    );
    //console.log("umiKeypair",umiKeypair);
    umi.use(umiKeypairIdentity(umiKeypair)).use(mplTokenMetadata());
    const mint = generateSigner(umi);

    try {
  
      let creators = [];
  
      let ownerCreatedObj = {
        address: walletKeypair.publicKey,
        share: 100,
        verified: 1,
      };
      creators.push(ownerCreatedObj);
  
      const metadataAccount = findMetadataPda(umi, {
        mint: mint.publicKey,
      });
      const sellerFeeBasisPoints = 0;
      await transactionBuilder()
        .add(
          transferV1(umi,{mint:publicKey("mint address of owner"),destinationOwner:publicKey("destination wallet address"),tokenStandard:TokenStandard.ProgrammableNonFungible,amount:1})
        )
        .sendAndConfirm(umi);
  
      const mintAddress = new PublicKey(mint.publicKey.bytes).toBase58();
      return new PublicKey(mint.publicKey.bytes);
    } catch (err) {
      console.log(err);
    }
  };