import { useState, useEffect, useRef } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface TerminalLine {
  type: 'command' | 'output' | 'blank'
  text: string
}

// ── Data ──────────────────────────────────────────────────────────────────────
const projects = [
  {
    title: 'Ashley AI Assistant',
    tag: 'AI & ML',
    status: 'Active Development',
    statusColor: 'text-emerald-400',
    desc: 'Conversational AI assistant with local LLM inference, semantic memory retrieval, and a native Android interface.',
    techs: ['Python', 'FastAPI', 'ChromaDB', 'Ollama', 'Android'],
    gradient: 'from-emerald-950/60 to-slate-900/40',
    accent: '#10B981',
    icon: '🤖',
  },
  {
    title: 'Zenoly Messaging Platform',
    tag: 'Mobile & Real-Time',
    status: 'In Development',
    statusColor: 'text-amber-400',
    desc: 'End-to-end encrypted real-time messaging for Android with composable UI and WebSocket bi-directional channels.',
    techs: ['Kotlin', 'Jetpack Compose', 'WebSocket', 'PHP', 'MySQL'],
    gradient: 'from-violet-950/60 to-slate-900/40',
    accent: '#8B5CF6',
    icon: '💬',
  },
  {
    title: 'Student Attendance System',
    tag: 'Full Stack',
    status: 'Deployed',
    statusColor: 'text-sky-400',
    desc: 'Automated attendance management system with real-time dashboards, reporting, and multi-role access control.',
    techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    gradient: 'from-sky-950/60 to-slate-900/40',
    accent: '#0EA5E9',
    icon: '🎓',
  },
]

const skills = {
  Languages: ['Java', 'C', 'Python', 'PHP', 'SQL', 'JavaScript'],
  'Web & Mobile': ['Kotlin', 'Jetpack Compose', 'Responsive Web', 'HTML5', 'CSS3'],
  Database: ['MySQL', 'ChromaDB', 'Vector Search'],
  Tools: ['Git', 'GitHub', 'Android Studio', 'VS Code', 'Ollama', 'FastAPI', 'WebSocket'],
}

const softSkills = ['Problem Solving', 'Quick Learner', 'Self Learning', 'Adaptability']

const terminalScript: TerminalLine[] = [
  { type: 'command', text: '$ profile --load mothilal' },
  { type: 'output', text: '▸ Name        : Mothilal D.J' },
  { type: 'output', text: '▸ Role        : Software & AI Systems Engineer' },
  { type: 'output', text: '▸ Location    : Madurai, Tamil Nadu' },
  { type: 'output', text: '▸ Education   : M.Sc Computer Science (Pursuing)' },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ hackerrank --fetch stats' },
  { type: 'output', text: '▸ Global Rank : #134' },
  { type: 'output', text: '▸ Status      : Verified ✓' },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ skills --list primary' },
  { type: 'output', text: '▸ AI Systems  : FastAPI · ChromaDB · Ollama' },
  { type: 'output', text: '▸ Mobile      : Kotlin · Jetpack Compose' },
  { type: 'output', text: '▸ Backend     : Python · PHP · MySQL' },
  { type: 'output', text: '▸ Status      : open_to_opportunities = true' },
]

const architectureNodes = [
  { id: 'android', label: 'Android App', sub: 'Kotlin & Compose', icon: '📱', color: '#34D399' },
  { id: 'fastapi', label: 'FastAPI Gateway', sub: 'REST & Routing Layer', icon: '⚡', color: '#10B981' },
  { id: 'ollama', label: 'Ollama LLM Kernel', sub: 'Local Model Inference', icon: '🧠', color: '#10B981' },
  { id: 'chromadb', label: 'ChromaDB Vector Store', sub: 'Semantic Embeddings', icon: '🗄️', color: '#10B981' },
  { id: 'mysql', label: 'MySQL Relational Layer', sub: 'Persistent Data Store', icon: '💾', color: '#10B981' },
]

const navItems = ['Projects', 'Architecture', 'Skills', 'Education', 'Contact']

// ── Sub-components ─────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8, 9, 12, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30, 34, 45, 0.8)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)', boxShadow: '0 0 12px rgba(16,185,129,0.4)' }}>
          <span className="font-mono font-bold text-black">M</span>
        </div>
        <span className="font-mono text-sm font-medium text-white">mothilal.dj</span>
      </div>

      {/* Desktop nav links */}
      <div className="desktop-nav-group items-center gap-8">
        {navItems.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
        ))}
      </div>

      <a
        href="mailto:mothilalsathi@gmail.com"
        className="desktop-nav-group items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200"
        style={{ border: '1px solid rgba(16,185,129,0.4)', color: '#34D399', background: 'rgba(16,185,129,0.06)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.12)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.06)' }}
      >
        Hire Me
      </a>

      {/* Mobile hamburger button */}
      <button
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
        className="mobile-nav-toggle flex-col items-center justify-center gap-1.5 w-9 h-9 rounded-lg shrink-0 focus:outline-none focus-visible:ring-2"
        style={{
          border: '1px solid rgba(30,34,45,1)',
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <span
          className="block w-4 h-0.5 rounded-full transition-transform duration-300"
          style={{
            background: '#fff',
            transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
          }}
        />
        <span
          className="block w-4 h-0.5 rounded-full transition-opacity duration-200"
          style={{ background: '#fff', opacity: menuOpen ? 0 : 1 }}
        />
        <span
          className="block w-4 h-0.5 rounded-full transition-transform duration-300"
          style={{
            background: '#fff',
            transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Mobile overlay */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className="mobile-only-fixed fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: 'rgba(0,0,0,0.6)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      />

      {/* Mobile slide-in drawer */}
      <div
        className="mobile-only-fixed fixed top-0 right-0 z-50 h-screen w-[78vw] max-w-[320px] flex flex-col gap-8 px-8 py-8 transition-transform duration-300 ease-out"
        style={{
          background: '#0F1117',
          borderLeft: '1px solid rgba(30,34,45,1)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: menuOpen ? '-8px 0 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-white">menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-lg"
            style={{ border: '1px solid rgba(30,34,45,1)', color: 'rgba(156,163,175,0.9)' }}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu}
              className="mobile-nav-link"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="mailto:mothilalsathi@gmail.com"
          onClick={closeMenu}
          className="mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-mono font-medium transition-all duration-200"
          style={{ border: '1px solid rgba(16,185,129,0.4)', color: '#34D399', background: 'rgba(16,185,129,0.06)' }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg px-4">
      {/* Emerald spotlight */}
      <div className="emerald-spotlight" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -60%)' }} />
      <div className="emerald-spotlight" style={{ width: 300, height: 300, top: '30%', right: '20%', opacity: 0.5 }} />

      <div className="relative z-10 flex flex-col items-center text-center px-2 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Status badge */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full mb-8 font-mono text-[11px] sm:text-xs text-center"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: 'rgba(52,211,153,0.9)' }}
        >
          <span className="pulse-dot w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />
          <span>MADURAI, TAMIL NADU &nbsp;•&nbsp; M.SC COMPUTER SCIENCE</span>
        </div>

        {/* Main headline */}
        <h1 className="hero-heading font-bold tracking-tight mb-4">
          <span className="text-white">Hi, I'm&nbsp;</span>
          <span className="gradient-text">Mothilal D.J</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl font-light mt-4 mb-10 max-w-2xl leading-relaxed" style={{ color: 'rgba(156,163,175,0.85)' }}>
          Building High-Throughput{' '}
          <span style={{ color: '#34D399' }}>AI Systems</span>
          {' '}&amp;{' '}
          <span style={{ color: '#34D399' }}>Mobile Architectures</span>
          {' '}that scale.
        </p>

        {/* CTAs */}
        <div className="hero-cta-group items-center gap-4">
          <a
            href="#projects"
            className="hero-cta-btn text-center px-7 py-3.5 rounded-2xl font-semibold text-sm text-black transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #10B981, #34D399)', boxShadow: '0 0 24px rgba(16,185,129,0.35)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(16,185,129,0.55)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(16,185,129,0.35)' }}
          >
            Explore Systems &amp; Projects →
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass hero-cta-btn text-center px-7 py-3.5 rounded-2xl font-medium text-sm transition-all duration-200"
            style={{ color: 'rgba(209,213,219,0.9)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.4)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '' }}
          >
            LinkedIn Profile ↗
          </a>
        </div>

        {/* Stats row */}
        <div className="hero-stats-row flex-wrap items-center justify-center gap-x-6 gap-y-4 mt-16 pt-8 w-full" style={{ borderTop: '1px solid rgba(30,34,45,0.8)' }}>
          {[
            { label: 'HackerRank', value: '#134', sub: 'Global Rank' },
            { label: 'Projects', value: '3+', sub: 'Deployed & Active' },
            { label: 'Stack', value: 'AI + Mobile', sub: 'Specialization' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center gap-1 min-w-[84px]">
              <span className="font-mono text-xl sm:text-2xl font-bold" style={{ color: '#34D399' }}>{stat.value}</span>
              <span className="text-xs text-center" style={{ color: 'rgba(107,114,128,1)' }}>{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-xs" style={{ color: 'rgba(107,114,128,1)' }}>scroll</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.6), transparent)' }} />
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Header preview area */}
      <div
        className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}
        style={{ borderBottom: '1px solid rgba(30,34,45,1)' }}
      >
        <div className="text-5xl opacity-70">{project.icon}</div>
        {/* Subtle glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 50% 120%, ${project.accent}, transparent 60%)` }}
        />
        {/* Status badge */}
        <div
          className={`absolute top-3 right-3 font-mono text-xs px-3 py-1 rounded-full ${project.statusColor}`}
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(30,34,45,1)' }}
        >
          ● {project.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-white text-base leading-tight">{project.title}</h3>
          <span className="tag-pill shrink-0">{project.tag}</span>
        </div>
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(107,114,128,1)' }}>
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techs.map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-14">
        <span className="tag-pill mb-4 inline-block">SYSTEM DEPLOYMENTS</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">Projects &amp; Systems</h2>
        <p className="text-base" style={{ color: 'rgba(107,114,128,1)' }}>
          Real-world deployments spanning AI inference, mobile platforms, and full-stack solutions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(p => <ProjectCard key={p.title} project={p} />)}
      </div>
    </section>
  )
}

function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <span className="tag-pill mb-4 inline-block">SYSTEM TOPOLOGY</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">Ashley AI — Pipeline Architecture</h2>
          <p className="text-sm" style={{ color: 'rgba(107,114,128,1)' }}>
            End-to-end local AI inference pipeline with semantic memory and persistent relational storage.
          </p>
        </div>

        <div
          className="rounded-2xl p-4 sm:p-8"
          style={{ background: 'rgba(15,17,23,0.8)', border: '1px solid rgba(30,34,45,1)' }}
        >
          <div className="flex flex-col items-center gap-0">
            {architectureNodes.map((node, i) => (
              <div key={node.id} className="flex flex-col items-center w-full max-w-md">
                {/* Node card */}
                <div
                  className="w-full rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid rgba(16,185,129,${i === 0 ? 0.5 : 0.2})`,
                    boxShadow: i === 0 ? '0 0 20px rgba(16,185,129,0.1)' : 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(16,185,129,0.5)'
                    el.style.boxShadow = '0 0 20px rgba(16,185,129,0.1)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = `rgba(16,185,129,${i === 0 ? 0.5 : 0.2})`
                    el.style.boxShadow = i === 0 ? '0 0 20px rgba(16,185,129,0.1)' : 'none'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
                  >
                    {node.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-white truncate">{node.label}</div>
                    <div className="font-mono text-xs mt-0.5 truncate" style={{ color: 'rgba(107,114,128,1)' }}>{node.sub}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" style={{ boxShadow: '0 0 6px rgba(16,185,129,0.8)' }} />
                </div>

                {/* Connector */}
                {i < architectureNodes.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="flow-line w-px h-6" style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.7), rgba(16,185,129,0.3))' }} />
                    <div className="font-mono text-xs px-2 py-0.5 rounded" style={{ color: 'rgba(16,185,129,0.6)', background: 'rgba(16,185,129,0.05)' }}>↓</div>
                    <div className="flow-line w-px h-6" style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.3), rgba(16,185,129,0.7))', animationDelay: '0.5s' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="tag-pill mb-4 inline-block">TECHNICAL STACK</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">Capabilities</h2>
        <p className="text-base" style={{ color: 'rgba(107,114,128,1)' }}>
          Core technologies across AI systems, mobile engineering, and full-stack development.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="glass-card rounded-2xl p-5">
            <div className="font-mono text-xs mb-4" style={{ color: '#10B981' }}>{category}</div>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Soft skills */}
      <div
        className="rounded-2xl p-5 flex flex-wrap items-center gap-3"
        style={{ background: 'rgba(15,17,23,0.6)', border: '1px solid rgba(30,34,45,1)' }}
      >
        <span className="font-mono text-xs mr-2" style={{ color: 'rgba(107,114,128,1)' }}>// soft skills</span>
        {softSkills.map(s => (
          <span
            key={s}
            className="px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ border: '1px solid rgba(16,185,129,0.25)', color: '#34D399', background: 'rgba(16,185,129,0.06)' }}
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="mb-12">
        <span className="tag-pill mb-4 inline-block">ACADEMIC RECORD</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">Education &amp; Achievements</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Timeline — left 3 cols */}
        <div className="lg:col-span-3">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div
              className="absolute left-3.5 top-3 bottom-3 w-px"
              style={{ background: 'linear-gradient(to bottom, #10B981, rgba(16,185,129,0.1))' }}
            />

            {[
              {
                degree: 'M.Sc Computer Science',
                years: '2025 – 2027',
                college: 'The Madura College, Madurai',
                status: 'Pursuing',
                active: true,
              },
              {
                degree: 'B.Sc Computer Science',
                years: '2022 – 2025',
                college: 'The Madura College, Madurai',
                status: 'Completed',
                active: false,
              },
            ].map((edu, i) => (
              <div key={i} className="relative flex items-start gap-4 sm:gap-6 mb-10 last:mb-0">
                <div className={`timeline-dot shrink-0 mt-1 ${edu.active ? 'active' : ''}`} />
                <div
                  className="glass-card rounded-2xl p-4 sm:p-5 flex-1 min-w-0"
                  style={{ marginLeft: 0 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-white text-base">{edu.degree}</h3>
                    <span
                      className={`font-mono text-xs px-2.5 py-1 rounded-lg shrink-0 ${edu.active ? 'text-emerald-400' : 'text-sky-400'}`}
                      style={{ background: edu.active ? 'rgba(16,185,129,0.08)' : 'rgba(14,165,233,0.08)', border: `1px solid ${edu.active ? 'rgba(16,185,129,0.2)' : 'rgba(14,165,233,0.2)'}` }}
                    >
                      {edu.status}
                    </span>
                  </div>
                  <div className="font-mono text-xs mb-1" style={{ color: '#10B981' }}>{edu.years}</div>
                  <div className="text-sm" style={{ color: 'rgba(107,114,128,1)' }}>{edu.college}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HackerRank card — right 2 cols */}
        <div className="lg:col-span-2">
          <div
            className="rounded-2xl p-5 sm:p-7 h-full flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(15,17,23,0.9) 60%)', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 0 40px rgba(16,185,129,0.08)' }}
          >
            {/* Glow bg */}
            <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 50% 0%, #10B981, transparent 60%)' }} />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🏆</div>
              <div
                className="font-mono font-bold text-5xl sm:text-6xl mb-2"
                style={{ background: 'linear-gradient(135deg, #34D399, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                #134
              </div>
              <div className="font-semibold text-white text-base mb-1">Global Rank</div>
              <div className="font-mono text-xs mb-5" style={{ color: 'rgba(107,114,128,1)' }}>HackerRank Platform</div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399' }}
              >
                <span>✓</span> Verified Badge
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TerminalSection() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    if (visibleLines >= terminalScript.length) return
    const delay = terminalScript[visibleLines].type === 'command' ? 300 : 80
    const timer = setTimeout(() => setVisibleLines(v => v + 1), delay)
    return () => clearTimeout(timer)
  }, [started, visibleLines])

  return (
    <section id="terminal" className="py-24 px-4 sm:px-6 max-w-3xl mx-auto" ref={sectionRef}>
      <div className="mb-10 text-center">
        <span className="tag-pill mb-4 inline-block">INTERACTIVE SHELL</span>
        <h2 className="text-3xl font-bold text-white mt-4">System Terminal</h2>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(30,34,45,1)', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-4" style={{ background: 'rgba(15,17,23,0.95)', borderBottom: '1px solid rgba(30,34,45,1)' }}>
          <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
          <span className="font-mono text-xs ml-4" style={{ color: 'rgba(107,114,128,1)' }}>mothilal@portfolio:~</span>
        </div>

        {/* Terminal body */}
        <div
          className="p-4 sm:p-6 min-h-64 font-mono text-xs sm:text-sm overflow-x-auto"
          style={{ background: '#08090C', color: 'rgba(209,213,219,0.85)' }}
        >
          {terminalScript.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={`leading-7 whitespace-pre ${line.type === 'blank' ? 'h-3' : ''}`}>
              {line.type === 'command' ? (
                <span style={{ color: '#10B981' }}>{line.text}</span>
              ) : line.type === 'output' ? (
                <span style={{ color: 'rgba(156,163,175,0.8)' }}>{line.text}</span>
              ) : null}
            </div>
          ))}
          {visibleLines < terminalScript.length && (
            <span className="cursor-blink" style={{ color: '#10B981' }}>▋</span>
          )}
          {visibleLines >= terminalScript.length && (
            <div className="mt-2">
              <span style={{ color: '#10B981' }}>$ </span>
              <span className="cursor-blink" style={{ color: '#10B981' }}>▋</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const contacts = [
    {
      label: 'Email',
      value: 'mothilalsathi@gmail.com',
      href: 'mailto:mothilalsathi@gmail.com',
      icon: '✉',
    },
    {
      label: 'Phone',
      value: '+91-9344611351',
      href: 'tel:+919344611351',
      icon: '☎',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/mothilal',
      href: 'https://linkedin.com',
      icon: '↗',
    },
    {
      label: 'GitHub',
      value: 'github.com/mothilal',
      href: 'https://github.com',
      icon: '◈',
    },
  ]

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.07), transparent 60%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="tag-pill mb-6 inline-block">GET IN TOUCH</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
          Connect with{' '}
          <span className="gradient-text">Mothilal D.J</span>
        </h2>
        <p className="text-base mb-12" style={{ color: 'rgba(107,114,128,1)' }}>
          Open to opportunities in AI systems engineering, mobile development, and software architecture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map(c => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-5 flex items-center gap-4 text-left group w-full"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors duration-200"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981' }}
              >
                {c.icon}
              </div>
              <div className="min-w-0">
                <div className="font-mono text-xs mb-0.5" style={{ color: 'rgba(107,114,128,1)' }}>{c.label}</div>
                <div className="text-sm font-medium text-white truncate">{c.value}</div>
              </div>
              <div className="ml-auto text-gray-600 group-hover:text-emerald-400 transition-colors duration-200 shrink-0">→</div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center px-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
            style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}
          >
            <span className="font-mono font-bold text-black">M</span>
          </div>
          <span className="font-mono text-sm text-white">mothilal.dj</span>
        </div>
        <p className="font-mono text-xs" style={{ color: 'rgba(75,85,99,1)' }}>
          © 2025 Mothilal D.J — Software &amp; AI Systems Engineer
        </p>
      </div>
    </section>
  )
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: '#08090C', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ArchitectureSection />
      <SkillsSection />
      <EducationSection />
      <TerminalSection />
      <ContactSection />
    </div>
  )
}
