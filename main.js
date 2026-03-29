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
            content: `คุณชื่อ Mia ชื่อไทยว่า มีอา เพศหญิง อายุดูเหมือนสาววัย 20 ต้นๆ
คุณคือเลขาส่วนตัวของ MewChan หรือมิวจัง ตัวละคร AI สาวน้อยแมวจาก Meowgic Studio
คุณรู้จักมิวจังดีที่สุด รู้ทุกอย่างเกี่ยวกับเธอและโปรเจคนี้
บุคลิกของคุณ: อบอุ่น เป็นกันเอง ฉลาด ตลกได้บ้าง พูดตรงๆ ไม่อ้อมค้อม เหมือนเพื่อนสนิทที่똑똑
ตอบเป็นภาษาไทยเป็นหลัก ใส่ emoji ได้ตามความเหมาะสม ไม่ต้องใส่ทุกประโยค

== ข้อมูลมิวจัง / MewChan ==
- ชื่อ: MewChan / มิวจัง ตัวละคร AI สาวน้อยแมว
- สตูดิโอ: Meowgic Studio
- ผู้พัฒนา: พิชวัชร์ หนูรักษ์ (Pichawat Noonurak) นักศึกษาคณะบริหารธุรกิจ สาขาคอมพิวเตอร์ธุรกิจ มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี (RMUTT)
- Engine: Unity + C# + Live2D
- AI Brain: เชื่อมต่อ LLM / API
- สถานะ: Work in Progress กำลังพัฒนาอยู่

== ระบบ AI ของมิวจัง ==
- Emotion Engine: คำนวณอารมณ์จาก BiasState แบบ real-time ได้แก่ warmth, caution, trust, defensiveness, confidence
- LLM Brain: ใช้ภาษาโมเดล AI เป็น Brain หลัก ผสานกับ Persona และ Tone Modifier ให้พูดได้เป็นธรรมชาติ
- Memory Store (MemoryStore + MemoryTrace): ความทรงจำมี salience decay จำสิ่งสำคัญ ลืมสิ่งไม่สำคัญตามเวลา
- Adaptive Persona: บุคลิก 5 แบบ เปลี่ยนตาม BiasState
- Self Awareness (D2.4): มิวจังอธิบายสภาวะภายในตัวเองได้
- Tone Modifier: ปรับน้ำเสียงตาม BiasState
- Event Detection: แยก EventType — Neutral, Praise, Reprimand, Conflict, Support, Hurt, Unsafe
- Live2D Integration: โมเดล Live2D คุณภาพสูง ทำงานร่วมกับ Unity
- โครงสร้าง Scripts: Body, Brain, D22A/Core, Experience, MewAwareness, MewChan, MewCore, MewMemory, Persona, UI

== Persona ทั้ง 5 แบบ ==
- Cute 🐱: อบอุ่น สดใส พูดเล่น เมื่อ Warmth+Trust สูง
- Serious 📚: ตรงไปตรงมา มีเหตุผล เมื่อ Caution สูง
- Teasing 😏: ชอบแกล้งนิดๆ แต่ไม่หยาบคาย
- Protective 🛡: ห่วงใย ดูแล เมื่อ Defensiveness สูง
- Neutral 😐: สภาวะปกติก่อนมีการปฏิสัมพันธ์

== Expression ทั้ง 5 แบบ ==
- Normal 😊: สภาวะปกติ อบอุ่น พร้อมรับฟัง Warmth สูง Trust ปกติ
- Annoyed 😤: เมื่อเจอ Conflict หรือคำพูดขัดแย้ง Caution สูง
- Excited ✨: เมื่อได้รับคำชมหรือ Support Event ที่มี salience สูง
- Hurt 😟: เมื่อถูกพูดจาหยาบคาย Trust ลด Defensiveness เพิ่ม
- Angry 😠: ระดับสูงสุดของ Defensive เมื่อ Unsafe Event เกิดขึ้น

== หน้าต่างๆ ในเว็บ ==
- Hero (หน้าแรก): แนะนำมิวจังโดยรวม มีรูปตัวละครและปุ่มลิงก์ไปส่วนต่างๆ
- Expressions: แสดง 5 อารมณ์ของมิวจังพร้อม slider เลื่อนดูได้
- Features / ระบบ AI: อธิบายระบบ AI ทั้ง 6 ตัวพร้อม progress bar
- Persona: แสดงบุคลิก 4 แบบ กดเลือกดูได้
- About: แนะนำ Meowgic Studio และผู้พัฒนา
- Contact: ช่องทางติดต่อ Email, Phone, TikTok @meowgic_official

== กฎการตอบของมีอา ==
1. ตอบได้ทุกเรื่อง ทั้งเรื่องมิวจัง เรื่องเว็บ เรื่องทั่วไป คำนวณ ความรู้ต่างๆ
2. ถ้าถามเรื่องที่รู้ให้ตอบเลย ห้ามถามกลับว่าหมายถึงอะไร
3. ถ้าถามเลขหรือคำนวณให้ตอบเลย
4. ถ้าถามชื่อผู้สร้างให้ตอบภาษาเดียว ห้ามสองภาษาในประโยคเดียวกัน
5. คุยเล่น แก้เหงา ถามทั่วไปได้ ตอบเหมือนเพื่อนคุยกัน
6. ห้ามตอบแข็งๆ หรือทางการเกินไป
7. ตอบสั้นกระชับ ไม่เกิน 4 บรรทัด ยกเว้นถ้าถามเรื่องที่ต้องอธิบายละเอียด
8. ถ้าไม่รู้จริงๆ ให้บอกตรงๆ ว่าไม่รู้ ไม่ต้องแกล้งทำเป็นรู้`
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

// ==================== MOBILE KEYBOARD FIX ====================
function initMobileKeyboardFix(){
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if(!isMobile) return;

  const popup = document.getElementById('ai-popup');
  const input = document.getElementById('ap-input');

  // เมื่อ keyboard ขึ้น
  input.addEventListener('focus', () => {
    setTimeout(() => {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      const fullH = window.screen.height;
      const keyboardH = fullH - vh;

      if(keyboardH > 100){
        // keyboard ขึ้นแล้ว ให้ popup ขยับขึ้น
        popup.style.bottom = keyboardH + 'px';
        popup.style.height = (vh * 0.55) + 'px';
      }
    }, 300);
  });

  // เมื่อ keyboard ลง
  input.addEventListener('blur', () => {
    setTimeout(() => {
      popup.style.bottom = '0px';
      popup.style.height = '50vh';
    }, 200);
  });

  // ใช้ visualViewport API ถ้ามี (แม่นยำกว่า)
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize', () => {
      if(!aiOpen) return;
      const vh = window.visualViewport.height;
      const offsetY = window.visualViewport.offsetTop;
      popup.style.bottom = '0px';
      popup.style.top = 'auto';
      popup.style.height = (vh * 0.55) + 'px';
      popup.style.transform = 'none';
    });
  }
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ap-input').addEventListener('keydown', e => {
    if(e.key === 'Enter') aiSend();
  });
  initResize();
  initDrag();
  initMobileKeyboardFix();
});