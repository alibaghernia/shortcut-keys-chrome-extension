document.addEventListener('keydown', (e) => {
    if (!e.altKey) {
        return;
    }

    if (e.ctrlKey && e.code === 'KeyL') {
        window.open('https://www.linkedin.com/');
        return;
    }

    if (e.ctrlKey && e.code === 'KeyC') {
        window.open('https://calendar.google.com/calendar/u/1/r');
        return;
    }

    if (e.ctrlKey && e.code === 'KeyT') {
        window.open('https://www.time.ir/');
        return;
    }

    if (e.code === 'KeyI') {
        window.open('https://www.instagram.com/');
        return;
    }

    if (e.code === 'KeyG') {
        window.open('https://github.com/');
        return;
    }

    if (e.code === 'KeyO') {
        window.open('https://www.oxfordlearnersdictionaries.com/');
        return;
    }

    if (e.code === 'KeyC') {
        window.open('https://chatgpt.com/');
        return;
    }

    if (e.code === 'KeyD') {
        window.open('https://chat.deepseek.com/');
        return;
    }


    if (e.code === 'KeyS') {
        const selectedText = window.getSelection().toString().trim()
        if (!selectedText) { return; }
        const url = "https://www.google.com/search?q=" + encodeURIComponent(selectedText);
        window.open(url);
        return;
    }

    if (e.shiftKey && e.code === 'KeyM') {
        window.open('https://www.google.com/maps');
        return;
    }

    if (e.code === 'KeyL') {
        const selectedText = window.getSelection().toString().trim()
        if (selectedText) {
            window.open(`https://www.ldoceonline.com/dictionary/${selectedText}`);
            return;
        }
        window.open('https://www.ldoceonline.com/');
        return;
    }

    if (e.code === 'KeyY') {
        const selectedText = window.getSelection().toString().trim()
        if (selectedText && selectedText.length < 20) {
            window.open(`https://www.youtube.com/results?search_query=${selectedText}`);
            return;
        }
        window.open('https://www.youtube.com/');
        return;
    }

    // if (e.code === 'Digit1') {
    //     window.open('');
    //     return;
    // }

    if (e.code === 'KeyT') {
        const selectedText = encodeURIComponent(window.getSelection().toString().trim())
        window.open(`https://translate.google.com/?sl=en&tl=fa&op=translate&text=${selectedText}`);
        return;
    }

    if (e.code === 'KeyP') {
        const faToEn = {
            "ض": "q", "ص": "w", "ث": "e", "ق": "r", "ف": "t", "غ": "y", "ع": "u", "ه": "i", "خ": "o", "ح": "p", "ج": "[", "چ": "]",
            // 
            "ش": "a", "س": "s", "ی": "d", "ب": "f", "ل": "g", "ا": "h", "ت": "j", "ن": "k", "م": "l", "ک": ";", "گ": "'", "پ": "\\",
            // 
            "ظ": "z", "ط": "x", "ز": "c", "ر": "v", "ذ": "b", "د": "n", "ئ": "m", "و": ",",
            // 
            "؟": "?", "÷": "`", ")": "(", "(": ")",
        }
        const enToFa = Object.fromEntries(Object.entries(faToEn).map(([fa, en]) => [en, fa]))
        const selectedText = window.getSelection().toString()
        let result = ""
        for (let ch of selectedText) {
            ch = ch.toLowerCase()
            if (faToEn[ch]) {
                result += faToEn[ch]
            } else if (enToFa[ch]) {
                result += enToFa[ch]
            } else {
                result += ch
            }
        }
        navigator.clipboard.writeText(result).catch(err => {
            alert('Failed to copy text: ', err);
        });
        return;
    }

})