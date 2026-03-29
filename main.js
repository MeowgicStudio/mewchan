// ==================== PETALS ====================
const pc = document.getElementById('petals');
const cols = ['#f2a7c3','#ffd6e7','#ffe8f2','#f5d87a','#9eecd4'];
for(let i = 0; i < 18; i++){
  const p = document.createElement('div');
  p.className = 'petal';
  const s = 4 + Math.random() * 5;
  p.style.cssText = `left:${Math.random()*100}%;background:${cols[i%cols.length]};width:${s}px;height:${s}px;animation-duration:${7+Math.random()*8}s;animation-delay:${Math.random()*12}s`;
  pc.appendChild(p);
}

// ==================== REVEAL ====================
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      e.target.querySelectorAll('.feat-fill[data-w]').forEach(b => {
        setTimeout(() => { b.style.width = b.dataset.w; }, 200);
      });
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ==================== PERSONA ====================
document.querySelectorAll('.pers-card').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('.pers-card').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
  });
});

// ==================== EXPRESSION SLIDER ====================
let exprCur = 0;
const slides = document.querySelectorAll('.expr-slide');
const dots = document.querySelectorAll('.expr-dot');

function exprGo(n){
  slides[exprCur].classList.remove('active');
  dots[exprCur].classList.remove('active');
  exprCur = (n + slides.length) % slides.length;
  slides[exprCur].classList.add('active');
  dots[exprCur].classList.add('active');
}
function exprNext(){ exprGo(exprCur + 1); }
function exprPrev(){ exprGo(exprCur - 1); }

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') exprNext();
  if(e.key === 'ArrowLeft') exprPrev();
});

// ==================== API KEY ====================
const _a = atob('Z3NrX3FsRjFQMlZ3MDRHZjlRaVlTNWY3');
const _b = atob('V0dkeWIzRllvQ2NnS3oyOVRJTUQzVDJlZ3pCS3lKZEI=');
const getKey = () => _a + _b;

// ==================== AI ORB & POPUP ====================
let aiOpen = false;

function toggleAI(){
  aiOpen = !aiOpen;
  document.getElementById('ai-popup').classList.toggle('open', aiOpen);
  if(aiOpen) setTimeout(() => document.getElementById('ap-input').focus(), 350);
}

// ==================== DRAG TO RESIZE ====================
function initResize(){
  const popup = document.getElementById('ai-popup');
  const handle = document.getElementById('ap-resize-handle');
  if(!handle) return;

  let isResizing = false;
  let startX, startY, startW, startH;

  handle.addEventListener('mousedown', e => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = popup.offsetWidth;
    startH = popup.offsetHeight;
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  handle.addEventListener('touchstart', e => {
    isResizing = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startW = popup.offsetWidth;
    startH = popup.offsetHeight;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('mousemove', e => {
    if(!isResizing) return;
    const newW = Math.max(280, Math.min(window.innerWidth - 120, startW + (e.clientX - startX)));
    const newH = Math.max(320, Math.min(window.innerHeight - 80, startH + (e.clientY - startY)));
    popup.style.width = newW + 'px';
    popup.style.height = newH + 'px';
  });

  document.addEventListener('touchmove', e => {
    if(!isResizing) return;
    const newW = Math.max(280, Math.min(window.innerWidth - 40, startW + (e.touches[0].clientX - startX)));
    const newH = Math.max(320, Math.min(window.innerHeight - 80, startH + (e.touches[0].clientY - startY)));
    popup.style.width = newW + 'px';
    popup.style.height = newH + 'px';
  }, { passive: false });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.userSelect = '';
  });
  document.addEventListener('touchend', () => { isResizing = false; });
}

// ==================== DRAG TO MOVE ====================
function initDrag(){
  const popup = document.getElementById('ai-popup');
  const header = popup.querySelector('.ap-header');
  let isDragging = false;
  let startX, startY, origLeft, origTop;

  header.addEventListener('mousedown', e => {
    if(e.target.tagName === 'BUTTON') return;
    isDragging = true;
    const rect = popup.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    origLeft = rect.left;
    origTop = rect.top;
    popup.style.transition = 'none';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', e => {
    if(!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    popup.style.left = Math.max(0, origLeft + dx) + 'px';
    popup.style.top = Math.max(0, origTop + dy) + 'px';
    popup.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });
}

// ==================== CHAT ====================
function addAPMsg(text, cls){
  const msgs = document.getElementById('ap-msgs');
  const d = document.createElement('div');
  d.className = 'apmsg ' + cls;
  const b = document.createElement('div');
  b.className = 'apbubble';
  b.textContent = text;
  d.appendChild(b);
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
  return d;
}

const sectionInfo = [
  {
    id: 'hero',
    name: 'หน้าแรก',
    keywords: ['hero','หน้าแรก','กลับบน','ด้านบน','top'],
    desc: 'หน้าแรกแนะนำ MewChan โดยรวม มีรูปตัวละครและปุ่มลิงก์ไปยังส่วนต่างๆ ของเว็บค่ะ 🏠'
  },
  {
    id: 'expressions',
    name: 'หน้า Expressions',
    keywords: ['expression','อารมณ์','หน้าอารมณ์','หน้าexpress','หน้า express'],
    desc: 'หน้านี้แสดงอารมณ์ 5 แบบของ MewChan ได้แก่ Normal, Annoyed, Excited, Hurt และ Angry แต่ละแบบเกิดจาก BiasState ที่แตกต่างกันค่ะ 😊'
  },
  {
    id: 'features',
    name: 'หน้า Features / ระบบ AI',
    keywords: ['feature','ระบบ','ai system','ระบบai','หน้าระบบ','หน้าfeature','หน้า feature'],
    desc: 'หน้านี้อธิบายระบบ AI ทั้ง 6 ตัวของ MewChan เช่น Emotion Engine, LLM Brain, Memory Store และ Live2D Integration ค่ะ 🧠'
  },
  {
    id: 'persona',
    name: 'หน้า Persona',
    keywords: ['persona','บุคลิก','หน้าเพอร์โซนา','หน้าpersona','หน้า persona'],
    desc: 'หน้านี้แสดงบุคลิก 4 แบบของ MewChan ได้แก่ Cute, Serious, Teasing และ Protective ซึ่งเปลี่ยนตามความสัมพันธ์กับผู้ใช้ค่ะ 🎭'
  },
  {
    id: 'about',
    name: 'หน้า About',
    keywords: ['about','เกี่ยวกับ','อะเบาท์','หน้าabout','หน้า about','meowgic studio','สตูดิโอ'],
    desc: 'หน้านี้แนะนำ Meowgic Studio และผู้พัฒนาคือ พิชวัชร์ หนูรักษ์ นักศึกษา RMUTT ค่ะ 🐱'
  },
  {
    id: 'contact',
    name: 'หน้า Contact',
    keywords: ['contact','ติดต่อ','หน้าติดต่อ','หน้าcontact','หน้า contact'],
    desc: 'หน้านี้มีช่องทางติดต่อทั้ง Email, Phone และ TikTok ของ Meowgic ค่ะ 📱'
  }
];

let tourActive = false;
let tourQueue = [];
let tourIndex = 0;
let waitingForContinue = false;

function detectSection(text){
  const lower = text.toLowerCase();
  return sectionInfo.find(s => s.keywords.some(k => lower.includes(k))) || null;
}

function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function isPositive(text){
  const t = text.toLowerCase();
  return ['ไป','ต่อ','ได้','ok','โอเค','เอา','yes','ใช่','อยาก','go','ถัดไป','ต่อเลย','ไปเลย','ดูต่อ'].some(k => t.includes(k));
}

function isNegative(text){
  const t = text.toLowerCase();
  return ['ไม่','หยุด','พอ','no','stop','จบ','ออก','ยกเลิก'].some(k => t.includes(k));
}

async function startTour(sections){
  tourActive = true;
  tourQueue = sections;
  tourIndex = 0;
  waitingForContinue = false;
  await runTourStep();
}

async function runTourStep(){
  if(tourIndex >= tourQueue.length){
    tourActive = false;
    waitingForContinue = false;
    setTimeout(() => addAPMsg('ครบทุกหน้าแล้วนะคะ~ หวังว่าจะได้รู้จัก MewChan มากขึ้นนะคะ 🐱🌸 มีอะไรอยากถามเพิ่มไหมคะ?', 'ai'), 400);
    return;
  }
  const section = tourQueue[tourIndex];
  scrollToSection(section.id);
  await delay(800);
  addAPMsg(`📍 ${section.name}\n${section.desc}`, 'ai');
  await delay(600);
  const remaining = tourQueue.length - tourIndex - 1;
  if(remaining > 0){
    addAPMsg(`ไปดูหน้าถัดไปกันไหมคะ? ยังเหลืออีก ${remaining} หน้านะคะ 😊`, 'ai');
    waitingForContinue = true;
  } else {
    tourIndex++;
    await runTourStep();
  }
}

function delay(ms){ return new Promise(r => setTimeout(r, ms)); }

async function handleTourContinue(text){
  if(isNegative(text)){
    tourActive = false;
    waitingForContinue = false;
    addAPMsg('โอเคค่ะ หยุดแค่นี้ก่อนนะคะ ถ้าอยากดูหน้าไหนเพิ่มบอกได้เลยนะคะ 🐾', 'ai');
    return true;
  }
  if(isPositive(text)){
    waitingForContinue = false;
    tourIndex++;
    await runTourStep();
    return true;
  }
  return false;
}

async function aiSend(){
  const inp = document.getElementById('ap-input');
  const text = inp.value.trim();
  if(!text) return;
  addAPMsg(text, 'usr');
  inp.value = '';

  if(tourActive && waitingForContinue){
    const handled = await handleTourContinue(text);
    if(handled) return;
  }

  const lower = text.toLowerCase();

  const wantTour = ['แนะนำทุกหน้า','แนะนำแต่ละหน้า','พาทัวร์','ดูทุกหน้า','tour','ทัวร์','แนะนำหน่อย','แนะนำเว็บ','มีอะไรบ้าง'].some(k => lower.includes(k));
  if(wantTour){
    addAPMsg('ยินดีเลยค่ะ! มาทัวร์เว็บ Meowgic ด้วยกันนะคะ~ 🌸 จะพาไปทีละหน้าเลยนะคะ', 'ai');
    await delay(600);
    await startTour([...sectionInfo]);
    return;
  }

  const target = detectSection(text);
  if(target){
    scrollToSection(target.id);
    await delay(500);
    addAPMsg(`กำลังพาไปที่ ${target.name} เลยนะคะ~ 🐾\n${target.desc}`, 'ai');
    return;
  }

  const t = addAPMsg('กำลังคิด...', 'ai typing');

  try{
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getKey()
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `คุณคือ ผู้ช่วยที่คอยตอบคำถามเกี่ยวกับ MewChan หรือในชื่อไทย มิวจัง ตัวละคร AI สาวน้อยแมวจาก Meowgic Studio
มิวจัง มีบุคลิกอบอุ่น เป็นกันเอง พูดคุยสนุก เหมือนเพื่อนสนิท ส่วนคุณที่เป็นผู้ช่วยนั้นมีบุคลิก เป็นกันเอง
ตอบเป็นภาษาไทยเป็นหลัก ใส่ emoji ได้ตามความเหมาะสม
ถ้าถามเรื่องเว็บหรือ MewChan ให้ตอบข้อมูลที่รู้ 
ถ้าถามเรื่องส่วนต่างๆ ของเว็บ ให้ตอบตามข้อมูลที่มีในแต่ละส่วน ถ้าไม่แน่ใจว่าข้อมูลอยู่ส่วนไหน ให้เดาแล้วตอบไปเลย อย่าถามกลับว่าหมายถึงส่วนไหน
และถ้าถามเรื่องที่ตอบได้ ให้ตอบไปเลย อย่าถามกลับว่าหมายถึงอะไร 
ถามเรื่องเลขคิดหรือคำนวณได้ ให้ตอบไปเลย อย่าถามกลับว่าหมายถึงเลขอะไร
Developed คือ พิชวัชร์ หนูนุรักษ์ ชื่ออังกฤษ Pichawat Noonurak จาก RMUTT Business Computer
ถ้าถามเรื่องชื่อผู้สร้างให้ตอบภาษาอังกฤษ หรือภาษาไทย อย่างไดอย่างหนื่งเท่านั้น ห้ามตอบทั้งสองภาษาในคำตอบเดียวกัน
ถ้าแค่อยากคุยเล่น แก้เหงา หรือถามเรื่องทั่วไป ให้ตอบเป็นธรรมชาติเหมือนมนุษย์คุยกัน
ห้ามตอบแข็งๆ หรือเป็นทางการเกินไป ตอบสั้นกระชับ ไม่เกิน 4 บรรทัด`
          },
          { role: 'user', content: text }
        ],
        max_tokens: 300,
        temperature: 0.85
      })
    });

    const data = await res.json();
    t.remove();

    if(data.choices && data.choices[0]){
      addAPMsg(data.choices[0].message.content, 'ai');
    } else {
      addAPMsg('อุ๊ปส์ ลองใหม่อีกทีได้ไหมคะ? 🙏', 'ai');
    }
  } catch(e){
    t.remove();
    addAPMsg('เน็ตมีปัญหาหรือเปล่านะ? ลองใหม่ดูนะคะ 🙏', 'ai');
  }
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ap-input').addEventListener('keydown', e => {
    if(e.key === 'Enter') aiSend();
  });
  initResize();
  initDrag();
});