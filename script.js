console.log("site loaded");
fetch("/api/log");
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

  fetch("/api/analytics", {

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

      gpu
    })
  });
}

collect();