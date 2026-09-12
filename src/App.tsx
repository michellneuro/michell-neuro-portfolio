import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories, Category, projects } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | Category>('home');
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'link' | 'media'>('default');
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  // Detect if the device has a precision mouse/pointer (touch compatibility)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };

    mediaQuery.addEventListener('change', handlePointerChange);
    return () => mediaQuery.removeEventListener('change', handlePointerChange);
  }, []);

  // Performance-optimized cursor tracking and state delegation
  useEffect(() => {
    if (!isPointerFine) return;

    // Strictly update coordinates on mousemove (high performance)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsCursorVisible(true);
    };

    // Event delegation: update cursorVariant only when entering/leaving elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.closest('#eric-crete-section') || 
        target.closest('#yakushima-section') || 
        target.closest('#alfa-leopard-section') || 
        target.closest('#commercial-reel-section') ||
        target.closest('#fashion-mika-section') ||
        target.closest('#fashion-rima-section')
      ) {
        setCursorVariant('default');
        return;
      }

      const isMedia = target.tagName === 'IMG' || target.tagName === 'VIDEO' || Boolean(target.closest('.media-container'));
      const isLink = target.tagName === 'A' || target.tagName === 'BUTTON' || Boolean(target.closest('a')) || Boolean(target.closest('button')) || target.getAttribute('role') === 'button';

      if (isMedia) {
        setCursorVariant('media');
      } else if (isLink) {
        setCursorVariant('link');
      } else {
        setCursorVariant('default');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsCursorVisible(false);
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
      setCursorVariant('default');
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isPointerFine]);
  
  return (
    <div className={`min-h-screen flex flex-col bg-[#F2F3F5] text-[#111111] selection:bg-[#111111] selection:text-[#F2F3F5] ${isPointerFine ? 'has-custom-cursor' : ''}`}>
      {/* Custom Cursor: Rendered ONLY if the device supports pointer: fine */}
      {isPointerFine && (
        <div 
          className={`fixed top-0 left-0 pointer-events-none z-[100] transition-transform duration-150 ease-out ${isCursorVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translate3d(${mousePos.x - 12}px, ${mousePos.y - 12}px, 0)`,
          }}
        >
          <div 
            className={`w-6 h-6 rounded-full border border-[#111111] bg-transparent flex items-center justify-center transition-all duration-150 ease-out origin-center
              ${cursorVariant === 'default' ? 'opacity-100 scale-100' : ''}
              ${cursorVariant === 'link' ? 'opacity-40 scale-75' : ''}
              ${cursorVariant === 'media' ? 'opacity-100 scale-[2]' : ''}
            `}
          >
            {cursorVariant === 'media' && (
              <span className="text-[5px] font-inter uppercase tracking-widest text-[#111111] font-medium leading-none select-none pl-[1px]">
                VIEW
              </span>
            )}
          </div>
        </div>
      )}
      {/* HEADER */}
      <header className="w-full flex flex-col md:flex-row gap-4 justify-between items-center p-6 md:p-8 shrink-0">
        <div className="flex flex-col text-center md:text-left cursor-pointer" onClick={() => setCurrentView('home')}>
          <h1 className="text-lg md:text-xl font-syne font-medium tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">Michell Neuro</h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[10px] md:text-xs font-inter tracking-[0.2em] uppercase text-gray-500">Creative Director</span>
            <span className="text-[10px] md:text-xs font-inter tracking-[0.2em] uppercase text-gray-500">Visual Creator</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col w-full h-full overflow-y-auto"
            >
              <div className="flex flex-col w-full max-w-7xl mx-auto">
                {/* Main Hero Viewport */}
                <div className="w-full flex flex-col justify-between min-h-[calc(100vh-100px)] p-6 md:p-12">
                  <div className="flex-1 flex items-center justify-center">
                    <CinematicHero />
                  </div>
                  
                  {/* Category Navigation (Bottom of Hero) */}
                  <nav className="w-full flex flex-wrap justify-center gap-6 md:gap-12 mt-12 pb-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCurrentView(cat)}
                        className={`text-sm md:text-base font-syne tracking-widest uppercase transition-all duration-300 cursor-pointer outline-none hover:opacity-80 ${
                          currentView === cat 
                            ? 'opacity-100 font-medium scale-105' 
                            : 'opacity-40'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Final Section (Scroll down to see) */}
                <div className="w-full px-6 md:px-12 pb-24">
                  <div className="w-full h-px bg-[#E5E0D8] mb-24" />
                  <InfoSection />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col w-full h-full p-6 md:px-12 md:py-6 overflow-y-auto"
            >
              {currentView !== 'COMMERCIAL' && currentView !== 'FASHION' && currentView !== 'CINEMA' && (
                <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto w-full">
                  <h2 className="text-xl md:text-2xl font-syne font-medium tracking-widest uppercase">{currentView}</h2>
                  <button 
                    onClick={() => setCurrentView('home')}
                    className="text-xs font-inter tracking-[0.15em] uppercase hover:opacity-50 transition-opacity border-b border-[#111111] pb-0.5 cursor-pointer"
                  >
                    &larr; Back
                  </button>
                </div>
              )}
              <div className="max-w-7xl mx-auto w-full">
                {currentView === 'FASHION' ? (
                  <FashionView onBack={() => setCurrentView('home')} />
                ) : currentView === 'COMMERCIAL' ? (
                  <CommercialView onBack={() => setCurrentView('home')} />
                ) : currentView === 'CINEMA' ? (
                  <CinemaView onBack={() => setCurrentView('home')} />
                ) : currentView === 'CHARACTER' ? (
                  <CharacterView />
                ) : (
                  <CategoryGrid category={currentView} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function CinematicHero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(e => console.error("Playback failed", e));
    }
  };

  return (
    <div className="relative w-full max-w-6xl aspect-video bg-[#E5E0D8] overflow-hidden group media-container">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789053193/dinamic_video_with_music.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay Sound Toggle Button */}
      <div className="absolute bottom-6 right-6 z-10">
        <button 
          onClick={toggleSound}
          aria-label={isMuted ? "Enable sound" : "Mute audio"}
          className="inline-flex items-center gap-2 text-[10px] md:text-xs font-syne tracking-[0.2em] uppercase text-white/90 hover:text-white transition-all duration-300 bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 cursor-pointer outline-none select-none shadow-sm active:scale-95"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/70" />
              <span>Sound On</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Mute</span>
            </>
          )}
        </button>
      </div>
      
      {/* Decorative framing line */}
      <div className="absolute inset-4 border border-white/10 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}

function CategoryGrid({ category }: { category: Category }) {
  const catProjects = projects[category];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-12">
      {catProjects.map((project, i) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="group cursor-pointer flex flex-col gap-4"
        >
          <div className="relative aspect-[4/5] bg-[#E5E0D8] overflow-hidden media-container">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
          <div className="flex justify-between items-start mt-2">
            <h3 className="text-xs md:text-sm font-syne tracking-[0.15em] uppercase font-medium">{project.title}</h3>
            {project.client && (
              <span className="text-[10px] md:text-xs font-inter tracking-[0.1em] uppercase text-gray-500">{project.client}</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FashionView({ onBack }: { onBack: () => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  // Mouse drag scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const rimaLooks = [
    {
      id: 'look-1',
      number: '01',
      image: 'https://res.cloudinary.com/gzwpz0gx/image/upload/v1789057640/1.jpg',
      caption: 'P.A.R.O.S.H. — Midnight Lace Tiered Midi'
    },
    {
      id: 'look-2',
      number: '02',
      image: 'https://res.cloudinary.com/gzwpz0gx/image/upload/v1789057647/2.jpg',
      caption: 'SASHA KIM — Feather-Embellished Dress'
    },
    {
      id: 'look-3',
      number: '03',
      image: 'https://res.cloudinary.com/gzwpz0gx/image/upload/v1789057655/3.jpg',
      caption: 'VIKA GAZINSKAYA — Gold Jacquard Maxi Gown'
    },
    {
      id: 'look-4',
      number: '04',
      image: 'https://res.cloudinary.com/gzwpz0gx/image/upload/v1789057644/4.jpg',
      caption: 'DANAMÉ — Plum Draped One-Shoulder Dress'
    },
    {
      id: 'look-5',
      number: '05',
      image: 'https://res.cloudinary.com/gzwpz0gx/image/upload/v1789052897/RIMA_5.jpg',
      caption: 'MVST — Emerald Satin Corset Dress'
    },
    {
      id: 'look-6',
      number: '06',
      image: 'https://res.cloudinary.com/gzwpz0gx/image/upload/v1789057643/6.jpg',
      caption: 'JIL SANDER — Red Taffeta High-Low Gown'
    }
  ];

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const firstCard = scrollContainerRef.current.querySelector<HTMLElement>('.rima-carousel-card');
    const cardWidth = firstCard ? firstCard.offsetWidth : 280;
    const gap = window.innerWidth < 640 ? 16 : 24;
    const index = Math.min(
      rimaLooks.length - 1,
      Math.max(0, Math.round(scrollLeft / (cardWidth + gap)))
    );
    setActiveLookIndex(index);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstCard = container.querySelector<HTMLElement>('.rima-carousel-card');
    const cardWidth = firstCard ? firstCard.offsetWidth : 280;
    const gap = window.innerWidth < 640 ? 16 : 24;
    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const onMouseLeaveOrUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  return (
    <div className="flex flex-col gap-20 sm:gap-24 pb-16 w-full">
      {/* ========================================================================= */}
      {/* SECTION 1: RIMA — DIGITAL FITTING ROOM / TSUM MOSCOW VIP CAPSULE */}
      {/* ========================================================================= */}
      <section id="fashion-rima-section" className="flex flex-col gap-8 sm:gap-10">
        {/* 1. HEADER AREA */}
        <div className="flex justify-between items-start gap-6 w-full">
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <span className="text-[11px] font-syne tracking-[0.25em] uppercase text-gray-400 font-semibold">
              DIGITAL FITTING ROOM / TSUM MOSCOW VIP CAPSULE
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-medium tracking-tight uppercase text-[#111111] leading-none">
              RIMA
            </h3>
            <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/80 mt-1 max-w-xl">
              AI Virtual Styling Case: Remote fitting visualization and digital twin creation for exclusive evening wear.
            </p>
          </div>

          <button 
            onClick={onBack}
            className="text-xs font-inter tracking-[0.15em] uppercase hover:opacity-50 transition-opacity border-b border-[#111111] pb-0.5 cursor-pointer shrink-0 whitespace-nowrap pt-1"
          >
            &larr; Back
          </button>
        </div>

        {/* Subtle 1px horizontal divider line below header */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 2. SPEC SHEET & CAPSULE MANIFESTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column: CLIENT PROFILE */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
              CLIENT PROFILE
            </span>
            <div className="flex flex-col divide-y divide-[#E5E0DB]">
              <div className="py-2.5 first:pt-0 flex items-baseline justify-between gap-4">
                <span className="text-xs font-syne font-semibold uppercase tracking-wider text-gray-500">Height</span>
                <span className="text-xs sm:text-sm font-inter text-[#111111] font-medium text-right">175–176 cm</span>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-4">
                <span className="text-xs font-syne font-semibold uppercase tracking-wider text-gray-500">Build</span>
                <span className="text-xs sm:text-sm font-inter text-[#111111] font-medium text-right">Slim, Athletic</span>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-4">
                <span className="text-xs font-syne font-semibold uppercase tracking-wider text-gray-500">Type</span>
                <span className="text-xs sm:text-sm font-inter text-[#111111] font-medium text-right">European look</span>
              </div>
              <div className="py-2.5 last:pb-0 flex items-baseline justify-between gap-4">
                <span className="text-xs font-syne font-semibold uppercase tracking-wider text-gray-500">Vibe</span>
                <span className="text-xs sm:text-sm font-inter text-[#111111] font-medium text-right">Elegant, calm, balanced</span>
              </div>
            </div>
          </div>

          {/* Right Column: THE CAPSULE MANIFESTO */}
          <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-l border-[#E5E0D8] pt-6 md:pt-0 md:pl-8">
            <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
              THE CAPSULE MANIFESTO
            </span>
            <div className="flex flex-col gap-3">
              <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/85">
                Remote fitting visualization for 6 evening looks with accurate fabric textures and consistent catalog studio lighting.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 bg-[#F4F1EC] text-[10px] font-inter uppercase tracking-widest text-[#111111] rounded">
                  Digital Twin
                </span>
                <span className="px-2.5 py-1 bg-[#F4F1EC] text-[10px] font-inter uppercase tracking-widest text-[#111111] rounded">
                  Fujifilm GFX100S Sim
                </span>
                <span className="px-2.5 py-1 bg-[#F4F1EC] text-[10px] font-inter uppercase tracking-widest text-[#111111] rounded">
                  TSUM VIP Capsule
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle divider before gallery */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 3. THE 6-CARD INTERACTIVE HORIZONTAL SLIDER / CAROUSEL */}
        <div className="flex flex-col gap-5">
          {/* Gallery Subtitle & Carousel Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
                TSUM VIP CAPSULE LOOKS
              </span>
              <span className="text-xs font-inter text-gray-500 font-medium">
                ({String(activeLookIndex + 1).padStart(2, '0')} / 06)
              </span>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous look"
                className={`w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'opacity-100 hover:bg-[#111111] hover:text-white cursor-pointer active:scale-95'
                    : 'opacity-25 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next look"
                className={`w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'opacity-100 hover:bg-[#111111] hover:text-white cursor-pointer active:scale-95'
                    : 'opacity-25 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Smooth Horizontal Scroll Row */}
          <div
            ref={scrollContainerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeaveOrUp}
            onMouseUp={onMouseLeaveOrUp}
            onMouseMove={onMouseMove}
            className="overflow-x-auto flex space-x-4 sm:space-x-6 px-4 sm:px-1 pb-4 pt-1 snap-x snap-mandatory scroll-smooth scroll-px-4 sm:scroll-px-1 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {rimaLooks.map((look) => (
              <div
                key={look.id}
                className="rima-carousel-card snap-start w-[78vw] max-w-[280px] sm:w-[290px] md:w-[320px] shrink-0 flex flex-col gap-2.5 sm:gap-3 group"
              >
                <div className="relative w-full aspect-[9/16] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={look.image}
                    alt={look.caption}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-3 left-3 bg-[#111111]/75 backdrop-blur-xs text-white text-[10px] font-inter px-2 py-0.5 rounded tracking-widest uppercase">
                    {look.number}
                  </div>
                </div>
                <p className="text-xs sm:text-[13px] font-inter text-[#111111] leading-snug font-medium pt-0.5">
                  {look.caption}
                </p>
              </div>
            ))}
            {/* End spacer for smooth scroll completion */}
            <div className="w-2 sm:w-4 shrink-0 snap-start" aria-hidden="true" />
          </div>
        </div>

        {/* 4. SECTION FOOTER */}
        <div className="w-full h-px bg-[#E5E0D8] mt-2" />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: MIKA — FASHION / EDITORIAL */}
      {/* ========================================================================= */}
        <section id="fashion-mika-section" className="flex flex-col gap-8 sm:gap-10">
          {/* Header */}
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <span className="text-[11px] font-syne tracking-[0.25em] uppercase text-gray-400 font-semibold">
              FASHION / EDITORIAL
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-medium tracking-tight uppercase text-[#111111] leading-none">
              MIKA
            </h3>
            <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/80 mt-1 max-w-xl">
              Deconstructed corporate elegance set against brutalist architecture. A fresh vision of modern office wear where sharp tailoring meets sculptural geometry.
            </p>
          </div>

          {/* Subtle Horizontal Divider below description */}
          <div className="w-full h-px bg-[#E5E0D8]" />

          {/* Media Gallery */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Image 1 Contextual architectural shot */}
            <div className="relative w-full aspect-video md:aspect-[21/9] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789052921/MIKA_3.jpg"
                alt="MIKA Architectural Context"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Dual Vertical Editorial Portraits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {/* Image 2 (Vertical) */}
              <div className="relative w-full aspect-[9/16] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
                <img
                  src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789052815/MIKA_1.png"
                  alt="MIKA Editorial Portrait 1"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Image 3 (Vertical) */}
              <div className="relative w-full aspect-[9/16] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
                <img
                  src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789052913/MIKA_2.png"
                  alt="MIKA Editorial Portrait 2"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Subtle Divider above editorial spec sheet */}
          <div className="w-full h-px bg-[#E5E0D8]" />

          {/* Editorial Spec Sheet */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
              EDITORIAL SPECIFICATION
            </span>
            <div className="flex flex-col divide-y divide-[#E5E0DB]">
              <div className="py-3.5 first:pt-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  CONCEPT
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  Reimagining corporate uniform through avant-garde cuts and uncompromising editorial framing.
                </p>
              </div>

              <div className="py-3.5 last:pb-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  WARDROBE
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  Oversized architectural blazers, high-waisted fluid trousers, and statement monochrome layering.
                </p>
              </div>
            </div>
          </div>

          {/* Section Footer */}
          <div className="w-full h-px bg-[#E5E0D8] mt-2" />
        </section>
    </div>
  );
}

function VideoPlayerWithSoundToggle({
  src,
  poster,
  aspectClass = "aspect-video",
  title,
}: {
  src: string;
  poster?: string;
  aspectClass?: string;
  title: string;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className={`relative w-full ${aspectClass} bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm group`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="w-full h-full object-cover rounded-lg"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Sleek Interactive Sound Toggle in Corner */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? `Turn sound on for ${title}` : `Turn sound off for ${title}`}
        className={`absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-inter tracking-wider transition-all duration-300 backdrop-blur-md cursor-pointer select-none ${
          isMuted
            ? "bg-[#111111]/70 hover:bg-[#111111]/90 text-white/95 border border-white/20 shadow-sm"
            : "bg-white/95 hover:bg-white text-[#111111] border border-black/10 shadow-md font-medium"
        }`}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-3.5 h-3.5 opacity-90" />
            <span className="text-[11px] uppercase tracking-wider">Sound: Off</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#111111]" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Sound: On</span>
          </>
        )}
      </button>
    </div>
  );
}

const CinemaVideoPlayer = VideoPlayerWithSoundToggle;

function CommercialView({ onBack }: { onBack: () => void }) {
  return (
    <div id="commercial-reel-section" className="flex flex-col gap-12 sm:gap-16 pb-16 w-full">
      {/* ========================================================================= */}
      {/* SECTION 1: COMMERCIAL REEL */}
      {/* ========================================================================= */}
      <section id="commercial-reel-project" className="flex flex-col gap-8 sm:gap-10">
        {/* 1. TOP NAVIGATION / HEADER */}
        <div className="flex justify-between items-start gap-6 w-full">
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <span className="text-[11px] font-syne tracking-[0.25em] uppercase text-gray-400 font-semibold">
              MOTION &amp; VIDEO PRODUCTION
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-medium tracking-tight uppercase text-[#111111] leading-none">
              COMMERCIAL REEL
            </h3>
            <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/80 mt-1 max-w-xl">
              A curated selection of high-end video campaigns tailored for global cosmetics, fragrance, and luxury brands.
            </p>
          </div>

          <button 
            onClick={onBack}
            className="text-xs font-inter tracking-[0.15em] uppercase hover:opacity-50 transition-opacity border-b border-[#111111] pb-0.5 cursor-pointer shrink-0 whitespace-nowrap pt-1"
          >
            &larr; Back
          </button>
        </div>

        {/* Subtle Horizontal Divider below description */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 2. VIDEO GALLERY (Responsive layout for 2 horizontal and 1 vertical video) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column: 2 Horizontal Videos (16:9) */}
          <div className="md:col-span-7 flex flex-col gap-6 md:gap-8">
            {/* Video 1 (Horizontal) */}
            <VideoPlayerWithSoundToggle
              src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789054261/Maison_FK.mp4"
              poster="https://res.cloudinary.com/gzwpz0gx/video/upload/so_0/v1789054261/Maison_FK.jpg"
              aspectClass="aspect-video"
              title="Maison Francis Kurkdjian"
            />

            {/* Video 2 (Horizontal) */}
            <VideoPlayerWithSoundToggle
              src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789053047/BERG.mp4"
              poster="https://res.cloudinary.com/gzwpz0gx/video/upload/so_0/v1789053047/BERG.jpg"
              aspectClass="aspect-video"
              title="Berg"
            />
          </div>

          {/* Right Column: 1 Vertical Video (9:16) */}
          <div className="md:col-span-5 flex flex-col">
            <VideoPlayerWithSoundToggle
              src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789054255/ERIC_ombre.mp4"
              poster="https://res.cloudinary.com/gzwpz0gx/video/upload/so_0/v1789054255/ERIC_ombre.jpg"
              aspectClass="aspect-[9/16]"
              title="Eric Ombre"
            />
          </div>
        </div>

        {/* 3. SECTION FOOTER: Clean subtle 1px divider line */}
        <div className="w-full h-px bg-[#E5E0D8] mt-2" />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE MORNING EDITION */}
      {/* ========================================================================= */}
      <section id="commercial-morning-edition-section" className="flex flex-col gap-8 sm:gap-10">
        {/* 1. SECTION HEADER */}
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <span className="text-[11px] font-syne tracking-[0.25em] uppercase text-gray-400 font-semibold">
            COMMERCIAL / TABLEWARE &amp; STILL LIFE
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-medium tracking-tight uppercase text-[#111111] leading-none">
            THE MORNING EDITION
          </h3>
          <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/80 mt-1 max-w-xl">
            A luxury breakfast campaign built through a controlled AI production workflow — from object selection and spatial staging to fixed 10:00 AM light, service details and motion.
          </p>
        </div>

        {/* Subtle horizontal divider line below description */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 2. SPEC SHEET & BRAND MANIFEST */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
            SPEC SHEET &amp; BRAND MANIFEST
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Left Column: Spec Items 1 & 2 */}
            <div className="flex flex-col divide-y divide-[#E5E0D8]">
              <div className="py-3.5 first:pt-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  CURATED BRANDS
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  Wedgwood, Christofle (Albi &amp; Vertigo collections), Villeroy &amp; Boch, and antique silver pieces.
                </p>
              </div>
              <div className="py-3.5 last:pb-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  LIGHTING SETUP
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  10:00 AM bright summer sun with leafy shadow interplay and controlled silver highlights.
                </p>
              </div>
            </div>

            {/* Right Column: Spec Items 3 & 4 */}
            <div className="flex flex-col divide-y divide-[#E5E0D8] border-t md:border-t-0 border-[#E5E0D8] pt-3.5 md:pt-0">
              <div className="py-3.5 first:pt-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  PRODUCTION WORKFLOW
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  Exact object scaling, spatial material logic, still life photography, and subtle signature motion.
                </p>
              </div>
              <div className="py-3.5 last:pb-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  ECONOMIC EFFICIENCY
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  High-end multi-asset generation avoiding physical prop logistics and location constraints.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider before media gallery */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 3. MEDIA GALLERY (Mix of Photos and Signature Motion Video) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Photo 1 */}
          <div className="flex flex-col gap-2.5">
            <div className="relative w-full aspect-video bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789164011/foto_8.jpg"
                alt="Christofle Vertigo Tray & Silver Service Detail"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-xs sm:text-[13px] font-inter text-[#111111]/80 leading-snug">
              Christofle Vertigo Tray &amp; Silver Service Detail
            </p>
          </div>

          {/* Photo 2 */}
          <div className="flex flex-col gap-2.5">
            <div className="relative w-full aspect-video bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789164010/foto_5.jpg"
                alt="Table Setting Overview / English Breakfast Staging"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-xs sm:text-[13px] font-inter text-[#111111]/80 leading-snug">
              Table Setting Overview / English Breakfast Staging
            </p>
          </div>

          {/* Photo 3 */}
          <div className="flex flex-col gap-2.5">
            <div className="relative w-full aspect-video bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789057714/foto_7.jpg"
                alt="Individual Cover Master Composition"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-xs sm:text-[13px] font-inter text-[#111111]/80 leading-snug">
              Individual Cover Master Composition
            </p>
          </div>

          {/* Signature Video (Horizontal) */}
          <div className="flex flex-col gap-2.5">
            <VideoPlayerWithSoundToggle
              src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789058242/video_2_dog.mp4"
              aspectClass="aspect-video"
              title="Signature Motion — Living Detail with Dachshund & Easter Egg"
            />
            <p className="text-xs sm:text-[13px] font-inter text-[#111111]/80 leading-snug">
              Signature Motion — Living Detail with Dachshund &amp; Easter Egg
            </p>
          </div>
        </div>

        {/* 4. SECTION FOOTER: Clean, subtle 1px divider line at the bottom */}
        <div className="w-full h-px bg-[#E5E0D8] mt-2" />
      </section>
    </div>
  );
}

function CinemaView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-16">
      <section id="cinema-section" className="flex flex-col gap-8 sm:gap-10">
        {/* 1. SECTION HEADER & NARRATIVE SUMMARY */}
        <div className="flex justify-between items-start gap-6 w-full">
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <span className="text-[11px] font-syne tracking-[0.25em] uppercase text-gray-400 font-semibold">
              CINEMA / NARRATIVE &amp; ART HOUSE
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-medium tracking-tight uppercase text-[#111111] leading-none">
              CINEMATIC WORKS
            </h3>
            <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/80 mt-1 max-w-2xl">
              A curated cinematic anthology exploring the delicate boundary between inner psychological tension and emotional resonance. Ranging from atmospheric suspense to luminous narrative spaces, each piece examines human vulnerability, courage, and transformation.
            </p>
          </div>

          <button 
            onClick={onBack}
            className="text-xs font-inter tracking-[0.15em] uppercase hover:opacity-50 transition-opacity border-b border-[#111111] pb-0.5 cursor-pointer shrink-0 whitespace-nowrap pt-1"
          >
            &larr; Back
          </button>
        </div>

        {/* Subtle Horizontal Divider below header */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 2. SPEC SHEET (Structured info layout with subtle 1px dividers) */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
            CINEMATIC SPECIFICATION &amp; ARTISTIC APPROACH
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Left Column: GENRE & FORMAT */}
            <div className="flex flex-col divide-y divide-[#E5E0D8]">
              <div className="py-3.5 first:pt-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  GENRE &amp; FORMAT
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  Psychological Thriller, Art House, Experimental Motion, Mixed Vertical/Horizontal Aspect Ratios.
                </p>
              </div>
            </div>

            {/* Right Column: ARTISTIC APPROACH */}
            <div className="flex flex-col divide-y divide-[#E5E0D8] border-t md:border-t-0 border-[#E5E0D8] pt-3.5 md:pt-0">
              <div className="py-3.5 first:pt-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  ARTISTIC APPROACH
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  Surrealist framing, deep tonal contrast, and original Russian voice/text elements paired with international visual language.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider before video gallery */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 3. MIXED-ASPECT VIDEO GALLERY */}
        <div className="flex flex-col gap-8 md:gap-10">
          {/* Video 1: Featured Opening Master (Horizontal, aspect-video) */}
          <div className="flex flex-col gap-2.5 w-full">
            <CinemaVideoPlayer
              src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789059513/ICE_girl.mp4"
              aspectClass="aspect-video"
              title="Ice Girl"
            />
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-sm sm:text-[15px] font-syne font-semibold uppercase tracking-wide text-[#111111]">
                  Ice Girl
                </h4>
                <span className="text-[11px] font-mono text-gray-500 tracking-tight">
                  19s
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-inter text-[#111111]/75 leading-relaxed">
                An atmospheric visual concept examining the fragility of our world.
              </p>
            </div>
          </div>

          {/* Asymmetric 2-Column Showcase (Vertical Award Piece paired with 2 Horizontal Videos) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Left Column: Video 2 (Vertical Award Piece, 9:16) */}
            <div className="md:col-span-5 flex flex-col gap-2.5">
              <CinemaVideoPlayer
                src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789243325/Michell.neuro_Proximity.mp4"
                aspectClass="aspect-[9/16]"
                title="Proximity"
              />
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-sm sm:text-[15px] font-syne font-semibold uppercase tracking-wide text-[#111111]">
                    Proximity
                  </h4>
                  <span className="text-[10px] font-inter uppercase tracking-widest text-[#111111]/70 bg-[#EFECE6] px-2 py-0.5 rounded">
                    Award Submission
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] font-inter text-[#111111]/75 leading-relaxed">
                  A harmonious, luminous narrative exploring emotional closeness and space (Award submission piece).
                </p>
              </div>
            </div>

            {/* Right Column: Video 3 & Video 4 (Horizontal, aspect-video) */}
            <div className="md:col-span-7 flex flex-col gap-6 md:gap-8">
              {/* Video 3 (Horizontal Narrative) */}
              <div className="flex flex-col gap-2.5">
                <CinemaVideoPlayer
                  src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789059540/%D0%BD%D0%B5_%D0%BE%D0%B3%D0%BB%D1%8F%D0%B4%D1%8B%D0%B2%D0%B0%D0%B9%D1%81%D1%8F.mp4"
                  aspectClass="aspect-video"
                  title="Don't Look Back"
                />
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm sm:text-[15px] font-syne font-semibold uppercase tracking-wide text-[#111111]">
                      Don&apos;t Look Back
                    </h4>
                    <span className="text-[11px] font-mono text-gray-500 tracking-tight">
                      50s
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-inter text-[#111111]/75 leading-relaxed">
                    A psychological exploration of inner fears and self-doubt.
                  </p>
                </div>
              </div>

              {/* Video 4 (Horizontal Vignette) */}
              <div className="flex flex-col gap-2.5">
                <CinemaVideoPlayer
                  src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789059492/IMPORTANT.mp4"
                  aspectClass="aspect-video"
                  title="Fearless"
                />
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm sm:text-[15px] font-syne font-semibold uppercase tracking-wide text-[#111111]">
                      Fearless
                    </h4>
                    <span className="text-[11px] font-mono text-gray-500 tracking-tight">
                      10s
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-inter text-[#111111]/75 leading-relaxed">
                    A concise suspense vignette on the necessity of courage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SECTION FOOTER: Clean, subtle 1px divider line at the bottom */}
        <div className="w-full h-px bg-[#E5E0D8] mt-2" />
      </section>
    </div>
  );
}

function CharacterView() {
  const handleDownloadPdf = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    const cleanTitle = title.replace(/_/g, ' ');
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 260 >>
stream
BT
/F1 18 Tf
50 720 Td
(${cleanTitle}) Tj
/F1 12 Tf
0 -30 Td
(LOOKBOOK & COMMERCIAL PRESENTATION DECK - 2026) Tj
0 -25 Td
(Art Direction, Cinematography, and Scene Storyboards.) Tj
0 -25 Td
(Confidential Commercial Client Portfolio.) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000224 00000 n 
0000000293 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
605
%%EOF`;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_presentation.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-24 pb-16">
      {/* Block 1: ALFA Leopard */}
      <section id="alfa-leopard-section" className="flex flex-col gap-8 sm:gap-10">
        {/* 1. TITLE AREA (Left-aligned, matching Eric's structure) */}
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <span className="text-[11px] font-syne tracking-[0.25em] uppercase text-gray-400 font-semibold">
            VIRTUAL AMBASSADOR / PREMIUM BANKING
          </span>
          <h4 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-medium tracking-tight uppercase text-[#111111] leading-none">
            ALFA LEOPARD
          </h4>
          <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/80 mt-1 max-w-xl">
            A hyper-realistic anthropomorphic persona engineered as an exclusive brand ambassador for the finance sector.
          </p>
        </div>

        {/* Subtle Divider below title */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 2. MEDIA GALLERY: 2 Photos (Portrait and Character Sheet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative aspect-[4/3] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
            <img 
              src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789054593/%D0%9B%D0%B5%D0%BE_%D0%B2_%D1%87%D0%B5%D1%80%D0%BD%D0%BE%D0%BC.png" 
              alt="Leo in Black - Portrait - ALFA Leopard" 
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
          <div className="relative aspect-[4/3] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
            <img 
              src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789054568/%D0%B0%D0%BB%D1%8C%D1%84%D0%B0_%D0%9B%D0%B5%D0%BE.png" 
              alt="Alpha Leo - Character Sheet - ALFA Leopard" 
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
        </div>

        {/* Subtle Divider above character videos */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 3. THE 3 VIDEOS ROW: Inserted between photos and spec sheet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Video 1: Leo Cafe */}
          <div className="relative w-full aspect-video bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover rounded-lg"
            >
              <source src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789054676/Leo_cafe.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Video 2: Leo Lift */}
          <div className="relative w-full aspect-video bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover rounded-lg"
            >
              <source src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789054687/Leo_lift.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Video 3: Leo and Dog */}
          <div className="relative w-full aspect-video bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover rounded-lg"
            >
              <source src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789054669/Leo_and_dog.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Subtle Divider above character summary */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* 4. CHARACTER SPEC SHEET (Minimalist Spec Sheet matching Eric's sections) */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
            CHARACTER PROFILE &amp; COMMERCIAL SPECIFICATION
          </span>
          <div className="flex flex-col divide-y divide-[#E5E0D8]">
            <div className="py-3.5 first:pt-0 flex flex-col gap-1">
              <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                BRAND POSITIONING
              </span>
              <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                Combining corporate authority with raw charisma to target premium and private banking clients.
              </p>
            </div>

            <div className="py-3.5 flex flex-col gap-1">
              <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                VISUAL IDENTITY
              </span>
              <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                Executive tailoring contrasted with ultra-detailed wildlife micro-textures.
              </p>
            </div>

            <div className="py-3.5 last:pb-0 flex flex-col gap-1">
              <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                ASSET INTEGRATION
              </span>
              <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                Engineered for consistency across premium credit card visuals, VIP client materials, and cross-channel digital media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#E5E0D8]" />

      {/* Block 2: ERIC Section */}
      <section className="flex flex-col gap-24">
        {/* Sub-project A: ERIC - CRETE / RESORT EDITION 2026 (Glossy Editorial Split-Screen) */}
        <div id="eric-crete-section" className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start relative">
          {/* Left Column (Sticky, 40% width on desktop - Quiet Luxury Editorial) */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-28 z-10 flex flex-col gap-8 xl:gap-9 pr-0 lg:pr-4">
            {/* 1. TITLE BLOCK */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-syne tracking-[0.25em] uppercase text-gray-400 font-semibold">
                CRETE / RESORT EDITION 2026
              </span>
              <h4 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-medium tracking-tight uppercase text-[#111111] leading-none">
                ERIC
              </h4>
              <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/80 mt-1 max-w-md">
                A complete commercial character for fashion, lifestyle &amp; resort campaigns.
              </p>
            </div>

            {/* Subtle Divider */}
            <div className="w-full h-px bg-[#E5E0D8]" />

            {/* 2. LOCATION METADATA (Editorial Footnote / Geo-tag section) */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
                Location Metadata
              </span>
              <div className="flex flex-col gap-4 text-sm font-inter leading-relaxed text-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="font-syne text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#111111]">
                    ELAFONISI PINK SANDS
                  </span>
                  <p className="text-sm font-inter text-gray-800 leading-relaxed">
                    Unique nature reserve beach featuring crystal-clear turquoise waters and pink sand{" "}
                    <span className="font-mono text-xs text-gray-500 tracking-tight block sm:inline mt-0.5 sm:mt-0">
                      (35°16&apos;18.4&quot;N 23°32&apos;34.1&quot;E)
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-syne text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#111111]">
                    FALASSARNA WILD WAVES
                  </span>
                  <p className="text-sm font-inter text-gray-800 leading-relaxed">
                    Powerful swell captured during dynamic high-energy surf sessions{" "}
                    <span className="font-mono text-xs text-gray-500 tracking-tight block sm:inline mt-0.5 sm:mt-0">
                      (35°29&apos;35.2&quot;N 23°34&apos;08.5&quot;E)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="w-full h-px bg-[#E5E0D8]" />

            {/* 3. FINANCIAL SAVINGS & BUDGET OPTIMIZATION (Airy spec sheet, no boxes) */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
                Financial Savings &amp; Budget Optimization
              </span>
              <div className="flex flex-col divide-y divide-[#E5E0D8]">
                <div className="py-3.5 first:pt-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                    Traditional On-Location Budget
                  </span>
                  <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                    Full crew (model, photographer, underwater videographer, stylist, local fixer), 4x4 rental, international flights, logistics, and insurance would cost <strong className="font-semibold text-[#111111]">$17,600 — $21,100</strong>.
                  </p>
                </div>

                <div className="py-3.5 flex flex-col gap-1">
                  <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                    Generative AI Production
                  </span>
                  <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                    Executed with <strong className="font-semibold text-[#111111]">85%–90% cost savings</strong> while remaining 100% independent of weather and travel delays.
                  </p>
                </div>

                <div className="py-3.5 last:pb-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                    Perpetual Model Buyout
                  </span>
                  <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                    No annual contract renewals or model agency royalty fees — <strong className="font-semibold text-[#111111]">full commercial rights</strong> to Eric belong to the brand indefinitely.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Scrollable, 60% width on desktop) */}
          <div className="w-full lg:w-[60%]">
            {/* 2-Column Asymmetric Masonry-style Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 items-start">
              {/* Column 1 */}
              <div className="flex flex-col gap-5 lg:gap-6">
                {/* 1. Video 16:9 (Surfing) */}
                <div className="w-full aspect-video bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="https://res.cloudinary.com/gzwpz0gx/video/upload/so_0/v1789130217/Surfer_carving_turquoise_wave.jpg"
                    src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789130217/Surfer_carving_turquoise_wave.mp4"
                    className="w-full h-full object-cover rounded-lg"
                  >
                    <source
                      src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789130217/Surfer_carving_turquoise_wave.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                {/* 4. Photo 9:16 (Car) */}
                <div className="w-full aspect-[9/16] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
                  <img
                    src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789151306/Eric_car.jpg"
                    alt="Eric Overland 4x4"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-5 lg:gap-6">
                {/* 2. Video 9:16 (Walking) */}
                <div className="w-full aspect-[9/16] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="https://res.cloudinary.com/gzwpz0gx/video/upload/so_0/v1789151316/Man_walking_on_pink_sand.jpg"
                    src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789151316/Man_walking_on_pink_sand.mp4"
                    className="w-full h-full object-cover rounded-lg"
                  >
                    <source
                      src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789151316/Man_walking_on_pink_sand.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                {/* 3. Photo 4:3 (Falasarna beach surf session) */}
                <div className="w-full aspect-[4/3] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789151308/Eric_Falasarna.jpg"
                    alt="Eric Falasarna Beach Surf"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E5E0D8]" />

        {/* Sub-project B: THE WILD LUXURY — YAKUSHIMA EDITION 2026 (Museum Triptych) */}
        <div id="yakushima-section" className="flex flex-col gap-8 sm:gap-10">
          {/* 1. TITLE AREA (Left-aligned, matching Crete's structure) */}
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <span className="text-[11px] font-syne tracking-[0.25em] uppercase text-gray-400 font-semibold">
              YAKUSHIMA / WILD LUXURY EDITION 2026
            </span>
            <h4 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-medium tracking-tight uppercase text-[#111111] leading-none">
              ERIC
            </h4>
            <p className="text-xs sm:text-sm font-inter leading-relaxed text-[#111111]/80 mt-1 max-w-xl">
              Sensory-driven vertical campaign featuring high-end fragrance integration and micro-motion aesthetics.
            </p>
          </div>

          {/* Subtle Divider below title */}
          <div className="w-full h-px bg-[#E5E0D8]" />

          {/* 2. MEDIA GALLERY (The Triptych: 3 columns on desktop, 1 column on mobile, exact 9:16 aspect, rounded-lg, zero overlays) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column (Asset 1): Photo */}
            <div className="w-full aspect-[9/16] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789155592/Male_model_holding.jpg"
                alt="Yakushima Campaign - Fragrance integration"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>

            {/* Center Column (Asset 2): Video */}
            <div className="w-full aspect-[9/16] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="https://res.cloudinary.com/gzwpz0gx/video/upload/so_0/v1789155593/Deer_and_man_in_forest.jpg"
                src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789155593/Deer_and_man_in_forest.mp4"
                className="w-full h-full object-cover rounded-lg"
              >
                <source
                  src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789155593/Deer_and_man_in_forest.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            {/* Right Column (Asset 3): Photo */}
            <div className="w-full aspect-[9/16] bg-[#E5E0D8] rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://res.cloudinary.com/gzwpz0gx/image/upload/v1789132990/Man_holding_perfume_bottle_.jpg"
                alt="Yakushima Campaign - Man holding perfume bottle"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Subtle Divider above commercial summary */}
          <div className="w-full h-px bg-[#E5E0D8]" />

          {/* 3. COMMERCIAL SUMMARY (Minimalist Spec Sheet matching Crete's FINANCIAL SAVINGS) */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-[10px] font-syne tracking-[0.2em] uppercase font-bold text-gray-400">
              COMMERCIAL VALUE &amp; PRODUCTION
            </span>
            <div className="flex flex-col divide-y divide-[#E5E0D8]">
              <div className="py-3.5 first:pt-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  FORMAT
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  <strong className="font-semibold text-[#111111]">9:16 Vertical Assets</strong> optimized for high engagement on Reels and TikTok.
                </p>
              </div>

              <div className="py-3.5 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  AESTHETIC
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  <strong className="font-semibold text-[#111111]">&apos;Quiet Luxury&apos;</strong> with tactile macro-textures to lower CPC and increase Average Order Value.
                </p>
              </div>

              <div className="py-3.5 last:pb-0 flex flex-col gap-1">
                <span className="text-xs sm:text-[13px] font-syne font-semibold uppercase tracking-wider text-[#111111]">
                  BUDGET OPTIMIZATION
                </span>
                <p className="text-sm sm:text-[15px] font-inter leading-relaxed text-gray-800">
                  Generative AI delivers <strong className="font-semibold text-[#111111]">85–90% cost savings</strong> compared to traditional on-location shoots on Yakushima Island ($45K–$60K).
                </p>
              </div>
            </div>
          </div>

          {/* 4. FOOTNOTE (Left-aligned, matching section grid) */}
          <div className="pt-1">
            <p className="text-[11px] sm:text-xs font-inter text-gray-500 tracking-wide">
              Wardrobe: Loro Piana Mustique Linen. Featured Assets: Bleu de Chanel, Dior Sauvage Elixir, and Gucci Guilty.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoSection() {
  const contactMailto = "mailto:i.baboonts@gmail.com?subject=Michell.neuro%20%E2%80%94%20Portfolio%20Inquiry&body=Hello%20Michell,%0D%0A%0D%0AI’d%20like%20to%20discuss%20a%20project%20with%20you.";

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Dancing Video Finale */}
      <div className="w-full aspect-video bg-[#E5E0D8] overflow-hidden group media-container">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity duration-700 ease-out group-hover:opacity-90">
          <source src="https://res.cloudinary.com/gzwpz0gx/video/upload/v1789058151/dancingman.mp4" type="video/mp4" />
        </video>
      </div>

      {/* About & Contacts */}
      <section className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h3 className="text-xl md:text-2xl font-syne tracking-widest uppercase font-medium text-[#111111]">Michell Neuro</h3>
          <span className="text-xs md:text-sm font-inter tracking-widest uppercase text-gray-500">Creative Director &amp; Visual Creator</span>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div className="flex flex-col gap-4 text-sm md:text-base font-inter leading-relaxed text-[#111111]/85">
            <p>
              I’m a visual creator and creative director working with AI to turn ideas into worlds.
            </p>
            <p>
              I’m drawn to the space between fashion, cinema, nature and imagination — creating characters, campaigns and visual stories that feel like fragments of a larger universe.
            </p>
            <p className="text-[#111111] font-medium pt-1">
              For me, AI is not the final idea. It is a way to make the idea visible.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-inter tracking-[0.2em] uppercase font-medium text-gray-400">Let&apos;s Create Together</h4>
            <div className="flex flex-col gap-4">
              <a 
                href={contactMailto}
                className="text-sm font-inter tracking-[0.15em] uppercase hover:opacity-50 transition-opacity border-b border-[#E5E0D8] pb-2 inline-flex items-center gap-1.5 w-fit text-[#111111]"
              >
                CONTACT →
              </a>
              <a 
                href="https://www.instagram.com/michell.neuro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-inter tracking-[0.15em] uppercase hover:opacity-50 transition-opacity border-b border-[#E5E0D8] pb-2 inline-flex items-center gap-1.5 w-fit text-[#111111]"
              >
                INSTAGRAM ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
