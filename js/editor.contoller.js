'use strict';

const gCanvas = document.querySelector('#canvas');
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function init2() {
  eventListeners();
}

function eventListeners() {
  window.addEventListener('resize', () => {
    renderEdit();
  });
  emojiEventListeners();
}

function resizeCanvas(img) {
  const elCanvasContainer = document.querySelector('.canvas-container');

  const ratio = img.height / img.width;
  if (img.width < elCanvasContainer.offsetWidth) {
    gCanvas.width = img.width;
    gCanvas.height = img.height;
  } else {
    gCanvas.height = ratio * (elCanvasContainer.offsetWidth - 25);
    gCanvas.width = elCanvasContainer.offsetWidth - 25;
  }
}

function onEditMemeText() {
  const textValue = document.querySelector('.text-zone').value;
  setMemeText(textValue);
  renderEdit();
}
function onEditMemeTextSize(state) {
  state ? setMemeTextSize(5) : setMemeTextSize(-5);
  renderEdit();
}
function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    };
  }
  return pos;
}

function renderEdit() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  const meme = getMeme();
  createImage(meme);
  renderLinesCount();
}

function createImage(meme, isFirstTime = false) {
  if (!meme.loaded) return;
  document.querySelector('.share-meme').classList.remove('share-ready');
  const img = new Image();
  img.src = `img/${meme.selectedImgId}.jpg`;
  resizeCanvas(img);
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    if (isFirstTime) {
      drawText(
        'Enter meme '.toUpperCase(),
        35,
        gElCanvas.width / 2,
        gElCanvas.height / 7,
        'Impact',
      );
      setMemePos(gElCanvas.width / 2, gElCanvas.height / 7);
      resetMemeTextSize();
      renderLinesCount();
    } else {
      meme.lines.forEach((line) =>
        drawText(
          line.txt, //.toUpperCase()
          line.size,
          line.x,
          line.y,
          line.font,
          line.align,
          line.color,
          line.stroke
        )
      );
    }
  };
}

function onSetMemeAlign(side) {
  setMemeAlign(side);
  renderEdit();
}

function renderLinesCount() {
  const meme = getMeme();
  const lineIndicatorLeft = document.querySelector('.line-indicator-left');
  const lineIndicatorRight = document.querySelector('.line-indicator-right');
  lineIndicatorLeft.innerHTML = `${meme.selectedLineIdx + 1}`;
  lineIndicatorRight.innerHTML = `${meme.lines.length}`;
}

function drawText(
  txt,
  size = 35,
  x = gCanvas.width / 2,
  y = gCanvas.height / 2,
  font = 'Impact',
  align = 'center',
  color = 'white',
  stroke = true
) {
  gCtx.beginPath();
  gCtx.textBaseline = 'middle';
  gCtx.textAlign = align;
  gCtx.fillStyle = color;
  gCtx.font = `${size}px ${font}`;
  gCtx.fillText(txt, x, y);
  if (stroke) {
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(txt, x, y);
  }
  gCtx.closePath();
}

function onAddTextLine() {
  const meme = getMeme();
  let y = gElCanvas.height / 2;
  if (meme.lines.length === 1) {
    y = gElCanvas.height / 1.2;
  }
  addTextLine(gElCanvas.width / 2, y);
  renderEdit();
}

function onMoveLine(diff) {
  moveLine(diff);
  renderEdit();
}

function selectLine() {
  const meme = getMeme();
  const lineIndicatorLeft = document.querySelector('.line-indicator-left');
  const textArea = document.querySelector('.text-zone');
  if (meme.lines.length - 1 === meme.selectedLineIdx) {
    setChosenLine(true);
    lineIndicatorLeft.innerHTML = `1`;
  } else {
    setChosenLine(false);
    lineIndicatorLeft.innerHTML = `${meme.selectedLineIdx + 1}`;
  }
  textArea.value = meme.lines[meme.selectedLineIdx].txt;
}

function changeColor() {
  const colorPicker = document.querySelector('.text-color');
  colorPicker.click();
}

function onMemeColorChange() {
  const color = document.querySelector('.text-color').value;
  changeMemeColor(color);
  renderEdit();
}

function onToggleStroke() {
  toggleStroke();
  renderEdit();
}

function emojiEventListeners() {
  const emojis = document.querySelector('.emoji-area').childNodes;
  emojis.forEach((emoji) => {
    emoji.addEventListener('click', () => {
      onAddEmoji(emoji.innerText);
    });
  });
}

function onAddEmoji(emoji) {
  addTextLine(gElCanvas.width / 2, gElCanvas.height / 2, emoji);
  renderEdit();
}

function onDeleteTextLine() {
  deleteTextLine();
  renderEdit();
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'My-MEME';
}

function onSaveMemeToGallery() {
  const data = gElCanvas.toDataURL();
  saveBase64Data(data);
  SaveMemeToGallery();
}



function uploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg');
  const shareBtn = document.querySelector('.share-meme');

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);

    shareBtn.innerHTML = `
        <a class="share-meme" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        Generate share link 
        </a>`;
    
  }
  doUploadImg(imgDataUrl, onSuccess);

}


function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl);
  const shareBtn = document.querySelector('.share-meme');
  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      onSuccess(url);
      shareBtn.classList.add('share-ready')
    })
    .catch((err) => {
      console.error(err);
    });
}
