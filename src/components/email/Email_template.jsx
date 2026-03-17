export function EmailTemplate({ userName, userEmail, message, contactNumber }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#4f46e5",
          padding: "20px",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <h1 style={{ color: "white", margin: 0, fontSize: "20px" }}>
          Nueva consulta desde insarafaela.com.ar
        </h1>
      </div>

      {/* Body */}
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "12px",
              color: "#6b7280",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Nombre
          </span>
          <p
            style={{ margin: "4px 0 0 0", fontSize: "16px", color: "#111827" }}
          >
            {userName}
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "12px",
              color: "#6b7280",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Email
          </span>
          <p
            style={{ margin: "4px 0 0 0", fontSize: "16px", color: "#4f46e5" }}
          >
            {userEmail}
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "12px",
              color: "#6b7280",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Mensaje
          </span>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "15px",
              color: "#374151",
              lineHeight: "1.6",
              backgroundColor: "#f3f4f6",
              padding: "12px",
              borderRadius: "6px",
            }}
          >
            {message}
          </p>
        </div>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "16px",
            marginTop: "8px",
          }}
        >
          <span style={{ fontSize: "11px", color: "#9ca3af" }}>
            Consulta #{contactNumber}
          </span>
        </div>
      </div>
    </div>
  );
}
