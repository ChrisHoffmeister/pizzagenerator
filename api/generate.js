export default async function handler(req, res) {
  const { OpenAI_API_Key } = process.env;

  try {
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

    if (!response.ok) {
      // API-Fehler: Schicke Fehlermeldung zurück
      return res.status(response.status).json({ error: data.error?.message || 'OpenAI API error' });
    }

    if (!data.data || data.data.length === 0) {
      // API hat zwar geantwortet, aber keine Bilder geliefert
      return res.status(500).json({ error: "No image data returned by OpenAI" });
    }

    // Erfolgreich: Bild-URL zurückschicken
    res.status(200).json({ image: data.data[0].url });

  } catch (error) {
    // Unerwarteter Fehler (z.B. Netzwerkfehler)
    res.status(500).json({ error: error.message });
  }
}
