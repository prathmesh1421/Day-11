import React, { useState } from "react";

/* Header */
function Header() {
  return (
    <header style={styles.header}>
      <h1>🏥 Hospital Management Dashboard</h1>
    </header>
  );
}

/* Sidebar */
function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    "Dashboard",
    "Doctors",
    "Patients",
    "Appointments",
  ];

  return (
    <aside style={styles.sidebar}>
      {menuItems.map((item) => (
        <div
          key={item}
          onClick={() => setActiveTab(item)}
          style={{
            ...styles.menuItem,
            background: activeTab === item 
              ? "linear-gradient(135deg, #ff7e5f, #feb47b)"
              : "transparent",
            color: activeTab === item ? "white" : "#374151",
            boxShadow: activeTab === item 
              ? "0 8px 25px rgba(59, 130, 246, 0.4)" 
              : "none",
          }}
        >
          {item}
        </div>
      ))}
    </aside>
  );
}

/* Dashboard */
function Dashboard() {
  const services = [
    "Emergency Care",
    "OPD Services",
    "Pharmacy",
    "Laboratory",
    "ICU Support",
    "Appointment Booking",
  ];

  return (
    <div style={styles.page}>
      {/* Services Section */}
      <h2 style={styles.sectionTitle}>Hospital Services</h2>

      <div style={styles.serviceGrid}>
        {services.map((service, index) => (
          <div key={index} style={styles.serviceCard}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "20px" }}>{service}</h3>
            <p style={{ margin: 0, color: "#6b7280", fontWeight: "500" }}>Available 24/7</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 style={styles.sectionTitle}>Quick Actions</h2>

      <div style={styles.serviceGrid}>
        <div style={styles.actionCard}>
          📅 Book Appointment
        </div>
        <div style={styles.actionCard}>
          👨‍⚕️ View Doctors
        </div>
        <div style={styles.actionCard}>
          🧾 Patient Records
        </div>
      </div>
    </div>
  );
}

/* Doctors */
function Doctors() {
  return (
    <div style={styles.page}>
      <h2 style={styles.sectionTitle}>Available Doctors</h2>
      <DoctorCard
        name="Dr. prathmesh joshi"
        department="Cardiology"
        specialty="Heart Specialist"
      />
      <DoctorCard
        name="Dr. Akash patil"
        department="Neurology"
        specialty="Brain & Nerve Expert"
      />
      <DoctorCard
        name="Dr. sanjay kulkarni"
        department="Orthopedics"
        specialty="Bone & Joint Surgery"
      />
    </div>
  );
}

/* Patients */
function Patients() {
  const patients = [
    "Rahul Patil - Room 204",
    "Sneha Joshi - ICU 12", 
    "Amit Shah - OPD 15",
    "Priya Mehta - Ward 3B"
  ];

  return (
    <div style={styles.page}>
      <h2 style={styles.sectionTitle}>Patients List</h2>
      {patients.map((patient, index) => (
        <div key={index} style={styles.patientCard}>
          {patient}
        </div>
      ))}
    </div>
  );
}

/* Doctor Card */
function DoctorCard({ name, department, specialty }) {
  return (
    <div style={styles.doctorCard}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>{name}</h3>
      <p style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "600" }}>
        {department}
      </p>
      <p style={{ margin: 0, color: "#92400e", fontWeight: "500" }}>{specialty}</p>
    </div>
  );
}

/* Appointments */
function Appointments() {
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load existing appointments from localStorage
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const handleEdit = (id) => {
    const appointment = appointments.find((appt) => appt.id === id);
    if (!appointment) return;

    setPatientName(appointment.patientName);
    setDoctor(appointment.doctor);
    setDate(appointment.date);
    setTime(appointment.time);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const updatedAppointments = appointments.filter((appt) => appt.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const handleBooking = () => {
    if (!patientName || !doctor || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      const updatedAppointments = appointments.map((appt) =>
        appt.id === editingId
          ? { ...appt, patientName, doctor, date, time }
          : appt
      );

      setAppointments(updatedAppointments);
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      setEditingId(null);
      alert("Appointment updated successfully! ✅");
    } else {
      const newAppointment = {
        id: Date.now(),
        patientName,
        doctor,
        date,
        time,
      };

      const updatedAppointments = [newAppointment, ...appointments];
      setAppointments(updatedAppointments);
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      alert("Appointment booked successfully! ✅");
    }

    setPatientName("");
    setDoctor("");
    setDate("");
    setTime("");
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.sectionTitle}>Book Appointment</h2>

      <div style={{ maxWidth: "500px" }}>
        <input
          style={styles.input}
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <select
          style={styles.input}
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>
          <option>Dr. prathmesh joshi - Cardiology</option>
          <option>Dr. Akash patil - Neurology</option>
          <option>Dr. sanjay kulkarni - Orthopedics</option>
        </select>

        <input
          style={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          style={styles.input}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button style={styles.button} onClick={handleBooking}>
          {editingId ? "Update Appointment" : "Book Now"} 🚀
        </button>
      </div>

      <div style={{ marginTop: "50px" }}>
        <h3 style={styles.sectionTitle}>Booked Appointments</h3>
        {appointments.length === 0 ? (
          <div style={styles.card}>
            <p style={{ textAlign: "center", color: "#6b7280", fontSize: "18px" }}>
              No appointments yet. Book your first one above! ✨
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}>
            {appointments.map((appt) => (
              <div key={appt.id} style={styles.appointmentCard}>
                <h4 style={{ margin: "0 0 8px 0", color: "#1f2937" }}>
                  {appt.patientName}
                </h4>
                <p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>👨‍⚕️ {appt.doctor}</p>
                <p style={{ margin: "0 0 4px 0" }}>📅 {appt.date}</p>
                <p style={{ margin: "0 0 10px 0" }}>🕒 {appt.time}</p>

                {/* Buttons */}
                <div style={styles.buttonGroup}>
                  <button style={styles.editBtn} onClick={() => handleEdit(appt.id)}>
                    ✏️ Edit
                  </button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(appt.id)}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Main App */
export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderPage = () => {
    switch (activeTab) {
      case "Doctors":
        return <Doctors />;
      case "Patients":
        return <Patients />;
      case "Appointments":
        return <Appointments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={styles.appContainer}>
      <Header />
      <div style={styles.layout}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div style={styles.mainContent}>{renderPage()}</div>
      </div>
    </div>
  );
}

/* Clean Styles - NO ANIMATIONS */
const styles = {
  appContainer: {
    margin: 0,
    padding: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    minHeight: "100vh",
  },

  header: {
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    padding: "25px 40px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },

  layout: {
    display: "flex",
    minHeight: "calc(100vh - 120px)",
    background: "linear-gradient(145deg, #f0f2f5 0%, #e2e8f0 100%)",
  },

  sidebar: {
    width: "260px",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px 20px",
    boxShadow: "8px 0 30px rgba(0,0,0,0.08)",
    borderRight: "1px solid rgba(255,255,255,0.2)",
  },

  menuItem: {
    padding: "16px 20px",
    borderRadius: "16px",
    marginBottom: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },

  mainContent: {
    flex: 1,
    padding: "40px",
    maxWidth: "1400px",
  },

  page: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
    margin: "0 0 30px 0",
  },

  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "28px",
    marginTop: "30px",
  },

  serviceCard: {
    background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))",
    padding: "32px 24px",
    borderRadius: "24px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.4)",
  },

  actionCard: {
   background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    padding: "32px 24px",
    borderRadius: "24px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 12px 35px rgba(16, 185, 129, 0.4)",
  },

  doctorCard: {
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    color: "#92400e",
    padding: "28px",
    borderRadius: "20px",
    marginBottom: "20px",
    boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)",
    borderLeft: "5px solid #f59e0b",
  },

  patientCard: {
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "16px",
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.2)",
    borderLeft: "4px solid #3b82f6",
    cursor: "pointer",
  },

  input: {
    display: "block",
    width: "100%",
    maxWidth: "350px",
    padding: "16px 20px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    background: "rgba(255, 255, 255, 0.9)",
    fontSize: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
  },

  button: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    padding: "8px 16px",
     background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },

  deleteBtn: {
    padding: "8px 16px",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
  },

  appointmentCard: {
    background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))",
    padding: "28px",
    borderRadius: "20px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
    border: "1px solid rgba(255,255,255,0.4)",
    
  },

  card: {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "24px",
    borderRadius: "18px",
    marginTop: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.3)",
    textAlign: "center",
  },
};
