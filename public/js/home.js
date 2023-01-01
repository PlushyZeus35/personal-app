const ctx = document.getElementById('weightChart');
let labels =[];
let data = [];
for(let i=0; i<5; i++){
    labels.push(weightData[i].date);
    data.push(weightData[i].value);
}
labels = labels.reverse();
data = data.reverse();

const chartData = {
    labels: labels,
    datasets: [{
      label: 'Peso',
      data: data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.35
    }]
};

const config = {
    type: 'line',
    data: chartData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title:{
                display: false,
                text: 'Tu progreso'
            },
            datalabels: {
              display: false
            },
            legend: {
                display: false
            }
        },
        pointStyle: 'circle',
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        }
    }
};

const myChart = new Chart(ctx, config);