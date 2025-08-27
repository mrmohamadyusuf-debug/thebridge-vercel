export default function TheBridgeLanding() {
  const services = [
    { title: "التدقيق والمراجعة", desc: "مراجعة القوائم المالية السنوية وفق المعايير الدولية وتقديم خطاب الملاحظات للإدارة.", icon: "📊" },
    { title: "المراجعة المحدودة للشركات الصغيرة", desc: "خدمات مراجعة مبسطة وفعالة للشركات الناشئة والصغيرة.", icon: "✅" },
    { title: "التدقيق الداخلي", desc: "مراجعة داخلية مبنية على المخاطر وفحص أنظمة الرقابة الداخلية.", icon: "🛡️" },
    { title: "الاستشارات والضرائب", desc: "إعداد الإقرارات الضريبية (دخل، قيمة مضافة، رواتب) ومعالجة الفروق والتسويات.", icon: "🧾" },
    { title: "الامتثال والجودة", desc: "التأكد من الالتزام بالمعايير (IFRS / IFRS for SMEs) والاستعداد للفحص الرسمي.", icon: "📑" },
    { title: "إعداد الأنظمة المحاسبية", desc: "تصميم أنظمة محاسبية مبسطة ودليل حسابات وإصدار الفواتير الإلكترونية.", icon: "⚙️" },
    { title: "التقارير والمؤشرات المالية", desc: "إعداد تقارير شهرية وربع سنوية ولوحات متابعة مؤشرات الأداء (KPIs).", icon: "📈" },
    { title: "خدمات استشارية مستمرة", desc: "خطط اشتراك شهرية/ربع سنوية لدعم متواصل وسريع.", icon: "🤝" },
  ];

  const steps = [
    { n: 1, t: "الاستكشاف", d: "جلسة استشارية مجانية لتحديد احتياجاتك ونطاق العمل." },
    { n: 2, t: "العرض", d: "خطاب ارتباط واضح يحدد النطاق والتكلفة والجدول الزمني." },
    { n: 3, t: "العمل الميداني", d: "طلبات بسيطة، مشاركة ملفات آمنة، وتحديثات مستمرة." },
    { n: 4, t: "التسليم", d: "تقرير التدقيق وخطاب الملاحظات وخطة العمل." },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900" id="ar">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* ✅ اللوجو الصحيح */}
            <img src="/bridge-logo.png" alt="The Bridge Logo" className="h-12 w-auto" />
            <div className="leading-tight">
              <div className="font-semibold text-blue-900">The Bridge</div>
              <div className="text-xs text-slate-600 -mt-0.5">Audit & Consulting</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services-ar" className="hover:text-blue-700">الخدمات</a>
            <a href="#process-ar" className="hover:text-blue-700">آلية العمل</a>
            <a href="#about-ar" className="hover:text-blue-700">من نحن</a>
            <a href="#contact-ar" className="hover:text-blue-700">تواصل معنا</a>
            <a href="#" className="hover:text-blue-700">EN</a>
          </nav>
          <a href="#contact-ar" className="rounded-2xl bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-blue-700">
            استشارة مجانية
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden text-right">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_-50%,rgba(37,99,235,0.15),transparent)]"/>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              خدمات تدقيق واستشارات مالية يمكنك الوثوق بها
            </h1>
            <p className="mt-4 text-slate-600 md:text-lg">
              نساعد الشركات الصغيرة والمتوسطة على بناء الثقة في أرقامها من خلال تدقيق واضح ونصائح عملية وتسليم في الوقت المحدد.
            </p>
            <div className="mt-6 flex gap-3 justify-end">
              <a href="#services-ar" className="rounded-2xl bg-blue-600 px-5 py-2.5 text-white font-medium shadow hover:bg-blue-700">خدماتنا</a>
              <a href="#contact-ar" className="rounded-2xl border border-slate-300 px-5 py-2.5 text-slate-700 hover:border-slate-400">تواصل معنا</a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services-ar" className="py-14 md:py-20 text-right">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">الخدمات</h2>
          <p className="mt-2 text-slate-600">حلول واضحة ومبسطة للشركات الصغيرة والمتوسطة.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className="group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process-ar" className="py-14 md:py-20 bg-white border-y border-slate-200 text-right">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">آلية العمل</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-5">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl p-5 bg-slate-50 border border-slate-200">
                <div className="text-blue-600 font-bold">0{s.n}</div>
                <div className="mt-2 font-semibold">{s.t}</div>
                <div className="mt-1 text-sm text-slate-600">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about-ar" className="py-14 md:py-20 text-right">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">من نحن</h2>
            <p className="mt-3 text-slate-600">
              نحن مكتب تدقيق واستشارات مستقل يركز على الشركات الصغيرة والمتوسطة في منطقة الشرق الأوسط وخارجها. نقدم خدمات عملية متوافقة مع المعايير الدولية.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-ar" className="py-16 bg-gradient-to-r from-blue-50 to-blue-100 text-center">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">احجز استشارة مجانية</h2>
          <p className="mt-2 text-slate-600">اخبرنا باحتياجاتك وسنرد خلال 24 ساعة.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/96879434422" className="rounded-2xl bg-green-600 px-5 py-3 text-white font-medium shadow hover:bg-green-700">واتساب</a>
            <a href="mailto:mr.mohamad.yusuf@gmail.com" className="rounded-2xl border border-slate-300 px-5 py-3 text-slate-700 hover:border-slate-400">البريد الإلكتروني</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-6 text-right">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} The Bridge Audit & Consulting</div>
          <div className="flex items-center gap-4">
            <a href="#services-ar" className="hover:text-slate-700">الخدمات</a>
            <a href="#process-ar" className="hover:text-slate-700">آلية العمل</a>
            <a href="#contact-ar" className="hover:text-slate-700">تواصل</a>
            <a href="#" className="hover:text-slate-700">EN</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
