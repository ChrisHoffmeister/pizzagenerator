export default async function handler(req, res) {
  const { OpenAI_API_Key } = process.env;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OpenAI_API_Key}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: "a realistic, top-down pizza with delicious toppings, photorealistic",
      n: 1,
      size: "1024x1024"
    })
  });

  const data = await response.json();
  res.status(200).json({ image: data.data[0].url });
}
