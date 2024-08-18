const tags = [
	'Altercado',
	'Armas de fuego',
	'Caso Abierto',
	'Caso Cerrado',
	'Caso Nulo',
	'Delitos contra animales',
	'Delitos contra la seguridad vial',
	'Delitos contra recursos naturales',
	'Delitos en documentos, identificaciones o licencias',
	'Drogas',
	'FIB',
	'Informe de calidad',
	'Intento de homicidio',
	'Intento de homicidio (Policía)',
	'Operativo policial',
	'Robo de importación',
	'Robo de vehículo',
	'Robo mayor',
	'Robo menor',
	'Secuestro',
	'Secuestro (Policía)'
];

const teclas = {
	/* NUMPAD */
	96: 'NUMPAD0',
	97: 'NUMPAD1',
	98: 'NUMPAD2',
	99: 'NUMPAD3',
	100: 'NUMPAD4',
	101: 'NUMPAD5',
	102: 'NUMPAD6',
	103: 'NUMPAD7',
	104: 'NUMPAD8',
	105: 'NUMPAD9',

	45: 'NUMPAD0',
	35: 'NUMPAD1',
	40: 'NUMPAD2',
	34: 'NUMPAD3',
	37: 'NUMPAD4',
	12: 'NUMPAD5',
	39: 'NUMPAD6',
	36: 'NUMPAD7',
	38: 'NUMPAD8',
	33: 'NUMPAD9',
	144: 'NUMLOCK',
	111: 'DIVIDE',
	106: 'MULTIPLY',
	109: 'SUBTRACT',
	107: 'ADD',
	13: 'NUMPADENTER',
	/* Fs */
	112: 'F1',
	113: 'F2',
	114: 'F3',
	115: 'F4',
	116: 'F5',
	117: 'F6',
	118: 'F7',
	119: 'F8',
	120: 'F9',
	121: 'F10',
	122: 'F11',
	123: 'F12',
	/* Especiales */
	8: 'BACK',
	9: 'TAB',
	19: 'PAUSE',
	20: 'CAPITAL',
	27: 'ESCAPE',
	32: 'SPACE',
	17: 'RMENU',
	187: 'PLUS',
	188: 'COMMA',
	189: 'MINUS',
	190: 'PERIOD',
	186: 'GRAVE',
	219: 'APOSTROPHE'
};

const condecorates = {
	Valor: {
		id: 'Valor',
		name: 'Medalla al valor',
		description:
			'La Medalla al Valor es la medalla más alta de aplicación de la ley otorgada a los oficiales y se otorga por actos individuales de extraordinaria valentía o heroísmo realizados en el cumplimiento del deber con un riesgo personal extremo y potencialmente mortal',
		url: 'https://origennetwork.com/images/Servidores/Conde1.png'
	},
	Preservacion: {
		id: 'Preservacion',
		name: 'Medalla de Preservación de la Vida',
		description:
			'La Medalla de Preservación de la Vida se puede otorgar a un oficial que se haya distinguido por emplear tácticas excepcionales y ejercer un buen juicio, más allá de las exigencias normales del deber, para preservar la vida de otro durante un encuentro volátil o peligroso mientras protege la seguridad y seguridad del público y sus compañeros oficiales',
		url: 'https://origennetwork.com/images/Servidores/Conde2.png'
	},
	Policia: {
		id: 'Policia',
		name: 'Medalla de policía',
		description:
			'La Medalla de la Policía es un premio a la valentía, generalmente otorgado a los oficiales por actos individuales de heroísmo en el cumplimiento del deber, aunque no más allá del llamado del deber, como se requiere para la Medalla al Valor',
		url: 'https://origennetwork.com/images/Servidores/Conde3.png'
	},
	Estrella: {
		id: 'Estrella',
		name: 'Estrella de la policía',
		description:
			'La Estrella de la Policía es un premio a la valentía, generalmente otorgado a los oficiales por desempeñarse con un juicio excepcional y/o utilizar tácticas hábiles para desactivar situaciones peligrosas y estresantes',
		url: 'https://origennetwork.com/images/Servidores/Conde4.png'
	},
	Salvavidas: {
		id: 'Salvavidas',
		name: 'Medalla salvavidas de la policía',
		description:
			'La Medalla de Salvamento de la Policía es un premio a la valentía, generalmente otorgado a los oficiales por tomar medidas para rescatar o intentar rescatar a un compañero oficial o cualquier persona de un peligro inminente',
		url: 'https://origennetwork.com/images/Servidores/Conde5.png'
	},
	Distinguido: {
		id: 'Distinguido',
		name: 'Medalla de Servicio Distinguido de la Policía',
		description:
			'La Medalla de Servicio Distinguido de la Policía es el premio por servicio más alto del departamento y se puede otorgar a los empleados que se distinguen por realizar un servicio excepcional en un deber de gran responsabilidad o de importancia crítica para la aplicación de la ley',
		url: 'https://origennetwork.com/images/Servidores/Conde6.png'
	},
	Meritorio: {
		id: 'Meritorio',
		name: 'Medalla al Servicio Meritorio de la Policía',
		description:
			'La Medalla por Servicio Meritorio de la Policía se otorga a los empleados que se distinguen por realizar un servicio excepcional en un deber de gran responsabilidad o de importancia crítica para el cumplimiento de la ley, pero en menor grado que el requerido para la Medalla por Servicio Distinguido de la Policía',
		url: 'https://origennetwork.com/images/Servidores/Conde7.png'
	},
	LogroMeritorio: {
		id: 'LogroMeritorio',
		name: 'Medalla al Logro Meritorio de la Policía',
		description:
			'La Medalla al Logro Meritorio de la Policía está diseñada principalmente para reconocer a los empleados civiles. La medalla se otorga por logros sostenidos, a largo plazo y notables o por un solo logro significativo y notable en la ejecución de tareas administrativas, de oficina o de tipo artesanal',
		url: 'https://origennetwork.com/images/Servidores/Conde8.png'
	},
	DistinguidoComision: {
		id: 'DistinguidoComision',
		name: 'Medalla de Servicio Distinguido de la Comisión de Policía',
		description:
			'La Medalla de Servicio Distinguido de la Comisión de Policía se otorga a los oficiales que se distinguen por realizar un servicio excepcional al SAPD o por desempeñarse en una situación de emergencia estresante con buen juicio y valentía',
		url: 'https://origennetwork.com/images/Servidores/Conde9.png'
	},
	IntegridadComision: {
		id: 'IntegridadComision',
		name: 'Medalla de Integridad de la Comisión de Policía',
		description:
			'La Medalla de Integridad de la Comisión de Policía se otorga a los empleados que muestran un acto de integridad ejemplar, especialmente cuando ese acto requiere carácter excepcional, fortaleza y coraje moral frente a obstáculos sustanciales',
		url: 'https://origennetwork.com/images/Servidores/Conde10.png'
	},
	Comunitaria: {
		id: 'Comunitaria',
		name: 'Medalla de policía comunitaria',
		description:
			'La Medalla de Policía Comunitaria se otorga al personal que ha resuelto un problema comunitario importante, incluido a la comunidad en el proceso de resolución de problemas y/o mostrado un compromiso con la filosofía de Policía Comunitaria de SAPD',
		url: 'https://origennetwork.com/images/Servidores/Conde11.png'
	},
	RelacionesHumanas: {
		id: 'RelacionesHumanas',
		name: 'Medalla de Relaciones Humanas',
		description:
			'La Medalla de Relaciones Humanas se otorga a los oficiales que han mostrado gran compasión en sus actividades diarias y han ido más allá del llamado del deber en su respuesta a los demás seres humanos',
		url: 'https://origennetwork.com/images/Servidores/Conde12.png'
	},
	Service2: {
		id: 'Service2',
		name: 'Servicio durante 2 meses',
		description:
			'Esta condecoración es entregada a aquellos miembros que ha realizado en la policía de san andreas un servicio superior a los 2 meses',
		url: 'https://origennetwork.com/images/Servidores/Conde13.png'
	},
	Service4: {
		id: 'Service4',
		name: 'Servicio durante 4 meses',
		description:
			'Esta condecoración es entregada a aquellos miembros que ha realizado en la policía de san andreas un servicio superior a los 4 meses',
		url: 'https://origennetwork.com/images/Servidores/Conde14.png'
	},
	Service6: {
		id: 'Service6',
		name: 'Servicio durante 6 meses',
		description:
			'Esta condecoración es entregada a aquellos miembros que ha realizado en la policía de san andreas un servicio superior a los 6 meses',
		url: 'https://origennetwork.com/images/Servidores/Conde15.png'
	},
	Service8: {
		id: 'Service8',
		name: 'Servicio durante 8 meses',
		description:
			'Esta condecoración es entregada a aquellos miembros que ha realizado en la policía de san andreas un servicio superior a los 8 meses',
		url: 'https://origennetwork.com/images/Servidores/Conde16.png'
	},
	Service10: {
		id: 'Service10',
		name: 'Servicio durante 10 meses',
		description:
			'Esta condecoración es entregada a aquellos miembros que ha realizado en la policía de san andreas un servicio superior a los 10 meses',
		url: 'https://origennetwork.com/images/Servidores/Conde17.png'
	},
	Service12: {
		id: 'Service12',
		name: 'Servicio durante 12 meses',
		description:
			'Esta condecoración es entregada a aquellos miembros que ha realizado en la policía de san andreas un servicio superior a un año',
		url: 'https://origennetwork.com/images/Servidores/Conde18.png'
	}
};

const divisions = {
	IAA: {
		id: 'IAA',
		name: 'Asuntos Internos (IAA)',
		url: 'https://sftp://origennetwork.com/images/Servidores/internos.png'
	},
	FIB: {
		id: 'FIB',
		name: 'Federal Investigation Bureau (FIB)',
		url: 'https://origennetwork.com/images/Servidores/FIB.png'
	},
	SWAT: {
		id: 'SWAT',
		name: 'Special Weapons And Tactics (SWAT)',
		url: 'https://origennetwork.com/images/Servidores/swat.png'
	},
	HPD: {
		id: 'HPD',
		name: 'Highway Patrol Division (HPD)',
		url: 'https://origennetwork.com/images/Servidores/patrol.png'
	},
	IRD: {
		id: 'IRD',
		name: 'Departamento de instrucción y reclutamiento (IRD)',
		url: 'https://origennetwork.com/images/Servidores/instruccion.png'
	},
	UNP: {
		id: 'UNP',
		name: 'Unidad de Negociación Policial (UNP)',
		url: 'https://origennetwork.com/images/Servidores/unidadmaritima.png'
	},
	UM: {
		id: 'UM',
		name: 'Unidad de Marítima (UM)',
		url: 'https://origennetwork.com/images/Servidores/unidadmaritima.png'
	}
};

const ReferenceSprite = {
	38: 'https://docs.fivem.net/blips/radar_raceflag.png',
	43: 'https://docs.fivem.net/blips/radar_police_heli.png',
	67: 'https://docs.fivem.net/blips/radar_security_van.png',
	110: 'https://docs.fivem.net/blips/radar_gun_shop.png',
	226: 'https://docs.fivem.net/blips/radar_gang_vehicle_bikers.png',
	496: 'https://docs.fivem.net/blips/radar_production_weed.png',
	427: 'https://docs.fivem.net/blips/radar_player_boat.png',
	502: 'https://docs.fivem.net/blips/radar_capture_1.png',
	503: 'https://docs.fivem.net/blips/radar_capture_2.png',
	504: 'https://docs.fivem.net/blips/radar_capture_3.png',
	505: 'https://docs.fivem.net/blips/radar_capture_4.png',
	102: 'https://docs.fivem.net/blips/radar_comedy_club.png',
	669: 'https://docs.fivem.net/blips/radar_arena_zr380.png',
	623: 'https://docs.fivem.net/blips/radar_pickup_dtb_blast_decrease.png',
	134: 'https://docs.fivem.net/blips/radar_crim_cuff_keys.png'
};

const ReferenceColor = {
	1: '#e03232',
	76: '#782323',
	3: '#5db6e5',
	12: '#70a8ae',
	15: '#6ac4bf',
	18: '#97cae9',
	26: '#7ac3fe',
	29: '#4561ab',
	30: '#29a5b8',
	2: '#71cb71',
	11: '#8dcea7',
	24: '#bbd65b',
	25: '#0c7b56',
	82: '#a4ccaa',
	28: '#cda80c',
	5: '#eec64e',
	46: '#ecf029',
	34: '#ed8ca1',
	41: '#f29d9d',
	40: '#4c4c4c',
	85: '#3d3d3d',
	50: '#896ce2'
};

const MarkerBlips = {
	radar: 'https://origennetwork.com/images/Servidores/IconoRadar.png',
	npc: 'https://origennetwork.com/images/Servidores/IconoNPC.png',
	marker: 'https://origennetwork.com/images/Servidores/IconoMarker.png'
};

const robosMayores = [
	{
		label: 'Joyería',
		description: 'Realiza el robo a joyería junto a tu organización',
		img: 'https://i.imgur.com/fxp6Olp.png',
		level: 0
	},
	{
		label: 'Banco Central',
		description:
			'Desvalija por completo el banco central situado en Vespucci Boulevard',
		img: 'https://i.imgur.com/ul1QWVa.png',
		level: 15
	}
];
