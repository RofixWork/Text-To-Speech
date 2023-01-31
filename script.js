//   globals
const btnSpeech = document.querySelector('button[type="submit"]'),
  textarea = document.querySelector("textarea"),
  select = document.querySelector("select");

let synth = window.speechSynthesis;
let isSpeaking = true;

document.addEventListener("DOMContentLoaded", init);

function init() {
  btnSpeech.addEventListener("click", textToSpeech);
  synth.addEventListener("voiceschanged", loadVoices);
}
//   globals

// load voices function
function loadVoices() {
  for (let voice of synth.getVoices()) {
    let option = `<option value="${voice.name}" >${voice.name} (${voice.lang}) </option>`;

    select.insertAdjacentHTML("beforeend", option);
  }
}

// text speech function
function textToSpeech(e) {
  e.preventDefault();
  //   check textarea
  if (!textarea.value.trim()) {
    alert("please fill data...");
    return 0;
  }

  const utterance = new SpeechSynthesisUtterance(textarea.value);

  //   all voices
  for (let voice of synth.getVoices()) {
    if (voice.name === select.value) {
      utterance.voice = voice;
    }
  }
  //   voice => speak or not.
  if (!synth.speaking) {
    synth.speak(utterance);
  }
  //    check is nspeaking true or false
  if (isSpeaking) {
    btnSpeech.textContent = "Pause Speech";
    isSpeaking = false;
    synth.resume();
  } else {
    btnSpeech.textContent = "Resume Speech";
    isSpeaking = true;
    synth.pause();
  }

  //   done speak
  setInterval(() => {
    if (!synth.speaking && !isSpeaking) {
      btnSpeech.textContent = "Start Speech";
      isSpeaking = true;
    }
  });
}
