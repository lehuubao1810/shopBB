import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

import formatPrice from "../../utils/formatPrice";

export default function RevenueChart({ orders }) {
  const [data, setData] = useState({
    series: [
      {
        name: "Doanh thu",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yyyy",
        },  
      },
      // auto panning
      

    },
  });

  useEffect(() => {
    const days = [];
    const revenueData = [];
    if (orders) {
      const now = new Date();
      const startDate = new Date(now.getTime() - 6 * (24 * 60 * 60 * 1000));
      const startDate2 = new Date(now.getTime() - 5 * (24 * 60 * 60 * 1000));
      for (let i = 0; i < 7; i++) {
        days.push(
          new Date(startDate2.getTime() + i * (24 * 60 * 60 * 1000)).toDateString()
        );
      }

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(
          startDate.getTime() + i * (24 * 60 * 60 * 1000)
        );
        const currentDateString = currentDate.toDateString();

        const revenue = orders.reduce((totalRevenue, order) => {
          const orderDate = new Date(order.createdAt);
          if (orderDate.toDateString() === currentDateString) {
            return totalRevenue + order.total;
          }
          return totalRevenue;
        }, 0);

        revenueData.push(revenue);
      }
    }
    console.log(revenueData);
    console.log(days);
    setData({
      series: [
        {
          name: "Doanh thu",
          data: revenueData,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          zoom: {
            enabled: false,
          }
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
            format: "dd/MM/yyyy",
          },
        },

      },
    });
  }, [orders]);

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

RevenueChart.propTypes = {
  orders: PropTypes.array.isRequired,
};

//   const [data, setData] = useState({
//     series: [
//       {
//         name: "Doanh thu",
//         data: [40, 40, 56, 51, 42, 109, 100],
//       },
//       // {
//       //   name: "series2",
//       //   data: [11, 32, 45, 32, 34, 52, 41],
//       // },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: "area",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth",
//       },
//       xaxis: {
//         type: "datetime",
//         categories: days,
//       },
//       tooltip: {
//         x: {
//           format: "dd/MM/yy HH:mm",
//         },
//       },
//     },
//   });

//   return (
//     <div id="chart">
//       <ReactApexChart
//         options={data.options}
//         series={data.series}
//         type="area"
//         height={350}
//       />
//     </div>
//   );
// }

// RevenueChart.propTypes = {
//   orders: PropTypes.array.isRequired,
// };
