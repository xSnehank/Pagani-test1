import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Gauge, Sliders, Wind, Footprints, AlertTriangle } from "lucide-react";
import { AeroTelemetry } from "../types";

export default function ActiveAeroLab() {
  const [airSpeed, setAirSpeed] = useState<number>(180); // in km/h
  const [vehicleState, setVehicleState] = useState<"speed" | "braking" | "left-curve" | "right-curve">("speed");
  const [telemetry, setTelemetry] = useState<AeroTelemetry>({
    flapAngleFrontLeft: 0,
    flapAngleFrontRight: 0,
    flapAngleRearLeft: 5,
    flapAngleRearRight: 5,
    downforceKg: 150,
    dragCoefficient: 0.35,
    airSpeedKmh: 180,
    pitchDeg: 0,
    rollDeg: 0
  });

  // Calculate aerodynamics physical formulas in real-time
  useEffect(() => {
    let fl = 0;
    let fr = 0;
    let rl = 5;
    let rr = 5;
    let pitch = 0;
    let roll = 0;

    // Determine flap reactions based on vehicle dynamics profiles
    switch (vehicleState) {
      case "speed":
        // Straight line top speed: minimize flap angles to reduce core drag
        fl = Math.max(0, Math.min(4, airSpeed * 0.01));
        fr = Math.max(0, Math.min(4, airSpeed * 0.01));
        rl = Math.max(2, Math.min(8, airSpeed * 0.02));
        rr = Math.max(2, Math.min(8, airSpeed * 0.02));
        pitch = -0.5; // nose slightly down
        roll = 0;
        break;
      case "braking":
        // Extreme brake airbrake: flare rear flaps to maximum instantly to arrest speed
        fl = 25;
        fr = 25;
        rl = 28;
        rr = 28;
        pitch = -2.5; // car pitches forward under heavy braking
        roll = 0;
        break;
      case "left-curve":
        // Turning sharp-left: lift inner flaps (left) higher to stabilize rollover
        fl = 12;
        fr = 2;
        rl = 22;
        rr = 6;
        pitch = 0.5;
        roll = -3.2; // rolling outwards (right side sinks, left lifts)
        break;
      case "right-curve":
        // Turning sharp-right: lift inner flaps (right) higher to balance rolls
        fl = 2;
        fr = 12;
        rl = 6;
        rr = 22;
        pitch = 0.5;
        roll = 3.2; // rolling left
        break;
    }

    // Physical formula for downforce: D = 0.5 * rho * V^2 * Cl * A
    // Downforce increases exponentially with air speed (squared) and linearly with flap angles
    const baseFlapAngleFactor = (fl + fr + rl + rr) / 4;
    const velocityFactor = Math.pow(airSpeed / 100, 2);
    const calculatedDownforce = Math.round(15 + (velocityFactor * (32 + baseFlapAngleFactor * 10)));
    
    // Drag coefficient Cd adjusts based on flap deployment angles
    const calculatedCd = parseFloat((0.33 + (baseFlapAngleFactor * 0.013)).toFixed(3));

    setTelemetry({
      flapAngleFrontLeft: fl,
      flapAngleFrontRight: fr,
      flapAngleRearLeft: rl,
      flapAngleRearRight: rr,
      downforceKg: calculatedDownforce,
      dragCoefficient: calculatedCd,
      airSpeedKmh: airSpeed,
      pitchDeg: pitch,
      rollDeg: roll
    });
  }, [airSpeed, vehicleState]);

  return (
    <section 
      id="aero-lab" 
      className="w-full bg-[#0d0d0f] border-b border-zinc-900 py-16 px-4 md:px-12 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Visual Ambient Wind Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent top-12 left-[-100px] animate-wind-1" style={{ animationDuration: "3s", animationIterationCount: "infinite" }} />
        <div className="absolute h-[1px] w-64 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent top-32 left-[-100px] animate-wind-2" style={{ animationDuration: "2.2s", animationIterationCount: "infinite" }} />
        <div className="absolute h-[1px] w-40 bg-gradient-to-r from-transparent via-blue-550/40 to-transparent top-60 left-[-100px] animate-wind-3" style={{ animationDuration: "4s", animationIterationCount: "infinite" }} />
        <div className="absolute h-[1px] w-56 bg-gradient-to-r from-transparent via-white/30 to-transparent top-80 left-[-100px] animate-wind-4" style={{ animationDuration: "2.8s", animationIterationCount: "infinite" }} />
        <div className="absolute h-[1px] w-72 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent top-[48vh] left-[-100px] animate-wind-5" style={{ animationDuration: "3.5s", animationIterationCount: "infinite" }} />
      </div>

      <div className="max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Aspect: The Interactive Controls */}
        <div className="lg:col-span-4 flex flex-col space-y-6 justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-amber-500 tracking-[0.25em] uppercase block">
              DYNAMICS BENCH
            </span>
            <h3 className="text-3xl font-light tracking-tight text-white font-sans">
              Active <span className="font-semibold text-amber-400">Aerodynamics</span>
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Pagani&rsquo;s central ECU modulates four physical carbon flaps dynamically to regulate downforce, lift-stabilization, and roll mitigation. Select a state to simulate physical telemetry feedback.
            </p>
          </div>

          {/* Interactive State Selector */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider">CHASSIS LOADS TRANSFERS</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setVehicleState("speed")}
                className={`flex flex-col items-start p-3.5 rounded-lg border text-left transition-all duration-300 ${
                  vehicleState === "speed"
                    ? "border-amber-500 bg-amber-550/5 text-amber-400"
                    : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Wind className="h-3.5 w-3.5 tracking-tight text-amber-500" />
                  <span className="text-xs font-semibold uppercase font-mono">Top Velocity</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-1">Min Drag Profiling</span>
              </button>

              <button
                onClick={() => setVehicleState("braking")}
                className={`flex flex-col items-start p-3.5 rounded-lg border text-left transition-all duration-300 ${
                  vehicleState === "braking"
                    ? "border-amber-500 bg-amber-550/5 text-amber-400"
                    : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Footprints className="h-3.5 w-3.5 text-zinc-400 text-amber-550" />
                  <span className="text-xs font-semibold uppercase font-mono">Aero Braking</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-1">Max Flare Downforce</span>
              </button>

              <button
                onClick={() => setVehicleState("left-curve")}
                className={`flex flex-col items-start p-3.5 rounded-lg border text-left transition-all duration-300 ${
                  vehicleState === "left-curve"
                    ? "border-amber-500 bg-amber-550/5 text-amber-400"
                    : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                }`}
              >
                <div className="text-xs font-semibold uppercase font-mono flex items-center gap-1">
                  <Sliders className="h-3.5 w-3.5 text-amber-500" />
                  <span>Left Turn</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-1">Stabilizing Left Roll</span>
              </button>

              <button
                onClick={() => setVehicleState("right-curve")}
                className={`flex flex-col items-start p-3.5 rounded-lg border text-left transition-all duration-300 ${
                  vehicleState === "right-curve"
                    ? "border-amber-500 bg-amber-550/5 text-amber-400"
                    : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                }`}
              >
                <div className="text-xs font-semibold uppercase font-mono flex items-center gap-1">
                  <Sliders className="h-3.5 w-3.5 text-amber-500" />
                  <span>Right Turn</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-1">Stabilizing Right Roll</span>
              </button>
            </div>
          </div>

          {/* Wind Speed Control Slider */}
          <div className="p-4 bg-zinc-950/45 border border-zinc-900/60 rounded-xl space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5 text-amber-500" />
                WIND VELOCITY
              </span>
              <span className="text-white font-bold">{airSpeed} KM/H</span>
            </div>
            
            <input 
              type="range"
              min="40"
              max="350"
              step="5"
              value={airSpeed}
              onChange={(e) => setAirSpeed(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-900 accent-amber-500 rounded-lg cursor-pointer"
            />
            
            <div className="flex justify-between text-[9px] text-zinc-650">
              <span>MUNICIPAL SPEED (40)</span>
              <span>V-MAX LIMIT (350)</span>
            </div>
          </div>

        </div>

        {/* Right Aspect: The Dynamic Wind-Tunnel Visualizer Canvas */}
        <div className="lg:col-span-8 bg-zinc-950/40 border border-zinc-900 rounded-xl p-6 flex flex-col justify-between relative min-h-[480px]">
          
          <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-600">
            WIND_TUNNEL_MODULE // NO: 04-AERO
          </div>

          {/* Dynamic Telemetry HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 z-10 mt-6 font-mono text-center">
            <div className="p-3 bg-[#0d0d0f]/80 rounded-lg border border-zinc-900">
              <span className="text-[9px] text-zinc-500 block uppercase">DOWNFORCE</span>
              <span className="text-xl font-medium text-white block mt-1 tracking-tight">
                {telemetry.downforceKg} <span className="text-xs text-amber-500 font-bold">KG</span>
              </span>
            </div>
            <div className="p-3 bg-[#0d0d0f]/80 rounded-lg border border-zinc-900">
              <span className="text-[9px] text-zinc-500 block uppercase">DRAG COEFF</span>
              <span className="text-xl font-medium text-white block mt-1 tracking-tight">
                Cd {telemetry.dragCoefficient}
              </span>
            </div>
            <div className="p-3 bg-[#0d0d0f]/80 rounded-lg border border-zinc-900">
              <span className="text-[9px] text-zinc-500 block uppercase">LATERAL G-RIGIDITY</span>
              <span className="text-xl font-medium text-white block mt-1 tracking-tight">
                {vehicleState.includes("curve") ? "2.65G" : "1.10G"}
              </span>
            </div>
            <div className="p-3 bg-[#0d0d0f]/80 rounded-lg border border-zinc-900">
              <span className="text-[9px] text-zinc-500 block uppercase">STABILIZATION CODE</span>
              <span className="text-xl font-medium text-emerald-400 block mt-1 uppercase text-xs">
                {vehicleState === "speed" ? "ACTIVE_VMAX" : vehicleState === "braking" ? "AIR_BRAKE_ALT" : "RECON_ROLL_STB"}
              </span>
            </div>
          </div>

          {/* Graphical Wind Tunnel (Top view of hypercar outline with active flaps glowing and angling) */}
          <div className="flex-1 flex items-center justify-center relative min-h-[260px] my-6">
            
            {/* SVG Chassis Blueprint Outline and Flaps */}
            <svg viewBox="0 0 540 220" className="w-full max-w-[480px] h-auto drop-shadow-lg overflow-visible">
              
              {/* Wind stream lines passing through */}
              <g stroke="#ffffff" strokeWidth="0.5" opacity="0.15">
                <line x1="10" y1="35" x2="520" y2="35" strokeDasharray={`${Math.round(airSpeed * 0.1)} 10`} />
                <line x1="10" y1="185" x2="520" y2="185" strokeDasharray={`${Math.round(airSpeed * 0.1)} 10`} />
                <line x1="10" y1="110" x2="520" y2="110" strokeDasharray={`${Math.round(airSpeed * 0.1)} 12`} />
              </g>

              {/* Dynamic boundary warning for high drag */}
              {telemetry.dragCoefficient > 0.55 && (
                <rect x="5" y="5" width="530" height="210" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" className="animate-pulse" />
              )}

              {/* Stabilizer Vectors / Force Gauges (Visual Representation of forces) */}
              <g opacity="0.8">
                {/* Rear vector arrow */}
                <path d={`M 460 110 L ${465 + telemetry.downforceKg * 0.1} 110`} stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrow-head)" />
                {/* Drag vector arrow */}
                <path d={`M 270 110 L 270 ${110 - (telemetry.dragCoefficient) * 60}`} stroke="#10B981" strokeWidth="2" />
              </g>

              {/* Main Hypercar Silhouette Contour (Simple architectural CAD style) */}
              <path 
                d="M 120 110 C 120 70, 160 55, 230 55 C 290 55, 340 50, 420 70 C 470 80, 480 110, 480 110 C 480 110, 470 140, 420 150 C 340 170, 290 165, 230 165 C 160 165, 120 150, 120 110 Z" 
                fill="#18181b" 
                stroke="#52525b" 
                strokeWidth="1.5" 
              />
              {/* Inner cockpit and cooling duct outlines */}
              <path d="M 220 110 C 220 85, 250 78, 300 78 C 350 78, 370 110, 370 110 Z" fill="none" stroke="#3f3f46" strokeWidth="1" />
              <path d="M 330 65 L 360 80" stroke="#3f3f46" strokeWidth="1" />
              <path d="M 330 155 L 360 140" stroke="#3f3f46" strokeWidth="1" />

              {/* --- FLAPS INJECTION --- */}

              {/* 1. FRONT LEFT FLAP */}
              <g transform="translate(145, 75)">
                {/* Base Anchor */}
                <circle cx="0" cy="0" r="2" fill="#F59E0B" />
                <motion.line 
                  x1="0" y1="0" x2="-14" y2="-6" 
                  stroke={telemetry.flapAngleFrontLeft > 5 ? "#F59E0B" : "#A1A1AA"} 
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{ rotate: -telemetry.flapAngleFrontLeft }}
                  style={{ originX: 0, originY: 0 }}
                />
                {/* Angle notation floating bubble text */}
                <text x="-18" y="-18" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="end">
                  FL {Math.round(telemetry.flapAngleFrontLeft)}°
                </text>
              </g>

              {/* 2. FRONT RIGHT FLAP */}
              <g transform="translate(145, 145)">
                <circle cx="0" cy="0" r="2" fill="#F59E0B" />
                <motion.line 
                  x1="0" y1="0" x2="-14" y2="6" 
                  stroke={telemetry.flapAngleFrontRight > 5 ? "#F59E0B" : "#A1A1AA"} 
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{ rotate: telemetry.flapAngleFrontRight }}
                  style={{ originX: 0, originY: 0 }}
                />
                <text x="-18" y="24" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="end">
                  FR {Math.round(telemetry.flapAngleFrontRight)}°
                </text>
              </g>

              {/* 3. REAR LEFT FLAP */}
              <g transform="translate(435, 78)">
                <circle cx="0" cy="0" r="2" fill="#EF4444" />
                <motion.line 
                  x1="0" y1="0" x2="16" y2="-8" 
                  stroke={telemetry.flapAngleRearLeft > 10 ? "#EF4444" : "#A1A1AA"} 
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{ rotate: -telemetry.flapAngleRearLeft }}
                  style={{ originX: 0, originY: 0 }}
                />
                <text x="24" y="-15" fill="#EF4444" fontSize="8" fontFamily="monospace" textAnchor="start">
                  RL {Math.round(telemetry.flapAngleRearLeft)}°
                </text>
              </g>

              {/* 4. REAR RIGHT FLAP */}
              <g transform="translate(435, 142)">
                <circle cx="0" cy="0" r="2" fill="#EF4444" />
                <motion.line 
                  x1="0" y1="0" x2="16" y2="8" 
                  stroke={telemetry.flapAngleRearRight > 10 ? "#EF4444" : "#A1A1AA"} 
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{ rotate: telemetry.flapAngleRearRight }}
                  style={{ originX: 0, originY: 0 }}
                />
                <text x="24" y="22" fill="#EF4444" fontSize="8" fontFamily="monospace" textAnchor="start">
                  RR {Math.round(telemetry.flapAngleRearRight)}°
                </text>
              </g>

              {/* Force Vectors Labeling */}
              <text x="280" y="44" fill="#10B981" fontSize="8" fontFamily="monospace">AERO DRAG: Cd {telemetry.dragCoefficient}</text>
              <text x="460" y="98" fill="#EF4444" fontSize="8" fontFamily="monospace">DOWNFORCE VECTOR</text>

            </svg>
            
            {/* Real-time Roll / Pitch HUD gauge */}
            <div className="absolute right-2 bottom-2 p-2 bg-[#0d0d0f] border border-zinc-900 rounded font-mono text-[9px] flex flex-col space-y-1 text-zinc-550">
              <div className="flex justify-between gap-4">
                <span>PITCH_GYRO:</span> 
                <span className={telemetry.pitchDeg < -1 ? "text-amber-400" : "text-zinc-400"}>{telemetry.pitchDeg}°</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>ROLL_GYRO:</span> 
                <span className={telemetry.rollDeg !== 0 ? "text-amber-400" : "text-zinc-400"}>{telemetry.rollDeg}°</span>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-1.5 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 text-[10px] font-mono text-zinc-400">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <span>
              {vehicleState === "speed" && "V-MAX PROFILE: Flaps dropped flat to streamline chassis and eliminate turbulence. Active drag minimized."}
              {vehicleState === "braking" && "EMERGENCY REACCELERATION DEFENSE: Actuating rear wings to 28° acting as heavy aero-anchors. Maximum downforce activated."}
              {vehicleState === "left-curve" && "SWORDS VECTORING ACTIVE: Lifting inner-curve left wing flap to create stabilizing drag vector and arrest drift roll."}
              {vehicleState === "right-curve" && "SWORDS VECTORING ACTIVE: Lifting inner-curve right wing flap to counter body-roll stress and lock down corner exit."}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
