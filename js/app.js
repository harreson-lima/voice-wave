const recordBtn = document.querySelector(".record");
const stopBtn = document.querySelector(".stop");
const audios = document.querySelector(".audios");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  const constraints = { audio: true };
  let chunks = [];

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

  console.log("getUserMedia supported!");
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(onSuccess, onError);
} else {
  console.log("getUserMedia not supported!");
}
