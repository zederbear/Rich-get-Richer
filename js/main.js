var defaultGameData = {
    money: 0,
    moneyPerClickUpgrade: {
        moneyPerClick: 1,
        moneyPerClickCost: 10
    },
    speed: 1
}

var gameData = {
    money: 0,
    moneyPerClickUpgrade: {
        moneyPerClick: 1,
        moneyPerClickCost: 10
    },
    speedUpg: {
        speed: 1,
        cost: 50
    }
}



var savegame = JSON.parse(localStorage.getItem("richGetRicherSave"))

if (savegame !== null) {
  gameData = savegame
}

var moneyGained = document.getElementById("money-gained")
var moneyClickCost = document.getElementById("moneyperclickcost")
var multi = document.getElementById("multiplierSpan")
var xpersec = document.getElementById("moneyper")
var printerProgress = document.getElementById("printer-progress-bar")
var fact = true

updateScreen()

function gainMoney() {
    gameData.money += gameData.moneyPerClickUpgrade.moneyPerClick * Math.pow(1.0001, gameData.money)
    updateScreen()
}

var totalPercent = 0;

var autoMoney = window.setInterval(function() {
    if (!fact) {
        gainMoney()
        fact = true
    } else {
        totalPercent += gameData.speedUpg.speed 
        printerProgress.style.width = totalPercent + "%"
        if (totalPercent >= 100) {
            printerProgress.style.width = "0%"
            totalPercent = 0
            fact = false
        }
    }

}, 10)

function buySpeedUpg() {

}

function buyMoneyPerClick() {
    if (gameData.money >= gameData.moneyPerClickUpgrade.moneyPerClickCost) {
        gameData.money -= gameData.moneyPerClickUpgrade.moneyPerClickCost
        gameData.moneyPerClickUpgrade.moneyPerClick += 1
        gameData.moneyPerClickUpgrade.moneyPerClickCost *= 1.5
        updateScreen()
    }
}

function resetGameData() {
    gameData = defaultGameData
    updateScreen()
}

function updateScreen() {
    moneyClickCost.innerHTML = "Cost: " + gameData.moneyPerClickUpgrade.moneyPerClickCost
    moneyGained.innerHTML = Math.round(gameData.money)
    multi.innerHTML = (Math.round(Math.pow(1.0001, gameData.money)*100))/100
    xpersec.innerHTML = (Math.round((gameData.moneyPerClickUpgrade.moneyPerClick * Math.pow(1.0001, gameData.money) * gameData.speedUpg.speed)*100))/100
}

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("richGetRicherSave", JSON.stringify(gameData))
}, 15000)

