import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [lang, setLang] = useState('en')
  const [active, setActive] = useState('services')
  const [scrolled, setScrolled] = useState(false)
  const [openPostId, setOpenPostId] = useState(null)

  // Lightbox state
  const infographs = ['/infograph1.png', '/infograph2.png']
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const [lbZoom, setLbZoom] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [startPan, setStartPan] = useState({ x: 0, y: 0 })

  const rtl = lang === 'ar'

  // Colors
  const PRIMARY = '#0B4CA1'
  const PRIMARY_DARK = '#093E84'
  const ACCENT = '#1E90FF'
  const SOFT_BG = '#F5F8FF'
  const WHATSAPP = '#25D366'

  // i18n
  const dict = useMemo(
    () => ({
      en: {
        brandSmall: 'Audit & Consulting',
        nav: {
          services: 'Services',
          process: 'Process',
          about: 'About',
          blog: 'Blog',
          infograph: 'Infograph',
          contact: 'Contact',
        },
        switch: 'العربية',
        hero: 'Audit & Consulting Services You Can Trust',
        desc: 'We help SMEs build confidence in their numbers with clear audits, practical advice and on-time delivery.',
        ctaExplore: 'Explore Services',
        servicesTitle: 'Our Services',
        processTitle: 'How We Work',
        aboutTitle: 'About The Bridge',
        blogTitle: 'Blog',
        infographTitle: 'Infograph',
        contactTitle: 'Book a Free Consultation',
        contactDesc: 'Tell us about your needs and we’ll get back within 24 hours.',
        whatsapp: 'WhatsApp',
        readMore: 'Read more →',
        backToList: 'Back to blog list',
        back: 'Back',
        view: 'View',
        close: 'Close',
        zoomIn: 'Zoom in',
        zoomOut: 'Zoom out',
        reset: '100%',
        prev: 'Prev',
        next: 'Next',
      },
      ar: {
        brandSmall: 'التدقيق والاستشارات',
        nav: {
          services: 'الخدمات',
          process: 'آلية العمل',
          about: 'من نحن',
          blog: 'المقالات',
          infograph: 'الانفوجراف',
          contact: 'تواصل',
        },
        switch: 'EN',
        hero: 'خدمات تدقيق واستشارات مالية يمكنك الوثوق بها',
        desc: 'نساعد الشركات الصغيرة والمتوسطة على بناء الثقة في أرقامها من خلال تدقيق واضح وتوصيات عملية وتسليم في الوقت المحدد.',
        ctaExplore: 'خدماتنا',
        servicesTitle: 'الخدمات',
        processTitle: 'آلية العمل',
        aboutTitle: 'من نحن',
        blogTitle: 'المقالات',
        infographTitle: 'الانفوجراف',
        contactTitle: 'احجز استشارة مجانية',
        contactDesc: 'اذكر احتياجاتك وسنعاود التواصل خلال 24 ساعة.',
        whatsapp: 'واتساب',
        readMore: 'اقرأ المزيد →',
        backToList: 'عودة إلى قائمة المقالات',
        back: 'عودة',
        view: 'عرض',
        close: 'إغلاق',
        zoomIn: 'تكبير',
        zoomOut: 'تصغير',
        reset: '100%',
        prev: 'السابق',
        next: 'التالي',
      },
    }),
    [lang]
  )

  // services
  const services = [
    { icon: '📊', en: 'Audit & Assurance', ar: 'التدقيق والمراجعة' },
    { icon: '✅', en: 'Limited Review (SMEs)', ar: 'المراجعة المحدودة للشركات الصغيرة' },
    { icon: '🛡️', en: 'Internal Audit', ar: 'التدقيق الداخلي' },
    { icon: '🧾', en: 'Tax Advisory & Returns', ar: 'الاستشارات الضريبية والإقرارات' },
    { icon: '📑', en: 'Compliance & Quality', ar: 'الامتثال والجودة' },
    { icon: '⚙️', en: 'Accounting System Setup', ar: 'إعداد الأنظمة المحاسبية' },
    { icon: '📈', en: 'Financial Reporting & KPIs', ar: 'التقارير والمؤشرات المالية' },
    { icon: '🤝', en: 'Advisory Retainers', ar: 'خدمات استشارية مستمرة' },
    { icon: '💼', en: 'Business Valuation', ar: 'تقييم الأعمال' },
  ]

  // steps
  const steps = [
    { n: 1, en: 'Discovery', ar: 'الاستكشاف' },
    { n: 2, en: 'Proposal', ar: 'العرض' },
    { n: 3, en: 'Fieldwork', ar: 'العمل الميداني' },
    { n: 4, en: 'Delivery', ar: 'التسليم' },
  ]

  // posts (مختصرة للمثال – استبدل بالمحتوى الكامل لديك)
  const posts = [
    {
      id: 'post-1',
      titleAr: 'لماذا وجود مراجع حسابات قبل الاستثمار ضرورة أساسية؟',
      excerptAr: 'أسباب تجعل وجود مراجع حسابات قبل ضخ أموال المستثمرين خطوة ضرورية.',
      contentAr: (<><p>…</p></>),
      titleEn: 'Why Having an Auditor Before Investment is Essential',
      excerptEn: 'Why an independent audit is crucial before committing funds.',
      contentEn: (<><p>…</p></>),
    },
    {
      id: 'post-2',
      titleAr: 'لماذا تحتاج الشركات الناشئة والصغيرة والمتوسطة إلى مراجع داخلي؟',
      excerptAr: 'المراجعة الداخلية تعكس الواقع المالي وتضمن المتابعة الدورية.',
      contentAr: (<><p>…</p></>),
      titleEn: 'Why Do Startups and SMEs Need an Internal Auditor?',
      excerptEn: 'Internal audit provides ongoing oversight beyond compliance.',
      contentEn: (<><p>…</p></>),
    },
  ]

  // Blog hash routing
  const openPost = (id) => {
    setOpenPostId(id)
    const newHash = `#blog/${id}`
    if (location.hash !== newHash) history.pushState({ post: id }, '', newHash)
    requestAnimationFrame(() => {
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })
    })
  }
  const closePost = () => {
    setOpenPostId(null)
    if (location.hash.startsWith('#blog/')) history.pushState({}, '', '#blog')
    document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    const handleHash = () => {
      const m = location.hash.match(/^#blog\/(post-[^\/#]+)/)
      if (m && m[1]) setOpenPostId(m[1]); else setOpenPostId(null)
    }
    handleHash()
    window.addEventListener('popstate', handleHash)
    window.addEventListener('hashchange', handleHash)
    return () => {
      window.removeEventListener('popstate', handleHash)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  // Scroll spy
  useEffect(() => {
    const ids = ['services', 'process', 'about', 'blog', 'infograph', 'contact']
    const secs = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || secs.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 }
    )
    secs.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Navbar color on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lightbox keys + lock background scroll
  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') { setLbIndex((i) => (i + 1) % infographs.length); resetZoom() }
      if (e.key === 'ArrowLeft') { setLbIndex((i) => (i - 1 + infographs.length) % infographs.length); resetZoom() }
    }
    window.addEventListener('keydown', onKey)
    if (lightboxOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  const navClass = (id) =>
    `transition-colors ${active === id ? 'font-semibold underline underline-offset-8' : ''}`

  // Lightbox helpers
  const openLightbox = (index) => { setLbIndex(index); setLbZoom(1); setPan({ x: 0, y: 0 }); setLightboxOpen(true) }
  const closeLightbox = () => setLightboxOpen(false)
  const zoomIn = () => setLbZoom((z) => Math.min(4, +(z + 0.2).toFixed(2)))
  const zoomOut = () => setLbZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))
  const resetZoom = () => { setLbZoom(1); setPan({ x: 0, y: 0 }) }
  const onWheel = (e) => { e.preventDefault(); e.deltaY < 0 ? zoomIn() : zoomOut() }
  const startPanHandler = (e) => {
    if (lbZoom <= 1) return
    setIsPanning(true)
    const clientX = e.clientX ?? e.touches?.[0]?.clientX
    const clientY = e.clientY ?? e.touches?.[0]?.clientY
    setStartPan({ x: clientX - pan.x, y: clientY - pan.y })
  }
  const movePanHandler = (e) => {
    if (!isPanning) return
    const clientX = e.clientX ?? e.touches?.[0]?.clientX
    const clientY = e.clientY ?? e.touches?.[0]?.clientY
    setPan({ x: clientX - startPan.x, y: clientY - startPan.y })
  }
  const endPanHandler = () => setIsPanning(false)

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-50 text-slate-900">

      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-50 backdrop-blur border-b ${scrolled ? 'shadow-md' : ''}`}
        style={{
          background: scrolled
            ? `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)`
            : 'rgba(255,255,255,0.85)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <div>
              <div className="font-semibold" style={{ color: scrolled ? '#fff' : PRIMARY }}>
                The Bridge
              </div>
              <div className="text-xs" style={{ color: scrolled ? '#EEF2FF' : '#64748B' }}>
                {dict[lang].brandSmall}
              </div>
            </div>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#services" className={navClass('services')}>{dict[lang].nav.services}</a>
            <a href="#process" className={navClass('process')}>{dict[lang].nav.process}</a>
            <a href="#about" className={navClass('about')}>{dict[lang].nav.about}</a>
            <a href="#blog" className={navClass('blog')}>{dict[lang].nav.blog}</a>
            <a href="#infograph" className={navClass('infograph')}>{dict[lang].nav.infograph}</a>
            <a href="#contact" className={navClass('contact')}>{dict[lang].nav.contact}</a>
          </nav>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-3 py-1 border rounded">
            {dict[lang].switch}
          </button>
        </div>
      </header>

      {/* HERO */}
      <a id="top" />
      <section className="text-center py-20 text-white"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}>
        <h1 className="text-4xl font-bold">{dict[lang].hero}</h1>
        <p className="mt-3 max-w-2xl mx-auto">{dict[lang].desc}</p>
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
            <div key={i} className="p-6 bg-white rounded-2xl border hover:shadow transition">
              <div className="text-4xl">{s.icon}</div>
              <h3 className="mt-3 font-semibold">{lang === 'ar' ? s.ar : s.en}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-14 text-center text-white border-y border-slate-200 scroll-mt-24"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}>
        <h2 className="text-2xl font-bold">{dict[lang].processTitle}</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {steps.map((s) => (
            <div key={s.n} className="p-6 bg-white text-slate-900 rounded-2xl border">
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
            ? 'At The Bridge, we provide simplified and effective audit and consulting solutions tailored for startups and small businesses.'
            : 'نحن في The Bridge نوفر حلول تدقيق واستشارات مالية مبسطة وفعّالة، موجهة خصيصًا للشركات الناشئة والصغيرة.'}
        </p>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-16 bg-white border-t border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{dict[lang].blogTitle}</h2>
          {!openPostId && (
            <div className="space-y-6">
              {posts.map((p) => (
                <article key={p.id} className={`p-6 bg-slate-50 rounded-2xl shadow hover:shadow-md transition ${rtl ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">
                    {lang === 'ar' ? p.titleAr : p.titleEn}
                  </h3>
                  <p className="text-slate-600 mb-3 text-center max-w-4xl mx-auto">
                    {lang === 'ar' ? p.excerptAr : p.excerptEn}
                  </p>
                  <div className={rtl ? 'text-left' : 'text-right'}>
                    <a href={`#blog/${p.id}`} onClick={(e) => { e.preventDefault(); openPost(p.id) }} className="text-blue-600 hover:underline">
                      {dict[lang].readMore}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
          {openPostId && (
            <BlogDetail lang={lang} rtl={rtl} post={posts.find((x) => x.id === openPostId)} onBack={closePost} dict={dict} />
          )}
        </div>
      </section>

      {/* INFOGRAPH */}
      <section id="infograph" className="py-16 bg-slate-50 border-t border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{dict[lang].infographTitle}</h2>
        <div className="grid md:grid-cols-2 gap-6">
            {infographs.map((src, i) => (
              <figure key={i} className="bg-white rounded-2xl shadow p-4 flex flex-col">
                <img
                  src={src}
                  alt={`Infograph ${i + 1}`}
                  className="w-full rounded-lg cursor-zoom-in"
                  onClick={() => openLightbox(i)}
                />
                <figcaption className="mt-3 text-sm text-slate-600 flex items-center justify-between">
                  <span>
                    {lang === 'ar'
                      ? (i === 0 ? 'لماذا وجود مراجع حسابات قبل الاستثمار' : 'لماذا تحتاج الشركات مراجعًا داخليًا')
                      : (i === 0 ? 'Why an auditor before investing' : 'Why an internal auditor')}
                  </span>
                  <button onClick={() => openLightbox(i)} className="px-3 py-1 text-xs border rounded hover:bg-slate-50">
                    {dict[lang].view}
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 scroll-mt-24" style={{ background: SOFT_BG }}>
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{dict[lang].contactTitle}</h2>
          <p className="mt-2 text-slate-600">{dict[lang].contactDesc}</p>
          <ContactForm lang={lang} dict={dict} />
          <div className="mt-4 flex justify-center">
            <a href="https://wa.me/96879434422" className="rounded-2xl px-5 py-3 text-white font-medium shadow" style={{ backgroundColor: WHATSAPP }}>
              {dict[lang].whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center border-t text-slate-500 text-sm">
        © {new Date().getFullYear()} The Bridge Audit & Consulting
      </footer>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex flex-col"
          onClick={closeLightbox}
          onWheel={onWheel}
        >
          {/* Controls */}
          <div className="flex items-center gap-2 p-3">
            <div className="ms-auto flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setLbIndex((i) => (i - 1 + infographs.length) % infographs.length); resetZoom() }}
                className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow"
                aria-label={dict[lang].prev}
              >{dict[lang].prev}</button>
              <button onClick={(e) => { e.stopPropagation(); zoomOut() }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow" aria-label={dict[lang].zoomOut}>−</button>
              <button onClick={(e) => { e.stopPropagation(); resetZoom() }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow" aria-label={dict[lang].reset}>{dict[lang].reset}</button>
              <button onClick={(e) => { e.stopPropagation(); zoomIn() }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow" aria-label={dict[lang].zoomIn}>+</button>
              <button
                onClick={(e) => { e.stopPropagation(); setLbIndex((i) => (i + 1) % infographs.length); resetZoom() }}
                className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow"
                aria-label={dict[lang].next}
              >{dict[lang].next}</button>
              <button onClick={(e) => { e.stopPropagation(); closeLightbox() }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow" aria-label={dict[lang].close}>{dict[lang].close}</button>
            </div>
          </div>

          {/* Stage */}
          <div
            className="relative flex-1 overflow-hidden px-4 pb-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={startPanHandler}
            onMouseMove={movePanHandler}
            onMouseUp={endPanHandler}
            onMouseLeave={endPanHandler}
            onTouchStart={startPanHandler}
            onTouchMove={movePanHandler}
            onTouchEnd={endPanHandler}
          >
            <img
              src={infographs[lbIndex]}
              alt="Infograph full"
              className="max-h-[85vh] max-w-full object-contain select-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${lbZoom})`,
                cursor: lbZoom > 1 ? (isPanning ? 'grabbing' : 'grab') : 'zoom-in',
                transition: isPanning ? 'none' : 'transform 120ms ease',
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}

/* === Blog Detail === */
function BlogDetail({ lang, rtl, post, onBack, dict }) {
  if (!post) return null
  return (
    <article className="max-w-3xl mx-auto">
      <div className={`flex ${rtl ? 'justify-start' : 'justify-end'} mb-4`}>
        <button onClick={onBack} className="px-4 py-2 rounded border text-sm hover:bg-slate-50">
          {dict[lang].back}
        </button>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 text-center">
        {lang === 'ar' ? post.titleAr : post.titleEn}
      </h1>
      <div className={`prose prose-slate max-w-none mt-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? post.contentAr : post.contentEn}
      </div>
      <div className={`mt-8 ${rtl ? 'text-left' : 'text-right'}`}>
        <button onClick={onBack} className="text-blue-600 hover:underline">
          {dict[lang].backToList}
        </button>
      </div>
    </article>
  )
}

/* === Contact Form === */
function ContactForm({ lang, dict }) {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    _gotcha: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form._gotcha) return
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch('https://formspree.io/f/xpwjznko', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '', _gotcha: '' })
    } catch {
      setStatus('err')
    } finally {
      setSubmitting(false)
    }
  }

  const rtl = lang === 'ar'

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-6 bg-white p-6 rounded-2xl shadow-md space-y-4 ${rtl ? 'text-right' : 'text-left'}`}
    >
      {/* honeypot */}
      <input
        type="text"
        name="_gotcha"
        value={form._gotcha}
        onChange={(e) => setForm({ ...form, _gotcha: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <input
        type="text"
        name="name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder={dict[lang].form.name}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder={dict[lang].form.email}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder={dict[lang].form.phone}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="message"
        rows="4"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder={dict[lang].form.message}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      <div className={`mt-2 flex ${rtl ? 'justify-start' : 'justify-end'}`}>
        <button
          type="submit"
          disabled={submitting}
          className="min-w-32 bg-blue-600 text-white py-3 px-5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? dict[lang].form.sending : dict[lang].form.send}
        </button>
      </div>

      {status === 'ok' && <div className="text-green-600 text-sm">{dict[lang].form.ok}</div>}
      {status === 'err' && <div className="text-red-600 text-sm">{dict[lang].form.err}</div>}
    </form>
  )
}
