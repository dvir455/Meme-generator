'use strict'


function renderMemesGallery(){
const memes = getMemesGallery()
const memesContainer = document.querySelector('.memes-gallery');
const strHtmls = memes.map(
  (item) =>
    `
<div class="meme-card">
<img src="${item.base64}" class="meme-card" >
</div>
`
);
memesContainer.innerHTML = strHtmls.join('');
}

