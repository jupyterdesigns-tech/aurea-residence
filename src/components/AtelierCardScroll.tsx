import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import residenceBosque from '../assets/images/residence_bosque_1786933081056.jpg';
import residenceHorizonte from '../assets/images/residence_horizonte_1786933096712.jpg';
import residenceCristal from '../assets/images/residence_cristal_1786933109593.jpg';

gsap.registerPlugin(ScrollTrigger);

const CARD_IMAGE_1 = residenceBosque;
const CARD_IMAGE_2 = residenceHorizonte;
const CARD_IMAGE_3 = residenceCristal;

export default function AtelierCardScroll() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const scrollShell = root.closest('.scroll-shell') as HTMLElement;
    if (!scrollShell) return;

    const cardContainers = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll('.card-container')
    );
    const cardFaces = cardContainers.map(
      (card) => card.querySelector('.card-3d') as HTMLElement
    );
    const progressBars = root.querySelectorAll<HTMLElement>('.ui-progress i');

    let masterTimeline: gsap.core.Timeline | null = null;

    function splitText(node: HTMLElement) {
      if (node.dataset.splitDone) return;
      const text = node.textContent || '';
      node.textContent = '';
      for (const char of text) {
        const span = document.createElement('span');
        span.className = 'text-char';
        span.textContent = char === ' ' ? '\u00a0' : char;
        node.appendChild(span);
      }
      node.dataset.splitDone = 'true';
    }

    const splitTargets = root.querySelectorAll<HTMLElement>(
      '.headline-foreground [data-split-text]'
    );
    splitTargets.forEach(splitText);
    const foregroundChars = root.querySelectorAll(
      '.headline-foreground .text-char'
    );

    function updateProgress() {
      const max = window.innerWidth * 0.6 || 1;
      const values = cardContainers.map((card) => {
        const distance = Math.abs(Number(gsap.getProperty(card, 'x')));
        return Math.max(0, Math.min(12, 12 - (distance / max) * 12));
      });
      if (progressBars[0]) {
        gsap.set(progressBars[0], {
          width: 3 + values[0] - values[1],
          opacity: 0.5 + values[0] / 24 - values[1] / 24,
        });
      }
      if (progressBars[1]) {
        gsap.set(progressBars[1], {
          width: 3 + values[1] - values[2],
          opacity: 0.5 + values[1] / 24 - values[2] / 24,
        });
      }
      if (progressBars[2]) {
        gsap.set(progressBars[2], {
          width: 3 + values[2],
          opacity: 0.5 + values[2] / 24,
        });
      }
    }

    function setupAnimation() {
      masterTimeline?.scrollTrigger?.kill();
      masterTimeline?.kill();

      const xStart = [
        window.innerWidth * 0.6,
        window.innerWidth * -0.6,
        window.innerWidth * 0.6,
      ];
      const zRotation = [-3.5, 9.5, -9.6];
      const rotationY = [90, -90, 90];
      const zStart = Math.max(500, 500 / (1440 / window.innerWidth));
      const perspective = Math.max(1000, 1000 / (1440 / window.innerWidth));

      cardContainers.forEach((card) => {
        card.style.perspective = `${perspective}px`;
      });

      gsap.set(cardContainers, {
        xPercent: -50,
        yPercent: -50,
        x: (i: number) => xStart[i],
        rotation: (i: number) => zRotation[i],
        autoAlpha: 0,
        transformOrigin: '50% 50%',
      });

      gsap.set(cardFaces, {
        rotationY: (i: number) => rotationY[i],
        z: zStart,
        transformOrigin: '50% 50%',
      });

      gsap.set(progressBars, { width: 3, opacity: 0.5 });

      masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollShell,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false,
          invalidateOnRefresh: true,
          onUpdate: updateProgress,
        },
      });

      masterTimeline
        .to(
          cardContainers[0],
          { x: 0, autoAlpha: 1, duration: 1.35, ease: 'power2.inOut' },
          0
        )
        .to(
          cardFaces[0],
          { rotationY: 0, z: 0, duration: 1.35, ease: 'power2.inOut' },
          0
        )
        .to(
          cardContainers[1],
          { x: 0, autoAlpha: 1, duration: 1.35, ease: 'power2.inOut' },
          0.85
        )
        .to(
          cardFaces[1],
          { rotationY: 0, z: 0, duration: 1.35, ease: 'power2.inOut' },
          0.85
        )
        .to(
          cardContainers[2],
          { x: 0, autoAlpha: 1, duration: 1.35, ease: 'power2.inOut' },
          1.7
        )
        .to(
          cardFaces[2],
          { rotationY: 0, z: 0, duration: 1.35, ease: 'power2.inOut' },
          1.7
        )
        .to(
          foregroundChars,
          { opacity: 0, duration: 1.6, stagger: 0.05, ease: 'power2.inOut' },
          0.3
        );

      ScrollTrigger.refresh();
    }

    // Run setup after fonts and images are ready
    setupAnimation();

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setupAnimation();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    // Refresh once all images are loaded
    const images = root.querySelectorAll('img');
    let loadedCount = 0;
    const onImgLoad = () => {
      loadedCount++;
      if (loadedCount >= images.length) {
        ScrollTrigger.refresh();
      }
    };
    images.forEach((img) => {
      if (img.complete) {
        onImgLoad();
      } else {
        img.addEventListener('load', onImgLoad);
        img.addEventListener('error', onImgLoad);
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      masterTimeline?.scrollTrigger?.kill();
      masterTimeline?.kill();
    };
  }, []);

  return (
    <main className="scroll-shell">
      <section
        ref={rootRef}
        className="sticky-stage"
        data-effect="atelier-card-scroll"
        role="region"
        aria-labelledby="atelier-heading"
      >
        <h2 className="header-text" id="atelier-heading">
          Coleção Atelier Norte
        </h2>

        <div className="headline headline-background" aria-hidden="true">
          <p>Escolhas que</p>
          <p>marcam e</p>
          <p>duram.</p>
        </div>

        <div className="headline headline-foreground" aria-hidden="true">
          <p data-split-text>Escolhas que</p>
          <p data-split-text>marcam e</p>
          <p data-split-text>duram.</p>
        </div>

        <div className="cards" aria-hidden="true">
          <article className="card-container card-container-1">
            <div className="card-3d">
              <div className="card-frame">
                <img
                  className="card-image card-image-1"
                  src={CARD_IMAGE_1}
                  alt="Residência contemporânea - Curadoria"
                />
                <div className="card-copy">
                  <p className="card-copy-title">Curadoria</p>
                  <p className="card-copy-description">
                    Peças escolhidas para apresentar uma linha autoral com
                    presença, clareza e continuidade.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="card-container card-container-2">
            <div className="card-3d">
              <div className="card-frame">
                <img
                  className="card-image card-image-2"
                  src={CARD_IMAGE_2}
                  alt="Residência contemporânea - Processo"
                />
                <div className="card-copy">
                  <p className="card-copy-title">Processo</p>
                  <p className="card-copy-description">
                    Cada item nasce de uma seleção cuidadosa, pensada para unir
                    função, ritmo e identidade.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="card-container card-container-3">
            <div className="card-3d">
              <div className="card-frame">
                <img
                  className="card-image card-image-3"
                  src={CARD_IMAGE_3}
                  alt="Residência contemporânea - Resultado"
                />
                <div className="card-copy">
                  <p className="card-copy-title">Resultado</p>
                  <p className="card-copy-description">
                    O conjunto final valoriza o ambiente e cria uma experiência
                    visual consistente em cada detalhe.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="ui-progress" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </section>
    </main>
  );
}
