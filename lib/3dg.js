const { createCanvas } = require('node-canvas-webgl');
const THREE = require('three');

class _3d {
  constructor(width, height) {
    this.width = width, this.height = height;
    this.scene = new THREE.Scene();
    this.image = createCanvas(width, height);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.image
    });
    THREE.renderer = this.renderer;
    THREE.image = this.image;
    THREE.scene = this.scene;
    return THREE;
  }
}

module.exports = _3d;
