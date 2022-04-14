const api_url = 'http://apicatovatech.xyz/';

const enviar = (arreglo, inputData, divResp)=> {
    
    let datos = JSON.stringify(arreglo);
    fetch(`${api_url}rutes/padron.php`,{
        method : 'POST',
        headers : {
            "Content-type": "application/json;"
        },
        body : datos
    })
    .then((response)=>response.json())
    .then(data => {
        // console.log(data[0][0]['code']);
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
          `);
        }

          
        divResp.innerHTML = tpl;
        divResp.style.display = 'block';
        inputData.value = '';
    })
    .catch(function(err){
        console.log(err);
    })
}

export const archivoPadron = (e, inputdata, divres)=> {
    let archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
        const contenido = e.target.result;

        let arreglo = contenido.split(/\r?\n|\r/).map(function(linea){
            const registro = linea.split(',')
            // console.log(registro);
            const txt = registro.toString();
            const datas = txt.split(',');
            const largo = datas.length;
            const f_rezago = datas[(largo-1)];
            const f_corriente = datas[(largo-2)];
            const imp_corriente = datas[(largo-3)];
            const imp_rezago = datas[(largo-4)];
            const imp_otros = datas[(largo-5)];
            // console.log(rezago);
            if (registro[0].length == 12 && (imp_corriente != '0' || imp_rezago != '0' || imp_otros != '0')) {
                const cta = registro[0]; 
                const calle = registro[2];
                const numExt =  registro[3];
                const numInt =  registro[4];
                const colonia =  registro[6];
                const causante =  registro[7];
                const otros =  imp_otros;
                const rezago =  imp_rezago;
                const corriente =  imp_corriente;
                const perCorriente = f_corriente;
                const perRezag = f_rezago;
                let obj = {cta, calle, numExt, numInt, colonia, causante, otros, rezago, corriente, perCorriente, perRezag};
                // console.log(obj);
                return obj
            }
        });

        arreglo = arreglo.filter(function(dato){
            return dato != undefined
          });
          enviar(arreglo, inputdata, divres);
            // console.log(arreglo);
    };
    lector.readAsText(archivo);
}