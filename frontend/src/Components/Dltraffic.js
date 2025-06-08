import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dltraffic = () => {
  const center = [28.6139, 77.2090]; // Latitude and longitude of New Delhi
  const zoomLevel = 11;

  // State to trigger re-render for traffic layer updates
  const [trafficKey, setTrafficKey] = useState(Date.now()); // Initial key is based on current time

  useEffect(() => {
    // Set an interval to update the traffic layer every 5 minutes (300000 ms)
    const interval = setInterval(() => {
      setTrafficKey(Date.now()); // Update the key to trigger re-fetching tiles
    }, 300000); // 5 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup the interval when component unmounts
  }, []);

  return (
    <div className="relative h-[100%] w-[100%]">
      <MapContainer center={center} zoom={zoomLevel} minZoom={11} style={{ height: "100%", width: "100%" }}>
        {/* OpenStreetMap Layer (with labels) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Traffic flow overlay with dynamic key */}
        <TileLayer
          url={`https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=eBXfQnGsEtybJGPcFdG1VKTSBk8LCqIE&${trafficKey}`}
          opacity={1}
        />
      </MapContainer>

      {/* Traffic Legend */}
      <div className="absolute hidden sm:flex md:flex lg:flex bottom-2 left-4 bg-white rounded-xl  flex-col gap-2 shadow-lg p-4 text-sm z-[1000] w-[12%] min-w-[132px]">
        <h4 className="font-bold">Traffic Legend</h4>
        <div className="flex items-center gap-2">
          <span className="inline-block w-[12px] h-[12px] bg-red-600 rounded-full"></span>
          Major Delay
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-[12px] h-[12px] bg-yellow-400 rounded-full"></span>
          Minor Delay
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-[12px] h-[12px] bg-green-600 rounded-full"></span>
          No Delay
        </div>
      </div>
    </div>
  );
};

export default Dltraffic;
