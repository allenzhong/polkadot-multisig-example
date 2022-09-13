import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { stringToU8a, u8aToHex } from "@polkadot/util";
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

  const multisig_addres = process.env.MULTISIG_ADDRESS;
  const account1_phrase = process.env.ACCOUNT1_MNEMONIC;

  const account1 = new Keyring({ type: "sr25519" }).addFromUri(account1_phrase);

  const account2_phrase = process.env.ACCOUNT2_MNEMONIC;
  ("leaf spin notable skill antique range trash until target plunge field basket");

  const account2 = new Keyring({ type: "sr25519" }).addFromUri(account2_phrase);

  const account3_phrase = process.env.ACCOUNT3_MNEMONIC;

  const account3 = new Keyring({ type: "sr25519" }).addFromUri(account3_phrase);

  const AMOUNT_TO_SEND = process.env.AMOUNT_TO_SEND;
  const MAX_WEIGHT = 640000000;

  const call = api.tx.balances.transfer(to_address, AMOUNT_TO_SEND);
  console.log("call hash", call.hash.toHex());
  console.log("call method", call.method.toHex());

  const info2 = await api.query.multisig.multisigs(
    multisig_addres,
    call.method.hash
  );
  const TIME_POINT2 = info2.unwrap().when;
  console.log("TIME_POINT2", TIME_POINT2);
  const otherSignatories2 = [account1.address, account3.address];
  const tx2 = await api.tx.multisig
    .approveAsMulti(
      3,
      otherSignatories2,
      TIME_POINT2,
      call.method.hash,
      MAX_WEIGHT
    )
    .signAndSend(account2);
  console.log("Account2 tx hash", tx2.toHex());
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());