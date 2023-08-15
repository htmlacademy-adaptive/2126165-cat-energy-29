function init() {
  let map = new ymaps.Map("map", {
    center: [59.938572, 30.319937],
    zoom: 17
  });

  let placemark = new ymaps.Placemark([59.93871181590914, 30.3230150423278], {}, {
    iconLayout: "default#image",
    iconImageHref: "./img/pin.svg",
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
