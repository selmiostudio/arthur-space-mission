
/* ==========================================
   ARTHUR'S SPACE MISSION
   Interactive Birthday Invitation
   Screens 1–4 + RSVP Preview
========================================== */

/* Always begin from the first screen */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     SCREEN ELEMENTS
  ======================================== */

  const hero = document.querySelector("#hero");
  const captainScreen = document.querySelector("#captainScreen");
  const birthdayScreen = document.querySelector("#birthdayScreen");
  const rsvpScreen = document.querySelector("#rsvpScreen");

  const startButton = document.querySelector("#startMission");
  const continueButton = document.querySelector("#continueJourney");
  const joinCrewButton = document.querySelector("#joinCrewButton");

  const screens = [
    hero,
    captainScreen,
    birthdayScreen,
    rsvpScreen
  ].filter(Boolean);


  /* ========================================
     SCREEN NAVIGATION
  ======================================== */

  function showScreen(screen) {
    if (!screen) return;

    screens.forEach((item) => {
      item.classList.remove("active-screen");
      item.setAttribute("aria-hidden", "true");
      item.scrollTop = 0;
    });

    screen.classList.add("active-screen");
    screen.removeAttribute("aria-hidden");

    window.scrollTo(0, 0);
    screen.scrollTop = 0;
  }


  /* ========================================
     RESET TO FIRST SCREEN
  ======================================== */

  let launching = false;
  let launchTimer = null;

  function resetMission() {
    if (launchTimer !== null) {
      window.clearTimeout(launchTimer);
      launchTimer = null;
    }

    launching = false;

    document.body.classList.remove("mission-started");

    if (startButton) {
      startButton.disabled = false;
    }

    showScreen(hero);
  }

  resetMission();


  /* ========================================
     SCREEN 1 -> SCREEN 2
     ROCKET LAUNCH
  ======================================== */

  if (startButton && captainScreen) {
    startButton.addEventListener("click", () => {
      if (launching) return;

      launching = true;
      startButton.disabled = true;

      // Restart and preserve rocket animation
      document.body.classList.remove("mission-started");
      void document.body.offsetWidth;
      document.body.classList.add("mission-started");

      // Open Captain Arthur after launch
      launchTimer = window.setTimeout(() => {
        launchTimer = null;
        showScreen(captainScreen);
      }, 2500);
    });
  }


  /* ========================================
     SCREEN 2 -> SCREEN 3
     BIRTHDAY PLANET
  ======================================== */

  if (continueButton && birthdayScreen) {
    continueButton.addEventListener("click", () => {
      showScreen(birthdayScreen);
    });
  }


  /* ========================================
     SCREEN 3 -> SCREEN 4
     JOIN THE CREW
  ======================================== */

  if (joinCrewButton && rsvpScreen) {
    joinCrewButton.addEventListener("click", () => {
      showScreen(rsvpScreen);
    });
  }


  /* ========================================
     SCREEN 4 — RSVP FORM
  ======================================== */

  const rsvpForm = document.querySelector("#rsvpForm");
  const rsvpSuccess = document.querySelector("#rsvpSuccess");
  const rsvpSuccessMessage = document.querySelector(
    "#rsvpSuccessMessage"
  );

  const editResponseButton = document.querySelector(
    "#rsvpEditResponse"
  );

  const guestNameInput = document.querySelector("#guestName");
  const guestsField = document.querySelector("#rsvpGuestsField");
  const guestCount = document.querySelector("#guestCount");


  /* Show guest count only for YES responses */

  function updateAttendance() {
    if (!rsvpForm) return;

    const selected = rsvpForm.querySelector(
      'input[name="attendance"]:checked'
    );

    const isAttending = selected?.value === "yes";

    if (guestsField) {
      guestsField.hidden = !isAttending;
      guestsField.style.display = isAttending ? "" : "none";
    }

    if (guestCount) {
      guestCount.disabled = !isAttending;
    }
  }


  if (rsvpForm) {

    const attendanceInputs = rsvpForm.querySelectorAll(
      'input[name="attendance"]'
    );

    attendanceInputs.forEach((input) => {
      input.addEventListener("change", updateAttendance);
    });

    updateAttendance();


    /* ======================================
       RSVP SUBMISSION — PREVIEW ONLY
    ====================================== */

    rsvpForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!rsvpForm.reportValidity()) {
        return;
      }

      const guestName = guestNameInput?.value.trim();

      const selectedAttendance = rsvpForm.querySelector(
        'input[name="attendance"]:checked'
      );

      const attendance = selectedAttendance?.value;

      if (!guestName || !attendance) {
        return;
      }

      const numberOfGuests =
        attendance === "yes"
          ? Number(guestCount?.value || 1)
          : 0;

      let message = "";

      if (attendance === "yes") {
        message =
          `Thank you, ${guestName}! ` +
          `Your boarding pass is ready for ` +
          `${numberOfGuests} space explorer` +
          `${numberOfGuests === 1 ? "" : "s"}. ` +
          `See you at Captain Arthur's birthday!`;
      } else {
        message =
          `Thank you, ${guestName}! ` +
          `We'll miss you among the stars.`;
      }

      if (rsvpSuccessMessage) {
        rsvpSuccessMessage.textContent = message;
      }

      // Hide form and display confirmation preview
      rsvpForm.hidden = true;
      rsvpForm.style.display = "none";

      if (rsvpSuccess) {
        rsvpSuccess.hidden = false;
      }

      if (rsvpScreen) {
        rsvpScreen.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });


    /* ======================================
       EDIT RSVP RESPONSE
    ====================================== */

    if (editResponseButton) {
      editResponseButton.addEventListener("click", () => {

        if (rsvpSuccess) {
          rsvpSuccess.hidden = true;
        }

        rsvpForm.hidden = false;
        rsvpForm.style.display = "";

        updateAttendance();

        if (rsvpScreen) {
          rsvpScreen.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      });
    }
  }


  /* ========================================
     RESET WHEN RESTORED FROM BROWSER CACHE
  ======================================== */

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      resetMission();
    }
  });

});
