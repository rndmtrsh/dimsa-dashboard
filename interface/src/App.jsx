import { useState, useEffect, useRef } from 'react'

// =====================
// Reusable Components
// =====================

function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="logo">
        <span>PV</span>
      </div>
      <div className="title-block">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>MA Darul Ihsan &mdash; Sistem PLTS On Grid</p>
    </footer>
  )
}

function KpiCard({ title, value, unit, subtitle, compact = false, className = '' }) {
  return (
    <article className={`card card-kpi ${compact ? 'compact' : ''} ${className}`}>
      <h3>{title}</h3>
      <p className={compact ? 'value-medium' : 'value-large'}>
        {value} {unit && <span className="unit">{unit}</span>}
      </p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </article>
  )
}

function InnerBox({ title, value, unit, subtitle, className = '' }) {
  return (
    <div className={`inner-box ${className}`}>
      <h3 className="inner-title">{title}</h3>
      <p className="value-main">
        {value} <span className="unit">{unit}</span>
      </p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  )
}

function YieldBox({ title, value, unit, subtitle, style, className = '' }) {
  return (
    <div className={`inner-box inner-box-yield ${className}`} style={style}>
      <h3 className="inner-title">{title}</h3>
      <p className="value-main">
        {value} <span className="unit">{unit}</span>
      </p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  )
}

function PhaseCard({ phase, power, voltage, current, className = '' }) {
  return (
    <article className={`card phase-card ${className}`}>
      <div className="phase-header">
        <span className="phase-title">Phase {phase}</span>
        <span className="phase-separator">:</span>
        <span className="phase-power">
          {power} <span className="unit">kW</span>
        </span>
      </div>
      <div className="phase-inner-grid">
        <div className="inner-metric-box">
          <p className="inner-label">Voltage</p>
          <p className="inner-value">
            {voltage} <span className="unit">V</span>
          </p>
        </div>
        <div className="inner-metric-box">
          <p className="inner-label">Current</p>
          <p className="inner-value">
            {current} <span className="unit">A</span>
          </p>
        </div>
      </div>
    </article>
  )
}

// =====================
// Page: Main Dashboard
// =====================

function MainDashboard({ data, transitionStyle }) {
  return (
    <main className="content" style={transitionStyle}>
      {/* BARIS ATAS: 2 BOX LUAR */}
      <section className="row row-top">
        {/* BOX KIRI: DAYA + PV AC + GRID AC */}
        <section className="panel panel-top-left">
          <h2 className="panel-title" style={{ fontSize: '1.8rem' }}>Daya Sistem AC</h2>
          <InnerBox
            title="Total Active Power"
            value={data.totalActivePower}
            unit="kW"
            subtitle="Total daya aktif keluaran inverter"
            className="main-power-box animate-card-1"
          />
          <div className="inner-row two-cards">
            <KpiCard
              title="PV Power AC"
              value={data.pvPowerAC}
              unit="kW"
              subtitle="Daya AC dari panel surya"
              className="animate-card-2"
            />
            <KpiCard
              title="Grid Power AC"
              value={data.gridPowerAC}
              unit="kW"
              subtitle="Daya dari PLN"
              className="animate-card-3"
            />
          </div>
        </section>

        {/* BOX KANAN: YIELD TODAY */}
        <section className="panel panel-top-right">
          <h2 className="panel-title animate-text">Energi dari Matahari</h2>
          <YieldBox
            title="Yield Today"
            value={data.yieldToday}
            unit="kWh"
            subtitle="Total energi yang dihasilkan sistem hari ini"
            style={{ marginBottom: '10pt' }}
            className="animate-card-2"
          />
          <YieldBox
            title="Yield This Month"
            value={data.yieldMonth}
            unit="kWh"
            subtitle="Total energi yang dihasilkan sistem bulan ini"
            className="animate-card-3"
          />
        </section>
      </section>

      {/* BARIS BAWAH: 2 BOX LUAR LEBIH KECIL */}
      <section className="row row-bottom">
        {/* BOX KIRI: FREQUENCY & POWER FACTOR */}
        <section className="panel panel-bottom-left">
          <h2 className="panel-title animate-text-delay">Kualitas Daya</h2>
          <div className="inner-row two-cards">
            <KpiCard title="Frequency" value={data.frequency} unit="Hz" compact />
            <KpiCard title="Power Factor" value={data.powerFactor} compact />
          </div>
        </section>

        {/* BOX KANAN: TEGANGAN, ARUS, DAYA DC */}
        <section className="panel panel-bottom-right">
          <h2 className="panel-title animate-text-delay">Parameter DC Panel Surya</h2>
          <div className="inner-row three-cards">
            <KpiCard
              title="DC Voltage"
              value={data.dcVoltage}
              unit="V"
              subtitle="Tegangan total string PV"
              compact
            />
            <KpiCard
              title="DC Current"
              value={data.dcCurrent}
              unit="A"
              subtitle="Arus dari panel surya"
              compact
            />
            <KpiCard
              title="DC Power"
              value={data.dcPower}
              unit="kW"
              subtitle="Daya DC sebelum inverter"
              compact
            />
          </div>
        </section>
      </section>
    </main>
  )
}

// =====================
// Page: Info (Halaman 2)
// =====================

function InfoPage({ data, transitionStyle }) {
  return (
    <main className="content page2-content" style={transitionStyle}>
      {/* BARIS ATAS: 3 BOX */}
      <section className="row row-top-page2">
        {/* BOX 1: Iradiasi + Suhu PV */}
        <section className="panel panel-small panel-irradiance">
          <h2 className="panel-title animate-text">Kondisi Panel Surya</h2>
          <div className="inner-column">
            <KpiCard title="Iradiasi" value={data.irradiance} unit="W/m²" compact className="animate-card-1" />
            <KpiCard title="Suhu Panel (PV)" value={data.pvTemp} unit="°C" compact className="animate-card-2" />
          </div>
        </section>

        {/* BOX 2: Kelembapan + Suhu Udara */}
        <section className="panel panel-small panel-weather">
          <h2 className="panel-title animate-text">Kondisi Lingkungan</h2>
          <div className="inner-column">
            <KpiCard title="Kelembapan" value={data.humidity} unit="%" compact className="animate-card-1" />
            <KpiCard title="Suhu Udara" value={data.airTemp} unit="°C" compact className="animate-card-2" />
          </div>
        </section>

        {/* BOX 3: Informasi teks lebar */}
        <section className="panel panel-wide-info">
          <h2 className="panel-title animate-text">Apa Itu Pembangkit Listrik Tenaga Surya?</h2>
          <div className="info-box animate-card-3">
            <p>
              Pembangkit Listrik Tenaga Surya (PLTS) mengubah energi cahaya matahari
              menjadi energi listrik. Panel surya menangkap cahaya, inverter
              mengubah listrik DC menjadi AC, lalu energi ini bisa digunakan
              untuk beban listrik di sekolah atau disalurkan ke jaringan listrik.
            </p>
            <p>
              Nilai iradiasi, suhu panel, kelembapan, dan suhu udara membantu
              kita memahami seberapa baik sistem bekerja pada kondisi lingkungan saat ini.
            </p>
          </div>
        </section>
      </section>

      {/* BARIS BAWAH: 1 BOX LEBAR INVERTER 3 FASA */}
      <section className="panel panel-inverter">
        <h2 className="panel-title animate-text-delay">Informasi Inverter 3 Fasa</h2>
        <div className="phase-grid">
          <PhaseCard
            phase="A"
            power={data.phaseA.power}
            voltage={data.phaseA.voltage}
            current={data.phaseA.current}
            className="animate-card-1"
          />
          <PhaseCard
            phase="B"
            power={data.phaseB.power}
            voltage={data.phaseB.voltage}
            current={data.phaseB.current}
            className="animate-card-2"
          />
          <PhaseCard
            phase="C"
            power={data.phaseC.power}
            voltage={data.phaseC.voltage}
            current={data.phaseC.current}
            className="animate-card-3"
          />
        </div>
      </section>
    </main>
  )
}

// =====================
// Main App
// =====================

function App() {
  const [currentPage, setCurrentPage] = useState('main')
  const [isPaused, setIsPaused] = useState(false)
  const [transitionIndex, setTransitionIndex] = useState(0)
  const timerRef = useRef(null)
  const pages = ['main', 'info']

  // Variasi transisi yang berbeda-beda
  const transitions = [
    { animation: 'fadeInUp 0.5s ease-out', animationFillMode: 'both' },
    { animation: 'slideInRight 0.5s ease-out', animationFillMode: 'both' },
    { animation: 'zoomIn 0.5s ease-out', animationFillMode: 'both' },
    { animation: 'fadeInScale 0.5s ease-out', animationFillMode: 'both' },
    { animation: 'slideInLeft 0.5s ease-out', animationFillMode: 'both' },
    { animation: 'rotateIn 0.6s ease-out', animationFillMode: 'both' },
  ]

  // Auto-rotate pages every 10 seconds
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentPage(prev => {
          const currentIndex = pages.indexOf(prev)
          const nextIndex = (currentIndex + 1) % pages.length
          return pages[nextIndex]
        })
        // Ganti style transisi setiap pindah halaman
        setTransitionIndex(prev => (prev + 1) % transitions.length)
      }, 10000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPaused])

  // Handle click on left/right side of page
  const handlePageClick = (e) => {
    const clickX = e.clientX
    const windowWidth = window.innerWidth

    if (clickX < windowWidth / 2) {
      // Left side click - toggle pause
      setIsPaused(prev => !prev)
    } else {
      // Right side click - go to next page
      setCurrentPage(prev => {
        const currentIndex = pages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % pages.length
        return pages[nextIndex]
      })
      // Ganti style transisi setiap pindah halaman manual
      setTransitionIndex(prev => (prev + 1) % transitions.length)
    }
  }

  // Sample data (replace with real data/API)
  const mainData = {
    totalActivePower: 3.5,
    pvPowerAC: 4.2,
    gridPowerAC: 0.2,
    yieldToday: 12.4,
    yieldMonth: 148.2,
    frequency: 50.0,
    powerFactor: 0.98,
    dcVoltage: 620,
    dcCurrent: 6.8,
    dcPower: 4.2,
  }

  const infoData = {
    irradiance: 850,
    pvTemp: 42,
    humidity: 65,
    airTemp: 30,
    phaseA: { power: 1.65, voltage: 230, current: 8.2 },
    phaseB: { power: 1.65, voltage: 231, current: 7.9 },
    phaseC: { power: 1.65, voltage: 228, current: 8.5 },
  }

  return (
    <div className="dashboard" onClick={handlePageClick} style={{ cursor: 'pointer' }}>
      <Header
        title={currentPage === 'main' ? 'PLTS Monitoring Dashboard' : 'Informasi Lingkungan & Inverter'}
        subtitle="Media Edukasi Sistem Solar Panel"
      />

      {/* Pause indicator */}
      {isPaused && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--status-warning)',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.9rem',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          animation: 'slideInRight 0.4s ease-out, pulse 2s ease-in-out infinite 0.4s'
        }}>
          ⏸ PAUSED (klik kiri untuk lanjut)
        </div>
      )}

      <div key={currentPage}>
        {currentPage === 'main' ? 
          <MainDashboard data={mainData} transitionStyle={transitions[transitionIndex]} /> : 
          <InfoPage data={infoData} transitionStyle={transitions[transitionIndex]} />
        }
      </div>

      <Footer />
    </div>
  )
}

export default App
