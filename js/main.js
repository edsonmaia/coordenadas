let linhaDeLatitude  = document.querySelector('#linhaDeLatitude')
let linhaDeLongitude = document.querySelector('#linhaDeLongitude')
let sectionMapa = document.querySelector("#mapa")

// aside #caixa
let divCaixa = document.querySelector('#caixa')
let divCoordenadas = document.querySelector('#coordenadas')
let lat = document.querySelector('#lat')
let lon = document.querySelector('#lon')

function abrirModal(nLa, dLa, nLo, dLo) {
    location.href="#abrirModal"
	coordenadasDaJogada.innerHTML = `${nLa}°${dLa} ${nLo}°${dLo}`
}

function abrirMissao(nMissao) {
	location.href=`#cardMissao${nMissao}`
}

const btnMissao1 = document.querySelector('#btnMissao1').addEventListener('click', () => abrirMissao(1))
const btnMissao2 = document.querySelector('#btnMissao2').addEventListener('click', () => abrirMissao(2))
const btnMissao3 = document.querySelector('#btnMissao3').addEventListener('click', () => abrirMissao(3))
const btnMissao4 = document.querySelector('#btnMissao4').addEventListener('click', () => abrirMissao(4))

/*
const fecharModal = document.querySelector('.fechar').addEventListener('click', () => {
	location.href="#"
})
*/

function verificarFirefox() {
    // verificar se e o Firefox
    var browser
	var sUsrAg = navigator.userAgent
    if(sUsrAg.indexOf("Firefox") > -1) {
        return browser = "Firefox"
    }
}

let equador = (window.innerHeight)/2
// verifica se e o firefox se for adiciona +5 na medida do equador
let isFirefox = verificarFirefox()
isFirefox == 'Firefox' ? equador = (window.innerHeight+2.5)/2 : equador = window.innerHeight/2

let greenwich = window.innerWidth/2

let posicaoY = document.querySelector('#posicaoY')
let posicaoX = document.querySelector('#posicaoX')

const pegarPosicao = mapa.addEventListener('click', (evento) => {
    posicaoDoClique = { x: evento.pageX, y: evento.pageY }
	posicaoY.textContent = posicaoDoClique.y
	posicaoX.textContent = posicaoDoClique.x
    //mudarLatitude(posicaoDoClique.y)
    //mudarLongitude(posicaoDoClique.x)
    return posicaoDoClique
})

function mudarLatitude(posY, dLa) {
	let firefox = verificarFirefox()
	let posicao = (posY+7)
	firefox == 'Firefox' ? linhaDeLatitude.style.top = posicao+"px"	: linhaDeLatitude.style.top = posY+"px"
	let dirLat = dLa
}

function mudarLongitude(posX, dLo) {
	let firefox = verificarFirefox()
	let posicao = ''
	if(firefox == 'Firefox') {
		posicao = (posX+13)
		linhaDeLongitude.style.left = posicao+"px"
	} else {
		posicao = (posX+12.5)
		linhaDeLongitude.style.left = posicao+"px"
	}
	let dirLon = dLo
}

const btnJogar = document.querySelector('#btnJogar').addEventListener('click', () => {
    /* INPUTS */
    let latitudeInformada  = document.querySelector('#latitudeInformada').value
    let longitudeInformada = document.querySelector('#longitudeInformada').value
    let dirLatitude  = document.querySelector('#dirLatitude').value
    let dirLongitude = document.querySelector('#dirLongitude').value

	moverConformeDirecao(latitudeInformada, longitudeInformada, dirLatitude, dirLongitude)

    mudarLatitude(nLatitude, dirLatitude)
	mudarLongitude(nLongitude, dirLongitude)

	//abrirModal(latitudeInformada, dirLatitude, longitudeInformada, dirLongitude)
	verificarNavio(latitudeInformada, longitudeInformada, dirLatitude, dirLongitude)

	limparNumeros() // zerar numeros de latitude e longitude
})

function limparNumeros() {
	document.querySelector('#latitudeInformada').value = 0
	document.querySelector('#longitudeInformada').value = 0
	document.querySelector('#dirLatitude').value = 'N'
	document.querySelector('#dirLongitude').value = 'E'
}

function obterIndiceLatitude(latitudeInformada) {
		// indice usado para mover a div para o Norte (-) ou para o Sul (+)
		let indiceLa = 2.4
		if (latitudeInformada <= 20) {
			indiceLa = 2.5
		} else if (latitudeInformada <= 30) {
			indiceLa = 2.6
		} else if (latitudeInformada <= 50) {
			indiceLa = 2.7
		} else if (latitudeInformada <= 60) {
			indiceLa = 2.8
		} else if (latitudeInformada <= 70) {
			indiceLa = 2.9
		} else if (latitudeInformada <= 90) {
			indiceLa = 3.1
		} else if (latitudeInformada > 90 || latitudeInformada < 0) {
			console.log('Latitude inválida')
			return
		} else {
			indiceLa = 2.4
		}
		return indiceLa
}

function obterIndiceLongitude(longitudeInformada, dirLongitude) {
	// indice usado para mover a div para o Leste (+) ou para o Oeste (-)
    let indiceLo = 2.4
	longitudeInformada >= 120 && dirLongitude == 'E'  ? indiceLo = 2.35 : ''
	
    if (longitudeInformada < 0 || longitudeInformada > 180) {
        console.log('Longitude inválida')
        return
    }
	return indiceLo
}

let nLatitude  = ''
let nLongitude = ''

function moverConformeDirecao(latitudeInformada, longitudeInformada, dirLatitude, dirLongitude) {

	indiceLa = obterIndiceLatitude(latitudeInformada)
	indiceLo = obterIndiceLongitude(longitudeInformada, dirLongitude)

	dirLatitude == 'N' ? nLatitude = ((322) - latitudeInformada*indiceLa) : nLatitude = ((325) + latitudeInformada*indiceLa)
	dirLongitude == 'E' ? nLongitude = (greenwich + longitudeInformada*indiceLo) : nLongitude = (greenwich - longitudeInformada*indiceLo)
}

function desenharIcone(top, left, tipo) {
	const icone = document.createElement('img')
	sectionMapa.appendChild(icone)
	icone.setAttribute('src', `images/icon-${tipo}.png`)
	icone.classList.add('icones')
	icone.style.top = (top-12.5)+'px'
	icone.style.left = (left-12.5)+'px'
}

function desenharNavio(top, left, cor) {
	const navio = document.createElement('img')
	sectionMapa.appendChild(navio)
	navio.setAttribute('src', `images/navio-${cor}.png`)
	navio.classList.add('navios')

	// verifica se e o firefox se for adiciona +5 na medida do equador
	let firefox = verificarFirefox()

	if(firefox == 'Firefox') {
		navio.style.top = (top-9)+'px'
	} else {
		navio.style.top = (top-11)+'px'
	}
	
	navio.style.left = (left)+'px'
}

// ICONES latitude, longitude, tipo
//desenharIcone(195, 587, 'turismo')

// NAVIOS latitude, longitude, cor
// equador 327
// ATLANTICO
desenharNavio(327, greenwich, 'green') // 0 NAVIO CENTRAL
// NAVIO OESTE ATLANTICO
desenharNavio(327, 585, 'green') // 1

// NORTE OESTE ATLANTICO N
desenharNavio(305, 587, 'green') // 2
desenharNavio(277, 538, 'green') // 3 * pi
desenharNavio(249, 634, 'green') // 4 * pe
desenharNavio(210, greenwich, 'green') // 5
desenharNavio(195, 587, 'green') // 6
desenharNavio(162, greenwich, 'green') // 7
desenharNavio(163, 634, 'green') // 8
desenharNavio(127, 539, 'green') // 9 EXTRA

// NORTE OESTE PACIFICO N
desenharNavio(327, 299, 'green') // 10 * pi
desenharNavio(305, 443, 'green') // 11
desenharNavio(278, 301, 'green') // 12
desenharNavio(250, 395, 'green') // 13
desenharNavio(224, 349, 'green') // 14 * pe
desenharNavio(196, 301, 'green') // 15

////////////////
desenharNavio(327, 873, 'orange')  // 16 NAVIO LESTE INDICO
desenharNavio(327, 1062, 'orange') // 17 NAVIO LESTE PACIFICO
// NORTE LESTE 'MARES' + INDICO E PACIFICO
desenharNavio(305, 825, 'orange')  // 18 INDICO NORTE * pi
desenharNavio(305, 968, 'orange')  // 19 PACIFICO NORTE
desenharNavio(276, 777, 'orange')  // 20 MAR VERMELHO
desenharNavio(250, 729, 'orange')  // 21
desenharNavio(250, 1065, 'orange') // 22 PACIFICO NORTE
desenharNavio(223, 729, 'orange')  // 23
desenharNavio(223, 1015, 'orange') // 24 PACIFICO NORTE
desenharNavio(125, 729, 'orange')  // 25
desenharNavio(80, 778, 'orange')   // 26
desenharNavio(80, 873, 'orange')   // 27 * pe

// SUL OESTE ATLANTICO SUL
desenharNavio(357, 633, 'gold') // 28
desenharNavio(385, greenwich, 'gold') // 29
desenharNavio(384, 586, 'gold') // 30
desenharNavio(412, 634, 'gold') // 31 * pi
desenharNavio(439, 538, 'gold') // 32
desenharNavio(467, 538, 'gold') // 33
desenharNavio(535, greenwich, 'gold') // 34

// SUL OESTE PACIFICO SUL
desenharNavio(356, 491, 'gold') // 35
desenharNavio(384, 442, 'gold') // 36
desenharNavio(384, 324, 'gold') // 37
desenharNavio(439, 349, 'gold') // 38 * pe
desenharNavio(500, 397, 'gold') // 39

// INDICO E PACIFICO SUL
desenharNavio(356, 920, 'purple')  // 40 * pi
desenharNavio(356, 1017, 'purple') // 41
desenharNavio(383, 826, 'purple')  // 42
desenharNavio(411, 777, 'purple')  // 43
desenharNavio(411, 1063, 'purple') // 44

desenharNavio(437, 730, 'purple')  // 45 ATLANTICO SUL LIMITE COM O INDICO

desenharNavio(438, 968, 'purple')  // 46
desenharNavio(438, 1112, 'purple') // 47
desenharNavio(467, 1063, 'purple') // 48
desenharNavio(498, 873, 'purple')  // 49 * pe

/*
desenharIcone(equador, 300, 'comercial')
desenharIcone(equador, 400, 'militar')
desenharIcone(equador, 500, 'turismo')
desenharIcone(equador, 600, 'pirataria')
desenharIcone(equador, 700, 'pesca')
*/

function exibirCard() {
    let divisoria = document.createElement('div')
    mapa.appendChild(divisoria)
    divisoria.innerHTML = 'Caixa descritiva'
}

function validaLatitude(la) {
	if(la < 0 || la > 90) {
		alert('digite uma latitude válida!')
		latitudeInformada.value = 0
		return
	}
}

function validaLongitude(lo) {
	if(lo < 0 || lo > 180) {
		alert('digite uma longitude válida!')
		longitudeInformada.value = 0
		return
	}
}

// CONST SHIPS
const ships = [
    // Atlantico e Pacifico Norte W
    {
        id: 0,
        color: 'green',
        lat : '0N',
        long: '0W',
        y: 320,
        x: 696,
        tipo: 'comercial',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 1,
        color: 'green',
        lat : '0N',
        long: '40W',
        y: 320,
        x: 599,
        tipo: 'turismo',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 2,
        color: 'green',
        lat : '10N',
        long: '40W',
        y: 298,
        x: 599,
        tipo: 'militar',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 3,
        color: 'green',
        lat : '20N',
        long: '60W',
        y: 269,
        x: 550,
        tipo: 'pirataria',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 4,
        color: 'green',
        lat : '30N',
        long: '20W',
        y: 242,
        x: 647,
        tipo: 'pesca',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 5,
        color: 'green',
        lat : '45N',
        long: '0W',
        y: 202,
        x: 696,
        tipo: 'turismo',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 6,
        color: 'green',
        lat : '50N',
        long: '40W',
        y: 188,
        x: 599,
        tipo: 'comercial',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 7,
        color: 'green',
        lat : '60N',
        long: '0W',
        y: 155,
        x: 696,
        tipo: 'militar',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 8,
        color: 'green',
        lat : '60N',
        long: '20W',
        y: 155,
        x: 647,
        tipo: 'comercial',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 9,
        color: 'green',
        lat : '70N',
        long: '60W',
        y: 119,
        x: 552,
        tipo: 'turismo',
        local: 'Atlântico Norte Oeste'
    },
    {
        id: 10,
        color: 'green',
        lat : '0N',
        long: '160W',
        y: 323,
        x: 314,
        tipo: 'pirataria',
        local: 'Pacífico Norte Oeste'
    },
    {
        id: 11,
        color: 'green',
        lat : '10N',
        long: '100W',
        y: 299,
        x: 457,
        tipo: 'comercial',
        local: 'Pacífico Norte Oeste'
    },
    {
        id: 12,
        color: 'green',
        lat : '20N',
        long: '160W',
        y: 271,
        x: 314,
        tipo: 'turismo',
        local: 'Pacífico Norte Oeste'
    },
    {
        id: 13,
        color: 'green',
        lat : '30N',
        long: '120W',
        y: 244,
        x: 409,
        tipo: 'militar',
        local: 'Pacífico Norte Oeste'
    },
    {
        id: 14,
        color: 'green',
        lat : '40N',
        long: '140W',
        y: 218,
        x: 362,
        tipo: 'pesca',
        local: 'Pacífico Norte Oeste'
    },
    {
        id: 15,
        color: 'green',
        lat : '50N',
        long: '160W',
        y: 189,
        x: 314,
        tipo: 'comercial',
        local: 'Pacífico Norte Oeste'
    },
    // Oceanos e Mares do Norte para o Leste    
    {
        id: 16,
        color: 'orange',
        lat : '0N',
        long: '80E',
        y: 323,
        x: 886,
        tipo: 'militar',
        local: 'Índico'
    },
    {
        id: 17,
        color: 'orange',
        lat : '0N',
        long: '160E',
        y: 323,
        x: 1077,
        tipo: 'turismo',
        local: 'Pacífico Norte, Mares do Norte'
    },
    {
        id: 18,
        color: 'orange',
        lat : '10N',
        long: '60E',
        y: 299,
        x: 838,
        tipo: 'pirataria',
        local: 'Índico'
    },
    {
        id: 19,
        color: 'orange',
        lat : '10N',
        long: '120E',
        y: 299,
        x: 982,
        tipo: 'comercial',
        local: 'Pacífico Norte Leste'
    },
    {
        id: 20,
        color: 'orange',
        lat : '20N',
        long: '40E',
        y: 271,
        x: 790,
        tipo: 'comercial',
        local: 'Mares do Norte - Mar Vermelho'
    },
    {
        id: 21,
        color: 'orange',
        lat : '30N',
        long: '20E',
        y: 244,
        x: 743,
        tipo: 'turismo',
        local: 'Mares do Norte - Mar Mediterrâneo'
    },
    {
        id: 22,
        color: 'orange',
        lat : '30N',
        long: '160E',
        y: 244,
        x: 1077,
        tipo: 'militar',
        local: 'Pacífico Norte Leste'
    },
    {
        id: 23,
        color: 'orange',
        lat : '40N',
        long: '20E',
        y: 218,
        x: 743,
        tipo: 'turismo',
        local: 'Mares do Norte - Mar Mediterrâneo'
    },
    {
        id: 24,
        color: 'orange',
        lat : '40N',
        long: '140E',
        y: 218,
        x: 1029,
        tipo: 'turismo',
        local: 'Pacífico Norte Leste'
    },
    {
        id: 25,
        color: 'orange',
        lat : '70N',
        long: '20E',
        y: 121,
        x: 743,
        tipo: 'comercial',
        local: 'Mares do Norte'
    },
    {
        id: 26,
        color: 'orange',
        lat : '80N',
        long: '40E',
        y: 74,
        x: 790,
        tipo: 'militar',
        local: 'Mares do Norte'
    },
    {
        id: 27,
        color: 'orange',
        lat : '80N',
        long: '80E',
        y: 74,
        x: 886,
        tipo: 'pesca',
        local: 'Mares do Norte'
    },
    // Atlantico e Pacifico Sul Oeste
    {
        id: 28,
        color: 'gold',
        lat : '10S',
        long: '20W',
        y: 351,
        x: 647,
        tipo: 'comercial',
        local: 'Atlântico Sul Oeste'
    },
    {
        id: 29,
        color: 'gold',
        lat : '20S',
        long: '0W',
        y: 379,
        x: 696,
        tipo: 'militar',
        local: 'Atlântico Sul Oeste'
    },
    {
        id: 30,
        color: 'gold',
        lat : '20S',
        long: '40W',
        y: 379,
        x: 599,
        tipo: 'turismo',
        local: 'Atlântico Sul Oeste'
    },
    {
        id: 31,
        color: 'gold',
        lat : '30S',
        long: '20W',
        y: 406,
        x: 647,
        tipo: 'pirataria',
        local: 'Atlântico Sul Oeste'
    },
    {
        id: 32,
        color: 'gold',
        lat : '40S',
        long: '60W',
        y: 433,
        x: 552,
        tipo: 'turismo',
        local: 'Atlântico Sul Oeste'
    },
    {
        id: 33,
        color: 'gold',
        lat : '50S',
        long: '60W',
        y: 462,
        x: 552,
        tipo: 'comercial',
        local: 'Atlântico Sul Oeste'
    },
    {
        id: 34,
        color: 'gold',
        lat : '70S',
        long: '0W',
        y: 530,
        x: 696,
        tipo: 'militar',
        local: 'Atlântico Sul Oeste'
    },
    // Pacifico Sul W
    {
        id: 35,
        color: 'gold',
        lat : '10S',
        long: '80W',
        y: 351,
        x: 505,
        tipo: 'turismo',
        local: 'Pacífico Sul Oeste'
    },
    {
        id: 36,
        color: 'gold',
        lat : '20S',
        long: '100W',
        y: 379,
        x: 457,
        tipo: 'comercial',
        local: 'Pacífico Sul Oeste'
    },
    {
        id: 37,
        color: 'gold',
        lat : '20S',
        long: '150W',
        y: 379,
        x: 337,
        tipo: 'militar',
        local: 'Pacífico Sul Oeste'
    },
    {
        id: 38,
        color: 'gold',
        lat : '40S',
        long: '140W',
        y: 433,
        x: 362,
        tipo: 'pesca',
        local: 'Pacífico Sul Oeste'
    },
    {
        id: 39,
        color: 'gold',
        lat : '60S',
        long: '120W',
        y: 494,
        x: 409,
        tipo: 'comercial',
        local: 'Pacífico Sul Oeste'
    },
    // Indico, Pacifico Sul E
    {
        id: 40,
        color: 'purple',
        lat : '10S',
        long: '100E',
        y: 351,
        x: 934,
        tipo: 'pirataria',
        local: 'Índico'
    },
    {
        id: 41,
        color: 'purple',
        lat : '10S',
        long: '140E',
        y: 351,
        x: 1029,
        tipo: 'comercial',
        local: 'Índico'
    },
    {
        id: 42,
        color: 'purple',
        lat : '20S',
        long: '60E',
        y: 379,
        x: 838,
        tipo: 'turismo',
        local: 'Índico'
    },
    {
        id: 43,
        color: 'purple',
        lat : '30S',
        long: '40E',
        y: 406,
        x: 790,
        tipo: 'comercial',
        local: 'Índico'
    },
    {
        id: 44,
        color: 'purple',
        lat : '30S',
        long: '160E',
        y: 406,
        x: 1077,
        tipo: 'turismo',
        local: 'Pacífico Sul Leste'
    },
    {
        id: 45,
        color: 'purple',
        lat : '40S',
        long: '20E',
        y: 433,
        x: 743,
        tipo: 'militar',
        local: 'Atlântico Sul Leste'
    },
    {
        id: 46,
        color: 'purple',
        lat : '40S',
        long: '120E',
        y: 433,
        x: 982,
        tipo: 'militar',
        local: 'Índico'
    },
    {
        id: 47,
        color: 'purple',
        lat : '40S',
        long: '180E',
        y: 433,
        x: 1124,
        tipo: 'turismo',
        local: 'Pacífico Sul Leste'
    },
    {
        id: 48,
        color: 'purple',
        lat : '50S',
        long: '160E',
        y: 462,
        x: 1077,
        tipo: 'comercial',
        local: 'Pacífico Sul Leste'
    },
    {
        id: 49,
        color: 'purple',
        lat : '60S',
        long: '80E',
        y: 494,
        x: 886,
        tipo: 'pesca',
        local: 'Índico'
    }
]
//// CONST SHIPS
// Green(2), Orange(1), Gold(1), Purple
const shipsFish = [4, 14, 27, 38, 49]
// Green(2), Orange(1), Gold(1), Purple
const shipsPirate = [3, 10, 18, 31, 40]
const shipsComercial = [ ]
const shipsTurism = [ ]
const militare = [ ]

function verificarNavio(latitudeInformada, longitudeInformada, dirLatitude, dirLongitude) {
	let latitude  = latitudeInformada+dirLatitude
	let longitude = longitudeInformada+dirLongitude
	
	// verificar se e ilegal ou nao
	for(let i = 0; i <= 49; i++) {
		if(latitude == ships[i].lat && longitude == ships[i].long) {
			desenharIcone(ships[i].y, ships[i].x, ships[i].tipo)
			let tipo = ships[i].tipo
			switch(tipo) {
				case 'pesca':
					alert('Navio de Pesca Ilegal')
					// pontuar
					break

				case 'pirataria':
					alert('Navio de Pirataria')
					// pontuar
					break
				
				case 'comercial':
					//alert('Navio Comercial')
					// pontuar
					break
				
				case 'turismo':
					//alert('Navio de Turismo')
					// pontuar
					break
				
				case 'militar':
					//alert('Navio Militar')
					// pontuar
					break
			
				}
		} // fim if

	}
		
} // fim verificarNavio
