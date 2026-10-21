# POV Café × فطن — النسخة الكاملة

## التشغيل على GitHub Pages
ارفع `index.html` و`style.css` و`script.js` ومجلد `assets` إلى جذر المستودع `Pov_Cafe`، ثم Settings → Pages → Deploy from branch → main / root.

## إصلاح خطأ التقييم
تم تغيير `script.js` ليستخدم POST/JSON كما تتطلب النسخة المنشورة حاليًا من Google Apps Script، بدل JSONP/GET الذي كان يسبب خطأ «تعذر الوصول لخدمة التقييمات».

السكربت يحفظ الردود في جدول Google Sheets:
https://docs.google.com/spreadsheets/d/1LTebuW1xP69z9HXXO0epU0c8dResmPnWwLyAQP4SgLc/edit

مهم: المتصفح يستخدم `no-cors` لذلك استجابة Google غير قابلة للقراءة؛ ظهور رسالة «تم إرسال طلب التقييم» لا يثبت وصول الصف. بعد النشر أرسل تقييمًا اختباريًا وراقب ظهور صف في تبويب «الردود». إذا لم يظهر، افتح Apps Script → Executions وتحقق من الأخطاء، وأعد نشر السكربت بالنسخة الموجودة في `google-apps-script/Code.gs` إذا لزم.

## صورة الكوب
تم تضمين صورة محلية `assets/pov-cup-fallback.png` لضمان ظهورها على GitHub من دون رابط خارجي. صورة الكوب والطائر مماثلة لتصميم العلامة ولكن ليست نفس ملف صورة ChatGPT Sites الأصلي حرفيًا.

## Excel
يحفظ السكربت الردود مباشرة في Google Sheets، ويمكن تصديرها إلى Excel عبر File → Download → Microsoft Excel (.xlsx). إصدار الملف الحالي لا ينشئ نسخة XLSX جديدة تلقائيًا بعد كل إرسال.
