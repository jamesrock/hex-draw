import '../css/app.css';
import { 
  BrickMaker,
  DisplayObject,
  setDocumentHeight,
  makeArray,
  makeBitArray,
  getRandom,
  pluckRandom,
  createHeading,
  createContainer,
  createButton
} from '@jamesrock/rockjs';

setDocumentHeight();

const app = document.querySelector('#app');

const makeActiveArray = (a) => {
  const ref = makeBitArray(4);
  let leftover = a;
  return makeArray(4, (v, i) => {
    if(leftover >= ref[i]) {
      leftover -= ref[i];
      return 1;
    }
    else {
      return 0;
    };
  });
};

const makeActiveMap = () => {
  return makeArray(16, (a, i) => makeActiveArray(i));
};

const activeMap = makeActiveMap();

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

const games = [
  ['0x2260', 'blue'],
  ['0x0470', 'blue'],
  ['0x0644', 'blue'],
  ['0x0E20', 'blue'],
  ['0x4460', 'orange'],
  ['0x0740', 'orange'],
  ['0x0622', 'orange'],
  ['0x02E0', 'orange'],
  ['0x4620', 'green'],
  ['0x0360', 'green'],
  ['0x0462', 'green'],
  ['0x06C0', 'green'],
  ['0x4640', 'purple'],
  ['0x0720', 'purple'],
  ['0x0262', 'pruple'],
  ['0x04E0', 'purple'],
  ['0x2640', 'red'],
  ['0x0630', 'red'],
  ['0x0264', 'red'],
  ['0x0C60', 'red'],
  ['0x0F00', 'cyan'],
  ['0x2222', 'cyan'],
  ['0x0660', 'yellow'],
  ['0x4F44'],
  ['0x0252'],
  ['0x8421'],
  ['0x2F4A'],
  ['0x2F22'],
  ['0x1248'],
  ['0x1668'],
  ['0xE32D'],
  ['0x1CD2'],
  ['0x8661'],
  ['0x55AA'],
  ['0xA5A5'],
  ['0xD0B5'],
  ['0x9669'],
  ['0x500A'],
  ['0x5115'],
  ['0x151F'],
  ['0x9009'],
  ['0x1517'],
  ['0x1515'],
  ['0xA309'],
  ['0xA3C5'],
  ['0x520A'],
  ['0x6FF6'],
  ['0x44F4'],
  ['0x504A'],
  ['0x4C32'],
  ['0x5C3A'],
  ['0x5A5A'],
  ['0xC6F5'],
  ['0x8228'],
  ['0x0208'],
  ['0x22F2'],
  ['0x33CC'],
  ['0xCC33'],
  ['0xC813'],
  ['0xF8BA'],
  ['0x318C'],
  ['0xBBC8'],
  ['0x333F'],
  ['0x509C'],
  ['0xFDF7'],
  ['0x390A'],
  ['0x6996'],
  ['0x6BD6'],
  ['0x6DB6'],
  ['0xC391'],
  ['0x6186'],
  ['0x6816'],
  ['0x0745'],
  ['0x2814'],
  ['0xD707'],
  ['0xAC7C'],
  ['0xAAAA'],
  ['0xB552'],
  ['0xB2C4'],
  ['0xC870'],
  ['0x4AAD'],
  ['0xAFFA'],
  ['0xEE13'],
  ['0x5383'],
  ['0x579E'],
  ['0x4D3B'],
  ['0xA861'],
  ['0x11EC'],
  ['0xA55A'],
  ['0x2552'],
  ['0xB666'],
  ['0x4999'],
  ['0x4AA4'],
  ['0x04A4'],
  ['0xFDBF'],
  ['0x1BA0'],
  ['0xFBDF'],
  ['0xE997'],
  ['0x799E'],
  ['0xAAE0'],
  ['0xEAA0'],
  ['0xEAEA'],
  ['0x9354'],
  ['0xE88E'],
  ['0xC8C8'],
  ['0x5359'],
  ['0xFB5B'],
  ['0x4B49'],
  ['0x0301'],
  ['0x1818'],
  ['0x0B40'],
  ['0x0A50'],
  ['0x2184'],
  ['0xF7F5'],
  ['0xF5F5'],
  ['0x4812'],
  ['0x35AC'],
  ['0xCA53'],
  ['0x080A'],
  ['0x04E4'],
  ['0xFB1B'],
  ['0x0420'],
  ['0x0A0A'],
  ['0x0C30'],
  ['0xBABA'],
  ['0x2664'],
  ['0xD4D0'],
  ['0x0F0F'],
  ['0x1188'],
  ['0xC423'],
  ['0x8001'],
  ['0xC289'],
  ['0x1008'],
  ['0x3050'],
  ['0x6F09'],
  ['0x3FE5'],
  ['0xE30D'],
  ['0x4532'],
  ['0x22C9'],
  ['0xDD36'],
  ['0x1009'],
  ['0xE797'],
  ['0xCFAF'],
  ['0x90F6'],
  ['0x49AE'],
  ['0xD310'],
  ['0xE8B5'],
  ['0xB693'],
  ['0xBACD'],
  ['0x2CEF'],
  ['0xF25A'],
  ['0x3458'],
  ['0x79D6'],
  ['0x2384'],
  ['0xDC7B'],
  ['0xAD42'],
  ['0xCBA7'],
  ['0x52BD'],
  ['0x1CF2'],
  ['0x9278'],
  ['0x0DA5'],
  ['0x4B8B'],
  ['0x6D87'],
  ['0x3884'],
  ['0xB17D'],
  ['0x9008'],
  ['0x4E82'],
  ['0xAE05'],
  ['0x83B0'],
  ['0xE25C'],
  ['0xE985'],
  ['0x167A'],
  ['0xB260'],
  ['0x7C4F'],
  ['0xED39'],
  ['0xC77B'],
  ['0x1DA3'],
  ['0x51FA'],
  ['0xBE8A'],
  ['0x7A8D'],
  ['0xEA45'],
  ['0x12C6'],
  ['0xC948'],
  ['0x496C'],
  ['0x4584'],
  ['0xB474'],
  ['0x4175'],
  ['0x5023'],
  ['0x15BA'],
  ['0x91F9'],
  ['0x8572'],
  ['0x6E06'],
  ['0x36B7'],
  ['0x8629'],
  ['0xB651'],
  ['0xA383'],
  ['0x66FF'],
  ['0x174A'],
  ['0x1868'],
  ['0x3D76'],
  ['0x5C7C'],
  ['0x4D9F'],
  ['0x82AF'],
  ['0x7D50'],
  ['0xAEDE'],
  ['0x5121'],
  ['0x48A2'],
  ['0x5DA7'],
  ['0xA258'],
];

const setValue = (row, value) => {

  activeMap[value].forEach((onOff, i) => {
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
    hideLabels();
    return this;

  };
  getColors() {

    const options = [...colorKeys];
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

const explainer = new Explainer([
  ["HexDraw is an endless game of 16-bit hex code visual representations..."],
  ["It's your job to deciper the codes and draw the correct patterns by tapping squares on the grid above..."],
  ["Ignoring the standard 0x prefix, each digit represents each row of the grid, and each column represents 8, 4, 2 & 1...", () => {
    codeNode.innerHTML = explainer.getCode('0xB474');
    showLabels();
  }],
  ["So, for example, code 0xB474 translates to 11, 4, 7, 4..."],
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
  ["And that's all! Puzzle solved!"],
  ["Any letters are easily converted by counting from 9 — or by memorising each value — and then it’s just a case of filling the correct combination of squares for each row...", () => {
    explainer.setNextButtonLabel('done');
  }],
  ["There are no time limits or scoring systems — it’s very much a casual play-at-your-own-pace affair. Enjoy!"],
]);
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
  
  codeNode.innerText = code;

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

explainer.getColors().forEach((value, i) => {
  document.documentElement.style.setProperty(`--explainer-color-${i+1}`, value);
});

explainer.hide();
