import { PublicKey, clusterApiUrl } from '@solana/web3.js';
export const key_value_pair_path = "./src/wallets/devnet.json";
export const bundler_url="https://devnet.bundlr.network";
export const cluster_net="devnet";

export const COLLECTION_NAME='collection.png';
export const EXCLUDE_TRAIT_PATH="./src/excluded_traits.json";
export const TRAITS_DIRECTORY = './src/traits';
export const mint_wallet_min_balance=0.5;
export const sol_base_points=1000000000;
export const front_end_wallet_payer='sEfJZUTdBNALuqcQ3mN4VT4U8PDw2ufMt6p2ZPqrGKoFXaLthYeqTB94vzhMw5thUop8tCkUdstV6ksqhJ6xeHi';
export const RULE_SET="AdH2Utn6Fus15ZhtenW4hZBQnvtLgM1YCW2MfVp7pYS5";
//export const COLLECTION_MINT_ADDRESS="98A8pKsuskpH9ScfrWfxfNhpaF64QuEhmr8fqZCPN7yQ";
export const COLLECTION_MINT_ADDRESS="35RRi1WaYsEG98yqBnVHpw5ruJZpmMcShYYrDSqC2gXK";
//export const sol_auction_house="FGzzkwtbh5sqEbqee7xrrCNr1anTVLB2vQciyYbWU46M";
export const sol_auction_house="2j1meFWTUcSmXbzSPTUUbWY2ahoaKwcCkWZtbYEmB5r5";
export const custom_mint_auction_house="7bWRUtT1HDpRhS2SgeigKuKSLzpqLqd28KgB4h5WnaZx";
export const custom_mint_address="7AhCcwCSuqXNGqeHLPzXBjSbgrUxztDToMZVrXLJHkFA";
type Cluster = {
    name: string;
    url: string;
  };
  export const CLUSTERS: Cluster[] = [
    {
      name: 'mainnet-beta',
      url: 'https://api.metaplex.solana.com/',
    },
    {
      name: 'testnet',
      url: clusterApiUrl('testnet'),
    },
    {
      name: 'devnet',
      url: clusterApiUrl('devnet'),
    },
  ];
  export const DEFAULT_CLUSTER = CLUSTERS[2];
  