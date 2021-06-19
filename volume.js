require("dotenv").config();

// import hmy from "./hmy";
// import service from "./service";
const hmy = require("./hmy");
const service = require("./service");
const oneArgHrc20Methods = ["approve", "mint", "burn", "burnFrom"];
const HRC20_ABI = require("./HRC20_ABI.json");
const twoArgsHrc20Methods = ["allowance"];
const HRC20LIST_URL = `https://explorer.harmony.one:8888/hrc20-token-list`;
const HRC20Address = ["one1a7nrn9j0gnqz4s8a272uvc3hymra6sw0lm9z9l"]; // the contract address of the token

class Volume {
  // this function will return all the txs
  HRC20Txs() {
    const to = "one1a7nrn9j0gnqz4s8a272uvc3hymra6sw0lm9z9l"; // * BUSD
    // const to = "one1h5ttpvht2g9hla9yz4knvlhrtxkpn3f3f5lkgk"; // * ARANK
    const c = hmy.contract(HRC20_ABI, to);

    console.log("tx", this.txs);

    return this.txs.reduce((list, tx) => {
      // console.log(list);
      // if (this.hrc20info(tx.to) == undefined) {
      //   return list;
      // }
      const decodeObj = c.decodeInput(tx.input);
      // console.log(decodeObj);
      // console.log('decodeObj.abiItem' ,decodeObj.abiItem);
      console.log("decodeObj.abiItem.name", decodeObj.abiItem.name);

      if (decodeObj.abiItem && decodeObj.abiItem.name == "transfer") {
        console.log("AA");
        list.push({
          tx,
          hrc20tx: {
            from: tx.from,
            to: decodeObj.params[0],
            amount: decodeObj.params[1],
          },
        });
      } else if (
        decodeObj.abiItem &&
        decodeObj.abiItem.name == "transferFrom"
      ) {
        console.log("BB");

        list.push({
          tx,
          hrc20tx: {
            from: decodeObj.params[0],
            to: decodeObj.params[1],
            amount: decodeObj.params[2],
          },
        });
      } else {
        console.log("NONE");
      }
      return list;
    }, []);
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
        // console.log("re", JSON.stringify(result));
        // console.log("re", JSON.stringify(result));
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

const vol = new Volume();
// const testRes =
vol.getTransactions();

setTimeout(() => {
  console.log("running");
  const final = vol.HRC20Txs();

  // console.log("final ", JSON.stringify(final));
  console.log("final ", final);
}, 5000);

// const testRes = vol.HRC20Txs();
