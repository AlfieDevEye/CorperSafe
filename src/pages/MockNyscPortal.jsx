import React from "react";
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, CalendarDays, ChevronRight, CircleHelp, FileCheck2, GraduationCap, Landmark, LockKeyhole, Menu, Moon, ShieldCheck, Sun, UserRoundCheck } from 'lucide-react'

const services = [
  [FileCheck2, 'Certificate verification', 'Verify discharge, exclusion and exemption certificates.'],
  [BadgeCheck, 'Payment status', 'Review registration and payment guidance.'],
  [UserRoundCheck, 'Senate list check', 'Read about institution senate list verification.'],
  [BookOpen, 'Guidelines & resources', 'Find useful registration guides and information.'],
]

function PortalNav({ mobile = false }) {
  return <nav className={mobile ? 'portal-mobile-nav' : 'portal-nav'} aria-label="Mock portal navigation">
    <span className="portal-nav-item selected">Home</span>
    <span className="portal-nav-item">Services <ChevronRight size={13}/></span>
    <span className="portal-nav-item">News</span>
    <span className="portal-nav-item">Resources</span>
    <Link className="portal-corper-link" to="/corpersafe"><ShieldCheck size={17}/> CorperSafe <ArrowUpRight size={14}/></Link>
    <span className="portal-nav-item">Contact</span>
  </nav>
}

export default function MockNyscPortal({ theme = 'light', onToggleTheme = () => {} }) {
  const ThemeIcon = theme === 'dark' ? Sun : Moon
  return <div className="mock-portal">
    <div className="portal-utility"><div className="portal-wrap utility-inner"><span>FEDERAL REPUBLIC OF NIGERIA <i/> MOCK PORTAL EXPERIENCE</span><span><LockKeyhole size={12}/> Secure digital services concept</span></div></div>
    <header className="portal-header"><div className="portal-wrap portal-header-inner">
      <div className="nysc-identity"><span className="nysc-seal"><Landmark size={24}/><i>NYSC</i></span><span><b>NATIONAL YOUTH SERVICE CORPS</b><small>SERVICE AND UNITY</small></span></div>
      <div className="portal-header-side"><span className="portal-help"><CircleHelp size={16}/> Help Centre</span><button type="button" className="portal-theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'dark'} title={`Current theme: ${theme} mode`}><ThemeIcon size={15}/><span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span></button><button type="button" className="portal-menu-button" aria-label="Portal menu"><Menu/></button><span className="portal-login">Login to account <ArrowUpRight size={14}/></span></div>
    </div></header>
    <div className="portal-nav-wrap"><div className="portal-wrap"><PortalNav/></div></div>
    <main>
      <section className="portal-hero"><div className="portal-wrap portal-hero-inner">
        <div className="portal-hero-copy"><div className="portal-kicker"><span/> NATIONAL YOUTH SERVICE CORPS</div><h1>NYSC Registration<br/><em>Portal</em></h1><p>Explore registration guidance, payment information and digital resources for your National Youth Service Corps journey.</p><div className="portal-hero-actions"><button className="portal-login-button">Login to your account <ArrowRight size={16}/></button><span className="portal-secure-note"><LockKeyhole size={14}/> Secure portal access</span></div><div className="portal-demo-disclaimer"><span/> NYSC Portal Experience — Hackathon Demo</div></div>
        <div className="portal-hero-art" aria-hidden="true"><div className="portal-art-sun"/><div className="portal-art-orbit o1"/><div className="portal-art-orbit o2"/><div className="portal-art-card"><span className="art-card-mark"><GraduationCap size={20}/></span><small>YOUR SERVICE JOURNEY</small><b>Ready for<br/>what comes next?</b><span className="art-card-line"/><i>UNITY · SERVICE · PROGRESS</i></div><div className="portal-art-seal"><Landmark/><span>NYSC</span></div><div className="portal-art-footnote"><CalendarDays size={13}/> SERVING NIGERIA TOGETHER</div></div>
      </div><div className="portal-hero-wave"/></section>
      <section className="portal-registration portal-wrap"><div className="portal-section-label"><span>REGISTRATION</span><i/> BATCH C · 2026</div><div className="portal-registration-grid"><div><div className="portal-live-label"><span/> REGISTRATION WINDOW</div><h2>Take the next step<br/>in your service journey.</h2><p>Explore the registration information and service resources available to prospective corps members.</p><button className="portal-link-button">View registration information <ArrowRight size={15}/></button></div><div className="portal-window-card"><div className="window-card-head"><span className="calendar-tile"><CalendarDays/></span><span className="window-status"><i/> INFORMATION</span></div><small>REGISTRATION GUIDANCE</small><b>Batch C · 2026</b><span className="window-dates">Registration details and eligibility guidance</span><div className="window-divider"/><span className="window-bottom"><LockKeyhole size={13}/> Official registration requires the NYSC portal</span></div></div></section>
      <section className="portal-services-section"><div className="portal-wrap"><div className="portal-section-heading"><div><div className="portal-section-label"><span>PORTAL SERVICES</span></div><h2>Quick services</h2><p>Access helpful information and common service resources.</p></div><span className="portal-view-all">Explore portal services <ArrowRight size={14}/></span></div><div className="portal-service-grid">{services.map(([Icon,title,desc],i)=><article className="portal-service-card" key={title}><div className={`portal-service-icon psi-${i}`}><Icon/></div><div className="portal-service-copy"><b>{title}</b><p>{desc}</p><span>Explore service <ArrowUpRight size={13}/></span></div></article>)}</div></div></section>
      <section className="portal-how portal-wrap"><div className="portal-how-intro"><div className="portal-section-label"><span>GETTING STARTED</span></div><h2>How registration works</h2><p>Three clear steps to help you prepare for registration and camp.</p></div><div className="portal-how-steps">{[[GraduationCap,'01','Select your batch','Review the batch and eligibility information that applies to you.'],[FileCheck2,'02','Prepare your details','Read the registration guidance and gather required documents.'],[BadgeCheck,'03','Complete registration','Continue through the official portal when registration is open.']].map(([Icon,n,title,desc])=><article className="portal-how-step" key={n}><span className="portal-how-number">{n}</span><span className="portal-how-icon"><Icon/></span><b>{title}</b><p>{desc}</p></article>)}</div></section>
      <section className="portal-corper-banner"><div className="portal-wrap corper-banner-inner"><span className="portal-banner-icon"><ShieldCheck/></span><div><small>AN EXTRA LAYER FOR THE JOURNEY AHEAD</small><h2>Meet CorperSafe</h2><p>Vehicle checks, trip recording and trusted contacts for safer journeys during service.</p></div></div></section>
    </main>
    <footer className="portal-footer"><div className="portal-wrap"><div className="portal-footer-main"><div className="nysc-identity footer-identity"><span className="nysc-seal"><Landmark size={21}/><i>NYSC</i></span><span><b>NATIONAL YOUTH SERVICE CORPS</b><small>SERVICE AND UNITY</small></span></div><div className="portal-footer-links"><b>PORTAL</b><span>Services</span><span>Resources</span><span>Help centre</span><span>Privacy</span></div><div className="portal-footer-links"><b>INFORMATION</b><span>About NYSC</span><span>News and updates</span><span>Contact</span><span>FAQs</span></div><div className="portal-footer-note"><span className="portal-demo-chip"><i/> DEMO EXPERIENCE</span><p>This is a visual prototype for hackathon presentation. It is not an official NYSC service and does not connect to NYSC systems.</p></div></div><div className="portal-footer-bottom"><span>© 2026 National Youth Service Corps · Mock portal presentation</span><span>Designed for service, unity and progress</span></div></div></footer>
  </div>
}
