export default function DuplicateModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const { original, matchedWith, score, reason } = data;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          zIndex: 999,
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "420px",
          maxWidth: "90%",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 25px 50px rgba(0,0,0,.35)",
          zIndex: 1000,
          animation: "popup 0.3s ease",
        }}
      >
        <h2
          style={{
            margin: 0,
            textAlign: "center",
            color: "#ef4444",
          }}
        >
          ⚠ Duplicate Detected
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: 8,
          }}
        >
          AI Similarity Analysis
        </p>

        {/* Progress */}
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <strong>Similarity</strong>
            <strong>{score}%</strong>
          </div>

          <div
            style={{
              height: 12,
              background: "#e5e7eb",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${score}%`,
                height: "100%",
                background:
                  "linear-gradient(to right,#22c55e,#f59e0b,#ef4444)",
              }}
            />
          </div>
        </div>

        {/* Information */}
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              background: "#f8fafc",
              padding: 12,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <b>Original</b>
            <br />
            {original}
          </div>

          <div
            style={{
              background: "#f8fafc",
              padding: 12,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <b>Matched With</b>
            <br />
            {matchedWith}
          </div>

          <div
            style={{
              background: "#eef2ff",
              padding: 12,
              borderRadius: 10,
            }}
          >
            <b>Reason</b>
            <br />
            {reason}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: 25,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: 8,
              background: "#6b7280",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Close
          </button>

          <button
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: 8,
              background: "#4f46e5",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Keep Anyway
          </button>
        </div>
      </div>
    </>
  );
}