const recordBtn = document.querySelector(".record");
const stopBtn = document.querySelector(".stop");
const audios = document.querySelector(".audios");


// Checks if browser support getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported!");

  const constraints = { audio: true };
  let chunks = [];

  // Set up MediaRecorder functions if getUserMedia is a success
  function onSuccess(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    recordBtn.addEventListener("click", () => {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("start recording");
      recordBtn.classList.add("recording");
      recordBtn.disabled = true;
      stopBtn.disabled = false;
    });

    stopBtn.addEventListener("click", () => {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("stop recording");
      stopBtn.disabled = true;
      recordBtn.disabled = false;
      recordBtn.classList.remove("recording");
    });

    // Is triggered every time the recorder is stopped, then gets all the data
    // and creates a clip element and reset the chunks for the next record
    mediaRecorder.onstop = (e) => {

      console.log("record stopped");

      const clipName = prompt("Enter a name for the sound clip");

      const clipContainer = document.createElement("article");
      const clipLabel = document.createElement("p");
      const audio = document.createElement("audio");
      const deleteBtn = document.createElement("button");

      clipContainer.classList.add("clip");
      clipLabel.innerHTML = clipName;
      audio.setAttribute("controls", "");
      deleteBtn.innerHTML = "Delete";

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteBtn);
      audios.appendChild(clipContainer);

      audio.controls = true;
      const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;

      deleteBtn.addEventListener("click", (e) => {
        audios.removeChild(e.target.parentNode);
      });


    };

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
  }

  function onError(err) {
     console.error(`The following erro occured ${err}`);
  }
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(onSuccess, onError);
} else {
  console.log("getUserMedia not supported!");
}
