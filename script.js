const scenarios = [
  {
    num: 1,
    title: "Scenario 1",
    description: "The room contains urns that are either blue or red. There are b blue urns in the room and there are r=10-b red urns in the room. ",
    MainWheel: { percentBlue: 30, percentRed: 60 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 2,
    title: "Scenario 2",
    description: "Description of Scenario 2...",
    MainWheel: { percentBlue: 20, percentRed: 40 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 3,
    title: "Scenario 3",
    description: "Description of Scenario 3...",
    MainWheel: { percentBlue: 75, percentRed: 10 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 4,
    title: "Scenario 4",
    description: "Description of Scenario 4...",
    MainWheel: { percentBlue: 15, percentRed: 15 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 5,
    title: "Scenario 5",
    description: "Description of Scenario 5...",
    MainWheel: { percentBlue: 30, percentRed: 70 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 6,
    title: "Scenario 6",
    description: "Description of Scenario 6...",
    MainWheel: { percentBlue: 30, percentRed: 70 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 7,
    title: "Scenario 7",
    description: "Description of Scenario 7...",
    MainWheel: { percentBlue: 30, percentRed: 70 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 8,
    title: "Scenario 8",
    description: "Description of Scenario 8...",
    MainWheel: { percentBlue: 30, percentRed: 70 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  // Add more scenarios here...
];
const instructions = [
  {
    step: 0,
    text: "This is a study on economic decision-making. You will be paid at the end of the study based on your choices and chance. Thus, it is very important that you understand these instructions fully. If you have a question at any point, please raise your hand. Also, please make sure you have turned off and put away all personal electronic devices at this time.",
  },
  {
    step: 1,
    text: "The experiment will consist of three parts.  You will receive an endowment of $XXX at the start of Part I of the experiment.  In Part I of the experiment, you will be presented with a sequence of choices.  In each choice, you will be provided a description of an uncertain prospect and asked to report your valuation for the prospect.  At the end of the experiment, the computer will randomly select one of your choices to determine your earnings for Part I of the experiment.  Depending on the choice you make and chance, you can either earn an additional amount of money or lose a portion of the endowment.  Part II of the experiment is comprised of two tasks.  In each of these tasks, you will have the opportunity to earn additional money up to $YYY.  Earnings for Part II of the experiment will depend upon your choices and chance.  Part III of the experiment is a short questionnaire.  You will receive a flat fee of $ZZZ for completing the questionnaire.  Your total earnings for the experiment will be determined by adding your earnings from each of the three parts of the experiment.  You will receive your total payment at the end of the session.",
  },
  {
    step: 2,
    text: "Consider the following uncertain prospect. Note that this uncertain prospect involves monetary prizes. If (i) as a result of your choice below and chance, you end up with this uncertain prospect and (ii) this round is chosen for payment at the end of the experiment, the amount of the prize will be added to your overall payment for participating in the experiment. ",
  },
];
let currentStep = 0;
let myChart = null;

// Additions and modifications to your existing script.js for modal handling
document.addEventListener("DOMContentLoaded", function() {
  const instructionModal = document.getElementById("instructionModal");
  const viewInstructionsBtn = document.getElementById("viewInstructionsBtn");
  let currentStep = 0;

  function updateInstructionText() {
    const instructionDiv = document.getElementById("instructions");
    instructionDiv.innerHTML = `<p>${instructions[currentStep].text}</p>`;
  }

  function nextInstruction() {
    currentStep++;
    if (currentStep >= instructions.length) {
      // Once all instructions are viewed, hide modal and show "View Instructions" button
      instructionModal.style.display = "none";
      viewInstructionsBtn.style.display = "block";
      currentStep = instructions.length - 1; // Ensure step doesn't exceed bounds
    }
    updateInstructionText();
  }

  function backInstruction() {
    currentStep--;
    if (currentStep < 0) {
      currentStep = 0;
    }
    updateInstructionText();
  }

  // Initial instruction text update
  updateInstructionText();

  // Event listeners for instruction navigation
  document.getElementById("continue").addEventListener("click", nextInstruction);
  document.getElementById("back").addEventListener("click", backInstruction);

  // Closing the modal manually (via the close button or outside click)
  document.getElementById("closeModal").addEventListener("click", function() {
    instructionModal.style.display = "none";
    viewInstructionsBtn.style.display = "block";
  });

  // Reopening the modal with the "View Instructions" button
  viewInstructionsBtn.addEventListener("click", function() {
    currentStep = 0;
    instructionModal.style.display = "block";
    viewInstructionsBtn.style.display = "none";
  });

  // Existing functionality to display scenarios, etc.
  // Ensure to integrate or refactor existing functions as needed
  
function showScenario(scenario, index) {
  const scenarioDiv = document.getElementById("scenario");
  scenarioDiv.innerHTML = `<h2>${scenario.title}</h2><p>${scenario.description}</p>`;

  //ksjbckjqwc
  //pie
  //create the main wheel
  //main wheel at index 0
  const MainWheelData = scenarios[index].MainWheel;
  console.log(MainWheelData);
  const xValuesMain = ["Blue", "Red", "Unknown"];
  const yValuesMain = [MainWheelData.percentBlue, MainWheelData.percentRed, 100-MainWheelData.percentBlue-MainWheelData.percentRed];
  const barColorsMain = [
    "blue",
    "red",
    "gray",
  ];

  //change to dynamically generate 100 slices based on percentages:
  var blueCount =MainWheelData.percentBlue;
  var redCount = MainWheelData.percentRed;
  var unknownCount = 100 - blueCount - redCount;
  const xValuesMainDynamic = [];
  const yValuesMainDynamic = [];
  const barColorsMainDynamic = [];
  for (var i = 0; i < blueCount; i++) {
    xValuesMainDynamic.push("Blue");
    yValuesMainDynamic.push(1);
    barColorsMainDynamic.push("blue");
  }
  for (var i = 0; i < redCount; i++) {
    xValuesMainDynamic.push("Red");
    yValuesMainDynamic.push(1);
    barColorsMainDynamic.push("red");
  }
  for (var i = 0; i < unknownCount; i++) {
    xValuesMainDynamic.push("Unknown");
    yValuesMainDynamic.push(1);
    barColorsMainDynamic.push("gray");
  }
  
  document.getElementById("mainChart").innerHTML = "";

  myChart = new Chart("mainChart", {
    type: "pie",
    data: {
      labels: xValuesMainDynamic,
      datasets: [{
        backgroundColor: barColorsMainDynamic,
        color: barColorsMainDynamic,
        data: yValuesMainDynamic,
        borderWidth: 0, // Ensure no border is added between slices
    }]
      
    },
    options: {
      title: {
        
        display: true,
        text: "Main Wheel Distribution"
      },
    }
    
  });
  

}
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.hover.enabled = false;

function generatePaginationButtons() {
  const pagination = document.getElementById("pagination");
  const row = document.createElement("div");
  row.classList.add("row");

  scenarios.forEach((scenario, index) => {
    const col = document.createElement("div");
    col.classList.add("col");

    const button = document.createElement("button");
    button.textContent = index + 1;
    button.classList.add("btn", "btn-primary"); // Add Bootstrap button classes
    button.addEventListener("click", () => showScenario(scenario, index));

    col.appendChild(button);
    row.appendChild(col);
  });

  pagination.appendChild(row);
}
function lightenColor(color) {
  //lighten color by percent
  if (color == "gray" ){
    return "lightgray";
  }
  else if (color == "blue"){
    return "lightblue";
  }
  else if (color == "red"){
    return "lightcoral";
  }
  else{
    return "lightgray";
  }
  
}
function spinChart() {
  const totalSlices = 100;
  let currentSlice = Math.floor(Math.random() * totalSlices); // Start at a random slice
  const spinDuration = 3000; // 3 seconds in milliseconds
  const intervalDuration = 100; // Slower interval to make changes more noticeable
  let spinCounter = spinDuration / intervalDuration; // Determine how many times to switch slices

  const originalColors = myChart.data.datasets[0].color.slice(); // Clone the original colors

  // Function to reset slice colors
  function resetSliceColors() {
      for (let i = 0; i < totalSlices; i++) {
          myChart.data.datasets[0].color[i] = originalColors[i];
      }
  }

  const intervalId = setInterval(() => {
      resetSliceColors(); // Reset all slices to their original colors

      // Lighten the current slice and potentially adjacent slices for visibility
      //myChart.data.datasets[0].backgroundColor[currentSlice] = lightenColor(originalColors[currentSlice]);
      myChart.data.datasets[0].color[currentSlice] = "white";
      myChart.update();

      // Move to a new random slice
      currentSlice = Math.floor(Math.random() * totalSlices);
      spinCounter--;

      if (spinCounter <= 0) {
          clearInterval(intervalId); // Stop spinning
          resetSliceColors(); // Optionally reset all colors or highlight the selected slice
          myChart.update();
      }
  }, intervalDuration);
}


showScenario(scenarios[0], 0);
//start with instructions at step 0
const instructionDiv = document.getElementById("instructions");
instructionDiv.innerHTML = `<p>${instructions[0].text}</p>`;
generatePaginationButtons();
document.getElementById("spinBtn").addEventListener("click", spinChart);


});