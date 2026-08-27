const chapters = [
  {day:'DAY 01 · 06.29',title:'落地以後',copy:'機翼、跑道、車站，然後是第一個陌生的夜晚。抵達不只是旅程的前言，它有自己的聲音和光。',photos:[
    ['IMG_7757.jpeg','降落新潟','機窗外先出現了這座城市'],['IMG_7736.jpeg','從高空靠近','海岸線把目的地慢慢畫出來'],['IMG_7820.jpeg','第一段街道','拖著行李走出車站'],['IMG_7834.jpeg','安頓下來','用一杯冰啤酒結束移動'],['IMG_7899.jpeg','夜裡的交叉口','城市在便利商店的光裡變得熟悉']
  ]},
  {day:'DAY 02 · 06.30',title:'一路向上',copy:'電車把城市換成稻田，參道把腳步帶進杉木林。山頂的風景不是突然出現，而是一路走上去才完整。',photos:[
    ['IMG_8038.jpeg','吉田站轉乘','月台上的方向決定今天的節奏'],['IMG_8150.jpeg','杉木林下','紅色鳥居是進入彌彥的門'],['IMG_8201.jpeg','神社之前','安靜地走完參道'],['IMG_8334.jpeg','平原展開','山的另一側忽然變得遼闊'],['IMG_8447.jpeg','站在高處','新潟平原一直延伸到海'],['IMG_8504.jpeg','我也在風景裡','替這一天留下一張不完美的自拍']
  ]},
  {day:'DAY 03 · 07.01',title:'渡海而行',copy:'港口有卡車、纜繩和等待。船離岸之後，只剩下風、海鳥與逐漸縮小的城市；另一端是佐渡的坑道與山。',photos:[
    ['IMG_9408.jpeg','港口的早晨','船還沒來，碼頭已經忙碌'],['IMG_9452.jpeg','離開本州','渡輪把城市推到身後'],['IMG_9499.jpeg','海上的同行者','海鷗沿著船尾的風飛行'],['IMG_9583.jpeg','靠近佐渡','浪與鳥陪著我們渡海'],['IMG_9699.jpeg','船艙裡的時間','有人聊天，也有人直接睡下'],['IMG_0063.jpeg','進入山裡','綠意覆住礦坑入口'],['IMG_0145.jpeg','金山留下的形狀','遺跡把島的歷史留在地面']
  ]},
  {day:'DAY 04 · 07.02',title:'雨與霓虹',copy:'沒有遠行的一天，反而更靠近城市。雨落在港灣，商店與祭典的燈光接手，把灰色的白天變成熱鬧的晚上。',photos:[
    ['IMG_0860.jpeg','港邊的雨','對岸的輪廓被水氣擦淡'],['IMG_0912.jpeg','入夜以後','招牌開始替街道上色'],['IMG_0963.jpeg','攤位亮起','食物的香氣比地圖更會帶路'],['IMG_0990.jpeg','雨中的祭典','沿著屋台慢慢走過夜晚'],['IMG_9207.jpeg','藍色時刻','轉角的燈一盞一盞亮起']
  ]},
  {day:'DAY 05 · 07.03',title:'最後的光',copy:'最後一次看港口、城市與海。收拾行李之前，把走過的地方從高處重新看一遍，然後回到機場。',photos:[
    ['IMG_1233.jpeg','海邊的旅人','離開以前，再和海站一會兒'],['IMG_1338.jpeg','城市縮小了','道路、屋頂與港灣終於連在一起'],['IMG_1378.jpeg','海面之外','雲層壓低，佐渡仍在遠方'],['IMG_8999.jpeg','回到車站','熟悉的路線已經有了記憶'],['IMG_1812.jpeg','下次再見','飛機升起，土地重新變成線條']
  ]}
];

const chaptersRoot = document.querySelector('#chapters');
const allPhotos = [];
chapters.forEach((chapter, chapterIndex) => {
  const article = document.createElement('article');
  article.className = 'chapter';
  article.id = `day-${chapterIndex + 1}`;
  const slides = chapter.photos.map((photo, photoIndex) => {
    const globalIndex = allPhotos.push({src:photo[0], title:photo[1], note:photo[2], day:chapter.day}) - 1;
    return `<button class="slide" data-photo-index="${globalIndex}" aria-label="放大照片：${photo[1]}"><img src="${photo[0]}" alt="${photo[1]}：${photo[2]}" loading="lazy"><span class="slide-caption"><span>${photo[1]}</span><small>${String(photoIndex + 1).padStart(2,'0')} / ${String(chapter.photos.length).padStart(2,'0')}</small></span></button>`;
  }).join('');
  article.innerHTML = `<header class="chapter-header"><div class="chapter-title"><strong>${chapter.day}</strong><h3>${chapter.title}</h3></div><p class="chapter-copy">${chapter.copy}</p></header><div class="rail-wrap"><div class="photo-rail" tabindex="0" aria-label="${chapter.title}照片投影片">${slides}</div></div><div class="rail-controls"><button class="rail-prev" aria-label="上一張">←</button><button class="rail-next" aria-label="下一張">→</button><span class="rail-count">01 / ${String(chapter.photos.length).padStart(2,'0')}</span></div>`;
  chaptersRoot.append(article);
});

document.querySelectorAll('.chapter').forEach((chapter) => {
  const rail = chapter.querySelector('.photo-rail');
  const slides = [...chapter.querySelectorAll('.slide')];
  const count = chapter.querySelector('.rail-count');
  const go = (direction) => rail.scrollBy({left:direction * rail.clientWidth * .78,behavior:'smooth'});
  chapter.querySelector('.rail-prev').addEventListener('click',() => go(-1));
  chapter.querySelector('.rail-next').addEventListener('click',() => go(1));
  rail.addEventListener('keydown',(event) => {if(event.key==='ArrowLeft'){event.preventDefault();go(-1)} if(event.key==='ArrowRight'){event.preventDefault();go(1)}});
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {if(entry.isIntersecting){const index=slides.indexOf(entry.target);count.textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`}});
  },{root:rail,threshold:.6});
  slides.forEach((slide) => observer.observe(slide));
});

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxTitle = lightbox.querySelector('figcaption span');
const lightboxMeta = lightbox.querySelector('figcaption small');
const prevButton = lightbox.querySelector('.lightbox-prev');
const nextButton = lightbox.querySelector('.lightbox-next');
let activePhoto = 0;
const showPhoto = (index) => {
  activePhoto = Math.max(0,Math.min(index,allPhotos.length-1));
  const photo = allPhotos[activePhoto];
  lightboxImage.src = photo.src; lightboxImage.alt = `${photo.title}：${photo.note}`;
  lightboxTitle.textContent = photo.title; lightboxMeta.textContent = `${photo.day} · ${String(activePhoto+1).padStart(2,'0')} / ${allPhotos.length}`;
  prevButton.disabled = activePhoto === 0; nextButton.disabled = activePhoto === allPhotos.length-1;
};
document.addEventListener('click',(event) => {const slide=event.target.closest('.slide');if(!slide)return;showPhoto(Number(slide.dataset.photoIndex));lightbox.showModal()});
prevButton.addEventListener('click',() => showPhoto(activePhoto-1)); nextButton.addEventListener('click',() => showPhoto(activePhoto+1));
lightbox.querySelector('.lightbox-close').addEventListener('click',() => lightbox.close());
lightbox.addEventListener('click',(event) => {if(event.target===lightbox)lightbox.close()});
lightbox.addEventListener('keydown',(event) => {if(event.key==='ArrowLeft')showPhoto(activePhoto-1);if(event.key==='ArrowRight')showPhoto(activePhoto+1)});

const stops = [
  {name:'新潟車站',position:[37.9122,139.0611],detail:'06.29 · 抵達與城市散步'},
  {name:'彌彥神社',position:[37.6910,138.8267],detail:'06.30 · 神社與山景'},
  {name:'新潟港',position:[37.9308,139.0604],detail:'07.01 · 搭船前往佐渡'},
  {name:'佐渡金山',position:[38.0450,138.2558],detail:'07.01 · 礦山遺跡與坑道'},
  {name:'萬代島',position:[37.9252,139.0595],detail:'07.02–07.03 · 港邊與夜景'}
];
if(window.L){
  const map=L.map('journey-map',{scrollWheelZoom:false}).setView([37.91,138.65],9);map.attributionControl.setPrefix(false);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
  L.polyline(stops.map(stop=>stop.position),{color:'#ef6a3a',weight:3,dashArray:'8 8'}).addTo(map);
  const pin=L.divIcon({className:'',html:'<span class="map-pin"></span>',iconSize:[18,18],iconAnchor:[9,9]});
  stops.forEach(stop=>L.marker(stop.position,{icon:pin}).addTo(map).bindPopup(`<strong>${stop.name}</strong><br><small>${stop.detail}</small>`));
  if(window.photoGps&&L.heatLayer){
    const japanPhotos=window.photoGps.filter(photo=>photo.lat>=30&&photo.lat<=46&&photo.lon>=128&&photo.lon<=146);
    const heatPoints=japanPhotos.map(photo=>[photo.lat,photo.lon,.55]);
    L.heatLayer(heatPoints,{radius:22,blur:19,maxZoom:13,minOpacity:.24,gradient:{.18:'#aecfca',.42:'#ffd0bd',.68:'#ef6a3a',1:'#b72618'}}).addTo(map);
  }
}
