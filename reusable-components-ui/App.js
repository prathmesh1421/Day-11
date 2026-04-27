import React, { useState } from "react";

// Reusable Button Component
function Button({
  text,
  onClick,
  type = "primary",
  disabled = false,
  loading = false,
}) {
  const styles = {
    primary: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "#fff",
    },
    secondary: {
      background: "#fff",
      color: "#111",
      border: "1px solid #ddd",
    },
    success: {
      background: "linear-gradient(135deg, #10b981, #059669)",
      color: "#fff",
    },
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        padding: "12px 24px",
        border: styles[type].border || "none",
        borderRadius: "14px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.3s ease",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        ...styles[type],
      }}
      onMouseOver={(e) =>
        !disabled && (e.target.style.transform = "scale(1.05)")
      }
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}

// Search Bar Component
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
        borderRadius: "12px",
        border: "1px solid #ddd",
        marginBottom: "20px",
        fontSize: "15px",
      }}
    />
  );
}

// Card Component
function Card({ title, description }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        width: "300px",
        transition: "0.3s ease",
        position: "relative",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(0,0,0,0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(0,0,0,0.1)";
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "#667eea",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: "10px",
          fontSize: "12px",
        }}
      >
        New
      </span>

      <h2>{title}</h2>
      <p style={{ color: "#666", lineHeight: "1.6" }}>
        {description}
      </p>

      <div style={{ marginTop: "18px" }}>
        <Button
          text="View More"
          type="success"
          onClick={() => alert(title)}
        />
      </div>
    </div>
  );
}

// Layout Component
function Layout({ darkMode, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: darkMode
          ? "linear-gradient(135deg, #1f2937, #111827)"
          : "linear-gradient(135deg, #eef2ff, #dbeafe)",
        transition: "0.4s ease",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          padding: "16px 24px",
          background: "rgba(255,255,255,0.4)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 style={{ margin: 0 }}>UI Showcase</h2>
        <p style={{ margin: 0 }}>Reusable Components</p>
      </div>

      {children}

      {/* Footer */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: darkMode ? "#fff" : "#444",
          fontSize: "14px",
        }}
      >
        Built with React Components ✨
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const cards = [
    { title: "Button", description: "Reusable gradient button component" },
    { title: "Card", description: "Modern card UI with hover effect" },
    { title: "Layout", description: "Flexible page layout component" },
  ];

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout darkMode={darkMode}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: darkMode ? "#fff" : "#111",
          }}
        >
          Reusable UI Components Showcase
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
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          {filteredCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Button
            text="Get Started"
            onClick={() => alert("Welcome to UI Components")}
          />
        </div>
      </div>
    </Layout>
  );
}
