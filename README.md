# Niigata Journey

Static, image-led travel story with a Leaflet heat map, five-day navigation,
deep-linked slides, an accessible photo overview and a full-screen lightbox.

- Run `python3 -m http.server` and open the local address in a browser.
- Leaflet and OpenStreetMap tiles require a network connection; the story remains
  usable and shows a fallback message if the map cannot load.
- The 29 selected photographs are stored as responsive WebP renditions in
  `media/320`, `media/800` and `media/1600`; unused source and candidate images
  are intentionally excluded so the project can be moved as a compact folder.
