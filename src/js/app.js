import '../css/app.css';
import { 
  BrickMaker,
  DisplayObject,
  setDocumentHeight,
  makeArray,
  makeBitMap,
  getRandom,
  pluckRandom,
  createHeading,
  createContainer,
  createButton
} from '@jamesrock/rockjs';
import { games } from './games';

setDocumentHeight();

const app = document.querySelector('#app');

const bitMap = makeBitMap(4);

const colors = {
  red: 'rgb(237, 0, 73)',
  yellow: 'gold',
  green: '#3dc932',
  purple: '#b131ed',
  orange: 'rgb(255,125,0)',
  cyan: 'cyan',
  blue: 'rgb(0, 111, 222)'
};

const colorKeys = Object.keys(colors);

const setValue = (row, value) => {

  bitMap[value].forEach((onOff, i) => {
    setTimeout(() => {
      maker.node.querySelector(`[data-y="${row}"][data-x="${i}"]`).dataset.active = onOff ? 'Y' : 'N';
    }, 250*(i+1));
  });

};

const showLabels = () => {
  
  maker.setColor(colors.purple);
  maker.node.dataset.labels = true;

};

const hideLabels = () => {
  
  maker.node.dataset.labels = false;

};

const setCode = (code) => {
  codeNode.innerHTML = code;
};

const setExplainerColors = () => {
  
  explainerColors.forEach((value, i) => {
    document.documentElement.style.setProperty(`--explainer-color-${i+1}`, value);
  });

  document.documentElement.style.setProperty(`--explainer-prefix-opacity`, 0.25);

};

const resetExplainerColors = () => {
  
  explainerColors.forEach((value, i) => {
    document.documentElement.style.removeProperty(`--explainer-color-${i+1}`);
  });

  document.documentElement.style.removeProperty(`--explainer-prefix-opacity`);

};

class Explainer extends DisplayObject {
  constructor(prompts) {

    super();

    this.prompts = prompts;

    const promptNode = this.node = createContainer('prompt');
    const promptBodyNode = this.promptBodyNode = createContainer('prompt-body');
    const promptFootNode = this.promptFootNode = createContainer('prompt-foot');
    const promptNextBtn = this.promptNextBtn = createButton('next');

    promptNode.appendChild(promptBodyNode);
    promptNode.appendChild(promptFootNode);
    promptFootNode.appendChild(promptNextBtn);

    promptNextBtn.addEventListener('click', () => {
      this.show();
    });

  };
  show() {

    if(this.step === this.prompts.length) {
      this.hide();
      return;
    };

    this.node.dataset.active = true;

    const data = this.prompts[this.step];

    this.promptBodyNode.innerHTML = data[0];

    if(data[1]) {
      data[1]();
    };
    
    this.step ++;
    return this;
    
  };
  hide() {
    
    this.node.dataset.active = false;
    newGame();
    return this;

  };
  getColors() {

    const options = ['blue', 'orange', 'green', 'red'];
    return makeArray(4, () => colors[pluckRandom(options)]);

  };
  reset() {
    
    this.step = 0;

  };
  getCode(hex) {
    
    let out = '<span class="prefix">0x</span>';
    const split = hex.split('');
    makeArray(4).forEach((a) => {
      out += `<span class="col-${a+1}">${split[a+2]}</span>`;
    });
    return out;
    
  };
  setNextButtonLabel(label) {
    
    this.promptNextBtn.innerText = label;
    return this;

  };
  step = 0;
};

const explainerCode = '0xB474';
const explainer = new Explainer([
  ["HexDraw is an endless game of 16-bit hex code visual representations...", () => {
    setCode(explainer.getCode(explainerCode));
  }],
  ["It's your job to deciper the codes and draw the correct patterns by tapping squares on the grid above..."],
  ["Hex values run from 0-9, and from 10 onwards, each number is represented by letters A-F, with A representing 10, B 11, C 12, D 13, E 14 & F 15..."],
  ["Ignoring the standard 0x prefix, each digit represents each row of the grid, and each column represents 8, 4, 2 & 1...", () => {
    setExplainerColors();
    showLabels();
  }],
  [`So, for example, code ${explainerCode} translates to 11, 4, 7, 4...`],
  ["Translated to the grid, the top row would require three squares to be filled: 8, 2 & 1 — totalling 11...", () => {
    setValue(0, 11);
  }],
  ["The second row would require just one square to be filled: 4...", () => {
    setValue(1, 4);
  }],
  ["The third row requires three squares to be filled: 4, 2 & 1...", () => {
    setValue(2, 7);
  }],
  ["And the last row, same as the second, requires just one square: 4...", () => {
    setValue(3, 4);
  }],
  ["And that's all! Puzzle solved!", () => {
    resetExplainerColors();
    hideLabels();
  }],
  ["Any letters are easily converted by counting from 9 — or by memorising each value — and then it’s just a case of filling the correct combination of squares for each row..."],
  ["There are no time limits or scoring systems — it’s very much a casual play-at-your-own-pace affair. Enjoy!", () => {
    explainer.setNextButtonLabel('done');
  }],
]);
const explainerColors = explainer.getColors();
const maker = new BrickMaker({type: 'binary', scale: 45, gap: 2});
const codeNode = createHeading(1, '{code}');
const buttons = createContainer('buttons');
const randomiseBtn = createButton('randomise');
const invertBtn = createButton('invert');
const tutorialBtn = createButton('Explainer', 'explainer');

let randomise = false;
let game = null;
let code = null;
let color = null;

const newGame = () => {

  if(randomise) {
    
    maker.randomise();
    code = maker.value;
    color = getRandom(colorKeys);

  }
  else {

    game = getRandom(games);
    code = game[0];
    color = game[1] || getRandom(colorKeys);

  };

  console.log(randomise ? 'randomised' : 'from set');
  
  setCode(code);

  maker.setColor(color).clear();

  randomise = !randomise;

};

newGame();

maker.addEventListener('result', () => {
  console.log(maker.value);
  if(maker.value===code) {
    setTimeout(() => {
      newGame();
    }, 500);
  };
});

randomiseBtn.addEventListener('click', () => {
  maker.randomise();
});

invertBtn.addEventListener('click', () => {
  maker.invert();
});

tutorialBtn.addEventListener('click', () => {

  explainer.reset();
  explainer.show();

});

app.appendChild(codeNode);
maker.appendTo(app);
app.appendChild(tutorialBtn);
explainer.appendTo(app);

buttons.appendChild(randomiseBtn);
buttons.appendChild(invertBtn);
// app.appendChild(buttons);

explainer.hide();
