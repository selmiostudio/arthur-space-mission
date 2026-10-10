

/* ARTHUR'S SPACE MISSION — SCREEN NAVIGATION */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector("#hero");
  const captainScreen = document.querySelector("#captainScreen");
  const birthdayScreen = document.querySelector("#birthdayScreen");

  const startButton = document.querySelector("#startMission");
  const continueButton = document.querySelector("#continueJourney");

  const screens = [hero, captainScreen, birthdayScreen].filter(Boolean);

  function showScreen(screen) {
    if (!screen) return;

    screens.forEach((item) => {
      item.classList.remove("active-screen");
      item.setAttribute("aria-hidden", "true");
    });

    screen.classList.add("active-screen");
    screen.removeAttribute("aria-hidden");

    window.scrollTo(0, 0);
  }

  // Always begin at the launch station
  showScreen(hero);

  let launching = false;

  if (startButton && captainScreen) {
    startButton.addEventListener("click", () => {
      if (launching) return;

      launching = true;
      startButton.disabled = true;

      // Preserve the existing rocket launch animation
      document.body.classList.remove("mission-started");
      void document.body.offsetWidth;
      document.body.classList.add("mission-started");

      // Reveal Captain Arthur after the launch
      window.setTimeout(() => {
        showScreen(captainScreen);
      }, 2500);
    });
  }

  if (continueButton && birthdayScreen) {
    continueButton.addEventListener("click", () => {
      showScreen(birthdayScreen);
    });
  }

  // Start from the first screen when reopening the page
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      document.body.classList.remove("mission-started");
      launching = false;

      if (startButton) {
        startButton.disabled = false;
      }

      showScreen(hero);
    }
  });
});
