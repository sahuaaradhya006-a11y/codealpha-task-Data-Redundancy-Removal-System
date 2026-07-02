# 🚀 Smart Data Redundancy Removal System

A full-stack MERN application that detects and prevents duplicate records using text similarity while providing complete CRUD functionality. 
The system ensures efficient data management by reducing redundant entries and maintaining data integrity.

---

## 🌐 Live Demo

- **Frontend:**  https://data-redundancy-removal-system-tau.vercel.app/
- **Backend API:**  https://data-redundancy-removal-system-owmo.onrender.com

---

## 📌 Features

- ✅ Add new records
- ✅ View all records
- ✅ Update existing records
- ✅ Delete records
- ✅ Duplicate detection before insertion
- ✅ Duplicate similarity score
- ✅ Interactive duplicate alert modal
- ✅ Dashboard with statistics
- ✅ Responsive UI
- ✅ MongoDB database integration
- ✅ RESTful API

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📊 Dashboard

The application displays:

- Total Records
- Unique Records
- Duplicate Records
- Duplicate Rate (%)

---

## 📂 Project Structure

```
Data-Redundancy-Removal-System
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── config
│   ├── server.js
│   └── index.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── App.jsx
│   └── package.json
│
└── README.md
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/data/add` | Add new record |
| GET | `/api/data/all` | Get all records |
| PUT | `/api/data/update/:id` | Update record |
| DELETE | `/api/data/delete/:id` | Delete record |

---

## ✨ Key Highlights

- Smart duplicate detection
- Real-time CRUD operations
- Clean and modern user interface
- MongoDB Atlas cloud database
- Fully deployed MERN application
- Responsive design

---

## 👩‍💻 Author

**Aaradhya Sahu**

GitHub: https://github.com/sahuaaradhya006-a11y/codealpha-task-Data-Redundancy-Removal-System.git

LinkedIn: www.linkedin.com/in/aaradhyasahu

---

⭐ If you found this project helpful, don't forget to star the repository.
