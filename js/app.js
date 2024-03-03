const recordBtn = document.querySelector(".record");
const stopBtn = document.querySelector(".stop");
const audios = document.querySelector(".audios");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported!");
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {})
    .catch((err) => {
      console.error(`The following erro occured ${err}`);
    });
} else {
  console.log("getUserMedia not supported!");
}
