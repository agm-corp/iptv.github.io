const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
	projection: L.Projection.LonLat,
	scale: function (zoom) {
		return Math.pow(2, zoom);
	},
	zoom: function (sc) {
		return Math.log(sc) / 0.6931471805599453;
	},
	distance: function (pos1, pos2) {
		var x_difference = pos2.lng - pos1.lng;
		var y_difference = pos2.lat - pos1.lat;
		return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
	},
	transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
	infinite: true
});

var mapStatic = L.tileLayer('img/mapStyles/{z}/{x}/{y}.jpg', {
	minZoom: 0,
	maxZoom: 5,
	noWrap: true,
	id: 'styleAtlas map'
});
var mapStatic2 = L.tileLayer('img/mapStyles/{z}/{x}/{y}.jpg', {
	minZoom: 0,
	maxZoom: 5,
	noWrap: true,
	id: 'styleAtlas map 2'
});

var mapStatic3 = L.tileLayer('img/mapStyles/{z}/{x}/{y}.jpg', {
	minZoom: 0,
	maxZoom: 5,
	noWrap: true,
	id: 'styleAtlas map 3'
});

var CentralGroup = L.layerGroup();
var TerritoriesGroup = L.layerGroup();
var TerritoriesAdminGroup = L.layerGroup();

let territorios = [];
let territoriosAdmin = [];
let central = [];

let Blips = {};
let BlipsAdmin = [];

let Circles = {};

var Icons = {
	Central: CentralGroup,
	Territories: TerritoriesGroup,
	TerritoriesAdmin: TerritoriesAdminGroup
};

var mapTerritorios;
var mapTerritoriosAdmin;
var mapCentral;

let pendingblips = {};

function cargarMapaTerritorios() {
	mapTerritorios = null;

	mapTerritorios = L.map('mapTerritorios', {
		crs: CUSTOM_CRS,
		minZoom: 1.5,
		maxZoom: 5,
		boxZoom: false,
		maxNativeZoom: 5,
		preferCanvas: true,
		layers: [mapStatic2, Icons['Territories']],
		center: [1500, 300],
		zoom: 1.5,
		zoomControl: false,
		maxBoundsViscosity: 1.0,
		tms: false,
		noWrap: true
	});

	setTimeout(() => {
		mapTerritorios.invalidateSize();
		var southWest = mapTerritorios.unproject([0, 8192], mapTerritorios.getMaxZoom());
		var northEast = mapTerritorios.unproject([8192, 0], mapTerritorios.getMaxZoom());
		var bounds = L.latLngBounds(southWest, northEast);
		mapTerritorios.setMaxBounds(bounds);
		// addTerritorio(1500,300, 350, "Territorio test", 150, "#ff0000")
	}, 501);

	setTimeout(() => {
		clearTerritories();
		// loadGangInfo()
	}, 250);
}

function cargarMapaTerritoriosAdmin() {
	setTimeout(function () {
		if (!mapTerritoriosAdmin) {
			mapTerritoriosAdmin = L.map('mapTerritoriosAdmin', {
				crs: CUSTOM_CRS,
				minZoom: 1.5,
				maxZoom: 5,
				boxZoom: false,
				maxNativeZoom: 5,
				preferCanvas: true,
				layers: [mapStatic3, Icons['TerritoriesAdmin']],
				center: [1500, 300],
				zoom: 1.5,

				zoomControl: false,
				maxBoundsViscosity: 1.0,
				tms: false,
				noWrap: true
			});
			// mapTerritorios.on('drag', function() {
			//     mapTerritorios.panInsideBounds(bounds, { animate: false });
			// });
			setTimeout(() => {
				mapTerritoriosAdmin.invalidateSize();
				var southWestAdmin = mapTerritoriosAdmin.unproject(
					[0, 8192],
					mapTerritoriosAdmin.getMaxZoom()
				);
				var northEastAdmin = mapTerritoriosAdmin.unproject(
					[8192, 0],
					mapTerritoriosAdmin.getMaxZoom()
				);

				var boundsAdmin = L.latLngBounds(southWestAdmin, northEastAdmin);
				mapTerritoriosAdmin.setMaxBounds(boundsAdmin);
				// addTerritorio(1500,300, 350, "Territorio test", 150, "#ff0000")
			}, 501);
		}
		// loadGangInfo()
	}, 250);
	clearTerritoriesAdmin();
}

function cargarMapaCentral() {
	if (!mapCentral) {
		mapCentral = L.map('mapCentral', {
			crs: CUSTOM_CRS,
			minZoom: 1.5,
			maxZoom: 5,
			boxZoom: false,
			maxNativeZoom: 5,
			preferCanvas: true,
			layers: [mapStatic, Icons['Central']],
			center: [0, 300],
			zoom: 1.5,
			zoomControl: false,
			maxBoundsViscosity: 1.0,
			tms: false,
			noWrap: true
		});

		var southWest = mapCentral.unproject([0, 8592], mapCentral.getMaxZoom());
		var northEast = mapCentral.unproject([8192, 0], mapCentral.getMaxZoom());

		var bounds = L.latLngBounds(southWest, northEast);
		mapCentral.setMaxBounds(bounds);

		// addBlipAtCoords(2, 100, 550, "Lorem ipsum dolor sit amet consectetur adipiscing elit quis, parturient ridiculus pulvinar bibendum penatibus ut vestibulum eget interdum, habitant fames primis ad sodales nec dignissim.");
		// setTimeout(() => {
		//     addBlipAtCoords(25, 1500, 150, "Lorem ipsum dolor sit amet consectetur adipiscing elit quis, parturient ridiculus pulvinar bibendum penatibus ut vestibulum eget interdum, habitant fames primis ad sodales nec dignissim.");
		//     CreateBlip(mapCentral, 50, {x:1700, y:800}, "https://i.imgur.com/2TqycK9.png", "Radar de velocidad")
		// },1000)
		mapCentral.invalidateSize();
	}
}

function destruirMapaCentral() {
	clearInterval(intervalAlert);
	mapFunctions.alerts = [];
	if (mapCentral) {
		mapCentral.remove();
		mapCentral = null;
		Blips = {};
		Icons['Central'].clearLayers();
	}
}

function addTerritorio(lat, lng, radius, name, percent, color) {
	territorios.push([
		lat,
		lng,
		radius,
		new L.circle([lat, lng], {
			radius: radius,
			opacity: 0.9,
			color: 'transparent',
			fillColor: color || '#000000',
			fillOpacity: 0.5
		})
			.addTo(Icons['Territories'])
			.on('click', function () {
				$('.gangs .info-mapa').html(`<h3>${name}</h3>`).toggleClass('show');
			})
	]);
}

function addTerritorioAdmin(lat, lng, radius, name, percent, color, gang) {
	territoriosAdmin.push([
		lat,
		lng,
		radius,
		new L.circle([lat, lng], {
			radius: radius,
			opacity: 0.9,
			color: 'transparent',
			fillColor: color || '#000000',
			fillOpacity: 0.5
		})
			.addTo(Icons['TerritoriesAdmin'])
			.on('click', function () {
				$('.admin .info-mapa')
					.html(
						`<h3>${name}</h3><div><span class="badge badge-acent">${gang}</span> </div>`
					)
					.toggleClass('show');
			})
	]);
}

function clearTerritories() {
	for (let v of territorios) mapTerritorios.removeLayer(v[3]);

	territorios = [];
}

function clearTerritoriesAdmin() {
	for (let v of territoriosAdmin) mapTerritoriosAdmin.removeLayer(v[3]);

	territoriosAdmin = [];
}

function addBlipAtCoords(id, lat, lng, title, street, time, index) {
	central.push([
		id,
		new L.marker([lat, lng], {
			icon: L.icon({
				iconUrl: './img/webp/alert2.webp',
				className: 'alert-blip',
				iconSize: [32, 32], // size of the icon
				iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
				popupAnchor: [8, -16] // point from which the popup should open relative to the iconAnchor
			})
		})
			.addTo(Icons['Central'])
			.on('click', function () {
				$(
					".police .tab .central .tabla-dispatch tbody tr[index='" +
						index +
						"']"
				).removeClass('new-alert');
				const alert = centralFunctions.alerts[index];
				centralFunctions.setAlertShowing(alert, index);
				mapFunctions.setAlertFocus(id);

				if ($('.police .central .info-mapa').hasClass('show')) {
					$('.police .central .info-mapa').toggleClass('show');
					setTimeout(() => {
						mapFunctions.showCentralAlert(title, street, time, id);
					}, 300);
				} else {
					mapFunctions.showCentralAlert(title, street, time, id);
				}
			})
	]);
	mapCentral.setView([lat, lng]);
}

function CreateBlip(map, blipid, coords, blip, name) {
	if (map) {
		//COMRPUEBA SI EL BLIP EXISTE Y SI EXISTE, LLAMA A LA FUNCIÓN PARA ACTUALIZARLO
		if (Blips[blipid]) {
			mapFunctions.updateBlip(blipid, coords, blip, name);
			return;
		}

		icondata = L.icon({
			iconUrl: blip,
			iconSize: [20, 20], // size of the icon
			iconAnchor: [0, 20], // point of the icon which will correspond to marker's location
			popupAnchor: [9, -16] // point from which the popup should open relative to the iconAnchor
		});

		Blips[blipid] = L.marker([coords.y, coords.x], { icon: icondata })
			.addTo(map)
			.bindPopup('<b>' + name + '</b>');
	}
}

function CreateBlipNPC(map, blipid, coords, blip, name) {
	if (map) {
		//COMRPUEBA SI EL BLIP EXISTE Y SI EXISTE, LLAMA A LA FUNCIÓN PARA ACTUALIZARLO
		if (BlipsAdmin[blipid]) {
			mapFunctions.updateBlip(blipid, coords, blip, name);
			return;
		}

		icondata = L.icon({
			iconUrl: blip,
			iconSize: [20, 20], // size of the icon
			iconAnchor: [0, 20], // point of the icon which will correspond to marker's location
			popupAnchor: [9, -16] // point from which the popup should open relative to the iconAnchor
		});

		BlipsAdmin[blipid] = L.marker([coords.y, coords.x], { icon: icondata })
			.addTo(map)
			.bindPopup('<b>' + name + '</b>');
	}
}

function CreateBlipMarker(map, blipid, coords, blip, name) {
	if (map) {
		//COMRPUEBA SI EL BLIP EXISTE Y SI EXISTE, LLAMA A LA FUNCIÓN PARA ACTUALIZARLO
		if (BlipsAdmin[blipid]) {
			mapFunctions.updateBlip(blipid, coords, blip, name);
			return;
		}

		icondata = L.icon({
			iconUrl: blip,
			iconSize: [20, 20], // size of the icon
			iconAnchor: [0, 20], // point of the icon which will correspond to marker's location
			popupAnchor: [9, -16] // point from which the popup should open relative to the iconAnchor
		});

		BlipsAdmin[blipid] = L.marker([coords.y, coords.x], { icon: icondata })
			.addTo(map)
			.bindPopup('<b>' + name + '</b>');
	}
}

function CreateReferenceBlip(map, blipid, coords, blip, name, color) {
	if (map) {
		//COMRPUEBA SI EL BLIP EXISTE Y SI EXISTE, LLAMA A LA FUNCIÓN PARA ACTUALIZARLO
		if (Blips[blipid]) {
			mapFunctions.updateBlipRef(blipid, coords, blip, name, color);
			return;
		}

		// if (!icondata) {
		icondata = L.divIcon({
			iconSize: [20, 20], // size of the icon
			iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
			popupAnchor: [5, -5], // point from which the popup should open relative to the iconAnchor
			html: `<div class="reference-blip" style="background-color: ${color}"><img src="${blip}"></div>`
		});
		// } else {
		//     icondata.iconUrl = icondata.iconUrl || 'https://i.imgur.com/lIqc9eG.png';
		//     icondata.iconSize = icondata.iconSize || [40, 40];
		//     icondata.iconAnchor = icondata.iconAnchor || [22, 94];
		//     icondata.popupAnchor = icondata.popupAnchor || [-3, -76];
		//     icondata = L.icon(icondata);
		// }

		Blips[blipid] = L.marker([coords.y + 5, coords.x + 5], { icon: icondata })
			.addTo(map)
			.bindPopup('<b>' + name + '</b>');
	}
}

const mapFunctions = {
	policeSources: [],
	showCentralAlert: (title, street, time, id) => {
		$('.police .central .info-mapa .info-data .info-title').html(title);
		$('.police .central .info-mapa .info-data .id-label .label').html(id);

		$('.police .central .info-mapa .info-data .location-label .location').html(
			street
		);
		// $(".police .central .info-mapa .info-data .time-label .time").html(time)
		$('.police .central .info-mapa').toggleClass('show');
		// $(".police .central .info-mapa").html(`<h3>${title}</h3> <div>${message}</div>`).toggleClass("show");
	},
	setBlipFocus: (blipid) => {
		if (Blips[blipid]) {
			Blips[blipid].openPopup();
			// mapCentral.setView(Blips[blipid].getLatLng());
			// mapCentral.setZoom(5);

			mapCentral.setView(Blips[blipid].getLatLng(), 5);
		}
	},

	setAlertFocus: (alertid) => {
		central.map((alert) => {
			if (alert[0] == parseInt(alertid)) {
				// mapCentral.panTo(alert[1].getLatLng(), { animate: true });
				// mapCentral.setZoom(5);
				mapCentral.setView(alert[1].getLatLng(), 5);
			}
		});
	},

	setTerritorioFocus: (alertid, name) => {
		mapTerritorios.setView(
			{ lat: territorios[alertid][0], lng: territorios[alertid][1] },
			5
		);
		if ($('.gangs .info-mapa').hasClass('show')) {
			$('.gangs .info-mapa').removeClass('show');
			setTimeout(() => {
				$('.gangs .info-mapa').html(`<h3>${name}</h3>`).addClass('show');
			}, 500);
		} else {
			$('.gangs .info-mapa').html(`<h3>${name}</h3>`).toggleClass('show');
		}
	},

	destroyBlip: (blipid) => {
		if (Blips[blipid]) {
			mapCentral.removeLayer(Blips[blipid]);
			delete Blips[blipid];
		}
	},

	destroyBlipsAdmin: () => {
		if (Blips[blipid]) {
			mapCentral.removeLayer(Blips[blipid]);
			delete Blips[blipid];
		}

		if (mapTerritoriosAdmin) {
			BlipsAdmin.map((blip) => {
				mapTerritoriosAdmin.removeLayer(blip);
				delete blip;
			});
			// mapTerritorios.eachLayer(function (layer) {});
		}
	},

	updateBlip: (blipid, coords, blip, name) => {
		if (Blips[blipid]) {
			Blips[blipid].setLatLng([coords.y, coords.x]);
			Blips[blipid].setIcon(
				L.icon({
					iconUrl: blip,
					iconSize: [20, 20], // size of the icon
					iconAnchor: [0, 20], // point of the icon which will correspond to marker's location
					popupAnchor: [9, -16] // point from which the popup should open relative to the iconAnchor
				})
			);
			Blips[blipid].bindPopup('<b>' + name + '</b>');
		}
	},
	updateBlipRef: (blipid, coords, blip, name, color) => {
		if (Blips[blipid]) {
			Blips[blipid].setLatLng([coords.y + 5, coords.x - 5]);
			Blips[blipid].setIcon(
				L.divIcon({
					iconSize: [20, 20], // size of the icon
					iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
					popupAnchor: [5, -5], // point from which the popup should open relative to the iconAnchor
					html: `<div class="reference-blip" style="background-color: ${color}"><img src="${blip}"></div>`
				})
			);
			Blips[blipid].bindPopup('<b>' + name + '</b>');
		}
	},
	checkPoliceSources: (data) => {
		//comprueba si data existe. Si existe, comprueba si data y policeSources son iguales. Si algún elemento no coincide

		if (data) {
			mapFunctions.policeSources.forEach((element) => {
				if (!data.includes(element)) {
					mapFunctions.destroyBlip(element);
				}
			});
			mapFunctions.policeSources = data;
		}
	},

	CreateCircle: (map, id, coords, radius, color1, color2, type) => {
		if (map) {
			//COMRPUEBA SI EL BLIP EXISTE  Y SI EXISTE, LLAMA A LA FUNCIÓN PARA ACTUALIZARLO
			if (Circles[id]) {
				// mapFunctions.updateCircle(id, coords, radius, color1, color2, type);
				mapFunctions.destroyCircle(id);
				// return;
			}
			let circle = new L.circle([coords.y, coords.x], {
				radius: radius,
				opacity: 0.9,
				color: color1,
				fillColor: color2,
				fillOpacity: 0.5
			})
				.addTo(map)
				.bindPopup('<b>' + type + '</b>');

			//AÑADE EL CIRCULO A CIRCLES
			Circles[id] = circle;
		}
	},

	updateCircle: (id, coords, radius, color1, color2, type) => {
		if (Circles[id]) {
			Circles[id].setLatLng([coords.y, coords.x]);
			Circles[id].setRadius(radius);
			Circles[id].setStyle({ color: color1, fillColor: color2 });
			Circles[id].bindPopup('<b>' + type + '</b>');
		}
	},

	destroyCircle: (id) => {
		if (Circles[id]) {
			mapCentral.removeLayer(Circles[id]);
			delete Circles[id];
		}
	},

	destroyAlertBlip: (id) => {
		central.map((alert, i) => {
			if (alert[0] == id) {
				mapCentral.removeLayer(alert[1]);
				delete central[i];
				if (centralFunctions.alerts.length == 0) {
					$('.police .tab .central .tabla-dispatch tbody').html(`
                    <tr>
                        <td colspan="5" class="text-muted text-center no-alerts">No se han recibido avisos.</td>
                    </tr>
                    `);
				}
			}
		});
	}
};

$(document).on('click', '.police .tab .central .info-mapa .close-button', function () {
	$('.police .central .info-mapa').toggleClass('show');
});
