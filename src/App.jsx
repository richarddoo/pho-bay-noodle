import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  Maximize2,
  Menu,
  Navigation,
  Phone,
  Utensils,
  X,
} from "lucide-react";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

// `?still` renders the page without entrance motion for visual review.
const STILL =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("still");

const locations = [
  {
    days: "Wednesday & Saturday",
    shortDays: ["Wednesday", "Saturday"],
    dayLabel: "Wed & Sat",
    name: "Entertainment Quarter",
    suburb: "Moore Park",
    time: "8:00am – 2:30pm",
    maps: "https://maps.app.goo.gl/R3BDEMUTLvBkXboC9",
  },
  {
    days: "Thursday",
    shortDays: ["Thursday"],
    dayLabel: "Thursday",
    name: "Hornsby Markets",
    suburb: "Hornsby",
    time: "8:00am – 2:30pm",
    maps: "https://maps.app.goo.gl/UDYH1Yz6CW1dd1WJ9",
  },
  {
    days: "Friday",
    shortDays: ["Friday"],
    dayLabel: "Friday",
    name: "The Beaches Market",
    suburb: "Narrabeen",
    time: "8:00am – 1:00pm",
    maps: "https://maps.app.goo.gl/hyAJh1WPExMFBG8a8",
  },
];

const menu = [
  {
    category: "Pho",
    image: "menu/pho-1200.webp",
    imageSmall: "menu/pho-700.webp",
    alt: "A bowl of pho with rare beef, fresh herbs, chilli and lime",
    items: ["Beef", "Chicken", "Vegan"],
  },
  {
    category: "Noodle Salad",
    image: "menu/noodle-salad-1200.webp",
    imageSmall: "menu/noodle-salad-700.webp",
    alt: "Noodle salad with grilled beef, herbs, carrot and crushed peanuts",
    items: ["Beef", "Chicken", "Vegan"],
  },
  {
    category: "Spring Rolls",
    image: "menu/spring-rolls-1200.webp",
    imageSmall: "menu/spring-rolls-700.webp",
    alt: "Crisp spring rolls served with cucumber and fresh herbs",
    items: ["Pork", "Vegan"],
  },
  {
    category: "Rice Paper Rolls",
    image: "menu/rice-paper-1200.webp",
    imageSmall: "menu/rice-paper-700.webp",
    alt: "Rice paper rolls with prawns, herbs and dipping sauce",
    items: ["Prawn & Pork", "Beef", "Chicken", "Vegan"],
  },
];

const navLinks = [
  { id: "find", label: "Find us" },
  { id: "menu", label: "Menu" },
  { id: "catering", label: "Catering" },
  { id: "about", label: "Our story" },
  { id: "follow", label: "Follow" },
];
const restaurantGuruBadge = `
<link href="https://awards.infcdn.net/2026/circle_v2.css" rel="stylesheet"/>
<div id="circle-r-ribbon" onclick="if(event.target.nodeName.toLowerCase() != 'a') {window.open(this.querySelector('.r-ribbon_title').href);return 0;}" style="cursor:pointer;overflow:hidden;position:relative;display:flex;flex-direction:column;padding:0;max-width:174px;min-width:174px;height:135px;font:400 10px/normal 'Akrobat Bold','Helvetica Neue','Arial',sans-serif;align-items:center;text-align:center;color:#000!important;text-shadow:none;background:url(https://awards.infcdn.net/img/bg.svg) no-repeat;box-sizing:border-box;">
  <p style="color:#000;width:140px;font:22px 'Akrobat Black',sans-serif;font-style:italic;transform:rotate(-12deg);position:absolute;top:41px;left:12px;text-align:center;margin:0;">2026</p>
  <a href="https://restaurantguru.com/Pho-Bay-noodle-Hornsby" class="r-ribbon_title" target="_blank" style="text-transform:uppercase;color:#fff!important;width:140px;font-size:16px;font-family:'Akrobat Bold',sans-serif;font-style:italic;transform:rotate(-12deg);position:absolute;z-index:5;top:72px;left:12px;text-align:center;text-decoration:none;">Pho Bay Noodle</a>
</div>
`;


const weekdayName = (date) =>
  date.toLocaleDateString("en-AU", { weekday: "long" });

const getMarketFor = (date) =>
  locations.find((location) => location.shortDays.includes(weekdayName(date)));

function getNextMarket(date) {
  for (let offset = 0; offset < 8; offset += 1) {
    const candidate = new Date(date);
    candidate.setDate(date.getDate() + offset);
    const location = getMarketFor(candidate);
    if (location) return { location, date: candidate, offset };
  }
  return null;
}

const formatDate = (date, options) => date.toLocaleDateString("en-AU", options);

function Star({ className = "" }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M15.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.8-1.6H18V4.8c-.4 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H9.2v3h2.4v7" />
    </svg>
  );
}

function OpenStamp() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-5 left-4 hidden h-[7.25rem] w-[7.25rem] -rotate-[9deg] drop-shadow-[0_10px_18px_rgba(8,36,92,0.22)] sm:block"
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="var(--color-gold)"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />
        <circle
          cx="60"
          cy="60"
          r="44"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1"
          strokeDasharray="1.5 4"
          opacity="0.5"
        />
        <defs>
          <path
            id="stamp-ring"
            d="M 60,60 m -49,0 a 49,49 0 1,1 98,0 a 49,49 0 1,1 -98,0"
          />
        </defs>
        <text
          fill="var(--color-ink)"
          fontFamily="Instrument Sans, sans-serif"
          fontSize="8.4"
          fontWeight="600"
          letterSpacing="2.3"
        >
          <textPath href="#stamp-ring">OPEN WEDNESDAY TO SATURDAY ·</textPath>
        </text>
        <text
          x="60"
          y="59"
          textAnchor="middle"
          fill="var(--color-ink)"
          fontFamily="Fraunces, serif"
          fontSize="22"
          fontStyle="italic"
          fontWeight="600"
        >
          Pho Bay
        </text>
        <text
          x="60"
          y="76"
          textAnchor="middle"
          fill="var(--color-ink)"
          fontFamily="Instrument Sans, sans-serif"
          fontSize="6.6"
          fontWeight="700"
          letterSpacing="2.6"
        >
          SYDNEY MARKETS
        </text>
      </svg>
    </div>
  );
}

function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

function useFocusTrap(ref, active, onClose) {
  useEffect(() => {
    if (!active) return undefined;
    const previous = document.activeElement;

    const focusables = () =>
      Array.from(
        ref.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((node) => node.offsetParent !== null);

    requestAnimationFrame(() => {
      const nodes = focusables();
      const initial =
        ref.current?.querySelector("[data-autofocus]") ?? nodes[0];
      (initial ?? ref.current)?.focus();
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = focusables();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [active, onClose, ref]);
}

function Header({ today, nextMarket, menuOpen, onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let last = false;

    const update = () => {
      frame = 0;
      const next = window.scrollY > 32;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const todayLabel = today
    ? `Today · ${today.suburb}`
    : nextMarket
      ? `Next · ${formatDate(nextMarket.date, { weekday: "short" })}`
      : "Market days";

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/90 backdrop-blur-md">
      <div
        className={`header-bar mx-auto flex w-full max-w-[1440px] items-center justify-between gap-2 px-4 sm:gap-3 sm:px-8 lg:px-12 ${
          scrolled ? "h-16 sm:h-20" : "h-20 sm:h-24"
        }`}
      >
        <a
          href="#home"
          aria-label="Pho Bay Noodle — back to top"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
        >
          <img
            src={asset("logo-160.png")}
            alt=""
            width="160"
            height="111"
            className={`header-logo w-auto object-contain ${
              scrolled ? "h-12 sm:h-14" : "h-14 sm:h-[4.5rem]"
            }`}
          />
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#today"
            className={`header-chip group inline-flex items-center gap-2 whitespace-nowrap rounded-[2px] border border-ink/25 bg-gold py-0 text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-ink hover:bg-ink hover:text-cream ${
              scrolled ? "h-11 px-3 sm:px-4" : "h-12 px-4 sm:px-5"
            }`}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-red transition-colors group-hover:bg-gold" />
            <span className="hidden sm:inline">{todayLabel}</span>
            <span className="sm:hidden">{today ? "Today" : "Next"}</span>
            <span className="sr-only">
              {today
                ? ` — ${today.name}, ${today.suburb}. See today's market`
                : " — see this week's market locations"}
            </span>
          </a>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`header-menu inline-flex items-center justify-center rounded-[2px] border border-ink/20 text-ink hover:bg-ink hover:text-cream lg:hidden ${
              scrolled ? "h-11 w-11" : "h-12 w-12"
            }`}
          >
            <Menu
              size={20}
              strokeWidth={1.75}
              className={`transition-transform duration-300 ${
                scrolled ? "" : "scale-110"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose, today, nextMarket }) {
  const panelRef = useRef(null);
  useBodyLock(open);
  useFocusTrap(panelRef, open, onClose);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      tabIndex={-1}
      className="fixed inset-0 z-[80] flex flex-col bg-paper outline-none lg:hidden"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink/15 px-4">
        <a
          href="#home"
          onClick={onClose}
          aria-label="Pho Bay Noodle — back to top"
          className="flex items-center"
        >
          <img
            src={asset("logo-160.png")}
            alt=""
            width="160"
            height="111"
            className="h-12 w-auto object-contain"
          />
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          data-autofocus
          className="inline-flex h-11 w-11 items-center justify-center border border-ink/20 text-ink"
        >
          <X size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-10 pt-4">
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={onClose}
              className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4"
            >
              <span className="font-display text-[2.15rem] font-medium leading-none text-ink">
                {link.label}
              </span>
              <ArrowUpRight
                size={20}
                strokeWidth={1.5}
                className="shrink-0 text-ink/40"
              />
            </a>
          ))}
        </nav>

        <div className="mt-8 border border-ink/20 bg-gold p-5 text-ink">
          <p className="micro text-ink/70">
            {today ? "Today at the market" : "Next market"}
          </p>
          <p className="mt-2 font-display text-2xl font-semibold leading-tight">
            {today ? today.name : nextMarket?.location.name}
          </p>
          <p className="mt-1 text-sm text-ink/75">
            {today
              ? `${today.suburb} · ${today.time}`
              : nextMarket
                ? `${formatDate(nextMarket.date, {
                    weekday: "long",
                  })} · ${nextMarket.location.suburb} · ${nextMarket.location.time}`
                : ""}
          </p>
          <a
            href={
              today ? today.maps : nextMarket?.location.maps ?? "#find"
            }
            target={today || nextMarket ? "_blank" : undefined}
            rel={today || nextMarket ? "noopener noreferrer" : undefined}
            className="mt-4 inline-flex min-h-11 items-center gap-2 border border-ink/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-cream"
          >
            <Navigation size={15} />
            Directions
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 text-sm font-medium text-ink/70">
          <a
            href="https://www.instagram.com/phobaynoodle/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 hover:text-ink"
          >
            <InstagramIcon size={17} /> Instagram
          </a>
          <a
            href="https://www.facebook.com/phobaynoodle/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 hover:text-ink"
          >
            <FacebookIcon size={17} /> Facebook
          </a>
          <a
            href="tel:0456777999"
            className="inline-flex min-h-11 items-center gap-2 hover:text-ink"
          >
            <Phone size={17} strokeWidth={1.75} /> 0456 777 999
          </a>
        </div>
      </div>
    </div>
  );
}

function TodayTicket({ now, today, nextMarket }) {
  const isToday = Boolean(today);
  const location = today ?? nextMarket?.location;
  const dateLabel = isToday
    ? `Today · ${formatDate(now, {
        weekday: "long",
        day: "numeric",
        month: "long",
      })}`
    : `No market today · Next ${formatDate(nextMarket.date, {
        weekday: "long",
      })}`;

  return (
    <div
      id="today"
      className="mt-9 scroll-mt-24 border border-ink/25 bg-gold text-ink shadow-[0_18px_40px_-28px_rgba(8,36,92,0.55)]"
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-ink/80">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              {isToday && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red/60" />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red" />
            </span>
            {dateLabel}
          </p>

          <p className="mt-2 font-display text-2xl font-semibold leading-[1.05] sm:text-[1.75rem]">
            {location?.name}
          </p>

          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-snug text-ink/80 tabular-nums">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={1.75} />
              {location?.suburb}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} strokeWidth={1.75} />
              {location?.time}
            </span>
          </p>
        </div>

        <div className="shrink-0 sm:border-l sm:border-dashed sm:border-ink/30 sm:pl-6">
          <a
            href={location?.maps ?? "#find"}
            target={location ? "_blank" : undefined}
            rel={location ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-11 items-center gap-2 border border-ink/35 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-cream"
          >
            <Navigation size={15} strokeWidth={1.75} />
            Directions
            <ArrowUpRight size={15} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero({ now, today, nextMarket }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-7 lg:pr-4">
          <h1 className="hero-rise max-w-[13ch] font-display text-[2.3rem] font-semibold leading-[0.92] tracking-[-0.035em] text-ink min-[360px]:text-[2.5rem] sm:text-[clamp(2.5rem,6.4vw,5.9rem)]">
            Fresh Vietnamese{" "}
            <span className="display-inline">street food</span> at Sydney
            markets.
          </h1>

          <p className="hero-rise hero-delay-1 mt-6 max-w-[45ch] text-[1.0625rem] leading-[1.65] text-body sm:mt-7 sm:text-[1.1875rem]">
            Find Pho Bay Noodle every week at Entertainment Quarter, Hornsby
            Markets and The Beaches Market, Narrabeen.
          </p>

          <div className="hero-rise hero-delay-2 mt-7 flex flex-wrap items-center gap-x-7 gap-y-2">
            <a href="#find" className="cta">
              Find us this week
              <ArrowRight size={17} strokeWidth={2} />
            </a>
            <a href="#menu" className="link-arrow">
              See the menu
              <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>

          <div className="hero-rise hero-delay-3">
            <TodayTicket now={now} today={today} nextMarket={nextMarket} />
          </div>
        </div>

        <figure className="hero-curtain hero-delay-2 relative lg:col-span-5">
          <div className="relative overflow-hidden bg-ink-soft">
            <img
              src={asset("menu/pho-serve-1400.webp")}
              srcSet={`${asset("menu/pho-serve-800.webp")} 800w, ${asset("menu/pho-serve-1400.webp")} 1400w`}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="A bowl of pho being served at a market stall"
              width="1365"
              height="1776"
              fetchPriority="high"
              className="aspect-[4/5] h-full w-full object-cover sm:aspect-[16/11] lg:aspect-[4/5]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            <OpenStamp />
          </div>
          <figcaption className="mt-4 flex items-start justify-between gap-4 border-t border-ink/20 pt-3">
            <span className="text-sm leading-snug text-ink/70">
              Pho, served at the market.
            </span>
            <span className="micro shrink-0 pt-0.5 text-ink/70">
              Sydney, AU
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function MenuTicker() {
  const labels = menu.map((item) => item.category);
  const track = (hidden) => (
    <div
      className="flex min-w-[100vw] shrink-0 items-center justify-around px-6"
      aria-hidden={hidden || undefined}
    >
      {labels.map((label, index) => (
        <span key={label} className="flex items-center">
          <span className="whitespace-nowrap font-display text-[1.35rem] font-medium italic tracking-[-0.02em] sm:text-[1.6rem]">
            {label}
          </span>
          {index < labels.length - 1 && (
            <Star className="mx-6 h-3 w-3 shrink-0 text-gold sm:mx-8" />
          )}
        </span>
      ))}
      <Star className="mx-6 h-3 w-3 shrink-0 text-gold sm:mx-8" />
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="ticker on-dark overflow-hidden border-y border-ink bg-ink py-3.5 text-cream sm:py-4"
    >
      <div className="ticker-track">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}

function Schedule({ today }) {
  return (
    <section id="find" className="border-b border-ink/15 bg-paper">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[13ch] text-balance font-display text-[clamp(2.4rem,4.8vw,4.15rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink">
            Find us this week
          </h2>
          <p className="max-w-[34ch] text-pretty text-base leading-relaxed text-ink/65 md:pb-2 md:text-right">
            Every week is the same, so you always know where to find us.
          </p>
        </div>

        <div className="mt-10 border-t border-ink/25 sm:mt-12">
          <div
            className="hidden grid-cols-[10rem_1fr_11rem_8rem] gap-5 border-b border-ink/15 py-3 text-ink/70 lg:grid"
            aria-hidden="true"
          >
            <span className="micro">Day</span>
            <span className="micro">Market</span>
            <span className="micro">Hours</span>
            <span className="micro text-right">Get there</span>
          </div>

          {locations.map((location) => {
            const isToday = today?.name === location.name;
            return (
              <div
                key={location.name}
                className={`group grid gap-4 border-b border-ink/15 py-6 transition-colors lg:grid-cols-[10rem_1fr_11rem_8rem] lg:items-center lg:gap-5 lg:py-7 ${
                  isToday ? "bg-gold/15" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3 lg:block">
                  <p className="font-display text-[1.35rem] font-semibold leading-none text-ink">
                    {location.dayLabel}
                  </p>
                  {isToday && (
                    <span className="inline-flex items-center gap-1.5 bg-ink px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-cream lg:mt-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      Today
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-[1.6rem] font-medium leading-tight text-ink sm:text-[1.85rem]">
                    {location.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/70">
                    <MapPin size={14} strokeWidth={1.75} />
                    {location.suburb}
                  </p>
                </div>

                <p className="flex items-center gap-2 text-[0.95rem] text-ink/75 tabular-nums">
                  <Clock
                    size={15}
                    strokeWidth={1.75}
                    className="text-ink/45 lg:hidden"
                  />
                  {location.time}
                </p>

                <div className="lg:text-right">
                  <a
                    href={location.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 border-b border-ink/25 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink hover:text-red"
                  >
                    Directions
                    <ArrowUpRight size={14} strokeWidth={2} />
                    <span className="sr-only"> to {location.name}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-ink/70">
          <CalendarDays
            size={16}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0 text-ink/40"
          />
          Three markets a week, Wednesday to Saturday.
        </p>
      </div>
    </section>
  );
}

function MenuSection({ onOpenImage }) {
  return (
    <section id="menu" className="on-dark bg-ink text-cream">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 className="text-balance font-display text-[clamp(2.4rem,4.8vw,4.15rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-cream lg:col-span-7">
            Fresh market favourites
          </h2>
          <p className="max-w-[36ch] text-pretty text-base leading-relaxed text-cream/65 lg:col-span-4 lg:col-start-9 lg:justify-self-end lg:text-right">
            Check out the menu, find us at the market and order fresh at the
            stall.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
          {menu.map((item, index) => {
            const wide = index % 4 === 0 || index % 4 === 3;
            return (
              <article
                key={item.category}
                className={wide ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <button
                  type="button"
                  onClick={() => onOpenImage(index)}
                  aria-label={`View a larger photo of ${item.category}`}
                  className="group relative block w-full overflow-hidden bg-ink-soft text-left"
                >
                  <img
                    src={asset(item.image)}
                    srcSet={`${asset(item.imageSmall)} 700w, ${asset(item.image)} 1200w`}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    alt={item.alt}
                    loading={STILL ? "eager" : "lazy"}
                    width="1200"
                    height="900"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035] lg:aspect-auto lg:h-[26rem] xl:h-[30rem]"
                  />
                  <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-cream/95 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 size={16} strokeWidth={1.75} />
                  </span>
                </button>

                <div className="mt-4 flex flex-col gap-2 border-b border-cream/20 pb-4 lg:flex-row lg:items-baseline lg:justify-between lg:gap-6">
                  <h3 className="font-display text-[1.85rem] font-medium leading-none text-cream sm:text-[2.1rem]">
                    {item.category}
                  </h3>
                  <p className="text-sm leading-snug text-cream/60 sm:text-right">
                    {item.items.join(" · ")}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-sm text-cream/55">
          <p className="flex items-center gap-2">
            <Utensils size={15} strokeWidth={1.75} className="text-gold" />
            Order fresh at the stall.
          </p>
        </div>
      </div>
    </section>
  );
}

function CateringSection() {
  return (
    <section
      id="catering"
      className="border-b border-ink/15 bg-paper-deep"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-28">
        <figure className="relative order-2 lg:order-1 lg:col-span-5 lg:self-start">
          <div className="relative overflow-hidden bg-ink-soft">
            <img
              src={asset("catering-1400.webp")}
              alt="Fresh bread rolls and a tray of catering food being prepared in the kitchen"
              loading={STILL ? "eager" : "lazy"}
              width="748"
              height="843"
              className="aspect-[4/5] w-full object-cover sm:aspect-[16/11] lg:aspect-[4/5]"
            />
            <span className="absolute left-0 top-0 bg-gold px-3.5 py-2 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-ink">
              Sundays
            </span>
          </div>
          <figcaption className="mt-4 border-t border-ink/20 pt-3 text-sm leading-snug text-ink/70">
            Sunday catering, prepared by the family.
          </figcaption>
        </figure>

        <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-6 lg:col-start-7">
          <h2 className="max-w-[14ch] text-balance font-display text-[clamp(2.4rem,4.8vw,4.15rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink">
            Catering available on Sundays
          </h2>

          <p className="mt-6 max-w-[38ch] text-pretty text-[1.0625rem] leading-[1.7] text-body sm:text-[1.125rem]">
            Planning an event? Pho Bay Noodle is available for Sunday
            catering. Call or message to book in catering.
          </p>

          <div className="mt-8 border-t border-ink/20 pt-6">
            <p className="micro text-ink/70">Call or message</p>
            <a
              href="tel:0456777999"
              className="group mt-2 inline-flex items-baseline gap-3 font-display text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-none tracking-[-0.03em] text-ink transition-colors hover:text-red"
            >
              0456 777 999
              <ArrowUpRight
                size={30}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink/70">
              <Phone size={15} strokeWidth={1.75} />
              Catering bookings for Sundays
            </p>
          </div>

          <div className="mt-7">
            <a
              href={asset("catering.html")}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              See the catering food
              <ExternalLink size={15} strokeWidth={2} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="about" className="bg-paper">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-28">
        <div className="order-2 flex flex-col items-start lg:order-1 lg:col-span-4 lg:pt-2">
          <img
            src={asset("logo-384.png")}
            alt="Pho Bay Noodle logo"
            width="384"
            height="267"
            loading={STILL ? "eager" : "lazy"}
            className="w-40 -rotate-[6deg] drop-shadow-[0_18px_26px_rgba(8,36,92,0.16)] sm:w-48"
          />
          <div className="mt-8 flex justify-center lg:justify-start">
            <div dangerouslySetInnerHTML={{ __html: restaurantGuruBadge }} />
            <span className="sr-only">2026 Restaurant Guru award</span>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
          <h2 className="max-w-[12ch] text-balance font-display text-[clamp(2.6rem,5.2vw,4.6rem)] font-semibold leading-[0.93] tracking-[-0.035em] text-ink">
            Family-made,{" "}
            <span className="display-inline">market-loved.</span>
          </h2>

          <div className="mt-7 max-w-[58ch] space-y-5 text-[1.0625rem] leading-[1.75] text-body sm:text-[1.125rem]">
            <p>
              Pho Bay Noodle started with my passion for cooking and sharing
              food with everyone. We’re a family-run Vietnamese food stall
              serving fresh pho, noodle salads, rice paper rolls and spring
              rolls across Sydney markets every week.
            </p>
            <p>
              Every dish is made with care, flavour and the same warmth we grew
              up with at home.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
            <a href="#find" className="cta">
              <MapPin size={16} strokeWidth={1.75} />
              Find us this week
            </a>
            <a href="#menu" className="link-arrow">
              View the menu
              <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-12 items-center justify-between gap-5 border border-cream/25 px-5 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold hover:bg-gold hover:text-ink"
    >
      <span className="inline-flex items-center gap-3">
        <Icon size={18} strokeWidth={1.75} />
        {label}
      </span>
      <ArrowUpRight
        size={17}
        strokeWidth={1.75}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="follow" className="on-dark bg-ink text-cream">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="max-w-[13ch] text-balance font-display text-[clamp(2.8rem,6.2vw,5.7rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
              See you at{" "}
              <span className="display-inline text-gold">the market.</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-pretty text-base leading-relaxed text-cream/65">
              Follow Pho Bay Noodle for weekly market updates, food photos and
              location reminders.
            </p>

            <div className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
              <SocialLink
                href="https://www.instagram.com/phobaynoodle/"
                label="Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://www.facebook.com/phobaynoodle/"
                label="Facebook"
                icon={FacebookIcon}
              />
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-cream/20 pt-5">
              <p className="micro text-cream/65">At the markets</p>
              <ul className="mt-4 space-y-3">
                {locations.map((location) => (
                  <li key={location.name}>
                    <a
                      href={location.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 text-sm text-cream/80 transition-colors hover:text-gold"
                    >
                      <span>
                        <span className="font-semibold text-cream group-hover:text-gold">
                          {location.name}
                        </span>
                        <span className="block text-xs text-cream/65 tabular-nums">
                          {location.days} · {location.time}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={2}
                        className="shrink-0 text-cream/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-cream/20 pt-5">
              <p className="micro text-cream/65">Catering</p>
              <a
                href="tel:0456777999"
                className="mt-3 inline-flex items-center gap-2 font-display text-2xl font-medium text-cream transition-colors hover:text-gold"
              >
                <Phone size={17} strokeWidth={1.75} />
                0456 777 999
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/20 pt-5 sm:mt-20">
          <div className="flex flex-col gap-4 text-[13px] text-cream/65 lg:flex-row lg:items-center lg:justify-between">
            <p>© {year} Pho Bay Noodle</p>
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {navLinks.slice(0, 4).map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#home"
                className="inline-flex min-h-11 items-center gap-1 transition-colors hover:text-cream"
              >
                Back to top
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            </nav>
            <p>Fresh Vietnamese food at Sydney markets.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Lightbox({ index, onClose, onChange }) {
  const panelRef = useRef(null);
  const open = index !== null;
  useBodyLock(open);

  const close = () => onClose();

  useFocusTrap(panelRef, open, close);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") onChange((index + 1) % menu.length);
      if (event.key === "ArrowLeft")
        onChange((index - 1 + menu.length) % menu.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, onChange, open]);

  if (!open) return null;

  const item = menu[index];

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.category} photo`}
      tabIndex={-1}
      className="on-dark fixed inset-0 z-[90] flex flex-col bg-ink text-cream outline-none"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="micro text-cream/55">
          Menu photo · {index + 1} / {menu.length}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Close photo"
          className="inline-flex h-11 w-11 items-center justify-center border border-cream/25 text-cream transition-colors hover:border-gold hover:bg-gold hover:text-ink"
        >
          <X size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-8 sm:pb-6"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <button
          type="button"
          onClick={() => onChange((index - 1 + menu.length) % menu.length)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-cream/25 bg-ink/70 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:left-5"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </button>

        <figure className="flex min-h-0 w-full max-w-3xl flex-col items-center">
          <img
            src={asset(item.image)}
            alt={item.alt}
            className="max-h-[68svh] w-auto max-w-[84vw] object-contain sm:max-w-full"
          />
          <figcaption
            aria-live="polite"
            className="mt-4 flex flex-col items-center gap-1 text-center"
          >
            <span className="font-display text-xl font-medium text-cream sm:text-2xl">
              {item.category}
            </span>
            <span className="text-sm text-cream/55">
              {item.items.join(" · ")}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => onChange((index + 1) % menu.length)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-cream/25 bg-ink/70 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:right-5"
        >
          <ChevronRight size={22} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);

    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const today = useMemo(() => getMarketFor(now), [now]);
  const nextMarket = useMemo(() => getNextMarket(now), [now]);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div className={`min-h-screen bg-paper ${STILL ? "still" : ""}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>

      <Header
        today={today}
        nextMarket={nextMarket}
        menuOpen={menuOpen}
        onOpenMenu={openMenu}
      />

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        today={today}
        nextMarket={nextMarket}
      />

      <main id="main" tabIndex={-1}>
        <Hero now={now} today={today} nextMarket={nextMarket} />
        <MenuTicker />
        <Schedule today={today} />
        <MenuSection onOpenImage={setLightboxIndex} />
        <CateringSection />
        <StorySection />
      </main>

      <Footer />

      <Lightbox
        index={lightboxIndex}
        onClose={closeLightbox}
        onChange={setLightboxIndex}
      />
    </div>
  );
}
