import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
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
  const MAX_WEIGHT = process.env.MAX_WEIGHT;

  const call = api.tx.balances.transfer(to_address, AMOUNT_TO_SEND);
  console.log("call hash", call.hash.toHex());
  console.log("call method", call.method.toHex());

  const info3 = await api.query.multisig.multisigs(
    multisig_addres,
    call.method.hash
  );
  const TIME_POINT3 = info3.unwrapOr(null).when;
  const otherSignatories3 = [
    account1.address,
    account2.address,
  ];
  const tx3 = await api.tx.multisig
    .asMulti(
      3,
      otherSignatories3,
      TIME_POINT3,
      call.method.toHex(),
      false,
      MAX_WEIGHT
    )
    .signAndSend(account3);
  console.log("Account3 Final tx hash", tx3.toHex());
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit());
