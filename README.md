### Polkadot MultiSig Example

In this example, you have to set up a multisig account which consist of a 3-of-3 threshold and three accounts.

Config all ENVs in .env file and init a multisig transaction with `init-multisig.js`.

Then you can approve the transaction by the any other accounts.

At last, the final approve from `final_multisig` must be called to finalise the call. 

**Important: In any step, the signatories order that pass to approveAsMultisig or asMultisig must match the order you defined in multisig account**