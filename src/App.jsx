import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Sparkles, Send, Zap, Cpu, Globe, Shield, Plus, ArrowRight } from 'lucide-react'; 
import './App.css';

// --- ANIMATION VARIANTS (Jadwal Animasi) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Muncul satu per satu dengan jeda 0.1 detik
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// --- COMPONENTS ---

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <motion.div
      className="mouse-glow"
      animate={{ x: mousePos.x - 250, y: mousePos.y - 250 }}
      transition={{ type: "spring", damping: 30, stiffness: 150, mass: 0.5 }}
    />
  );
};

const FloatingParticles = () => {
  const particlesData = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: Math.random() * 2 + 1 + 'px',
      duration: Math.random() * 5 + 7,
      delay: Math.random() * 15,
      color: Math.random() > 0.5 ? '#7c5cff' : '#ffffff',
    }));
  }, []);

  return (
    <div className="particles-container">
      {particlesData.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }}
        />
      ))}
    </div>
  );
};

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if(!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const TemplateStream = () => {
  const templates = [
    { id: 1, name: "Crypto Dashboard", img: "crypto.jpg" },
    { id: 2, name: "E-Commerce App", img: "comerce.jpg" },
    { id: 3, name: "Social Connect", img: "futuristic.jpg" },
    { id: 4, name: "Neural Analytics", img: "neural.jpg" },
    { id: 5, name: "Banking Pro", img: "bank.jpg" },
  ];

  return (
    <section className="templates-section">
      <div className="container">
        <motion.div 
          className="templates-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <motion.h2 variants={itemVariants}>Templates</motion.h2>
            <motion.p variants={itemVariants}>Thousands of designs you can use right now!</motion.p>
          </div>
          <motion.a variants={itemVariants} href="#templates" className="btn-text-link">
            Start using template for free <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
      <div className="slider-container">
        <div className="slider-track">
          {[...templates, ...templates].map((t, idx) => (
            <div className="slide-card" key={idx}>
              <div className="slide-content" style={{ backgroundImage: `url(${t.img})` }}>
                <div className="slide-overlay">
                  <span className="template-name">{t.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RobotSection = () => {
  const [lookPos, setLookPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const robotRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (robotRef.current) {
        const { left, top, width, height } = robotRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const moveX = (e.clientX - centerX) / 30;
        const moveY = (e.clientY - centerY) / 30;
        setLookPos({ 
          x: Math.max(Math.min(moveX, 15), -15), 
          y: Math.max(Math.min(moveY, 12), -12) 
        });
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="robot-section-centered">
      <div className="container">
        <motion.div 
          className="robot-visual-centered" 
          ref={robotRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="robot-floating-wrapper"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: -40 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  className="speech-bubble"
                >
                  This web created by <br /><strong>ranzzdesign</strong>
                  <div className="bubble-arrow"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              className="robot-head-futuristic"
              animate={{ 
                rotateY: lookPos.x, 
                rotateX: -lookPos.y,
                scale: isHovered ? 1.05 : 1 
              }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
            >
              <div className="side-fin left-fin" />
              <div className="side-fin right-fin" />
              <div className="face-glass">
                <div className="eyes-row">
                  <div className="eye-container">
                    <motion.div 
                      className="pupil-neon" 
                      animate={{ x: lookPos.x * 0.8, y: lookPos.y * 0.8 }} 
                    />
                  </div>
                  <div className="eye-container">
                    <motion.div 
                      className="pupil-neon" 
                      animate={{ x: lookPos.x * 0.8, y: lookPos.y * 0.8 }} 
                    />
                  </div>
                </div>

                {/* LOGIKA MULUT: Hanya gerak saat isHovered (Mouse nyentuh) */}
                <motion.div 
                  className="robot-mouth-ai" 
                  animate={isHovered ? {
                    height: [4, 12, 4, 15, 4],
                    width: [50, 60, 45, 65, 50],
                    backgroundColor: ["#7c5cff", "#00f2fe", "#7c5cff"]
                  } : { height: 4, width: 50, backgroundColor: "#7c5cff" }}
                  transition={isHovered ? { duration: 0.4, repeat: Infinity } : { duration: 0.3 }}
                />
              </div>
              <div className="top-sensor" />
            </motion.div>
            <div className="robot-shadow" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="robot-content-bottom"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span variants={itemVariants} className="text-gradient">Neural Node V.2</motion.span>
          <motion.h2 variants={itemVariants}>The Intelligence Inside Laydown</motion.h2>
          <motion.p variants={itemVariants}>Automating your workflow with precision and speed.</motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div variants={itemVariants} className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }}><Plus size={20} color="#7c5cff" /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <div className="faq-content">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ScrollIndicator = () => (
  <div className="scroll-indicator-wrapper">
    <div className="scroll-line"></div>
    <span>SCROLL</span>
  </div>
);

const EasterEgg = () => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} className="easter-egg">
    <p>Built with stardust & React by <span>ranzzdesign</span></p>
  </motion.div>
);

// --- MAIN APP ---
function App() {
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const phrases = ["Build a futuristic UI...", "Analyze neural patterns...", "Code AI agents..."];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];
      setDisplayText(isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1));
      if (!isDeleting && displayText === fullText) setTimeout(() => setIsDeleting(true), 1500);
      else if (isDeleting && displayText === "") { setIsDeleting(false); setLoopNum(loopNum + 1); }
    };
    const timer = setTimeout(handleTyping, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum]);

  return (
    <div className="app-wrapper">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <MouseGlow />
      <FloatingParticles />

      <header className="navbar">
        <div className="navbar-inner">
          <div className="logo">
            <motion.span 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="logo-icon"
            >
              ✦
            </motion.span> 
            <span className="logo-text">Laydown</span>
          </div>
          <nav className="nav-menu">
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#pricing" className="nav-premium"><Sparkles size={14} style={{ marginRight: '5px' }} /> Premium</a>
            <a href="#docs">Docs</a>
            <a href="#changelog">Changelog</a>
          </nav>
          <div className="nav-action">
            <MagneticButton className="btn-launch">Launch App</MagneticButton>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION - Staggered */}
        <div className="section-transition hero-wrapper">
          <section className="hero">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="container"
            >
              <motion.div variants={itemVariants} className="badge-promo"><Sparkles size={14} /> V2.0 Orbital Edition</motion.div>
              <motion.h1 variants={itemVariants}>Explore the Future of <br /><span>AI Intelligence</span></motion.h1>
              <motion.p variants={itemVariants} className="hero-desc">Take your ideas to the next dimension with an intelligent agent based on neural networks.</motion.p>
              
              <motion.div variants={itemVariants} className="hero-input-group">
                <div className="hero-input">
                  <div className="typewriter-container">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    {inputValue === "" && <span className="fake-placeholder">{displayText}<span className="cursor">|</span></span>}
                  </div>
                  <button className="btn-send"><Send size={18} /></button>
                </div>
                <div className="hero-quick-tags">
                  <span>Trending:</span>
                  <button>#WebDesign</button>
                  <button>#NeuralArt</button>
                  <button>#VectorGen</button>
                </div>
              </motion.div>
            </motion.div>
            <ScrollIndicator />
          </section>
        </div>

        <TemplateStream />

        {/* FEATURES SECTION - Staggered */}
        <section className="features" id="features">
          <div className="container">
            <motion.div 
              className="section-header"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span variants={itemVariants} className="text-gradient">Capabilities</motion.span>
              <motion.h2 variants={itemVariants}>Powering Creativity</motion.h2>
            </motion.div>

            <motion.div 
              className="bento-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { title: "Instant Generation", desc: "Change text to UI instantly.", icon: <Zap />, span: "span-2", color: "124, 92, 255" },
                { title: "Neural Core", desc: "Advanced LLM for design.", icon: <Cpu />, color: "6, 182, 212" },
                { title: "Global Access", desc: "Real-time sync across devices.", icon: <Globe />, color: "232, 121, 249" },
                { title: "Secure Nodes", desc: "Military grade encryption.", icon: <Shield />, span: "span-2", color: "59, 130, 246" }
              ].map((card, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className={`bento-card ${card.span || ""}`} 
                  style={{ '--glow-color': card.color }}
                >
                  <div className="card-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <div className="bento-glow"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <RobotSection />

        {/* FAQ SECTION - Staggered */}
        <section className="faq" id="faq">
          <div className="container">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="section-header"
            >
              <motion.h2 variants={itemVariants}>FAQ</motion.h2>
            </motion.div>
            <motion.div 
              className="faq-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FaqItem question="What is Laydown AI?" answer="Laydown AI is an ecosystem designed to bridge human creativity and machine learning." />
              <FaqItem question="How secure is my data?" answer="We use military-grade AES-256 encryption for all assets." />
              <FaqItem question="Can I export to code?" answer="Yes, supports direct export to React and Tailwind CSS." />
            </motion.div>
          </div>
        </section>
        
        {/* FINAL CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="final-cta"
        >
          <div className="container">
            <div className="cta-card">
              <div className="cta-mesh-bg"></div>
              <div className="cta-content">
                <h2>Ready to build the future?</h2>
                <p>Join 10,000+ developers building with Laydown AI.</p>
                <div className="cta-action-wrapper">
                  <MagneticButton className="btn-launch-large">
                    <span>Get Started for Free</span>
                    <ArrowRight size={20} />
                  </MagneticButton>
                </div>
              </div>
              <div className="cta-glow-emitter"></div>
            </div>
          </div>
        </motion.section>

        <EasterEgg />
      </main>

      <footer className="footer-pro">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo"><span className="logo-icon">✦</span> Laydown</div>
            <p>Next-gen AI interface for modern creators.</p>
          </div>
          <div className="footer-links-container">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#templates">Templates</a>
            </div>
            <div className="footer-col">
              <h4>Social</h4>
              <a href="#">Twitter</a>
              <a href="#">Discord</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2026 Laydown Space Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;