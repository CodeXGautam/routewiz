<p align="center">
  <img src="frontend/src/images/logo.png" alt="RouteWizard Logo" width="150"/>
</p>


# 🚀 RouteWizard

RouteWizard is an intelligent route optimization platform that leverages machine learning to provide optimal navigation solutions. It integrates **GraphHopper** for routing based on minimum time/distance and **TomTom** for real-time traffic data. An **XGBoost** model is trained on historical congestion data between **Gurugram** and **Delhi (NH-48)** to predict traffic congestion factors and current speed by timestamp.

---

## 🌟 Features

* 🚦 Real-time route optimization using **GraphHopper**
* 🗺️ Interactive map interface with Leaflet and OpenStreetMap
* 📈 Traffic pattern analysis based on historical data
* 📊 Congestion factor & speed predictions via **XGBoost** ML model

---


## 🖼️ UI Screenshots

### 🏁 Welcome Page
![Welcome Page](frontend/src/images/welcome_page.png)

### 🔍 Search Functionality
![Search](frontend/src/images/search.png)

### 🗺️ Real-Time Delhi Traffic
![Real-Time Traffic](frontend/src/images/real-time-traffic.png)

### 📉 Congestion & Speed Prediction
![Congestion Prediction](frontend/src/images/congestion_prediction.png)

### 👤 User Profile
![User Profile](frontend/src/images/profile.png)


---

## 🛠 Tech Stack

### Frontend

* **React.js**
* **OpenStreetMap** + **Leaflet.js**
* **Tailwind CSS**

### Backend

* **Node.js (Express)**
* **JWT** Authentication
* **RESTful API** architecture

### Machine Learning

* **XGBoost** model (congestion prediction)
* **Django**-based ML serving layer
* **Python** for preprocessing and model logic

### Infrastructure

* **Nginx** reverse proxy for unified interface
* **MongoDB** for data persistence
* **Render.com** for deployment

---

## 🚀 Getting Started

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [Python](https://www.python.org/) (3.11+)
* [Redis](https://redis.io/) (for caching)

---

### 📦 Installation

#### 📁 Frontend

```bash
cd frontend
npm install
npm start
```

#### 📥️ Backend

```bash
cd backend
npm install
npm run dev
```

#### 🧠 Django (ML Services)

```bash
cd ml
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

---

### 🔐 Environment Variables

Create `.env` files in respective directories.

#### Frontend `.env`

```
REACT_APP_API_URL=http://localhost:5000/api
```

#### Backend `.env`

```
PORT=5000
DB_URI=postgres://user:password@localhost:5432/yourdb
JWT_SECRET=your_jwt_secret
```

#### Django ML `.env` (or set in `settings.py`)

```
DEBUG=True
SECRET_KEY=your_django_secret
ALLOWED_HOSTS=localhost,127.0.0.1
```

---

## 🧱 Project Structure

```text
routewizard/
├── frontend/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/ # Reusable React components
│       ├── pages/      # Page views
│       ├── images/
│       ├── utils/      # Utility functions
│       ├── App.js      # React routing logic
│       └── index.js    # Entry point
│
├── backend/            # Express.js backend
│   ├── public/
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── db/
│       ├── routes/
│       ├── app.js
│       ├── constants.js
│       └── index.js
│
├── mlproject/          # Django ML service
│   ├── mlapi/
│   │   ├── models/     # XGBoost and ML logic
│   │   └── views.py    # Prediction endpoints
│   ├── mlproject/      # Django core project
│   └── manage.py
│
├── nginx/              # Nginx reverse proxy config
└── README.md           # This file
```

---

## 📊 Prediction API

Once Django is running, access predictions via:

```
GET /predict/?timestamp=08:00
```

**Response:**

```json
{
  "timestamp": "08:00",
  "predicted_congestion_factor": 0.156,
  "predicted_current_speed": 38.6
}
```

---

## 🌐 Deployment Notes

* Reverse proxy is configured using **Nginx**
* Hosted on **Render.com** with separate services for:

  * Node backend
  * React frontend
  * Django ML API

---

## 🤝 Contributing

We welcome contributions to improve RouteWizard. To contribute:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 📨 Contact

For queries or support, raise an issue or contact [Gautam](https://github.com/CodeXGautam).

---

> 🚧 *This project is under active development. Stay tuned for new features and performance improvements!*
