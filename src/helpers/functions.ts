import fs from 'fs';
import path from 'path';
const { readdir, writeFile } = fs.promises;
const bs58 = require('bs58');
import {
  front_end_wallet_payer
} from './constants';
import {
  Connection,
  clusterApiUrl,

  PublicKey, Keypair
} from "@solana/web3.js";
export function excludePng(item: string):string{
    if(item!=undefined&&item!=""){
      //debugger;
      return item.substring(0, item.length - 4);
    }
    else{
      return "";
    }
  }
  export function formateHead(item: string): string {
    //debugger;
    let returnedItem = "";
    if (item != undefined && item != "") {
      if (item.includes("Dark")) {
        returnedItem = item.replace("Dark", "");
        //debugger;
      } else if (item.includes("Light")) {
        returnedItem = item.replace("Light", "");
      } else if (item.includes("Tan")) {
        returnedItem = item.replace("Tan", "");
      }
    }
    //debugger;

    return returnedItem.trim();
  }
export async function readDirectoryTraits(path: string): Promise<string[]> {

    //const attributes = await readdir("./src/traits/" + typeOfTrait + "/" + trait);
    let traits = await readdir(path);
    //console.log(traits);
    return traits;
}
export async function filterShoes(selectedBottom: string, srchCategory: string,bannedShoesList:any,shoeOriginal:any): Promise<string[]> {
  let filteredShoes: any[] = [];
  if (srchCategory == "Female") {
    
    //debugger;
    shoeOriginal.forEach(element => {
      
        if (!bannedShoesList[selectedBottom].includes(element)) {
          filteredShoes.push(element);
        }
    
      
    });
  
    //debugger;
  } else {
    
    filteredShoes = shoeOriginal;
  }
  return filteredShoes;
}
export async function filterHair(selectedHead: string, srchCategory: string,bannedHairsList:any[],hairOriginalArr:any[]): Promise<string[]> {
  let filteredHairs: any[] = [];
  if (srchCategory == "Female") {
    
    hairOriginalArr.forEach(element => {
      if (!bannedHairsList[selectedHead].includes(element)) {
        filteredHairs.push(element);
      }
    });
    
  } else {
    
    
    filteredHairs = hairOriginalArr;
  }
  return filteredHairs;
}

export async function getRandomIntInclusive(min:any, max:any) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
export function loadWalletKey(keypair: any): Keypair {
  if (!keypair || keypair == '') {
    throw new Error('Keypair is required!');
  }
  const loaded = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(keypair).toString())),
  );
  
  return loaded;
}

