# POV Café × فطن — نسخة GitHub المصححة

**هذه النسخة تستخدم POST لإرسال JSON إلى دالة doPost الموجودة في Google Apps Script، لا JSONP أو doGet.**

## النشر
1. ارفع الملفات التالية إلى **جذر** مستودع `Pov_Cafe` (وليس داخل مجلد إضافي): `index.html`, `style.css`, `script.js`, مجلد `assets/`.
2. يجب عدم رفع الملف ZIP نفسه فقط؛ فك الضغط ثم ارفع محتوياته.
3. تأكد من وجود `index.html` في جذر المستودع.
4. بعد Commit انتظر اكتمال GitHub Pages ثم افتح الرابط في نافذة خاصة؛ النسخة تضيف رقم إصدار للـ CSS/JS لتقليل مشكلات التخزين المؤقت.

## Google Apps Script
الملف `google-apps-script/Code.gs` للمرجعية. تأكد أن المشروع المنشور هو المشروع الذي يحتوي على `doPost` بأسماء الحقول `usability`, `clarity`, `usefulness`, `feedback`. ثم من Manage deployments عدّل إصدار Web app إذا تغير كوده. اختر Execute as: Me وWho has access: Anyone.

## اختبار حقيقي
أرسل تقييمًا تجريبيًا ثم افتح جدول [Google Sheets](https://docs.google.com/spreadsheets/d/1LTebuW1xP69z9HXXO0epU0c8dResmPnWwLyAQP4SgLc/edit) وتأكد من ظهور صف جديد في تبويب «الردود». رسالة المتصفح لا تثبت الحفظ؛ Apps Script لا يتيح قراءة استجابة cross-origin مباشرة بالطريقة الحالية.

**ملاحظة:** هذه الحزمة لا تضمن مزامنة ملف XLSX منفصل تلقائيًا؛ السكربت يتلقى التقييمات في Google Sheets، ويمكن تنزيل الملف كـ Excel.
