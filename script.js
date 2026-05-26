console.log("site loaded");

async function collect() {

  if(sessionStorage.logged) return;

  sessionStorage.logged = true;

  let gpu = "unknown";

  try {

    const canvas =
      document.createElement("canvas");

    const gl =
      canvas.getContext("webgl");

    const debug =
      gl.getExtension(
        "WEBGL_debug_renderer_info"
      );

    gpu = gl.getParameter(
      debug.UNMASKED_RENDERER_WEBGL
    );

  } catch {}

  fetch("/api/log", {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      url:location.href,

      platform:navigator.platform,

      screen:
        `${window.screen.width}x${window.screen.height}`,

      cores:
        navigator.hardwareConcurrency,

      ram:
        navigator.deviceMemory,

      touch:
        navigator.maxTouchPoints,

      timezone:
        Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone,

      language:
        navigator.language,

      gpu
    })
  });
}

collect();

const card =
  document.querySelector(".card");

document.addEventListener("mousemove", e => {

  let x =
    (window.innerWidth / 2 - e.pageX) / 25;

  let y =
    (window.innerHeight / 2 - e.pageY) / 25;

  card.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;
});
const send =
  document.getElementById("send");

const promptInput =
  document.getElementById("prompt");

const messages =
  document.getElementById("messages");

function addMessage(text, cls){

  const div =
    document.createElement("div");

  div.className =
    `msg ${cls}`;

  div.textContent = text;

  messages.appendChild(div);

  messages.scrollTop =
    messages.scrollHeight;
}

async function askAI(){

  const text =
    promptInput.value.trim();

  if(!text) return;

  addMessage(
    `you: ${text}`,
    "user"
  );

  promptInput.value = "";

  const res = await fetch(
    "/api/chat",
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        message:text
      })
    }
  );

  const data =
    await res.json();

  addMessage(
    `ai: ${data.reply}`,
    "ai"
  );
}

send.onclick = askAI;

promptInput.addEventListener(
  "keydown",
  e => {

    if(e.key === "Enter"){
      askAI();
    }
  }
);