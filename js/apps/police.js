let actualEvidence;
let intervalAlert;
let frecuenciaActual;
let cargoSolicitudes = true;
citizenSelectorFunctions = {
	getCB: undefined,
	loadSelectorFunctions: () => {
		$(document).on('click', '.police .personas-container .close-button', function () {
			$(this).parent().removeClass('scale-in').addClass('scale-out');
			$('.police .personas-container').fadeOut(300);
		});

		$(document).on('click', '.police .btn-search-citizen-selector', function () {
			policeFunctions.searchCitizen(this, true);
		});

		$(document).on(
			'keydown',
			'.police .input-search-citizen-selector',
			function (event) {
				var keycode = event.keyCode ? event.keyCode : event.which;
				if (keycode == '13') {
					policeFunctions.searchCitizen(this, true);
				}
			}
		);

		$(document).on('click', '.police .citizen-box', function () {
			let citizenName = $(this).find('.citizen-name').text().trim();
			let citizenid = $(this).find('.citizen-id').text().trim();
			if (citizenSelectorFunctions.getCB) {
				citizenSelectorFunctions.getCB(citizenName, citizenid);
			}
		});
	},

	showAddPersona: function (cb, type) {
		if (type) {
			if (type == 'police') {
				$('.police .personas-container .app-title').text(
					'Selecciona a un agente'
				);
				$('.police .personas-box .btn-search-citizen-selector').attr(
					'data-type',
					'police'
				);
				$('.police .personas-box .input-search-citizen-selector').attr(
					'placeholder',
					'Buscar agente...'
				);
			}
		} else {
			$('.police .personas-box .btn-search-citizen-selector').attr(
				'data-type',
				'persona'
			);
			$('.police .personas-container .app-title').text('Selecciona a un ciudadano');
			$('.police .personas-box .input-search-citizen-selector').attr(
				'placeholder',
				'Buscar ciudadano...'
			);
		}
		$('.police .personas-box .citizen-box-list .row').html(`
        <div class="col-12 text-muted">
            <h4 class="citizen-name">Introduce un nombre en el buscador para mostrar los resultados</h4>
        </div>`);
		$('.police .personas-box .input-search-citizen-selector').val('');

		$('.police .personas-box').removeClass('scale-out').addClass('scale-in');
		$('.police .personas-container').fadeIn(300);

		citizenSelectorFunctions.getCB = cb;
	}
};

vehicleSelectorFunctions = {
	getCB: undefined,
	loadSelectorFunctions: () => {
		$(document).on(
			'click',
			'.police .vehiculos-container .close-button',
			function () {
				$(this).parent().removeClass('scale-in').addClass('scale-out');
				$('.police .vehiculos-container').fadeOut(300);
			}
		);

		$(document).on(
			'click',
			'.police .evidencias-container .close-button',
			function () {
				$(this).parent().removeClass('scale-in').addClass('scale-out');
				$('.police .evidencias-container').fadeOut(300);
			}
		);

		$(document).on('click', '.police .btn-search-vehicle-selector', function () {
			vehicleSelectorFunctions.searchVehicle();
		});

		$(document).on(
			'keydown',
			'.police .input-search-vehicle-selector',
			function (event) {
				var keycode = event.keyCode ? event.keyCode : event.which;
				if (keycode == '13') {
					vehicleSelectorFunctions.searchVehicle();
				}
			}
		);

		$(document).on(
			'click',
			'.police .vehiculos-container .vehicle-box-item',
			function () {
				let vehiclePlate = $(this)
					.find('.vehicle-plate-result span')
					.text()
					.trim();
				let vehicleName = $(this).find('.vehicle-name span').text().trim();
				if (vehicleSelectorFunctions.getCB) {
					vehicleSelectorFunctions.getCB(vehiclePlate, vehicleName);
					$('.police .vehiculos-container .personas-box')
						.removeClass('scale-in')
						.addClass('scale-out');
					$('.police .vehiculos-container').fadeOut(300);
				}
			}
		);
	},
	showAddVehicle: function (cb) {
		$('.police .vehiculos-container .input-search-vehicle-selector').val('');
		$('.police .vehiculos-container .vehicle-box-list .row').html(`
            <div class="col-12 text-muted">
                <h4 class="vehicle-name">Introduce una matrícula en el buscador para mostrar los resultados</h4>
            </div>`);
		$('.police .vehiculos-container .personas-box')
			.removeClass('scale-out')
			.addClass('scale-in');
		$('.police .vehiculos-container').fadeIn(300);

		vehicleSelectorFunctions.getCB = cb;
	},

	searchVehicle: function () {
		const plate = $('.police .personas-box .input-search-vehicle-selector').val();
		if (plate.length > 0) {
			$('.police .vehiculos-container .vehicles-box-list .row').fadeOut(
				300,
				function () {
					$(this).html('');
					TriggerCallback('origen_menu:police:SearchVehicle', {
						plate
					}).done((cb) => {
						if (cb && cb.length > 0) {
							cb.forEach((vehicle, index) => {
								$('.police .vehiculos-container .vehicles-box-list .row')
									.append(`
                            <div class="col-12 mb-1">
                                <div class="vehicle-box-item">
                                        <div class="vehicle-plate-result w-100"><span>${vehicle.plate}</span></div>
                                        <div class="vehicle-name w-50"><i class="fas fa-car-alt"></i> <span>${vehicle.label}</span></div>
                                        <div class="vehicle-owner w-50"><i class="fas fa-user"></i> <span>${vehicle.owner}</span></div>
                                    </div>
                            </div>`);
							});
						} else {
							$('.police .vehiculos-container .vehicles-box-list .row')
								.html(`
                        <div class="col-12 text-muted">
                            <h4 class="vehicle-name">No se han encontrado resultados</h4>
                        </div>`);
						}
						$('.police .vehiculos-container .vehicles-box-list .row').fadeIn(
							300
						);
					});
				}
			);
		}
	}
};

codigoPenalFunctions = {
	loadCPFunctions: function () {
		fetch('LoadPolicePage', { page: 'penalcode' }).done((cb) => {
			if (cb.boss) {
				$('.police .app-codigo-penal .app-title button').removeClass('d-none');
				$('.police .app-codigo-penal .h-accion').removeClass('d-none');
				$('.police .app-codigo-penal .td-accion').removeClass('d-none');
			} else {
				$('.police .app-codigo-penal .app-title button').addClass('d-none');
				$('.police .app-codigo-penal .h-accion').addClass('d-none');
				$('.police .app-codigo-penal .td-accion').addClass('d-none');
				$(document).off(
					'dblclick',
					'.police .app-codigo-penal .tabla-codigo-penal tbody tr td span'
				);
			}
		});
	},
	loadCodigoPenalFunctions: () => {
		$(document).on('click', '.police .btn-codigopenal', function () {
			policeFunctions
				.policeNavigation('C. Penal', $('.police-codigopenal').html())
				.then(() => {
					codigoPenalFunctions.loadTabla(0);
					codigoPenalFunctions.loadCPFunctions();
				});
		});

		//Evento que se ejecuta al introducir un texto en el buscador de la sección de código penal.
		$(document).on('keyup', '.police .app-codigo-penal .search-cp', function () {
			let search = $(this).val().toLowerCase();
			if (search.length > 0) {
				//Busca las coincidencias en la tabla del código penal, para las celdas td-articulos y td-descripcion y oculta las que no coincidan.
				$('.police .app-codigo-penal .tabla-codigo-penal tbody tr').each(
					function () {
						let articulo = $(this).find('.td-articulo').text().toLowerCase();
						let descripcion = $(this)
							.find('.td-descripcion')
							.text()
							.toLowerCase();
						if (articulo.includes(search) || descripcion.includes(search)) {
							$(this).fadeIn(300);
						} else {
							$(this).fadeOut(300);
						}
					}
				);
			} else {
				//Si no hay texto en el buscador, muestra todas las filas de la tabla.
				$('.police .app-codigo-penal .tabla-codigo-penal tbody tr').fadeIn(300);
			}
		});

		//Evento que se ejecuta al hacer doble click en cualquier td de la tabla del código penal.
		$(document).on(
			'dblclick',
			`.police .app-codigo-penal .tabla-codigo-penal tbody tr .td-articulo,
            .police .app-codigo-penal .tabla-codigo-penal tbody tr .td-descripcion,
            .police .app-codigo-penal .tabla-codigo-penal tbody tr .td-importe,
            .police .app-codigo-penal .tabla-codigo-penal tbody tr .capitulos,
            .police .app-codigo-penal .tabla-codigo-penal tbody tr .td-pena`,
			function () {
				let val = $(this).find('span').text();
				$(this)
					.html(
						`
                <input rows="1" class="input-table-cp" value="${val}">
            `
					)
					.find('.input-table-cp')
					.focus();
			}
		);

		$(document).on(
			'focusout',
			'.police .app-codigo-penal .tabla-codigo-penal tbody tr td .input-table-cp',
			function () {
				let val = $(this).val();

				const idart = parseInt($(this).parent().parent().attr('index'));
				const idcap = $(this).parent().parent().attr('id-cap');

				$(this).parent().html(val);

				if (val.length > 0) {
					if (idart) {
						const title = $(
							".police .tab .app-codigo-penal tr[index='" + idart + "']"
						)
							.find('.td-articulo')
							.text()
							.trim();
						// const title = $(this)
						//     .parent()
						//     .parent()
						//     .find(".td-articulo")
						//     .text()
						//     .trim();
						const description = $(
							".police .tab .app-codigo-penal tr[index='" + idart + "']"
						)
							.find('.td-descripcion')
							.text()
							.trim();

						const price = parseInt(
							$(".police .tab .app-codigo-penal tr[index='" + idart + "']")
								.find('.td-importe')
								.text()
								.trim()
						);

						const month = parseInt(
							$(".police .tab .app-codigo-penal tr[index='" + idart + "']")
								.find('.td-pena')
								.text()
								.trim()
						);


						TriggerCallback('origen_police:callback:UpdatePenalCode', {
							type: 'edit-art',
							title,
							description,
							price,
							month,
							cap: parseInt(idcap),
							id: parseInt(idart)
						}).done((cb) => {
							// console.log(cb);
							if (cb) {
								codigoPenalFunctions.loadTabla(0);
							}
						});
					} else {
						const description = val;
						// console.log({
						//     type: "edit-cap",
						//     cap: idcap,
						//     description,
						// });
						TriggerCallback('origen_police:callback:UpdatePenalCode', {
							type: 'edit-cap',
							id: parseInt(idcap),
							title: description
						}).done((cb) => {
							if (cb) {
								codigoPenalFunctions.loadTabla(0);
							}
						});
					}
				}
				// $(this).parent().html(`
				//     <span>${val}</span>
				// `);
			}
		);
		$(document).on('click', '.police .app-codigo-penal .add-capitulo', function () {
			OpenModal(
				`Crea un nuevo capítulo`,
				`
                <div class="row">

                    <div class="col-12">
                        <input class="form-control w-100 input-nuevo-capitulo" placeholder="Nombre del capítulo">
                    </div>
                </div>
            `,
				`<button class="btn-modal" onclick="codigoPenalFunctions.saveCapitulo()">Guardar capítulo</button>`,
				'Cancelar'
			);
		});

		$(document).on('click', '.police .app-codigo-penal .add-articulo', function () {
			let capitulos = '';
			$(
				'.police ' +
					policeTabSelected +
					' .app-codigo-penal .tabla-codigo-penal tbody .capitulos'
			).each(function () {
				capitulos += `<option value="${$(this).parent().attr('id-cap')}">${$(this)
					.text()
					.trim()}</option>`;
			});
			OpenModal(
				`Crea un nuevo artículo`,
				`
                <label>Selecciona un capítulo</label>
                <select class="form-select w-100 select-capitulo">
                    <option value="0">Selecciona un capítulo</option>
                    ${capitulos}
                </select>
                <label class="mt-3">Nombre del artículo</label>
                <input class="form-control w-100 input-n-articulo" placeholder="Introduce el nombre">
                <label class="mt-3">Descripción del artículo</label>
                <textarea class="form-control w-100 input-descripcion-articulo" placeholder="Introduce la descripción"></textarea>
                <div class="row mt-3">
                    <div class="col-6">
                        <label>Importe</label>
                        <input type="number" min="0" class="form-control text-center w-100 input-importe-articulo">
                    </div>
                    <div class="col-6">
                        <label>Pena (Meses)</label>
                        <input type="number" min="0" class="form-control text-center w-100 input-pena-articulo">
                    </div>
                </div>
            `,
				`<button class="btn-modal" onclick="codigoPenalFunctions.saveArticulo()">Guardar artículo</button>`,
				'Cancelar'
			);
		});
	},
	saveCapitulo: () => {
		// const id = $(".c-modal .input-n-capitulo").val().trim();
		const title = $('.c-modal .input-nuevo-capitulo').val().trim();
		if (title.length > 2) {
			TriggerCallback('origen_police:callback:UpdatePenalCode', {
				title,
				type: 'new-cap'
			}).done((cb) => {
				if (cb) {
					CloseModal();
					codigoPenalFunctions.loadTabla(0);
				}
			});
			// console.log("VALIDO", id, title)
		}
	},
	saveArticulo: () => {
		const id = $('.c-modal .select-capitulo').val().trim();
		const title = $('.c-modal .input-n-articulo').val().trim();
		const desc = $('.c-modal .input-descripcion-articulo').val().trim();
		const importe = parseInt($('.c-modal .input-importe-articulo').val().trim());
		const pena = parseInt($('.c-modal .input-pena-articulo').val().trim());
		// console.log(title.length, desc.length, pena.length, importe.length, id, parseInt($(".c-modal .input-importe-articulo").val().trim()))
		if (title.length > 2 && desc.length > 0 && pena >= 0 && importe >= 0 && id != 0) {
			// console.log("ENTRO");
			TriggerCallback('origen_police:callback:UpdatePenalCode', {
				title: title,
				description: desc,
				price: importe,
				month: pena,
				cap: parseInt(id),
				type: 'new-art'
			}).done((cb) => {
				// console.log(cb);
				if (cb) {
					CloseModal();
					codigoPenalFunctions.loadTabla(0);
				} else {
					sendNotification(
						'error',
						'Ha ocurrido un error al añadir el artículo',
						'Consulta con la administración'
					);
				}
			});
		} else {
			sendNotification('error', 'Rellena todos los datos para continuar');
		}
	},
	loadTabla: (type) => {
		TriggerCallback('origen_police:callback:GetPenalCode', {}).done((cb) => {
			const classHtml = !type
				? '.police .app-codigo-penal .tabla-codigo-penal tbody'
				: '.police .multas-container .tabla-codigo-penal-multas tbody';
			$(classHtml).html('');
			Object.entries(cb).map(([key, value]) => {
				$(classHtml).append(`
                <tr id-cap="${value.id}">
                    <td colspan="${!type ? 4 : 5}" class="text-center capitulos">
                        <span>${value.title}</span>
                    </td>
                    ${
						!type
							? `
                        <td class="td-accion">
                            <button class="btn btn-table w-100 h-100 btn-delete-articulo"
                            onclick="codigoPenalFunctions.deleteCP(0, '${key}')">Eliminar</button>
                        </td>
                    `
							: ''
					}

                </tr>
                `);
				value.arts.map((article, index) => {
					$(classHtml).append(`
                    <tr index="${article.id}" id-cap="${value.id}">
                        <td class="td-articulo">
                            <span>${article.title}</span>
                        </td>
                        <td class="td-descripcion">
                            <span>${article.description}</span>
                        </td>
                        <td class="td-importe">
                            <span>${article.price}</span>
                        </td>
                        <td class="td-pena no-wrap">
                            <span>${article.month} Meses</span>
                        </td>
                        <td class="td-accion">
                            <button class="btn btn-table w-100 h-100 ${
								!type ? 'btn-delete-articulo' : 'btn-add-articulo'
							}" ${
						!type
							? `onclick="codigoPenalFunctions.deleteCP(1, '${value.id}', ${article.id})"`
							: ''
					}>${!type ? 'Eliminar' : 'Añadir'}</button>
                        </td>


                    </tr>
                    `);
				});
			});
		});
	},
	deleteCP: (type, cap, art) => {
		let title = '';
		let description = '';
		if (type == 0) {
			title = 'Eliminar capítulo';
			description = '¿Estás seguro de que quieres eliminar este capítulo?';
		} else {
			title = 'Eliminar artículo';
			description = '¿Estás seguro de que quieres eliminar este artículo?';
		}
		OpenModal(
			title,
			description,
			`<button class="btn-modal" onclick="codigoPenalFunctions.deleteCPConfirm(${type}, '${cap}', ${art})">Eliminar</button>`,
			'Cancelar'
		);
	},
	deleteCPConfirm: (type, cap, art) => {
		let data = {};
		if (type == 0) {
			data = { type: 'delete-cap', id: parseInt(cap) };
		} else {
			data = {
				type: 'delete-art',
				cap: parseInt(cap),
				id: parseInt(art)
			};
		}
		TriggerCallback('origen_police:callback:UpdatePenalCode', data).done((cb) => {
			// console.log(cb);
			if (cb) {
				CloseModal();
				codigoPenalFunctions.loadTabla(0);
			}
		});
	}
};

vehiclesSectionFunctions = {
	loadVehiclesFunctions: () => {
		$(document).on('click', '.police .btn-vehicles', function () {
			policeFunctions.policeNavigation('Vehículos', $('.police-vehicles').html());
		});
	}
};

informesFunctions = {
	loadInformesFunctions: () => {
		$(document).on('click', '.btn-police-reports', function () {
			policeFunctions.policeNavigation('Informes', $('.police-reports').html());
			setTimeout(() => {
				informesFunctions.loadReports();
			}, 500);
		});

		//BUSCAR INFORMES AL PULSAR EN btn-search-reports
		$(document).on('click', '.police .btn-search-report', function () {
			informesFunctions.searchReport();
		});

		//BUSCAR INFORMES AL PULSAR ENTER EN EL INPUT DE BUSQUEDA
		$(document).on('keyup', '.police .input-search-report', function (e) {
			if (e.keyCode == 13) {
				informesFunctions.searchReport();
			}
		});

		//FILTRAR POR TAGS
		$(document).on('change', '.police .select-tags-filter', function () {
			if ($(this).val() != 0) {
				informesFunctions.searchReport($(this).val());
			} else {
				informesFunctions.searchReport();
			}
		});

		$(document).on('click', '.police .report-list .report', function () {
			const reportid = $(this).find('.report-name span').text().replace('#', '');

			//Realiza un fadeOut a la clase informe-report de la pestaña actual y un TriggerCallback al evento GetReport enviando como parámetro reportid. Cuando se reciba la respuesta, todo el html de la clase informe-report es sustituido por el mismo html pero rellenando los datos recibidos
			informesFunctions.loadInforme(reportid);
		});
		$(document).on('click', '.police .informes .add-informe', function () {
			informesFunctions.crearInforme();
		});
		$(document).on('click', '.police .informes .add-persona', function () {
			citizenSelectorFunctions.showAddPersona(informesFunctions.addPersonaInforme);
		});
		$(document).on('click', '.police .informes .multa-button', function () {
			const name = $(this).parent().find('.persona-name').text().trim();
			const cid = $(this).parent().data('id');
			codigoPenalFunctions.loadTabla(1);
			multasFunctions.openBill(
				'informe',
				informesFunctions.addMultaInforme,
				name,
				cid
			);
		});
		$(document).on(
			'click',
			'.police .informes .multas-list .delete-button',
			function () {
				yo.parent()
					.removeClass('scale-in')
					.addClass('scale-out')
					.fadeOut(300, function () {
						$(this).remove();
						informesFunctions.updatePersonasInvolucradas();

						if (
							$(
								'.police ' +
									policeTabSelected +
									' .informes .multas-list li'
							).length == 0
						) {
							$('.police ' + policeTabSelected + ' .informes .multas-list')
								.html(`
                    <li class="list-group-item list-group-item-action no-notes scale-in">
                        <h5>No hay personas involucradas</h5>
                    </li>`);
						}
					});
			}
		);

		$(document).on(
			'click',
			'.police .informes .agentes-list .delete-button',
			function () {
				$(this)
					.parent()
					.removeClass('scale-in')
					.addClass('scale-out')
					.fadeOut(300, function () {
						$(this).remove();
						informesFunctions.updateAgentes();
						if (
							$(
								'.police ' +
									policeTabSelected +
									' .informes .agentes-list li'
							).length == 0
						) {
							$('.police ' + policeTabSelected + ' .informes .agentes-list')
								.html(`
                    <li class="list-group-item list-group-item-action no-notes scale-in">
                        <h5>No hay agentes involucrados</h5>
                    </li>`);
						}
					});
			}
		);

		$(document).on(
			'click',
			'.police .informes .victimas-list .delete-button',
			function () {
				$(this)
					.parent()
					.removeClass('scale-in')
					.addClass('scale-out')
					.fadeOut(300, function () {
						$(this).remove();
						informesFunctions.updateVictimas();
						if (
							$(
								'.police ' +
									policeTabSelected +
									' .informes .victimas-list li'
							).length == 0
						) {
							$(
								'.police ' +
									policeTabSelected +
									' .informes .victimas-list'
							).html(`
                    <li class="list-group-item list-group-item-action no-notes scale-in">
                        <h5>No hay victimas involucradas</h5>
                    </li>`);
						}
					});
			}
		);

		$(document).on(
			'click',
			'.police .informes .vehiculos-list .delete-button',
			function () {
				$(this)
					.parent()
					.parent()
					.removeClass('scale-in')
					.addClass('scale-out')
					.fadeOut(300, function () {
						$(this).remove();
						informesFunctions.updateVehiculos();
						if (
							$(
								'.police ' +
									policeTabSelected +
									' .informes .vehiculos-list li'
							).length == 0
						) {
							$(
								'.police ' +
									policeTabSelected +
									' .informes .vehiculos-list'
							).html(`
                    <li class="list-group-item list-group-item-action no-notes scale-in">
                        <h5>No hay vehiculos involucrados</h5>
                    </li>`);
						}
					});
			}
		);

		$(document).on('click', '.police .informes .add-agente', function () {
			citizenSelectorFunctions.showAddPersona(
				informesFunctions.addAgenteInforme,
				'police'
			);
		});

		$(document).on('click', '.police .informes .evidence img', function () {
			const img = $(this).attr('src');
			$('.police .informe-view img').attr('src', img);
			$('.police .informe-view').fadeIn(300);
		});

		$(document).on(
			'click',
			'.police .informes .evidence .delete-evidence',
			function () {
				actualEvidence = $(this).parent().parent();
				OpenModal(
					`ATENCIÓN`,
					`<div class="row">
                <div class="col-1">
                    <img src="./img/webp/trash.webp" class="img-fluid">
                </div>
                <div class="col-11 d-flex align-items-center">
                    <div>
                    <h5 class="text-danger fw-bold mb-3">Esta acción eliminará la evidencia de manera definitiva.</h5>
                    <h4>¿Deseas continuar?</h4>
                    </div>
                </div>

            </div>`,
					`<button class="btn-modal" onclick="informesFunctions.deleteEvidence()">Confirmar</button>`,
					'Cancelar'
				);
			}
		);

		$(document).on('click', '.police .informes .add-victima', function () {
			citizenSelectorFunctions.showAddPersona(informesFunctions.addVictimaInforme);
		});

		$(document).on('click', '.police .informes .add-vehicle', function () {
			vehicleSelectorFunctions.showAddVehicle(informesFunctions.addVehicleInforme);
		});

		$(document).on('click', '.police .informes .add-prueba', function () {
			informesFunctions.showAddEvidence();
		});

		$(document).on(
			'click',
			'.police .evidencias-container .evidence-box',
			function () {
				const slot = $(this).data('slot');
				const name = $(this).data('name');
				const img = $(this).data('img');
				TriggerCallback('origen_menu:server:RemoveItem', {
					slot,
					name,
					amount: 1
				}).done((cb) => {
					if (cb) {
						$('.police ' + policeTabSelected + ' .informes .row.evidences')
							.append(`
                    <div class="col-4 pt-2 scale-in">
                        <div class="evidence">
                            <img src="${img}">
                            <button class="btn text-white p-0 mt-2 delete-evidence"><i class="lni lni-trash-can"></i></button>
                        </div>
                    </div>
                    `);
						$('.police .evidencias-container .personas-box')
							.removeClass('scale-in')
							.addClass('scale-out');
						$('.police .evidencias-container').fadeOut(300);
						informesFunctions.updateEvidencias();
					} else {
						informesFunctions.showAddEvidence();
					}
				});
			}
		);

		$(document).on('click', '.police .informe-view', function () {
			$(this).fadeOut(300);
		});

		$(document).on('change', '.police .informes .select-tags', function () {
			const val = $(this).val();
			if (val) {
				$('.police ' + policeTabSelected + ' .informes .tag-list').append(`
                <div class="tag scale-in">
                    <span>${val}</span>
                    <i class="fas fa-times"></i>
                </div>
            `);
				//ordena las etiquetas alfabéticamente
				var divs = $(
					'.police ' + policeTabSelected + ' .informes .tag-list .tag'
				);
				divs.sort(function (a, b) {
					return $(a).text().trim().localeCompare($(b).text().trim());
				});
				$('.police ' + policeTabSelected + ' .informes .tag-list').html(divs);

				$(
					'.police ' +
						policeTabSelected +
						" .informes .select-tags option[value='" +
						val +
						"']"
				).remove();
			}
			informesFunctions.updateTags();
		});

		$(document).on('click', '.police .informes .tag-list .tag i', function () {
			$(this)
				.parent()
				.removeClass('scale-in')
				.addClass('scale-out')
				.fadeOut(300, function () {
					$(this).remove();
					informesFunctions.updateTags();
					informesFunctions.loadInformeTags();
				});
		});

		//INPUT NOMBRE INFORME
		$(document).on('focusout', '.police .informes .input-report-name', function () {
			$(this).removeClass('text-warning');
			const data = {
				key: 'title',
				value: $(this).val()
			};
			if (data.value.length != 0) {
				informesFunctions.updateInforme(data);
			}
		});

		//INPUT UBICACION INFORME
		$(document).on('focusout', '.police .informes .input-report-ubi', function () {
			const data = {
				key: 'location',
				value: $(this).val()
			};
			if (data.value.length != 0) {
				informesFunctions.updateInforme(data);
			}
		});

		$(document).on('focusout', '.police .informes .input-report-desc', function () {
			const data = {
				key: 'description',
				value: $(this).val()
			};
			informesFunctions.updateInforme(data);
		});

		$(document).on('click', '.police .informes .delete-report', function () {
			const idReport = $('.police ' + policeTabSelected + ' .report.selected')
				.attr('id')
				.split('-')[1];

			OpenModal(
				`ATENCIÓN`,
				`<div class="row">
                <div class="col-1">
                    <img src="./img/webp/trash.webp" class="img-fluid">
                </div>
                <div class="col-11 d-flex align-items-center">
                    <div>
                    <h5 class="text-danger fw-bold mb-3">Esta acción eliminará el informe de forma permanente, incluyendo las evidencias adjuntadas a él.</h5>
                    <h4>Esto no afectará a las multas, que permanecerán en el sistema.</h4>
                    </div>
                </div>

            </div>`,
				`<button class="btn-modal" onclick="informesFunctions.deleteInforme(${idReport})">Confirmar</button>`,
				'Cancelar',
				127
			);
		});
	},

	loadReports: () => {
		$('.police ' + policeTabSelected + ' .informes .report-list')
			.html('')
			.fadeOut(0, function () {
				TriggerCallback('origen_menu:police:Get100Reports', {}).done((cb) => {
					if (cb && cb.length > 0) {
						cb.forEach((report, index) => {
							let date = timeStampToDate(report.date);

							//Comprueba si report.tags incluye el tag "Caso Abierto". Si lo incluye, añaade la clase "open-case" al informe
							let clasesTags = '';
							if (report.tags.includes('Caso Abierto')) {
								clasesTags += 'open-case ';
							} else if (report.tags.includes('Caso Nulo')) {
								clasesTags += 'null-case ';
							} else if (report.tags.includes('Caso Cerrado')) {
								clasesTags += 'closed-case ';
							}

							$('.police ' + policeTabSelected + ' .informes .report-list')
								.append(`
                        <div class="white-block report scale-in ${clasesTags}" id="report-${report.id}" tags="${report.tags}">
                            <i class="fas fa-sticky-note" aria-hidden="true"></i>
                        <div class="report-name">
                            ${report.title} <span>#${report.id}</span>
                        </div>
                        <div class="d-flex w-100">
                                <div class="w-50">
                                    <div class="report-owner">
                                        <i class="fas fa-user" aria-hidden="true"></i>
                                        <span>${report.author}</span>
                                    </div>
                                </div>
                                <div class="w-50">
                                    <div class="report-date">
                                        <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                                        <span>${date.date} - ${date.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`);
						});
					} else {
						$('.police ' + policeTabSelected + ' .informes .report-list')
							.html(`
                    <div class="col-12 text-muted">
                        <h4 class="report-name">No se han encontrado resultados</h4>
                    </div>`);
					}
					$('.police ' + policeTabSelected + ' .informes .report-list').fadeIn(
						300
					);
				});
			});
		//CARGAR TAGS EN select-tags-filter
		tags.map((tag) => {
			$('.police .informes .select-tags-filter').append(`
                  <option value="${tag}">${tag}</option>
              `);
		});
		return true;
	},

	searchReport: (tag) => {
		$('.police ' + policeTabSelected + ' .informes .report-list').fadeOut(
			300,
			function () {
				$('.police ' + policeTabSelected + ' .informes .report-list').html('');
				let text = $(
					'.police ' + policeTabSelected + ' .informes .input-search-report'
				).val();
				if (text.length > 0 || tag) {
					data = {
						text,
						tags: false
					};
					if (tag) {
						data.tags = tag;
					}
					TriggerCallback('origen_menu:police:SearchReport', data).done(
						(cb) => {
							if (cb && cb.length > 0) {
								cb.forEach((report, index) => {
									let date = timeStampToDate(report.date);

									$(
										'.police ' +
											policeTabSelected +
											' .informes .report-list'
									).append(`
                            <div class="white-block report scale-in" id="report-${report.id}">
                                <i class="fas fa-sticky-note" aria-hidden="true"></i>
                            <div class="report-name">
                                ${report.title} <span>#${report.id}</span>
                            </div>
                            <div class="d-flex w-100">
                                    <div class="w-50">
                                        <div class="report-owner">
                                            <i class="fas fa-user" aria-hidden="true"></i>
                                            <span>${report.author}</span>
                                        </div>
                                    </div>
                                    <div class="w-50">
                                        <div class="report-date">
                                            <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                                            <span>${date.date} - ${date.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
								});
							} else {
								$(
									'.police ' +
										policeTabSelected +
										' .informes .report-list'
								).html(`
                        <div class="col-12 text-muted">
                            <h4 class="report-name">No se han encontrado resultados</h4>
                        </div>`);
							}
							$(
								'.police ' + policeTabSelected + ' .informes .report-list'
							).fadeIn(300);
						}
					);
				} else {
					informesFunctions.loadReports();
				}
			}
		);
	},

	loadInformeTags: () => {
		$('.police ' + policeTabSelected + ' .informes .select-tags').html(`
        <option value="0" disable selected>
            Selecciona una etiqueta
        </option>
        `);
		//BUSCA TODAS LAS ETIQUETAS YA AÑADIDAS A LA CLASE TAG-LIST Y LAS EXCLUYE DEL ARRAY TAGS EN OTRO ARRAY AUXILIAR
		let auxTags = [...tags];

		$('.police ' + policeTabSelected + ' .informes .tag-list .tag').each(function () {
			//Comprueba si el valor del tag está en el array auxiliar y si está, lo elimina.
			if (auxTags.includes($(this).find('span').text().trim())) {
				auxTags.splice(auxTags.indexOf($(this).find('span').text().trim()), 1);
			}
		});

		auxTags.forEach((tag) => {
			$('.police ' + policeTabSelected + ' .informes .select-tags').append(`
            <option value="${tag}">
                ${tag}
            </option>
            `);
		});
		// informesFunctions.updateTags();
		// $(".police .informes .select-tags").val("0").change();
	},

	addPersonaInforme: function (name, citizenid) {
		$('.police .personas-container .personas-box')
			.removeClass('scale-in')
			.addClass('scale-out');
		$('.police .personas-container').fadeOut(300);
		if (
			$('.police ' + policeTabSelected + ' .informes .multas-list li.no-notes')
				.length > 0
		) {
			$('.police ' + policeTabSelected + ' .informes .multas-list').html('');
		}
		$('.police ' + policeTabSelected + ' .informes .multas-list').prepend(`
        <li class="list-group-item list-group-item-action scale-in" data-id="${citizenid}">
            <div class="d-flex align-items-center">
                <h5 class="persona-name">${name}</h5>
                <div class="ms-2 text-muted persona-cid"><i class="fas fa-id-card me-1"></i> ${citizenid}</div>
            </div>

            <div class="row multas-informes d-none">
                <div class="col-12 mb-2">
                    <ul>

                    </ul>
                </div>
                <div class="col-6">
                    <div class="info-box h-100">
                        <div class="info-box-title">Pena total</div>
                        <div class="info-box-value text-danger">0 Meses</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="info-box h-100">
                        <div class="info-box-title">Importe total</div>
                        <div class="info-box-value text-success">0$</div>
                    </div>
                </div>
            </div>
            <div class="delete-button">
                <i class="fa-solid fa-trash"></i>
            </div>
            <div class="multa-button">
                <i class="fas fa-edit"></i> MULTAR
            </div>
        </li>
        `);
		//Recorre con un bucle la lista de personas y crea una constante con el id del informe y en la propiedad value, otro objeto con el id de la persona y el nombre.
		informesFunctions.updatePersonasInvolucradas();
	},
	addAgenteInforme: function (name, citizenid) {
		$('.police .personas-container .personas-box')
			.removeClass('scale-in')
			.addClass('scale-out');
		$('.police .personas-container').fadeOut(300);
		if (
			$('.police ' + policeTabSelected + ' .informes .agentes-list li.no-notes')
				.length > 0
		) {
			$('.police ' + policeTabSelected + ' .informes .agentes-list').html('');
		}
		$('.police ' + policeTabSelected + ' .informes .agentes-list').prepend(`
        <li class="list-group-item list-group-item-action scale-in" data-id="${citizenid}">
            <div class="d-flex align-items-center">
                <h5 class="persona-name">${name}</h5>
                <div class="ms-2 text-muted persona-cid"><i class="fas fa-id-card me-1"></i> ${citizenid}</div>
            </div>
            <div class="delete-button">
                <i class="fa-solid fa-trash"></i>
            </div>
        </li>
        `);

		informesFunctions.updateAgentes();
	},
	addVictimaInforme: function (name, citizenid) {
		$('.police .personas-container .personas-box')
			.removeClass('scale-in')
			.addClass('scale-out');
		$('.police .personas-container').fadeOut(300);
		if (
			$('.police ' + policeTabSelected + ' .informes .victimas-list li.no-notes')
				.length > 0
		) {
			$('.police ' + policeTabSelected + ' .informes .victimas-list').html('');
		}
		$('.police ' + policeTabSelected + ' .informes .victimas-list').prepend(`
        <li class="list-group-item list-group-item-action scale-in" data-id="${citizenid}">
            <div class="d-flex align-items-center">
                <h5 class="persona-name">${name}</h5>
                <div class="ms-2 text-muted persona-cid"><i class="fas fa-id-card me-1"></i> ${citizenid}</div>
            </div>
            <div class="delete-button">
                <i class="fa-solid fa-trash"></i>
            </div>
        </li>
        `);
		informesFunctions.updateVictimas();
	},
	addMultaInforme: function (articulos, importe, meses, cid) {
		$(
			'.police ' +
				policeTabSelected +
				" .multas-list li[data-id='" +
				cid +
				"'] .multas-informes ul"
		).html('');
		articulos.forEach((articulo) => {
			$(
				'.police ' +
					policeTabSelected +
					" .multas-list li[data-id='" +
					cid +
					"'] .multas-informes ul"
			).append(`<li>${articulo.articulo}</li>`);
		});
		$(
			'.police ' +
				policeTabSelected +
				" .multas-list li[data-id='" +
				cid +
				"'] .multas-informes .info-box-value.text-danger"
		).text(meses + ' Meses');
		$(
			'.police ' +
				policeTabSelected +
				" .multas-list li[data-id='" +
				cid +
				"'] .multas-informes .info-box-value.text-success"
		).text(importe + '$');
		$(
			'.police ' +
				policeTabSelected +
				" .multas-list li[data-id='" +
				cid +
				"'] .multas-informes"
		).removeClass('d-none');
		informesFunctions.updatePersonasInvolucradas();
	},

	updatePersonasInvolucradas: function () {
		let data = {
			key: 'implicated',
			value: []
		};
		$('.police ' + policeTabSelected + ' .informes .multas-list>li').each(function (
			i
		) {
			if ($(this).find('.multas-informes li').length > 0) {
				let bills = [];
				$(this)
					.find('.multas-informes li')
					.each(function () {
						bills.push($(this).text().trim());
					});
				data.value.push({
					citizenid: $(this).data('id'),
					name: $(this).find('.persona-name').text().trim(),
					bills: bills,
					price: parseInt(
						$(this).find('.info-box-value.text-success').text().trim()
					),
					months: parseInt(
						$(this).find('.info-box-value.text-danger').text().trim()
					)
				});
			} else {
				data.value.push({
					citizenid: $(this).data('id'),
					name: $(this).find('.persona-name').text().trim()
				});
			}
		});
		informesFunctions.updateInforme(data);
	},

	updateEvidencias: () => {
		const data = {
			key: 'evidences',
			value: []
		};
		$('.police ' + policeTabSelected + ' .informes .row.evidences img').each(
			function () {
				data.value.push($(this).attr('src'));
			}
		);
		data.value = JSON.stringify(data.value);
		informesFunctions.updateInforme(data);
	},

	updateTags: function () {
		let data = {
			key: 'tags',
			value: []
		};
		$('.police ' + policeTabSelected + ' .informes .tag-list .tag span').each(
			function () {
				data.value.push($(this).text().trim());
			}
		);
		data.value = JSON.stringify(data.value);
		informesFunctions.updateInforme(data);
	},

	crearInforme: function () {
		$('.police ' + policeTabSelected + ' .informes .informe-report').fadeOut(
			300,
			function () {
				TriggerCallback('origen_menu:police:NewReport', {}).done((cb) => {
					if (cb) {
						let todayFullDateTime = new Date(cb.date);
						//Variable que utiliza todayFullDateTime para obtener la fecha actual en formato dd/mm/yyyy y la hora en formato hh:mm:ss
						let todayDateTime =
							todayFullDateTime.getDate() +
							'/' +
							(todayFullDateTime.getMonth() + 1) +
							'/' +
							todayFullDateTime.getFullYear() +
							' - ' +
							todayFullDateTime.getHours() +
							':' +
							todayFullDateTime.getMinutes();
						//Si la hora o los minutos son menores a 10, se le añade un 0 delante para que se vea bien
						if (todayFullDateTime.getHours() < 10) {
							todayDateTime =
								todayFullDateTime.getDate() +
								'/' +
								(todayFullDateTime.getMonth() + 1) +
								'/' +
								todayFullDateTime.getFullYear() +
								' - 0' +
								todayFullDateTime.getHours() +
								':' +
								todayFullDateTime.getMinutes();
						}

						$(this)
							.html(
								`
                    <div class="row m-titles content-report-${cb.id}">
                        <div class="col-4 p-0">
                            <div class="info-box m-1 h-100">
                                <div class="info-box-title">Nombre del informe</div>
                                <div class="info-box-value">
                                    <input type="text" class="input-report-name" value="Introduce un nombre">
                                </div>

                            </div>
                        </div>
                        <div class="col-4 p-0">
                            <div class="info-box m-1 h-100">
                                <div class="info-box-title">ID Del informe</div>
                                <div class="info-box-value id-informe">
                                    #${cb.id}
                                </div>

                            </div>
                        </div>
                        <div class="col-4 p-0">
                            <div class="info-box m-1 h-100">
                                <div class="info-box-title">Fecha y Hora</div>
                                <div class="info-box-value">${todayDateTime}</div>

                            </div>


                        </div>
                        <div class="col-6 mt-2 p-0">
                            <div class="info-box m-1 h-100">
                                <div class="info-box-title">Agente encargado</div>
                                <div class="info-box-value">${cb.author}</div>

                            </div>
                        </div>
                        <div class="col-6 mt-2 p-0">
                            <div class="info-box m-1 h-100">
                                <div class="info-box-title">Ubicación</div>
                                <div class="info-box-value">
                                    <input type="text" class="input-report-ubi" value="Sin ubicación asignada">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row m-titles mt-3">
                        <div class="col-12 p-0">
                            <div class="info-box m-1 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-sticky-note"></i> Descripción del informe</h4>
                                </div>
                                <div class="citizen-info-container-mini mt-2 d-flex flex-wrap citizen-informes align-content-start">
                                    <textarea class="input w-100 input-report-desc" placeholder="Introduce la descripción del informe..." rows="7"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 p-0">
                            <div class="info-box m-1 mt-2">
                                <div class="notes-title d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-quote-right"></i> Evidencias</h4>
                                    <div class="new-button add-prueba"><i class="fas fa-plus"></i> Añadir evidencias</div>
                                </div>
                                <div class="citizen-info-container mt-2">
                                    <div class="row evidences w-100 m-0">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 p-0">
                            <div class="info-box m-1 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-book"></i> Personas Involucradas</h4>
                                    <div class="new-button add-persona"><i class="fas fa-plus"></i> Añadir persona</div>
                                </div>
                                <div class="citizen-info-container mt-2">
                                    <ul class="list-group multas-list">
                                        <li class="list-group-item list-group-item-action no-notes">
                                            <h5>No hay personas involucradas</h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 p-0">
                            <div class="info-box m-1 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4><i class="fas fa-book"></i> Agentes Involucrados</h4>
                                    <div class="new-button add-agente"><i class="fas fa-plus"></i> Añadir Agente</div>
                                </div>
                                <div class="citizen-info-container-mini mt-2">
                                    <ul class="list-group agentes-list">
                                        <li class="list-group-item list-group-item-action no-notes">
                                            <h5>No hay agentes involucrados</h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 p-0">
                            <div class="info-box m-1 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4><img src="https://origennetwork.com/images/Servidores/Etiquetas.png" class="img-icon"> Etiquetas</h4>
                                    <select class="input select-tags p-0">
                                        <option value="0" disabled>
                                            Selecciona una etiqueta
                                        </option>
                                    </select>
                                </div>
                                <div class="citizen-info-container-mini mt-2">
                                    <div class="d-flex tag-list">

                                        <div class="tag">
                                            <span>Caso Abierto</span>
                                            <i class="fas fa-times"></i>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-6 p-0">
                            <div class="info-box m-1 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4><img src="https://origennetwork.com/images/Servidores/Victimas.png" class="img-icon"> Víctimas</h4>
                                    <div class="new-button add-victima"><i class="fas fa-plus"></i> Añadir Víctima</div>

                                </div>
                                <div class="citizen-info-container-mini mt-2">
                                    <ul class="list-group victimas-list">
                                        <li class="list-group-item list-group-item-action no-notes">
                                            <h5>No hay víctimas involucradas</h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 p-0">
                            <div class="info-box m-1 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4><img src="https://origennetwork.com/images/Servidores/Vehiculoicono.png" class="img-icon"> Vehículos</h4>
                                    <div class="new-button add-vehicle"><i class="fas fa-plus"></i> Añadir Vehículo</div>

                                </div>
                                <div class="citizen-info-container-mini mt-2">
                                    <ul class="list-group vehiculos-list">
                                        <li class="list-group-item list-group-item-action no-notes">
                                            <h5>No hay vehículos involucrados</h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button class="btn btn-danger delete-report mt-3 mb-2"><i class="lni lni-trash-can"></i> Destruir informe</button>
                        </div>
                    </div>
                    `
							)
							.fadeIn(300);
						$(
							'.police ' + policeTabSelected + ' .report-list .report'
						).removeClass('selected');

						$('.police .report-list').prepend(`
                    <div class="white-block report scale-in" id="report-${cb.id}">
                        <i class="fas fa-sticky-note" aria-hidden="true"></i>
                    <div class="report-name">
                        Introduce un nombre <span>#${cb.id}</span>
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
                                    <span>${todayDateTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
						$(
							'.police ' +
								policeTabSelected +
								' .report-list .report#report-' +
								cb.id
						).addClass('selected');

						$(this).animate({ scrollTop: 0 }, 200);
						$(
							'.police ' + policeTabSelected + ' .input-report-name'
						).addClass('text-warning');

						informesFunctions.loadInformeTags();
					}
				});
			}
		);
	},
	addVehicleInforme: function (plate, name) {
		if (
			$('.police ' + policeTabSelected + ' .informes .vehiculos-list .no-notes')
				.length > 0
		) {
			$(
				'.police ' + policeTabSelected + ' .informes .vehiculos-list .no-notes'
			).remove();
		}

		$('.police ' + policeTabSelected + ' .informes .vehiculos-list').prepend(`
            <li class="list-group-item list-group-item-action" data-id="${plate}">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="vehicle-title d-flex align-items-center">
                        <h5>${name}</h5>
                        <div class="vehicle-plate">
                            <p>MATRÍCULA <i class="fas fa-angle-right" aria-hidden="true"></i> ${plate}</p>
                        </div>
                    </div>
                    <div class="delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </li>
        `);
		informesFunctions.updateVehiculos();
	},
	showAddEvidence: function () {
		$('.police .evidencias-container .input-search-vehicle-selector').val('');
		fetch('GetInventory', ['report_evidence', 'photo']).done((cb) => {
			if (cb && cb.length > 0) {
				$('.police .evidencias-container .evidencias-box-list .row').html('');
				cb.map(function (evidence) {
					$('.police .evidencias-box-list .row').append(`
                    <div class="col-4 h-100 mb-3">
                        <div class="evidence-box" data-slot="${evidence.slot}" data-name="${evidence.name}" data-img="${evidence.info.url}">
                            <div class="evidence-image" style="background-image:url(${evidence.info.url})"></div>
                            <div class="p-2 text-center">
                                <div class="evidence-name">${evidence.label}</div>
                                <div class="evidence-serie">${evidence.info.serie}</div>
                            </div>
                        </div>
                    </div>
                `);
				});
			} else {
				$('.police .evidencias-container .evidencias-box-list .row').html(`
                    <div class="col-12 text-muted">
                        <h4 class="citizen-name">No hay evidencias en tu inventario</h4>
                    </div>`);
			}
		});

		// $(".police .evidencias-container .evidencias-box-list .row").html(`
		//     <div class="col-12 text-muted">
		//         <h4 class="citizen-name">No hay evidencias en tu inventario</h4>
		//     </div>`);
		$('.police .evidencias-container .personas-box')
			.removeClass('scale-out')
			.addClass('scale-in');
		$('.police .evidencias-container').fadeIn(300);
	},

	deleteEvidence: () => {
		CloseModal();
		actualEvidence.addClass('scale-out').fadeOut(300, function () {
			actualEvidence.remove();
			actualEvidence = null;
			informesFunctions.updateEvidencias();
		});
	},

	updateAgentes: function () {
		const datos = {
			key: 'cops',
			value: []
		};
		$('.police ' + policeTabSelected + ' .informes .agentes-list li').each(
			function () {
				const citizenid = $(this).data('id');
				const name = $(this).find('.persona-name').text().trim();
				datos.value.push({
					citizenid,
					name
				});
			}
		);
		datos.value = JSON.stringify(datos.value);

		informesFunctions.updateInforme(datos);
	},

	updateVehiculos: function () {
		const datos = {
			key: 'vehicles',
			value: []
		};
		$('.police ' + policeTabSelected + ' .informes .vehiculos-list li').each(
			function () {
				const plate = $(this).data('id');
				const name = $(this).find('h5').text().trim();
				datos.value.push({
					plate,
					name
				});
			}
		);
		datos.value = JSON.stringify(datos.value);

		informesFunctions.updateInforme(datos);
	},

	updateVictimas: function () {
		const datos = {
			key: 'victims',
			value: []
		};
		$('.police ' + policeTabSelected + ' .informes .victimas-list li').each(
			function () {
				const citizenid = $(this).data('id');
				const name = $(this).find('.persona-name').text().trim();
				datos.value.push({
					citizenid,
					name
				});
			}
		);
		datos.value = JSON.stringify(datos.value);

		informesFunctions.updateInforme(datos);
	},

	deleteInforme: function (reportid) {
		TriggerCallback('origen_menu:police:DeleteReport', { reportid }).done((cb) => {
			if (cb) {
				$('.police .report-list .report#report-' + reportid).fadeOut(
					300,
					function () {
						$(this).remove();
					}
				);
				$('.police .informes .informe-report .content-report-' + reportid)
					.parent()
					.fadeOut(300, function () {
						$(this)
							.html(
								`
                    <div class="d-flex w-100 align-content-start justify-content-around flex-wrap" style="height: 73vh;">
                        <h1>Selecciona un informe para cargar su información</h1>
                        <img src="./img/webp/document.webp">
                    </div>
                    `
							)
							.fadeIn(300);
					});
			}
			CloseModal();
		});
	},

	updateInforme: function (data) {
		data.reportid = parseInt(
			$('.police ' + policeTabSelected + ' .informes .id-informe')
				.text()
				.trim()
				.substring(1)
		);
		TriggerCallback('origen_menu:police:UpdateReport', data).done((cb) => {
			if (cb) {
				if (data.key == 'title') {
					$(
						'.police .report-list .report#report-' +
							data.reportid +
							' .report-name'
					).html(`${data.value} <span>#${data.reportid}</span>`);
				}
			}
		});
	},

	loadInforme: function (reportid) {
		$('.police ' + policeTabSelected + ' .informes .informe-report').fadeOut(
			300,
			function () {
				TriggerCallback('origen_menu:police:GetReport', { reportid }).done(
					(cb) => {
						const todayDateTime = timeStampToDate(cb.date);
						let tags = '';
						if (cb.tags && isJsonString(cb.tags)) {
							const tagList = JSON.parse(cb.tags);
							tagList.forEach((tag) => {
								tags += `
                                <div class="tag scale-in">
                                    <span>${tag}</span>
                                    <i class="fas fa-times"></i>
                                </div>
                            `;
							});
						} else {
							tags = `
                        <div class="tag scale-in">
                            <span>${cb.tags}</span>
                            <i class="fas fa-times"></i>
                        </div>
                    `;
						}
						let evidences = '';
						if (cb.evidences && isJsonString(cb.evidences)) {
							const evidencesList = JSON.parse(cb.evidences);

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

						let cops = '';
						if (cb.cops && isJsonString(cb.cops)) {
							const copsList = JSON.parse(cb.cops);
							if (copsList.length > 0) {
								copsList.forEach((cop) => {
									cops += `
                            <li class="list-group-item list-group-item-action scale-in" data-id="${cop.citizenid}">
                                <div class="d-flex align-items-center">
                                    <h5 class="persona-name">${cop.name}</h5>
                                    <div class="ms-2 text-muted persona-cid"><i class="fas fa-id-card me-1"></i> ${cop.citizenid}</div>
                                </div>
                                <div class="delete-button">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            </li>
                            `;
								});
							} else {
								cops = `<li class="list-group-item list-group-item-action no-notes">
                                <h5>No hay agentes involucrados</h5>
                            </li>`;
							}
						}

						let vehicles = '';
						if (cb.vehicles && isJsonString(cb.vehicles)) {
							const vehiclesList = JSON.parse(cb.vehicles);
							if (vehiclesList.length > 0) {
								vehiclesList.forEach((vehicle) => {
									vehicles += `
                            <li class="list-group-item list-group-item-action" data-id="${vehicle.plate}">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="vehicle-title d-flex align-items-center">
                                    <h5>${vehicle.name}</h5>
                                    <div class="vehicle-plate">
                                        <p>MATRÍCULA <i class="fas fa-angle-right" aria-hidden="true"></i> ${vehicle.plate}</p>
                                    </div>
                                </div>
                                <div class="delete-button">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        </li>
                            `;
								});
							} else {
								vehicles = `<li class="list-group-item list-group-item-action no-notes">
                                <h5>No hay vehículos involucrados</h5>
                            </li>`;
							}
						}

						let victims = '';
						if (cb.victims && isJsonString(cb.victims)) {
							const victimsList = JSON.parse(cb.victims);
							if (victimsList.length > 0) {
								victimsList.forEach((victim) => {
									victims += `
                            <li class="list-group-item list-group-item-action scale-in" data-id="${victim.citizenid}">
                                <div class="d-flex align-items-center">
                                    <h5 class="persona-name">${victim.name}</h5>
                                    <div class="ms-2 text-muted persona-cid"><i class="fas fa-id-card me-1" aria-hidden="true"></i> ${victim.citizenid}</div>
                                </div>
                                <div class="delete-button">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            </li>
                            `;
								});
							} else {
								victims = `<li class="list-group-item list-group-item-action no-notes">
                                <h5>No hay víctimas</h5>
                            </li>`;
							}
						}

						// cb.tags.map(tag=>{
						//     tags+=`
						//         <div class="tag scale-in">
						//             <span>${tag}</span>
						//             <i class="fas fa-times"></i>
						//         </div>
						//     `;
						// });

						let implicated = '';
						let articles = '';

						if (cb.implicated && isJsonString(cb.implicated)) {
							const implicatedList = JSON.parse(cb.implicated);
							if (implicatedList.length > 0) {
								let classBill = 'd-none';
								implicatedList.forEach((imp) => {
									// imp.bills = JSON.parse(imp.bills);
									if (imp.bills.bills) {
										imp.bills.bills = JSON.parse(imp.bills.bills);
										classBill = '';
										imp.bills.bills.map((article) => {
											articles += `
                                        <li>${article}</li>
                                    `;
										});
									}
									implicated += `
                            <li class="list-group-item list-group-item-action scale-in" data-id="${
								imp.citizenid
							}">
                                <div class="d-flex align-items-center">
                                    <h5 class="persona-name">${imp.name}</h5>
                                    <div class="ms-2 text-muted persona-cid"><i class="fas fa-id-card me-1"></i> ${
										imp.citizenid
									}</div>
                                </div>

                                <div class="row multas-informes ${classBill}">
                                    <div class="col-12 mb-2">
                                        <ul>
                                            ${articles || ''}
                                        </ul>
                                    </div>
                                    <div class="col-6">
                                        <div class="info-box h-100">
                                            <div class="info-box-title">Pena total</div>
                                            <div class="info-box-value text-danger">${
												imp.bills.months + ' Meses' ||
												'Sin asignar'
											}</div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="info-box h-100">
                                            <div class="info-box-title">Importe total</div>
                                            <div class="info-box-value text-success">${
												imp.bills.price + '$' || 'Sin asignar'
											}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="delete-button">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                                <div class="multa-button">
                                    <i class="fas fa-edit"></i> MULTAR
                                </div>
                            </li>
                            `;
								});
							} else {
								implicated = `<li class="list-group-item list-group-item-action no-notes">
                                <h5>No hay personas involucradas</h5>
                            </li>`;
							}
						}

						$('.police ' + policeTabSelected + ' .informes .informe-report')
							.html(
								`
                <div class="row m-titles content-report-${cb.id}">
                    <div class="col-4 p-0">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">Nombre del informe</div>
                            <div class="info-box-value">
                                <input type="text" class="input-report-name" value="${cb.title}">
                            </div>

                        </div>
                    </div>
                    <div class="col-4 p-0">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">ID Del informe</div>
                            <div class="info-box-value id-informe">
                                #${cb.id}
                            </div>

                        </div>
                    </div>
                    <div class="col-4 p-0">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">Fecha y Hora</div>
                            <div class="info-box-value">${todayDateTime.date} - ${todayDateTime.time}</div>

                        </div>


                    </div>
                    <div class="col-6 mt-2 p-0">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">Agente encargado</div>
                            <div class="info-box-value">${cb.author}</div>

                        </div>
                    </div>
                    <div class="col-6 mt-2 p-0">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">Ubicación</div>
                            <div class="info-box-value">
                                <input type="text" class="input-report-ubi" value="${cb.location}">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row m-titles mt-3">
                    <div class="col-12 p-0">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-sticky-note"></i> Descripción del informe</h4>
                            </div>
                            <div class="citizen-info-container-mini mt-2 d-flex flex-wrap citizen-informes align-content-start">
                                <textarea class="input w-100 input-report-desc" placeholder="Introduce la descripción del informe..." rows="7">${cb.description}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="info-box m-1 mt-2">
                            <div class="notes-title d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-quote-right"></i> Evidencias</h4>
                                <div class="new-button add-prueba"><i class="fas fa-plus"></i> Añadir evidencias</div>
                            </div>
                            <div class="citizen-info-container mt-2">
                                <div class="row evidences w-100 m-0">
                                    ${evidences}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-book"></i> Personas Involucradas</h4>
                                <div class="new-button add-persona"><i class="fas fa-plus"></i> Añadir persona</div>
                            </div>
                            <div class="citizen-info-container mt-2">
                                <ul class="list-group multas-list">
                                    ${implicated}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-book"></i> Agentes Involucrados</h4>
                                <div class="new-button add-agente"><i class="fas fa-plus"></i> Añadir Agente</div>
                            </div>
                            <div class="citizen-info-container-mini mt-2">
                                <ul class="list-group agentes-list">
                                    ${cops}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><img src="https://origennetwork.com/images/Servidores/Etiquetas.png" class="img-icon"> Etiquetas</h4>
                                <select class="input select-tags p-0">
                                    <option value="0" disabled>
                                        Selecciona una etiqueta
                                    </option>
                                </select>
                            </div>
                            <div class="citizen-info-container-mini mt-2">
                                <div class="d-flex tag-list">

                                    ${tags}

                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><img src="https://origennetwork.com/images/Servidores/Victimas.png" class="img-icon"> Víctimas</h4>
                                <div class="new-button add-victima"><i class="fas fa-plus"></i> Añadir Víctima</div>

                            </div>
                            <div class="citizen-info-container-mini mt-2">
                                <ul class="list-group victimas-list">
                                   ${victims}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><img src="https://origennetwork.com/images/Servidores/Vehiculoicono.png" class="img-icon"> Vehículos</h4>
                                <div class="new-button add-vehicle"><i class="fas fa-plus"></i> Añadir Vehículo</div>

                            </div>
                            <div class="citizen-info-container-mini mt-2">
                                <ul class="list-group vehiculos-list">
                                    ${vehicles}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button class="btn btn-danger delete-report mt-3 mb-2"><i class="lni lni-trash-can"></i> Destruir informe</button>
                    </div>
                </div>
                `
							)
							.fadeIn(300);
						$(this).animate({ scrollTop: 0 }, 200);

						informesFunctions.loadInformeTags();
						$(
							'.police ' +
								policeTabSelected +
								' .informes .report-list .report'
						).removeClass('selected');
						$(
							'.police ' +
								policeTabSelected +
								' .informes .report-list .report#report-' +
								reportid
						).addClass('selected');
					}
				);
			}
		);
	}
};

multasFunctions = {
	getCB: undefined,
	loadMultasFunctions: () => {
		$(document).on(
			'click',
			'.police .multas-container .btn-add-articulo',
			function () {
				const articulo = $(this)
					.parent()
					.parent()
					.find('.td-articulo')
					.text()
					.trim();
				const importe = parseInt(
					$(this).parent().parent().find('.td-importe').text().trim()
				);
				const meses = parseInt(
					$(this).parent().parent().find('.td-pena').text().trim()
				);

				$('.police .lista-articulos-multa').append(`
            <li class="list-group-item list-group-item-action scale-in" data-id="">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="art-multa">${articulo}</h5>
                    <div class="info-multa">
                        <div class="pena">${meses} MESES</div>
                        <div class="importe text-success">${importe}$</div>
                        <div class="eliminar"><i class="fas fa-trash"></i></div>
                    </div>
                </div>
            </li>
            `);
				multasFunctions.refreshMultasPenas();
			}
		);

		$(document).on(
			'click',
			'.police .multas-container .lista-articulos-multa .eliminar',
			function () {
				$(this)
					.parent()
					.parent()
					.parent()
					.removeClass('scale-in')
					.addClass('scale-out')
					.fadeOut(300, function () {
						$(this).remove();
						multasFunctions.refreshMultasPenas();
					});
			}
		);

		$(document).on(
			'click',
			'.police .multas-container .btn-add-custom-art',
			function () {
				const articulo = $(this)
					.parent()
					.parent()
					.find('.input-concepto')
					.val()
					.trim();
				const importe = parseInt(
					$(this).parent().parent().find('.input-importe').val().trim()
				);
				const meses = parseInt(
					$(this).parent().parent().find('.input-meses').val().trim()
				);

				if (articulo.length > 0 && importe > 0 && meses + '' != 'NaN') {
					$('.police .lista-articulos-multa').append(`
                <li class="list-group-item list-group-item-action scale-in">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="art-multa">${articulo}</h5>
                        <div class="info-multa">
                            <div class="pena">${meses} MESES</div>
                            <div class="importe text-success">${importe}$</div>
                            <div class="eliminar"><i class="fas fa-trash"></i></div>

                        </div>
                    </div>
                </li>`);
					$(this).parent().parent().find('.input-concepto').val('');
					$(this).parent().parent().find('.input-importe').val('');
					$(this).parent().parent().find('.input-meses').val('');
					multasFunctions.refreshMultasPenas();
				}
			}
		);
		$(document).on('click', '.police .multas-container .close-button', function () {
			$(this).parent().removeClass('scale-in').addClass('scale-out');
			$('.police .multas-container').fadeOut(300);
		});

		$(document).on('click', '.police .multas-container .btn-save-multa', function () {
			multasFunctions.saveMulta();
		});
		$(document).on(
			'keyup',
			'.police .multas-container .search-cp-multas',
			function () {
				let search = $(this).val().toLowerCase();
				if (search.length > 0) {
					//Busca las coincidencias en la tabla del código penal, para las celdas td-articulos y td-descripcion y oculta las que no coincidan.
					$(
						'.police .multas-container .tabla-codigo-penal-multas tbody tr'
					).each(function () {
						let articulo = $(this).find('.td-articulo').text().toLowerCase();
						let descripcion = $(this)
							.find('.td-descripcion')
							.text()
							.toLowerCase();
						if (articulo.includes(search) || descripcion.includes(search)) {
							$(this).fadeIn(300);
						} else {
							$(this).fadeOut(300);
						}
					});
				} else {
					//Si no hay texto en el buscador, muestra todas las filas de la tabla.
					$(
						'.police .multas-container .tabla-codigo-penal-multas tbody tr'
					).fadeIn(300);
				}
			}
		);
	},

	openBill: function (type, cb, name, cid) {
		$('.police .multas-box').attr('data-name', name);
		$('.police .multas-box').attr('data-id', cid);
		$('.police .multas-container .multas-box')
			.removeClass('scale-out')
			.addClass('scale-in');
		$('.police .multas-container').fadeIn(300);
		multasFunctions.getCB = cb;
	},
	refreshMultasPenas: function () {
		let totalImporte = 0;
		let totalMeses = 0;
		$('.police .lista-articulos-multa .list-group-item').each(function () {
			const importe = parseInt($(this).find('.importe').text().trim());
			const meses = parseInt($(this).find('.pena').text().trim());
			totalImporte += importe;
			totalMeses += meses;
		});

		$('.police .total-importe').text(totalImporte + '$');
		$('.police .total-meses').text(totalMeses + ' Meses');
	},
	saveMulta: function () {
		let articulos = [];
		if ($('.police .lista-articulos-multa .list-group-item').length > 0) {
			$('.police .lista-articulos-multa .list-group-item').each(function () {
				articulos = [
					...articulos,
					{
						articulo: $(this).find('.art-multa').text().trim(),
						importe: parseInt($(this).find('.importe').text().trim()),
						meses: parseInt($(this).find('.pena').text().trim())
					}
				];
			});
			const importe = parseInt(
				$('.multas-box').find('.total-importe').text().trim()
			);
			const meses = parseInt($('.multas-box').find('.total-meses').text().trim());
			const cid = $('.police .multas-box').attr('data-id');
			if (multasFunctions.getCB) {
				multasFunctions.getCB(articulos, importe, meses, cid);
				$('.police .multas-box').removeClass('scale-in').addClass('scale-out');
				$('.police .multas-container').fadeOut(300);
			}
			sendNotification('success', 'Se ha añadido la multa correctamente');
		} else {
			sendNotification('error', 'No has añadido ningún artículo a la multa');
		}
	},

	addMultaCitizen: function (articulos, importe, meses, cid) {
		let articulosHTML = '';
		let arrayArticulos = [];
		articulos.map(function (article) {
			articulosHTML += `<li><p>${article.articulo}</p></li>`;
			arrayArticulos = [...arrayArticulos, article.articulo];
		});
		TriggerCallback('origen_menu:police:SendBill', {
			citizenid: cid,
			bills: arrayArticulos,
			price: importe,
			months: meses
		}).done((cb) => {
			if (cb) {
				const fecha = timeStampToDate(cb.date);
				$('.police ' + policeTabSelected + ' ul.multas-list .no-notes').remove();

				$('.police ' + policeTabSelected + ' ul.multas-list').prepend(`
                <li class="list-group-item list-group-item-action" bill-id="${cb.billid}">
                    <h5>${fecha.date + ' - ' + fecha.time}</h5>
                    <ul>
                        ${articulosHTML}

                    </ul>
                    <div class="note-info d-flex">
                        <div class="multa-author"><i class="fas fa-user"></i> ${
							cb.author
						}</div>
                        <div class="multa-price"><i class="fas fa-dollar-sign"></i> ${importe}$</div>
                        <div class="multa-"><i class="fas fa-gavel"></i> ${meses} meses</div>
                    </div>
                    <div class="delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </li>
                `);
			}
		});
	}
};

policeFunctions = {
	policeNavigation: function (name, to) {
		return new Promise(function (resolve, reject) {
			if (onDuty) {
				const activeTab = $('.tabs-bar .tab.active').attr('data-tab');
				policeTabSelected = '#tab-' + activeTab;
				$('#tab-' + activeTab + '>.scale-in')
					.removeClass('scale-in')
					.addClass('scale-out')
					.fadeOut(300, function () {
						$('#tab-' + activeTab).html(to);
						resolve();
					});
				$(".tabs-list .tab[data-tab='" + activeTab + "'] .tab-name").text(
					name,
					to
				);
			} else {
				policeFunctions.dutyAlert();
				resolve();
			}
		});
	},

	loadPoliceEvents: function () {
		citizenSelectorFunctions.loadSelectorFunctions();
		informesFunctions.loadInformesFunctions();
		vehiclesSectionFunctions.loadVehiclesFunctions();
		multasFunctions.loadMultasFunctions();
		codigoPenalFunctions.loadCodigoPenalFunctions();
		vehicleSelectorFunctions.loadSelectorFunctions();
		agentesFunctions.loadAgentesEvents();

		radioFunctions.loadRadioEvents();
		centralFunctions.loadCentralEvents();

		camerasFunctions.cameraEvents();

		$(document).on('click', '.police .btn-federal', function () {
			TriggerCallback('origen_police:server:GetFederalList', {}).done((cb) => {
				if (cb) {
					// console.log(cb);
					let rows = '';
					const data = Object.entries(cb);
					if (data.length > 0) {
						data.map(function (citizen) {
							// console.log(citizen);
							const fecha = timeStampToDate(citizen[1].date);
							rows += `
                            <div class="col-4 mb-3">
                                <div class="citizen-box">
                                    <div class="citizen-image" style="background-image:url(${
										citizen[1].image || defaultImage
									})"></div>
                                    <div class="p-2 text-center">
                                        <div class="citizen-name">${citizen[1].name}</div>
                                        <div class="d-flex flex-wrap">
                                            <div class="citizen-id"><i class="lni lni-postcard"></i> ${
												citizen[0]
											}</div>
                                            <div class="meses"><i class="lni lni-timer"></i> ${
												citizen[1].initial
											} Meses</div>
                                            <div class="meses-r"><i class="lni lni-timer"></i> ${
												citizen[1].time
											} ${
								citizen[1].time > 1 ? 'Meses restantes' : 'Mes restante'
							}</div>
                                            <div class="fecha"><i class="lni lni-calendar"></i> ${
												fecha.date + ' - ' + fecha.time
											}</div>
                                            <div class="peligroso"><i class="lni lni-warning"></i> ${
												citizen[1].danger
											}</div>
                                            <div class="joined"><i class="lni lni-map-marker"></i> ${
												citizen[1].joinedfrom
											}</div>
                                            <div class="meses"><i class="fa-solid fa-bed"></i> ${
												citizen[1].online
													? 'Cumpliendo condena'
													: 'Durmiendo'
											}</div>
                                            <button class="btn-modal btn-sm w-100 p-0 mt-2" onclick="policeFunctions.liberarPreso('${
												citizen[0]
											}')">Liberar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
						});
					} else {
						rows = `<div class="col-12"><h5>No hay presos en federal</h5></div>`;
					}
					OpenModal(
						`Gestión de presos en federal`,
						`
                        <div class="info-box p-3 border border-dark m-2 mt-0">
                            <h5>Añade una nueva condena</h5>
                            <div class="row mt-2">
                                <div class="col-3">
                                    <input type="number" class="form-control w-100 input-id-condena h-100" placeholder="ID del ciudadano">
                                </div>
                                <div class="col-3">
                                    <input type="number" class="form-control w-100 input-meses-condena h-100" placeholder="Pena (Meses)">
                                </div>
                                <div class="col-3">
                                    <input type="text" class="form-control w-100 input-p-condena h-100" placeholder="P o NP">
                                </div>
                                <div class="col-3">
                                    <button class="btn-modal btn-nueva-condena w-100 p-0" onclick="policeFunctions.addCondena($(this).parent())">Añadir</button>
                                </div>
                            </div>
                        </div>
                       <div class="scroll-citizen-modal">
                            <div class="row">
                                ${rows}
                            </div>
                        </div>
                    `,
						`<div></div>`,
						'Cerrar',
						80
					);
				}
			});
		});

		$(document).on('click', '.tabs-list .tab .tab-name', function () {
			if (!$(this).parent().hasClass('active')) {
				if (onDuty) {
					policeFunctions.openTab(this, false);
				} else {
					policeFunctions.dutyAlert();
				}
			}
		});
		$(document).on('click', '.police .tabs-bar .tab.add', function () {
			policeFunctions.createTab('Inicio');
		});
		$(document).on('click', '.btn-police-citizen', function () {
			policeFunctions.policeNavigation('Ciudadanos', $('.police-citizen').html());
		});

		$(document).on('click', '.btn-agentes', function () {
			fetch('LoadPolicePage', { page: 'agents' }).done((cb) => {
				// console.log("Permisos: ", cb);
				if (cb) {
					policeFunctions.policeNavigation(
						'Agentes',
						$('.police-manage').html()
					);
					setTimeout(() => {
						agentesFunctions.loadAgentes();
					}, 500);
				} else {
					$('.police .duty-alert .animate__animated').html(
						'¡No tienes permisos para acceder!'
					);
					$('.police .tab-content').addClass('blur');
					$('.police .duty-alert').fadeIn(300, function () {
						setTimeout(() => {
							$('.police .duty-alert').fadeOut(300, function () {
								$('.police .duty-alert .animate__animated').html(
									'¡No estás de servicio!'
								);
							});
							$('.police .tab-content').removeClass('blur');
						}, 3000);
					});
				}
			});
		});

		$(document).on('click', '.btn-camaras', function () {
			policeFunctions
				.policeNavigation('Cámaras', $('.police-cameras').html())
				.then(() => {
					camerasFunctions.loadCameras();
				});
		});

		$(document).on('click', '.tab-close', function () {
			policeFunctions.closeTab(this);
		});
		$(document).on('click', '.duty-button', function () {
			$.post('https://origen_police/duty', JSON.stringify({}), function (cb) {
				if (cb != undefined) {
					policeFunctions.alternarServicio(cb);
				}
			});
		});

		//APP CIUDADANOS
		$(document).on('click', '.police .btn-search-citizen', function () {
			policeFunctions.searchCitizen(this, false);
		});

		$(document).on('keydown', '.police .input-search-citizen', function (event) {
			var keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode == '13') {
				policeFunctions.searchCitizen(this, false);
			}
		});

		$(document).on('click', '.citizen-list .citizen', function () {
			// $(policeTabSelected+" .list-group").append(`
			// <li class="list-group-item list-group-item-action">
			//     <div class="d-flex justify-content-between align-items-center">
			//         <div class="vehicle-title d-flex align-items-center">
			//             <h5>Zentorno</h5>
			//             <div class="vehicle-plate">
			//                 <p>1234ABC</p>
			//             </div>
			//         </div>
			//         <div class="confiscado">Confiscado</div>
			//     </div>
			// </li>
			// `);
			policeFunctions.getCitizen($(this).find('.citizen-id').text().trim());
		});

		$(document).on('click', '.police .new-note', function () {
			policeFunctions.newNote();
		});

		$(document).on('click', '.police .new-multa', function () {
			const cid = $(this)
				.parent()
				.parent()
				.parent()
				.parent()
				.parent()
				.attr('citizen-id');
			const name = $(this)
				.parent()
				.parent()
				.parent()
				.parent()
				.parent()
				.attr('citizen-name');
			codigoPenalFunctions.loadTabla(1);

			multasFunctions.openBill(
				'ciudadano',
				multasFunctions.addMultaCitizen,
				name,
				cid
			);
		});

		$(document).on('click', '.cancel-note-button', function () {
			$(this)
				.parent()
				.parent()
				.removeClass('scale-in')
				.addClass('scale-out')
				.fadeOut(300, function () {
					$(this).remove();
					if (
						$('.police ' + policeTabSelected + ' .notes-list li').length == 0
					) {
						$('.police ' + policeTabSelected + ' .notes-list').append(
							`<li class="list-group-item list-group-item-action no-notes scale-in"><h5>No hay notas registradas</h5></li>`
						);
					}
				});
		});
		$(document).on('click', '.police .new-note-button', function () {
			const noteTitle = $(this).parent().parent().find('.note-title').val();
			const noteText = $(this).parent().parent().find('.note-text').val();
			const citizenid = $('.police ' + policeTabSelected + ' .citizenid')
				.text()
				.trim();
			const note = $(this);
			let params = { noteTitle, noteText, citizenid };
			if ($(this).attr('type') == 'agente') {
				params = { noteTitle, noteText, citizenid, police: true };
			}
			// console.log($(this).attr("type") == "agente", params);
			if (noteTitle.length > 0 && noteText.length > 0) {
				TriggerCallback('origen_menu:police:NewPoliceNote', params).done((cb) => {
					if (cb) {
						//Transforma cb.note que se encuetra en Timestamp en 2 constantes para fecha y hora
						const date = timeStampToDate(cb.date * 1000);
						note.parent()
							.parent()
							.removeClass('scale-in')
							.addClass('scale-out')
							.fadeOut(300, function () {
								$(this).remove();
								$(
									'.police ' + policeTabSelected + ' .notes-list'
								).prepend(`
                            <li class="list-group-item list-group-item-action scale-in" note-id="${cb.id}">
                                <h5>${noteTitle}</h5>
                                <p>${noteText}</p>
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
		});

		$(document).on('click', '.police .citizen-scroll .pin-button', function () {
			const noteId = $(this).parent().attr('note-id');
			const note = $(this).parent();
			let type = 'pin';
			if (note.hasClass('pinned')) {
				type = 'unpin';
			}
			TriggerCallback('origen_menu:police:UpdatePoliceNote', {
				noteid: noteId,
				type: type
			}).done((cb) => {
				if (cb) {
					if (type == 'pin') {
						note.addClass('scale-out').fadeOut(300, function () {
							let nota = $(this);
							$(this).remove();
							nota.removeClass('scale-out')
								.addClass('scale-in')
								.addClass('pinned')
								.show();
							$(
								'.police ' + policeTabSelected + ' .notes-list-pinned'
							).prepend(nota);
						});
					} else {
						note.addClass('scale-out').fadeOut(300, function () {
							let nota = $(this);
							$(this).remove();
							nota.removeClass('scale-out')
								.removeClass('pinned')
								.addClass('scale-in')
								.show();
							$('.police ' + policeTabSelected + ' .notes-list').prepend(
								nota
							);
						});
					}
				}
			});
		});

		$(document).on('click', '.police .citizen-scroll .delete-button', function () {
			const noteId = $(this).parent().attr('note-id');
			const note = $(this).parent();

			TriggerCallback('origen_menu:police:UpdatePoliceNote', {
				noteid: noteId,
				type: 'delete'
			}).done((cb) => {
				if (cb) {
					note.addClass('scale-out').fadeOut(300, function () {
						$(this).remove();
					});
				}
			});
		});

		$(document).on(
			'click',
			'.police .citizen-ficha .busca-captura .btn-check',
			function () {
				$('.police .citizen-ficha .busca-captura .btn-check').attr(
					'checked',
					false
				);
				$(this).attr('checked', true);
				const citizenid = $(
					'.police ' + policeTabSelected + ' .citizen-ficha .citizenid'
				)
					.text()
					.trim();
				let value = 0;
				if ($(this).hasClass('si')) {
					value = 1;
				}
				TriggerCallback('origen_menu:police:UpdateCitizenStatus', {
					citizenid,
					column: 'busqueda',
					value
				});
			}
		);

		$(document).on(
			'click',
			'.police .citizen-ficha .peligroso .btn-check',
			function () {
				$('.police .citizen-ficha .peligroso .btn-check').attr('checked', false);
				$(this).attr('checked', true);
				const citizenid = $(
					'.police ' + policeTabSelected + ' .citizen-ficha .citizenid'
				)
					.text()
					.trim();
				let value = 0;
				if ($(this).hasClass('si')) {
					value = 1;
				}
				TriggerCallback('origen_menu:police:UpdateCitizenStatus', {
					citizenid,
					column: 'peligroso',
					value
				});
			}
		);

		$(document).on('click', '.citizen-photo', function () {
			OpenModal(
				`¿Cómo quieres subir la imagen?`,
				`
                <div class="d-flex justify-content-around content-tipo-imagen">
                    <button class="btn-modal" onclick="policeFunctions.cargarFoto(1)"><img src="./img/camera.png"></br>Hacer foto</button>
                    <button class="btn-modal" onclick="policeFunctions.cargarFoto(0)"><img src="./img/link.png"></br>Añadir URL</button>
                </div>
            `,
				`<div></div>`,
				'Cancelar'
			);
		});
		$(document).on(
			'click',
			'.police .citizen-ficha .citizen-informes .informe, .police .agent-ficha .informe',
			function () {
				policeFunctions.createTab('Informes', '.police-reports');
				const that = $(this);
				setTimeout(() => {
					if (informesFunctions.loadReports()) {
						informesFunctions.loadInforme(that.find('.report-id').text());
					}
				}, 500);
			}
		);
		$(document).on(
			'click',
			'.police .citizen-ficha .multas-list .delete-button',
			function () {
				const billid = $(this).parent().attr('bill-id');

				TriggerCallback('origen_menu:police:DeleteBill', {
					billid
				}).done((cb) => {
					if (cb) {
						$(this)
							.parent()
							.addClass('scale-out')
							.fadeOut(300, function () {
								$(this).remove();
							});
					} else {
						sendNotification(
							'error',
							'Solo un alto cargo puede eliminar una multa'
						);
					}
				});
			}
		);
		$(document).on(
			'click',
			'.police .citizen-ficha .licenses-list .delete-button',
			function () {
				const citizenid = $(
					'.police ' + policeTabSelected + ' .citizen-ficha .citizenid'
				)
					.text()
					.trim();
				$(this)
					.parent()
					.addClass('scale-out')
					.fadeOut(300, function () {
						$(this).remove();
						let licenses = [];
						let data;
						$('.police .citizen-ficha .licenses-list li').each(function (
							element
						) {
							data = {
								name: $(this).find('span').text().trim(),
								id: $(this).attr('license-id')
							};
							licenses.push(data);
						});
						TriggerCallback('origen_menu:police:UpdateCitizenStatus', {
							citizenid,
							column: 'owned_licenses',
							value: JSON.stringify(licenses)
						});
					});
			}
		);

		$(document).on('click', '.police .btn-byc', function () {
			TriggerCallback('origen_menu:police:GetBusqueda', {}).done((cb) => {
				if (cb) {
					// console.log(cb);
					let rows = '';
					// const data = Object.entries(cb);
					if (cb.length > 0) {
						cb.map(function (citizen) {
							rows += `
                            <div class="col-4 mb-3">
                                <div class="citizen-box">
                                    <div class="citizen-image" style="background-image:url(${
										citizen.image || defaultImage
									})"></div>
                                    <div class="p-2 text-center">
                                        <div class="citizen-name">${citizen.name}</div>
                                        <div class="d-flex flex-wrap">
                                            <div class="citizen-id text-center"><i class="lni lni-postcard"></i> ${
												citizen.citizenid
											}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
						});
					} else {
						rows = `<div class="col-12"><h5>No hay sujetos en busca y captura</h5></div>`;
					}
					OpenModal(
						`Sujetos en busca y captura`,
						`<div class="scroll-citizen-modal">
                        <div class="row">
                            ${rows}
                        </div>
                    </div>
                `,
						`<div></div>`,
						'Cerrar',
						80
					);
				}
			});
		});

		$(document).on('click', '.police .btn-deudores', function () {
			// console.log("HOLA");
			TriggerCallback('origen_menu:police:GetMorosos', {}).done((cb) => {
				if (cb) {
					// console.log(cb);
					let rows = '';
					// const data = Object.entries(cb);
					if (cb.length > 0) {
						cb.sort((a, b) => a.name.localeCompare(b.name));

						cb.map(function (citizen) {
							rows += `
                            <div class="col-4 mb-3 deudor btn-sound" citizenid="${
								citizen.citizenid
							}">
                                <div class="citizen-box">
                                    <div class="citizen-image" style="background-image:url(${
										citizen.image || defaultImage
									})"></div>
                                    <div class="p-2 text-center">
                                        <div class="citizen-name">${citizen.name}</div>
                                        <div class="d-flex flex-wrap">
                                            <div class="citizen-id text-center"><i class="lni lni-postcard"></i> ${
												citizen.citizenid
											}</div>
                                            <div class="citizen-id price text-center text-danger fw-bold">${
												citizen.price
											} $</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
						});
					} else {
						rows = `<div class="col-12"><h5>No hay sujetos deudores</h5></div>`;
					}
					OpenModal(
						`Sujetos deudores`,
						`
						<div class="row">
							<div class="col-8">
							<input
							class='form-control w-100 mb-2 buscar-deudor'
							placeholder='Filtrar por nombre...'/>
							</div>
							<div class="col-4">
							<input
							class='form-control w-100 mb-2 buscar-deudor-cant'
							placeholder='Filtrar cantidad mínima...' type="number"/>
							</div>
						</div>
						<div class="scroll-citizen-modal">

							<div class="row">
								${rows}
							</div>
						</div>
                `,
						`<div></div>`,
						'Cerrar',
						80
					);
				}
			});
		});

		$(document).on('click', '.times-button', function () {
			let tabla = ``;
			let topList = '';
		
			TriggerCallback('origen_police:server:GetClocks', {}).done((cb) => {
				if (cb) {
					const topTenValues = cb
						.reduce((acc, obj) => {
							const existingObj = acc.find((item) => item.name === obj.name);
							if (existingObj) {
								existingObj.minutes += obj.minutes;
							} else {
								acc.push({ minutes: obj.minutes, name: obj.name });
							}
							return acc;
						}, [])
						.sort((a, b) => b.minutes - a.minutes)
						.slice(0, 10);
		
					cb.map((time) => {
						tabla += `
						<tr>
							<td>${time.name}</td>
							<td class="text-center">${time.clockin}</td>
							<td class="text-center">${time.clockout}</td>
							<td class="text-center">${time.minutes}</td>
						</tr>
						`;
					});
		
					topTenValues.map((top, i) => {
						topList += `
						<li class="list-group-item">
							<div class="d-flex justify-content-between align-items-center">
								<div class="worker-name">
									<span class="bankgothic top-number">${i + 1}</span>
									<span class="worker-name-span">${top.name}</span>
								</div>
								<div class="worker-time">
									<span class="worker-time-span fw-bold">${top.minutes} mins.</span>
								</div>
							</div>
						</li>
						`;
					});
		
					OpenModal(
						`Control horario (Ultimos 200 fichajes)`,
						`
						<div class="row">
		
							<div class="col-8">
							<h3 class="bankgothic">Historial</h3>
							<table border="0" class="gtable w-100 mt-2">
								<thead>
									<tr>
										<th style="width:40%">Agente</th>
										<th class="text-center">Entrada</th>
										<th class="text-center">Salida</th>
										<th class="text-center" style="width:10%">Total</th>
									</tr>
								</thead>
								<tbody>
									${tabla}
		
								</tbody>
							</table>
							</div>
							<div class="col-4">
								<h3 class="bankgothic">Top Trabajadores</h3>
		
								<ul class="list-group mt-2">
									${topList}
								</ul>
							</div>
						</div>
					`,
						`<div></div>`,
						"Cancelar",
						120
					);
					$('.c-modal .gtable').DataTable({
						language: dataTableLanguage,
						pageLength: 10,
						lengthChange: false,
						autoWidth: false
					});
				} else {
					sendNotification('error', 'Ha ocurrido un error');
				}
			});
		});
	},

	openTab: function (tab, create, tabClass) {
		if (create) {
			tabN = tab;
			policeFunctions.loadHomeFunctions();
			if (cargoSolicitudes) {
				setTimeout(() => {
					policeFunctions.loadSolicitudes();
				}, 500);
			}
		} else {
			tabN = $(tab).parent().attr('data-tab');
			policeTabSelected = '#tab-' + tabN;
		}

		if ($('.tab-content #tab-' + tabN).length > 0) {
			$('.tab-content .tab').removeClass('show');
			$('.tab-content #tab-' + tabN).addClass('show');
			$('.tabs-list .tab').removeClass('active');
			$(tab).parent().addClass('active');
		} else {
			$('.tab-content .tab').removeClass('show');
			const tabContent = $(tabClass).html();
			$('.tab-content').append(`
                <div class="tab show" id="tab-${tabN}">
                    ${tabContent}
                </div>
            `);
			$('.tabs-list .tab').removeClass('active');
			$('.tabs-list .tab[data-tab=' + tabN + ']').addClass('active');
		}
		const activeTab = $('.tabs-bar .tab.active').attr('data-tab');
		policeTabSelected = '#tab-' + activeTab;
	},

	createTab: function (title, tabContent) {
		const tabNumber =
			parseInt($('.tabs-list .tab:last-child').attr('data-tab')) + 1 || 1;

		$('.tabs-list').append(`
                <div class="tab new-tab" data-tab="${tabNumber}">
                    <div class="tab-name">${title}</div><div class="tab-close"><i class="fas fa-times"></i></div>
                </div>
            `);
		setTimeout(() => {
			$('.tabs-list .tab.new-tab').removeClass('new-tab');
		}, 500);
		policeFunctions.openTab(
			tabNumber,
			true,
			tabContent ? tabContent : '.police-home'
		);
	},

	closeTab: function (tab) {
		const tabN = $(tab).parent().attr('data-tab');
		if ($('.tabs-list .tab').length > 1) {
			if ($('.tabs-list .tab[data-tab=' + tabN + ']').hasClass('active')) {
				$('.tabs-list .tab[data-tab=' + tabN + ']')
					.addClass('animate__animated animate__fadeOutDown animate__faster')
					.fadeOut(300, function () {
						$(this).remove();
						$('.tabs-list .tab:last-child').addClass('active');
					});
				$('.tab-content #tab-' + tabN).fadeOut(150, function () {
					$(this).remove();
					$('.tab-content .tab:last-child').addClass('show');
				});
			} else {
				$('.tabs-list .tab[data-tab=' + tabN + ']')
					.addClass('animate__animated animate__fadeOutDown animate__faster')
					.fadeOut(300, function () {
						$(this).remove();
					});
				$('.tab-content #tab-' + tabN).remove();
			}
		}
		if (
			$('.tabs-list .tab[data-tab=' + tabN + ']')
				.find('.tab-name')
				.text() == 'Radio'
		) {
			$('.tabs-list .tab[data-tab=' + tabN + ']').fadeOut(0, function () {
				$(this).remove();
				// $(".tabs-list .tab:last-child").addClass("active");
			});
			$('.tab-content #tab-' + tabN).fadeOut(0, function () {
				$(this).remove();
				// $(".tab-content .tab:last-child").addClass("show");
				policeFunctions.createTab('Inicio');
			});
		} else if (
			$('.tabs-list .tab[data-tab=' + tabN + ']')
				.find('.tab-name')
				.text() == 'Central'
		) {
			destruirMapaCentral();
			// console.log("DESTRUYO");
			TriggerCallback('origen_police:server:CloseCentral', {});
			$('.tabs-list .tab[data-tab=' + tabN + ']').fadeOut(0, function () {
				$(this).remove();
				// $(".tabs-list .tab:last-child").addClass("active");
			});
			$('.tab-content #tab-' + tabN).fadeOut(0, function () {
				$(this).remove();
				// $(".tab-content .tab:last-child").addClass("show");
				policeFunctions.createTab('Inicio');
			});
		}
	},

	alternarServicio: function (cb) {
		onDuty = cb;
		if (cb) {
			// $(".duty-button").text("Salir del servicio");
			$('.service-tag').text('En servicio').addClass('on-service');
			// sendNotification("success", "Has entrado en servicio");
		} else {
			// $(".duty-button").text("Entrar en servicio");
			$('.service-tag').text('Fuera de servicio').removeClass('on-service');
			// sendNotification("success", "Has salido de servicio");
		}
	},

	dutyAlert: function () {
		$('.police .tab-content').addClass('blur');
		$('.police .duty-alert').fadeIn(300, function () {
			setTimeout(() => {
				$('.police .duty-alert').fadeOut(300);
				$('.police .tab-content').removeClass('blur');
			}, 3000);
		});
	},

	setOnService: function (cops) {
		let policeLabel;
		if (cops == 0) {
			policeLabel = 'No hay Policias en Servicio';
		} else if (cops == 1) {
			policeLabel = cops + ' Agente en Servicio';
		} else {
			policeLabel = cops + ' Agentes en Servicio';
		}
		$('.police .number-polices').html(policeLabel);
	},

	//APP HOME
	loadHomeFunctions: function () {
		fetch('LoadPolicePage', { page: 'home' }).done((cb) => {
			policeFunctions.alternarServicio(cb.service);
			policeFunctions.setOnService(cb.cops);
		});
	},
	searchCitizen: function (element, selector) {
		const text = !selector
			? $(element).parent().parent().find('.input-search-citizen').val()
			: $('.input-search-citizen-selector').val();
		if (text.length > 2 && text != '') {
			if (!selector) {
				$(policeTabSelected + ' .citizen-list').fadeOut(300, function () {
					TriggerCallback('origen_menu:police:SearchCitizen', {
						text
					}).done((cb) => {
						if (cb != undefined && cb.length > 0) {
							$(policeTabSelected + ' .citizen-list').html('');
							cb.map(function (citizen) {
								const citizenName =
									citizen.firstname + ' ' + citizen.lastname;
								const citizenId = citizen.citizenid;
								const citizenImage = citizen.image || defaultImage;
								const citizenPhone = citizen.phone || 'Desconocido';
								$(policeTabSelected + ' .citizen-list')
									.append(
										`
                                    <div class="white-block citizen">
                                        <div class="citizen-image image-${citizenId}" style="background-image:url('${citizenImage}');"></div>
                                        <div class="citizen-info w-100">
                                            <div class="citizen-name w-100">${citizenName}</div>
                                            <div class="d-flex text-uppercase citizen-fast-data">
                                                <div class="w-50"><i class="fa-solid fa-id-card"></i> <span class="citizen-id">${citizenId}</span></div>
                                                <div class="w-50"><i class="fa-solid fa-phone"></i> <span class="citizen-phone">${citizenPhone}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                `
									)
									.fadeIn(300);
							});
							$(policeTabSelected + ' .citizen-list').fadeIn(300);
						} else {
							$(policeTabSelected + ' .citizen-list')
								.html(
									`
                                    <div class="citizen-item m-titles text-muted">
                                        <div class="citizen-name">No se han encontrado resultados</div>
                                    </div>
                                `
								)
								.fadeIn(300);
						}
					});
				});
			} else {
				let params = { text };
				if ($('.btn-search-citizen-selector').attr('data-type') != 'persona') {
					params = {
						text,
						job: $('.btn-search-citizen-selector').attr('data-type')
					};
				}
				$('.police .citizen-box-list .row').fadeOut(300, function () {
					TriggerCallback('origen_menu:police:SearchCitizen', params).done(
						(cb) => {
							if (cb != undefined && cb.length > 0) {
								$('.police .citizen-box-list .row').html('');
								cb.map(function (citizen) {
									const citizenName =
										citizen.firstname + ' ' + citizen.lastname;
									const citizenId = citizen.citizenid;
									const citizenImage = citizen.image || defaultImage;
									$('.police .citizen-box-list .row').append(`
                                    <div class="col-4 h-100 mb-3">
                                        <div class="citizen-box">
                                            <div class="citizen-image image-${citizenId}" style="background-image:url(${citizenImage})"></div>
                                            <div class="p-2 text-center">
                                                <div class="citizen-name">${citizenName}</div>
                                                <div class="citizen-id">${citizenId}</div>
                                            </div>
                                        </div>
                                    </div>
                                `);
								});
								$('.police .citizen-box-list .row').fadeIn(300);
							} else {
								$('.police .citizen-box-list .row')
									.html(
										`
                                    <div class="col-12 text-muted">
                                        <h4 class="citizen-name">No se han encontrado resultados</h4>
                                    </div>
                                `
									)
									.fadeIn(300);
							}
						}
					);
				});
			}
		}
	},

	getCitizen: function (citizenid) {
		TriggerCallback('origen_menu:police:GetCitizen', { citizenid }).done((cb) => {
			if (cb) {
				let totalBillNoPayed = 0;
				let citizenBills = '';
				let citizenVehicles = '';
				let citizenNotes = '';
				let citizenNotesPinned = '';
				let citizenLicenses = '';
				let citizenProperties = '';
				let citizenReports = '';
				// console.log(cb);
				if (cb.bills.length > 0) {
					cb.bills.map(function (bill) {
						let articulos = '';
						JSON.parse(bill.concepts).map(function (article) {
							articulos += `<li><p>${article}</p></li>`;
						});
						const fecha = timeStampToDate(bill.date);

						if (!bill.payed) {
							totalBillNoPayed += parseInt(bill.price);
						}

						citizenBills += `
                        <li class="list-group-item list-group-item-action ${
							bill.payed ? 'multa-pagada' : ''
						}" bill-id="${bill.id}">
                            <h5>${fecha.date} - ${fecha.time}</h5>
                            <ul>
                                ${articulos}

                            </ul>
                            <div class="note-info d-flex">
                                <div class="multa-author"><i class="fas fa-user"></i> ${
									bill.author
								}</div>
                                <div class="multa-price"><i class="fas fa-dollar-sign"></i> ${
									bill.price
								}$</div>
                                <div class="multa-"><i class="fas fa-gavel"></i> ${
									bill.months
								} meses</div>
                            </div>
                            <div class="delete-button">
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </li>
                        `;
					});
				} else {
					citizenBills = `
                    <li class="list-group-item list-group-item-action no-notes">
                        <h5>No hay multas registradas</h5>
                    </li>`;
				}

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

				if (cb.vehicles.length > 0) {
					cb.vehicles.map(function (vehicle) {
						citizenVehicles += `
                        <li class="list-group-item list-group-item-action">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="vehicle-title d-flex align-items-center">
                                    <h5>${vehicle.label}</h5>
                                    <div class="vehicle-plate">
                                        <p>MATRÍCULA <i class="fas fa-angle-right"></i> ${
											vehicle.plate
										}</p>
                                    </div>
                                </div>
                                <div class="confiscado">${vehicle.status} ${
							vehicle.busqueda
								? ' <span class="text-danger fw-bold"><i class="fas fa-search"></i> EN BÚSQUEDA</span>'
								: ''
						} </div>
                            </div>
                        </li>
                        `;
					});
				} else {
					citizenVehicles = `
                    <li class="list-group-item list-group-item-action no-notes">
                        <div class="d-flex justify-content-between align-items-center">
                        <h5>No hay vehículos registrados</h5>
                        </div>
                    </li>`;
				}

				if (cb.properties.length > 0) {
					cb.properties.map(function (property) {
						citizenProperties += `
                        <li class="list-group-item list-group-item-action">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5>${property}</h5>
                            </div>
                        </li>
                        `;
					});
				} else {
					citizenProperties = `
                    <li class="list-group-item list-group-item-action no-notes">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5>No hay propiedades registradas</h5>
                        </div>
                    </li>`;
				}

				if (isJsonString(cb.licenses.length) && cb.licenses) {
					cb.licenses = JSON.parse(cb.licenses);
					if (cb.licenses.length > 0) {
						cb.licenses.map(function (license) {
							citizenLicenses += `
                            <li class="list-group-item list-group-item-action" license-id="${license.id}">
                                <span>${license.name}</span>
								${ license.id != "fly_license" ? '<div class="delete-button"><i class="fa-solid fa-trash"></i></div>' : ""}
                            </li>
                            `;
						});
					} else {
						citizenLicenses = `
                        <li class="list-group-item list-group-item-action no-notes">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5>No hay licencias registradas</h5>
                            </div>
                        </li>`;
					}
				} else {
					citizenLicenses = `
                        <li class="list-group-item list-group-item-action no-notes">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5>No hay licencias registradas</h5>
                            </div>
                        </li>`;
				}
				if (cb.reports && cb.reports.length > 0) {
					cb.reports.map(function (report) {
						citizenReports += `
                        <div class="informe">
                            <span class="report-name">${report.title}</span> #<span class="report-id">${report.id}</span>
                        </div>`;
					});
				} else {
					citizenReports = `
                        <ul class="list-group w-100">
                            <li class="list-group-item list-group-item-action no-notes">
                                <h5>No hay informes registrados</h5>
                            </li>
                        </ul>
                    `;
				}

				let birthdate = cb.birthdate.split('-');

				$(policeTabSelected + ' .citizen-ficha').fadeOut(300, function () {
					$(this).attr('citizen-id', cb.citizenid);
					$(this).attr('citizen-name', cb.firstname + ' ' + cb.lastname);
					$(this)
						.html(
							`
                <div class="row d-flex align-items-center m-titles citizen-info-all mt-0">
                    <div class="col-2 p-0">
                        <div class="citizen-photo" style="background-image:url('${
							cb.image || defaultImage
						}')">
                            <div class="edit-photo"><img src="./img/webp/edit.webp"></div>
                        </div>
                    </div>
                    <div class="col-10 pe-0">
                        <div class="d-flex w-100 flex-data">
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Nombre</div>
                                    <div class="info-box-value">${cb.firstname}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Apellido</div>
                                    <div class="info-box-value">${cb.lastname}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Género</div>
                                    <div class="info-box-value">${cb.gender}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Nacionalidad</div>
                                    <div class="info-box-value">${cb.nationality}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Fecha de Nacimiento</div>
                                    <div class="info-box-value">${birthdate[0]}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">ID</div>
                                    <div class="info-box-value citizenid">${
										cb.citizenid
									}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Teléfono</div>
                                    <div class="info-box-value">${
										cb.phone || 'Desconocido'
									}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Cuenta Bancaria</div>
                                    <div class="info-box-value">${cb.iban}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Profesión</div>
                                    <div class="info-box-value">${cb.job}</div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6 pe-1 text-center">
                        <div class="info-box m-1">
                            <div class="row">
                                <div class="col-6">
                                    <h4>Sujeto en busca y captura</h4>
                                    <div class="busca-captura btn-group mt-2 w-100" citizen-id="${
										cb.citizenid
									}" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" class="btn-check si" name="btn-busqueda-${
											cb.citizenid
										}" id="btn-busqueda-${
								cb.citizenid
							}-1" autocomplete="off" ${cb.busqueda == 1 && 'checked'}>
                                        <label class="btn btn-outline-primary" for="btn-busqueda-${
											cb.citizenid
										}-1">Si</label>

                                        <input type="radio" class="btn-check" name="btn-busqueda-${
											cb.citizenid
										}" id="btn-busqueda-${
								cb.citizenid
							}-2" autocomplete="off" ${cb.busqueda == 0 && 'checked'}>
                                        <label class="btn btn-outline-primary no" for="btn-busqueda-${
											cb.citizenid
										}-2">No</label>
                                    </div>
                                </div>
                                <div class="col-6 border-left text-center">
                                    <h4>Sujeto Peligroso</h4>
                                    <div class="peligroso btn-group mt-2 w-100" citizen-id="${
										cb.citizenid
									}" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" class="btn-check si" name="btn-peligroso-${
											cb.citizenid
										}" id="btn-peligroso-${
								cb.citizenid
							}-1" autocomplete="off" ${cb.peligroso == 1 && 'checked'}>
                                        <label class="btn btn-outline-primary" for="btn-peligroso-${
											cb.citizenid
										}-1">Si</label>

                                        <input type="radio" class="btn-check" name="btn-peligroso-${
											cb.citizenid
										}" id="btn-peligroso-${
								cb.citizenid
							}-2" autocomplete="off" ${cb.peligroso == 0 && 'checked'}>
                                        <label class="btn btn-outline-primary no" for="btn-peligroso-${
											cb.citizenid
										}-2">No</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-6 ps-1">
                        <div class="comunication-button d-flex align-items-center m-1">
                            <div class="comunication-button-icon">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div class="comunication-button-text" style="opacity:0.2";>
                                <div class="comunication-button-text-title">Enviar notificación via email</div>
                                <div class="comunication-button-text-subtitle">Contacta con el ciudadano a través del correo electrónico</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 pe-1">
                        <div class="info-box m-1 mt-2">
                            <div class="notes-title d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-quote-right"></i> Notas</h4>
                                <div class="new-button new-note"><i class="fas fa-plus"></i> Nueva nota</div>
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
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-book"></i> Multas - <span style="color: #ef8c8c;font-weight: 500;">${totalBillNoPayed}$</span></h4></h4>
                                <div class="new-button new-multa"><i class="fas fa-plus"></i> Añadir multa</div>
                            </div>
                            <div class="citizen-info-container mt-2">
                                <ul class="list-group multas-list">
                                   ${citizenBills}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 pe-1">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-sticky-note"></i> Informes</h4>
                            </div>
                            <div class="citizen-info-container-mini mt-2 d-flex flex-wrap citizen-informes align-content-start">
                                ${citizenReports}
                            </div>
                        </div>
                    </div>
                    <div class="col-6 pe-1 ps-1">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-id-card"></i> Licencias</h4>
                            </div>
                            <div class="citizen-info-container-mini mt-2">
                                <ul class="list-group licenses-list">
                                  ${citizenLicenses}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div class="col-6 pe-1">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-car"></i> Vehículos</h4>
                            </div>
                            <div class="citizen-info-container-mini mt-2">
                                <ul class="list-group">
                                    ${citizenVehicles}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 ps-1">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-house"></i> Propiedades</h4>
                            </div>
                            <div class="citizen-info-container-mini mt-2">
                                <ul class="list-group">
                                    ${citizenProperties}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                `
						)
						.fadeIn(300);
				});
			} else {
				$(policeTabSelected + ' .citizen-ficha').fadeOut(300, function () {
					$(this).html(`<h5>No hay datos registrados</h5>`).fadeIn(300);
				});
			}
		});
	},

	newNote: (type) => {
		// console.log(type);
		let agentClass = '';
		if (type) {
			agentClass = 'agente';
		}
		const noteHtml = `
            <li class="list-group-item list-group-item-action scale-in">
                <h5><input class="input note-title w-100" placeholder="Título de la nota"></h5>
                <p><textarea rows="4" class="input note-text w-100 mt-1" placeholder="Texto de la nota"></textarea></p>
                <div class="d-flex justify-content-between mt-2">
                    <div class="btn btn-secondary cancel-note-button btn-sm me-2">Cancelar</div>
                    <div class="btn btn-secondary new-note-button btn-sm" type="${agentClass}">Guardar</div>
                </div>
            </li>`;
		if ($('.police ' + policeTabSelected + ' .notes-list .no-notes').length > 0) {
			$('.police ' + policeTabSelected + ' .notes-list .no-notes').fadeOut(
				300,
				function () {
					$(this).remove();
					$('.police ' + policeTabSelected + ' .notes-list').append(noteHtml);
				}
			);
		} else {
			$('.police ' + policeTabSelected + ' .notes-list').prepend(noteHtml);
		}
	},

	cargarFoto: (type) => {
		if (type) {
			CloseModal();
			const citizenid = $(
				'.police ' + policeTabSelected + ' .info-box-value.citizenid'
			)
				.text()
				.trim();
			fetch('TakePicture', { citizenid }).done((cb) => {
				if (cb) {
					$('.police ' + policeTabSelected + ' .citizen-photo').css(
						'background-image',
						"url('" + cb + "')"
					);
					$('.police .white-block .citizen-image.image-' + citizenid).css(
						'background-image',
						"url('" + cb + "')"
					);
					$('.police .white-block .image-' + citizenid).css(
						'background-image',
						"url('" + cb + "')"
					);
				}
			});
			$('.screen').removeClass('show');
			$.post('https://origen_menu/close', JSON.stringify({}));
		} else {
			CloseModal();
			OpenModal(
				`Introduce la URL de la imagen`,
				`
                <input class="form-control w-100 url-nueva-foto" placeholder="URL de la imagen">
            `,
				`<button class="btn-modal" onclick="policeFunctions.guardarFoto($('.url-nueva-foto').val())">Guardar imagen</button>`,
				'Cancelar'
			);
		}
	},

	guardarFoto: (value) => {
		CloseModal();
		const citizenid = $('.police ' + policeTabSelected + ' .info-box-value.citizenid')
			.text()
			.trim();
		// console.log(citizenid, value);
		TriggerCallback('origen_menu:police:UpdateCitizenImage', {
			citizenid,
			value
		}).done((cb) => {
			if (cb) {
				$('.police ' + policeTabSelected + ' .citizen-photo').css(
					'background-image',
					"url('" + value + "')"
				);
				$('.police .white-block .image-' + citizenid).css(
					'background-image',
					"url('" + value + "')"
				);
			}
		});
	},

	liberarPreso: (cid) => {
		TriggerCallback('origen_police:server:releasefederal', {
			citizenid: cid
		}).done((cb) => {
			if (cb) {
				CloseModal();
			} else {
				//NOTIFICACIÓN ERROR
			}
		});
	},

	addCondena: (yo) => {
		const id = yo.parent().find('.input-id-condena').val().trim();
		const condena = yo.parent().find('.input-meses-condena').val().trim();
		const peligroso = yo.parent().find('.input-p-condena').val().trim();
		if (id.length != 0 && condena > 0 && condena < 10000 && peligroso.length > 0) {
			fetch('ExecuteCommand', {
				command: 'celda ' + id + ' ' + condena + ' ' + peligroso
			}).done((cb) => {
				if (cb) {
					CloseModal();
				}
			});
		} else {
			//NOTIFICACIÓN ERROR
		}
	},
	loadSolicitudes: () => {
		cargoSolicitudes = false;
		setTimeout(() => {
			cargoSolicitudes = true;
		}, 350);
		TriggerCallback('origen_police:server:GetRobRequests', {}).done((cb) => {
			if (cb && Object.entries(cb).length > 0) {
				clearAllCountdownPolice();
				$('.tab-content .solicitudes-container').html(``);
				Object.entries(cb).map(([key, value]) => {
					if (!value.confirmed) {
						countdownPolice(value.request_time, key);
					}
					$('.tab-content .solicitudes-container').prepend(`
					<div class="solicitud animate__animated animate__fadeIn solicitud-${key}">
						<img
							src="https://origennetwork.com/images/Servidores/Disparonuca.png"
							class="icono-solicitud" />
						<div class="w-100 d-flex flex-column justify-content-center">
							<div
								class="d-flex justify-content-between align-items-center">
								<h4 class="bankgothic m-0" style="font-size:2.5vh;line-height:2.5vh;">Solicitud a ${
									value.label
								}</h4>
								<span
									class="badge badge-acent ${value.confirmed ? 'd-none' : ''} temporizador-${key}">
									--:--
								</span>
							</div>
							<div class="mt-2 zona-accion" style="display:${value.confirmed ? 'none' : 'flex'}">
								<div class="w-50">
									<button
										class="btn btn-action w-100 me-1 p-1 accion-solicitud" type="${key}" action="true">
										Confirmar solicitud
									</button>
								</div>
								<div class="w-50">
									<button
										class="btn btn-action w-100 ms-1 p-1 accion-solicitud" type="${key}" action="false">
										Enviar al Cuerpo IA
									</button>
								</div>
							</div>
							<div class="w-100 text-center text-muted text-uppercase estado" style="display:${
								value.confirmed ? 'flex' : 'none'
							}">
								EL GOLPE ESTÁ EN CURSO
							</div>
						</div>
					</div>
					`);
				});
			} else {
				$('.tab-content .solicitudes-container').html(`
					<div class="solicitud">
						<div class="text-muted text-center w-100">
							<i
								>No se han realizado solicitudes de
								disponibilidad</i
							>
						</div>
					</div>
				`);
			}
		});
	}
};

radioFunctions = {
	freqList: {
		sur: [],
		norte: [],
		especiales: [],
		ems: []
	},
	radioNetEvents: (event) => {
		switch (event.radio) {
			case 'AddPlayerMultiFrec':
				radioFunctions.addPlayerToFrec(event.frec, event.id, event.data);
				if (event.i) {
					radioFunctions.setFrecCabecera(event.frec);
				}
				break;

			case 'Talking':
				radioFunctions.talking(event.target, event.value);
				break;
			case 'RemovePlayerMultiFrec':
				radioFunctions.removePlayerFromFrec(event.frec, event.id);
				break;

			case 'SetMuted':
				radioFunctions.setMuted(event.id, event.value);
				break;

			case 'SetReady':
				radioFunctions.setReady(event.id, event.value);
				break;

			case 'Disconnected':
				$('.police .radio .zona-conectar').fadeOut(300);
				break;
		}
	},
	loadRadioEvents: () => {
		$(document).on('click', '.radio-button', function () {
			let valid;
			$('.tab-name').each(function (yo) {
				if ($(this).text() == 'Radio') {
					valid = $(this);
				}
			});

			if (!valid) {
				fetch('LoadPolicePage', { page: 'radio' }).done((cb) => {
					if (cb) {
						policeFunctions
							.policeNavigation('Radio', $('.police-radio').html())
							.then(() => {
								radioFunctions.setFrecuencias().then(() => {
									setTimeout(() => {
										if (cb != 'none')
											radioFunctions.setFrecCabecera(cb);
										radioFunctions.loadAllPlayers();

										radioFunctions.sortableChannels();
									}, 300);
								});
							});
					} else {
						$('.police .duty-alert .animate__animated').html(
							'¡No tienes una radio!'
						);
						$('.police .tab-content').addClass('blur');
						$('.police .duty-alert').fadeIn(300, function () {
							setTimeout(() => {
								$('.police .duty-alert').fadeOut(300, function () {
									$('.police .duty-alert .animate__animated').html(
										'¡No estás de servicio!'
									);
								});
								$('.police .tab-content').removeClass('blur');
							}, 3000);
						});
					}
				});
			} else {
				policeFunctions.openTab($(valid), false);
			}
		});

		$(document).on('click', '.police .radio-category .toggle-category', function () {
			$(this).parent().toggleClass('toggle');
		});
		$(document).on('click', '.police .radio-category .category-title', function () {
			let id = $(this).parent().attr('frec');
			exportEvent('origen_radio', 'SetMultiFrec', ['police', id]);
		});
		$(document).on('click', '.police .radio .btn-teclas', function () {
			exportEvent('origen_radio', 'GetBinds', []).done((cb) => {
				Object.entries(cb).map(([key, value]) => {
					cb[value] = key;
				});
				OpenModal(
					`BOTONES`,
					`<div class="row" style="width:45vh;">
                        <div class="col-8 mb-2 d-flex align-items-center">
                            <h4>ALTERNAR MUTEO</h4>
                        </div>
                        <div class="col-4 mb-2">
                            <button class="btn-modal w-100 key-${
								cb['mute'] || '-'
							}" id="mute" onclick="radioFunctions.setAsignacion(this)">${
						cb['mute'] || ' - '
					}</button>
                        </div>
                        <div class="col-8 mb-2 d-flex align-items-center">
                            <h4>HABLAR A CENTRAL</h4>
                        </div>
                        <div class="col-4 mb-2">
                            <button class="btn-modal w-100 key-${
								cb['hablar-central'] || '-'
							}" id="hablar-central" onclick="radioFunctions.setAsignacion(this)">${
						cb['hablar-central'] || ' - '
					}</button>
                        </div>
                        <div class="col-8 d-flex align-items-center">
                            <h4>HABLAR A "ESPERANDO ASIGNACIÓN"</h4>
                        </div>
                        <div class="col-4 mb-2">
                            <button class="btn-modal w-100 key-${
								cb['esp-asig'] || '-'
							}" id="esp-asig" onclick="radioFunctions.setAsignacion(this)">${
						cb['esp-asig'] || ' - '
					}</button>
                        </div>
                        <div class="col-8 mb-2 d-flex align-items-center">
                            <h4>HABLAR A COMISARÍA</h4>
                        </div>
                        <div class="col-4 mb-2">
                            <button class="btn-modal w-100 key-${
								cb['hablar-comi'] || '-'
							}" id="hablar-comi" onclick="radioFunctions.setAsignacion(this)">${
						cb['hablar-comi'] || ' - '
					}</button>
                        </div>
                        <div class="col-8 mb-2 d-flex align-items-center">
                            <h4>HABLAR A TACS</h4>
                        </div>
                        <div class="col-4 mb-2">
                            <button class="btn-modal w-100 key-${
								cb['hablar-tacs'] || '-'
							}" id="hablar-tacs" onclick="radioFunctions.setAsignacion(this)">${
						cb['hablar-tacs'] || ' - '
					}</button>
                        </div>
                        <div class="col-8 d-flex align-items-center">
                            <h4>HABLAR A CENTRAL SAMS</h4>
                        </div>
                        <div class="col-4 mb-2">
                            <button class="btn-modal w-100 key-${
								cb['hablar-ems'] || '-'
							}" id="hablar-ems" onclick="radioFunctions.setAsignacion(this)">${
						cb['hablar-ems'] || ' - '
					}</button>
                        </div>
                        <div class="col-8 d-flex align-items-center mb-2">
                            <h4>BROADCAST SAPD</h4>
                        </div>
                        <div class="col-4  mb-2">
                            <button class="btn-modal w-100 key-${
								cb['hablar-sapd'] || '-'
							}" id="hablar-sapd" onclick="radioFunctions.setAsignacion(this)">${
						cb['hablar-sapd'] || ' - '
					}</button>
						</div>
						<div class="col-8 d-flex align-items-center mb-2">
							<h4>HABLAR A "ESPERANDO ASIGNACIÓN SAMS"</h4>
						</div>
						<div class="col-4">
							<button class="btn-modal w-100 key-${
								cb['esp-asig-sams'] || '-'
							}" id="esp-asig-sams" onclick="radioFunctions.setAsignacion(this)">${
						cb['esp-asig-sams'] || ' - '
					}</button>
						</div>
						<div class="col-8 d-flex align-items-center mb-2">
							<h4>HABLAR A SAMS</h4>
						</div>
						<div class="col-4">
							<button class="btn-modal w-100 key-${
								cb['hablar-sams'] || '-'
							}" id="hablar-sams" onclick="radioFunctions.setAsignacion(this)">${
						cb['hablar-sams'] || ' - '
					}</button>
						</div>

                    </div>`,
					`<div></div>`,
					'Cerrar'
				);
			});
		});

		$(document).on('click', '.police .radio .zona-conectar .connected', function () {
			$(this).parent().fadeOut(300);
			//SONIDO DESCONEXIÓN
			exportEvent('origen_radio', 'SetMultiFrec', ['police', 'none']);
		});
	},

	setFrecuencias: () => {
		return new Promise(function (resolve, reject) {
			fetch('LoadFrecList', {}).done((freclist) => {
				$('.police .radio .frecuencias').html('');
				freclist.frecuenciasSur.map((frecuencia) => {
					$('.police .radio .frecuencias.sur').append(`
                    <div class="radio-category toggle vacio" frec="${stringToUrl(
						frecuencia
					)}">
                        <div class="category-title">
                            ${frecuencia}
                        </div>
                        <div class="connected-users text-danger">
                            <i class="lni lni-users"></i> <span class="number">0</span>
                        </div>
                        <div class="toggle-category">
                            <i class="lni lni-chevron-down"></i>
                        </div>
                        <div class="user-list" frecuencia="f-1">

                        </div>
                        <div class="no-users scale-in">
                            No hay usuarios en este canal
                        </div>
                    </div>
                    `);
				});
				freclist.frecuenciasNorte.map((frecuencia) => {
					$('.police .radio .frecuencias.norte').append(`
                    <div class="radio-category toggle vacio" frec="${stringToUrl(
						frecuencia
					)}">
                        <div class="category-title">
                            ${frecuencia}
                        </div>
                        <div class="connected-users text-danger">
                            <i class="lni lni-users"></i> <span class="number">0</span>
                        </div>
                        <div class="toggle-category">
                            <i class="lni lni-chevron-down"></i>
                        </div>
                        <div class="user-list" frecuencia="f-1">

                        </div>
                        <div class="no-users scale-in">
                            No hay usuarios en este canal
                        </div>
                    </div>
                    `);
				});
				freclist.frecuenciasEspeciales.map((frecuencia) => {
					$('.police .radio .frecuencias.especiales').append(`
                    <div class="radio-category toggle vacio" frec="${stringToUrl(
						frecuencia
					)}">
                        <div class="category-title">
                            ${frecuencia}
                        </div>
                        <div class="connected-users text-danger">
                            <i class="lni lni-users"></i> <span class="number">0</span>
                        </div>
                        <div class="toggle-category">
                            <i class="lni lni-chevron-down"></i>
                        </div>
                        <div class="user-list" frecuencia="f-1">

                        </div>
                        <div class="no-users scale-in">
                            No hay usuarios en este canal
                        </div>
                    </div>
                    `);
				});
				freclist.frecuenciasEMS.map((frecuencia) => {
					$('.police .radio .frecuencias.ems').append(`
                    <div class="radio-category toggle vacio" frec="${stringToUrl(
						frecuencia
					)}">
                        <div class="category-title">
                            ${frecuencia}
                        </div>
                        <div class="connected-users text-danger">
                            <i class="lni lni-users"></i> <span class="number">0</span>
                        </div>
                        <div class="toggle-category">
                            <i class="lni lni-chevron-down"></i>
                        </div>
                        <div class="user-list" frecuencia="f-1">

                        </div>
                        <div class="no-users scale-in">
                            No hay usuarios en este canal
                        </div>
                    </div>
                    `);
				});
				resolve();
			});
		});
	},

	updateChannelUsers: (channel) => {
		const nUsers = channel.find('.radio-user').length;
		// console.log(nUsers);
		channel.find('.connected-users .number').text(nUsers);
		if (nUsers > 0) {
			channel
				.find('.connected-users')
				.removeClass('text-danger')
				.addClass('text-success');
			// channel.find(".no-users").remove();ç
			channel.removeClass('vacio');
		} else {
			channel
				.find('.connected-users')
				.removeClass('text-success')
				.addClass('text-danger');
			channel.addClass('vacio').addClass('toggle');
		}
	},

	setSpeaking: (user, speaking) => {
		if (speaking) {
			user.find('.radio-user .speaking').css('opacity', 1);
		} else {
			user.find('.radio-user .speaking').css('opacity', 0);
		}
	},

	setSilenced: (user, silenced) => {
		if (silenced) {
			user.find('.radio-user .volume-muted').css('opacity', 1);
		} else {
			user.find('.radio-user .volume-muted').css('opacity', 0);
		}
	},

	loadAllPlayers: () => {
		TriggerCallback('origen_radio:GetMultiFrecs', { group: 'police' }).done((cb) => {
			if (cb) {
				Object.entries(cb).map(([key, value]) => {
					let aum;
					Object.entries(value).map(([id, data]) => {
						if (id == 0) aum = true;
						if (aum) id++;
						radioFunctions.addPlayerToFrec(key, id, data);
					});
				});
			}
		});
	},

	addPlayerToFrec: (frec, id, data) => {
		if (frec == frecuenciaActual) {
			s_talkon.currentTime = '0';
			s_talkon.play();
		}
		if (
			$(
				'.police .tab .radio .radio-category[frec="' +
					frec +
					'"] .user-list .source-' +
					id
			).length == 0
		) {
			$('.police .tab .radio .radio-category[frec="' + frec + '"] .user-list')
				.append(`
            <div class="radio-user source-${id}" source="${id}">
                <div class="d-flex align-items-center w-100">
                    <span class="circle ${
						data.ready ? 'green' : 'red'
					}"></span> <span class="user-name">${
				data.name
			}</span> <span class="user-rango badge ms-2 bg-morado">${data.grade}</span>
                </div>
                <div class="volume-muted" style="${
					!data.muted ? 'opacity: 0' : 'opacity: 1'
				}">
                    <img src="./img/volume-mute.png" class="radio-icon">
                </div>
                <div>
                    <img src="./img/hablando.svg" class="speaking">
                </div>
            </div>
            `);
			$('.police .tab .radio .radio-category[frec="' + frec + '"]').removeClass(
				'toggle'
			);
			radioFunctions.updateChannelUsers(
				$('.police .tab .radio .radio-category[frec="' + frec + '"]')
			);
		}

		if (
			$(
				'.police .tab .central .radio-category[frec="' +
					frec +
					'"] .user-list .source-' +
					id
			).length == 0
		) {
			$('.police .tab .central .radio-category[frec="' + frec + '"] .user-list')
				.append(`
            <div class="radio-user source-${id}" source="${id}">
                <div class="d-flex align-items-center w-100">
                    <span class="circle ${
						data.ready ? 'green' : 'red'
					}"></span> <span class="user-name">${
				data.name
			}</span> <span class="user-rango badge ms-2 bg-morado">${data.grade}</span>
                </div>
                <div class="volume-muted" style="${
					!data.muted ? 'opacity: 0' : 'opacity: 1'
				}">
                    <img src="./img/volume-mute.png" class="radio-icon">
                </div>
                <div>
                    <img src="./img/hablando.svg" class="speaking">
                </div>
            </div>
            `);
			$('.police .tab .central .radio-category[frec="' + frec + '"]').removeClass(
				'toggle'
			);
			// radioFunctions.updateChannelUsers($('.police .tab .radio .radio-category[frec="'+frec+'"], .police .tab .central .radio-category[frec="'+frec+'"]'));
			radioFunctions.updateChannelUsers(
				$('.police .tab .central .radio-category[frec="' + frec + '"]')
			);
		}
	},

	removePlayerFromFrec: (frec, id) => {
		if (
			$(
				'.police .tab .radio .radio-category[frec="' +
					frec +
					'"] .user-list .source-' +
					id +
					', .police .tab .central .radio-category[frec="' +
					frec +
					'"] .user-list .source-' +
					id
			).length > 0
		) {
			$(
				'.police .tab .radio .radio-category[frec="' +
					frec +
					'"] .user-list .source-' +
					id +
					', .police .tab .central .radio-category[frec="' +
					frec +
					'"] .user-list .source-' +
					id
			).remove();
			radioFunctions.updateChannelUsers(
				$('.police .tab .radio .radio-category[frec="' + frec + '"]')
			);
			radioFunctions.updateChannelUsers(
				$('.police .tab .central .radio-category[frec="' + frec + '"]')
			);
		}
	},

	setMuted: (target, value) => {
		$('.police .tab .radio-category .source-' + target + ' .volume-muted').css(
			'opacity',
			value ? 1 : 0
		);
	},

	setReady: (target, value) => {
		$('.police .tab .radio-category .source-' + target + ' .circle')
			.removeClass('red')
			.removeClass('green')
			.addClass(value ? 'green' : 'red');
	},

	talking: (target, value) => {
		if (!value) {
			s_talkoff.currentTime = '0';
			s_talkoff.play();
		}
		$('.police .tab .radio-category .source-' + target + ' .speaking').css(
			'opacity',
			value ? 1 : 0
		);
	},

	setAsignacion: (btn) => {
		$(btn).addClass('seleccionando').text(' - ');
		$(btn).on('keydown', function (event) {
			//Obtengo la tecla pulsada, la convierto en mayuscula y la pinto en el boton
			let tecla = false;
			let regex = /^[a-zA-Z0-9]+$/;
			let action = $(this).attr('id');
			if (teclas[event.keyCode]) {
				tecla = teclas[event.keyCode];
			} else {
				tecla = String.fromCharCode(event.keyCode).toUpperCase();
			}
			if (tecla && regex.test(tecla)) {
				exportEvent('origen_radio', 'RadioAddKeyBind', [
					'keyboard',
					tecla,
					action
				]);
				$(btn).removeClass('seleccionando').off('keydown');
				$('.key-' + tecla)
					.removeClass('key-' + tecla)
					.addClass('key--')
					.html(' - ');
				$(btn)
					.removeClass('key-' + $(btn).html().trim())
					.addClass('key-' + tecla)
					.html(tecla);
			}
		});
	},

	setFrecCabecera: (frec) => {
		frecuenciaActual = frec;
		$('.police .tab .radio .app-title .connected .frecuencia-actual').html(
			`<img src="./img/webp/speaking.webp" style="width:3vh; margin-right:1vh;"> ${frec}`
		);
		$('.police .tab .radio .app-title .zona-conectar').fadeIn(300);
	},

	//CENTRAL
	setFrecuenciasCentral: () => {
		return new Promise(function (resolve, reject) {
			fetch('LoadFrecList', {}).done((radiodata) => {
				if (radiodata) {
					// radioFunctions.setFrecCabecera(radiodata.myfrec.toUpperCase())
					let listFrecuenciasSur = '';
					let listFrecuenciasNorte = '';
					let listFrecuenciasEsp = '';
					let listFrecuenciasEMS = '';
					radiodata.frecuenciasSur.map((frecuencia) => {
						radioFunctions.freqList.sur.push(stringToUrl(frecuencia));

						listFrecuenciasSur += `
                        <div class="radio-category toggle vacio" frec="${stringToUrl(
							frecuencia
						)}">
                            <div class="category-title">
                                ${frecuencia}
                            </div>
                            <div class="speak-to"><i class="fas fa-microphone"></i> HABLAR</div>
                            <div class="connected-users text-danger">
                                <i class="lni lni-users"></i> <span class="number">0</span>
                            </div>
                            <div class="toggle-category">
                                <i class="lni lni-chevron-down"></i>
                            </div>
                            <div class="user-list" frecuencia="f-1">

                            </div>
                            <div class="no-users scale-in">
                                No hay usuarios en este canal
                            </div>
                        </div>
                        `;
					});
					radiodata.frecuenciasNorte.map((frecuencia) => {
						radioFunctions.freqList.norte.push(stringToUrl(frecuencia));
						listFrecuenciasNorte += `
                        <div class="radio-category toggle vacio" frec="${stringToUrl(
							frecuencia
						)}">
                            <div class="category-title">
                                ${frecuencia}
                            </div>
                            <div class="speak-to"><i class="fas fa-microphone"></i> HABLAR</div>
                            <div class="connected-users text-danger">
                                <i class="lni lni-users"></i> <span class="number">0</span>
                            </div>
                            <div class="toggle-category">
                                <i class="lni lni-chevron-down"></i>
                            </div>
                            <div class="user-list" frecuencia="f-1">

                            </div>
                            <div class="no-users scale-in">
                                No hay usuarios en este canal
                            </div>
                        </div>
                        `;
					});
					radiodata.frecuenciasEspeciales.map((frecuencia) => {
						radioFunctions.freqList.especiales.push(stringToUrl(frecuencia));
						listFrecuenciasEsp += `
                        <div class="radio-category toggle vacio" frec="${stringToUrl(
							frecuencia
						)}">
                            <div class="category-title">
                                ${frecuencia}
                            </div>
                            <div class="speak-to"><i class="fas fa-microphone"></i> HABLAR</div>
                            <div class="connected-users text-danger">
                                <i class="lni lni-users"></i> <span class="number">0</span>
                            </div>
                            <div class="toggle-category">
                                <i class="lni lni-chevron-down"></i>
                            </div>
                            <div class="user-list" frecuencia="f-1">

                            </div>
                            <div class="no-users scale-in">
                                No hay usuarios en este canal
                            </div>
                        </div>
                        `;
					});
					radiodata.frecuenciasEMS.map((frecuencia) => {
						radioFunctions.freqList.ems.push(stringToUrl(frecuencia));
						listFrecuenciasEMS += `
                        <div class="radio-category toggle vacio" frec="${stringToUrl(
							frecuencia
						)}">
                            <div class="category-title">
                                ${frecuencia}
                            </div>
                            <div class="speak-to"><i class="fas fa-microphone"></i> HABLAR</div>
                            <div class="connected-users text-danger">
                                <i class="lni lni-users"></i> <span class="number">0</span>
                            </div>
                            <div class="toggle-category">
                                <i class="lni lni-chevron-down"></i>
                            </div>
                            <div class="user-list" frecuencia="f-1">

                            </div>
                            <div class="no-users scale-in">
                                No hay usuarios en este canal
                            </div>
                        </div>
                        `;
					});
					$('.police .central .central-freq').html(
						`<div class="title-1">Frecuencias Sur</div>${listFrecuenciasSur}<div class="title-1 mt-2">Frecuencias Norte</div>${listFrecuenciasNorte}<div class="title-1 mt-2">Frecuencias Especiales</div>${listFrecuenciasEsp}<div class="title-1 mt-2">Frecuencias EMS</div>${listFrecuenciasEMS}`
					);
					// radioFunctions.radioLoad();
				} else {
					$('.police .central .central-freq').html(
						`<div class="text-danger w-100 text-center text-uppercase">No tienes una radio</div>`
					);
				}

				resolve();
			});
		});
	},
	sortableChannels: () => {
		let updateCounter = 0;

		$('.user-list').sortable({
			connectWith: '.user-list',
			// cursorAt: { left: 70, top: 70 },
			items: '.radio-user',
			placeholder: '.radio-hover',
			update: function (event, ui) {
				updateCounter++;
				if (updateCounter == 2) {
					radioFunctions.updateChannelUsers(ui.sender.parent());
					radioFunctions.updateChannelUsers(ui.item.parent().parent());
					// console.log($(ui.item).attr("source"), $(ui.item).parent().parent().attr("frec"));
					exportEvent('origen_radio', 'MovePlayerMultiFrec', [
						$(ui.item).attr('source'),
						'police',
						$(ui.item).parent().parent().attr('frec')
					]);
				}
			},
			stop: function (event, ui) {
				// console.log($(ui.sender).find(".radio-user").html());
				updateCounter = 0;
			}
		});
	},

	speakTo: (frec) => {
		exportEvent('origen_radio', 'StartTalkRadio', [frec, 'central']);
	},

	stopSpeakTo: () => {
		exportEvent('origen_radio', 'StopTalkRadio', {});
	}
};

centralFunctions = {
	alerts: [],
	loadCentralEvents: () => {
		$(document).on('click', '.police .btn-police-central', function () {
			let valid;
			$('.tab-name').each(function (yo) {
				if ($(this).text() == 'Central') {
					valid = $(this);
				}
			});
			if (!valid) {
				fetch('LoadPolicePage', { page: 'radio' }).done((cb) => {
					if (cb) {
						policeFunctions
							.policeNavigation('Central', $('.police-central').html())
							.then(() => {
								TriggerCallback(
									'origen_police:server:OpenCentral',
									{}
								).done((cb) => {
									// console.log(cb);

									!cb.Cops instanceof Array
										? (cb.Cops = Object.values(cb.Cops))
										: null;

									if (cb.TrafficZones.length != 0) {
										cb.TrafficZones.map((zone, i) => {
											mapFunctions.CreateCircle(
												mapCentral,
												i + 1,
												{
													x: zone.coords.x,
													y: zone.coords.y
												},
												zone.radius,
												zone.type == 'stop' ? 'red' : 'orange',
												zone.type == 'stop' ? 'red' : 'orange',
												`<div>${
													zone.type == 'stop'
														? 'Parada de tráfico'
														: 'Reducción de velocidad'
												}</div>`
											);
										});
									}

									if (cb.Radars.length != 0) {
										cb.Radars.map((radar, i) => {
											CreateBlip(
												mapCentral,
												i + 1,
												{
													x: radar.objectCoords.x,
													y: radar.objectCoords.y
												},
												MarkerBlips['radar'],
												`<div>Radar de ${
													radar.type == 1
														? 'Velocidad'
														: 'Matrícula'
												}</div>`
											);
										});
									}

									centralFunctions.updatePoliceCarsMap(
										cb.VehicleTrackeds
									);
									centralFunctions.updateAgentesTable(cb.Cops);
									centralFunctions.intervalAlerts();
								});

								cargarMapaCentral();
								radioFunctions.setFrecuenciasCentral().then(() => {
									setTimeout(() => {
										radioFunctions.loadAllPlayers();

										let updateCounter = 0;
										radioFunctions.sortableChannels();
									}, 300);
								});
							});
					} else {
						$('.police .duty-alert .animate__animated').html(
							'¡No tienes una radio!'
						);
						$('.police .tab-content').addClass('blur');
						$('.police .duty-alert').fadeIn(300, function () {
							setTimeout(() => {
								$('.police .duty-alert').fadeOut(300);
								$('.police .tab-content').removeClass('blur');
								$('.police .duty-alert .animate__animated').html(
									'¡No estás de servicio!'
								);
							}, 3000);
						});
					}
				});
			} else {
				policeFunctions.openTab($(valid), false);
			}
		});

		//EVENTO CLICK DERECHO AL PULSAR SOBRE UN TR DE LA TABLA "ctable" QUE AL PULSARLO, DESPLIEGA UN MENÚ CONTEXTUAL DE OPCIONES EN LA POSICIÓN DONDE SE ENCUENTRA EL RATÓN
		// $(document).on(
		//     "contextmenu",
		//     ".police .tab .central .ctable tr",
		//     function (e) {
		//         e.preventDefault();
		//         //Ocultamos el menú contextual
		//         if ($(".police .tab .contextmenu").length > 0) {
		//             $(".police .tab .contextmenu").fadeOut(300, function () {
		//                 $(this).remove();
		//             });
		//         } else {
		//             //Obtenemos la posición del ratón
		//             var posX = e.pageX;
		//             var posY = e.pageY;
		//             //Obtenemos el id del registro seleccionado
		//             var id = $(this).attr("id");
		//             $(".tab.show").append(
		//                 "<div class='contextmenu' id='" +
		//                     id +
		//                     "'><div class='button-menu' onclick='centralFunctions.fAccion1()'>Acción 1</div></div>"
		//             );
		//             //Mostramos el menú contextual en la posición del ratón
		//             $(".police .tab .contextmenu")
		//                 .css({ top: posY, left: posX })
		//                 .fadeIn(300);
		//             //AL HACER CLICK EN CUALQUIER OTRO ELEMENTO QUE NO SEA EL MENÚ CONTEXT, ESTE SE OCULTA Y ELIMINA DEL HTML
		//             $(".tab").on("click", function (e) {
		//                 if (!$(e.target).hasClass("contextmenu")) {
		//                     $(".police .tab .contextmenu").fadeOut(
		//                         300,
		//                         function () {
		//                             $(this).remove();
		//                             $(".tab").off("click");
		//                         }
		//                     );
		//                 }
		//             });
		//         }
		//     }
		// );
		$(document).on('click', '.police .new-note-agente', function () {
			policeFunctions.newNote(1);
		});

		//EVENTO A LA CLASE SPEAK-TO QUE SE EJECUTA MIENTRAS MANTENGO PULSADO EL CLICK Y OTRO QUE SE EJECUTA CUANDO SUELTO EL CLICK
		$(document).on('mousedown', '.police .tab .central .speak-to', function () {
			const frec = $(this).parent().attr('frec');
			radioFunctions.speakTo(frec);
		});
		$(document).on('mouseup', '.police .tab .central .speak-to', function () {
			radioFunctions.stopSpeakTo();
		});

		//EVENTO AL PULSAR ENTER SOBRE LA CLASE .input-rpol PARA ENVIAR UN MENSAJE AL CHAT
		$(document).on('keypress', '.police .tab .central .input-rpol', function (e) {
			if (e.which == 13) {
				const message = $(this).val();
				$(this).val('');
				fetch('SendRpolMessage', { message });
			}
		});

		$(document).on('click', '.police .tab .central .selector-container', function () {
			if (
				$('.police .tab .central .alerts-container .id-alert').text().trim() !=
				'-'
			) {
				$(this).toggleClass('toggle');
				if ($(this).hasClass('toggle')) {
					let unidadesDispo = '';
					$('.police .tab .central .radio-category').each(function () {
						if ($(this).find('.number').text() > 0) {
							unidadesDispo += `
                            <div class="unidad" frec="${$(this).attr('frec')}">
                            <i class="fa-solid fa-car-on"></i> ${$(this).attr(
								'frec'
							)} <span style="color:grey;margin-left:1vh;">(${$(this)
								.find('.number')
								.text()})</span>
                            </div>

                            `;
						}
					});
					$('.police .tab .central .unidades-dispo').html(unidadesDispo);
				}
			}
		});

		$(document).on(
			'click',
			'.police .tab .central .selector-container .unidad',
			function () {
				const unit = $(this).attr('frec').toUpperCase();
				const index = $(this).parent().attr('index');
				const alert = {
					coords: centralFunctions.alerts[index].coords,
					code: centralFunctions.alerts[index].code,
					title: centralFunctions.alerts[index].title,
					message: centralFunctions.alerts[index].message,
					annotation: centralFunctions.alerts[index].annotation,
					metadata: centralFunctions.alerts[index].metadata
				};
				TriggerCallback('ForceSelectAlert:police', { alert, unit });
				//NOTIFICACIÓN DE UNIDAD NOTIFICADA
			}
		);

		$(document).on(
			'click',
			'.police .tab .central .tabla-dispatch tbody tr',
			function () {
				$(this).removeClass('new-alert');
				const alert = centralFunctions.alerts[$(this).attr('index')];
				// console.log(alert);
				mapFunctions.setAlertFocus(alert.code);
				centralFunctions.setAlertShowing(alert, $(this).attr('index'));
				if ($('.police .central .info-mapa').hasClass('show')) {
					$('.police .central .info-mapa').toggleClass('show');
					setTimeout(() => {
						mapFunctions.showCentralAlert(
							alert.title,
							alert.street,
							alert.time,
							checkNumber(alert.code)
						);
					}, 300);
				} else {
					mapFunctions.showCentralAlert(
						alert.title,
						alert.street,
						alert.time,
						checkNumber(alert.code)
					);
				}
			}
		);

		$(document).on('click', '.police .tab .central .action-button', function () {
			const attr = $(this).attr('action');
			switch (attr) {
				case 'cameras':
					policeFunctions.createTab('Cámaras', '.police-cameras');
					setTimeout(() => {
						camerasFunctions.loadCameras();
					}, 50);
					break;

				case 'informes':
					policeFunctions.createTab('Informes', '.police-reports');
					setTimeout(() => {
						informesFunctions.loadReports();
					}, 500);
					break;

				case 'busqueda':
					policeFunctions.createTab('Ciudadanos', '.police-citizen');
					break;
			}
		});

		$(document).on('mousedown', '.police .tab .central .broadcast', function () {
			const attr = $(this).attr('action');
			//SUMA radioFunctions.freqList.sur + radioFunctions.freqList.norte + radioFunctions.freqList.especiales
			const freclistSAPD = radioFunctions.freqList.sur.concat(
				radioFunctions.freqList.norte
			);
			const freclistSAFD = radioFunctions.freqList.ems;

			
			radioFunctions.freqList.especiales.map((frec) => {
				if (!frec.includes('tac') && !frec.includes('oficina'))
					freclistSAFD.push(frec);
			});

			switch (attr) {
				case 'SAFD':
					exportEvent('origen_radio', 'StartTalkRadio', freclistSAFD);
					break;

				case 'SAPD':
					exportEvent('origen_radio', 'StartTalkRadio', freclistSAPD);
					break;
			}
		});

		$(document).on('mouseup', '.police .tab .central .broadcast', function () {
			exportEvent('origen_radio', 'StopTalkRadio', {});
		});

		$(document).on(
			'click',
			'.police .tab .central .actions-title .delete-alert',
			function () {
				const code = parseInt(
					$('.police .tab .central .alerts-container .id-alert').text()
				);
				centralFunctions.deleteAlert(code);
			}
		);

		$(document).on(
			'click',
			'.police .tab .central .btn-save-note-alert',
			function () {
				const code = parseInt(
					$('.police .tab .central .alerts-container .id-alert').text()
				);
				const annotation = $(
					'.police .tab .central .alerts-container .input-note-alert'
				).val();
				centralFunctions.saveAlertNoteAlert(code, annotation);
			}
		);
	},

	fAccion1: () => {
		// console.log("HOLA");
	},

	addRpolMessage: (message) => {
		message = message.substring(2);

		message = message.split('^y');
		message[1] = `<span style="color:white;">${message[1]}</span>`;
		message = message.join(':');

		$('.police .tab .central .chat-messages').append(`
        <div class="chat-message animate__animated animate__fadeInLeft animate__fast">
            <div class="message">${message}</div>
        </div>
        `);
		$('.police .tab .central .chat-messages').scrollTop(
			$('.police .tab .central .chat-messages')[0].scrollHeight
		);
	},

	updateAgentesTable: (data) => {
		// console.log("Agentes: ", data);

		//COMPROBAR SI DATA ES UN ARRAY O UN OBJETO

		if (data) {
			$('.police .tab .central .agentes-servicio tbody').html('');
			let newSources = [];
			if (typeof data === 'object') {
				data = Object.values(data);
			}

			data.map((agente) => {
				if (agente) {
					if (agente.unit != '') {
						CreateReferenceBlip(
							mapCentral,
							agente.source,
							{ x: agente.ref.coords.x, y: agente.ref.coords.y },
							ReferenceSprite[agente.ref.sprite] ||
								'https://docs.fivem.net/blips/radar_level.png',
							`<div><div class="d-flex align-content-center mb-1"><span class="badge mt-0 mb-0 ${
								agente.dept == 'LSPD' ? 'bg-police' : 'bg-ems'
							} me-1 quicksand">${
								agente.dept
							}</span><div class="badge text-uppercase bg-dark quicksand">${
								agente.grade
							}</div></div><h4 class="d-flex bankgothic align-content-center">Agente ${
								agente.name
							} <small class="text-white-50 ms-1">#${
								agente.badge
							}</small></h4><small class="agent-radio-label"><i class="fa-solid fa-walkie-talkie"></i> ${
								agente.unit
							}</small></div>`,
							ReferenceColor[agente.ref.color] || '#FFF'
						);
					}
					newSources.push(agente.source);
					const dept = agente.dept == 'LSPD' ? 'bg-police' : 'bg-ems';
					$('.police .tab .central .agentes-servicio tbody').append(`
                <tr>
                    <td>
                        <span class="badge ${dept} w-100 text-center">${
						agente.dept
					}</span>
                    </td>
                    <td>
                        ${agente.grade}
                    </td>
                    <td>
                        ${agente.name} (${agente.badge})
                    </td>
                    ${
						agente.ready
							? `<td class="text-success">DISPONIBLE</td>`
							: `<td class="text-danger">NO DISPONIBLE</td>`
					}
                    <td class="text-center">
                        <button class="btn btn-action btn-small" onclick="mapFunctions.setBlipFocus(${
							agente.source
						})"><i class="fa-solid fa-location-crosshairs"></i></button>
                    </td>
                </tr>
                `);
				}
			});
			mapFunctions.checkPoliceSources(newSources);
		}
	},
	updatePoliceCarsMap: (data) => {
		if (data) {
			Object.entries(data).map(([key, vehicle]) => {
				// console.log(vehicle, key);
				CreateBlip(
					mapCentral,
					'car-' + key,
					{ x: vehicle.coords.x, y: vehicle.coords.y },
					'https://origennetwork.com/images/Servidores/Cochepoliciacolor.png',
					`<div>${vehicle.model}</div><div>${vehicle.plate}</div>`
				);
			});
		}
	},

	addAlert(event) {
		centralFunctions.alerts.push(event.data.alert);
		const index = centralFunctions.alerts.length - 1;

		addBlipAtCoords(
			checkNumber(event.data.alert.code),
			event.data.alert.coords.y,
			event.data.alert.coords.x,
			event.data.alert.title,
			event.data.alert.street,
			secondsOrMinutes(event.data.alert.time),
			index
		);

		if ($('.police .tab .central .tabla-dispatch tbody .no-alerts').length > 0) {
			$('.police .tab .central .tabla-dispatch tbody').html('');
		}
		$('.police .tab .central .tabla-dispatch tbody').append(`
            <tr index="${index}" class="new-alert" id="alert-${event.data.alert.code}">
                <td>#${checkNumber(event.data.alert.code)}</td>
                <td>${event.data.alert.title}</td>
                <td>${event.data.alert.street}</td>
                <td class="timing">${secondsOrMinutes(event.data.alert.time)}</td>
                <td class="units"></td>
            </tr>
        `);
	},
	intervalAlerts: () => {
		// console.log("ALERTAS TOTALES: ", centralFunctions.alerts.length);
		if (centralFunctions.alerts.length > 0) {
		}
		intervalAlert = setInterval(() => {
			// console.log("Me ejecuto");
			centralFunctions.alerts.map((alert, i) => {
				alert.time += 10000;
				$(
					".police .tab .central .tabla-dispatch tbody tr[index='" +
						i +
						"'] .timing"
				).text(secondsOrMinutes(alert.time));
			});
		}, 10000);
	},
	setAlertShowing: (alert, index) => {
		$('.police .tab .central .actions-title').fadeIn(300);
		$('.police .tab .central .alerts-container .id-alert').text(
			checkNumber(alert.code)
		);
		$('.police .tab .central .unidades-dispo').attr('index', index);
		$('.police .tab .central .alerts-container .title-alert').text(alert.title);
		$('.police .tab .central .alerts-container .street-alert').text(alert.street);
		$('.police .tab .central .alerts-container .time-alert').text(
			'Hace ' + secondsOrMinutes(alert.time)
		);
		$('.police .tab .central .tabla-dispatch tbody tr.selected').removeClass(
			'selected'
		);
		$(
			".police .tab .central .tabla-dispatch tbody tr[index='" + index + "']"
		).addClass('selected');
		$('.police .tab .central .alerts-container .input-note-alert')
			.val(alert.annotation || '')
			.attr('disabled', false);

		let metadataHtml = '';
		const metadata = alert.metadata;
		if (metadata) {
			Object.keys(metadata).map((key) => {
				let icon = '';
				let text = '';
				switch (key) {
					case 'name':
						icon = 'user';
						text =
							"<b style='margin-right:.5vh;'>AGENTE: </b> " + metadata[key];
						break;
					case 'model':
						icon = 'car';
						text =
							"<b style='margin-right:.5vh;'>VEHÍCULO: </b> " +
							metadata[key];
						break;
					case 'plate':
						icon = 'keyboard';
						text =
							"<b style='margin-right:.5vh;'>MATRÍCULA: </b> " +
							metadata[key];
						break;
					case 'speed':
						icon = 'tachometer-alt';
						text =
							"<b style='margin-right:.5vh;'>VELOCIDAD: </b> " +
							metadata[key];
						break;
					case 'weapon':
						icon = 'gun';
						text =
							"<b style='margin-right:.5vh;'>ARMA: </b> " + metadata[key];
						break;
					case 'ammotype':
						icon = 'record-vinyl';
						text = metadata[key];
						break;
					case 'color':
						icon = 'tint';
						text =
							"<b>COLOR:</b> <div class='color-car' style='background-color:rgb(" +
							metadata[key] +
							'); box-shadow: 0 0 10px rgb(' +
							metadata[key] +
							")'></div>";
						break;
				}
				metadataHtml += `<div class="alert-metadata-item"><i class="fas fa-${icon}"></i> ${text}</div>`;
			});
		}
		$('.police .tab .central .alerts-container .message-alert').html(`
            ${alert.message ? alert.message : ''}
            <div class="alert-data">
                ${metadataHtml}
            </div>
        `);
	},

	deleteAlert: (code) => {
		centralFunctions.alerts = centralFunctions.alerts.filter(
			(alert) => alert.code != code
		);
		$('.police .tab .central .tabla-dispatch tbody tr.selected').remove();
		mapFunctions.destroyAlertBlip(code);
		$('.police .tab .central .alerts-container .id-alert').text('-');
		$('.police .tab .central .alerts-container .title-alert').text('-');
		$('.police .tab .central .alerts-container .street-alert').text('-');
		$('.police .tab .central .alerts-container .time-alert').text('-');
		$('.police .tab .central .alerts-container .message-alert').text('-');
		$('.police .tab .central .actions-title').fadeOut(300);
		$('.police .tab .central .alerts-container .input-note-alert')
			.val('')
			.attr('disabled', true);

		//REGENERA EL INDEX DE LOS TR DE LA TABLA
		$('.police .tab .central .tabla-dispatch tbody tr').each((i, tr) => {
			$(tr).attr('index', i);
		});
	},
	saveAlertNoteAlert: (code, annotation) => {
		TriggerCallback('EditAlert:police', { code, annotation });
		//NOTIFICACIÓN DE GUARDADO
	}
};

agentesFunctions = {
	loadAgentesEvents: () => {
		$(document).on('click', '.police .agent-list .agent', function () {
			const citizenid = $(this).attr('cid');
			agentesFunctions.loadAgente(citizenid);
		});

		$(document).on('click', '.police .agent-grade', function () {
			fetch('GetPoliceGrades').then((data) => {
				// console.log(data);
				let lspdGrades = '';
				let bcsdGrades = '';
				const citizenid = $(
					'.police ' + policeTabSelected + ' .agent-ficha .citizenid'
				)
					.text()
					.trim();
				//RECORRE data (OBJETO) Y AÑADE UN HTML CON NAME, PAYMENT, SCALE Y AÑADELO A LSPDGRADES O BCSDGRADES EN FUNCIÓN DEL TYPE Y UN ATRIBUTO CON LA KEY DEL OBJETO
				for (const key in data) {
					const element = data[key];
					if (element.type == 'lspd') {
						lspdGrades += `<div class="grade" data-id="${key}" onclick="agentesFunctions.setRange('${citizenid}', ${key}, '${element.name}')"><div class="grade-name">${element.name}</div><div class="grade-payment">${element.payment}$</div><div class="grade-scale">${element.scale}</div></div>`;
					} else {
						bcsdGrades += `<div class="grade" data-id="${key}" onclick="agentesFunctions.setRange('${citizenid}', ${key}, '${element.name}')"><div class="grade-name">${element.name}</div><div class="grade-payment">${element.payment}$</div><div class="grade-scale">${element.scale}</div></div>`;
					}
				}

				OpenModal(
					'Cambiar rango',
					`
                <div class="scroll-rangos">
                    <div class="row">
                        <div class="col-6">
                            <div class="title-1">LSPD</div>
                            ${lspdGrades}
                        </div>
                        <div class="col-6">
                            <div class="title-1">BCSD</div>
                            ${bcsdGrades}

                        </div>
                    </div>
                </div>
            `,
					'<div></div>',
					'Cancelar',
					50
				);
			});
		});

		$(document).on('click', '.police .agent-placa', function () {
			let placa = $(this).text().trim();
			OpenModal(
				'Cambiar nº de placa',
				`
                <label>Nº de placa</label>
                <input maxlength="3" type="number" class="form-control input-placa-number" value="${placa}">
                <div class="error d-none text-uppercase text-danger mt-2">El número de placa debe tener 3 dígitos obligatoriamente.</div>
            `,
				`<button class='btn-modal' onclick="agentesFunctions.savePlacaNumber()">Guardar</button>`,
				'Cancelar',
				35
			);
		});

		$(document).on('click', '.police .agentes .add-agente', function () {
			fetch('GetClosestPlayers', { job: 'police' }).done((cb) => {
				let html = '';
				if (cb && cb.length > 0) {
					cb.map((citizen) => {
						html += `
                        <div class="col-4 h-100 mb-3">
                            <div class="citizen-box" onclick="agentesFunctions.contratarAgente('${
								citizen.citizenid
							}')">
                                <div class="citizen-image image-${
									citizen.citizenid
								}" style="background-image:url(${
							citizen.image || defaultImage
						})"></div>
                                <div class="p-2 text-center">
                                    <div class="citizen-name">${
										citizen.firstname + ' ' + citizen.lastname
									}</div>

                                </div>
                            </div>
                        </div>
                        `;
					});
				} else {
					// console.log(cb);
					html = `
                            <div class="col-12 text-muted">
                                <h4 class="citizen-name">No hay personas cerca de ti.</h4>
                            </div>
                        `;
				}
				OpenModal(
					'Añadir agente',
					`
                <div class="citizen-box-list">
                    <div class="row m-titles">
                        ${html}
                    </div>
                </div>
                `,
					'<div></div>',
					'Cancelar',
					60
				);
			});
		});
		$(document).on('click', '.police .btn-search-agent', function () {
			agentesFunctions.searchAgente($('.police .input-search-agent').val());
		});

		$(document).on('keyup', '.police .input-search-agent', function (event) {
			agentesFunctions.searchAgente($(this).val());
		});
	},
	loadAgentes: () => {
		$('.police ' + policeTabSelected + ' .agentes .agent-list')
			.html('')
			.fadeOut(0, function () {
				TriggerCallback('origen_menu:police:GetPoliceList', {}).done((cb) => {
					// console.log(cb)
					if (cb && cb.length > 0) {
						cb.map((agente) => {
							const citizenName = agente.firstname + ' ' + agente.lastname;
							const citizenId = agente.citizenid;
							const citizenGrade = agente.grade;
							const citizenImage = agente.image || defaultImage;
							const citizenBadge = agente.badge || 'Desconocido';
							$(policeTabSelected + ' .agent-list').append(`
                        <div class="white-block agent agente-${citizenId}" cid="${citizenId}">
                            <div class="citizen-image image-${citizenId}" style="background-image:url('${citizenImage}');"></div>
                            <div class="citizen-info w-100">
                                <div class="agent-name w-100">${citizenName}</div>
                                <div class="d-flex text-uppercase citizen-fast-data justify-content-between">
                                    <div class="agente-rango"><span class="citizen-id">${citizenGrade}</span></div>
                                    <div class="agente-placa"><i class="fa-solid fa-id-badge"></i> <span class="citizen-phone">${citizenBadge}</span></div>
                                </div>
                            </div>
                        </div>`);
						});
					} else {
						$('.police ' + policeTabSelected + ' .agentes .agent-list').html(`
                    <div class="col-12 text-muted">
                        <h4 class="report-name">No se han encontrado resultados</h4>
                    </div>`);
					}
					$('.police ' + policeTabSelected + ' .agentes .agent-list').fadeIn(
						300
					);
				});
			});
	},
	loadAgente: function (citizenid) {
		$('.police ' + policeTabSelected + ' .agentes .agent-ficha').fadeOut(
			300,
			function () {
				TriggerCallback('origen_menu:police:GetPolice', {
					citizenid
				}).done((cb) => {
					// console.log(cb);
					let birthdate = cb.birthdate.split('-');
					let citizenNotes = '';
					let citizenNotesPinned = '';
					let citizenReports = '';
					let citizenCondecorates = '';
					let citizenDivisions = '';

					if (cb.reports && cb.reports.length > 0) {
						cb.reports.map(function (report) {
							citizenReports += `
                        <div class="informe">
                            <span class="report-name">${report.title}</span> #<span class="report-id">${report.id}</span>
                        </div>`;
						});
					} else {
						citizenReports = `
                        <ul class="list-group w-100">
                            <li class="list-group-item list-group-item-action no-notes">
                                <h5>No hay informes registrados</h5>
                            </li>
                        </ul>
                    `;
					}

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

					if (cb.condecorates && Object.keys(cb.condecorates).length > 0) {
						// $(".police "+policeTabSelected+" .agent-ficha .agent-condecoraciones").append(`
						// <div class="condecoracion" onclick="agentesFunctions.removeCondecorate('${id}', $(this))">
						//     <div class="retirar">RETIRAR</div>
						//     <img src="${url}">
						//     <div class="condecoracion-title">${name}</div>
						// </div>
						// `);
						Object.keys(cb.condecorates).map((condecorate) => {
							// console.log(condecorate);
							//Comprueba si el key de condecorate coincide con alguna del array de objetos de condecorates. Si coincide, obtiene su URL y su NAME
							let url = condecorates[condecorate].url;
							let name = condecorates[condecorate].name;
							let id = condecorates[condecorate].id;
							citizenCondecorates += `
                        <div class="condecoracion" onclick="agentesFunctions.removeCondecorate('${id}', $(this))">
                            <div class="retirar">RETIRAR</div>
                            <img src="${url}">
                            <div class="condecoracion-title">${name}</div>
                        </div>
                        `;
						});
					} else {
						citizenCondecorates = `
                    <div class="condecoracion w-100 no-condecoracion">

                        <div class="w-100 text-muted">No hay condecoraciones</div>
                    </div>
                    `;
					}

					if (cb.divisions && Object.keys(cb.divisions).length > 0) {
						// $(".police "+policeTabSelected+" .agent-ficha .agent-condecoraciones").append(`
						// <div class="condecoracion" onclick="agentesFunctions.removeCondecorate('${id}', $(this))">
						//     <div class="retirar">RETIRAR</div>
						//     <img src="${url}">
						//     <div class="condecoracion-title">${name}</div>
						// </div>
						// `);
						Object.keys(cb.divisions).map((condecorate) => {
							//Comprueba si el key de condecorate coincide con alguna del array de objetos de condecorates. Si coincide, obtiene su URL y su NAME
							let url = divisions[condecorate].url;
							let name = divisions[condecorate].name;
							let id = divisions[condecorate].id;
							citizenDivisions += `
                        <div class="condecoracion" onclick="agentesFunctions.removeDivision('${id}', $(this))">
                            <img src="${url}">
                            <div class="condecoracion-title">${name}</div>
                            <div class="retirar">RETIRAR</div>
                        </div>
                        `;
						});
					} else {
						citizenDivisions = `
                    <div class="condecoracion w-100 no-divisions">

                        <div class="w-100 text-muted">No hay condecoraciones</div>
                    </div>
                    `;
					}

					$('.police ' + policeTabSelected + ' .agentes .agent-ficha')
						.html(
							`
                <div class="row d-flex align-items-center m-titles citizen-info-all mt-0">
                    <div class="col-2 p-0">
                        <div class="citizen-photo" style="background-image:url('${
							cb.image || defaultImage
						}')">
                            <div class="edit-photo"><img src="./img/webp/edit.webp"></div>
                        </div>
                    </div>
                    <div class="col-10 pe-0">
                        <div class="d-flex w-100 flex-data">
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Nombre</div>
                                    <div class="info-box-value">${cb.firstname}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Apellido</div>
                                    <div class="info-box-value">${cb.lastname}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Género</div>
                                    <div class="info-box-value">${cb.gender}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Nacionalidad</div>
                                    <div class="info-box-value">${cb.nationality}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Fecha de Nacimiento</div>
                                    <div class="info-box-value">${birthdate[0]}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">ID</div>
                                    <div class="info-box-value citizenid">${
										cb.citizenid
									}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Teléfono</div>
                                    <div class="info-box-value">${
										cb.phone || 'Desconocido'
									}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Cuenta Bancaria</div>
                                    <div class="info-box-value">${cb.iban}</div>

                                </div>
                            </div>
                            <div class="w-33">
                                <div class="info-box m-1">
                                    <div class="info-box-title">Jurisdicción</div>
                                    <div class="info-box-value text-uppercase">${
										cb.department
									}</div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6 pe-1">
                        <div class="info-box m-1 d-flex justify-content-between align-items-center">
                            <h4>RANGO</h4>
                            <div class="agent-grade">${cb.grade}</div>
                        </div>
                    </div>
                    <div class="col-6 ps-1">
                        <div class="info-box m-1 d-flex justify-content-between align-items-center">
                            <h4>Nº DE PLACA</h4>
                            <div class="agent-placa">${cb.badge}</div>

                        </div>
                    </div>
                    <div class="col-6 pe-1">
                        <div class="info-box m-1 mt-2">
                            <div class="notes-title d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-quote-right"></i> Notas</h4>
                                <div class="new-button new-note-agente"><i class="fas fa-plus"></i> Nueva nota</div>
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
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-sticky-note"></i> Informes</h4>
                            </div>
                            <div class="citizen-info-container mt-2 d-flex flex-wrap citizen-informes align-content-start">
                               ${citizenReports}
                            </div>
                        </div>
                    </div>

                    <div class="col-6 pe-1">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fa-solid fa-medal"></i> Condecoraciones</h4>
                                <div class="new-button add-condecorate" onclick="agentesFunctions.addCondecorate()"><i class="fas fa-plus"></i> Condecorar</div>
                            </div>
                            <div class="citizen-info-container mt-2 d-flex agent-condecoraciones">
                                ${citizenCondecorates}
                            </div>
                        </div>
                    </div>
                    <div class="col-6 ps-1">
                        <div class="info-box m-1 mt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4><i class="fa-solid fa-building-user"></i> Divisiones</h4>
                                <div class="new-button set-division" onclick="agentesFunctions.addDivision()"><i class="fas fa-plus"></i> Elegir división</div>
                            </div>
                            <div class="citizen-info-container mt-2 d-flex agent-divisions">
                                ${citizenDivisions}
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button class="btn btn-danger mt-3 mb-2" onclick='agentesFunctions.modalDespedirAgente("${
							cb.citizenid
						}")'><i class="lni lni-trash-can"></i> Despedir Agente</button>
                    </div>
                </div>
                `
						)
						.fadeIn(300);
					$(this).animate({ scrollTop: 0 }, 200);

					$(
						'.police ' + policeTabSelected + ' .agentes .agent-list .agent'
					).removeClass('selected');
					$(
						'.police ' +
							policeTabSelected +
							' .agentes .agent-list .agente-' +
							citizenid
					).addClass('selected');
				});
			}
		);
	},
	savePlacaNumber: () => {
		const placa = $('.c-modal .input-placa-number').val();
		const citizenid = $('.police ' + policeTabSelected + ' .agent-ficha .citizenid')
			.text()
			.trim();
		if (placa.length != 3) {
			$('.c-modal .input-placa-number').addClass('is-invalid');
			$('.c-modal .error').removeClass('d-none');
			return;
		} else {
			const newPlaca = $('.c-modal .input-placa-number').val();
			// console.log(newPlaca, citizenid);
			TriggerCallback('origen_menu:police:SetPoliceBadge', {
				citizenid,
				badge: newPlaca
			}).then((cb) => {
				// console.log(cb);
				if (cb) {
					CloseModal();
					$('.police ' + policeTabSelected + ' .agent-ficha .agent-placa').text(
						newPlaca
					);
				}
			});

			return;
		}
	},
	setRange: (citizenid, grade, label) => {
		// console.log(grade + "");
		TriggerCallback('origen_menu:server:SetJob', {
			citizenid,
			grade: grade + '',
			job: 'police'
		}).then((cb) => {
			if (cb) {
				$('.police ' + policeTabSelected + ' .agent-ficha .agent-grade').text(
					label
				);
				CloseModal();
			}
		});
	},

	contratarAgente: (citizenid) => {
		TriggerCallback('origen_menu:server:SetJob', {
			citizenid,
			job: 'police',
			grade: "0"
		}).then((cb) => {
			if (cb) {
				$('.police .agentes .agent-list').prepend(`
                <div class="white-block agent agente-${cb.citizenid}" cid="${
					cb.citizenid
				}">
                    <div class="citizen-image" style="background-image:url('${
						cb.image || defaultImage
					}');"></div>
                    <div class="citizen-info w-100">
                        <div class="agent-name w-100">${
							cb.firstname + ' ' + cb.lastname
						}</div>
                        <div class="d-flex text-uppercase citizen-fast-data justify-content-between">
                            <div class="agente-rango"><span class="citizen-id">${
								cb.grade
							}</span></div>
                            <div class="agente-placa"><i class="fa-solid fa-id-badge"></i> <span class="citizen-phone">000</span></div>
                        </div>
                    </div>
                </div>
                `);
				CloseModal();
			} else {
				//NOTIFICACION ERROR
				CloseModal();
			}
		});
	},
	searchAgente: (text) => {
		if (text.length > 1) {
			//FILTRA LOS AGENTES CON LA CLASE AGENT SEGUN EL CONTENIDO DEL TEXTO Y OCULTA LOS QUE NO COINCIDEN
			$('.police ' + policeTabSelected + ' .agentes .agent-list .agent').each(
				function () {
					if ($(this).text().toLowerCase().includes(text.toLowerCase())) {
						$(this).fadeIn(300);
					} else {
						$(this).fadeOut(300);
					}
				}
			);
		} else {
			$('.police ' + policeTabSelected + ' .agentes .agent-list .agent').fadeIn(
				300
			);
		}
	},

	modalDespedirAgente: (citizenid) => {
		// console.log("HOLA");
		OpenModal(
			`ATENCIÓN`,
			`<div class="row">
                <div class="col-1">
                    <img src="./img/webp/trash.webp" class="img-fluid">
                </div>
                <div class="col-11 d-flex align-items-center">
                    <div>
                    <h5 class="text-danger fw-bold mb-3">Esta acción despedirá al agente seleccionado.</h5>
                    <h4>¿Desea continuar?</h4>
                    </div>
                </div>

            </div>`,
			`<button class="btn-modal" onclick="agentesFunctions.deleteAgente('${citizenid}')">Confirmar</button>`,
			'Cancelar',
			80
		);
	},

	deleteAgente: (citizenid) => {
		TriggerCallback('origen_menu:server:SetJob', { citizenid }).then((cb) => {
			if (cb) {
				$(
					'.police ' +
						policeTabSelected +
						' .agentes .agent-list .agente-' +
						citizenid
				).fadeOut(300);
				CloseModal();
			}
		});
	},

	addCondecorate: () => {
		//RECORRE cb Y CREA UNA CONDECORACION POR CADA OBJETO
		let condecoraciones = '';
		Object.values(condecorates).forEach((condecoracion) => {
			condecoraciones += `
            <div class="col-4">
                <div class="condecoracion" onclick="agentesFunctions.setCondecorate('${condecoracion.id}', '${condecoracion.url}', '${condecoracion.name}')">
                    <div class="condecoracion-image" style="background-image:url('${condecoracion.url}');"></div>
                    <div class="condecoracion-info">
                        <div class="condecoracion-name">${condecoracion.name}</div>
                        <div class="condecoracion-description">${condecoracion.description}</div>
                    </div>
                </div>
            </div>
            `;
		});

		OpenModal(
			'Agregar Condecoración',
			`<div class="row max-height">
           ${condecoraciones}
        </div>`,
			'<div></div>',
			'Cancelar',
			80
		);
	},
	setCondecorate: (id, url, name) => {
		const citizenid = $('.police ' + policeTabSelected + ' .agent-ficha .citizenid')
			.text()
			.trim();
		TriggerCallback('origen_menu:police:UpdatePoliceMetaData', {
			type: 'condecorates',
			citizenid,
			id,
			value: true
		}).then((cb) => {
			if (cb) {
				$(
					'.police ' +
						policeTabSelected +
						' .agent-ficha .agent-condecoraciones .no-condecoracion'
				).remove();
				$('.police ' + policeTabSelected + ' .agent-ficha .agent-condecoraciones')
					.append(`
                <div class="condecoracion" onclick="agentesFunctions.removeCondecorate('${id}', $(this))">
                    <div class="retirar">RETIRAR</div>
                    <img src="${url}">
                    <div class="condecoracion-title">${name}</div>
                </div>
                `);
				CloseModal();
			}
		});
	},
	removeCondecorate: (id, yo) => {
		const citizenid = $('.police ' + policeTabSelected + ' .agent-ficha .citizenid')
			.text()
			.trim();
		TriggerCallback('origen_menu:police:UpdatePoliceMetaData', {
			type: 'condecorates',
			citizenid,
			id
		}).then((cb) => {
			if (cb) {
				yo.addClass('scale-out').fadeOut(500, function () {
					yo.remove();
				});
			}
		});
	},

	addDivision: () => {
		//RECORRE cb Y CREA UNA CONDECORACION POR CADA OBJETO
		let htmlDivisions = '';
		Object.values(divisions).forEach((division) => {
			htmlDivisions += `
            <div class="col-4">
                <div class="condecoracion" onclick="agentesFunctions.setDivision('${division.id}', '${division.url}', '${division.name}')">
                    <img src="${division.url}" class="w-100 mb-3 p-2">
                    <div class="condecoracion-info">
                        <div class="condecoracion-name">${division.name}</div>

                    </div>
                </div>
            </div>
            `;
		});

		OpenModal(
			'Agregar División',
			`<div class="row max-height">
           ${htmlDivisions}
        </div>`,
			'<div></div>',
			'Cancelar',
			80
		);
	},
	setDivision: (id, url, name) => {
		const citizenid = $('.police ' + policeTabSelected + ' .agent-ficha .citizenid')
			.text()
			.trim();
		TriggerCallback('origen_menu:police:UpdatePoliceMetaData', {
			type: 'divisions',
			citizenid,
			id,
			value: true
		}).then((cb) => {
			if (cb) {
				$(
					'.police ' +
						policeTabSelected +
						' .agent-ficha .agent-divisions .no-divisions'
				).remove();
				$('.police ' + policeTabSelected + ' .agent-ficha .agent-divisions')
					.append(`
                <div class="condecoracion" onclick="agentesFunctions.removeDivision('${id}', $(this))">
                    <img src="${url}">
                    <div class="condecoracion-title">${name}</div>
                    <div class="retirar">RETIRAR</div>
                </div>
                `);
				CloseModal();
			}
		});
	},

	removeDivision: (id, yo) => {
		const citizenid = $('.police ' + policeTabSelected + ' .agent-ficha .citizenid')
			.text()
			.trim();
		// console.log(id, citizenid);
		TriggerCallback('origen_menu:police:UpdatePoliceMetaData', {
			type: 'divisions',
			citizenid,
			id
		}).then((cb) => {
			if (cb) {
				yo.addClass('scale-out').fadeOut(500, function () {
					yo.remove();
				});
			}
		});
	}
};

camerasFunctions = {
	cameraEvents: () => {
		$(document).on('click', '.cameras .refresh-cameras', function () {
			// console.log("hola");
			const yo = $(this);
			yo.attr('disabled', true);
			camerasFunctions.loadCameras();
			setTimeout(() => {
				yo.attr('disabled', false);
			}, 2000);
		});
	},

	loadCameras: () => {
		$('.police .cameras .camera-list').html('');
		TriggerCallback('origen_police:server:GetBodyCams', {}).done((cb) => {
			if (cb && cb.length > 0) {
				cb.map((camera) => {
					$('.police .cameras .camera-list.bodycam').append(`
                    <div class="camera scale-in" onclick="camerasFunctions.showCam('body', ${
						camera.source
					}, '${camera.name}', '${camera.badge} - ${camera.grade}')">
                        <img src="${camera.image || './img/default.jpg'}" class="rounded">
                        <div class="camera-info">
                            <div class="camera-title">${camera.name}</div>
                            <div class="camera-owner">${camera.badge} - ${
						camera.grade
					}</div>
                        </div>
                    </div>
                    `);
				});
			}
		});

		TriggerCallback('origen_police:server:GetVehiclesTracked', {}).done((cb) => {
			if (cb && Object.keys(cb).length > 0) {
				Object.entries(cb).map(([key, camera]) => {
					$('.police .cameras .camera-list.vehicles').append(`
                    <div class="camera scale-in" onclick="camerasFunctions.showCam('vehicle', ${key}, '${camera.model}', '${camera.plate}')">
                        <img src="https://origennetwork.com/images/Servidores/camarafotos.png">
                        <div class="camera-info">
                            <div class="camera-title">${camera.model}</div>
                            <div class="camera-owner">${camera.plate}</div>
                        </div>
                    </div>
                    `);
				});
			}
		});
		exportEvent('origen_police', 'GetCamsInArea', {}).done((cb) => {
			// console.log(cb);
			if (cb && cb.length > 0) {
				cb.map((camera, i) => {
					$('.police .cameras .camera-list.business').append(`
                    <div class="camera scale-in" onclick="camerasFunctions.showCam('business', ${
						camera.obj
					}, 'Cámara ${i + 1}', 'A ${camera.dist.toFixed(2)} metros')">
                        <img src="https://origennetwork.com/images/Servidores/camara4.png">
                        <div class="camera-info">
                            <div class="camera-title">Cámara ${i + 1}</div>
                            <div class="camera-owner"><i class="fas fa-map-marker-alt"></i> A ${camera.dist.toFixed(
								2
							)} metros</div>
                        </div>
                    </div>
                    `);
				});
			}
		});
	},
	showCam: (type, source, name, grade) => {
		if (type == 'body') {
			fetch('ShowBodycam', { id: source });
		}
		if (type == 'vehicle') {
			fetch('ShowCarcam', { netid: source });
		}
		if (type == 'business') {
			exportEvent('origen_police', 'ShowCam', { obj: source });
		}

		$('.cam-overlay .name').text(name);
		$('.cam-overlay .other').text(grade);
		setTimeout(() => {
			$.post('https://origen_menu/close', JSON.stringify({}));
			$('.screen').removeClass('show');
			$('.cam-overlay').fadeIn(300);
		}, 1000);
	}
};

vehiclesFunction = {
	loadVehicleList: (plate) => {
		TriggerCallback('origen_menu:police:SearchVehicle', { plate }).then((data) => {
			// console.log(data);
			if (data && data.length > 0) {
				$('.police ' + policeTabSelected + ' .vehicle-list').html('');

				data.map((vehicle) => {
					$('.police ' + policeTabSelected + ' .vehicle-list').append(`
                    <div class="white-block vehicle scale-in" id="${vehicle.plate}">
                        <i class="fa-solid fa-car icon"></i>
                        <div class="vehicle-name">
                            ${
								vehicle.label != 'NULL' ? vehicle.label : 'Desconocido'
							} - <span>${vehicle.plate}</span>
                        </div>
                        <div class="d-flex text-uppercase citizen-fast-data justify-content-center flex-wrap mt-1 p-2">
                                <div class="w-100">
                                    <div class="report-owner">
                                        <i class="fas fa-user" aria-hidden="true"></i>
                                        <span>${vehicle.owner}</span>
                                    </div>
                                </div>
                                <div class="w-100">
                                    <div class="report-date">
                                        <i class="fa-solid fa-location-dot"></i>
                                        <span>${vehicle.status || 'Desconocido'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
				});
			}
		});
	}
};

policeFunctions.loadPoliceEvents();

$(document).on('click', '.police .tab .btn-search-vehicle', function () {
	const label = $(this).parent().parent().find('.input-search-vehicles').val().trim();
	if (label.length > 2) {
		vehiclesFunction.loadVehicleList(label);
	} else {
		sendNotification('error', 'Debes introducir al menos 3 caracteres');
	}
});

$(document).on('click', '.police .tab .white-block.vehicle', function () {
	const plate = $(this).attr('id');
	// console.log("Click!");

	$('.police ' + policeTabSelected + ' .ficha-vehiculo').fadeOut(300, function () {
		const ficha = $(this);
		TriggerCallback('origen_menu:police:GetVehicle', { plate }).then((data) => {
			// console.log(data);
			if (data) {
				ficha.attr('id', 'm-' + plate);
				ficha.html(`
                <div class="row m-titles">
                    <div class="col-6 p-0">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">
                                Modelo
                            </div>
                            <div class="info-box-value">
                                ${data.label}
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">
                                Matrícula
                            </div>
                            <div class="info-box-value id-informe">
                                ${data.plate}
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0 mt-2">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">
                                Titular
                            </div>
                            <div class="info-box-value id-informe">
                                ${data.owner}
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0 mt-2">
                        <div class="info-box m-1 h-100">
                            <div class="info-box-title">
                                Busca y captura
                            </div>
                            <div class="info-box-value id-vehiculo">
                                    <div class="busca-captura-vehicle btn-group mt-2 w-100" vehicle-id="${
										data.plate
									}" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" class="btn-check si" name="btn-vehicle-${
											data.plate
										}" id="btn-vehicle-${
					data.plate
				}-1" autocomplete="off" ${data.busqueda == 1 && 'checked'}>
                                        <label class="btn btn-outline-primary" for="btn-vehicle-${
											data.plate
										}-1">Si</label>

                                        <input type="radio" class="btn-check" name="btn-vehicle-${
											data.plate
										}" id="btn-vehicle-${
					data.plate
				}-2" autocomplete="off" ${data.busqueda == 0 && 'checked'}>
                                        <label class="btn btn-outline-primary no" for="btn-vehicle-${
											data.plate
										}-2">No</label>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row m-titles mt-3">
                    <div class="col-12 p-0">
                        <div class="info-box m-1 mt-2">
                            <div
                                class="d-flex justify-content-between align-items-center"
                            >
                                <h4>
                                    <i
                                        class="fas fa-sticky-note"
                                    ></i>
                                    Anotaciones del vehículo
                                </h4>
                            </div>
                            <div
                                class="citizen-info-container-mini mt-2 d-flex flex-wrap citizen-informes align-content-start"
                            >
                                <textarea
                                    class="input w-100 input-vehiculo-desc"
                                    placeholder="Introduce alguna anotación..."
                                    rows="7"
                                    plate="${data.plate}"
                                >${data.description}</textarea>
                            </div>
                        </div>
                    </div>

                </div>
                `);
				ficha.fadeIn(300);
			} else {
				sendNotification('error', 'No se ha encontrado el vehículo');
			}
		});
	});
});

$(document).on(
	'click',
	'.police .ficha-vehiculo .busca-captura-vehicle .btn-check',
	function () {
		$('.police .ficha-vehiculo .busca-captura-vehicle .btn-check').attr(
			'checked',
			false
		);
		$(this).attr('checked', true);
		const plate = $('.police ' + policeTabSelected + ' .ficha-vehiculo')
			.attr('id')
			.replace('m-', '');
		let value = 0;
		if ($(this).hasClass('si')) {
			value = 1;
		}
		// console.log({ plate, key: "busqueda", value });
		TriggerCallback('origen_menu:police:UpdateVehicle', {
			plate,
			key: 'busqueda',
			value
		});
		sendNotification('success', 'Se ha actualizado la búsqueda del vehículo');
	}
);

$(document).on('focusout', '.police .ficha-vehiculo .input-vehiculo-desc', function () {
	const plate = $(this).attr('plate');
	const value = $(this).val();
	TriggerCallback('origen_menu:police:UpdateVehicle', {
		plate,
		key: 'description',
		value
	});
	sendNotification('success', 'Se ha actualizado la descripción del vehículo');
});

let timers = [];

function countdownPolice(seconds, key) {
	if (timers[key]) {
		clearInterval(timers[key]);
	}
	timers[key] = setInterval(() => {
		let minutes = Math.floor(seconds / 60);
		let remainingSeconds = seconds % 60;
		let formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds
			.toString()
			.padStart(2, '0')}`;
		$(`.tab-content .solicitudes-container .temporizador-${key}`).text(formattedTime);
		seconds--;
		if (seconds < 0) {
			clearInterval(timers[key]);
			$(`.tab-content .solicitudes-container .temporizador-${key}`)
				.text('00:00')
				.fadeOut(300);
			$('.tab-content .solicitud-' + key + ' .zona-accion').css('display', 'none');
			$('.tab-content .solicitud-' + key + ' .estado').css('display', 'flex');
		}
	}, 1000);
}

function clearAllCountdownPolice() {
	for (let key in timers) {
		clearInterval(timers[key]);
	}
	timers = [];
}

$(document).on('click', '.solicitudes-container .accion-solicitud', function () {
	const type = $(this).attr('type');
	const action = $(this).attr('action') == 'true' ? true : false;
	$(this).parent().parent().parent().find('.zona-accion').css('display', 'none');
	$(this).parent().parent().parent().find('.estado').css('display', 'flex');
	s_success.play();
	if (action) {
		sendNotification(
			'success',
			'La solicitud ha sido aceptada',
			'La central recibirá una alerta cuando el golpe haya comenzado'
		);
	} else {
		sendNotification(
			'success',
			'Has enviado al cuerpo IA a defender el golpe',
			'Ellos se ocuparán de todo'
		);
	}
	TriggerCallback('origen_police:server:UpdateRobRequest', { type, accepted: action });
});

$(document).on('input', '.buscar-deudor, .buscar-deudor-cant', function () {
	const nameValue = $('.buscar-deudor').val().toLowerCase();
	const amountValue = parseInt($('.buscar-deudor-cant').val());

	$('.c-modal .scroll-citizen-modal .col-4').each(function () {
		const name = $(this).find('.citizen-name').text().toLowerCase();
		const amount = parseInt($(this).find('.price').text());

		if (name.indexOf(nameValue) === -1 || (amountValue > 0 && amount < amountValue)) {
			$(this).fadeOut(300);
		} else {
			$(this).fadeIn(300);
		}
	});
});

$(document).on('click', '.c-modal .deudor', function () {
	policeFunctions.createTab('Ciudadanos', '.police-citizen');
	const that = $(this);
	CloseModal();
	setTimeout(() => {
		policeFunctions.getCitizen(that.attr('citizenid'));
	}, 500);
});
