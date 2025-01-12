javascript: (() => {
  let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let randomAnswer = (options, history, label) => {
    if (!history[label]) {
      history[label] = null;
    }
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
      letters.charAt(Math.floor(Math.random() * 26))
    );
  };
  let selectOption = async (options, label, history, customSelector = null) => {
    let container = customSelector
      ? document.querySelector(customSelector)
      : document.body;
    if (!container) {
      console.error(`Container for "${label}" not found.`);
      return false;
    }
    let randomizedAnswer = randomAnswer(options, history, label);
    let optionElement = container.querySelector(
      `div[aria-label="${randomizedAnswer}"]`,
    );
    if (optionElement) {
      optionElement.click();
      console.log(`Answered "${label}": ${randomizedAnswer}`);
      return true;
    } else {
      console.error(
        `Could not find option "${randomizedAnswer}" for "${label}".`,
      );
      return false;
    }
  };
  (async () => {
    console.log("Starting form automation...");
    let formQuestions = {
      questions: [
        {
          label:
            "I have read and understood the provided information about the study and I understand that my participation is voluntary as I am free to withdraw at anytime.",
          options: ["Yes"],
        },
        { label: "Initials", type: "text" },
        { label: "Age (in years)", options: ["20 - 25", "26 - 30", "30 - 35"] },
        {
          label: "Sex",
          options: ["Male", "Female", "Transgender", "Prefer not to say"],
        },
        {
          label: "Marital Status",
          options: ["Single", "Married", "Divorced", "Separated"],
        },
        {
          label: "Place of Residence",
          options: ["Rural", "Urban", "Semi - Urban"],
        },
        {
          label: "Socioeconomic Status",
          options: ["Upper Class", "Middle Class", "Lower Class"],
        },
        {
          label: "Highest Educational Qualification",
          options: [
            "Pursuing Undergraduation",
            "Graduated",
            "Pursuing Postgraduation",
            "Postgraduated",
          ],
        },
        {
          label: "Are you currently working?",
          options: ["Yes", "No"],
          customSelector: 'div[aria-labelledby="i110 i113"]',
        },
        {
          label:
            "Are you presently suffering from any diagnosed psychological or neurological conditions",
          options: ["Yes", "No"],
          customSelector: 'div[aria-labelledby="i121 i124"]',
        },
        {
          label: "I think about how much worse things could have been.",
          scale: ["Never", "1", "2", "3", "4", "5", "Very Often"],
        },
        {
          label:
            "If only another person (or other people) had not been so selfish, this whole mess could have been avoided.",
          scale: ["Never", "1", "2", "3", "4", "5", "Very Often"],
        },
        {
          label:
            "I think about how much better things would have been if I had acted differently.",
          scale: ["Never", "1", "2", "3", "4", "5", "Very Often"],
        },
        {
          label:
            "I feel sad when I think about how much better things could have been.",
          scale: ["Never", "1", "2", "3", "4", "5", "Very Often"],
        },
        {
          label: "Think “What am I doing to deserve this?”",
          scale: ["Almost never", "1", "2", "3", "4", "5", "Almost Always"],
        },
        {
          label:
            "Analyze recent events to try to understand why you are depressed.",
          scale: ["Almost never", "1", "2", "3", "4", "5", "Almost Always"],
        },
        {
          label: "Think “Why do I always react this way?”",
          scale: ["Almost never", "1", "2", "3", "4", "5", "Almost Always"],
        },
        {
          label: "Go someplace alone to think about your feelings.",
          scale: ["Almost never", "1", "2", "3", "4", "5", "Almost Always"],
        },
        {
          label: "I am easily disappointed with myself.",
          scale: [
            "Not at all like me",
            "A little bit like me",
            "Moderately like me",
            "Quite a bit like me",
            "Extremely like me",
          ],
        },
        {
          label: "There is a part of me that puts me down.",
          scale: [
            "Not at all like me",
            "A little bit like me",
            "Moderately like me",
            "Quite a bit like me",
            "Extremely like me",
          ],
        },
        {
          label: "I find it easy to forgive myself.",
          scale: [
            "Not at all like me",
            "A little bit like me",
            "Moderately like me",
            "Quite a bit like me",
            "Extremely like me",
          ],
        },
      ],
    };
    try {
      let answerHistory = {};
      for (let question of formQuestions.questions) {
        if (question.type === "text") {
          let initialsField = document.querySelector(
            'input[aria-labelledby="i12 i15"]',
          );
          if (initialsField) {
            let initials = generateRandomInitials();
            initialsField.value = initials;
            initialsField.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`Filled Initials: ${initials}`);
          } else {
            console.error(`Text field for "${question.label}" not found.`);
          }
        } else if (question.options) {
          await selectOption(
            question.options,
            question.label,
            answerHistory,
            question.customSelector,
          );
        } else if (question.scale) {
          let scaleGroups = Array.from(
            document.querySelectorAll('div[role="radiogroup"]'),
          );
          for (let group of scaleGroups) {
            let randomizedAnswer = randomAnswer(
              question.scale,
              answerHistory,
              question.label,
            );
            let optionElement = group.querySelector(
              `div[aria-label="${randomizedAnswer}"]`,
            );
            if (optionElement) {
              optionElement.click();
              console.log(`Answered "${question.label}": ${randomizedAnswer}`);
            }
          }
        }
      }
      let submitButton = document.querySelector('[aria-label="Submit"]');
      if (submitButton) {
        console.log("Form filled successfully! Clicking the Submit button...");
        setTimeout(() => {
          submitButton.click();
        }, 500);
      } else {
        console.error(
          "Submit button not found. Please verify the DOM structure.",
        );
      }
    } catch (error) {
      console.error("Error during form automation:", error);
    }
  })();
})();
