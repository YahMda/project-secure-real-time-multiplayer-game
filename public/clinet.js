// Di file client.js
const speed = 5; // Kecepatan gerak

window.addEventListener('keydown', (e) => {
  let direction = '';
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      direction = 'up';
      break;
    case 'ArrowDown':
    case 's':
      direction = 'down';
      break;
    case 'ArrowLeft':
    case 'a':
      direction = 'left';
      break;
    case 'ArrowRight':
    case 'd':
      direction = 'right';
      break;
  }

  if (direction) {
    // Kirim event 'playerMove' ke server
    socket.emit('playerMove', { direction, speed });
  }

// Terima update dari server
socket.on('updateState', (state) => {
  // state berisi { players, collectibles }
  drawGame(state.players, state.collectibles);
});

socket.on('updatePlayers', (players) => {
  // Anda mungkin perlu menggabungkan ini dengan state collectibles
  // atau minta server selalu kirim state lengkap
  // Untuk simpelnya:
  drawGame(players, []); // Asumsi collectibles tidak update
});

function drawGame(players, collectibles) {
  // Bersihkan canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // 3. Gambar semua player (avatar)
  players.forEach(player => {
    context.fillStyle = (player.id === socket.id) ? 'green' : 'blue'; // Bedakan player sendiri
    context.beginPath();
    context.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
    context.fill();
    
    // Tampilkan skor atau rank
    context.fillStyle = 'black';
    context.fillText(`Skor: ${player.score}`, player.x + 15, player.y);
  });
  
  // Gambar semua collectibles
  collectibles.forEach(item => {
    context.fillStyle = 'gold';
    context.beginPath();
    context.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
    context.fill();
  });
}
});