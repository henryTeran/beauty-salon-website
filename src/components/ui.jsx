import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

export const ease = [0.19, 1, 0.22, 1];

/** Apparition douce au scroll */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Titre révélé mot par mot (le texte reste lisible par les moteurs) */
export function SplitText({ text, className = '', delay = 0, as: Tag = 'span', onLoad = false }) {
  const words = text.split(' ');
  const anim = onLoad ? { animate: { y: 0 } } : { whileInView: { y: 0 }, viewport: { once: true } };
  return (
    <Tag className={className}>
      {words.flatMap((w, i) => [
        i ? ' ' : null,
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            {...anim}
            transition={{ duration: 1.2, delay: delay + i * 0.07, ease }}
          >
            {w}
          </motion.span>
        </span>,
      ])}
    </Tag>
  );
}

/** Bouton « magnétique » qui suit légèrement le curseur */
export function Magnetic({ children, strength = 0.25, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });
  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span ref={ref} className={`inline-block ${className}`} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  );
}

/** Image avec léger parallaxe et dévoilement */
export function ParallaxImage({ image, className = '', sizes = '(min-width: 1024px) 45vw, 100vw', priority = false, amount = 40 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const srcSet = image.widths.map((w) => `${image.src}-${w}.webp ${w}w`).join(', ');
  const w = image.widths[image.widths.length - 1];
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(12% 12% 12% 12% round 999px 999px 0 0)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)', opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.6, ease }}
    >
      <motion.img
        style={{ y, scale: 1.18 }}
        src={`${image.src}-${image.widths[0]}.webp`}
        srcSet={srcSet}
        sizes={sizes}
        width={w}
        height={Math.round(w * image.ratio)}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

/** Rameau doré dessiné au trait (rappel de la brochure) */
export function Leaf({ className = '', delay = 0 }) {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
  };
  const leaves = [
    'M38 150 C20 128 22 104 40 92 C52 110 52 132 38 150Z',
    'M62 118 C58 92 72 72 94 68 C96 92 84 110 62 118Z',
    'M86 86 C92 62 112 48 134 52 C128 76 110 88 86 86Z',
    'M118 58 C130 38 152 30 170 38 C158 58 138 64 118 58Z',
    'M56 124 C34 118 22 100 24 80 C44 86 56 104 56 124Z',
    'M82 92 C62 80 56 60 64 42 C82 54 88 74 82 92Z',
  ];
  return (
    <svg viewBox="0 0 190 200" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M20 190 C40 150 70 110 110 78 C135 58 158 44 180 34"
        stroke="#A9814F"
        strokeWidth="1.2"
        strokeLinecap="round"
        {...draw}
        transition={{ duration: 2.2, delay, ease }}
      />
      {leaves.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#A9814F"
          strokeWidth="1"
          fill="rgba(216,188,150,.18)"
          {...draw}
          transition={{ duration: 1.6, delay: delay + 0.5 + i * 0.15, ease }}
        />
      ))}
    </svg>
  );
}

/** Monogramme MF */
export function Monogram({ className = '' }) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mf-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8A6638" />
          <stop offset=".5" stopColor="#D8BC96" />
          <stop offset="1" stopColor="#A9814F" />
        </linearGradient>
      </defs>
      <text x="1" y="40" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="46" fill="url(#mf-g)">M</text>
      <text x="35" y="40" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="46" fill="url(#mf-g)">F</text>
    </svg>
  );
}

export function SectionHead({ kicker, title, children, align = 'left', as = 'h2', light = false }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      {kicker && (
        <Reveal className={`kicker ${light ? '!text-gold-light' : ''}`} y={12}>
          {kicker}
        </Reveal>
      )}
      <SplitText as={as} text={title} className={`display mt-4 block text-4xl md:text-5xl lg:text-6xl ${light ? '!text-cream' : ''}`} />
      {children && (
        <Reveal delay={0.15} className={`lead mt-6 ${light ? '!text-cream/75' : ''}`}>
          {children}
        </Reveal>
      )}
    </div>
  );
}
