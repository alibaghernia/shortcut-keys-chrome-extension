document.addEventListener('keydown', (e) => {
    if (!e.altKey) {
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

    if (e.shiftKey && e.code === 'KeyM') {
        window.open('https://www.google.com/maps');
        return;
    }

    if (e.code === 'KeyL') {
        window.open('https://www.ldoceonline.com/');
        return;
    }

    if (e.code === 'KeyY') {
        window.open('https://www.youtube.com/');
        return;
    }

    // if (e.code === 'Digit1') {
    //     window.open('');
    //     return;
    // }

    if (e.code === 'KeyT') {
        window.open('https://translate.google.com/?sl=en&tl=fa&op=translate');
        return;
    }
})