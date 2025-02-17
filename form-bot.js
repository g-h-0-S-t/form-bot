javascript: (() => {
    const a = 1000, 
          b = window.location.href,
          c = d => d[Math.floor(Math.random() * d.length)], 
          d = (d, e) => Math.floor(Math.random() * (e - d + 1)) + d, 
          e = () => { const d = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; return `${c(d)}.${c(d)}`; };

    const f = (g, h) => {
        if (!g) return;
        const i = setInterval(() => {
            try {
                if (!g.document || g.document.readyState !== "complete") return;
                clearInterval(i);
                const j = g.document,
                      k = j.querySelectorAll('[role="radiogroup"], [role="group"], [role="listitem"], input[type="text"], input[type="number"], textarea'),
                      l = e(), 
                      m = d(18, 45);
                
                k.forEach(n => {
                    const o = Array.from(n.querySelectorAll('[role="radio"], input[type="radio"]')), 
                          p = n.querySelector('input[type="text"], textarea'), 
                          q = n.querySelector('input[type="number"]');
                    
                    if (o.length) {
                        let r = c(o);
                        if (n.textContent.toLowerCase().includes("gender")) {
                            const s = [...j.querySelectorAll('[aria-label="Male"], [aria-label="Female"]')];
                            r = c(s);
                        }
                        r && r.dispatchEvent(new MouseEvent("click", { bubbles: !0 }));
                    } else if (p) {
                        let t = `Sample ${h}`;
                        n.textContent.toLowerCase().includes("name in initials") && (t = l);
                        p.value = t;
                        p.dispatchEvent(new Event("input", { bubbles: !0 }));
                    } else if (q) {
                        q.value = m;
                        q.dispatchEvent(new Event("input", { bubbles: !0 }));
                    }
                });

                setTimeout(() => {
                    const u = j.querySelector('[jsname="M2UYVd"]');
                    u && (u.dispatchEvent(new MouseEvent("click", { bubbles: !0 })), setTimeout(() => g.close(), 1500));
                }, 2000);
            } catch (v) {
                clearInterval(i), g?.close();
            }
        }, 500);
    };

    (() => {
        for (let g = 0; g < a; g++) setTimeout(() => {
            const h = window.open(b, "_blank", `width=800,height=900,left=${100 + 50 * g},top=${100 + 50 * g}`);
            setTimeout(() => f(h, g + 1), 3000);
        }, 1500 * g);
    })();
})();
