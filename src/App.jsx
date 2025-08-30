import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [lang, setLang] = useState('en')
  const [active, setActive] = useState('services')
  const [scrolled, setScrolled] = useState(false)
  const [openPostId, setOpenPostId] = useState(null)

  // Lightbox
  const infographs = ['/infograph1.png', '/infograph2.png']
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const [lbZoom, setLbZoom] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [startPan, setStartPan] = useState({ x: 0, y: 0 })
  const rtl = lang === 'ar'

  // Identity colors
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
        reset: 'Reset',
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

  // posts (مختصرين كما في نسختك)
  const posts = [
    {
      id: 'post-1',
      titleAr: 'لماذا وجود مراجع حسابات قبل الاستثمار ضرورة أساسية؟',
      excerptAr:
        'تعرف على الأسباب التي تجعل وجود مراجع حسابات قبل ضخ أموال المستثمرين في أي شركة خطوة ضرورية.',
      contentAr: (<><p>…</p></>),
      titleEn: 'Why Having an Auditor Before Investment is Essential',
      excerptEn:
        'Why an independent audit is crucial for investors before committing funds.',
      contentEn: (<><p>…</p></>),
    },
    {
      id: 'post-2',
      titleAr: 'لماذا تحتاج الشركات الناشئة والصغيرة والمتوسطة إلى مراجع داخلي؟',
      excerptAr:
        'المراجعة الداخلية تضمن متابعة دورية وكشف الواقع المالي للشركة.',
      contentAr: (<><p>…</p></>),
      titleEn: 'Why Do Startups and SMEs Need an Internal Auditor?',
      excerptEn:
        'Internal audit provides ongoing oversight beyond statutory compliance.',
      contentEn: (<><p>…</p></>),
    },
  ]

  // blog hash routing
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
      if (m && m[1]) setOpenPostId(m[1])
      else setOpenPostId(null)
    }
    handleHash()
    window.addEventListener('popstate', handleHash)
    window.addEventListener('hashchange', handleHash)
    return () => {
      window.removeEventListener('popstate', handleHash)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  // scroll spy
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

  // navbar color on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // LIGHTBOX: keyboard + prevent background scroll
  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setLbIndex((i) => (i + 1) % infographs.length)
      if (e.key === 'ArrowLeft') setLbIndex((i) => (i - 1 + infographs.length) % infographs.length)
    }
    window.addEventListener('keydown', onKey)
    // lock body scroll
    if (lightboxOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
        window.removeEventListener('keydown', onKey)
      }
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  const navClass = (id) =>
    `transition-colors ${active === id ? 'font-semibold underline underline-offset-8' : ''}`

  // Lightbox helpers
  const openLightbox = (index) => {
    setLbIndex(index)
    setLbZoom(1)
    setPan({ x: 0, y: 0 })
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const zoomIn = () => setLbZoom((z) => Math.min(4, +(z + 0.2).toFixed(2)))
  const zoomOut = () => setLbZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))
  const resetZoom = () => { setLbZoom(1); setPan({ x: 0, y: 0 }) }
  const onWheel = (e) => {
    e.preventDefault()
    if (e.deltaY < 0) zoomIn()
    else zoomOut()
  }
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
      <section id="services" className="py-14 text-cent
