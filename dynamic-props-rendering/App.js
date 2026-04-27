import React, { useState } from "react";

/* Reusable User Card Component */
function UserCard({ name, role, status }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div style={styles.card}>
      <div style={styles.avatar}>{initials}</div>

      <h2 style={styles.name}>{name}</h2>

      <p style={styles.role}>💼 {role}</p>

      <p>
        Status:{" "}
        <span
          style={{
            ...styles.status,
            backgroundColor:
              status === "Active"
                ? "#dcfce7"
                : "#fee2e2",
            color:
              status === "Active"
                ? "#166534"
                : "#b91c1c",
          }}
        >
          {status}
        </span>
      </p>
    </div>
  );
}

/* Main App */
export default function App() {
  const users = [
    {
      name: "prathamesh Joshi",
      role: "Frontend Developer",
      status: "Active",
    },
    {
      name: "akash Kumar",
      role: "Backend Developer",
      status: "Inactive",
    },
    {
      name: "Aman Singh",
      role: "Full Stack Developer",
      status: "Active",
    },
  ];

  const [index, setIndex] = useState(0);

  const changeUser = () => {
    setIndex((prev) => (prev + 1) % users.length);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Dynamic Props Rendering
      </h1>

      <UserCard
        name={users[index].name}
        role={users[index].role}
        status={users[index].status}
      />

      <button
        style={styles.button}
        onClick={changeUser}
      >
        🔄 Change User
      </button>
    </div>
  );
}

/* Styles */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #dbeafe, #eef2ff)",
    fontFamily: "Arial",
  },

  heading: {
    marginBottom: "25px",
    color: "OrangeRed",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "18px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    transition: "0.3s ease",
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#f44378",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: "24px",
    fontWeight: "bold",
  },

  name: {
    margin: "0 0 10px",
  },

  role: {
    color: "#4b5563",
    marginBottom: "15px",
  },

  status: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "14px",
  },

  button: {
    marginTop: "20px",
    padding: "12px 22px",
    background: "rgb(235, 37, 90)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },
};
