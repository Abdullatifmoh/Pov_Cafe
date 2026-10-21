// بعد نشر Google Apps Script، ضع رابط تطبيق الويب الذي ينتهي بـ /exec هنا.
const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxtXqHMxVWyp5idXSAS8bhBv4VlEq17orh1D1U_xSIe4NdQyVPI_sUxHFa3AwBxGAIH/exec';

for (const field of ['ease', 'clarity', 'benefit']) {
  const group = document.querySelector(`[data-field="${field}"]`);
  for (let n = 1; n <= 5; n++) {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="${field}" value="${n}" required aria-label="${n} من 5"><span>${n}</span>`;
    group.appendChild(label);
  }
}

const form = document.getElementById('ratingForm');
const message = document.getElementById('message');

// JSONP لتلقي تأكيد حقيقي من Apps Script مع GitHub Pages دون CORS.
// لا يرسل أي كلمات مرور أو بيانات تعريفية؛ التقييمات فقط.
function submitRating(data) {
  return new Promise((resolve, reject) => {
    const callback = 'povCallback_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const script = document.createElement('script');
    let finished = false;
    const timer = setTimeout(() => complete(new Error('انتهت مهلة الاتصال. تحقق من اتصالك وحاول مجددًا.')), 20000);
    function complete(error, result) {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      delete window[callback];
      script.remove();
      if (error) reject(error); else resolve(result);
    }
    window[callback] = result => complete(null, result);
    script.onerror = () => complete(new Error('تعذر الوصول لخدمة التقييمات. تحقق من رابط Apps Script.'));
    const url = new URL(SHEETS_WEB_APP_URL);
    for (const [key, value] of Object.entries(data)) url.searchParams.set(key, String(value));
    url.searchParams.set('callback', callback);
    script.src = url.toString();
    document.head.appendChild(script);
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!SHEETS_WEB_APP_URL || !/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(SHEETS_WEB_APP_URL)) {
    message.textContent = 'لم يتم إعداد استقبال الردود بعد. أضف رابط Google Apps Script في script.js.';
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  data.requestId = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  message.textContent = 'جارٍ تسجيل تقييمك…';
  try {
    const result = await submitRating(data);
    if (!result || result.ok !== true) throw new Error(result?.error || 'تعذر تسجيل الرد. حاول مرة أخرى.');
    message.textContent = result.excelUpdated === false
      ? 'تم حفظ تقييمك في الجدول بنجاح، لكن تحديث نسخة Excel تعذّر مؤقتًا.'
      : 'تم حفظ تقييمك وتحديث ملف Excel بنجاح ✓';
    form.reset();
    document.getElementById('offer').hidden = false;
    document.getElementById('offer').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (error) {
    message.textContent = error.message || 'حدث خطأ أثناء الإرسال.';
  } finally {
    button.disabled = false;
  }
});
