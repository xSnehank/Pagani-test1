import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VehicleDetailPage from "./pages/VehicleDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main interactive automotive brand museum entrance */}
        <Route path="/" element={<HomePage />} />
        
        {/* Dedicated high-fidelity custom parameterized car showroom */}
        <Route path="/vehicle/:vehicleId" element={<VehicleDetailPage />} />
        
        {/* Safe wildcard recovery fallback directly to the museum */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
