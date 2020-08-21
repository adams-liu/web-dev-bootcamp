var randomNumber1 = Math.floor(Math.random()*6+1);
var randomNumber2 = Math.floor(Math.random()*6+1);

x = document.querySelector(".img1").getAttribute("src");

document.querySelector(".img1").setAttribute("src","/images/dice"+randomNumber1+".png"); 
document.querySelector(".img2").setAttribute("src","/images/dice"+randomNumber2+".png"); 


if (randomNumber1>randomNumber2){
    var winner = "🚩 Player 1 wins!";
}
else if (randomNumber1<randomNumber2){
    var winner = "Player 2 wins! 🚩";
}
else{
    var winner = "Draw!";
}

document.querySelector(".container h1").innerHTML = winner;


console.log(x);