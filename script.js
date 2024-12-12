const animals = ["tigre", "leão", "elefante", "galo", "cobra", "urso"];
let wallet = 0; // Saldo inicial definido pelo usuário

const betAnimal = document.getElementById("betAnimal");
const betAmount = document.getElementById("betAmount");
const placeBetButton = document.getElementById("placeBet");
const drawButton = document.getElementById("draw");
const reloadForm = document.getElementById("reloadForm");
const reloadAmount = document.getElementById("reloadAmount");
const drawnAnimalDiv = document.getElementById("drawnAnimal");
const playerResultDiv = document.getElementById("playerResult");
const walletDiv = document.getElementById("wallet");

walletDiv.textContent = `Saldo: R$${wallet.toFixed(2)}`;

let currentBet = { animal: null, amount: 0 };

reloadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(reloadAmount.value);
  if (amount && amount > 0) {
    wallet += amount;
    walletDiv.textContent = `Saldo: R$${wallet.toFixed(2)}`;
    reloadAmount.value = "";
    placeBetButton.disabled = false;
  } else {
    alert("Por favor, insira um valor válido para recarregar.");
  }
});

placeBetButton.addEventListener("click", () => {
  const selectedAnimal = betAnimal.value;
  const amount = parseFloat(betAmount.value);

  if (!amount || amount <= 0) {
    playerResultDiv.textContent = "Por favor, insira um valor válido para a aposta!";
    return;
  }

  if (amount > wallet) {
    playerResultDiv.textContent = "Saldo insuficiente!";
    return;
  }

  currentBet = { animal: selectedAnimal, amount };
  playerResultDiv.textContent = `Aposta feita: R$${amount.toFixed(2)} no ${selectedAnimal}. Clique em Sortear!`;
  drawButton.disabled = false;
});

drawButton.addEventListener("click", () => {
  const drawnAnimal = animals[Math.floor(Math.random() * animals.length)];
  drawnAnimalDiv.textContent = `Animal Sorteado: ${drawnAnimal}`;

  if (currentBet.animal === drawnAnimal) {
    const winnings = currentBet.amount * 5;
    wallet += winnings;
    playerResultDiv.textContent = `Parabéns! Você ganhou R$${winnings.toFixed(2)}!`;
  } else {
    wallet -= currentBet.amount;
    playerResultDiv.textContent = `Você perdeu! Tente novamente.`;
  }

  walletDiv.textContent = `Saldo: R$${wallet.toFixed(2)}`;

  if (wallet <= 0) {
    playerResultDiv.textContent = "Você ficou sem saldo! Recarregue para continuar jogando.";
    placeBetButton.disabled = true;
  }

  drawButton.disabled = true;
});
