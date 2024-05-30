var signinEmail= document.querySelector("#signinEmail")
var signinPassword= document.querySelector("#signinPassword")
var signupName= document.querySelector("#signupName")
var signupEmail= document.querySelector("#signupEmail")
var signupPassword= document.querySelector("#signupPassword")
var signupBtn= document.querySelector("#signup-btn");
var signinBtn= document.querySelector("#signin-btn");
var warning= document.querySelector(".warning");
var sucess= document.querySelector(".success");
var takenEmail= document.querySelector(".takenEmail");
var invalidLogin= document.querySelector(".invalidLogin");
var welcome= document.querySelector(".welcome");
var loggedInUser = localStorage.getItem("loggedInUser");
var logout=document.querySelector(".logout");

var users = JSON.parse(localStorage.getItem("users")) || [];

// Start Sign Up

if((signupBtn)){
signupBtn.addEventListener("click", function() {
    if (validation()) {
        addUsers();
    }
});}




function addUsers(){
    var user={
        userName: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    clearData();
    window.location.href = 'index.html';
    console.log(users);
}

function clearData(){
    signupName.value="";
    signupEmail.value="";
    signupPassword.value="";
}

function validation(){
    var nameValid= regexValidation(signupName)
    var emailValid= regexValidation(signupEmail)
    var passwordValid= regexValidation(signupPassword);
    var takenEmailValid= validateEmail()
    if (signupName.value === "" || signupEmail.value === "" || signupPassword.value === "" || !nameValid || !emailValid || !passwordValid || !takenEmailValid) {
       {
        warning.classList.remove("d-none");
        sucess.classList.add("d-none");
        return false;}
    } else {
        warning.classList.add("d-none");
        sucess.classList.remove("d-none");
        return true;
    }
}
if(signupName && signupEmail && signupPassword){
signupName.addEventListener("change", function(){
    regexValidation(this);
})
signupEmail.addEventListener("change", function(){
    regexValidation(this);
})
signupPassword.addEventListener("change", function(){
    regexValidation(this);
})}


function regexValidation(validated){

    var regex={
        signupName: /^[A-Z][a-z]{2,20}/ ,
        signupEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ ,
        signupPassword:/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]){3,15}/
     }
     var isValid= regex[validated.id].test(validated.value);
     if (isValid){
        validated.classList.replace("is-invalid","is-valid");
        validated.nextElementSibling.classList.replace("d-block","d-none");
    }else{
        if(validated.classList.contains("is-valid")){
            validated.classList.replace("is-valid","is-invalid");
        }else{
            validated.classList.add("is-invalid");
        }
        validated.nextElementSibling.classList.replace("d-none","d-block");

}
return isValid;
}


function validateEmail(){
    for(var i=0; i<users.length; i++){
        if(signupEmail.value==users[i].email){
            takenEmail.classList.remove("d-none"); 
            return false;
    }
    }
takenEmail.classList.add("d-none"); 
return true;}
// End Sign Up



// Start sign in

if(signinBtn){
signinBtn.addEventListener("click", signIn);
}

function signIn(){

    var user = {
        email: signinEmail.value,
        password: signinPassword.value,
    };
    var loginSuccess = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() == user.email.toLowerCase() && users[i].password == user.password) {
            console.log("Login successful");
            invalidLogin.classList.add("d-none");
            localStorage.setItem("loggedInUser", users[i].userName); 
            window.location.href = 'welcome.html';
            loginSuccess = true;
            break;
        }else{
            invalidLogin.classList.remove("d-none");
    }
    }
   
}


if (welcome && loggedInUser) {
    welcome.innerHTML = "Welcome, " + loggedInUser + "!";
}

if(logout){
    logout.addEventListener("click", logoutt)
    function logoutt() {
        localStorage.removeItem("loggedInUser");
    }
}


// End sign in

