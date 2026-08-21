const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

const stops = [
  {name:'新潟車站｜Niigata Station', position:[37.9122,139.0611], detail:'06.29 · 抵達與城市散步'},
  {name:'彌彥神社｜Yahiko Shrine', position:[37.6910,138.8267], detail:'06.30 · 神社與山景'},
  {name:'新潟港佐渡汽船｜Sado Kisen', position:[37.9308,139.0604], detail:'07.01 · 搭船前往佐渡'},
  {name:'佐渡金山｜Sado Kinzan', position:[38.0450,138.2558], detail:'07.01 · 礦山遺跡與坑道'},
  {name:'佐渡・相川一帶｜Aikawa', position:[38.0401,138.2558], detail:'07.01 · 佐渡島上的 GPS 照片群'},
  {name:'萬代島與新潟港｜Bandai Island', position:[37.9252,139.0595], detail:'07.02–07.03 · 港邊與夜景'}
];

if (window.L) {
  const map = L.map('journey-map', {scrollWheelZoom:false}).setView([37.91, 138.65], 9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:18, attribution:'© OpenStreetMap contributors'}).addTo(map);
  L.polyline(stops.map((stop) => stop.position), {color:'#e36d45', weight:3, dashArray:'8 8'}).addTo(map);
  const pin = L.divIcon({className:'', html:'<span class="map-pin"></span>', iconSize:[18,18], iconAnchor:[9,9]});
  stops.forEach((stop) => L.marker(stop.position, {icon:pin}).addTo(map).bindPopup(`<strong>${stop.name}</strong><br><small>${stop.detail}</small>`));
  if (window.photoGps && L.markerClusterGroup) {
    const photoLayer = L.markerClusterGroup({showCoverageOnHover:false, maxClusterRadius:42});
    const photoPin = L.divIcon({className:'', html:'<span class="photo-map-pin"></span>', iconSize:[10,10], iconAnchor:[5,5]});
    window.photoGps.forEach((photo) => {
      if (photo.lat === null || photo.lon === null) return;
      L.marker([photo.lat, photo.lon], {icon:photoPin})
        .bindPopup(`<strong>${photo.file}</strong><br><small>${photo.date.replace('2026:','2026.').replace(':','.')}</small>`)
        .addTo(photoLayer);
    });
    photoLayer.addTo(map);
  }
}

document.querySelectorAll('.photo').forEach((photo) => {
  photo.addEventListener('click', () => {
    const image = photo.querySelector('img');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = photo.querySelector('span').textContent;
    lightbox.showModal();
  });
});

document.querySelector('.close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
