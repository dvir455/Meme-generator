'use strict';

let gElCanvas;
let gCtx;

window.addEventListener('DOMContentLoaded', () => {
  init();
  init2();
  init3();
  navBarListener();
});

function init() {
  gElCanvas = document.querySelector('#canvas');
  gCtx = gElCanvas.getContext('2d');
  renderGallery();
}

function renderGallery() {
  const gallery = getImgs();
  const itemsContainer = document.querySelector('.gallery-container');
  const strHtmls = gallery.map(
    (item) =>
      `
<div class="div-${item.id}">
<img src="${item.url}" onclick="sendImageToCanvas(${item.id})" class="img img-${item.id}">
</div>
  `
  );
  itemsContainer.innerHTML = strHtmls.join('');
}

function sendImageToCanvas(id) {
  onResetMeme();
  toggleEditor('editor');
  setMemeId(id);
  const meme = getMeme();
  meme.loaded = true;
  createImage(meme, true);
}

function toggleEditor(state) {
  const itemsContainer = document.querySelector('.gallery-container');
  const searchContainer = document.querySelector('.search-bar');
  const memesGalleryContainer = document.querySelector('.memes-gallery');
  const editorContainer = document.querySelector('.editor-container');
  const textArea = document.querySelector('.text-zone');

  switch (state) {
    case 'editor':
      textArea.value = '';
      itemsContainer.style.display = 'none';
      searchContainer.style.display = 'none';
      memesGalleryContainer.style.display = 'none';
      editorContainer.style.display = 'grid';
      break;
    case 'gallery':
      itemsContainer.style.display = 'grid';
      searchContainer.style.display = 'grid';
      memesGalleryContainer.style.display = 'none';
      editorContainer.style.display = 'none';
      break;
    case 'memes':
      itemsContainer.style.display = 'none';
      searchContainer.style.display = 'none';
      editorContainer.style.display = 'none';
      memesGalleryContainer.style.display = 'grid';
      renderMemesGallery();
  }
}

function onResetMeme() {
  resetMeme();
}
function onFilterBy(el) {
  setFilter(el.value);
  renderGallery();
}

function navBarListener() {
  const hamburger = document.querySelector('.hamburger');
  const blackScreen = document.querySelector('.black-screen');
  const navBar = document.querySelector('.nav-bar');
  hamburger.addEventListener('click', () => {
    navBar.classList.toggle('showNav');
    blackScreen.classList.toggle('active-screen');
  }),
    blackScreen.addEventListener('click', () => {
      navBar.classList.toggle('showNav');
      blackScreen.classList.toggle('active-screen');
    });
}
