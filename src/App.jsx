import { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch("/api/generate");
    const data = await res.json();
    setImageUrl(data.image);
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🍕 KI Pizza Generator</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Wird gebacken..." : "Neue Pizza generieren"}
      </button>
      {imageUrl && <img src={imageUrl} alt="Pizza" style={{ marginTop: 20, borderRadius: '10px', maxWidth: 400 }} />}
    </div>
  );
}

export default App;
