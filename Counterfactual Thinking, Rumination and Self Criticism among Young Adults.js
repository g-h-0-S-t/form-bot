javascript: (() => {
  let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let randomAnswer = (options, history, label) => {
    if (!history[label]) history[label] = null;
    let filteredOptions = options.filter((option) => option !== history[label]);
    let answer =
      filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
    history[label] = answer;
    return answer;
  };

  let generateRandomInitials = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return (
      letters.charAt(Math.floor(Math.random() * 26)) +
      "." +
      letters.charAt(Math.floor(Math.random() * 26))
    );
  };

  let fillTextInput = (label) => {
    let inputField = document.querySelector(
      'input[type="text"], input[aria-labelledby*="i"]'
    );
    if (inputField) {
      let textValue = label === "Initials" ? generateRandomInitials() : "Test";
      inputField.value = textValue;
      inputField.dispatchEvent(new Event("input", { bubbles: true }));
      console.log(`Filled "${label}": ${textValue}`);
      return true;
    } else {
      console.error(`Text field for "${label}" not found.`);
      return false;
    }
  };

  let selectOption = async (options, label, history) => {
    let allOptions = [...document.querySelectorAll('div[role="radio"]')];

    let randomizedAnswer = randomAnswer(options, history, label);
    let optionElement = allOptions.find(
      (el) =>
        el.getAttribute("aria-label") &&
        el.getAttribute("aria-label").includes(randomizedAnswer)
    );

    if (optionElement) {
      optionElement.click();
      console.log(`Answered "${label}": ${randomizedAnswer}`);
      return true;
    } else {
      console.warn(`Retrying selection for "${label}"...`);
      await wait(500);
      let retryOption = allOptions.find(
        (el) =>
          el.getAttribute("aria-label") &&
          el.getAttribute("aria-label").includes(randomizedAnswer)
      );
      if (retryOption) retryOption.click();
      return !!retryOption;
    }
  };

  let fillRadioGroup = async (label, scale) => {
    let scaleGroups = Array.from(document.querySelectorAll('div[role="radiogroup"]'));
    for (let group of scaleGroups) {
      let randomizedAnswer = randomAnswer(scale, {}, label);
      let optionElement = group.querySelector(
        `div[aria-label="${randomizedAnswer}"]`
      );
      if (optionElement) {
        optionElement.click();
        console.log(`Answered "${label}": ${randomizedAnswer}`);
      }
    }
  };

  (async () => {
    console.log("Starting form automation...");
    let answerHistory = {};

    let formFields = document.querySelectorAll(".Qr7Oae");
    
    for (let field of formFields) {
      let labelElement = field.querySelector(".M7eMe");
      if (!labelElement) continue;

      let label = labelElement.innerText.trim();
      let options = [...field.querySelectorAll('div[role="radio"]')].map(el => el.getAttribute("aria-label"));

      if (label.includes("Name in initials") || label.includes("Initials")) {
        fillTextInput(label);
      } else if (options.length > 0) {
        await selectOption(options, label, answerHistory);
      } else {
        let radioGroups = field.querySelectorAll('div[role="radiogroup"]');
        if (radioGroups.length > 0) {
          await fillRadioGroup(label, ["1", "2", "3", "4", "5"]);
        }
      }
    }

    let submitButton = document.querySelector('[aria-label="Submit"], button[type="submit"]');
    if (submitButton && !submitButton.disabled) {
      console.log("Form filled successfully! Clicking the Submit button...");
      setTimeout(() => {
        submitButton.click();
      }, 500);
    } else {
      console.error("Submit button not found or not enabled. Please verify the DOM structure.");
    }
  })();
})();
