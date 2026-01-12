let balance = 250;
let price = 1.1000;
let botActive = false;
let botInterval = null;

const balanceEl = document.getElementById("balance");
const priceEl = document.getElementById("price");
const historyEl = document.getElementById("history");
const botStatus = document.getElementById("botStatus");
const botBtn = document.getElementById("botBtn");

function updateUI() {
  balanceEl.textContent = balance.toFixed(2);
  priceEl.textContent = price.toFixed(4);
}

setInterval(() => {
  price += (Math.random() - 0.5) * 0.002;
  updateUI();
}, 1000);

function log(text) {
  const li = document.createElement("li");
  li.textContent = text;
  historyEl.prepend(li);
}

function buy() {
  let amt = +amount.value;
  if (amt > balance || amt <= 0) return;
  balance -= amt;
  log("BUY " + amt + "€");
  updateUI();
}

function sell() {
  let amt = +amount.value;
  balance += amt;
  log("SELL " + amt + "€");
  updateUI();
}

// OPZIONI
function call() {
  option("CALL");
}

function put() {
  option("PUT");
}

function option(type) {
  let entry = price;
  let stake = 20;
  log(type + " aperta");

  setTimeout(() => {
    let win =
      (type === "CALL" && price > entry) ||
      (type === "PUT" && price < entry);

    if (win) {
      balance += stake * 1.8;
      log("✅ Opzione vinta");
    } else {
      balance -= stake;
      log("❌ Opzione persa");
    }
    updateUI();
  }, 30000);
}

// BOT
function toggleBot() {
  botActive = !botActive;

  if (botActive) {
    botStatus.textContent = "ON";
    botBtn.textContent = "DISATTIVA BOT";
    botInterval = setInterval(botTrade, 6000);
  } else {
    botStatus.textContent = "OFF";
    botBtn.textContent = "ATTIVA BOT";
    clearInterval(botInterval);
  }
}

function botTrade() {
  let r = Math.random();
  if (r < 0.5) call();
  else put();
  log("🤖 Bot trade");
}

// IMPOSTAZIONI
function deposit() {
  balance += 100;
  log("💰 Deposito demo +100€");
  updateUI();
}

function withdraw() {
  if (balance >= 50) {
    balance -= 50;
    log("🏧 Prelievo demo -50€");
    updateUI();
  }
}

function resetAccount() {
  balance = 250;
  log("♻️ Account demo resettato");
  updateUI();
}

updateUI();
