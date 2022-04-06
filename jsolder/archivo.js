const factura = document.querySelector('#factura');
const preTxt = document.querySelector('#conenido-archivo');
const api_url = 'http://localhost/jsfilestext_api/';
// function mostrarContenido(contenido) {
//     let elemento = preTxt;
//     elemento.innerHTML = contenido
// }

function leerArchivo(e) {
    let archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
        // const expresionRegular = /\s*\s*\d\s*\s*/;
        const contenido = e.target.result;
        let elemento = preTxt;
        /**Pruebas de transferencia */
        const filas = contenido.split(/\r?\n|\r/);
        console.log(filas.length);
        for (let i = 0; i < filas.length; i++) {
            const data = [];
            const fila = filas[i];
            const ctaName = fila.split(' ',1);
            const valores = fila.split(ctaName);
            const celdas = valores.toString();
            const valorA = celdas.split('  ');
            const sinVacio = valorA.filter(el => el != '')
            const sinComaFalsa = sinVacio.filter(el => el != ',');
            
            
            sinComaFalsa.unshift(ctaName[0]);
            if (sinComaFalsa[0].length == 12 && sinComaFalsa[13] !== '0.00') {
                data.push((sinComaFalsa[0].replace('-', '')).replace('-', ''));
                data.push(Number((sinComaFalsa[7].trim()).replace(',', '')));
                data.push(Number((sinComaFalsa[8].trim()).replace(',', '')));
                data.push(Number((sinComaFalsa[13].trim()).replace(',', '')));
                // console.log(data);
                let headersList = {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                   }
                let bodyContent = JSON.stringify(data);
                fetch(`${api_url}rutes/factura.php`, { 
                    method: "POST",
                    body: bodyContent,
                    headers: headersList})
                    .then((response)=>response.json())
                    .then((data)=>{
                        console.log(data[0]['code']);
                    })
                // console.log(bodyContent);                
            }

        }
        /**Pruebas de transferencia */
        // mostrarContenido(contenido);
    };
    lector.readAsText(archivo);
}



factura.addEventListener('change', (e)=>{
    leerArchivo(e);
})
