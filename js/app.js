/* Variables Globales */
const yearMax = new Date().getFullYear();
const yearMin = yearMax - 10;
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const color = document.querySelector('#color');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const resultado = document.querySelector('#resultado');
const transmision = document.querySelector('#transmision');

/* Generar Un Objeto Con La Busquedad */
const datosBusqueda = {
    marca: '',
    year: '',
    color: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
}

/* Eventos */
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    llenarSelect();
});

marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto();
});

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
});

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    // console.log(datosBusqueda);
});

/* Funciones */
function mostrarAutos(autos) {
    limpiarHTML();

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autosHTML = document.createElement('p');

        autosHTML.textContent = `
          ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        resultado.appendChild(autosHTML);
    });
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for (let index = yearMax; index >= yearMin; index--) {
        const opcionYear = document.createElement('option');

        opcionYear.value = index;
        opcionYear.textContent = index;

        year.appendChild(opcionYear);
    }
}

/* Como "FILTER" Es Una Función De Alto Nivel(Hight Order Function), Yo Puedo Pasarle una funcion como argumento, y el resultado lo recibe la función que se paso como argumento */

/* Los Hight Order Function Soportan El Encadenamiento De Métodos O Chaining */
function filtrarAuto() {
    limpiarHTML();

    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado);

    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    const noResultado = document.createElement('div');

    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No Hay Resultados, Intenta Con Otros Términos De Búsqueda';

    resultado.appendChild(noResultado);
}

/* PRINCIPIOS DE PROGRAMACIÓN FUNCIONAL =>
Funciones que no modifican el arreglo original
y son funciones pequeñas que van realizando
ciertas operaciones */

/* Estamos Recibiendo Como Parametro Lo Que Me Entrega "FILTER" */
function filtrarMarca(auto) {
    const { marca } = datosBusqueda;

    if (marca) {
        return auto.marca === marca;
    }
    return auto;
};

function filtrarYear(auto) {
    const { year } = datosBusqueda;

    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;

    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;

    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;

    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;

    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;

    if (color) {
        return auto.color === color;
    }
    return auto;
}