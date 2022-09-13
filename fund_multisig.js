import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const wsProvider = new WsProvider("ws://127.0.0.1:9944");
  const api = await ApiPromise.create({ provider: wsProvider });

  const saved_multisig = fs.readFileSync("multisig_address", "utf8");
  console.log(`\nSaved Multisig Address: ${saved_multisig}`);

  const fund_account_phrase = process.env.FUND_ACCOUNT_MNEMONIC;

  const fund_account = new Keyring({ type: "sr25519" }).addFromUri(fund_account_phrase);

  const fund_to_send = process.env.FUND_TO_SEND;


  const call = await api.tx.balances
    .transfer(saved_multisig, fund_to_send)
    .signAndSend(fund_account);
  
  console.log(`\nTransaction hash: ${call}`);
}


main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());