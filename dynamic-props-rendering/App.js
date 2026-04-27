import React, { useState } from "react";

/* COLOR THEME */
const theme = {
  primary: "#2563eb",     // blue
  secondary: "#06b6d4",   // cyan
  success: "#10b981",     // green
  lightBg: "linear-gradient(135deg, #e0f2fe, #f0fdfa)",
  darkBg: "linear-gradient(135deg, #0f172a, #1e293b)",
};

/* ================= BUTTON ================= */
function Button({
  text,
  onClick,
  type = "primary",
  disabled = false,
}) {
  const styles = {
    primary: {
      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
      color: "#fff",
    },
    secondary: {
      background: "#fff",
      color: "#111",
      border: "1px solid #ccc",
    },
    success: {
      background: `linear-gradient(135deg, ${theme.success}, #059669)`,
      color: "#fff",
    },
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "12px 24px",
        borderRadius: "12px",
        border: styles[type].border || "none",
        fontWeight: "600",
        cursor: "pointer",
        transition: "0.3s",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        ...styles[type],
      }}
      onMouseOver={(e) =>
        !disabled && (e.target.style.transform = "scale(1.05)")
      }
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    >
      {text}
    </button>
  );
}

/* ================= SEARCH ================= */
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search components..."
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #cbd5e1",
        marginBottom: "20px",
      }}
    />
  );
}

/* ================= CARD ================= */
function Card({ title, description }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        width: "280px",
        transition: "0.3s",
        position: "relative",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: theme.primary,
          color: "#fff",
          padding: "3px 10px",
          borderRadius: "8px",
          fontSize: "12px",
        }}
      >
        New
      </span>

      <h2 style={{ color: "#0f172a" }}>{title}</h2>
      <p style={{ color: "#475569" }}>{description}</p>

      <div style={{ marginTop: "15px" }}>
        <Button text="View More" type="success" />
      </div>
    </div>
  );
}

/* ================= LAYOUT ================= */
function Layout({ darkMode, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: darkMode ? theme.darkBg : theme.lightBg,
        transition: "0.4s",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          padding: "15px 20px",
          background: "rgba(255,255,255,0.6)",
          borderRadius: "12px",
        }}
      >
        <h2>UI Showcase</h2>
        <p>Reusable Components</p>
      </div>

      {children}

      {/* Footer */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: darkMode ? "#cbd5e1" : "#334155",
        }}
      >
        Built with React ✨
      </div>
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const cards = [
    { title: "Button", description: "Reusable button component" },
    { title: "Card", description: "Clean card UI design" },
    { title: "Layout", description: "Flexible layout system" },
  ];

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout darkMode={darkMode}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          UI Components Showcase
        </h1>

        <Button
          text={darkMode ? "Light Mode" : "Dark Mode"}
          type="secondary"
          onClick={() => setDarkMode(!darkMode)}
        />

        <div style={{ marginTop: "20px" }}>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredCards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Button text="Get Started" />
        </div>
      </div>
    </Layout>
  );
}
