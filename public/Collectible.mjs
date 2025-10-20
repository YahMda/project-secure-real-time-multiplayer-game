class Collectible {
  constructor({ id, x, y, value, radius }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.value = value || 1; // Skor yang didapat jika diambil
    this.radius = radius || 5; // Ukuran item
  }
}

try {
  module.exports = Collectible;
} catch(e) {}

export default Collectible;
