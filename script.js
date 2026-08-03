// Floating hearts background
const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
let W, H;
function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const colors = ['#ff8fb3','#ffd6e4','#e0568a','#e6b8a2'];
function makeHeart(){
  return {
    x: Math.random()*W,
    y: H + 20 + Math.random()*H,
    size: 8 + Math.random()*14,
    speed: 0.3 + Math.random()*0.7,
    drift: (Math.random()-0.5)*0.6,
    angle: Math.random()*Math.PI*2,
    color: colors[Math.floor(Math.random()*colors.length)],
    opacity: 0.15 + Math.random()*0.35
  };
}
const hearts = Array.from({length: 26}, makeHeart);

function drawHeart(h){
  ctx.save();
  ctx.translate(h.x, h.y);
  ctx.globalAlpha = h.opacity;
  ctx.fillStyle = h.color;
  ctx.beginPath();
  const s = h.size;
  ctx.moveTo(0, s*0.3);
  ctx.bezierCurveTo(0, 0, -s, 0, -s, s*0.35);
  ctx.bezierCurveTo(-s, s*0.75, 0, s, 0, s*1.3);
  ctx.bezierCurveTo(0, s, s, s*0.75, s, s*0.35);
  ctx.bezierCurveTo(s, 0, 0, 0, 0, s*0.3);
  ctx.fill();
  ctx.restore();
}

function animate(){
  ctx.clearRect(0,0,W,H);
  for(const h of hearts){
    h.y -= h.speed;
    h.x += h.drift;
    if(h.y < -30){ Object.assign(h, makeHeart(), {y: H+20}); }
    drawHeart(h);
  }
  requestAnimationFrame(animate);
}
animate();

// Reveal button
const messages = [
  'بحبك أكتر من أي كلام هيتقال 💗',
  'قلبي مساحته كلها ليكي يا هاجر',
  'من أول ما عرفتك، الدنيا بقت أحلى',
  'انتي الحلم اللي مكنتش مستني يتحقق',
  'هفضل بحبك لآخر يوم في عمري'
];
const btn = document.getElementById('press');
const txt = document.getElementById('reveal-text');
let idx = 0;
btn.addEventListener('click', ()=>{
  txt.classList.remove('show');
  setTimeout(()=>{
    txt.textContent = messages[idx % messages.length];
    idx++;
    txt.classList.add('show');
  }, 200);
});