(function () {
    console.log('asdasdasdsad');

    // یکبار تلاش برای فوکوس با تاخیر کوتاه بعد از لود
    document.addEventListener('DOMContentLoaded', () => {
        focusSourceBox({ reason: 'domcontentloaded' });
        // بعضی اجزا دیرتر می‌آیند؛ یک تلاش با تاخیر
        setTimeout(() => focusSourceBox({ reason: 'delayed-initial' }), 300);
    });

    // وقتی تب/پنجره برمی‌گردد
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            focusSourceBox({ reason: 'visibilitychange' });
        }
    });

    // وقتی خود پنجره فوکوس می‌گیرد (از پنجره‌ی دیگر برگشت)
    window.addEventListener('focus', () => {
        focusSourceBox({ reason: 'window-focus' });
    }, true);

    // چون Google Translate یک SPA است، با تغییر DOM هم دوباره سعی می‌کنیم
    const mo = new MutationObserver((mutations) => {
        // اگر ناحیه ورودی اضافه/عوض شد، تلاش کن
        if (mutations.some(m => m.addedNodes && m.addedNodes.length)) {
            // debounce سبک
            if (mo._t) clearTimeout(mo._t);
            mo._t = setTimeout(() => focusSourceBox({ reason: 'mutation' }), 120);
        }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    // ——————————————————————————————————————————
    // پیدا کردن با چندین انتخابگر تا با نسخه‌های مختلف UI سازگار باشد
    function findSourceTextBox() {
        // کاندیدها بر اساس UIهای مختلف ترنسلیت
        const selectors = [
            'textarea[aria-label="Source text"]',
            'textarea[aria-label]',             // لوکالایز شده
            'textarea[placeholder]',            // بعضی نسخه‌ها
            'textarea',                         // fallback
            '[contenteditable="true"][role="textbox"]',
            '[contenteditable="true"]'
        ];

        let el = null;

        for (const sel of selectors) {
            const candidates = Array.from(document.querySelectorAll(sel));
            // فقط آیتم‌های «قابل‌دیدن»
            const visible = candidates.filter(isVisible);
            // تلاش: آن‌هایی که داخل پانل «source» هستند اولویت دارند
            const sourceFirst = visible.sort((a, b) => score(a) - score(b));
            el = sourceFirst[0];
            if (el) break;
        }

        return el;

        function score(node) {
            // سعی می‌کنیم المنتی را ترجیح دهیم که در ستون/باکس منبع باشد
            // سرنخ‌ها: data-language، labelهای “source”، کلاس‌های رایج
            const box = node.closest('[data-language], [aria-label*="source" i], [aria-labelledby], [class*="source" i]');
            return box ? 0 : 1;
        }

        function isVisible(node) {
            if (!(node instanceof HTMLElement)) return false;
            const rect = node.getBoundingClientRect();
            const style = window.getComputedStyle(node);
            return (
                rect.width > 0 &&
                rect.height > 0 &&
                style.visibility !== 'hidden' &&
                style.display !== 'none'
            );
        }
    }

    function focusSourceBox({ reason } = {}) {
        const el = findSourceTextBox();
        if (!el) return;

        // اگر همین الان فوکوس داریم و کاربر‌ عمداً جای دیگری کلیک کرده، مزاحم نشویم
        if (document.activeElement === el) return;

        // بعضی UIها داخل iframe نیستند، اما اطمینان از scroll به دید
        try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) { }

        // فوکوس + انتخاب (برای textarea)
        el.focus({ preventScroll: true });
        if (el.tagName === 'TEXTAREA') {
            // اگر چیزی داخلش هست، انتخاب کامل
            try { el.select(); } catch (e) { }
        } else {
            // برای contenteditable: مکان‌نما را انتها بگذار
            placeCaretAtEnd(el);
        }
        // console.debug('Auto-focus Translate:', reason);
    }

    function placeCaretAtEnd(el) {
        try {
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } catch (e) { }
    }
})();
