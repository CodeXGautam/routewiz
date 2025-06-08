import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import {
  registerUser,
  loginUser,
  getsearchHistory,
  getcurrentUser,
  logoutUser,
  refreshAccessToken
} from './controllers/user.controller.js';
import { searched } from './controllers/search.controller.js';
import { verifyJWT } from './middlewares/auth.middleware.js';

const app = express();


app.use(cors({
  origin:'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

// Add this middleware to expose headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'set-cookie');
  next();
});

app.use(cookieParser());           
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

//  Auth & Protected Routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/api/refresh-token', refreshAccessToken);
app.get('/api/logout', verifyJWT, logoutUser);

app.get('/api/currentUser', verifyJWT, getcurrentUser);
app.post('/api/search', verifyJWT, searched);
app.get('/api/searchHistory', verifyJWT, getsearchHistory);



// OpenStreetMap Geocode API
app.get("/api/geocode", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Geocode error:", error);
    res.status(500).json({ message: "Geocode error" });
  }
});

//  OpenStreetMap Autocomplete API
app.get("/api/autocomplete", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Autocomplete error:", error);
    res.status(500).json({ message: "Autocomplete error" });
  }
});

// GraphHopper Route API
app.post("/api/route", async (req, res) => {
  const { start, end, vehicle, routePref } = req.body;
  const weighting = routePref === "shortest" ? "shortest" : "fastest";

  const graphhopperKey = "6938c1a9-4599-466e-9be6-38541a31ba8b";
  const params = `point=${start.lat},${start.lng}&point=${end.lat},${end.lng}&vehicle=${vehicle}&locale=en&weighting=${weighting}&calc_points=true&points_encoded=false&key=${graphhopperKey}`;
  const url = `https://graphhopper.com/api/1/route?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Route fetch error:", error);
    res.status(500).json({ message: "Route fetch error" });
  }
});

export default app;
