javascript: (() => {
    console.log("🔄 Starting Google Form Autofill...");

    const clickElement = (el) => {
        if (el) el.click();
    };

    const getRandomInitials = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return `${letters[Math.floor(Math.random() * 26)]}.${letters[Math.floor(Math.random() * 26)]}`;
    };

    const getRandomGenderOption = (options) => {
        const validOptions = options.filter(el => {
            const label = el.getAttribute("aria-label")?.toLowerCase();
            return label === "male" || label === "female";
        });

        return validOptions.length ? validOptions[Math.floor(Math.random() * validOptions.length)] : null;
    };

    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const questions = document.querySelectorAll('[role="radiogroup"], [role="group"], [role="listitem"]');

    questions.forEach((question) => {
        const options = Array.from(question.querySelectorAll('[role="radio"], input[type="radio"]'));
        const textInput = question.querySelector('input[type="text"], textarea');
        const numberInput = question.querySelector('input[type="number"]');

        if (options.length) {
            let selectedOption = null;

            if (question.textContent.toLowerCase().includes("gender")) {
                selectedOption = getRandomGenderOption(options);
            } else {
                selectedOption = options[Math.floor(Math.random() * options.length)];
            }

            if (selectedOption) {
                console.log(`✅ Selecting: ${selectedOption.getAttribute("aria-label") || selectedOption.value}`);
                clickElement(selectedOption);
            }
        } else if (textInput) {
            let value = "Sample Answer";

            if (question.textContent.toLowerCase().includes("name in initials")) {
                value = getRandomInitials();
            }

            textInput.value = value;
            textInput.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`✅ Filled text input: ${value}`);
        } else if (numberInput) {
            numberInput.value = getRandomNumber(18, 45);
            numberInput.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`✅ Filled number input (Age): ${numberInput.value}`);
        }
    });

    console.log("✅ Form autofill completed!");

    setTimeout(() => {
        const submitButton = document.querySelector('[jsname="M2UYVd"]');
        if (submitButton) {
            console.log("🚀 Submitting the form...");
            clickElement(submitButton);
        } else {
            console.log("⚠️ Submit button not found!");
        }
    }, 1500);
})();
