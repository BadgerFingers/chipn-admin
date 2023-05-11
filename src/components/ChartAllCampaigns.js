import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title
} from 'chart.js';

ChartJS.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title
);

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff'
      }
      }
    },
    scales: {
      y: {
          ticks: {
              color: "#ffffff"
          }
      },
      x: {
          ticks: {
              color: "#ffffff"
          }
      }
  }
  };
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Created this year',
        data: labels.map(() => Math.round(Math.random() * 100)),
        backgroundColor: '#793CEA',
      }
    ],
  };

const ChartAllCampaigns = () => {
    return (<Chart type='line' options={options} data={data} />);
}
 
export default ChartAllCampaigns;