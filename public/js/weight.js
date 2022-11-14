const ctx = document.getElementById('myChart').getContext('2d');
console.log(weightData);
const myData = weightData.reverse();
console.log(myData)
const labels =[];
const data = [];

for(let i=0; i<myData.length; i++){
    labels.push(myData[i].date);
    data.push(myData[i].value);
}

const chartData = {
    labels: labels,
    datasets: [{
      label: 'Mi progreso',
      data: data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
};

const config = {
    type: 'line',
    data: chartData,
};

const myChart = new Chart(ctx, config);