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
  const AMOUNT_TO_SEND = process.env.AMOUNT_TO_SEND;
  const MAX_WEIGHT = process.env.MAX_WEIGHT;

  const call = api.tx.balances.transfer(to_address, AMOUNT_TO_SEND);
  // api.tx.utility.batch()
  console.log("call hash", call.hash.toHex());
  console.log("call method", call.method.toHex());
  const info = await api.query.multisig.multisigs(
    multisig_address,
    call.method.hash
  );

  console.log("Multisig tx hash", info.createdAtHash.toHex());

  const TIME_POINT1 = null;
  console.log(`account1 ${account1.address}`);
  const otherSignatories1 = [
    account2.address,
    account3.address,
    account4.address,
  ];
  console.log("otherSignatories1", otherSignatories1);
  const nonce = await api.rpc.system.accountNextIndex(account1.address);
  const tx1 = api.tx.multisig
    .approveAsMulti(
      4,
      otherSignatories1.sort(),
      TIME_POINT1,
      call.method.hash.toHex(),
      MAX_WEIGHT
  );

  await signAndSendWrapper(tx1, nonce, account1);
    // .signAndSend(account1, { nonce });
  
  console.log("Account1 tx hash", tx1.toHex());
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());
