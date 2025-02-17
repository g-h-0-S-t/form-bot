javascript: (() => {
    const clickEl = el => el && el.click(), getRandInit = () => {const l = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; return `${l[Math.floor(Math.random() * 26)]}.${l[Math.floor(Math.random() * 26)]}`}, getRandGender = opts => {const v = opts.filter(el => ["male", "female"].includes(el.getAttribute("aria-label")?.toLowerCase())); return v.length ? v[Math.floor(Math.random() * v.length)] : null}, getRandNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    document.querySelectorAll('[role="radiogroup"], [role="group"], [role="listitem"]').forEach(q => {
        const opts = Array.from(q.querySelectorAll('[role="radio"], input[type="radio"]')), txt = q.querySelector('input[type="text"], textarea'), num = q.querySelector('input[type="number"]');
        if (opts.length) {
            let sel = q.textContent.toLowerCase().includes("gender") ? getRandGender(opts) : opts[Math.floor(Math.random() * opts.length)];
            sel && clickEl(sel);
        } else if (txt) {
            txt.value = q.textContent.toLowerCase().includes("name in initials") ? getRandInit() : "Sample Answer", txt.dispatchEvent(new Event("input", { bubbles: true }));
        } else if (num) {
            num.value = getRandNum(18, 45), num.dispatchEvent(new Event("input", { bubbles: true }));
        }
    });
    setTimeout(() => {
        const sub = document.querySelector('[jsname="M2UYVd"]');
        sub && clickEl(sub);
    }, 0);
})();
