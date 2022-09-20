import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { signAndSendWrapper } from "./wrapper.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const to_address = process.env.TO_ADDRESS;

  const wsProvider = new WsProvider("ws://127.0.0.1:9944");
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
  ("leaf spin notable skill antique range trash until target plunge field basket");

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
  console.log("call hash", call.hash.toHex());
  console.log("call method", call.method.toHex());

  const info2 = await api.query.multisig.multisigs(
    multisig_address,
    call.method.hash
  );
  const TIME_POINT2 = info2.unwrap().when;
  console.log("TIME_POINT2", TIME_POINT2);
  const otherSignatories2 = [
    account1.address,
    account3.address,
    account4.address,
  ];
  const nonce = await api.rpc.system.accountNextIndex(account2.address);
  const tx2 = api.tx.multisig.approveAsMulti(
    4,
    otherSignatories2.sort(),
    TIME_POINT2,
    call.method.hash.toHex(),
    MAX_WEIGHT
  );
  const result = await signAndSendWrapper(tx2, nonce, account2);
  console.log("result ------------- \n", result);
  console.log("Account2 tx hash", tx2.toHex());
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());
