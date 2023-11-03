var gameData = {
    money: 0,
    moneyPerClick: 1,
    moneyPerClickCost: 10
}

var savegame = JSON.parse(localStorage.getItem("richGetRicherSave"))

if (savegame !== null) {
  gameData = savegame
}

var moneyGained = document.getElementById("money-gained")
var moneyClickCost = document.getElementById("moneyperclickcost")
var multi = document.getElementById("multiplierSpan")

moneyGained.innerHTML = Math.round(gameData.money)
moneyClickCost.innerHTML = "Cost: " + gameData.moneyPerClickCost
multi.innerHTML = (Math.round(Math.pow(1.00005, gameData.money)*100))/100

function gainMoney() {
    gameData.money += gameData.moneyPerClick * Math.pow(1.00005, gameData.money)
    moneyGained.innerHTML = Math.round(gameData.money)
    multi.innerHTML = (Math.round(Math.pow(1.00005, gameData.money)*100))/100
}

function buyMoneyPerClick() {
    if (gameData.money >= gameData.moneyPerClickCost) {
        gameData.money -= gameData.moneyPerClickCost
        gameData.moneyPerClick += 1
        gameData.moneyPerClickCost *= 2
        moneyClickCost.innerHTML = "Cost: " + gameData.moneyPerClickCost    
        moneyGained.innerHTML = Math.round(gameData.money)  
        multi.innerHTML = (Math.round(Math.pow(1.00005, gameData.money)*100))/100
    }
}

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("richGetRicherSave", JSON.stringify(gameData))
}, 15000)

