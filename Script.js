window.addEventListener('load', () => {
  const cells = document.querySelectorAll('[data-cell]');
  const message = document.getElementById('message');
  const restartButton = document.getElementById('restartButton');

  let currentPlayer = 'X';
  let gameActive = true;

  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      message.textContent = `${currentPlayer} Wins! 🎉`;
      gameActive = false;
      return;
    }

    if (isDraw()) {
      message.textContent = "It's a Draw! 🤝";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWin(player) {
    return winningCombinations.some(combination => {
      return combination.every(index => cells[index].textContent === player);
    });
  }

  function isDraw() {
    return [...cells].every(cell => cell.textContent === 'X' || cell.textContent === 'O');
  }

  function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
  }

  cells.forEach(cell => cell.addEventListener('click', handleClick));
  restartButton.addEventListener('click', restartGame);
});