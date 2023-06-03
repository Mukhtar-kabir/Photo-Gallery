'use strict';
const btn = document.querySelector('#btn');
const errorMessageEl = document.querySelector('#errorMessage');
const galleryEl = document.querySelector('#gallery');

const fetchImage = async function () {
  console.log('CLICK');
  const inputValue = +document.querySelector('.input').value;

  if (!inputValue) {
    errorMessageEl.textContent = 'Relax abeg, no input!';
    errorMessageEl.style.display = 'block';
    return;
  } else if (inputValue > 10 || inputValue < 1) {
    errorMessageEl.textContent = 'Number should be between 1 and 10';
    errorMessageEl.style.display = 'block';
    return;
  }

  // console.log(inputValue);

  let html = '';

  try {
    btn.style.display = 'none';
    const loader = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loader;
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${
        Math.round(Math.random()) * 1000
      }&client_id=2TFSA-jykygqWCLaRPcPB0NTDSjr90cZsOzDJ0gTdGA`
    ).then((res) =>
      res.json().then((data) => {
        data.forEach((pic) => {
          html += `
          <img src="${pic.urls.small}" alt="image" />
          `;
        });
        console.log(data);
        galleryEl.style.display = 'block';
        btn.style.display = 'block';
        errorMessageEl.style.display = 'none';
        galleryEl.innerHTML = html;
      })
    );
  } catch (error) {
    console.error(error);
    console.err(`${err.status}`);
    errorMessageEl.textContent = 'block';
    errorMessageEl.textContent = 'An error happend, try again later!';
    btn.style.display = 'block';
    galleryEl.style.display = 'none';
  }
};

btn.addEventListener('click', fetchImage);
