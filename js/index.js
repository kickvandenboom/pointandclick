const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const offsetCharacter = 16;

let playerHasAxe = false;
let treeChoppedDown = false;
let playerHasKey = false;
let playerIsInside = false;

let awaytPlayerConfirm = false;

let awaitYesOrNo = false;

document.getElementById('ground').setAttribute('draggable', false);

gameWindow.onclick = function (e) {

    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left - offsetCharacter;
    var y = e.clientY - rect.top - offsetCharacter;
    mainCharacter.style.left = x + "px";
    mainCharacter.style.top = y + "px";

    console.log(e.target.id);

    switch(e.target.id){
        case "door0" :
        case "axe" : //Axe pickup
            if(!playerHasAxe){
                playerHasAxe = true;
                document.getElementById("title").innerHTML = ("You found an axe and picked it up.") //Updates the title, wanted to make seperate function for it but couldnt figure out how to do function paremeters in js
                document.getElementById("axe").remove();
                document.getElementById("door0").remove();
            }
            break;
        case "door1": case "door3": case "door4": //Wrong trees
            if(playerHasAxe){
                document.getElementById("title").innerHTML = ("The tree is too big to chop down.")
            }else{
                document.getElementById("title").innerHTML = ("Its a large tree.")
            }
            break;
        case "door5": //Right tree
            if(playerHasAxe){
                playerHasKey = true;
                document.getElementById("title").innerHTML = ("You chopped down the tree and a small key fell out.")
                document.getElementById("door5").remove();

                document.getElementById("ground").src="Img/map_2.png"; //Switch background to new image without tree
            }else{
                document.getElementById("title").innerHTML = ("Its a medium sized tree.")
            }
            break;
        case "door2": //Wrong door
            if(playerHasKey){
                document.getElementById("title").innerHTML = ("You hear a voice from behind you wisper `wrong door`.")
            }else{
                document.getElementById("title").innerHTML = ("The door is locked.")
            }
            break;
        case "door6": //Right door
            if(awaytPlayerConfirm){
                playerIsInside = true;
                updateBackground();
            }else{
                if(playerHasKey){
                    document.getElementById("title").innerHTML = ("You swear you have never seen this door before, go in? (Click again to go in)")
                    awaytPlayerConfirm = true;
                }else{
                    document.getElementById("title").innerHTML = ("Theres nothing here")
                }
                break;
            }
    }
}


function updateBackground(){
    if(!playerIsInside){
        document.body.style.backgroundImage = "url(../Img/island_background.png)";
        console.log("player went outside")
    }else{
        document.body.style.backgroundImage = "url(../Img/void.png)";
        document.body.style.backgroundColor = "black";

        document.getElementById("title").remove();
        document.getElementById("ground").remove();
        document.getElementById("mainCharacter").remove();

        finaleSequence();

        console.log("player went inside")
    }
}

function finaleSequence(){
    setTimeout(() => {
        finale1();
    }, 2000);
}

function finale1(){
    document.getElementById("finale1").style.color = "white";
    setTimeout(() => {
        finale2();
    }, 2000)
}

function finale2(){
    document.getElementById("finale2").style.color = "white";
    setTimeout(() => {
        finale3();
    }, 3000)
}

function finale3(){
    document.getElementById("finale3").style.color = "white";
    setTimeout(() => {
        finale4();
    }, 5000)
}

function finale4(){
    document.getElementById("finale4").style.color = "white";
}