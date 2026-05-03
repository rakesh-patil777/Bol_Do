import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, TorusKnot } from '@react-three/drei';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { Mic, Camera, FileText, ChevronRight, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StringTune, StringSplit } from '@fiddle-digital/string-tune';
import '../App.css';

// 3D Background Component
function Background3D() {
  const knotRef = useRef<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (knotRef.current) {
      knotRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      knotRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      
      // Subtle mouse follow
      knotRef.current.position.x += (mousePosition.x * 0.5 - knotRef.current.position.x) * 0.05;
      knotRef.current.position.y += (mousePosition.y * 0.5 - knotRef.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFFCEF" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#659BB9" />
      <Environment preset="city" />
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <TorusKnot ref={knotRef} args={[1.5, 0.4, 256, 64]} position={[0, 0, -5]} scale={1.2}>
          <meshPhysicalMaterial
            color="#659BB9"
            metalness={0.8}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.5}
          />
        </TorusKnot>
      </Float>

      {/* Ambient floating spheres */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -6]}>
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial color="#8BAFC4" distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>
      
      <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5} position={[4, -2, -4]}>
        <Sphere args={[0.3, 32, 32]}>
          <MeshDistortMaterial color="#3a6881" distort={0.4} speed={3} roughness={0.1} metalness={1} />
        </Sphere>
      </Float>
    </>
  );
}

function LandingPage() {

  const stringTuneInitRef = useRef(false);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      if (!stringTuneInitRef.current) {
        stringTuneInitRef.current = true;
        try {
          const stringTune = StringTune.getInstance();
          (window as any).StringTuneContext = stringTune;
          stringTune.use(StringSplit);
          stringTune.start(0);

          const wrapper = document.querySelector('.kinetic-text-wrapper') as HTMLElement;
          if (wrapper) {
            wrapper.style.setProperty('--progress', '0');
            let start = performance.now();
            const duration = 1500;
            
            const animateProgress = (time: number) => {
              const elapsed = time - start;
              const p = Math.min(elapsed / duration, 1) * 0.5; // animate to 0.5 so it reveals fully
              wrapper.style.setProperty('--progress', p.toString());
              if (p < 0.5) {
                requestAnimationFrame(animateProgress);
              }
            };
            requestAnimationFrame(animateProgress);
          }
        } catch (e) {
          console.error('Error initializing string-tune', e);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Background3D />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo hover-target">
            <Volume2 size={28} color="#659BB9" />
            BolDo
          </a>
          <Link to="/app" className="cta-button hover-target" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>
            Try Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content glass-panel"
            style={{ padding: '4rem 2rem', margin: '0 auto', maxWidth: '900px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="kinetic-text-wrapper" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="kinetic-row">
                <div>
                  {/* @ts-ignore */}
                  <span string="split" string-split="char" style={{ fontSize: 'var(--large, 4rem)' }}>Giving a Voice</span>
                </div>
              </div>
              <div className="kinetic-row" style={{ marginTop: '0.2em' }}>
                <div>
                  {/* @ts-ignore */}
                  <span string="split" string-split="char" style={{ fontSize: 'var(--large, 4rem)' }}>to the Unread</span>
                </div>
              </div>
            </div>
            <p className="hero-subtitle">
              BolDo uses advanced AI to read medicine strips, government forms, and signboards aloud. Designed specifically for non-readers in their local language.
            </p>
            <Link to="/app" className="cta-button hover-target">
              See How It Works <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Built for <span className="text-gradient">Simplicity</span></h2>
            <p className="section-subtitle">No menus. No typing. Just tap and listen.</p>
          </motion.div>

          <div className="features-grid">
            <motion.div 
              className="feature-card glass-panel hover-target"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            >
              <div className="feature-icon-wrapper">
                <Camera size={32} />
              </div>
              <h3 className="feature-title">Snap & Listen</h3>
              <p className="feature-description">
                Upload a photo of any text-bearing object like a medicine strip or signboard, and BolDo explains it in simple spoken language.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card glass-panel hover-target"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <div className="feature-icon-wrapper">
                <FileText size={32} />
              </div>
              <h3 className="feature-title">Voice Forms</h3>
              <p className="feature-description">
                Struggling with complex government forms? BolDo asks you simple questions aloud and auto-fills the form for you.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card glass-panel hover-target"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            >
              <div className="feature-icon-wrapper">
                <Mic size={32} />
              </div>
              <h3 className="feature-title">Local Languages</h3>
              <p className="feature-description">
                Speaks your language natively. Automatically detects the text and responds in Hindi, Tamil, Telugu, or Kannada.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section" id="demo">
        <div className="container demo-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="section-title">Experience <span className="text-gradient">BolDo</span></h2>
            <p className="section-subtitle">Tap the mic to interact with the demo</p>
          </motion.div>

          <motion.div 
            className="phone-frame"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ width: '320px', height: '600px', margin: '0 auto' }}
          >
            <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '40px', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', backdropFilter: 'blur(10px)' }}>
                Hindi 🇮🇳
              </div>
              
              <Link to="/app" className="mic-button hover-target">
                <Mic size={48} color="white" />
              </Link>
              
              <div style={{ position: 'absolute', bottom: '40px', display: 'flex', width: '100%', justifyContent: 'space-around', padding: '0 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.7 }}>
                  <Camera size={24} />
                  <span style={{ fontSize: '12px' }}>Photo</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.7 }}>
                  <FileText size={24} />
                  <span style={{ fontSize: '12px' }}>Form</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <Volume2 size={24} color="#659BB9" />
            BolDo
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Empowering the unread through voice.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
