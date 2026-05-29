import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Compass, ShieldAlert, Cpu, Sparkles, Sliders, Play, RotateCcw } from "lucide-react";
import { vehicles, VehicleData } from "../data/vehicles";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "zonda",
      name: "Zonda Series",
      tagline: "The Genesis of Raw Acoustic Art",
      description: "1999–2010. Fusing uncorrupted naturally-aspirated Mercedes-AMG 7.3L V12 propulsion with extreme aeronautical composites.",
      color: "from-sky-950/20 via-sky-900/10 to-transparent border-sky-500/20 hover:border-sky-500/50",
      textColor: "text-sky-400",
      accentGlow: "rgba(56,189,248,0.15)",
    },
    {
      id: "huayra",
      name: "Huayra Symphony",
      tagline: "Taming Wind through Active Aero",
      description: "2011–2021. Introducing active computer-governed front & rear aerodynamics paired with colossal twin-scroll twin-turbo power.",
      color: "from-amber-950/20 via-amber-900/10 to-transparent border-amber-500/20 hover:border-amber-500/50",
      textColor: "text-amber-400",
      accentGlow: "rgba(245,158,11,0.15)",
    },
    {
      id: "utopia",
      name: "Utopia Gates",
      tagline: "The Alchemy of Pure Gated Manuals",
      description: "2022–Present. The counter-revolution against hybridization. 852 horsepower routing strictly through gated mechanical gearboxes.",
      color: "from-zinc-900/40 via-zinc-805/20 to-transparent border-zinc-700/20 hover:border-zinc-400/50",
      textColor: "text-zinc-350",
      accentGlow: "rgba(228,228,231,0.1)",
    },
    {
      id: "grandi-complicazioni",
      name: "Grandi Complicazioni",
      tagline: "Bespoke Sculptural Masterpieces",
      description: "One-offs and ultra-limited commissions built from scratch inside Pagani's high-art, low-volume tailoring studio.",
      color: "from-purple-950/20 via-purple-900/10 to-transparent border-purple-500/20 hover:border-purple-500/50",
      textColor: "text-purple-400",
      accentGlow: "rgba(168,85,247,0.15)",
    }
  ];

  // Load models matching active filter
  const activeModels = vehicles.filter(
    (car) => car.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#060608] text-white relative overflow-hidden font-sans pb-24">
      
      {/* Dynamic Background Hues */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10vh] left-[-10vw] w-[40vw] h-[40vw] rounded-full bg-amber-500/5 blur-[120px] transition-all duration-700" />
        <div className="absolute bottom-[10vh] right-[-10vw] w-[45vw] h-[45vw] rounded-full bg-purple-500/5 blur-[150px] transition-all duration-700" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16 md:pt-24">
        
        {/* Brand Header */}
        <header className="flex flex-col items-center text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-[11px] font-mono text-zinc-500 tracking-[0.4em] uppercase block mb-3">
              OFFICIAL CREATIVE PORTFOLIO
            </span>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] text-zinc-100 uppercase font-sans">
              PAGANI
            </h1>
            <div className="h-[1px] w-24 bg-amber-500/40 my-4" />
            <p className="text-xs font-mono text-amber-500/80 tracking-[0.3em] uppercase">
              Rinascimento di Arte e Scienza
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-sm md:text-base text-zinc-450 max-w-2xl leading-relaxed font-light mt-4"
          >
            Horacio Pagani creates mechanical sanctuary. Drawing direct lineage from Leonardo da Vinci, every carbon-titanium thread, titanium exhaust tip, and digital micro-flap balances mathematical precision with the absolute soul of fine sculpture.
          </motion.p>
        </header>

        {/* Categories Grid (Visible by default, or fades when selection matches) */}
        {!selectedCategory ? (
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mt-12"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative p-8 rounded-2xl border bg-zinc-950/60 backdrop-blur-md cursor-pointer transition-all duration-500 box-border flex flex-col justify-between h-[256px] overflow-hidden ${cat.color}`}
              >
                {/* Visual Ambient Light glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                  style={{ backgroundImage: `radial-gradient(circle_at_bottom_left, ${cat.accentGlow}, transparent 55%)` }}
                />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-zinc-550 group-hover:text-amber-500 transition-colors">
                      PAGANI LINEAGE SERIES
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-zinc-650 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-2xl font-light tracking-wide text-zinc-100 group-hover:text-white transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 leading-none">
                    {cat.tagline}
                  </p>
                </div>

                <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed line-clamp-2 pr-4 font-light">
                  {cat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="w-full">
            {/* Fullscreen Selection Container */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-8"
            >
              {/* Back controls */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-5 max-w-5xl mx-auto w-full">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 bg-zinc-950 border border-zinc-900 text-xs font-mono text-zinc-500 hover:text-white hover:border-zinc-700 rounded-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>BACK TO ALL LINEAGES</span>
                </button>
                <span className="text-xs font-mono text-amber-500 tracking-[0.2em] uppercase">
                  {selectedCategory.toUpperCase()} ARCHIVE
                </span>
              </div>

              {/* Models Bento selection grid */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full pt-4"
              >
                {activeModels.map((model) => (
                  <motion.div
                    key={model.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.95, y: 20 },
                      show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } }
                    }}
                    className="group bg-zinc-950/70 border border-zinc-902 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between h-[340px] relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 cursor-pointer"
                  >
                    {/* Visual Overlay Image Silhouette representation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                      <div 
                        className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                        style={{
                          backgroundImage: `radial-gradient(ellipse_at_center, rgba(229,169,60,0.1), transparent 60%)`,
                        }}
                      />
                      {model.explodedLayers?.[0]?.image && (
                        <img 
                          src={model.explodedLayers[0].image} 
                          alt=""
                          style={{
                            filter: model.hueRotate && model.hueRotate !== "none" ? model.hueRotate : "none",
                            mixBlendMode: "screen",
                          }}
                          className="absolute -right-12 -bottom-1 w-[280px] h-auto object-contain opacity-15 group-hover:opacity-25 transition-all duration-700 transform group-hover:translate-x-[-10px] group-hover:scale-105"
                        />
                      )}
                    </div>

                    {/* Quick Specs */}
                    <div className="flex justify-between items-start z-10">
                      <div>
                        <span className="text-[9px] font-mono text-zinc-500 block">PRODUCTION YEAR</span>
                        <span className="text-[10px] font-mono text-amber-500 font-bold">{model.year}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-zinc-500 block">PRODUCTION SCALE</span>
                        <span className="text-[10px] font-mono text-emerald-450 font-bold">{model.productionCount}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="my-4 z-10">
                      <h4 className="text-2xl font-light tracking-wide text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {model.name}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1.5 leading-none">
                        {model.tagline}
                      </p>
                    </div>

                    {/* Small specs ribbon */}
                    <div className="grid grid-cols-3 gap-2 border-t border-b border-zinc-900/40 py-3 my-2 font-mono text-[9px] text-zinc-400">
                      <div>
                        <span className="text-[8px] text-zinc-650 block">OUTPUT</span>
                        <span className="font-bold text-zinc-300">{model.engine.maxHp} HP</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-zinc-650 block">SPEED</span>
                        <span className="font-bold text-zinc-300">{model.specs.topSpeed.split(" ")[0]} KPH</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-zinc-650 block">ASPIRATION</span>
                        <span className="font-bold text-amber-500">{model.engine.aspiration === "Naturally Aspirated" ? "N/A" : "TURBO"}</span>
                      </div>
                    </div>

                    {/* Interactive Button */}
                    <div className="flex justify-between items-center z-10 pt-2">
                      <span className="text-xs font-mono text-zinc-500">{model.price}</span>
                      <Link
                        to={`/vehicle/${model.id}`}
                        className="px-4 py-2 rounded bg-zinc-900 group-hover:bg-amber-500 text-zinc-300 group-hover:text-black border border-zinc-850 group-hover:border-amber-400 text-[10px] font-mono uppercase font-bold transition-all duration-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>EXPLORE DETAILS</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Da Vinci Philosophy Quote Footer */}
        <footer className="mt-32 pt-16 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-550 text-[10px] font-mono max-w-5xl mx-auto gap-4">
          <span>PAGANI ARCHIVE // ART & SCIENCE DIGITAL MUSEUM</span>
          <span>&copy; {new Date().getFullYear()} INTEGRATED SECTIONS ACTIVE</span>
          <span className="text-amber-550">● HIGH FIDELITY DIGITAL VISUALIZER</span>
        </footer>

      </div>
    </div>
  );
}
