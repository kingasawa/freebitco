
function getDashboard() {
  const lotteryTicketCtx = document.getElementById('lotteryTicketChart').getContext('2d');
  const lotteryTicketChart = new Chart(lotteryTicketCtx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'User Registration Chart',
        backgroundColor: '#fcbc09',
        borderColor: '#fcbc09',
        data: [10, 38, 75, 65, 110, 90, 150]
      }]
    },
    options: {}
  });
}
