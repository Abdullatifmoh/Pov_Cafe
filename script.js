// متوافق مع Google Apps Script المنشور حاليًا: doPost يستقبل JSON.
// إرسال cross-origin من GitHub Pages يستخدم no-cors، لذا لا نستطيع قراءة تأكيد السيرفر.
const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxtXqHMxVWyp5idXSAS8bhBv4VlEq17orh1D1U_xSIe4NdQyVPI_sUxHFa3AwBxGAIH/exec';
for (const name of ['usability','clarity','usefulness']) {
  const wrap=document.querySelector(`[data-field="${name}"]`);
  for(let value=1;value<=5;value++){
    const label=document.createElement('label');
    const radio=document.createElement('input');radio.type='radio';radio.name=name;radio.value=String(value);radio.required=true;
    const span=document.createElement('span');span.textContent=value;
    label.append(radio,span);wrap.append(label);
  }
}
const form=document.getElementById('ratingForm');
const msg=document.getElementById('message');
form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const data=new FormData(form);
  const category=document.getElementById('category').value;
  const comment=document.getElementById('feedback').value.trim();
  const feedback=[category,comment].filter(Boolean).join(' | ');
  const payload={usability:data.get('usability'),clarity:data.get('clarity'),usefulness:data.get('usefulness'),feedback};
  const button=document.getElementById('sendButton');button.disabled=true;
  msg.textContent='جارٍ إرسال التقييم…';
  try{
    // Content-Type text/plain يحافظ على الطلب البسيط؛ السيرفر يقرأ JSON من e.postData.contents.
    await fetch(SHEETS_WEB_APP_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),redirect:'follow'});
    msg.textContent='تم إرسال طلب التقييم. تأكد من ظهور ردّك في جدول Google Sheets؛ لا يمكن للموقع تأكيد الحفظ مباشرة.';
    document.getElementById('offer').hidden=false;
    form.reset();
  }catch(error){msg.textContent='تعذّر إرسال التقييم. تحقق من الاتصال وصلاحيات نشر Apps Script، ثم أعد المحاولة.';}
  finally{button.disabled=false;}
});
