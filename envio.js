const factura = document.querySelector('#factura');
const resFactura = document.querySelector('#respuesta-factura');
const api_url = 'http://localhost/jsfilestext_api/';

function enviar(arreglo) {
    let datos = JSON.stringify(arreglo);
    fetch(`${api_url}rutes/factura.php`,{
        method : 'POST',
        headers : {
            "Content-type": "application/json;"
        },
        body : datos
    })
    .then((response)=>response.json())
    .then(data => {
        console.log(data[0][0]['code']);
        let tpl = ''

        if (data[0][0]['code'] == '200') {
            tpl = data[0].map(respuesta=>`
          <h2 class="terminado-msg">${respuesta.code_msg}</h2>
          <div class="emojis-msg">
            <img src="./assets/img/FX005_1.png" alt="Gracias">
          </div>
          `);
        } else {
            tpl = data[0].map(respuesta=>`
          <h2 class="terminado-msg">${respuesta.code_msg}</h2>
          <div class="emojis-msg">
            <img src="./assets/img/FX001_1.png" alt="No Guardado">
          </div>
          <div>
            <button class="btn-enviar anime" type="button"><span>Reintentar</span></button>
          </div>
          `);
        }

          
        resFactura.innerHTML = tpl;
        factura.value = '';
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
