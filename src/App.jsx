import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [lang, setLang] = useState('en')
  const [active, setActive] = useState('services')
  const [scrolled, setScrolled] = useState(false)
  const rtl = lang === 'ar'

  // ألوان الهوية
  const PRIMARY = '#0B4CA1'
  const PRIMARY_DARK = '#093E84'
  const ACCENT = '#1E90FF'
  const SOFT_BG = '#F5F8FF'
  const WHATSAPP = '#25D366'

  // ترجمة
  const dict = useMemo(() => ({
    en: {
      brandSmall: 'Audit & Consulting',
      nav: { services: 'Services', process: 'Process', about: 'About', contact: 'Contact' },
      switch: 'العربية',
      hero: 'Audit & Consulting Services You Can Trust',
      desc: 'We help SMEs build confidence in their numbers with clear audits, practical advice and on-time delivery.',
      ctaExplore: 'Explore Services',
      servicesTitle: 'Our Services',
      processTitle: 'How We Work',
      aboutTitle: 'About The Bridge',
      contactTitle: 'Book a Free Consultation',
      contactDesc: 'Tell us about your needs and we’ll get back within 24 hours.',
      whatsapp: 'WhatsApp',
      form: {
        name: 'Your Name',
        email: 'Email',
        phone: 'Phone (optional)',
        message: 'How can we help?',
        send: 'Send',
        sending: 'Sending…',
        ok: 'Thanks! We received your message.',
        err: 'Something went wrong. Please try again.'
      }
    },
    ar: {
      brandSmall: 'التدقيق والاستشارات',
      nav: { services: 'الخدمات', process: 'آلية العمل', about: 'من نحن', contact: 'تواصل' },
      switch: 'EN',
      hero: 'خدمات تدقيق واستشارات مالية يمكنك الوثوق بها',
      desc: 'نساعد الشركات الصغيرة والمتوسطة على بناء الثقة في أرقامها من خلال تدقيق واضح وتوصيات عملية وتسليم في الوقت المحدد.',
      ctaExplore: 'خدماتنا',
      servicesTitle: 'الخدمات',
      processTitle: 'آلية العمل',
      aboutTitle: 'من نحن',
      contactTitle: 'احجز استشارة مجانية',
      contactDesc: 'اذكر احتياجاتك وسنعاود التواصل خلال 24 ساعة.',
      whatsapp: 'واتساب',
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف (اختياري)',
        message: 'ما الذي تحتاجه؟',
        send: 'إرسال',
        sending: 'جارٍ الإرسال…',
        ok: 'شكرًا لك! تم استلام رسالتك.',
        err: 'حدث خطأ، حاول مرة أخرى.'
      }
    }
  }), [lang])

const services = [
  { icon: '📊', en: 'Audit & Assurance', ar: 'التدقيق والمراجعة' },
  { icon: '✅', en: 'Limited Review (SMEs)', ar: 'المراجعة المحدودة للشركات الصغيرة' },
  { icon: '🛡️', en: 'Internal Audit', ar: 'التدقيق الداخلي' },
  { icon: '🧾', en: 'Tax Advisory & Returns', ar: 'الاستشارات الضريبية والإقرارات' },
  { icon: '📑', en: 'Compliance & Quality', ar: 'الامتثال والجودة' },
  { icon: '⚙️', en: 'Accounting System Setup', ar: 'إعداد الأنظمة المحاسبية' },
  { icon: '📈', en: 'Financial Reporting & KPIs', ar: 'التقارير والمؤشرات المالية' },
  { icon: '🤝', en: 'Advisory Retainers', ar: 'خدمات استشارية مستمرة' },
  // NEW
  { icon: '💼', en: 'Business Valuation', ar: 'تقييم الأعمال' },
]

  const steps = [
    { n: 1, en: 'Discovery', ar: 'الاستكشاف' },
    { n: 2, en: 'Proposal', ar: 'العرض' },
    { n: 3, en: 'Fieldwork', ar: 'العمل الميداني' },
    { n: 4, en: 'Delivery', ar: 'التسليم' },
  ]

  // Scrollspy
  useEffect(() => {
    const ids = ['services', 'process', 'about', 'contact']
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 }
    )
    sections.forEach(sec => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  // Navbar color on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = (id) =>
    `transition-colors ${active === id ? 'font-semibold underline underline-offset-8' : ''}`

  // ====== Contact form (Formspree) ======
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null) // 'ok' | 'err' | null
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', _gotcha: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form._gotcha) return
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch('https://formspree.io/f/xpwjznko', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          lang
        })
      })
      if (res.ok) {
        setStatus('ok')
        setForm({ name: '', email: '', phone: '', message: '', _gotcha: '' })
      } else {
        setStatus('err')
      }
    } catch {
      setStatus('err')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-50 backdrop-blur transition-all border-b ${scrolled ? 'shadow-md' : ''}`}
        style={{
          borderColor: scrolled ? 'transparent' : 'rgba(148,163,184,0.4)',
          background: scrolled
            ? `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)`
            : 'rgba(255,255,255,0.75)',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            {/* اللوجو من public */}
            <img
              src="/logo.png"
              alt="The Bridge Logo"
              width={44}
              height={44}
              className="block -translate-y-[1px] select-none"
              draggable="false"
            />
            <div className="leading-tight">
              <div
                className="font-semibold transition-colors"
                style={{
                  color: scrolled ? '#FFFFFF' : '#0B4CA1',
                  textShadow: scrolled ? '0 1px 2px rgba(0,0,0,0.25)' : 'none'
                }}
              >
                The Bridge
              </div>
              <div
                className="text-xs -mt-0.5 transition-colors"
                style={{
                  color: scrolled ? '#E6EEFF' : '#64748B',
                  textShadow: scrolled ? '0 1px 1px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                {dict[lang].brandSmall}
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className={navClass('services')} style={{ color: scrolled ? '#E6EEFF' : undefined }}>
              {dict[lang].nav.services}
            </a>
            <a href="#process" className={navClass('process')} style={{ color: scrolled ? '#E6EEFF' : undefined }}>
              {dict[lang].nav.process}
            </a>
            <a href="#about" className={navClass('about')} style={{ color: scrolled ? '#E6EEFF' : undefined }}>
              {dict[lang].nav.about}
            </a>
            <a href="#contact" className={navClass('contact')} style={{ color: scrolled ? '#E6EEFF' : undefined }}>
              {dict[lang].nav.contact}
            </a>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-3 py-1 rounded border transition-colors"
              style={{
                borderColor: scrolled ? '#E6EEFF' : '#CBD5E1',
                color: scrolled ? '#E6EEFF' : '#0f172a',
                background: 'transparent',
              }}
            >
              {dict[lang].switch}
            </button>
          </nav>

          <a
            href="#contact"
            className="rounded-2xl px-4 py-2 text-white text-sm font-medium shadow transition-colors"
            style={{ backgroundColor: scrolled ? PRIMARY_DARK : PRIMARY }}
            onMouseOver={(e)=> e.currentTarget.style.backgroundColor = PRIMARY_DARK}
            onMouseOut={(e)=> e.currentTarget.style.backgroundColor = scrolled ? PRIMARY_DARK : PRIMARY}
          >
            {dict[lang].ctaExplore}
          </a>
        </div>
      </header>

      {/* HERO */}
      <a id="top" />
      <section
        className="text-center py-20 text-white"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}
      >
        <h1 className="text-3xl md:text-5xl font-bold">{dict[lang].hero}</h1>
        <p className="mt-4 max-w-2xl mx-auto">{dict[lang].desc}</p>
        <div className="mt-6 flex gap-4 justify-center">
          <a href="#services" className="px-4 py-2 text-white rounded" style={{ backgroundColor: PRIMARY_DARK }}>
            {dict[lang].ctaExplore}
          </a>
          <a href="https://wa.me/96879434422" className="px-4 py-2 text-white rounded" style={{ backgroundColor: WHATSAPP }}>
            {dict[lang].whatsapp}
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14 text-center scroll-mt-24" style={{ background: SOFT_BG }}>
        <h2 className="text-2xl font-bold" style={{ color: PRIMARY }}>{dict[lang].servicesTitle}</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {services.map((s, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md transition">
              <div className="text-4xl">{s.icon}</div>
              <h3 className="mt-3 font-semibold">{lang === 'ar' ? s.ar : s.en}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-14 text-center border-y border-slate-200 scroll-mt-24 text-white"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}>
        <h2 className="text-2xl font-bold">{dict[lang].processTitle}</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {steps.map((s) => (
            <div key={s.n} className="p-6 bg-white text-slate-900 rounded-2xl border border-slate-200">
              <div className="font-bold text-xl" style={{ color: PRIMARY }}>0{s.n}</div>
              <div className="mt-2">{lang === 'ar' ? s.ar : s.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 text-center max-w-3xl mx-auto px-4 scroll-mt-24">
        <h2 className="text-2xl font-bold">{dict[lang].aboutTitle}</h2>
        <p className="mt-4 text-slate-600">
          {lang === 'en'
            ? 'At The Bridge, we provide simplified and effective audit and consulting solutions tailored for startups and small businesses. We ensure competitive pricing without compromising quality, delivering accurate reports and practical recommendations that help our clients build trust and make better decisions.'
            : 'نحن في The Bridge نوفر حلول تدقيق واستشارات مالية مبسطة وفعّالة، موجهة خصيصًا للشركات الناشئة والصغيرة. نضمن لعملائنا أسعارًا مناسبة دون المساس بالجودة، مع تقديم تقارير دقيقة وتوصيات عملية تساعدهم على بناء الثقة في أعمالهم واتخاذ قرارات أفضل.'}
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 scroll-mt-24" style={{ background: SOFT_BG }}>
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center">{dict[lang].contactTitle}</h2>
          <p className="mt-2 text-slate-600 text-center">{dict[lang].contactDesc}</p>

          <form onSubmit={handleSubmit} className={`mt-6 bg-white p-6 rounded-2xl shadow-md space-y-4 ${rtl ? 'text-right' : 'text-left'}`}>
            {/* honeypot */}
            <input
              type="text"
              name="_gotcha"
              value={form._gotcha}
              onChange={(e)=> setForm({ ...form, _gotcha: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={(e)=> setForm({ ...form, name: e.target.value })}
                placeholder={dict[lang].form.name}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e)=> setForm({ ...form, email: e.target.value })}
                placeholder={dict[lang].form.email}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(e)=> setForm({ ...form, phone: e.target.value })}
                placeholder={dict[lang].form.phone}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                rows="4"
                required
                value={form.message}
                onChange={(e)=> setForm({ ...form, message: e.target.value })}
                placeholder={dict[lang].form.message}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className={`mt-2 flex ${rtl ? 'justify-start' : 'justify-end'}`}>
              <button
                type="submit"
                disabled={submitting}
                className="min-w-32 bg-blue-600 text-white py-3 px-5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? dict[lang].form.sending : dict[lang].form.send}
              </button>
            </div>

            {status === 'ok' && (
              <div className="text-green-600 text-sm">{dict[lang].form.ok}</div>
            )}
            {status === 'err' && (
              <div className="text-red-600 text-sm">{dict[lang].form.err}</div>
            )}
          </form>

          <div className="mt-4 flex justify-center">
            <a
              href="https://wa.me/96879434422"
              className="rounded-2xl px-5 py-3 text-white font-medium shadow"
              style={{ backgroundColor: WHATSAPP }}
            >
              {dict[lang].whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} The Bridge Audit & Consulting</div>
          <div className="flex items-center gap-4">
            <a href="#services" className={navClass('services')}>{dict[lang].nav.services}</a>
            <a href="#process" className={navClass('process')}>{dict[lang].nav.process}</a>
            <a href="#about" className={navClass('about')}>{dict[lang].nav.about}</a>
            <a href="#contact" className={navClass('contact')}>{dict[lang].nav.contact}</a>
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-3 py-1 rounded border" style={{ borderColor: '#0B4CA1', color: '#0B4CA1' }}>
              {dict[lang].switch}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
