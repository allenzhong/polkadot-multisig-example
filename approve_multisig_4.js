import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import fs from "fs";
import { signAndSendWrapper } from "./wrapper.js";
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

  const AMOUNT_TO_SEND = process.env.AMOUNT_TO_SEND;
  const MAX_WEIGHT = process.env.MAX_WEIGHT;

  const call = api.tx.balances.transfer(to_address, AMOUNT_TO_SEND);
  console.log("call hash", call.hash.toHex());
  console.log("call method", call.method.toHex());

  const info3 = await api.query.multisig.multisigs(
    multisig_address,
    call.method.hash
  );
  const TIME_POINT3 = info3.unwrapOr(null).when;
  const otherSignatories3 = [
    account1.address,
    account2.address,
    account3.address,
  ];

  const nonce = await api.rpc.system.accountNextIndex(account4.address);

  const tx4 = await api.tx.multisig.approveAsMulti(
    4,
    otherSignatories3.sort(),
    TIME_POINT3,
    call.method.hash.toHex(),
    MAX_WEIGHT
  );

  const result = await signAndSendWrapper(tx4, nonce, account4);
  console.log("result ------------- \n", result);
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());
