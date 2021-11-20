let linhaDeLatitude = document.querySelector('#linhaDeLatitude')
let linhaDeLongitude = document.querySelector('#linhaDeLongitude')
let sectionMapa = document.querySelector("#mapa")

let divCaixa = document.querySelector('#caixa')
let divCoordenadas = document.querySelector('#coordenadas')
let lat = document.querySelector('#lat')
let lon = document.querySelector('#lon')

let direcaoLat = document.querySelector('#direcaoLat')
let direcaoLon = document.querySelector('#direcaoLon')

function abrirModal(nLa, dLa, nLo, dLo) {
    location.href="#abrirModal"
	coordenadasDaJogada.innerHTML = `${nLa}°${dLa} ${nLo}°${dLo}`
}

function verificarFirefox() {
	// verificar se e o Firefox
	var sBrowser, sUsrAg = navigator.userAgent
	if(sUsrAg.indexOf("Firefox") > -1) {
		return sBrowser = "Firefox"
	}
}

let equador = 0
let greenwich = window.innerWidth/2

// verifica se e o firefox se for adiciona +5 na medida do equador
let isFirefox = verificarFirefox()
isFirefox == 'Firefox' ? equador = (window.innerHeight+3)/2 : equador = window.innerHeight/2

let posicaoY = document.querySelector('#posicaoY')
let posicaoX = document.querySelector('#posicaoX')

const pegarPosicao = mapa.addEventListener('click', (evento) => {

    posicaoDoClique = { x: evento.pageX, y: evento.pageY }

	posicaoY.textContent = posicaoDoClique.y
	posicaoX.textContent = posicaoDoClique.x

    mudarLatitude(posicaoDoClique.y)
    mudarLongitude(posicaoDoClique.x)

    return posicaoDoClique
})

function mudarLatitude(posY, dLa) {
    linhaDeLatitude.style.top = posY+"px"
	let dirLat = dLa
}

function mudarLongitude(posX, dLo) {
    linhaDeLongitude.style.left = posX+"px"
	let dirLon = dLo
}

function caixaDescritiva() {
    let divisoria = document.createElement('div')
    mapa.appendChild(divisoria)
    divisoria.innerHTML = 'Caixa descritiva'
}

const btnMoverLinhas = document.querySelector('#btnMoverLinhas')

btnMoverLinhas.addEventListener("click", () => {
    mudarLatitude(53, "N")
    mudarLongitude(255, "E")
})

const btnJogar = document.querySelector('#btnJogar')

btnJogar.addEventListener('click', () => {
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
		if (latitudeInformada < 30) {
			indiceLa = 2.5
		} else if (latitudeInformada <= 40) {
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

function obterIndiceLongitude(longitudeInformada) {
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
	indiceLo = obterIndiceLongitude(longitudeInformada)

	dirLatitude == 'N' ? nLatitude = (equador - latitudeInformada*indiceLa) : nLatitude = (equador + latitudeInformada*indiceLa)
	dirLongitude == 'E' ? nLongitude = (greenwich + longitudeInformada*indiceLo) : nLongitude = (greenwich - longitudeInformada*indiceLo)
}

// POSICOES LATITUDES E LONGITUDES NO MAPA
const posicoesLatitudes = {	
	"90N": 52,
	"80N": 79,
	"70N": 126,
	"60N": 162,
	"50N": 195,
	"40N": 224,
	"30N": 249,
	"20N": 275,
	"10N": 305,
	"0N" : 330,
	"0S" : 330,
	"10S": 357,
	"20S": 385,
	"30S": 412,
	"40S": 438,
	"50S": 467,
	"60S": 499,
	"70S": 535,
	"80S": 582,
	"90S": 608
}

const posicoesLongitudes = {
	"180O": 253,
	"160O": 300,
	"140O": 348,
	"120O": 395,
	"100O": 443,
	"80O" : 490,
	"60O" : 538,
	"40O" : 586,
	"20O" : 633,
	"0O"  : 681,
	"0E"  : 681,
	"20E" : 729,
	"40E" : 777,
	"60E" : 824,
	"80E" : 872,
	"100E": 920,
	"120E": 967,
	"140E": 1015,
	"160E": 1062,
	"180E": 1110 
}

function desenharNavio(top, left, cor) {
	const navio = document.createElement('img')
	sectionMapa.appendChild(navio)
	navio.setAttribute('src', `images/navio-${cor}.png`)
	navio.classList.add('navios')
	navio.style.top = (top-2.5)+'px'
	navio.style.left = (left-12.5)+'px'
}

// NAVIOS latitude, longitude, cor

// NORTE OESTE ATLANTICO N
desenharNavio(127, 539, 'green') // EXTRA

desenharNavio(195, 587, 'green')
desenharNavio(305, 587, 'green')
desenharNavio(277, 538, 'green')
desenharNavio(163, 634, 'green')
desenharNavio(249, 634, 'green')

// NORTE OESTE PACIFICO N
desenharNavio(196, 301, 'green')
desenharNavio(250, 395, 'green')
desenharNavio(305, 443, 'green')
desenharNavio(224, 349, 'green')
desenharNavio(278, 301, 'green')

// NAVIO CENTRAL
desenharNavio(equador, greenwich, 'rose')
// NORTE OESTE PACIFICO
desenharNavio(equador, 299, 'rose')
// NAVIO OESTE ATLANTICO
desenharNavio(equador, 585, 'rose')
// NAVIO LESTE INDICO
desenharNavio(equador, 873, 'rose')
// NAVIO LESTE PACIFICO
desenharNavio(equador, 1062, 'rose')
/////

// NORTE LESTE 'MARES'
desenharNavio(80, 778, 'orange')
desenharNavio(80, 873, 'orange')
desenharNavio(250, 729, 'orange')
desenharNavio(223, 729, 'orange')
desenharNavio(125, 729, 'orange')

// NORTE LESTE INDICO E PACIFICO
desenharNavio(223, 1015, 'orange') // PACIFICO NORTE
desenharNavio(250, 1065, 'orange') // PACIFICO NORTE
desenharNavio(276, 777, 'orange') // MAR VERMELHO
desenharNavio(305, 825, 'orange') // INDICO NORTE
desenharNavio(305, 968, 'orange') // PACIFICO NORTE


// GREENWICH
desenharNavio(162, greenwich, 'rose')
desenharNavio(210, greenwich, 'rose')

desenharNavio(385, greenwich, 'rose')
desenharNavio(535, greenwich, 'rose')

// INDICO E PACIFICO SUL
desenharNavio(356, 920, 'purple')
desenharNavio(356, 1017, 'purple')
desenharNavio(383, 826, 'purple')
desenharNavio(411, 1063, 'purple')
desenharNavio(411, 777, 'purple')
desenharNavio(437, 730, 'purple')
desenharNavio(438, 968, 'purple')
desenharNavio(438, 1112, 'purple')
desenharNavio(467, 1063, 'purple')
desenharNavio(498, 873, 'purple')

// SUL OESTE ATLANTICO SUL
desenharNavio(357, 633, 'gold')
desenharNavio(384, 586, 'gold')
desenharNavio(412, 634, 'gold')
desenharNavio(467, 538, 'gold')
desenharNavio(439, 538, 'gold')

// SUL OESTE PACIFICO SUL
desenharNavio(356, 491, 'gold')
desenharNavio(384, 324, 'gold')
desenharNavio(384, 442, 'gold')
desenharNavio(439, 349, 'gold')
desenharNavio(500, 397, 'gold')
