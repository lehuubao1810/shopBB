import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default function OrdersChart ({ orders }) {

  // get datetime from first order createAt 00:00:00 to now
  const startDate = orders[0] ? new Date(orders[orders.length - 1].createdAt) : new Date();
  console.log(orders);
  const now = new Date();

  const timeDiff = now.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

  const days = [];
  for (let i = 0; i <= daysDiff; i++) {
    days.push((new Date(startDate.getTime() + i * (24 * 60 * 60 * 1000))).toDateString());
  }
  console.log(days);

  const [data, setData] = useState({
    series: [
      {
        name: "Đơn đặt hàng",
        data: [2, 3, 4, 5, 6, 7]
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: days,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="area"
        height={350}
      />
    </div>
  );
}

OrdersChart.propTypes = {
  orders: PropTypes.array.isRequired,
};