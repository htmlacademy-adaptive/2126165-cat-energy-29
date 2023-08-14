let center = [59.93871181590914, 30.3230150423278];

function init() {
  let map = new ymaps.Map("map", {
    center: center,
    zoom: 14
  });

  let placemark = new ymaps.Placemark(center, {}, {
    iconLayout: "default#image",
    iconImageHref: "../img/pin.svg",
    iconImageSize: [57, 53],
    iconImageOffset: [-19, -44]
  });

  map.controls.remove("geolocationControl");
  map.controls.remove("searchControl");
  map.controls.remove("trafficControl");
  map.controls.remove("typeSelector");
  map.controls.remove("fullscreenControl");
  map.controls.remove("zoomControl");
  map.controls.remove("rulerControl");

  map.geoObjects.add(placemark);
}

ymaps.ready(init);
