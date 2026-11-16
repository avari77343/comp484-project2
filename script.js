// Pixel Pals: Mochi's care system
// jQuery waits until the page is ready before connecting the controls.
$(function () {
  // The pet's information is stored in one object so every action updates
  // the same values before the dashboard is refreshed.
  var pet_info = {
    name: "Mochi",
    weight: 8,
    happiness: 6
  };

  // Arrays give Mochi a few different comments for each activity.
  var petComments = {
    treat: ["A snack! You understand me.", "Crunch crunch. Best day ever!", "I saved a crumb for later. Maybe."],
    play: ["Wheee! One more round!", "That was so fun. Again?", "I'm surprisingly good at this!"],
    exercise: ["Phew! My little legs need a break.", "Look at me go!", "Getting stronger, one pixel at a time."],
    nap: ["Zzz... that was a cozy recharge.", "I dreamed about giant strawberries.", "All rested! Hello again!"]
  };

  // Connect each button to its own action function.
  $(".treat-button").on("click", clickedTreatButton);
  $(".play-button").on("click", clickedPlayButton);
  $(".exercise-button").on("click", clickedExerciseButton);
  $(".nap-button").on("click", clickedNapButton);
  $(".rename-form").on("submit", renamePet);

  checkAndUpdatePetInfoInHtml();

  function clickedTreatButton() {
    pet_info.happiness += 1;
    pet_info.weight += 1;
    showPetComment("treat");
    checkAndUpdatePetInfoInHtml();
  }

  function clickedPlayButton() {
    pet_info.happiness += 2;
    pet_info.weight -= 1;
    showPetComment("play");
    checkAndUpdatePetInfoInHtml();
  }

  function clickedExerciseButton() {
    pet_info.happiness -= 1;
    pet_info.weight -= 1;
    showPetComment("exercise");
    checkAndUpdatePetInfoInHtml();
  }

  // The extra action is Nap: it restores happiness without changing weight.
  function clickedNapButton() {
    pet_info.happiness += 2;
    showPetComment("nap");
    checkAndUpdatePetInfoInHtml();
  }

  function renamePet(event) {
    event.preventDefault();

    // jQuery .val() reads the current text entered in the nickname field.
    // trim() removes accidental spaces; an empty value keeps the old name.
    var newName = $("#pet-name-input").val().trim();
    if (newName.length > 0) {
      pet_info.name = newName;
      $("#pet-name-input").val("");
      showPetComment("rename");
      checkAndUpdatePetInfoInHtml();
    } else {
      showMessage("Type a nickname first. I want a good one!");
    }
  }

  function checkAndUpdatePetInfoInHtml() {
    checkWeightAndHappinessBeforeUpdating();
    updatePetInfoInHtml();
  }

  // Keep the stats inside their allowed ranges: weight cannot be negative,
  // and happiness stays between 0 and 10.
  function checkWeightAndHappinessBeforeUpdating() {
    if (pet_info.weight < 0) {
      pet_info.weight = 0;
    }
    if (pet_info.happiness < 0) {
      pet_info.happiness = 0;
    }
    if (pet_info.happiness > 10) {
      pet_info.happiness = 10;
    }
  }

  function updatePetInfoInHtml() {
    $(".name").text(pet_info.name);
    $(".weight").text(pet_info.weight);
    $(".happiness").text(pet_info.happiness);
  }

  function showPetComment(action) {
    var choices = petComments[action];
    var comment = choices[Math.floor(Math.random() * choices.length)];
    if (action === "rename") {
      comment = "I like my new name! Thanks for choosing it.";
    }
    showMessage(comment);
  }

  function showMessage(message) {
    // jQuery .replaceWith() swaps the previous message paragraph for a fresh
    // one. The new paragraph keeps the same ID, so the next update can find it.
    $("#pet-message").replaceWith(
      $("<p>", { id: "pet-message", text: message })
    );
  }
});
