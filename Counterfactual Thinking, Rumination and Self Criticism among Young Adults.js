javascript: (() => {
    console.log("🔄 Starting Google Form Autofill...");

    const clickElement = (el) => el?.click();

    const getRandomInitials = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return `${letters[Math.floor(Math.random() * 26)]}.${letters[Math.floor(Math.random() * 26)]}`;
    };

    const getRandomGenderOption = (options) => {
        const validOptions = options.filter(el => {
            const label = el.getAttribute("aria-label")?.toLowerCase();
            return label === "male" || label === "female";
        });
        return validOptions[Math.floor(Math.random() * validOptions.length)];
    };

    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const questions = document.querySelectorAll('[role="radiogroup"], [role="group"], [role="listitem"]');

    questions.forEach((question) => {
        const options = Array.from(question.querySelectorAll('[role="radio"], input[type="radio"]'));
        const textInput = question.querySelector('input[type="text"], textarea');
        const numberInput = question.querySelector('input[type="number"]');

        if (options.length) {
            let selectedOption = question.textContent.toLowerCase().includes("gender") 
                ? getRandomGenderOption(options) 
                : options[Math.floor(Math.random() * options.length)];
            if (selectedOption) clickElement(selectedOption);
        } else if (textInput) {
            textInput.value = question.textContent.toLowerCase().includes("name in initials") 
                ? getRandomInitials() 
                : "Sample Answer";
            textInput.dispatchEvent(new Event("input", { bubbles: true }));
        } else if (numberInput) {
            numberInput.value = getRandomNumber(18, 45);
            numberInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
    });

    console.log("✅ Form autofill completed!");

    const submitButton = document.querySelector('[jsname="M2UYVd"]');
    if (submitButton) {
        console.log("🚀 Submitting the form...");
        clickElement(submitButton);
    } else {
        console.log("⚠️ Submit button not found!");
    }
})();
