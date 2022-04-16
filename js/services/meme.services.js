'use strict';
let gImgs = [
  {
    id: 1,
    url: 'img/1.jpg',
    keywords: ['funny', 'happy'],
  },
  {
    id: 2,
    url: 'img/2.jpg',
    keywords: ['funny', 'angry'],
  },
  {
    id: 3,
    url: 'img/3.jpg',
    keywords: ['cute', 'dog'],
  },
  {
    id: 4,
    url: 'img/4.jpg',
    keywords: ['babe', 'dog'],
  },
  {
    id: 5,
    url: 'img/5.jpg',
    keywords: ['baby', 'angry'],
  },
  {
    id: 6,
    url: 'img/6.jpg',
    keywords: ['sleep', 'cat'],
  },
  {
    id: 7,
    url: 'img/7.jpg',
    keywords: ['funny', 'hat'],
  },
  {
    id: 8,
    url: 'img/8.jpg',
    keywords: ['baby', 'evil'],
  },
  {
    id: 9,
    url: 'img/9.jpg',
    keywords: ['israeli', 'funny'],
  },
  {
    id: 10,
    url: 'img/10.jpg',
    keywords: ['angry', 'man'],
  },
  {
    id: 11,
    url: 'img/11.jpg',
    keywords: ['funny', 'men'],
  },
  {
    id: 12,
    url: 'img/12.jpg',
    keywords: ['evil', 'bold'],
  },
  {
    id: 13,
    url: 'img/13.jpg',
    keywords: ['baby', 'black'],
  },
  {
    id: 14,
    url: 'img/14.jpg',
    keywords: ['president', 'angry'],
  },
  {
    id: 15,
    url: 'img/15.jpg',
    keywords: ['funny', 'baby'],
  },
  {
    id: 16,
    url: 'img/16.jpg',
    keywords: ['president', 'funny'],
  },
  {
    id: 17,
    url: 'img/17.jpg',
    keywords: ['homo', 'kissing'],
  },
  {
    id: 18,
    url: 'img/18.jpg',
    keywords: ['gentlemen', 'famous'],
  },
  {
    id: 19,
    url: 'img/19.jpg',
    keywords: ['glasses', 'angry'],
  },
  {
    id: 20,
    url: 'img/20.jpg',
    keywords: ['funny', 'men'],
  },
  {
    id: 21,
    url: 'img/21.jpg',
    keywords: ['women', 'red'],
  },
  {
    id: 22,
    url: 'img/22.jpg',
    keywords: ['evil', 'funny'],
  },
  {
    id: 23,
    url: 'img/23.jpg',
    keywords: ['president', 'russia'],
  },
  {
    id: 24,
    url: 'img/24.jpg',
    keywords: ['toy', 'hero'],
  },
];
let memesGallery = [];

let filterBy = '';

let gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Enter MEME',
      size: 35,
      color: 'red',
      x: 0,
      y: 0,
      font: 'Impact',
      align: 'center',
      stroke: true,
    },
  ],
  base64: '',
  loaded: false,
};


function init3(){
  getMemesGallery()
}


function SaveMemeToGallery(){
  memesGallery.push(gMeme);
  _saveToStorage()
}

function getMemesGallery(){
  var memesDB = _loadFromStorage()
  if(!memesDB) return memesGallery;
  memesGallery = memesDB;
  return memesGallery;
}

function resetMeme() {
  gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'Enter MEME',
        size: 35,
        align: 'center',
        color: 'white',
        x: 0,
        y: 0,
        font: 'Impact',
        stroke: true,
      },
    ],
    base64: ''
  };
}

function setMemeAlign(side) {
  gMeme.lines[gMeme.selectedLineIdx].align = side;
}

function resetMemeTextSize() {
  gMeme.lines[0].size = 35;
}

function getImgs() {
  if (!filterBy) return gImgs;

  let filtered = gImgs.filter(
    (img) =>
      img.keywords[0].includes(filterBy) || img.keywords[1].includes(filterBy)
  );

  return filtered;
}
function getMeme() {
  return gMeme;
}

function setMemeId(id) {
  gMeme.selectedImgId = id;
}

function setMemePos(x, y) {
  const selectedLine = gMeme.selectedLineIdx;
  gMeme.lines[selectedLine].x = x;
  gMeme.lines[selectedLine].y = y;
}

function setMemeText(txt) {
  const selectedLine = gMeme.selectedLineIdx;
  gMeme.lines[selectedLine].txt = txt;
}
function setMemeTextSize(dif) {
  const selectedLine = gMeme.selectedLineIdx;
  gMeme.lines[selectedLine].size += dif;
}

function addTextLine(x, y, txt = 'MEME LINE') {
  gMeme.lines.push({
    txt: txt,
    size: 35,
    color: 'white',
    x,
    y,
    font: 'Impact',
    align: 'center',
    stroke: true,
  });
}

function setFont(font){
gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setChosenLine(state) {
  state ? (gMeme.selectedLineIdx = 0) : gMeme.selectedLineIdx++;
}

function moveLine(diff) {
  gMeme.lines[gMeme.selectedLineIdx].y += diff;
}

function changeMemeColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function toggleStroke() {
  const stroke = gMeme.lines[gMeme.selectedLineIdx].stroke;
  gMeme.lines[gMeme.selectedLineIdx].stroke = !stroke;
}

function deleteTextLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function setFilter(by) {
  filterBy = by;
}

function saveBase64Data(base64){
  gMeme.base64 = base64
}

function _saveToStorage(){
  saveToStorage('memeDB', memesGallery)
}
function _loadFromStorage(){
 return loadFromStorage('memeDB')
}