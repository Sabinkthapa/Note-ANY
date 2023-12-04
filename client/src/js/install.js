const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA


window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event; //store triggerent events 
    butInstall.classList.toggle('hidden', false); //make install button visible
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent){
        return;
    }
    promptEvent.prompt(); //show installation prompt to user

    window.deferredPrompt = null; // reset the deferred prompt variable to null since it can be used once

    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt =  null; //clear deferred prompt varibale after app is installed
});
