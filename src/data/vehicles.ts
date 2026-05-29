import { VehicleLayer } from "../types";
import heroImg from "../assets/images/pagani_huayra_hero_1779969746295.png";
import chassisImg from "../assets/images/pagani_chassis_blueprint_1779969787623.png";
import engineImg from "../assets/images/pagani_v12_blueprint_1779969766537.png";

import zondaC12Shell from "../assets/images/zonda_c12_shell_1780042386269.png";
import zondaFShell from "../assets/images/zonda_f_shell_1780042408555.png";
import zondaCinqueShell from "../assets/images/zonda_cinque_shell_1780042430597.png";
import zondaRShell from "../assets/images/zonda_r_shell_1780042451891.png";

import huayraCoupeShell from "../assets/images/huayra_coupe_shell_1780042476580.png";
import huayraBcShell from "../assets/images/huayra_bc_shell_1780042497412.png";
import huayraRoadsterShell from "../assets/images/huayra_roadster_shell_1780042516439.png";
import huayraRShell from "../assets/images/huayra_r_shell_1780042535998.png";

import utopiaCoupeShell from "../assets/images/utopia_coupe_shell_1780042552676.png";
import utopiaRoadsterShell from "../assets/images/utopia_roadster_shell_1780042572382.png";

import codalungaShell from "../assets/images/codalunga_shell_1780042592580.png";
import epitomeShell from "../assets/images/epitome_shell_1780042612541.png";

import zondaChassis from "../assets/images/zonda_chassis_1780041058452.png";
import zondaEngine from "../assets/images/zonda_engine_1780041078430.png";

import utopiaChassis from "../assets/images/utopia_chassis_1780041120733.png";
import utopiaEngine from "../assets/images/utopia_engine_1780041142405.png";

export interface VehicleData {
  id: string;
  name: string;
  category: "zonda" | "huayra" | "utopia" | "grandi-complicazioni";
  tagline: string;
  year: string;
  price: string;
  productionCount: string;
  introText: string;
  storyTitle: string;
  storyParagraphs: string[];
  specs: {
    topSpeed: string;
    acceleration: string;
    power: string;
    material: string;
    weight: string;
    gearbox: string;
  };
  engine: {
    engineModel: string;
    aspiration: "Naturally Aspirated" | "Twin-Turbocharged";
    maxHp: number;
    maxTorqueVal: number;
    peakRpm: number;
  };
  hueRotate: string;
  explodedLayers?: VehicleLayer[];
}

export const vehicles: VehicleData[] = [
  {
    id: "zonda-c12",
    name: "Zonda C12",
    category: "zonda",
    tagline: "The Genesis of the Symphony",
    year: "1999",
    price: "$2,800,000",
    productionCount: "1 of 5",
    introText: "First unveiled at the 1999 Geneva Motor Show, the Zonda C12 represents Horacio Pagani's first physical translation of the Art & Science philosophy. Fusing carbon-fiber aerodynamics with Mercedes-Benz naturally-aspirated V12 engineering, it shattered hypercar conventions forever.",
    storyTitle: "Birth of a Structural Legend",
    storyParagraphs: [
      "The Zonda C12 was designed with the fighter jet as its ultimate muse. Its cab-forward carbon-fiber greenhouse and sculptural rear exhaust exhaust clusters redefined supercar proportions, demonstrating that a performance machine could achieve the status of fine renaissance sculpture.",
      "Beneath the silver canopy lay the naturally aspirated Mercedes-Benz 6.0-liter V12 block, emitting an uncorrupted analog exhaust note. Horacio Pagani's meticulous use of autoclave and carbon composites set a new benchmark, marking the raw, visceral dawn of the Pagani lineage."
    ],
    specs: {
      topSpeed: "332 KM/H",
      acceleration: "4.0 SEC",
      power: "450 HP (331 KW)",
      material: "Pre-preg Carbon Fiber & Chromium Monocoque",
      weight: "1250 KG",
      gearbox: "5-Speed Manual Transaxle",
    },
    engine: {
      engineModel: "Mercedes-Benz M120 N/A V12",
      aspiration: "Naturally Aspirated",
      maxHp: 450,
      maxTorqueVal: 640,
      peakRpm: 5200
    },
    hueRotate: "hue-rotate(185deg) contrast(1.15) brightness(0.95)", // Ice silver teal tone
    explodedLayers: [
      {
        id: "shell",
        name: "First-Gen Aerodynamic Silver Shell",
        title: "Composite Canopy",
        scale: 0.95,
        offsetY: -180,
        color: "border-sky-550 text-sky-400 bg-sky-500/5",
        description: "Early-generation weave structured with lightweight pre-pregnated sheets cured at high pressure inside the legendary Modena autoclaves.",
        hotspots: [
          { id: "zc-1", label: "Cab-Forward Cockpit", x: 42, y: 35, description: "Designed to mock deep fighter-jet visors with pristine panoramic sightlines.", metric: "Glass: Solar-treated" },
          { id: "zc-2", label: "Sculpted Rear Tail", x: 80, y: 28, description: "Pioneering layout that establishes Pagani's legendary central quad-tailpipe configuration.", metric: "Centralized" }
        ],
        image: zondaC12Shell
      },
      {
        id: "chassis",
        name: "Chromium-Molybdenum Subframes & Monocoque",
        title: "C12 Primary Core",
        scale: 0.9,
        offsetY: -40,
        color: "border-teal-500 text-teal-400 bg-teal-500/5",
        description: "Ultra-rigid core tub providing structural feedback, reinforced by aerospace Cro-Moly tubular structural subframes.",
        hotspots: [
          { id: "zc-3", label: "Torsional Rigid Tub", x: 50, y: 45, description: "Extremely safe high-safety capsule protecting the driver with zero deformation.", metric: "Tensile: Titanium-lump reinforced" }
        ],
        image: zondaChassis
      },
      {
        id: "engine",
        name: "M120 Naturally Aspirated 6.0L V12",
        title: "Atmospheric V12 Core",
        scale: 0.85,
        offsetY: 100,
        color: "border-yellow-500 text-yellow-450 bg-yellow-500/5",
        description: "Six-liter mechanical engine delivering unadulterated power without the interference of turbochargers, creating an acoustic opera.",
        hotspots: [
          { id: "zc-4", label: "Naturally Aspirated Intakes", x: 62, y: 40, description: "Feeds uncompressed oxygen directly into twelve cylinders for rapid throttle response.", metric: "Throttles: Bespoke analog" }
        ],
        image: zondaEngine
      }
    ] as any
  },
  {
    id: "zonda-f",
    name: "Zonda F",
    category: "zonda",
    tagline: "A Tribute to Juan Manuel Fangio",
    year: "2005",
    price: "$3,800,000",
    productionCount: "1 of 25",
    introText: "Named in honor of Horacio Pagani's mentor and five-time F1 World Champion Juan Manuel Fangio, the Zonda F was an evolutionary leap. Redesigned aerodynamics, increased carbon-weave density, and a legendary 7.3-liter powerhouse elevated Pagani's mechanical performance to an art form.",
    storyTitle: "The Masterpiece of Legacy",
    storyParagraphs: [
      "No relationship shaped Horacio's destiny more than the trust placed in him by Fangio. The Zonda F was built as a physical monument to that guidance, representing the highest refinement of the original single-clutch analog performance machine.",
      "The carbon-weave on the Zonda F was meticulously realigned, introducing raw carbon panels under polished lacquer as a visual feature. It produced massive mid-range mechanical torque, providing a tactile, high-friction driving experience preserved for true connoisseurs."
    ],
    specs: {
      topSpeed: "345 KM/H",
      acceleration: "3.6 SEC",
      power: "602 HP (443 KW)",
      material: "Carbon-Fiber Monocoque with titanium thread weave",
      weight: "1230 KG",
      gearbox: "6-Speed Manual Gearbox",
    },
    engine: {
      engineModel: "Mercedes-AMG 7.3L N/A V12",
      aspiration: "Naturally Aspirated",
      maxHp: 602,
      maxTorqueVal: 760,
      peakRpm: 6150
    },
    hueRotate: "hue-rotate(290deg) saturate(1.15)", // Amethyst metallic purple hue
    explodedLayers: [
      {
        id: "shell",
        name: "Lacquered Carbon Kevlar Body",
        title: "Sliver Skin Shell",
        scale: 0.95,
        offsetY: -180,
        color: "border-pink-500 text-pink-400 bg-pink-500/5",
        description: "Innovative weave structure utilizing Carbon-Kevlar blends for extreme tear resistance and structural deflection protection.",
        hotspots: [
          { id: "zf-1", label: "Rear Wing Spoiler", x: 80, y: 25, description: "Sleek aerodynamic lip wing channeling clean airflow to balance engine heat extraction.", metric: "Drag: -8% vs C12" }
        ],
        image: zondaFShell
      },
      {
        id: "chassis",
        name: "Avional Subframed Reinforced Monocoque",
        title: "Core Carbon Spine",
        scale: 0.9,
        offsetY: -40,
        color: "border-purple-500 text-purple-400 bg-purple-500/5",
        description: "Monocoque structured entirely of hand-laid carbon fiber panels layered with avional alloy crash-absorption boxes.",
        hotspots: [
          { id: "zf-2", label: "Fangio Cabin Spec", x: 45, y: 45, description: "Sumptuous aniline leather upholstery, hand-carved wood accents, and custom aluminum dials.", metric: "Craft: Bespoke" }
        ],
        image: zondaChassis
      },
      {
        id: "engine",
        name: "Bespoke AMG 7.3L Handcrafted V12",
        title: "Atmospheric Power Core",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-400 bg-red-500/5",
        description: "Colossal 7,291cc block hand-assembled by a single Mercedes-AMG master cylinder technician, delivering massive linear curves.",
        hotspots: [
          { id: "zf-3", label: "Inconel Performance Exhaust", x: 85, y: 60, description: "Hydropformed exhaust pipe systems constructed of high-nickel alloys with a tuned chamber.", metric: "Sound Level: Operatic 110dB" }
        ],
        image: zondaEngine
      }
    ] as any
  },
  {
    id: "zonda-cinque",
    name: "Zonda Cinque",
    category: "zonda",
    tagline: "The Art of Extremes",
    year: "2009",
    price: "$6,500,000",
    productionCount: "1 of 5",
    introText: "Originally commissioned to satisfy the demand of five elite collectors, the Zonda Cinque is the first street-legal hypercar to implement Carbo-Titanium. Possessing the raw track DNA of the Zonda R and the luxurious refinement of a touring car, it remains one of the world's most sought-after icons.",
    storyTitle: "Synthesizing Metallurgy and Downforce",
    storyParagraphs: [
      "The Zonda Cinque represents a pivotal milestone in mechanical metallurgy: the debut of Carbo-Titanium composite on public streets. By weaving high-tensile titanium wire directly into the high-rigidity carbon matting, Horacio achieved a chassis with immense strength and low density.",
      "The design introduced the radical roof-mounted carbon air scoop, which forces highly compressed oxygen directly into the roaring AMG 7.3-liter V12. This creates an unmatched induction acoustic experience right behind the driver's ears."
    ],
    specs: {
      topSpeed: "350 KM/H",
      acceleration: "3.4 SEC",
      power: "678 HP (499 KW)",
      material: "Carbo-Titanium HP62 Carbon-Fiber composite monocoque",
      weight: "1210 KG",
      gearbox: "6-Speed Sequential Gearbox with Paddle-Shift",
    },
    engine: {
      engineModel: "Mercedes-AMG 7.3L Carbon-Intake V12",
      aspiration: "Naturally Aspirated",
      maxHp: 678,
      maxTorqueVal: 780,
      peakRpm: 6300
    },
    hueRotate: "hue-rotate(345deg) saturate(1.4)", // Flame Orange Red Tone
    explodedLayers: [
      {
        id: "shell",
        name: "Carbo-Titanium Composite Aerobody",
        title: "Active Aero Shell",
        scale: 0.95,
        offsetY: -180,
        color: "border-amber-500 text-amber-400 bg-amber-500/5",
        description: "Carbon skin wrapped with high-strength kevlar thread, integrated with a functional roof-mounted scoop to optimize engine cylinder pressure.",
        hotspots: [
          { id: "zci-1", label: "Roof-Intake Scoop", x: 55, y: 15, description: "Active carbon vent drawing cold air into the manifolds, producing an incredible mechanical roar.", metric: "Induction: 180L/sec" }
        ],
        image: zondaCinqueShell
      },
      {
        id: "chassis",
        name: "Carbo-Titanium Monocoque Core",
        title: "Carbo-Titanium Spine",
        scale: 0.9,
        offsetY: -40,
        color: "border-orange-500 text-orange-400 bg-orange-500/5",
        description: "The pioneering chassis of the Carbo-Titanium era, forming an almost indestructible survival cocoon.",
        hotspots: [
          { id: "zci-2", label: "Titanium-Thread Weave", x: 45, y: 45, description: "High-rigidity weave that minimizes fractures under extreme G-loads.", metric: "Rigidity: Infinite elasticity" }
        ],
        image: zondaChassis
      },
      {
        id: "engine",
        name: "Modified AMG 7.3L V12 Powerplant",
        title: "Atmospheric Intake Block",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-500 bg-red-500/5",
        description: "Uncontrolled linear power generating massive performance, supported by bespoke Inconel headers.",
        hotspots: [
          { id: "zci-3", label: "Sequential Gearbox Integration", x: 75, y: 56, description: "Cima ultra-light robotic sequential gearbox executing gear-ratio swaps in 100 milliseconds.", metric: "Swap Speed: 100ms" }
        ],
        image: zondaEngine
      }
    ] as any
  },
  {
    id: "zonda-r",
    name: "Zonda R",
    category: "zonda",
    tagline: "Uncompromised Physics",
    year: "2009",
    price: "$8,000,000",
    productionCount: "1 of 15",
    introText: "The Zonda R was designed as an absolute technical exercise, free from the constraints of public road regulations or racing rulebooks. Acting as a rolling laboratory for future engineering models, it established a legendary Nürburgring lap record of 6 minutes and 47 seconds that shook the automotive world.",
    storyTitle: "Raw, Brutalist Symphony of Speed",
    storyParagraphs: [
      "The Zonda R is an unadulterated engineering masterwork, with only 10% of its components shared with the already extreme Zonda road cars. It is essentially an AMG-sourced racing core wrapped in a low-profile autoclaved carbon weave.",
      "The dry weight of 1,070 kg was achieved by stripping away every amenity, creating a dry-sump naturally aspirated race car that can throw 750 horsepower instantly to the slick rear tires."
    ],
    specs: {
      topSpeed: "375 KM/H",
      acceleration: "2.7 SEC",
      power: "750 HP (551 KW)",
      material: "Avional-reinforced Carbo-Titanium central monocoque",
      weight: "1070 KG",
      gearbox: "6-Speed Magnesium Transverse Sequential",
    },
    engine: {
      engineModel: "Mercedes-Benz GT112 Dry-Sump V12",
      aspiration: "Naturally Aspirated",
      maxHp: 750,
      maxTorqueVal: 710,
      peakRpm: 7500
    },
    hueRotate: "grayscale(1) brightness(0.85) contrast(1.25)", // Raw Carbon Tech Look
    explodedLayers: [
      {
        id: "shell",
        name: "Bare-Carbon Aerobody",
        title: "Track Aerograde Outer Skin",
        scale: 0.95,
        offsetY: -180,
        color: "border-zinc-500 text-zinc-350 bg-zinc-950/20",
        description: "Dry untreated autoclaved carbon sheets providing maximum lightness. Minimal paint weight, preserving raw visual fibers.",
        hotspots: [
          { id: "zr-1", label: "Bespoke Rear Carbon Wing", x: 86, y: 20, description: "Race-derived towering wing maximizing downforce, allowing corner exit speed speeds exceeding 2.5 lateral G.", metric: "Downforce: 1500 lbs / 680 kg" }
        ],
        image: zondaRShell
      },
      {
        id: "chassis",
        name: "Advanced Carbo-Titanium Monocoque",
        title: "Bare Racing Nest",
        scale: 0.9,
        offsetY: -40,
        color: "border-zinc-650 text-zinc-300 bg-zinc-900/10",
        description: "Highly integrated roll-cage cell forged with aeronautical avional alloys supporting direct engine mount studs.",
        hotspots: [
          { id: "zr-2", label: "Stripped Racing Cockpit", x: 46, y: 45, description: "No sound insulation, pure digital instrumentation, carbon bucket seats, and telemetry terminals.", metric: "Sound: Pure V12 vibrations" }
        ],
        image: zondaChassis
      },
      {
        id: "engine",
        name: "CLS-Racing GT112 AMG Dry-Sump V12",
        title: "Pure High-Rev V12 Unit",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-550 text-red-500 bg-red-550/5",
        description: "F1-derived lightweight dry-sump performance engine designed directly for structural load mounting, screaming up to 8,000 RPM.",
        hotspots: [
          { id: "zr-3", label: "Ceramic Exhaust Stacks", x: 88, y: 55, description: "Unrestricted straight pipe exhausts with ceramic heat shielding, mimicking an F1 orchestra.", metric: "Rpm-Limit: 8,200 RPM" }
        ],
        image: zondaEngine
      }
    ] as any
  },
  {
    id: "huayra-coupe",
    name: "Huayra Coupe",
    category: "huayra",
    tagline: "The Wind and the Feather",
    year: "2011",
    price: "$2,400,000",
    productionCount: "1 of 100",
    introText: "Named after Huyara-tata, the Andean God of Wind, the Huayra Coupe represented a complete technological reinvention. Moving into active aerodynamics and custom-tailored twin-scroll turbocharging, it is a masterclass in styling fluidics, mirroring a drop of water in structural motion.",
    storyTitle: "Taming the Dynamic Storm",
    storyParagraphs: [
      "If the Zonda was a raw analog mechanical instrument, the Huayra Coupe is an elegant computerized kinetic sculpture. It features four electronically active aerodynamic flaps that act independently based on steering input, yaw rates, and airspeed.",
      "Mercedes-AMG engineers spent over four years developing the bespoke M158 twin-turbocharged V12 powerplant. Delivering colossal sub-2,000 RPM torque, it mimics the propulsion curve of a heavy commercial jet turbine."
    ],
    specs: {
      topSpeed: "370 KM/H",
      acceleration: "3.2 SEC",
      power: "730 HP (537 KW)",
      material: "Carbo-Titanium HP62 Monocoque with composite subframes",
      weight: "1350 KG",
      gearbox: "7-Speed Single-Clutch Automated Manual",
    },
    engine: {
      engineModel: "Mercedes-AMG M158 Twin-Turbo V12",
      aspiration: "Twin-Turbocharged",
      maxHp: 730,
      maxTorqueVal: 1000,
      peakRpm: 5800
    },
    hueRotate: "none", // Baseline Gold Hue
    explodedLayers: [
      {
        id: "shell",
        name: "Active Flap Autoclave Body",
        title: "Active Wind Shell",
        scale: 0.95,
        offsetY: -180,
        color: "border-amber-500 text-amber-400 bg-amber-500/5",
        description: "Streamlined water-drop shape skin housing four active micro-flaps that pitch up and down as yaw loads adjust.",
        hotspots: [
          { id: "hc-1", label: "Active Air flaps", x: 20, y: 35, description: "Micro-controlled flaps that pivot up to 28 degrees to balance front-to-rear drag-coefficients.", metric: "Actuators: Hydraulic" }
        ],
        image: huayraCoupeShell
      },
      {
        id: "chassis",
        name: "Carbo-Titanium Monocoque HP62 Core",
        title: "Rigid Composite Tub",
        scale: 0.9,
        offsetY: -40,
        color: "border-blue-500 text-blue-400 bg-blue-500/5",
        description: "Woven matrices utilizing titanium threads cured alongside chromium-steel sub-structures.",
        hotspots: [
          { id: "hc-2", label: "Signature Gullwing Doors", x: 45, y: 30, description: "Iconic gullwing hinges bonded directly to the carbon roof backbone structure.", metric: "Aesthetic: Artistry" }
        ],
        image: chassisImg
      },
      {
        id: "engine",
        name: "Mercedes-AMG M158 6.0L V12 Unit",
        title: "Twin-Turbo M158 Core",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-400 bg-red-500/5",
        description: "Dual single-scroll turbos producing flat peak torque profiles throughout the RPM registry.",
        hotspots: [
          { id: "hc-3", label: "Twin-Scroll Turbocharger", x: 65, y: 42, description: "Allows instantaneous throttle spool up, avoiding structural lag typical of heavy turbines.", metric: "Torque: 1,000 N·m" }
        ],
        image: engineImg
      }
    ] as any
  },
  {
    id: "huayra-bc",
    name: "Huayra BC",
    category: "huayra",
    tagline: "The Uncompromised Masterpiece",
    year: "2016",
    price: "$3,400,000",
    productionCount: "1 of 20",
    introText: "The ultimate track-focused iteration bearing the initials of Pagani's first customer, Benny Caiola. Shaving weight down to a featherlight 1,218 kg and boosting twin-turbo V12 power to 789 horsepower, the Huayra BC represents the absolute peak of extreme engineering and bespoke craftsmanship.",
    storyTitle: "Lightness Elevated to High Science",
    storyParagraphs: [
      "Designed specifically to reward elite drivers with a highly tactile, physical track instrument, the Huayra BC introduces 'Carbo-Triax'—an advanced composite formula cured inside high-temperature autoclaves to improve density while further slicing dead dry mass.",
      "The result is a mechanical hypercar that manages downforce like a GT3 racing machine on long straights while providing an exquisite, bespoke leather and milled aluminum sanctuary inside the iconic cockpit."
    ],
    specs: {
      topSpeed: "383 KM/H",
      acceleration: "2.8 SEC",
      power: "789 HP (588 KW)",
      material: "Carbo-Titanium Monocoque HP62 and Carbo-Triax HP62",
      weight: "1218 KG",
      gearbox: "7-Speed XTrac Automated Manual with Carbon-Fiber Sync",
    },
    engine: {
      engineModel: "Mercedes-AMG Tuned M158 Twin-Turbo V12",
      aspiration: "Twin-Turbocharged",
      maxHp: 789,
      maxTorqueVal: 1100,
      peakRpm: 6200
    },
    hueRotate: "none", // Our baseline master styling
    explodedLayers: [
      {
        id: "shell",
        name: "Aerodynamic Composite Body with Carbon-Triax",
        title: "Active Aero Shell",
        scale: 0.95,
        offsetY: -180,
        color: "border-amber-500 text-amber-400 bg-amber-500/5",
        description: "Made entirely of ultra-light autoclave carbon fiber with Carbon-Triax reinforcements. Features 4 independent aerodynamic flaps.",
        hotspots: [
          { id: "h-f1", label: "Active Front Flaps", x: 22, y: 35, description: "Independently actuated carbon flaps regulated by a central ECU to govern drag and cornering vectoring.", metric: "Angle: 0°-28°" },
          { id: "h-f2", label: "Rear Active Wing", x: 84, y: 25, description: "Provides downforce of up to 500kg at 280km/h while serving as an air-brake during hard deceleration.", metric: "Max Downforce: 500kg" }
        ],
        image: huayraBcShell
      },
      {
        id: "chassis",
        name: "Carbo-Titanium Monocoque HP62 Core",
        title: "Carbo-Titanium Core",
        scale: 0.9,
        offsetY: -40,
        color: "border-blue-500 text-blue-400 bg-blue-500/5",
        description: "A proprietary blend of carbon fibers with interwoven titanium threads, fusing the rigidity of carbon and toughness of titanium.",
        hotspots: [
          { id: "h-c1", label: "Carbon-Titanium Weave", x: 45, y: 45, description: "Provides unprecedented structural integrity and extreme tensile strength without adding excess dead weight.", metric: "Rigidity: +46% compared to carbon" },
          { id: "h-c2", label: "Avional Subframes", x: 70, y: 50, description: "Aeronautical aluminium subframes host the engine, gearbox, and rear suspension modules.", specLink: "metallurgy" }
        ],
        image: chassisImg
      },
      {
        id: "engine",
        name: "AMG M158 Twin-Turbo V12 Engine",
        title: "Mercedes-AMG power unit",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-400 bg-red-500/5",
        description: "Handcrafted 6.0L twin-turbo V12 developed specifically for Pagani by Mercedes-AMG engineers, packing monumental mechanical forces.",
        hotspots: [
          { id: "h-e1", label: "Mercedes-AMG V12 Core", x: 65, y: 42, description: "An engineering masterpiece. Dual single-scroll turbochargers, dry-sump lubrication, producing 800 PS and 1,150 Nm torque.", metric: "Power: 789 HP (800 PS)" },
          { id: "h-e2", label: "Titanium Exhaust System", x: 88, y: 62, description: "Quad-tip titanium exhaust tuned acoustically to mirror a high-revving naturally aspirated V12 instrument.", metric: "Weight: 14.8 lbs / 6.7 kg" }
        ],
        image: engineImg
      }
    ] as any
  },
  {
    id: "huayra-roadster",
    name: "Huayra Roadster",
    category: "huayra",
    tagline: "Unveiled Wind Symphony",
    year: "2017",
    price: "$2,600,000",
    productionCount: "1 of 100",
    introText: "The Huayra Roadster is one of the very few convertible hypercars in history to weigh LESS than its coupe counterpart. Devoid of a fixed roof, its structural integrity was completely re-engineered using advanced Carbo-Titanium and Carbo-Triax blends to save 80 kg while stiffening overall mechanical response.",
    storyTitle: "The Engineering of Open-Air Lightness",
    storyParagraphs: [
      "To chop the roof and still save weight is an extreme engineering paradox. Most convertibles gain heavy reinforcement panels. Horacio bypassed this through material science, developing a new composition called 'Carbo-Titanium HP62 G2'—combining higher tensile loads with a simplified weave layout.",
      "The profile with the roof off allows clean air to flow over the active flaps with negligible resistance, letting passengers hear the AMG twin-scroll turbines spool and compress air inside the chamber."
    ],
    specs: {
      topSpeed: "360 KM/H",
      acceleration: "2.9 SEC",
      power: "764 HP (562 KW)",
      material: "Carbo-Titanium HP62 G2 and Carbo-Triax Monocoque",
      weight: "1280 KG",
      gearbox: "7-Speed AMT with Electronic Differential",
    },
    engine: {
      engineModel: "AMG Roadster Specced M158 V12",
      aspiration: "Twin-Turbocharged",
      maxHp: 764,
      maxTorqueVal: 1000,
      peakRpm: 6000
    },
    hueRotate: "hue-rotate(200deg) saturate(1.2) brightness(0.95)", // Royal Teal Metallic Blue
    explodedLayers: [
      {
        id: "shell",
        name: "Open-Air Composite Roadster Skin",
        title: "Open Canopy Aero",
        scale: 0.95,
        offsetY: -180,
        color: "border-blue-500 text-blue-400 bg-blue-500/5",
        description: "Beautiful hood cover, configured to hold a removable carbon-fiber and glass panels.",
        hotspots: [
          { id: "hr-1", label: "Carbon Glass Top", x: 45, y: 40, description: "Removable center roof panel featuring high-rigidity solar-protective glass.", metric: "Weight: 18 lbs" }
        ],
        image: huayraRoadsterShell
      },
      {
        id: "chassis",
        name: "High-Tensile HP62 G2 Monocoque",
        title: "G2 Carbo Spine",
        scale: 0.9,
        offsetY: -40,
        color: "border-sky-500 text-sky-400 bg-sky-500/5",
        description: "Extremely rigid composite structural bathtub cured with advanced aerospace materials.",
        hotspots: [
          { id: "hr-2", label: "Open-Torsional Rigidity", x: 50, y: 45, description: "Structural rigidity is boosted by up to +52% compared to early carbon panels.", metric: "Stiffness: 52,000 N·m/deg" }
        ],
        image: chassisImg
      },
      {
        id: "engine",
        name: "Mercedes-AMG M158 Roadster V12",
        title: "Tuned Roadster V12 Core",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-500 bg-red-500/5",
        description: "Twin-scroll forced induction powertrain with exhaust pipes sculpted specifically to filter lower acoustics for comfortable open cockpit driving.",
        image: engineImg,
        hotspots: []
      }
    ] as any
  },
  {
    id: "huayra-r",
    name: "Huayra R",
    category: "huayra",
    tagline: "V12-R Atmospheric Masterpiece",
    year: "2021",
    price: "$3,100,000",
    productionCount: "1 of 30",
    introText: "The Pagani Huayra R was built to create the ultimate naturally aspirated racing soundtrack. Boasting a newly built bespoke 6.0L AMG-co-developed atmospheric engine producing 850 horsepower at 8,250 RPM, it strips away turbocharger filtration to deliver an absolute mechanical screamer for the race track.",
    storyTitle: "Uncompromising Naturally Aspirated Soul",
    storyParagraphs: [
      "The Huayra R is not a supercar; it is a violent opera house. Its 'Pagani V12-R' engine was designed from scratch by HWA AG and Mercedes-AMG engineers to act as a structural member of the car's monocoque, shaving weight down to a brutal 1,050 kg total.",
      "The exhaust note developed by the hydropformed straight Inconel tubes matches the visceral exhaust shriek of classic 1980s Formula 1 racing, reverberating directly inside the driver's chassis cockpit."
    ],
    specs: {
      topSpeed: "389 KM/H",
      acceleration: "2.6 SEC",
      power: "850 HP (625 KW)",
      material: "Carbo-Titanium Monocoque with integrated roll-cage structural box",
      weight: "1050 KG",
      gearbox: "6-Speed Sequential Racing Transaxle",
    },
    engine: {
      engineModel: "Pagani V12-R (HWA/AMG) N/A",
      aspiration: "Naturally Aspirated",
      maxHp: 850,
      maxTorqueVal: 750,
      peakRpm: 8250
    },
    hueRotate: "hue-rotate(15deg) contrast(1.2) brightness(0.9)", // Burnished Bronze racing raw finish
    explodedLayers: [
      {
        id: "shell",
        name: "Extreme Downforce Aero Racing Body",
        title: "Track Aero Aero Wing",
        scale: 0.95,
        offsetY: -180,
        color: "border-yellow-500 text-yellow-400 bg-yellow-500/5",
        description: "Optimized track skin with specialized air ducts designed to generate up to 1000kg of downforce at 320km/h.",
        hotspots: [
          { id: "h-r1", label: "Rear Fin Stability", x: 84, y: 22, description: "Motorsport-style shark fin maximizing high-speed yaw and longitudinal stability.", metric: "Max Downforce: 1,000 kg" }
        ],
        image: huayraRShell
      },
      {
        id: "chassis",
        name: "Monocoque with Integrated Chrome-Moly Cage",
        title: "Track Safety Cell",
        scale: 0.9,
        offsetY: -40,
        color: "border-zinc-500 text-zinc-400 bg-zinc-500/5",
        description: "Composite structure utilizing high-tensile protective steel alloy cages bonded directly to the Carbo-Titanium tub.",
        hotspots: [
          { id: "h-r2", label: "Integrated HANS Safety", x: 45, y: 45, description: "Bespoke racing layout designed around extreme motorsport crash regulations.", metric: "Load: 12 lateral G" }
        ],
        image: chassisImg
      },
      {
        id: "engine",
        name: "Bespoke Pagani V12-R High-Rev Engine",
        title: "8,250 RPM Core",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-500 bg-red-500/5",
        description: "The lightest 6.0L naturally aspirated race engine in class (weighs only 198kg) developed alongside motorsport legends HWA AG.",
        hotspots: [
          { id: "h-r3", label: "Uncompressed Inconel Tubes", x: 88, y: 64, description: "Straight-through Inconel tubing acting as an unbaffled acoustic amplifier.", metric: "exhaust: Handcrafted" }
        ],
        image: engineImg
      }
    ] as any
  },
  {
    id: "utopia-coupe",
    name: "Utopia Coupe",
    category: "utopia",
    tagline: "The Alchemy of Simplicity",
    year: "2023",
    price: "$3,600,000",
    productionCount: "1 of 99",
    introText: "The Utopia Coupe represents Horacio Pagani's rejection of hybridization, digital screens, and heavy batteries. Retaining a pure, twin-turbocharged 6.0L V12 block paired with a bespoke gate manual gated transmission, it is an analog monument designed with sculpted, fluidic retro-modern outlines.",
    storyTitle: "The Counter-Revolution of Analog Art",
    storyParagraphs: [
      "In a world dominated by clinical electrification, Pagani chose a completely different canvas. The Utopia is a physical counter-revolution: no heavy batteries, no hybrid cells. Instead, a clean, 852-horsepower AMG twin-turbo V12 drives through a seven-speed gated manual shifter.",
      "The visual design took over six years, shedding complex aerodynamic winglets for a completely smooth, continuous profile that forces clean pressurized air through invisible internal channels to stabilize the rear axles."
    ],
    specs: {
      topSpeed: "354 KM/H",
      acceleration: "3.0 SEC",
      power: "852 HP (627 KW)",
      material: "Carbo-Titanium HP62 G2 and Pagani Carbo-Triax",
      weight: "1280 KG",
      gearbox: "7-Speed Gated Manual Transmission",
    },
    engine: {
      engineModel: "Mercedes-AMG bespoke M158 Twin-Turbo V12",
      aspiration: "Twin-Turbocharged",
      maxHp: 852,
      maxTorqueVal: 1100,
      peakRpm: 6000
    },
    hueRotate: "grayscale(1) brightness(1.2)", // Elegant Matte Platinum / Ivory Finish
    explodedLayers: [
      {
        id: "shell",
        name: "Pure Continuous Fluidic Body",
        title: "Utopian Sculpted Shell",
        scale: 0.95,
        offsetY: -180,
        color: "border-zinc-300 text-zinc-100 bg-zinc-900/5",
        description: "Continuous retro-modern contours built from hyper-dense autoclave carbon weaves without complex spoilers.",
        hotspots: [
          { id: "ut-1", label: "Oled-Free Instrument Cluster", x: 44, y: 35, description: "Hand-milled aluminum clocks and mechanical dials. No primary visual touchscreen screens.", metric: "Gears: Exposed linkage" }
        ],
        image: utopiaCoupeShell
      },
      {
        id: "chassis",
        name: "Carbo-Titanium HP62 G2 Backbone",
        title: "Alchemical Composites Core",
        scale: 0.9,
        offsetY: -40,
        color: "border-zinc-400 text-zinc-200 bg-zinc-900/10",
        description: "State-of-the-art weave combining carbon fibers with dense structural titanium nodes.",
        hotspots: [
          { id: "ut-2", label: "Exposed Gated Shifter", x: 48, y: 48, description: "Beautifully carved mechanical gated shifter box with individual exposed linkages.", metric: "Style: Vintage horology" }
        ],
        image: utopiaChassis
      },
      {
        id: "engine",
        name: "Mercedes-AMG 852 HP Twin-Turbo V12",
        title: "Pure Mechanical Roar",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-500 bg-red-550/5",
        description: "Artisanal twin-turbo powertrain delivering monstrous, unlagged torque curves, passing strictly through manual gearboxes.",
        image: utopiaEngine,
        hotspots: []
      }
    ] as any
  },
  {
    id: "utopia-roadster",
    name: "Utopia Roadster",
    category: "utopia",
    tagline: "Fluid Sculpture in Flight",
    year: "2024",
    price: "$4,200,000",
    productionCount: "1 of 130",
    introText: "The open-sky evolution of the Utopian narrative. Weighing exactly the same 1,280 kg as the dry coupe, the Utopia Roadster combines the tactile gated manual shift experience and a twin-turbo V12 block with an unconstrained view of the clouds in a breathtaking mechanical marriage.",
    storyTitle: "Double-Wishbone Flight Sculpture",
    storyParagraphs: [
      "To preserve the identical 1,280 kg dry mass between a coupe and roadster requires incredibly sophisticated material optimization. Every single structural layer of the Utopia Roadster was reconsidered, using carbon-titanium formulas to eliminate the need for heavy visual structural braces.",
      "With the solid hardtop off, the dual overhead air intakes feed the monster AMG V12, creating an incredibly rich physical, visceral induction storm inside the cockpit cabin."
    ],
    specs: {
      topSpeed: "350 KM/H",
      acceleration: "3.1 SEC",
      power: "852 HP (627 KW)",
      material: "Monocoque in Carbo-Titanium G2 & Carbo-Triax",
      weight: "1280 KG",
      gearbox: "7-Speed Gated Manual or AMT Sequential",
    },
    engine: {
      engineModel: "AMG Gated Twin-Turbo V12",
      aspiration: "Twin-Turbocharged",
      maxHp: 852,
      maxTorqueVal: 1100,
      peakRpm: 6000
    },
    hueRotate: "hue-rotate(100deg) saturate(1.15) brightness(1.05)", // Deep Emerald Green/Jade Chrome
    explodedLayers: [
      {
        id: "shell",
        name: "Emerald Roadster Carbon Shell",
        title: "Jade Aero Shell",
        scale: 0.95,
        offsetY: -180,
        color: "border-emerald-500 text-emerald-400 bg-emerald-500/5",
        image: utopiaRoadsterShell,
        hotspots: [],
        description: "Made entirely of light autoclave carbon with high-strength carbon-titanium thread arrays."
      },
      {
        id: "chassis",
        name: "Structural Carbo-Titanium Bathtub Core",
        title: "Aerospace Tub",
        scale: 0.9,
        offsetY: -40,
        color: "border-zinc-400 text-zinc-100 bg-zinc-900/10",
        image: utopiaChassis,
        hotspots: []
      },
      {
        id: "engine",
        name: "Mercedes-AMG 6.0L 852 HP V12 Core",
        title: "Power Core Unit",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-550 text-red-500 bg-red-550/5",
        image: utopiaEngine,
        hotspots: []
      }
    ] as any
  },
  {
    id: "codalunga",
    name: "Huayra Codalunga",
    category: "grandi-complicazioni",
    tagline: "Bespoke Retro Long-Tail Classic",
    year: "2022",
    price: "$7,400,000",
    productionCount: "1 of 5",
    introText: "The Huayra Codalunga (Long-tail) was created inside Pagani's ultra-exclusive Grandi Complicazioni department. Designed in collaboration with collectors who desired a layout that recalled the streamlined racing aesthetics of 1960s Le Mans, it is a flowing vintage sculpture.",
    storyTitle: "Crafting the Streamlined Classic",
    storyParagraphs: [
      "The Codalunga contains over 360mm of extended bodywork over the standard Huayra, designed using specialized aerodynamic styling techniques. Its clean, continuous lines flow smoothly from the cockpit to the tail coordinates without active wings.",
      "The interior represents the supreme peak of custom leatherwork: hand-woven nubuck leather strips, custom machined aluminum switchgear, and matching custom travel luggage cases sized specifically for the long tail."
    ],
    specs: {
      topSpeed: "350 KM/H",
      acceleration: "3.0 SEC",
      power: "840 HP (618 KW)",
      material: "Carbo-Titanium and advanced tri-axial composite fiber",
      weight: "1280 KG",
      gearbox: "7-Speed XTrac Automated Sync Manual",
    },
    engine: {
      engineModel: "Grandi Spec AMG Twin-Turbo V12",
      aspiration: "Twin-Turbocharged",
      maxHp: 840,
      maxTorqueVal: 1100,
      peakRpm: 5900
    },
    hueRotate: "hue-rotate(150deg) saturate(0.55) brightness(1.15)", // Retro Sage Sky Cream Blue
    explodedLayers: [
      {
        id: "shell",
        name: "Extended Codalunga Longtail Shell",
        title: "Grandi Streamlined Shell",
        scale: 0.95,
        offsetY: -180,
        color: "border-blue-300 text-blue-200 bg-blue-500/5",
        image: codalungaShell,
        hotspots: [
          { id: "cl-1", label: "Long Tail Exhaust Grille", x: 86, y: 35, description: "A highly exposed titanium quad-exhaust tail cluster styled to reflect 1960s racers.", metric: "Weight: 4.4 kg / 9.7 lbs" }
        ],
        description: "Extended aerodynamic profiles designed without external active wings to maximize continuous streamline laminar airflow."
      },
      {
        id: "chassis",
        name: "High-RIG Monocoque composite Bathtub",
        title: "Composite Spine",
        scale: 0.9,
        offsetY: -40,
        color: "border-zinc-500 text-zinc-300 bg-zinc-900/10",
        image: chassisImg,
        hotspots: []
      },
      {
        id: "engine",
        name: "Mercedes-AMG bespoke Twin-Turbo V12 core",
        title: "Grandi power Core",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-500 bg-red-550/5",
        image: engineImg,
        hotspots: []
      }
    ] as any
  },
  {
    id: "epitome",
    name: "Huayra Epitome",
    category: "grandi-complicazioni",
    tagline: "The Gated Pinnacle",
    year: "2024",
    price: "$9,000,000",
    productionCount: "1 of 1",
    introText: "The Pagani Epitome represents the absolute peak of the Grandi Complicazioni department: the first and only road-legal Huayra built with an exposed gated seven-speed manual transmission, created specifically to fulfill a single collector's lifetime dream.",
    storyTitle: "The Gated Masterpiece of Grandi dreams",
    storyParagraphs: [
      "The Epitome is a true physical mechanical absolute. While standard Huayras utilize sequential paddle automation, the Epitome mounts a bespoke seven-speed manual gearbox with an exposed vintage shifter gate made of polished aluminum and leather.",
      "The vehicle features completely redesigned front bumper ducts, integrated wheel arches to control underbody turbulent wind, and a unique titanium exhaust system with six active tips delivering a brutal baritone V12 roar."
    ],
    specs: {
      topSpeed: "350 KM/H",
      acceleration: "3.2 SEC",
      power: "864 HP (635 KW)",
      material: "Advanced Carbon-Titanium HP62 G2 monocoque and steel cages",
      weight: "1280 KG",
      gearbox: "7-Speed Bespoke Gated Manual Gearbox",
    },
    engine: {
      engineModel: "Mercedes-AMG One-Off 864 HP V12",
      aspiration: "Twin-Turbocharged",
      maxHp: 864,
      maxTorqueVal: 1100,
      peakRpm: 6000
    },
    hueRotate: "hue-rotate(240deg) saturate(1.3) brightness(0.85)", // Midnight Sapphire Velvet Blue
    explodedLayers: [
      {
        id: "shell",
        name: "Bespoke Outer Body arches with active exhaust",
        title: "Epitome Gated-Aero Shell",
        scale: 0.95,
        offsetY: -180,
        color: "border-blue-550 text-blue-400 bg-blue-500/5",
        image: epitomeShell,
        hotspots: [
          { id: "ep-1", label: "Gated Metal Shifter Box", x: 44, y: 38, description: "Classic manual gate shift lever with exposed chrome springs and counterweights.", metric: "Control: Mechanical Gated" }
        ],
        description: "Bespoke carbon arches configured alongside underbody wind diffusors and custom multi-port exhaust arrays."
      },
      {
        id: "chassis",
        name: "Reinforced Carbo-Titanium monocoque structure",
        title: "Sapphire Tub Spine",
        scale: 0.9,
        offsetY: -40,
        color: "border-zinc-550 text-zinc-300 bg-zinc-900/10",
        image: chassisImg,
        hotspots: []
      },
      {
        id: "engine",
        name: "Mercedes-AMG bespoke Epitome 6.0L V12 core",
        title: "Bespoke Gated V12 Engine",
        scale: 0.85,
        offsetY: 100,
        color: "border-red-500 text-red-500 bg-red-550/5",
        image: engineImg,
        hotspots: []
      }
    ] as any
  }
];
