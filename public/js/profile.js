const username = $("#username")[0].innerHTML;
const usermail = $("#email")[0].innerHTML;

const editProfileModal = document.getElementById('exampleModal');
editProfileModal.addEventListener('shown.bs.modal', event => {
    $("#editedUsername")[0].value = username;
    $("#editedEmail")[0].value = usermail;
})