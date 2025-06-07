import express from "express";
import { registerUser, loginUser, getsearchHistory, getcurrentUser, logoutUser } from '../controllers/user.controller.js';
import { searched } from './controllers/search.controller.js';
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();


router.post('/api/data', (req, res) => {
    // Handle POST request to /api/data
    req.body = req.body || {}; // Ensure req.body is defined
    console.log('Received data:', req.body);
    res.json({ message: 'Data received successfully!' });
});

router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.post('/api/search',verifyJWT, searched);
router.get('/api/getcurrentUser', verifyJWT,getcurrentUser);
router.get('/api/searchHistory', verifyJWT, getsearchHistory)
router.get('/api/logout', verifyJWT, logoutUser)


const graphhopperKey = "6938c1a9-4599-466e-9be6-38541a31ba8b";
const tomtomKey = "eBXfQnGsEtybJGPcFdG1VKTSBk8LCqIE";

// Geocode
router.get("/api/geocode", async (req, res) => {
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
router.get("/api/autocomplete", async (req, res) => {
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
router.post("/api/route", async (req, res) => {
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

export default router;