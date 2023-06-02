const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
const container2 = document.getElementById('container2');
const canvas2 = document.getElementById('canvas2');
const file2 = document.getElementById('fileupload2');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
let audioSource1, analyser1;
let audioSource2, analyser2;
let visualisationcolor='white';
let backgroundcolor='black';
let visualisationcolor2='white';
//let canvas2color='black';

//Colour Picker 1 code

const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('change', handleColorChange);

function handleColorChange() {
  visualisationcolor = colorPicker.value;
}

const bccolorPicker = document.getElementById('bccolorPicker');
bccolorPicker.addEventListener('change', handleBackgroundColorChange);

function handleBackgroundColorChange() {
  const backgroundColor = bccolorPicker.value;
  canvas.style.backgroundColor = backgroundColor;
} 

//Visualiser 1

container.addEventListener('change', function () {
  const audio1 = document.getElementById('audio1');
  const audioContext1 = new AudioContext();
  audio1.play();
  audioSource1 = audioContext1.createMediaElementSource(audio1);
  analyser1 = audioContext1.createAnalyser();
  audioSource1.connect(analyser1);
  analyser1.connect(audioContext1.destination);
  analyser1.fftSize = 64;
  const bufferLength = analyser1.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / bufferLength;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser1.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      ctx.fillStyle = visualisationcolor;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();
});

file.addEventListener('change', function () {
  const audio1 = document.getElementById('audio1');
  audio1.src = URL.createObjectURL(file.files[0]);
  audio1.load();
  audio1.play();

  const audioContext1 = new AudioContext();
  audioSource1 = audioContext1.createMediaElementSource(audio1);
  analyser1 = audioContext1.createAnalyser();
  audioSource1.connect(analyser1);
  analyser1.connect(audioContext1.destination);
  analyser1.fftSize = 512;
  const bufferLength = analyser1.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = (canvas.width / bufferLength) *5.8;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser1.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]*1.5;
      ctx.fillStyle = visualisationcolor;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();
});

// 

//Colour Picker 2 code

const bccolorPicker2 = document.getElementById('bccolorPicker2');
bccolorPicker2.addEventListener('change', handleBackgroundColorChange2);

function handleBackgroundColorChange2() {
  const backgroundColor2 = bccolorPicker2.value;
  canvas2.style.backgroundColor = backgroundColor2;
}


// Visualizer 2

container2.addEventListener('change', function () {
  const audio2 = document.getElementById('audio2');
  const audioContext2 = new AudioContext();
  audio2.play();
  audioSource2 = audioContext2.createMediaElementSource(audio2);
  analyser2 = audioContext2.createAnalyser();
  audioSource2.connect(analyser2);
  analyser2.connect(audioContext2.destination);
  analyser2.fftSize = 1024;
  const bufferLength = analyser2.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 10;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillStyle = 'rgba(0,0,0,0.2)';
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    analyser2.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

file2.addEventListener('change', function () {
  const audio2 = document.getElementById('audio2');
  audio2.src = URL.createObjectURL(file2.files[0]);
  audio2.load();
  audio2.play();

  const audioContext2 = new AudioContext();
  audioSource2 = audioContext2.createMediaElementSource(audio2);
  analyser2 = audioContext2.createAnalyser();
  audioSource2.connect(analyser2);
  analyser2.connect(audioContext2.destination);
  analyser2.fftSize = 1024;
  const bufferLength = analyser2.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 10;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillStyle = 'rgba(0,0,0,0.2)';
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    analyser2.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 3.5;
    ctx2.save();
    ctx2.translate(canvas2.width / 2, canvas2.height / 2);
    ctx2.rotate(i * 4.0001);
    const hue = 180 + i * 0.05;
    ctx2.fillStyle = 'hsl(' + hue + ',100%,50%)';
    ctx2.beginPath();
    ctx2.arc(10, barHeight / 3, barHeight / 3, 0, Math.PI / 4);
    ctx2.fill();
    ctx2.stroke();

    x -= barWidth;
    ctx2.restore();
  }
}

//I experimented around with the number values until I created something i was happy with visually 


// get the button and content elements
const button = document.querySelector('.collapsible');
const content = document.querySelector('.content');

// click event listener to the button
button.addEventListener('click', function() {
// toggle the content visibility
  if (content.style.display === 'none') {
    content.style.display = 'block';
    button.innerHTML = 'Click to Collapse';
  } else {
    content.style.display = 'none';
    button.innerHTML = 'Click to Expand';
  }
})

