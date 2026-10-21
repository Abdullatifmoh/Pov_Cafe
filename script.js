// POV Café — GitHub Pages × Google Apps Script (POST JSON, 2026-10-22)
const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxtXqHMxVWyp5idXSAS8bhBv4VlEq17orh1D1U_xSIe4NdQyVPI_sUxHFa3AwBxGAIH/exec';
for (const name of ['usability', 'clarity', 'usefulness']) {
  const container = document.querySelector(`[data-field="${name}"]`);
  if (!container) continue;
  for (let n = 1; n <= 5; n++) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio'; input.name = name; input.value = String(n); input.required = true;
    const span = document.createElement('span'); span.textContent = String(n);
    label.append(input, span); container.appendChild(label);
  }
}
const form = document.getElementById('ratingForm');
const message = document.getElementById('message');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const category = document.getElementById('category').value;
  const comment = document.getElementById('feedback').value.trim();
  const payload = {
    usability: Number(data.get('usability')),
    clarity: Number(data.get('clarity')),
    usefulness: Number(data.get('usefulness')),
    feedback: [category, comment].filter(Boolean).join(' | ')
  };
  const button = document.getElementById('sendButton');
  button.disabled = true;
  message.textContent = 'جارٍ إرسال تقييمك…';
  try {
    // text/plain prevents a preflight OPTIONS request. Apps Script parses e.postData.contents as JSON.
    // opaque no-cors responses cannot prove that Apps Script actually saved a row.
    await fetch(SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload)
    });
    message.textContent = 'أُرسل طلب التقييم. للتحقق من الحفظ، افتح جدول Google Sheets وتأكد من ظهور صف جديد.';
    form.reset();
    form.hidden = true;
    document.querySelector('.survey-wrap').classList.add('show-rewards');
    const offer = document.getElementById('offer');
    document.getElementById('rewardRef').textContent = 'POV-' + Math.random().toString(16).slice(2,10).toUpperCase();
    offer.hidden = false;
    offer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    message.textContent = 'لم يتمكن المتصفح من إرسال الطلب. تأكد من الاتصال ومن نشر Apps Script بخيار Anyone.';
    console.error('POV Café submit error:', error);
  } finally { button.disabled = false; }
});
