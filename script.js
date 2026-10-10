
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#startMission");
  const captainScreen = document.querySelector("#captainScreen");
  const continueButton = document.querySelector("#continueJourney");
  const rocket = document.querySelector(".rocket");

  if (startButton && captainScreen && rocket) {
    let launching = false;

    startButton.addEventListener("click", () => {
      if (launching) return;

      launching = true;
      startButton.disabled = true;

      document.body.classList.add("mission-started");

      // Move to Captain Arthur after rocket launch
      window.setTimeout(() => {
        captainScreen.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "instant" : "smooth",
          block: "start"
        });
      }, 2500);
    });
  }

  if (continueButton) {
    continueButton.addEventListener("click", () => {
      // Screen 3 will be connected next
      continueButton.textContent = "NEXT DESTINATION COMING SOON ✦";
    });
  }
});
