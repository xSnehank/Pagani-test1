import { Shield, Sparkles, Anchor, Gauge, Hammer, Compass } from "lucide-react";
import { TechnicalSpec } from "../types";

export default function SpecsGrid() {
  const specs: TechnicalSpec[] = [
    { id: "s-engine", category: "Engine", label: "Powerplant Model", value: "Mercedes-AMG M158 Twin-Turbo V12", details: "Handbuilt 60° V12 engine block featuring individual cylinder compression optimization and bespoke single-scroll turbochargers." },
    { id: "s-disp", category: "Engine", label: "Displacement / Output", value: "5,980 cc / 789 HP (800 PS)", details: "Delivers maximum horsepower at 6,200 RPM, with a dramatic, throat-clearing mechanical exhaust score." },
    { id: "s-torque", category: "Engine", label: "Peak Max Torque", value: "1,100 Nm (810 lb-ft) @ 2,250-4,500 RPM", details: "Incredibly flat, sustained torque curve resulting in linear, hydraulic-like speed deceleration-defying responses." },
    
    { id: "s-chassis", category: "Chassis", label: "Structural Monocoque", value: "Carbo-Titanium HP62 & Carbo-Triax", details: "Woven filaments of carbon-fiber with surgical titanium alloy thread, offering extreme torsional rigidity and anti-shatter defense." },
    { id: "s-subf", category: "Chassis", label: "Front & Rear Subframes", value: "Aeronautical Alloy Chromoly steel", details: "High-tensile modular tubular subframes tuned to flex micro-scopically to dissipate shock impacts without fracturing." },
    { id: "s-weight", category: "Chassis", label: "Core Clean Tare Mass", value: "1,218 kg (2,685 lbs) Dry Weight", details: "Lighter than standard Huayra by 132kg, achieved through titanium exhaust, lightweight suspension and extreme autoclave fiber density." },
    
    { id: "s-trans", category: "Drivetrain", label: "Gearbox Assembly", value: "Xtrac 7-speed Automated Manual", details: "Transverse automated manual with carbon fiber syncs, electro-hydraulic actuators. Lighter by 40% than dual-clutch units." },
    { id: "s-diff", category: "Drivetrain", label: "Differential Unit", value: "Electronic Active Differential", details: "Central traction controller calculating corner velocities and modulating clutch pressure to lock diff on throttle exit." },
    
    { id: "s-susp", category: "Aero & Suspension", label: "Damper Mechanics", value: "Öhlins Adjustable Dampers", details: "Aeronautical avional forged double-wishbone architecture hosting high-speed coilover assemblies with electronic rate feedback." },
    { id: "s-aero", category: "Aero & Suspension", label: "Aerodynamic Setup", value: "4 Independent Active Flaps ECU", details: "Four aerodynamic control vectors modulating wing heights dynamically to match real-time side load vectorings." }
  ];

  return (
    <section id="specs-dashboard" className="w-full bg-[#070708] border-b border-zinc-900 py-16 px-4 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full z-10 space-y-12">
        
        {/* Intro header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-[11px] font-mono text-amber-500 tracking-[0.25em] uppercase">SPECIFICATIONS FILE</span>
          <h3 className="text-3xl font-light text-white font-sans">
            Technical <span className="font-semibold text-zinc-400">Blueprint Matrix</span>
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every millimeter of the Pagani Huayra BC represents an intense dialog between artisanal styling and rigorous aeronautical engineering. Review the official museum data.
          </p>
        </div>

        {/* Bento Spec Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Engine Card */}
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-900 flex flex-col justify-between space-y-6 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Gauge className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">Mercedes-AMG Performance Engine Specs</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono border-t border-b border-zinc-900 py-6">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">MODEL</span>
                <span className="text-sm font-semibold text-white block mt-1 tracking-tight">AMG M158 V12</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">POWER</span>
                <span className="text-sm font-semibold text-white block mt-1 tracking-tight">789 HP @ 6,200 RPM</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">MAX PEAK TORQUE</span>
                <span className="text-sm font-semibold text-white block mt-1 tracking-tight">1,100 Nm @ 2250-4500</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Mercedes-AMG handcrafted the twin-cooled powerhouse specifically to align with Pagani&rsquo;s acoustic envelope and lightweight targets. It delivers immediate throttle responses with a screaming 7,500 RPM redline.
            </p>
          </div>

          {/* Core Composites Card */}
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-900 flex flex-col justify-between space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-550/20 flex items-center justify-center text-amber-500">
                <Hammer className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">Material Science Spec</span>
            </div>

            <div className="space-y-2 border-t border-zinc-900 pt-4 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase">WEAVE DENSITY & MASS:</span>
              <div className="text-lg font-light text-white tracking-tight flex items-baseline gap-1">
                <span>1,218</span> <span className="text-xs text-amber-500 font-bold">KG DRY WEIGHT</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Proprietary <span className="text-amber-400">Carbo-Titanium</span> and <span className="text-amber-400">Carbo-Triax HP62</span> monocoque fibers increase torsional rigidity by 46% compared to standard weaves while drastically shaving weight.
            </p>
          </div>

          {/* Drivetrain Card */}
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-900 flex flex-col justify-between space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-450">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">Drivetrain Specification</span>
            </div>

            <div className="space-y-1 border-t border-zinc-900 pt-4 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase">TRANSMISSION:</span>
              <span className="text-xs font-semibold text-white block">Xtrac 7-Speed Seq Manual</span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              A single-clutch carbon-sync sequential box is 40% lighter than automatic dual-clutch transmission units. Actuation cycles down to 75 milliseconds.
            </p>
          </div>

          {/* Aerodynamics Card */}
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-900 flex flex-col justify-between space-y-6 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-510/20 flex items-center justify-center text-emerald-400">
                <Anchor className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">Aero Downforce Matrix</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono border-t border-b border-zinc-900 py-6">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">DOWNFORCE AT VMAX (280 KM/H)</span>
                <span className="text-base font-semibold text-white block mt-1 tracking-tight">500 KG (1,102 LBS)</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">AERODYNAMIC DRAG RANGE</span>
                <span className="text-base font-semibold text-white block mt-1 tracking-tight">Cd 0.33 to Cd 0.72 (Airbrake on)</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Four independent flap actuators coordinate with engine telemetry, yaw vectors, speed curves, and pitching sensors to modulate horizontal stability angles and corner vertical traction forces safely.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
