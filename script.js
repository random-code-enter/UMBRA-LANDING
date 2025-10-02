const startDate = new Date('2025-09-25T00:00:00-03:00');
const endDate   = new Date('2025-11-20T00:00:00-03:00');

const countArea = document.getElementById('countArea');

function pad(n){ return String(n).padStart(2,'0'); }

function msToParts(ms){
  if(ms < 0) ms = 0;
  const s = Math.floor(ms/1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return {days,hours,minutes,seconds};
}

function renderParts(parts){
  return `
    <div class="unit">
      <div class="num">${parts.days}</div>
      <div class="label">días</div>
    </div>
    <div class="unit">
      <div class="num">${pad(parts.hours)}</div>
      <div class="label">horas</div>
    </div>
    <div class="unit">
      <div class="num">${pad(parts.minutes)}</div>
      <div class="label">min</div>
    </div>
    <div class="unit">
      <div class="num">${pad(parts.seconds)}</div>
      <div class="label">seg</div>
    </div>
  `;
}

function update(){
  const now = new Date();

  if(now < startDate){
    const diff = startDate - now;
    const parts = msToParts(diff);
    countArea.innerHTML = renderParts(parts); 
  } else if(now >= startDate && now <= endDate){
    const diff = endDate - now;
    const parts = msToParts(diff);
    countArea.innerHTML = renderParts(parts); 
  } else {
    countArea.innerHTML = '<div style="color:var(--muted);font-weight:700">Período finalizado (20 de noviembre de 2025)</div>';
    clearInterval(timer);
  }
}

update();
const timer = setInterval(update,1000);
