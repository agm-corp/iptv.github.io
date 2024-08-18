const s_unlock = new Audio('https://origennetwork.com/music/v7/unlock.mp3');
const s_click = new Audio('https://origennetwork.com/music/v7/click.mp3?2');
const s_over = new Audio('https://origennetwork.com/music/v7/over.wav?2');
const s_transition = new Audio('https://origennetwork.com/music/v7/transition.ogg');
const s_transition2 = new Audio('https://origennetwork.com/music/v7/transition2.wav');
const s_talkoff = new Audio('https://origennetwork.com/music/v7/walkieoff.mp3?a');
const s_talkon = new Audio('https://origennetwork.com/music/v7/walkieon.mp3?b');
const s_success = new Audio('https://origennetwork.com/music/v7/confirm.mp3');

s_click.volume = 0.1;
s_over.volume = 0.1;
s_transition.volume = 0.2;
s_transition2.volume = 0.1;
s_talkoff.volume = 0.3;
s_talkon.volume = 0.5;
s_success.volume = 0.2;

s_unlock.volume = 1;

let appFucntions;

//POLICE VARS
let onDuty = true;
let policeTabSelected;
let defaultImage = 'https://origennetwork.com/images/Servidores/Personajedefault.png';

const dataTableLanguage = {
	sProcessing: 'Procesando...',
	sLengthMenu: 'Mostrar 20 registros',
	sZeroRecords: 'No se encontraron resultados',
	sEmptyTable: 'Ningún dato disponible en esta tabla',
	sInfo: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
	sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
	sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
	sInfoPostFix: '',
	sSearch: 'Buscar:',
	sUrl: '',
	sInfoThousands: ',',
	sLoadingRecords: 'Cargando...',
	oPaginate: {
		sFirst: 'Primero',
		sLast: 'Último',
		sNext: 'Siguiente',
		sPrevious: 'Anterior'
	},
	oAria: {
		sSortAscending: ': Activar para ordenar la columna de manera ascendente',
		sSortDescending: ': Activar para ordenar la columna de manera descendente'
	}
};

$(document).ready(() => {
	loadEvents();
});

//SONIDOS

$(document).on(
	'mouseenter',
	'.btn-sound, .mercado-item, .swiper-button-next, .swiper-button-prev, .missions-button, .list-item, .spawn, .btn-aparecer, .radio-button, .duty-button, .tabs-list .tab, .back-home, .btn-cancel, .btn-modal, .item-flex-box, .button-settings, .btn-comprar-carrito, .delete-item, .back-section, .secondary-box, .zona-apertura, .app-box, .btn-action, .btn-card-home, .btn-search, .white-block, .btn',
	function () {
		s_over.currentTime = '0';
		s_over.play();
	}
);

$(document).on(
	'click',
	'.btn-sound, .mercado-item, .swiper-button-next, .swiper-button-prev, .missions-button, .list-item, .spawn, .btn-aparecer, .radio-button, .duty-button, .tabs-list .tab, .back-home, .btn-cancel, .btn-modal, .item-flex-box, .button-settings, .btn-comprar-carrito, .delete-item, .back-section, .secondary-box, .app-box, .btn-action, .btn-card-home, .btn-search, .white-block, .btn',
	function () {
		s_click.currentTime = '0';
		s_click.play();
	}
);

//SONIDOS


$(document).on('click', '.app-button.accesible', function () {
	const appName = $(this).attr('app');
	var open = true
	if (appName == 'police') {
		open = false
		$.post('https://origen_menu/openopcion', JSON.stringify({ opction: appName }));
		closeMenu();

	}
	if (appName == 'gangs') {
		open = false
		$.post('https://origen_menu/openopcion', JSON.stringify({ opction: appName }));
		closeMenu();
	}
	if (appName == 'local') {
		open = false
		$.post('https://origen_menu/openopcion', JSON.stringify({ opction: appName }));
		closeMenu();
	}
	if (appName == 'crews') {
		open = false
		$.post('https://origen_menu/openopcion', JSON.stringify({ opction: appName }));
		closeMenu();
	}



	if (open) {
		$.get('./apps/' + appName + '.html', function (data) {
			if (data) {
				$('.home')
					.removeClass('scale-in')
					.addClass('scale-out')
					.fadeOut(500, function () {
						if ($('.app.' + appName).length == 0) {
							$('.apps')
								.html(data)
								.removeClass('scale-out')
								.addClass('scale-in')
								.fadeIn(500);
							s_transition2.currentTime = '0';
							s_transition2.play();
							$('.apps').prepend(
								`<div class="back-home"><i class="fas fa-home"></i></div>`
							);
							$('.back-home')
								.off('click')
								.on('click', function () {
									checkMenuData();
									$('.apps')
										.removeClass('scale-in')
										.addClass('scale-out')
										.fadeOut(500, function () {
											$('.apps .app.' + appName).hide();
											$('.home')
												.removeClass('scale-out')
												.addClass('scale-in')
												.fadeIn(500);
											appFunctions = null;
										});
								});
						} else {
							$('.apps .app.' + appName).show();
							s_transition2.currentTime = '0';
							s_transition2.play();
							$('.apps')
								.removeClass('scale-out')
								.addClass('scale-in')
								.fadeIn(500);
						}
					});

			}
		});
	}
});

function loadEvents() { }

$(document).on('click', '#btn-eventos', function () {
	$('.friends.actividades').addClass('show').fadeIn(500);
	$('.friends.actividades .friends-bg')
		.off('click')
		.on('click', function () {
			$('.friends.actividades').removeClass('show');
		});
});

$(document).on('click', '#btn-coches', function () {
	$('.friends.vehiculos').addClass('show').fadeIn(500);
	$('.friends.vehiculos .friends-bg')
		.off('click')
		.on('click', function () {
			$('.friends.vehiculos').removeClass('show');
		});
});

function navigate(from, to) {
	$(from)
		.removeClass('scale-in')
		.addClass('scale-out')
		.fadeOut(300, function () {
			$(to).removeClass('scale-out').addClass('scale-in').fadeIn(300);
		});
}

window.addEventListener('message', function (event) {
	console.log(JSON.stringify(event.data))
	if (event.data.open) {
		$('.screen').addClass('show');
		s_transition.currentTime = '0';
		s_transition.play();
		eventKeydown();
		checkMenuData()
	}

	if (event.data.radio) {
		radioFunctions.radioNetEvents(event.data);
	}
});

function eventKeydown() {
	checkMenuData();

	$(document).keydown(function (event) {
		var keycode = event.keyCode ? event.keyCode : event.which;

		if (keycode == '118' || keycode == '27') {
			closeMenu();
		}

		if (keycode == 35) {
			if ($('.home').css('display') == 'block') {
				TriggerCallback('origen_menu:server:GetPermission', {}).done((cb) => {
					if (cb && cb != 'user') {
						openAdmin();
					}
				});
			}
		}
	});
}

function fetch(event, data) {
	return $.post('https://origen_menu/' + event, JSON.stringify(data)).promise();
}

function exportEvent(script, event, data) {
	return $.post('https://' + script + '/' + event, JSON.stringify(data)).promise();
}

function TriggerCallback(event, data) {
	data.name = event;
	return $.post('https://origen_menu/TriggerCallback', JSON.stringify(data)).promise();
}

function timeStampToDate(timeStamp) {
	let date = new Date(timeStamp);
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let hour = date.getHours();
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	return { date: `${day}/${month}/${year}`, time: `${hour}:${minutes}` };
}

function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

/*MODAL*/
function OpenModal(title, content, footerButtons, closeText, width) {
	$('.screen').append(`
    <div class="c-modal fadeIn">
       <div class="modal-block">
            <div class="modal-content scale-in-2" style="width: ${width ? width + 'vh' : 'max-content'
		}">
                <div class="modal-header">

                    <h2 class="title">${title}</h2>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    ${footerButtons}
                    <button class="btn-cancel" onclick='CloseModal()'>${closeText}</button>
                </div>
            </div>
        </div>
    </div>
    `);
}

function CloseModal() {
	$('.c-modal .modal-block .modal-content')
		.removeClass('scale-in-2')
		.addClass('scale-out-2');
	$('.c-modal')
		.removeClass('fadeIn')
		.fadeOut(500, function () {
			$(this).remove();
		});
}

/*MODAL*/

//ESTA FUNCIÓN RECIBE UN STRING Y DEVUELVE EL STRING EN MINUSCULAS, SUSTITUYENDO ESPACIOS Y CARACTERES RAROS POR GUIONES O LETRAS NORMALES
function stringToUrl(string) {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/á/g, 'a')
		.replace(/é/g, 'e')
		.replace(/í/g, 'i')
		.replace(/ó/g, 'o')
		.replace(/ú/g, 'u')
		.replace(/ñ/g, 'n')
		.replace(/ü/g, 'u');
}

function secondsOrMinutes(seconds) {
	seconds = seconds / 1000;
	if (seconds < 60) {
		return seconds + ' segundos';
	} else {
		return Math.floor(seconds / 60) + ' minutos';
	}
}

function checkNumber(number) {
	if (number < 10) {
		return '000' + number;
	} else if (number < 100) {
		return '00' + number;
	} else if (number < 1000) {
		return '0' + number;
	} else {
		return number;
	}
}

function nameToId(name) {
	return name
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/á/g, 'a')
		.replace(/é/g, 'e')
		.replace(/í/g, 'i')
		.replace(/ó/g, 'o')
		.replace(/ú/g, 'u')
		.replace(/ñ/g, 'n')
		.replace(/ü/g, 'u')
		.replace(/[^a-z0-9-]/g, '');
}

function closeMenu() {
	$.post('https://origen_menu/close', JSON.stringify({}));
	$('.screen').removeClass('show');
	$('.home').off('keydown');
	setTimeout(() => {
		$('.lista-comercios').css('opacity', 0);
	}, 100);
}

function sendNotification(type, title, message) {
	//CREA UNA NOTIFICACIÓN INDEPENDIENTE Y LA AÑADE EN LA CLASE .notifications. DESPUÉS CREA UN TIMEOUT INDEPENDIENTE ASOCIADO A LA NOTIFICACIÓN PARA CONTROLAR SU CIERRE
	let id = Math.floor(Math.random() * 10000);
	let icon = 'fas fa-bell';
	if (type == 'success') {
		icon = 'fas fa-check';
	} else if (type == 'error') {
		icon = 'fas fa-times';
	}
	$('.notifications').append(`
        <div class="notification animate__fast animate__animated animate__bounceInDown ${type}" id="${id}">
                    <div class="icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="info">
                        <div class="name">${title}</div>
                        <div class="message">${message || ''}</div>
                    </div>
                </div>
    `);
	setTimeout(function () {
		$(`#${id}`)
			.removeClass('animate__bounceInDown')
			.addClass('animate__bounceOutUp')
			.fadeOut(500, function () {
				$(this).remove();
			});
	}, 3000);
}

function checkMenuData() {
	if ($('.home.app').css('display') == 'block') {
		fetch('LoadHomePage', {}).then((cb) => {
			console.log(JSON.stringify(cb.charinfo.crypto))
			let skills = {};
			// if (cb.charinfo.skills) {
			// 	skills = JSON.parse(cb.charinfo.skills);
			// }

			$('.home .player-name').text(cb.charinfo.name);
			$('.home .player-job').text(cb.charinfo.job);
			$('.home .user-avatar').css(
				'background-image',
				'url(' +
				(cb.charinfo.image ? cb.charinfo.image : './img/default.jpg') +
				')'
			);
			// $(".home .player-cash")-text(cb.money+" $");
			$('.home .player-bank').text(cb.charinfo.bank + ' $');
			$('.home .crypto').text(cb.charinfo.crypto);
			$('.home .exp').text(cb.charinfo.exp);

			if (Object.keys(skills).length > 0) {
				$('.home .player-stat .resistance').text(
					parseInt(skills.Resistance.Current) || '0'
				);
				$('.home .player-stat .strength').text(
					parseInt(skills.Strength.Current) || '0'
				);
				$('.home .player-stat .diving').text(
					parseInt(skills.Diving.Current) || '0'
				);
				$('.home .player-stat .shooting').text(
					parseInt(skills.Shooting.Current) || '0'
				);
				$('.home .player-stat .driving').text(
					parseInt(skills.Driving.Current) || '0'
				);
			}

			$('.home .player-stat .experience').text(cb.experience);

			if (cb.permission.gang) {
				$(".app-button[app='gangs']").attr('access', cb.permission.gang);
				$(".app-button[app='gangs']").removeClass('bloqueada');
				$(".app-button[app='gangs']").addClass('accesible');
			} else {
				$(".app-button[app='gangs']").attr('access', '');
				$(".app-button[app='gangs']").removeClass('accesible');
				$(".app-button[app='gangs']").addClass('bloqueada');
			}

			if (cb.permission.business) {
				$(".app-button[app='local']").attr('access', cb.permission.business);
				$(".app-button[app='local']")
					.removeClass('bloqueada')
					.addClass('accesible');
			} else {
				$(".app-button[app='local']").attr('access', '');
				$(".app-button[app='local']").removeClass('accesible');
				$(".app-button[app='local']").addClass('bloqueada');
			}
			if (cb.permission.crew) {
				$(".app-button[app='crews']").attr('access', cb.permission.crew);
				$(".app-button[app='crews']").removeClass('bloqueada');
				$(".app-button[app='crews']").addClass('accesible');
			} else {
				$(".app-button[app='crews']").attr('access', '');
				$(".app-button[app='crews']").removeClass('accesible');
				$(".app-button[app='crews']").addClass('bloqueada');
			}

			if (cb.permission.police) {
				$(".app-button[app='police']").removeClass('bloqueada');
				$(".app-button[app='police']").addClass('accesible');
			} else {
				$(".app-button[app='police']").removeClass('accesible');
				$(".app-button[app='police']").addClass('bloqueada');
			}
			if (cb.charinfo.bills && cb.charinfo.bills.length > 0) {
				$('.home .lista-facturas').html('');
				cb.charinfo.bills.map((bill) => {
					$('.home .lista-facturas').append(`
                    <div class="factura">
					<img src="./img/bill.png" class="img-fluid">
                        <div class="info-factura">
                            <h4>${bill.title}</h4>
                            <p>${timeStampToDate(bill.date).date}</p>
                        </div>
                        <div class="precio-factura text-center">
                            <h4 class="text-success">${bill.price}$</h4>
                        </div>
                        <button class="btn btn-action p-1 pagar-factura" billid="${bill.id
						}" price="${bill.price}" job="${bill.job}">PAGAR</button>
                    </div>
                    `);
				});
			} else {
				$('.home .lista-facturas').html(
					`<div class="w-100 p-1 text-muted text-center">NO HAY FACTURAS PENDIENTES</div>`
				);
			}

			if (cb.charinfo.vehicles && cb.charinfo.vehicles.length > 0) {
				$('.vehiculos .lista-vehiculos').html('');
				cb.charinfo.vehicles.map((vehicle) => {
					$('.vehiculos .lista-vehiculos').append(`
                    <div class="factura">
					<i class="fa-solid fa-car display-6"></i>
                        <div class="w-100">
                            <h4>${vehicle.label}</h4>
                            <p>${vehicle.plate}</p>
                        </div>

                    </div>
                    `);
				});
			} else {
				$('.vehiculos .lista-vehiculos').html(
					`<div class="w-100 p-1 text-muted text-center">NO HAS ADQUIRIDO NINGÚN VEHÍCULO</div>`
				);
			}
			if (cb.charinfo.eventos.length > 0) {
				$(".friend-list").html('');
				cb.charinfo.eventos.map((data) => {
					$(".friend-list").append(`
					<div class="factura">
                            <div style="max-width:10vh;margin-right:1vh;">
                                <img src="${data.img}">
                            </div>
							<div class="w-100">
                                <h4>${data.title}</h4>
                                <p>${data.description}</p>
                            </div>
                         </div>
                    `);
				});
			} else {
				$(".friend-list").html('');

				$(".friend-list").append(`
                <div class="evento">No hay eventos disponibles.</div>
                `);
			}
			if (cb.charinfo.properties && cb.charinfo.properties.length > 0) {
				$('.vehiculos .lista-propiedades').html('');
				cb.charinfo.properties.map((data) => {
					$('.vehiculos .lista-propiedades').append(`
                    <div class="factura">
					<i class="fa-solid fa-house display-6"></i>

                        <div class="w-100">
                            <h4 style="margin-bottom:.5vh;">${data.label}</h4>
                        </div>

                    </div>
                    `);
				});
			} else {
				$('.vehiculos .lista-propiedades').html(
					`<div class="w-100 p-1 text-muted text-center">NO HAS ADQUIRIDO NINGUNA PROPIEDAD</div>`
				);
			}
			fetch('LoadBusinessActivities', {}).then((cb) => {
				if (cb && cb.length) {
					loadAperturas(cb);
				}
			});
		});
	}
}

function unlockItem(title, image, size) {
	$('.unlock .title').text(title);
	image ? $('.unlock img').attr('src', image) : null;
	size ? $('.unlock img').css('width', size) : null;
	s_unlock.currentTime = '0';
	s_unlock.play();
	$('.unlock').fadeIn(300);
}

$(document).on('click', '.confirm-item', function () {
	$('.unlock').fadeOut(300);
});

//EVENTOS TOP MENU
$(document).on('click', '.top-menu', function () {
	const action = $(this).attr('action');
	switch (action) {
		case 'slot':
			$.post(
				'https://origen_menu/Slot',
				JSON.stringify({ menu: 'MENU_VERSION_SP_PAUSE' })
			);
			closeMenu();
			break;

		case 'map':
			$.post(
				'https://origen_menu/showGameMenu',
				JSON.stringify({ menu: 'FE_MENU_VERSION_SP_PAUSE' })
			);
			closeMenu();
			break;

		case 'settings':
			$.post(
				'https://origen_menu/showGameMenu',
				JSON.stringify({ menu: 'FE_MENU_VERSION_LANDING_MENU' })
			);
			closeMenu();

			break;

		case 'reports':
			//
			$('.screen').removeClass('show');
			setTimeout(() => {
				openReports();
			}, 500);

			break;
	}
});

function openReports() {
	$('.report-button').removeClass('active').show();
	$('.report-container').fadeIn(300);
	s_transition.currentTime = '0';
	s_transition.play();
}

$(document).on('click', '.volver-reports', function () {
	$('.report-container').fadeOut(300, function () {
		$('.screen').addClass('show');
	});
	s_click.currentTime = '0';
	s_click.play();
});

$(document).on('click', '.report-container .report-button', function () {
	const type = $(this).attr('accion');
	const label =
		type == 'asistencia'
			? 'Indícanos que tipo de asistencia necesitas'
			: 'Realiza un reporte a la administración';
	$('.zona-input h2').text(label);
	$('.zona-input textarea').val('');
	$('.zona-input .enviar-accion').attr('accion', type);
	$(this).addClass('active');
	$('.report-buttons').fadeOut(300, function () {
		$('.report-container .zona-input').fadeIn(300);
	});
	// setTimeout(()=>{
	//     $(".report-button").fadeOut(500, function(){
	//         $(".report-button.active").removeClass("active");
	//     });
	// }, 500);
	s_click.currentTime = '0';
	s_click.play();
});

$(document).on('click', '.report-container .report-button', function () {
	$(this).addClass('active');
	$('.report-buttons').fadeOut(300, function () {
		$('.report-container .zona-input').fadeIn(300, function () {
			$('.report-button.active').removeClass('active');
		});
	});
	// setTimeout(()=>{
	//     $(".report-button").fadeOut(500, function(){
	//         $(".report-button.active").removeClass("active");
	//     });
	// }, 500);
	s_click.currentTime = '0';
	s_click.play();
});

$(document).on('click', '.report-container .zona-input .enviar-accion', function () {
	const type = $(this).attr('accion');
	const text = $('.report-container .zona-input textarea').val();

	if (text.length > 5) {
		fetch('ExecuteCommand', {
			command: 'report ' + type + ': ' + text
		});
		$.post('https://vms_reports/submitReport', JSON.stringify({
			title: "REPORTE",
			type: type,
			description: text,
			screenshot: screenshotLink
		}));
		$('.report-container').fadeOut(300, function () {
			$('.screen').addClass('show');
			s_transition.currentTime = '0';
			s_transition.play();
			$('.zona-input').hide();
			$('.report-container .report-buttons').show();
		});
	}
	// setTimeout(()=>{
	//     $(".report-button").fadeOut(500, function(){
	//         $(".report-button.active").removeClass("active");
	//     });
	// }, 500);
	s_click.currentTime = '0';
	s_click.play();
});

$(document).on('click', '.report-container .zona-input .volver-inputs', function () {
	$('.zona-input').fadeOut(300, function () {
		$('.report-container .report-buttons').fadeIn(300);
	});

	// setTimeout(()=>{
	//     $(".report-button").fadeOut(500, function(){
	//         $(".report-button.active").removeClass("active");
	//     });
	// }, 500);
	s_click.currentTime = '0';
	s_click.play();
});

$(document).on('click', '.pagar-factura', function () {
	console.log('PAGAR FACTURA');
	const price = $(this).attr('price');
	const billid = $(this).attr('billid');
	const business = $(this).attr('job');
	const yo = $(this);

	$.post('https://origen_menu/PayBill', JSON.stringify({
		id: billid,
		price: price,
		job: business
	})).then(
		(cb) => {
			if (cb && cb == true) {
				console.log('FACTURA PAGADA');
				yo.parent().addClass(
					'animate__animated animate__fadeOutLeft animate__faster'
				);
				setTimeout(() => {
					yo.parent().remove();
					sendNotification('success', 'Factura pagada correctamente');
				}, 500);
			} else {
				sendNotification(
					'error',
					'No tienes suficiente dinero para pagar esta factura'
				);
			}
		}
	);
});

function openAdmin() {
	$('.home')
		.removeClass('scale-in')
		.addClass('scale-out')
		.fadeOut(500, function () {
			const appName = 'admin';
			$.get('./apps/' + appName + '.html', function (data) {
				if (data) {
					$('.home')
						.removeClass('scale-in')
						.addClass('scale-out')
						.fadeOut(500, function () {
							if ($('.app.' + appName).length == 0) {
								$('.apps')
									.html(data)
									.removeClass('scale-out')
									.addClass('scale-in')
									.fadeIn(500);
								$('.apps').prepend(
									`<div class="back-home"><i class="fas fa-home"></i></div>`
								);
								$('.back-home')
									.off('click')
									.on('click', function () {
										checkMenuData();
										$('.apps')
											.removeClass('scale-in')
											.addClass('scale-out')
											.fadeOut(500, function () {
												$('.apps .app.' + appName).hide();
												$('.home')
													.removeClass('scale-out')
													.addClass('scale-in')
													.fadeIn(500);
												appFunctions = null;
											});
									});
							} else {
								$('.apps .app.' + appName).show();
								$('.apps')
									.removeClass('scale-out')
									.addClass('scale-in')
									.fadeIn(500);
							}
						});
				}
			});
		});
}

$(document).on('click', '.haztp', function () {
	const x = parseFloat($(this).attr('x')).toFixed(2);
	const y = parseFloat($(this).attr('y')).toFixed(2);
	const z = parseFloat($(this).attr('z')).toFixed(2);

	closeMenu();

	setTimeout(() => {
		fetch('ExecuteCommand', {
			command: 'tp ' + x + ' ' + y + ' ' + z
		});
	}, 300);
});

function updateAperturas(status, label, id) {
	if (status) {
		$('.sin-comercios').remove();
		$('.lista-comercios').prepend(
			` <div class="factura animate__animated animate__fadeInUp anim_titulo" id="bus-${id}">
			<img src="https://origennetwork.com/images/Servidores/IconoNegocio.png" class="img-fluid">
				<div class="info-factura">
					<h3 class="bankgothic">${label}</h3>

				</div>

				<button class="btn btn-action p-1"><i class="lni lni-map-marker"></i></button>
			</div>`
		);
	} else {
		$('.lista-comercios #bus-' + id)
			.removeClass('animate__fadeInUp')
			.addClass('animate__fadeOutDown')
			.fadeOut(500, function () {
				$(this).remove();
			});
	}
	if ($('.lista-comercios .factura').length == 0) {
		$('.lista-comercios').html(
			`<div class="w-100 p-1 text-muted text-center sin-comercios">NO HAY NINGÚN NEGOCIO DISPONIBLE</div>`
		);
	}
}

const typesLogos = {
	['mechanic']: 'fa-solid fa-wrench',
	['taxi']: 'fas fa-taxi',
	['shop']: 'fas fa-shopping-cart',
}

const callButtons = {
	['mechanic']: true,
	['taxi']: true,
}

function loadAperturas(negocios) {
    $('.lista-comercios').html('').css('opacity', 1);
    let time = 0;

    negocios.sort((a, b) => {
        if (a.state === 1 && b.state === 1) {
            return a.job.localeCompare(b.job);
        } else if (a.state === 1) {
            return -1;
        } else if (b.state === 1) {
            return 1;
        } else {
            return a.job.localeCompare(b.job);
        }
    });

    negocios.map((negocio, index) => {
        const iconClass = typesLogos[negocio.type] || 'fas fa-store';
		const callButton = callButtons[negocio.type] || false;

        if (negocio.state == 1) {
            $('.lista-comercios').append(
                ` <div class="factura animate__animated animate__fadeInUp anim_titulo animate__faster" x="${negocio.coords.x.toFixed(
                    2
                )}" y="${negocio.coords.y.toFixed(
                    2
                )}" id="bus-${index}" style="animation-delay:0.${time}s" jobID="${negocio.id}">
                    <i class="${iconClass}"></i>
                    <div class="info-factura">
                        <h3 class="bankgothic">${negocio.job}</h3>
                    </div>
					${callButton ? `<button class="btn btn-action send-alert p-1"><i class="fas fa-phone"></i></button>` : ''}
                    <button class="btn btn-action set-waypoint p-1"><i class="fas fa-map-marker-alt"></i></button>
                </div>`
            );
        } else {
            $('.lista-comercios').append(
                ` <div class="factura animate__animated animate__fadeInLeft anim_titulo bloqueado" id="bus-${index}" style="animation-delay:0.${time}s">
                    <i class="${iconClass}"></i>
                    <div class="info-factura">
                        <h3 class="bankgothic">${negocio.job}</h3>
                    </div>
                    <button class="btn btn-action p-1"><i class="fas fa-map-marker-alt"></i></button>
                </div>`
            );
        }
        time += 1;
    });
}


$(document).on('click', '.set-waypoint', function () {
	const e = $(this).parent();
	const x = parseFloat(e.attr('x'));
	const y = parseFloat(e.attr('y'));
	sendNotification('success', 'Has marcado la ruta al negocio en tu GPS');
	fetch('SetWaypointinCoords', { x, y });
});

$(document).on('click', '.send-alert', function () { // todo verificar si se envio o no la alerta
	const jobID = $(this).parent().attr('jobID');
	TriggerCallback('origen_masterjob:server:sendAlert', { jobID }).done((cb) => {
		if (cb) {
			sendNotification('success', 'Tu solicitud ha sido enviada');
		} else {
			sendNotification('error', 'No hay ningún empleado disponible');
		}
	});
});