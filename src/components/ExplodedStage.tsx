import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Settings, ShieldAlert, Cpu, RefreshCw, Zap } from "lucide-react";
import heroImg from "../assets/images/pagani_huayra_hero_1779969746295.png";
import chassisImg from "../assets/images/pagani_chassis_blueprint_1779969787623.png";
import engineImg from "../assets/images/pagani_v12_blueprint_1779969766537.png";
import { VehicleLayer, Hotspot } from "../types";

export default function ExplodedStage() {
  const [explosionRatio, setExplosionRatio] = useState<number>(0.3); // 0 (assembled) to 1 (fully exploded)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [viewMode, setViewMode] = useState<"visual" | "wireframe" | "thermal">("visual");

  // Synchronize explosion ratio with browser mouse/touch scroll if in viewport
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("pagan-exploded-stage");
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the element the screen is scroll-aligned
      const start = rect.top - viewportHeight * 0.2;
      const end = rect.bottom - viewportHeight * 0.8;
      const total = end - start;
      
      if (total > 0) {
        const scrolled = -start;
        const ratio = Math.max(0, Math.min(1, scrolled / total));
        // Use a slight dampening for ultra-smooth transition
        setExplosionRatio((prev) => prev + (ratio - prev) * 0.25);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const layers: VehicleLayer[] = [
    {
      id: "shell",
      name: "Aerodynamic Composite Body",
      title: "Active Aero Shell",
      scale: 0.95,
      offsetY: -180,
      color: "border-amber-500 text-amber-400 bg-amber-500/5",
      description: "Made entirely of ultra-light autoclave carbon fiber with carbon-titanium reinforcements. Features 4 independent aerodynamic flaps.",
      hotspots: [
        { id: "h-f1", label: "Active Front Flaps", x: 22, y: 35, description: "Independently actuated carbon flaps regulated by an central ECU to govern drag and cornering vectoring.", metric: "Angle: 0°-28°" },
        { id: "h-f2", label: "Rear Active Wing", x: 84, y: 25, description: "Provides downforce of up to 500kg at 280km/h while serving as an air-brake during hard deceleration.", metric: "Max Downforce: 500kg" }
      ]
    },
    {
      id: "chassis",
      name: "Carbo-Titanium Monocoque HP62",
      title: "Carbo-Titanium Core",
      scale: 0.9,
      offsetY: -40,
      color: "border-blue-500 text-blue-400 bg-blue-500/5",
      description: "A proprietary blend of carbon fibers with interwoven titanium threads, fusing the rigidity of carbon and toughness of titanium.",
      hotspots: [
        { id: "h-c1", label: "Carbon-Titanium Weave", x: 45, y: 45, description: "Provides unprecedented structural integrity and extreme tensile strength without adding excess dead weight.", metric: "Rigidity: +46% compared to carbon" },
        { id: "h-c2", label: "Avional Subframes", x: 70, y: 50, description: "Aeronautical aluminium subframes host the engine, gearbox, and rear suspension modules.", specLink: "metallurgy" }
      ]
    },
    {
      id: "engine",
      name: "AMG M158 Twin-Turbo V12",
      title: "Mercedes-AMG power unit",
      scale: 0.85,
      offsetY: 100,
      color: "border-red-500 text-red-400 bg-red-500/5",
      description: "Handcrafted 6.0L twin-turbo V12 developed specifically for Pagani by Mercedes-AMG engineers, packing monumental mechanical forces.",
      hotspots: [
        { id: "h-e1", label: "Mercedes-AMG V12 Core", x: 65, y: 42, description: "An engineering masterpiece. Dual single-scroll turbochargers, dry-sump lubrication, producing 800 PS and 1,150 Nm torque.", metric: "Power: 789 HP (800 PS)" },
        { id: "h-e2", label: "Titanium Exhaust System", x: 88, y: 62, description: "Quad-tip titanium exhaust tuned acoustically to mirror a high-revving naturally aspirated V12 instrument.", metric: "Weight: 14.8 lbs / 6.7 kg" }
      ]
    },
    {
      id: "suspension",
      name: "Forged Avional Double-Wishbone Setup",
      title: "Suspension & Forged Hubs",
      scale: 0.8,
      offsetY: 230,
      color: "border-emerald-500 text-emerald-400 bg-emerald-500/5",
      description: "Lightweight aeronautical alloy double-wishbones paired with adjustable Öhlins dampers and Brembo carbon-ceramic hardware.",
      hotspots: [
        { id: "h-s1", label: "Brembo CCS Brakes", x: 26, y: 72, description: "Carbon-ceramic rotors with monoblock calipers provide surgical deceleration G-forces under track duress.", metric: "6-piston front / 4-piston rear" },
        { id: "h-s2", label: "Forged Appia Wheels", x: 74, y: 75, description: "Ultra-rigid monolithic forged aluminium alloy wheels optimizing unsprung mass.", metric: "Size: 20\" Front / 21\" Rear" }
      ]
    }
  ];

  const toggleViewMode = () => {
    setViewMode((prev) => {
      if (prev === "visual") return "wireframe";
      if (prev === "wireframe") return "thermal";
      return "visual";
    });
  };

  // Dynamically calculate metrics based on the current state of explosion
  const torsionalRigidityVal = Math.round(46000 + (1 - explosionRatio) * 12000);
  const coreWeightVal = Math.round(1218 + (explosionRatio * 50)); // Simulated mass change
  const structuralIntegrityPercentage = Math.round(100 - (explosionRatio * 85));

  return (
    <section 
      id="pagan-exploded-stage" 
      className="relative min-h-[140vh] w-full bg-[#070708] border-y border-zinc-900 overflow-hidden flex flex-col justify-start px-4 md:px-12 py-16"
    >
      {/* Background Grids and Technical Markings */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-35 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070708] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070708] to-transparent pointer-events-none" />
      
      {/* Precision Frame Borders */}
      <div className="absolute top-6 left-6 text-[10px] font-mono text-zinc-500 tracking-widest pointer-events-none select-none">
        PAGANI AUTOMOBILI MOD.HUAYRA-BC // SEC.EXPLODED_ASSEMBLY_CELL
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono text-amber-500/85 tracking-widest pointer-events-none select-none flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        LIVE STRUCTURAL SIMULATOR: ON
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative mt-6">
        
        {/* Left Side: Document Control HUD */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-amber-500 tracking-[0.25em] uppercase block">
              Interactive Blueprint
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white font-sans">
              Decomposed <span className="font-extralight text-zinc-400">Engineering</span>
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Use the tactile structural slider below or drag-scroll the page to physically pull apart the Pagani Huayra BC, revealing internal aeronautical components underneath the carbon weave.
            </p>
          </div>

          {/* Core Controls */}
          <div className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-900/80 backdrop-blur-md space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <Settings className="h-3.5 w-3.5 text-amber-500" />
                  EXPLOSION MULTIPLIER
                </span>
                <span className="text-amber-400 font-bold">{(explosionRatio * 100).toFixed(0)} %</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={explosionRatio}
                onChange={(e) => setExplosionRatio(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-zinc-900 rounded-lg cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>0.0 (CONSOLIDATED)</span>
                <span>1.0 (MAX DETACHED)</span>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="space-y-2 pt-2 border-t border-zinc-900">
              <span className="text-[10px] font-mono text-zinc-500 block">BLUEPRINT FILTER SCHEMATIC</span>
              <div className="grid grid-cols-3 gap-1">
                <button 
                  onClick={() => setViewMode("visual")}
                  className={`py-1.5 px-2 rounded font-mono text-[10px] border tracking-wider transition-all duration-300 ${
                    viewMode === "visual" 
                      ? "border-amber-500 bg-amber-500/10 text-amber-400" 
                      : "border-zinc-900 bg-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  VISUAL
                </button>
                <button 
                  onClick={() => setViewMode("wireframe")}
                  className={`py-1.5 px-2 rounded font-mono text-[10px] border tracking-wider transition-all duration-300 ${
                    viewMode === "wireframe" 
                      ? "border-amber-500 bg-amber-500/10 text-amber-400" 
                      : "border-zinc-900 bg-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  CAD GRID
                </button>
                <button 
                  onClick={() => setViewMode("thermal")}
                  className={`py-1.5 px-2 rounded font-mono text-[10px] border tracking-wider transition-all duration-300 ${
                    viewMode === "thermal" 
                      ? "border-amber-500 bg-amber-500/10 text-amber-400" 
                      : "border-zinc-900 bg-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  THERMAL
                </button>
              </div>
            </div>

            {/* Micro Specs Display */}
            <div className="space-y-3 pt-3 border-t border-zinc-900 text-xs font-mono">
              <div className="flex justify-between items-center bg-zinc-900/30 p-2 rounded">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Cpu className="h-3 w-3 text-amber-500" /> RIGIDITY:
                </span>
                <span className="text-zinc-300">{torsionalRigidityVal.toLocaleString()} Nm/rad</span>
              </div>
              <div className="flex justify-between items-center bg-zinc-900/30 p-2 rounded">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Zap className="h-3 w-3 text-amber-500" /> ACTIVE STRUCTURAL IND:
                </span>
                <span className={explosionRatio < 0.15 ? "text-emerald-400" : "text-amber-400"}>
                  {explosionRatio < 0.15 ? "100% INTEGRATED" : `${structuralIntegrityPercentage}% APART`}
                </span>
              </div>
              <div className="flex justify-between items-center bg-zinc-900/30 p-2 rounded">
                <span className="text-zinc-500 flex items-center gap-1">
                  <RefreshCw className="h-3 w-3 text-amber-500 animate-spin-slow" /> COG HEIGHT:
                </span>
                <span className="text-zinc-300">{Math.round(380 + (explosionRatio * 520))} mm</span>
              </div>
            </div>
            
            {/* Auto reset */}
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setExplosionRatio(0)}
                className="text-[10px] font-mono text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="h-2.5 w-2.5" /> RE-ALIGN HULL
              </button>
              <button 
                onClick={() => setExplosionRatio(0.8)}
                className="text-[10px] font-mono text-amber-500 hover:text-amber-400 transition-colors"
              >
                FULLY DETACH
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Virtual Museum Stage Layer Area */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[680px] w-full select-none cursor-grab active:cursor-grabbing border border-zinc-920 rounded-2xl bg-zinc-950/20 p-4 overflow-hidden">
          
          {/* Diagnostic Crosshairs and Borders */}
          <div className="absolute top-4 left-4 h-3 w-4 border-t border-l border-zinc-700 pointer-events-none" />
          <div className="absolute top-4 right-4 h-3 w-4 border-t border-r border-zinc-700 pointer-events-none" />
          <div className="absolute bottom-4 left-4 h-3 w-4 border-b border-l border-zinc-700 pointer-events-none" />
          <div className="absolute bottom-4 right-4 h-3 w-4 border-b border-r border-zinc-700 pointer-events-none" />
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-zinc-900/40 pointer-events-none" />
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-zinc-900/40 pointer-events-none" />
          
          {/* Interactive instruction banner */}
          <AnimatePresence>
            {explosionRatio < 0.1 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-8 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] rounded-lg tracking-widest uppercase z-30"
              >
                CAR ASSEMBLY CLOSED // SLIDE FOR EXPLODED MODEL
              </motion.div>
            )}
          </AnimatePresence>

          {/* Canvas Wrapper */}
          <div className="relative w-full max-w-[640px] h-[580px] flex items-center justify-center">
            
            {/* The Layers Render Container */}
            {layers.map((layer, index) => {
              // Calculate dynamically computed displacement Y offsets based on the explosion ratio
              const currentOffsetY = layer.offsetY * explosionRatio;
              // Add a slight perspective scaling factor when exploded
              const currentScale = layer.scale + (explosionRatio * 0.05);
              // Calculate opacity - layers stack nicely
              const layerOpacity = viewMode === "visual" 
                ? 1 - (explosionRatio * (index * 0.12)) // slight transparency to see through
                : 0.85;

              return (
                <motion.div
                  key={layer.id}
                  style={{
                    y: currentOffsetY,
                    scale: currentScale,
                    zIndex: 20 - index,
                  }}
                  animate={{
                    filter: viewMode === "thermal" 
                      ? "hue-rotate(240deg) saturate(3) opacity(0.85) contrast(1.2)" 
                      : viewMode === "wireframe" 
                        ? "invert(0.1) opacity(0.65) contrast(1.3) grayscale(1)" 
                        : "none"
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 25 }}
                  className="absolute w-full h-[180px] flex items-center justify-center transition-all duration-300"
                >
                  <div className="relative w-full h-full max-w-[500px]">
                    
                    {/* Component Graphical Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {layer.id === "shell" && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Rich High-Fidelity Render of the Complete Car */}
                          <img 
                            src={heroImg} 
                            alt={layer.name} 
                            className="w-full h-auto max-h-[140px] object-contain opacity-95 hover:scale-[1.02] filter drop-shadow-[0_4px_24px_rgba(229,169,60,0.15)] transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {viewMode === "wireframe" && (
                            <div className="absolute inset-0 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center justify-center pointer-events-none">
                              <span className="font-mono text-[9px] text-amber-500/50">OUTER SKIN METESHAPE</span>
                            </div>
                          )}
                        </div>
                      )}

                      {layer.id === "chassis" && (
                        <div className="relative w-[110%] h-full flex items-center justify-center">
                          {/* Rich Generated Chassis Blueprint Image */}
                          <img 
                            src={chassisImg} 
                            alt={layer.name} 
                            className="w-[90%] h-auto max-h-[160px] object-contain opacity-90 brightness-110 filter drop-shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {layer.id === "engine" && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Rich Generated Engine Blueprint Image */}
                          <img 
                            src={engineImg} 
                            alt={layer.name} 
                            className="w-[85%] h-auto max-h-[150px] object-contain opacity-90 filter drop-shadow-[0_4px_24px_rgba(239,68,68,0.15)]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {layer.id === "suspension" && (
                        <div className="relative w-[115%] h-full flex items-center justify-center">
                          {/* Detailed Suspensions / Wheels SVG mockup */}
                          <svg viewBox="0 0 400 120" className="w-[88%] h-auto opacity-70 filter drop-shadow-[0_4px_20px_rgba(16,185,129,0.15)]">
                            <line x1="80" y1="60" x2="160" y2="40" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 3"/>
                            <line x1="320" y1="60" x2="240" y2="40" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 3"/>
                            <rect x="150" y="32" width="100" height="15" rx="5" fill="#18181b" stroke="#10B981" strokeWidth="1.5"/>
                            {/* Wheels */}
                            <circle cx="65" cy="60" r="32" fill="none" stroke="#52525b" strokeWidth="6"/>
                            <circle cx="65" cy="60" r="22" fill="#18181b" stroke="#10B981" strokeWidth="2"/>
                            <circle cx="335" cy="60" r="34" fill="none" stroke="#52525b" strokeWidth="6"/>
                            <circle cx="335" cy="60" r="24" fill="#18181b" stroke="#10B981" strokeWidth="2"/>
                            <text x="160" y="44" fill="#10B981" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">ÖHLINS SUSP SUBPLATE</text>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Laser Alignment Coordinates & Annotation Label Overlay (Only when exploded) */}
                    {explosionRatio > 0.25 && (
                      <div className="absolute top-0 left-0 text-[9px] font-mono p-1 rounded bg-black/60 border border-zinc-900 flex flex-col justify-start text-zinc-500 pointer-events-none">
                        <span className="text-white font-medium">{layer.title.toUpperCase()}</span>
                        <span>POS: {Math.round(currentOffsetY)}mm | dY: {explosionRatio.toFixed(2)}m</span>
                      </div>
                    )}

                    {/* Hotspots rendering */}
                    {explosionRatio > 0.35 && layer.hotspots.map((hotspot) => {
                      const isActive = activeHotspot?.id === hotspot.id;

                      return (
                        <div
                          key={hotspot.id}
                          style={{
                            left: `${hotspot.x}%`,
                            top: `${hotspot.y}%`,
                          }}
                          className="absolute z-55 group"
                        >
                          <button
                            onClick={() => setActiveHotspot(isActive ? null : hotspot)}
                            className={`h-5 w-5 rounded-full flex items-center justify-center border transition-all duration-300 relative ${
                              isActive 
                                ? "bg-amber-500 border-white text-black scale-110 shadow-lg shadow-amber-500/50" 
                                : "bg-black/85 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black hover:scale-105"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {/* Pulse effect */}
                            <span className="absolute inset-0 rounded-full border border-current animate-ping opacity-25 scale-150 pointer-events-none" />
                          </button>

                          {/* Quick Tooltip label (Desktop preview hover) */}
                          <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#0d0d0f] border border-zinc-800 text-[10px] font-mono text-zinc-300 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                            {hotspot.label}
                          </div>
                        </div>
                      );
                    })}

                    {/* Exploded alignment guide lines */}
                    {explosionRatio > 0.5 && index < layers.length - 1 && (
                      <div className="absolute bottom-[-15px] left-1/2 w-[2px] h-[30px] bg-dashed pointer-events-none opacity-20">
                        <svg className="w-full h-full">
                          <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
                        </svg>
                      </div>
                    )}

                  </div>
                </motion.div>
              );
            })}

          </div>

          {/* Dynamic Specs Bottom Info-bar */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-center py-2.5 px-4 bg-zinc-950/80 border border-zinc-900 rounded-xl font-mono text-[10px] text-zinc-500 gap-2 md:gap-0 z-30">
            <div className="flex items-center gap-1">
              <Info className="h-3.5 w-3.5 text-amber-500" />
              <span>ACTIVE LAYER FOCUS: <span className="text-zinc-300 font-bold">{activeHotspot ? activeHotspot.label : "NONE SELECTED"}</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span>DRY MASS: <span className="text-zinc-300 font-bold">{coreWeightVal} KG</span></span>
              <span>COG POSITION: <span className="text-zinc-300 font-bold">{explosionRatio < 0.2 ? "OPTIMAL" : "DISRUPTED"}</span></span>
            </div>
          </div>

          {/* Hotspot Detailed Information Panel (Absolute internal overlay drawer or card, beautifully animated) */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="absolute inset-x-4 bottom-16 md:bottom-20 md:left-auto md:right-4 md:w-80 rounded-xl bg-zinc-950/95 border border-amber-500/30 p-5 shadow-2xl backdrop-blur-lg z-50 flex flex-col space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono text-amber-500 tracking-[0.2em] uppercase">SYSTEM COMPONENT</span>
                    <h4 className="text-sm font-medium text-white tracking-wide">{activeHotspot.label}</h4>
                  </div>
                  <button 
                    onClick={() => setActiveHotspot(null)}
                    className="text-xs font-mono text-zinc-500 hover:text-white border border-zinc-805 bg-zinc-900/40 px-1.5 py-0.5 rounded transition-transform"
                  >
                    CLOSE
                  </button>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {activeHotspot.description}
                </p>
                {activeHotspot.metric && (
                  <div className="p-2 rounded bg-amber-500/5 border border-amber-500/10 flex justify-between items-center text-[11px] font-mono">
                    <span className="text-zinc-500">DIAGNOSTIC DATA:</span>
                    <span className="text-amber-400 font-bold">{activeHotspot.metric}</span>
                  </div>
                )}
                <div className="text-[9px] font-mono text-zinc-600 border-t border-zinc-900 pt-2 flex items-center justify-between">
                  <span>TELEMETRY CLS // SECURE_LINK</span>
                  <span className="text-emerald-500">● LIVE CONNECTION</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
