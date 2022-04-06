const factura = document.querySelector('#factura');
const preTxt = document.querySelector('#conenido-archivo');
const api_url = 'http://localhost/jsfilestext_api/';

function enviar(arreglo) {
    let datos = JSON.stringify(arreglo);
    fetch(`${api_url}rutes/factura.php`,{
        method : 'POST',
        body : datos,
        headers : {
            "Content-type": "application/json;"
        }
    })
    .then((response)=>response.json())
    .then(data => {
        console.log(data[0]['code']);
    })
    .catch(function(err){
        console.log(err);
    })
}



function leerArchivo(e) {
    let archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
        const contenido = e.target.result;
        // console.log(contenido);

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
          enviar(arreglo);
          //   console.log(arreglo);
    };
    lector.readAsText(archivo);
}



factura.addEventListener('change', (e)=>{
    leerArchivo(e);
})
