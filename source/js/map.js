let screenWidth = window.screen.width;
let center;
let zoom;
let pinSize;

if (screenWidth < 1280) {
  center = [59.938631, 30.323037];
  zoom = 15;
} else if (screenWidth >= 1280) {
  center = [59.939478, 30.309472];
  zoom = 14;
};

if (screenWidth < 768) {
  pinSize = [57, 53];
} else {
  pinSize = [113, 106];
}

function init() {
  let map = new ymaps.Map("map", {
    center: center,
    zoom: zoom
  });

  let placemark = new ymaps.Placemark([59.93871181590914, 30.3230150423278], {}, {
    iconLayout: "default#image",
    iconImageHref: "./img/pin.svg",
    iconImageSize: pinSize,
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
};

ymaps.ready(init);

window.onresize = function (event) {
  if (document.documentElement.clientWidth < 768) {
    location.reload()
  } else if (document.documentElement.clientWidth >= 768) {
    location.reload()
  } else if (document.documentElement.clientWidth >= 1280) {
    location.reload()
  };
}
