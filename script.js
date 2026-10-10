
/* ARTHUR'S SPACE MISSION */
/* Interactive animations */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Arthur's Space Mission is ready!");

  const startButton = document.querySelector("#startMission");

  if (startButton) {
    startButton.addEventListener("click", () => {
      document.body.classList.add("mission-started");
    });
  }
});
