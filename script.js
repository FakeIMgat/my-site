console.log("site loaded");

async function collect() {

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
        `${screen.width}x${screen.height}`,

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