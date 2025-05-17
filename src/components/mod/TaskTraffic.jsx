import ReactApexChart from 'react-apexcharts';

const TaskTraffic = () => {
  const options = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0),
              },
            },
          },
        },
      },
      labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
          },
        },
      ],
    };
  
    const series = [30, 25, 45, 10];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={300}
    />
  );
};
export default TaskTraffic