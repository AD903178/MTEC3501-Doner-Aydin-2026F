import { useState } from 'react'
import './App.css'

function Soundmark() {
  return (
    <svg
      className="soundmark"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 26v-4m8 11V15m8 21V12m8 23V17m8 9v-4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function App() {
  const [authMode, setAuthMode] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function openAuth(mode) {
    setSubmitted(false)
    setAuthMode(mode)
  }

  function closeAuth() {
    setAuthMode('')
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="welcome-page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Soundmix home">
          <span className="brand-icon"><Soundmark /></span>
          <span>soundmix</span>
        </a>
        <span className="topbar-note">A little more you in every sound.</span>
      </header>

      <section className="welcome-card" id="home" aria-labelledby="welcome-title">
        <div className="visualizer" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span /><span /><span />
        </div>

        <div className="welcome-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR SOUND, YOUR SPACE</div>
          <div className="hero-mark"><Soundmark /></div>
          <h1 id="welcome-title">Welcome to <span>Soundmix</span></h1>
          <p className="tagline">Create and share sounds.</p>
          <p className="intro">
            Find your rhythm, make something new, and bring your favorite sounds
            together.
          </p>

          <div className="actions">
            <button className="button button-primary" onClick={() => openAuth('Log in')}>
              Log in <span aria-hidden="true">→</span>
            </button>
            <button className="button button-secondary" onClick={() => openAuth('Sign up')}>
              Sign up
            </button>
          </div>
          <p className="quiet-note">Good sounds are better shared.</p>
        </div>

        <div className="card-footer">
          <span><span className="status-dot" /> MADE FOR YOUR MOMENTS</span>
          <span>01 <i /> 01</span>
        </div>
      </section>

      <footer className="page-footer">
        <span>LISTEN CLOSELY.</span>
        <span className="footer-wave" aria-hidden="true">〰</span>
        <span>THERE’S A SOUND FOR THAT.</span>
      </footer>

      {authMode && (
        <div className="dialog-backdrop" onMouseDown={closeAuth}>
          <section
            className="auth-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="dialog-close" onClick={closeAuth} aria-label="Close">
              ×
            </button>
            <div className="dialog-mark"><Soundmark /></div>
            <p className="dialog-eyebrow">WELCOME TO YOUR SOUND</p>
            <h2 id="auth-title">{authMode} to Soundmix</h2>
            <p className="dialog-copy">
              {authMode === 'Sign up'
                ? 'Create an account to start making and sharing.'
                : 'Pick up right where your listening left off.'}
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required />
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="At least 8 characters" minLength="8" required />
              <button className="button button-primary dialog-submit" type="submit">
                Continue <span aria-hidden="true">→</span>
              </button>
              {submitted && (
                <p className="form-message" role="status">
                  Your details are ready. Account access will be available soon.
                </p>
              )}
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
