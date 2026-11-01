# Welcome to GitHub Desktop!

This is your README. READMEs are where you can communicate what your project is and how to use it.

Write your name on line 6, save it, and then head back to GitHub Desktop.
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>محفظة الديون الاحترافية</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Cairo', sans-serif; transition: background-color 0.3s ease; }
        .glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .page { display: none; }
        .page.active { display: block; animation: fadeInUp 0.4s ease-out; }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 transition-colors duration-300" id="body">

    <div class="max-w-md mx-auto min-h-screen pb-28 relative">
        <!-- Top Header -->
        <header class="p-6 flex items-center justify-between">
            <div>
                <h1 id="header-title" class="text-3xl font-black tracking-tight text-slate-900">لوحة التحكم</h1>
                <p id="header-subtitle" class="text-sm text-slate-500">نظرة عامة على تدفقاتك المالية</p>
            </div>
            <div class="flex gap-3">
                <button onclick="toggleTheme()" class="p-3 rounded-2xl bg-white shadow-sm border border-slate-200 hover:scale-110 transition-all" id="theme-btn">
                    <i data-lucide="sun" class="w-5 h-5 text-yellow-500"></i>
                </button>
                <button class="p-3 rounded-2xl bg-white shadow-sm border border-slate-200 relative hover:scale-110 transition-all">
                    <i data-lucide="bell" class="w-5 h-5"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </div>
        </header>

        <main class="px-6">
            <!-- 1. Dashboard Page -->
            <div id="dashboard" class="page active space-y-8">
                <div class="relative overflow-hidden p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl group">
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
                    <div class="relative z-10 flex flex-col items-center text-center gap-2">
                        <p class="text-sm opacity-80 font-medium">إجمالي المبالغ القابلة للتحصيل</p>
                        <div class="flex items-baseline gap-2">
                            <span class="text-5xl font-black">12,450</span>
                            <span class="text-xl font-bold opacity-70">SAR</span>
                        </div>
                        <div class="flex gap-4 mt-6 w-full">
                            <div class="flex-1 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                                <p class="text-[10px] opacity-70 uppercase">مستحقة</p>
                                <p class="text-lg font-bold text-orange-300">3,200</p>
                            </div>
                            <div class="flex-1 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                                <p class="text-[10px] opacity-70 uppercase">محصلة</p>
                                <p class="text-lg font-bold text-emerald-300">8,400</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-bold text-slate-800 flex items-center gap-2">
                            <i data-lucide="alert-circle" class="w-5 h-5 text-orange-500"></i>
                            تنبيهات عاجلة
                        </h3>
                        <button class="text-xs text-indigo-600 font-bold">عرض الكل</button>
                    </div>
                    <div class="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        <div class="min-w-[220px] p-4 bg-white rounded-3xl border-r-4 border-r-red-500 shadow-sm border border-slate-100">
                            <p class="font-bold text-slate-800 text-sm">شركة الأمل للتجارة</p>
                            <p class="text-lg font-black text-slate-900 my-1">1,200 <span class="text-xs font-medium text-slate-500">SAR</span></p>
                            <div class="flex justify-between items-center mt-3">
                                <span class="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-1 rounded-lg">متأخر منذ 3 أيام</span>
                                <button class="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100"><i data-lucide="message-circle" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                        <div class="min-w-[220px] p-4 bg-white rounded-3xl border-r-4 border-r-orange-500 shadow-sm border border-slate-100">
                            <p class="font-bold text-slate-800 text-sm">محمد العتيبي</p>
                            <p class="text-lg font-black text-slate-900 my-1">450 <span class="text-xs font-medium text-slate-500">USD</span></p>
                            <div class="flex justify-between items-center mt-3">
                                <span class="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded-lg">يستحق غداً</span>
                                <button class="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100"><i data-lucide="message-circle" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="grid grid-cols-2 gap-4">
                    <button class="p-5 bg-indigo-100 text-indigo-700 rounded-3xl flex items-center justify-center gap-3 font-bold hover:bg-indigo-200 transition-all">
                        <i data-lucide="plus-circle" class="w-5 h-5"></i> إضافة دين
                    </button>
                    <button class="p-5 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center gap-3 font-bold hover:bg-emerald-200 transition-all">
                        <i data-lucide="user-plus" class="w-5 h-5"></i> عميل جديد
                    </button>
                </div>
            </div>

            <!-- 2. Clients Page -->
            <div id="clients" class="page space-y-6">
                <div class="flex gap-3 mb-6">
                    <div class="relative flex-1">
                        <i data-lucide="search" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"></i>
                        <input type="text" placeholder="بحث عن عميل..." class="w-full pr-10 pl-4 py-3 bg-white rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    </div>
                    <button class="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm"><i data-lucide="filter" class="w-5 h-5"></i></button>
                </div>
                <div class="space-y-4">
                    <div onclick="openClient('شركة الأمل للتجارة', '1,200', 'SAR')" class="p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-all group">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">أ</div>
                            <div>
                                <p class="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">شركة الأمل للتجارة</p>
                                <p class="text-xs text-slate-500">آخر عملية: 15 أكتوبر</p>
                            </div>
                        </div>
                        <div class="text-left flex items-center gap-3">
                            <div class="text-right">
                                <p class="font-black text-slate-900">1,200</p>
                                <p class="text-[10px] font-bold text-slate-500">SAR</p>
                            </div>
                            <i data-lucide="chevron-left" class="w-4 h-4 text-slate-300 group-hover:text-indigo-500"></i>
                        </div>
                    </div>
                    <div onclick="openClient('محمد العتيبي', '450', 'USD')" class="p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-all group">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">م</div>
                            <div>
                                <p class="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">محمد العتيبي</p>
                                <p class="text-xs text-slate-500">آخر عملية: 20 أكتوبر</p>
                            </div>
                        </div>
                        <div class="text-left flex items-center gap-3">
                            <div class="text-right">
                                <p class="font-black text-slate-900">450</p>
                                <p class="text-[10px] font-bold text-slate-500">USD</p>
                            </div>
                            <i data-lucide="chevron-left" class="w-4 h-4 text-slate-300 group-hover:text-indigo-500"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. Reports Page -->
            <div id="reports" class="page space-y-8">
                <div class="grid grid-cols-3 gap-4">
                    <div class="p-4 bg-white rounded-3xl border border-slate-100 text-center shadow-sm">
                        <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2"><i data-lucide="check-circle" class="w-5 h-5"></i></div>
                        <p class="text-[10px] text-slate-500 mb-1">المحصل</p>
                        <p class="text-lg font-black">8,400</p>
                    </div>
                    <div class="p-4 bg-white rounded-3xl border border-slate-100 text-center shadow-sm">
                        <div class="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-2"><i data-lucide="clock" class="w-5 h-5"></i></div>
                        <p class="text-[10px] text-slate-500 mb-1">المعلق</p>
                        <p class="text-lg font-black">4,050</p>
                    </div>
                    <div class="p-4 bg-white rounded-3xl border border-slate-100 text-center shadow-sm">
                        <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-2"><i data-lucide="pie-chart" class="w-5 h-5"></i></div>
                        <p class="text-[10px] text-slate-500 mb-1">النسبة</p>
                        <p class="text-lg font-black">67%</p>
                    </div>
                </div>
                <div class="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 class="font-bold text-slate-800 mb-6">تحليل التحصيل الشهري</h3>
                    <div class="flex items-end justify-between gap-2 h-40">
                        <div class="flex-1 bg-indigo-200 rounded-t-lg" style="height: 60%"></div>
                        <div class="flex-1 bg-indigo-300 rounded-t-lg" style="height: 80%"></div>
                        <div class="flex-1 bg-indigo-400 rounded-t-lg" style="height: 40%"></div>
                        <div class="flex-1 bg-indigo-500 rounded-t-lg" style="height: 90%"></div>
                        <div class="flex-1 bg-indigo-600 rounded-t-lg" style="height: 70%"></div>
                        <div class="flex-1 bg-indigo-400 rounded-t-lg" style="height: 100%"></div>
                    </div>
                    <div class="flex justify-between mt-4 text-[10px] text-slate-400 font-bold">
                        <span>ماي</span><span>يون</span><span>يوليو</span><span>أغسطس</span><span>سبتمبر</span><span>أكتوبر</span>
                    </div>
                </div>
            </div>

            <!-- 4. Settings Page -->
            <div id="settings" class="page space-y-6">
                <div class="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">الإعدادات العامة</h3>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all">
                        <div class="flex items-center gap-3">
                            <i data-lucide="globe" class="w-5 h-5 text-slate-500"></i>
                            <span class="font-bold text-sm">العملة الأساسية</span>
                        </div>
                        <span class="text-sm font-bold text-indigo-600">SAR <i data-lucide="chevron-left" class="inline w-4 h-4"></i></span>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer">
                        <div class="flex items-center gap-3">
                            <i data-lucide="cloud-upload" class="w-5 h-5 text-slate-500"></i>
                            <span class="font-bold text-sm">النسخ الاحتياطي</span>
                        </div>
                        <div class="w-10 h-5 bg-indigo-600 rounded-full relative">
                            <div class="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
                <button class="w-full p-5 bg-red-50 text-red-600 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-red-100 transition-all">
                    <i data-lucide="log-out" class="w-5 h-5"></i> تسجيل الخروج
                </button>
            </div>

            <!-- Client Detail View -->
            <div id="client-detail" class="page space-y-6">
                <div class="p-8 bg-indigo-600 text-white rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                    <div class="absolute -left-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
                    <button onclick="closeClient()" class="absolute top-6 right-6 p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                    <div class="w-20 h-20 bg-white text-indigo-600 rounded-3xl mx-auto mb-4 flex items-center justify-center text-2xl font-black shadow-xl" id="detail-avatar">أ</div>
                    <h2 class="text-2xl font-black" id="detail-name">اسم العميل</h2>
                    <p class="text-sm opacity-70 mb-6">سجل المديونية المحدث</p>
                    <div class="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30">
                        <p class="text-xs opacity-80 mb-1">المبلغ المتبقي</p>
                        <p class="text-4xl font-black"><span id="detail-amount">0</span> <span class="text-lg font-medium opacity-70" id="detail-currency">SAR</span></p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <button class="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 hover:bg-indigo-50 transition-all">
                        <div class="p-3 bg-red-100 text-red-600 rounded-2xl"><i data-lucide="arrow-up-right" class="w-5 h-5"></i></div>
                        <span class="text-[10px] font-bold">إضافة دين</span>
                    </button>
                    <button class="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 hover:bg-indigo-50 transition-all">
                        <div class="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><i data-lucide="arrow-down-left" class="w-5 h-5"></i></div>
                        <span class="text-[10px] font-bold">تسجيل دفعة</span>
                    </button>
                    <button class="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 hover:bg-indigo-50 transition-all">
                        <div class="p-3 bg-orange-100 text-orange-600 rounded-2xl"><i data-lucide="message-circle" class="w-5 h-5"></i></div>
                        <span class="text-[10px] font-bold">إرسال تذكير</span>
                    </button>
                </div>
                <div class="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2"><i data-lucide="clock" class="w-5 h-5 text-indigo-500"></i> السجل</h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-red-100 text-red-600 rounded-lg"><i data-lucide="arrow-up-right" class="w-4 h-4"></i></div>
                                <div><p class="text-sm font-bold">فاتورة توريد</p><p class="text-[10px] text-slate-400">2026-10-20</p></div>
                            </div>
                            <p class="font-black text-red-600">+200</p>
                        </div>
                        <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><i data-lucide="arrow-down-left" class="w-4 h-4"></i></div>
                                <div><p class="text-sm font-bold">دفعة نقدية</p><p class="text-[10px] text-slate-400">2026-10-10</p></div>
                            </div>
                            <p class="font-black text-emerald-600">-500</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <nav class="fixed bottom-6 left-6 right-6 max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-slate-200 p-2 rounded-[2rem] shadow-2xl flex items-center justify-around z-50" id="nav">
            <button onclick="switchTab('dashboard')" id="nav-dashboard" class="nav-btn flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-110">
                <i data-lucide="wallet" class="w-6 h-6"></i>
                <span class="text-[10px] font-bold">الرئيسية</span>
            </button>
            <button onclick="switchTab('clients')" id="nav-clients" class="nav-btn flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 text-slate-400">
                <i data-lucide="users" class="w-6 h-6"></i>
                <span class="text-[10px] font-bold">العملاء</span>
            </button>
            <button onclick="switchTab('reports')" id="nav-reports" class="nav-btn flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 text-slate-400">
                <i data-lucide="pie-chart" class="w-6 h-6"></i>
                <span class="text-[10px] font-bold">التقارير</span>
            </button>
            <button onclick="switchTab('settings')" id="nav-settings" class="nav-btn flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 text-slate-400">
                <i data-lucide="settings" class="w-6 h-6"></i>
                <span class="text-[10px] font-bold">الإعدادات</span>
            </button>
        </nav>
    </div>

    <script>
        lucide.createIcons();

        const pages = {
            dashboard: { title: 'لوحة التحكم', subtitle: 'نظرة عامة على تدفقاتك المالية' },
            clients: { title: 'إدارة العملاء', subtitle: 'تتبع جميع معاملات عملائك' },
            reports: { title: 'التقارير المالية', subtitle: 'تحليل الأرباح والتحصيلات' },
            settings: { title: 'الإعدادات', subtitle: 'تخصيص تجربة التطبيق والبيانات' },
            'client-detail': { title: 'تفاصيل العميل', subtitle: 'سجل المديونية المحدث' }
        };

        function switchTab(tabId) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');

            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/40', 'scale-110');
                btn.classList.add('text-slate-400');
            });
            const activeBtn = document.getElementById('nav-' + tabId);
            if(activeBtn) {
                activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/40', 'scale-110');
                activeBtn.classList.remove('text-slate-400');
            }
            document.getElementById('header-title').innerText = pages[tabId].title;
            document.getElementById('header-subtitle').innerText = pages[tabId].subtitle;
        }

        function openClient(name, amount, currency) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('client-detail').classList.add('active');
            document.getElementById('detail-name').innerText = name;
            document.getElementById('detail-amount').innerText = amount;
            document.getElementById('detail-currency').innerText = currency;
            document.getElementById('detail-avatar').innerText = name[0];
            document.getElementById('header-title').innerText = pages['client-detail'].title;
            document.getElementById('header-subtitle').innerText = pages['client-detail'].subtitle;
        }

        function closeClient() { switchTab('clients'); }

        function toggleTheme() {
            const body = document.getElementById('body');
            const themeBtn = document.getElementById('theme-btn');
            const nav = document.getElementById('nav');
            const headerTitle = document.getElementById('header-title');
            
            if (body.classList.contains('bg-slate-50')) {
                body.classList.replace('bg-slate-50', 'bg-[#0f172a]');
                body.classList.replace('text-slate-900', 'text-white');
                nav.classList.replace('bg-white/80', 'bg-slate-900/80');
                nav.classList.replace('border-slate-200', 'border-slate-800');
                headerTitle.classList.replace('text-slate-900', 'text-white');
                themeBtn.classList.replace('bg-white', 'bg-slate-800');
                themeBtn.classList.replace('border-slate-200', 'border-slate-700');
                themeBtn.innerHTML = '<i data-lucide="moon" class="w-5 h-5 text-indigo-400"></i>';
            } else {
                body.classList.replace('bg-[#0f172a]', 'bg-slate-50');
                body.classList.replace('text-white', 'text-slate-900');
                nav.classList.replace('bg-slate-900/80', 'bg-white/80');
                nav.classList.replace('border-slate-800', 'border-slate-200');
                headerTitle.classList.replace('text-white', 'text-slate-900');
                themeBtn.classList.replace('bg-slate-800', 'bg-white');
                themeBtn.classList.replace('border-slate-700', 'border-slate-200');
                themeBtn.innerHTML = '<i data-lucide="sun" class="w-5 h-5 text-yellow-500"></i>';
            }
            lucide.createIcons();
        }
    </script>
</body>
</html>
