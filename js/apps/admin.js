let misiones;
let locations;
let locationsTypes;

adminFunctions = {
	adminNavigation: function (to) {
		if (to == 'admin-config') {
			TriggerCallback('origen_menu:server:isPlayerGod', {}).done((cb) => {
				if (!cb) {
					return
				} else {
					return new Promise(function (resolve, reject) {
						$('.app-container.show').fadeOut(300, function () {
							$('.app.admin .back-section')
								.removeClass('animate__fadeOutUp')
								.addClass('animate__fadeInDown')
								.fadeIn(300);
							$(this).removeClass('show');
							$('.app-container.' + to).fadeIn(300, function () {
								$(this).addClass('show');
								resolve();
							});
		
							switch(to) {
								case 'admin-items': loadAdminItems(); break;
								case 'admin-gangs': loadAdminGangs(); break;
								case 'admin-local': loadAdminBusiness(); break;
								case 'admin-quests': loadAdminQuests(); break;
								case 'admin-crafteables': loadAdminItems(); loadCraftablesItems(); break;
								case 'admin-tp': loadTeleports(); break;
								case 'admin-config': loadConfigAdmin(); break;
							}
						});
					});
				}
			});
		} else {
			return new Promise(function (resolve, reject) {
				$('.app-container.show').fadeOut(300, function () {
					$('.app.admin .back-section')
						.removeClass('animate__fadeOutUp')
						.addClass('animate__fadeInDown')
						.fadeIn(300);
					$(this).removeClass('show');
					$('.app-container.' + to).fadeIn(300, function () {
						$(this).addClass('show');
						resolve();
					});
	
					switch(to) {
						case 'admin-items': loadAdminItems(); break;
						case 'admin-gangs': loadAdminGangs(); break;
						case 'admin-local': loadAdminBusiness(); break;
						case 'admin-quests': loadAdminQuests(); break;
						case 'admin-crafteables': loadAdminItems(); loadCraftablesItems(); break;
						case 'admin-tp': loadTeleports(); break;
						case 'admin-config': loadConfigAdmin(); break;
					}
				});
			});
		}
	}
};

const npcFunctions = {
	auxSelectedGangs: [],
	auxSelectedBusiness: [],

	locationCoords: () => {
		fetch('GetCoords', {}).done((cb) => {
			if (cb) {
				$('.c-modal .locationCoords .input-cord-x').val(cb.x);
				$('.c-modal .locationCoords .input-cord-y').val(cb.y);
				$('.c-modal .locationCoords .input-cord-z').val(cb.z);
				$('.c-modal .locationCoords .input-cord-w').val(cb.w);
			}
		});
	},

	loadModalLocation: (ubicacion) => {
		let missionsListHTML = '';

		for (let i = 0; i < Object.keys(misiones).length; i++) {
			const mission = misiones[Object.keys(misiones)[i]];

			missionsListHTML += `<option value="${mission.id}">${mission.name}</option>`;
		}

		let optionsLocationsHTML = '';

		Object.entries(locationsTypes).forEach(([key, value]) => {
			optionsLocationsHTML += `<option value="${key}">${value}</option>`;
		});

		OpenModal(
			ubicacion ? `Editar ubicación` : `Nueva ubiación`,
			`
            <h5>Ubicación</h5>
            <div class="row mb-4">
                <div class="col-6">
                    <label>Nombre</label>
                    <input class="form-control w-100 input-nombre-ubicacion" placeholder="Nombre de la ubiación">
                </div>
                <div class="col-6">
                    <label>Tipo</label>
                    <select class="form-control w-100 select-tipo-ubicacion">
                        <option disabled default>Selecciona el tipo</option>
                        ${optionsLocationsHTML}
                    </select>
                </div>
                <div class="col-4" style="display: none">
                    <label>Modelo</label>
                    <input class="form-control w-100 input-nombre-modelo" placeholder="Nombre del modelo">
                </div>
            </div>
            <h5>Coordenadas</h5>
            <div class="row mb-4 locationCoords">
                <div class="col-2">

                    <input class="form-control w-100 input-cord-x h-100" placeholder="Coord. X">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-y h-100" placeholder="Coord. Y">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-z h-100" placeholder="Coord. Z">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-w h-100" placeholder="Coord. H">
                </div>
                <div class="col-4">

                    <button class="btn-modal w-100" onclick="npcFunctions.locationCoords()">Copiar coordenadas</button>
                </div>
            </div>
            <h5 class="locationNpcAnims">Animaciones (Sólo NPC)</h5>
            <div class="locationNpcAnims row">
                <div class="col-4">
                    <label>Animación estática NPC</label>
                    <input class="form-control w-100 input-anim-1" placeholder="Introduce animación">
                </div>
                <div class="col-4">
                    <label>Animación NPC al aceptar misión</label>
                    <input class="form-control w-100 input-anim-2" placeholder="Introduce animación">
                </div>
                <div class="col-4">
                    <label>Animación del jugador al aceptar misión</label>
                    <input class="form-control w-100 input-anim-3" placeholder="Introduce animación">
                </div>
            </div>
			<h5>Misiones</h5>
			<div class="p-2 info-box mt-2 assigned-missions">
				<div class="d-flex justify-content-center align-items-center w-100" style="gap:1vh">
					<select class="form-select w-100 select-location-misiones">
						<option selected disabled>Selecciona una misión</option>
						${missionsListHTML}
					</select>
					<button class="btn btn-action p-2" onClick="npcFunctions.bindMission()">Añadir</button>
				</div>

				<h6 class="mt-3">Asignadas</h6>
				<ul class="list-group multas-list mt-2 list-missions-binded">
					<li class="sin-items list-group-item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster">
						<div style="text-align: center; width: 100%;">No hay misiones asignadas</div>
					</li>
				</ul>
			</div>
        `,
			`<button class="btn-modal" onclick="npcFunctions.saveLocation(${ubicacion ? ubicacion : false})">Guardar cambios</button>`,
			'Cancelar',
			127
		);

		if (ubicacion) {
			$('.c-modal .input-nombre-ubicacion').val(locations[ubicacion].name);
			$('.c-modal .select-tipo-ubicacion option[value="' + locations[ubicacion].type + '"]').prop('selected', true);
			$('.c-modal .select-tipo-ubicacion').trigger('change');
			$('.c-modal .input-cord-x').val(locations[ubicacion].coords.x);
			$('.c-modal .input-cord-y').val(locations[ubicacion].coords.y);
			$('.c-modal .input-cord-z').val(locations[ubicacion].coords.z);
			$('.c-modal .input-cord-w').val(locations[ubicacion].coords.w);
			$('.c-modal .input-anim-1').val(locations[ubicacion].anim1);
			$('.c-modal .input-anim-2').val(locations[ubicacion].anim2);
			$('.c-modal .input-anim-3').val(locations[ubicacion].anim3);
			$('.c-modal .input-nombre-modelo').val(locations[ubicacion].model);

			const missions = locations[ubicacion].missions;

			if (missions && missions.length > 0) {
				$('.c-modal .list-missions-binded').html('');

				for (let i = 0; i < missions.length; i++) {
					let mission = missions[i];

					if (misiones[mission]) {
						$('.c-modal .list-missions-binded').append(`
							<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster" mission="${mission}">
								<div>${misiones[mission].name}</div>
								<div class="btn btn-action" onclick="npcFunctions.unbindMission(${mission})"><i class="fas fa-trash-alt delete-item" aria-hidden="true"></i></div>
							</li>
						`);
					}
				}
			}
		}
	},

	bindMission: () => {
		let mission = $('.c-modal .select-location-misiones').val();

		if (mission) {
			if ($('.c-modal .list-missions-binded [mission="' + mission + '"]').length > 0) {
				sendNotification('error', 'Esta misión ya está asignada');
				return;
			}

			$('.c-modal .list-missions-binded .sin-items').remove();

			$('.c-modal .list-missions-binded').append(`
				<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster" mission="${mission}">
					<div>${misiones[mission].name}</div>
					<div class="btn btn-action" onclick="npcFunctions.unbindMission(${mission})"><i class="fas fa-trash-alt delete-item" aria-hidden="true"></i></div>
				</li>
			`);
		}
	},

	unbindMission: (mission) => {
		$('.c-modal .list-missions-binded [mission="' + mission + '"]').remove();

		if ($('.c-modal .list-missions-binded li').length == 0) {
			$('.c-modal .list-missions-binded').append(`
				<li class="sin-items list-group-item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster">
					<div style="text-align: center; width: 100%;">No hay misiones asignadas</div>
				</li>
			`);
		}
	},

	saveLocation: (ubicacion) => {
		const nombre = $('.c-modal .input-nombre-ubicacion').val();
		const tipo = $('.c-modal .select-tipo-ubicacion').val();
		let x = $('.c-modal .input-cord-x').val();
		let y = $('.c-modal .input-cord-y').val();
		let z = $('.c-modal .input-cord-z').val();
		let w = $('.c-modal .input-cord-w').val();
		let anim1;
		let anim2;
		let anim3;
		let modelo;

		let valido = true;
		if (nombre == '' || nombre.length < 4) {
			sendNotification('error', 'El nombre debe contener al menos 4 caracteres');
			valido = false;
		}

		if (x == '' || y == '' || z == '' || w == '') {
			sendNotification('error', 'Debes introducir todas las coordenadas');
			valido = false;
		} else {
			x = parseFloat(x).toFixed(2);
			y = parseFloat(y).toFixed(2);
			z = parseFloat(z).toFixed(2);
			w = parseFloat(w).toFixed(2);
		}

		if (tipo != 'marker') {
			modelo = $('.c-modal .input-nombre-modelo').val();

			if (modelo == '' || modelo.length < 4) {
				sendNotification('error', 'Debes introducir el nombre del modelo');
				valido = false;
			}
		}

		if (tipo == 'new_npc') {
			anim1 = $('.c-modal .input-anim-1').val();
			anim2 = $('.c-modal .input-anim-2').val();
			anim3 = $('.c-modal .input-anim-3').val();
		}

		if (valido) {
			const data = {
				name: nombre,
				type: tipo,
				coords: {
					x,
					y,
					z,
					w
				},
				anim1,
				anim2,
				anim3,
				model: modelo,
				missions: []
			};

			if ($('.c-modal .list-missions-binded .sin-items').length == 0) {
				$('.c-modal .list-missions-binded li').each(function () {
					data.missions.push(parseInt($(this).attr('mission')));
				});
			}

			if (ubicacion)
				data.id = ubicacion;

			TriggerCallback(ubicacion ? "origen_quests:server:UpdateLocation" : 'origen_quests:server:CreateLocation', {data}).done((cb) => {
				if (cb) {
					CloseModal();

					sendNotification('success', ubicacion ? 'Ubicación editada correctamente' : 'Ubicación creada correctamente');
					loadAdminQuests();
				} else {
					sendNotification('error', ubicacion ? "No se ha podido editar la ubicación" : 'No se ha podido crear la ubicación');
				}
			});
		}
	},

	toggleLocation: (id, value) => {
		const $selector = $('.lista-ubicaciones [location-id="' + id + '"] .location-status');
		$selector.removeClass(value ? "off" : "on").addClass(value ? "on" : "off");
		$selector.text(value ? "Activa" : "Inactiva");
		$selector.attr("onclick", "npcFunctions.toggleLocation(" + id + ", " + (value ? 0 : 1) + ")");

		TriggerCallback("origen_quests:server:ToggleLocation", { id, active: value }).done((cb) => {
			if (cb) {
				sendNotification('success', 'La ubicación ha sido ' + (value ? "activada" : "desactivada") + ' correctamente');
			} else {
				sendNotification('error', 'No se ha podido ' + (value ? "activar" : "desactivar") + ' la ubicación');
			}
		});
	},

	modalEditLocation: (id) => {
		npcFunctions.loadModalLocation(id);
	},

	markLocation: (x, y, z) => {
		fetch('SetWaypointinCoords', { x, y });
		sendNotification('success', 'Ubicación marcada en el mapa');
	},


	confirmDeleteLocation: (id) => {
		OpenModal(
			`Eliminar ubicación`,
			`
            <h5>¿Estás seguro de eliminar esta ubicación?</h5>
            <p>Esta acción no se puede deshacer</p>
        `,
			`<button class="btn-modal" onclick="npcFunctions.deleteLocation(${id})">Eliminar</button>`,
			'Cancelar'
		);
	},

	deleteLocation: (id) => {
		TriggerCallback("origen_quests:server:DeleteLocation", { id }).done((cb) => {
			if (cb) {
				CloseModal();
				sendNotification('success', 'Ubicación eliminada correctamente');
				loadAdminQuests();
			} else {
				sendNotification('error', 'No se ha podido eliminar la ubicación');
			}
		});
	},

	modalEditMission: (yo) => {
		npcFunctions.loadModalMision(yo);
	},

	addItemRequerido: (item, label, quantity) => {
		let itemExistente = $(".c-modal ul.list-requeridos li[item='" + item + "']");
		if (itemExistente.length && !quantity) {
			let input = itemExistente.find('input');
			let valor = parseInt(input.val());
			input.val(valor + 1);
		} else {
			$('.c-modal ul.list-requeridos .sin-items').parent().remove();
			$('.c-modal ul.list-requeridos').append(`
            <li class="list-group-item item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster" item=${item}>
                <div>${label}</div>
                <div class="d-flex justify-content-center align-items-center">
                    <input placeholder="CANT" class="form-control text-center me-2" value="${
						quantity ?? 1
					}" min="0" type="number" style="width:6vh">
                    <div class="btn btn-action" onClick="$(this).parent().parent().remove();"><i class="fas fa-trash-alt delete-item"></i></div>
                </div>
            </li>
            `);
		}
	},

	addItemEntregado: (item, label, quantity) => {
		let itemExistente = $(".c-modal ul.list-entregados li[item='" + item + "']");
		if (itemExistente.length && !quantity) {
			let input = itemExistente.find('input');
			let valor = parseInt(input.val());
			input.val(valor + 1);
		} else {
			$('.c-modal ul.list-entregados .sin-items').parent().remove();
			$('.c-modal ul.list-entregados').append(`
            <li class="list-group-item item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster" item=${item}>
                <div>${label}</div>
                <div class="d-flex justify-content-center align-items-center">
                    <input placeholder="CANT" class="form-control text-center me-2" min="0" value="${
						quantity ?? 1
					}" type="number" style="width:6vh">
                    <div class="btn btn-action" onClick="$(this).parent().parent().remove();"><i class="fas fa-trash-alt delete-item"></i></div>
                </div>
            </li>
            `);
		}
	},

	loadModalMision: (mision) => {
		OpenModal(
			mision ? `Editar misión` : `Nueva misión`,
			`
            <div class="cargando-modal" >
                <div class="d-flex justify-content-center align-items-center" style="height:50vh">
                <img src="./img/loading.svg" style="width:15vh">
                </div>
            </div>
            <div class="modal-cargado" style="display:none;"></div>

        `,
			`<button class="btn-modal" onclick="npcFunctions.saveMission(${mision ? mision : false})">Guardar cambios</button>`,
			'Cancelar',
			127
		);

		let tablaItems = '';

		let label = '';
		let description = '';

		itemsFunctions.loadItems().done((items) => {
			getAllGangs().done((gangs) => {
				getAllBusiness().done((business) => {
					if (items) {
						items.map((item, index) => {
							tablaItems += `
							<tr>
								<td>${item.name}</td>
								<td>${item.label}</td>
								<td>${item.description}</td>

								<td class="d-flex">

									<div class="btn-action me-2 p-1" style="font-size:1.2vh" onClick="npcFunctions.addItemRequerido('${item.name}', '${item.label}')">
										REQUERIR
									</div>
									<div class="btn-action me-2 p-1" style="font-size:1.2vh" onClick="npcFunctions.addItemEntregado('${item.name}', '${item.label}')">
										ENTREGAR
									</div>

								</td>

							</tr>`;
						});
					}
					bandasAuxAdmin = gangs;
					negociosAuxAdmin = business;
					npcFunctions.auxSelectedGangs = [];

					let bandas = '';
					bandasAuxAdmin.map((banda, index) => {
						bandas += `<option value="${index}" idbanda="${banda.id}">${banda.label}</option>`;
					});

					let negocios = '';
					negociosAuxAdmin.map((negocio, index) => {
						negocios += `<option value="${index}" idnegocio="${negocio.id}">${negocio.label}</option>`;
					});

					if (mision) {
						label = misiones[mision].name;
						description = misiones[mision].description;
					}

					$('.c-modal .modal-cargado').append(`
						<h3>Misión</h3>
						<div class="row mb-4">
							<div class="col-12">
								<label>Nombre</label>
								<input class="form-control w-100 input-nombre-mision" placeholder="Nombre de la misión" value="${label}">
							</div>
							<div class="col-12 mt-2">
								<label>Descripción</label>
								<textarea class="form-control w-100 input-descripcion-mision" placeholder="Descripción de la misión">${description}</textarea>
							</div>
						</div>

						<h3>Items</h3>
						<table class="w-100 tabla-items-mision">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nombre</th>
									<th>Descripción</th>

									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								${tablaItems}
							</tbody>
						</table>

						<div class="row mt-4">
							<div class="col-6">
								<h5>ITEMS REQUERIDOS</h5>
								<ul class="list-group multas-list mt-2 list-requeridos">
									<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster">
										<div class="sin-items">No has añadido items</div>

									</li>
								</ul>
							</div>
							<div class="col-6">
								<h5>ITEMS ENTREGADOS</h5>
								<ul class="list-group multas-list mt-2 list-entregados">
									<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster">
										<div class="sin-items">No has añadido items</div>

									</li>
								</ul>
							</div>
						</div>

				<h3 class="mt-4">Restricciones</h3>
				<div class="row mt-3 restricciones">
					<div class="col-4">
						<label>Civiles</label>
						<div class="check">
							<label class="switch">
								<input type="checkbox" class="check-dispo civiles">
								<span class="slider-check round"></span>
							</label>
						</div>
						<div class="p-2 info-box mt-2 rest-civiles" style="display:none;">

							<h6>REPETICIÓN DE LA MISIÓN</h6>
							<select class="form-select w-100 select-civiles-repeticiones">
									<option selected value="OneTime">No permitir repeticiones</option>
									<option disabled></option>
									<option disabled><b>Diario</b></option>
									<option value="OneTimeADay">1 vez al día</option>
									<option disabled></option>
									<option disabled>Semanal</option>
									<option value="OneTimeAWeek">1 vez a la semana</option>
									<option disabled></option>
									<option disabled>Mensual</option>
									<option value="OneTimeAMonth">1 vez al mes</option>

								</select>

						</div>

					</div>
					<div class="col-4">
					<label>Organizaciones</label>
						<div class="check">
							<label class="switch">
								<input type="checkbox" class="check-dispo organizaciones">
								<span class="slider-check round"></span>
							</label>
						</div>
						<div class="p-2 info-box mt-2 rest-gangs" style="display:none;">
							<div class="d-flex justify-content-center align-items-center w-100" style="gap:1vh">
								<select class="form-select w-100 select-gangs-misiones">
									<option selected disabled>Selecciona una organización</option>
									${bandas}
								</select>
								<button class="btn btn-action p-2" onClick="npcFunctions.renderGangs()">Añadir</button>
							</div>
							<h6 class="mt-3">ORGANIZACIONES SELECCIONADAS</h6>
							<ul class="list-group multas-list mt-2 list-organizaciones">
								<li class="todas list-group-item list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster">
									<div>Todas las organizaciones</div>

								</li>
							</ul>
							<h6 class="mt-3">REPETICIÓN DE LA MISIÓN</h6>
							<select class="form-select w-100 select-gangs-repeticiones">
									<option selected value="OneTime">No permitir repeticiones</option>
									<option disabled></option>
									<option disabled><b>Diario</b></option>
									<option value="OneTimeADayMember">1 vez al día por miembro</option>
									<option value="OneTimeADayGang">1 vez al día por organización</option>
									<option disabled></option>
									<option disabled>Semanal</option>
									<option value="OneTimeAWeekMember">1 vez a la semana por miembro</option>
									<option value="OneTimeAWeekGang">1 vez a la semana por organización</option>
									<option disabled></option>
									<option disabled>Mensual</option>
									<option value="OneTimeAMonthMember">1 vez al mes por miembro</option>
									<option value="OneTimeAMonthGang">1 vez al mes por organización</option>

								</select>

						</div>

					</div>
					<div class="col-4">
						<label>Negocios</label>
						<div class="check">
							<label class="switch">
								<input type="checkbox" class="check-dispo negocios">
								<span class="slider-check round"></span>
							</label>
						</div>
						<div class="p-2 info-box mt-2 rest-business" style="display:none;">
							<div class="d-flex justify-content-center align-items-center w-100" style="gap:1vh">
								<select class="form-select w-100 select-negocios-misiones">
									<option selected disabled>Selecciona un negocio</option>
									${negocios}
								</select>
								<button class="btn btn-action p-2" onClick="npcFunctions.renderBusiness()">Añadir</button>
							</div>
							<h6 class="mt-3">NEGOCIOS SELECCIONADOS</h6>
							<ul class="list-group multas-list mt-2 list-negocios">
								<li class="list-group-item todas list-group-item-action d-flex justify-content-between align-items-center animate__animated animate__zoomIn animate__faster">
									<div>Todos los negocios</div>

								</li>
							</ul>
							<h6 class="mt-3">REPETICIÓN DE LA MISIÓN</h6>
							<select class="form-select w-100 select-negocios-repeticiones">
									<option selected value="OneTime">No permitir repeticiones</option>
									<option disabled></option>
									<option disabled><b>Diario</b></option>
									<option value="OneTimeADayEmployee">1 vez al día por empleado</option>
									<option value="OneTimeADayBusiness">1 vez al día por negocio</option>
									<option disabled></option>
									<option disabled>Semanal</option>
									<option value="OneTimeAWeekEmployee">1 vez a la semana por empleado</option>
									<option value="OneTimeAWeelBusiness">1 vez a la semana por negocio</option>
									<option disabled></option>
									<option disabled>Mensual</option>
									<option value="OneTimeAMonthEmployee">1 vez al mes por empleado</option>
									<option value="OneTimeAMonthBusiness">1 vez al mes por negocio</option>

								</select>

						</div>

					</div>

				</div>

				`);

					if (mision != undefined) {
						if (misiones[mision].events) {
							itemsFunctions.loadItems().done((items) => {
								if (items) {
									const aMisiones = misiones[mision].events;
									aMisiones.map((evento, index) => {
										if (evento.give) {
											let gives = Object.values(evento.give);
											let givesKeys = Object.keys(evento.give);
											gives.map((itemGive, index) => {
												const id = givesKeys[index];
												const quantity = itemGive;
												const label = items.find(
													(item) => item.name === id
												).label;
												npcFunctions.addItemEntregado(
													id,
													label,
													quantity
												);
											});
										}
										if (evento.requested) {
											let gives = Object.values(evento.requested);
											let givesKeys = Object.keys(evento.requested);

											gives.map((itemGive, index) => {
												const id = givesKeys[index];
												const label = items.find(
													(item) => item.name === id
												).label;

												const quantity = itemGive;

												npcFunctions.addItemRequerido(
													id,
													label,
													quantity
												);
											});
										}
									});
								}
							});
						}

						if (misiones[mision].rest) {
							const aRestricciones = misiones[mision].rest;
							aRestricciones.map((rest, index) => {
								if (rest.civ) {
									$('.restricciones .check-dispo.civiles').prop(
										'checked',
										true
									);
									$('.restricciones .check-dispo.civiles').trigger('change');
									$('.c-modal .select-civiles-repeticiones').val(rest.civ);
									$('.c-modal .select-civiles-repeticiones').trigger('change');
								}

								if (rest.gangs) {
									$('.restricciones .check-dispo.organizaciones').prop(
										'checked',
										true
									);
									$('.restricciones .check-dispo.organizaciones').trigger(
										'change'
									);
									$('.c-modal .select-gangs-repeticiones').val(rest.time);
									$('.c-modal .select-gangs-repeticiones').trigger('change');

									if (rest.gangs.includes('all')) {
										$('.c-modal .select-gangs-misiones [value="all"]').prop('selected', true)
										$('.c-modal .select-gangs-misiones').trigger('change');
										$('.restricciones .rest-gangs button').trigger(
											'click'
										);
									} else {
										rest.gangs.map((gang, index) => {
											$('.c-modal .select-gangs-misiones [idbanda="' + gang + '"]').prop('selected', true)
											$('.c-modal .select-gangs-misiones').trigger('change');
											$('.restricciones .rest-gangs button').trigger(
												'click'
											);
										});
									}
								}

								if (rest.business) {
									$('.restricciones .check-dispo.negocios').prop(
										'checked',
										true
									);
									$('.restricciones .check-dispo.negocios').trigger('change');
									$('.c-modal .select-negocios-repeticiones').val(rest.time);
									$('.c-modal .select-negocios-repeticiones').trigger('change');

									if (rest.business.includes('all')) {
										$('.c-modal .select-negocios-misiones [value="all"]').prop('selected', true)
										$('.c-modal .select-negocios-misiones').trigger('change');
										$('.restricciones .rest-business button').trigger(
											'click'
										);
									} else {
										rest.business.map((business, index) => {
											$('.c-modal .select-negocios-misiones [idnegocio="' + business + '"]').prop('selected', true)
											$('.c-modal .select-negocios-misiones').trigger('change');
											$('.restricciones .rest-business button').trigger(
												'click'
											);
										});
									}
								}
							});
						}
					}

					$('.c-modal .tabla-items-mision').DataTable({
						language: dataTableLanguage,
						pageLength: 10,
						lengthChange: false
					});

					$('.c-modal .cargando-modal').fadeOut(300, function () {
						$('.c-modal .modal-cargado').fadeIn(300);
					});
				});
			});
		});
	},

	renderGangs: () => {
		let html = '';
		let options = '';
		let selected = $('.c-modal .select-gangs-misiones').val();
		let filteredGangs = bandasAuxAdmin.filter(
			(gang) => !npcFunctions.auxSelectedGangs.includes(gang)
		);

		if (selected) {
			if (selected == 'all') {
				npcFunctions.auxSelectedGangs = [];
				html = `<li class="todas list-group-item list-group-item-action d-flex justify-content-between align-items-center">
				<div>Todas las organizaciones</div>
			</li>`;
			} else {
				npcFunctions.auxSelectedGangs.push(filteredGangs[selected]);
			}
		}
		if (npcFunctions.auxSelectedGangs.length == 0) {
			html = `<li class="todas list-group-item list-group-item-action d-flex justify-content-between align-items-center">
					<div>Todas las organizaciones</div>
				</li>`;
			options += `<option selected disabled>Selecciona una organización</option>`;
		} else {
			npcFunctions.auxSelectedGangs.map((gang, index) => {
				html += `<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" gang="${gang.id}">
						<div class="gang">${gang.label}</div>
						<div class="btn btn-action" onclick="npcFunctions.deleteGang(${index})"><i class="fas fa-trash-alt delete-item" aria-hidden="true"></i></div>
					</li>`;
			});
			options += `<option selected disabled>Selecciona una organización</option><option value="all">Todas las organizaciones</option>`;
		}
		filteredGangs = bandasAuxAdmin.filter(
			(gang) => !npcFunctions.auxSelectedGangs.includes(gang)
		);

		filteredGangs.map((banda, index) => {
			options += `<option value="${index}" idbanda="${banda.id}">${banda.label}</option>`;
		});
		$('.c-modal .list-organizaciones').html(html);
		$('.c-modal .select-gangs-misiones').html(options);
		$('.c-modal .modal-cargado').scrollTop(
			$('.c-modal .modal-cargado')[0].scrollHeight
		);
	},

	deleteGang: (index) => {
		npcFunctions.auxSelectedGangs.splice(index, 1);
		npcFunctions.renderGangs();
	},

	renderBusiness: () => {
		let html = '';
		let options = '';
		let selected = $('.c-modal .select-negocios-misiones').val();
		let filteredBusiness = negociosAuxAdmin.filter(
			(negocio) => !npcFunctions.auxSelectedBusiness.includes(negocio)
		);

		if (selected) {
			if (selected == 'all') {
				npcFunctions.auxSelectedBusiness = [];
				html = `<li class="todas list-group-item list-group-item-action d-flex justify-content-between align-items-center">
				<div>Todos los negocios</div>
			</li>`;
			} else {
				npcFunctions.auxSelectedBusiness.push(filteredBusiness[selected]);
			}
		}
		if (npcFunctions.auxSelectedBusiness.length == 0) {
			html = `<li class="todas list-group-item list-group-item-action d-flex justify-content-between align-items-center">
					<div>Todos los negocios</div>
				</li>`;
			options += `<option selected disabled>Selecciona un negocio</option>`;
		} else {
			npcFunctions.auxSelectedBusiness.map((negocio, index) => {
				html += `<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" business="${negocio.id}">
						<div class="gang">${negocio.label}</div>
						<div class="btn btn-action" onclick="npcFunctions.deleteBusiness(${index})"><i class="fas fa-trash-alt delete-item" aria-hidden="true"></i></div>
					</li>`;
			});
			options += `<option selected disabled>Selecciona un negocio</option><option value="all">Todos los negocios</option>`;
		}
		filteredBusiness = negociosAuxAdmin.filter(
			(gang) => !npcFunctions.auxSelectedBusiness.includes(gang)
		);

		filteredBusiness.map((negocio, index) => {
			options += `<option value="${index}" idnegocio="${negocio.id}">${negocio.label}</option>`;
		});
		$('.c-modal .list-negocios').html(html);
		$('.c-modal .select-negocios-misiones').html(options);
		$('.c-modal .modal-cargado').scrollTop(
			$('.c-modal .modal-cargado')[0].scrollHeight
		);
	},

	deleteBusiness: (index) => {
		npcFunctions.auxSelectedBusiness.splice(index, 1);
		npcFunctions.renderBusiness();
	},

	saveMission: (mision) => {
		const nombre = $('.c-modal .input-nombre-mision').val();
		const desc = $('.c-modal .input-descripcion-mision').val();
		let valido = true;
		if (nombre == '' || nombre.length < 4) {
			sendNotification('error', 'El nombre debe contener al menos 4 caracteres');
			valido = false;
		}

		if (desc == '' || desc.length < 10) {
			sendNotification(
				'error',
				'La descripción debe contener al menos 10 caracteres'
			);
			valido = false;
		}

		const requeridos = {};
		$('.c-modal .list-requeridos .item').each(function () {
			const key = $(this).attr('item');
			const value = parseInt($(this).find('.form-control').val());
			if (value > 0) {
				requeridos[key] = value;
			} else {
				validado = false;
				sendNotification(
					'error',
					'No puedes indicar 0 en la cantidad de un item'
				);
			}
		});

		const entregados = {};
		$('.c-modal .list-entregados .item').each(function () {
			const key = $(this).attr('item');
			const value = parseInt($(this).find('.form-control').val());
			if (value > 0) {
				entregados[key] = value;
			} else {
				validado = false;
				sendNotification(
					'error',
					'No puedes indicar 0 en la cantidad de un item'
				);
			}
		});

		const restGangs = {
			gangs: []
		};
		if ($('.restricciones .check-dispo.organizaciones').is(':checked')) {
			if ($('.c-modal .list-organizaciones .todas').length > 0) {
				restGangs.gangs.push('all');
			} else {
				$('.c-modal .list-organizaciones li').each(function () {
					const key = $(this).attr('gang');

					restGangs.gangs.push(key);
				});
			}

			restGangs.time = $('.c-modal .select-gangs-repeticiones').val();
		}

		const restBusiness = {
			business: []
		};
		if ($('.restricciones .check-dispo.negocios').is(':checked')) {
			if ($('.c-modal .list-negocios li.todas').length > 0) {
				restBusiness.business.push('all');
			} else {
				$('.c-modal .list-negocios li').each(function () {
					const key = $(this).attr('business');

					restBusiness.business.push(key);
				});
			}

			restBusiness.time = $('.c-modal .select-negocios-repeticiones').val();
		}

		let restCivil;
		if ($('.restricciones .check-dispo.civiles').is(':checked')) {
			restCivil = $('.c-modal .select-civiles-repeticiones').val();
		}

		if (valido) {
			const data = {
				name: nombre,
				description: desc,
				events: [],
				rest: []
			};

			if (Object.entries(requeridos).length > 0 || Object.entries(entregados).length > 0) {
				data.events.push({
					type: 'ItemTrade',
					requested: requeridos,
					give: entregados
				});
			}

			if (restGangs.gangs.length > 0) 
				data.rest.push(restGangs);

			if (restBusiness.business.length > 0)
				data.rest.push(restBusiness);

			if (restCivil)
				data.rest.push({ civ: restCivil });

			if (mision)
				data.id = mision;


			TriggerCallback(mision ? "origen_quests:server:UpdateMission" : 'origen_quests:server:CreateMission', {data}).done((cb) => {
				if (cb) {
					CloseModal();

					sendNotification('success', mision ? 'Misión editada correctamente' : 'Misión creada correctamente');
					loadAdminQuests();
				} else {
					sendNotification('error', mision ? "No se ha podido editar la misión" : 'No se ha podido crear la misión');
				}
			});
		}
	},

	confirmDeleteMission: (yo) => {
		OpenModal(
			`Eliminar misión`,
			`
            <h5>¿Estás seguro de eliminar esta misión?</h5>
            <p>Esta acción no se puede deshacer</p>
        `,
			`<button class="btn-modal" onclick="npcFunctions.deleteMission(${yo})">Eliminar</button>`,
			'Cancelar'
		);
	},

	deleteMission: (id) => {
		TriggerCallback('origen_quests:server:DeleteMission', {id}).done((cb) => {
			if (cb) {
				CloseModal();
				sendNotification('success', 'Misión eliminada correctamente');
				loadAdminQuests();
			} else {
				sendNotification('error', "No se ha podido eliminar la misión");
			}
		});
	},
};

$(document).on('change', '.restricciones .check-dispo', function () {
	$('.restricciones .check-dispo').not(this).prop('checked', false);

	const isChecked = $(this).is(':checked');
	if ($(this).hasClass('organizaciones') && isChecked) {
		$('.c-modal .rest-gangs').show(300);
	} else {
		$('.c-modal .rest-gangs').hide(300);
	}

	if ($(this).hasClass('civiles') && isChecked) {
		$('.c-modal .rest-civiles').show(300);
	} else {
		$('.c-modal .rest-civiles').hide(300);
	}

	if ($(this).hasClass('negocios') && isChecked) {
		$('.c-modal .rest-business').show(300);
	} else {
		$('.c-modal .rest-business').hide(300);
	}
	$('.c-modal .modal-cargado').animate(
		{ scrollTop: $('.c-modal .modal-cargado')[0].scrollHeight },
		300
	);
});

$(document).on('change', '.select-tipo-ubicacion', function () {
	const value = $(this).val();

	if (value == 'marker') {
		$(".input-nombre-ubicacion").parent().removeClass("col-4").addClass("col-6");
		$(this).parent().removeClass("col-4").addClass("col-6");

		$(".input-nombre-modelo").parent().hide();
	} else {
		$(".input-nombre-ubicacion").parent().removeClass("col-6").addClass("col-4");
		$(this).parent().removeClass("col-6").addClass("col-4");
		
		$(".input-nombre-modelo").parent().show();
	}

	if (value == "new_npc") {
		$(".locationNpcAnims").css("display", "flex");
	} else {
		$(".locationNpcAnims").css("display", "none");
	}
});

$(document).on('click', '.app.admin .back-section', function () {
	$('.app-container.show').fadeOut(300, function () {
		$(this).removeClass('show');
		$('.app.admin .back-section')
			.removeClass('animate__fadeInDown')
			.addClass('animate__fadeOutUp')
			.fadeOut(300);
		$('.app-container.admin-home').fadeIn(300, function () {
			$(this).addClass('show');
		});
	});
});

$(document).on("click", ".app.admin .admin-navigation", function () {
    if ($(this).attr("app") === "admin-quests-viejas") { // sacar esta linea cuando se implemente el nuevo sistema de misiones
        $.post('https://origen_questold/openMenu', JSON.stringify());
    } else {
        adminFunctions.adminNavigation($(this).attr("app"));
    }
});

//EVENTOS ORGANIZACIONES
$(document).on('click', '.app.admin .admin-gangs .admin-tab:not(.selected)', function () {
	$('.app.admin .admin-gangs .admin-tab').removeClass('selected');
	$(this).addClass('selected');
	const tab = $(this).attr('tab');
	$('.app.admin .admin-gangs .admin-tab-content:not(.hide)')
		.addClass('hide')
		.removeClass('scale-in')
		.fadeOut(300, function () {
			$('.app.admin .admin-gangs .admin-tab-content.' + tab)
				.removeClass('hide')
				.addClass('scale-in')
				.fadeIn(300);
		});
	if (tab === 'territorios') {
		// destroyBlipsAdmin();
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
		}, 505);
		exportEvent('origen_ilegal', 'Get_Config.Gangs', {}).done((cb2) => {
			config = JSON.parse(cb2);

			TriggerCallback('origen_menu:server:GetAllTerritories', {}).done((cb) => {
				if (cb && cb.length > 0 && BlipsAdmin.length == 0) {
					clearTerritoriesAdmin();
					cb.map((territorio, index) => {
						addTerritorioAdmin(
							parseFloat(territorio.coords.y.toFixed(2)),
							parseFloat(territorio.coords.x.toFixed(2)),
							config.TerritoryRadius,
							territorio.name,
							100,
							territorio.color,
							territorio.gang_name
						);
					});

					cb.map((territorio, index) => {
						if (territorio.npcs.length > 0) {
							territorio.npcs.map(async (npc, i) => {
								await CreateBlipNPC(
									mapTerritoriosAdmin,
									npc.code,
									{
										x: parseFloat(npc.coords.x.toFixed(2)),
										y: parseFloat(npc.coords.y.toFixed(2))
									},
									MarkerBlips['npc'],
									`<div>[NPC] [${territorio.gang_name}] ${npc.name}</div>`
								);
							});
						}
					});

					cb.map((territorio, index) => {
						if (territorio.markers.length > 0) {
							territorio.markers.map(async (marker, i) => {
								await CreateBlipMarker(
									mapTerritoriosAdmin,
									marker.code,
									{
										x: parseFloat(marker.x.toFixed(2)),
										y: parseFloat(marker.y.toFixed(2))
									},
									MarkerBlips['marker'],
									`<div>[MARKER] [${territorio.gang_name}] ${marker.type}</div>`
								);
							});
						}
					});
				}
			});
		});
	}
});

//EVENTOS ITEMS
$(document).on('click', '.admin .admin-items .add-item', function () {
	OpenModal(
		`Añadir item`,
		`
        <h5>Introduce la información</h5>
        <div class="mt-2">
            <label>Nombre</label>
            <input class="form-control w-100 n-item" placeholder="Nombre del item">
        </div>
        <div class="mt-2">
            <label>Descripción</label>
            <textarea class="form-control w-100 desc-item" placeholder="Descripción del item"></textarea>
        </div>
        <div class="mt-2">
            <label>URL Imagen <small>(Máximo 256x256 px)</small></label>
            <input class="form-control w-100 img-item" placeholder="Introduce la URL de la imagen">
        </div>
        <div class="row mt-3">
            <div class="col-6">
                <label>Bebida</label>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo bebida">
                        <span class="slider-check round"></span>
                    </label>
                </div>
                <input class="form-control mt-2 w-100 cant-bebida" style="display:none" placeholder="Cantidad" type="number" max="100" min="0">
            </div>
            <div class="col-6">
            <label>Comida</label>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo comida">
                        <span class="slider-check round"></span>
                    </label>
                </div>
                <input class="form-control mt-2 w-100 cant-comida" style="display:none" placeholder="Cantidad" type="number" max="100" min="0">

            </div>
            <div class="col-6 mt-3">
                <label>Alcohol/droga</label>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo alcohol">
                        <span class="slider-check round"></span>
                    </label>
                </div>
                <input class="form-control mt-2 w-100 cant-droga" style="display:none" placeholder="Duración (segundos)" type="number" max="100" min="1">
            </div>
			<div class="col-6 mt-3">
                <label>Caducidad</label>
                <div class="check">
                    <label class="switch">
                        <input type="checkbox" class="check-dispo decay">
                        <span class="slider-check round"></span>
                    </label>
                </div>
                <input class="form-control mt-2 w-100 cant-decay" style="display:none" placeholder="Duración (horas)" type="number" max="100" min="1">
            </div>
        </div>

    `,
		`<button class="btn-modal" onclick="itemsFunctions.saveItem(0)">Guardar cambios</button>`,
		'Cancelar',
		55
	);
});

let adminItems;
let listaItemsCraft;
function loadAdminItems() {
	$('.admin .tabla-items tbody').html('');

	TriggerCallback('origen_menu:server:GetItems', {}).done((cb) => {
		if (cb && cb.length > 0) {
			adminItems = cb;

			if ($('.admin .tabla-items').hasClass('dataTable')) {
				$('.admin .tabla-items').DataTable().destroy();
				$('.admin .tabla-items tbody').html('');
			}
			adminItems.map((item, index) => {
				$('.admin .tabla-items tbody').append(`
					<tr>
						<td>${item.name}</td>
						<td>${item.label}</td>
						<td>${item.description}</td>
						<td class="d-flex">
                            ${item.editable ?
                                `
                                    <div class="btn-action me-2" onClick="itemsFunctions.editItem(${index})"> <i class="fas fa-edit"></i> </div>
                                    <div class="btn-action" onClick="itemsFunctions.deleteItem(${index})"> <i class="fas fa-trash"></i> </div>
                                `
                                :
                                ``
                            }
						</td>
					</tr>
				`);
				listaItemsCraft += `<option value='${item.name}'>${item.label}</option>`;
			});

			$('.admin .tabla-items').DataTable({
				language: dataTableLanguage,
				pageLength: 17,
				lengthChange: false
			});
		}
	});
}

function formatSeconds(segs) {
    var hs = Math.floor(segs / 3600);
    var ms = Math.floor((segs % 3600) / 60);
    var sg = (segs % 60);
    return `${hs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}:${sg.toString().padStart(2, '0')}`;
}

let craftablesItems;
function loadCraftablesItems() {
    TriggerCallback("origen_menu:server:getListaCrafteables", {}).done((cb) => {

        if (cb && cb.length > 0) {
            craftablesItems = JSON.parse(cb);

            if($(".admin .tabla-crafteables").hasClass("dataTable")) {
                $(".admin .tabla-crafteables").DataTable().destroy();
                $(".admin .tabla-crafteables tbody").html("");
            }

            const exclusividadCrafteo = {
                'T' : 'Global',
                'N' : 'Exclusivo Civiles',
                'C' : 'Exclusivo Bandas',
            };

            const nivelRequerido = {
                1 : 'Iniciante',
                2 : 'Aficionado',
                3 : 'Novato',
                4 : 'Principiante',
                5 : 'Aprendiz',
                6 : 'Estudiante',
                7 : 'Intermedio',
                8 : 'Progresando',
                9 : 'Avanzado',
                10 : 'Experto',
                11 : 'Maestro',
                12 : 'Virtuoso',
                13 : 'Hábil',
                14 : 'Destacado',
                15 : 'Sobresaliente',
                16 : 'Experimentado',
                17 : 'Perito',
                18 : 'Profesional',
                19 : 'Consumado',
                20 : 'Inigualable',
                21 : 'Leyenda',
                22 : 'Mítico',
                23 : 'Trascendente',
                24 : 'Supremo',
                25 : 'Élite',
                26 : 'Invencible',
                27 : 'Único',
                28 : 'Eminente',
                29 : 'Destacado',
                30 : 'Sobresaliente',
            };

            $.map(craftablesItems, (val) => {
                $(".admin .tabla-crafteables tbody").append(`
                    <tr>
                        <td>${val.name}</td>
                        <td>${val.label}</td>
                        <td>${formatSeconds(val.seconds)}</td>
                        <td>${nivelRequerido[val.level]}</td>
                        <td>${val.experience}</td>
                        <td>${val.rewards}</td>
                        <td>${exclusividadCrafteo[val.exclusive]}</td>
                        <td>
                            <div class="btn-action me-2" onClick="itemsFunctions.editCrafteable('${val.name}')"> <i class="fas fa-edit"></i> </div>
                            <div class="btn-action" onClick="itemsFunctions.deleteCrafteable('${val.name}', '${val.label}')"> <i class="fas fa-trash"></i> </div>
                        </td>
                    </tr>
                `);
            });

            $(".admin .tabla-crafteables").DataTable({
                language: dataTableLanguage,
                pageLength: 17,
                lengthChange: false,
            });
        }
    });
}

$(document).on("click", ".admin .admin-crafteables .add-item", async function () {
    selectBandas = '';
    await getAllGangs().done((cb) => {
        cb.map((banda, index) => { selectBandas += `<option value="${banda.id}">${banda.label}</option>`; });
    });

    OpenModal(
        `Crear nuevo crafteable`,
        `
            <h5>Introduce la información</h5>
            <div class="row mt-3">
                <div class="col-12">
                    <label class="mb-2">Artículo a craftear</label>
                    <select class="form-select w-100 select2craft" id="crafteo-itemacraftear" data-placeholder="Selecciona el item">
                        <option></option>
                        ${listaItemsCraft}
                    </select>
                </div>
                <div class="col-6 mt-3">
                    <label class="mb-2">Tiempo de crafteo (seg)</label>
                    <input class="form-control w-100" id="crafteo-tiempo" placeholder="30" type="number" max="28800" min="0">
                </div>
                <div class="col-6 mt-3">
                    <label class="mb-2">Nivel de Dificultad</label>
                    <select class="form-select w-100 select2craft" id="crafteo-niveldificultad" data-placeholder="Nivel">
                        <option></option>
                        <option value='1'>(1) Iniciante</option>
                        <option value='2'>(2) Aficionado</option>
                        <option value='3'>(3) Novato</option>
                        <option value='4'>(4) Principiante</option>
                        <option value='5'>(5) Aprendiz</option>
                        <option value='6'>(6) Estudiante</option>
                        <option value='7'>(7) Intermedio</option>
                        <option value='8'>(8) Progresando</option>
                        <option value='9'>(9) Avanzado</option>
                        <option value='10'>(10) Experto</option>
                        <option value='11'>(11) Maestro</option>
                        <option value='12'>(12) Virtuoso</option>
                        <option value='13'>(13) Hábil</option>
                        <option value='14'>(14) Destacado</option>
                        <option value='15'>(15) Sobresaliente</option>
                        <option value='16'>(16) Experimentado</option>
                        <option value='17'>(17) Perito</option>
                        <option value='18'>(18) Profesional</option>
                        <option value='19'>(19) Consumado</option>
                        <option value='20'>(20) Inigualable</option>
                        <option value='21'>(21) Leyenda</option>
                        <option value='22'>(22) Mítico</option>
                        <option value='23'>(23) Trascendente</option>
                        <option value='24'>(24) Supremo</option>
                        <option value='25'>(25) Élite</option>
                        <option value='26'>(26) Invencible</option>
                        <option value='27'>(27) Único</option>
                        <option value='28'>(28) Eminente</option>
                        <option value='29'>(29) Destacado</option>
                        <option value='30'>(30) Sobresaliente</option>
                    </select>
                </div>

                <div class="col-4 mt-3">
                    <label class="mb-2">Exp. a otorgar</label>
                    <input class="form-control w-100" id="crafteo-experienciaotorgar" placeholder="20" type="number" max="28800" min="0">
                </div>
                <div class="col-8 mt-3">
                    <label class="mb-2">Disponibilidad Receta</label>
                    <select class="form-select select2craft w-100" id="crafteo-exclusividad" onchange="itemsFunctions.toggleExclusividad()" data-placeholder="¿Quiénes pueden craftearlo?">
                        <option></option>
                        <option value='T'>Global</option>
                        <option value='C'>Exclusivo Bandas</option>
                        <option value='N'>Exclusivo Civiles</option>
                    </select>
                </div>

                <div class="col-4 mt-3">
                    <label class="mb-2">Cant. materiales</label>
                    <input class="form-control w-100" id="crafteo-cantidadmateriales" placeholder="5" type="number" max="28800" min="0">
                </div>
                <div class="col-8 mt-3">
                    <label class="mb-2">Disponibilidad para grupos</label>
                    <select class="form-select w-100 select2craft" id="crafteo-disponibletodos" multiple disabled data-placeholder="Selecciona la disponibilida de receta">
                        <option></option>
                        ${selectBandas}
                    </select>
                </div>

                <div class="col-6 offset-md-3 mt-3">
                    <label class="mb-2">Total items recompensa</label>
                    <input class="form-control w-100" id="crafteo-cantidadrecompensa" placeholder="5" type="number" max="28800" min="0">
                </div>

                <div class="col-12"> <hr> </div>

                <div class="col-12">
                    <table class="table table-borderless text-white mb-0">
                        <thead class="text-center"> <tr> <th style="width:80%"> Item </th> <th> Cantidad </th> </tr> </thead>
                        <tbody class="listaItemsCraft">
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" data-placeholder="Selecciona el material 1 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" data-placeholder="Selecciona el material 2 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" data-placeholder="Selecciona el material 3 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" data-placeholder="Selecciona el material 4 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" data-placeholder="Selecciona el material 5 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" data-placeholder="Selecciona el material 6 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        `<button class="btn-modal" onclick="itemsFunctions.saveNuevoCrafteable()">Crear Item</button>`,
        "Cancelar",
        55
    );

    $('.select2craft').select2({ allowClear: true });
});

$(document).on('select2:open', () => {
    document.querySelector('.select2-search__field').focus();
});

const itemsFunctions = {
	loadItems: () => {
		return TriggerCallback('origen_menu:server:GetItems', {});
	},

    // ===== Items crafteables
    toggleExclusividad: function() {
        const exclu = $('#crafteo-exclusividad option:selected').val();

        if([ 'T', 'N' ].includes(exclu)) {
            // si es para (T)odos o (N)omadas; se deshabilita este campo y predefine el valor
            $('#crafteo-disponibletodos').data('placeholder', 'Solo se puede modificar si es para comunidades').select2();
            $('#crafteo-disponibletodos').val('S').trigger('change').prop('disabled', true).select2();
        } else {
            // si es solo para (C)omunidades; se rehabilita este campo
            $('#crafteo-disponibletodos').data('placeholder', 'Selecciona la(s) comunidad(es)').select2();
            $('#crafteo-disponibletodos').val([]).trigger('change').prop('disabled', false).select2();
        }
    },

    saveNuevoCrafteable: async () => {
        const itemacraftear = $('#crafteo-itemacraftear option:selected');
        const niveldificultad = $('#crafteo-niveldificultad option:selected').val();
        const exclusividad = $('#crafteo-exclusividad option:selected').val();

        const tiempo = $('#crafteo-tiempo').val();
        const recompensa = $('#crafteo-cantidadrecompensa').val();
        const experienciaotorgar = $('#crafteo-experienciaotorgar').val();
        const cantidadmateriales = $('#crafteo-cantidadmateriales').val();

        if(!itemacraftear.val()) { return sendNotification("error", "Por favor seleccione el item a craftear"); }
        if(!niveldificultad) { return sendNotification("error", "Por favor seleccione el nivel de dificultar"); }
        if(!exclusividad) { return sendNotification("error", "Por favor seleccione la disponibilidad de la receta"); }
        if(!recompensa) { return sendNotification("error", "Por favor complete el campo 'Total items recompensa'"); }
        if(!tiempo) { return sendNotification("error", "Por favor complete el campo 'Tiempo de crafteo'"); }
        if(!experienciaotorgar) { return sendNotification("error", "Por favor complete el campo 'Experiencia a otorgar'"); }
        if(!cantidadmateriales) { return sendNotification("error", "Por favor complete el campo 'Cantidad de materiales'"); }

        if(isNaN(recompensa)) { return sendNotification("error", "El valor del campo 'Total items recompensa' debe ser numérico"); }
        if(isNaN(tiempo)) { return sendNotification("error", "El valor del campo 'Tiempo de crafteo' debe ser numérico"); }
        if(isNaN(experienciaotorgar)) { return sendNotification("error", "El valor del campo 'Experiencia a otorgar' debe ser numérico"); }
        if(isNaN(cantidadmateriales)) { return sendNotification("error", "El valor del campo 'Cantidad de materiales' debe ser numérico"); }

        if([ 'T', 'N' ].includes(exclusividad)) {
            var comunidades = [];
        } else {
            var comunidades = $('#crafteo-disponibletodos').val();
            if(!comunidades) { return sendNotification("error", "Por favor seleccione para que comunidad(es) estará disponible"); }
        }

        let itemInfo = {};
        itemInfo['name']           = itemacraftear.val();
        itemInfo['label']          = itemacraftear.html();
        itemInfo['recompensa']     = recompensa;
        itemInfo['exclusividad']   = exclusividad;            // general / comunidad / nomadas
        itemInfo['comunidades']    = comunidades;
        itemInfo['dificultad']     = niveldificultad;
        itemInfo['materiales']     = cantidadmateriales;
        itemInfo['experiencia']    = experienciaotorgar;
        itemInfo['segundos']       = tiempo;
        itemInfo['items'] = [];

        error = false; errorMsg = '';
        await $('tbody.listaItemsCraft tr').each(function(_index, fila) {
            const ingredienteSelect = $(fila).find('.crafteo-itemnecesarioid option:selected');
            const ingredienteInput = $(fila).find('.crafteo-itemnecesariocant');

            if(ingredienteSelect.val()) {
                if(!ingredienteInput.val()) {
                    error = true;
                    errorMsg += "Debe completar la cantidad necesaria del "+ingredienteSelect.html()+" <br>";
                } else if(isNaN(ingredienteInput.val()) || !(/^\d+$/).test(ingredienteInput.val()) || typeof ingredienteInput.val() == 'undefined') {
                    error = true;
                    errorMsg += "La cantidad necesaria del "+ingredienteSelect.html()+" no es numérico <br>";
                } else {
                    itemInfo['items'].push({ 'item' : ingredienteSelect.val(), 'cantidad' : ingredienteInput.val() });
                }
            }
        });

        if(error) { return sendNotification("error", errorMsg); }

        TriggerCallback("origen_menu:server:RegisterCraftableItem", { itemInfo }).done((cb) => {
            if (cb && cb == true) {
                sendNotification( "success", "El crafteable se ha registrado correctamente" );
                loadCraftablesItems();
                CloseModal();
            } else {
                sendNotification( "error", "Ha ocurrido un error al registrar este item" );
            }
        });
    },

    editCrafteable: async (item) => {
        const editItem = craftablesItems[item];

        selectBandas = '';
        await getAllGangs().done((cb) => {
            cb.map((banda, index) => { selectBandas += `<option value="${banda.id}">${banda.label}</option>`; });
        });

        OpenModal(
            `Editar receta`,
            `
            <h5>Introduce la información</h5>
            <div class="row mt-3">
                <div class="col-12">
                    <label class="mb-2">Artículo a craftear</label>
                    <select class="form-select w-100 select2craft" id="crafteo-itemacraftear" data-placeholder="Selecciona el item" disabled>
                        <option></option>
                        ${listaItemsCraft}
                    </select>
                </div>
                <div class="col-6 mt-3">
                    <label class="mb-2">Tiempo de crafteo (seg)</label>
                    <input class="form-control w-100" id="crafteo-tiempo" placeholder="30" type="number" max="28800" min="0">
                </div>
                <div class="col-6 mt-3">
                    <label class="mb-2">Nivel de Dificultad</label>
                    <select class="form-select w-100 select2craft" id="crafteo-niveldificultad" data-placeholder="Nivel">
                        <option></option>
                        <option value='1'>(1) Iniciante</option>
                        <option value='2'>(2) Aficionado</option>
                        <option value='3'>(3) Novato</option>
                        <option value='4'>(4) Principiante</option>
                        <option value='5'>(5) Aprendiz</option>
                        <option value='6'>(6) Estudiante</option>
                        <option value='7'>(7) Intermedio</option>
                        <option value='8'>(8) Progresando</option>
                        <option value='9'>(9) Avanzado</option>
                        <option value='10'>(10) Experto</option>
                        <option value='11'>(11) Maestro</option>
                        <option value='12'>(12) Virtuoso</option>
                        <option value='13'>(13) Hábil</option>
                        <option value='14'>(14) Destacado</option>
                        <option value='15'>(15) Sobresaliente</option>
                        <option value='16'>(16) Experimentado</option>
                        <option value='17'>(17) Perito</option>
                        <option value='18'>(18) Profesional</option>
                        <option value='19'>(19) Consumado</option>
                        <option value='20'>(20) Inigualable</option>
                        <option value='21'>(21) Leyenda</option>
                        <option value='22'>(22) Mítico</option>
                        <option value='23'>(23) Trascendente</option>
                        <option value='24'>(24) Supremo</option>
                        <option value='25'>(25) Élite</option>
                        <option value='26'>(26) Invencible</option>
                        <option value='27'>(27) Único</option>
                        <option value='28'>(28) Eminente</option>
                        <option value='29'>(29) Destacado</option>
                        <option value='30'>(30) Sobresaliente</option>
                    </select>
                </div>

                <div class="col-4 mt-3">
                    <label class="mb-2">Exp. a otorgar</label>
                    <input class="form-control w-100" id="crafteo-experienciaotorgar" placeholder="20" type="number" max="28800" min="0">
                </div>
                <div class="col-8 mt-3">
                    <label class="mb-2">Disponibilidad Receta</label>
                    <select class="form-select select2craft w-100" id="crafteo-exclusividad" onchange="itemsFunctions.toggleExclusividad()" data-placeholder="¿Quiénes pueden craftearlo?">
                        <option></option>
                        <option value='T'>Global</option>
                        <option value='C'>Exclusivo Bandas</option>
                        <option value='N'>Exclusivo Civiles</option>
                    </select>
                </div>

                <div class="col-4 mt-3">
                    <label class="mb-2">Cant. materiales</label>
                    <input class="form-control w-100" id="crafteo-cantidadmateriales" placeholder="5" type="number" max="28800" min="0">
                </div>
                <div class="col-8 mt-3">
                    <label class="mb-2">Disponibilidad para grupos</label>
                    <select class="form-select w-100 select2craft" id="crafteo-disponibletodos" multiple disabled data-placeholder="Selecciona la disponibilida de receta">
                        <option></option>
                        ${selectBandas}
                    </select>
                </div>

                <div class="col-6 offset-md-3 mt-3">
                    <label class="mb-2">Total items recompensa</label>
                    <input class="form-control w-100" id="crafteo-cantidadrecompensa" placeholder="5" type="number" max="28800" min="0">
                </div>

                <div class="col-12"> <hr> </div>

                <div class="col-12">
                    <table class="table table-borderless text-white mb-0">
                        <thead class="text-center"> <tr> <th style="width:80%"> Item </th> <th> Cantidad </th> </tr> </thead>
                        <tbody class="listaItemsCraft">
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" id="item1" data-placeholder="Selecciona el material 1 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" id="cant1" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" id="item2" data-placeholder="Selecciona el material 2 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" id="cant2" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" id="item3" data-placeholder="Selecciona el material 3 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" id="cant3" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" id="item4" data-placeholder="Selecciona el material 4 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" id="cant4" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" id="item5" data-placeholder="Selecciona el material 5 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" id="cant5" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td style="width:80%">
                                    <select class="form-select w-100 select2craft crafteo-itemnecesarioid" id="item6" data-placeholder="Selecciona el material 6 (vacio si no es necesario)">
                                        <option></option> ${listaItemsCraft}
                                    </select>
                                </td>
                                <td style="width:20%">
                                    <input class="form-control w-100 crafteo-itemnecesariocant" id="cant6" placeholder="Cant" type="number" max="28800" min="0">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `,
            `<button class="btn-modal" onclick="itemsFunctions.updateCrafteable()">Actualizar receta</button>`,
            "Cancelar",
            55
        );

        $('.select2craft').select2({ allowClear: true });

        $('#crafteo-itemacraftear').val(editItem.name).trigger('change');
        $('#crafteo-tiempo').val(editItem.seconds);
        $('#crafteo-niveldificultad').val(editItem.level).trigger('change');
        $('#crafteo-experienciaotorgar').val(editItem.experience);
        $('#crafteo-cantidadmateriales').val(editItem.materials);
        $('#crafteo-cantidadrecompensa').val(editItem.rewards);
        $('#crafteo-exclusividad').val(editItem.exclusive).trigger('change');
        
        var comunidades = editItem.comunidades;
        if(typeof comunidades == 'string') { comunidades = JSON.parse(editItem.comunidades); }
        $('#crafteo-disponibletodos').val(comunidades).trigger('change');

        var itemsCraft = editItem.items;
        if(typeof itemsCraft == 'string') { itemsCraft = JSON.parse(editItem.items); }
        for(var i = 0, k = 1; i < itemsCraft.length; i++, k++) {
            $(`select.crafteo-itemnecesarioid#item${k}`).val(itemsCraft[i].item).trigger('change');
            $(`input.crafteo-itemnecesariocant#cant${k}`).val(itemsCraft[i].cantidad);
        }
    },

    updateCrafteable: async () => {
        const itemacraftear = $('#crafteo-itemacraftear option:selected');
        const niveldificultad = $('#crafteo-niveldificultad option:selected').val();
        const exclusividad = $('#crafteo-exclusividad option:selected').val();

        const tiempo = $('#crafteo-tiempo').val();
        const recompensa = $('#crafteo-cantidadrecompensa').val();
        const experienciaotorgar = $('#crafteo-experienciaotorgar').val();
        const cantidadmateriales = $('#crafteo-cantidadmateriales').val();

        if(!itemacraftear.val()) { return sendNotification("error", "Por favor seleccione el item a craftear"); }
        if(!niveldificultad) { return sendNotification("error", "Por favor seleccione el nivel de dificultar"); }
        if(!exclusividad) { return sendNotification("error", "Por favor seleccione la disponibilidad de la receta"); }
        if(!recompensa) { return sendNotification("error", "Por favor complete el campo 'Total items recompensa'"); }
        if(!tiempo) { return sendNotification("error", "Por favor complete el campo 'Tiempo de crafteo'"); }
        if(!experienciaotorgar) { return sendNotification("error", "Por favor complete el campo 'Experiencia a otorgar'"); }
        if(!cantidadmateriales) { return sendNotification("error", "Por favor complete el campo 'Cantidad de materiales'"); }

        if(isNaN(recompensa)) { return sendNotification("error", "El valor del campo 'Total items recompensa' debe ser numérico"); }
        if(isNaN(tiempo)) { return sendNotification("error", "El valor del campo 'Tiempo de crafteo' debe ser numérico"); }
        if(isNaN(experienciaotorgar)) { return sendNotification("error", "El valor del campo 'Experiencia a otorgar' debe ser numérico"); }
        if(isNaN(cantidadmateriales)) { return sendNotification("error", "El valor del campo 'Cantidad de materiales' debe ser numérico"); }

        if([ 'T', 'N' ].includes(exclusividad)) {
            var comunidades = [];
        } else {
            var comunidades = $('#crafteo-disponibletodos').val();
            if(!comunidades) { return sendNotification("error", "Por favor seleccione para que comunidad(es) estará disponible"); }
        }

        let itemInfo = {};
        itemInfo['name']           = itemacraftear.val();
        itemInfo['label']          = itemacraftear.html();
        itemInfo['recompensa']     = recompensa;
        itemInfo['exclusividad']   = exclusividad;            // general / comunidad / nomadas
        itemInfo['comunidades']    = comunidades;
        itemInfo['dificultad']     = niveldificultad;
        itemInfo['materiales']     = cantidadmateriales;
        itemInfo['experiencia']    = experienciaotorgar;
        itemInfo['segundos']       = tiempo;
        itemInfo['items'] = [];

        error = false; errorMsg = '';
        await $('tbody.listaItemsCraft tr').each(function(_index, fila) {
            const ingredienteSelect = $(fila).find('.crafteo-itemnecesarioid option:selected');
            const ingredienteInput = $(fila).find('.crafteo-itemnecesariocant');

            if(ingredienteSelect.val()) {
                if(!ingredienteInput.val()) {
                    error = true;
                    errorMsg += "Debe completar la cantidad necesaria del "+ingredienteSelect.html()+" <br>";
                } else if(isNaN(ingredienteInput.val()) || !(/^\d+$/).test(ingredienteInput.val()) || typeof ingredienteInput.val() == 'undefined') {
                    error = true;
                    errorMsg += "La cantidad necesaria del "+ingredienteSelect.html()+" no es numérico <br>";
                } else {
                    itemInfo['items'].push({ 'item' : ingredienteSelect.val(), 'cantidad' : ingredienteInput.val() });
                }
            }
        });

        if(error) { return sendNotification("error", errorMsg); }

        TriggerCallback("origen_menu:server:UpdateCraftableItem", { itemInfo }).done((cb) => {
            if (cb && cb == true) {
                sendNotification( "success", "El crafteable se ha actualizado correctamente" );
                loadCraftablesItems();
                CloseModal();
            } else {
                sendNotification( "error", "Ha ocurrido un error al actualizar este item" );
            }
        });
    },

    deleteCrafteable: (name, label) => {
        OpenModal(
            `Confirmación`,
            `
                <h5>¿Deseas eliminar la receta de crafteo del <b>${label}</b>?</h5>
                <div>ATENCIÓN: Esta receta no se borrará en el acto, continuará apareciendo en el sistema de crafteo hasta el próximo reinicio.</div>
            `,
            `<button class="btn-modal" onclick="itemsFunctions.confirmDeleteCrafteable('${name}')">Confirmar</button>`,
            "Cancelar",
            55
        );
    },

    confirmDeleteCrafteable: (item) => {
        TriggerCallback("origen_menu:server:DeleteItemCrafteable", { item }).done(
            (cb) => {
                if (cb && cb == true) {
                    loadCraftablesItems();
                    sendNotification("success", "La receta de crafteo se ha eliminado correctamente", "Recuerda que debes esperar hasta el próximo reinicio para ver los cambios");
                } else {
                    sendNotification("error", "Ha ocurrido un error inesperado");
                }
                CloseModal();
            }
        );
    },

    // ===== Items ingame
	editItem: (item) => {
		const editItem = adminItems[item];
		TriggerCallback('origen_menu:server:GetItemActions', {
			item: editItem.name
		}).done((cb) => {
			OpenModal(
				`Editar item`,
				`
                <h5>Introduce la información</h5>
                <div class="mt-2">
                    <label>Nombre</label>
                    <input class="form-control w-100 n-item" placeholder="Nombre del item" value="${
						editItem.label
					}">
                </div>
                <div class="mt-2">
                    <label>Descripción</label>
                    <textarea class="form-control w-100 desc-item" placeholder="Descripción del item">${
						editItem.description
					}</textarea>
                </div>
                <div class="mt-2">
                    <label>URL Imagen <small>(Máximo 256x256 px)</small></label>
                    <input class="form-control w-100 img-item" placeholder="Introduce la URL de la imagen" value="${
						editItem.image
					}">
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <label>Bebida</label>
                        <div class="check">
                            <label class="switch">
                                <input type="checkbox" class="check-dispo bebida" ${
									cb.thirst ? 'checked' : ''
								}>
                                <span class="slider-check round"></span>
                            </label>
                        </div>
                        <input class="form-control mt-2 w-100 cant-bebida" style="${
							cb.thirst ? '' : 'display:none;'
						}" ${
					cb.thirst ? 'value="' + cb.thirst + '"' : ''
				} placeholder="Cantidad" type="number" max="100" min="1">
                    </div>
                    <div class="col-6">
                    <label>Comida</label>
                        <div class="check">
                            <label class="switch">
                                <input type="checkbox" class="check-dispo comida" ${
									cb.hunger ? 'checked' : ''
								}>
                                <span class="slider-check round"></span>
                            </label>
                        </div>
                        <input class="form-control mt-2 w-100 cant-comida" style="${
							cb.hunger ? '' : 'display:none;'
						}" placeholder="Cantidad" ${
					cb.hunger ? 'value="' + cb.hunger + '"' : ''
				} type="number" max="100" min="1">

                    </div>
                    <div class="col-6 mt-3">
                        <label>Alcohol/droga</label>
                        <div class="check">
                            <label class="switch">
                                <input type="checkbox" class="check-dispo alcohol" ${
									cb.alcohol ? 'checked' : ''
								}>
                                <span class="slider-check round"></span>
                            </label>
                        </div>
                        <input class="form-control mt-2 w-100 cant-droga" style="${
							cb.alcohol ? '' : 'display:none;'
						}" ${
					cb.alcohol ? 'value="' + cb.alcohol + '"' : ''
				} placeholder="Duración (segundos)" type="number" max="100" min="1">

                    </div>
					 <div class="col-6 mt-3">
                        <label>Caducidad</label>
                        <div class="check">
                            <label class="switch">
                                <input type="checkbox" class="check-dispo decay" ${
									cb.decay ? 'checked' : ''
								}>
                                <span class="slider-check round"></span>
                            </label>
                        </div>
                        <input class="form-control mt-2 w-100 cant-decay" style="${
							cb.decay ? '' : 'display:none;'
						}" ${
					cb.decay ? 'value="' + cb.decay + '"' : ''
				} placeholder="Duración (horas)" type="number" max="100" min="1">

                    </div>
                </div>

            `,
				`<button class="btn-modal" onclick="itemsFunctions.saveItem(1, '${editItem.name}')">Guardar cambios</button>`,
				'Cancelar',
				55
			);
		});
	},

	saveItem: (type, id) => {
		if (validateFormItem()) {
			const nombre = $('.c-modal .n-item').val();
			const descripcion = $('.c-modal .desc-item').val();
			const urlImagen = $('.c-modal .img-item').val();
			const bebida = $('.c-modal .check-dispo.bebida').is(':checked');
			const cantidadBebida = parseInt($('.c-modal .cant-bebida').val());
			const comida = $('.check-dispo.comida').is(':checked');
			const cantidadComida = parseInt($('.cant-comida').val());
			const alcohol = $('.check-dispo.alcohol').is(':checked');
			const duracionAlcohol = parseInt($('.cant-droga').val());
			const decay = $('.check-dispo.decay').is(':checked');
			const duracionDecay = parseInt($('.cant-decay').val());

			const item = {
				nombre,
				descripcion,
				urlImagen
			};

			const itemActions = {};

			if (bebida) {
				itemActions.thirst = cantidadBebida;
			}

			if (comida) {
				itemActions.hunger = cantidadComida;
			}

			if (alcohol) {
				itemActions.alcohol = duracionAlcohol;
			}

			if (decay) {
				itemActions.decay = duracionDecay;
			}

			if (type === 0) {
				TriggerCallback('origen_menu:server:CreateItem', {
					item,
					itemActions
				}).done((cb) => {
					if (cb && cb == true) {
						sendNotification('success', 'El item se ha creado correctamente');
						loadAdminItems();
						CloseModal();
					} else {
						sendNotification(
							'error',
							'Ha ocurrido un error al crear el item'
						);
					}
				});
			}

			if (type === 1) {
				item.name = id;

				TriggerCallback('origen_menu:server:EditItem', {
					item,
					itemActions
				}).done((cb) => {
					if (cb && cb == true) {
						sendNotification(
							'success',
							'El item se ha editado correctamente'
						);
						loadAdminItems();
						CloseModal();
					} else {
						sendNotification(
							'error',
							'Ha ocurrido un error al editar el item'
						);
					}
				});
			}
		}
	},
	deleteItem: (item) => {
		const editItem = adminItems[item];

		OpenModal(
			`Confirmación`,
			`
            <h5>¿Estás seguro de que quieres eliminar el item <b>${adminItems[item].label}</b>?</h5>
            <div>ATENCIÓN: El Item no se borrará en el acto, continuará apareciendo tanto en la lista de items como en los inventarios en los que el objeto esté almacenado hasta el próximo reinicio.</div>

        `,
			`<button class="btn-modal" onclick="itemsFunctions.confirmDelete('${adminItems[item].name}')">Confirmar</button>`,
			'Cancelar',
			55
		);
	},

	confirmDelete: (item) => {
		TriggerCallback('origen_menu:server:DeleteItem', { item }).done((cb) => {
			if (cb && cb == true) {
				sendNotification(
					'success',
					'El item se ha eliminado correctamente',
					'Recuerda que debes esperar hasta el próximo reinicio para ver los cambios'
				);
			} else {
				sendNotification('error', 'Ha ocurrido un error inesperado');
			}
			CloseModal();
		});
	}
};

const garajesFunctions = {
	modalGaraje: () => {
		OpenModal(
			`Añadir Garaje`,
			`
            <h5>Introduce la información</h5>
            <div class="mt-2">
                <label>Nombre</label>
                <input class="form-control w-100 n-garaje" placeholder="Nombre del garaje">
            </div>

            <h5 class="mt-4">Coordenadas</h5>
            <label class="mt-2">Marker de acceso</label>
            <div class="row mb-4 marker">
                <div class="col-2">

                    <input class="form-control w-100 input-cord-x h-100" type="number" placeholder="X">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-y h-100" type="number" placeholder="Y">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-z h-100" type="number" placeholder="Z">
                </div>

                <div class="col-6">

                    <button class="btn-modal w-100 p-1">Copiar coords.</button>
                </div>

            </div>

            <label class="mt-2">Entrada de vehículos</label>
            <div class="row mb-4 entrada">
                <div class="col-2">

                    <input class="form-control w-100 input-cord-x h-100" type="number" placeholder="X">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-y h-100" type="number" placeholder="Y">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-z h-100" type="number" placeholder="Z">
                </div>

                <div class="col-6">

                    <button class="btn-modal w-100 p-1">Copiar coords.</button>
                </div>
            </div>

            <label class="mt-2">Salida de vehículos</label>
            <div class="row mb-4 salida">
                <div class="col-2">

                    <input class="form-control w-100 input-cord-x h-100" type="number" placeholder="X">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-y h-100" type="number" placeholder="Y">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-z h-100" type="number" placeholder="Z">
                </div>

                <div class="col-6">

                    <button class="btn-modal w-100 p-1">Copiar coords.</button>
                </div>
            </div>

        `,
			`<button class="btn-modal" onclick="">Guardar cambios</button>`,
			'Cancelar',
			55
		);
	}
};

$(document).on('change', '.check-dispo.bebida', function () {
	if ($(this).is(':checked')) {
		$('.cant-bebida').show(150);
	} else {
		$('.cant-bebida').hide(150);
	}
});

$(document).on('change', '.check-dispo.comida', function () {
	if ($(this).is(':checked')) {
		$('.cant-comida').show(150);
	} else {
		$('.cant-comida').hide(150);
	}
});

$(document).on('change', '.check-dispo.alcohol', function () {
	if ($(this).is(':checked')) {
		$('.cant-droga').show(150);
	} else {
		$('.cant-droga').hide(150);
	}
});

$(document).on('change', '.check-dispo.decay', function () {
	if ($(this).is(':checked')) {
		$('.cant-decay').show(150);
	} else {
		$('.cant-decay').hide(150);
	}
});

function validateFormItem() {
	const nombre = $('.c-modal .n-item').val();
	const descripcion = $('.c-modal .desc-item').val();
	const urlImagen = $('.c-modal .img-item').val();
	const bebida = $('.c-modal .check-dispo.bebida').is(':checked');
	const cantidadBebida = parseInt($('.c-modal .cant-bebida').val());
	const comida = $('.c-modal .check-dispo.comida').is(':checked');
	const cantidadComida = parseInt($('.c-modal .cant-comida').val());
	const alcohol = $('.c-modal .check-dispo.alcohol').is(':checked');
	const duracionAlcohol = parseInt($('.cant-droga').val());
	const decay = $('.check-dispo.decay').is(':checked');
	const duracionDecay = parseInt($('.cant-decay').val());

	const regexNombre = /^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]{4,}$/;

	const regexUrlImagen = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

	let valid = true;

	if (!regexNombre.test(nombre)) {
		sendNotification('error', 'El nombre debe tener al menos 4 caracteres');
		valid = false;
	}

	if (descripcion.length < 10) {
		sendNotification('error', 'La descripción debe tener al menos 10 caracteres');
		valid = false;
	}

	if (!regexUrlImagen.test(urlImagen)) {
		sendNotification('error', 'La URL de la imagen no es válida');
		valid = false;
	}

	if (
		(!cantidadBebida && bebida) ||
		(bebida && (cantidadBebida > 100 || cantidadBebida < 1))
	) {
		sendNotification('error', 'Introduce la cantidad de bebida entre 1 y 100');
		valid = false;
	}

	if (
		(!cantidadComida && comida) ||
		(comida && (cantidadComida > 100 || cantidadComida < 1))
	) {
		sendNotification('error', 'Introduce la cantidad de comida entre 1 y 100');
		valid = false;
	}

	if (
		(!duracionAlcohol && alcohol) ||
		(alcohol && (duracionAlcohol > 600 || duracionAlcohol < 1))
	) {
		sendNotification(
			'error',
			'La duración del efecto de alcohol/droga debe ser entre 1 y 600 segundos'
		);
		valid = false;
	}

	if (
		(!duracionDecay && decay) ||
		(decay && (duracionDecay > 10 || duracionDecay < 1))
	) {
		sendNotification(
			'error',
			'La duración de la caducidad debe ser entre 1 y 10 horas'
		);
		valid = false;
	}

	if (urlImagen) {
		const img = new Image();
		img.onload = function () {
			if (img.width > 256 || img.height > 256) {
				sendNotification('error', 'La imagen no puede superar los 256x256px');
				valid = false;
			}
		};
		img.src = urlImagen;
	}

	return valid;
}
let bandasAuxAdmin;
let negociosAuxAdmin;
$(document).on('click', '.acceso-rapido .list-item', function () {
	let html = '';
	let title = '';
	switch ($(this).attr('action')) {
		case 'a-org':
			getAllGangs().done((cb) => {
				bandasAuxAdmin = cb;
				title = 'Asignar Organización';
				let bandas = '';
				bandasAuxAdmin.map((banda, index) => {
					bandas += `<option value="${index}" idbanda="${banda.id}">${banda.label}</option>`;
				});
				html = `
                <div class="row mt-2">
                    <div class="col-sm-2">
                        <label>ID</label>
                        <input class="form-control w-100 player">
                    </div>
                    <div class="col-sm-5">
                        <label>Organización</label>
                        <select class="form-control w-100 select-organizaciones">
                            <option disabled selected>Selecciona una organización</option>
                            ${bandas}
                        </select>
                    </div>
                    <div class="col-sm-5">
                        <label>Rango</label>
                        <select class="form-control w-100 select-rangos">
                            <option disabled selected>Selecciona un rango</option>
                        </select>
                    </div>
                </div>
                `;

				modalAccionesRapidas(title, html, 'asignar-organizacion');
			});

			break;
		case 'd-org':
			title = 'Desasignar Organización';
			html = `
            <div class="row mt-2">
                <div class="col-sm-12">
                    <label>ID Jugador</label>
                    <input class="form-control w-100 player" placeholder="Introduce el ID del jugador">
                </div>
            </div>
            `;
			modalAccionesRapidas(title, html, 'desasignar-organizacion');

			break;
		case 'a-bus':
			TriggerCallback('origen_menu:server:GetBusinessesToAssing', {}).done((cb) => {
				bandasAuxAdmin = cb;
				title = 'Asignar Negocio';
				let bandas = '';
				bandasAuxAdmin.map((banda, index) => {
					bandas += `<option value="${index}" idbandas="${banda.id}">${banda.label}</option>`;
				});
				html = `
                <div class="row mt-2">
                    <div class="col-sm-2">
                        <label>ID</label>
                        <input class="form-control w-100 player">
                    </div>
                    <div class="col-sm-5">
                        <label>Negocio</label>
                        <select class="form-control w-100 select-organizaciones">
                            <option disabled selected>Selecciona un negocio</option>
                            ${bandas}
                        </select>
                    </div>
                    <div class="col-sm-5">
                        <label>Rango</label>
                        <select class="form-control w-100 select-rangos">
                            <option disabled selected>Selecciona un rango</option>
                        </select>
                    </div>
                </div>
                `;

				modalAccionesRapidas(title, html, 'asignar-negocio');
			});
			break;
		case 'd-bus':
			title = 'Desasignar Negocio';
			html = `
            <div class="row mt-2">
                <div class="col-sm-12">
                    <label>ID Jugador</label>
                    <input class="form-control w-100 player" placeholder="Introduce el ID del jugador">
                </div>
            </div>
            `;
			modalAccionesRapidas(title, html, 'desasignar-negocio');
			break;
		case 'stock-armas':
			fetch('GetAdminCamoList', {}).done((cb) => {
				if (cb && cb.length > 0) {
					let skins = '';
					cb.map((skin) => {
						skins += `<option value="${skin.id}" stock="${skin.stock}">${skin.title}</option>`;
					});
					title = 'Modificar stock de camuflajes';
					html = `
				<div>Modifica el stock de los camuflajes de armas en el mercado negro de las organizaciones</div>
				<div class="row mt-2">

                    <div class="col-7">
                        <label>Skin</label>

                    </div>
                    <div class="col-2">
                        <label>Stock</label>

                    </div>
					<div class="col-3">

					</div>
					<div class="col-7">

                        <select class="form-control w-100 select-skins h-100">
                            <option disabled selected>Selecciona una skin</option>
                            ${skins}
                        </select>
                    </div>
                    <div class="col-2">

                       <input class="form-control stock w-100 h-100" placeholder="Stock">
                    </div>
					<div class="col-3">
						<button class="btn-modal w-100" onclick="savePriceSkin()">Guardar</button>
					</div>
                </div>
			`;
					modalStockSkins(title, html);
				}
			});

			break;
	}
});

function modalAccionesRapidas(title, html, action) {
	OpenModal(
		title,
		html,
		`<button class="btn-modal" onclick="ejecutarAccionRapida('${action}')">Guardar cambios</button>`,
		'Cancelar',
		65
	);
}

function modalStockSkins(title, html) {
	OpenModal(title, html, ``, 'Volver', 65);
}

function ejecutarAccionRapida(action) {
	switch (action) {
		case 'asignar-organizacion':
			if (
				$('.c-modal .player').val() != '' &&
				$('.c-modal .select-organizaciones').val() != '' &&
				$('.c-modal .select-rangos').val() != ''
			) {
				TriggerCallback('origen_menu:server:SetGang', {
					id: parseInt($('.c-modal .player').val()),
					id_gang:
						bandasAuxAdmin[
							parseInt($('.c-modal .select-organizaciones').val())
						].id,
					id_grade: $('.c-modal .select-rangos').val() + ''
				}).done((cb) => {
					if (cb && cb == true) {
						sendNotification(
							'success',
							'Organización asignada correctamente'
						);
						CloseModal();
					} else {
						sendNotification('error', cb);
					}
				});
			} else {
				sendNotification('error', 'Introduce todos los datos para continuar');
			}

			break;
		case 'desasignar-organizacion':
			if ($('.c-modal .player').val() != '') {
				TriggerCallback('origen_menu:server:RemoveGang', {
					id: parseInt($('.c-modal .player').val())
				}).done((cb) => {
					if (cb && cb == true) {
						sendNotification(
							'success',
							'Organización desasignada correctamente'
						);
						CloseModal();
					} else {
						sendNotification('error', cb);
					}
				});
			} else {
				sendNotification('error', 'No has introducido ninguna ID');
			}

			break;
		case 'asignar-negocio':
			if (
				$('.c-modal .player').val() != '' &&
				$('.c-modal .select-organizaciones').val() != '' &&
				$('.c-modal .select-rangos').val() != ''
			) {
				TriggerCallback('origen_menu:server:SetBusiness', {
					id: parseInt($('.c-modal .player').val()),
					id_business:
						bandasAuxAdmin[
							parseInt($('.c-modal .select-organizaciones').val())
						].id,
					id_grade: $('.c-modal .select-rangos').val() + ''
				}).done((cb) => {
					if (cb && cb == true) {
						sendNotification('success', 'Negocio asignado correctamente');
						CloseModal();
					} else {
						sendNotification('error', cb);
					}
				});
			} else {
				sendNotification('error', 'Introduce todos los datos para continuar');
			}

			break;
		case 'desasignar-negocio':
			if ($('.c-modal .player').val() != '') {
				TriggerCallback('origen_menu:server:RemoveBusiness', {
					id: parseInt($('.c-modal .player').val())
				}).done((cb) => {
					if (cb && cb == true) {
						sendNotification('success', 'Negocio desasignado correctamente');
						CloseModal();
					} else {
						sendNotification('error', cb);
					}
				});
			} else {
				sendNotification('error', 'No has introducido ninguna ID');
			}

			break;
	}
}

function savePriceSkin() {
	const id = parseInt($('.c-modal .select-skins').val());

	const stock = parseInt($('.c-modal .stock').val());
	if (!id) {
		sendNotification('error', 'No has seleccionado ninguna skin');
		return;
	}
	if (stock > 0) {
		fetch('UpdateCamoStock', { id, stock });
		$('.c-modal .select-skins').find('option:selected').attr('stock', stock);
		sendNotification('success', 'Has actualizado el stock correctamente');
	} else {
		sendNotification('error', 'No has introducido un stock válido');
	}
}

$(document).on('change', '.select-organizaciones', function () {
	const index = $(this).val();
	const bandas = bandasAuxAdmin;
	let grades = '';
	if (Array.isArray(bandas[index].grades)) {
		bandas[index].grades.map((grade, index) => {
			grades += `<option value="${index}">${grade.label}</option>`;
		});
	} else {
		Object.values(bandas[index].grades).map((grade, index2) => {
			const keys = Object.keys(bandas[index].grades);
			grades += `<option value="${keys['' + index2]}">${grade.label}</option>`;
		});
	}

	$('.select-rangos').html(
		'<option disabled selected>Selecciona un rango</option>' + grades
	);
});

$(document).on('change', '.select-skins', function () {
	const stock = $(this).find('option:selected').attr('stock');
	$('.c-modal .stock').val(stock);
});

function loadAdminGangs() {
	cargarMapaTerritoriosAdmin();
	getAllGangs().done((cb) => {
		$('.admin .gang-list').html('');

		cb.sort((a, b) => a.label.localeCompare(b.label));
		cb.map((banda, index) => {
			$('.admin .gang-list').append(`
            <div class="white-block scale-in" id="gang-${banda.label}" onclick="gangAdmin.loadGang('${banda.id}', $(this))">

                <div class="report-name">
                    ${banda.label}
                </div>

            </div>`);
		});
	});
}

function loadAdminBusiness() {
	TriggerCallback('origen_menu:server:GetBusinessesToAssing', {}).done((cb) => {
		$('.admin .local-list').html('');
		cb.sort((a, b) => a.label.localeCompare(b.label));
		cb.map((business, index) => {
			$('.admin .local-list').append(`
            <div class="white-block scale-in" id="local-${business.id}" onclick="localAdmin.loadLocal('${business.id}', $(this))">

                <div class="report-name">
                    ${business.label}
                </div>

            </div>`);
		});
	});
}

const gangAdmin = {
	loadGang: (id, button) => {
		TriggerCallback('origen_ilegal:server:GetGang', { gang: id, admin: true }).done(
			(cb) => {
				if (cb) {
					if (button) {
						button.addClass('selected');
						$('.admin .admin-gangs .white-block.selected').removeClass(
							'selected'
						);
					}

					$('.admin .gang-ficha').fadeOut(300, function () {
						cargarFichaGang(cb).then(() => {
							$('.admin .gang-ficha').fadeIn(300);
						});
					});
				}
			}
		);
	}
};

const localAdmin = {
	loadLocal: (id) => {
		TriggerCallback('origen_masterjob:server:GetBusiness', {
			business: id,
			admin: true
		}).done((cb) => {
			if (cb) {
				$('.admin .admin-local .white-block.selected').removeClass('selected');
				$('.admin #local-' + id).addClass('selected');

				$('.admin .local-ficha').fadeOut(300, function () {
					cargarFichaBusiness(cb).then(() => {
						$('.admin .local-ficha').fadeIn(300);
					});
				});
			}
		});
	},

	modalArticulo: (id, itemName, price, level) => {
		tablaItems = '';

		if (!itemName) {
			itemName = '';
		}
		OpenModal(
			price ? `Editar artículo` : `Añadir artículo`,
			`

			<div class="cargando-modal" >
                <div class="d-flex justify-content-center align-items-center" style="height:50vh">
                <img src="./img/loading.svg" style="width:15vh">
                </div>
            </div>
            <div class="modal-cargado" style="display:none;"></div>


		`,
			`<button class="btn-modal" onclick="localAdmin.saveItem('${id}')">Guardar cambios</button>`,
			'Cancelar',
			80
		);
		itemsFunctions.loadItems().done((items) => {
			if (items) {
				items.map((item, index) => {
					tablaItems += `
                    <tr>
                        <td>${item.label}</td>
                        <td>${item.description}</td>

                        <td class="d-flex">

                            <div class="btn-action me-2 p-1" style="font-size:1.2vh" onClick="$('.c-modal .id-item').val('${item.name}');">
                                ELEGIR
                            </div>


                        </td>

                    </tr>`;
				});
				$('.c-modal .modal-cargado').html(`


				<h5>Introduce la información</h5>
				<div class="mt-2 mb-3">
					<label>ID del item</label>
					<input class="form-control w-100 id-item" value="${itemName}" placeholder="Selecciona un item en la tabla" disabled>
				</div>

				<div class="${price ? 'd-none' : ''}">
					<table class="w-100 tabla-items-mision mt-1">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Descripción</th>

							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						${tablaItems}
					</tbody>
				</table>
				</div>


				<div class="mt-2 row">
					<div class="col-6">
						<label>Precio</label>
						<input class="form-control w-100 precio-item" value="${price}" type="number" min="0" placeholder="Precio">
					</div>
					<div class="col-6">
						<label>Nivel</label>
						<input class="form-control w-100 nivel-item" value="${level}" type="number" min="0" placeholder="Nivel">
					</div>
				</div>


				`);
				$('.c-modal .tabla-items-mision').DataTable({
					language: dataTableLanguage,
					pageLength: 10,
					lengthChange: false
				});

				$('.c-modal .cargando-modal').fadeOut(300, function () {
					$('.c-modal .modal-cargado').fadeIn(300);
				});
			}
		});
	},
	saveItem: (id) => {
		const name = $('.c-modal .id-item').val().trim();
		const price = parseInt($('.c-modal .precio-item').val().trim());
		const level = parseInt($('.c-modal .nivel-item').val().trim());
		const item = {
			name,
			price,
			level
		};

		if (!name || name.length < 3) {
			sendNotification('error', 'Introduce un item');
			return;
		}
		if (!price || price.length < 1) {
			sendNotification('error', 'El precio debe ser un número mayor a 0');
			return;
		}
		if ((!level && level != 0) || level < 0) {
			sendNotification('error', 'El nivel mínimo es 0');
			return;
		}

		TriggerCallback('origen_menu:server:AddAllowedItem', { business: id, item }).done(
			(cb) => {
				if (cb === true) {
					sendNotification('success', 'Artículo añadido correctamente');
					CloseModal();
					localAdmin.loadLocal(id);
				} else {
					sendNotification('error', cb);
				}
			}
		);
	},
	deleteItem: (id, name) => {
		TriggerCallback('origen_menu:server:RemoveAllowedItem', {
			business: id,
			item: name
		}).done((cb) => {
			if (cb === true) {
				sendNotification('success', 'El artículo se ha eliminado correctamente');
				localAdmin.loadLocal(id);
			} else {
				sendNotification('error', cb);
			}
		});
	}
};

function cargarFichaGang(gang) {
	return new Promise((resolve, reject) => {
		exportEvent('origen_ilegal', 'Get_Config.Gangs', {}).done((config) => {
			config = JSON.parse(config);

			let grades = '';
			let territorios = '';
			let players = '';
			let activity = '';

			if (gang.grades) {
				const rangos = Object.values(gang.grades);
				const keys = Object.keys(gang.grades);
				rangos.map((grade, index) => {
					grades += `
					<li class="list-group-item item list-group-item-action d-flex justify-content-between align-items-center">
						<div><span class="badge badge-acent">ID ${keys[index]}</span> ${grade.label}</div>
						<div class="d-flex justify-content-center align-items-center">
							<!--<div class="btn btn-action" onclick=""><i class="fas fa-trash-alt delete-item" aria-hidden="true"></i></div>-->
						</div>
					</li>
				`;
				});
			}
			if (gang.territories) {
				gang.territories.map((territorie) => {
					let npcs = '';
					let markers = '';

					if (territorie.npcs) {
						territorie.npcs.map((npc) => {
							npcs += `
							<li class="list-group-item list-group-item-action">
								<div class="d-flex align-items-center justify-content-between">
									<div><i class="fa-solid fa-person me-2"></i> ${npc.name}
									</div>
									<div class="d-flex align-items-center">
										<i class="fa-solid fa-location-dot pointer haztp" x="${npc.coords.x}" y="${npc.coords.y}" z="${npc.coords.z}"></i>
										<!--<i class="fa-solid fa-trash pointer"></i>-->
									</div>
								</div>
							</li>`;
						});
					}

					if (territorie.markers) {
						territorie.markers.map((marker) => {
							markers += `
							<li class="list-group-item list-group-item-action">
								<div class="d-flex align-items-center justify-content-between">
									<div><i class="fa-solid fa-map-pin me-2"></i> ${marker.type}
									</div>
									<div class="d-flex align-items-center">
										<i class="fa-solid fa-location-dot pointer haztp" x="${marker.x}" y="${marker.y}" z="${marker.z}"></i>
										<!--<i class="fa-solid fa-trash pointer"></i>-->
									</div>
								</div>
							</li>`;
						});
					}

					territorios += `
					<li class="list-group-item list-group-item-action expandible exp-territorios">
						<div class="d-flex justify-content-between align-items-center w-100">
							<div>${territorie.name}</div>
							<div>
								<i class="lni lni-trash-can me-2 pointer" onClick="modalBorrarTerritorio('${gang.id}', '${territorie.code}')"></i>
								<i class="fa-solid fa-chevron-down pointer flecha"></i>
							</div>
						</div>
						<div class="puntos-territorio w-100">
							<ul class="list-group multas-list mt-2 lista-puntos">
								${npcs}
								${markers}
							</ul>
						</div>

					</li>
					`;
				});
			}

			if (gang.players) {
				gang.players.map((player) => {
					players += `
					<li class="list-group-item list-group-item-action">
						<div class="d-flex align-items-center justify-content-between">
							<div class="d-flex align-items-center bankgothic"><i class="fa-solid fa-user me-2"></i> ${
								player.name
							}
							</div>
							<div class="d-flex align-items-center">

							</div>
						</div>
						<div>
							<span class="badge bg-dark me-2">
							<i class="fa-solid fa-id-card"></i> ${player.citizenid || 'Desconocido'}
							</span>
							<span class="badge bg-dark me-2">
								<i class="fa-solid fa-phone"></i> ${player.phone || 'Desconocido'}
							</span>
							<span class="badge bg-dark">
								RANGO: ${gang.grades[player.grade].label + " (" + player.grade + ")"}
							</span>
						</div>
					</li>
					`;
				});
			}

			if (gang.skills && gang.stats) {
				Object.entries(gang.skills).map((skills) => {
					let levelInput = `<input type="number" class="input-gang-skill-level" value="${skills[1].level}"  last-value="${skills[1].level}">`;
					let experienceInput = `<input type="number" class="input-gang-skill-experience" value="${skills[1].experience}" last-value="${skills[1].experience}">`;

					activity += `
					<li class="list-group-item list-group-item-action" gang-skill-id="${skills[0]}">
						<div class="d-flex align-items-center justify-content-between">
							<div class="d-flex align-items-center bankgothic"><i class="fa-solid fa-chart-line me-2"></i> ${
								config.Activity[skills[0]].title
							}
							</div>
							<div class="d-flex align-items-center">

							</div>
						</div>
						<div>
							<span class="badge bg-dark me-2">
								Nivel: ${config.Activity[skills[0]].levels[skills[1].level] + " (" + levelInput + "/" + config.Activity[skills[0]].levels.length + ")"}
							</span>
							<span class="badge bg-dark me-2">
								Experiencia: ${experienceInput + '/<span class="exp-limit">' + config.LevelFactor * (skills[1].level + 1)}</span>
							</span>
							<span class="badge bg-dark me-2">
								<i class="fa-solid fa-check"></i> ${gang.stats[skills[0]] ? gang.stats[skills[0]].success : 0}
							</span>
							<span class="badge bg-dark">
								<i class="fa-solid fa-times"></i> ${gang.stats[skills[0]] ? gang.stats[skills[0]].failed : 0}
							</span>
						</div>
					</li>
					`;
				});
			}

			const fichaGang = `
				<div class="row">
					<div class="col-sm-4">
						<div class="h-100 info-box">
							<h4 class="bankgothic">ID</h4>
							${gang.id}
						</div>
					</div>
					<div class="col-sm-4">
						<div class="h-100 info-box">
							<h4 class="bankgothic">NOMBRE</h4>
							<input type="text" class="input-gang-name" value="${gang.label}">
						</div>
					</div>
					<div class="col-sm-4">
						<div class="h-100 info-box">
							<h4 class="bankgothic">NIVEL</h4>
							<input type="number" class="input-gang-level" value="${gang.level}">
						</div>
					</div>
					<div class="col-6 mt-3">
						<div class="h-100 info-box">
							<h4 class="bankgothic">RANGOS</h4>
							<ul class="list-group multas-list mt-2 lista-rangos">
								${grades}
							</ul>
						</div>

					</div>
					<div class="col-6 mt-3">
						<div class="h-100 info-box">
							<h4 class="bankgothic">TERRITORIOS Y PUNTOS</h4>
							<ul class="list-group multas-list mt-2 lista-puntos">
								${territorios}
							</ul>
						</div>

					</div>
					<div class="col-12 mt-3">
						<div class="h-100 info-box">
							<h4 class="bankgothic">MIEMBROS</h4>
							<ul class="list-group multas-list mt-2 lista-puntos">
								${players}
							</ul>
						</div>
					</div>
					<div class="col-12 mt-3">
						<div class="h-100 info-box">
							<h4 class="bankgothic">ACTIVIDAD</h4>
							<ul class="list-group multas-list mt-2 lista-puntos">
								${activity}
							</ul>
						</div>
					</div>
				</div>
			`;
			
			$('.admin .gang-ficha').attr('gang-id', gang.id);
			$('.admin .gang-ficha').html(fichaGang);

			resolve();
		});
	});
}

function modalBorrarTerritorio(gang, territorio) {
	OpenModal(
		`Eliminar territorio`,
		`
			¿Estás seguro de que deseas eliminar este territorio y todos sus puntos? </br>Esta acción es irreversible.

	`,
		`<button class="btn-modal" onclick="borrarTerritorio('${gang}','${territorio}')">Confirmar</button>`,
		'Cancelar',
		50
	);
}

function borrarTerritorio(gang, code) {
	// code = parseInt(code);
	TriggerCallback('origen_menu:server:DeleteTerritory', { gang, code }).then((cb) => {
		if (cb === true) {
			gangAdmin.loadGang(gang);
			CloseModal();
			sendNotification('success', 'Territorio eliminado correctamente');
		} else {
			sendNotification('error', cb);
		}
	});
}

function cargarFichaBusiness(local) {
	return new Promise((resolve, reject) => {
		let grades = '';
		let markers = '';
		let players = '';
		let items = '';
		let npcs = '';

		if (local.grades) {
			const rangos = Object.values(local.grades);
			const keys = Object.keys(local.grades);
			rangos.map((grade, index) => {
				grades += `
				<li class="list-group-item item list-group-item-action d-flex justify-content-between align-items-center">
					<div><span class="badge badge-acent">ID ${keys[index]}</span> ${grade.label}</div>
					<div class="d-flex justify-content-center align-items-center">
						<!--<div class="btn btn-action" onclick=""><i class="fas fa-trash-alt delete-item" aria-hidden="true"></i></div>-->
					</div>
				</li>
			`;
			});
		}

		if (local.npcs) {
			local.npcs.map((marker) => {
				markers += `
				<li class="list-group-item list-group-item-action">
					<div class="d-flex align-items-center justify-content-between">
						<div><i class="fa-solid fa-person me-2"></i> [NPC] ${marker.name}
						</div>
						<div class="d-flex align-items-center">
							<i class="fa-solid fa-location-dot pointer haztp" x="${marker.coords.x}" y="${marker.coords.y}" z="${marker.coords.z}"></i>
							<!--<i class="fa-solid fa-trash pointer"></i>-->
						</div>
					</div>
				</li>`;
			});
		}

		if (local.markers) {
			local.markers.map((marker) => {
				markers += `
				<li class="list-group-item list-group-item-action">
					<div class="d-flex align-items-center justify-content-between">
						<div><i class="fa-solid fa-map-pin me-2"></i> ${marker.type}
						</div>
						<div class="d-flex align-items-center">
							<i class="fa-solid fa-location-dot pointer haztp" x="${marker.x}" y="${marker.y}" z="${marker.z}"></i>
							<!--<i class="fa-solid fa-trash pointer"></i>-->
						</div>
					</div>
				</li>`;
			});
		}

		if (local.players) {
			local.players.map((player) => {
				players += `
				<li class="list-group-item list-group-item-action">
					<div class="d-flex align-items-center justify-content-between">
						<div class="d-flex align-items-center bankgothic"><i class="fa-solid fa-user me-2"></i> ${
							player.name
						}
						</div>
						<div class="d-flex align-items-center">

						</div>
					</div>
					<div>
						<span class="badge bg-dark me-2">
						<i class="fa-solid fa-id-card"></i> ${player.citizenid || 'Desconocido'}
						</span>
						<span class="badge bg-dark me-2">
							<i class="fa-solid fa-phone"></i> ${player.phone || 'Desconocido'}
						</span>
						<span class="badge bg-dark">
							RANGO: ${local.grades[player.grade].label + " (" + player.grade + ")"}
						</span>
					</div>
				</li>
				`;
			});
		}

		if (local.allowed_items) {
			local.allowed_items.map((item) => {
				items += `
				<tr>
					<td>${item.name}</td>
					<td class="text-center">${item.price}</td>
					<td class="text-center">${item.level}</td>
					<td class="text-center">
						<button class="btn btn-action btn-sm me-1" onClick="localAdmin.modalArticulo('${local.id}', '${item.name}', ${item.price},${item.level})">
							<i class="fa-solid fa-pen-to-square"></i>
						</button>
						<button class="btn btn-action btn-sm" onClick="localAdmin.deleteItem('${local.id}', '${item.name}')">
							<i class="fa-solid fa-trash"></i>
						</button>
					</td>
				</tr>
				`;
			});
		}

		const fichaLocal = `
            <div class="row">
				<div class="col-sm-3">
					<div class="h-100 info-box">
						<h4 class="bankgothic">ID</h4>
						${local.id}
					</div>
				</div>
				<div class="col-sm-3">
					<div class="h-100 info-box">
						<h4 class="bankgothic">Nombre</h4>
						<input type="text" class="input-local-name" value="${local.label}">
					</div>
				</div>
                <div class="col-sm-3">
					<div class="h-100 info-box">
						<h4 class="bankgothic">NIVEL</h4>
						<input type="number" class="input-local-level" value="${local.level}">
					</div>
                </div>
                <div class="col-sm-3">
					<div class="h-100 info-box">
                    	<h4 class="bankgothic">CAPITAL</h4>
						${local.money}
					</div>
                </div>
				<div class="col-6 mt-3">
					<div class="h-100 info-box">
						<h4 class="bankgothic">RANGOS</h4>
						<ul class="list-group multas-list mt-2 lista-rangos">
							${grades}
						</ul>
					</div>

				</div>
				<div class="col-6 mt-3">
					<div class="h-100 info-box">
						<h4 class="bankgothic">PUNTOS</h4>
						<ul class="list-group multas-list mt-2 lista-puntos">
							${markers}
						</ul>
					</div>

				</div>
				<div class="col-12 mt-3">
					<div class="h-100 info-box">

						<h4 class="bankgothic">MIEMBROS</h4>

						<ul class="list-group multas-list mt-2 lista-puntos">
							${players}
						</ul>
					</div>

				</div>

				<div class="col-12 mt-3">
					<div class="info-box h-100">
					<div class="d-flex justify-content-between align-items-center mb-2">
						<h4 class="bankgothic">Artículos del negocio</h4>
						<button class="btn btn-action p-1" onClick="localAdmin.modalArticulo('${local.id}')">Añadir artículo</button>
						</div>
						<table class="w-100 tabla-items-local">
							<thead>
								<tr>
									<th style="width: 80%">ID</th>
									<th style="width: 5vh !important">Precio</th>
									<th style="width: 5vh !important">Nivel</th>
									<th style="width: 10vh !important">Acciones</th>
								</tr>
							</thead>
							<tbody>
								${items}
							</tbody>
						</table>
					</div>
				</div>

            </div>
        `;
		$('.admin .local-ficha').html(fichaLocal);
		$('.admin .local-ficha').attr('local-id', local.id);
		$('.admin .local-ficha .tabla-items-local').DataTable({
			language: dataTableLanguage,
			pageLength: 10,
			lengthChange: false,
			order: [[2, 'asc']]
		});

		resolve();
	});
}

$(document).on('click', '.admin ul .flecha', function () {
	if (!$(this).parent().parent().parent().hasClass('expand')) {
		$('.admin .exp-territorios.expand').removeClass('expand');
	}
	$(this).parent().parent().parent().toggleClass('expand');
});

$(document).on('focusout', '.admin .local-ficha .input-local-name', function () {
	TriggerCallback('origen_masterjob:server:UpdateBusinessKey', { id: $('.admin .local-ficha').attr('local-id'), key: "label", value: $(this).val() }).then((cb) => {
		if (cb) {
			sendNotification('success', 'Nombre actualizado correctamente');
			$('.admin .local-list #local-' + $('.admin .local-ficha').attr('local-id') + ' .report-name').html($(this).val());
		} else {
			sendNotification('error', "No se ha podido actualizar el nombre");
		}
	});
});

$(document).on('focusout', '.admin .local-ficha .input-local-level', function () {
	TriggerCallback('origen_masterjob:server:UpdateBusinessKey', { id: $('.admin .local-ficha').attr('local-id'), key: "level", value: parseInt($(this).val()) }).then((cb) => {
		if (cb) {
			sendNotification('success', 'Nivel actualizado correctamente');
		} else {
			sendNotification('error', "No se ha podido actualizar el nivel");
		}
	});
});

$(document).on('focusout', '.admin .gang-ficha .input-gang-name', function () {
	TriggerCallback('origen_ilegal:server:UpdateGangKey', { id: $('.admin .gang-ficha').attr('gang-id'), key: "label", value: $(this).val() }).then((cb) => {
		if (cb) {
			sendNotification('success', 'Nombre actualizado correctamente');
			$('.admin .gang-list #gang-' + $('.admin .gang-ficha').attr('gang-id') + ' .report-name').html($(this).val());
		} else {
			sendNotification('error', "No se ha podido actualizar el nombre");
		}
	});
});

$(document).on('focusout', '.admin .gang-ficha .input-gang-level', function () {
	TriggerCallback('origen_ilegal:server:UpdateGangKey', { id: $('.admin .gang-ficha').attr('gang-id'), key: "level", value: parseInt($(this).val()) }).then((cb) => {
		if (cb) {
			sendNotification('success', 'Nivel actualizado correctamente');
		} else {
			sendNotification('error', "No se ha podido actualizar el nivel");
		}
	});
});

$(document).on('focusout', '.admin .gang-ficha .input-gang-skill-level', function () {
	exportEvent('origen_ilegal', 'Get_Config.Gangs', {}).done((config) => {
		config = JSON.parse(config);

		let lastLevel = parseInt($(this).attr('last-value'));
		let skillId = $(this).parent().parent().parent().attr('gang-skill-id');
		let newLevel = parseInt($(this).val());
		let gang = $('.admin .gang-ficha').attr('gang-id');

		if (newLevel <= config.Activity[skillId].levels.length) {
			TriggerCallback('origen_ilegal:server:UpdateGangSkill', { gang, skill: skillId, key: "level", value: newLevel }).then((cb) => {
				if (cb) {
					sendNotification('success', 'Nivel actualizado correctamente');

					$(this).attr('last-value', newLevel);

					$(this).parent().parent().parent().find('.exp-limit').text(config.LevelFactor * (newLevel + 1));
				} else {
					sendNotification('error', "No se ha podido actualizar el nivel");
				}
			});
		} else {
			sendNotification('error', "El nivel máximo es " + config.Activity[skillId].levels.length);
			$(this).val(lastLevel);
		}
	});
});

$(document).on('focusout', '.admin .gang-ficha .input-gang-skill-experience', function () {
	exportEvent('origen_ilegal', 'Get_Config.Gangs', {}).done((config) => {
		config = JSON.parse(config);

		let lastExperience = parseInt($(this).attr('last-value'));
		let skillId = $(this).parent().parent().parent().attr('gang-skill-id');
		let newExperience = parseInt($(this).val());
		let gang = $('.admin .gang-ficha').attr('gang-id');

		if (newExperience <= config.LevelFactor * (parseInt($(this).parent().parent().parent().find('.input-gang-skill-level').val()) + 1)) {
			TriggerCallback('origen_ilegal:server:UpdateGangSkill', { gang, skill: skillId, key: "experience", value: newExperience }).then((cb) => {
				if (cb) {
					sendNotification('success', 'Experiencia actualizada correctamente');

					if (newExperience >= config.LevelFactor * (parseInt($(this).parent().parent().parent().find('.input-gang-skill-level').val()) + 1)) {
						$(this).attr('last-value', 0);

						$(this).val(0);

						$(this).parent().parent().parent().find('.input-gang-skill-level').val(parseInt($(this).parent().parent().parent().find('.input-gang-skill-level').val()) + 1);

						$(this).parent().parent().parent().find('.exp-limit').text(config.LevelFactor * (parseInt($(this).parent().parent().parent().find('.input-gang-skill-level').val()) + 1));
					} else {
						$(this).attr('last-value', newExperience);
					}
				} else {
					sendNotification('error', "No se ha podido actualizar la experiencia");
				}
			});
		} else {
			sendNotification('error', "La experiencia máxima es " + config.LevelFactor * (parseInt($(this).parent().parent().parent().find('.input-gang-skill-level').val()) + 1));
			$(this).val(lastExperience);
		}
	});
});

// OpenModal(`Editar item`,
// `
//     <h5>Introduce la información</h5>
//     <div class="mt-2">
//         <label>Nombre</label>
//         <input class="form-control w-100" placeholder="Nombre del item">
//     </div>
//     <div class="mt-2">
//         <label>Descripción</label>
//         <textarea class="form-control w-100" placeholder="Descripción del item"></textarea>
//     </div>
//     <div class="mt-2">
//         <label>URL Imagen <small>(Máximo 256x256 px)</small></label>
//         <input class="form-control w-100" placeholder="Introduce la URL de la imagen">
//     </div>
//     <div class="row mt-3">
//         <div class="col-4">
//             <label>Bebida</label>
//             <div class="check">
//                 <label class="switch">
//                     <input type="checkbox" class="check-dispo bebida">
//                     <span class="slider-check round"></span>
//                 </label>
//             </div>
//             <input class="form-control mt-2 w-100 cant-bebida d-none" placeholder="Cantidad" type="number" max="100" min="0">
//         </div>
//         <div class="col-4">
//         <label>Comida</label>
//             <div class="check">
//                 <label class="switch">
//                     <input type="checkbox" class="check-dispo comida">
//                     <span class="slider-check round"></span>
//                 </label>
//             </div>
//             <input class="form-control mt-2 w-100 cant-comida d-none" placeholder="Cantidad" type="number" max="100" min="0">

//         </div>
//         <div class="col-4">
//             <label>Alcohol/droga</label>
//             <div class="check">
//                 <label class="switch">
//                     <input type="checkbox" class="check-dispo alcohol">
//                     <span class="slider-check round"></span>
//                 </label>
//             </div>

//         </div>
//     </div>

// `,
// `<button class="btn-modal" onclick="itemsFunctions.saveItem()">Guardar cambios</button>`,
// "Cancelar", 55);

function loadAdminQuests() {
	TriggerCallback('origen_quests:server:GetQuests', {}).done((cb) => {
		if (cb) {
			if (cb.missions) {
				misiones = {};

				for (let i = 0; i < cb.missions.length; i++) {
					misiones[cb.missions[i].id] = cb.missions[i];
				}

				const misionesOrdenadas = Object.values(misiones).sort((a, b) => {
					return a.id - b.id;
				});

				$('.admin .lista-misiones').html('');

				if (misionesOrdenadas.length > 0) {
					misionesOrdenadas.map((mission, index) => {
						$('.admin .lista-misiones').append(`
						<li
							class="list-group-item">
							<div class="d-flex align-items-center justify-content-between flex-wrap">
								<h5>${mission.name}</h5>
								<div>
									<i
										class="lni lni-pencil-alt btn-list-action"
										onclick="npcFunctions.modalEditMission(${mission.id})"></i
									>
									<i 
										class="lni lni-trash-can btn-list-action"
										onclick="npcFunctions.confirmDeleteMission(${mission.id})"></i>
								</div>
							</div>
							<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1.2vh;">
								${mission.description}
							</div>
						</li>
						`);
					});
				} else {
					$('.admin .lista-misiones').html(`
						<li class="list-group-item">
							<i>No se han añadido misiones</i>
						</li>
					`);
				}
			}

			if (cb.locations) {
				locations = {};

				for (let i = 0; i < cb.locations.length; i++) {
					locations[cb.locations[i].id] = cb.locations[i];
				}

				const locationsOrdenadas = Object.values(locations).sort((a, b) => {
					return a.id - b.id;
				});

				$('.admin .lista-ubicaciones').html('');
				
				if (locationsOrdenadas.length > 0) {
					locationsOrdenadas.map((location, index) => {
						let htmlAssigned = '';

						if (location.missions.length > 0) {
							location.missions.map((mission) => {
								if (misiones[mission]) {
									htmlAssigned += `<li>${misiones[mission].name}</li>`;
								}
							});
						} else {
							htmlAssigned = `<li>No hay misiones asignadas</li>`;
						}

						location.coords = location.coords;

						$('.admin .lista-ubicaciones').append(`
							<li
								class="list-group-item d-flex align-items-center justify-content-between flex-wrap"
								location-id="${location.id}">
								<div><h5>${location.name}</h5></div>

								<div>
									<span class="location-status ${location.active == 1 ? "on" : "off"}" onclick="npcFunctions.toggleLocation(${location.id}, ${location.active == 1 ? 0 : 1})">${location.active == 1 ? "Activa" : "Inactiva"}</span>

									<i
										class="lni lni-pencil-alt btn-list-action"
										onclick="npcFunctions.modalEditLocation(${location.id})">
									</i>
									<i
										class="lni lni-map-marker btn-list-action"
										onclick="npcFunctions.markLocation(${location.coords.x + ", " + location.coords.y + ", " + location.coords.z})">
									</i>
									<i
										class="lni lni-trash-can btn-list-action"
										onclick="npcFunctions.confirmDeleteLocation(${location.id})">
									</i>
								</div>
								<div class="w-100 info-box mt-1">
									<div>Misiones asignadas</div>
									<ul>
										${htmlAssigned}
									</ul>
								</div>
							</li>
						`);
					});
				} else {
					$('.admin .lista-ubicaciones').html(`
						<li class="list-group-item">
							<i>No se han añadido ubicaciones</i>
						</li>
					`);
				}
			}

			if (cb.locationsTypes) {
				locationsTypes = cb.locationsTypes;
			}
		}
	});
}

function getAllGangs() {
	return TriggerCallback('origen_menu:server:GetGangsToAssing', {}).promise();
}

function getAllBusiness() {
	return TriggerCallback('origen_menu:server:GetBusinessesToAssing', {}).promise();
}

function loadTeleports() {
	TriggerCallback('origen_admin:server:GetTps', {}).done((cb) => {
		if (cb && cb.length > 0) {
			tpF.puntos = cb;
			if ($('.admin .tabla-teleports').hasClass('dataTable')) {
				$('.admin .tabla-teleports').DataTable().destroy();

				$('.admin .tabla-teleports tbody').html('');
			}
			cb.map((tp, index) => {
				$('.admin .tabla-teleports tbody').append(`
					<tr>
						<td>
							${tp.label}
						</td>
						<td class="d-flex">

							<div class="btn-action me-2" onClick="tpF.editTP(${index})">
								<i class="fas fa-edit" aria-hidden="true"></i>
							</div>
							<div class="btn-action" onClick="tpF.modalDeleteTP(${tp.id})">
								<i class="fas fa-trash" aria-hidden="true"></i>
							</div>

                   		</td>
					</tr>

				`);
			});
		}
		$('.admin .tabla-teleports').DataTable({
			language: dataTableLanguage,
			pageLength: 17,
			lengthChange: false
		});
	});
}

const tpF = {
	puntos: [],
	modalTeleport: () => {
		OpenModal(
			`Añadir Teleport`,
			`
            <h5>Introduce la información</h5>
            <div class="mt-2">
                <label>Nombre</label>
                <input class="form-control w-100 n-tp" placeholder="Nombre del teleport">
            </div>

            <h5 class="mt-4">Coordenadas</h5>
            <label class="mt-2">Punto de Entrada</label>
            <div class="row mb-4 entrada">
                <div class="col-2">

                    <input class="form-control w-100 input-cord-x h-100" type="number" placeholder="X">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-y h-100" type="number" placeholder="Y">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-z h-100" type="number" placeholder="Z">
                </div>
				<div class="col-2">

				<input class="form-control w-100 input-cord-w h-100" type="number" placeholder="W">
			</div>

                <div class="col-4">

                    <button class="btn-modal w-100 p-1 getcoords entrada">Copiar</button>
                </div>
				<div class="col-12">
					<input class="form-control w-100 n-entrada mt-4" placeholder="Nombre del punto de entrada">
				</div>
            </div>

            <label class="mt-2">Punto de Salida</label>
            <div class="row mb-4 salida">
                <div class="col-2">

                    <input class="form-control w-100 input-cord-x h-100" type="number" placeholder="X">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-y h-100" type="number" placeholder="Y">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-z h-100" type="number" placeholder="Z">
                </div>
				<div class="col-2">

					<input class="form-control w-100 input-cord-w h-100" type="number" placeholder="W">
				</div>

                <div class="col-4">

                    <button class="btn-modal w-100 p-1 getcoords salida">Copiar</button>
                </div>
				<div class="col-12">
					<input class="form-control w-100 n-salida mt-4" placeholder="Nombre del punto de salida">
				</div>
            </div>
			<label>Introduce la contraseña (Opcional)</label>
			<input class="form-control w-100 password" placeholder="Introduce la contraseña">
			<label  class="mt-4">Teleportar a otra dimensión</label>
			<div class="check">
				<label class="switch">
					<input type="checkbox" class="check-dispo dimensiones">
					<span class="slider-check round"></span>
				</label>
			</div>



        `,
			`<button class="btn-modal" onclick="tpF.crearPunto()">Crear punto</button>`,
			'Cancelar',
			55
		);
	},

	crearPunto: (id) => {
		const label = $('.c-modal .n-tp').val();
		const eX = parseFloat($('.c-modal .entrada .input-cord-x').val()).toFixed(2);
		const eY = parseFloat($('.c-modal .entrada .input-cord-y').val()).toFixed(2);
		const eZ = parseFloat($('.c-modal .entrada .input-cord-z').val()).toFixed(2);
		const eW = parseFloat($('.c-modal .entrada .input-cord-w').val()).toFixed(2);
		const labelE = $('.c-modal .n-entrada').val();

		const sX = parseFloat($('.c-modal .salida .input-cord-x').val()).toFixed(2);
		const sY = parseFloat($('.c-modal .salida .input-cord-y').val()).toFixed(2);
		const sZ = parseFloat($('.c-modal .salida .input-cord-z').val()).toFixed(2);
		const sW = parseFloat($('.c-modal .salida .input-cord-w').val()).toFixed(2);
		const labelS = $('.c-modal .n-salida').val();

		const dimension = $('.c-modal .check-dispo.dimensiones').is(':checked');

		const password = $('.c-modal .password').val();

		const alphanumericRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
		const coordinatesRegex = /^-?\d+(\.\d{1,2})?$/;
		let valido = true;
		if (
			!alphanumericRegex.test(label) ||
			!alphanumericRegex.test(labelE) ||
			!alphanumericRegex.test(labelS)
		) {
			sendNotification(
				'error',
				'Debes completar todos los campos',
				'Solo se admiten caracteres alfanuméricos'
			);
			valido = false;
		}

		if (
			!coordinatesRegex.test(eX) ||
			!coordinatesRegex.test(eY) ||
			!coordinatesRegex.test(eZ) ||
			!coordinatesRegex.test(eW) ||
			!coordinatesRegex.test(sX) ||
			!coordinatesRegex.test(sY) ||
			!coordinatesRegex.test(sZ) ||
			!coordinatesRegex.test(sW)
		) {
			sendNotification('error', 'Debes introducir unas coordenadas válidas');
			valido = false;
		}

		if (!valido) {
			return;
		}

		const data = {
			label,
			enter: {
				coords: {
					x: parseFloat(eX),
					y: parseFloat(eY),
					z: parseFloat(eZ),
					w: parseFloat(eW)
				},
				label: labelE
			},
			exit: {
				coords: {
					x: parseFloat(sX),
					y: parseFloat(sY),
					z: parseFloat(sZ),
					w: parseFloat(sW)
				},
				label: labelS
			},
			dimension,
			password
		};
		if (id) {
			data.id = parseInt(id);
			TriggerCallback('origen_admin:server:UpdateTp', data).done((cb) => {
				if (cb === true) {
					CloseModal();
					sendNotification('success', 'Punto actualizado correctamente');
					loadTeleports();
				} else {
					sendNotification('error', cb);
				}
			});
		} else {
			TriggerCallback('origen_admin:server:NewTp', data).done((cb) => {
				if (cb === true) {
					CloseModal();
					sendNotification('success', 'Punto creado correctamente');
					loadTeleports();
				} else {
					sendNotification('error', cb);
				}
			});
		}
	},

	editTP: (index) => {
		const tp = tpF.puntos[index];
		OpenModal(
			`Editar Teleport`,
			`
			<h5>Introduce la información</h5>
            <div class="mt-2">
                <label>Nombre</label>
                <input class="form-control w-100 n-tp" placeholder="Nombre del teleport" value="${
					tp.label
				}">
            </div>

            <h5 class="mt-4">Coordenadas</h5>
            <label class="mt-2">Punto de Entrada</label>
            <div class="row mb-4 entrada">
                <div class="col-2">

                    <input class="form-control w-100 input-cord-x h-100" type="number" placeholder="X" value="${
						tp.enter.coords.x
					}">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-y h-100" type="number" placeholder="Y" value="${
						tp.enter.coords.y
					}">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-z h-100" type="number" placeholder="Z" value="${
						tp.enter.coords.z
					}">
                </div>
				<div class="col-2">

				<input class="form-control w-100 input-cord-w h-100" type="number" placeholder="W"  value="${
					tp.enter.coords.w
				}">
			</div>

                <div class="col-4">

                    <button class="btn-modal w-100 p-1 getcoords entrada">Copiar</button>
                </div>
				<div class="col-12">
					<input class="form-control w-100 n-entrada mt-4" placeholder="Nombre del punto de entrada" value="${
						tp.enter.label
					}">
				</div>
            </div>

            <label class="mt-2">Punto de Salida</label>
            <div class="row mb-4 salida">
                <div class="col-2">

                    <input class="form-control w-100 input-cord-x h-100" type="number" placeholder="X" value="${
						tp.exit.coords.x
					}">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-y h-100" type="number" placeholder="Y" value="${
						tp.exit.coords.y
					}">
                </div>
                <div class="col-2">

                    <input class="form-control w-100 input-cord-z h-100" type="number" placeholder="Z" value="${
						tp.exit.coords.z
					}">
                </div>
				<div class="col-2">

					<input class="form-control w-100 input-cord-w h-100" type="number" placeholder="W" value="${
						tp.exit.coords.w
					}">
				</div>

                <div class="col-4">

                    <button class="btn-modal w-100 p-1 getcoords salida">Copiar</button>
                </div>
				<div class="col-12">
					<input class="form-control w-100 n-salida mt-4" placeholder="Nombre del punto de salida" value="${
						tp.exit.label
					}">
				</div>
            </div>
			<label>Introduce la contraseña (Opcional)</label>
			<input class="form-control w-100 password" placeholder="Introduce la contraseña" value="${
				tp.password
			}">
			<label  class="mt-4">Teleportar a otra dimensión</label>
			<div class="check">
				<label class="switch">
					<input type="checkbox" class="check-dispo dimensiones" ${tp.dimension ? `checked` : ``}>
					<span class="slider-check round"></span>
				</label>
			</div>

        `,
			`<button class="btn-modal" onclick="tpF.crearPunto('${tp.id}')">Guardar cambios</button>`,
			'Cancelar',
			55
		);
	},

	modalDeleteTP: (id) => {
		OpenModal(
			`Eliminar punto`,
			`
				¿Estás seguro de que deseas eliminar este punto de teleport? </br>Esta acción es irreversible.

		`,
			`<button class="btn-modal" onclick="tpF.deleteTP(${id})">Confirmar</button>`,
			'Cancelar',
			50
		);
	},
	deleteTP: (id) => {
		TriggerCallback('origen_admin:server:DeleteTp', { id }).done((cb) => {
			if (cb === true) {
				CloseModal();
				sendNotification('success', 'Punto eliminado correctamente');
				loadTeleports();
			} else {
				sendNotification('error', cb);
			}
		});
	}
};

$(document).on('click', '.c-modal .getcoords', function () {
	fetch('GetCoords', {}).done((cb) => {
		if (cb) {
			if ($(this).hasClass('entrada')) {
				$('.c-modal .entrada .input-cord-x').val(cb.x);
				$('.c-modal .entrada .input-cord-y').val(cb.y);
				$('.c-modal .entrada .input-cord-z').val(cb.z);
				$('.c-modal .entrada .input-cord-w').val(cb.w);
			} else {
				$('.c-modal .salida .input-cord-x').val(cb.x);
				$('.c-modal .salida .input-cord-y').val(cb.y);
				$('.c-modal .salida .input-cord-z').val(cb.z);
				$('.c-modal .salida .input-cord-w').val(cb.w);
			}
		}
	});
});

$(document).on('change', '.admin .check-config', function () {
	const status = $(this).is(':checked');
	const attr = $(this).attr('action');
	TriggerCallback('SetServerConfig', { param: attr, value: status }).done((cb) => {
		if (cb === true) {
			sendNotification('success', 'Configuración guardada correctamente');
		} else {
			sendNotification('error', cb);
		}
	});
});

$(document).on('click', '.admin .guardar-config', function () {
    const container = $(this).closest('.config-group');

    const status = container.find('.value-config').val();
    const attr = container.find('.value-config').attr('action');

    if (isNaN(status)) {
        sendNotification('error', 'El valor debe ser un número');
    } else {
        TriggerCallback('SetServerConfig', { param: attr, value: status }).done((cb) => {
            if (cb === true) {
                sendNotification('success', 'Configuración guardada correctamente');
            } else {
                sendNotification('error', cb);
            }
        });
    }
});


$(document).on('click', '.admin .save-config', function () {
	const status = $(this).parent().parent().parent().find('.input-config').val();
	const attr = $(this).parent().parent().parent().find('.input-config').attr('action');
	// Validating the status as a URL of an image that accepts JPG, PNG, webp, and webm
	const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|webp|webm)/;
	if (urlRegex.test(status)) {
		TriggerCallback('SetServerConfig', { param: attr, value: status }).done((cb) => {
			if (cb === true) {
				sendNotification('success', 'Configuración guardada correctamente');
			} else {
				sendNotification('error', cb);
			}
		});
	} else {
		sendNotification('error', 'La URL de la imagen no es válida');
	}
});

function loadConfigAdmin() {
	TriggerCallback('GetAllServerConfig', {}).done((cb) => {
		if (cb) {
			Object.entries(cb).map(([index, config]) => {
				if (typeof config === 'boolean') {
					$('.check-config[action="' + index + '"]').prop('checked', config);
				} else {
					$('.input-config[action="' + index + '"]').val(config);
				}
			});
		}
	});
}
