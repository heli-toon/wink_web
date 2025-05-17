import ReactApexChart from 'react-apexcharts';

const EngagementGraph = () => {
  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct'],
    },
  };

  const series = [
    {
      name: 'Series 1',
      data: [5, 12, 21, 14, 20, 22, 17, 30, 28],
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={300}
    />
  );
};
export default EngagementGraph
