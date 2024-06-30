import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function DailySalesChart() {

  // get datetime for a week have day now (from Monday to Sunday)
  const now = new Date("2023-11-18");
  const day = now.getDay();
  console.log(now.toDateString());
  const startDate = new Date(now.getTime() - (day - 1) * (24 * 60 * 60 * 1000));
  console.log(startDate);
  // const endDate = new Date(now.getTime() + (7 - day) * (24 * 60 * 60 * 1000));
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push((new Date(startDate.getTime() + i * (24 * 60 * 60 * 1000))).toDateString());
  }
  // console.log(days);
  

  const [data, setData] = useState({
    series: [{
      name: 'Đơn đặt hàng',
        data: [30, 40, 45, 50, 49, 60, 70]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              console.log(chart, w, e)
            }
          }
        },
        // colors: '#FF1654',
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          // type: 'datetime',
          categories: [
            'Thứ 2',
            'Thứ 3',
            'Thứ 4',
            'Thứ 5',
            'Thứ 6',
            'Thứ 7',
            'Chủ nhật',
          ],
          labels: {
            style: {
            //   colors: colors,
              fontSize: '12px'
            }
          }
        }
      },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
