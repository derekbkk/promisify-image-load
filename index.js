'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const imgContainer = document.querySelector('.images');
let currentImg;

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise.
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    // 2. This then creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path.
    const img = document.createElement('img');
    img.src = imgPath;

    // 3. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself.
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    // 4. In case there is an error loading the image ('error' event), reject the promise. Consume the promise using .then and also add an error handler;
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    // 5. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
    return wait(2);
  })
  .then(() => {
    // 6. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    // 7. After the second image has loaded, pause execution for 2 seconds again;
    return wait(2);
  })
  .then(() => {
    // 8. After the 2 seconds have passed, hide the current image.
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .catch(err => console.log(err));
