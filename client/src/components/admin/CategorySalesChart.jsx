import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default function CategorySalesChart({ orders, categories }) {
  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%";
        },
      },
      legend: {
        position: "bottom",
      },
    },
  });

  useEffect(() => {
    const ordersByCategory = orders.reduce((acc, cur) => {
      cur.products.forEach((product) => {
        const categoryId = product.product.category;
        console.log(product.product.category);
        if (acc[categoryId]) {
          acc[categoryId].total += product.quantity;
        } else {
          acc[categoryId] = {
            total: product.quantity,
            id: categoryId,
          };
        }
      });
      return acc;
    }, {});
    console.log(ordersByCategory);
    const series = [];
    const labels = [];

    for (const categoryId in ordersByCategory) {
      series.push(ordersByCategory[categoryId].total);
      labels.push(
        categories.find((category) => category._id === categoryId)?.name
      );
    }

    setData({
      series: series,
      options: {
        chart: {
          type: "donut",
        },
        labels: labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(1) + "%";
          },
        },
        legend: {
          position: "bottom",
        },
      },
    });
  }, [orders, categories]);

  return (
    <div id="chart">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="donut"
        height={350}
      />
    </div>
  );
}

CategorySalesChart.propTypes = {
  orders: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
