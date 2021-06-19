const { SDK_NODE } = require("./globalConfig.js");

const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");

const shardID = 0;

const hmySDK = new Harmony(
  // rpc url
  SDK_NODE,
  {
    // chainType set to Harmony
    chainType: ChainType.Harmony,
    // chainType set to HmyLocal
    chainId:
      SDK_NODE !== "https://api.s0.b.hmny.io"
        ? ChainID.HmyMainnet
        : ChainID.HmyTestnet,
    shardID,
  }
);

const GAS_PRICE = new hmySDK.utils.Unit(1).asGwei().toHex(); // 1Gwei

let address = "one1h5ttpvht2g9hla9yz4knvlhrtxkpn3f3f5lkgk";
// let address = null;

function contract(
  abi,
  to,
  options = {
    from: address ? hmySDK.crypto.fromBech32(address) : "",
    gas: "210000",
    gasPrice: GAS_PRICE,
  }
) {
  let contract = hmySDK.contracts.createContract(abi, to, options);
  // console.log("contract ", contract);
  // if (window.harmony)
  //   contract.wallet.signTransaction = window.harmony.signTransaction; // or importPrivate
  let decodeParameters = (abi, hexdata) => {
    if (0 === abi.length) return [];
    let params = contract.abiCoder.decodeParameters(abi, hexdata);
    params.length = abi.length;
    /* for (let i = 0; i < abi.length; i++) {
      if (abi[i].type.startsWith('address'))
        params[i] = hmySDK.crypto.toBech32(params[i]);
    }*/
    return Array.from(params);
  };
  for (let name in contract.abiModel.getMethods()) {
    let method = contract.abiModel.getMethod(name);
    method.decodeInputs = (hexData) => decodeParameters(method.inputs, hexData);
    method.decodeOutputs = (hexData) =>
      decodeParameters(method.outputs, hexData);
  }

  contract.decodeInput = (hexData) => {
    const no0x = hexData.startsWith("0x") ? hexData.slice(2) : hexData;
    const sig = no0x.slice(0, 8).toLowerCase();
    const method = contract.abiModel.getMethod("0x" + sig);
    if (!method) {
      return false;
    }

    const argv = method.decodeInputs("0x" + no0x.slice(8));
    const obj = contract.methods["0x" + sig](...argv);

    for (let i = 0; i < obj.params.length; i++) {
      if (obj.abiItem.inputs[i].type === "address") {
        obj.params[i] = hmySDK.crypto.toBech32(obj.params[i]);
      } else if (obj.abiItem.inputs[i].type === "address[]") {
        obj.params[i] = obj.params[i].map((a) => hmySDK.crypto.toBech32(a));
      }
    }

    obj.toString = () => {
      let str = obj.abiItem.name + "(";
      for (let i = 0; i < obj.params.length; i++) {
        if (i > 0) str += ", ";
        str += obj.params[i];
      }
      str += ")";
      return str;
    };
    return obj;
  };

  return contract;
}

function contractDeploy(abi, code, _arguments) {
  let contractObj = contract(abi, "0x");
  return contractObj.deploy({
    data: code,
    arguments: _arguments,
  });
}

module.exports = {
  contract,
  contractDeploy,
};
