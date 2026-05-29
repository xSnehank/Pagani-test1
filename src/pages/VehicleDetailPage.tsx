import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  MapPin, 
  Clock, 
  Cpu, 
  Gauge, 
  Zap, 
  Bot, 
  Settings, 
  HelpCircle, 
  ArrowUpRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";

import ExplodedStage from "../components/ExplodedStage";
import ActiveAeroLab from "../components/ActiveAeroLab";
import V12PerformanceDyno from "../components/V12PerformanceDyno";
import AICurator from "../components/AICurator";
import SpecsGrid from "../components/SpecsGrid";
import { vehicles, VehicleData } from "../data/vehicles";

export default function VehicleDetailPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>("2026-05-28T11:59:29Z");
  const [activeTab, setActiveTab] = useState<string>("blueprints");

  // Retrieve matching vehicle data
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  // Auto-scroll to top on navigation/mount
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [vehicleId]);

  // Track scroll position to update header active link dynamically
  useEffect(() => {
    if (!vehicle) return;

    const handleScroll = () => {
      const sections = ["pagan-exploded-stage", "aero-lab", "performance-dyno", "ai-curator", "specs-dashboard"];
      const currentScroll = window.scrollY + window.innerHeight * 0.45;

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (currentScroll >= top && currentScroll <= top + height) {
            if (sect === "pagan-exploded-stage") setActiveTab("blueprints");
            else if (sect === "aero-lab") setActiveTab("aero");
            else if (sect === "performance-dyno") setActiveTab("v12");
            else if (sect === "ai-curator") setActiveTab("curator");
            else if (sect === "specs-dashboard") setActiveTab("specs");
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [vehicle]);

  // Update current time indicator 
  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.toISOString().split(".")[0] + "Z");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const smoothScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // If vehicle key is invalid, display a stunning error recovery page
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-zinc-950 border border-red-500/20 rounded-2xl p-8 max-w-md space-y-4">
          <span className="text-[10px] font-mono text-red-400 block tracking-widest uppercase">LINEAGE FAULT</span>
          <h3 className="text-xl font-light">Vehicle Profile Not Located</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono">
            COULD NOT RESOLVE PROFILE LINK FOR THE ID: &quot;{vehicleId}&quot;. CHASSIS DATA REGISTRY RETURNED NULL.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold font-mono text-xs rounded transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO RECONSTRUCT</span>
          </Link>
        </div>
      </div>
    );
  }

  // Set up custom curator prompt context matching the active vehicle specifications
  const customCuratorContext = `You are the Pagani engineering curator specialized strictly in the Pagani ${vehicle.name} (${vehicle.year}).
Technical details:
- Category group: ${vehicle.category}.
- Peak powerplant specs: ${vehicle.specs.power} passing through a ${vehicle.specs.gearbox}.
- Gearbox transmission setup: ${vehicle.specs.gearbox}.
- Aspiration type: ${vehicle.engine.aspiration}.
- Maximum dry chassis mass scale: ${vehicle.specs.weight}.
- Structural composition matrices: ${vehicle.specs.material}.
- Background narrative story: ${vehicle.introText} ${vehicle.storyParagraphs.join(" ")}
Format every response with extreme mechanical precision, referencing Horacio Pagani's Art and Science axes, metallurgic carbon composite processes, and linear aerodynamics curves.`;

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col justify-start selection:bg-amber-500 selection:text-black">
      
      {/* 1. TOP ULTRA-PREMIUM NAVIGATION BAR */}
      <header className="fixed top-0 inset-x-0 bg-[#070708]/85 border-b border-zinc-900/60 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-7">
          {/* Brand Logo and Back trigger */}
          <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mr-2">
            <ArrowLeft className="h-4 w-4 text-amber-500" />
            <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:block">MUSEUM</span>
          </Link>
          
          <div className="flex flex-col select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="flex items-baseline gap-1.5 font-display text-base tracking-[0.25em] font-medium text-white uppercase">
              PAGANI <span className="text-amber-500 text-xs font-bold font-mono">{vehicle.name}</span>
            </div>
            <span className="text-[8px] font-mono tracking-widest text-zinc-550 mr-auto uppercase">Modena // Automobili</span>
          </div>

          {/* Jump-Links Navigation Nodes */}
          <nav className="hidden xl:flex items-center gap-6 text-[10px] uppercase font-mono tracking-widest border-l border-zinc-800 pl-6 text-zinc-500">
            <button 
              onClick={() => smoothScrollTo("pagan-exploded-stage")}
              className={`hover:text-amber-400 transition-colors ${activeTab === "blueprints" ? "text-amber-400 font-bold" : ""}`}
            >
              ASSEMBLY BLUEPRINTS
            </button>
            <button 
              onClick={() => smoothScrollTo("aero-lab")}
              className={`hover:text-amber-400 transition-colors ${activeTab === "aero" ? "text-amber-400 font-bold" : ""}`}
            >
              ACTIVE AERO
            </button>
            <button 
              onClick={() => smoothScrollTo("performance-dyno")}
              className={`hover:text-amber-400 transition-colors ${activeTab === "v12" ? "text-amber-400 font-bold" : ""}`}
            >
              V12 PERFORMANCE
            </button>
            <button 
              onClick={() => smoothScrollTo("ai-curator")}
              className={`hover:text-amber-400 transition-colors ${activeTab === "curator" ? "text-amber-400 font-bold" : ""}`}
            >
              AI CURATOR
            </button>
            <button 
              onClick={() => smoothScrollTo("specs-dashboard")}
              className={`hover:text-amber-400 transition-colors ${activeTab === "specs" ? "text-amber-400 font-bold" : ""}`}
            >
              BLUEPRINT MATRIX
            </button>
          </nav>
        </div>

        {/* Global Track Telemetry Output indicators */}
        <div className="flex items-center gap-5 text-[10px] font-mono text-zinc-500">
          <div className="hidden lg:flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-900">
            <MapPin className="h-3.5 w-3.5 text-amber-500" />
            <span>HQ: SAN CESARIO SUL PANARO</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-900 text-zinc-400">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span>UTC: {currentTime}</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN CINEMATIC HERO SCREEN */}
      <section className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 md:px-12 pt-32 pb-12 overflow-hidden z-20">
        
        {/* Background Grid Lines & Glimmers */}
        <div className="absolute inset-0 bg-[#070708] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 filter blur-[150px] pointer-events-none" />

        {/* Framing border CAD details */}
        <div className="absolute top-28 left-6 right-6 h-[1px] bg-zinc-900/50 hidden md:block" />
        <div className="absolute bottom-16 left-6 right-6 h-[1px] bg-zinc-900/50 hidden md:block" />

        {/* Technical margins */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col justify-start space-y-4 text-[9px] font-mono text-zinc-600 uppercase select-none tracking-widest leading-none">
          <span>LAT_TRANS // REF_REGALIA_99</span>
          <span>LONG_COORDS // 44.54228 N, 11.02640 E</span>
          <div className="h-16 w-[1px] bg-gradient-to-b from-zinc-800 to-transparent mt-2" />
        </div>

        {/* Centerpiece Hero Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 z-10 my-auto pt-6 md:pt-0">
          
          {/* Hero Left Aspect: Story description */}
          <div className="lg:col-span-6 flex flex-col space-y-6 animate-fade-in">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/35 rounded-full select-none">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span className="font-mono text-[9px] text-amber-400 uppercase tracking-[0.2em] font-medium">Snehank~~</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-sans font-light tracking-tight text-white leading-[1.08] uppercase">
                PAGANI {vehicle.name.split(" ").slice(1).join(" ") || vehicle.name} <br />
                <span className="font-semibold text-amber-450 drop-shadow-sm">Experience</span>
              </h1>
            </div>

            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-lg font-light">
              {vehicle.introText}
            </p>

            {/* Quick specifications display */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-zinc-900/80 py-5 max-w-md font-mono text-xs text-zinc-550">
              <div>
                <span className="text-[9px] block">POWERPLANT</span>
                <span className="text-zinc-200 mt-1 block font-bold text-sm tracking-tight">{vehicle.engine.aspiration === "Naturally Aspirated" ? "N/A V12" : "V12 TwinTurbo"}</span>
                <span className="text-[8px] text-zinc-650">{vehicle.engine.engineModel}</span>
              </div>
              <div>
                <span className="text-[9px] block">POWER OUTPUT</span>
                <span className="text-zinc-200 mt-1 block font-bold text-sm tracking-tight">{vehicle.engine.maxHp} HP</span>
                <span className="text-[8px] text-zinc-650">At {vehicle.engine.peakRpm} RPM</span>
              </div>
              <div>
                <span className="text-[9px] block">CLEAN SCALE MASS</span>
                <span className="text-zinc-200 mt-1 block font-bold text-sm tracking-tight">{vehicle.specs.weight.toUpperCase()}</span>
                <span className="text-[8px] text-zinc-650">Composite structure</span>
              </div>
            </div>

            {/* Downward navigation triggers */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => smoothScrollTo("pagan-exploded-stage")}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black border border-amber-400 font-mono text-xs uppercase tracking-widest font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <span>ENTER BLUEPRINTS</span>
                <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
              </button>
              
              <button 
                onClick={() => smoothScrollTo("ai-curator")}
                className="px-6 py-3.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-805 font-mono text-xs uppercase tracking-widest text-zinc-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Bot className="h-4 w-4 text-amber-500" />
                <span>LAUNCH AI CURATOR</span>
              </button>
            </div>
          </div>

          {/* Hero Right Aspect: Car graphic profile */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0">
            {/* Fine architectural circular CAD lines overlay */}
            <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] border border-zinc-900 rounded-full pointer-events-none opacity-40 animate-spin-slow" />
            <div className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] border border-dashed border-zinc-900 rounded-full pointer-events-none opacity-30 animate-spin-slow [animation-direction:reverse]" />
            
            {/* The main high-fidelity complete car rendering */}
            <div className="relative w-full max-w-[480px]">
              <img 
                src={vehicle.explodedLayers?.[0]?.image || vehicles.find((car) => car.id === "huayra-bc")?.explodedLayers?.[0]?.image} 
                alt={`${vehicle.name} side profile`}
                style={{
                  filter: vehicle.hueRotate && vehicle.hueRotate !== "none" ? vehicle.hueRotate : "none"
                }}
                className="w-full h-auto object-contain rounded-2xl border border-zinc-900 shadow-2xl transform hover:scale-102 transition-transform duration-700 select-none" 
              />
              
              {/* Technical floating markers */}
              <div className="absolute top-[40%] left-[-5%] p-2 rounded-lg bg-[#070708]/90 border border-zinc-800 font-mono text-[9px] space-y-0.5 text-zinc-500 shadow-xl select-none">
                <span className="text-zinc-200 block font-bold">CORE SPECIFICATION</span>
                <span>{(vehicle.specs?.material || "Carbon").split(" ")[0]} COMPOSITE</span>
              </div>
              <div className="absolute bottom-[20%] right-[-5%] p-2 rounded-lg bg-[#070708]/90 border border-zinc-800 font-mono text-[9px] space-y-0.5 text-zinc-500 shadow-xl select-none">
                <span className="text-zinc-200 block font-bold">TRANSMISSION LOCK</span>
                <span>{(vehicle.specs?.gearbox || "7-Speed").split(" ")[0]} SPEED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Down indicator */}
        <div className="w-full flex justify-center items-center z-10 select-none mt-12 md:mt-0">
          <button 
            onClick={() => smoothScrollTo("pagan-exploded-stage")}
            className="text-[9px] font-mono uppercase tracking-[0.3em] hover:text-amber-400 text-zinc-550 flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>SCROLL DOWN TO DECOMPOSE MECHANICAL ASSEMBLIES</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-amber-500" />
          </button>
        </div>

      </section>

      {/* 3. PRIMARY INTERACTIVE DECOMPOSITION ASSEMBLY STAGE (PARAMETERIZED) */}
      <ExplodedStage 
        layers={vehicle.explodedLayers} 
        hueRotate={vehicle.hueRotate} 
        vehicleName={vehicle.name} 
      />

      {/* 4. ACTIVE AERODYNAMICS WIND-TUNNEL LAB */}
      <ActiveAeroLab />

      {/* 5. AMG V12 PERFORMANCE ACOUSTIC CHAMBER (PARAMETERIZED) */}
      <V12PerformanceDyno 
        engineModel={vehicle.engine.engineModel}
        aspiration={vehicle.engine.aspiration}
        maxHp={vehicle.engine.maxHp}
        maxTorqueVal={vehicle.engine.maxTorqueVal}
        peakRpm={vehicle.engine.peakRpm}
      />

      {/* 6. COGNITIVE AI AUTOMOTIVE CURATOR CABIN (PARAMETERIZED) */}
      <AICurator 
        vehicleName={vehicle.name} 
        vehicleContext={customCuratorContext} 
      />

      {/* 7. DETAILED SPEC MATRIX DATA SHEETS (PARAMETERIZED) */}
      <SpecsGrid specs={vehicle.specs} />

      {/* 8. EXPERIENTIAL FOOTER */}
      <footer className="w-full bg-[#050506] border-t border-zinc-950 py-16 px-4 md:px-12 flex flex-col items-center font-sans">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          
          {/* Branded Block */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-baseline gap-1.5 font-display text-lg tracking-[0.3em] font-medium text-white select-none">
              PAGANI <span className="text-amber-500 text-xs font-mono font-bold uppercase">{vehicle.name}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Constructed in Italy. Showcased to digital car-culture scholars in our high-performance simulation canvas. Fusing Leonardo da Vinci&rsquo;s *Arte e Scienza* into digital product design.
            </p>
            <div className="text-[10px] font-mono text-zinc-550">
              © {new Date().getFullYear()} PAGANI AUTOMOBILI S.P.A. CLIENT CORE // REGISTRY COMPLETE
            </div>
          </div>

          {/* Quick Hub Directories */}
          <div className="space-y-4 font-mono text-xs">
            <span className="text-[9px] text-zinc-550 uppercase block tracking-widest font-bold">DIRECTORY ARCHIVE</span>
            <nav className="flex flex-col space-y-2 text-zinc-455">
              <Link to="/" className="text-left text-zinc-400 hover:text-amber-400 transition-colors tracking-wider uppercase text-[11px]">Return to Museum</Link>
              <button onClick={() => smoothScrollTo("pagan-exploded-stage")} className="text-left hover:text-amber-400 transition-colors tracking-wider uppercase text-[11px]">Assembly Blueprints</button>
              <button onClick={() => smoothScrollTo("aero-lab")} className="text-left hover:text-amber-400 transition-colors tracking-wider uppercase text-[11px]">Active Aero Lab</button>
              <button onClick={() => smoothScrollTo("performance-dyno")} className="text-left hover:text-amber-400 transition-colors tracking-wider uppercase text-[11px]">Performance Bench</button>
            </nav>
          </div>

          {/* High-Performance Status Specs */}
          <div className="space-y-4 font-mono text-xs text-zinc-550">
            <span className="text-[9px] text-zinc-550 uppercase block tracking-widest font-bold">DIAG_STATUS // LOG</span>
            <div className="space-y-1 text-[11px]">
              <div>ACTIVE PROFILE: <span className="text-amber-400 uppercase">{vehicle.id}</span></div>
              <div>INGRESS LINK: <span className="text-zinc-300">CLOUD_RUN PORT_3000</span></div>
              <div>SCALE COUNT: <span className="text-zinc-300 uppercase">{vehicle.productionCount}</span></div>
              <div className="text-[9px] mt-2 flex items-center gap-1 text-zinc-650">
                <Cpu className="h-3.5 w-3.5" />
                <span>SPEC MATRIX RENDERING COMPLETE</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
