    import { Line } from 'react-chartjs-2';
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js';

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    const LineChart = ({ chartData }) => {
      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false,
            text: 'My Line Chart',
          },
        },
      };

      return <Line data={chartData} options={options} />;
    };

    export default LineChart;