const axios = require("axios");
const {
  EXPLORER_BACKEND_URL,
  EXPLORER_BACKEND_WS,
  SECRET,
} = require("./globalConfig.js");

const WebSocket = require("ws");
// For test: asios.get('...').delay(1000)
Promise.prototype.delay = function (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(this);
    }, time);
  });
};

function sendPost(url, params, config) {
  return axios.post(EXPLORER_BACKEND_URL + url, params, config);
}

function authGet(url, _params) {
  let params = Object.assign(
    {
      headers: { Authorization: "Bearer " + SECRET },
    },
    _params
  );
  return sendGet(url, params);
}

function sendGet(url, params) {
  console.log(EXPLORER_BACKEND_URL + url, params);

  //if(url == '/hrc20-txs' || url == '/hrc20-latest')
  //  return axios.get('http://127.0.0.1:8080' + url, params); // .delay(500)
  return axios.get(EXPLORER_BACKEND_URL + url, params); // .delay(500)
}

(function listenWebsocket() {
  // console.log(EXPLORER_BACKEND_WS);
  const ws = new WebSocket(EXPLORER_BACKEND_WS, [SECRET]);

  ws.addEventListener("open", () => {
    ws.send("front-end: Hi.");
  });

  ws.addEventListener("message", (res) => {
    let data = JSON.parse(res.data);

    if (data.shards) {
      data.shards = Object.values(data.shards).map((shard) => ({
        stakingTxCount: 0,
        stakingTxs: [],
        ...shard,
      }));
    }

    if (data.error) {
      alert(`Websocket Error: ${data.error}`);
      return;
    }
  });

  ws.addEventListener("error", (error) => {
    console.log("error", error);
  });

  ws.addEventListener("close", () => {
    console.log("close");
  });
})();

module.exports = {
  getHrc20Txs(params) {
    return authGet("/hrc20-txs", { params }).then((res) => {
      return res.data;
    });
  },
  getHrc20TxsLatest(params) {
    return authGet("/hrc20-latest", { params }).then((res) => {
      return res.data;
    });
  },
};
