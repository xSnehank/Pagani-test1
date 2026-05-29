import { useState, useRef, useEffect } from "react";
import { Send, Cpu, CircleDot, Terminal, Sparkles, MessageCircle, ArrowDown } from "lucide-react";
import { ChatMessage } from "../types";

interface AICuratorProps {
  vehicleName?: string;
  vehicleContext?: string;
  customQueries?: { label: string; query: string }[];
}

export default function AICurator({ 
  vehicleName = "Huayra BC", 
  vehicleContext = "Huayra BC named after Benny Caiola. Engine is a Mercedes-AMG M158 twin-turbo V12 producing 789 HP (800 PS) and 1,100 N·m of torque. Chassis is Carbo-Titanium composite.",
  customQueries 
}: AICuratorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      parts: [
        {
          text: `Greetings. I am the AI Pagani Carbo-Curator, your digital engineering docent. I am trained in Horacio Pagani's design axioms: the perfect marriage of Art and Science—inspired by Leonardo da Vinci. Ask me anything relative to the metallurgy, active aerodynamics, bespoke powertrain configuration, or structural design of the Pagani ${vehicleName}.`
        }
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new message arrivals
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorText("");
    setLoading(true);

    const userMsg: ChatMessage = {
      role: "user",
      parts: [{ text: textToSend }]
    };

    // Append immediately to messages
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    try {
      // Build context history to send to server
      const chatHistory = messages.map(item => ({
        role: item.role,
        parts: item.parts
      }));

      const res = await fetch("/api/gemini/curate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
          vehicleContext: vehicleContext
        })
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Communication failure with the Curatorial core.");
      }

      const data = await res.json();
      
      const curatorMsg: ChatMessage = {
        role: "model",
        parts: [{ text: data.text }]
      };

      setMessages((prev) => [...prev, curatorMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "An unexpected error occurred during connection.");
    } finally {
      setLoading(false);
    }
  };

  const predefinedQueries = customQueries || [
    { label: "Material Composition", query: `Explain the material science of the monocoque composites used on the Pagani ${vehicleName}.` },
    { label: "Powertrain Engine", query: `How are the mechanical power levels and torque profiles developed for the Pagani ${vehicleName}?` },
    { label: "Aerodynamics Setup", query: `Detail the active and passive aerodynamic configurations of the Pagani ${vehicleName}.` },
    { label: "Leonardo Axiom", query: `How does Leonardo da Vinci's marriage of Art and Science apply to ${vehicleName}?` }
  ];

  return (
    <section 
      id="ai-curator" 
      className="w-full bg-[#0d0d0f] border-b border-zinc-900 py-16 px-4 md:px-12 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(229,169,60,0.05),transparent_35%)] pointer-events-none" />
      
      <div className="max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Curator Introduction Text */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 animate-fade-in">
          <div className="space-y-4">
            <span className="text-[11px] font-mono text-amber-500 tracking-[0.25em] uppercase block">
              COGNITIVE COMPANION
            </span>
            <h3 className="text-3.5xl font-light tracking-tight text-white font-sans leading-tight">
              Talk with our <span className="font-semibold text-amber-400">AI Curator</span>
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Unlock the secrets of Horacio Pagani’s artisanal carbon sanctuary. Connect directly with the AI Curator, a dedicated mechanical encyclopedia that understands the aerodynamics, composites metallurgy, specs, and conceptual story of the Pagani {vehicleName} in scientific detail.
            </p>
          </div>

          {/* Prompt quick topics list */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider">SELECT AN ENGINEERING CONVERSATION OUTLINE:</span>
            <div className="flex flex-wrap gap-2">
              {predefinedQueries.map((item, index) => (
                <button
                  key={index}
                  disabled={loading}
                  onClick={() => handleSendMessage(item.query)}
                  className="px-3.5 py-2 rounded-lg bg-zinc-950/80 border border-zinc-900 text-xs font-mono text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all text-left flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leonardo Da Vinci's Axiom */}
          <div className="p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20">
            <p className="text-xs text-zinc-500 italic leading-relaxed">
              &quot;Art and science are disciplines that must walk hand in hand. The artist needs the rigor of science, and the scientist needs the passion and imagination of art.&quot;
            </p>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500/80 mt-2 block">— HORACIO PAGANI</span>
          </div>

        </div>

        {/* Right Side: Elite Terminal System Interface */}
        <div className="lg:col-span-7 bg-zinc-950/85 border border-zinc-900 rounded-xl p-5 md:p-6 flex flex-col h-[520px] justify-between relative shadow-2xl backdrop-blur-md animate-fade-in">
          {/* Header Bar */}
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3 text-zinc-500 font-mono text-[10px] select-none">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-amber-400" />
              <span>PAGANI_CURATOR_TERMINAL // MOD_{vehicleName.toUpperCase().replace(" ", "_")} // CORE_ACTIVE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>READY</span>
            </div>
          </div>

          {/* Conversation Bubble Panel */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
            {messages.map((msg, i) => {
              const isCurator = msg.role === "model";
              return (
                <div 
                  key={i} 
                  className={`flex ${isCurator ? "justify-start" : "justify-end"} items-start gap-2.5`}
                >
                  {isCurator && (
                    <div className="h-7 w-7 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-mono text-xs shadow-inner">
                      <Cpu className="h-3.5 w-3.5" />
                    </div>
                  )}
                  
                  <div className={`p-4 rounded-xl text-xs leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                    isCurator 
                      ? "bg-zinc-900/35 border border-zinc-900/70 text-zinc-200 font-sans" 
                      : "bg-amber-500 border border-amber-450 text-black font-semibold font-sans shadow-md"
                  }`}>
                    {msg.parts[0].text}
                  </div>
                </div>
              );
            })}

            {/* Loading / Thinking indicator */}
            {loading && (
              <div className="flex justify-start items-center gap-2.5">
                <div className="h-7 w-7 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 select-none">
                  <CircleDot className="h-3.5 w-3.5 animate-pulse" />
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-900/70 text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                  <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce" />
                  <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span>TRANSCRIBING ENGINEERING TEXT FILES...</span>
                </div>
              </div>
            )}

            {/* Error notifications */}
            {errorText && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-400 rounded-lg">
                ⚠️ ERROR: {errorText}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Interactive Chat Input Area */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="flex items-center gap-2 pt-3 border-t border-zinc-900"
          >
            <input
              type="text"
              value={inputVal}
              disabled={loading}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about materials, AMG engines, or performance specifications..."
              className="flex-1 bg-zinc-900/55 border border-zinc-850 px-4 py-2.5 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || loading}
              className="h-9 w-9 bg-amber-500 hover:bg-amber-400 text-black border border-amber-400 rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
