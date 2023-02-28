$(function () {
	$('.slider-reviews__inner').slick({
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
		infinite: false,
		speed: 300,
	})
});

let map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: {lat: 59.936392, lng:  30.321109},
		zoom: 17,
		disableDefaultUI: true
	});

  	let image = {
  		url: './images/icon/map-marker.svg',
        size: new google.maps.Size(36, 36),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(18, 18)};
	let myLatLng = new google.maps.LatLng(59.936392,30.3211094);
	let marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});
}