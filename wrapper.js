export function signAndSendWrapper(tx, nonce, sender) {
  return new Promise((resolve, reject) => {
    tx.signAndSend(sender, { nonce }, (result) => {
      console.log('In callback')
      if (result?.dispatchError) {
        console.log('In dispatchError', result.dispatchError)
        reject(result);
      } else {
        console.log("result - ", result);
        console.log("status  - ", result.status);
        if (result?.status?.isInBlock) {
          console.log('Included at block hash', result.status.asInBlock.toHex());
          console.log('Events:');
  
          result.events.forEach(({ event: { data, method, section }, phase }) => {
            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          });

        } else if (result.status?.isFinalized) {
          return resolve({
            txHash: result.txHash.toHex(),
            txIndex: result.txIndex,
            blockHash: result.status.asFinalized.toHex(),
          });
        } 
      } 
    });
  });
}
