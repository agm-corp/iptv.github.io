let localData;
let configLocal;
let actualEvidencelocal;
let graficaBusiness;
let businessStats;
let myGrade;

const permissionsListLocal = `
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
        <div class="permiso-title">Recursos humanos</div>
        <div class="permiso-description">Permite a los miembros de este rango contratar y despedir personal en tu negocio.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo rrhh" permiso="rrhh">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Gestión de artículos</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder y gestionar los artículos de tu negocio.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo articles" permiso="articles">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Gestión de vehículos</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder y gestionar los vehículos de tu negocio.</div>
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
        <div class="permiso-title">Acceso al Garaje</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder al garaje y utilizar vehículos.</div>
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
        <div class="permiso-title">Acceso a la radio</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder a los canales de radio del local.</div>
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
        <div class="permiso-title">Abrir/Cerrar local</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder abrir o cerrar el local de tu negocio.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo openclose" permiso="openclose">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Facturación</div>
        <div class="permiso-description">Permite a los miembros de este rango crear facturas para entregar a los clientes.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo bills" permiso="bills">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>
<div class="permiso">
    <div class="permiso-info">
        <div class="permiso-title">Acceso al almacén</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder al almacén.</div>
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
        <div class="permiso-title">Acceso a la caja fuerte</div>
        <div class="permiso-description">Permite a los miembros de este rango acceder a la caja fuerte de tu negocio.</div>
    </div>
    <div class="check">
        <label class="switch">
            <input type="checkbox" class="check-dispo safefox" permiso="safebox">
            <span class="slider-check round"></span>
        </label>
    </div>
</div>

`;

$(document).on('click', ".app-button[app='local']", function () {
	$('.app-container').hide();

	setTimeout(() => {
		localFunctions.checkFirstTime();
	}, 600);
});

$(document).on('click', '.local .back-section', function () {
	localFunctions.navigate('local-home');
});
$(document).on('click', '.local .navigate', function () {
	localFunctions.navigate($(this).attr('app'));
});

$(document).on('click', '.local .btn-local-cars', function () {
	$(this).parent().toggleClass('show');
});

$(document).on('click', '.local .radio-category .toggle-category', function () {
	$(this).parent().toggleClass('toggle');
});

$(document).on('click', '.local .local-creator .continuar', function () {
	let rangos = {};
	let hayJefe = false;

	$('.local .rangos-creados .rango').each(function (i, n) {
		const divRangos = $(this);
		const divPermisos = $(
			".local .zona-permisos .permisos-tab[rango='" + divRangos.attr('rango') + "']"
		);

		rangos[i.toString()] = {
			label: divRangos.find('.rango-name').text().trim(),
			pay: parseInt(divRangos.attr('salario'))
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
	const local = {
		label: $('.local .local-creator .input-local-title').val(),
		grades: rangos
	};

	if (!/^[a-zA-Z0-9\s]+$/.test(local.label)) {
		sendNotification(
			'error',
			'El nombre del local solo puede contener letras y números'
		);
		return;
	}

	if (hayJefe) {
		if ($('.local .local-creator .input-local-title').val().length != 0) {
			TriggerCallback('origen_masterjob:server:CreateBusiness', local).done(
				(cb) => {
					if (cb) {
						localFunctions.siguientePaso($(this).attr('paso'));
					} else {
						//NOTIFICACIÓN ERROR
						sendNotification(
							'error',
							'Ha ocurrido un error al crear el negocio',
							'Consulta con la administración.'
						);
					}
				}
			);
		} else {
			//NOTIFICACIÓN ERROR
			sendNotification('error', 'Debes introducir un nombre para el local');
		}
	} else {
		//NOTIFICACIÓN ERROR JEFE
		sendNotification('error', 'Debes elegir al menos un rango con acceso total');
	}
});

$(document).on('click', '.local .local-creator .poner-npc', function () {
	// localFunctions.siguientePaso($(this).attr("paso"));
	$('.local .local-creator .pasos.dos').fadeOut(300, function () {
		closeMenu();
	});
});

$(document).on('click', '.local .local-creator .finalizar-local', function () {
	localFunctions.loadlocal().then(() => {
		localFunctions.navigate('local-home');
		$(".app-button[app='local']").attr('access', 'mybusiness');
	});
});

$(document).on('click', '.local .local-settings .tab-navigate', function () {
	if (!$(this).hasClass('active')) {
		if ($(this).attr('tab') == 'rangos' && !canAccess('jefe')) {
			return;
		}
		$('.local .local-settings .tab-navigate').removeClass('active');
		$(this).addClass('active');
		let that = $(this);
		if ($(this).attr('tab') == 'rangos') {
			localFunctions.updateGrades();
		} else {
			localFunctions.updateTerritories();
		}
		$('.local .local-settings .setting-tabs .tab.active')
			.removeClass('active')
			.removeClass('scale-in')
			.addClass('scale-out')
			.fadeOut(300, function () {
				const tab = that.attr('tab');
				$('.local .local-settings .setting-tabs .tab.' + tab)
					.removeClass('scale-out')
					.addClass('scale-in')
					.addClass('active')
					.fadeIn(300);
			});
	}
});

$(document).on('change', '.local .local-settings .permiso .check-dispo', function () {
	// $(".btn-guardar-rangos").fadeIn(300);
	const grade = $(this).parent().parent().parent().parent().attr('rango');
	const attr = $(this).attr('permiso');
	const value = $(this).is(':checked');
	TriggerCallback('origen_masterjob:server:UpdateGrade', {
		grade,
		attr,
		value
	}).done((cb) => {
		if (cb) {
			sendNotification('success', 'Se ha actualizado el permiso correctamente');
		} else {
			sendNotification('error', 'Ha ocurrido un error al actualizar el permiso');
		}
	});
});

$(document).on('click', '.local .btn-settings', function () {
	localFunctions.updateTerritories();
});

$(document).on('click', '.local .local-reports .evidence img', function () {
	const img = $(this).attr('src');

	$('.local .informe-view img').attr('src', img);
	$('.local .informe-view').fadeIn(300);
});

$(document).on('click', '.local .informe-view', function () {
	$(this).fadeOut(300);
});

$(document).on('click', '.local #documentos', function () {
	TriggerCallback('origen_masterjob:server:GetBusinessDocuments', {}).done((cb) => {
		if (cb) {
			if (cb.length > 0) {
				$('.local-reports .report-list').html('');
				cb?.map((doc) => {
					let date = timeStampToDate(doc.date);
					$('.local-reports .report-list').append(`
                        <div class="white-block report scale-in" id="report-${
							doc.id
						}"  onclick="localFunctions.loadInforme(${doc.id})">
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

$(document).on('click', '.local .local-reports .pin-button', function () {
	const noteId = $(this).parent().attr('note-id');
	const note = $(this).parent();
	let value = 1;
	if (note.hasClass('pinned')) {
		value = 0;
	}
	TriggerCallback('origen_masterjob:server:UpdateBusinessNote', {
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
					$('.local .local-reports .notes-list-pinned').prepend(nota);
				});
			} else {
				note.addClass('scale-out').fadeOut(300, function () {
					let nota = $(this);
					$(this).remove();
					nota.removeClass('scale-out')
						.removeClass('pinned')
						.addClass('scale-in')
						.show();
					$('.local .local-reports .notes-list').prepend(nota);
				});
			}
		}
	});
});

$(document).on('click', '.local .local-reports .ficha ul .delete-button', function () {
	const noteId = $(this).parent().attr('note-id');
	const note = $(this).parent();

	TriggerCallback('origen_masterjob:server:DeleteBusinessNote', {
		id: noteId
	}).done((cb) => {
		if (cb) {
			note.addClass('scale-out').fadeOut(300, function () {
				$(this).remove();
			});
		}
	});
});

$(document).on('focusout', '.local .local-reports .report-title', function () {
	const documentid = parseInt($('.ficha').attr('reportid'));
	const title = $(this).val();
	if (title.length > 3) {
		TriggerCallback('origen_masterjob:server:UpdateBusinessDocument', {
			documentid,
			key: 'title',
			value: title
		}).done((cb) => {
			if (cb) {
				sendNotification('success', 'Se ha actualizado el titulo correctamente');
				$('.local .local-reports #report-' + documentid + ' .report-name').text(
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

$(document).on('click', '.c-modal .photo-box-local', function () {
	const slot = $(this).data('slot');
	const name = $(this).data('name');
	const img = $(this).data('img');
	TriggerCallback('origen_menu:server:RemoveItem', {
		slot,
		name,
		amount: 1
	}).done((cb) => {
		if (cb) {
			$('.local .local-reports .evidences').append(`
                <div class="col-4 pt-2 scale-in">
                    <div class="evidence">
                        <img src="${img}">
                        <button class="btn text-white p-0 mt-2 delete-photo"><i class="lni lni-trash-can"></i></button>
                    </div>
                </div>
            `);
			CloseModal();
			localDocuments.updatePhotos();
		} else {
			CloseModal();

			sendNotification('error', 'Ha ocurrido un error al añadir la foto');
		}
	});
});

$(document).on('click', '.local .local-reports .evidence .delete-evidence', function () {
	actualEvidencelocal = $(this).parent().parent();
	OpenModal(
		`ATENCIÓN`,
		`<div class="row">
        <div class="col-1">
            <img src="./img/webp/trash.webp" class="img-fluid">
        </div>
        <div class="col-11 d-flex align-items-center">
            <div>
            <h5 class="text-danger fw-bold mb-3">Esta acción eliminará la foto de manera definitiva.</h5>
            <h4>¿Deseas continuar?</h4>
            </div>
        </div>

    </div>`,
		`<button class="btn-modal" onclick="localDocuments.deleteEvidence()">Confirmar</button>`,
		'Cancelar',
		50
	);
});

let localFunctions = {
	navigate: function (app) {
		if (canAccess(app)) {
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
			if (app != 'local-home') {
				$('.local .back-section')
					.removeClass('animate__fadeOutUp')
					.addClass('animate__fadeInDown')
					.fadeIn(300);
			} else {
				$('.local .back-section')
					.fadeOut(300)
					.removeClass('animate__fadeInDown')
					.addClass('animate__fadeOutUp');
			}
		}
	},

	checkFirstTime: () => {
		if ($(".app-button[app='local']").attr('access') == 'create') {
			localFunctions.resetCreator();
		} else if ($(".app-button[app='local']").attr('access') == 'mybusiness') {
			$('.local .local-creator').hide(300);

			localFunctions.loadlocal().then(() => {
				$('.app-container.local-home').fadeIn(300).addClass('activa');
			});

			$('.app-container.local-home').fadeIn(300).addClass('activa');
		}
	},

	modalAddRango: (type) => {
		OpenModal(
			'Nuevo rango',
			`
            <small class="mb-3 text-center d-block text-muted fw-100">El pago del salario indicado se realizará mediante la facturación de la empresa. En caso de que la facturación no haya sido suficiente, todos los rangos obtendrán el mismo cobro mínimo simbólico, hasta que la facturación sea suficiente.</small>
            <label>Nombre del Rango</label>
            <input maxlength="25" type="text" class="form-control input-rango-name" placeholder="Introduce el nombre del rango">
            <label class="mt-3">Salario del Rango</label>
            <input max="9999" maxlength="4" type="number" class="form-control input-rango-salario" placeholder="Introduce el salario del rango">
            <div class="error d-none text-uppercase text-danger mt-2">El nombre debe contener al menos 3 caracteres</div>
        `,
			`<button class='btn-modal' onclick="localFunctions.crearRango(${type})">Crear</button>`,
			'Cancelar',
			35
		);
	},

	crearRango: (type) => {
		let nombre = $('.input-rango-name').val();
		let salario = parseInt($('.input-rango-salario').val());
		$('.error').addClass('d-none');
		let error = '';

		let rangoCreado = false;
		const appClass = type ? '.local-creator' : '.local-settings';
		$('.local ' + appClass + ' .rangos-creados .rango .rango-name').each(function () {
			if (nameToId($(this).text().trim()) == nameToId(nombre)) {
				rangoCreado = true;
			}
		});
		if (nombre.length >= 3 && !rangoCreado && salario > 0 && salario < 9999) {
			//COMPRUEBA SI EL RANGO NO HA SIDO YA CREADO COMPARANDO SU POSIBLE ID CON LOS YA CREADOS
			$('.local .rangos-creados .rango.active').removeClass('active');
			if (type) {
				$('.local .local-creator .rangos-creados').append(`
                <div class="rango active scale-in" salario="${salario}" rango="${nameToId(
					nombre
				)}" >
                    <div class="icon">
                        <i class="lni lni-tag"></i>
                    </div>
                    <div class="rango-name" onclick="localFunctions.verPermisosRango('${nameToId(
						nombre
					)}')">
                        ${nombre}
                    </div>
                    <i class="lni lni-trash-can delete-rango" onclick="localFunctions.deleteRango('${nameToId(
						nombre
					)}')"></i>
                </div>
                `);
				$(
					'.local .local-creator .zona-permisos .permisos-tab.activa'
				).removeClass('activa');
				setTimeout(() => {
					$('.local .local-creator .zona-permisos').append(`
                    <div class="permisos-tab activa" rango="${nameToId(nombre)}">
                        ${permissionsListLocal}
                    `);
				}, 300);
				$('.local .local-creator .rangos-dispo').text(`
                    (${10 - $('.local .rangos-creados .rango').length} RANGOS DISPONIBLES)
                `);
				if (10 - $('.local .local-creator .rangos-creados .rango').length < 10) {
					$('.local .local-creator .button-continuar.first').fadeIn(300);
				} else {
					$('.local .local-creator .button-continuar.first').fadeOut(300);
				}
				sendNotification('success', 'Rango creado correctamente');

				CloseModal();
			} else {
				TriggerCallback('origen_masterjob:server:AddGrade', {
					data: { label: nombre, pay: salario }
				}).done((cb) => {
					if (cb) {
						$('.local .local-settings .rangos-creados').append(`
                            <div class="rango active scale-in" rango="${cb}" salario="${salario}" >
                                <div class="icon">
                                    <i class="lni lni-tag"></i>
                                </div>
                                <div class="rango-name" onclick="localFunctions.verPermisosRangoSettings('${cb}')">
                                    ${nombre}
                                </div>
                                <i class="lni lni-trash-can delete-rango" onclick="localFunctions.deleteRangoSettings('${cb}')"></i>
                            </div>
                            `);
						$(
							'.local .local-settings .zona-permisos .permisos-tab.activa'
						).removeClass('activa');
						setTimeout(() => {
							$('.local .local-settings .zona-permisos').append(`
                                <div class="permisos-tab activa" rango="${cb}">
                                    ${permissionsListLocal}
                                `);
						}, 300);
						$('.local .local-settings .rangos-dispo').text(`
                                (${
									10 -
									$('.local .local-settings .rangos-creados .rango')
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
		} else {
			if (rangoCreado) {
				error += '<div>El rango ya existe</div>';
			}
			if (!salario) {
				error += '<div>El salario no puede estar vacío</div>';
			}
			if (salario > 9999) {
				error += '<div>El salario no puede ser mayor de 9999</div>';
			}
			if (nombre.length < 3) {
				error += '<div>El nombre debe contener al menos 3 caracteres</div>';
			}
			$('.error').html(error).removeClass('d-none');
		}
	},

	verPermisosRango: function (id) {
		$('.local .local-creator .rangos-creados .rango.active').removeClass('active');
		$('.local .local-creator .rangos-creados .rango[rango=' + id + ']').addClass(
			'active'
		);
		$('.local .local-creator .zona-permisos .permisos-tab.activa').removeClass(
			'activa'
		);
		setTimeout(() => {
			$(
				'.local .local-creator .zona-permisos .permisos-tab[rango=' + id + ']'
			).addClass('activa');
		}, 150);
	},

	deleteRango: (id) => {
		$('.local .local-creator .rangos-creados .rango[rango=' + id + ']').remove();
		$(
			'.local .local-creator .zona-permisos .permisos-tab[rango=' + id + ']'
		).remove();
		$('.local .local-creator .rangos-dispo').text(`
            (${
				10 - $('.local .local-creator .rangos-creados .rango').length
			} RANGOS DISPONIBLES)
        `);
		if (10 - $('.local .local-creator .rangos-creados .rango').length < 10) {
			$('.local .local-creator .button-continuar.first').fadeIn(300);
		} else {
			$('.local .local-creator .button-continuar.first').fadeOut(300);
		}
	},

	siguientePaso: (paso) => {
		$('.local .local-creator .pasos.activa').fadeOut(300, function () {
			$(this).removeClass('activa');
			$('.local .local-creator .pasos.' + paso).fadeIn(300, function () {
				$(this).addClass('activa');
			});
		});
	},

	loadlocal: () => {
		return new Promise(function (resolve, reject) {
			TriggerCallback('origen_masterjob:server:GetBusiness', {}).done((cb1) => {
				exportEvent('origen_masterjob', 'Get_Config', {}).done((cb2) => {
					configLocal = JSON.parse(cb2);
					if (cb1) {
						fetch('GetMyJob', {}).done((cb3) => {
							myGrade = parseInt(cb3.grade.level);
							setServicio(cb3.onduty);
							localFunctions.updatelocal(cb1);
							resolve();
						});
					}
				});
			});
		});
	},

	updatelocal: (cb) => {
		if (!configLocal) return;
		$('.local .local-settings .local-title').text(cb.label);
		$('.local .local-home .local-title .title').html('<img src="' + cb.image + '" style="width: 75px;margin-right: 30px;border-radius: 50%;box-shadow: rgb(255 255 255) 0px 0px 20px -5px;">' + cb.label);
		$('.local .local-settings .local-logo img').attr("src", cb.image);
		$('.local .local-home .data.miembros').text(cb.players.length);
		// $(".local .local-stat .data.territorios").text(cb.territories.length);
		localFunctions.updateMembers(cb.players, cb.grades);
		localData = cb;
		setOpen(localData.open === 1 ? true : false);
		cb.metadata.LabelChanged ? $('.local #changelocalLabel').remove() : null;

		localFunctions.updateTerritories();
		let totalDuty = 0;
		let employeesList = '';
		const expulsar = canAccess('rrhh', 1);

		if (canAccess('safebox', 1)) {
			$('.transfer-menu').css('display', 'flex');
		} else {
			$('.transfer-menu').css('display', 'none');
		}

		localData.players?.map((player) => {
			if (player.onduty) {
				totalDuty++;
				employeesList += `
                <div class="employee d-flex justify-content-between align-items-center">
                    <div><i class="fa-regular fa-user"></i>
                    ${player.name}
					</div>
					${
						expulsar
							? `<button class="btn btn-action p-0 ps-1 pe-2 expulsar-servicio" citizenid="${player.citizenid}">Expulsar de servicio</button>`
							: ''
					}

                </div>
                `;
			}
		});

		$('.local .members .registro-laboral').html('');
		localData.stats.duty?.map((player) => {
			$('.local .members .registro-laboral').prepend(`
            <div class="item-flex-box justify-content-between">
                ${
					player.duty
						? `<i class="fa-solid fa-right-to-bracket icon success"></i>`
						: `<i class="fa-solid fa-clock-rotate-left icon red"></i>`
				}
                <div class="item-flex-box-data w-100">
                    <div class="title">
                        ${player.name}
                    </div>


                </div>
                <div class="description badge-acent bg-dark me-1">
                    ${new Date(player.hour).toLocaleDateString('es-ES')}


                </div>
                <div class="description badge-acent">
                    ${new Date(player.hour).toLocaleTimeString('es-ES', {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit'
					})}

                </div>

            </div>
            `);
		});

		$('.local .zona-servicio .employees-list').html(employeesList);

		$('.local .local-level').text(localData.level);
		$('.local .next-level').text('NIVEL ' + (localData.level + 1));
		$('.local .progress-bar.nivel .progress-bar-fill').css(
			'width',
			(localData.experience * 100) /
				((localData.level + 1) * configLocal.BusinessLevelFactor) +
				'%'
		);
		$('.local-stat .n-empleados').text(localData.players.length);

		$('.local-stat .en-servicio').text(totalDuty);

		$('.local-stat .capital').text(localData.money);

		const ctx = document.getElementById('grafica-business');

		if (!businessStats || businessStats.length != localData.stats.money.length) {
			if (graficaBusiness) {
				graficaBusiness.destroy();
			}

			businessStats = localData.stats.money;
			const dates = localData.stats.money
				? localData.stats.money.map((data) => data.date)
				: [];
			const money = localData.stats.money
				? localData.stats.money.map((data) => data.money)
				: [];

			// console.log(dates, money);

			graficaBusiness = new Chart(ctx, {
				type: 'line',
				data: {
					labels: dates,
					datasets: [
						{
							label: 'Capital diario (14 días)',
							data: money,
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
	},

	showAddArmor: () => {
		OpenModal(
			`Adquisición de armamento`,
			`
                HOLA
            `,
			`<div></div>`,
			'SALIR'
		);
	},

	resetCreator: () => {
		$('.local .local-creator .rangos-creados').html('');
		$('.local .local-creator .zona-permisos').html('');
		$('.local .local-creator .rangos-dispo').text(`
            (10 RANGOS DISPONIBLES)
        `);
		$('.local .local-creator .button-continuar').hide();
		$('.local .local-creator .input-local-title').val('');

		$('.local .local-creator .pasos.activa').removeClass('activa');
		$('.local .local-creator .pasos.uno').addClass('activa').show();

		$('.app-container').hide().removeClass('activa');
		$('.app-container.local-creator').show().addClass('activa');
	},

	updateMembers: (members, grades) => {
		// $(".local .local-home .members-list").html("");
		$('.local .local-settings .members-list').html('');
		$('.num-empleados').text('EMPLEADOS TOTALES: ' + members.length);
		members.map((member) => {
			// console.log(member, grades);
			// $(".local .local-home .members-list").append(`
			//     <div class="item-flex-box justify-content-between">
			//         <img src="https://i.imgur.com/3NvxEqR.png" class="car-icon">
			//         <div class="item-flex-box-data w-100">
			//             <div class="title">
			//                 ${member.name}
			//             </div>
			//             <!-- <button class="btn-action btn-sm">Solicitar a grua</button> -->
			//             <div class="description badge-acent">
			//                 ${grades[member.grade].label}
			//             </div>
			//         </div>
			//         <!--<button class="btn-action">
			//             <i class="fas fa-user-cog" aria-hidden="true"></i>
			//         </button>-->
			//     </div>
			// `);
			$('.local .local-settings .members-list').append(`
                <div class="item-flex-box justify-content-between" onclick="localFunctions.modalSettingMember('${
					member.citizenid
				}', '${member.name}', ${member.grade})">
                    <img src="https://origennetwork.com/images/Servidores/ListaMiembrosBanda.png" class="car-icon">
                    <div class="item-flex-box-data w-100">
                        <div class="title">
                            ${member.name}
                        </div>
                        <!-- <button class="btn-action btn-sm">Solicitar a grua</button> -->
                        <div class="description badge-acent">
                            ${
								grades[member.grade]
									? grades[member.grade].label
									: 'Desconocido'
							}
                        </div>
                    </div>
                    <i class="fas fa-cog"></i>

                </div>
            `);
		});
	},

	modalSettingMember: (citizenid, name, memberGrade) => {
		let options = '';
		Object.entries(localData.grades).map((grade) => {
			// console.log(grade);
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
            <select onchange="localFunctions.changeMemberRange('${citizenid}')" class="form-control form-rango-local mt-2">
                ${options}

            </select>
            <label class="mt-3 w-100">Acciones</label>
            <button class="btn btn-danger w-100 mt-1" onclick="localFunctions.removelocal('${citizenid}')">Expulsar</button>
           </div>
        `,
			`<div></div>`,
			'Cerrar',
			35
		);
	},

	modalNewMember: () => {
		fetch('GetClosestPlayers', { local: localData.id }).done((cb) => {
			// console.log(cb);

			let html =
				"<small class='text-center text-uppercase text-muted d-block'>No hay nadie cerca</small>";

			if (cb.length != 0) {
				html = '';
				cb.map((player) => {
					html += `
                        <div class="member" onclick="localFunctions.addMember('${player.citizenid}', '${player.firstname} ${player.lastname}')">
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
				`<button class="btn btn-modal" onClick="localFunctions.updateSearchMember()">Actualizar</button>`,
				'Cerrar',
				35
			);
		});
	},

	updateSearchMember: () => {
		fetch('GetClosestPlayers', { local: localData.id }).done((cb) => {
			// console.log(cb);

			let html =
				"<small class='text-center text-uppercase text-muted d-block'>No hay nadie cerca</small>";

			if (cb.length != 0) {
				html = '';
				cb.map((player) => {
					html += `
                        <div class="member" onclick="localFunctions.addMember('${player.citizenid}', '${player.firstname} ${player.lastname}')">
                            <i class="fas fa-user"></i> ${player.firstname} ${player.lastname}
                        </div>
                    `;
				});
			}

			$('.add-member-list').html(html);
		});
	},

	addMember: (citizenid, name) => {
		CloseModal();
		let html = '';
		// console.log(localData);
		Object.entries(localData.grades).map(([i, grade]) => {
			// console.log(grade, i);
			html += `
                <div class="member d-flex justify-content-between align-items-center" onclick="localFunctions.addMemberGrade('${citizenid}', '${i}')">
                    <div><i class="fas fa-fan me-2"></i> ${grade.label}</div> ${
				grade.boss ? "<span class='badge badge-acent'>ACCESO TOTAL</span>" : ''
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
	},

	addMemberGrade: (citizenid, grade) => {
		TriggerCallback('origen_masterjob:server:SendInvite', {
			citizenid,
			grade
		}).done((cb) => {
			// console.log(cb);
			if (cb) {
				sendNotification(
					'success',
					'Invitación enviada',
					'Se ha enviado la invitación correctamente. El jugador recibirá una notificación en su pantalla.'
				);
				CloseModal();
			}
		});
	},

	sendLocalInvitation: (id, label, grade, gradelabel) => {
		CloseModal();
		OpenModal(
			'Has recibido una invitación',
			`   <div class="text-center">
                    <h3>Has recibido una invitación para unirte a</br>${label}</h3>
                    <h4 class="mt-3">El rango asignado es <b>${gradelabel}</b></h4>
                    <div class="text-uppercase">¿Quieres aceptar la invitación?</div>
                </div>
            `,
			`<button class="btn btn-modal" onclick="localFunctions.acceptInvitation('${id}', ${grade})">Aceptar invitación</button>`,
			'Denegar invitación',
			80
		);
	},

	acceptInvitation: (id, grade) => {
		TriggerCallback('origen_masterjob:server:AcceptInvite', {
			id,
			grade
		}).done((cb) => {
			// console.log(cb);
			if (cb) {
				CloseModal();
				sendNotification(
					'success',
					'Invitación aceptada',
					'Has aceptado la invitación correctamente. Ahora formas parte de un negocio.'
				);
				$(".app-button[app='local']")
					.attr('access', 'mybusiness')
					.addClass('accesible');
			}
		});
	},

	removelocal: (citizenid) => {
		CloseModal();
		OpenModal(
			'Expulsar miembro',
			`   <div class="text-center">
                    <h3 class="text-danger">¿Estás seguro de que quieres expulsar a este empleado?</h3>
                </div>
            `,
			`<button class="btn btn-modal" onclick="localFunctions.removelocalConfirm('${citizenid}')">Expulsar</button>`,
			'Cancelar',
			80
		);
	},

	removelocalConfirm: (citizenid) => {
		TriggerCallback('origen_masterjob:server:KickPlayer', { citizenid }).done(
			(cb) => {
				// console.log(cb);
				if (cb == true) {
					sendNotification(
						'success',
						'Miembro expulsado',
						'Has expulsado al empleado correctamente.'
					);
					CloseModal();
				} else {
					sendNotification('error', cb);
					CloseModal();
				}
			}
		);
	},
	changeMemberRange: (citizenid) => {
		let grade = $('.form-rango-local').val();
		CloseModal();

		TriggerCallback('origen_masterjob:server:ModifyPlayer', {
			citizenid,
			grade
		}).done((cb) => {
			if (cb == true) {
				sendNotification(
					'success',
					'Rango cambiado',
					'Has cambiado el rango del empleado correctamente.'
				);
			} else {
				sendNotification('error', cb);
			}
		});
	},

	modallocalLabel: () => {
		if (!canAccess('jefe')) {
			return;
		}
		OpenModal(
			'Cambiar nombre del negocio',
			`
           <div class="text-center">
            <h1>${localData.label}</h1>
            <label class="mt-3">Nuevo nombre del negocio</label>
            <input type="text" class="form-control form-nombre-local mt-2">
           </div>
        `,
			`<button class="btn btn-modal" onclick="localFunctions.changelocalLabel()">Cambiar nombre</button>`,
			'Cerrar',
			55
		);
	},

	modallocalLogo: () => {
		if (!canAccess('jefe')) {
			return;
		}
		OpenModal(
			'Cambiar logo del negocio',
			`
           <div class="text-center">
            <h4>${localData.image}</h4>
            <label class="mt-3">Nuevo logo del negocio</label>
            <input type="text" class="form-control form-logo-local mt-2">
           </div>
        `,
			`<button class="btn btn-modal" onclick="localFunctions.changelocalLogo()">Cambiar logo</button>`,
			'Cerrar',
			55
		);
	},

	changelocalLabel: () => {
		let label = $('.form-nombre-local').val();

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

			TriggerCallback('origen_masterjob:server:ChangeLabel', { label }).done(
				(cb) => {
					// console.log(cb);
					if (cb) {
						sendNotification(
							'success',
							'Nombre cambiado',
							'Has cambiado el nombre del negocio correctamente.'
						);
						localData.label = label;
						// $(".app-button[app='locales']").attr("label", label);
						$('.local-name').text(label);
					} else {
						sendNotification(
							'error',
							'Ha ocurrido un error al cambiar el nombre',
							'Consulta con la administración.'
						);
					}
				}
			);
		}
	},

	changelocalLogo: () => {
		let logo = $('.form-logo-local').val();

		//Comprueba si el logo es una url de imagen
		if (!logo.match(/\.(jpeg|jpg|gif|png)$/)) {
			sendNotification(
				'error',
				'El logo debe ser una url de imagen'
			);
			return;
		} else {
			CloseModal();

			TriggerCallback('origen_masterjob:server:UpdateBusinessKey', { id: localData.id, key: 'image', value: logo }).done(
				(cb) => {
					if (cb) {
						sendNotification(
							'success',
							'Logo cambiado',
							'Has cambiado el logo del negocio correctamente.'
						);
						
						localData.image = logo;

						$('.local .local-settings .local-logo img').attr("src", localData.image);
					} else {
						sendNotification(
							'error',
							'Ha ocurrido un error al cambiar el logo',
							'Consulta con la administración.'
						);
					}
				}
			);
		}
	},

	updateGrades: () => {
		const grades = localData.grades;
		$('.local .local-settings .rangos-list .rangos-creados').html('');
		$('.local .local-settings .zona-permisos').html('');
		let first = true;
		$('.local .local-settings .rangos-dispo').text(
			'(' + (10 - Object.entries(grades).length) + ' RANGOS DISPONIBLES)'
		);
		Object.entries(grades).map(([index, grade]) => {
			// console.log('Cargando a', grade.label);
			$('.local .local-settings .rangos-list .rangos-creados').append(`
            <div class="rango ${first ? 'active' : ''}" rango="${index}" >
                <div class="icon">
                    <i class="lni lni-tag"></i>
                </div>
                <div class="rango-name" onclick="localFunctions.verPermisosRangoSettings('${index}')">
                    ${grade.label}
                </div>
                <i class="lni lni-trash-can delete-rango" onclick="localFunctions.deleteRangoSettings('${index}')"></i>
            </div>
            `);

			$('.local .local-settings .zona-permisos').append(`
            <div class="permisos-tab ${first ? 'activa' : ''}" rango="${index}">
                <div class="permiso align-items-end">
                    <div class="permiso-info me-2">
                        <div class="permiso-title">Salario del rango</div>
                        <div class="permiso-description"><input class="form-control input-salario" type="number" placeholder="Introduce el salario" value="${
							grade.pay
						}"></div>
                    </div>
                    <div class="btn-action btn-salario h-auto" rango="${index}">GUARDAR</div>
                </div>
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
                    <div class="permiso-title">Recursos humanos</div>
                    <div class="permiso-description">Permite a los miembros de este rango contratar y despedir personal en tu negocio.</div>
                </div>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo rrhh" permiso="rrhh" ${
							grade.rrhh ? 'checked' : ''
						}>
                        <span class="slider-check round"></span>
                    </label>
                </div>
            </div>
            <div class="permiso">
                <div class="permiso-info">
                    <div class="permiso-title">Gestión de artículos</div>
                    <div class="permiso-description">Permite a los miembros de este rango acceder y gestionar los artículos de tu negocio.</div>
                </div>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo articles" permiso="articles" ${
							grade.articles ? 'checked' : ''
						}>
                        <span class="slider-check round"></span>
                    </label>
                </div>
            </div>
            <div class="permiso">
                <div class="permiso-info">
                    <div class="permiso-title">Gestión de vehículos</div>
                    <div class="permiso-description">Permite a los miembros de este rango acceder y gestionar los vehículos de tu negocio.</div>
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
                    <div class="permiso-title">Acceso al Garaje</div>
                    <div class="permiso-description">Permite a los miembros de este rango acceder al garaje y utilizar vehículos.</div>
                </div>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo garaje" permiso="garaje" ${
							grade.garajes ? 'checked' : ''
						}>
                        <span class="slider-check round"></span>
                    </label>
                </div>
            </div>
            <div class="permiso">
                <div class="permiso-info">
                    <div class="permiso-title">Acceso a la radio</div>
                    <div class="permiso-description">Permite a los miembros de este rango acceder a los canales de radio del local.</div>
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
                    <div class="permiso-title">Abrir/Cerrar local</div>
                    <div class="permiso-description">Permite a los miembros de este rango acceder abrir o cerrar el local de tu negocio.</div>
                </div>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo openclose" permiso="openclose" ${
							grade.openclose ? 'checked' : ''
						}>
                        <span class="slider-check round"></span>
                    </label>
                </div>
            </div>
            <div class="permiso">
                <div class="permiso-info">
                    <div class="permiso-title">Facturación</div>
                    <div class="permiso-description">Permite a los miembros de este rango crear facturas para entregar a los clientes.</div>
                </div>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo bills" permiso="bills" ${
							grade.bills ? 'checked' : ''
						}>
                        <span class="slider-check round"></span>
                    </label>
                </div>
            </div>
            <div class="permiso">
                <div class="permiso-info">
                    <div class="permiso-title">Acceso al almacén</div>
                    <div class="permiso-description">Permite a los miembros de este rango acceder al almacén.</div>
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
                    <div class="permiso-title">Acceso a la caja fuerte</div>
                    <div class="permiso-description">Permite a los miembros de este rango acceder a la caja fuerte de tu negocio.</div>
                </div>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo safefox" permiso="safebox" ${
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
		$('.local .local-settings .rangos-creados .rango.active').removeClass('active');
		$('.local .local-settings .rangos-creados .rango[rango=' + id + ']').addClass(
			'active'
		);
		$('.local .local-settings .zona-permisos .permisos-tab.activa').removeClass(
			'activa'
		);
		setTimeout(() => {
			$(
				'.local .local-settings .zona-permisos .permisos-tab[rango=' + id + ']'
			).addClass('activa');
		}, 150);
	},

	deleteRangoSettings: (id) => {
		OpenModal(
			`Eliminar Rango`,
			`<h3 class="text-warning text-center">VAS A ELIMINAR ESTE RANGO Y TODOS LOS MIEMBROS QUE LO TENGAN ASIGNADO</h3>
        <p class="text-center mt-4"><span class="text-uppercase">¿Estás seguro de que quieres eliminarlo?</span></br>Los miembros dentro del rango serán expulsados.</p>
        `,
			`<button class="btn btn-modal" onclick="localFunctions.deleteRangoConfirm('${id}')">Eliminar</button>`,
			`Cancelar`,
			80
		);
	},

	deleteRangoConfirm: (id) => {
		CloseModal();
		TriggerCallback('origen_masterjob:server:RemoveGrade', { grade: id }).done(
			(cb) => {
				if (cb == true) {
					$(
						'.local .local-settings .rangos-creados .rango[rango=' + id + ']'
					).remove();
					$(
						'.local .local-settings .zona-permisos .permisos-tab[rango=' +
							id +
							']'
					).remove();
					$('.local .local-settings .rangos-dispo').text(`
                    (${
						10 - $('.local .local-settings .rangos-creados .rango').length
					} RANGOS DISPONIBLES)
                `);
					sendNotification('success', 'Rango eliminado correctamente.');
				} else {
					sendNotification('error', cb);
				}
			}
		);
	},

	updateTerritories: () => {
		$('.local .local-settings .lista-puntos').html('');
		let html = '';
		localData.npcs.map((npc) => {
			html += `
            <div class="item-flex-box justify-content-between" style="width:98%" onclick="localFunctions.markerModalSettingsNpc('${npc.name}', ${npc.code})">
                <img src="https://origennetwork.com/images/Servidores/personitaicono.png" class="car-icon">
                <div class="item-flex-box-data">
                    <div class="title">
                        ${npc.name}
                    </div>
                </div>
                <i class="fas fa-cog"></i>
            </div>`;
		});

		localData.markers.map((marker) => {
			html += `
            <div class="item-flex-box justify-content-between" onclick="localFunctions.markerModalSettings('${
				configLocal.Markers[marker.type].label
			}', ${marker.code}, '${marker.type}')">
              <img src="https://origennetwork.com/images/Servidores/Ubicacion.png" class="car-icon">
              <div class="item-flex-box-data">
                <div class="title">
                  ${configLocal.Markers[marker.type].label}
                </div>
              </div>
              <i class="fas fa-cog"></i>
            </div>
          `;
		});

		$('.local .local-settings .lista-puntos').append(`
        <div class="territorio">
            ${html}
        </div>
        `);
		$('.local .local-settings .total-territories').text(
			`${localData.markers.length} ${
				localData.markers.length == 1 ? 'PUNTO ASIGNADO' : 'PUNTOS ASIGNADOS'
			}`
		);
	},

	modalAddPoints: () => {
		if (!canAccess('jefe')) {
			return;
		}
		let html = '';
		// $(".c-modal .puntos-list").hide();
		// $(".c-modal .territorios-list").show();
		const auxArray = [];
		// Recorremos el primer objeto
		for (let key in configLocal.Markers) {
			// console.log(key, configLocal.Markers[key]);

			if (!configLocal.Markers[key].type || (typeof configLocal.Markers[key].type == "object" && configLocal.Markers[key].type.some(x => x == localData.type)) || configLocal.Markers[key].type == localData.type) {
				if (configLocal.Markers[key].max) {
					if (
						localData.markers.filter((marker) => marker.type == key).length <
						configLocal.Markers[key].max
					) {
						auxArray.push({
							key: key,
							label: configLocal.Markers[key].label
						});
					}
				} else {
					if (!localData.markers.some((marker) => marker.type == key)) {
						auxArray.push({
							key: key,
							label: configLocal.Markers[key].label
						});
					}
				}
			}
		}
		// console.log(auxArray);

		if (auxArray.length > 0) {
			auxArray.map((marker) => {
				html += `
                <div class="item-flex-box" onclick="localFunctions.addPoint('${marker.key}')">
                    <img src="https://origennetwork.com/images/Servidores/Ubicacion.png" class="icon">
                    <div class="item-flex-box-data">
                        <div class="title-item">
                            ${marker.label}
                        </div>
                    </div>
                </div>
                `;
			});
		} else {
			html = `
                <div class="item-flex-box">
                    <div class="item-flex-box-data">
                        <div class="title-item">
                            Ya has añadido todos los puntos disponibles.
                        </div>
                    </div>
                </div>
            `;
		}

		$('.c-modal .puntos-list').html(html).fadeIn(300);

		OpenModal(
			`Añadir Punto`,
			`<h3 class="text-center">Elige el tipo de punto que quieres añadir</h3>
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
	},

	addPoint: (type) => {
		closeMenu();
		setTimeout(() => {
			CloseModal();
		}, 1000);
		exportEvent('origen_masterjob', 'AddMarker', {
			type: type
		});
	},

	markerModalSettings: (name, code, type) => {
		if (!canAccess('jefe')) {
			return;
		}
		OpenModal(
			`Modificar Punto`,
			`<h3 class="text-center">${name}</h3>
             <button class="btn btn-modal w-100 mt-3" onclick="localFunctions.moveMarker(${code}, '${type}')">Elegir nueva posición</button>

            `,
			`<div></div>`,
			`Cancelar`,
			50
		);
	},
	markerModalSettingsNpc: (name, code) => {
		if (!canAccess('jefe')) {
			return;
		}
		OpenModal(
			`Modificar Punto`,
			`<h3 class="text-center">${name}</h3>
             <button class="btn btn-modal w-100 mt-3" onclick="localFunctions.moveNPC(${code})">Elegir nueva posición</button>
             <div class="mt-3 row">
				<div class="col-12">
					<label>Animación</label>
				</div>
                <div class="col-8">
                    <input class="form-control w-100 input-anim h-100" placeholder="Introduce animación (Ej: e sit)">
                </div>

                <div class="col-4">
                    <button class="btn btn-modal w-100" onclick="localFunctions.changeAnimation(${code})">
                    Guardar
                    </button>
                </div>
				<div class="col-12 mt-3">
					<label>Mensaje de voz</label>
				</div>
				<div class="col-8">
						<input class="form-control w-100 input-voz h-100" placeholder="Introduce lo que el NPC dirá">
					</div>
					<div class="col-4">
						<button class="btn btn-modal w-100" onclick="localFunctions.saveVoice(${code})">
						Guardar
						</button>
					</div>
            </div>
            `,
			`<div></div>`,
			`Cancelar`,
			50
		);
	},
	changeAnimation: (code) => {
		const anim = $('.c-modal .input-anim').val().trim();
		if (anim.length < 1) {
			sendNotification('error', 'La animación no puede estar vacía');
		} else {
			TriggerCallback('origen_masterjob:server:UpdateNpcAnim', {
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
	saveVoice: (code) => {
		const speech = $('.c-modal .input-voz').val().trim();
		if (speech.length < 5) {
			sendNotification('error', 'El mensaje debe ser más largo');
		} else if (speech.length > 150) {
			sendNotification('error', 'El mensaje no puede ser tan largo');
		} else {
			TriggerCallback('origen_materjob:server:UpdateNpcSpeech', {
				code: code + '',
				speech
			}).done((cb) => {
				if (cb === true) {
					sendNotification(
						'success',
						'El mensaje se ha guardado corréctamente',
						'Ahora el NPC dirá el mensaje que has escrito cuando interactúe con alguien.'
					);
				} else {
					sendNotification('error', cb);
				}
			});
		}
	},
	moveMarker: (code, type) => {
		closeMenu();
		setTimeout(() => {
			CloseModal();
		}, 1000);
		exportEvent('origen_masterjob', 'MoveMarker', {
			markercode: `${code}`,
			type
		});
	},

	moveNPC: (code) => {
		closeMenu();
		setTimeout(() => {
			CloseModal();
		}, 1000);
		exportEvent('origen_masterjob', 'MoveNPC', {
			code: `${code}`
		});
	},

	newReport: () => {
		$('.local-reports .citizen-ficha').fadeOut(300, function () {
			TriggerCallback('origen_masterjob:server:CreateBusinessDocument', {}).done(
				(cb) => {
					// console.log(cb);

					if (cb) {
						let date = timeStampToDate(cb.date);

						$('.local-reports .citizen-ficha').html(`
                    <div class="row ficha" reportid="${cb.id}">
                        <div class="col-12 pe-3 ps-3">
                            <input class="report-title form-control w-100" value="Documento sin título #${cb.id}" placeholder="Nombre del documento">
                        </div>
                        <div class="col-6 pe-1">
                            <div class="info-box m-1 mt-2">
                                <div class="notes-title d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-quote-right" aria-hidden="true"></i> Notas</h4>
                                    <div class="new-button new-note" onclick="localFunctions.newNote()"><i class="fas fa-plus" aria-hidden="true"></i> Nueva nota</div>
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
                                    <div class="new-button add-prueba" onclick="localDocuments.addPhotoModal(${cb.id})"><i class="fas fa-plus" aria-hidden="true"></i> Añadir fotografía</div>
                                </div>
                                <div class="citizen-info-container mt-2">
                                    <div class="row evidences w-100 m-0">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button class="btn btn-danger delete-report mt-1" onclick="localDocuments.modalRemoveDocument(${cb.id})"><i class="lni lni-trash-can"></i> Destruir documento</button>
                        </div>
                    </div>
                    `);
						$('.local-reports .report-list .report').length == 0
							? $('.local-reports .report-list').html(``)
							: null;
						$('.local-reports .report-list .report.selected').removeClass(
							'selected'
						);
						$('.local-reports .report-list').append(`
                    <div class="white-block report scale-in selected" id="report-${
						cb.id
					}" onclick="localFunctions.loadInforme(${cb.id})">
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
						$('.local-reports .citizen-ficha').fadeIn(300);
					} else {
						sendNotification(
							'error',
							'Ha ocurrido un error al crear el documento'
						);
						$('.local-reports .citizen-ficha')
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
				}
			);
		});
	},

	newNote: () => {
		const noteHtml = `
            <li class="list-group-item list-group-item-action scale-in">
                <h5><input class="input note-title w-100" placeholder="Título de la nota"></h5>
                <p><textarea rows="4" class="input note-text w-100 mt-1" placeholder="Texto de la nota"></textarea></p>
                <div class="d-flex justify-content-between mt-2">
                    <div class="btn btn-secondary cancel-note-button btn-sm me-2">Cancelar</div>
                    <div class="btn btn-secondary new-note-button btn-sm" onclick="localFunctions.saveNewNote($(this))">Guardar</div>
                </div>
            </li>`;
		if ($('.local .local-reports .notes-list .no-notes').length > 0) {
			$('.local .local-reports .notes-list .no-notes').fadeOut(300, function () {
				$(this).remove();
				$('.local .local-reports .notes-list').append(noteHtml);
			});
		} else {
			$('.local .local-reports .notes-list').prepend(noteHtml);
		}
	},

	saveNewNote: (button) => {
		const title = button.parent().parent().find('.note-title').val();
		const description = button.parent().parent().find('.note-text').val();
		const documentid = $('.citizen-ficha .ficha').attr('reportid');
		const note = button;
		let params = { documentid, title, description };
		if (title.length > 0 && description.length > 0) {
			TriggerCallback('origen_masterjob:server:CreateBusinessNote', params).done(
				(cb) => {
					if (cb) {
						//Transforma cb.note que se encuetra en Timestamp en 2 constantes para fecha y hora
						const date = timeStampToDate(cb.date * 1000);
						note.parent()
							.parent()
							.removeClass('scale-in')
							.addClass('scale-out')
							.fadeOut(300, function () {
								button.remove();
								$(
									'.local .local-reports .citizen-ficha .notes-list'
								).prepend(`
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
				}
			);
		}
	},

	loadInforme: (id) => {
		TriggerCallback('origen_masterjob:server:GetBusinessDocument', { id }).done(
			(cb) => {
				if (cb) {
					// console.log(cb);
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

					$('.local .local-reports .report.selected').removeClass('selected');
					$('.local .local-reports #report-' + id).addClass('selected');
					$('.local-reports .citizen-ficha').fadeOut(300, function () {
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
                                    <div class="new-button new-note" onclick="localFunctions.newNote()"><i class="fas fa-plus" aria-hidden="true"></i> Nueva nota</div>
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
                                    <div class="new-button add-prueba" onclick="localDocuments.addPhotoModal(${cb.id})"><i class="fas fa-plus" aria-hidden="true"></i> Añadir fotografía</div>
                                </div>
                                <div class="citizen-info-container mt-2">
                                    <div class="row evidences w-100 m-0">
                                       ${evidences}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button class="btn btn-danger delete-report mt-1" onclick="localDocuments.modalRemoveDocument(${cb.id})"><i class="lni lni-trash-can"></i> Destruir documento</button>
                        </div>
                    </div>
                    `
							)
							.fadeIn(300);
					});
				}
			}
		);
	},

	addMoney: () => {
		const money = parseInt($('.c-modal .cant-dinero').val());
		if (money && money > 0) {
			TriggerCallback('origen_masterjob:server:TransferToSociety', {
				amount: money
			}).done((cb) => {
				if (cb && cb === true) {
					sendNotification('success', 'Transferencia realizada correctamente');
					CloseModal();
				} else {
					sendNotification('error', cb);
				}
			});
		} else {
			sendNotification('error', 'Debes introducir una cantidad válida');
		}
	},

	removeMoney: () => {
		const money = parseInt($('.c-modal .cant-dinero').val());
		if (money && money > 0) {
			TriggerCallback('origen_masterjob:server:TransferToBank', {
				amount: money
			}).done((cb) => {
				if (cb && cb === true) {
					sendNotification('success', 'Transferencia realizada correctamente');
					CloseModal();
				} else {
					sendNotification('error', cb);
				}
			});
		} else {
			sendNotification('error', 'Debes introducir una cantidad válida');
		}
	}
};

//DOCUMENTOS

let localDocuments = {
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
            <h4>Esto no afectará a las multas, que permanecerán en el sistema.</h4>
            </div>
        </div>

    </div>`,
			`<button class="btn-modal" onclick="localDocuments.deleteDocument(${id})">Confirmar</button>`,
			'Cancelar',
			60
		);
	},

	deleteDocument: (id) => {
		TriggerCallback('origen_masterjob:server:DeleteBusinessDocument', {
			id
		}).done((cb) => {
			// console.log(cb);
			if (cb) {
				$('.local .local-reports .report.selected').removeClass('selected');
				$('.local .local-reports #report-' + id).fadeOut(300, function () {
					$(this).remove();
				});
				$('.local .local-reports .citizen-ficha').fadeOut(300);
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
                        <div class="photo-box-local" data-slot="${evidence.slot}" data-name="${evidence.name}" data-img="${evidence.info.url}">
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
                <h4 class="citizen-name">No hay evidencias en tu inventario</h4>
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
			documentid: parseInt($('.local .local-reports .ficha').attr('reportid')),
			key: 'images',
			value: []
		};
		$('.local .local-reports .row.evidences img').each(function () {
			data.value.push($(this).attr('src'));
		});
		data.value = JSON.stringify(data.value);
		TriggerCallback('origen_masterjob:server:UpdateBusinessDocument', data).done(
			(cb) => {
				if (cb) {
					sendNotification('success', 'Fotografía añadida correctamente');
				}
			}
		);
	},
	deleteEvidence: () => {
		CloseModal();
		actualEvidencelocal.addClass('scale-out').fadeOut(300, function () {
			actualEvidencelocal.remove();
			actualEvidencelocal = null;
			localDocuments.updatePhotos();
		});
	}
};

const vehicles = [
	{
		id: 'sultan2',
		name: 'Sultan Classic',
		price: 10000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 0
	},
	{
		id: 'sultan2',
		name: 'Sultan Classic',
		price: 10000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 0
	},
	{
		id: 'adder',
		name: 'Adder',
		price: 1000000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 2
	},
	{
		id: 'banshee2',
		name: 'Banshee 900R',
		price: 565000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 3
	},
	{
		id: 'bullet',
		name: 'Bullet',
		price: 155000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 4
	},
	{
		id: 'cheetah',
		name: 'Cheetah',
		price: 650000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 5
	},
	{
		id: 'entityxf',
		name: 'Entity XF',
		price: 795000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 6
	},
	{
		id: 'infernus',
		name: 'Infernus',
		price: 440000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 7
	},
	{
		id: 'osiris',
		name: 'Osiris',
		price: 1500000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 8
	},
	{
		id: 'reaper',
		name: 'Reaper',
		price: 1425000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 9
	},
	{
		id: 'tempesta',
		name: 'Tempesta',
		price: 1000000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 10
	},
	{
		id: 'turismor',
		name: 'Turismo R',
		price: 500000,
		img: 'https://cdn.mos.cms.futurecdn.net/Jrd32uBmYw9E36JYBXUgYE.jpg',
		level: 11
	}
];

let swiperVehicle;

const vehicleFunctions = {
	createVehicleSlider: () => {
		// swiperVehicle ? swiperVehicle.destroy() : null;
		if (swiperVehicle) {
			// swiperVehicle.destroy();
			swiperVehicle.destroy();
		}

		let slider = '';
		$('.local .slider-vehiculos .swiper-wrapper').html();

		vehicles.map((vehicle) => {
			if (vehicle.level >= localData.level) {
				slider += `
                <div class="swiper-slide" data-swiper-autoplay="5000">
                    <div class="${
						vehicle.level > localData.level
							? 'slider-mission bloqueada'
							: 'slider-mission'
					}" style="background: url(${vehicle.img});">
                        <div class="mission-level-to">
                            NIVEL
                            <span class="mission-level-number"
                                >${vehicle.level}</span
                            >
                        </div>
                        <div class="slider-info">
                            <div class="mission-data">
                                <div class="slider-title">
                                    ${vehicle.name}
                                </div>
                                <div class="slider-description">
                                    ${vehicle.price}$
                                </div>
                            </div>
                            ${
								vehicle.level == localData.level
									? `<div class="mission-action d-flex">
                                <button class="btn btn-success">
                                    <i class="fa-solid fa-cart-shopping"></i> ADQUIRIR
                                </button>
                                </div>`
									: ''
							}
                        </div>
                    </div>
                </div>
                    `;
			}
		});

		$('.local .slider-vehiculos .swiper-wrapper').html(slider);
		setTimeout(() => {
			swiperVehicle = new Swiper('.slider-vehiculos', {
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				pagination: {
					el: '.swiper-pagination',
					type: 'progressbar'
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
		}, 505);
	}
};

$(document).on('click', '.local #local-vehicles', function () {
	vehicleFunctions.createVehicleSlider();
});

$(document).on('click', '.local .slider-vehiculos .btn-success', function () {
	unlockItem('¡Nuevo vehículo adquirido!');
});

$(document).on('click', '.local .btn-cant', function () {
	let action = $(this).hasClass('mas') ? 'sumar' : 'restar';
	let cant = parseInt($(this).parent().find('.cant').val());
	if (action == 'sumar') {
		cant++;
	} else {
		cant = Math.max(cant - 1, 1);
	}

	$(this).parent().find('.cant').val(cant);
});

let cart = [];

$(document).on(
	'click',
	'.local .local-articles .shop-articulos .add-cart-button',
	function () {
		const name = $(this).parent().parent().attr('name');
		const price = parseInt($(this).parent().parent().attr('price'));
		const cant = parseInt($(this).parent().find('.cant').val());
		const label = $(this).parent().parent().find('.title').text().trim();

		$(this).parent().find('.cant').val(1);
		addItemToCart(name, price, cant, label);
	}
);

function addItemToCart(name, price, cant, label) {
	const item = {
		name,
		price,
		amount: cant,
		label
	};
	// Check if the item already exists in the cart by comparing its name property
	const existingItem = cart.find((item) => item.name === name);

	if (existingItem) {
		// If the item already exists, update its quantity and price
		existingItem.amount += cant;
		existingItem.price = existingItem.amount * price;
	} else {
		// If the item does not exist, add it to the cart
		const newItem = {
			name,
			price: cant * price,
			amount: cant,
			label
		};
		cart.push(newItem);
	}
	updateCart();
}

const items = [
	{
		name: 'Caja de herramientas',
		id: 'caja-herramientas',
		price: 1000,
		level: 1
	},
	{
		name: 'Mesa de trabajo',
		id: 'mesa-trabajo',
		price: 500,
		level: 2
	},
	{
		name: 'Silla de trabajo',
		id: 'silla-trabajo',
		price: 250,
		level: 3
	},
	{
		name: 'Lámpara de escritorio',
		id: 'lampara-escritorio',
		price: 150,
		level: 3
	},
	{
		name: 'Caja fuerte',
		id: 'caja-fuerte',
		price: 2000,
		level: 3
	},
	{
		name: 'Máquina de escribir',
		id: 'maquina-escribir',
		price: 750,
		level: 4
	},
	{
		name: 'Pizarra',
		id: 'pizarra',
		price: 300,
		level: 4
	},
	{
		name: 'Silla de oficina',
		id: 'silla-oficina',
		price: 400,
		level: 4
	},
	{
		name: 'Escritorio',
		id: 'escritorio',
		price: 800,
		level: 4
	},
	{
		name: 'Cajonera',
		id: 'cajonera',
		price: 350,
		level: 5
	},
	{
		name: 'Silla de director',
		id: 'silla-director',
		price: 1000,
		level: 6
	}
];

function loadLocalItems() {
	TriggerCallback('origen_masterjob:server:LoadAllowedItems', {}).done((cb) => {
		if (cb) {
			const itemsLevel1 = cb.filter((item) => item.level <= localData.level);
			const othersLevels = cb.filter((item) => item.level > localData.level);
			let htmLUnlock = '';
			let htmlLocked = '';
			itemsLevel1?.forEach((item) => {
				htmLUnlock += `
        <div class="shop-flex-box justify-content-between" name="${item.name}" price="${
					item.price
				}">
            <div class="d-flex align-items-center">
                <img src="${checkItemImage(item.img)}" class="icon">
                <div class="buy-flex-box-data w-100">
                    <div class="title">
                        ${item.label}
                    </div>

                </div>
            </div>
            <div class="d-flex align-items-center">
                <div class="price badge badge-price">
                    ${item.price}$
                </div>
                <div class="shop-flex-box-count">
                    <div class="menos btn-cant"> <i class="fa-solid fa-minus"></i> </div>
					<input type="number" class="cant" value="1">
                    <div class="mas btn-cant"> <i class="fa-solid fa-plus"></i> </div>
                </div>

                <div class="btn btn-action-mini me-2 add-cart-button">
                    <i class="fa-solid fa-cart-shopping"></i> AÑADIR
                </div>
            </div>

        </div>
        `;
			});
			othersLevels?.forEach((item) => {
				htmlLocked += `
        <div class="shop-flex-box justify-content-between bloqueado">
            <div class="d-flex align-items-center">
                <img src="${checkItemImage(item.img)}   " class="icon">
                <div class="buy-flex-box-data w-100">
                    <div class="title">
                        ${item.label}
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <div class="price badge bg-dark  me-2">
                    NIVEL ${item.level}
                </div>
            </div>
        </div>
        `;
			});

			$('.local .dark-content.shop-articulos').html(htmLUnlock);
			$('.local .dark-content.shop-articulos').append(htmlLocked);
		}
	});
}

function updateCart() {
	let total = 0;
	let cartHtml = '';
	cart.forEach((item) => {
		total += item.price;
		cartHtml += `
        <div class="shop-flex-box justify-content-between">
        <div class="d-flex align-items-center">
            <i class="fa-solid fa-tags me-1 icon"></i>
            <div class="buy-flex-box-data w-100">
                <div class="title">
                    ${item.label}
                </div>


            </div>
        </div>
        <div class="d-flex align-items-center">
            <div class="price badge badge-acent me-2">
                x${item.amount}
            </div>
            <div class="price badge badge-price">
                ${item.price}$
            </div>
            <div class="delete-item" name="${item.name}">
                <i class="fa-solid fa-trash"></i>
            </div>

        </div>
    </div>
        `;
	});
	$('.local .dark-content.carrito').html(cartHtml);
	$('.local .dark-content.carrito').parent().find('#total-carrito').text(total);

	if (cart.length != 0) {
		$('.local .dark-content.carrito')
			.parent()
			.find('.btn-comprar-carrito')
			.addClass('activo');
	} else {
		$('.local .dark-content.carrito')
			.parent()
			.find('.btn-comprar-carrito')
			.removeClass('activo');
	}
}

$(document).on('click', '.local .dark-content.carrito .delete-item', function () {
	const name = $(this).attr('name');
	$(this)
		.parent()
		.parent()
		.addClass('animate__animated animate__zoomOut animate__faster')
		.one('animationend', () => {
			cart = cart.filter((item) => item.name != name);
			updateCart();
		});
});

$(document).on('click', '.local .btn-load-articles', function () {
	loadLocalItems();
	updateAlmacen();
});

$(document).on('click', '.local .btn-comprar-carrito.activo', confirmarCompra);

function confirmarCompra() {
	OpenModal(
		`CONFIRMAR COMPRA`,
		`<div class="row">

    <div class="col-12 d-flex text-center">
        <div>
        <h5 class="fw-bold mb-3">Vas a realizar un encargo y será entregado en tu negocio por un repartidor.</h5>
        <h4>¿Deseas continuar?</h4>
        </div>
    </div>

</div>`,
		`<button class="btn-modal btn-confirmar-compra">Confirmar</button>`,
		'Cancelar',
		50
	);
}

$(document).on('click', '.btn-confirmar-compra', function () {
	let total = 0;
	cart.forEach((item) => {
		total += item.price;
	});

	// const total = parseInt($("#total-carrito").text().trim());

	cart.forEach((item) => {
		delete item.label;
		delete item.price;
	});

	TriggerCallback('origen_masterjob:server:RequestItems', { items: cart, total }).then(
		(res) => {
			if (res === true) {
				sendNotification(
					'success',
					'Has realizado el encargo correctamente',
					'Un repartidor se encargará de entregarte el pedido en tu negocio.'
				);
			} else {
				sendNotification('error', res);
			}
		}
	);

	CloseModal();
	cart = [];
	updateCart();
});

$(document).on('click', '.local .vender-item', function () {
	const cant = parseInt(
		$(this).parent().find('.cant').text().trim().replace(/\D/g, '')
	);

	const slot = parseInt($(this).attr('slot'));

	const name = $(this).attr('name');

	const label = $(this).parent().parent().find('.title').text();

	let selectCant = '';
	for (let i = 1; i <= cant; i++) {
		selectCant += `<option value="${i}">${i}</option>`;
	}

	OpenModal(
		`Poner artículo en venta`,
		`<div class="row">

            <div class="col-12 text-center">
            <small class="text-center">Si el artículo ya se encuentra a la venta, se sumará la cantidad y se actualizará el precio al nuevo indicado.</small>
            <h3>${label}</h3>
                <label class="mt-3">
                    Cantidad
                </label>
                <select class="form-select cant-select w-100">
                    ${selectCant}
                </select>
                <label  class="mt-3">
                    Precio por unidad
                </label>
                <input type="number" class="form-control price-input w-100" min="1" name="${name}" slot="${slot} placeholder="Precio de venta">
                <div class="error d-none text-danger text-uppercase mt-2">El precio debe ser mayor a 0</div>
            </div>

        </div>`,
		`<button class="btn-modal btn-vender-item clickable">Confirmar</button>`,
		'Cancelar',
		40
	);
});

$(document).on('click', '.btn-vender-item.clickable', function () {
	$(this).removeClass('clickable');
	const yo = $(this);
	$('.c-modal .error').addClass('d-none');
	const cant = parseInt($('.cant-select').val());
	const price = parseInt($('.price-input').val());
	const name = $('.price-input').attr('name');
	const slot = parseInt($('.price-input').attr('slot'));

	if (!price || price <= 0) {
		$('.c-modal .error').removeClass('d-none');
		yo.addClass('clickable');
	} else {
		TriggerCallback('origen_masterjob:server:PutOnShop', {
			item: name,
			amount: cant,
			price,
			slot
		}).then((cb) => {
			if (cb && cb == true) {
				updateAlmacen();
				CloseModal();

				sendNotification(
					'success',
					'Has puesto el artículo en venta correctamente',
					'Ahora los clientes podrán comprarlo en tu negocio.'
				);
			} else {
				sendNotification('error', cb);
				CloseModal();
			}
		});
	}
});

function checkItemImage(img) {
	var isValid = validURL(img);
	let url;
	if (isValid) {
		url = img;
	} else {
		url = 'https://cfx-nui-qb-inventory/html/images/' + img;
	}
	return url;
}

function validURL(str) {
	if (str.startsWith('https://') || str.startsWith('http://')) {
		return true;
	} else {
		return false;
	}
}

function updateAlmacen() {
	let almacenAccesible = true;
	// if(almacenAccesible){

	//     });

	// } else {
	//     $(".items-almacen").html(`
	//     <div class="w-100 h-100 d-flex justify-content-center flex-column text-center align-items-center">
	//         <h4>Alguien está usando el almacén en este momento</h4>
	//     </div>
	//     `);
	// }
	exportEvent('origen_masterjob', 'GetStashItems', {}).done((cb) => {

		if (Array.isArray(cb)) {
			cb = cb;
		} else if (typeof cb === 'object') {
			cb = Object.values(cb);
		}

		if (cb && cb.length > 0) {
			let html = '';

			cb.map((item) => {
				html += `
            <div class="shop-flex-box justify-content-between flex-wrap">
                <div class="d-flex align-items-center">
                    <img src="${checkItemImage(item.image)}" class="icon">
                    <div class="buy-flex-box-data w-100">
                        <div class="title">
                            ${item.label}
                        </div>

                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="cant badge badge-acent me-2">
                        x${item.amount}
                    </div>


                    <div class="btn btn-action-mini me-2 vender-item" name="${
						item.name
					}" slot="${item.slot}">
                        <i class="fa-solid fa-cart-shopping"></i> PONER EN VENTA
                    </div>
                </div>
                <hr class="w-100 m-0 ms-2 me-2">
                <div class="d-flex w-100">
                    <div class="description">
                        ${item.description}
                    </div>
                </div>

            </div>
            `;
			});
			$('.items-almacen').html(html);
		} else {
			$('.items-almacen').html(`
         <div class="w-100 h-100 d-flex justify-content-center flex-column text-center align-items-center">
             <h4>El almacén está vacío</h4>
         </div>
         `);
		}
	});
}

$(document).on('click', '.local .btn-action.fichar.accesible', function () {
	const status = $(this).attr('status');
	$(this).removeClass('accesible');
	let state = status === 'on' ? false : true;
	TriggerCallback('origen_masterjob:server:Duty', { state }).then((cb) => {
		if (cb) {
			if (status == 'on') {
				$(this).find('.fichar-label').text('FICHAR ENTRADA');
				$(this).attr('status', 'off');
				sendNotification(
					'success',
					'Has terminado el turno',
					'¡Hasta la próxima!'
				);
			} else {
				$(this).find('.fichar-label').text('FICHAR SALIDA');
				$(this).attr('status', 'on');
				sendNotification('success', 'Has comenzado el turno');
			}
		} else {
			sendNotification(
				'error',
				'Ha ocurrido un error',
				'Consulta con la administración'
			);
		}
	});

	setTimeout(() => {
		$(this).addClass('accesible');
	}, 1000);
});

$(document).on('click', '.local .btn-salario', function () {
	const grade = $(this).attr('rango');
	const value = parseInt($(this).parent().find('.input-salario').val());
	if (grade != null && value > 0) {
		TriggerCallback('origen_masterjob:server:UpdateGrade', {
			grade,
			attr: 'pay',
			value
		}).done((cb) => {
			if (cb === true) {
				sendNotification(
					'success',
					'Se ha cambiado el salario del rango correctamente'
				);
			} else if (cb === false) {
				sendNotification('error', 'Ha ocurrido un error al guardar el salario');
			} else {
				sendNotification('error', cb);
			}
		});
	} else {
		sendNotification('error', 'El salario no puede estar a 0');
	}
});

function setServicio(status) {
	if (!status) {
		$('.btn-action.fichar .fichar-label').text('FICHAR ENTRADA');
		$('.btn-action.fichar').attr('status', 'off');
	} else {
		$('.btn-action.fichar .fichar-label').text('FICHAR SALIDA');
		$('.btn-action.fichar').attr('status', 'on');
	}
}

// localData.open = true;

function setOpen(status) {
	if (status) {
		$('.local .zona-apertura').addClass('n-abierto');
	} else {
		$('.local .zona-apertura').removeClass('n-abierto');
	}
}

$(document).on('click', '.local .zona-apertura.clickable .cerrado', function () {
	s_click.currentTime = '0';
	s_click.play();
	if (canAccess('apertura')) {
		$('.local .zona-apertura').removeClass('clickable');

		TriggerCallback('origen_masterjob:server:ChangeOpenState', { state: 1 }).then(
			(cb) => {
				if (cb) {
					$('.local .zona-apertura').addClass('n-abierto');

					sendNotification('success', 'Negocio abierto al público');
				} else {
					sendNotification(
						'error',
						'Ha ocurrido un error',
						'Consulta con la administración'
					);
				}
			}
		);

		setTimeout(() => {
			$('.local .zona-apertura').addClass('clickable');
		}, 2000);
	}
});

$(document).on('click', '.local .zona-apertura.clickable .cerrar-negocio', function () {
	s_click.currentTime = '0';
	s_click.play();

	if (canAccess('apertura')) {
		$('.local .zona-apertura').removeClass('clickable');

		TriggerCallback('origen_masterjob:server:ChangeOpenState', { state: 0 }).then(
			(cb) => {
				if (cb) {
					$('.local .zona-apertura').removeClass('n-abierto');
					sendNotification('success', 'Negocio cerrado al público');
				} else {
					sendNotification(
						'error',
						'Ha ocurrido un error',
						'Consulta con la administración'
					);
				}
			}
		);

		setTimeout(() => {
			$('.local .zona-apertura').addClass('clickable');
		}, 2000);
	}
});

let canAnnounce = true;

$(document).on('click', '.local .zona-apertura.clickable .reapertura', function () {
	s_click.currentTime = '0';
	s_click.play();
	if (canAnnounce) {
		canAnnounce = false;
		TriggerCallback('origen_masterjob:server:ChangeOpenState', { state: 1 }).then(
			(cb) => {
				if (cb) {
					$('.local .zona-apertura').addClass('n-abierto');

					sendNotification('success', 'Has anunciado la reapertura');
				} else {
					sendNotification(
						'error',
						'Ha ocurrido un error',
						'Consulta con la administración'
					);
				}
			}
		);
		setTimeout(() => {
			canAnnounce = true;
		}, 10000);
	} else {
		sendNotification('error', 'Ya has anunciado recientemente la apertura');
	}
});

$(document).on('click', '.local .zona-apertura.clickable .llamar-tendero', function () {
	s_click.currentTime = '0';
	s_click.play();
	$('.local .zona-apertura').removeClass('clickable');

	TriggerCallback('origen_masterjob:server:CallShopNPC', {}).then((cb) => {
		if (cb == true) {
			sendNotification(
				'success',
				'Has llamado al tendero para que vuelva a su puesto'
			);
		} else {
			sendNotification('error', cb);
		}
	});

	setTimeout(() => {
		$('.local .zona-apertura').addClass('clickable');
	}, 2000);
});

$(document).on('click', '.local .decorar', function () {
	closeMenu();
	fetch('ExecuteCommand', {
		command: 'decorate'
	});
});

$(document).on('click', '.local .gestion-articulos', function () {
	TriggerCallback('origen_masterjob:server:GetShopItems', {}).done((cb) => {
		let items = '';
		if (cb.length > 0) {
			cb.map((item) => {
				items += `
                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" item="${item.name}" productid="${item.productid}" amount="${item.amount}">
                    <div><i class="fa-solid fa-tags"></i> ${item.label} (x${item.amount})</div>
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="text-success me-3"><input style="width:7vh;text-align:center;" value="${item.price}$" class="form-control price" type="text" placeholder="Precio"></div>
                        <div class="btn btn-action" onclick="deleteItem($(this))"><i class="fas fa-trash-alt delete-item" aria-hidden="true"></i></div>
                    </div>
                </li>
                `;
			});
		} else {
			items = `
            <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <i>No hay productos a la venta</i>
            </li>
            `;
		}
		OpenModal(
			'Artículos en venta',
			`
        <ul class="list-group multas-list mt-2 list-items">
            ${items}
        </ul>

        `,
			'',
			'Volver',
			55
		);
	});
});

function deleteItem(item) {
	const productid = item.parent().parent().attr('productid');
	const name = item.parent().parent().attr('item');
	const amount = parseInt(item.parent().parent().attr('amount'));
	TriggerCallback('origen_masterjob:server:RemoveShopItem', {
		id: productid,
		item: name,
		amount
	}).done((cb) => {
		if (cb === true) {
			updateAlmacen();
			sendNotification('success', 'Has eliminado el producto correctamente');
			item.parent().parent().remove();
		} else {
			sendNotification('error', cb);
		}
	});

}

let auxNum;

$(document).on('focusin', '.list-items .list-group-item .price', function () {
	const inputValue = $(this).val();
	let numericValue = Number(inputValue.replace('$', ''));
	auxNum = numericValue;
	$(this).val(numericValue);
});

$(document).on('focusout', '.list-items .list-group-item .price', function () {
	let numericValue = parseInt($(this).val(), 10);
	const id = $(this).parent().parent().parent().attr('productid');
	const yo = $(this);
	if (auxNum == numericValue) {
		yo.val(auxNum + '$'); // Valor predeterminado si no es un número válido

		return;
	}
	if (isNaN(numericValue)) {
		yo.val(auxNum + '$'); // Valor predeterminado si no es un número válido
		sendNotification('error', 'El valor ingresado no es válido');
	} else {
		TriggerCallback('origen_masterjob:server:ModifyShopItem', {
			id: id,
			key: 'price',
			value: numericValue
		}).done((cb) => {
			if (cb === true) {
				sendNotification(
					'success',
					'Has modificado el precio del producto correctamente'
				);
				yo.val(numericValue + '$');
			} else {
				sendNotification('error', cb);
				yo.val(auxNum + '$');
			}
		});
	}
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

function canAccess(app, action) {
	let access = false;

	if (localData.grades[myGrade].boss) {
		access = true;
	}
	if (app == 'local-settings' && localData.grades[myGrade].rrhh) {
		access = true;
	}

	if (app == 'local-articles' && localData.grades[myGrade].articles) {
		access = true;
	}

	if (app == 'apertura' && localData.grades[myGrade].openclose) {
		access = true;
	}

	if (app == 'local-home') {
		access = true;
	}

	if (app == 'local-reports') {
		access = true;
	}

	if (app == 'jefe' && localData.grades[myGrade].boss) {
		access = true;
	}

	if (app == 'rrhh' && localData.grades[myGrade].rrhh) {
		access = true;
	}

	if (app == 'safebox' && localData.grades[myGrade].safebox) {
		access = true;
	}

	if (!access && !action) {
		sendNotification('error', 'No cuentas con permisos suficientes');
	}

	return access;
}

$(document).on('click', '.expulsar-servicio', function () {
	const citizenid = $(this).attr('citizenid');
	TriggerCallback('origen_masterjob:server:Duty', { state: false, citizenid }).then(
		(cb) => {
			if (cb === true) {
				sendNotification(
					'success',
					'Has expulsado de servicio a esta persona correctamente'
				);
			} else {
				sendNotification(
					'error',
					'Ha ocurrido un error al expulsar de servicio a esta persona.'
				);
			}
		}
	);
});

$(document).on('click', '.local .transfer-menu .ingresar', function () {
	OpenModal(
		'Ingresar dinero en el negocio',
		`
	<div class="text-center mb-3">
		Vas a realizar un ingreso en el negocio desde tu cuenta bancaria.
		¡Recuerda disponer del saldo necesario para realizar la transferencia!
	</div>
	<label>Cantidad a ingresar</label>
	<input class="form-control w-100 text-center cant-dinero" type="number" placeholder="Introduce la cantidad">

	`,
		`<div class="btn-modal" onClick="localFunctions.addMoney()">Realizar ingreso</div>`,
		'Volver',
		65
	);
});

$(document).on('click', '.local .transfer-menu .retirar', function () {
	OpenModal(
		'Retirar dinero del negocio',
		`
	<div class="text-center mb-3 text-uppercase">
		Capital actual:
		<h1 class="text-success bankgothic">${localData.money}$</h1>
	</div>
	<label>Cantidad a ingresar</label>
	<input class="form-control w-100 text-center cant-dinero" placeholder="Introduce la cantidad" type="number">
	<small class="mt-3 w-100 text-center d-block">Recuerda que el dinero será ingresado en tu cuenta bancaria personal.</small>
	`,
		`<div class="btn-modal" onClick="localFunctions.removeMoney()">Retirar</div>`,
		'Volver',
		65
	);
});
