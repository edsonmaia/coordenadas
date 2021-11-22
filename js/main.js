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

/*
const btnMoverLinhas = document.querySelector('#btnMoverLinhas').addEventListener("click", () => {
    mudarLatitude(55, "N")
    mudarLongitude(255, "E")
})
*/

const btnJogar = document.querySelector('#btnJogar').addEventListener('click', () => {
    /* INPUTS */
    const latitudeInformada  = document.querySelector('#latitudeInformada').value
    const longitudeInformada = document.querySelector('#longitudeInformada').value
    const dirLatitude  = document.querySelector('#dirLatitude').value
    const dirLongitude = document.querySelector('#dirLongitude').value

	moverConformeDirecao(latitudeInformada, longitudeInformada, dirLatitude, dirLongitude)

    mudarLatitude(nLatitude, dirLatitude)
	mudarLongitude(nLongitude, dirLongitude)

	abrirModal(latitudeInformada, dirLatitude, longitudeInformada, dirLongitude)

})

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
	icone.style.left = (left)+'px'
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

/*
// ICONs
desenharIcone(277, 538, 'pirataria') // 3
desenharIcone(249, 634, 'pesca') // 4
desenharIcone(equador, 299, 'pirataria') // 10
desenharIcone(224, 349, 'pesca') // 14

desenharIcone(305, 825, 'pirataria')  // 18
desenharIcone(80, 873, 'pesca')  // 27

desenharIcone(412, 634, 'pirataria') // 31
desenharIcone(439, 349, 'pesca') // 38

desenharIcone(356, 920, 'pirataria')  // 40
desenharIcone(498, 873, 'pesca')  // 49
////
*/

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
