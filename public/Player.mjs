// ...existing code...
class Player {
  constructor({ id, x = 0, y = 0, score = 0, radius = 10 } = {}) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.score = score;
    this.radius = radius;
  }

  movePlayer(direction, speed = 1) {
    if (typeof speed !== 'number' || Number.isNaN(speed)) speed = 1;

    switch (direction) {
      case 'up':
        this.y -= speed;
        break;
      case 'down':
        this.y += speed;
        break;
      case 'left':
        this.x -= speed;
        break;
      case 'right':
        this.x += speed;
        break;
      default:
        // unknown direction — do nothing
        break;
    }
  }

  collision(item = {}) {
    const itemX = Number(item.x) || 0;
    const itemY = Number(item.y) || 0;
    const itemRadius = Number(item.radius) || 5;

    const distance = Math.hypot(this.x - itemX, this.y - itemY);
    return distance < (this.radius + itemRadius);
  }

  calculateRank(players = []) {
    if (!Array.isArray(players) || players.length === 0) {
      return `Rank: 1/1`;
    }

    const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
    const currentRanking = sortedPlayers.findIndex(player => player.id === this.id) + 1;
    const totalPlayers = players.length;

    return `Rank: ${currentRanking}/${totalPlayers}`;
  }
}

export default Player;
// ...existing code...