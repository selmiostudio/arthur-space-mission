
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#startMission");

  if (startButton) {
    startButton.addEventListener("click", () => {
      document.body.classList.remove("mission-started");

      void document.body.offsetWidth;

      document.body.classList.add("mission-started");
    });
  }
});
