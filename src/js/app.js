import '../css/app.css';
import { BrickMaker } from '@jamesrock/rockjs';
console.log('bit-draw');

const app = document.querySelector('#app');

const games = [
  []
];

const maker = new BrickMaker('red', 4, 'binary');

maker.addEventListener('result', () => {
  console.log(maker.value);
});

maker.appendTo(app);
