// Static GitHub Pages demo. To collect responses centrally, set a Formspree endpoint below.
// Create a form at https://formspree.io/ and paste its endpoint, e.g. https://formspree.io/f/xxxxxxxx
const FORM_ENDPOINT = '';
for (const field of ['ease','clarity','benefit']) {
  const group=document.querySelector(`[data-field="${field}"]`);
  for(let n=1;n<=5;n++){
    const label=document.createElement('label');
    label.innerHTML=`<input type="radio" name="${field}" value="${n}" required aria-label="${n} من 5"><span>${n}</span>`;
    group.appendChild(label);
  }
}
const form=document.getElementById('ratingForm');
const message=document.getElementById('message');
form.addEventListener('submit',async e=>{
 e.preventDefault();
 if(!form.reportValidity())return;
 const data=Object.fromEntries(new FormData(form).entries());
 data.submitted_at=new Date().toISOString();
 const btn=form.querySelector('button[type="submit"]');btn.disabled=true;
 try{
  if(FORM_ENDPOINT){
   const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});
   if(!r.ok)throw new Error('تعذر حفظ التقييم. حاول لاحقًا.');
   message.textContent='تم إرسال تقييمك بنجاح.';
  }else{
   // On GitHub Pages alone, ratings are stored only in this browser; no central collection.
   const saved=JSON.parse(localStorage.getItem('povRatings')||'[]');saved.push(data);
   localStorage.setItem('povRatings',JSON.stringify(saved));
   message.textContent='تم حفظ تقييمك في هذا المتصفح فقط. لعرض تقييمات جميع الزوار، اربط الموقع بخدمة استقبال النماذج.';
  }
  document.getElementById('offer').hidden=false;
  document.getElementById('offer').scrollIntoView({behavior:'smooth',block:'center'});
 }catch(err){message.textContent=err.message||'حدث خطأ في الإرسال';}finally{btn.disabled=false;}
});
