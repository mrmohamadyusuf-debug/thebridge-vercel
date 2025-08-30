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

  // ====== Process Tabs ======
  const [openStep, setOpenStep] = useState(0) // 0..3

  // ====== Service Detail Routing ======
  const [openServiceSlug, setOpenServiceSlug] = useState(null) // e.g. 'audit-assurance'

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
        serviceBack: 'Back to services',
        learnMore: 'Learn more',
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
        serviceBack: 'عودة إلى الخدمات',
        learnMore: 'تفاصيل الخدمة',
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

  // ====== Service Icons (SVG) ======
  const ServiceIcon = ({ name }) => {
    const common = { width: 36, height: 36, viewBox: '0 0 24 24', fill: 'none', stroke: PRIMARY, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
    switch (name) {
      case 'audit': return (<svg {...common}><path d="M4 7h12l4 4v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><path d="M16 7v4h4"/></svg>)
      case 'limited': return (<svg {...common}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 8h10M7 12h6"/></svg>)
      case 'internal': return (<svg {...common}><path d="M12 2l8 4v6c0 5-3.5 7-8 8-4.5-1-8-3-8-8V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>)
      case 'tax': return (<svg {...common}><path d="M4 4h16v6H4z"/><path d="M4 14h16v6H4z"/><path d="M7 7h2M7 17h2"/></svg>)
      case 'compliance': return (<svg {...common}><rect x="4" y="3" width="12" height="18" rx="2"/><path d="M8 7h6M8 11h6M8 15h6"/><path d="M18 8l3 3-5 5"/></svg>)
      case 'setup': return (<svg {...common}><path d="M12 6v12M6 12h12"/><circle cx="12" cy="12" r="9"/></svg>)
      case 'reporting': return (<svg {...common}><path d="M3 20h18"/><rect x="7" y="9" width="3" height="7"/><rect x="12" y="5" width="3" height="11"/><rect x="17" y="12" width="3" height="4"/></svg>)
      case 'retainer': return (<svg {...common}><path d="M4 7a4 4 0 0 1 8 0v10a4 4 0 0 1-8 0V7z"/><path d="M12 7a4 4 0 1 1 8 0v10a4 4 0 1 1-8 0"/></svg>)
      case 'valuation': return (<svg {...common}><path d="M3 3v18h18"/><path d="M7 15l3-3 3 3 5-5"/></svg>)
      default: return (<svg {...common}><circle cx="12" cy="12" r="9"/></svg>)
    }
  }

  // ====== Services Data (with detail pages) ======
  const services = [
    {
      slug: 'audit-assurance',
      icon: 'audit',
      en: 'Audit & Assurance',
      ar: 'التدقيق والمراجعة',
      brief: {
        en: 'Independent audit with clear findings and risk-focused recommendations.',
        ar: 'تدقيق مستقل بنتائج واضحة وتوصيات تركّز على المخاطر.',
      },
      steps: {
        en: ['Understanding business and controls', 'Substantive and control testing', 'Management letter and audit opinion'],
        ar: ['فهم النشاط والرقابة الداخلية', 'اختبارات تفصيلية ورقابية', 'خطاب الملاحظات ورأي المراجع'],
      },
    },
    {
      slug: 'limited-review',
      icon: 'limited',
      en: 'Limited Review (SMEs)',
      ar: 'المراجعة المحدودة للشركات الصغيرة',
      brief: {
        en: 'Analytical review for SMEs to provide moderate assurance.',
        ar: 'مراجعة تحليلية للشركات الصغيرة لتقديم مستوى معقول من التأكيد.',
      },
      steps: {
        en: ['Analytical procedures', 'Inquiry with management', 'Review report issuance'],
        ar: ['إجراءات تحليلية', 'الاستفسار مع الإدارة', 'إصدار تقرير المراجعة'],
      },
    },
    {
      slug: 'internal-audit',
      icon: 'internal',
      en: 'Internal Audit',
      ar: 'التدقيق الداخلي',
      brief: {
        en: 'Ongoing assurance on processes, risks, and controls.',
        ar: 'ضمان مستمر للعمليات والمخاطر والضوابط.',
      },
      steps: {
        en: ['Risk assessment & plan', 'Process walkthroughs & testing', 'Actionable recommendations'],
        ar: ['تقييم المخاطر وخطة', 'استعراض العمليات والاختبارات', 'توصيات قابلة للتنفيذ'],
      },
    },
    {
      slug: 'tax-advisory',
      icon: 'tax',
      en: 'Tax Advisory & Returns',
      ar: 'الاستشارات الضريبية والإقرارات',
      brief: {
        en: 'Compliance and efficient tax structuring with on-time filing.',
        ar: 'امتثال وهيكلة ضريبية فعّالة وتقديم في الوقت المحدد.',
      },
      steps: {
        en: ['Assess obligations', 'Optimize structure', 'Prepare & file returns'],
        ar: ['تقييم الالتزامات', 'تحسين الهيكلة', 'إعداد وتقديم الإقرارات'],
      },
    },
    {
      slug: 'compliance-quality',
      icon: 'compliance',
      en: 'Compliance & Quality',
      ar: 'الامتثال والجودة',
      brief: {
        en: 'Policies, procedures, and QC reviews aligned with standards.',
        ar: 'سياسات وإجراءات ومراجعات جودة متوافقة مع المعايير.',
      },
      steps: {
        en: ['Gap analysis', 'Policy design', 'Internal QA/QC reviews'],
        ar: ['تحليل الفجوات', 'تصميم السياسات', 'مراجعات ضمان الجودة'],
      },
    },
    {
      slug: 'accounting-setup',
      icon: 'setup',
      en: 'Accounting System Setup',
      ar: 'إعداد الأنظمة المحاسبية',
      brief: {
        en: 'Chart of accounts, workflows, and training for your team.',
        ar: 'دليل الحسابات، تدفقات العمل، وتدريب الفريق.',
      },
      steps: {
        en: ['Assess needs & select system', 'Configure COA & workflows', 'Train & handover'],
        ar: ['تقييم الاحتياج واختيار النظام', 'إعداد الدليل والتدفقات', 'التدريب والتسليم'],
      },
    },
    {
      slug: 'financial-reporting',
      icon: 'reporting',
      en: 'Financial Reporting & KPIs',
      ar: 'التقارير والمؤشرات المالية',
      brief: {
        en: 'Timely management reports and dashboards mapped to KPIs.',
        ar: 'تقارير إدارية ولوحات مؤشرات مرتبطة بأهم KPIs.',
      },
      steps: {
        en: ['Define KPIs', 'Automate reporting', 'Monthly insights'],
        ar: ['تحديد المؤشرات', 'أتمتة التقارير', 'تحليلات شهرية'],
      },
    },
    {
      slug: 'advisory-retainers',
      icon: 'retainer',
      en: 'Advisory Retainers',
      ar: 'خدمات استشارية مستمرة',
      brief: {
        en: 'On-call finance partner for growth decisions.',
        ar: 'شريك مالي عند الطلب لدعم قرارات النمو.',
      },
      steps: {
        en: ['Monthly check-ins', 'Ad-hoc analysis', 'Board-ready summaries'],
        ar: ['اجتماعات شهرية', 'تحليلات عند الطلب', 'ملخصات للإدارة'],
      },
    },
    {
      slug: 'business-valuation',
      icon: 'valuation',
      en: 'Business Valuation',
      ar: 'تقييم الأعمال',
      brief: {
        en: 'Fair value analysis for deals, funding, or dispute resolution.',
        ar: 'تحديد القيمة العادلة للصفقات أو التمويل أو تسوية النزاعات.',
      },
      steps: {
        en: ['Data gathering & normalize', 'DCF / market methods', 'Valuation report'],
        ar: ['جمع البيانات ومواءمتها', 'طرق DCF / السوق', 'تقرير التقييم'],
      },
    },
  ]

  // ====== Steps (Process) ======
  const stepsProc = [
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
          <p className="mb-3"><strong>1. التأكد من صحة البيانات المالية</strong><br/> المستثمر يعتمد على القوائم المالية للشركة (الأرباح، الخسائر، الأصول، الالتزامات). مراجع الحسابات يضمن أن هذه البيانات موثوقة ودقيقة وليست مجرد أرقام معدّة للتجميل أو التضليل.</p>
          <p className="mb-3"><strong>2. الكشف عن المخاطر والمشاكل المخفية</strong><br/> بعض الشركات قد تُخفي ديونًا أو التزامات قانونية أو خسائر مرحّلة. المراجع يقوم بالفحص والتدقيق ليكشف أي مخاطر مالية أو قانونية قد تؤثر على قرار الاستثمار.</p>
          <p className="mb-3"><strong>3. تقدير القيمة العادلة للشركة</strong><br/> المستثمر يحتاج أن يعرف: هل تقييم الشركة عادل أم مبالغ فيه؟ عبر المراجعة، يتم التحقق من الأصول الحقيقية للشركة (مثل العقارات، المخزون، حقوق الملكية الفكرية) وضمان أنها ليست مضخمة.</p>
          <p className="mb-3"><strong>4. تعزيز الشفافية والثقة</strong><br/> وجود تقرير مراجعة محايد يعطي المستثمر ثقة أكبر في التعامل مع إدارة الشركة؛ والشركات الجادة ترحب بالمراجعة كدليل مصداقية.</p>
          <p className="mb-3"><strong>5. التوافق مع القوانين والضرائب</strong><br/> كثير من الاستثمارات تفشل لاحقًا بسبب مشاكل قانونية أو ضريبية غير واضحة؛ المراجع يتحقق من الالتزام ويقلل المخاطر المستقبلية.</p>
          <p className="mb-3"><strong>6. حماية أموال المستثمر</strong><br/> المراجع هو عين محايدة للمستثمر؛ يضمن دخول الأموال إلى شركة ذات أساس مالي قوي، وليست على وشك الانهيار.</p>
        </>
      ),
      titleEn: 'Why Having an Auditor Before Investment is Essential',
      excerptEn:
        'Discover why an independent audit is crucial for investors before committing funds—not just a box-ticking formality.',
      contentEn: (
        <>
          <p className="mb-3"><strong>1. Verifying Financial Data</strong><br/> Investors rely on financial statements (profit, loss, assets, liabilities). An auditor ensures the data is reliable—not “window-dressed”.</p>
          <p className="mb-3"><strong>2. Revealing Hidden Risks</strong><br/> Companies may hide debts, legal obligations, or accumulated losses. Auditors uncover financial and legal risks that could affect the decision.</p>
          <p className="mb-3"><strong>3. Fair Valuation</strong><br/> Is the valuation fair or inflated? Auditors validate real asset values (property, inventory, IP) and prevent overstatement.</p>
          <p className="mb-3"><strong>4. Transparency & Trust</strong><br/> An independent audit report boosts investor confidence; serious companies welcome it as credibility proof.</p>
          <p className="mb-3"><strong>5. Legal & Tax Compliance</strong><br/> Many deals fail due to hidden legal/tax issues later; audits verify compliance and reduce future liabilities.</p>
          <p className="mb-3"><strong>6. Safeguarding Funds</strong><br/> The auditor acts as the investor’s neutral eye—ensuring funds go into a financially sound company.</p>
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
          <p className="mb-3"><strong>في معظم الدول</strong>، تُلزم الشركات بمراجع خارجي سنوي لإعداد الميزانية وفق المتطلبات الضريبية والتنظيمية. لكن الشركات الناشئة والصغيرة والمتوسطة تحتاج أكثر من ذلك: متابعة دورية تكشف الواقع الفعلي.</p>
          <p className="mb-3"><strong>1. التوفيق بين الميزانية الرسمية والميزانية الواقعية</strong><br/> <em>الميزانية الرسمية</em>: تعتمد على الفواتير والإيصالات الموثقة قانونيًا وقد لا تشمل كل الإيرادات النقدية أو المصروفات غير المثبتة.<br/> <em>الميزانية الداخلية</em>: تعكس الوضع الفعلي للشركة، بما في ذلك الإيرادات النقدية والمصروفات الفعلية والالتزامات الحقيقية.<br/> وجود مراجع داخلي يضمن وجود ميزانيتين واضحتين: نسخة رسمية للجهات الحكومية، ونسخة داخلية دقيقة للإدارة.</p>
          <p className="mb-3"><strong>2. الحماية من الأخطاء والفساد</strong><br/> مراجعة مستمرة للدورة المحاسبية، والتحقق من دقة استخدام النظام المحاسبي، ومطابقة الجرد الفعلي مع الدفاتر، وكشف أي اختلاس أو سوء استخدام مبكرًا.</p>
          <p className="mb-3"><strong>3. تحسين كفاءة الإدارة المالية</strong><br/> الإدارة تحتاج أرقامًا <em>حقيقية</em> لاتخاذ القرارات: الإيرادات النقدية الفعلية، مواضع الهدر، وصافي الربح الحقيقي بعيدًا عن التعديلات الضريبية.</p>
          <p className="mb-3"><strong>4. بناء الثقة مع الشركاء والمستثمرين</strong><br/> وجود منظومة مراجعة داخلية يعزز مصداقية الشركة ويظهر جدّية إدارة المخاطر والشفافية.</p>
          <p className="mb-3"><strong>5. التكيف مع اختلاف القوانين بين الدول</strong><br/> مع اختلاف الاعتراف بالمستندات بين البلدان، يساعد المراجع الداخلي على إعداد تقارير متوازنة: متوافقة محليًا وتعكس الواقع الإداري.</p>
          <p className="mb-3"><strong>الخلاصة</strong><br/> المراجع الخارجي يحقق الامتثال؛ أما الداخلي فيحقق الشفافية والحماية والنمو المستدام—وهو استثمار استراتيجي، لا تكلفة إضافية.</p>
        </>
      ),
      titleEn: 'Why Do Startups and SMEs Need an Internal Auditor?',
      excerptEn:
        'An internal, independent auditor provides ongoing oversight and a true financial picture—beyond annual statutory compliance.',
      contentEn: (
        <>
          <p className="mb-3"><strong>In many countries</strong>, companies must appoint an external auditor annually for statutory financials. Startups and SMEs, however, need continuous oversight to reflect the <em>real</em> operational picture.</p>
          <p className="mb-3"><strong>1. Reconciling Official vs. Actual Budgets</strong><br/> <em>Official budgets</em> rely on legally recognized invoices/receipts and may omit cash revenues or non-documented expenses.<br/> <em>Internal budgets</em> reflect the actual situation: cash inflows, real expenses, and true commitments.<br/> An internal auditor ensures two clear views: a statutory version for authorities and an accurate internal version for management.</p>
          <p className="mb-3"><strong>2. Protection from Errors and Fraud</strong><br/> Continuous checks of the accounting cycle, proper system use, inventory-to-ledger reconciliations, and early detection of misuse or fraud.</p>
          <p className="mb-3"><strong>3. Improving Financial Management Efficiency</strong><br/> Management needs <em>real</em> numbers: actual cash revenues, where spending is inefficient, and true net profit (beyond tax adjustments).</p>
          <p className="mb-3"><strong>4. Building Trust with Partners and Investors</strong><br/> Internal audit frameworks demonstrate professionalism and transparency—boosting investor confidence.</p>
          <p className="mb-3"><strong>5. Adapting to Cross-Country Legal Differences</strong><br/> With varying document recognition across jurisdictions, the internal auditor helps produce balanced reports: locally compliant yet reflective of managerial reality.</p>
          <p className="mb-3"><strong>Bottom line</strong><br/> External audits achieve compliance; internal audits deliver transparency, protection, and sustainable growth—an <em>investment</em>, not a cost.</p>
        </>
      ),
    },
  ]

  // ====== Effects ======
  useEffect(() => {
    if (typeof window === 'undefined') return
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

  // hash routing for blog + service
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleHash = () => {
      const hash = window.location.hash || ''
      const mPost = hash.match(/^#blog\/(post-[^\/#]+)/)
      const mSvc = hash.match(/^#service\/([a-z0-9-]+)/)
      if (mPost && mPost[1]) {
        setOpenPostId(mPost[1])
        setOpenServiceSlug(null)
      } else if (mSvc && mSvc[1]) {
        setOpenServiceSlug(mSvc[1])
        setOpenPostId(null)
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
      } else {
        setOpenPostId(null)
        setOpenServiceSlug(null)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    window.addEventListener('popstate', handleHash)
    return () => {
      window.removeEventListener('hashchange', handleHash)
      window.removeEventListener('popstate', handleHash)
    }
  }, [])

  // ====== Helpers ======
  const navClass = (id) =>
    `transition-colors ${active === id ? 'font-semibold underline underline-offset-8' : ''}`

  const openPost = (id) => {
    setOpenPostId(id)
    setOpenServiceSlug(null)
    if (typeof window !== 'undefined') window.location.hash = `#blog/${id}`
  }
  const closePost = () => {
    setOpenPostId(null)
    if (typeof window !== 'undefined') window.location.hash = '#blog'
  }

  const openService = (slug) => {
    setOpenServiceSlug(slug)
    if (typeof window !== 'undefined') window.location.hash = `#service/${slug}`
  }
  const closeService = () => {
    setOpenServiceSlug(null)
    if (typeof window !== 'undefined') window.location.hash = '#services'
  }

  const openLightbox = (index) => {
    setLbIndex(index); setLbZoom(1); setPan({ x: 0, y: 0 }); setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const zoomIn = () => setLbZoom((z) => Math.min(4, +(z + 0.2).toFixed(2)))
  const zoomOut = () => setLbZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))
  const resetZoom = () => { setLbZoom(1); setPan({ x: 0, y: 0 }) }

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
    const common = { width: 24, height: 24, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
    const style = { color }
    if (i === 0) return (<svg {...common} style={style} viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M20 20l-3.5-3.5"/></svg>)
    if (i === 1) return (<svg {...common} style={style} viewBox="0 0 24 24"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>)
    if (i === 2) return (<svg {...common} style={style} viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M19.4 15a7.5 7.5 0 0 0 .1-2l2-1.2-2-3.5-2.3.6c-.5-.4-1.1-.7-1.7-1l-.3-2.4h-4l-.3 2.4c-.6.3-1.2.6-1.7 1l-2.3-.6-2 3.5 2 1.2a7.5 7.5 0 0 0 0 2l-2 1.2 2 3.5 2.3.6c.5.4 1.1.7 1.7 1l.3 2.4h4l.3-2.4c.6-.3 1.2-.6 1.7-1l2.3.6 2-3.5-2-1.2z"/></svg>)
    return (<svg {...common} style={style} viewBox="0 0 24 24"><path d="M12 3l8 4v6c0 5-3.5 7-8 8-4.5-1-8-3-8-8V7l8-4z"/><path d="M9 12l2.2 2.2L15 10"/></svg>)
  }

  // ====== UI ======
  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-50 text-slate-900">

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 backdrop-blur border-b ${scrolled ? 'shadow-md' : ''}`}
        style={{ background: scrolled ? `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` : 'rgba(255,255,255,0.85)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <div>
              <div className="font-semibold" style={{ color: scrolled ? '#fff' : PRIMARY }}>The Bridge</div>
              <div className="text-xs" style={{ color: scrolled ? '#EEF2FF' : '#64748B' }}>{dict[lang].brandSmall}</div>
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
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-3 py-1 border rounded">{dict[lang].switch}</button>
        </div>
      </header>

      {/* HERO */}
      <a id="top" />
      <section className="text-center py-20 text-white"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}>
        <h1 className="text-4xl font-bold">{dict[lang].hero}</h1>
        <p className="mt-3 max-w-2xl mx-auto">{dict[lang].desc}</p>
        <div className="mt-6 flex gap-4 justify-center">
          <a href="#services" className="px-4 py-2 text-white rounded" style={{ backgroundColor: PRIMARY_DARK }}>{dict[lang].ctaExplore}</a>
          <a href="https://wa.me/96879434422" className="px-4 py-2 text-white rounded" style={{ backgroundColor: WHATSAPP }}>{dict[lang].whatsapp}</a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14 text-center scroll-mt-24" style={{ background: SOFT_BG }}>
        <h2 className="text-2xl font-bold" style={{ color: PRIMARY }}>{dict[lang].servicesTitle}</h2>

        {/* Grid OR Detail page */}
        {!openServiceSlug ? (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {services.map((s) => (
              <div key={s.slug} className="p-6 bg-white rounded-2xl border hover:shadow transition flex flex-col items-center">
                <ServiceIcon name={s.icon} />
                <h3 className="mt-3 font-semibold">{lang === 'ar' ? s.ar : s.en}</h3>
                <p className="mt-2 text-sm text-slate-600 min-h-[40px]">{lang === 'ar' ? s.brief.ar : s.brief.en}</p>
                <button onClick={() => openService(s.slug)} className="mt-4 px-4 py-2 text-sm border rounded hover:bg-slate-50">
                  {dict[lang].learnMore}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <ServiceDetail
            lang={lang}
            rtl={rtl}
            service={services.find((x) => x.slug === openServiceSlug)}
            onBack={closeService}
            dict={dict}
            PRIMARY={PRIMARY}
          />
        )}
      </section>

      {/* PROCESS (Tabs/Stepper) */}
      <section id="process" className="py-14 text-white border-y border-slate-200 scroll-mt-24"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}>
        <h2 className="text-2xl font-bold text-center">{dict[lang].processTitle}</h2>

        <div role="tablist" aria-label={dict[lang].processTitle}
          className="mt-8 max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4"
          onKeyDown={(e) => { if (e.key === 'ArrowRight') setOpenStep((openStep + 1) % stepsProc.length); if (e.key === 'ArrowLeft') setOpenStep((openStep - 1 + stepsProc.length) % stepsProc.length) }}
          tabIndex={0}>
          {stepsProc.map((s, i) => {
            const selected = openStep === i
            return (
              <button key={s.n} role="tab" aria-selected={selected} aria-controls={`process-panel-${i}`} id={`process-tab-${i}`}
                onClick={() => setOpenStep(i)}
                className={`relative flex items-center gap-3 rounded-2xl border bg-white p-4 text-left transition ${selected ? 'ring-2 ring-blue-500 shadow' : 'hover:shadow'} text-slate-900`}>
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100"><StepIcon i={i} color={PRIMARY} /></div>
                <div className="flex-1">
                  <div className="text-xs font-bold" style={{ color: PRIMARY }}>0{s.n}</div>
                  <div className="mt-0.5 font-semibold">{lang === 'ar' ? s.ar : s.en}</div>
                </div>
                {selected && <span className="absolute inset-x-0 -bottom-1 h-1 rounded-b-2xl" style={{ background: ACCENT }} aria-hidden="true" />}
              </button>
            )
          })}
        </div>

        <div role="tabpanel" id={`process-panel-${openStep}`} aria-labelledby={`process-tab-${openStep}`} className="mt-6 max-w-4xl mx-auto px-4">
          <div className="bg-white text-slate-700 rounded-2xl border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"><StepIcon i={openStep} color={PRIMARY} /></div>
              <h3 className="font-semibold text-slate-900">{lang === 'ar' ? stepsProc[openStep].ar : stepsProc[openStep].en}</h3>
            </div>
            <p className="text-sm leading-relaxed">{dict[lang].processDesc[openStep]}</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 text-center max-w-3xl mx-auto px-4 scroll-mt-24">
        <h2 className="text-2xl font-bold">{
          lang === 'en' ? 'About The Bridge' : 'من نحن'
        }</h2>
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
                <article key={p.id} className={`p-6 bg-slate-50 rounded-2xl shadow hover:shadow-md transition ${rtl ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">{lang === 'ar' ? p.titleAr : p.titleEn}</h3>
                  <p className="text-slate-600 mb-3 text-center max-w-4xl mx-auto">{lang === 'ar' ? p.excerptAr : p.excerptEn}</p>
                  <div className={rtl ? 'text-left' : 'text-right'}>
                    <a href={`#blog/${p.id}`} onClick={(e) => { e.preventDefault(); openPost(p.id) }} className="text-blue-600 hover:underline">{dict[lang].readMore}</a>
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
                <img src={src} alt={`Infograph ${i + 1}`} className="w-full rounded-lg cursor-zoom-in" onClick={() => openLightbox(i)} />
                <figcaption className="mt-3 text-sm text-slate-600 flex items-center justify-between">
                  <span>{lang === 'ar' ? (i === 0 ? 'لماذا وجود مراجع حسابات قبل الاستثمار' : 'لماذا تحتاج الشركات مراجعًا داخليًا') : (i === 0 ? 'Why an auditor before investing' : 'Why an internal auditor')}</span>
                  <button onClick={() => openLightbox(i)} className="px-3 py-1 text-xs border rounded hover:bg-slate-50">{dict[lang].view}</button>
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
            <a href="https://wa.me/96879434422" className="rounded-2xl px-5 py-3 text-white font-medium shadow" style={{ backgroundColor: WHATSAPP }}>{dict[lang].whatsapp}</a>
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
            <button onClick={(e) => { e.stopPropagation(); setLbIndex((i) => (i - 1 + infographs.length) % infographs.length); resetZoom() }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow">{dict[lang].prev}</button>
            <button onClick={(e) => { e.stopPropagation(); setLbZoom((z) => Math.max(1, +(z - 0.2).toFixed(2))) }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow">{dict[lang].zoomOut}</button>
            <button onClick={(e) => { e.stopPropagation(); resetZoom() }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow">{dict[lang].reset}</button>
            <button onClick={(e) => { e.stopPropagation(); setLbZoom((z) => Math.min(4, +(z + 0.2).toFixed(2))) }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow">{dict[lang].zoomIn}</button>
            <button onClick={(e) => { e.stopPropagation(); setLbIndex((i) => (i + 1) % infographs.length); resetZoom() }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow">{dict[lang].next}</button>
            <button onClick={(e) => { e.stopPropagation(); closeLightbox() }} className="px-3 py-1 text-sm bg-white/90 hover:bg-white rounded shadow">{dict[lang].close}</button>
          </div>
          <div className="relative flex-1 overflow-hidden px-4 pb-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => { e.preventDefault(); e.stopPropagation(); e.deltaY < 0 ? setLbZoom((z)=>Math.min(4, +(z+0.2).toFixed(2))) : setLbZoom((z)=>Math.max(1, +(z-0.2).toFixed(2))) }}
            onMouseDown={(e) => startPanHandler(e)}
            onMouseMove={movePanHandler}
            onMouseUp={endPanHandler}
            onMouseLeave={endPanHandler}
            onTouchStart={(e) => startPanHandler(e)}
            onTouchMove={movePanHandler}
            onTouchEnd={endPanHandler}
          >
            <img src={infographs[lbIndex]} alt="Infograph full" className="max-h-[85vh] max-w-full object-contain select-none"
              style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${lbZoom})`, cursor: lbZoom > 1 ? (isPanning ? 'grabbing' : 'grab') : 'zoom-in', transition: isPanning ? 'none' : 'transform 120ms ease' }}
              draggable={false} />
          </div>
        </div>
      )}
    </div>
  )
}

/* === Service Detail Page === */
function ServiceDetail({ lang, rtl, service, onBack, dict, PRIMARY }) {
  if (!service) return null
  return (
    <div className="max-w-4xl mx-auto px-4 mt-8 text-left">
      <div className={`flex ${rtl ? 'justify-start' : 'justify-end'} mb-4`}>
        <button onClick={onBack} className="px-4 py-2 rounded border text-sm hover:bg-slate-50">
          {dict[lang].serviceBack}
        </button>
      </div>
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
            {/* simple icon again */}
            <span className="sr-only">icon</span>
          </div>
          <h1 className="text-2xl font-bold">{lang === 'ar' ? service.ar : service.en}</h1>
        </div>
        <p className="mt-3 text-slate-600">{lang === 'ar' ? service.brief.ar : service.brief.en}</p>

        <ol className={`mt-5 space-y-3 ${rtl ? 'text-right' : 'text-left'}`}>
          {(lang === 'ar' ? service.steps.ar : service.steps.en).map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-1 inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: PRIMARY, color: '#fff' }}>{idx + 1}</div>
              <div className="text-sm leading-relaxed">{step}</div>
            </li>
          ))}
        </ol>
      </div>
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', _gotcha: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form._gotcha) return
    setSubmitting(true); setStatus(null)
    try {
      const res = await fetch('https://formspree.io/f/xpwjznko', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '', _gotcha: '' })
    } catch { setStatus('err') } finally { setSubmitting(false) }
  }

  const rtl = lang === 'ar'

  return (
    <form onSubmit={handleSubmit} className={`mt-6 bg-white p-6 rounded-2xl shadow-md space-y-4 ${rtl ? 'text-right' : 'text-left'}`}>
      <input type="text" name="_gotcha" value={form._gotcha} onChange={(e) => setForm({ ...form, _gotcha: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="text" name="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={dict[lang].form.name} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      <input type="email" name="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={dict[lang].form.email} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      <input type="tel" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={dict[lang].form.phone} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      <textarea name="message" rows="4" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={dict[lang].form.message} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      <div className={`mt-2 flex ${rtl ? 'justify-start' : 'justify-end'}`}>
        <button type="submit" disabled={submitting} className="min-w-32 bg-blue-600 text-white py-3 px-5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">
          {submitting ? dict[lang].form.sending : dict[lang].form.send}
        </button>
      </div>
      {status === 'ok' && <div className="text-green-600 text-sm">{dict[lang].form.ok}</div>}
      {status === 'err' && <div className="text-red-600 text-sm">{dict[lang].form.err}</div>}
    </form>
  )
}
