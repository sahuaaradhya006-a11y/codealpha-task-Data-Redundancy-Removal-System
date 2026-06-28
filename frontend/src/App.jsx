import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:5000/api/data";

function App() {
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(baseURL + "/all");
    setData(res.data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addData = async () => {
    try {
      await axios.post(baseURL + "/add", { content });
      setContent("");
      fetchData();
    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        alert(err.response?.data?.message || err.message);
    }
  };

  const deleteData = async (id) => {
    await axios.delete(`${baseURL}/delete/${id}`);
    fetchData();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 CRUD Dashboard</h1>

        <div style={styles.inputBox}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter something..."
            style={styles.input}
          />
          <button onClick={addData} style={styles.addBtn}>
            Add +
          </button>
        </div>

        <div style={styles.list}>
          {data.map((item) => (
            <div key={item._id} style={styles.item}>
              <span>{item.content}</span>
              <button
                onClick={() => deleteData(item._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial"
  },
  card: {
    width: "420px",
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },
  addBtn: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  list: {
    marginTop: "10px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    marginTop: "10px",
    background: "#f4f4f4",
    borderRadius: "8px"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "5px 10px",
    cursor: "pointer"
  }
};

export default App;