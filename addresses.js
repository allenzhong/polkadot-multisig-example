import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const wsProvider = new WsProvider("ws://127.0.0.1:9944");
  const api = await ApiPromise.create({ provider: wsProvider });
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
  ];

  console.log(signatories.sort());

  const orders = [
    account3.address,
    account4.address,
    account1.address,
    account2.address,
  ];
  console.log(orders);
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());
