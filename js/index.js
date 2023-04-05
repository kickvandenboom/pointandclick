const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const offsetCharacter = 16;

const humblemanAudio = document.getElementById("humblemanAudio");
const characterAudio = document.getElementById("characterAudio");

const title = document.getElementById("title")

let inventory = [];
const inventoryList = document.getElementById("inventoryList");

let playerHasAxe = false;
let treeChoppedDown = false;
let playerHasKey = false;

let currentAreaID = 1; //GAME AREAS: 1=OUTSIDE 2=HUMBLEROOM


let awaytPlayerConfirm = false;

document.getElementById('ground').setAttribute('draggable', false);

function onLoad(){
    let hilariousValue = Math.random() * 100;
    console.log(hilariousValue);

    if(hilariousValue < 11){

        document.getElementById("what").classList.toggle("humbleDoorInvis");
        humbleroomSpawn = true;
    }
}

gameWindow.onclick = function (e) {

    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left - offsetCharacter;
    var y = e.clientY - rect.top - offsetCharacter;
    mainCharacter.style.left = x + "px";
    mainCharacter.style.top = y + "px";

    console.log(e.target.id);

    switch(currentAreaID){
        case 1: //OUTSIDE ROOM SWITCHES
            switch(e.target.id){
                case "door0" :
                case "axe" : //Axe pickup
                    if(!playerHasAxe){
                        playerHasAxe = true;
                        updateTitle("You found an axe and picked it up.", characterAudio)
                        document.getElementById("axe").remove();
                        document.getElementById("door0").remove();

                        getItem("an Axe", "anAxe");
                    }
                    break;
                case "door1": case "door3": case "door4": //Wrong trees
                    if(playerHasAxe){
                        updateTitle("The tree is too big to chop down.", characterAudio)
                    }else{
                        updateTitle("Its a large tree.", characterAudio)
                    }
                    break;
                case "door5": //Right tree
                    if(playerHasAxe){
                        playerHasKey = true;
                        updateTitle("You chopped down the tree and a small key fell out.", characterAudio)
                        document.getElementById("door5").remove();
        
                        document.getElementById("ground").src="Img/map_2.png"; //Switch background to new image without tree
                        document.getElementById("foreGround").src="Img/map_2_foreground.png"; //Switch foreground to new image without tree

                        getItem("Small Key", "smallKey");
                    }else{
                        updateTitle("Its a medium sized tree.", characterAudio)
                    }
                    break;
                case "door2": //Wrong door
                    if(playerHasKey){
                        updateTitle("You hear a voice from behind you wisper `wrong door`.", characterAudio)
                    }else{
                        updateTitle("The door is locked.", characterAudio)
                    }
                    break;
                case "what": //Humble room door
                    goToHumbleRoom();
                    break;
                case "door6": //Right door
                    if(awaytPlayerConfirm){
                        playerIsInside = true;
                        goInside();
                    }else{
                        if(playerHasKey){
                            updateTitle("You swear you have never seen this door before, go in? (Click again to go in)", characterAudio)
                            awaytPlayerConfirm = true;
                        }else{
                            updateTitle("Theres nothing here", characterAudio)
                        }
                    break;
                    }
            }
            break;
        case 2: //HUMBLE ROOM SWITCHES
            switch(e.target.id){
                case "humbleMan":
                    document.getElementById("humbleMan").src="Img/humble_man_disapear.gif";
                    playSound(humblemanAudio);
                    setTimeout(function(){
                        humbleManDissapear();
                    }, 500);
                    break;
            }
            break;
    }


}

function playSound(targetSound){
    targetSound.play();
}

function updateTitle(newTitle, targetSound){
    targetSound.play();
    title.innerHTML = (newTitle)
}

function goToHumbleRoom(){
    currentAreaID = 2; //Update current room ID

    if(!playerHasAxe){
        document.getElementById("axe").remove();
    }

    document.getElementById("ground").src="Img/humbleroom.png"; //Switch background to humble room image
    document.getElementById("foreGround").remove();
    document.getElementById("what").remove();

    document.getElementById("humbleMan").classList.toggle("humbleDoorInvis");

    title.innerHTML = (" ")

}

function humbleManDissapear(){
    document.getElementById("humbleMan").remove();

    if(playerHasAxe){
        document.getElementById("ground").src="Img/map_fallofthelastwizard.png";
        updateTitle("The strange man took you to a paralell universe, there seems to be no way out.", characterAudio)
    }
}

function goInside(){
    document.getElementById("foreGround").remove();
    document.getElementById("ground").remove();
    document.getElementById("what").remove();
    document.getElementById("title").remove();
    document.getElementById("mainCharacter").remove();
    document.getElementById("invetoryBox").remove();

    playSound(endingAudio)

    setTimeout(function(){
        endingTextAppear();
    }, 6500);
}

function endingTextAppear(){
    document.getElementById("endtext").classList.toggle("humbleDoorInvis");
}

function getItem(itemName, itemId) {
    if (!checkItem(itemName)) {
        inventory.push(itemName);
        showItem(itemName, itemId);
    }

}

function checkItem(item) {
    return inventory.includes(item);
}

function showItem(itemName, itemId) {
    let listItem = document.createElement("li");
    listItem.id = itemId;
    listItem.appendChild(document.createTextNode(itemName));
    inventoryList.appendChild(listItem);
}

function removeItem(itemName, itemId) {
    inventory = inventory.filter(function (newInventory) {
        return newInventory !== itemName;
    });
    document.getElementById(itemId).remove();

}

window.onload = onLoad;