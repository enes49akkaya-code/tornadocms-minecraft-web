'use client'

import { useEffect, useState } from 'react'

const serverIp = 'play.tornadocms.com'
const discordUrl = 'https://discord.gg/xxxxx'

const news = [
  { title: 'TornadoCMS sunucumuza hoş geldiniz', date: '15.09.2026', views: 128, excerpt: 'Sunucumuzdaki son gelişmeleri ve duyuruları buradan takip edebilirsiniz.' },
  { title: 'Yeni sezon başladı', date: '12.09.2026', views: 96, excerpt: 'Yeni etkinlikler, ödüller ve maceralar için sunucumuza katılın.' },
  { title: 'Topluluk etkinlikleri', date: '08.09.2026', views: 74, excerpt: 'Haftalık topluluk etkinliklerinde yerinizi almayı unutmayın.' },
]

const players = ['TornadoPlayer', 'SteveCraft', 'SkyWalker']

export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const [online, setOnline] = useState(0)

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/2/${serverIp}`)
      .then((response) => response.json())
      .then((data) => setOnline(data.online ? data.players?.online ?? 0 : 0))
      .catch(() => setOnline(0))
  }, [])

  async function copyIp() {
    await navigator.clipboard.writeText(serverIp)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main>
      <header className="header fixed-header">
        <nav className="nav">
          <a href="#top" className="logo"><strong className="nav-logo" style={{ color: '#ffd700', fontSize: '1.3rem' }}>TORNADO<span style={{ color: '#fff' }}>CMS</span></strong></a>
          <div className="nav-links">
            <a href="#top" className="active"><i className="fas fa-home" /> ANASAYFA</a>
            <a href="#market"><i className="fas fa-shopping-cart" /> MARKET</a>
            <a href="#news"><i className="fas fa-newspaper" /> HABERLER</a>
            <a href={discordUrl} target="_blank" rel="noreferrer"><i className="fab fa-discord" /> DISCORD</a>
          </div>
        </nav>
      </header>

      <section id="top" className="hero-container">
        <div className="hero-content">
          <div className="hero-logo"><h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#ffd700', textShadow: '0 0 30px rgba(255,215,0,.3)' }}>TORNADO<span style={{ color: '#fff' }}>CMS</span></h1></div>
          <p style={{ color: 'rgba(255,255,255,.75)', marginBottom: '1.5rem' }}>Minecraft sunucumuzda maceraya katıl</p>
          <div className="ip-container">
            <button className={`server-ip ${copied ? 'copied' : ''}`} onClick={copyIp} aria-label="Sunucu IP adresini kopyala">
              <span className="ip-box"><span className="server-ip-text">{serverIp}</span><i className={`fas ${copied ? 'fa-check' : 'fa-copy'} copy-icon`} /></span>
            </button>
            <a href={discordUrl} target="_blank" rel="noreferrer" className="discord-btn" aria-label="Discord sunucusuna katıl"><i className="fab fa-discord" /></a>
          </div>
          <div style={{ marginTop: '1rem', color: '#9ca3af' }}><i className="fas fa-circle" style={{ color: online > 0 ? '#22c55e' : '#ef4444', fontSize: '.65rem', marginRight: '.5rem' }} />{online} oyuncu çevrimiçi</div>
        </div>
      </section>

      <section id="news" className="content-section"><div className="content-container">
        <div className="blog-section"><h2 className="section-title"><i className="fas fa-newspaper" /> Son Haberler</h2><div className="blog-cards">
          {news.map((item) => <article className="blog-card" key={item.title}><div className="blog-image"><span className="blog-category">Duyuru</span><img src="/assets/images/hero-bg.jpg" alt="Minecraft sunucu görseli" /></div><div className="blog-content"><div className="blog-meta"><span><i className="far fa-calendar" /> {item.date}</span><span><i className="far fa-eye" /> {item.views} görüntülenme</span></div><h3 className="blog-title">{item.title}</h3><p className="blog-excerpt">{item.excerpt}</p><div className="blog-footer"><span className="author-name">TornadoCMS Ekibi</span><a href="#market" className="read-more">Devamını Oku <i className="fas fa-arrow-right" /></a></div></div></article>)}
        </div></div>
        <aside className="sidebar-content"><div className="latest-users"><h2 className="section-title"><i className="fas fa-users" /> Son Kayıt Olanlar</h2><div className="user-cards">{players.map((player, index) => <div className="user-card" key={player}><div className="user-avatar"><img src={`https://mc-heads.net/avatar/${player}`} alt={`${player} avatarı`} /></div><div className="user-info"><h3 className="user-name">{player}</h3><span className="join-date"><i className="far fa-clock" /> {15 - index}.09.2026</span></div></div>)}</div></div></aside>
      </div></section>
    </main>
  )
}
