const scenarios = [
  {
    num: 1,
    title: "Scenario 1",
    MainWheel: { percentBlue: 30, percentRed: 60 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 2,
    title: "Scenario 2",
    MainWheel: { percentBlue: 20, percentRed: 40 },
    RedWheel: { percentA: 90, percentB: 10 },
    BlueWheel: { percentA: 50, percentB: 50 },
  },
  {
    num: 3,
    title: "Scenario 3",
    MainWheel: { percentBlue: 75, percentRed: 10 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 4,
    title: "Scenario 4",
    MainWheel: { percentBlue: 15, percentRed: 15 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 5,
    title: "Scenario 5",
    MainWheel: { percentBlue: 30, percentRed: 70 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 6,
    title: "Scenario 6",
    MainWheel: { percentBlue: 30, percentRed: 70 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 7,
    title: "Scenario 7",
    MainWheel: { percentBlue: 30, percentRed: 70 },
    RedWheel: { percentA: 10, percentB: 30 },
    BlueWheel: { percentA: 30, percentB: 40 },
  },
  {
    num: 8,
    title: "Scenario 8",
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
    text: "The experiment will consist of three parts.  You will receive an endowment of $XXX at the start of Part I of the experiment.  In Part I of the experiment, you will be presented with a sequence of choices.  In each choice, you will be provided a description of an uncertain prospect and asked to report your valuation for the prospect.  At the end of the experiment, the computer will randomly select one of your choices to determine your earnings for Part I of the experiment.  Depending on the choice you make and chance, you can either earn an additional amount of money or lose a portion of the endowment.",
  },
  {
    step: 2,
    text: "Part II of the experiment is comprised of two tasks.  In each of these tasks, you will have the opportunity to earn additional money up to $YYY.  Earnings for Part II of the experiment will depend upon your choices and chance.",
  },
  {
    step: 3,
    text: "  Part III of the experiment is a short questionnaire.  You will receive a flat fee of $ZZZ for completing the questionnaire.  Your total earnings for the experiment will be determined by adding your earnings from each of the three parts of the experiment.  You will receive your total payment at the end of the session.",
  },
  {
    step: 4,
    text: "Consider the following uncertain prospect. Note that this uncertain prospect involves monetary prizes. If (i) as a result of your choice below and chance, you end up with this uncertain prospect and (ii) this round is chosen for payment at the end of the experiment, the amount of the prize will be added to your overall payment for participating in the experiment. ",
  },
];

let currentStep = 0;
let mainChart = null;
let redChart = null;
let blueChart = null;

// Additions and modifications to your existing script.js for modal handling
document.addEventListener("DOMContentLoaded", function () {
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
  document
    .getElementById("continue")
    .addEventListener("click", nextInstruction);
  document.getElementById("back").addEventListener("click", backInstruction);

  // Closing the modal manually (via the close button or outside click)
  document.getElementById("closeModal").addEventListener("click", function () {
    instructionModal.style.display = "none";
    viewInstructionsBtn.style.display = "block";
  });

  // Reopening the modal with the "View Instructions" button
  viewInstructionsBtn.addEventListener("click", function () {
    currentStep = 0;
    instructionModal.style.display = "block";
    viewInstructionsBtn.style.display = "none";
  });

  function showScenario(scenario, index) {
    document.getElementById("mainChart").innerHTML = "";
    document.getElementById("blueChart").innerHTML = "";
    document.getElementById("redChart").innerHTML = "";
    const scenarioDiv = document.getElementById("scenario");
    scenarioDiv.innerHTML = ``;
    scenarioDiv.innerHTML = `<h2>${
      scenario.title
    }</h2><p>The room contains 100 urns that are either blue or red. You know there are <b>${
      scenario.MainWheel.percentBlue
    }</b> blue urns in the room and there are <b>${
      scenario.MainWheel.percentRed
    }</b> red urns in the room, leaving <b>${
      100 - scenario.MainWheel.percentRed - scenario.MainWheel.percentBlue
    }</b> urns of unknown color. The figure below shows these proportions. Based on which color urn is randomly selected, you will proceed to the red or blue urn in stage 2. Click the "spin" button to simulate this.</p>`;

    const MainWheelData = scenarios[index].MainWheel;

    //change to dynamically generate 100 slices based on percentages:
    var blueCount = MainWheelData.percentBlue;
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
      barColorsMainDynamic.push("darkred");
    }
    for (var i = 0; i < unknownCount; i++) {
      xValuesMainDynamic.push("Unknown");
      yValuesMainDynamic.push(1);
      barColorsMainDynamic.push("gray");
    }

    mainChart = new Chart("mainChart", {
      type: "pie",
      data: {
        labels: xValuesMainDynamic,
        datasets: [
          {
            backgroundColor: barColorsMainDynamic,
            color: barColorsMainDynamic,
            data: yValuesMainDynamic,
            borderWidth: 0, // Ensure no border is added between slices
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Urn Distribution",
          fontSize: 24,
        },
      },
    });
    storeOriginalChartState();
    const BlueWheelData = scenarios[index].BlueWheel;

    //change to dynamically generate 100 slices based on percentages:
    var aCount = BlueWheelData.percentA;
    var bCount = BlueWheelData.percentB;
    var unknownCount = 100 - aCount - bCount;
    const xValuesBlueDynamic = [];
    const yValuesBlueDynamic = [];
    const barColorsBlueDynamic = [];
    for (var i = 0; i < aCount; i++) {
      xValuesBlueDynamic.push("a");
      yValuesBlueDynamic.push(1);
      barColorsBlueDynamic.push("gold");
    }
    for (var i = 0; i < bCount; i++) {
      xValuesBlueDynamic.push("b");
      yValuesBlueDynamic.push(1);
      barColorsBlueDynamic.push("#7B5E7B");
    }
    for (var i = 0; i < unknownCount; i++) {
      xValuesBlueDynamic.push("Unknown");
      yValuesBlueDynamic.push(1);
      barColorsBlueDynamic.push("gray");
    }

    blueChart = new Chart("blueChart", {
      type: "pie",
      data: {
        labels: xValuesBlueDynamic,
        datasets: [
          {
            backgroundColor: barColorsBlueDynamic,
            color: barColorsBlueDynamic,
            data: yValuesBlueDynamic,
            borderWidth: 0, // Ensure no border is added between slices
          },
        ],
      },
      options: {
        title: {
          display: true,
          fontColor: "blue",
          text: "Blue Urn",
          fontSize: 18,
        },
      },
    });
    const RedWheelData = scenarios[index].RedWheel;

    //change to dynamically generate 100 slices based on percentages:
    var aCount = RedWheelData.percentA;
    var bCount = RedWheelData.percentB;
    var unknownCount = 100 - aCount - bCount;
    const xValuesRedDynamic = [];
    const yValuesRedDynamic = [];
    const barColorsRedDynamic = [];
    for (var i = 0; i < aCount; i++) {
      xValuesRedDynamic.push("a");
      yValuesRedDynamic.push(1);
      barColorsRedDynamic.push("gold");
    }
    for (var i = 0; i < bCount; i++) {
      xValuesRedDynamic.push("b");
      yValuesRedDynamic.push(1);
      barColorsRedDynamic.push("#7B5E7B");
    }
    for (var i = 0; i < unknownCount; i++) {
      xValuesRedDynamic.push("Unknown");
      yValuesRedDynamic.push(1);
      barColorsRedDynamic.push("gray");
    }
    redChart = new Chart("redChart", {
      type: "pie",
      data: {
        labels: xValuesRedDynamic,
        datasets: [
          {
            backgroundColor: barColorsRedDynamic,
            color: barColorsRedDynamic,
            data: yValuesRedDynamic,
            borderWidth: 0, // Ensure no border is added between slices
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Red Urn",
          fontColor: "darkred",
          fontSize: 18,
        },
      },
    });
  }
  Chart.defaults.global.tooltips.enabled = false;
  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.hover.enabled = false;

  function generatePaginationButtons() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; 
    pagination.appendChild(document.createElement("br")); 
    pagination.appendChild(document.createElement("br")); 
    pagination.appendChild(document.createElement("br")); 
    pagination.appendChild(document.createElement("br")); 

    scenarios.forEach((scenario, index) => {
      const button = document.createElement("button");
      button.textContent = index + 1;
      button.classList.add("btn", "btn-primary", "mb-2"); 
      button.addEventListener("click", () => showScenario(scenario, index));

      pagination.appendChild(button);
    });
  }

  function lightenColor(color) {
    if (color == "gray") {
      return "lightgray";
    } else if (color == "blue") {
      return "lightblue";
    } else if (color == "darkred") {
      return "lightcoral";
    } else {
      return "lightgray";
    }
  }
  let originalBackgroundColors = [];

  // Function to store the original state of the chart
  function storeOriginalChartState() {
    originalBackgroundColors =
      mainChart.data.datasets[0].backgroundColor.slice(); // Clone the original backgroundColors
  }

  // Function to reset the chart to its original state
  function resetChartToOriginalState() {
    mainChart.data.datasets[0].backgroundColor =
      originalBackgroundColors.slice(); // Reset to original backgroundColors
    mainChart.update();
    var leftArrow = document.getElementById("arrow-left");
    if (leftArrow) {
      leftArrow.style.fill = "black";
    }
    var rightArrow = document.getElementById("arrow-right");
    if (rightArrow) {
      rightArrow.style.fill = "black";
    }
    var qMark = document.getElementById("qmark");
    if (qMark) {
      qMark.style.fill = "white";
    }
  }

  function spinChart() {
    resetChartToOriginalState(); // Reset chart to original state at the start
    const totalSlices = 100;
    let previousSlice = -1; // Track the previous slice
    const spinDuration = 3000; // Total duration for the spin
    const flashDuration = 100; // Duration each slice is highlighted
    let elapsedTime = 0; // Track elapsed time

    const intervalId = setInterval(() => {
      if (previousSlice >= 0) {
        // Reset the previous slice immediately
        mainChart.data.datasets[0].backgroundColor[previousSlice] =
          originalBackgroundColors[previousSlice];
      }

      // Calculate the current slice; ensure it's different from the previous one
      let currentSlice;
      do {
        currentSlice = Math.floor(Math.random() * totalSlices);
      } while (currentSlice === previousSlice);

      // Highlight the current slice
      mainChart.data.datasets[0].backgroundColor[currentSlice] = lightenColor(
        mainChart.data.datasets[0].backgroundColor[currentSlice]
      );

      mainChart.update();

      previousSlice = currentSlice; 
      elapsedTime += flashDuration;

      if (elapsedTime >= spinDuration) {
        clearInterval(intervalId); // Stop spinning
        var qMark = document.getElementById("qmark");
        var leftArrow = document.getElementById("arrow-left");
        var rightArrow = document.getElementById("arrow-right");
        //if red, go to red chart, if blue, go to blue chart
        if (mainChart.data.labels[currentSlice] == "Red") {
          //highlight right arrow "Arrow-Down-Right"
          if (rightArrow) {
            rightArrow.style.fill = "crimson";
            leftArrow.style.fill = "white";
          }
        } else if (mainChart.data.labels[currentSlice] == "Blue") {
          if (leftArrow) {
            leftArrow.style.fill = "blue";
            rightArrow.style.fill = "white";
          }
        } else {
          if (qMark) {
            qMark.style.fill = "black";
            rightArrow.style.fill = "gray";
            leftArrow.style.fill = "gray";
          }
        }
      }
    }, flashDuration); // Run this interval every 3ms
  }


  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function () {
    output.innerHTML = this.value;
  };

  showScenario(scenarios[0], 0);
  const instructionDiv = document.getElementById("instructions");
  instructionDiv.innerHTML = `<p>${instructions[0].text}</p>`;
  generatePaginationButtons();
  document.getElementById("spinBtn").addEventListener("click", spinChart);
});
