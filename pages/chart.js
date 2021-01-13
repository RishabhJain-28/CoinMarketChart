import React, { useState, useEffect } from "react";
import axios from "../util/axios";

import Chart from "../components/Chart/index";

export default function ChartPage() {
  return (
    <>
      <Chart />
    </>
  );
}
// export async function getServerSideProps(context) {
//   try {
//     const { data } = await axios.get(`/chart/data`);
//     if (!data) {
//       return {
//         notFound: true,
//       };
//     }
//     const chartData = data.map((e) => ({ x: e.time, y: e.USD }));
//     console.log("chartData.length", chartData.length);
//     return {
//       props: { chartData },
//     };
//   } catch (err) {
//     console.log(err);
//     return { props: {} };
//   }
// }
