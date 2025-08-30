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
      nav: { services: 'Services', process: 'Process', about: 'About', blog: 'Blog', contact: 'Contact' },
      switch: 'العربية',
      hero: 'Audit & Consulting Services You Can Trust',
      desc: 'We help SMEs build confidence in their numbers with clear audits, practical advice and on-time delivery.',
      ctaExplore: 'Explore Services',
      servicesTitle: 'Our Services',
      processTitle: 'How We Work',
      aboutTitle: 'About The Bridge',
      blogTitle: 'Blog',
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
      nav: { services: 'الخدمات', process: 'آلية العمل', about: 'من نحن', blog: 'المقالات', contact: 'تواصل' },
      switch: 'EN',
      hero: 'خدمات تدقيق واستشارات مالية يمكنك الوثوق بها',
      desc: 'نساعد الشركات الصغيرة والمتوسطة على بناء الثقة في أرقامها من خلال تدقيق واضح وتوصيات عملية وتسليم في الوقت المحدد.',
      ctaExplore: 'خدماتنا',
      servicesTitle: 'الخدمات',
      processTitle: 'آلية العمل',
      aboutTitle: 'من نحن',
      blogTitle: 'المقالات',
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

  // الخدمات
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

  // الخطوات
  const steps = [
    { n: 1, en: 'Discovery', ar: 'الاستكشاف' },
    { n: 2, en: 'Proposal', ar: 'العرض' },
    { n: 3, en: 'Fieldwork', ar: 'العمل الميداني' },
    { n: 4, en: 'Delivery', ar: 'التسليم' },
  ]

  // المقالات
  const posts = [
    {
      id: "post-1",
      titleAr: "لماذا وجود مراجع حسابات قبل الاستثمار ضرورة أساسية؟",
      excerptAr: "تعرف على الأسباب التي تجعل وجود مراجع حسابات قبل ضخ أموال المستثمرين في أي شركة خطوة ضرورية وليست مجرد إجراء شكلي.",
      contentAr: (
        <>
          <p><strong>1. التأكد من صحة البيانات المالية</strong><br/> المستثمر يعتمد على القوائم المالية للشركة...</p>
          <p><strong>2. الكشف عن المخاطر والمشاكل المخفية</strong><br/> بعض الشركات قد تُخفي ديونًا...</p>
          <p><strong>3. تقدير القيمة العادلة للشركة</strong><br/> المستثمر يحتاج أن يعرف...</p>
          <p><strong>4. تعزيز الشفافية والثقة</strong><br/> وجود تقرير مراجعة محايد...</p>
          <p><strong>5. التوافق مع القوانين والضرائب</strong><br/> كثير من الاستثمارات تفشل...</p>
          <p><strong>6. حماية أموال المستثمر</strong><br/> وظيفة المراجع الأساسية...</p>
        </>
      ),
      titleEn: "Why Having an Auditor Before Investment is Essential",
      excerptEn: "Discover why an independent audit is a crucial step for investors before committing funds, and not just a formality.",
      contentEn: (
        <>
          <p><strong>1. Verifying Financial Data</strong><br/> Investors rely on financial statements...</p>
          <p><strong>2. Revealing Hidden Risks</strong><br/> Some companies may hide debts...</p>
          <p><strong>3. Fair Valuation of the Company</strong><br/> Investors need to know...</p>
          <p><strong>4. Enhancing Transparency and Trust</strong><br/> An independent audit report builds trust...</p>
          <p><strong>5. Compliance with Laws and Taxes</strong><br/> Many investments fail later...</p>
          <p><strong>6. Safeguarding Investor Funds</strong><br/> The auditor acts as investor’s neutral eye...</p>
        </>
      ),
    },
    {
      id: "post-2",
      titleAr: "لماذا تحتاج الشركات الناشئة والصغيرة والمتوسطة إلى مراجع حسابات داخلي؟",
      excerptAr: "تعرف على أهمية وجود مراجع داخلي يتابع الأرقام بشكل دوري ويكشف الواقع المالي للشركة بعيدًا عن الشكل القانوني فقط.",
      contentAr: (
        <>
          <p><strong>1. التوفيق بين الميزانية الرسمية والميزانية الواقعية</strong><br/> الميزانية الرسمية تعتمد على الفواتير...</p>
          <p><strong>2. الحماية من الأخطاء والفساد</strong><br/> المراجع الداخلي يراقب الدورة المحاسبية...</p>
          <p><strong>3. تحسين كفاءة الإدارة المالية</strong><br/> الإدارة تحتاج إلى أرقام حقيقية...</p>
          <p><strong>4. بناء الثقة مع الشركاء والمستثمرين</strong><br/> الشركات الناشئة غالبًا ما تبحث عن تمويل...</p>
          <p><strong>5. التكيف مع اختلاف القوانين بين الدول</strong><br/> بعض الدول تقبل المصروفات...</p>
        </>
      ),
      titleEn: "Why Do Startups and SMEs Need an Internal Auditor?",
      excerptEn: "Learn why startups and SMEs should have an internal auditor for ongoing monitoring, transparency, and sustainable growth.",
      contentEn: (
        <>
          <p><strong>1. Reconciling Official vs. Actual Budgets</strong><br/> Official budgets rely on invoices...</p>
          <p><strong>2. Protection from Errors and Fraud</strong><br/> The internal auditor monitors accounting cycles...</p>
          <p><strong>3. Improving Financial Management Efficiency</strong><br/> Management needs real numbers...</p>
          <p><strong>4. Building Trust with Investors</strong><br/> Startups often seek funding, internal audits build confidence...</p>
          <p><strong>5. Adapting to Legal Differences Across Countries</strong><br/> Internal auditors prepare balanced reports...</p>
        </>
      ),
    }
  ]

  // ===== Scrollspy =====
  useEffect(() => {
    const ids = ['services', 'process', 'about', 'blog', 'contact']
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 }
    )
    sections.forEach(sec => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  // Navbar scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = (id) =>
    `transition-colors ${active === id ? 'font-semibold underline underline-offset-8' : ''}`

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-50 text-slate-900">
      {/* باقي الكود (Navbar, Hero, Services, Process, About, Contact, Footer) */}
      {/* أضف هنا قسم Blog قبل Contact */}

      {/* BLOG */}
      <section id="blog" className="py-14 text-center scroll-mt-24 bg-white">
        <h2 className="text-2xl font-bold">{dict[lang].blogTitle}</h2>
        <div className="mt-8 max-w-4xl mx-auto space-y-6">
          {posts.map((p) => (
            <div key={p.id} className="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-md text-left">
              <h3 className="font-semibold text-blue-900">
                {lang === 'ar' ? p.titleAr : p.titleEn}
              </h3>
              <p className="mt-2 text-slate-600">
                {lang === 'ar' ? p.excerptAr : p.excerptEn}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
