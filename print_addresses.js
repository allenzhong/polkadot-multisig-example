import { ApiPromise, WsProvider, HttpProvider, Keyring } from "@polkadot/api";
import { signAndSendWrapper } from "./wrapper.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const to_address = process.env.TO_ADDRESS;
  const wsProvider = new WsProvider("ws://127.0.0.1:9944");
  // const httpProvider = new HttpProvider("http://127.0.0.1:9933");
  const api = await ApiPromise.create({ provider: wsProvider });

  const depositBase = api.consts.multisig.depositBase;
  const depositFactor = api.consts.multisig.depositFactor;
  console.log(`depositBase   : ${depositBase}`);
  console.log(`depositFactor : ${depositFactor}`);

  const multisig_address = fs.readFileSync("multisig_address", "utf8");
  console.log("multisig_addres", multisig_address);

  const account1_phrase = process.env.ACCOUNT1_MNEMONIC;

  const account1 = new Keyring({ type: "sr25519" }).addFromUri(account1_phrase);

  const account2_phrase = process.env.ACCOUNT2_MNEMONIC;

  const account2 = new Keyring({ type: "sr25519" }).addFromUri(account2_phrase);

  const account3_phrase = process.env.ACCOUNT3_MNEMONIC;

  const account3 = new Keyring({ type: "sr25519" }).addFromUri(account3_phrase);

  const account4_phrase = process.env.ACCOUNT4_MNEMONIC;

  const account4 = new Keyring({ type: "sr25519" }).addFromUri(account4_phrase);

  const account5_phrase = process.env.ACCOUNT5_MNEMONIC;

  const account5 = new Keyring({ type: "sr25519" }).addFromUri(account5_phrase);
 
  const signatories = [
    account1.address,
    account2.address,
    account3.address,
    account4.address,
    account5.address,
  ];

  console.log("signatories", signatories);
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());
