import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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



const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const data = {
  labels,
  datasets: [
    {
      label: 'Created this week',
      data: labels.map(() => Math.round(Math.random() * 100)),
      backgroundColor: 'rgb(59 130 246)',
    }
  ],
};


const ChartRecentCampaigns = (props) => {

    useEffect(() => {
      console.log(props.data)
    }, [props]);

    return (
      <>
    <Bar options={options} data={data} />
    </>
    );
}
 
export default ChartRecentCampaigns;