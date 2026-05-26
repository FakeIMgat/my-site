export default async function handler(req, res) {

  try {

    const message =
      req.body.message;

    const response =
      await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",

            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "HTTP-Referer":
              "https://fakeimgat-site.vercel.app",

            "X-Title":
              "fakeimgat-site"
          },

          body:JSON.stringify({

            model:
                "deepseek/deepseek-chat-v3-0324:free",

            messages:[

              {
                role:"system",

                content:
                "you are a dark cyberpunk ai assistant. answer shortly."
              },

              {
                role:"user",
                content:message
              }
            ]
          })
        }
      );

    const data =
      await response.json();

    console.log(data);

    if(data.error){

      return res.status(500).json({

        reply:
          data.error.message
      });
    }

    res.status(200).json({

      reply:
        data.choices?.[0]
        ?.message?.content
        || "no response"
    });

  } catch(err){

    console.log(err);

    res.status(500).json({

      reply:
        "server error"
    });
  }
}