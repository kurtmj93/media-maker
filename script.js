let welcomePage = document.querySelector("#welcomePage")
let feed = document.querySelector("#feed");
let profile = document.querySelector("#profile");


document.querySelector("#signInButton").onclick = function(){
    welcomePage.style.display = "none";
};

document.querySelector("#createAccountButton").onclick = function(){
    welcomePage.style.display = "none";
};



document.querySelector("#smiley").onclick = function(){
    feed.style.display = "none";
    profile.style.display = "block";
};

document.querySelector("#newspaper").onclick = function(){
    feed.style.display = "block";
    profile.style.display = "none";
};

document.querySelector("#x").onclick = function(){
    location.reload();
};



batman = document.querySelector("#batmantwo");
superman = document.querySelector("#supermantwo");
greenlantern = document.querySelector("#greenlanterntwo");

function batmanBorder () {
    batman.classList.toggle("border");
};

batman.addEventListener("click", batmanBorder);