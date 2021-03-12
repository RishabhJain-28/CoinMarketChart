# COIN MARKET CHART V1

## Setup

1. First clone this repository:

```bash
git clone https://github.com/RishabhJain-28/CoinMarketChart.git
```

2. Open the project folder

```bash
cd ./CoinMarketChart
```

3. Install dependencies

```bash
npm install
```

4. Build the client

```bash
npm run build
```

5. Make sure NODE_ENV is to production in .env file

## To start the server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture:

The client UI is rendered by the server which also privides all the data.
The server fetches data from https://seeswap.one/swap and https://explorer.harmony.one/ every five minutes which is then pushed to all the clients via socket.io.
<<<<<<< HEAD
All the data is stored in mongoDB atlas connected via the server./
=======
All the data is stored in mongoDB atlas connected via the server.
>>>>>>> 2d0c39da77e33b5f2f43926410e329fd8299fdab

## Tech stack used:

- NodeJS
- ExpressJS
- NextJS
- MongoDB
- Material UI
