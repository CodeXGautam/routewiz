import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { registerUser, loginUser, getsearchHistory } from './controllers/user.controller.js';
import { searched } from './controllers/search.controller.js';

const app = express();

app.use(cors({
    origin: process.env.CORS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

app.post('/api/data', (req, res) => {
    // Handle POST request to /api/data
    req.body = req.body || {}; // Ensure req.body is defined
    console.log('Received data:', req.body);
    res.json({ message: 'Data received successfully!' });
});

app.post('/api/register',registerUser);
app.post('/api/login',loginUser);
app.post('/api/search',searched);


const graphhopperKey = "6938c1a9-4599-466e-9be6-38541a31ba8b";
const tomtomKey = "eBXfQnGsEtybJGPcFdG1VKTSBk8LCqIE";

// Geocode
app.get("/api/geocode", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Geocode error" });
  }
});

// Autocomplete
app.get("/api/autocomplete", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Autocomplete error" });
  }
});

// Route
app.post("/api/route", async (req, res) => {
  const { start, end, vehicle, routePref } = req.body;

  const weighting = routePref === "shortest" ? "shortest" : "fastest";

  const params = `point=${start.lat},${start.lng}&point=${end.lat},${end.lng}&vehicle=${vehicle}&locale=en&weighting=${weighting}&calc_points=true&points_encoded=false&key=${graphhopperKey}`;
  const url = `https://graphhopper.com/api/1/route?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Route fetch error" });
  }
});

export default app;
