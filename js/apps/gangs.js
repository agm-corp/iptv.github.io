let gangData;
let config;
let actualEvidenceGang;
let gangStats;
let myGangGrade;
let graficaGang;
let gangActivity;
let catLogros = [];
let configArmas = {
	common: {
		label: 'Común',
		bgColor: 'rgb(155, 155, 155)',
		textColor: 'rgb(49, 49, 49)'
	},
	rare: {
		label: 'Raro',
		bgColor: 'rgb(207, 207, 207)',
		textColor: 'black'
	},
	epic: {
		label: 'Épico',
		bgColor: 'rgb(216, 42, 115)',
		textColor: 'white'
	},
	legend: {
		label: 'Legendario',
		bgColor: 'rgb(30, 134, 190)',
		textColor: 'white'
	},
	exotic: {
		label: 'Exótico',
		bgColor: 'rgb(83, 180, 61)',
		textColor: 'white'
	},
	unique: {
		label: 'Único',
		bgColor: 'rgb(15, 194, 253)',
		textColor: 'black'
	},
	inmortal: {
		label: 'Inmortal',
		bgColor: 'rgb(255, 191, 0)',
		textColor: 'black'
	}
};

const permissionsList = `
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Acceso Total</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder y gestionar todas las funciones.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo boss" permiso="boss">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Abrir almacén</div>
        <div class="permiso-description">Permite a los miembros acceder al inventario de la organización.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo inventory" permiso="inventory">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Gestionar miembros y rangos de la organización</div>
        <div class="permiso-description">Permite a los miembros contratar o despedir miembros y asignarle rangos.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo members" permiso="members">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Gestionar los puntos de la organización</div>
        <div class="permiso-description">Permite a los miembros de este rango gestionar y mover los puntos de la organización.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo build" permiso="build">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Acceso al menú rápido de organización</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder al menú rápido de la organización.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo menu" permiso="menu">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Solicitud de robos</div>
        <div class="permiso-description">Permite a los miembros de este rango solicitar robos.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo robs" permiso="robs">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>

<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Control de NPC</div>
        <div class="permiso-description">Permite a los miembros de este rango controlar las acciones de los NPC de la organización.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo npcs" permiso="npcs">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>

<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Solicitud de vehículos</div>
        <div class="permiso-description">Permite a los miembros de este rango solicitar la importación de vehículos para la organización.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo vehicles" permiso="vehicles">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Acceder a la Radio</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder a la radio de la organización.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo radio" permiso="radio">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Acceso al garaje</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder al garaje de la organización.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo garaje" permiso="garaje">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Acceso a la caja fuerte</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder a la caja fuerte y administrar el dinero.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo garaje" permiso="safebox">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
</div>
`;

$(document).on('click', ".app-button[app='gangs']", function () {
	$('.app-container').hide();
	setTimeout(() => {
		gangFunctions.checkFirstTime();
	}, 600);
});

$(document).on('click', '.gangs .back-section', function () {
	gangFunctions.navigate('gang-home');
});
$(document).on('click', '.gangs .navigate', function () {
	gangFunctions.navigate($(this).attr('app'));
});

$(document).on('click', '.gangs .tiendaBanda', function () {
	fetch('openBlackMarket', {}).done((cb) => {});
});

$(document).on('click', '.gangs .btn-gang-cars', function () {
	$(this).parent().toggleClass('show');
});

$(document).on('click', '.gangs .radio-category .toggle-category', function () {
	$(this).parent().toggleClass('toggle');
});

$(document).on('click', '.gangs .gang-creator .continuar', function () {
	let rangos = {};
	let hayJefe = false;

	$('.gangs .rangos-creados .rango').each(function (i, n) {
		const divRangos = $(this);
		const divPermisos = $(
			".gangs .zona-permisos .permisos-tab[rango='" + divRangos.attr('rango') + "']"
		);

		rangos[i.toString()] = {
			label: divRangos.find('.rango-name').text().trim()
		};

		divPermisos.find('.check input').each(function () {
			if ($(this).is(':checked')) {
				rangos[i.toString()][$(this).attr('permiso')] = true;
				if ($(this).attr('permiso') == 'boss') {
					hayJefe = true;
				}
			}
		});

	});
	const gang = {
		label: $('.gangs .gang-creator .input-gang-title').val(),
		color: $('.gangs .gang-creator .gang-color').val(),
		grades: rangos
	};

	if (gang.label.length > 20) {
		sendNotification('error', 'El nombre no puede contener más de 20 caracteres');
		return;
	}
	if (hayJefe) {
		TriggerCallback('origen_ilegal:server:CreateGang', gang).done((cb) => {
			if (cb) {
				gangFunctions.siguientePaso($(this).attr('paso'));
			} else {
				//NOTIFICACIÓN ERROR
				sendNotification(
					'error',
					'Ha ocurrido un error al crear la organización',
					'Consulta con la administración.'
				);
			}
		});
	} else {
		//NOTIFICACIÓN ERROR JEFE
		sendNotification('error', 'Debes elegir al menos un rango con acceso total');
	}
});

$(document).on('click', '.gangs .gang-creator .poner-npc', function () {
	$('.gangs .gang-creator .pasos.dos').fadeOut(300, function () {
		closeMenu();
	});
});

function changeFocus(focus) {
	TriggerCallback('origen_ilegal:server:ChangeFocus', {
		focus
	}).done((cb) => {
		gangFunctions.loadGang().then(() => {
			gangFunctions.navigate('gang-home');
			$(".app-button[app='gangs']").attr('access', 'mygang');
		});
	});
}

$(document).on('click', '.gangs .gang-creator .ir-finalizar', function () {
	const focus = $('.mercado-item.selected').attr('lab');
	changeFocus(focus) 
});	

$(document).on('click', '.gangs .gang-settings .tab-navigate', function () {
	if ($(this).attr('tab') == 'rangos' && !canAccessGang('miembros')) {
		return;
	}
	if (!$(this).hasClass('active')) {
		$('.gangs .gang-settings .tab-navigate').removeClass('active');
		$(this).addClass('active');
		let that = $(this);

		if ($(this).attr('tab') == 'rangos') {
			gangFunctions.updateGrades();
		} else {
			gangFunctions.updateTerritories();
		}
		$('.gangs .gang-settings .setting-tabs .tab.active')
			.removeClass('active')
			.removeClass('scale-in')
			.addClass('scale-out')
			.fadeOut(300, function () {
				const tab = that.attr('tab');
				$('.gangs .gang-settings .setting-tabs .tab.' + tab)
					.removeClass('scale-out')
					.addClass('scale-in')
					.addClass('active')
					.fadeIn(300);
			});
	}
});

$(document).on('change', '.gangs .gang-settings .permiso .check-dispo', function () {
	// $(".btn-guardar-rangos").fadeIn(300);
	const grade = $(this).parent().parent().parent().parent().attr('rango');
	const attr = $(this).attr('permiso');
	const value = $(this).is(':checked');

	TriggerCallback('origen_ilegal:server:UpdateGrade', { grade, attr, value }).done(
		(cb) => {
			if (cb) {
				sendNotification('success', 'Se ha actualizado el permiso correctamente');
			} else {
				sendNotification(
					'error',
					'Ha ocurrido un error al actualizar el permiso'
				);
			}
		}
	);
});

$(document).on('click', '.gangs .btn-settings', function () {
	gangFunctions.updateTerritories();
});

$(document).on('click', '.gangs .gang-reports .evidence img', function () {
	const img = $(this).attr('src');

	$('.gangs .informe-view img').attr('src', img);
	$('.gangs .informe-view').fadeIn(300);
});

$(document).on('click', '.gangs .informe-view', function () {
	$(this).fadeOut(300);
});

$(document).on('click', '.gangs #documentos', function () {
	TriggerCallback('origen_ilegal:server:GetGangDocuments', {}).done((cb) => {
		if (cb) {
			if (cb.length > 0) {
				$('.gang-reports .report-list').html('');
				cb?.map((doc) => {
					let date = timeStampToDate(doc.date);

					$('.gang-reports .report-list').append(`
                        <div class="white-block report scale-in" id="report-${
							doc.id
						}"  onclick="gangFunctions.loadInforme(${doc.id})">
                            <i class="fas fa-sticky-note" aria-hidden="true"></i>
                        <div class="report-name">
                            ${doc.title}
                        </div>
                        <div class="d-flex w-100">
                                <div class="w-50">
                                    <div class="report-owner">
                                        <i class="fas fa-user" aria-hidden="true"></i>
                                        <span>${doc.author}</span>
                                    </div>
                                </div>
                                <div class="w-50">
                                    <div class="report-date">
                                        <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                                        <span>${date.date + ' - ' + date.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
				});
			}
		} else {
			sendNotification('error', 'Ha ocurrido un error al obtener los documentos');
		}
	});
});

$(document).on('click', '.gangs .gang-reports .pin-button', function () {
	const noteId = $(this).parent().attr('note-id');
	const note = $(this).parent();
	let value = 1;
	if (note.hasClass('pinned')) {
		value = 0;
	}
	TriggerCallback('origen_ilegal:server:UpdateGangNote', {
		noteid: noteId,
		key: 'fixed',
		value
	}).done((cb) => {
		if (cb) {
			if (value) {
				note.addClass('scale-out').fadeOut(300, function () {
					let nota = $(this);
					$(this).remove();
					nota.removeClass('scale-out')
						.addClass('scale-in')
						.addClass('pinned')
						.show();
					$('.gangs .gang-reports .notes-list-pinned').prepend(nota);
				});
			} else {
				note.addClass('scale-out').fadeOut(300, function () {
					let nota = $(this);
					$(this).remove();
					nota.removeClass('scale-out')
						.removeClass('pinned')
						.addClass('scale-in')
						.show();
					$('.gangs .gang-reports .notes-list').prepend(nota);
				});
			}
		}
	});
});

$(document).on('click', '.gangs .gang-reports .ficha ul .delete-button', function () {
	const noteId = $(this).parent().attr('note-id');
	const note = $(this).parent();

	TriggerCallback('origen_ilegal:server:DeleteGangNote', {
		id: noteId
	}).done((cb) => {
		if (cb) {
			note.addClass('scale-out').fadeOut(300, function () {
				$(this).remove();
			});
		}
	});
});

$(document).on('focusout', '.gangs .gang-reports .report-title', function () {
	const documentid = parseInt($('.ficha').attr('reportid'));
	const title = $(this).val();

	if (title.length > 3) {
		TriggerCallback('origen_ilegal:server:UpdateGangDocument', {
			documentid,
			key: 'title',
			value: title
		}).done((cb) => {
			if (cb) {
				sendNotification('success', 'Se ha actualizado el titulo correctamente');
				$('.gangs .gang-reports #report-' + documentid + ' .report-name').text(
					title
				);
			} else {
				sendNotification('error', 'Ha ocurrido un error al actualizar el titulo');
			}
		});
	} else {
		sendNotification('error', 'El titulo debe tener al menos 3 caracteres');
	}
});

$(document).on('click', '.c-modal .photo-box', function () {
	const slot = $(this).data('slot');
	const name = $(this).data('name');
	const img = $(this).data('img');
	TriggerCallback('origen_menu:server:RemoveItem', {
		slot,
		name,
		amount: 1
	}).done((cb) => {
		if (cb) {
			$('.gangs .gang-reports .evidences').append(`
                <div class="col-4 pt-2 scale-in">
                    <div class="evidence">
                        <img src="${img}">
                        <button class="btn text-white p-0 mt-2 delete-photo"><i class="lni lni-trash-can"></i></button>
                    </div>
                </div>
            `);
			CloseModal();
			gangDocuments.updatePhotos();
		} else {
			CloseModal();

			sendNotification('error', 'Ha ocurrido un error al añadir la foto');
		}
	});
});

$(document).on('click', '.gangs .gang-reports .evidence .delete-evidence', function () {
	actualEvidenceGang = $(this).parent().parent();
	OpenModal(
		`ATENCIÓN`,
		`<div class="row">
        <div class="col-2">
            <img src="./img/webp/trash.webp" class="img-fluid">
        </div>
        <div class="col-10 d-flex align-items-center">
            <div>
            <h5 class="text-danger fw-bold mb-3">Esta acción eliminará la foto de manera definitiva.</h5>
            <h4>¿Deseas continuar?</h4>
            </div>
        </div>

    </div>`,
		`<button class="btn-modal" onclick="gangDocuments.deleteEvidence()">Confirmar</button>`,
		'Cancelar',
		50
	);
});

let gangFunctions = {
	navigate: function (app) {
		if (canAccessGang(app)) {
			if ($('.app-container.activa').length > 0) {
				$('.app-container.activa').fadeOut(150, function () {
					$(this).removeClass('activa');
					$('.app-container.' + app)
						.fadeIn(300)
						.addClass('activa');
				});
			} else {
				$('.app-container.' + app)
					.fadeIn(300)
					.addClass('activa');
			}

			if (app != 'gang-home') {
				$('.gangs .back-section')
					.removeClass('animate__fadeOutUp')
					.addClass('animate__fadeInDown')
					.fadeIn(300);
			} else {
				$('.gangs .back-section')
					.fadeOut(300)
					.removeClass('animate__fadeInDown')
					.addClass('animate__fadeOutUp');
				// $(".app-container.activa").hide();
				// $(".app-container.gang-home").fadeIn(300).addClass("activa");
			}

			if (app == 'gang-map') {
				cargarMapaTerritorios();
				setTimeout(() => {
					gangFunctions.updateTerritories();
				}, 350);
			}

			if (app == 'gang-activity') {
				loadActivity();
			}

			if (app == 'gang-shop') {
				$('.slider-armas .swiper-wrapper').html('');

				loadShop();
			}

			if (app == 'gang-cameras') {
				loadCameras();
			}
		}
	},

	checkFirstTime: () => {
		if ($(".app-button[app='gangs']").attr('access') == 'create') {
			gangFunctions.resetCreator();
		} else if ($(".app-button[app='gangs']").attr('access') == 'mygang') {
			$('.gangs .gang-creator').hide(300);
			gangFunctions.loadGang().then(() => {
				gangFunctions.navigate('gang-home');
			});
		}
	},

	modalAddRango: (type) => {
		OpenModal(
			'Nuevo rango',
			`
            <label>Nombre del Rango</label>
            <input maxlength="25" type="text" class="form-control input-rango-name" placeholder="Introduce el nombre del rango">
            <div class="error d-none text-uppercase text-danger mt-2">El nombre debe contener al menos 3 caracteres</div>
        `,
			`<button class='btn-modal' onclick="gangFunctions.crearRango(${type})">Crear</button>`,
			'Cancelar',
			35
		);
	},

	crearRango: (type) => {
		let nombre = $('.input-rango-name').val();
		$('.error').addClass('d-none');

		let rangoCreado = false;
		const appClass = type ? '.gang-creator' : '.gang-settings';
		$('.gangs ' + appClass + ' .rangos-creados .rango .rango-name').each(function () {
			if (nameToId($(this).text().trim()) == nameToId(nombre)) {
				rangoCreado = true;
			}
		});
		if (nombre.length >= 3 && !rangoCreado) {
			//COMPRUEBA SI EL RANGO NO HA SIDO YA CREADO COMPARANDO SU POSIBLE ID CON LOS YA CREADOS
			$('.gangs .rangos-creados .rango.active').removeClass('active');
			if (type) {
				$('.gangs .gang-creator .rangos-creados').append(`
                <div class="rango active scale-in" rango="${nameToId(nombre)}" >
                    <div class="icon">
                        <i class="lni lni-tag"></i>
                    </div>
                    <div class="rango-name" onclick="gangFunctions.verPermisosRango('${nameToId(
						nombre
					)}')">
                        ${nombre}
                    </div>
                    <i class="lni lni-trash-can delete-rango" onclick="gangFunctions.deleteRango('${nameToId(
						nombre
					)}')"></i>
                </div>
                `);
				$('.gangs .gang-creator .zona-permisos .permisos-tab.activa').removeClass(
					'activa'
				);
				setTimeout(() => {
					$('.gangs .gang-creator .zona-permisos').append(`
                    <div class="permisos-tab activa" rango="${nameToId(nombre)}">
                        ${permissionsList}
                    `);
				}, 300);
				$('.gangs .gang-creator .rangos-dispo').text(`
                    (${10 - $('.gangs .rangos-creados .rango').length} RANGOS DISPONIBLES)
                `);
				if (10 - $('.gangs .gang-creator .rangos-creados .rango').length < 10) {
					$('.gangs .gang-creator .button-continuar.first').fadeIn(300);
				} else {
					$('.gangs .gang-creator .button-continuar.first').fadeOut(300);
				}
				sendNotification('success', 'Rango creado correctamente');

				CloseModal();
			} else {
				TriggerCallback('origen_ilegal:server:AddGrade', {
					data: { label: nombre }
				}).done((cb) => {
					if (cb) {
						$('.gangs .gang-settings .rangos-creados').append(`
                            <div class="rango active scale-in" rango="${cb}" >
                                <div class="icon">
                                    <i class="lni lni-tag"></i>
                                </div>
                                <div class="rango-name" onclick="gangFunctions.verPermisosRangoSettings('${cb}')">
                                    ${nombre}
                                </div>
                                <i class="lni lni-trash-can delete-rango" onclick="gangFunctions.deleteRangoSettings('${cb}')"></i>
                            </div>
                            `);
						$(
							'.gangs .gang-settings .zona-permisos .permisos-tab.activa'
						).removeClass('activa');
						setTimeout(() => {
							$('.gangs .gang-settings .zona-permisos').append(`
                                <div class="permisos-tab activa" rango="${cb}">
                                    ${permissionsList}
                                `);
						}, 300);
						$('.gangs .gang-settings .rangos-dispo').text(`
                                (${
									10 -
									$('.gangs .gang-settings .rangos-creados .rango')
										.length
								} RANGOS DISPONIBLES)
                            `);

						sendNotification('success', 'Rango creado correctamente');
					} else {
						sendNotification(
							'error',
							'Ha ocurrido un error al crear el rango',
							'Consulta con la administración'
						);
					}
				});
				CloseModal();
			}
		} else if (rangoCreado) {
			//CAMBIA EL MENSAJE DE ERROR POR "EL RANGO YA EXISTE"

			$('.error').html('El rango ya existe').removeClass('d-none');
		} else {
			$('.error').removeClass('d-none');
		}
	},

	verPermisosRango: function (id) {
		$('.gangs .gang-creator .rangos-creados .rango.active').removeClass('active');
		$('.gangs .gang-creator .rangos-creados .rango[rango=' + id + ']').addClass(
			'active'
		);
		$('.gangs .gang-creator .zona-permisos .permisos-tab.activa').removeClass(
			'activa'
		);
		setTimeout(() => {
			$(
				'.gangs .gang-creator .zona-permisos .permisos-tab[rango=' + id + ']'
			).addClass('activa');
		}, 150);
	},

	deleteRango: (id) => {
		$('.gangs .gang-creator .rangos-creados .rango[rango=' + id + ']').remove();
		$('.gangs .gang-creator .zona-permisos .permisos-tab[rango=' + id + ']').remove();
		$('.gangs .gang-creator .rangos-dispo').text(`
            (${
				10 - $('.gangs .gang-creator .rangos-creados .rango').length
			} RANGOS DISPONIBLES)
        `);
		if (10 - $('.gangs .gang-creator .rangos-creados .rango').length < 10) {
			$('.gangs .gang-creator .button-continuar.first').fadeIn(300);
		} else {
			$('.gangs .gang-creator .button-continuar.first').fadeOut(300);
		}
	},

	siguientePaso: (paso) => {
		$('.gangs .gang-creator .pasos.activa').fadeOut(300, function () {
			$(this).removeClass('activa');
			$('.gangs .gang-creator .pasos.' + paso).fadeIn(300, function () {
				$(this).addClass('activa');
			});
		});
	},

	loadGang: () => {
		return new Promise(function (resolve, reject) {
			TriggerCallback('origen_ilegal:server:GetGang', {}).done((cb) => {
				exportEvent('origen_ilegal', 'Get_Config.Gangs', {}).done((cb2) => {
					config = JSON.parse(cb2);
					gangActivity = config.Activity;
					//Ocultamos todas las apps y cargamos el home
					if (cb.gang) {
						gangData = cb;

						gangFunctions.updateGang(cb.gang);
					}
					if (cb.grade) {
						myGangGrade = cb.grade;
						$('.gangs .data.capital').text(
							gangData.grades[myGangGrade].label
						);
					}
					resolve();
				});
			});
		});
	},

	updateGang: (cb) => {
		if (!config) return;
		gangData = cb;
		
		if (gangData.logo) {
			$('.gangs .gang-home .gang-logo').attr('src', gangData.logo);
			$('.gangs .gang-home .gang-logo').show();
		} else {
			$('.gangs .gang-home .gang-logo').hide();
		}

		const ctx = document.getElementById('grafica-gang');

		if (!gangStats || gangStats.length != gangData.stats.territorycount.length) {
			if (graficaGang) {
				graficaGang.destroy();
			}

			const dates = gangData.stats.territorycount
				? gangData.stats.territorycount.map((data) => data.date)
				: [];
			const territories = gangData.stats.territorycount
				? gangData.stats.territorycount.map((data) => data.terr)
				: [];


			graficaGang = new Chart(ctx, {
				type: 'line',
				data: {
					labels: dates,
					datasets: [
						{
							label: 'Territorios capturados (14 días)',
							data: territories,
							borderWidth: 2,
							backgroundColor: 'white',
							borderColor: 'white'
						}
					]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
							grid: {
								color: '#ce1d754a'
							}
						},
						x: {
							grid: {
								color: '#ce1d754a'
							}
						}
					},
					plugins: {
						legend: {
							labels: {
								color: 'white',
								font: {
									size: 18,
									family: 'Bebas Neue'
								}
							}
						}
					}
				}
			});
		}

		$('.gangs .gang-home .gang-title, .gangs .gang-settings .gang-title').text(
			cb.label
		);
		$('.gangs .gang-home .gang-level').text(cb.level);
		const maxReputacion = 1000;
		let suma = 0;
		if (cb.newReputacion) {
			const reputacionActual = JSON.parse(cb.newReputacion) || {};
			
			// Iterar sobre el objeto
			Object.values(reputacionActual).forEach(valor => {
				suma += valor;
			});
			
			const porcentajeReputacion = ((suma / maxReputacion) * 100).toFixed(2);
			
			$('.gangs .gang-home .gang-reputacion').text(porcentajeReputacion + '%');
		}
		
		$('.gangs .gang-home .next-level').text('NIVEL ' + (cb.level + 1));
		$('.gangs .gang-home .progress-bar-fill').animate(
			{
				width: (cb.experience * 100) / ((cb.level + 1) * config.LevelFactor) + '%'
			},
			1000
		);
		// let porcentajeNivel = (cb.level/config.maxLevel)*100;

		$('.gangs .gang-home .data.miembros').text(cb.players.length);
		$('.gangs .gang-stat .data.territorios').text(cb.territories.length);

		gangFunctions.updateMembers(cb.players, cb.grades);
		$('.gangs .gang-settings .gang-color').css('background-color', cb.color);
		cb.metadata.LabelChanged ? $('#changeGangLabel').remove() : null;
		cb.metadata.ColorChanged ? $('#changeGangColor').remove() : null;
		gangFunctions.updateTerritories();
	},

	resetCreator: () => {
		$('.gangs .gang-creator .rangos-creados').html('');
		$('.gangs .gang-creator .zona-permisos').html('');
		$('.gangs .gang-creator .rangos-dispo').text(`
            (10 RANGOS DISPONIBLES)
        `);
		$('.gangs .gang-creator .button-continuar').hide();
		$('.gangs .gang-creator .input-gang-title').val('');

		$('.gangs .gang-creator .pasos.activa').removeClass('activa');
		$('.gangs .gang-creator .pasos.uno').addClass('activa').show();

		$('.app-container').hide().removeClass('activa');
		$('.app-container.gang-creator').show().addClass('activa');
	},

	updateMembers: (members, grades) => {
		$('.gangs .gang-home .members-list').html('');
		$('.gangs .gang-settings .members-list').html('');

		members.map((member) => {
			$('.gangs .gang-home .members-list').append(`
                <div class="item-flex-box justify-content-between">
                    <img src="https://origennetwork.com/images/Servidores/ListaMiembrosBanda.png" class="car-icon">
                    <div class="item-flex-box-data w-100">
                        <div class="title">
                            ${member.name}
                        </div>
                        <!-- <button class="btn-action btn-sm">Solicitar a grua</button> -->
                        <div class="d-flex flex-wrap">
                            <div class="description badge-acent me-1 mb-1">
                                ${grades[member.grade].label}
                            </div>
                            <div class="description badge-acent bg-dark me-1 mb-1">
                                <i class="fas fa-phone-alt"></i>
                                ${member.phone || 'Desconocido'}

                            </div>
                        </div>
                    </div>
                    <!--<button class="btn-action">
                        <i class="fas fa-user-cog" aria-hidden="true"></i>
                    </button>-->
                </div>
            `);
			$('.gangs .gang-settings .members-list').append(`
                <div class="item-flex-box justify-content-between" onclick="gangFunctions.modalSettingMember('${
					member.citizenid
				}', '${member.name}', ${member.grade})">
                    <img src="https://origennetwork.com/images/Servidores/ListaMiembrosBanda.png" class="car-icon">
                    <div class="item-flex-box-data w-100">
                        <div class="title">
                            ${member.name}
                        </div>
                        <!-- <button class="btn-action btn-sm">Solicitar a grua</button> -->
                        <div class="description badge-acent">
                            ${grades[member.grade].label}
                        </div>
                    </div>
                    <i class="fas fa-cog"></i>

                </div>
            `);
		});

		$('.gangs .gang-settings .total-members').text(
			`MIEMBROS TOTALES: ${members.length}`
		);
	},

	modalSettingMember: (citizenid, name, memberGrade) => {
		if (canAccessGang('miembros')) {
			let options = '';
			Object.entries(gangData.grades).map((grade) => {
				let acceso = '';

				//CREO UNA VARIABLE AUXILIAR PARA GUARDAR EL PARÁMETRO QUE LE INDICA AL SELECT CUAL DEBE MOSTRARSE ACTIVO. SE MOSTRARÁ EL GRADO CUYO ID RECOGIDO EN memberGrade coincida con el valor de la posición 0 de grade
				let selected = grade[0] == memberGrade ? 'selected' : '';

				grade[1].boss ? (acceso = '(Acceso total)') : (acceso = '');
				options += `<option ${selected} value="${grade[0]}">${grade[1].label} ${acceso}</option>`;
			});

			OpenModal(
				'Gestión de miembro',
				`
           <div class="text-center">
            <h1>${name}</h1>
            <label class="mt-3">Rango del miembro</label>
            <select onchange="gangFunctions.changeMemberRange('${citizenid}')" class="form-control form-rango-gang mt-2">
                ${options}

            </select>
            <label class="mt-3 w-100">Acciones</label>
            <button class="btn btn-danger fw-bold w-100 mt-1" onclick="gangFunctions.removeGang('${citizenid}')">Expulsar</button>
           </div>
        `,
				`<div></div>`,
				'Cerrar',
				35
			);
		}
	},

	modalNewMember: () => {
		if (canAccessGang('miembros')) {
			fetch('GetClosestPlayers', { gang: gangData.id }).done((cb) => {

				let html =
					"<small class='text-center text-uppercase text-muted d-block'>No hay nadie cerca</small>";

				if (cb.length != 0) {
					html = '';
					cb.map((player) => {
						html += `
                            <div class="member" onclick="gangFunctions.addMember('${player.citizenid}', '${player.firstname} ${player.lastname}')">
                                <i class="fas fa-user"></i> ${player.firstname} ${player.lastname}
                            </div>
                        `;
					});
				}

				OpenModal(
					'Añadir Miembro',
					`
                    <h4 class="w-100 text-center">Personas cercanas</h4>
                   <div class="add-member-list">
                        ${html}
                   </div>
                `,
					`<button class="btn btn-modal">Actualizar</button>`,
					'Cerrar',
					35
				);
			});
		}
	},

	addMember: (citizenid, name) => {
		if (canAccessGang('miembros')) {
			CloseModal();
			let html = '';
			Object.entries(gangData.grades).map(([i, grade]) => {
				html += `
                <div class="member d-flex justify-content-between align-items-center" onclick="gangFunctions.addMemberGrade('${citizenid}', '${i}')">
                    <div><i class="fas fa-fan me-2"></i> ${grade.label}</div> ${
					grade.boss
						? "<span class='badge badge-acent'>ACCESO TOTAL</span>"
						: ''
				}
                </div>
            `;
			});
			OpenModal(
				'Selección de Rango',
				`
            <small class="w-100 text-center d-block text-uppercase w-100">Elige el rango para asignar a ${name}</small>
           <div class="add-member-list">
                ${html}
           </div>
        `,
				`<div></div>`,
				'Cerrar',
				45
			);
		}
	},

	addMemberGrade: (citizenid, grade) => {
		TriggerCallback('origen_ilegal:server:SendInvite', { citizenid, grade }).done(
			(cb) => {
				if (cb) {
					sendNotification(
						'success',
						'Invitación enviada',
						'El jugador recibirá una notificación en su menú principal'
					);
					CloseModal();
				}
			}
		);
	},

	sendGangInvitation: (id, label, grade, gradelabel) => {
		CloseModal();
		OpenModal(
			'Has recibido una invitación',
			`   <div class="text-center">
                    <h3>Has recibido una invitación para unirte a</br>${label}</h3>
                    <h4 class="mt-3">El rango asignado es <b>${gradelabel}</b></h4>
                    <div class="text-uppercase">¿Quieres aceptar la invitación?</div>
                </div>
            `,
			`<button class="btn btn-modal" onclick="gangFunctions.acceptInvitation('${id}', ${grade})">Aceptar invitación</button>`,
			'Denegar invitación',
			80
		);
	},

	acceptInvitation: (id, grade) => {
		TriggerCallback('origen_ilegal:server:AcceptInvite', { id, grade }).done((cb) => {
			if (cb) {
				CloseModal();
				sendNotification(
					'success',
					'Invitación aceptada',
					'Has aceptado la invitación correctamente. Ahora formas parte de la organización.'
				);
				$(".app-button[app='gangs']")
					.attr('access', 'mygang')
					.addClass('accesible');
			}
		});
	},

	removeGang: (citizenid) => {
		CloseModal();
		OpenModal(
			'Expulsar miembro',
			`   <div class="text-center">
                    <h3 class="text-danger">¿Estás seguro de que quieres expulsar a este miembro?</h3>
                </div>
            `,
			`<button class="btn btn-modal" onclick="gangFunctions.removeGangConfirm('${citizenid}')">Expulsar</button>`,
			'Cancelar',
			80
		);
	},

	removeGangConfirm: (citizenid) => {
		TriggerCallback('origen_ilegal:server:KickPlayer', { citizenid }).done((cb) => {
			if (cb == true) {
				sendNotification(
					'success',
					'Miembro expulsado',
					'Has expulsado al miembro correctamente.'
				);
				CloseModal();
			} else {
				sendNotification('error', cb);
				CloseModal();
			}
		});
	},
	changeMemberRange: (citizenid) => {
		let grade = $('.form-rango-gang').val();
		CloseModal();

		TriggerCallback('origen_ilegal:server:ModifyPlayer', { citizenid, grade }).done(
			(cb) => {
				if (cb == true) {
					sendNotification(
						'success',
						'Rango cambiado',
						'Has cambiado el rango del miembro correctamente.'
					);
				} else {
					sendNotification('error', cb);
				}
			}
		);
	},

	modalGangLabel: () => {
		if (canAccessGang()) {
			OpenModal(
				'Cambiar nombre de la organización',
				`
           <div class="text-center">
            <h1>${gangData.label}</h1>
            <label class="mt-3">Nuevo nombre de la organización</label>
            <input type="text" class="form-control form-nombre-gang mt-2">
           </div>
        `,
				`<button class="btn btn-modal" onclick="gangFunctions.changeGangLabel()">Cambiar nombre</button>`,
				'Cerrar',
				55
			);
		}
	},

	changeGangLabel: () => {
		let label = $('.form-nombre-gang').val();

		label = label.replace(/(<([^>]+)>)/gi, '');

		//Comprueba que label no está vacío y que mínimo tiene 3 caracteres
		if (label.length < 3) {
			sendNotification(
				'error',
				'Nombre demasiado corto',
				'El nombre debe tener al menos 3 caracteres.'
			);
			return;
		} else {
			CloseModal();

			TriggerCallback('origen_ilegal:server:ChangeLabel', { label }).done((cb) => {
				if (cb) {
					sendNotification(
						'success',
						'Nombre cambiado',
						'Has cambiado el nombre de la organización correctamente.'
					);
					gangData.label = label;
					// $(".app-button[app='gangs']").attr("label", label);
					$('.gang-name').text(label);
				} else {
					sendNotification(
						'error',
						'Ha ocurrido un error al cambiar el nombre',
						'Consulta con la administración.'
					);
				}
			});
		}
	},

	modalGangColor: () => {
		if (canAccessGang()) {
			OpenModal(
				'Cambiar color de la organización',
				`
           <div class="text-center">
            <h1>${gangData.label}</h1>
            <label class="mt-3">Nuevo color de la organización</label>
            <input type="color" value="${gangData.color}" class="form-control form-color-gang mt-2">
           </div>
        `,
				`<button class="btn btn-modal" onclick="gangFunctions.changeGangColor()">Cambiar color</button>`,
				'Cerrar',
				55
			);
		}
	},

	changeGangColor: () => {
		let color = $('.form-color-gang').val();

		CloseModal();

		TriggerCallback('origen_ilegal:server:ChangeColor', { color }).done((cb) => {
			if (cb) {
				sendNotification(
					'success',
					'Color cambiado',
					'Has cambiado el color de la organización correctamente.'
				);
				gangData.color = color;
				$('.gang-name').css('color', color);
			} else {
				sendNotification(
					'error',
					'Ha ocurrido un error al cambiar el color',
					'Consulta con la administración.'
				);
			}
		});
	},
	
	modalGangLogo: () => {
		if (canAccessGang()) {
			OpenModal(
				'Cambiar logotipo de organización',
				`
           <div class="text-center">

            <label class="mt-3">Establecer el logotipo asociado con su organización</label>
            <input type="text" placeholder="Ingrese la URL del logotipo (Solo png)" class="form-control form-logo-gang w-100 mt-2">
           </div>
        `,
				`<button class="btn btn-modal" onclick="gangFunctions.changeGangLogo()">Cambiar logotipo</button>`,
				'Close',
				55
			);
		}
	},
	
	changeGangLogo: () => {
		const logo = $('.c-modal .form-logo-gang').val();

		const isValidUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\.png$/.test(logo);
		if (isValidUrl) {
			TriggerCallback('origen_ilegal:server:ChangeLogo', {
				logo
			}).done((cb) => {
				if (cb === true) {
					CloseModal();
					sendNotification(
						'Realizado',
						'Logotipo cambiado',
						"Ha cambiado el logotipo de la organización con éxito."
					);
					$('.gang-logo').attr('src', logo);
				} else {
					sendNotification(
						'Error',
						'Se produjo un error al cambiar el logotipo',
						'Consult with the administration.'
					);
				}
			});
		} else {
			sendNotification(
				'Error',
				'La imagen no es válida',
				'La imagen debe ser un archivo PNG y debe alojarse en un servidor externo (imgur, etc...)'
			);
		}
	},

	updateGrades: () => {
		const grades = gangData.grades;
		$('.gangs .gang-settings .rangos-list .rangos-creados').html('');
		$('.gangs .gang-settings .zona-permisos').html('');
		let first = true;
		$('.gangs .gang-settings .rangos-dispo').text(
			'(' + (10 - Object.entries(grades).length) + ' RANGOS DISPONIBLES)'
		);
		Object.entries(grades).map(([index, grade]) => {
			$('.gangs .gang-settings .rangos-list .rangos-creados').append(`
            <div class="rango ${first ? 'active' : ''}" rango="${index}" >
                <div class="icon">
                    <i class="lni lni-tag"></i>
                </div>
                <div class="rango-name" onclick="gangFunctions.verPermisosRangoSettings('${index}')">
                    ${grade.label}
                </div>
                <i class="lni lni-trash-can delete-rango" onclick="gangFunctions.deleteRangoSettings('${index}')"></i>
            </div>
            `);

			$('.gangs .gang-settings .zona-permisos').append(`
            <div class="permisos-tab ${first ? 'activa' : ''}" rango="${index}">
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Acceso Total</div>
                        <div class="permiso-description">Permite a los miembros de este rango acceder y gestionar todas las funciones.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo boss" permiso="boss" ${
								grade.boss ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Abrir almacén</div>
                        <div class="permiso-description">Permite a los miembros acceder al inventario de la organización.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo inventory" permiso="inventory" ${
								grade.inventory ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Gestionar miembros y rangos de la organización</div>
                        <div class="permiso-description">Permite a los miembros contratar o despedir miembros y asignarle rangos.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo members" permiso="members" ${
								grade.members ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Gestionar los puntos de la organización</div>
                        <div class="permiso-description">Permite a los miembros de este rango gestionar y mover los puntos de la organización.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo build" permiso="build" ${
								grade.build ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Acceso al menú rápido de organización</div>
                        <div class="permiso-description">Permite a los miembros de este rango acceder al menú rápido de la organización.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo menu" permiso="menu" ${
								grade.menu ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Solicitud de robos</div>
                        <div class="permiso-description">Permite a los miembros de este rango solicitar robos.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo robs" permiso="robs" ${
								grade.robs ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>

                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Control de NPC</div>
                        <div class="permiso-description">Permite a los miembros de este rango controlar las acciones de los NPC de la organización.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo npcs" permiso="npcs" ${
								grade.npcs ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>

                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Solicitud de vehículos</div>
                        <div class="permiso-description">Permite a los miembros de este rango solicitar la importación de vehículos para la organización.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo vehicles" permiso="vehicles" ${
								grade.vehicles ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Acceder a la Radio</div>
                        <div class="permiso-description">Permite a los miembros de este rango acceder a la radio de la organización.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo radio" permiso="radio" ${
								grade.radio ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Acceso al garaje</div>
                        <div class="permiso-description">Permite a los miembros de este rango acceder al garaje de la organización.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo garaje" permiso="garaje" ${
								grade.garaje ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
                <div class="permiso">
                    <div class="permiso-info">
                        <div class="permiso-title">Acceso a la caja fuerte</div>
                        <div class="permiso-description">Permite a los miembros de este rango acceder a la caja fuerte y administrar el dinero.</div>
                    </div>
                    <div class="check">
                        <label class="switch">
                            <input type="checkbox" class="check-dispo garaje" permiso="safebox" ${
								grade.safebox ? 'checked' : ''
							}>
                            <span class="slider-check round"></span>
                        </label>
                    </div>
                </div>
            </div>

            `);

			first = false;
		});
	},

	verPermisosRangoSettings: function (id) {
		$('.gangs .gang-settings .rangos-creados .rango.active').removeClass('active');
		$('.gangs .gang-settings .rangos-creados .rango[rango=' + id + ']').addClass(
			'active'
		);
		$('.gangs .gang-settings .zona-permisos .permisos-tab.activa').removeClass(
			'activa'
		);
		setTimeout(() => {
			$(
				'.gangs .gang-settings .zona-permisos .permisos-tab[rango=' + id + ']'
			).addClass('activa');
		}, 150);
	},

	deleteRangoSettings: (id) => {
		OpenModal(
			`Eliminar Rango`,
			`<h3 class="text-warning text-center">VAS A ELIMINAR ESTE RANGO Y TODOS LOS MIEMBROS QUE LO TENGAN ASIGNADO</h3>
        <p class="text-center mt-4"><span class="text-uppercase">¿Estás seguro de que quieres eliminarlo?</span></br>Los miembros dentro del rango serán expulsados.</p>
        `,
			`<button class="btn btn-modal" onclick="gangFunctions.deleteRangoConfirm('${id}')">Eliminar</button>`,
			`Cancelar`,
			80
		);
	},

	deleteRangoConfirm: (id) => {
		CloseModal();
		TriggerCallback('origen_ilegal:server:RemoveGrade', { grade: id }).done((cb) => {
			if (cb == true) {
				$(
					'.gangs .gang-settings .rangos-creados .rango[rango=' + id + ']'
				).remove();
				$(
					'.gangs .gang-settings .zona-permisos .permisos-tab[rango=' + id + ']'
				).remove();
				$('.gangs .gang-settings .rangos-dispo').text(`
                    (${
						10 - $('.gangs .gang-settings .rangos-creados .rango').length
					} RANGOS DISPONIBLES)
                `);
				sendNotification('success', 'Rango eliminado correctamente.');
			} else {
				sendNotification('error', cb);
			}
		});
	},

	updateTerritories: () => {
		$('.gangs .gang-settings .lista-puntos').html('');
		$('.gangs .gang-map .territorios-conquistados').html('');
		gangData.territories.map((territorie, index) => {
			addTerritorio(
				parseFloat(territorie.coords.y.toFixed(2)),
				parseFloat(territorie.coords.x.toFixed(2)),
				config.TerritoryRadius,
				territorie.name,
				100,
				gangData.color
			);
			gangFunctions
				.addPointsTerritory(territorie.markers, territorie.code, territorie.npcs)
				.then((html) => {
					$('.gangs .gang-settings .lista-puntos').append(`
                <div class="territorio">
                    <div class="title-territorio w-100">
                        ${territorie.name}
                    </div>
                    ${html}
                </div>
                `);

					$('.gangs .gang-map .territorios-conquistados').append(`
                <div class="item-flex-box justify-content-between pointer" onClick="mapFunctions.setTerritorioFocus(${index}, '${territorie.name}')" idterritorio="${index}">
                    <img src="https://origennetwork.com/images/Servidores/IconoTerritorios.png" class="car-icon">
                    <div class="item-flex-box-data w-100">
                        <div class="title">
                            ${territorie.name}
                        </div>
						<div class="reputaciondesc">
						<i class="fa-solid fa-heart corazon"></i> 100%
						</div>

                    </div>

                </div>
                `);
				});
		});
		$('.gangs .gang-settings .total-territories').text(
			`${gangData.territories.length} ${
				gangData.territories.length == 1
					? 'TERRITORIO CONQUISTADO'
					: 'TERRITORIOS CONQUISTADOS'
			}`
		);
		gangData.discovered.map((territorie) => {
			addTerritorio(
				parseFloat(territorie.coords.y.toFixed(2)),
				parseFloat(territorie.coords.x.toFixed(2)),
				config.TerritoryRadius,
				"<small style='font-size:1.5vh;'>TERRITORIO AVISTADO</small><div>" +
					territorie.name +
					'</div>',
				100,
				territorie.color
			);
		});
	},

	addPointsTerritory: (territories, code, npcs) => {
		return new Promise((resolve, reject) => {
			let html = '';
			npcs?.map((npc, i) => {
				html += `
				<div class="item-flex-box justify-content-between" style="width:98%" onclick="gangFunctions.markerModalSettingsNpc('${npc.name}', ${npc.code}, ${code})">
					<img src="https://origennetwork.com/images/Servidores/IconoPersona.png" class="car-icon">
					<div class="item-flex-box-data">
						<div class="title">
							${npc.name}
						</div>
					</div>
					<i class="fas fa-cog"></i>
				</div>`;

				CreateBlip(
					mapTerritorios,
					i + 1,
					{
						x: parseFloat(npc.coords.x.toFixed(2)),
						y: parseFloat(npc.coords.y.toFixed(2))
					},
					MarkerBlips['npc'],
					`<div>${npc.name}</div>`
				);
			});
			territories?.map((territorie) => {
				html += `
              <div class="item-flex-box justify-content-between" onclick="gangFunctions.markerModalSettings('${
					config.Markers[territorie.type].label
				}', ${territorie.code}, ${code}, '${territorie.type}')">
                <img src="https://origennetwork.com/images/Servidores/UbicacionTerritorio.png" class="car-icon">
                <div class="item-flex-box-data">
                  <div class="title">
                    ${config.Markers[territorie.type].label}
                  </div>
                </div>
                <i class="fas fa-cog"></i>
              </div>
            `;
			});

			resolve(html);
		});
	},

	modalAddPoints: () => {
		if (canAccessGang('build')) {
			let html = '';
			$('.c-modal .puntos-list').hide();
			$('.c-modal .territorios-list').show();
			gangData.territories?.map((territorie) => {
				html += `
            <div class="item-flex-box" onclick="gangFunctions.setTerritorioAddPoint('${territorie.code}')">
                <img src="https://origennetwork.com/images/Servidores/BanderaTerritorio.png" class="icon">
                <div class="item-flex-box-data">
                    <div class="title-item">
                        ${territorie.name}
                    </div>
                </div>
            </div>
            `;
			});
			OpenModal(
				`Añadir Punto`,
				`<h3 class="text-center">Selecciona el territorio al que quieres añadir un punto</h3>
            <div class="data-list-territorio">
                <div class="territorios-list">
                    ${html}
                </div>
                <div class="puntos-list">

                </div>
            </div>

            `,
				`<div></div>`,
				`Cancelar`,
				50
			);
		}
	},

	setTerritorioAddPoint: (code) => {
		if (canAccessGang('build')) {
			let html = '';
			gangData.territories.map((territorie) => {
				if (territorie.code == code) {
					const auxArray = [];
					// Recorremos el primer objeto
					for (let key in config.Markers) {
						// Comprobamos si el marker no está en el segundo objeto
						// console.log(gangData.reputacion)
						if (
							!territorie.markers.some((marker) => marker.type === key) &&
							!config.Markers[key].private 
							// && (!config.Markers[key].focus || !gangData.focus || key == gangData.focus)
						) {
							// Si no está, lo añadimos al array auxiliar
							auxArray.push({ key, label: config.Markers[key].label });
						}
					}

					if (territorie.npcs.length < 1) {
						auxArray.push({ key: 'npc', label: 'NPC' });
					}

					if (auxArray.length > 0) {
						$('.c-modal .territorios-list').fadeOut(300, function () {
							auxArray.map((marker) => {
								html += `
                            <div class="item-flex-box" onclick="gangFunctions.addPoint('${code}', '${marker.key}')">
                                <img src="https://origennetwork.com/images/Servidores/Ubicacion.png" class="icon">
                                <div class="item-flex-box-data">
                                    <div class="title-item">
                                        ${marker.label}
                                    </div>
                                </div>
                            </div>
                            `;
							});
							$('.c-modal .puntos-list').html(html).fadeIn(300);
						});
					} else {
						$('.c-modal .territorios-list').fadeOut(300, function () {
							html = `<div class="text-center">${translate.NOPOITNVALIDTERRYTORY}</div>`;
							$('.c-modal .puntos-list').html(html).fadeIn(300);
						});
					}
				}
			});
			$('.data-list-territorios .puntos-list').html(html);
		}
	},

	addPoint: (code, type, confirmed) => {
		if (canAccessGang('build')) {
			if (config.Markers[type] && config.Markers[type].pay && !confirmed) {
				if (config.Markers[type].focus) {
					const levelNeeded = config.Markers[type].level;
					const gangLevel = gangData.level;
					if (gangLevel < levelNeeded) {
						sendNotification(
							'error',
							'No tienes el nivel suficiente',
							`Necesitas tener el nivel ${levelNeeded} para poder comprar este punto`
						);
						return;
					}
				} else {
					OpenModal(
						`${config.Markers[type].label}`,
						`<h3 class="text-center">Estas seguro de que quieres comprar un ${config.Markers[type].label} por <span style="color: green;">$${config.Markers[type].pay}</span></h3>
						<div class="text-center w-100 mt-3 text-warning">Recuerda que si tienes un laboratorio dedicado a otro negocio se perderá junto con todas sus existencias y mejoras</div>
						`,
						`<button class="btn-modal" onclick="gangFunctions.addPoint('${code}', '${type}', true)">Pagar $${config.Markers[type].pay}</button>`,
						`Cancelar`,
						50
					);
				}
			} else {
				closeMenu();
				setTimeout(() => {
					CloseModal();
				}, 1000);
				exportEvent('origen_ilegal', 'AddTerritoryMarker', {
					territorycode: code,
					type: type
				});
			}
		}
	},
	markerModalSettings: (name, code, tcode, type) => {
		if (canAccessGang('build')) {
			OpenModal(
				`Modificar Punto`,
				`<h3 class="text-center">${name}</h3>
             <button class="btn btn-modal w-100 mt-3" onclick="gangFunctions.moveMarker(${code}, ${tcode}, '${type}')">Elegir nueva posición</button>

            `,
				`<div></div>`,
				`Cancelar`,
				50
			);
		}
	},
	markerModalSettingsNpc: (name, code, tcode) => {
		if (canAccessGang('build')) {
			OpenModal(
				`Modificar Punto`,
				`<h3 class="text-center">${name}</h3>
                 <button class="btn btn-modal w-100 mt-3" onclick="gangFunctions.moveNPC(${code}, ${tcode})">Elegir nueva posición</button>
				 <div class="mt-3 row">
				 	<div class="col-12">
						<label>Animación</label>
					</div>
					<div class="col-8">
						<input class="form-control w-100 input-anim h-100" placeholder="Introduce animación (Ej: e sit)">
					</div>
					<div class="col-4">
						<button class="btn btn-modal w-100" onclick="gangFunctions.changeAnimation(${code}, ${tcode})">
						Guardar
						</button>
					</div>
					<!--<div class="col-12 mt-3">
						<label>Mensaje de voz</label>
					</div>
					<div class="col-8">
						<input class="form-control w-100 input-voz h-100" placeholder="Introduce lo que el NPC dirá">
					</div>
					<div class="col-4">
						<button class="btn btn-modal w-100" onclick="gangFunctions.saveVoice(${code}, ${tcode})">
						Guardar
						</button>
					</div>-->
				 </div>

                `,
				`<div></div>`,
				`Cancelar`,
				50
			);
		}
	},
	changeAnimation: (code, tcode) => {
		const anim = $('.c-modal .input-anim').val().trim();
		if (anim.length < 1) {
			sendNotification('error', 'La animación no puede estar vacía');
		} else {
			TriggerCallback('origen_ilegal:server:UpdateNpcAnim', {
				territory: tcode + '',
				code: code + '',
				anim
			}).done((cb) => {
				if (cb === true) {
					sendNotification(
						'success',
						'La animación se ha guardado correctamente',
						'Si la animación no funciona, revisa que has elegido una animación correcta'
					);
				} else {
					sendNotification('error', cb);
				}
			});
		}
	},

	// saveVoice: (code, tcode) => {
	// 	const speech = $('.c-modal .input-voz').val().trim();
	// 	if (speech.length < 5) {
	// 		sendNotification('error', 'El mensaje debe ser más rápido');
	// 	} else {
	// 		TriggerCallback('origen_materjob:server:UpdateNpcSpeech', {
	// 			territory: tcode + '',
	// 			code: code + '',
	// 			speech
	// 		}).done((cb) => {
	// 			if (cb === true) {
	// 				sendNotification(
	// 					'success',
	// 					'El mensaje se ha guardado corréctamente',
	// 					'Ahora el NPC dirá el mensaje que has escrito cuando interactúe con alguien.'
	// 				);
	// 			} else {
	// 				sendNotification('error', cb);
	// 			}
	// 		});
	// 	}
	// },

	moveMarker: (code, tcode, type) => {
		if (canAccessGang('build')) {
			closeMenu();
			setTimeout(() => {
				CloseModal();
			}, 1000);
			exportEvent('origen_ilegal', 'MoveTerritoryMarker', {
				territorycode: `${tcode}`,
				markercode: `${code}`,
				type
			});
		}
	},

	moveNPC: (code, tcode) => {
		closeMenu();
		if (canAccessGang('build')) {
			setTimeout(() => {
				CloseModal();
			}, 1000);
			exportEvent('origen_ilegal', 'MoveNPC', {
				territorycode: `${tcode}`,
				npccode: `${code}`
			});
		}
	},

	newReport: () => {
		$('.gang-reports .citizen-ficha').fadeOut(300, function () {
			TriggerCallback('origen_ilegal:server:CreateGangDocument', {}).done((cb) => {

				if (cb) {
					let date = timeStampToDate(cb.date);

					$('.gang-reports .citizen-ficha').html(`
                    <div class="row ficha" reportid="${cb.id}">
                        <div class="col-12 pe-3 ps-3">
                            <input class="report-title form-control w-100" value="Documento sin título #${cb.id}" placeholder="Nombre del documento">
                        </div>
                        <div class="col-6 pe-1">
                            <div class="info-box m-1 mt-2">
                                <div class="notes-title d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-quote-right" aria-hidden="true"></i> Notas</h4>
                                    <div class="new-button new-note" onclick="gangFunctions.newNote()"><i class="fas fa-plus" aria-hidden="true"></i> Nueva nota</div>
                                </div>
                                <div class="citizen-info-container mt-2">
                                    <ul class="list-group notes-list-pinned">


                                    </ul>
                                    <ul class="list-group notes-list mt-2">

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 ps-1">
                            <div class="info-box m-1 mt-2">
                                <div class="notes-title d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-quote-right" aria-hidden="true"></i> Fotografías</h4>
                                    <div class="new-button add-prueba" onclick="gangDocuments.addPhotoModal(${cb.id})"><i class="fas fa-plus" aria-hidden="true"></i> Añadir fotografía</div>
                                </div>
                                <div class="citizen-info-container mt-2">
                                    <div class="row evidences w-100 m-0">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button class="btn btn-danger delete-report mt-1" onclick="gangDocuments.modalRemoveDocument(${cb.id})"><i class="lni lni-trash-can"></i> Destruir documento</button>
                        </div>
                    </div>
                    `);
					$('.gang-reports .report-list .report').length == 0
						? $('.gang-reports .report-list').html(``)
						: null;
					$('.gang-reports .report-list .report.selected').removeClass(
						'selected'
					);
					$('.gang-reports .report-list').append(`
                    <div class="white-block report scale-in selected" id="report-${
						cb.id
					}" onclick="gangFunctions.loadInforme(${cb.id})">
                        <i class="fas fa-sticky-note" aria-hidden="true"></i>
                    <div class="report-name">
                        Documento sin título #${cb.id}
                    </div>
                    <div class="d-flex w-100">
                            <div class="w-50">
                                <div class="report-owner">
                                    <i class="fas fa-user" aria-hidden="true"></i>
                                    <span>${cb.author}</span>
                                </div>
                            </div>
                            <div class="w-50">
                                <div class="report-date">
                                    <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                                    <span>${date.date + ' - ' + date.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
					$('.gang-reports .citizen-ficha').fadeIn(300);
				} else {
					sendNotification(
						'error',
						'Ha ocurrido un error al crear el documento'
					);
					$('.gang-reports .citizen-ficha')
						.html(
							`
                            <div class="d-flex w-100 align-content-start justify-content-around flex-wrap" style="height: 73vh">
                                    <h1>
                                        Selecciona un documento para cargar su
                                        información
                                    </h1>
                                    <img src="./img/webp/document.webp">
                                </div>
                    `
						)
						.fadeIn(300);
				}
			});
		});
	},

	newNote: () => {
		const noteHtml = `
            <li class="list-group-item list-group-item-action scale-in">
                <h5><input class="input note-title w-100" placeholder="Título de la nota"></h5>
                <p><textarea rows="4" class="input note-text w-100 mt-1" placeholder="Texto de la nota"></textarea></p>
                <div class="d-flex justify-content-between mt-2">
                    <div class="btn btn-secondary cancel-note-button btn-sm me-2">Cancelar</div>
                    <div class="btn btn-secondary new-note-button btn-sm" onclick="gangFunctions.saveNewNote($(this))">Guardar</div>
                </div>
            </li>`;
		if ($('.gangs .gang-reports .notes-list .no-notes').length > 0) {
			$('.gangs .gang-reports .notes-list .no-notes').fadeOut(300, function () {
				$(this).remove();
				$('.gangs .gang-reports .notes-list').append(noteHtml);
			});
		} else {
			$('.gangs .gang-reports .notes-list').prepend(noteHtml);
		}
	},

	saveNewNote: (button) => {
		const title = button.parent().parent().find('.note-title').val();
		const description = button.parent().parent().find('.note-text').val();
		const documentid = $('.citizen-ficha .ficha').attr('reportid');
		const note = button;
		let params = { documentid, title, description };
		if (title.length > 0 && description.length > 0) {
			TriggerCallback('origen_ilegal:server:CreateGangNote', params).done((cb) => {
				if (cb) {
					//Transforma cb.note que se encuetra en Timestamp en 2 constantes para fecha y hora
					const date = timeStampToDate(cb.date * 1000);
					note.parent()
						.parent()
						.removeClass('scale-in')
						.addClass('scale-out')
						.fadeOut(300, function () {
							button.remove();
							$('.gangs .gang-reports .citizen-ficha .notes-list').prepend(`
                        <li class="list-group-item list-group-item-action scale-in" note-id="${cb.id}">
                            <h5>${title}</h5>
                            <p>${description}</p>
                            <div class="note-info d-flex">
                                <div class="note-author"><i class="fas fa-user"></i> ${cb.author}</div>
                                <div class="note-date"><i class="fas fa-calendar-alt"></i> ${date.date}</div>
                                <div class="note-hour"><i class="fas fa-clock"></i> ${date.time}</div>
                            </div>
                            <div class="pin-button">
                                <i class="fas fa-thumbtack"></i>
                            </div>
                            <div class="delete-button">
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </li>
                        `);
						});
				}
			});
		}
	},

	loadInforme: (id) => {
		TriggerCallback('origen_ilegal:server:GetGangDocument', { id }).done((cb) => {
			if (cb) {
				let citizenNotes = '';
				let citizenNotesPinned = '';
				if (cb.notes.length > 0) {
					cb.notes.map(function (note) {
						const date = timeStampToDate(note.date);
						if (note.fixed) {
							citizenNotesPinned += `
                        <li class="list-group-item list-group-item-action pinned" note-id="${note.id}">
                            <h5>${note.title}</h5>
                            <p>${note.description}</p>
                            <div class="note-info d-flex">
                                <div class="note-author"><i class="fas fa-user"></i> ${note.author}</div>
                                <div class="note-date"><i class="fas fa-calendar-alt"></i> ${date.date}</div>
                                <div class="note-hour"><i class="fas fa-clock"></i> ${date.time}</div>
                            </div>
                            <div class="delete-button">
                                <i class="fa-solid fa-trash"></i>
                            </div>
                            <div class="pin-button">
                                <i class="fas fa-thumbtack"></i>
                            </div>
                        </li>`;
						} else {
							citizenNotes += `
                        <li class="list-group-item list-group-item-action" note-id="${note.id}">
                            <h5>${note.title}</h5>
                            <p>${note.description}</p>
                            <div class="note-info d-flex">
                                <div class="note-author"><i class="fas fa-user"></i> ${note.author}</div>
                                <div class="note-date"><i class="fas fa-calendar-alt"></i> ${date.date}</div>
                                <div class="note-hour"><i class="fas fa-clock"></i> ${date.time}</div>
                            </div>
                            <div class="delete-button">
                                <i class="fa-solid fa-trash"></i>
                            </div>
                            <div class="pin-button">
                                <i class="fas fa-thumbtack"></i>
                            </div>
                        </li>`;
						}
					});
				} else {
					citizenNotes = `
                <li class="list-group-item list-group-item-action no-notes">
                    <h5>No hay notas registradas</h5>
                </li>`;
				}

				let evidences = '';
				if (cb.images && isJsonString(cb.images)) {
					const evidencesList = JSON.parse(cb.images);

					evidencesList.forEach((evidence) => {
						evidences += `
                    <div class="col-4 pt-2">
                        <div class="evidence">
                            <img src="${evidence}">
                            <button class="btn text-white p-0 mt-2 delete-evidence"><i class="lni lni-trash-can"></i></button>
                        </div>
                    </div>


                        `;
					});
				}

				$('.gangs .gang-reports .report.selected').removeClass('selected');
				$('.gangs .gang-reports #report-' + id).addClass('selected');
				$('.gang-reports .citizen-ficha').fadeOut(300, function () {
					$(this)
						.html(
							`
                    <div class="row ficha" reportid="${cb.id}">
                        <div class="col-12 pe-3 ps-3">
                            <input class="report-title form-control w-100" value="${cb.title}" placeholder="Nombre del documento">
                        </div>
                        <div class="col-6 pe-1">
                            <div class="info-box m-1 mt-2">
                                <div class="notes-title d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-quote-right" aria-hidden="true"></i> Notas</h4>
                                    <div class="new-button new-note" onclick="gangFunctions.newNote()"><i class="fas fa-plus" aria-hidden="true"></i> Nueva nota</div>
                                </div>
                                <div class="citizen-info-container mt-2">
                                    <ul class="list-group notes-list-pinned">
                                        ${citizenNotesPinned}

                                    </ul>
                                    <ul class="list-group notes-list mt-2">
                                        ${citizenNotes}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 ps-1">
                            <div class="info-box m-1 mt-2">
                                <div class="notes-title d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-quote-right" aria-hidden="true"></i> Fotografías</h4>
                                    <div class="new-button add-prueba" onclick="gangDocuments.addPhotoModal(${cb.id})"><i class="fas fa-plus" aria-hidden="true"></i> Añadir fotografía</div>
                                </div>
                                <div class="citizen-info-container mt-2">
                                    <div class="row evidences w-100 m-0">
                                       ${evidences}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button class="btn btn-danger delete-report mt-1" onclick="gangDocuments.modalRemoveDocument(${cb.id})"><i class="lni lni-trash-can"></i> Destruir documento</button>
                        </div>
                    </div>
                    `
						)
						.fadeIn(300);
				});
			}
		});
	}
};

//DOCUMENTOS

let gangDocuments = {
	modalRemoveDocument: (id) => {
		OpenModal(
			`ATENCIÓN`,
			`<div class="row">
        <div class="col-2">
            <img src="./img/webp/trash.webp" class="img-fluid">
        </div>
        <div class="col-10 d-flex align-items-center">
            <div>
            <h5 class="text-danger fw-bold mb-3">Esta acción eliminará el documento de forma permanente, incluyendo las fotografías adjuntadas a él.</h5>

            </div>
        </div>

    </div>`,
			`<button class="btn-modal" onclick="gangDocuments.deleteDocument(${id})">Confirmar</button>`,
			'Cancelar',
			60
		);
	},

	deleteDocument: (id) => {
		TriggerCallback('origen_ilegal:server:DeleteGangDocument', { id }).done((cb) => {
			if (cb) {
				$('.gangs .gang-reports .report.selected').removeClass('selected');
				$('.gangs .gang-reports #report-' + id).fadeOut(300, function () {
					$(this).remove();
				});
				$('.gangs .gang-reports .citizen-ficha').fadeOut(300);
				CloseModal();
			}
		});
	},

	addPhotoModal: (id) => {
		fetch('GetInventory', ['report_evidence', 'photo']).done((cb) => {
			if (cb && cb.length > 0) {
				let fotos = '';

				cb.map(function (evidence) {
					fotos += `
                    <div class="col-4 mb-3">
                        <div class="photo-box" data-slot="${evidence.slot}" data-name="${evidence.name}" data-img="${evidence.info.url}">
                            <div class="photo-image" style="background-image:url(${evidence.info.url})"></div>
                            <div class="p-2 text-center">
                                <div class="photo-name">${evidence.label}</div>
                                <div class="photo-serie">${evidence.info.serie}</div>
                            </div>
                        </div>
                    </div>
                `;
				});
				OpenModal(
					`
                    Añadir fotografías
                `,
					`
                    <div class="row fotos-box-list">
                        ${fotos}
                    </div>
                `,
					`<div></div>`,
					`Cancelar`,
					60
				);
			} else {
				OpenModal(
					`
                Añadir fotografías
            `,
					`
            <div class="col-12 text-muted">
                <h4 class="citizen-name">No hay fotografías en tu inventario</h4>
            </div>
            `,
					`<div></div>`,
					`Cancelar`,
					60
				);
			}
		});
	},

	updatePhotos: () => {
		const data = {
			documentid: parseInt($('.gangs .gang-reports .ficha').attr('reportid')),
			key: 'images',
			value: []
		};
		$('.gangs .gang-reports .row.evidences img').each(function () {
			data.value.push($(this).attr('src'));
		});
		data.value = JSON.stringify(data.value);
		TriggerCallback('origen_ilegal:server:UpdateGangDocument', data).done((cb) => {
			if (cb) {
				sendNotification('success', 'Fotografía añadidas correctamente');
			}
		});
	},
	deleteEvidence: () => {
		CloseModal();
		actualEvidenceGang.addClass('scale-out').fadeOut(300, function () {
			actualEvidenceGang.remove();
			actualEvidenceGang = null;
			gangDocuments.updatePhotos();
		});
	}
};

$(document).on('click', '.gangs .npc-status-button', function () {
	$('.gangs .npc-status-button.activo').removeClass('activo');
	$(this).addClass('activo');
});

$(document).on('click', '.gangs .btn-gang-npc', function () {
	TriggerCallback('origen_ilegal:server:CallMainNPC', {}).done((cb) => {
		if (cb == true) {
			sendNotification('success', 'Has reestablecido los NPC de tu organización');
		} else {
			sendNotification('error', cb);
		}
	});
});

// <div class="item-flex-box justify-content-between">
//                         <img src="https://i.imgur.com/xRpNJN1.png" class="car-icon">
//                         <div class="item-flex-box-data">
//                             <div class="title">
//                                 Garaje
//                             </div>

//                         </div>
//                         <i class="fas fa-cog"></i>

//                     </div>
//                     <div class="item-flex-box justify-content-between">
//                         <img src="https://i.imgur.com/xRpNJN1.png" class="car-icon">
//                         <div class="item-flex-box-data">
//                             <div class="title">
//                                 Almacén
//                             </div>

//                         </div>
//                         <i class="fas fa-cog"></i>

//                     </div>
//                     <div class="item-flex-box justify-content-between">
//                         <img src="https://i.imgur.com/xRpNJN1.png" class="car-icon">
//                         <div class="item-flex-box-data">
//                             <div class="title">
//                                 Vestuario
//                             </div>

//                         </div>
//                         <i class="fas fa-cog"></i>

//                     </div>
//                     <div class="item-flex-box justify-content-between">
//                         <img src="https://i.imgur.com/xRpNJN1.png" class="car-icon">
//                         <div class="item-flex-box-data">
//                             <div class="title">
//                                 Caja Fuerte
//                             </div>

//                         </div>
//                         <i class="fas fa-cog"></i>

//                     </div>

// EVIDENCIAS:
// <div class="evidence">
//     <img src="https://cdn.discordapp.com/attachments/1047852126572925079/1070126151466491904/screenshot.jpg">
//     <button class="btn text-white p-0 mt-2 delete-evidence"><i class="lni lni-trash-can"></i></button>
// </div>

function canAccessGang(app) {
	let access = false;
	if (gangData.grades[myGangGrade].boss) {
		access = true;
	}
	if (
		app == 'gang-settings' &&
		(gangData.grades[myGangGrade].boss ||
			gangData.grades[myGangGrade].build ||
			gangData.grades[myGangGrade].members)
	) {
		access = true;
	}

	if (app == 'miembros' && gangData.grades[myGangGrade].members) {
		access = true;
	}

	if (app == 'build' && gangData.grades[myGangGrade].build) {
		access = true;
	}

	if (app == 'gang-activity') {
		access = true;
	}

	if (app == 'gang-home') {
		access = true;
	}

	if (app == 'gang-reports') {
		access = true;
	}

	if (app == 'gang-map') {
		access = true;
	}

	if (!access) {
		sendNotification('error', 'No cuentas con permisos suficientes');
	}

	return access;
}
let swiperMissions;
let swiperArmas;

function loadActivity() {
	if (gangActivity) {
		$('.gangs .slider-misiones .swiper-wrapper').html('');
		$('.estadisticas-list').html('');
		$('.atracos-list').html('');
		catLogros = [];

		const sortedActivity = Object.fromEntries(
			Object.entries(gangActivity).sort((a, b) => a[1].order - b[1].order)
		);


		Object.entries(sortedActivity).map((activity) => {
			renderLogros(activity[0], activity[1]);
			if (activity[1].img != undefined) {
				$('.gangs .slider-misiones .swiper-wrapper').append(
					getSliderTemplate(
						activity[1].img,
						activity[1].title,
						activity[1].minlevel,
						activity[1].description,
						activity[0]
					)
				);
			} else {
				if (activity[1].category != 'drugs') {
					renderAtracos(activity[1]);
				}
			}
		});

		if (swiperMissions) {
			// swiperVehicle.destroy();
			swiperMissions.destroy();
		}

		swiperMissions = new Swiper('.slider-misiones', {
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true
			}
		});
	}
	TriggerCallback('origen_police:server:GetRobRequests', { gang: gangData.id }).done(
		(cb) => {
			if (cb) {
				setSolicitud(cb);
			}
		}
	);
}

function getSliderTemplate(img, title, minlevel, description, type) {
	let aux = '';
	let aux2 = false;
	if (minlevel.type == 'gang') {
		if (gangData.level >= minlevel.level) {
			aux = 'DISPONIBLE';
			aux2 = true;
		} else {
			aux = 'Nivel ' + minlevel.level;
		}
	} else {
		if (
			minlevel.level == 0 ||
			(gangData.skills[minlevel.type] &&
				gangData.skills[minlevel.type].level >= minlevel.level)
		) {
			aux = 'DISPONIBLE';
			aux2 = true;
		} else {
			aux =
				'<i class="fa-solid fa-unlock"></i> ' +
				gangActivity[minlevel.type].title +
				' - ' +
				gangActivity[minlevel.type].levels[minlevel.level];
		}
	}

	return `<div class="swiper-slide">
                <div class="slider-mission ${
					!aux2 ? 'bloqueada' : ''
				}" style="background: url(${img});">
                    <div class="mission-level-to">

                        <span class="mission-level-number">${aux}</span>
                    </div>
                    <div class="slider-info">
                        <div class="mission-data">
                            <div class="slider-title">
                                ${title}
                            </div>
                            <div class="slider-description">
                                ${description}
                            </div>
                        </div>
                        <div class="mission-action d-flex">
                        <button class="btn btn-success" onclick="requestMissionModal('${type}', '${title}')">
                            SOLICITAR
                        </button></div>
                    </div>
                </div>
            </div>`;
}

function renderLogros(id, logro) {
	let aux2 = false;
	let minlevel = logro.minlevel;
	if (minlevel.type == 'gang') {
		if (gangData.level >= minlevel.level) {
			aux2 = true;
		}
	} else {
		if (
			minlevel.level == 0 ||
			(gangData.skills[minlevel.type] &&
				gangData.skills[minlevel.type].level >= minlevel.level)
		) {
			aux2 = true;
		}
	}

	if (!catLogros.includes(logro.category)) {
		catLogros.push(logro.category);
		let labelCat;
		if (logro.category == 'robs') {
			labelCat = 'Golpes y atracos';
		}

		if (logro.category == 'drugs') {
			labelCat = 'Tráfico de drogas';
		}

		if (logro.category == 'weapons') {
			labelCat = 'Armas y municiones';
		}

		$('.estadisticas-list').append(`
			<div class="w-100 cat-estadistica"  cat="${logro.category}">
				<div class="title-estadisticas w-100">
					${labelCat}
				</div>
				<div class="row">

				</div>
			</div>`);
	}

	// width: (cb.experience * 100) / ((cb.level + 1) * config.LevelFactor) + '%'
	var level =
		((gangData.skills[id] ? gangData.skills[id].experience : 0) * 100) /
			(((gangData.skills[id] ? gangData.skills[id].level : 0) + 1) *
				config.LevelFactor) +
		'%';
		
	var levelLabel = logro.levels[gangData.skills[id] ? gangData.skills[id].level : 0];
	if (!levelLabel) {
		levelLabel = 'Leyenda';
		level = '100%';
	}
	
	const template = `
		<div class="col-4 mb-3">
			<div class="item-flex-box flex-column text-center justify-content-between me-0 position-relative h-100 ${
				!aux2 ? 'bloqueado' : ''
			}">
				<div class="intentos">
					<div class="erroneos">
						<i class="fa-solid fa-skull-crossbones"></i> ${
							gangData.stats[id] ? gangData.stats[id].failed : 0
						}
					</div>
					<div class="correctos">
						<i class="fa-solid fa-check"></i> ${gangData.stats[id] ? gangData.stats[id].success : 0}
					</div>
				</div>

				<div class="item-flex-box-data d-flex flex-column justify-content-between align-items-between w-100 h-100">
					<div class="title mt-2 mb-1">
						${logro.title}
					</div>
					<div class="mb-3">
						<span class="badge badge-acent text-uppercase">${levelLabel}</span>
					</div>

					<div class="w-100">
					<div class="container-estadistica">
					<div class="e-dato">
						ACTUAL

					</div>
					<div class="e-dato w-100">
						PROGRESO

					</div>
					<div class="e-dato">
						SIGUIENTE

					</div>


				</div>
				<div class="container-progreso w-100">
					<div class="bar-progreso" style="width: ${level}">

					</div>
				</div>
				<div class="container-estadistica mt-2">
					<div class="e-dato">

						<div class="n-estadistica text-start">
							${levelLabel}
						</div>
					</div>

					<div class="e-dato">

						<div class="n-estadistica text-end">
						${
							logro.levels[
								gangData.skills[id] ? gangData.skills[id].level + 1 : 1
							]
								? logro.levels[
										gangData.skills[id]
											? gangData.skills[id].level + 1
											: 1
								  ]
								: ''
						}
						</div>
					</div>


				</div>
				</div>
			</div>

		</div>
	</div>
	`;

	if (aux2) {
		$(".cat-estadistica[cat='" + logro.category + "'] .row").prepend(template);
	} else {
		$(".cat-estadistica[cat='" + logro.category + "'] .row").append(template);
	}
}

function renderAtracos(atraco) {
	let aux = '';
	let aux2 = false;
	if (atraco.minlevel.type == 'gang') {
		if (gangData.level >= atraco.minlevel.level) {
			aux = 'DISPONIBLE';
			aux2 = true;
		} else {
			aux = 'Nivel ' + atraco.minlevel.level;
		}
	} else {
		if (
			atraco.minlevel.level == 0 ||
			(gangData.skills[atraco.minlevel.type] &&
				gangData.skills[atraco.minlevel.type].level >= atraco.minlevel.level)
		) {
			aux = 'DISPONIBLE';
			aux2 = true;
		} else {
			aux =
				'<i class="fa-solid fa-unlock"></i> ' +
				gangActivity[atraco.minlevel.type].title +
				' - ' +
				gangActivity[atraco.minlevel.type].levels[atraco.minlevel.level];
		}
	}

	$('.atracos-list').append(`
		<div class="item-flex-box justify-content-between ${!aux2 ? 'bloqueado' : ''}">
			<img src="https://origennetwork.com/images/Servidores/AtracosMenoresIcono.png" class="car-icon">
			<div class="item-flex-box-data d-flex justify-content-between w-100">
				<div class="title">
					${atraco.title}
				</div>
				<div class="mission-level text-uppercase ${aux2 ? 'text-success' : ''}">
					${aux}
				</div>
			</div>

		</div>
	`);
}

function loadShop() {
	extractColor();
	fetch('GetDataDarkMarket', null).done((cb) => {
		if (cb && Object.entries(cb.camos).length > 0) {
			Object.entries(cb.camos).map(([index, cat]) => {
				cat.map((arma) => {
					let html = `
					 <div class="swiper-slide">
							<div
								class="slider-weapon ${arma.isAvailable ? '' : 'bloqueada'}"
								style="
									background: url('./img/bg2.jpg');
								"
							>
								<div class="weapon-image">
									<img src="${arma.image}">
								</div>
								<div class="weapon-price-box">
									NIVEL
									<span class="weapon-level"
										>${arma.level}</span
									>
								</div>
								<div class="weapon-right-box">
								<div class="precios d-flex justify-content-between align-items-center" style="gap:1vh;">
										<div class="label-precio mb-0 exp">${arma.xp} EXP.</div>
										<div class="label-precio mb-0 cr">${
											arma.crypto
										} <i class="fa-brands fa-connectdevelop"></i></div>
									</div>
								<div class="weapon-type" style="background-color: ${configArmas[index].bgColor}; color: ${
						configArmas[index].textColor
					}; box-shadow: 0 0 20px ${configArmas[index].bgColor};">
												${configArmas[index].label}
											</div>

								</div>

								<div class="slider-info">
									<div class="mission-data">
										${
											arma.stock
												? `

										<div class="zona-stock">
											${arma.stock > 1 ? arma.stock + ' unidades' : arma.stock + ' unidad'}
										</div>`
												: ``
										}

										<div class="slider-title">
											${arma.title}
										</div>
										<div class="slider-description">
											${arma.description}
										</div>
									</div>
									<div
										class="mission-action d-flex"
									>
									${
										arma.stock > 0
											? `
									<button class="btn btn-success" onClick="buySkinModal('${arma.component}', '${arma.title}', '${arma.image}')">
										ADQUIRIR
									</button></div>`
											: ``
									}

								</div>
							</div>
						</div>
					`;

					if (arma.isAvailable) {
						$('.slider-armas .swiper-wrapper').prepend(html);
					} else {
						$('.slider-armas .swiper-wrapper').append(html);
					}
				});
			});
			Object.entries(cb.items).map((cat) => {
				const item = cat[1];
				let html = `
					<div class="swiper-slide">
						<div class="item-venta">
							<img src="${item.image}">
							<h4 class="bankgothic">
								${item.itemName}
							</h4>
							<div class="d-flex justify-content-between flex-column w-100">
								<div class="precios d-flex justify-content-between align-items-center">
									<div class="label-precio exp">${item.xp} EXP.</div>
									<div class="label-precio cr">${item.crypto} <i class="fa-brands fa-connectdevelop"></i></div>
								</div>
								<button class="btn btn-action w-100" onClick="buyItemModal('${item.itemName}', '${item.title}', '${item.image}')">COMPRAR</button>
							</div>
						</div>
					</div>
				`;
				$('.slider-compra-items .swiper-wrapper').append(html);
			});

			if (typeof swiperArmas !== 'undefined') {
				swiperArmas.destroy();
			}

			swiperArmas = new Swiper('.slider-armas', {
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				effect: 'coverflow',
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true
				}
			});
		}
	});
	if (typeof swiper !== 'undefined') {
		swiper.destroy();
	}

	var swiper = new Swiper('.slider-compra-items', {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		// effect: "coverflow",
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true
		},
		slidesPerView: 8,
		spaceBetween: 5,
		// centeredSlides: true,
		// loop: true,
		// loopAdditionalSlides: 3,
		initialSlide: 1
	});
}

function extractColor() {
	$('.item-venta').each(function () {
		var colorThief = new ColorThief();
		var img = $(this).find('img')[0];
		var color = colorThief.getColor(img);
		var rgb = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
		$(this).css({
			background: 'radial-gradient( ' + rgb + ' -18%, rgb(0 0 0 / 84%) 52%)'
		});
	});
}

function requestMissionModal(type, title) {
	if (gangData.grades[myGangGrade].build || gangData.grades[myGangGrade].boss) {
		OpenModal(
			'Solicitar Golpe',
			`   <div class="text-center">
				<h3 class="bankgothic">¿Estás seguro de que quieres solicitar el golpe a ${title}?</h3>
				<small>
					El golpe puede tardar hasta 10 minutos en ser aceptado por la policía. </br>
					Una vez aceptado, dispones de un máximo de 10 minutos</br>para comenzar el golpe.
				</small>
				<input type="number" class="form-control" placeholder="Cantidad de miembros" id="members">
			</div>
		`,
			`<button class="btn btn-modal" onclick="requestMission('${type}', '${title}')">Solicitar Golpe</button>`,
			'Cancelar',
			60
		);
	} else {
		sendNotification(
			'error',
			'No tienes los permisos necesarios para solicitar un golpe',
			'Solicitalo a los responsables de tu organización'
		);
	}
}

function requestMission(type, label) {
	const miembros = parseInt($('#members').val());
	if (miembros < 1) {
		sendNotification('error', 'Debes introducir una cantidad de miembros válida');
		return;
	}
	TriggerCallback('origen_police:server:RequestRob', {
		type: type,
		label: label + ' (' + miembros + ' atracadores)',
		gang: gangData.id
	}).done((cb) => {
		if (typeof cb === 'object') {
			s_success.play();
			setSolicitud(cb);
			CloseModal();
			sendNotification(
				'success',
				'Golpe solicitado correctamente',
				'Revisa el panel de solicitud de golpes para obtener más información'
			);
		} else {
			sendNotification('error', cb, 'Intentalo de nuevo más tarde');
		}
	});
}

function deleteSolicitud() {
	$('.gangs .solicitudes').html(`
		<h3 class="bankgothic">Golpe solicitado</h3>
		<div class="d-flex justify-content-between text-uppercase">
			<div class="status-soliticud">
				Actualmente no has solicitado realizar ningún golpe.
			</div>
		</div>
	`);
	$('.gangs .solicitudes').removeClass('aceptado');
	$('.gangs .solicitudes').removeClass('pendiente');
}

function setSolicitud(solicitud) {
	if (solicitud) {
		let statusLabel = '';
		let status = '';
		let tempLabel = '';
		if (solicitud.confirmed) {
			countdown(solicitud.time);
			statusLabel = 'Puedes comenzar el golpe';
			status = 'aceptado';
			tempLabel = 'Tienes <span class="temp">10:00</span> para comenzar el golpe';
		} else {
			countdown(solicitud.request_time);

			statusLabel = 'Espera a que el golpe sea aceptado';
			status = 'pendiente';
			tempLabel = 'Esperando confirmación: <span class="temp">10:00</span>';
		}
		$('.gangs .solicitudes').html(`
			<h3 class="bankgothic">${solicitud.label}</h3>
			<div class="d-flex justify-content-between text-uppercase align-items-center">
				<div class="status-soliticud">
					${statusLabel}
				</div>
				<div class="badge badge-acent p-1">${tempLabel}</div>
			</div>

		`);
		$('.gangs .solicitudes').addClass(status);
	}
}

let timer;

function countdown(seconds) {
	if (timer) {
		clearInterval(timer);
	}
	timer = setInterval(() => {
		let minutes = Math.floor(seconds / 60);
		let remainingSeconds = seconds % 60;
		let formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds
			.toString()
			.padStart(2, '0')}`;
		$('.gangs .temp').text(formattedTime);
		seconds--;
		if (seconds < 0) {
			clearInterval(timer);
			$('.gangs .temp').text('00:00');
		}
	}, 1000);
}

function buySkinModal(skin, name, img) {
	OpenModal(
		`Adquisición de apariencia`,
		`

			<h3 class="bankgothic">¿Estás seguro de que quieres comprar esta apariencia?</h3>
			<div>Para adquirirla, debes tener el arma a la que pertenece la apariencia en la mano.</div>
		`,
		`<button class='btn-modal' onclick="buySkin('${skin}', 'exp', '${name}', '${img}')">Pagar con EXP.</button><button class='btn-modal' onclick="buySkin('${skin}', 'crypto', '${name}', '${img}')">Pagar con cryptos</button>`,
		'Cancelar'
	);
}

function buyItemModal(itemName, title, img) {
	OpenModal(
		`Adquisición de apariencia`,
		`
			<h3 class="bankgothic">¿Estás seguro de que quieres comprar esta apariencia?</h3>
			<div>Para adquirirla, debes tener el arma a la que pertenece la apariencia en la mano.</div>
		`,
		`<button class='btn-modal' onclick="buyItem('${itemName}', 'exp', '${title}', '${img}')">Pagar con EXP.</button><button class='btn-modal' onclick="buyItem('${itemName}', 'crypto', '${title}', '${img}')">Pagar con cryptos</button>`,
		'Cancelar'
	);
}

function buyItem(item, payment, name, img) {
	fetch('PurchaseItemDarkMarket', { itemName: item, payment: payment }).done((cb) => {
		if (typeof cb === 'object') {
			sendNotification(
				'success',
				'Item comprado correctamente',
				'Revisa el panel de compras para obtener más información'
			);
			CloseModal();
			unlockItem(name, img, '12vh');
		} else {
			sendNotification('error', cb, 'Intentalo de nuevo más tarde');
		}
	});
}

function buySkin(skin, payment, name, img) {
	fetch('PurchaseCamouflage', { skin: skin, payment: payment }).done((cb) => {
		if (typeof cb === 'object') {
			sendNotification(
				'success',
				'Skin comprado correctamente',
				'Revisa el panel de compras para obtener más información'
			);
			CloseModal();
			unlockItem(name, img);
		} else {
			sendNotification('error', cb, 'Intentalo de nuevo más tarde');
		}
	});
}

function loadCameras() {
	extractColor();
	$('.flex-camaras-gang').html('');
	TriggerCallback('origen_ilegal:server:GetGangCams', {}).done((cb) => {
		if (cb && cb.length > 0) {
			cb.map((cam) => {
				$('.flex-camaras-gang').append(`
				<div class="secondary-box cam-gang" code="${cam.code}"  type="${cam.type}" cams="${cam.cams}">
					<img src="https://origennetwork.com/images/Servidores/Camara3.png">
					<div class="text-center" style="line-height:2.2vh">${cam.title}</div>
				</div>
				`);
			});
		} else {
			$('.flex-camaras-gang').html(
				`<div class="text-muted">No has adquirido cámaras de seguridad en tus laboratorios</div>`
			);
		}
	});
}

$(document).on('click', '.gangs .cam-gang', function () {
	const code = $(this).attr('code');
	const type = $(this).attr('type');
	exportEvent('origen_ilegal', 'ShowLabCams', { code, type }).done((cb) => {
		if (cb && cb === true) {
			closeMenu();
		} else {
			sendNotification('error', cb);
		}
	});
});

$(document).on('click', '.gang-creator .mercado-item', function () {
	$('.gang-creator .mercado-item.selected').removeClass('selected');
	$('.ir-finalizar').removeClass('d-none');
	$(this).addClass('selected');
	const especializacion = $(this).attr('lab');
	// if (!$('.pasos.fin').hasClass('activa')) {
	// 	$('.pasos.fin').addClass('activa');
	// }
});
