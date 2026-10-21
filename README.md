# ربط ردود POV Café × فطن بجدول Google Sheets المحدد

تم تجهيز جدول الردود التالي وإنشاء رؤوس الأعمدة فيه:
https://docs.google.com/spreadsheets/d/1LTebuW1xP69z9HXXO0epU0c8dResmPnWwLyAQP4SgLc/edit

## التفعيل الأخير (ضروري)
1. افتح Google Sheet أعلاه ثم **Extensions → Apps Script**.
2. استبدل محتوى Code.gs بالكود الموجود في `google-apps-script/Code.gs`.
3. شغّل الدالة `setup` مرة واحدة ووافق على الصلاحيات.
4. **Deploy → New deployment → Web app**، واختر **Execute as: Me** و**Who has access: Anyone**، واضغط Deploy.
5. انسخ رابط Web app النهائي الذي ينتهي بـ `/exec`، وافتح ملف `script.js` واستبدل القيمة الفارغة في `SHEETS_WEB_APP_URL` بالرابط.
6. ارفع ملفات `index.html` و`style.css` و`script.js` ومجلد `assets/` إلى GitHub في المستودع `Pov_Cafe`.
7. أرسل تقييمًا تجريبيًا من الموقع، وتأكد أن صفًا جديدًا ظهر في تبويب `الردود`، وأن نسخة Excel أُنشئت في Google Drive.

**مهم:** رابط Google Sheets ليس رابط استقبال عام ولا يمكن وضعه بدل Web App URL. لا يمكن تفعيل استقبال الردود حتى تنشر Apps Script من حسابك. لا حاجة لرفع مجلد `google-apps-script` على GitHub لأنه يحتوي كود السيرفر فقط.

## الخصوصية
هذه تجربة توعوية ويجب عدم جمع كلمات مرور أو رموز تحقق أو بيانات دفع أو وعود بمكافآت غير حقيقية. يتم حفظ التقييمات فقط، وتستطيع مراجعتها في الجدول المحدد.

# POV Café × فطن — ربط التقييمات مع Excel تلقائيًا

موقع ثابت يعمل على GitHub Pages. يحتوي على استبيان يجمع 3 تقييمات (1–5) واقتراح تطوير اختياري دون أسماء أو بيانات دخول.

## كيف تجمع الردود في Excel تلقائيًا؟

1. افتح https://sheets.google.com وأنشئ **جدول بيانات فارغ** باسم `POV Fatin Ratings`.
2. من القائمة **الإضافات (Extensions) → Apps Script**، امسح المحتوى الافتراضي والصق **كل محتوى** `google-apps-script/Code.gs` ثم احفظ.
3. من قائمة الدوال اختر `setup` واضغط **Run**. وافق على أذونات Sheets / Google Drive / external requests. ستظهر ورقة `الردود` مع الأعمدة وستنشأ نسخة Excel أولية في **Google Drive** باسم `POV-Fatin-Responses-LIVE.xlsx`.
4. انقر **Deploy → New deployment → Web app**، واضبط **Execute as: Me** و **Who has access: Anyone**، ثم Deploy وانسخ رابط التطبيق الذي ينتهي بـ `/exec`.
5. افتح `script.js` وبدّل `const SHEETS_WEB_APP_URL = '';` إلى `const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/.........../exec';` مع رابطك الفعلي. لا تغيّر اسم المتغير.
6. ارفع `index.html` و`style.css` و`script.js` إلى مستودع GitHub؛ من **Settings → Pages → Deploy from a branch → main / (root)** انشر الموقع.
7. جرّب تقييمًا واحدًا من الموقع. ستراه في **جدول Google Sheets** مباشرة، وستتحدث نسخة **XLSX في Google Drive** بعد كل رد ناجح.

### مشاهدة البيانات
- **Google Sheets**: سجل الردود الأصلي الحي، يحدّث باستمرار.
- **Google Drive**: ابحث عن `POV-Fatin-Responses-LIVE.xlsx` لفتح أحدث ملف Excel أو تنزيله.
- **مهم**: خدمة Google Drive تنشئ ملف Excel جديدًا وتضع النسخة القديمة في المهملات عند كل رد؛ ابحث دائمًا **بالاسم** لا تستخدم رابط ملف Excel قديم، لأن معرّفه يتغير. لا تضع رابط الجدول أو ملف Excel أمام الزوار. يمكن أن تتأخر نسخة Excel أو يفشل تحديثها بسبب حصة Google اليومية؛ يظل التقييم محفوظًا في الجدول الأصلي حتى لو فشل التصدير.
- جمع الردود يتطلب Google account وإعداد رابط Apps Script الفعلي مرة واحدة؛ الكود لا يستطيع إكمال ربط حسابك بالنيابة عنك.

### النشر على GitHub
ارفع ملفات الموقع الثلاثة من المجلد الرئيسي (`index.html`, `style.css`, `script.js`). احتفظ بملف Apps Script في حساب Google، وليس مطلوبًا نشره على Pages.

### الخصوصية والحماية
لا تجمع كلمة مرور أو رمز تحقق أو بطاقة. الروابط العامة يمكن إرسال طلبات إليها، لذا لا تعتبر التقييمات موثقة الهوية؛ عند الحملات الكبيرة قد تحتاج CAPTCHA وحدود إرسال أقوى. هذه محاكاة توعوية وليست برنامج ولاء حقيقيًا.

> هذه النسخة إعادة بناء مستقلة للمحتوى السابق وليست استخراجًا للشيفرة المصدرية من الموقع الأصلي.


## مطابقة صورة كوب ChatGPT Sites
تم استبدال الإيموجي بصورة الكوب الأصلية من `https://pov-cafe.boldtitan256.chatgpt.site/cup.png` في الواجهة، وتوجد نسخة احتياطية محلية داخل `assets/`. لكي تكون الصورة مضمونة بلا اعتماد على موقع خارجي، نزّل ملف `cup.png` من الموقع الأصلي وضعه في المستودع وغيّر `src` إلى `cup.png`.

تنبيه: تبقى خدمة الردود وملف Excel غير مفعلة حتى ضبط رابط Apps Script داخل `script.js`.


## تم تفعيل الربط

تم ضبط `script.js` على رابط Google Apps Script التالي:

`https://script.google.com/macros/s/AKfycbxtXqHMxVWyp5idXSAS8bhBv4VlEq17orh1D1U_xSIe4NdQyVPI_sUxHFa3AwBxGAIH/exec`

الاستبيان الآن جاهز لإرسال الردود إلى Google Sheets ونسخة Excel التي يُنشئها Apps Script.
