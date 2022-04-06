const factura = document.querySelector('#factura');
const preTxt = document.querySelector('#conenido-archivo');
const api_url = 'http://localhost/jsfilestext_api/';

// function mostrarContenido(registros){
//     let elemento = preTxt;
//     registros.forEach(element => {
//         elemento.innerHTML += `
//         <tr>
//             <td>${element.cta}</td>
//             <td>${element.recargos}</td>
//             <td>${element.actualiza}</td>
//             <td>${element.total}</td>
//         </tr>
//         `
//     });
// }

function clgDatos(registros) {
    console.log(registros);
    const  envio = new XMLHttpRequest();
    envio.open('POST', './test.php', true);
    envio.setRequestHeader('Content-type', 'application/json');
    envio.send('datos='+ registros);
    
}

function leerArchivo(e) {
    let archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
        const contenido = e.target.result;

        /**Pruebas de transferencia */
        let arreglo = contenido.split(/\r?\n|\r/).map(function(linea){
            const ctaName = linea.split('  ', 1);
            const ncta = linea.split(' ', 1);
            const valores = linea.split(ctaName);
            const celdas = valores.toString();
            const valorA = celdas.split('  ');
            const sinVacio = valorA.filter(el => el != '')
            const sinComaFalsa = sinVacio.filter(el => el != ',');
            sinComaFalsa.unshift(ncta[0]);
            const valorC = sinComaFalsa.length;
            if (sinComaFalsa[0].length == 12 && sinComaFalsa[12] !== '0.00') {
                const cta = (sinComaFalsa[0].replace('-', '')).replace('-', '');
                const recargos = (sinComaFalsa[valorC-7].trim()).replace(',', '');
                const actualiza = (sinComaFalsa[valorC-6].trim()).replace(',', '');
                const total = (sinComaFalsa[valorC-1].trim()).replace(',', '');
                
                let obj = {cta, recargos, actualiza, total};
                return obj;
            }
        });

        arreglo = arreglo.filter(function(dato){
            return dato != undefined
          });
          clgDatos(arreglo);
    };
    lector.readAsText(archivo);
}



factura.addEventListener('change', (e)=>{
    leerArchivo(e);
})
