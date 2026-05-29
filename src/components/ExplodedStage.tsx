import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Settings, Cpu, RefreshCw, Zap, Maximize2, ShieldAlert } from "lucide-react";
import heroImg from "../assets/images/pagani_huayra_hero_1779969746295.png";
import chassisImg from "../assets/images/pagani_chassis_blueprint_1779969787623.png";
import engineImg from "../assets/images/pagani_v12_blueprint_1779969766537.png";
import { VehicleLayer, Hotspot } from "../types";

interface ExplodedStageProps {
  layers?: VehicleLayer[];
  hueRotate?: string;
  vehicleName?: string;
}

const getLayerShifts = (layerId: string) => {
  if (layerId === "shell") {
    return { x: 0, y: 0, width: 460, height: 230 };
  } else if (layerId === "chassis") {
    return { x: 10, y: 12, width: 415, height: 207 };
  } else if (layerId === "engine") {
    return { x: 68, y: 18, width: 190, height: 95 };
  }
  return { x: 0, y: 0, width: 440, height: 220 };
};

const processImageTransparency = (img: HTMLImageElement): HTMLCanvasElement | HTMLImageElement => {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return img;
    
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // If the pixel is very close to white (near the background), key it out
      if (r > 248 && g > 248 && b > 248) {
        data[i + 3] = 0; // Set alpha to 0
      } else if (r > 240 && g > 240 && b > 240) {
        // Smooth transition / anti-aliasing for the keyed boundary
        const brightness = (r + g + b) / 3;
        const ratio = (255 - brightness) / 15;
        data[i + 3] = Math.min(255, Math.ceil(data[i + 3] * ratio));
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  } catch (err) {
    console.error("Error processing transparency for image:", err);
    return img;
  }
};

const isLayerLoaded = (img: HTMLImageElement | HTMLCanvasElement | undefined): boolean => {
  if (!img) return false;
  if (img instanceof HTMLCanvasElement) return true;
  return img.complete && img.naturalWidth > 1;
};

const getImgDimensions = (img: HTMLImageElement | HTMLCanvasElement | undefined) => {
  if (!img) return { width: 0, height: 0 };
  if (img instanceof HTMLCanvasElement) {
    return { width: img.width, height: img.height };
  }
  return { width: img.naturalWidth, height: img.naturalHeight };
};

export default function ExplodedStage({ layers: propLayers, hueRotate = "none", vehicleName = "Huayra BC" }: ExplodedStageProps) {
  const [explosionRatio, setExplosionRatio] = useState<number>(0.3); // User/scroll target
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [viewMode, setViewMode] = useState<"visual" | "wireframe" | "thermal">("visual");
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 640, height: 580 });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Record<string, HTMLImageElement | HTMLCanvasElement>>({});
  const currentExpRef = useRef<number>(0.3); // Physics dampened ratio for render

  // Synchronize explosion ratio with browser scrolling
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("pagan-exploded-stage");
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the element the screen has scrolled
      const start = rect.top - viewportHeight * 0.15;
      const end = rect.bottom - viewportHeight * 0.8;
      const total = end - start;
      
      if (total > 0) {
        const scrolled = -start;
        const ratio = Math.max(0, Math.min(1, scrolled / total));
        setExplosionRatio(ratio);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use passed layers or default to Huayra BC fallback
  const layers = propLayers || [
    {
      id: "shell",
      name: "Aerodynamic Composite Body with Carbon-Triax",
      title: "Active Aero Shell",
      scale: 0.95,
      offsetY: -180,
      color: "border-amber-500 text-amber-400 bg-amber-500/5",
      description: "Made entirely of ultra-light autoclave carbon fiber with Carbon-Triax reinforcements. Features 4 independent aerodynamic flaps.",
      hotspots: [
        { id: "h-f1", label: "Active Front Flaps", x: 22, y: 35, description: "Independently actuated carbon flaps regulated by an central ECU to govern drag and cornering vectoring.", metric: "Angle: 0°-28°" },
        { id: "h-f2", label: "Rear Active Wing", x: 84, y: 25, description: "Provides downforce of up to 500kg at 280km/h while serving as an air-brake during hard deceleration.", metric: "Max Downforce: 500kg" }
      ],
      image: heroImg
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
  ];

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const targets = [
      { id: "shell", src: layers[0]?.image || heroImg },
      { id: "chassis", src: layers[1]?.image || chassisImg },
      { id: "engine", src: layers[2]?.image || engineImg },
    ];
    
    // Clear old ref
    imagesRef.current = {};
    setImagesLoaded(false);

    targets.forEach((t) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = t.src;
      img.onload = () => {
        imagesRef.current[t.id] = processImageTransparency(img);
        loadedCount++;
        if (loadedCount === targets.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback for safety in case of load fails
        console.warn(`Could not load image ${t.id}, using empty image placeholder.`);
        const placeholder = new Image();
        placeholder.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        imagesRef.current[t.id] = placeholder;
        loadedCount++;
        if (loadedCount === targets.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [propLayers]);

  // Handle Resize of Stage Area
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Keep within cinematic proportions
        setCanvasDimensions({
          width: Math.max(320, width),
          height: Math.max(480, height || 580)
        });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Interactive HTML5 Real-Time Rendering Loop inside the Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Apply backing store device pixel ratio mapping to prevent blurriness
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasDimensions.width * dpr;
    canvas.height = canvasDimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Initialize atmospheric floating dust elements
    const particlesCount = 28;
    const particles: Array<{ x: number; y: number; vy: number; size: number; alpha: number; angle: number; speed: number }> = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * canvasDimensions.width,
        y: Math.random() * canvasDimensions.height,
        vy: 0.15 + Math.random() * 0.35,
        size: 0.8 + Math.random() * 1.4,
        alpha: 0.08 + Math.random() * 0.22,
        angle: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.2
      });
    }

    let scanlineY = 0;
    let scanDirection = 1;
    let animId: number;

    const render = () => {
      // Eased Spring Dampening for ultra-smooth buttery separation
      const delta = explosionRatio - currentExpRef.current;
      currentExpRef.current += delta * 0.085; // Viscous friction factor

      const activeExp = currentExpRef.current;

      // 1. Clear Stage using EXACT background color to blend completely into the page
      ctx.fillStyle = "#070708"; // Seamless Infinite Cinematic Void Backplate
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      const centerX = canvasDimensions.width / 2;
      const centerY = canvasDimensions.height / 2 + 25;

      // 2. Render CAD Blueprint Guidelines Backdrop
      if (viewMode === "wireframe") {
        ctx.strokeStyle = "rgba(59, 130, 246, 0.06)";
        ctx.lineWidth = 1;
        
        // Dynamic horizontal/vertical measuring lines
        for (let x = 40; x < canvasDimensions.width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvasDimensions.height);
          ctx.stroke();
        }
        for (let y = 40; y < canvasDimensions.height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvasDimensions.width, y);
          ctx.stroke();
        }

        // Concentric scanning circular grids
        ctx.strokeStyle = "rgba(59, 130, 246, 0.09)";
        ctx.beginPath();
        ctx.arc(centerX, centerY - 20, 160, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(59, 130, 246, 0.04)";
        ctx.beginPath();
        ctx.arc(centerX, centerY - 20, 260, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Draw Volumetric Atmospheric Dust Particles
      particles.forEach((p) => {
        p.y -= p.vy * 0.8;
        p.x += Math.sin(p.angle) * p.speed;
        p.angle += 0.01;

        if (p.y < 0) {
          p.y = canvasDimensions.height;
          p.x = Math.random() * canvasDimensions.width;
        }

        ctx.fillStyle = viewMode === "wireframe" 
          ? `rgba(59, 130, 246, ${p.alpha * 0.7})` 
          : `rgba(245, 158, 11, ${p.alpha})`; // matching vehicle premium ambient glow
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Grounding Shadow Layer (Simulated studio contact shadow)
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(
        centerX, centerY + 160, 10,
        centerX, centerY + 160, Math.min(centerX - 10, 310)
      );
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.82)");
      shadowGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.55)");
      shadowGrad.addColorStop(1, "rgba(7, 7, 8, 0)"); // Fades beautifully without hard rims
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(centerX - 350, centerY + 100, 700, 120);
      ctx.restore();

      // 5. Draw Mechanical Assembly Layer Connecting Studs
      if (activeExp > 0.15) {
        ctx.save();
        ctx.strokeStyle = viewMode === "wireframe" 
          ? "rgba(59, 130, 246, 0.22)" 
          : "rgba(245, 158, 11, 0.18)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        // Draw structural vertical alignment threads (Rear hubs, cockpit hub, Front hubs)
        const anchorsX = [-140, 0, 140];
        anchorsX.forEach((offsetX) => {
          const topPointY = centerY - 20 + (layers[0].offsetY * activeExp);
          const bottomPointY = centerY - 20 + (layers[layers.length - 1].offsetY * activeExp);
          ctx.beginPath();
          ctx.moveTo(centerX + offsetX, topPointY);
          ctx.lineTo(centerX + offsetX, bottomPointY);
          ctx.stroke();
        });
        ctx.restore();
      }

      // 6. Draw Spatially Separated Images (Engine, Chassis, Shell) in proper background-to-foreground order so that closed model renders correctly
      const renderLayers = [
        { id: "engine", img: imagesRef.current["engine"], yOffset: layers[2].offsetY, scale: layers[2].scale, z: 10 },
        { id: "chassis", img: imagesRef.current["chassis"], yOffset: layers[1].offsetY, scale: layers[1].scale, z: 20 },
        { id: "shell", img: imagesRef.current["shell"], yOffset: layers[0].offsetY, scale: layers[0].scale, z: 30 },
      ];

      renderLayers.forEach((l, idx) => {
        const img = l.img;
        const isLoaded = isLayerLoaded(img);

        ctx.save();

        const currentOffsetY = l.yOffset * activeExp;
        const currentScale = l.scale + (activeExp * 0.05);

        // Fluid responsive resize sizing
        const responsiveFactor = Math.min(1, canvasDimensions.width / 680);
        
        const shifts = getLayerShifts(l.id);
        const localShiftX = shifts.x;
        const localShiftY = shifts.y;
        let drawWidth = shifts.width;
        const dims = getImgDimensions(img);
        let drawHeight = dims.width ? (dims.height / dims.width) * drawWidth : shifts.height;

        // Position on stage (with horizontal and vertical component shifts)
        ctx.translate(centerX + localShiftX * responsiveFactor, centerY - 20 + currentOffsetY + localShiftY * responsiveFactor);
        ctx.scale(currentScale * responsiveFactor, currentScale * responsiveFactor);

        // Helper to draw beautiful, futuristic procedural blueprints of each compartment if not loaded, or in CAD mode
        const drawProceduralBlueprint = (colorOverride?: string) => {
          ctx.save();
          ctx.strokeStyle = colorOverride || (viewMode === "wireframe" 
            ? "rgba(14, 165, 233, 0.72)" 
            : viewMode === "thermal" 
              ? "rgba(239, 68, 68, 0.65)" 
              : "rgba(245, 158, 11, 0.76)");
          ctx.lineWidth = 1.5;

          if (l.id === "shell") {
            // Draw sleek, flowing aerodynamic profile of the Pagani hypercar body
            ctx.beginPath();
            ctx.moveTo(-220, 25); // nose spoiler splitter
            ctx.bezierCurveTo(-180, 10, -150, -15, -110, -28); // hood channels
            ctx.bezierCurveTo(-70, -65, -20, -78, 40, -68); // central tear-drop greenhouse cockpit lines
            ctx.bezierCurveTo(90, -58, 130, -18, 170, 0); // long exhaust engine deck spine
            ctx.bezierCurveTo(200, 5, 230, 8, 240, 24); // rear sleek spoiler lip
            ctx.lineTo(240, 34);
            ctx.bezierCurveTo(180, 44, 120, 46, -40, 44); // bottom frame
            ctx.bezierCurveTo(-120, 42, -180, 34, -220, 25);
            ctx.stroke();

            // Wheel housings cutouts (masking wheel spaces)
            ctx.fillStyle = "#070708";
            ctx.beginPath();
            ctx.arc(-130, 32, 28, 0, Math.PI, true);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(130, 32, 28, 0, Math.PI, true);
            ctx.fill();
            ctx.stroke();

            // Symmetrically aligned active aerodynamics flaps highlights
            ctx.strokeStyle = "rgba(239, 68, 68, 0.78)";
            ctx.lineWidth = 2;
            const flapLiftY = activeExp * 12;
            // Front active nose flap
            ctx.beginPath();
            ctx.moveTo(-165, 18);
            ctx.lineTo(-145, 18 - flapLiftY);
            ctx.stroke();
            // Rear high-drag flap
            ctx.beginPath();
            ctx.moveTo(195, 8);
            ctx.lineTo(215, 8 - flapLiftY * 1.28);
            ctx.stroke();

            // Door outlines and characteristic line splits
            ctx.strokeStyle = "rgba(161, 161, 170, 0.25)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-95, -22);
            ctx.lineTo(-35, 12);
            ctx.lineTo(35, 10);
            ctx.lineTo(65, -38);
            ctx.stroke();

            // Signature thin carbon leaf mirrors on slender stalks
            ctx.beginPath();
            ctx.moveTo(-100, -28);
            ctx.bezierCurveTo(-115, -46, -125, -46, -135, -46);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(-135, -46, 7, 3.5, -0.15, 0, Math.PI * 2);
            ctx.stroke();

          } else if (l.id === "chassis") {
            // Draw high-tensile core carbon monomer tub
            ctx.beginPath();
            ctx.rect(-110, -18, 220, 36); 
            ctx.stroke();

            // Carbon weave texture fill using dense crosshatched lines
            ctx.strokeStyle = "rgba(161, 161, 170, 0.12)";
            ctx.lineWidth = 0.5;
            for (let i = -105; i < 105; i += 10) {
              ctx.beginPath();
              ctx.moveTo(i, -18);
              ctx.lineTo(i + 12, 18);
              ctx.stroke();
            }

            ctx.strokeStyle = colorOverride || (viewMode === "wireframe" ? "rgba(14, 165, 233, 0.72)" : "rgba(245, 158, 11, 0.76)");
            ctx.lineWidth = 1.25;

            // Avional crash structures and subframes mounts
            ctx.beginPath();
            ctx.moveTo(-110, -12);
            ctx.lineTo(-170, -6);
            ctx.lineTo(-170, 12);
            ctx.lineTo(-110, 18);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(110, -12);
            ctx.lineTo(190, -18);
            ctx.lineTo(190, 22);
            ctx.lineTo(110, 18);
            ctx.stroke();

            // Double wishbone racing geometries
            ctx.strokeStyle = "rgba(16, 185, 129, 0.55)";
            ctx.lineWidth = 1.2;
            // front suspension wishbones
            ctx.beginPath();
            ctx.moveTo(-130, 32); ctx.lineTo(-110, 4);
            ctx.moveTo(-130, 32); ctx.lineTo(-110, 22);
            ctx.stroke();
            // rear suspension wishbones
            ctx.beginPath();
            ctx.moveTo(130, 32); ctx.lineTo(110, 4);
            ctx.moveTo(130, 32); ctx.lineTo(110, 22);
            ctx.stroke();

            // Wheels hubs, callipers, and radial ventilated brake discs
            ctx.strokeStyle = "rgba(161, 161, 170, 0.38)";
            ctx.lineWidth = 1.5;
            // front wheel hub rim
            ctx.beginPath();
            ctx.arc(-130, 32, 26, 0, Math.PI * 2);
            ctx.stroke();
            for (let j = 0; j < 6; j++) {
              ctx.beginPath();
              ctx.moveTo(-130, 32);
              ctx.lineTo(-130 + Math.cos(j * Math.PI / 3) * 26, 32 + Math.sin(j * Math.PI / 3) * 26);
              ctx.stroke();
            }
            // rear wheel hub rim
            ctx.beginPath();
            ctx.arc(130, 32, 28, 0, Math.PI * 2);
            ctx.stroke();
            for (let j = 0; j < 6; j++) {
              ctx.beginPath();
              ctx.moveTo(130, 32);
              ctx.lineTo(130 + Math.cos(j * Math.PI / 3) * 28, 32 + Math.sin(j * Math.PI / 3) * 28);
              ctx.stroke();
            }

          } else if (l.id === "engine") {
            // Draw incredible 6.0L twin-turbo Mercedes-AMG V12 block
            ctx.beginPath();
            ctx.rect(5, -20, 85, 34); // solid engine matrix
            ctx.stroke();

            // Symphony of twin exhaust loops merging to the core exhaust pipe
            ctx.strokeStyle = "rgba(239, 68, 68, 0.72)";
            ctx.lineWidth = 1.4;
            // upper manifold paths to back exhaust tip
            ctx.beginPath();
            ctx.moveTo(85, -12);
            ctx.bezierCurveTo(115, -30, 145, -30, 175, -6);
            ctx.stroke();

            // lower manifold paths
            ctx.beginPath();
            ctx.moveTo(85, 6);
            ctx.bezierCurveTo(115, 22, 145, 22, 175, 4);
            ctx.stroke();

            // Iconique central Pagani quad exhaust tip arrangement
            ctx.strokeStyle = "rgba(239, 68, 68, 0.9)";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(175, -5); ctx.lineTo(185, -5);
            ctx.moveTo(175, -1); ctx.lineTo(185, -1);
            ctx.moveTo(175, 3); ctx.lineTo(185, 3);
            ctx.moveTo(175, 7); ctx.lineTo(185, 7);
            ctx.stroke();

            // Twin turbocharger manifolds and air scrolls
            ctx.strokeStyle = "rgba(14, 165, 233, 0.78)";
            ctx.lineWidth = 1.5;
            // Turbo charger 1 (Upper scroll)
            ctx.beginPath();
            ctx.arc(35, -28, 11, 0, Math.PI * 1.5);
            ctx.stroke();
            // Turbo charger 2 (Lower scroll)
            ctx.beginPath();
            ctx.arc(35, 20, 11, 0, Math.PI * 1.5);
            ctx.stroke();
          }
          ctx.restore();
        };

        // a) Render vertical floor reflection (Faded, warped open shadow reflection)
        if (activeExp < 0.45 && l.id === "shell") {
          ctx.save();
          const refAlpha = 0.15 * (1 - activeExp * 2.2);
          if (refAlpha > 0) {
            ctx.globalAlpha = refAlpha;
            ctx.scale(1, -0.42); // flip coordinates
            ctx.translate(0, -100);

            if (isLoaded) {
              // Apply shaders to photo reflection
              if (viewMode === "thermal") {
                ctx.filter = "hue-rotate(240deg) saturate(2.5) contrast(1.15) opacity(0.35)";
              } else if (viewMode === "wireframe") {
                ctx.filter = "invert(0.1) opacity(0.2) contrast(1.2) grayscale(1)";
              } else if (hueRotate && hueRotate !== "none") {
                ctx.filter = hueRotate;
              } else {
                ctx.filter = "contrast(1.05) brightness(0.95)";
              }
              ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
            } else {
              // Vector reflection fallback
              drawProceduralBlueprint("rgba(245, 158, 11, 0.28)");
            }
          }
          ctx.restore();
        }

        // b) Apply dynamic rendering shaders under interactive viewport modes
        if (isLoaded && viewMode !== "wireframe") {
          ctx.save();
          if (viewMode === "thermal") {
            ctx.filter = "hue-rotate(240deg) saturate(3.3) contrast(1.25) brightness(0.95)";
          } else if (hueRotate && hueRotate !== "none") {
            ctx.filter = `${hueRotate} contrast(1.08) brightness(0.98)`;
          } else {
            ctx.filter = "contrast(1.04) brightness(0.96)";
          }
          ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
          ctx.restore();
        } else {
          // Fallback to high tech vector blueprint drafting drawing
          drawProceduralBlueprint();
        }

        // c) Render thermal thermodynamic hot-spots or sensor indicators over active models
        if (viewMode === "thermal" && l.id === "engine") {
          const engineHeat = ctx.createRadialGradient(40, -4, 2, 40, -4, 40);
          engineHeat.addColorStop(0, "rgba(239, 68, 68, 0.85)"); 
          engineHeat.addColorStop(0.4, "rgba(245, 158, 11, 0.55)"); 
          engineHeat.addColorStop(1, "rgba(245, 158, 11, 0)");
          ctx.fillStyle = engineHeat;
          ctx.beginPath();
          ctx.arc(40, -4, 40, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // 7. Ambient Linear Scanned Wave (Simulating structural radar beam sweeps)
      ctx.save();
      scanlineY += 1.4 * scanDirection;
      if (scanlineY > canvasDimensions.height || scanlineY < 0) {
        scanDirection *= -1;
      }
      
      const beamGrad = ctx.createLinearGradient(0, scanlineY - 6, 0, scanlineY + 6);
      if (viewMode === "wireframe") {
        beamGrad.addColorStop(0, "rgba(59, 130, 246, 0)");
        beamGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.18)");
        beamGrad.addColorStop(1, "rgba(59, 130, 246, 0)");
      } else {
        beamGrad.addColorStop(0, "rgba(245, 158, 11, 0)");
        beamGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.16)");
        beamGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
      }
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, scanlineY - 10, canvasDimensions.width, 20);
      ctx.restore();

      // 8. Draw Vector Annotation Callouts linking exploded components
      if (activeExp > 0.3) {
        ctx.save();
        ctx.font = "500 8.5px JetBrains Mono, monospace";
        ctx.lineWidth = 1;

        layers.forEach((layer) => {
          const lyY = layer.offsetY * activeExp;
          const lyScale = layer.scale + (activeExp * 0.05);
          const rFactor = Math.min(1, canvasDimensions.width / 680) * lyScale;
          const shifts = getLayerShifts(layer.id);

          layer.hotspots.forEach((hot) => {
            // Hotspot coordinates mapping relative to vehicle size and scale
            const layoutWidth = shifts.width;
            const layoutHeight = shifts.height;

            const localHotX = (hot.x / 100 - 0.5) * layoutWidth * rFactor;
            const localHotY = (hot.y / 100 - 0.5) * layoutHeight * rFactor;

            // Absolute spatial positions on canvas coordinate map (incorporating layer offsets)
            const absoluteAbsX = centerX + localHotX + shifts.x * Math.min(1, canvasDimensions.width / 680);
            const absoluteAbsY = centerY - 20 + lyY + localHotY + shifts.y * Math.min(1, canvasDimensions.width / 680);

            // Callout connecting lines layout
            const alignLeft = hot.x < 50;
            const bendLineX = alignLeft ? absoluteAbsX - 45 : absoluteAbsX + 45;
            const bendLineY = absoluteAbsY - 16;
            const endTextLineX = alignLeft ? bendLineX - 45 : bendLineX + 45;

            // Color palette matching the visual theme
            const alertColor = viewMode === "wireframe" ? "#3b82f6" : "#f59e0b";
            ctx.strokeStyle = alertColor;
            
            // Pulse circle anchor ring
            ctx.beginPath();
            ctx.arc(absoluteAbsX, absoluteAbsY, 3, 0, Math.PI * 2);
            ctx.fillStyle = alertColor;
            ctx.fill();

            // Trace connecting lines
            ctx.beginPath();
            ctx.moveTo(absoluteAbsX, absoluteAbsY);
            ctx.lineTo(bendLineX, bendLineY);
            ctx.lineTo(endTextLineX, bendLineY);
            ctx.stroke();

            // Render labels
            ctx.fillStyle = "#ffffff";
            ctx.fillText(
              hot.label.toUpperCase(),
              alignLeft ? endTextLineX - 5 : bendLineX + 5,
              bendLineY - 4
            );

            ctx.fillStyle = "rgba(161, 161, 170, 0.85)"; // slate-zinc text indicator
            ctx.fillText(
              hot.metric || "99.2% RECON",
              alignLeft ? endTextLineX - 5 : bendLineX + 5,
              bendLineY + 9
            );
          });
        });
        ctx.restore();
      }

      // 9. Precision Dimension Arrows in CAD View
      if (viewMode === "wireframe") {
        ctx.save();
        ctx.strokeStyle = "rgba(59, 130, 246, 0.35)";
        ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
        ctx.font = "8px monospace";

        // Vertical Dimension: Height indicator
        const heightStartX = centerX - canvasDimensions.width * 0.44;
        ctx.beginPath();
        ctx.moveTo(heightStartX, centerY - 140);
        ctx.lineTo(heightStartX, centerY + 130);
        ctx.stroke();
        ctx.fillText("H: 1,169 mm", heightStartX - 68, centerY - 10);

        // Horizontal Dimension: Length indicator
        const lengthStartY = centerY + 155;
        ctx.beginPath();
        ctx.moveTo(centerX - 240, lengthStartY);
        ctx.lineTo(centerX + 240, lengthStartY);
        ctx.stroke();
        ctx.fillText("L: 4,605 mm (CHASSIS WHEELBASE: 2,795 mm)", centerX - 120, lengthStartY + 12);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [explosionRatio, viewMode, imagesLoaded, hueRotate, layers, canvasDimensions]);

  // View mode controls triggers
  const toggleViewMode = () => {
    setViewMode((prev) => {
      if (prev === "visual") return "wireframe";
      if (prev === "wireframe") return "thermal";
      return "visual";
    });
  };

  // Torsional structural computations
  const torsionalRigidityVal = Math.round(46000 + (1 - explosionRatio) * 12354);
  const coreWeightVal = Math.round(parseInt(layers[1]?.description?.includes?.("1,218") ? "1218" : "1250") || 1218); // fallback
  const structuralIntegrityPercentage = Math.round(100 - (explosionRatio * 100));

  return (
    <section 
      id="pagan-exploded-stage" 
      className="relative min-h-[145vh] w-full bg-[#070708] border-y border-zinc-900/60 overflow-hidden flex flex-col justify-start px-4 md:px-12 py-16 selection:bg-amber-500 selection:text-black"
    >
      {/* Background HUD reference markings */}
      <div className="absolute top-6 left-6 text-[10px] font-mono text-zinc-500 tracking-widest pointer-events-none select-none">
        PAGANI AUTOMOBILI MOD.{vehicleName.toUpperCase().replace(" ", "_")} // DECOMPOSED_ASSEMBLY_MATRIX
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono text-amber-500/85 tracking-widest pointer-events-none select-none flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        LIVE SCANNER LAB: ACTIVE
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative mt-8">
        
        {/* Left Aspect Side: Document Control CAD HUD */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-amber-500 tracking-[0.25em] uppercase block">
              Interactive Blueprint
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white font-sans">
              Decomposed <span className="font-extralight text-zinc-400">Engineering</span>
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Drag-scroll the page or adjust the precision multiplier below to mechanically pull apart the {vehicleName}, revealing the advanced {layers[1]?.name || "carbon core Spine"}.
            </p>
          </div>

          {/* Controller Card */}
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-900/90 backdrop-blur-md space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-amber-500/10 border-b border-l border-amber-500/20 text-[8px] text-amber-500 font-mono rounded-bl-lg">MODULE_02</div>
            
            <div className="space-y-2.5">
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
                className="w-full accent-amber-500 h-1 bg-zinc-900 rounded-lg cursor-ew-resize opacity-85 hover:opacity-100 transition-opacity"
              />
              
              <div className="flex justify-between text-[9px] font-mono text-zinc-550">
                <span>0.0 (CONSOLIDATED)</span>
                <span>1.0 (MAX DETACHED)</span>
              </div>
            </div>

            {/* View Mode Channel Filter Toggle */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-900/40">
              <span className="text-[10px] font-mono text-zinc-500 block">BLUEPRINT FILTER SCHEMATIC</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button 
                  onClick={() => setViewMode("visual")}
                  className={`py-2 px-2 rounded-lg font-mono text-[10px] border tracking-wider transition-all duration-300 cursor-pointer ${
                    viewMode === "visual" 
                      ? "border-amber-500 bg-amber-500/10 text-amber-400 font-bold shadow-lg shadow-amber-500/5" 
                      : "border-zinc-900 bg-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                  }`}
                >
                  VISUAL
                </button>
                <button 
                  onClick={() => setViewMode("wireframe")}
                  className={`py-2 px-2 rounded-lg font-mono text-[10px] border tracking-wider transition-all duration-300 cursor-pointer ${
                    viewMode === "wireframe" 
                      ? "border-blue-500 bg-blue-500/10 text-blue-400 font-bold shadow-lg shadow-blue-500/5" 
                      : "border-zinc-900 bg-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                  }`}
                >
                  CAD GRID
                </button>
                <button 
                  onClick={() => setViewMode("thermal")}
                  className={`py-2 px-2 rounded-lg font-mono text-[10px] border tracking-wider transition-all duration-300 cursor-pointer ${
                    viewMode === "thermal" 
                      ? "border-red-500 bg-red-550/10 text-red-400 font-bold shadow-lg shadow-red-500/5" 
                      : "border-zinc-900 bg-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                  }`}
                >
                  THERMAL
                </button>
              </div>
            </div>

            {/* Simulated Live Torsional Calculations */}
            <div className="space-y-3 pt-4 border-t border-zinc-900/40 text-xs font-mono">
              <div className="flex justify-between items-center bg-zinc-900/10 p-2.5 rounded-lg border border-zinc-900/30">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-amber-500" /> TORSIONAL RIGIDITY:
                </span>
                <span className="text-zinc-300 font-bold">{torsionalRigidityVal.toLocaleString()} Nm/rad</span>
              </div>
              <div className="flex justify-between items-center bg-zinc-900/10 p-2.5 rounded-lg border border-zinc-900/30">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-500" /> INTEGRATION STATUS:
                </span>
                <span className={explosionRatio < 0.1 ? "text-emerald-450 font-bold" : "text-amber-500 font-bold"}>
                  {explosionRatio < 0.1 ? "100% SECURE" : `DE-ALIGNED (${structuralIntegrityPercentage}%)`}
                </span>
              </div>
              <div className="flex justify-between items-center bg-zinc-900/10 p-2.5 rounded-lg border border-zinc-900/30">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5 text-amber-500 animate-spin-slow" /> HULL ELEVATION COG:
                </span>
                <span className="text-zinc-300 font-bold">{Math.round(390 + (explosionRatio * 450))} mm</span>
              </div>
            </div>
            
            {/* Action controls */}
            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => setExplosionRatio(0)}
                className="text-[10px] font-mono text-zinc-550 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" /> CONSOLIDATE HULL
              </button>
              <button 
                onClick={() => setExplosionRatio(0.9)}
                className="text-[10px] font-mono text-amber-500 hover:text-amber-400 transition-colors uppercase font-bold tracking-wider cursor-pointer"
              >
                FULLY DETACH
              </button>
            </div>
          </div>
        </div>

        {/* Right Aspect Side: The High-Fidelity Custom Canvas Render Frame */}
        <div 
          ref={containerRef}
          className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[580px] w-full select-none border border-zinc-900 rounded-2xl bg-zinc-950/20 px-2 py-4 overflow-hidden shadow-2xl"
        >
          {/* Aesthetic Studio Crosshair Corner Anchors */}
          <div className="absolute top-4 left-4 h-3.5 w-3.5 border-t border-l border-zinc-800 pointer-events-none" />
          <div className="absolute top-4 right-4 h-3.5 w-3.5 border-t border-r border-zinc-800 pointer-events-none" />
          <div className="absolute bottom-4 left-4 h-3.5 w-3.5 border-b border-l border-zinc-800 pointer-events-none" />
          <div className="absolute bottom-4 right-4 h-3.5 w-3.5 border-b border-r border-zinc-800 pointer-events-none" />
          
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-zinc-900/20 pointer-events-none" />
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-zinc-900/20 pointer-events-none" />

          {/* Cinematic sequence state annotation */}
          <AnimatePresence>
            {explosionRatio < 0.08 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-6 px-4 py-2 bg-amber-500/5 border border-amber-500/25 text-amber-400 font-mono text-[9px] rounded-lg tracking-[0.25em] uppercase z-30 pointer-events-none shadow"
              >
                AUTO-LOCK ACTIVE // SLIDE DOWN TO DECOMPOSE
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Actual HTML5 Canvas */}
          <div className="relative w-full h-[520px] flex items-center justify-center">
            
            <canvas 
              ref={canvasRef} 
              className="w-full h-full block cursor-crosshair"
              style={{ width: canvasDimensions.width, height: canvasDimensions.height }}
            />

            {/* Silent aesthetic Caching Indicator overlay in the corner */}
            <div className="absolute top-4 right-4 bg-zinc-950/80 border border-zinc-900 px-3 py-1.5 rounded-lg text-[9px] font-mono flex items-center gap-2 pointer-events-none select-none z-30">
              <span className={`h-1.5 w-1.5 rounded-full ${imagesLoaded ? "bg-emerald-500" : "bg-amber-500 animate-ping"}`} />
              <span className="text-zinc-400">TEXTURE STATE: {imagesLoaded ? "ONLINE" : "DRAFT // CACHING_VECTORS"}</span>
            </div>

            {/* Underlying Active Touchscreen Overlay Hotspots triggers */}
            {explosionRatio > 0.3 && layers.map((layer) => {
              const currentRatioY = layer.offsetY * currentExpRef.current;
              const currentScale = layer.scale + (currentExpRef.current * 0.05);
              const shifts = getLayerShifts(layer.id);

              return layer.hotspots.map((hotspot) => {
                const isActive = activeHotspot?.id === hotspot.id;

                // Hotspots alignment coordinates inside the canvas viewport space (with layer coordinates shifted)
                const layHeightFactor = Math.min(1, canvasDimensions.width / 680) * currentScale;
                const computedCenterX = canvasDimensions.width / 2;
                const computedCenterY = canvasDimensions.height / 2 + 5;

                const localHotX = (hotspot.x / 100 - 0.5) * shifts.width * layHeightFactor;
                const localHotY = (hotspot.y / 100 - 0.5) * shifts.height * layHeightFactor;

                const absoluteX = computedCenterX + localHotX + shifts.x * Math.min(1, canvasDimensions.width / 680);
                const absoluteY = computedCenterY + currentRatioY + localHotY + shifts.y * Math.min(1, canvasDimensions.width / 680);

                return (
                  <div
                    key={hotspot.id}
                    style={{
                      left: `${absoluteX}px`,
                      top: `${absoluteY}px`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-40 group"
                  >
                    <button
                      onClick={() => setActiveHotspot(isActive ? null : hotspot)}
                      onMouseEnter={() => setActiveHotspot(hotspot)}
                      className={`h-6 w-6 rounded-full flex items-center justify-center border transition-all duration-300 relative cursor-pointer ${
                        isActive 
                          ? "bg-amber-500 border-white text-black scale-110 shadow-lg shadow-amber-500/30" 
                          : "bg-black/80 border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black hover:scale-105"
                      }`}
                      aria-label={`Inspect ${hotspot.label}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      <span className="absolute inset-0 rounded-full border border-current animate-ping opacity-20 scale-150 pointer-events-none" />
                    </button>

                    {/* Diagnostic HUD label hover tooltip */}
                    <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-zinc-950/95 border border-zinc-800 text-[9px] font-mono text-zinc-300 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-2xl">
                      <span className="text-white block font-semibold">{hotspot.label}</span>
                      <span className="text-amber-500 block text-[8px]">{hotspot.metric || "ACTIVE FIELD"}</span>
                    </div>
                  </div>
                );
              });
            })}

          </div>

          {/* Dynamic Technical Bottom Diagnostic Info-Bar */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-center py-2 px-4 bg-zinc-950/80 border border-zinc-900 rounded-xl font-mono text-[10px] text-zinc-550 gap-2 md:gap-0 z-30 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-amber-500" />
              <span>ACTIVE SYSTEM FOCUS: <span className="text-zinc-300 font-bold">{activeHotspot ? activeHotspot.label : "LAMINAR WAVE COMPLETED"}</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span>DRY MASS DATA: <span className="text-zinc-300 font-bold">{coreWeightVal} KG</span></span>
              <span>STABILITY MATRIX: <span className="text-zinc-200 font-bold uppercase">{explosionRatio < 0.25 ? "LOCKED" : "DECOMPOSED"}</span></span>
            </div>
          </div>

          {/* Hotspot Detailed Information Panel (Absolute internal overlay drawer, beautifully animated) */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.96 }}
                className="absolute inset-x-4 bottom-14 md:bottom-16 md:left-auto md:right-4 md:w-80 rounded-xl bg-zinc-950/95 border border-amber-500/20 p-5 shadow-2xl backdrop-blur-md z-45 flex flex-col space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono text-amber-500 tracking-[0.2em] uppercase">SYSTEM COMPONENT</span>
                    <h4 className="text-sm font-medium text-white tracking-wide">{activeHotspot.label}</h4>
                  </div>
                  <button 
                    onClick={() => setActiveHotspot(null)}
                    className="text-[9px] font-mono text-zinc-500 hover:text-white border border-zinc-900 bg-zinc-900/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {activeHotspot.description}
                </p>
                {activeHotspot.metric && (
                  <div className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/10 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-zinc-500">DIAGNOSTIC DATA:</span>
                    <span className="text-amber-400 font-bold">{activeHotspot.metric}</span>
                  </div>
                )}
                <div className="text-[9px] font-mono text-zinc-600 border-t border-zinc-900/60 pt-2 flex items-center justify-between">
                  <span>TELEMETRY FEED // SECURE_LINE</span>
                  <span className="text-emerald-500">● LIVE RUNNING</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
