javascript: (() => {
    const participants = 1000;
    const url = window.location.href;

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomInitials = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return $ {
            getRandom(letters)
        }.$ {
            getRandom(letters)
        };
    };

    const fillForm = (win, participantId) => {
        if (!win) return;
        const checkLoad = setInterval(() => {
            try {
                if (!win.document || win.document.readyState !== "complete") return;

                clearInterval(checkLoad);
                const doc = win.document;
                const questions = doc.querySelectorAll('[role="radiogroup"], [role="group"], [role="listitem"], input[type="text"], input[type="number"], textarea');

                let uniqueInitials = getRandomInitials();
                let uniqueAge = getRandomNumber(18, 45);

                questions.forEach((q) => {
                    const radios = Array.from(q.querySelectorAll('[role="radio"], input[type="radio"]'));
                    const textInput = q.querySelector('input[type="text"], textarea');
                    const numberInput = q.querySelector('input[type="number"]');

                    if (radios.length) {
                        let selected = getRandom(radios);
                        if (q.textContent.toLowerCase().includes("gender")) {
                            const genderOptions = [...doc.querySelectorAll('[aria-label="Male"], [aria-label="Female"]')];
                            selected = getRandom(genderOptions);
                        }
                        if (selected) selected.dispatchEvent(new MouseEvent("click", {
                            bubbles: true
                        }));
                    } else if (textInput) {
                        let value = Sample $ {
                            participantId
                        };
                        if (q.textContent.toLowerCase().includes("name in initials")) value = uniqueInitials;
                        textInput.value = value;
                        textInput.dispatchEvent(new Event("input", {
                            bubbles: true
                        }));
                    } else if (numberInput) {
                        numberInput.value = uniqueAge;
                        numberInput.dispatchEvent(new Event("input", {
                            bubbles: true
                        }));
                    }
                });

                setTimeout(() => {
                    const submitBtn = doc.querySelector('[jsname="M2UYVd"]');
                    if (submitBtn) {
                        submitBtn.dispatchEvent(new MouseEvent("click", {
                            bubbles: true
                        }));
                        setTimeout(() => win.close(), 1500);
                    }
                }, 2000);
            } catch (e) {
                clearInterval(checkLoad);
                win?.close();
            }
        }, 500);
    };

    const startParticipants = async () => {
        for (let i = 0; i < participants; i++) {
            setTimeout(() => {
                const win = window.open(url, "_blank", width = 800, height = 900, left = $ {
                    100 + i * 50
                }, top = $ {
                    100 + i * 50
                });
                setTimeout(() => fillForm(win, i + 1), 3000);
            }, i * 1500);
        }
    };

    startParticipants();
})();
