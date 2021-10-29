function setupSW() {
    if ('serviceWorker' in navigator) {
        let SW_URL = `${process.env.PUBLIC_URL}/SW.js`;
        navigator.serviceWorker.register(SW_URL).then((reg) => {
            console.log('service worker registered', reg);
        }).catch((err) => {
            console.log('service worker not registered', err);
        });
    }
};

export default setupSW;