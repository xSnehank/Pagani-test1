import { useState, useEffect, useRef } from "react";
import { Play, Square, Volume2, ShieldAlert, Zap, Compass, RotateCw } from "lucide-react";
import engineBlueprint from "../assets/images/pagani_v12_blueprint_1779969766537.png";

export default function V12PerformanceDyno() {
  const [rpm, setRpm] = useState<number>(1000); // idling
  const [engineStarted, setEngineStarted] = useState<boolean>(false);
  const [muteSound, setMuteSound] = useState<boolean>(false);
  const [soundSupported, setSoundSupported] = useState<boolean>(true);

  // Web Audio Hookups
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const turboOscRef = useRef<OscillatorNode | null>(null);
  const turboGainRef = useRef<GainNode | null>(null);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAcoustics();
    };
  }, []);

  // Update synthesized sound frequencies in real-time as RPM changes
  useEffect(() => {
    if (!engineStarted || muteSound) return;

    try {
      const targetFreq1 = 32 + (rpm / 1000) * 14;      // Deep engine block frequency
      const targetFreq2 = 64 + (rpm / 1000) * 28;      // Balanced combustion tone
      const turboFreq = 400 + (rpm / 1000) * 120;     // Turbocharger high-pitched scream
      const turboVol = Math.max(0, (rpm - 2000) / 11000); // Turbos spool up as RPM climbs

      if (osc1Ref.current && osc2Ref.current && filterRef.current && masterGainRef.current) {
        // Smoothly ramp to prevent clicking audio glitches
        osc1Ref.current.frequency.setTargetAtTime(targetFreq1, audioCtxRef.current!.currentTime, 0.05);
        osc2Ref.current.frequency.setTargetAtTime(targetFreq2, audioCtxRef.current!.currentTime, 0.05);
        
        // Filter frequency maps to RPM - opens up as engine revs
        const filterCutoff = 150 + (rpm / 1000) * 250;
        filterRef.current.frequency.setTargetAtTime(filterCutoff, audioCtxRef.current!.currentTime, 0.08);

        // Adjust turbo squeals
        if (turboOscRef.current && turboGainRef.current) {
          turboOscRef.current.frequency.setTargetAtTime(turboFreq, audioCtxRef.current!.currentTime, 0.05);
          turboGainRef.current.gain.setTargetAtTime(turboVol * 0.07, audioCtxRef.current!.currentTime, 0.05);
        }
      }
    } catch (e) {
      console.error("Failed to update frequencies:", e);
    }
  }, [rpm, engineStarted, muteSound]);

  const startAcoustics = async () => {
    try {
      // Initialize AudioContext
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) {
        setSoundSupported(false);
        return;
      }

      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Ensure state is running
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Master Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
      masterGainRef.current = masterGain;

      // Filter Node (to refine synthesizer blocks into warm acoustic exhausts)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.setValueAtTime(4.2, ctx.currentTime); // Throaty resonancy
      filterRef.current = filter;

      // Osc 1: Deep Sawtooth Exhaust Note
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(46, ctx.currentTime);
      osc1Ref.current = osc1;

      // Osc 2: Mid-range Triangle cylinder pressure
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(92, ctx.currentTime);
      osc2Ref.current = osc2;

      // Osc 3: Twin-Turbo Whistle (High pitched sine)
      const turboOsc = ctx.createOscillator();
      turboOsc.type = "sine";
      turboOsc.frequency.setValueAtTime(520, ctx.currentTime);
      turboOscRef.current = turboOsc;

      const turboGain = ctx.createGain();
      turboGain.gain.setValueAtTime(0, ctx.currentTime);
      turboGainRef.current = turboGain;

      // Node Graph connections:
      // Oscs -> Filter -> Master Gain -> Destination
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      
      turboOsc.connect(turboGain);
      turboGain.connect(masterGain);

      masterGain.connect(ctx.destination);

      // Boot up oscillations
      osc1.start();
      osc2.start();
      turboOsc.start();

      setEngineStarted(true);
    } catch (err) {
      console.error("Audio Context Init Failed:", err);
      setSoundSupported(false);
    }
  };

  const stopAcoustics = () => {
    try {
      if (osc1Ref.current) osc1Ref.current.stop();
      if (osc2Ref.current) osc2Ref.current.stop();
      if (turboOscRef.current) turboOscRef.current.stop();

      osc1Ref.current = null;
      osc2Ref.current = null;
      turboOscRef.current = null;

      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      audioCtxRef.current = null;
      setEngineStarted(false);
    } catch (e) {
      setEngineStarted(false);
    }
  };

  const handleStartStop = () => {
    if (engineStarted) {
      stopAcoustics();
    } else {
      startAcoustics();
    }
  };

  // Coordinates formatting for Torque & Horsepower Curve plots (torque spikes early, HP builds top-end)
  // Mapping RPM (750 to 8000) to relative pixel coordinate spaces
  const hpPlotCurve = "M 50 160 C 120 145, 180 115, 250 82 C 300 58, 380 32, 420 30 C 450 32, 465 52, 480 85";
  const torqueCurve = "M 50 135 C 100 80, 150 48, 220 40 C 270 41, 330 52, 380 75 C 420 95, 450 120, 480 155";

  // Calculate current dynamic spec readings at active RPM
  const calculatePowerAtRpm = (currentRpm: number) => {
    // Peak HP is 789 at 6200 RPM
    if (currentRpm < 6200) {
      return Math.round(180 + ((currentRpm - 1000) * (609 / 5200)));
    } else {
      return Math.round(789 - ((currentRpm - 6200) * (180 / 1800)));
    }
  };

  const calculateTorqueAtRpm = (currentRpm: number) => {
    // Torque flat peaks (1100 Nm) between 2200 and 4500 RPM
    if (currentRpm < 2200) {
      return Math.round(750 + ((currentRpm - 1000) * (350 / 1200)));
    } else if (currentRpm >= 2200 && currentRpm <= 4500) {
      return 1100;
    } else {
      return Math.round(1100 - ((currentRpm - 4500) * (350 / 3500)));
    }
  };

  const currentHp = calculatePowerAtRpm(rpm);
  const currentTorque = calculateTorqueAtRpm(rpm);

  return (
    <section 
      id="performance-dyno" 
      className="w-full bg-[#070708] border-b border-zinc-900 py-16 px-4 md:px-12 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(185,28,28,0.06),transparent_40%)]" pointer-events-none />
      
      <div className="max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Performance Metrics Showcase */}
        <div className="lg:col-span-8 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between">
          
          <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
            <div>
              <span className="text-[10px] font-mono text-amber-500 tracking-[0.2em] uppercase">V12 DYNO GRAPH WORKSTATION</span>
              <h4 className="text-xl font-light text-white font-sans mt-0.5">Mercedes-AMG Performance Curves</h4>
            </div>
            
            {/* Acoustics Controller button */}
            <button
              onClick={handleStartStop}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all duration-300 ${
                engineStarted
                  ? "bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500/15"
                  : "bg-amber-500 font-bold text-black border border-amber-400 hover:bg-amber-400"
              }`}
            >
              {engineStarted ? (
                <>
                  <Square className="h-3.5 w-3.5 fill-current" />
                  <span>HALT ACOUSTIC CHAMBER</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>BOOT V12 ACOUSTICS</span>
                </>
              )}
            </button>
          </div>

          {/* Graphical Dyno Plot Grid */}
          <div className="relative w-full h-[260px] my-6 flex items-center justify-center">
            
            {/* Underlay Grid Background */}
            <div className="absolute inset-x-8 inset-y-4 grid grid-cols-7 border-l border-b border-zinc-800 pointer-events-none text-[8px] font-mono text-zinc-650">
              {Array.from({ length: 8 }).map((_, i) => {
                const rpmLabel = 1000 + i * 1000;
                return (
                  <div key={i} className="relative h-full border-r border-zinc-800/45">
                    <span className="absolute bottom-[-18px] left-[-15px]">{rpmLabel}</span>
                  </div>
                );
              })}
            </div>

            {/* Dyno Plot CAD SVG */}
            <svg viewBox="0 0 540 180" className="w-[90%] h-full overflow-visible z-10">
              
              {/* Dynamic RPM highlight vertical slider beam */}
              <line 
                x1={50 + ((rpm - 1000) / 7000) * 430} 
                y1="10" 
                x2={50 + ((rpm - 1000) / 7000) * 430} 
                y2="160" 
                stroke="#F59E0B" 
                strokeWidth="1.5" 
                strokeDasharray="2 2"
              />

              {/* Horsepower Curve Path */}
              <path d={hpPlotCurve} fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
              {/* Torque Curve Path */}
              <path d={torqueCurve} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />

              {/* Dynamic interactive markers displaying values on intersection */}
              <circle 
                cx={50 + ((rpm - 1000) / 7000) * 430}
                cy={160 - (currentHp / 789) * 125} 
                r="4.5" 
                fill="#EF4444" 
                stroke="#fff" 
                strokeWidth="1" 
              />
              <circle 
                cx={50 + ((rpm - 1000) / 7000) * 430}
                cy={150 - (currentTorque / 1100) * 105} 
                r="4.5" 
                fill="#3B82F6" 
                stroke="#fff" 
                strokeWidth="1" 
              />

              {/* Labels on Dyno */}
              <text x="350" y="25" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold">POWER CURVE (HP)</text>
              <text x="140" y="25" fill="#3B82F6" fontSize="8" fontFamily="monospace" fontWeight="bold">TORQUE CURVE (NM)</text>

            </svg>

            {/* Left and Right vertical legends (HP vs Torque scale indicators) */}
            <div className="absolute left-1 top-4 h-[140px] flex flex-col justify-between items-end text-[8px] font-mono text-red-500/80 pr-1 border-r border-red-500/20">
              <span>800 HP</span>
              <span>600 HP</span>
              <span>400 HP</span>
              <span>200 HP</span>
              <span>0 HP</span>
            </div>
            <div className="absolute right-1 top-4 h-[140px] flex flex-col justify-between items-start text-[8px] font-mono text-blue-500/80 pl-1 border-l border-blue-500/20">
              <span>1200 Nm</span>
              <span>900 Nm</span>
              <span>600 Nm</span>
              <span>300 Nm</span>
              <span>0 Nm</span>
            </div>

          </div>

          {/* RPM Throttle adjustment Area */}
          <div className="p-4 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 flex items-center gap-1">
                <Compass className="h-3.5 w-3.5 text-amber-500" />
                VIRTUAL THROTTLE / TACHOMETER
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <RotateCw className={`h-3 w-3 ${engineStarted ? "animate-spin-slow text-amber-450" : ""}`} />
                {rpm.toLocaleString()} RPM
              </span>
            </div>
            
            <input 
              type="range"
              min="1000"
              max="7500"
              step="50"
              value={rpm}
              disabled={!engineStarted}
              onChange={(e) => setRpm(parseInt(e.target.value))}
              className={`w-full h-1 bg-zinc-800 rounded-lg cursor-pointer ${
                engineStarted ? "accent-amber-500" : "accent-zinc-700 opacity-40 cursor-not-allowed"
              }`}
            />
            
            <div className="flex justify-between text-[9px] text-zinc-600">
              <span>1,000 RPM (IDLE RUMBLE)</span>
              <span>7,500 RPM (REDLINE CLIMAX)</span>
            </div>
          </div>

        </div>

        {/* Right Side: Cylinder specs & Blueprints */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-500 tracking-[0.25em] uppercase block">
              POWERPLANT DETAILS
            </span>
            <h3 className="text-2xl font-light text-white font-sans">
              AMG <span className="font-semibold text-zinc-400">Biological Core</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Horacio Pagani prefers single-clutch lightweight sequential systems for their raw, mechanical racing feedback. The V12 exhaust notes act as an operatic backbeat to the Huayra BC.
            </p>
          </div>

          {/* Live Engine Diagnostics panel */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col space-y-4">
            
            {/* AMG Engine blueprint thumbnail render */}
            <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-900 bg-zinc-900/30">
              <img 
                src={engineBlueprint} 
                alt="AMG V12 Blueprint Detail" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 border border-zinc-800 text-[8px] font-mono text-zinc-400 rounded">
                M158 V12 TWIN-TURBO RECTIFIER
              </div>
            </div>

            {/* Dynamic Diagnostics spec outputs */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-zinc-900/70 pb-2">
                <span className="text-zinc-500 uppercase">ENGINE POWER OUTPUT:</span>
                <span className="text-white font-bold">{engineStarted ? `${currentHp} HP` : "--- HP"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900/70 pb-2">
                <span className="text-zinc-500 uppercase">MAX CRANK TORQUE:</span>
                <span className="text-white font-bold">{engineStarted ? `${currentTorque} Nm` : "--- Nm"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900/70 pb-2">
                <span className="text-zinc-500 uppercase">OIL PRESSURE VALVE:</span>
                <span className="text-emerald-400">
                  {engineStarted ? `${(3.2 + (rpm / 2000)).toFixed(1)} bar` : "STABLE"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 uppercase">ACOUSTIC FREQUENCY:</span>
                <span className="text-amber-500 font-bold">
                  {engineStarted ? `${(32 + (rpm / 1000) * 14).toFixed(0)} Hz` : "MUTED"}
                </span>
              </div>
            </div>

            {/* Web Audio notification warnings if browser muted */}
            {!soundSupported && (
              <div className="p-2 border border-amber-500/20 bg-amber-500/5 text-[9px] font-mono text-amber-500 rounded flex gap-1 items-start">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                <span>Web Audio is restricted on this browser tab or container config. Sound synthesis bypassed.</span>
              </div>
            )}

            {engineStarted && (
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-[9px] font-mono text-emerald-400 flex gap-1 items-center animate-pulse">
                <Volume2 className="h-3 w-3" />
                <span>V12 ACOUSTIC OSC FEEDBACK STREAMING ACTIVE</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
