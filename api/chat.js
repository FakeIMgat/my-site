export default async function handler(req, res) {

  try {

    const message =
      req.body.message;

    const response =
      await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            contents:[
              {
                parts:[
                  {
                    text:
`Answer short.

User: ${message}`
                  }
                ]
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

    const reply =
      data.candidates?.[0]
      ?.content?.parts?.[0]
      ?.text;

    res.status(200).json({

      reply:
        reply || "empty response"
    });

  } catch(err){

    console.log(err);

    res.status(500).json({

      reply:
        "server error"
    });
  }
}