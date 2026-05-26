export default async function handler(req, res) {

  const body = req.body || {};

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  const ua =
    req.headers["user-agent"];

  const now =
    new Date().toLocaleString();

  console.log(`
━━━━━━━━━━━━━━━━━━
NEW VISITOR
━━━━━━━━━━━━━━━━━━

TIME: ${now}

IP: ${ip}

URL: ${body.url}

BROWSER:
${ua}

PLATFORM:
${body.platform}

SCREEN:
${body.screen}

CPU CORES:
${body.cores}

RAM:
${body.ram} GB

TOUCH:
${body.touch}

TIMEZONE:
${body.timezone}

GPU:
${body.gpu}

LANG:
${navigator?.language || "unknown"}

━━━━━━━━━━━━━━━━━━
`);

  res.status(200).json({
    ok:true
  });
}