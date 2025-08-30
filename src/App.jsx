import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [lang, setLang] = useState('en')
  const [active, setActive] = useState('services')
  const [scrolled, setScrolled] = useState(false)
  const rtl = lang === 'ar'

  // Brand colors
  const PRIMARY = '#0B4CA1'
  const PRIMARY_DARK = '#093E84'
  const ACCENT = '#1E90FF'
  const SOFT_BG = '#F5F8FF'
  const WHATSAPP = '#25D366'

  // i18n
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
      readMore: 'Read more →',
      backToList: 'Back to blog list ↑',
      form: {
        name: 'Your Name', email: 'Email', phone: 'Phone (optional)',
        message: 'How can we help?', send: 'Send', sending: 'Sending…',
        ok: 'Thanks! We received your message.', err: 'Something went wrong. Please try again.'
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
      readMore: 'اقرأ المزيد →',
      backToList: 'عودة إلى قائمة المقالات ↑',
      form: {
        name: 'الاسم', email: 'البريد الإلكتروني', phone: 'الهاتف (اختياري)',
        message: 'ما الذي تحتاجه؟', send: 'إرسال', sending: 'جارٍ الإرسال…',
        ok: 'شكرًا لك! تم استلام رسالتك.', err: 'حدث خطأ، حاول مرة أخرى.'
      }
    }
  }), [lang])

  // Services
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

  // Process
  const steps = [
    { n: 1, en: 'Discovery', ar: 'الاستكشاف' },
    { n: 2, en: 'Proposal', ar: 'العرض' },
    { n: 3, en: 'Fieldwork', ar: 'العمل الميداني' },
    { n: 4, en: 'Delivery', ar: 'التسليم' },
  ]

  // ===== BLOG POSTS (FULL CONTENT x2) =====
  const posts = [
    {
      id: 'post-1',
      titleAr: 'لماذا وجود مراجع حسابات قبل الاستثمار ضرورة أساسية؟',
      excerptAr: 'تعرف على الأسباب التي تجعل وجود مراجع حسابات قبل ضخ أموال المستثمرين في أي شركة خطوة ضرورية وليست مجرد إجراء شكلي.',
      contentAr: (
        <>
          <p className="mb-3"><strong>1. التأكد من صحة البيانات المالية</strong><br/>
            المستثمر يعتمد على القوائم المالية للشركة (الأرباح، الخسائر، الأصول، الالتزامات).<br/>
            مراجع الحسابات يضمن أن هذه البيانات موثوقة ودقيقة وليست مجرد أرقام معدّة للتجميل أو التضليل.</p>
          <p className="mb-3"><strong>2. الكشف عن المخاطر والمشاكل المخفية</strong><br/>
            بعض الشركات قد تُخفي ديونًا أو التزامات قانونية أو خسائر مرحّلة.<br/>
            المراجع يقوم بالفحص والتدقيق ليكشف أي مخاطر مالية أو قانونية قد تؤثر على قرار الاستثمار.</p>
          <p className="mb-3"><strong>3. تقدير القيمة العادلة للشركة</strong><br/>
            المستثمر يحتاج أن يعرف: هل تقييم الشركة عادل أم مبالغ فيه؟<br/>
            عبر المراجعة، يتم التحقق من الأصول الحقيقية للشركة (مثل العقارات، المخزون، حقوق الملكية الفكرية) وضمان أنها ليست مضخمة.</p>
          <p className="mb-3"><strong>4. تعزيز الشفافية والثقة</strong><br/>
            وجود تقرير مراجعة محايد يعطي المستثمر ثقة أكبر في التعامل مع إدارة الشركة، والشركات الجادة ترحب بالمراجعة كدليل مصداقية.</p>
          <p className="mb-3"><strong>5. التوافق مع القوانين والضرائب</strong><br/>
            كثير من الاستثمارات تفشل لاحقًا بسبب مشاكل قانونية أو ضريبية غير واضحة؛ المراجع يتحقق من الالتزام ويقلل المخاطر المستقبلية.</p>
          <p className="mb-3"><strong>6. حماية أموال المستثمر</strong><br/>
            المراجع هو عين محايدة للمستثمر؛ يضمن دخول الأموال إلى شركة ذات أساس مالي قوي، وليست على وشك الانهيار.</p>
        </>
      ),
      titleEn: 'Why Having an Auditor Before Investment is Essential',
      excerptEn: 'Discover why an independent audit is crucial for investors before committing funds—not just a box-ticking formality.',
      contentEn: (
        <>
          <p className="mb-3"><strong>1. Verifying Financial Data</strong><br/>
            Investors rely on financial statements (profit, loss, assets, liabilities).<br/>
            An auditor ensures the data is reliable, not “window-dressed”.</p>
          <p className="mb-3"><strong>2. Revealing Hidden Risks</strong><br/>
            Companies may hide debts, legal obligations, or accumulated losses.<br/>
            Auditors uncover financial and legal risks that could affect the decision.</p>
          <p className="mb-3"><strong>3. Fair Valuation</strong><br/>
            Is the valuation fair or inflated?<br/>
            Auditors validate real asset values (property, inventory, IP) and prevent overstatement.</p>
          <p className="mb-3"><strong>4. Transparency & Trust</strong><br/>
            An independent audit report boosts investor confidence; serious companies welcome it as credibility proof.</p>
          <p className="mb-3"><strong>5. Legal & Tax Compliance</strong><br/>
            Many deals fail due to hidden legal/tax issues later; audits verify compliance and reduce future liabilities.</p>
          <p className="mb-3"><strong>6. Safeguarding Funds</strong><br/>
            The auditor acts as the investor’s neutral eye, ensuring funds go into a financially sound company.</p>
        </>
      ),
    },
    {
      id: 'post-2',
      titleAr: 'لماذا تحتاج الشركات الناشئة والصغيرة والمتوسطة إلى مراجع حسابات داخلي؟',
      excerptAr: 'وجود مراجع داخلي مستقل يضمن متابعة دورية وكشف الواقع المالي للشركة، بما يتجاوز مجرد الامتثال السنوي.',
      contentAr: (
        <>
          <p className="mb-3"><strong>في معظم الدول</strong>، تُلزم الشركات بمراجع خارجي سنوي لإعداد الميزانية وفق المتطلبات الضريبية والتنظيمية. لكن الشركات الناشئة والصغيرة والمتوسطة تحتاج أكثر من ذلك: متابعة دورية تكشف الواقع الفعلي.</p>

          <p className="mb-3"><strong>1. التوفيق بين الميزانية الرسمية والميزانية الواقعية</strong><br/>
            <em>الميزانية الرسمية</em>: تعتمد على الفواتير والإيصالات الموثقة قانونيًا وقد لا تشمل كل الإيرادات النقدية أو المصروفات غير المثبتة.<br/>
            <em>الميزانية الداخلية</em>: تعكس الوضع الفعلي للشركة، بما في ذلك الإيرادات النقدية والمصروفات الفعلية والالتزامات الحقيقية.<br/>
            وجود مراجع داخلي يضمن وجود ميزانيتين واضحتين: نسخة رسمية للجهات الحكومية، ونسخة داخلية دقيقة للإدارة.</p>

          <p className="mb-3"><strong>2. الحماية من الأخطاء والفساد</strong><br/>
            مراجعة مستمرة للدورة المحاسبية، التحقق من دقة استخدام النظام المحاسبي، مطابقة الجرد الفعلي مع الدفاتر، وكشف أي اختلاس أو سوء استخدام مبكرًا.</p>

          <p className="mb-3"><strong>3. تحسين كفاءة الإدارة المالية</strong><br/>
            الإدارة تحتاج أرقامًا <em>حقيقية</em> لاتخاذ القرارات: حجم الإيرادات النقدية الفعلية؟ أين الهدر؟ ما صافي الربح الحقيقي بعيدًا عن التعديلات الضريبية؟</p>

          <p className="mb-3"><strong>4. بناء الثقة مع الشركاء والمستثمرين</strong><br/>
            وجود منظومة مراجعة داخلية يعزز مصداقية الشركة لدى المستثمرين والشركاء، ويُظهر جدّية إدارة المخاطر والشفافية.</p>

          <p className="mb-3"><strong>5. التكيف مع اختلاف القوانين بين الدول</strong><br/>
            مع اختلاف الاعتراف بالمستندات بين الدول، يساعد المراجع الداخلي على إعداد تقارير متوازنة: متوافقة محليًا وتعكس الواقع الإداري.</p>

          <p className="mb-3"><strong>الخلاصة</strong><br/>
            المراجع الخارجي يحقق الامتثال، أما المراجع الداخلي فيحقق الشفافية والحماية والنمو المستدام. للشركات الناشئة والصغيرة والمتوسطة، وجوده <em>استثمار استراتيجي</em> وليس تكلفة إضافية.</p>
        </>
      ),
      titleEn: 'Why Do Startups and SMEs Need an Internal Auditor?',
      excerptEn: 'An internal, independent auditor provides ongoing oversight and a true financial picture—beyond annual statutory compliance.',
      contentEn: (
        <>
          <p className="mb-3"><strong>In many countries</strong>, companies must appoint an external auditor annually for statutory financials. Startups and SMEs, however, need ongoing oversight to reflect the <em>real</em> operational picture.</p>

          <p className="mb-3"><strong>1. Reconciling Official vs. Actual Budgets</strong><br/>
            <em>Official budgets</em> rely on legally recognized invoices/receipts and may omit cash revenues or non-documented expenses.<br/>
            <em>Internal budgets</em> reflect the actual situation: cash inflows, real expenses, and true commitments.<br/>
            An internal auditor ensures two clear views: a statutory version for authorities, and an accurate internal version for management decisions.</p>

          <p className="mb-3"><strong>2. Protection from Errors and Fraud</strong><br/>
            Continuous checks of the accounting cycle, proper system use, inventory-to-ledger reconciliations, and early detection of misuse or fraud.</p>

          <p className="mb-3"><strong>3. Improving Financial Management Efficiency</strong><br/>
            Management needs <em>real</em> numbers: actual cash revenues, where spending is inefficient, and true net profit (beyond tax adjustments) to guide strategy and cost restructuring.</p>

          <p className="mb-3"><strong>4. Building Trust with Partners and Investors</strong><br/>
            Internal audit frameworks demonstrate professionalism and transparency, increasing investor confidence and partnership appeal.</p>

          <p className="mb-3"><strong>5. Adapting to Cross-Country Legal Differences</strong><br/>
            With varying document recognition across jurisdictions, the internal auditor helps produce balanced reports: compliant locally yet reflective of managerial reality.</p>

          <p className="mb-3"><strong>Bottom line</strong><br/>
            External audits achieve compliance; internal audits deliver transparency, protection, and sustainable growth—an <em>investment</em>, not a cost.</p>
        </>
      ),
    },
  ]

  // Scroll spy (include blog)
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

  // Navbar style on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = (id) =>
    `transition-colors ${active === id ? 'font-semibold underline underline-offset-8' : ''}`

  // Contact form (Formspree)
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
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang })
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '', _gotcha: '' })
    } catch {
      setStatus('err')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-50 text-slate-900">

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 backdrop-blur border-b ${scrolled ? 'shadow-md' : ''}`}
        style={{ background: scrolled ? `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` : 'rgba(255,255,255,0.8)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <div>
              <div className="font-semibold" style={{ color: scrolled ? '#fff' : PRIMARY }}>The Bridge</div>
              <div className="text-xs" style={{ color: scrolled ? '#eee' : '#64748B' }}>{dict[lang].brandSmall}</div>
            </div>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#services" className={navClass('services')}>{dict[lang].nav.services}</a>
            <a href="#process" className={navClass('process')}>{dict[lang].nav.process}</a>
            <a href="#about" className={navClass('about')}>{dict[lang].nav.about}</a>
            <a href="#blog" className={navClass('blog')}>{dict[lang].nav.blog}</a>
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
            ? 'At The Bridge, we provide simplified and effective audit and consulting solutions tailored for startups and small businesses. We ensure competitive pricing without compromising quality, delivering accurate reports and practical recommendations that help our clients build trust and make better decisions.'
            : 'نحن في The Bridge نوفر حلول تدقيق واستشارات مالية مبسطة وفعّالة، موجهة خصيصًا للشركات الناشئة والصغيرة. نضمن لعملائنا أسعارًا مناسبة دون المساس بالجودة، مع تقديم تقارير دقيقة وتوصيات عملية تساعدهم على بناء الثقة في أعمالهم واتخاذ قرارات أفضل.'}
        </p>
      </section>

      {/* BLOG LIST */}
      <section id="blog" className="py-16 bg-white border-t border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {lang === 'ar' ? 'المقالات' : 'Blog'}
          </h2>

          <div className="space-y-6">
            {posts.map((p) => (
              <article
                key={p.id}
                className={`p-6 bg-slate-50 rounded-2xl shadow hover:shadow-md transition ${
                  lang === 'ar' ? 'text-right' : 'text-left'
                }`}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {lang === 'ar' ? p.titleAr : p.titleEn}
                </h3>
                <p className="text-slate-600 mb-3">
                  {lang === 'ar' ? p.excerptAr : p.excerptEn}
                </p>
                <a href={`#${p.id}`} className="text-blue-600 hover:underline">
                  {lang === 'ar' ? dict[lang].readMore : dict[lang].readMore}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG POSTS CONTENT (FULL) */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4">
          {posts.map((p) => (
            <article key={p.id} id={p.id} className="mb-12 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {lang === 'ar' ? p.titleAr : p.titleEn}
              </h2>

              <div className={`prose prose-slate max-w-none mt-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {lang === 'ar' ? p.contentAr : p.contentEn}
              </div>

              <div className={`mt-6 ${rtl ? 'text-left' : 'text-right'}`}>
                <a href="#blog" className="text-blue-600 hover:underline">
                  {lang === 'ar' ? dict[lang].backToList : dict[lang].backToList}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 scroll-mt-24" style={{ background: SOFT_BG }}>
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{dict[lang].contactTitle}</h2>
          <p className="mt-2 text-slate-600">{dict[lang].contactDesc}</p>

          <ContactForm lang={lang} dict={dict} />
          <div className="mt-4 flex justify-center">
            <a href="https://wa.me/96879434422" className="rounded-2xl px-5 py-3 text-white font-medium shadow"
              style={{ backgroundColor: WHATSAPP }}>
              {dict[lang].whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center border-t text-slate-500 text-sm">
        © {new Date().getFullYear()} The Bridge Audit & Consulting
      </footer>
    </div>
  )
}

// ---- Contact Form component (Formspree) ----
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
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang })
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '', _gotcha: '' })
    } catch { setStatus('err') } finally { setSubmitting(false) }
  }

  const rtl = lang === 'ar'

  return (
    <form onSubmit={handleSubmit} className={`mt-6 bg-white p-6 rounded-2xl shadow-md space-y-4 ${rtl ? 'text-right' : 'text-left'}`}>
      {/* honeypot */}
      <input type="text" name="_gotcha" value={form._gotcha}
        onChange={(e)=> setForm({ ...form, _gotcha: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="text" name="name" required value={form.name}
        onChange={(e)=> setForm({ ...form, name: e.target.value })} placeholder={dict[lang].form.name}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      <input type="email" name="email" required value={form.email}
        onChange={(e)=> setForm({ ...form, email: e.target.value })} placeholder={dict[lang].form.email}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      <input type="tel" name="phone" value={form.phone}
        onChange={(e)=> setForm({ ...form, phone: e.target.value })} placeholder={dict[lang].form.phone}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      <textarea name="message" rows="4" required value={form.message}
        onChange={(e)=> setForm({ ...form, message: e.target.value })} placeholder={dict[lang].form.message}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />

      <div className={`mt-2 flex ${rtl ? 'justify-start' : 'justify-end'}`}>
        <button type="submit" disabled={submitting}
          className="min-w-32 bg-blue-600 text-white py-3 px-5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">
          {submitting ? dict[lang].form.sending : dict[lang].form.send}
        </button>
      </div>

      {status === 'ok' && <div className="text-green-600 text-sm">{dict[lang].form.ok}</div>}
      {status === 'err' && <div className="text-red-600 text-sm">{dict[lang].form.err}</div>}
    </form>
  )
}
