const ctx = document.getElementById('myChart');
var scenarios = [{
        title: "Scenario 1",
        description: "Description of Scenario 1...",
        MainWheel: {percentBlue: 30,percentRed: 70 },
        RedWheel: {percentA: 10 ,percentB: 30},
        BlueWheel: {percentA: 30 ,percentB: 40}
    },
    {
        title: "Scenario 2",
        description: "Description of Scenario 2...",
        MainWheel: {percentBlue: 30,percentRed: 70 },
        RedWheel: {percentA: 10 ,percentB: 30},
        BlueWheel: {percentA: 30 ,percentB: 40}
    },
    {
        title: "Scenario 3",
        description: "Description of Scenario 3...",
        MainWheel: {percentBlue: 30,percentRed: 70 },
        RedWheel: {percentA: 10 ,percentB: 30},
        BlueWheel: {percentA: 30 ,percentB: 40}
    },
    // Add more scenarios here...
];

const pagination = document.querySelector('.pagination button');

function generatePaginationButtons() {
    scenarios.forEach((scenario, index) => {
        const button = document.createElement('button');
        button.textContent = index + 1;
        button.addEventListener('click', () => showScenario(scenario, index));
        pagination.appendChild(button);
    });
}

function showScenario(scenario, index) {
    const scenarioDiv = document.querySelector('.scenario');

    scenarioDiv.innerHTML = `<h2>${scenario.title}</h2><p>${scenario.description}</p>`;
    
    

    // Handle active pagination button
    // const buttons = document.querySelectorAll('.pagination button');

    // buttons.forEach(button => button.classList.remove('active'));

    // buttons[index].classList.add('active');
}

// // anychart.onDocumentReady(function(scenario) {
// //     const scenarioDiv = document.querySelector('.scenario');

// //     // set the data
// //     var data = [
// //         {x: "Red ", value: 10},
// //         {x: "Blue", value: 30},
// //         {x: "Unknown", value: 60},
// //     ];
// //     // create the chart
// //     var chart = anychart.pie();
    
// //     // add the data
// //     chart.data(data);
  
// //     // display the chart in the container
// //     chart.container('container');
// //     chart.draw();
  
// //   });

showScenario(scenarios[0], 0);
generatePaginationButtons();
```
```

