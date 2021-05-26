import hmy from "./hmy";
import service from "./service";
const oneArgHrc20Methods = ["approve", "mint", "burn", "burnFrom"];
const HRC20_ABI = require("./HRC20_ABI.json");
const twoArgsHrc20Methods = ["allowance"];
const HRC20LIST_URL = `https://explorer.harmony.one:8888/hrc20-token-list`;
const HRC20Address = []; // the contract address of the token

class Volume {
  // this function will return all the txs
  HRC20Txs() {
    const c = hmy.contract(HRC20_ABI);
    return this.txs.reduce((list, tx) => {
      if (this.hrc20info(tx.to) == undefined) {
        return list;
      }
      const decodeObj = c.decodeInput(tx.input);
      if (decodeObj.abiItem && decodeObj.abiItem.name == "transfer")
        list.push({
          tx,
          hrc20tx: {
            from: tx.from,
            to: decodeObj.params[0],
            amount: decodeObj.params[1],
          },
        });
      else if (decodeObj.abiItem && decodeObj.abiItem.name == "transferFrom")
        list.push({
          tx,
          hrc20tx: {
            from: decodeObj.params[0],
            to: decodeObj.params[1],
            amount: decodeObj.params[2],
          },
        });
      return list;
    });
  }

  getTransactions() {
    this.txs = [];

    service // define service
      .getHrc20TxsLatest({
        pageSize: this.pageSize,
        pageIndex: 0,
        sortid: this.sortid,
      })
      .then((result) => {
        this.txs = result.txs;
      });
  }

  hrc20info(id) {
    return Hrc20Address[id];
  }

  hrc20Balance(id, amount) {
    return (
      displayAmount(amount, this.hrc20info(id).decimals) +
      " " +
      this.hrc20info(id).symbol
    );
  }
}
