import { useEffect, useState } from "react";
import axios from "axios";
import DuplicateModal from "./components/DuplicateModal";

const baseURL = "http://localhost:5000/api/data";

function App() {
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const totalRecords = data.length;
  const duplicateAttempts = data.filter((item) => item.isDuplicate === true).length;
  const uniqueRecords = totalRecords - duplicateAttempts;

  const duplicateRate =
    totalRecords === 0
      ? 0
      : Math.round((duplicateAttempts / totalRecords) * 100);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(baseURL + "/all");
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addData = async () => {
    if (!content.trim()) {
      alert("Please enter some content.");
      return;
    }

    try {
      await axios.post(baseURL + "/add", {
        content: content.trim(),
      });

      setModalData({
        original: content,
        matchedWith: "No duplicate found",
        score: 0,
        reason: "Record added successfully.",
      });

      setModalOpen(true);
      setContent("");
      await fetchData();
    } catch (err) {
      if (err.response?.status === 409) {
        setModalData({
          original: content,
          matchedWith: err.response.data.matchedWith,
          score: err.response.data.score,
          reason: err.response.data.message,
        });

        setModalOpen(true);
        return;
      }

      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  const updateData = async () => {
    if (!content.trim()) {
      alert("Please enter some content.");
      return;
    }

    if (!editingId) {
      alert("No record selected for update.");
      return;
    }

    try {
      await axios.put(`${baseURL}/update/${editingId}`, {
        content: content.trim(),
      });

      setContent("");
      setEditingId(null);
      setIsEditing(false);

      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed.");
    }
  };

  const startEdit = (item) => {
    setContent(item.content);
    setEditingId(item._id);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setContent("");
    setEditingId(null);
    setIsEditing(false);
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${baseURL}/delete/${id}`);

      if (editingId === id) {
        cancelEdit();
      }

      await fetchData();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Smart Data Redundancy Removal System</h1>

        <div style={styles.dashboard}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{totalRecords}</div>
            <div>Total Records</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>{uniqueRecords}</div>
            <div>Unique Records</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>{duplicateAttempts}</div>
            <div>Duplicates</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>{duplicateRate}%</div>
            <div>Duplicate Rate</div>
          </div>
        </div>

        <div style={styles.inputBox}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter text..."
            style={styles.input}
          />

          <button
            onClick={isEditing ? updateData : addData}
            style={styles.addBtn}
          >
            {isEditing ? "Update" : "Add"}
          </button>

          {isEditing && (
            <button onClick={cancelEdit} style={styles.cancelBtn}>
              Cancel
            </button>
          )}
        </div>

        <div style={styles.list}>
          {loading ? (
            <h3 style={{ textAlign: "center" }}>Loading...</h3>
          ) : data.length === 0 ? (
            <p style={{ textAlign: "center" }}>No Records Found</p>
          ) : (
            data.map((item) => (
              <div key={item._id} style={styles.item}>
                <span style={styles.itemText}>{item.content}</span>

                <div style={styles.actionBtns}>
                  <button
                    onClick={() => startEdit(item)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteData(item._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <DuplicateModal
        isOpen={modalOpen}
        data={modalData}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default App;

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "700px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },

  title: {
    textAlign: "center",
    color: "#111827",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "700",
  },

  dashboard: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    marginBottom: "25px",
  },

  statCard: {
    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "#fff",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(79,70,229,.35)",
  },

  statNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "8px",
  },

  inputBox: {
    display: "flex",
    gap: "12px",
    marginBottom: "25px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
    background: "#ffffff",
    color: "#111827",
  },

  addBtn: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "14px 24px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },

  cancelBtn: {
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "14px 20px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  list: {
    marginTop: "15px",
    maxHeight: "350px",
    overflowY: "auto",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    marginBottom: "12px",
    background: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },

  itemText: {
    flex: 1,
    color: "#111827",
    wordBreak: "break-word",
  },

  actionBtns: {
    display: "flex",
    gap: "8px",
  },

  editBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};