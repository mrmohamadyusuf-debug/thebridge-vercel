import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [lang, setLang] = useState('en')
  const [active, setActive] = useState('services')
  const [scrolled, setScrolled] = useState(false)
  const [openPostId, setOpenPostId] = useState(null)

  // ====== Infograph + Lightbox ======
  const infographs = ['/infograph1.png', '/infograph2.png']
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const [lbZoom, setLbZoom] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [startPan, setStartPan] = useState({ x: 0, y: 0 })

  // ====== Process Accordion ======
  const [openStep, setOpenStep] = useState(null) // 0..3 أو null

  const rtl = lang === 'ar'

  // ====== Identity ======
  const PRIMARY = '#0B4CA1'
  const PRIMARY_DARK = '#093E84'
  const ACCENT = '#1E90FF'
  const SOFT_BG = '#F5F8FF'
  const WHATSAPP = '#25D366'

  // ====== i18n ======
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
        desc:
          'We help SMEs build confidence in their numbers with clear audits, practical advice and on-time delivery.',
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
        processDesc: [
          'Initial meeting to understand the client’s business, objectives, and financial framework. Identify key risks and areas requiring assurance.',
          'Tailored audit plan outlining scope, methodology, and timeline. Transparent fees and deliverables agreed with the client.',
          'Detailed testing of financial records, controls, and compliance. On-site and remote procedures ensure data integrity.',
          'Final report issued with findings, insights, and recommendations. Results presented clearly to management for actionable steps.',
        ],
        form: {
          name: 'Your Name',
          email: 'Email',
          phone: 'Phone (optional)',
          message: 'How can we help?',
          send: 'Send',
          sending: 'Sending…',
          ok: 'Thanks! We received your message.',
          err: 'Something went wrong. Please try again.',
        },
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
        desc:
          'نساعد الشركات الصغيرة والمتوسطة على بناء الثقة في أرقامها من خلال تدقيق واضح وتوصيات عملية وتسليم في الوقت المحدد.',
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
        processDesc: [
          'اجتماع تمهيدي لفهم نشاط العميل وأهدافه والإطار المالي الحالي، مع تحديد المخاطر الرئيسية والجوانب التي تحتاج إلى ضمان.',
          'خطة تدقيق مخصصة توضّح النطاق والمنهجية والجدول الزمني، مع اتفاق واضح على الأتعاب والمخرجات المتوقعة مع العميل.',
          'اختبار تفصيلي للسجلات المالية والضوابط والالتزام، من خلال إجراءات ميدانية وعن بُعد لضمان دقة وصحة البيانات.',
          'إصدار التقرير النهائي متضمناً النتائج والتوصيات العملية، مع عرض واضح للإدارة لضمان خطوات قابلة للتنفيذ.',
        ],
        form: {
          name: 'الاسم',
          email: 'البريد الإلكتروني',
          phone: 'الهاتف (اختياري)',
          message: 'ما الذي تحتاجه؟',
          send: 'إرسال',
          sending: 'جارٍ الإرسال…',
          ok: 'شكرًا لك! تم استلام رسالتك.',
          err: 'حدث خطأ، حاول مرة أخرى.',
        },
      },
    }),
    [lang]
  )

  // ====== Data ======
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

  const steps = [
    { n: 1, en: 'Discovery', ar: 'الاستكشاف' },
    { n: 2, en: 'Proposal', ar: 'العرض' },
    { n: 3, en: 'Fieldwork', ar: 'العمل الميداني' },
    { n: 4, en: 'Delivery', ar: 'التسليم' },
  ]

  // ====== Blog posts (full) ======
  const posts = [
    {
      id: 'post-1',
      titleAr: 'لماذا وجود مراجع حسابات قبل الاستثمار ضرورة أساسية؟',
      excerptAr:
        'تعرف على الأسباب التي تجعل وجود مراجع حسابات قبل ضخ أموال المستثمرين في أي شركة خطوة ضرورية وليست مجرد إجراء شكلي.',
      contentAr: (
        <>
          <p className="mb-3">
            <strong>1. التأكد من صحة البيانات المالية</strong>
            <br />
            المستثمر يعتمد على القوائم المالية للشركة (الأرباح، الخسائر، الأصول، الالتزامات).
            مراجع الحسابات يضمن أن هذه البيانات موثوقة ودقيقة وليست مجرد أرقام معدّة للتجميل أو التضليل.
          </p>
          <p className="mb-3">
            <strong>2. الكشف عن المخاطر والمشاكل المخفية</strong>
            <br />
            بعض الشركات قد تُخفي ديونًا أو التزامات قانونية أو خسائر مرحّلة.
            المراجع يقوم بالفحص والتدقيق ليكشف أي مخاطر مالية أو قانونية قد تؤثر على قرار الاستثمار.
          </p>
          <p className="mb-3">
            <strong>3. تقدير القيمة العادلة للشركة</strong>
            <br />
            المستثمر يحتاج أن يعرف: هل تقييم الشركة عادل أم مبالغ فيه؟ عبر المراجعة،
            يتم التحقق من الأصول الحقيقية للشركة (مثل العقارات، المخزون، حقوق الملكية الفكرية) وضمان أنها ليست مضخمة.
          </p>
          <p className="mb-3">
            <strong>4. تعزيز الشفافية والثقة</strong>
            <br />
            وجود تقرير مراجعة محايد يعطي المستثمر ثقة أكبر في التعامل مع إدارة الشركة؛ والشركات الجادة ترحب بالمراجعة كدليل مصداقية.
          </p>
          <p className="mb-3">
            <strong>5. التوافق مع القوانين والضرائب</strong>
            <br />
            كثير من الاستثمارات تفشل لاحقًا بسبب مشاكل قانونية أو ضريبية غير واضحة؛ المراجع يتحقق من الالتزام ويقلل المخاطر المستقبلية.
          </p>
          <p className="mb-3">
            <strong>6. حماية أموال المستثمر</strong>
            <br />
            المراجع هو عين محايدة للمستثمر؛ يضمن دخول الأموال إلى شركة ذات أساس مالي قوي، وليست على وشك الانهيار.
          </p>
        </>
      ),
      titleEn: 'Why Having an Auditor Before Investment is Essential',
      excerptEn:
        'Discover why an independent audit is crucial for investors before committing funds—not just a box-ticking formality.',
      contentEn: (
        <>
          <p className="mb-3">
            <strong>1. Verifying Financial Data</strong>
            <br />
            Investors rely on financial statements (profit, loss, assets, liabilities).
            An auditor ensures the data is reliable—not “window-dressed”.
          </p>
          <p className="mb-3">
            <strong>2. Revealing Hidden Risks</strong>
            <br />
            Companies may hide debts, legal obligations, or accumulated losses.
            Auditors uncover financial and legal risks that could affect the decision.
          </p>
          <p className="mb-3">
            <strong>3. Fair Valuation</strong>
            <br />
            Is the valuation fair or inflated? Auditors validate real asset values (property, inventory, IP) and prevent overstatement.
          </p>
          <p className="mb-3">
            <strong>4. Transparency & Trust</strong>
            <br />
            An independent audit report boosts investor confidence; serious companies welcome it as credibility proof.
          </p>
          <p className="mb-3">
            <strong>5. Legal & Tax Compliance</strong>
            <br />
            Many deals fail due to hidden legal/tax issues later; audits verify compliance and reduce future liabilities.
          </p>
          <p className="mb-3">
            <strong>6. Safeguarding Funds</strong>
            <br />
            The auditor acts as the investor’s neutral eye—ensuring funds go into a financially sound company.
          </p>
        </>
      ),
    },
    {
      id: 'post-2',
      titleAr: 'لماذا تحتاج الشركات الناشئة والصغيرة والمتوسطة إلى مراجع حسابات داخلي؟',
      excerptAr:
        'وجود مراجع داخلي مستقل يضمن متابعة دورية وكشف الواقع المالي للشركة، بما يتجاوز مجرد الامتثال السنوي.',
      contentAr: (
        <>
          <p className="mb-3">
            <strong>في معظم الدول</strong>، تُلزم الشركات بمراجع خارجي سنوي لإعداد الميزانية وفق المتطلبات الضريبية والتنظيمية.
            لكن الشركات الناشئة والصغيرة والمتوسطة تحتاج أكثر من ذلك: متابعة دورية تكشف الواقع الفعلي.
          </p>
          <p className="mb-3">
            <strong>1. التوفيق بين الميزانية الرسمية والميزانية الواقعية</strong>
            <br />
            <em>الميزانية الرسمية</em>: تعتمد على الفواتير والإيصالات الموثقة قانونيًا وقد لا تشمل كل الإيرادات النقدية أو المصروفات غير المثبتة.
            <br />
            <em>الميزانية الداخلية</em>: تعكس الوضع الفعلي للشركة، بما في ذلك الإيرادات النقدية والمصروفات الفعلية والالتزامات الحقيقية.
            <br />
            وجود مراجع داخلي يضمن وجود ميزانيتين واضحتين: نسخة رسمية للجهات الحكومية، ونسخة داخلية دقيقة للإدارة.
          </p>
          <p className="mb-3">
            <strong>2. الحماية من الأخطاء والفساد</strong>
            <br />
            مراجعة مستمرة للدورة المحاسبية، والتحقق من دقة استخدام النظام المحاسبي، ومطابقة الجرد الفعلي مع الدفاتر، وكشف أي اختلاس أو سوء استخدام مبكرًا.
          </p>
          <p className="mb-3">
            <strong>3. تحسين كفاءة الإدارة المالية</strong>
            <br />
            الإدارة تحتاج أرقامًا <em>حقيقية</em> لاتخاذ القرارات: الإيرادات النقدية الفعلية، مواضع الهدر، وصافي الربح الحقيقي بعيدًا عن التعديلات الضريبية.
          </p>
          <p className="mb-3">
            <strong>4. بناء الثقة مع الشركاء والمستثمرين</strong>
            <br />
            وجود منظومة مراجعة داخلية يعزز مصداقية الشركة ويظهر جدّية إدارة المخاطر والشفافية.
          </p>
          <p className="mb-3">
            <strong>5. التكيف مع اختلاف القوانين بين الدول</strong>
            <br />
            مع اختلاف الاعتراف بالمستندات بين البلدان، يساعد المراجع الداخلي على إعداد تقارير متوازنة: متوافقة محليًا وتعكس الواقع الإداري.
          </p>
          <p className="mb-3">
            <strong>الخلاصة</strong>
            <br />
            المراجع الخارجي يحقق الامتثال؛ أما الداخلي فيحقق الشفافية والحماية والنمو المستدام—وهو استثمار استراتيجي، لا تكلفة إضافية.
          </p>
        </>
      ),
      titleEn: 'Why Do Startups and SMEs Need an Internal Auditor?',
      excerptEn:
        'An internal, independent auditor provides ongoing oversight and a true financial picture—beyond annual statutory compliance.',
      contentEn: (
        <>
          <p className="mb-3">
            <strong>In many countries</strong>, companies must appoint an external auditor annually for statutory financials.
            Startups and SMEs, however, need continuous oversight to reflect the <em>real</em> operational picture.
          </p>
          <p className="mb-3">
            <strong>1. Reconciling Official vs. Actual Budgets</strong>
            <br />
            <em>Official budgets</em> rely on legally recognized invoices/receipts and may omit cash revenues or non-documented expenses.
            <br />
            <em>Internal budgets</em> reflect the actual situation: cash inflows, real expenses, and true commitments.
            <br />
            An internal auditor ensures two clear views: a statutory version for authorities and an accurate internal version for management.
          </p>
          <p className="mb-3">
            <strong>2. Protection from Errors and Fraud</strong>
            <br />
            Continuous checks of the accounting cycle, proper system use, inventory-to-ledger reconciliations, and early detection of misuse or fraud.
          </p>
          <p className="mb-3">
            <strong>3. Improving Financial Management Efficiency</strong>
            <br />
            Management needs <em>real</em> numbers: actual cash revenues, where spending is inefficient, and true net profit (beyond tax adjustments).
          </p>
          <p className="mb-3">
            <strong>4. Building Trust with Partners and Investors</strong>
            <br />
            Internal audit frameworks demonstrate professionalism and transparency—boosting investor confidence.
          </p>
          <p className="mb-3">
            <strong>5. Adapting to Cross-Country Legal Differences</strong>
            <br />
            With varying document recognition across jurisdictions, the internal auditor helps produce balanced reports:
            locally compliant yet reflective of managerial reality.
          </p>
          <p className="mb-3">
            <strong>Bottom line</strong>
            <br />
            External audits achieve compliance; internal audits deliver transparency, protection, and sustainable growth—an <em>investment</em>, not a cost.
          </p>
        </>
      ),
    },
  ]

  // ====== Effects ======
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
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

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleHash = () => {
      const m = (window.location.hash || '').match(/^#blog\/(post-[^\/#]+)/)
      if (m && m[1]) setOpenPostId(m[1])
      else setOpenPostId(null)
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onKey = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') {
        setLbIndex((i) => (i + 1) % infographs.length)
        resetZoom()
      }
      if (e.key === 'ArrowLeft') {
        setLbIndex((i) => (i - 1 + infographs.length) % infographs.length)
        resetZoom()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  // ====== Helpers ======
  const navClass = (id) =>
    `transition-colors ${active === id ? 'font-semibold underline underline-offset-8' : ''}`

  const openPost = (id) => {
    setOpenPostId(id)
    if (typeof window !== 'undefined') window.location.hash = `#blog/${id}`
  }
  const closePost = () => {
    setOpenPostId(null)
    if (typeof window !== 'undefined') window.location.hash = '#blog'
  }

  const openLightbox = (index) => {
    setLbIndex(index)
    setLbZoom(1)
    setPan({ x: 0, y: 0 })
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const zoomIn = () => setLbZoom((z) => Math.min(4, +(z + 0.2).toFixed(2)))
  const zoomOut = () => setLbZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))
  const resetZoom = () => {
    setLbZoom(1)
    setPan({ x: 0, y: 0 })
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

  // ====== SVG Icons for Process ======
  const StepIcon = ({ i, color = PRIMARY }) => {
    const common = {
      width: 24,
      height: 24,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }
    const style = { color }
    if (i === 0) {
      // Discovery
      return (
        <svg {...common} style={style} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6"></circle>
          <path d="M20 20l-3.5-3.5"></path>
        </svg>
      )
    }
    if (i === 1) {
      // Proposal
      return (
        <svg {...common} style={style} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"></path>
          <path d="M14 3v5h5"></path>
          <path d="M9 13h6M9 17h6"></path>
        </svg>
      )
    }
    if (i === 2) {
      // Fieldwork
      return (
        <svg {...common} style={style} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
          <path d="M19.4 15a7.5 7.5 0 0 0 .1-2l2-1.2-2-3.5-2.3.6c-.5-.4-1.1-.7-1.7-1l-.3-2.4h-4l-.3 2.4c-.6.3-1.2.6-1.7 1l-2.3-.6-2 3.5 2 1.2a7.5 7.5 0 0 0 0 2l-2 1.2 2 3.5 2.3-.6c.5.4 1.1.7 1.7 1l.3 2.4h4l.3-2.4c.6-.3 1.2-.6 1.7-1l2.3.6 2-3.5-2-1.2z"></path>
        </svg>
      )
    }
    // Delivery
    return (
      <svg {...common} style={style} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 4v6c0 5-3.5 7-8 8-4.5-1-8-3-8-8V7l8-4z"></path>
        <path d="M9 12l2.2 2.2L15 10"></path>
      </svg>
    )
  }

  // ====== UI ======
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
            <a href="#services" className={navClass('services')}>
              {dict[lang].nav.services}
            </a>
            <a href="#process" className={navClass('process')}>
              {dict[lang].nav.process}
            </a>
            <a href="#about" className={navClass('about')}>
              {dict[lang].nav.about}
            </a>
            <a href="#blog" className={navClass('blog')}>
              {dict[lang].nav.blog}
            </a>
            <a href="#infograph" className={navClass('infograph')}>
              {dict[lang].nav.infograph}
            </a>
            <a href="#contact" className={navClass('contact')}>
              {dict[lang].nav.contact}
            </a>
          </nav>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-3 py-1 border rounded">
            {dict[lang].switch}
          </button>
        </div>
      </header>

      {/* HERO */}
      <a id="top" />
      <section
        className="text-center py-20 text-white"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}
      >
        <h1 className="text-4xl font-bold">{dict[lang].hero}</h1>
        <p className="mt-3 max-w-2xl mx-auto">{dict[lang].desc}</p>
        <div className="mt-6 flex gap-4 justify-center">
          <a
            href="#services"
            className="px-4 py-2 text-white rounded"
            style={{ backgroundColor: PRIMARY_DARK }}
          >
            {dict[lang].ctaExplore}
          </a>
          <a
            href="https://wa.me/96879434422"
            className="px-4 py-2 text-white rounded"
            style={{ backgroundColor: WHATSAPP }}
          >
            {dict[lang].whatsapp}
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14 text-center scroll-mt-24" style={{ background: SOFT_BG }}>
        <h2 className="text-2xl font-bold" style={{ color: PRIMARY }}>
          {dict[lang].servicesTitle}
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {services.map((s, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border hover:shadow transition">
              <div className="text-4xl">{s.icon}</div>
              <h3 className="mt-3 font-semibold">{lang === 'ar' ? s.ar : s.en}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS (Accordion + SVG Icons) */}
      <section
        id="process"
        className="py-14 text-white border-y border-slate-200 scroll-mt-24"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}
      >
        <h2 className="text-2xl font-bold text-center">{dict[lang].processTitle}</h2>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {steps.map((s, i) => {
            const isOpen = openStep === i
            return (
              <div key={s.n} className="bg-white rounded-2xl border shadow-sm overflow-hidden text-slate-900">
                {/* رأس البطاقة */}
                <button
                  onClick={() => setOpenStep(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 p-5 text-left group focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                  aria-expanded={isOpen}
                  aria-controls={`step-panel-${i}`}
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100">
                    <StepIcon i={i} color={PRIMARY} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold" style={{ color: PRIMARY }}>
                      0{s.n}
                    </div>
                    <div className="mt-0.5 font-semibold">{lang === 'ar' ? s.ar : s.en}</div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* المحتوى القابل للطي */}
                <div
                  id={`step-panel-${i}`}
                  className={`px-5 pb-5 transition-all duration-250 ease-out ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-slate-600">{dict[lang].processDesc[i]}</p>
                </div>
              </div>
            )
          })}
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

      {/* BLOG */}
      <section id="blog" className="py-16 bg-white border-t border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{dict[lang].blogTitle}</h2>

          {!openPostId && (
            <div className="space-y-6">
              {posts.map((p) => (
                <article
                  key={p.id}
                  className={`p-6 bg-slate-50 rounded-2xl shadow hover:shadow-md transition ${
                    rtl ? 'text-right' : 'text-left'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">
                    {lang === 'ar' ? p.titleAr : p.titleEn}
                  </h3>
                  <p className="text-slate-600 mb-3 text-center max-w-4xl mx-auto">
                    {lang === 'ar' ? p.excerptAr : p.excerptEn}
                  </p>
                  <div className={rtl ? 'text-left' : 'text-right'}>
                    <a
                      href={`#blog/${p.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        openPost(p.id)
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      {dict[lang].readMore}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {openPostId && (
            <BlogDetail
              lang={lang}
              rtl={rtl}
              post={posts.find((x) => x.id === openPostId)}
              onBack={closePost}
              dict={dict}
            />
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
                      ? i === 0
                        ? 'لماذا وجود مراجع حسابات قبل الاستثمار'
                        : 'لماذا تحتاج الشركات مراجعًا داخليًا'
                      : i === 0
                        ? 'Why an auditor before investing'
                        : 'Why an internal auditor'}
                  </span>
                  <button
                    onClick={() => openLightbox(i)}
                    className="px-3 py-1 text-xs border rounded hover:bg-slate-50"
                  >
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
      <footer className="py-6 text-center border-t text-slate-500 text-sm">
        © {new Date().getFullYear()} The Bridge Audit & Consulting
      </footer>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex flex-col" onClick={closeLightbox}>
          <div className="flex items-center gap-2 p-3 ms-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLbIndex((i) => (i - 1 + infographs.length) % infographs.length)
                resetZoom()
              }}
              className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow"
            >
              {dict[lang].prev}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLbZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))
              }}
              className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow"
            >
              {dict[lang].zoomOut}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                resetZoom()
              }}
              className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow"
            >
              {dict[lang].reset}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLbZoom((z) => Math.min(4, +(z + 0.2).toFixed(2)))
              }}
              className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow"
            >
              {dict[lang].zoomIn}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLbIndex((i) => (i + 1) % infographs.length)
                resetZoom()
              }}
              className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow"
            >
              {dict[lang].next}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow"
            >
              {dict[lang].close}
            </button>
          </div>

          <div
            className="relative flex-1 overflow-hidden px-4 pb-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              e.preventDefault()
              e.stopPropagation()
              e.deltaY < 0 ? zoomIn() : zoomOut()
            }}
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, lang }),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok)
        setForm({ name: '', email: '', phone: '', message: '', _gotcha: '' })
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
      className={`mt-6 bg-white p-6 rounded-2xl shadow-md space-y-4 ${
        rtl ? 'text-right' : 'text-left'
      }`}
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

      {status === 'ok' && (
        <div className="text-green-600 text-sm">{dict[lang].form.ok}</div>
      )}
      {status === 'err' && (
        <div className="text-red-600 text-sm">{dict[lang].form.err}</div>
      )}
    </form>
  )
}
