const chapters = [
  {day:'DAY 01 · 06.29',title:'落地以後',copy:'機翼、跑道、車站，然後是第一個陌生的夜晚。抵達不只是旅程的前言，它有自己的聲音和光。',photos:[
    ['IMG_7608.jpeg','離開台灣','河流與城市在雲層下慢慢縮小'],['IMG_7750.jpeg','海岸線出現','機翼下的日本海把目的地帶到眼前'],['IMG_7802.jpeg','抵達新潟','機場大廳用一張地圖迎接旅人'],['IMG_7838.jpeg','第一頓晚餐','熱飯、炸豬排與啤酒替移動的一天收尾'],['IMG_7875.jpeg','新潟站南口','直到看見站名，抵達才真正有了實感']
  ]},
  {day:'DAY 02 · 06.30',title:'一路向上',copy:'電車把城市換成稻田，參道把腳步帶進杉木林。山頂的風景不是突然出現，而是一路走上去才完整。',photos:[
    ['IMG_7999.jpeg','搭上早班電車','月台與列車把城市生活拉向郊外'],['IMG_8148.jpeg','彌彥的入口','紅色鳥居在樹蔭裡標出另一種時間'],['IMG_8161.jpeg','穿過杉木參道','腳步在高大的樹影之間慢了下來'],['IMG_8181.jpeg','來到彌彥神社','屋簷、木色與參拜的人群構成安靜的中心'],['IMG_8227.jpeg','纜車之前','沿著山坡向上，視野開始離開地面'],['IMG_8377.jpeg','山脊與日本海','道路沿著綠色稜線伸向海的方向']
  ]},
  {day:'DAY 03 · 07.01',title:'渡海而行',copy:'港口有卡車、纜繩和等待。船離岸之後，只剩下風、海鳥與逐漸縮小的城市；另一端是佐渡的坑道與山。',photos:[
    ['IMG_9370.jpeg','甲板上的人群','船離港以前，大家先為海鳥聚在一起'],['IMG_9580.jpeg','海上的同行者','海鷗貼著船尾的風，在鏡頭前掠過'],['IMG_9753.jpeg','佐渡靠近了','山的輪廓越來越清楚，島嶼終於成為陸地'],['IMG_9956.jpeg','進入佐渡金山','潮濕坑道把旅程帶進島的歷史深處'],['IMG_0014.jpeg','礦山留下的機械','木構工場仍保留昔日生產的尺度'],['IMG_0127.jpeg','北澤浮遊選礦場','廢墟被植物覆蓋，工業遺跡像另一座山'],['IMG_0381.jpeg','兩津港的暮色','一天最後的粉紅色落在港灣與山影之間']
  ]},
  {day:'DAY 04 · 07.02',title:'雨與霓虹',copy:'沒有遠行的一天，反而更靠近城市。雨落在港灣，商店與祭典的燈光接手，把灰色的白天變成熱鬧的晚上。',photos:[
    ['IMG_0680.jpeg','雨中的新潟站','傘與濕亮的路面改變了城市的速度'],['IMG_0828.jpeg','漫畫與動畫之城','紅白展牆把新潟的另一面拉進室內'],['IMG_0860.jpeg','信濃川的雨','河面與遠方建築被同一層灰色包住'],['IMG_0912.jpeg','霓虹亮起','雨停之後，街口開始用招牌說話'],['IMG_0953.jpeg','走進夜祭','成排屋台、人群與燈火把夜晚重新點亮']
  ]},
  {day:'DAY 05 · 07.03',title:'最後的光',copy:'最後一次看港口、城市與海。收拾行李之前，把走過的地方從高處重新看一遍，然後回到機場。',photos:[
    ['IMG_1213.jpeg','最後一次散步','舊建築與陰雲替城市留下安靜的輪廓'],['IMG_1307.jpeg','從高處回望','街道、河流與海岸終於連成完整的地圖'],['IMG_1367.jpeg','港外的佐渡','船與遠方島影把五天的距離放進同一幅畫面'],['IMG_1699.jpeg','候機室的夕陽','跑道盡頭的光提醒我們旅程正在收束'],['IMG_1757.jpeg','離地以前','機翼掠過橘色天空，這次真的要告別新潟']
  ]}
];

const chaptersRoot = document.querySelector('#chapters');
const allPhotos = chapters.flatMap((chapter, chapterIndex) => chapter.photos.map((photo, photoIndex) => ({
  src:photo[0], title:photo[1], note:photo[2], day:chapter.day, chapter:chapter.title,
  chapterCopy:chapter.copy, chapterIndex, photoIndex
})));

allPhotos.forEach((photo, index) => {
  const isOpening = photo.photoIndex === 0;
  const webpName = photo.src.replace('.jpeg','.webp');
  const article = document.createElement('article');
  article.className = `journey-slide${index % 2 ? ' journey-slide--reverse' : ''}`;
  article.id = `moment-${index + 1}`;
  article.innerHTML = `
    <div class="journey-visual">
      <button class="journey-image" data-photo-index="${index}" aria-label="全螢幕觀看：${photo.title}">
        <picture><source media="(max-width: 900px)" srcset="media/800/${webpName}"><img src="media/1600/${webpName}" alt="${photo.title}：${photo.note}" loading="lazy" decoding="async" fetchpriority="low" width="1600" height="1200"></picture>
      </button>
    </div>
    <div class="journey-copy">
      <div>
        <p class="journey-day">${photo.day}</p>
        ${isOpening ? `<p class="journey-chapter">${photo.chapter}</p>` : ''}
        <h3>${photo.title}</h3>
        <p class="journey-note">${photo.note}</p>
        ${isOpening ? `<p class="journey-context">${photo.chapterCopy}</p>` : ''}
      </div>
      <div class="journey-progress"><span>${String(index + 1).padStart(2,'0')}</span><i></i><span>${String(allPhotos.length).padStart(2,'0')}</span></div>
      <nav class="journey-nav" aria-label="投影片導覽">
        <button class="journey-prev" ${index === 0 ? 'disabled' : ''} aria-label="上一張投影片">↑</button>
        <button class="journey-next" ${index === allPhotos.length - 1 ? 'disabled' : ''} aria-label="下一張投影片">↓</button>
      </nav>
    </div>`;
  chaptersRoot.append(article);
});

const journeySlides = [...document.querySelectorAll('.journey-slide')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const moveToSlide = (index) => journeySlides[Math.max(0,Math.min(index,journeySlides.length-1))]?.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
journeySlides.forEach((slide,index) => {
  slide.querySelector('.journey-prev').addEventListener('click',() => moveToSlide(index-1));
  slide.querySelector('.journey-next').addEventListener('click',() => moveToSlide(index+1));
});
document.addEventListener('keydown',(event) => {
  if(lightbox?.open || !['ArrowDown','ArrowUp','PageDown','PageUp'].includes(event.key)) return;
  const current=Math.max(0,journeySlides.findIndex(slide=>{const rect=slide.getBoundingClientRect();return rect.top<=innerHeight*.45&&rect.bottom>=innerHeight*.45}));
  event.preventDefault();moveToSlide(current+(event.key==='ArrowDown'||event.key==='PageDown'?1:-1));
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
  lightboxImage.src = `media/1600/${photo.src.replace('.jpeg','.webp')}`; lightboxImage.alt = `${photo.title}：${photo.note}`;
  lightboxTitle.textContent = photo.title; lightboxMeta.textContent = `${photo.day} · ${String(activePhoto+1).padStart(2,'0')} / ${allPhotos.length}`;
  prevButton.disabled = activePhoto === 0; nextButton.disabled = activePhoto === allPhotos.length-1;
};
document.addEventListener('click',(event) => {const slide=event.target.closest('.journey-image');if(!slide)return;showPhoto(Number(slide.dataset.photoIndex));lightbox.showModal()});
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
