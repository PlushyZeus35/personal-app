console.log(flashMessages);
console.log(flashSuccesses);

if(flashMessages.length>0){
    const toastLiveExample = document.getElementById('messageToast');
    let toastText = document.getElementById('messageToastText');
    let toastTittle = document.getElementById('messageToast-title');
    toastTittle.innerHTML = flashMessages[0];
    toastText.innerHTML = flashMessages[1];
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

if(flashSuccesses.length>0){
    const toastLiveExample = document.getElementById('successToast');
    let toastText = document.getElementById('successToastText');
    let toastTittle = document.getElementById('successToastText-title');
    toastTittle.innerHTML = flashSuccesses[0];
    toastText.innerHTML = flashSuccesses[1];
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}