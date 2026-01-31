import React, { useState, useEffect, useRef } from 'react';
import { Book, Chapter, InteractiveComponentType } from './types';
import { LIBRARY_BOOKS } from './constants';
import { Flame, BookOpen, Scroll, X, ChevronRight, ChevronLeft, Menu, Shield, Terminal, Activity, Layers, MessageSquare, Code, AlertTriangle, Maximize2, Minimize2, Sparkles, User, Crown, Cpu, Bell } from 'lucide-react';

declare var process: any;

// --- Live Counters ---
const LiveCounter = () => {
  const [count, setCount] = useState(1247);
  
  useEffect(() => {
    // Simular contagem ao vivo
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, ou 1
        const newCount = prev + change;
        return Math.max(1000, newCount); // Mínimo 1000
      });
    }, 5000); // Atualiza a cada 5 segundos
    
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono">
      {count.toLocaleString('pt-BR')}
    </span>
  );
};

const ActiveUsersCounter = () => {
  const [activeUsers, setActiveUsers] = useState(42);
  
  useEffect(() => {
    // Simular usuários ativos
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, ou 2
        const newCount = prev + change;
        return Math.max(10, Math.min(100, newCount)); // Entre 10 e 100
      });
    }, 3000); // Atualiza a cada 3 segundos
    
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono">
      {activeUsers}
    </span>
  );
};

// --- Like System ---
const useLikeSystem = () => {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());

  // Carregar likes do localStorage ao montar
  useEffect(() => {
    const savedLikes = localStorage.getItem('bookLikes');
    const savedUserLikes = localStorage.getItem('userLikedBooks');
    
    if (savedLikes) {
      setLikes(JSON.parse(savedLikes));
    }
    
    if (savedUserLikes) {
      setUserLikes(new Set(JSON.parse(savedUserLikes)));
    }
  }, []);

  // Salvar likes no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('bookLikes', JSON.stringify(likes));
  }, [likes]);

  // Salvar likes do usuário no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('userLikedBooks', JSON.stringify(Array.from(userLikes)));
  }, [userLikes]);

  const handleLike = (bookId: string) => {
    setLikes(prev => ({
      ...prev,
      [bookId]: (prev[bookId] || 0) + 1
    }));
    
    setUserLikes(prev => {
      const newSet = new Set(prev);
      newSet.add(bookId);
      return newSet;
    });
  };

  const handleUnlike = (bookId: string) => {
    setLikes(prev => ({
      ...prev,
      [bookId]: Math.max(0, (prev[bookId] || 1) - 1)
    }));
    
    setUserLikes(prev => {
      const newSet = new Set(prev);
      newSet.delete(bookId);
      return newSet;
    });
  };

  const toggleLike = (bookId: string) => {
    if (userLikes.has(bookId)) {
      handleUnlike(bookId);
    } else {
      handleLike(bookId);
    }
  };

  return { likes, userLikes, toggleLike, isLiked: (bookId: string) => userLikes.has(bookId) };
};

// --- Audio System (UI SFX) ---

const useSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playHover = () => {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Som sutil de "tick" de ar/alta frequência
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.015, ctx.currentTime); // Volume muito baixo
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playClick = () => {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Som de "blip" suave e tecnológico
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  };

  return { playHover, playClick };
};

// --- Notifications System ---

interface NotificationUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
}

const RECENT_UPDATES: NotificationUpdate[] = [
  { id: '1', title: 'Novo Capítulo: O Protocolo Fênix', description: 'Adicionado ao livro "Crisis Management". Aprenda como renascer um servidor.', date: 'Hoje', read: false },
  { id: '2', title: 'Áudio Neural Atualizado', description: 'Novas vozes disponíveis para leitura imersiva.', date: 'Ontem', read: false },
  { id: '3', title: 'Modo Leitura', description: 'Agora com navegação lateral e melhor contraste.', date: '2 dias atrás', read: true },
];

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updates, setUpdates] = useState(RECENT_UPDATES);
  const [permission, setPermission] = useState(Notification.permission);
  const { playHover, playClick } = useSound();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = updates.filter(u => !u.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    playClick();
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      // Mark as read after a delay
      setTimeout(() => {
        setUpdates(prev => prev.map(u => ({ ...u, read: true })));
      }, 2000);
    }
  };

  const requestNotificationPermission = async () => {
    playClick();
    if (!("Notification" in window)) {
      alert("Este navegador não suporta notificações.");
      return;
    }

    const permission = await Notification.requestPermission();
    setPermission(permission);

    if (permission === "granted") {
      new Notification("Guardiões da Chama", {
        body: "As notificações estão ativas. Você será avisado de novos capítulos.",
        icon: "https://cdn-icons-png.flaticon.com/512/744/744465.png" // Generic flame icon fallback
      });
    }
  };

  const simulatePush = () => {
     if (Notification.permission === "granted") {
        playClick();
        const newUpdate = { 
            id: Date.now().toString(), 
            title: 'Alerta de Invasão (Simulação)', 
            description: 'Tráfego suspeito detectado na porta 27015. Verifique os logs.', 
            date: 'Agora', 
            read: false 
        };
        
        setUpdates(prev => [newUpdate, ...prev]);
        
        new Notification("Alerta do Guardião", {
            body: "Tráfego suspeito detectado na porta 27015.",
            icon: "https://cdn-icons-png.flaticon.com/512/744/744465.png"
        });
     }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleToggle}
        onMouseEnter={playHover}
        className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
        title="Atualizações"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-flame-500 rounded-full animate-pulse shadow-[0_0_8px_#ff4500]"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-4 w-80 md:w-96 bg-zinc-950 border border-zinc-800 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
            <h3 className="font-display text-sm font-bold text-white tracking-widest uppercase">Notificações</h3>
            <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">v1.4.0</span>
          </div>

          <div className="p-3 bg-yellow-500/10 border-b border-yellow-500/20">
            <p className="text-xs text-yellow-400 leading-relaxed text-center">
              <strong>🚧 Em Desenvolvimento:</strong> O sistema de notificação está em melhoria. Algumas funcionalidades podem não estar disponíveis temporariamente.
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {permission === 'default' && (
              <div className="p-4 bg-flame-600/10 border-b border-flame-500/20">
                <p className="text-xs text-zinc-300 mb-3 leading-relaxed">
                  Ative as notificações para saber quando novos capítulos ou livros forem adicionados à biblioteca.
                </p>
                <button 
                  onClick={requestNotificationPermission}
                  onMouseEnter={playHover}
                  className="w-full py-2 bg-flame-600 hover:bg-flame-500 text-white text-xs font-bold uppercase tracking-widest rounded transition-colors"
                >
                  Ativar Push
                </button>
              </div>
            )}
            
            {permission === 'granted' && (
               <div className="px-4 py-2 bg-zinc-900/30 border-b border-white/5 flex justify-end">
                  <button 
                    onClick={simulatePush}
                    className="text-[10px] uppercase tracking-widest text-flame-500 hover:text-white transition-colors"
                  >
                    Simular Alerta
                  </button>
               </div>
            )}

            {updates.map(update => (
              <div key={update.id} className={`p-4 border-b border-white/5 hover:bg-zinc-900/50 transition-colors ${!update.read ? 'bg-zinc-900/20' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-bold ${!update.read ? 'text-white' : 'text-zinc-400'}`}>{update.title}</h4>
                  {!update.read && <span className="w-1.5 h-1.5 bg-flame-500 rounded-full mt-1.5"></span>}
                </div>
                <p className="text-xs text-zinc-500 mb-2 leading-relaxed">{update.description}</p>
                <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{update.date}</span>
              </div>
            ))}
          </div>
          
          <div className="p-3 text-center bg-zinc-900/50 border-t border-white/5">
            <button className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
              Marcar todas como lidas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Interactive Components ---

// 1. Console Simulator
const ConsoleSimulator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['> Conectado ao servidor Source Engine v1.35', '> Aguardando comando...']);
  const { playClick } = useSound();
  
  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      playClick();
      const cmd = input.trim();
      let response = '';
      
      if (cmd.startsWith('sm_ban')) {
        if (cmd.includes('"') && cmd.match(/\d+/)) {
           response = `> SUCESSO: Jogador banido. ID registrado no banco de dados.`;
        } else {
           response = `> ERRO DE SINTAXE: Use sm_ban "nome" <minutos> [motivo]`;
        }
      } else if (cmd === 'status') {
        response = `> hostname: Servidor Guardiões\n> map : de_dust2\n> players : 1 humans, 0 bots`;
      } else if (cmd === '') {
        response = '>';
      } else {
        response = `> Comando desconhecido: ${cmd}`;
      }
      
      setHistory([...history, `> ${cmd}`, response]);
      setInput('');
    }
  };

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-zinc-700 bg-black font-mono text-sm shadow-2xl">
      <div className="bg-zinc-800 px-4 py-2 text-zinc-400 text-xs flex items-center gap-2">
        <Terminal className="w-3 h-3" /> CONSOLE DE ADMINISTRAÇÃO (Simulação)
      </div>
      <div className="p-4 h-64 overflow-y-auto space-y-1 text-green-500">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap opacity-90">{line}</div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-white animate-pulse">_</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none text-white w-full font-mono"
            placeholder="Digite um comando (ex: sm_ban ou status)..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

// 2. Flame Balance
const FlameBalance = () => {
  const [value, setValue] = useState(50);
  const { playHover } = useSound();
  
  let message = "";
  let color = "";
  
  if (value < 30) {
    message = "Muito Brando: O fogo se apaga. A toxicidade toma conta porque não há limites. Jogadores hardcore saem.";
    color = "text-blue-400";
  } else if (value > 70) {
    message = "Muito Rígido: O fogo queima a floresta. A comunidade morre sufocada. Ninguém se diverte.";
    color = "text-red-500";
  } else {
    message = "Equilíbrio do Guardião: Calor suficiente para acolher, limites firmes para proteger.";
    color = "text-flame-500";
  }

  return (
    <div className="my-12 p-8 border border-white/10 bg-zinc-900/50 rounded-xl">
      <h4 className="font-display text-white text-lg mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-flame-500" /> Calibrando a Intervenção
      </h4>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={(e) => {
          setValue(Number(e.target.value));
          playHover(); 
        }}
        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-flame-500"
      />
      <div className="flex justify-between text-xs text-zinc-500 mt-2 font-serif uppercase tracking-widest">
        <span>Anarquia</span>
        <span>Tirania</span>
      </div>
      <p className={`mt-6 text-center font-serif text-lg transition-colors duration-300 ${color}`}>
        {message}
      </p>
    </div>
  );
};

// 3. Server Layers
const ServerLayers = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const { playHover } = useSound();
  
  const layers = [
    { name: 'Edge / CDN', desc: 'Primeira barreira. Absorve ataques volumétricos massivos (L3/L4) longe do seu servidor.' },
    { name: 'Firewall de Hardware', desc: 'Filtra pacotes maliciosos via lista de controle (ACL) antes do SO.' },
    { name: 'Aplicação (Game Server)', desc: 'Onde o jogo roda. Vulnerável a exploits de L7. Precisa de patches constantes.' },
    { name: 'Database', desc: 'O coração sagrado. Nunca deve ser exposto publicamente (apenas localhost ou VPN).' }
  ];

  return (
    <div className="my-12 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-4 text-zinc-400 text-sm uppercase tracking-widest">
        <Layers className="w-4 h-4" /> Camadas de Defesa
      </div>
      {layers.map((layer, idx) => (
        <div 
          key={idx}
          onMouseEnter={() => {
            setActiveLayer(idx);
            playHover();
          }}
          onMouseLeave={() => setActiveLayer(null)}
          className={`p-4 border transition-all duration-300 cursor-help ${
            activeLayer === idx 
              ? 'bg-zinc-800 border-flame-500 scale-105 shadow-[0_0_15px_rgba(255,69,0,0.3)]' 
              : 'bg-black border-zinc-800 hover:border-zinc-600'
          }`}
        >
          <div className="font-bold text-white font-display">{layer.name}</div>
          <div className={`text-sm text-zinc-400 mt-1 transition-all duration-300 ${activeLayer === idx ? 'opacity-100 max-h-20' : 'opacity-60 max-h-0 md:max-h-20 overflow-hidden'}`}>
            {layer.desc}
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Dialogue Tree (Psychology)
interface DialogueScenario {
  text: string;
  options: {
    label: string;
    outcome: string;
    success: boolean;
  }[];
}

const DialogueTree = ({ data }: { data?: { scenarios: DialogueScenario[] } }) => {
  const [step, setStep] = useState(0);
  const { playHover, playClick } = useSound();
  
  const scenarios = data?.scenarios || [];
  
  if (scenarios.length === 0) {
    return (
      <div className="my-12 p-4 border border-red-900 bg-red-900/10 text-red-500 rounded">
        Carregando simulador... (Dados não encontrados)
      </div>
    );
  }

  const currentScenario = scenarios[Math.min(step, scenarios.length - 1)];
  const isFinished = step >= scenarios.length;

  return (
    <div className="my-12 bg-zinc-900 border border-zinc-700 p-6 rounded-lg">
       <div className="flex items-center gap-2 mb-6 text-flame-500 font-display">
         <MessageSquare className="w-5 h-5" /> Simulador de Decisões
       </div>
       
       {!isFinished ? (
         <>
           <p className="text-white text-lg mb-6 italic">"{currentScenario.text}"</p>
           <div className="space-y-3">
             {currentScenario.options.map((opt, idx) => (
               <button 
                 key={idx}
                 onMouseEnter={playHover}
                 onClick={() => {
                   playClick();
                   if (opt.success) setStep(step + 1);
                   else alert(opt.outcome);
                 }}
                 className="w-full text-left p-4 bg-black border border-zinc-800 hover:border-flame-500 hover:bg-zinc-800 transition-all rounded text-sm text-zinc-300"
               >
                 {opt.label}
               </button>
             ))}
           </div>
         </>
       ) : (
         <div className="text-center py-8">
           <h3 className="text-2xl text-flame-500 font-display mb-2">Situação Resolvida</h3>
           <p className="text-zinc-400">Você escolheu o caminho do Guardião. A chama permanece estável.</p>
           <button 
            onClick={() => { playClick(); setStep(0); }} 
            onMouseEnter={playHover}
            className="mt-4 text-xs uppercase tracking-widest text-zinc-500 hover:text-white"
           >
             Reiniciar
           </button>
         </div>
       )}
    </div>
  );
};

// 5. Regex Lab (AutoMod)
const RegexLab = () => {
  const [pattern, setPattern] = useState('b[a@]d');
  const [testString, setTestString] = useState('Esse é um bad server');
  const { playClick } = useSound();
  
  let match = false;
  try {
    const regex = new RegExp(pattern, 'i');
    match = regex.test(testString);
  } catch (e) {
    match = false;
  }

  return (
    <div className="my-12 bg-black border border-zinc-800 p-6 rounded-xl font-mono">
      <div className="flex items-center gap-2 mb-4 text-zinc-400 text-xs uppercase">
        <Code className="w-4 h-4" /> Laboratório Regex
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-zinc-500 text-xs mb-1">Padrão Regex (Javascript)</label>
          <input 
            type="text" 
            value={pattern}
            onClick={playClick}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-flame-500 p-2 rounded focus:border-flame-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-zinc-500 text-xs mb-1">Texto de Teste</label>
          <input 
            type="text" 
            value={testString}
            onClick={playClick}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-white p-2 rounded focus:border-white focus:outline-none"
          />
        </div>
        
        <div className={`p-4 rounded border ${match ? 'bg-red-900/20 border-red-500 text-red-500' : 'bg-green-900/20 border-green-500 text-green-500'}`}>
          {match ? '⚠️ MATCH DETECTADO (Seria punido)' : '✅ NENHUM MATCH (Passou)'}
        </div>
      </div>
    </div>
  );
};

// 6. Crisis Decision (Crisis Management)
const CrisisDecision = () => {
  const [outcome, setOutcome] = useState<string | null>(null);
  const { playHover, playClick } = useSound();

  return (
    <div className="my-12 p-6 border-l-4 border-red-600 bg-zinc-900">
      <div className="flex items-center gap-2 mb-4 text-red-500 font-bold uppercase tracking-widest text-sm">
        <AlertTriangle className="w-4 h-4" /> Simulação: Vazamento de Dados
      </div>
      
      {!outcome ? (
        <>
          <p className="text-white mb-6">
            Um hacker alega ter o banco de dados de IPs dos seus usuários e ameaça vazar em 1 hora se não receber admin. O que você faz primeiro?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onMouseEnter={playHover}
              onClick={() => { playClick(); setOutcome("bad"); }}
              className="p-4 bg-black border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-sm text-left transition-colors"
            >
              A. Tentar negociar tempo com o hacker no chat privado.
            </button>
            <button 
              onMouseEnter={playHover}
              onClick={() => { playClick(); setOutcome("good"); }}
              className="p-4 bg-black border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-sm text-left transition-colors"
            >
              B. Cortar comunicação, derrubar o servidor temporariamente e notificar a host.
            </button>
          </div>
        </>
      ) : (
        <div className="animate-in fade-in">
          {outcome === "bad" ? (
             <p className="text-red-400">ERRO CRÍTICO. Negociar valida o poder dele. Ele vai vazar de qualquer jeito ou pedir mais. Você perdeu tempo precioso de contenção.</p>
          ) : (
             <p className="text-green-400">CORRETO. Em vazamento, sua prioridade é estancar a sangria. Derrubar o serviço protege quem ainda não foi afetado e tira a alavanca de pressão do atacante.</p>
          )}
          <button 
            onMouseEnter={playHover}
            onClick={() => { playClick(); setOutcome(null); }} 
            className="mt-4 text-zinc-500 text-xs underline"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
};


// --- Main Components ---

const Header = ({ onNavigate }: { onNavigate: (page: 'home' | 'library' | 'philosophy' | 'about' | 'credits') => void }) => {
  const { playHover, playClick } = useSound();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-void-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => { playClick(); onNavigate('home'); }}
          onMouseEnter={playHover}
        >
          <div className="relative">
            <Flame className="w-8 h-8 text-flame-500 animate-pulse-slow" />
            <div className="absolute inset-0 bg-flame-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-flame-500 transition-colors">
            GUARDIÕES DA CHAMA
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onMouseEnter={playHover}
            onClick={() => { playClick(); onNavigate('philosophy'); }} 
            className="text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold"
          >
            Filosofia
          </button>
          <button 
            onMouseEnter={playHover}
            onClick={() => { playClick(); onNavigate('library'); }} 
            className="text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold"
          >
            Biblioteca
          </button>
          <button 
            onMouseEnter={playHover}
            onClick={() => { playClick(); onNavigate('about'); }} 
            className="text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold"
          >
            Sobre Nós
          </button>
          <button 
            onMouseEnter={playHover}
            onClick={() => { 
              playClick(); 
              alert('🚧 Sistema de Doações em Desenvolvimento\n\nEstamos trabalhando para implementar um sistema de doações que permitirá apoiar o crescimento do Guardiões da Chama. Em breve você poderá contribuir para manter o site gratuito e ajudar-nos a criar mais conteúdo para a comunidade.\n\nAgradecemos seu interesse e apoio!');
            }} 
            className="text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold"
          >
            Doações
          </button>
           <button 
            onMouseEnter={playHover}
            onClick={() => { playClick(); onNavigate('credits'); }} 
            className="text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold"
          >
            Créditos
          </button>
          
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          
          <NotificationCenter />
        </nav>
        
        <div className="md:hidden flex items-center gap-4">
           <NotificationCenter />
           <Menu className="w-6 h-6 text-white" />
        </div>
      </div>
    </header>
  );
};

const Hero = ({ onEnter }: { onEnter: () => void }) => {
  const { playHover, playClick } = useSound();
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-void-900 to-void-900 z-0"></div>
      
      <div className="z-10 text-center max-w-4xl animate-float">
        <div className="mb-6 flex justify-center">
          <Shield className="w-16 h-16 text-flame-500 opacity-80" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
          PROTEJA <br/> A <span className="text-flame-500">CHAMA</span>
        </h1>
        <p className="font-serif text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          A moderação não é sobre punição. É sobre preservar a luz em um mundo digital escuro.
          <br/><span className="text-sm text-zinc-600 mt-4 block italic">Você não escolheu ser um guardião. Nasceu assim.</span>
        </p>
        
        <button 
          onMouseEnter={playHover}
          onClick={() => { playClick(); window.location.href = '#library'; }}
          className="group relative px-8 py-4 bg-transparent border border-zinc-700 text-white font-display font-bold tracking-widest overflow-hidden hover:border-flame-500 transition-colors duration-300"
        >
          <span className="relative z-10 group-hover:text-flame-500 transition-colors">ABRIR BIBLIOTECA</span>
          <div className="absolute inset-0 bg-white/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </section>
  );
};

const PhilosophySection = () => {
  // Array com 20 filosofias diferentes
  const philosophies = [
    {
      title: "A Chama da Responsabilidade",
      content: "Cada clique, cada decisão, cada momento de moderação carrega o peso de milhares de experiências. O Guardião não age por poder, mas por dever."
    },
    {
      title: "O Equilíbrio Delicado",
      content: "Moderar não é apenas punir, é equilibrar. Como um médico que cura sem ferir, o Guardião restaura a harmonia sem destruir a individualidade."
    },
    {
      title: "A Sabedoria do Silêncio",
      content: "Às vezes, a ação mais poderosa é a não-ação. Saber quando intervir e quando observar é a arte dos verdadeiros Guardiões."
    },
    {
      title: "A Força da Empatia",
      content: "Por trás de cada avatar existe uma pessoa com esperanças, medos e sonhos. O Guardião vê além do comportamento e enxerga a humanidade."
    },
    {
      title: "A Coragem da Moderação",
      content: "É mais fácil ignorar o caos do que enfrentá-lo. O Guardião escolhe o caminho difícil porque sabe que a paz tem um preço."
    },
    {
      title: "A Persistência da Chama",
      content: "A moderação é uma maratona, não uma corrida. Cada dia é uma nova batalha na guerra infinita pela civilidade digital."
    },
    {
      title: "A Humildade do Poder",
      content: "O verdadeiro Guardião sabe que não é dono da verdade, apenas um guardião temporário da chama que ilumina a comunidade."
    },
    {
      title: "A Visão Além do Código",
      content: "O que vemos como toxicidade é apenas dor disfarçada. O Guardião aprende a ler entre as linhas do comportamento digital."
    },
    {
      title: "A Arte da Transformação",
      content: "Moderar não é eliminar, é transformar. Levar o caos à ordem, o ódio ao entendimento, a confusão à clareza."
    },
    {
      title: "A Paciência Ativa",
      content: "A paciência do Guardião não é passividade, é a espera estratégica pelo momento certo de agir, de ensinar, de inspirar."
    },
    {
      title: "A Legibilidade Digital",
      content: "Cada mensagem, cada emoji, cada pausa conta uma história. O Guardião aprende a ler a linguagem não-dita das comunidades."
    },
    {
      title: "O Propósito Redescoberto",
      content: "Muitos chegam à moderação por acaso, mas permanecem por propósito. O Guardião encontra significado no serviço aos outros."
    },
    {
      title: "A Resiliência do Guardião",
      content: "Cada insulto absorvido, cada conflito resolvido, fortalece o Guardião. O que não nos destrói, nos torna mais sábios."
    },
    {
      title: "A Comunidade como Jardim",
      content: "Uma comunidade floresce quando cuidada. O Guardião é o jardineiro que remove as ervas daninhas sem danificar as flores."
    },
    {
      title: "A Justiça Restaurativa",
      content: "O objetivo não é punir, mas restaurar. O Guardião busca a reconciliação onde outros veem apenas castigo."
    },
    {
      title: "A Sabedoria Acumulada",
      content: "Cada dia de moderação adiciona uma camada de sabedoria. O Guardião aprende que nunca termina sua jornada de aprendizado."
    },
    {
      title: "O Poder do Exemplo",
      content: "A melhor moderação é a que inspira outros a se moderarem. O Guardião lidera pelo exemplo, não pela autoridade."
    },
    {
      title: "A Esperança como Estratégia",
      content: "Mesmo no caos mais absoluto, o Guardião mantém a esperança. Porque onde há esperança, há possibilidade de redenção."
    },
    {
      title: "A Equidade Digital",
      content: "Regras iguais para todos, mas aplicadas com sabedoria. O Guardião entende que justiça não é o mesmo que igualdade cega."
    },
    {
      title: "A Eternidade do Impacto",
      content: "Cada ação de moderação ecoa no tempo. O Guardião sabe que está escrevendo a história digital das futuras gerações."
    }
  ];

  // Calcular qual filosofia mostrar baseado na data atual
  const getDailyPhilosophy = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diffTime = Math.abs(today.getTime() - startOfYear.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const philosophyIndex = diffDays % philosophies.length;
    return philosophies[philosophyIndex];
  };

  const dailyPhilosophy = getDailyPhilosophy();

  return (
    <section className="py-32 px-6 bg-void-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-flame-500/10 border border-flame-500/20 rounded-full mb-6">
            <span className="text-flame-400 text-sm font-semibold">📅 Filosofia do Dia</span>
          </div>
          <h2 className="font-display text-4xl text-white mb-4">{dailyPhilosophy.title}</h2>
          <p className="text-zinc-500 text-sm">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="prose prose-invert prose-lg mx-auto font-serif text-zinc-300 leading-loose">
          <p className="first-letter:text-5xl first-letter:text-flame-500 first-letter:float-left first-letter:mr-3">
            {dailyPhilosophy.content}
          </p>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 text-zinc-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-flame-500 rounded-full animate-pulse"></div>
              <span>Filosofia atualizada diariamente</span>
            </div>
            <span>•</span>
            <span>20 sabedorias rotativas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const CreditsSection = () => (
    <section className="py-32 px-6 bg-void-900 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center w-full">
         <h2 className="font-display text-4xl text-white mb-4 animate-in fade-in slide-in-from-bottom-8 duration-700">Arquitetos da Chama</h2>
         <p className="font-serif text-zinc-500 italic mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">Aqueles que construíram o templo e acenderam a luz.</p>
         
         <div className="space-y-12">
            {/* Primeira linha de créditos */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
               {/* Rhuan De Cillo Silva Card */}
               <div className="group relative p-8 border border-flame-500/20 bg-zinc-900/30 rounded-xl hover:bg-zinc-900/80 hover:border-flame-500/50 transition-all duration-500 animate-in slide-in-from-left-8 duration-1000 delay-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-flame-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-black border border-flame-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,69,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,69,0,0.3)] transition-all">
                          <Crown className="w-8 h-8 text-flame-500" />
                      </div>
                      <h3 className="font-display text-2xl text-white mb-2 tracking-wide">Rhuan De Cillo Silva</h3>
                      <p className="font-serif text-flame-500/80 text-sm uppercase tracking-widest mb-6">Visionário & Autor</p>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                          Pela concepção filosófica, curadoria do conhecimento arcano e custódia da chama original. A mente que imaginou um refúgio para os protetores digitais.
                      </p>
                  </div>
               </div>

               {/* Gemini Card */}
               <div className="group relative p-8 border border-blue-500/20 bg-zinc-900/30 rounded-xl hover:bg-zinc-900/80 hover:border-blue-500/50 transition-all duration-500 animate-in slide-in-from-right-8 duration-1000 delay-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-black border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all">
                          <Sparkles className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="font-display text-2xl text-white mb-2 tracking-wide">Google Gemini</h3>
                      <p className="font-serif text-blue-400/80 text-sm uppercase tracking-widest mb-6">Engenharia & Código</p>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                          Pela arquitetura do código, estruturação do conteúdo e suporte estrutural na materialização da visão. A máquina que organizou o conhecimento.
                      </p>
                  </div>
               </div>
            </div>

            {/* Texto Centralizado - Guardiões do Conhecimento */}
            <div className="flex items-center justify-center animate-in fade-in duration-1000 delay-300">
              <div className="text-center">
                <h3 className="font-display text-4xl text-flame-400 font-bold tracking-wide mb-3">Guardiões do Conhecimento</h3>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-flame-500 to-transparent mx-auto"></div>
              </div>
            </div>

            {/* Segunda linha de créditos */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
               {/* GitHub Pages Card */}
               <div className="group relative p-8 border border-green-500/20 bg-zinc-900/30 rounded-xl hover:bg-zinc-900/80 hover:border-green-500/50 transition-all duration-500 animate-in slide-in-from-bottom-8 duration-1000 delay-400">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-black border border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-all">
                          <Cpu className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="font-display text-2xl text-white mb-2 tracking-wide">GitHub Pages v2</h3>
                      <p className="font-serif text-green-400/80 text-sm uppercase tracking-widest mb-6">Hospedagem & Disponibilidade</p>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                          Pela infraestrutura estável, distribuição global e plataforma confiável que mantém o templo digital acessível a todos os guardiões. A fundação invisível que sustenta o conhecimento.
                      </p>
                  </div>
               </div>

               {/* Cascade Card */}
               <div className="group relative p-8 border border-yellow-500/20 bg-zinc-900/30 rounded-xl hover:bg-zinc-900/80 hover:border-yellow-500/50 transition-all duration-500 animate-in slide-in-from-right-8 duration-1000 delay-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-black border border-yellow-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(251,191,36,0.1)] group-hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all">
                          <Sparkles className="w-8 h-8 text-yellow-400" />
                      </div>
                      <h3 className="font-display text-2xl text-white mb-2 tracking-wide">Cascade</h3>
                      <p className="font-serif text-yellow-400/80 text-sm uppercase tracking-widest mb-6">Desenvolvedor</p>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                          Pela contribuição no desenvolvimento do site e na construção de uma experiência imersiva para os guardiões.
                      </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="mt-24 pt-12 border-t border-white/5 text-center animate-in fade-in duration-1000 delay-500">
          <p className="text-xs text-zinc-600 uppercase tracking-[0.2em]">Guardiões da Chama &copy; 2024</p>
         </div>
      </div>
    </section>
);

const LibraryTooltip = ({ book, x, y }: { book: Book; x: number; y: number }) => {
  // Simple check to flip tooltip if it's too close to right edge
  const isRightEdge = typeof window !== 'undefined' && x > window.innerWidth - 350;
  const leftPos = isRightEdge ? x - 330 : x + 20;

  return (
    <div 
      className="fixed z-50 w-80 p-5 bg-zinc-950/95 border border-flame-500/40 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-md text-left pointer-events-none animate-in fade-in zoom-in-95 duration-200"
      style={{ top: y + 10, left: leftPos }}
    >
        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-flame-500 font-bold flex items-center gap-1">
              <Shield className="w-3 h-3"/> {book.difficulty}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-zinc-500">{book.platform}</span>
        </div>
        
        <h4 className="font-display text-lg text-white font-bold leading-tight mb-1">{book.title}</h4>
        <p className="font-serif text-xs text-zinc-500 italic mb-4">{book.subtitle}</p>
        
        <p className="font-serif text-xs text-zinc-300 leading-relaxed mb-4 border-l border-zinc-700 pl-3">
          {book.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
             {book.tags.map(tag => (
                <span key={tag} className="text-[9px] uppercase tracking-wider px-2 py-0.5 border border-zinc-800 text-zinc-400 bg-zinc-900 rounded">
                {tag}
                </span>
            ))}
        </div>
    </div>
  );
};

const BookCard: React.FC<{ 
  book: Book; 
  onClick: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onLike: (bookId: string) => void;
  isLiked: boolean;
  likeCount: number;
}> = ({ book, onClick, onMouseMove, onMouseLeave, onLike, isLiked, likeCount }) => {
  const { playHover, playClick } = useSound();
  
  return (
    <div 
      onMouseEnter={playHover}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => { playClick(); onClick(); }}
      className="group relative h-96 bg-zinc-900/50 border border-white/5 p-8 flex flex-col justify-between cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,69,0,0.15)] hover:border-flame-500/50 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-50 group-hover:opacity-80 transition-opacity"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs uppercase tracking-widest text-flame-500 font-bold">{book.difficulty}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                onLike(book.id);
              }}
              className={`p-2 rounded-full transition-all duration-300 ${
                isLiked 
                  ? 'bg-flame-500 text-white hover:bg-flame-600' 
                  : 'bg-zinc-800 text-zinc-400 hover:text-flame-500'
              }`}
              title={isLiked ? "Remover curtida" : "Curtir este livro"}
            >
              <svg className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <span className="text-xs text-zinc-500 min-w-[20px] text-center">
              {likeCount > 0 ? likeCount : ''}
            </span>
          </div>
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-2 group-hover:text-flame-500 transition-colors leading-tight">
          {book.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded font-mono">
            ID: {book.id}
          </span>
          <span className="text-xs text-zinc-500">•</span>
          <span className="text-xs text-zinc-400">{book.platform}</span>
        </div>
        <p className="font-serif text-sm text-zinc-400 italic mb-4">{book.subtitle}</p>
        <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-3">
          {book.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {book.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-zinc-800 text-zinc-500">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <button className="w-full py-3 bg-flame-600 hover:bg-flame-500 text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(255,69,0,0.3)]">
          Ler Livro
        </button>
      </div>
    </div>
  );
};

const Library = ({ onOpenBook }: { onOpenBook: (book: Book) => void }) => {
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tooltip, setTooltip] = useState<{ book: Book, x: number, y: number } | null>(null);
  const { playHover, playClick } = useSound();
  const { likes, toggleLike, isLiked } = useLikeSystem();

  const filteredBooks = LIBRARY_BOOKS.filter(book => {
    const matchLevel = filterLevel === 'all' || book.difficulty === filterLevel;
    const matchPlatform = filterPlatform === 'all' 
      || (filterPlatform === 'Steam' && book.platform.includes('Steam'))
      || (filterPlatform === 'Discord' && book.platform.includes('Discord'))
      || (filterPlatform === 'Server' && book.platform.includes('Servidor'))
      || (filterPlatform === 'Geral' && book.platform.includes('Geral'));
    
    const searchLower = searchQuery.toLowerCase();
    const matchSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchLower) ||
      book.id.toLowerCase().includes(searchLower) ||
      book.subtitle.toLowerCase().includes(searchLower) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchLower));
    
    return matchLevel && matchPlatform && matchSearch;
  });

  const handleMouseMove = (e: React.MouseEvent, book: Book) => {
    setTooltip({ book, x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <section className="py-24 px-6 min-h-screen bg-void-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-display text-4xl text-white mb-6">A Biblioteca</h2>
          
          {/* Campo de Pesquisa */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por nome, ID ou tags..."
                className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-flame-500/50 focus:bg-zinc-900/80 transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-zinc-500">
                Resultados para: <span className="text-flame-400">"{searchQuery}"</span> ({filteredBooks.length} livros encontrados)
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6 border-b border-white/10 pb-6">
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
              {['all', 'Iniciante', 'Intermediário', 'Avançado', 'Mestre'].map(level => (
                <button
                  key={level}
                  onMouseEnter={playHover}
                  onClick={() => { playClick(); setFilterLevel(level); }}
                  className={`text-sm uppercase tracking-widest font-semibold whitespace-nowrap ${filterLevel === level ? 'text-flame-500' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  {level === 'all' ? 'Todos Níveis' : level}
                </button>
              ))}
            </div>
            <div className="w-px bg-white/10 hidden md:block"></div>
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
              {['all', 'Steam', 'Discord', 'Server', 'Geral'].map(plat => (
                <button
                  key={plat}
                  onMouseEnter={playHover}
                  onClick={() => { playClick(); setFilterPlatform(plat); }}
                  className={`text-sm uppercase tracking-widest font-semibold whitespace-nowrap ${filterPlatform === plat ? 'text-flame-500' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  {plat === 'all' ? 'Todas Plataformas' : plat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onClick={() => onOpenBook(book)} 
              onMouseMove={(e) => handleMouseMove(e, book)}
              onMouseLeave={handleMouseLeave}
              onLike={toggleLike}
              isLiked={isLiked(book.id)}
              likeCount={likes[book.id] || 0}
            />
          ))}
        </div>

        {/* Mensagem para nível Mestre sem livros */}
        {filteredBooks.length === 0 && filterLevel === 'Mestre' && (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-flame-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-flame-500" />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Conteúdo Mestre em Desenvolvimento</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Ainda não há livros disponíveis para o nível Mestre. Estamos trabalhando duro para trazer conteúdo avançado 
                e especializado para os guardiões mais experientes.
              </p>
              <p className="text-zinc-500 text-sm mb-8">
                Em breve você encontrará livros sobre técnicas avançadas de moderação, gestão de comunidades em larga escala, 
                estratégias de liderança digital e muito mais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => { playClick(); setFilterLevel('Avançado'); }}
                  className="px-6 py-3 bg-flame-600 hover:bg-flame-500 text-white font-bold uppercase tracking-widest rounded transition-all duration-300 transform hover:scale-105"
                >
                  Explorar Nível Avançado
                </button>
                <button 
                  onClick={() => { playClick(); window.location.href = '#library'; }}
                  className="px-6 py-3 border border-zinc-600 text-zinc-400 hover:text-white hover:border-zinc-500 font-bold uppercase tracking-widest rounded transition-all duration-300"
                >
                  Explorar Biblioteca
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem geral para outros filtros sem resultados */}
        {filteredBooks.length === 0 && filterLevel !== 'Mestre' && (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-zinc-500" />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Nenhum Livro Encontrado</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Não encontramos livros que correspondam aos filtros selecionados. 
                Tente ajustar seus filtros ou explore nossa coleção completa.
              </p>
              <button 
                onClick={() => { playClick(); setFilterLevel('all'); setFilterPlatform('all'); setSearchQuery(''); }}
                className="px-6 py-3 bg-flame-600 hover:bg-flame-500 text-white font-bold uppercase tracking-widest rounded transition-all duration-300 transform hover:scale-105"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}
      </div>
      {tooltip && <LibraryTooltip book={tooltip.book} x={tooltip.x} y={tooltip.y} />}
    </section>
  );
};

const ReaderModal = ({ book, onClose }: { book: Book; onClose: () => void }) => {
  const [activeChapterId, setActiveChapterId] = useState(book.chapters[0].id);
  const activeChapter = book.chapters.find(c => c.id === activeChapterId) || book.chapters[0];
  const contentRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSound();

  const [isReadingMode, setIsReadingMode] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  // Reset scroll when changing chapters
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeChapterId]);

  const renderInteractiveComponent = (type: InteractiveComponentType, data?: any) => {
    switch (type) {
      case 'ConsoleSimulator': return <ConsoleSimulator />;
      case 'FlameBalance': return <FlameBalance />;
      case 'ServerLayers': return <ServerLayers />;
      case 'DialogueTree': return <DialogueTree data={data} />;
      case 'RegexLab': return <RegexLab />;
      case 'CrisisDecision': return <CrisisDecision />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-void-900 animate-in fade-in duration-300">
      {/* Sidebar Navigation - HIDE in Reading Mode */}
      {!isReadingMode && (
        <div className="w-80 border-r border-white/5 flex flex-col bg-zinc-950 hidden md:flex shrink-0">
          <div className="p-8 border-b border-white/5">
            <h3 className="font-display text-xl text-white font-bold leading-tight">{book.title}</h3>
            <p className="font-serif text-sm text-zinc-500 italic mt-2">{book.subtitle}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800">
            {book.chapters.map((chapter, idx) => (
              <button
                key={chapter.id}
                onMouseEnter={playHover}
                onClick={() => { playClick(); setActiveChapterId(chapter.id); }}
                className={`w-full text-left p-3 text-sm font-sans transition-all rounded-lg ${
                  activeChapterId === chapter.id 
                    ? 'bg-zinc-900 text-flame-500 border-l-2 border-flame-500' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                }`}
              >
                <span className="opacity-50 mr-2">{idx + 1}.</span> {chapter.title.replace(/^\d+\.\s/, '')}
              </button>
            ))}
          </div>
          <div className="p-6 border-t border-white/5">
            <button 
              onMouseEnter={playHover}
              onClick={() => { playClick(); onClose(); }}
              className="flex items-center text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
            >
              <X className="w-4 h-4 mr-2" /> Fechar Livro
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-void-900 relative">
        {/* Mobile Close Button - Hide in Reading Mode for immersion, but keep logic if needed or let Exit Button handle it */}
        {!isReadingMode && (
           <div className="md:hidden absolute top-4 right-4 z-50">
             <button 
              onClick={() => { playClick(); onClose(); }} 
              className="p-2 bg-zinc-800 rounded-full text-white"
             >
               <X className="w-5 h-5"/>
             </button>
           </div>
        )}
        
        {/* Floating Exit Reading Mode Button */}
        {isReadingMode && (
          <button
            onClick={() => { playClick(); setIsReadingMode(false); }}
            className="fixed top-6 right-6 z-50 p-3 bg-void-900/90 text-zinc-500 hover:text-flame-500 border border-zinc-800 rounded-full transition-all shadow-xl backdrop-blur-sm animate-in fade-in zoom-in duration-300"
            title="Sair do Modo Leitura"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Floating Navigation Arrows - Only in Reading Mode */}
        {isReadingMode && (
          <>
             <button
                disabled={book.chapters.findIndex(c => c.id === activeChapterId) === 0}
                onMouseEnter={playHover}
                onClick={() => {
                   playClick();
                   const idx = book.chapters.findIndex(c => c.id === activeChapterId);
                   if (idx > 0) setActiveChapterId(book.chapters[idx-1].id);
                }}
                className="fixed left-8 top-1/2 -translate-y-1/2 z-40 p-4 text-zinc-700 hover:text-flame-500 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hidden lg:block hover:scale-110"
                title="Capítulo Anterior"
             >
                <ChevronLeft className="w-12 h-12" />
             </button>

             <button
                disabled={book.chapters.findIndex(c => c.id === activeChapterId) === book.chapters.length - 1}
                onMouseEnter={playHover}
                onClick={() => {
                   playClick();
                   const idx = book.chapters.findIndex(c => c.id === activeChapterId);
                   if (idx < book.chapters.length - 1) setActiveChapterId(book.chapters[idx+1].id);
                }}
                className="fixed right-8 top-1/2 -translate-y-1/2 z-40 p-4 text-zinc-700 hover:text-flame-500 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hidden lg:block hover:scale-110"
                title="Próximo Capítulo"
             >
                <ChevronRight className="w-12 h-12" />
             </button>
          </>
        )}
        
        <div ref={contentRef} className="flex-1 overflow-y-auto p-6 md:p-16 lg:p-24 w-full">
           <div className={`max-w-4xl mx-auto transition-all duration-500 ${isReadingMode ? 'max-w-3xl' : ''}`}>
             
             {/* Header Controls - Hide in Reading Mode */}
             {!isReadingMode && (
               <div className="flex flex-col gap-4 mb-4">
                 
                 <div className="flex items-center justify-between">
                   <span className="text-flame-500 text-xs font-bold tracking-[0.2em] uppercase block">Capítulo {book.chapters.findIndex(c => c.id === activeChapterId) + 1}</span>
                   
                   <div className="flex items-center gap-2">
                      {/* Reading Mode Toggle */}
                      <button
                        onClick={() => { playClick(); setIsReadingMode(true); }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-flame-500 hover:border-flame-500 transition-all"
                        title="Modo Leitura (Foco)"
                      >
                         <BookOpen className="w-4 h-4" />
                      </button>

                       {/* Quick Jump Dropdown for easy navigation (essential for mobile) */}
                       <div className="relative group ml-2">
                          <select
                              value={activeChapterId}
                              onChange={(e) => {
                                  playClick();
                                  setActiveChapterId(e.target.value);
                              }}
                              className="appearance-none bg-zinc-900/80 border border-zinc-700 text-zinc-300 text-xs uppercase tracking-wider py-2 pl-3 pr-8 rounded cursor-pointer hover:border-flame-500 focus:outline-none focus:border-flame-500 transition-colors"
                          >
                              {book.chapters.map((chapter, idx) => (
                                <option key={chapter.id} value={chapter.id}>
                                  {idx + 1}. {chapter.title.replace(/^\d+\.\s/, '').substring(0, 30)}{chapter.title.length > 30 ? '...' : ''}
                                </option>
                              ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                            <ChevronRight className="h-3 w-3 rotate-90" />
                          </div>
                       </div>
                   </div>
                 </div>
               </div>
             )}

             <h1 className={`font-display text-3xl md:text-5xl text-white mb-12 leading-tight transition-all ${isReadingMode ? 'text-center mt-12' : ''}`}>{activeChapter.title.replace(/^\d+\.\s/, '')}</h1>
             
             <div 
               className={`prose prose-invert prose-lg md:prose-xl font-serif text-zinc-300 leading-loose prose-headings:font-display prose-headings:text-white prose-blockquote:border-flame-500 prose-blockquote:text-zinc-400 prose-a:text-flame-500 prose-strong:text-white prose-code:text-flame-500 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded prose-code:font-normal prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 transition-opacity duration-500 ${isReadingMode ? 'opacity-90' : ''}`}
               dangerouslySetInnerHTML={{ __html: activeChapter.content }}
             />

             {/* Render Interactive Component if present and not rewriting */}
             {activeChapter.interactiveComponent && (
               <div className="mt-8 animate-in slide-in-from-bottom-4 duration-700">
                 {renderInteractiveComponent(activeChapter.interactiveComponent, activeChapter.interactiveData)}
               </div>
             )}
             
             {/* Footer Navigation - Always visible now */}
             <div className="mt-24 pt-12 border-t border-white/5 flex justify-between">
                <button 
                  disabled={book.chapters.findIndex(c => c.id === activeChapterId) === 0}
                  onMouseEnter={playHover}
                  onClick={() => {
                      playClick();
                      const idx = book.chapters.findIndex(c => c.id === activeChapterId);
                      if (idx > 0) setActiveChapterId(book.chapters[idx-1].id);
                  }}
                  className="text-zinc-500 hover:text-white disabled:opacity-20 transition-colors uppercase tracking-widest text-sm font-bold"
                >
                  Anterior
                </button>
                <button 
                  disabled={book.chapters.findIndex(c => c.id === activeChapterId) === book.chapters.length - 1}
                  onMouseEnter={playHover}
                  onClick={() => {
                      playClick();
                      const idx = book.chapters.findIndex(c => c.id === activeChapterId);
                      if (idx < book.chapters.length - 1) setActiveChapterId(book.chapters[idx+1].id);
                  }}
                  className="text-flame-500 hover:text-white disabled:opacity-20 transition-colors uppercase tracking-widest text-sm font-bold"
                >
                  Próximo
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const AboutSection = () => (
  <section className="py-24 px-6 min-h-screen bg-void-900">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-5xl text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">Sobre Nós</h2>
        <p className="font-serif text-xl text-zinc-400 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Conheça a história e missão dos Guardiões da Chama
        </p>
      </div>

      <div className="space-y-12">
        {/* O que somos */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-8 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
          <h3 className="font-display text-2xl text-flame-500 mb-4">O Que Somos</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Guardiões da Chama é uma comunidade dedicada a ensinar pessoas a administrar e moderar comunidades de jogos online. 
            Nascemos da necessidade de criar espaços digitais mais seguros e acolhedores para todos os jogadores.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Acreditamos que todo jogador merece uma experiência positiva, livre de toxicidade e conflitos desnecessários. 
            Por isso, capacitamos guardiões com as ferramentas e conhecimentos necessários para proteger suas comunidades.
          </p>
        </div>

        {/* Nossa Missão */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
          <h3 className="font-display text-2xl text-flame-500 mb-4">Nossa Missão</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Nossa missão é transformar o ambiente dos jogos online, um guardião de cada vez. 
            Oferecemos conhecimento prático e acessível para que qualquer pessoa possa se tornar um moderador eficaz.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Ensinamos desde conceitos básicos de moderação até técnicas avançadas de gestão de conflitos, 
            sempre com foco em criar comunidades saudáveis e sustentáveis.
          </p>
        </div>

        {/* Como Funciona */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-8 animate-in fade-in slide-in-from-left-8 duration-1000 delay-400">
          <h3 className="font-display text-2xl text-flame-500 mb-4">Como Funciona</h3>
          <div className="space-y-4 text-zinc-300">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-flame-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <strong>Biblioteca Completa:</strong> Acesso a livros e guias sobre moderação, administração e gestão de comunidades.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-flame-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <strong>Conteúdo Prático:</strong> Simuladores e ferramentas interativas para treinar suas habilidades.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-flame-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <strong>Comunidade Ativa:</strong> Conecte-se com outros guardiões e compartilhe experiências.
              </div>
            </div>
          </div>
        </div>

        {/* Segurança e Confiança */}
        <div className="bg-gradient-to-r from-green-500/10 to-zinc-900/30 border border-green-500/20 rounded-xl p-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <h3 className="font-display text-2xl text-green-500 mb-4">🔒 Segurança e Confiança</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">
            <strong className="text-green-400">Nossa prioridade é sua segurança.</strong>
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            O Guardiões da Chama utiliza certificado SSL/TLS válido, garantindo que todas as suas informações 
            estão criptografadas e protegidas. Nosso site é verificado e seguro para navegação.
          </p>
          <div className="bg-zinc-900/50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-green-400 font-bold">Conexão Segura (HTTPS)</span>
            </div>
            <p className="text-sm text-zinc-400">
              Certificado SSL/TLS válido • Criptografia de ponta a ponta • Proteção de dados
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold rounded-full">
              🔐 Site Seguro
            </span>
            <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold rounded-full">
              🛡️ Protegido
            </span>
            <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold rounded-full">
              ✅ Verificado
            </span>
          </div>
        </div>

        {/* Totalmente Gratuito */}
        <div className="bg-gradient-to-r from-flame-500/10 to-zinc-900/30 border border-flame-500/20 rounded-xl p-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <h3 className="font-display text-2xl text-flame-500 mb-4">Totalmente Gratuito</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">
            <strong className="text-flame-400">Todo o nosso conteúdo é 100% gratuito.</strong>
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Acreditamos que o conhecimento deve ser acessível a todos. Por isso, todo o site - livros, guias, 
            simuladores e ferramentas - é completamente gratuito e aberto ao público. Sem taxas, sem assinaturas, 
            sem barreiras. Apenas conhecimento compartilhado para construir comunidades melhores.
          </p>
          <div className="mt-6 text-center">
            <span className="inline-block px-6 py-3 bg-flame-500 text-white font-bold rounded-lg">
              📚 Acesso Livre e Gratuito
            </span>
          </div>
        </div>

        {/* Nossa História */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-600">
          <h3 className="font-display text-2xl text-flame-500 mb-4">Nossa História</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Guardiões da Chama surgiu da observação de um problema crescente nos jogos online: a falta de moderação eficaz 
            e o impacto negativo que isso causa na experiência dos jogadores.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Começamos como um pequeno grupo de moderadores experientes compartilhando conhecimentos em fóruns e servidores Discord. 
            Com o tempo, percebemos a necessidade de organizar esse conhecimento em um formato mais acessível e completo.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Hoje, somos uma comunidade crescente de guardiões dedicados a fazer dos jogos online um lugar melhor para todos. 
            Cada livro, cada guia, cada ferramenta foi criada com base em experiências reais e nas melhores práticas de moderação.
          </p>
        </div>

        {/* Política de Privacidade */}
        <div className="bg-gradient-to-r from-blue-500/10 to-zinc-900/30 border border-blue-500/20 rounded-xl p-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <h3 className="font-display text-2xl text-blue-500 mb-4">🔐 Política de Privacidade</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">
            <strong className="text-blue-400">Sua privacidade é nossa prioridade absoluta.</strong>
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            No Guardiões da Chama, não coletamos, armazenamos ou compartilhamos nenhum tipo de dado pessoal dos nossos usuários. 
            Nossa plataforma foi projetada desde o início para ser 100% anônima e respeitar sua privacidade.
          </p>
          <div className="space-y-3 text-zinc-300">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong>Zero Coleta de Dados:</strong> Não pedimos nome, email, senha ou qualquer informação pessoal.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong>Sem Rastreamento:</strong> Não utilizamos cookies, pixels ou qualquer tecnologia de rastreamento.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong>Acesso Livre:</strong> Todo o conteúdo está disponível sem necessidade de cadastro ou login.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <strong>Segurança HTTPS:</strong> Todo o tráfego é criptografado com certificado SSL/TLS válido.
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-700">
            <p className="text-sm text-zinc-400 text-center">
              <strong>Nossa Promessa:</strong> Você pode navegar, ler e aprender conosco com total tranquilidade, 
              sabendo que sua privacidade está protegida por princípios fundamentais, não apenas por conformidade legal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full">
              🔒 100% Privado
            </span>
            <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full">
              🚫 Sem Cookies
            </span>
            <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full">
              🛡️ Seguro
            </span>
          </div>
        </div>

        {/* Estatísticas do Site */}
        <div className="bg-gradient-to-r from-purple-500/10 to-zinc-900/30 border border-purple-500/20 rounded-xl p-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
          <h3 className="font-display text-2xl text-purple-500 mb-4">📊 Estatísticas da Comunidade</h3>
          <p className="text-zinc-300 leading-relaxed mb-6">
            <strong className="text-purple-400">Nossa comunidade cresce a cada dia.</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                <span className="animate-pulse">👥</span>
              </div>
              <div className="text-2xl font-display text-white font-bold mb-1">
                <LiveCounter />
              </div>
              <p className="text-zinc-400 text-sm">Visitantes Únicos</p>
              <p className="text-zinc-500 text-xs mt-2">Contador ao vivo</p>
            </div>
            <div className="text-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-700">
              <div className="text-3xl font-bold text-green-400 mb-2">
                <span className="animate-pulse">🌍️</span>
              </div>
              <div className="text-2xl font-display text-white font-bold mb-1">
                <ActiveUsersCounter />
              </div>
              <p className="text-zinc-400 text-sm">Usuários Ativos</p>
              <p className="text-zinc-500 text-xs mt-2">Navegando agora</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-zinc-500 text-sm italic">
              Juntos estamos construindo a maior comunidade de Guardiões digitais do mundo
            </p>
          </div>
        </div>

        {/* Junte-se a Nós */}
        <div className="text-center py-12 animate-in fade-in duration-1000 delay-700">
          <h3 className="font-display text-3xl text-white mb-6">Junte-se à Comunidade</h3>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Seja você um jogador que quer fazer a diferença, um moderador buscando aprimorar suas habilidades, 
            ou um administrador de servidor em busca de melhores práticas - você tem um lugar aqui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 bg-flame-600 hover:bg-flame-500 text-white font-bold uppercase tracking-widest rounded transition-all duration-300 transform hover:scale-105"
            >
              Começar Agora
            </button>
            <button 
              onClick={() => window.location.href = '#library'}
              className="px-8 py-3 border border-flame-500 text-flame-500 hover:bg-flame-500 hover:text-white font-bold uppercase tracking-widest rounded transition-all duration-300"
            >
              Explorar Biblioteca
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const App = () => {
  const [view, setView] = useState<'home' | 'library' | 'philosophy' | 'about' | 'credits'>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleNavigate = (page: 'home' | 'library' | 'philosophy' | 'about' | 'credits') => {
    setView(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-orange-500/30">
      <Header onNavigate={handleNavigate} />
      
      <main>
        {view === 'home' && (
          <Hero onEnter={() => handleNavigate('library')} />
        )}
        
        {view === 'philosophy' && (
          <PhilosophySection />
        )}

        {view === 'library' && (
          <Library onOpenBook={setSelectedBook} />
        )}

        {view === 'about' && (
          <AboutSection />
        )}

        {view === 'credits' && (
          <CreditsSection />
        )}
      </main>

      {selectedBook && (
        <ReaderModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default App;
