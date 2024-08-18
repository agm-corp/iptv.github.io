let swipercrews;
let firstAccess = true;

const crewsF = {
    idCrew: null,
    isAdmin: false,
    config: null,
    numMembers: 0,
    navigate: function (app) {
        if ($(".app-container.activa").length > 0) {
            $(".app-container.activa").fadeOut(150, function () {
                $(this).removeClass("activa");
                $(".app-container." + app)
                    .fadeIn(300)
                    .addClass("activa");
            });
        } else {
            $(".app-container." + app)
                .fadeIn(300)
                .addClass("activa");
        }

        if (app != "tu-crew") {
            $(".crews .back-section")
                .removeClass("animate__fadeOutUp")
                .addClass("animate__fadeInDown")
                .fadeIn(300);
        } else {
            $(".crews .back-section")
                .fadeOut(300)
                .removeClass("animate__fadeInDown")
                .addClass("animate__fadeOutUp");
            // $(".app-container.activa").hide();
            // $(".app-container.gang-home").fadeIn(300).addClass("activa");
        }

        if (app == "crews-vehicles") {
            loadVehiclesApp();
        }
    },
    checkFirstTime: () => {
        if ($(".app-button[app='crews']").attr("access") == "creator") {
            $(".tu-crew").hide(0);
            $(".app-container.crear-crew").show(0);
            $(".creacion-container")
                .removeClass("animate__fadeOutDown")
                .addClass("animate__fadeInUp");
            $(".creacion-container .crear-crew").prop("disabled", false);
        } else if ($(".app-button[app='crews']").attr("access") == "mycrew") {
            $(".app-container.crear-crew").hide();
            loadCrew().then(() => {
                $(".tu-crew").fadeIn(300, function () {
                    $(this).addClass("activa");
                });
            });
        }
    },
    modalConfirmarGaraje: (size, price, label) => {
        OpenModal(
            "Confirma tu compra",
            `   <div class="text-center">
                    <h3 class="bankgothic">¿Estás seguro de que quieres adquirir el ${label} por <i class="fa-brands fa-connectdevelop"></i>${price}?</h3>
                </div>
            `,
            `<button class="btn btn-modal" onclick="crewsF.adquirirGaraje('${size}')">Adquirir</button>`,
            "Cancelar",
            50
        );
    },

    adquirirGaraje: (size) => {
        TriggerCallback("origen_ilegal:server:BuyCrewGarage", { size }).done(
            (cb) => {
                if (cb === true) {
                    CloseModal();
                    sendNotification(
                        "success",
                        "¡Tu crew ahora dispone de un nuevo garaje!",
                        "Tu nuevo garaje se ha posicionado donde se encontraba el anterior"
                    );
                } else {
                    sendNotification("error", cb);
                }
            }
        );
    },

    modalNewMember: () => {
        if (crewsF.isAdmin) {
            fetch("GetClosestPlayers", { crew: crewsF.idCrew }).done((cb) => {
                let html =
                    "<small class='text-center text-uppercase text-muted d-block'>No hay nadie cerca</small>";

                if (cb.length != 0) {
                    html = "";
                    cb.map((player) => {
                        html += `
                            <div class="member" onclick="crewsF.addMember('${player.citizenid}')">
                                <i class="fas fa-user"></i> ${player.firstname} ${player.lastname}
                            </div>
                        `;
                    });
                }

                OpenModal(
                    "Añadir Miembro",
                    `
                    <h4 class="w-100 text-center">Personas cercanas</h4>
                   <div class="add-member-list">
                        ${html}
                   </div>
                `,
                    `<button class="btn btn-modal">Actualizar</button>`,
                    "Cerrar",
                    35
                );
            });
        } else {
            sendNotification(
                "error",
                "No tienes permisos para reclutar miembros"
            );
        }
    },
    addMember: (citizenid) => {
        TriggerCallback("origen_ilegal:server:SendInviteCrew", {
            citizenid,
        }).done((cb) => {
            if (cb) {
                sendNotification(
                    "success",
                    "Invitación enviada",
                    "El jugador recibirá una notificación en su menú principal."
                );
                s_success.play();
                CloseModal();
            }
        });
    },
    sendCrewInvitation: (id, label) => {
        CloseModal();
        OpenModal(
            "Has recibido una invitación",
            `   <div class="text-center">
                    <h3>Has recibido una invitación para unirte a la crew</br>${label}</h3>

                    <div class="text-uppercase">¿Quieres aceptar la invitación?</div>
                </div>
            `,
            `<button class="btn btn-modal" onclick="crewsF.acceptInvitation('${id}')">Aceptar invitación</button>`,
            "Denegar invitación",
            80
        );
    },
    acceptInvitation: (id) => {
        TriggerCallback("origen_ilegal:server:AcceptInviteCrew", { id }).done(
            (cb) => {
                if (cb) {
                    CloseModal();
                    sendNotification(
                        "success",
                        "Invitación aceptada",
                        "Has aceptado la invitación correctamente. Ahora formas parte de la crew."
                    );
                    s_success.play();

                    $(".app-button[app='crews']").attr("access", "mycrew");
                }
            }
        );
    },
    modalSettingMember: (citizenid, name) => {
        if (crewsF.isAdmin) {
            OpenModal(
                "Gestión de miembro",
                `
           <div class="text-center">
            <h1>${name}</h1>

            <label class="mt-3 w-100">Acciones</label>
            <button class="btn btn-danger fw-bold w-100 mt-1" onclick="crewsF.removeCrew('${citizenid}')">Expulsar</button>
           </div>
        `,
                `<div></div>`,
                "Cerrar",
                35
            );
        }
    },
    removeCrew: (citizenid) => {
        CloseModal();
        OpenModal(
            "Expulsar miembro",
            `   <div class="text-center">
                    <h3 class="text-danger">¿Estás seguro de que quieres expulsar a este miembro?</h3>
                </div>
            `,
            `<button class="btn btn-modal" onclick="crewsF.removeCrewConfirm('${citizenid}')">Expulsar</button>`,
            "Cancelar",
            80
        );
    },

    removeCrewConfirm: (citizenid) => {
        TriggerCallback("origen_ilegal:server:KickPlayerCrew", {
            citizenid,
        }).done((cb) => {
            if (cb == true) {
                sendNotification(
                    "success",
                    "Miembro expulsado",
                    "Has expulsado al miembro correctamente."
                );
                CloseModal();
            } else {
                sendNotification("error", cb);
                CloseModal();
            }
        });
    },
    modalPuntosGarajes: (citizenid, name) => {
        if (crewsF.isAdmin) {
            let html = "";
            Object.entries(crewsF.config.Markers).map(([index, marker]) => {
                html += `
			<div class="item-flex-box" onclick="crewsF.addPoint('${index}')">
				<img src="https://origennetwork.com/images/Servidores/Ubicacion.png" class="icon">
				<div class="item-flex-box-data">
					<div class="title-item">
						${marker.label}
					</div>
				</div>
			</div>
			`;
            });

            OpenModal(
                `Gestión de Puntos`,
                `<h3 class="text-center">Selecciona el punto que quieres resituar</h3>
				<div class="puntos-list-crew mt-3">
					${html}
				</div>

            `,
                `<div></div>`,
                `Cancelar`,
                50
            );
        }
    },
    addPoint: (type) => {
        exportEvent("origen_ilegal", "BuildCrewMarker", { type });
        closeMenu();
        setTimeout(() => {
            CloseModal();
        }, 500);
    },
    modalConfirmarVehiculo: (id, price, crypto, label, img) => {
        OpenModal(
            "Confirma tu compra",
            `   <div class="text-center">
                    <h3 class="bankgothic">¿Estás seguro de que quieres adquirir el vehículo ${label} por <i class="fa-brands fa-connectdevelop"></i> ${crypto} y ${price}$?</h3>
                </div>
            `,
            `<button class="btn btn-modal" onclick="crewsF.adquirirVehiculo('${id}', '${label}', '${img}')">Adquirir</button>`,
            "Cancelar",
            50
        );
    },

    adquirirVehiculo: (id, label, img) => {
        CloseModal();
        TriggerCallback("origen_ilegal:server:BuyCrewVehicle", {
            vehicle: id,
        }).done((cb) => {
            if (cb === true) {
                unlockItem(label, img);
                // sendNotification(
                // 	'success',
                // 	'¡Tu crew ahora dispone de un nuevo garaje!',
                // 	'Tu nuevo garaje se ha posicionado donde se encontraba el anterior'
                // );
            } else {
                sendNotification("error", cb);
            }
        });
    },
};

$(document).on("click", ".creacion-container .crear-crew", function () {
    const name = $(".nombre-crew-creador").val();

    if (/^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]{3,15}$/.test(name)) {
        // const id = name.toLowerCase().replace(/[^a-z0-9áéíóú]+/g, '-');

        TriggerCallback("origen_ilegal:server:CreateCrew", {
            label: name,
        }).done((cb) => {
            if (cb === true) {
                sendNotification(
                    "success",
                    "Tu crew ha sido creada correctamente"
                );
                s_success.play();
                $(".creacion-container .crear-crew").prop("disabled", true);
                $(".app-button[app='crews']").attr("access", "mycrew");

                $(".creacion-container")
                    .removeClass("animate__fadeInUp")
                    .addClass("animate__fadeOutDown");
                setTimeout(() => {
                    $(".app-container.crear-crew").fadeOut(300, function () {
                        $(".tu-crew")
                            .addClass("scale-in")
                            .fadeIn(500, function () {
                                $(this).removeClass("scale-in");
                            });
                    });
                }, 500);
                crewsF.isAdmin = true;

                // crewsF.idCrew = cb.crew.id;
                // loadCrew().then(() => {

                // });
            } else {
                sendNotification("error", cb);
            }
        });
    } else {
        sendNotification(
            "error",
            "Introduce un nombre válido",
            "Debe tener entre 3 y 15 caracteres y no tener caracteres especiales."
        );
    }
});

$(document).on("input", ".nombre-crew-creador", function () {
    if ($(this).val().length > 15) {
        $(this).val($(this).val().substring(0, 15));
        $(this).addClass("animate__animated animate__headShake text-danger");
        setTimeout(function () {
            $(".nombre-crew-creador").removeClass(
                "animate__animated animate__headShake text-danger"
            );
        }, 500);
    }
});

$(document).on("click", ".app-button[app='crews']", function () {
    $(".app-container").hide();
    setTimeout(() => {
        crewsF.checkFirstTime();
    }, 600);
});

function loadCrew() {
    return new Promise(function (resolve, reject) {
        TriggerCallback("origen_ilegal:server:GetCrew", {}).done((cb) => {
            if (cb) {
                firstAccess = false;
                crewsF.isAdmin = cb.admin;

                crewsF.idCrew = cb.crew.id;

                UpdateMyCrew(cb.crew).then(() => {
                    $(".container-tabla").css("opacity", 0);
                    resolve();
                });
            }
        });
    });
}

function UpdateMyCrew(cb) {
    return new Promise(function (resolve, reject) {
        if ($.fn.DataTable.isDataTable(".tabla-crews")) {
            $(".tabla-crews").DataTable().destroy();
            $(".tabla-crews tbody").html("");
        }
        exportEvent("origen_ilegal", "Get_Config.Crews", {}).done((cb2) => {
            crewsF.config = JSON.parse(cb2);
            $(".crews .crew-title").text(cb.label);
            $(".crews .crew-level").text("Nivel " + cb.level);
            $(".crews .crew-experience-bar ").animate(
                {
                    width:
                        (cb.experience * 100) /
                            ((cb.level + 1) * crewsF.config.LevelFactor) +
                        "%",
                },
                1000
            );
            $(".crews .members-list").html("");
            $(".crews .total-members").text(
                "MIEMBROS TOTALES: " + cb.players.length
            );
            crewsF.numMembers = cb.players.length;

            let maxMembers = 10;

            if (cb.level >= 10) {
                maxMembers = 15;
            }

            if (crewsF.numMembers >= maxMembers) {
                $(".crews .add-member").prop("disabled", true);
            }

            if (crewsF.isAdmin) {
                $(".crews .add-member").removeClass("d-none");
                $(".crews .add-puntos").removeClass("d-none");
            } else {
                $(".crews .add-member").addClass("d-none");
                $(".crews .add-puntos").addClass("d-none");
            }
            cb.players.map((player) => {
                if (player.admin) {
                    $(".crews .crew-creator .creador").text(player.name);
                    $(".crews .members-list").prepend(`
						<div
						class="item-flex-box justify-content-between "
						>
							<img src="https://origennetwork.com/images/Servidores/ListaMiembrosBanda.png" class="car-icon" />
							<div class="item-flex-box-data w-100">
								<div class="title">${player.name}</div>

								<div class="description badge bg-dark pt-0 pb-0 p-1 text-uppercase">Administrador</div>


							</div>
							<i class="fas fa-cog" aria-hidden="true"></i>
						</div>
						`);
                } else {
                    $(".crews .members-list").append(`
						<div
						style="${crewsF.isAdmin ? "" : "pointer-events:none"}"
						class="item-flex-box justify-content-between"
						onclick="crewsF.modalSettingMember('${player.citizenid}', '${player.name}')">
							<img src="https://origennetwork.com/images/Servidores/ListaMiembrosBanda.png" class="car-icon" />
							<div class="item-flex-box-data w-100">
								<div class="title">${player.name}</div>

								<div class="description badge badge-acent pt-0 pb-0 p-1 text-uppercase">Miembro</div>


							</div>
							<i class="fas fa-cog" aria-hidden="true"></i>
						</div>
						`);
                }
            });

            // $(".slider-crews .swiper-wrapper").html("");
            // // Obtener el contenedor de las diapositivas
            // const sliderWrapper = $(".slider-crews .swiper-wrapper");

            // // Iterar sobre la lista de vehículos y agregar cada uno al contenedor
            // crewsF.config.Vehicles.map((car) => {
            //     const isBloqueada = cb.level <= car.minlevel;
            //     const preciosClass = isBloqueada ? "d-none" : "";
                
            //     // Crear el elemento de diapositiva y agregarlo al contenedor
            //     const slideHtml = `
            //         <div class="swiper-slide">
            //             <div class="slider-mission ${isBloqueada ? "bloqueada" : ""}" style="background: url(${car.image});">
            //                 <div class="mission-level-to">
            //                     NIVEL
            //                     <span class="mission-level-number">${car.minlevel}</span>
            //                 </div>
            //                 <div class="precios d-flex justify-content-between align-items-center ${preciosClass}" style="gap:1vh; position:absolute; top: 2vh; right:2vh;">
            //                     <div class="label-precio mb-0 cash">${car.price}$</div>
            //                     <div class="label-precio mb-0 cr"><i class="fa-brands fa-connectdevelop"></i> ${car.cryptoprice}</div>
            //                 </div>
            //                 <div class="slider-info">
            //                     <div class="mission-data">
            //                         <div class="slider-title">${car.label}</div>
            //                     </div>
            //                     <div class="mission-action d-flex">
            //                         ${cb.level >= car.minlevel
            //                             ? `<button class="btn btn-success" onClick="crewsF.modalConfirmarVehiculo('${car.id}', '${car.price}', '${car.cryptoprice}', '${car.label}', '${car.image}')">ADQUIRIR</button>`
            //                             : ""
            //                         }
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     `;
                
            //     sliderWrapper.append(slideHtml);
            // });


            $(".mercado-item").addClass("bloqueado");
            $(".mercado-item .mercado-price").hide();

            if (cb.level >= 5) {
                $(".mercado-item[size='medium']").removeClass("bloqueado");

                $(".mercado-item[size='medium']").addClass("adquirir");
                $(".mercado-item[size='medium']").find(".mercado-price").show();
                $(".mercado-item[size='big']").find(".mercado-price").show();
            }
            if (cb.level >= 10) {
                $(".mercado-item[size='big']").removeClass("bloqueado");
                $(".mercado-item[size='big']").addClass("adquirir");
            }

            if (cb.garage.size == "small") {
                $(".mercado-item[size='small']").removeClass("bloqueado");
                $(".mercado-item[size='small']")
                    .find(".mercado-level")
                    .addClass("text-success");
                $(".mercado-item[size='medium']").find(".mercado-price").show();
                $(".mercado-item[size='big']").find(".mercado-price").show();
            }

            if (cb.garage.size == "medium") {
                $(".mercado-item[size='medium']").removeClass("adquirir");
                $(".mercado-item[size='medium']")
                    .find(".mercado-level")
                    .text("ADQUIRIDO")
                    .addClass("text-success");
                $(".mercado-item[size='small']").find(".mercado-level").hide();
                $(".mercado-item[size='medium']").find(".mercado-price").hide();
            }

            if (cb.garage.size == "big") {
                $(".mercado-item[size='medium']").addClass("bloqueado");
                $(".mercado-item[size='big']").removeClass("adquirir");
                $(".mercado-item[size='big']")
                    .find(".mercado-level")
                    .text("ADQUIRIDO")
                    .addClass("text-success");
                $(".mercado-item[size='small']").find(".mercado-level").hide();
                $(".mercado-item[size='medium']").find(".mercado-level").hide();
                $(".mercado-item[size='medium']").find(".mercado-price").hide();
                $(".mercado-item[size='big']").find(".mercado-price").hide();
            }

            TriggerCallback("origen_ilegal:server:GetRanking", {}).done(
                (cb) => {
                    if (cb && cb.length > 0) {
                        cb.sort((a, b) => b.wins - a.wins);

                        cb.map((rank, index) => {
                            $(".tabla-crews tbody").append(`
						<tr>
							<td class="tr-position"><span class="badge badge-acent rounded-circle">${
                                index + 1
                            }</span></td>
							<td class="bankgothic">${rank.label}</td>
							<td class="tr-level">${rank.level}</td>
							<td class="tr-members">${rank.members}</td>
							<td class="tr-victorias text-success"><i class="fa-solid fa-trophy"></i> ${
                                rank.wins
                            }</td>
						</tr>
					`);
                        });
                    }

                    $(".tabla-crews").DataTable({
                        language: dataTableLanguage,
                        pageLength: 8,
                        lengthChange: false,
                        pagingType: "simple",
                        info: false,
                        searching: false,
                        order: [[4, "desc"]],
                        autoWidth: false,
                    });

                    setTimeout(() => {
                        $(".container-tabla").css("opacity", 1);

                        if (!firstAccess) {
                            if (typeof swipercrews !== "undefined") {
                                swipercrews.destroy();
                            }

                            swipercrews = new Swiper(".slider-crews", {
                                autoplay: {
                                    delay: 5000,
                                    disableOnInteraction: false,
                                },
                                navigation: {
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                },
                                effect: "coverflow",
                                coverflowEffect: {
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1,
                                    slideShadows: true,
                                },
                            });
                        }
                    }, 250);
                }
            );
            resolve();
        });
    });
}

function getNiveles(xp, tablaNiveles) {
    let nivelActual = null;
    let nivelSiguiente = null;
    let progreso = 0;

    for (let i = 0; i < tablaNiveles.length; i++) {
        const nivel = tablaNiveles[i];
        if (xp >= nivel.Min && xp <= nivel.Max) {
            nivelActual = nivel;
            if (i < tablaNiveles.length - 1) {
                nivelSiguiente = tablaNiveles[i + 1];
            }
            break;
        }
    }

    if (nivelActual) {
        const nivelActualLabel = nivelActual.Label;
        const nivelActualMin = nivelActual.Min;
        const nivelActualMax = nivelActual.Max;

        if (nivelSiguiente) {
            const nivelSiguienteLabel = nivelSiguiente.Label;

            progreso = ((xp - nivelActualMin) / (nivelActualMax - nivelActualMin)) * 100;

            return {
                nivelActual: nivelActualLabel,
                nivelSiguiente: nivelSiguienteLabel,
                progreso: progreso,
            };
        } else {
            return {
                nivelActual: nivelActualLabel,
                nivelSiguiente: null,
                progreso: 100,
            };
        }
    }

    return {
        nivelActual: null,
        nivelSiguiente: null,
        progreso: 0,
    };
}

function iniciarMisionVehiculo(vehicleModel, moneda, price, trackID) {
  CloseModal();
  TriggerCallback("origen_ilegal:iniciarMision", {vehicleModel, moneda, price, trackID}).done((cb) => {
    if (cb === true) {
        sendNotification("success", "Misión iniciada correctamente, se ha marcado el vehículo en el mapa.");
    } else {
        sendNotification("error", cb);
    }
  });
}

function modalSeleccionMoneda(crypto, money, vehicleModel, trackID) {
    OpenModal(
        "Solicitar Mission",
        `   <div class="text-center">
                <h3 class="bankgothic">¿Con qué moneda quieres solicitar la misión?</h3>
            </div>
        `,
        `<button class="btn btn-modal" onclick="iniciarMisionVehiculo('${vehicleModel}', 'crypto', '${crypto}', '${trackID}')"><i class="fa-brands fa-connectdevelop"></i> ${crypto}</button><button class="btn btn-modal" onclick="iniciarMisionVehiculo('${vehicleModel}', 'money', '${crypto}', '${trackID}')">$ ${money}</button>`,
        "Cancelar",
    );
}


function loadVehiclesApp() {
    var lastCircuit = false;
    TriggerCallback("av_racing:getCarreras", {}).done((cb) => {
        const $estadisticasList = $('.estadisticas-list');
        const $atracosList = $('.atracos-list');
        const $sliderWrapper = $(".slider-crews .swiper-wrapper");
        const racesList = cb.circuitos;
        const tableStats = cb.stats;
        const niveles = cb.niveles;

        $estadisticasList.html('');
        $atracosList.html('');
        $sliderWrapper.html('');

        let numeroCircuito = 0;

        racesList.forEach((race) => {
            const { id, name, vehicle } = race;
            var vehicleTable = JSON.parse(vehicle);
            const id_carrera = id.toString();
            const stats = tableStats[id_carrera] || { win: 0, lose: 0, xp: 0 };
            const { win, lose, xp } = stats;
            const xpLabel = niveles[vehicleTable.level-1] && niveles[vehicleTable.level-1].Label ? niveles[vehicleTable.level-1].Label : 'Dios Supremo';
            const xpVehiculo = niveles[vehicleTable.level-1] && niveles[vehicleTable.level-1].Min ? niveles[vehicleTable.level-1].Min : 0;
            const Stats = getNiveles(xp, niveles);
            // const classCircuito = 'active'
            const classCircuito = numeroCircuito === 0 || lastCircuit ? 'active' : 'disabled';
            if (xp >= 1401){
                lastCircuit = true;
            } else {
                lastCircuit = false;
            }
            const isAvailable = xp >= xpVehiculo;

            const slideHtml = `
                <div class="swiper-slide">
                    <div class="slider-mission ${isAvailable ? '' : 'bloqueada'}" style="background: url(${vehicleTable.img});">
                        <div class="mission-level-to">
                            <span class="mission-level-number">${name}</span>
                            <h2 class="mission-level-auxiliar">${xpLabel}</h2>
                        </div>
                        ${isAvailable ? `
                            <div class="precios d-flex justify-content-between align-items-center" style="gap:1vh; position:absolute; top: 2vh; right:2vh;">
                                <div class="label-precio mb-0 cash">${vehicleTable.price.crypto}$</div>
                                <div class="label-precio mb-0 cr"><i class="fa-brands fa-connectdevelop"></i> ${vehicleTable.price.money}</div>
                            </div>
                            <div class="slider-info">
                                <div class="mission-data">
                                    <div class="slider-title">${vehicleTable.model}</div>
                                </div>
                                <div class="mission-action d-flex">
                                    <button class="btn btn-success" onClick="modalSeleccionMoneda('${vehicleTable.price.crypto}', '${vehicleTable.price.money}', '${vehicleTable.model}', '${id}')">ADQUIRIR</button>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;

            $sliderWrapper.append(slideHtml);

            const atracosListHtml = `
                <div class="item-flex-box justify-content-between">
                    <img src="https://origennetwork.com/images/Servidores/BanderaCuadros.png" class="car-icon">
                    <div class="item-flex-box-data d-flex justify-content-between w-100">
                        <div class="title">${name}</div>
                        <div class="mission-level ${classCircuito === 'active' ? 'text-success' : 'text-danger'}">${classCircuito === 'active' ? 'DISPONIBLE' : 'BLOQUEADO'}</div>
                    </div>
                </div>
            `;

            $atracosList.append(atracosListHtml);

            const estadisticasListHtml = `
                <div class="carreras-box ${classCircuito}" id="carrera_${id_carrera}">
                    <div class="item-flex-box flex-row text-center justify-content-between me-0 position-relative">
                        <div class="intentos">
                            <div class="erroneos">
                                <i class="fa-solid fa-xmark"></i> ${lose}
                            </div>
                            <div class="correctos">
                                <i class="fa-solid fa-ranking-star"></i> ${win}
                            </div>
                        </div>
                        <div class="item-flex-box-data justify-content-between w-100">
                            <div class="title mt-2 mb-1">${name}</div>
                            <div class="mb-3">
                                <span class="badge badge-acent-cews">${Stats.nivelActual}</span>
                            </div>
                            <div class="container-estadistica">
                                <div class="e-dato">ACTUAL</div>
                                <div class="e-dato w-100">PROGRESO</div>
                                <div class="e-dato">SIGUIENTE</div>
                            </div>
                            <div class="container-progreso w-100">
                                <div class="bar-progreso" style="width: ${Stats.progreso}%"></div>
                            </div>
                            <div class="container-estadistica mt-2">
                                <div class="e-dato">
                                    <div class="n-estadistica text-start">${Stats.nivelActual}</div>
                                </div>
                                <div class="e-dato">
                                    <div class="n-estadistica text-end">${Stats.nivelSiguiente || 'Dios Supremo'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $estadisticasList.append(estadisticasListHtml);
            numeroCircuito++;
        });
    });
}

$(document).on("click", ".mercado-item.adquirir", function () {
    const label = $(this).find(".n-garaje").text();
    const size = $(this).attr("size");
    const price = parseInt($(this).find(".mercado-price").text());
    crewsF.modalConfirmarGaraje(size, price, label);
});

$(document).on("click", ".vehicles-app", function () {
    crewsF.navigate("crews-vehicles");
});

$(document).on("click", ".crews .back-section", function () {
    crewsF.navigate("tu-crew");
});
