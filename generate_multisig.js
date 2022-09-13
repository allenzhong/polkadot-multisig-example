import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { sortAddresses, encodeMultiAddress } from '@polkadot/util-crypto';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


async function main() {
  const SS58Prefix = 0;
  const INDEX = 0;
  const THRESHOLD = 3;

  
  const account1_phrase = process.env.ACCOUNT1_MNEMONIC;

  const account1 = new Keyring({ type: "sr25519" }).addFromUri(account1_phrase);

  const account2_phrase = process.env.ACCOUNT2_MNEMONIC;
  ("leaf spin notable skill antique range trash until target plunge field basket");

  const account2 = new Keyring({ type: "sr25519" }).addFromUri(account2_phrase);

  const account3_phrase = process.env.ACCOUNT3_MNEMONIC;

  const account3 = new Keyring({ type: "sr25519" }).addFromUri(account3_phrase);

  const signatories = [account1.address, account2.address, account3.address];


  const multisig = encodeMultiAddress(signatories, THRESHOLD);

  console.log(`\nMultisig Address: ${multisig}`);

  fs.writeFileSync("multisig_address", multisig);

  const saved_multisig = fs.readFileSync("multisig_address", "utf8");
  console.log(`\nSaved Multisig Address: ${saved_multisig}`);
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());
