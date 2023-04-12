import Phaser from 'phaser';

var width = window.screen.availWidth;
var height = window.screen.availHeight * window.devicePixelRatio;

export default {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor: '#000000',
  parent: 'game',
  physics: {
    default: 'arcade',
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
