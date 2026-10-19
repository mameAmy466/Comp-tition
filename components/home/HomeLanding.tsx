import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Roboto } from "next/font/google";

import useDetailDialog from "@/hooks/useDetailDialog";
import CodeVerifyDialog from "@/components/candidate/CodeVerifyDialog";
import { IActivitySectionData, ILangueData } from "@/types";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

type NewsCard = {
  id: string | number;
  image: string;
  title: string;
  publish_at?: string;
  category?: string;
  type?: string;
  slug?: string;
};

const FALLBACK_LANGS: ILangueData = {
  result: [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
  ],
};

function Icon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "book") {
    return (
      <svg {...common}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 8H20" />
      </svg>
    );
  }
  if (name === "mic") {
    return (
      <svg {...common}>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
      </svg>
    );
  }
  if (name === "wave") {
    return (
      <svg {...common}>
        <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
        <path d="M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 3h9l3 3v15H6Z" />
      <path d="M15 3v4h4M8 12h8M8 16h6" />
    </svg>
  );
}

export default function HomeLanding({
  langueData,
}: {
  langueData: ILangueData | null;
  activities: IActivitySectionData | null;
}) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const detailDialog = useDetailDialog();
  const [menuOpen, setMenuOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const languages = langueData?.result?.length ? langueData : FALLBACK_LANGS;

  const openForm = () => {
    setMenuOpen(false);
    detailDialog.showDialog("form", "c", "candidate");
  };

  const go = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const news = useMemo<NewsCard[]>(() => {
    return [
      { id: "n1", image: "/apropos/section4-main.png", category: t("home.news.n1.badge"), title: t("home.news.n1.title"), publish_at: t("home.news.n1.date") },
      { id: "n2", image: "/apropos/section4-thumb1.png", category: t("home.news.n2.badge"), title: t("home.news.n2.title"), publish_at: t("home.news.n2.date") },
      { id: "n3", image: "/apropos/section4-thumb2.png", category: t("home.news.n3.badge"), title: t("home.news.n3.title"), publish_at: t("home.news.n3.date") },
      { id: "n4", image: "/apropos/section4-thumb3.png", category: t("home.news.n4.badge"), title: t("home.news.n4.title"), publish_at: t("home.news.n4.date") },
      { id: "n5", image: "/apropos/section4-thumb4.png", category: t("home.news.n5.badge"), title: t("home.news.n5.title"), publish_at: t("home.news.n5.date") },
    ];
  }, [t]);

  const [featured, ...sideNews] = news;

  const openNews = (item: NewsCard) => {
    if (item.slug && item.type) {
      detailDialog.showDialog(item.type, item.slug, "activity");
    }
  };

  const nav = [
    { href: "#accueil", label: t("home.nav.home") },
    { href: "#apropos", label: t("home.nav.about") },
    { href: "#categories", label: t("home.nav.categories") },
    { href: "#reglement", label: t("home.nav.eligibility") },
    { href: "#calendrier", label: t("home.nav.calendar") },
    { href: "#actualites", label: t("home.nav.news") },
    { href: "#videos", label: t("home.nav.videos") },
  ];

  const categories = ["hifz", "tilawa", "tafsir", "tajwid"];

  return (
    <div className={`home-page ${roboto.variable}`}>
      <header className="home-header">
        <div className="home-wrap home-header-inner">
          <a className="home-brand" href="#accueil" onClick={(e) => { e.preventDefault(); go("#accueil"); }}>
            <img src="/apropos/logo.png" alt="SENICO" />
          </a>
          <nav className="home-nav" aria-label="Navigation">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="home-actions">
            <label className="home-lang">
              <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
                <rect width="6" height="12" fill="#00853F" />
                <rect x="6" width="6" height="12" fill="#FDEF42" />
                <rect x="12" width="6" height="12" fill="#E31B23" />
                <polygon points="9,2.1 9.7,4.1 11.8,4.1 10.1,5.3 10.7,7.3 9,6.1 7.3,7.3 7.9,5.3 6.2,4.1 8.3,4.1" fill="#00853F" />
              </svg>
              <select
                aria-label="Langue"
                value={router.locale || "fr"}
                onChange={(e) =>
                  router.push({ pathname: router.pathname, query: router.query }, undefined, {
                    locale: e.target.value,
                  })
                }
              >
                {languages.result.map((langue) => (
                  <option key={langue.code} value={langue.code}>
                    {langue.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="home-btn home-btn-solid home-btn-nav" onClick={openForm}>
              {t("home.register")}
            </button>
            <button
              type="button"
              className="home-menu-btn"
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M1 1h16M1 7h16M1 13h16" stroke="#1b1b1b" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>
        <div className={`home-mobile-panel${menuOpen ? " is-open" : ""}`}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
          <button type="button" onClick={openForm}>
            {t("home.register")}
          </button>
        </div>
      </header>

      <section className={`home-hero ${roboto.variable}`} id="accueil">
        <div className="home-wrap home-hero-grid">
          <div className="home-hero-copy">
            <div className="home-hero-text">
              <h1>{t("home.hero.title")}</h1>
              <p className="home-lead">{t("home.hero.lead")}</p>
            </div>
            <div className="home-hero-actions">
              <button type="button" className="home-btn home-btn-brand" onClick={openForm}>
                {t("home.hero.apply")}
              </button>
              <button type="button" className="home-btn home-btn-surface" onClick={() => setVerifyOpen(true)}>
                {t("home.hero.verify")}
              </button>
            </div>
            <div className="home-stats">
              <div className="home-stat">
                <strong>{t("home.hero.stat1.value")}</strong>
                <span>{t("home.hero.stat1.label")}</span>
              </div>
              <div className="home-stat">
                <strong>{t("home.hero.stat2.value")}</strong>
                <span>{t("home.hero.stat2.label")}</span>
              </div>
              <div className="home-stat">
                <strong>{t("home.hero.stat3.value")}</strong>
                <span>{t("home.hero.stat3.label")}</span>
              </div>
            </div>
          </div>

          <img
            className="home-poster"
            src="/apropos/hero-sidebar.png"
            alt={`${t("home.hero.posterTitle")} ${t("home.hero.posterSubtitle")}`}
          />
        </div>
      </section>

      <section className="home-section" id="apropos">
        <div className="home-wrap home-about">
          <div
            className="home-about-photo"
            style={{ backgroundImage: "url(/apropos/section2.png)" }}
          />
          <div className="home-about-copy">
            <p className="home-about-kicker">{t("home.about.kicker")}</p>
            <h2>{t("home.about.title")}</h2>
            <p>{t("home.about.text")}</p>
          </div>
        </div>
      </section>

      <section className="home-section" id="categories">
        <div className="home-wrap home-categories">
          <div className="home-categories-head">
            <p className="home-categories-kicker">{t("home.categories.kicker")}</p>
            <h2>{t("home.categories.title")}</h2>
          </div>
          <div className="home-categories-grid">
            {categories.map((key) => (
              <article className="home-category-card" key={key}>
                <div className="home-category-icon">
                  <Icon name="book" />
                </div>
                <h3>{t(`home.categories.${key}.title`)}</h3>
                <p className="home-category-label">{t(`home.categories.${key}.label`)}</p>
                <p>{t(`home.categories.${key}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-conditions" id="reglement">
        <div className="home-conditions-head">
          <p className="home-categories-kicker">{t("home.conditions.kicker")}</p>
          <h2>{t("home.conditions.title")}</h2>
        </div>
        <div className="home-conditions-grid">
          {["c1", "c2", "c3", "c4"].map((key, index) => (
            <article className="home-condition-card" key={key}>
              <span className="home-condition-num">{index + 1}</span>
              <div>
                <h3>{t(`home.conditions.${key}.title`)}</h3>
                <p>{t(`home.conditions.${key}.text`)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-calendar" id="calendrier">
        <div className="home-calendar-head">
          <p className="home-categories-kicker">{t("home.calendar.kicker")}</p>
          <h2>{t("home.calendar.title")}</h2>
        </div>
        <div className="home-calendar-grid">
          {["d1", "d2", "d3", "d4", "d5"].map((key) => (
            <article className={`home-step${key === "d5" ? " is-active" : ""}`} key={key}>
              <div className="home-step-top">
                <div className="home-step-date">
                  <strong>{t(`home.calendar.${key}.day`)}</strong>
                  <span>
                    <em>{t(`home.calendar.${key}.month`)}</em>
                    <small>{t(`home.calendar.${key}.year`)}</small>
                  </span>
                </div>
                <span className="home-step-badge">{t(`home.calendar.${key}.badge`)}</span>
              </div>
              <div className="home-step-copy">
                <h3>{t(`home.calendar.${key}.title`)}</h3>
                <p>{t(`home.calendar.${key}.text`)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-prizes" id="prix">
        <div className="home-prizes-head">
          <p className="home-categories-kicker">{t("home.prizes.kicker")}</p>
          <h2>{t("home.prizes.title")}</h2>
        </div>
        <div className="home-prizes-grid">
          {["p1", "p2", "p3"].map((key) => (
            <article className="home-prize-card" key={key}>
              <div className="home-prize-body">
                <span className="home-prize-medal" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M9 13.5 8 21l4-2 4 2-1-7.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3>{t(`home.prizes.${key}.rank`)}</h3>
                <p>{t(`home.prizes.${key}.text`)}</p>
              </div>
              <strong>{t(`home.prizes.${key}.amount`)}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-actualites" id="actualites">
        <div id="videos" />
        <div className="home-actualites-head">
          <p className="home-categories-kicker">{t("home.news.kicker")}</p>
          <h2>{t("home.news.title")}</h2>
        </div>
        {featured && (
          <div className="home-news">
            <button
              type="button"
              className="home-feature"
              style={{ backgroundImage: `url(${featured.image})` }}
              onClick={() => openNews(featured)}
            >
              {featured.category ? <span className="home-feature-badge">{featured.category}</span> : null}
              <span className="home-feature-copy">
                <strong>{featured.title}</strong>
                {featured.publish_at ? <small>{featured.publish_at}</small> : null}
              </span>
            </button>
            <div className="home-side">
              {sideNews.map((item) => (
                <button type="button" className="home-side-card" key={item.id} onClick={() => openNews(item)}>
                  <img src={item.image} alt="" />
                  <div>
                    {item.category ? <em>{item.category}</em> : null}
                    <h3>{item.title}</h3>
                    {item.publish_at ? <small>{item.publish_at}</small> : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        <a className="home-news-all" href="#actualites">{t("home.news.all")}</a>
      </section>

      <section className="home-section home-history" id="historique">
        <div className="home-history-head">
          <h2>{t("home.history.title")}</h2>
          <a className="home-history-all" href="#historique">{t("home.history.all")}</a>
        </div>
        <div className="home-history-track">
          {[
            ["y1", "/apropos/section4-thumb1.png"],
            ["y2", "/apropos/section4-thumb2.png"],
            ["y3", "/apropos/section4-thumb3.png"],
          ].map(([key, src]) => (
            <article className="home-history-item" key={key}>
              <span className="home-history-year">{t(`home.history.${key}.year`)}</span>
              <div className="home-history-card">
                <div>
                  <strong>{t(`home.history.${key}.edition`)}</strong>
                  <em>{t(`home.history.${key}.place`)}</em>
                  <span>{t(`home.history.${key}.meta`)}</span>
                </div>
                <img src={src} alt="" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="home-footer" id="contact">
        <div className="home-footer-inner">
          <div className="home-footer-grid">
            <div className="home-footer-brand">
              <a href="#accueil" onClick={(e) => { e.preventDefault(); go("#accueil"); }}>
                <img src="/apropos/logo.png" alt="SENICO" />
              </a>
              <p>{t("home.footer.blurb")}</p>
            </div>
            <div>
              <h3>{t("home.footer.navTitle")}</h3>
              <ul>
                <li>
                  <a href="#accueil" onClick={(e) => { e.preventDefault(); go("#accueil"); }}>{t("home.footer.home")}</a>
                </li>
                <li>
                  <a href="#apropos" onClick={(e) => { e.preventDefault(); go("#apropos"); }}>{t("home.footer.about")}</a>
                </li>
                <li>
                  <button type="button" onClick={openForm}>{t("home.footer.register")}</button>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); go("#contact"); }}>{t("home.footer.contact")}</a>
                </li>
                <li>
                  <a href="#mentions" onClick={(e) => e.preventDefault()}>{t("home.footer.legal")}</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>{t("home.footer.contactTitle")}</h3>
              <p>{t("home.footer.place")}</p>
              <a className="home-footer-mail" href={`mailto:${t("home.footer.email")}`}>{t("home.footer.email")}</a>
            </div>
          </div>
          <div className="home-footer-bottom">
            <span>{t("home.footer.rights")}</span>
            <div className="home-footer-social">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" /></svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M22 6.1a7.4 7.4 0 0 1-2.1.6 3.7 3.7 0 0 0 1.6-2 7.4 7.4 0 0 1-2.3.9 3.7 3.7 0 0 0-6.3 3.4A10.5 10.5 0 0 1 3.2 4.9a3.7 3.7 0 0 0 1.1 4.9 3.6 3.6 0 0 1-1.7-.5v.1a3.7 3.7 0 0 0 3 3.6 3.7 3.7 0 0 1-1.7.1 3.7 3.7 0 0 0 3.4 2.6A7.4 7.4 0 0 1 2 17.6a10.5 10.5 0 0 0 5.7 1.7c6.8 0 10.5-5.6 10.5-10.5v-.5A7.4 7.4 0 0 0 22 6.1Z" /></svg>
              </a>
              <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM9.8 15.5v-6.6l6.2 3.3-6.2 3.3Z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <CodeVerifyDialog open={verifyOpen} handleClose={() => setVerifyOpen(false)} />
    </div>
  );
}
