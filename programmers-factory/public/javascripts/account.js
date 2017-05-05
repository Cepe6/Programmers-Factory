/**
 * Created by cepe6 on 04.05.17.
 */
function showAccountForm() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("account-form").style.display = "block";
}

function closeAccountForm() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("account-form").style.display = "none";
}

function post() {
    var username = document.getElementById("reg-username").value;
    var password = document.getElementById("reg-password").value;
}