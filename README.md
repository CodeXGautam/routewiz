# RouteWizard 🚀

RouteWizard is an intelligent route optimization platform that leverages machine learning to provide optimal navigation solutions. 
It uses Graphhopper to provide most optimized route to user based on  minimum time/ minimum distance and real time traffic using TOMTOM.
A XG-Boost model is trained on previous traffic congestion dataset of location between Gurugram and Delhi at NH-48, to predict the congestion
factor and current speed on different timestamp.



## 🌟 Features

- Real-time route optimization using GraphHopper
- Interactive map interface
- Traffic pattern analysis
- Multi-stop route planning
- Congestion Factor and Speed Predictions using XG-Boost Model

## 🛠 Tech Stack

### Frontend
- React.js
- OpenSteetMap and Leaflet.js 
- Tailwind CSS

### Backend
- Node.js (Express)
- RESTful API architecture
- JWT Authentication

### Machine Learning
- XGBoost model for route predictions
- Django ML serving layer
- Python data processing pipeline

### Infrastructure
- Nginx reverse proxy
- Render.com hosting
- MongoDb Database

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.11+)
- Redis (for caching)

### Installation

#### Frontend
bash/powershell/terminal
-cd frontend
-npm install
-npm start

#### Backend
-cd backend
-npm install
-npm run dev

#### Django(ML Services)
-cd ml
-python -m venv venv
-source venv/bin/activate  # Windows: venv\Scripts\activate
-pip install -r requirements.txt
-python manage.py runserver

#### Environment Variables 
- create .env files
  
##### Frontend 
-REACT_APP_API_URL=http://localhost:5000/api

##### Backend
-PORT=5000
-DB_URI=postgres://user:password
-JWT_SECRET=your_jwt_secret

##### Djnago (mlproject)
-DEBUG=True
-SECRET_KEY=your_django_secret
-ALLOWED_HOSTS=localhost,127.0.0.1


## Project Structure 
routewizard/
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Application pages
│   │   ├── images/       # Application images
│   │   ├── utils/        # Helper functions
│   │   └── App.js        #application routes
│   │   └── Index.js      # Main application
├── backend/               # Node.js backend
│   ├── public/
│   ├── src/
│   │   ├── controllers/   # Controllers
│   │   ├── middlewares/   # Middlewares
│   │   ├── models/        # Models (model schemas)
│   │   ├──db/             # Database
│   │   ├──routes/         # Application routes
│   │   └── app.js         # Express app
│   │   └── constants.js   # Application constants
│   │   └── Index.js       # Main application
├── mlproject/           # Django ML service
│   ├── mlapi/           # Django app
│   │   ├── models/      # ML models
│   │   └── views.py     # Prediction endpoints
│   ├── mlproject/       # Django project
│   └── manage.py
├── nginx/                # Nginx configuration
└── README.md
