/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import Footer from './components/Footer';
import AtelierCardScroll from './components/AtelierCardScroll';

const HERO_LIGHT_IMAGE =
  'https://res.cloudinary.com/dalwymbky/image/upload/v1785342846/hero1_obujcd.jpg';
const HERO_DARK_IMAGE =
  'https://res.cloudinary.com/dalwymbky/image/upload/v1785342846/hero2_uohnmg.jpg';

export default function App() {
  const [isLightOn, setIsLightOn] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>('inicio');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('menu-open', nextState);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('menu-open');
    }
  };

  const handleLightChange = (on: boolean) => {
    setIsLightOn(on);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Simple active nav section detection
      const sections = ['inicio', 'projeto', 'arquitetura', 'residencias', 'natureza', 'experiencia', 'localizacao', 'galeria', 'contato'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const currentBgImage = isLightOn ? HERO_LIGHT_IMAGE : HERO_DARK_IMAGE;

  return (
    <main id="inicio">
      {/* Floating Header with Glassmorphism matching reference */}
      <header
        id="main-header"
        className={`floating-header ${isScrolled ? 'is-scrolled' : ''}`}
        aria-label="Cabeçalho do site"
      >
        <div className="header-pill-bar">
          {/* Brand Pill (Left) */}
          <div className="header-pill brand-pill">
            <a
              href="#inicio"
              id="brand-link"
              className="brand-lockup"
              aria-label="Aurea Residences - Início"
              onClick={() => {
                setActiveNav('inicio');
                closeMenu();
              }}
            >
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark-letter">A</span>
              </span>
              <span className="brand-text">
                <span className="brand-name">AUREA</span>
                <span className="brand-subtitle">RESIDENCES</span>
              </span>
            </a>
          </div>

          {/* Navigation Pill (Center) */}
          <div className="header-pill nav-center-pill">
            <nav aria-label="Navegação principal" className="main-nav-pill">
              <a
                href="#inicio"
                id="nav-inicio"
                className={`nav-pill-link ${activeNav === 'inicio' ? 'active' : ''}`}
                onClick={() => setActiveNav('inicio')}
              >
                Início
              </a>
              <a
                href="#projeto"
                id="nav-projeto"
                className={`nav-pill-link ${activeNav === 'projeto' ? 'active' : ''}`}
                onClick={() => setActiveNav('projeto')}
              >
                O Projeto
              </a>
              <a
                href="#arquitetura"
                id="nav-arquitetura"
                className={`nav-pill-link ${activeNav === 'arquitetura' ? 'active' : ''}`}
                onClick={() => setActiveNav('arquitetura')}
              >
                Arquitetura
              </a>
              <a
                href="#residencias"
                id="nav-residencias"
                className={`nav-pill-link ${activeNav === 'residencias' ? 'active' : ''}`}
                onClick={() => setActiveNav('residencias')}
              >
                Residências
              </a>
              <a
                href="#localizacao"
                id="nav-localizacao"
                className={`nav-pill-link ${activeNav === 'localizacao' ? 'active' : ''}`}
                onClick={() => setActiveNav('localizacao')}
              >
                Localização
              </a>
            </nav>
          </div>

          {/* Actions Pill (Right) */}
          <div className="header-pill action-pill">
            <a
              href="#galeria"
              id="nav-galeria-action"
              className="nav-action-text"
              onClick={() => setActiveNav('galeria')}
            >
              Galeria
            </a>
            <a
              href="#contato"
              id="nav-contato-cta"
              className="nav-action-button"
              onClick={() => setActiveNav('contato')}
            >
              Contato
            </a>

            <button
              type="button"
              id="menu-toggle-btn"
              className="menu-btn"
              aria-label="Abrir menu"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span className="menu-stroke" />
              <span className="menu-stroke" />
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        <div
          id="mobile-nav-menu"
          className={`mobile-menu-drawer ${isMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <nav aria-label="Menu móvel" className="mobile-nav-list">
            <a
              href="#inicio"
              className={`mobile-nav-link ${activeNav === 'inicio' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('inicio');
                closeMenu();
              }}
            >
              Início
            </a>
            <a
              href="#projeto"
              className={`mobile-nav-link ${activeNav === 'projeto' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('projeto');
                closeMenu();
              }}
            >
              O Projeto
            </a>
            <a
              href="#arquitetura"
              className={`mobile-nav-link ${activeNav === 'arquitetura' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('arquitetura');
                closeMenu();
              }}
            >
              Arquitetura
            </a>
            <a
              href="#residencias"
              className={`mobile-nav-link ${activeNav === 'residencias' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('residencias');
                closeMenu();
              }}
            >
              Residências
            </a>
            <a
              href="#natureza"
              className={`mobile-nav-link ${activeNav === 'natureza' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('natureza');
                closeMenu();
              }}
            >
              Natureza
            </a>
            <a
              href="#experiencia"
              className={`mobile-nav-link ${activeNav === 'experiencia' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('experiencia');
                closeMenu();
              }}
            >
              Experiência
            </a>
            <a
              href="#localizacao"
              className={`mobile-nav-link ${activeNav === 'localizacao' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('localizacao');
                closeMenu();
              }}
            >
              Localização
            </a>
            <a
              href="#galeria"
              className={`mobile-nav-link ${activeNav === 'galeria' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('galeria');
                closeMenu();
              }}
            >
              Galeria
            </a>
            <a
              href="#contato"
              className="mobile-nav-cta-btn"
              onClick={() => {
                setActiveNav('contato');
                closeMenu();
              }}
            >
              Contato & Agendamento
            </a>
          </nav>
        </div>
      </header>

      {/* SEÇÃO 1: HERO */}
      <section
        id="hero"
        className="hero-container"
        aria-labelledby="hero-title"
        style={{ backgroundImage: `url('${currentBgImage}')` }}
      >

        {/* Hero typography overlay (pointer-events: none) */}
        <div className="hero-content-layer">
          <h1 id="hero-title" className="hero-headline">
            Seu espaço para
            <br />
            <em className="hero-headline-serif">viver o essencial.</em>
          </h1>

          <p id="hero-subheadline-desc" className="hero-subheadline">
            Residências contemporâneas desenhadas para aproximar você da
            natureza, do conforto e de tudo o que realmente importa.
          </p>
        </div>

        {/* Footer with lighting selector */}
        <footer id="main-footer" className="hero-footer">
          <div
            id="lighting-controls"
            className="bg-selector"
            role="group"
            aria-label="Controle de iluminação"
          >
            <button
              type="button"
              id="bg-btn-on"
              className={`bg-selector-btn ${isLightOn ? 'active' : ''}`}
              aria-pressed={isLightOn ? 'true' : 'false'}
              onClick={() => handleLightChange(true)}
            >
              ON
            </button>
            <button
              type="button"
              id="bg-btn-off"
              className={`bg-selector-btn ${!isLightOn ? 'active' : ''}`}
              aria-pressed={!isLightOn ? 'true' : 'false'}
              onClick={() => handleLightChange(false)}
            >
              OFF
            </button>
          </div>
        </footer>
      </section>

      {/* SEÇÃO 2: O PROJETO */}
      <section
        id="projeto"
        className="site-section"
        aria-labelledby="projeto-title"
      >
        <div className="section-container">
          <div className="projeto-grid reveal-item">
            <div>
              <span className="section-eyebrow">O PROJETO</span>
              <h2 id="projeto-title" className="section-title-large">
                O extraordinário está na forma como você vive.
              </h2>
            </div>
            <div>
              <p className="section-text">
                Aurea Residences nasce do encontro entre arquitetura contemporânea, natureza e bem-estar. Um projeto concebido para quem valoriza o silêncio, a beleza dos detalhes e a liberdade de viver no próprio ritmo.
              </p>
              <p className="section-text">
                Mais do que um lugar para morar, um espaço para estar verdadeiramente presente.
              </p>
              <a href="#contato" id="cta-conheca-aurea" className="section-cta-btn">
                CONHEÇA O AUREA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: FRASE-MANIFESTO */}
      <section
        id="manifesto"
        className="site-section manifesto-section"
        aria-labelledby="manifesto-title"
      >
        <div className="section-container">
          <div className="manifesto-wrapper reveal-item">
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1920&q=80"
              alt="Paisagem natural com arquitetura contemporânea em meio à floresta"
              className="manifesto-bg-image"
              loading="lazy"
            />
            <div className="manifesto-overlay" aria-hidden="true" />
            <div className="manifesto-content">
              <h2 id="manifesto-title" className="manifesto-title">
                <span>Menos excessos.</span>
                <em>Mais espaço para o essencial.</em>
              </h2>
              <p className="manifesto-support">
                Porque viver bem não significa ter mais. Significa escolher melhor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: COLEÇÃO ATELIER NORTE - SCROLL STICKY CARDS EM CAMADAS */}
      <section id="atelier-colecao" aria-label="Coleção Atelier Norte">
        <AtelierCardScroll />
      </section>

      {/* SEÇÃO 5: ARQUITETURA */}
      <section
        id="arquitetura"
        className="site-section"
        aria-labelledby="arquitetura-title"
      >
        <div className="section-container">
          <div className="arquitetura-grid reveal-item">
            <div className="arquitetura-text-col">
              <span className="section-eyebrow">ARQUITETURA</span>
              <h2 id="arquitetura-title" className="section-title-large">
                Desenhado para pertencer à paisagem.
              </h2>
              <p className="section-text">
                No Aurea, a arquitetura não se impõe à natureza. Ela se aproxima, acompanha e cria novas formas de contemplá-la.
              </p>
              <p className="section-text">
                Linhas contemporâneas, materiais acolhedores e amplas conexões entre interior e exterior compõem residências que equilibram elegância, conforto e simplicidade.
              </p>
              <p className="section-text">
                Cada escolha contribui para uma experiência mais fluida, sensorial e atemporal.
              </p>

              <ul className="arquitetura-highlights" aria-label="Destaques de arquitetura">
                <li className="arquitetura-highlight-card">
                  <span className="arquitetura-highlight-num">01</span>
                  <span className="arquitetura-highlight-label">Linhas contemporâneas</span>
                </li>
                <li className="arquitetura-highlight-card">
                  <span className="arquitetura-highlight-num">02</span>
                  <span className="arquitetura-highlight-label">Integração com a natureza</span>
                </li>
                <li className="arquitetura-highlight-card">
                  <span className="arquitetura-highlight-num">03</span>
                  <span className="arquitetura-highlight-label">Ambientes amplos e acolhedores</span>
                </li>
                <li className="arquitetura-highlight-card">
                  <span className="arquitetura-highlight-num">04</span>
                  <span className="arquitetura-highlight-label">Estética natural e atemporal</span>
                </li>
              </ul>
            </div>

            <div className="arquitetura-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                alt="Fachada arquitetônica contemporânea com madeira, pedra e amplas aberturas de vidro"
                className="arquitetura-img"
                loading="lazy"
              />
              <span className="arquitetura-badge" aria-hidden="true">
                Arquitetura & Natureza
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: AS RESIDÊNCIAS */}
      <section
        id="residencias"
        className="site-section"
        aria-labelledby="residencias-title"
      >
        <div className="section-container">
          <div className="residencias-grid reveal-item">
            <div>
              <span className="section-eyebrow">AS RESIDÊNCIAS</span>
              <h2 id="residencias-title" className="section-title-large">
                Por dentro, tudo convida a ficar.
              </h2>
              <p className="section-text">
                Ambientes concebidos para acompanhar diferentes momentos da vida. Espaços que acolhem encontros, preservam a intimidade e transformam a paisagem em parte da rotina.
              </p>
              <p className="section-text">
                A luz natural, as texturas e a continuidade entre os ambientes criam uma atmosfera de conforto sereno — aquela sensação de estar exatamente onde deveria estar.
              </p>
              <a href="#contato" id="cta-descubra-residencias" className="section-cta-btn">
                DESCUBRA AS RESIDÊNCIAS
              </a>
            </div>

            <div className="residencias-gallery-stack" aria-label="Galeria dos ambientes residenciais">
              <div className="residencias-card-large">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
                  alt="Amplo living residencial com iluminação natural e vista para a natureza"
                  className="residencias-img"
                  loading="lazy"
                />
                <span className="residencias-card-tag" aria-hidden="true">
                  Living Integrado
                </span>
              </div>
              <div className="residencias-card-small">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
                  alt="Espaço intimista com texturas naturais em madeira e pedra"
                  className="residencias-img"
                  loading="lazy"
                />
                <span className="residencias-card-tag" aria-hidden="true">
                  Conforto & Textura
                </span>
              </div>
              <div className="residencias-card-small">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
                  alt="Conexão contínua entre ambientes internos e vegetação externa"
                  className="residencias-img"
                  loading="lazy"
                />
                <span className="residencias-card-tag" aria-hidden="true">
                  Integração Visual
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: NATUREZA */}
      <section
        id="natureza"
        className="site-section natureza-section"
        aria-labelledby="natureza-title"
      >
        <div className="section-container">
          <div className="natureza-content reveal-item">
            <span className="section-eyebrow">NATUREZA PRESENTE</span>
            <h2 id="natureza-title" className="section-title-large">
              A natureza não está apenas ao redor.
              <br />
              <em>Ela faz parte da experiência.</em>
            </h2>
            <p className="section-text">
              Abrir as janelas, respirar com calma e perceber a mudança da luz ao longo do dia.
            </p>
            <p className="section-text">
              No Aurea, a proximidade com a natureza ressignifica os pequenos momentos. Ela inspira uma rotina mais leve, silenciosa e conectada com aquilo que realmente importa.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: EXPERIÊNCIA */}
      <section
        id="experiencia"
        className="site-section"
        aria-labelledby="experiencia-title"
      >
        <div className="section-container">
          <div className="reveal-item">
            <div className="experiencia-header-wrap">
              <span className="section-eyebrow">UM NOVO RITMO</span>
              <h2 id="experiencia-title" className="section-title-large">
                Tempo para viver.
                <br />
                <em>Espaço para sentir.</em>
              </h2>
              <p className="section-text">
                O Aurea foi pensado para tornar a vida mais simples e, ao mesmo tempo, mais especial.
              </p>
              <p className="section-text">
                Um cenário que favorece pausas, encontros e momentos de contemplação. Onde conforto e privacidade convivem com a liberdade de viver cada dia de uma maneira diferente.
              </p>
            </div>

            <div className="experiencia-cards-grid" role="list" aria-label="Pilares da experiência Aurea">
              <div className="experiencia-card" role="listitem">
                <div className="experiencia-card-media">
                  <img
                    src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
                    alt="Ambiente sereno com ampla iluminação natural"
                    className="experiencia-card-img"
                    loading="lazy"
                  />
                  <span className="experiencia-card-num" aria-hidden="true">
                    01
                  </span>
                </div>
                <div className="experiencia-card-body">
                  <p className="experiencia-quote">
                    Para desacelerar sem se desconectar.
                  </p>
                </div>
              </div>

              <div className="experiencia-card" role="listitem">
                <div className="experiencia-card-media">
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                    alt="Área social acolhedora integrada para receber convidados"
                    className="experiencia-card-img"
                    loading="lazy"
                  />
                  <span className="experiencia-card-num" aria-hidden="true">
                    02
                  </span>
                </div>
                <div className="experiencia-card-body">
                  <p className="experiencia-quote">
                    Para receber sem perder a intimidade.
                  </p>
                </div>
              </div>

              <div className="experiencia-card" role="listitem">
                <div className="experiencia-card-media">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                    alt="Terraço contemporâneo integrado à paisagem natural"
                    className="experiencia-card-img"
                    loading="lazy"
                  />
                  <span className="experiencia-card-num" aria-hidden="true">
                    03
                  </span>
                </div>
                <div className="experiencia-card-body">
                  <p className="experiencia-quote">
                    Para transformar o cotidiano em experiência.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 8: LOCALIZAÇÃO */}
      <section
        id="localizacao"
        className="site-section"
        aria-labelledby="localizacao-title"
      >
        <div className="section-container">
          <div className="reveal-item">
            <span className="section-eyebrow">LOCALIZAÇÃO</span>
            <h2 id="localizacao-title" className="section-title-large">
              Perto do que move você.
              <br />
              <em>Longe do que interrompe.</em>
            </h2>
            <p className="section-text">
              Localizado em <strong className="localizacao-highlight">[CIDADE/REGIÃO]</strong>, o Aurea combina a tranquilidade de um refúgio cercado pela natureza com a conveniência de estar conectado aos principais destinos da região.
            </p>
            <p className="section-text">
              Uma localização escolhida para proporcionar mais liberdade, privacidade e qualidade de vida.
            </p>
            <a href="#contato" id="cta-explorar-localizacao" className="section-cta-btn">
              EXPLORAR A LOCALIZAÇÃO
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 9: GALERIA */}
      <section
        id="galeria"
        className="site-section"
        aria-labelledby="galeria-title"
      >
        <div className="section-container">
          <div className="reveal-item">
            <span className="section-eyebrow">PERSPECTIVAS</span>
            <h2 id="galeria-title" className="section-title-large">
              Conheça o Aurea por novos ângulos.
            </h2>
            <p className="section-text">
              Explore os espaços, observe os detalhes e descubra como arquitetura e natureza se encontram em cada perspectiva.
            </p>

            <div className="galeria-preview-grid">
              <div className="galeria-card">
                <img
                  src={HERO_LIGHT_IMAGE}
                  alt="Aurea Residences - Residência iluminada ao entardecer"
                  className="galeria-img"
                  loading="lazy"
                />
              </div>
              <div className="galeria-card">
                <img
                  src={HERO_DARK_IMAGE}
                  alt="Aurea Residences - Residência em atmosfera noturna e discreta"
                  className="galeria-img"
                  loading="lazy"
                />
              </div>
            </div>

            <a href="#contato" id="cta-ver-galeria" className="section-cta-btn">
              VER GALERIA COMPLETA
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 10: CONTATO */}
      <section
        id="contato"
        className="site-section"
        aria-labelledby="contato-title"
      >
        <div className="section-container">
          <div className="contato-grid reveal-item">
            <div>
              <span className="section-eyebrow">VIVA O EXTRAORDINÁRIO</span>
              <h2 id="contato-title" className="section-title-large">
                Seu próximo capítulo pode começar aqui.
              </h2>
              <p className="section-text">
                Entre em contato e receba uma apresentação completa do Aurea Residences. Nossa equipe está pronta para ajudar você a descobrir todos os detalhes do projeto.
              </p>
            </div>

            <div>
              {formSubmitted ? (
                <div className="form-success-message" role="status" aria-live="polite">
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    Obrigado pelo seu interesse no Aurea Residences.
                  </p>
                  <p style={{ margin: '8px 0 0 0', opacity: 0.8, fontSize: '13px' }}>
                    Recebemos seus dados e nossa equipe entrará em contato em breve com a apresentação completa.
                  </p>
                </div>
              ) : (
                <form
                  id="lead-form"
                  className="contato-form"
                  onSubmit={handleFormSubmit}
                  noValidate={false}
                >
                  <div className="form-group">
                    <label htmlFor="form-nome" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="form-nome"
                      name="nome"
                      required
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-telefone" className="form-label">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="form-telefone"
                      name="telefone"
                      required
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) =>
                        setFormData({ ...formData, telefone: e.target.value })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-mensagem" className="form-label">
                      Como podemos ajudar?
                    </label>
                    <textarea
                      id="form-mensagem"
                      name="mensagem"
                      rows={3}
                      placeholder="Gostaria de receber mais detalhes sobre..."
                      value={formData.mensagem}
                      onChange={(e) =>
                        setFormData({ ...formData, mensagem: e.target.value })
                      }
                      className="form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    id="form-submit-btn"
                    className="section-cta-btn form-submit-btn"
                  >
                    QUERO CONHECER O AUREA
                  </button>

                  <p className="form-privacy">
                    Ao enviar seus dados, você concorda em receber informações sobre o Aurea Residences.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO RODAPÉ COM LAYERED CARD E TEXTO GLASS SVG */}
      <Footer />
    </main>
  );
}


