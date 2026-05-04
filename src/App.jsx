import React, { useMemo } from "react";
import {
  MapPin,
  Clock,
  CalendarDays,
  Utensils,
  Navigation,
  Heart,
  ExternalLink,
  ThumbsUp,
} from "lucide-react";

const COLORS = {
  blue: "#245AA6",
  darkBlue: "#123A70",
  lightBlue: "#EAF3FF",
  cream: "#FFF8E8",
  red: "#E31B23",
  text: "#111827",
};

const locations = [
  {
    days: "Wednesday & Saturday",
    shortDays: ["Wednesday", "Saturday"],
    name: "Entertainment Quarter",
    suburb: "Moore Park",
    time: "9:00am – 3:00pm",
    maps: "https://maps.app.goo.gl/R3BDEMUTLvBkXboC9",
  },
  {
    days: "Thursday",
    shortDays: ["Thursday"],
    name: "Hornsby Markets",
    suburb: "Hornsby",
    time: "8:00am – 2:00pm",
    maps: "https://maps.app.goo.gl/UDYH1Yz6CW1dd1WJ9",
  },
  {
    days: "Friday",
    shortDays: ["Friday"],
    name: "The Beaches Market",
    suburb: "Narrabeen",
    time: "8:00am – 1:00pm",
    maps: "https://maps.app.goo.gl/hyAJh1WPExMFBG8a8",
  },
];

const menu = [
  {
    category: "Pho",
    items: ["Beef", "Chicken"],
  },
  {
    category: "Noodle Salad",
    items: ["Beef", "Chicken", "Vegan"],
  },
  {
    category: "Rice Paper Rolls",
    items: ["Prawn & Pork", "Beef", "Chicken", "Vegan"],
  },
  {
    category: "Spring Rolls",
    items: ["Pork", "Vegan"],
  },
];

function getTodayLocation() {
  const day = new Date().toLocaleDateString("en-AU", { weekday: "long" });
  return locations.find((location) => location.shortDays.includes(day));
}

function PrimaryButton({ href, children, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#245AA6] px-5 py-3 font-bold text-white shadow-lg shadow-[#123A70]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#123A70] hover:shadow-xl hover:shadow-[#123A70]/30"
    >
      {children}
      {external && <ExternalLink size={15} className="transition-transform group-hover:translate-x-0.5" />}
    </a>
  );
}

function SecondaryButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#245AA6]/25 bg-white px-5 py-3 font-bold text-[#123A70] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#245AA6] hover:bg-[#EAF3FF] hover:shadow-md"
    >
      {children}
    </a>
  );
}

function SocialButton({ href, label, type }) {
  const isFacebook = type === "facebook";
  const Icon = type === "facebook" ? ThumbsUp : Heart;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl ${
        isFacebook
          ? "bg-gradient-to-r from-[#1877F2] to-[#245AA6]"
          : "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737]"
      }`}
    >
      <Icon size={18} />
      {label}
      <ExternalLink size={14} className="opacity-80 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default function App() {
  const today = useMemo(() => getTodayLocation(), []);

  const todayAnchor = today
    ? "#" + today.shortDays.join("-")
    : "#find";
  
  const scrollToToday = () => {
    const id = today ? today.shortDays.join("-") : "find";
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 50;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 50;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-[#FFF8E8] text-[#111827]">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[#245AA6]/15 bg-[#FFF8E8]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Pho Bay Noodle logo"
              className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />

            <div>
              <p className="text-lg font-black leading-none tracking-tight text-[#123A70]">
                Pho Bay Noodle
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#245AA6]">
                Sydney Markets
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-bold text-[#123A70] md:flex">
            <button onClick={() => scrollToSection("find")} className="transition hover:text-[#E31B23]">
              Find Us
            </button>

            <button onClick={() => scrollToSection("menu")} className="transition hover:text-[#E31B23]">
              Menu
            </button>

            <button onClick={() => scrollToSection("about")} className="transition hover:text-[#E31B23]">
              About
            </button>

            <button onClick={() => scrollToSection("follow")} className="transition hover:text-[#E31B23]">
              Follow
            </button>
          </nav>

          <button
            onClick={scrollToToday}
            className="rounded-full bg-[#245AA6] px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-[#123A70]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#123A70] hover:shadow-xl"
          >
            Where today?
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(36,90,166,0.25),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(227,27,35,0.11),transparent_36%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#245AA6]/20 bg-white px-4 py-2 text-sm font-black text-[#245AA6] shadow-sm">
              <CalendarDays size={16} /> Open Wednesday to Saturday
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-[#123A70] sm:text-6xl lg:text-7xl">
              Fresh Vietnamese street food at Sydney markets.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Find Pho Bay Noodle every week at Entertainment Quarter, Hornsby Markets and The Beaches Market Narrabeen.
            </p>

            <div className="mt-8 rounded-[2rem] border border-[#245AA6]/20 bg-white/95 p-6 shadow-2xl shadow-[#123A70]/10 backdrop-blur">
              <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-[#245AA6]">
                <MapPin size={18} /> Today’s location
              </p>

              {today ? (
                <div>
                  <h2 className="text-3xl font-black text-[#123A70]">{today.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-slate-700"><MapPin size={18} /> {today.suburb}</p>
                  <p className="mt-2 flex items-center gap-2 text-slate-700"><Clock size={18} /> {today.time}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <PrimaryButton href={today.maps} external>
                      <Navigation size={17} /> Get Directions
                    </PrimaryButton>
                    <SecondaryButton href="#find">
                      <CalendarDays size={17} /> View Schedule
                    </SecondaryButton>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-black text-[#123A70]">No market today</h2>
                  <p className="mt-2 text-slate-700">We’re open Wednesday to Saturday. Check the weekly schedule below.</p>
                  <div className="mt-6">
                    <SecondaryButton href="#find">
                      <CalendarDays size={17} /> View Schedule
                    </SecondaryButton>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[2rem] bg-[#EAF3FF] shadow-2xl shadow-[#123A70]/20">
            <img
              src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1400&auto=format&fit=crop"
              alt="Bowl of Vietnamese pho"
              className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123A70]/75 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-3xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#E31B23]">Family-made</p>
              <p className="mt-1 text-2xl font-black text-[#123A70]">Market-loved pho, made fresh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section id="find" className="bg-white px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#245AA6]">Find us</p>
            <h2 className="text-4xl font-black tracking-tight text-[#123A70]">Our weekly market locations</h2>
            <p className="mt-4 text-slate-600">Every week is the same, so you always know where to find us.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {locations.map((location) => (
              <div
                id={location.shortDays.join("-")} // unique id
                key={location.name}
                className="group rounded-[2rem] border border-[#245AA6]/15 bg-[#EAF3FF] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#245AA6]/40 hover:bg-white hover:shadow-2xl hover:shadow-[#123A70]/10"
              >
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#245AA6]">{location.days}</p>
                <h3 className="mt-3 text-2xl font-black text-[#123A70]">{location.name}</h3>
                <p className="mt-3 flex items-center gap-2 text-slate-700"><MapPin size={18} /> {location.suburb}</p>
                <p className="mt-2 flex items-center gap-2 text-slate-700"><Clock size={18} /> {location.time}</p>
                <div className="mt-6">
                  <PrimaryButton href={location.maps} external>
                    <Navigation size={17} /> Open Maps
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#245AA6]">Menu</p>
            <h2 className="text-4xl font-black tracking-tight text-[#123A70]">Fresh market favourites</h2>
            <p className="mt-4 text-slate-600">Check out the menu, find us at the market and order fresh at the stall.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menu.map((section) => (
              <div
                key={section.category}
                className="group rounded-[2rem] border border-[#245AA6]/10 bg-white p-6 shadow-lg shadow-[#123A70]/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#245AA6]/35 hover:shadow-2xl hover:shadow-[#123A70]/10"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#245AA6] to-[#123A70] text-white shadow-lg shadow-[#123A70]/20 transition-transform group-hover:rotate-3 group-hover:scale-110">
                  <Utensils />
                </div>
                <h3 className="text-2xl font-black text-[#123A70]">{section.category}</h3>
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-lg font-semibold text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#E31B23]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden bg-[#123A70] px-5 py-16 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(227,27,35,0.18),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#EAF3FF]">Our story</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Family-made, market-loved.</h2>
          </div>
          <div className="text-lg leading-8 text-blue-50">
            <p>
              Pho Bay Noodle started with my passion for cooking and sharing food with everyone. We’re a family-run Vietnamese food stall serving fresh pho, noodle salads, rice paper rolls and spring rolls across Sydney markets every week.
            </p>
            <p className="mt-5">
              Every dish is made with care, flavour and the same warmth we grew up with at home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="#find">
                <MapPin size={17} /> Find Us This Week
              </PrimaryButton>
              <SecondaryButton href="#menu">
                <Utensils size={17} /> View Menu
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* FOLLOW / FOOTER */}
      <footer id="follow" className="relative overflow-hidden bg-gradient-to-br from-[#0B2447] via-[#123A70] to-[#245AA6] px-5 py-14 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(227,27,35,0.22),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white shadow-xl ring-1 ring-white/20 backdrop-blur">
                <Heart size={28} />
              </div>
              <h2 className="text-4xl font-black tracking-tight">Follow us on</h2>
              <p className="mt-3 max-w-xl text-lg leading-8 text-blue-50">
                Follow Pho Bay Noodle for weekly market updates, food photos and location reminders.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <SocialButton href="https://www.facebook.com/phobaynoodle/" label="Facebook" type="facebook" />
                <SocialButton href="https://www.instagram.com/phobaynoodle/" label="Instagram" type="instagram" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#EAF3FF]">Quick links</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a href="#find" className="rounded-2xl bg-white/10 p-4 font-bold transition hover:-translate-y-1 hover:bg-white hover:text-[#123A70]">Find Us</a>
                <a href="#menu" className="rounded-2xl bg-white/10 p-4 font-bold transition hover:-translate-y-1 hover:bg-white hover:text-[#123A70]">Menu</a>
                <a href="#about" className="rounded-2xl bg-white/10 p-4 font-bold transition hover:-translate-y-1 hover:bg-white hover:text-[#123A70]">Our Story</a>
                <a href="#home" className="rounded-2xl bg-white/10 p-4 font-bold transition hover:-translate-y-1 hover:bg-white hover:text-[#123A70]">Back to Top</a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-6 text-sm text-blue-50 md:flex md:items-center md:justify-between">
            <p className="font-bold">© {new Date().getFullYear()} Pho Bay Noodle</p>
            <p className="mt-2 md:mt-0">Fresh Vietnamese food at Sydney markets.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
