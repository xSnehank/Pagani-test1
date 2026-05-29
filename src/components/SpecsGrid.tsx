import { Shield, Sparkles, Anchor, Gauge, Hammer, Compass } from "lucide-react";
import { TechnicalSpec } from "../types";

interface SpecsGridProps {
  specs?: {
    engineModel?: string;
    aspiration?: "Naturally Aspirated" | "Twin-Turbocharged";
    displacement?: string;
    power?: string;
    maxHp?: number;
    peakRpm?: number;
    maxTorqueVal?: number;
    torque?: string;
    torqueRpmRange?: string;
    transmission?: string;
    gearboxDetail?: string;
    chassisMonocoque?: string;
    chassisDetail?: string;
    dryWeight?: string;
    dryWeightKg?: number;
    downforceVmax?: string;
    downforceKg?: number;
    dragCdRange?: string;
    clutterAeroDetails?: string;

    // Simplified fields from dynamic database records
    topSpeed?: string;
    acceleration?: string;
    material?: string;
    weight?: string;
    gearbox?: string;
  };
}

export default function SpecsGrid({ specs }: SpecsGridProps) {
  const baseSpecs = specs || {};
  
  // Resolve properties dynamically supporting both rich defaults or dynamic database overrides
  const activeSpecs = {
    engineModel: baseSpecs.engineModel || "Mercedes-AMG Custom V12 Engine",
    aspiration: baseSpecs.aspiration || "Twin-Turbocharged",
    displacement: baseSpecs.displacement || "5,980 cc",
    power: baseSpecs.power || "789 HP (800 PS)",
    maxHp: baseSpecs.maxHp || 789,
    peakRpm: baseSpecs.peakRpm || 6200,
    maxTorqueVal: baseSpecs.maxTorqueVal || 1100,
    torque: baseSpecs.torque || "1,100 Nm (810 lb-ft) @ 2,250-4,500 RPM",
    torqueRpmRange: baseSpecs.torqueRpmRange || "2250-4500",
    transmission: baseSpecs.transmission || baseSpecs.gearbox || "7-speed Transaxle",
    gearboxDetail: baseSpecs.gearboxDetail || `Gated or sequential transaxles designed to funnel massive raw forces to the rear hubs. Configured layout: ${baseSpecs.gearbox || "Bespoke high performance transmission"}.`,
    chassisMonocoque: baseSpecs.chassisMonocoque || baseSpecs.material || "Carbo-Titanium HP62 & Carbo-Triax",
    chassisDetail: baseSpecs.chassisDetail || `Chassis built around an ultra-high torsional resistance core tub: ${baseSpecs.material || "Advanced Carbon Composite matrices"}.`,
    dryWeight: baseSpecs.dryWeight || baseSpecs.weight || "1,218 kg (2,685 lbs) Dry Weight",
    dryWeightKg: baseSpecs.dryWeightKg || (baseSpecs.weight ? parseInt(baseSpecs.weight) : 1218),
    downforceVmax: baseSpecs.downforceVmax || (baseSpecs.topSpeed ? `Max stability at ${baseSpecs.topSpeed}` : "500 KG at 280 KM/H"),
    downforceKg: baseSpecs.downforceKg || 500,
    dragCdRange: baseSpecs.dragCdRange || "Cd 0.33 to Cd 0.72",
    clutterAeroDetails: baseSpecs.clutterAeroDetails || "Aerodynamic drag profiles adapting on-the-fly to stabilize cornering vectoring and active chassis yaw coordinates."
  };

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
            Every millimeter of this Pagani represents an intense dialog between artisanal styling and rigorous aeronautical engineering. Review the official museum data.
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
              <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">V12 powerplant parameters</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono border-t border-b border-zinc-900 py-6">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">MODEL</span>
                <span className="text-sm font-semibold text-white block mt-1 tracking-tight truncate">{activeSpecs.engineModel}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">POWER OUTPUT</span>
                <span className="text-sm font-semibold text-white block mt-1 tracking-tight">{activeSpecs.power}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">MAX PEAK TORQUE</span>
                <span className="text-sm font-semibold text-white block mt-1 tracking-tight">{activeSpecs.torque}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              The {activeSpecs.aspiration} AMG powerplant was crafted specifically to align with Pagani&rsquo;s acoustic envelope, dry-sump racing demands, and lightweight targets.
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
                <span>{activeSpecs.dryWeight.split(" ")[0]}</span> <span className="text-xs text-amber-500 font-bold">DRY TARE MASS</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Proprietary <span className="text-amber-400">{activeSpecs.chassisMonocoque}</span> structure provides extreme structural integrity and high torsional force dissipation inside San Cesario autoclave runs.
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
              <span className="text-xs font-semibold text-white block uppercase">{activeSpecs.transmission.split("-").join(" ")}</span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {activeSpecs.gearboxDetail}
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
                <span className="text-[10px] text-zinc-500 block uppercase">DOWNFORCE PROFILE (VMAX)</span>
                <span className="text-base font-semibold text-white block mt-1 tracking-tight">{activeSpecs.downforceVmax}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">AERODYNAMIC DRAG RANGE</span>
                <span className="text-base font-semibold text-white block mt-1 tracking-tight">{activeSpecs.dragCdRange}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {activeSpecs.clutterAeroDetails}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
