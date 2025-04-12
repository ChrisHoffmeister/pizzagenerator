import { useState, useEffect } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate");
      const data = await res.json();
      setImageUrl(data.image);
    } catch (error) {
      console.error("Fehler beim Generieren der Pizza:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem" }}>🍕 KI Pizza Generator</h1>

      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: loading ? "#ccc" : "#222",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Wird gebacken..." : "Neue Pizza generieren"}
      </button>

      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt="Pizza"
            style={{
              marginTop: "2rem",
              borderRadius: "10px",
              maxWidth: "90%",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)"
            }}
          />

          <br />

          <a
            href={imageUrl}
            download="meine-pizza.png"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#222",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none"
            }}
          >
            📥 Bild herunterladen
          </a>

          {isMobile && (
            <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
              📱 Tipp: Lange auf das Bild tippen und „In Fotos speichern“ wählen.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
