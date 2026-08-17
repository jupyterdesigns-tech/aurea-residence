import { motion } from 'motion/react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

export function LogoIcon() {
  return (
    <div
      className="w-8 h-8 rounded-[8px] flex items-center justify-center shadow-sm"
      style={{ backgroundColor: 'var(--color-green-primary)' }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 20C4 20 4 14 10 10C16 6 20 4 20 4C20 4 18 8 14 14C10 20 4 20 4 20Z"
          fill="white"
        />
        <path
          d="M4 20L10 14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function FooterCard() {
  const socials = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      {/* Outer Body with Layered Effect */}
      <div className="bg-[#E9EBEE] rounded-[36px] md:rounded-[48px] border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
        {/* Inner White Box */}
        <div className="bg-white rounded-[28px] md:rounded-[40px] m-2 md:m-3 shadow-sm border border-slate-100">
          <div className="p-8 md:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand Info Column */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div className="flex items-center gap-2.5">
                <LogoIcon />
                <span
                  className="text-[24px] font-bold tracking-[-0.03em]"
                  style={{
                    color: 'var(--color-green-primary)',
                    fontFamily: 'var(--font-title)',
                  }}
                >
                  Aurea Residences
                </span>
              </div>

              <p className="text-[#64748B] leading-relaxed text-[15px] md:text-[16px] font-normal max-w-[320px]">
                Residências contemporâneas desenhadas para aproximar você da natureza, do conforto e do essencial.
              </p>

              {/* Socials Group */}
              <div className="flex items-center gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Acessar ${social.name}`}
                      className="w-[44px] h-[44px] flex items-center justify-center rounded-xl border border-slate-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-all active:scale-95 group"
                    >
                      <Icon className="w-5 h-5 text-slate-800 group-hover:text-[#153824] transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-[14px] font-medium text-[#94A3B8] uppercase tracking-wider">
                Empreendimento
              </h4>
              <ul className="space-y-3.5 list-none p-0 m-0">
                <li>
                  <a
                    href="#projeto"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    O Projeto
                  </a>
                </li>
                <li>
                  <a
                    href="#arquitetura"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Arquitetura
                  </a>
                </li>
                <li>
                  <a
                    href="#residencias"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Residências
                  </a>
                </li>
                <li>
                  <a
                    href="#galeria"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Perspectivas
                  </a>
                </li>
              </ul>
            </div>

            {/* Science / Conceito Column */}
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-[14px] font-medium text-[#94A3B8] uppercase tracking-wider">
                Conceito
              </h4>
              <ul className="space-y-3.5 list-none p-0 m-0">
                <li>
                  <a
                    href="#natureza"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Natureza Integrada
                  </a>
                </li>
                <li>
                  <a
                    href="#experiencia"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Experiência Aurea
                  </a>
                </li>
                <li>
                  <a
                    href="#localizacao"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Localização Nobre
                  </a>
                </li>
                <li>
                  <a
                    href="#projeto"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Sustentabilidade
                  </a>
                </li>
              </ul>
            </div>

            {/* Company / Atendimento Column */}
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-[14px] font-medium text-[#94A3B8] uppercase tracking-wider">
                Atendimento
              </h4>
              <ul className="space-y-3.5 list-none p-0 m-0">
                <li>
                  <a
                    href="#contato"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Agendar Visita
                  </a>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Consultoria VIP
                  </a>
                </li>
                <li>
                  <a
                    href="#inicio"
                    className="text-[15px] font-medium text-[#1E293B] hover:text-[#153824] transition-colors"
                  >
                    Apresentação
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar (Inside Outer Wrap, OUTSIDE of White Box) */}
        <div className="px-6 sm:px-12 md:px-16 lg:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[14px] md:text-[15px]">
          <p className="text-[#64748B] font-medium m-0 text-center md:text-left">
            © 2026 Aurea Residences. Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-[#64748B] font-medium items-center">
            <a
              href="#projeto"
              className="hover:text-[#1E293B] transition-colors text-decoration-none"
            >
              Memorial Descritivo
            </a>
            <div className="w-[1px] h-4 bg-slate-300 hidden sm:block" />
            <a
              href="#contato"
              className="hover:text-[#1E293B] transition-colors text-decoration-none"
            >
              Política de Privacidade
            </a>
            <div className="w-[1px] h-4 bg-slate-300 hidden sm:block" />
            <a
              href="#contato"
              className="hover:text-[#1E293B] transition-colors text-decoration-none"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GlassText() {
  return (
    <div className="relative w-full flex items-center justify-center select-none pt-0 overflow-hidden pointer-events-none mt-2 md:mt-4">
      {/* Invisible SVG filter definition */}
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id="glass-effect"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="10"
              floodColor="#153824"
              floodOpacity="0.22"
              result="outer-shadow"
            />
            <feComponentTransfer in="SourceAlpha" result="alpha">
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
            <feOffset in="alpha" dx="0" dy="3" result="offset-white" />
            <feGaussianBlur
              in="offset-white"
              stdDeviation="3"
              result="blur-white"
            />
            <feComposite
              in="alpha"
              in2="blur-white"
              operator="out"
              result="inner-white-mask"
            />
            <feFlood
              floodColor="#ffffff"
              floodOpacity="0.55"
              result="white-fill"
            />
            <feComposite
              in="white-fill"
              in2="inner-white-mask"
              operator="in"
              result="inner-white-final"
            />
            <feGaussianBlur in="alpha" stdDeviation="8" result="blur-black" />
            <feComposite
              in="alpha"
              in2="blur-black"
              operator="out"
              result="inner-black-mask"
            />
            <feFlood
              floodColor="#0b2014"
              floodOpacity="0.35"
              result="black-fill"
            />
            <feComposite
              in="black-fill"
              in2="inner-black-mask"
              operator="in"
              result="inner-black-final"
            />
            <feMerge>
              <feMergeNode in="outer-shadow" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="inner-white-final" />
              <feMergeNode in="inner-black-final" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Motion Element with Liquid Glass Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center w-full"
      >
        <h1
          className="text-[min(25vw,380px)] font-bold tracking-normal leading-none select-none px-4 text-center font-editorial italic drop-shadow-sm"
          style={{
            color: 'var(--color-green-primary)',
            filter: 'url(#glass-effect)',
          }}
        >
          aurea
        </h1>
      </motion.div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="site-footer" className="w-full flex flex-col items-center gap-0 pt-16 md:pt-24 pb-8 bg-[#F0F1F3]/50 overflow-hidden">
      <FooterCard />
      <GlassText />
    </footer>
  );
}
