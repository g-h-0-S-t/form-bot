javascript: (() => {
    console.log("🔄 Starting Google Form Autofill...");

    // Function to simulate a click
    const clickElement = (el) => {
        if (el) el.click();
    };

    // Function to generate random initials (e.g., "A.B", "X.Y")
    const getRandomInitials = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return `${letters[Math.floor(Math.random() * 26)]}.${letters[Math.floor(Math.random() * 26)]}`;
    };

    // Function to get a valid gender option (strictly "Male" or "Female")
    const getRandomGenderOption = (options) => {
        const validOptions = options.filter(el => {
            const label = el.getAttribute("aria-label")?.toLowerCase();
            return label === "male" || label === "female";
        });

        return validOptions.length ? validOptions[Math.floor(Math.random() * validOptions.length)] : null;
    };

    // Function to get a random integer within a range (for age)
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Select all question containers
    const questions = document.querySelectorAll('[role="radiogroup"], [role="group"], [role="listitem"]');

    questions.forEach((question) => {
        const options = Array.from(question.querySelectorAll('[role="radio"], input[type="radio"]'));
        const textInput = question.querySelector('input[type="text"], textarea');
        const numberInput = question.querySelector('input[type="number"]');

        if (options.length) {
            let selectedOption = null;

            // Handle gender selection strictly as Male/Female
            if (question.textContent.toLowerCase().includes("gender")) {
                selectedOption = getRandomGenderOption(options);
            } else {
                // General case: Select a random option
                selectedOption = options[Math.floor(Math.random() * options.length)];
            }

            if (selectedOption) {
                console.log(`✅ Selecting: ${selectedOption.getAttribute("aria-label") || selectedOption.value}`);
                clickElement(selectedOption);
            }
        } else if (textInput) {
            let value = "Sample Answer";

            // Handle "Name in initials" field
            if (question.textContent.toLowerCase().includes("name in initials")) {
                value = getRandomInitials();
            }

            textInput.value = value;
            textInput.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`✅ Filled text input: ${value}`);
        } else if (numberInput) {
            // Handle age input (random between 18 and 45)
            numberInput.value = getRandomNumber(18, 45);
            numberInput.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`✅ Filled number input (Age): ${numberInput.value}`);
        }
    });

    console.log("✅ Form autofill completed!");

    // Wait for a second before clicking submit to simulate user behavior
    setTimeout(() => {
        const submitButton = document.querySelector('[jsname="M2UYVd"]');
        if (submitButton) {
            console.log("🚀 Submitting the form...");
            clickElement(submitButton);
        } else {
            console.log("⚠️ Submit button not found!");
        }
    }, 0);
})();
