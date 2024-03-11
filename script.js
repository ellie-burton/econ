const scenarios = [{
    title: "Scenario 1",
    description: "Description of Scenario 1...",
    MainWheel: {percentBlue: 30, percentRed: 70},
    RedWheel: {percentA: 10, percentB: 30},
    BlueWheel: {percentA: 30, percentB: 40}
},
{
    title: "Scenario 2",
    description: "Description of Scenario 2...",
    MainWheel: {percentBlue: 30, percentRed: 70},
    RedWheel: {percentA: 10, percentB: 30},
    BlueWheel: {percentA: 30, percentB: 40}
},
{
    title: "Scenario 3",
    description: "Description of Scenario 3...",
    MainWheel: {percentBlue: 30, percentRed: 70},
    RedWheel: {percentA: 10, percentB: 30},
    BlueWheel: {percentA: 30, percentB: 40}
}
// Add more scenarios here...
];

const pagination = document.querySelector('.pagination');

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

    var options = {
      title: 'My Daily Activities'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    return chart.draw(data, options);
}



function generatePaginationButtons() {
scenarios.forEach((scenario, index) => {
    const button = document.createElement('button');
    button.textContent = index + 1;
    button.addEventListener('click', () => showScenario(scenario, index));
    pagination.appendChild(button);
});
}

function showScenario(scenario, index) {
    const scenarioDiv = document.getElementById('scenario');
    scenarioDiv.innerHTML = `<h2>${scenario.title}</h2><p>${scenario.description}</p>`;

    //renderChart('mainWheelChart', 'Main Wheel', scenario.MainWheel);
    //renderChart('redWheelChart', 'Red Wheel', scenario.RedWheel);
    //renderChart('blueWheelChart', 'Blue Wheel', scenario.BlueWheel);

    //drawChart();

    var buttons = document.getElementsByTagName('button');
    console.log(buttons);
    const arr = Array.from(buttons);
    console.log(arr);
    arr.forEach(button => button.classList.remove('active'));
    arr[index].classList.add('active'); 
}

function renderChart(canvasId, title, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['A', 'B'],
            datasets: [{
                label: title,
                data: [data.percentA, data.percentB],
                backgroundColor: ['#ff0000', '#0000ff']
            }]
        }
    });
}
generatePaginationButtons();
showScenario(scenarios[0], 0);

