
const api_url = 'http://localhost/jsfilestext_api/';
import escudo from '../img/escudo.json'assert { type: "json" };

export const impPDF = (ubica, cantA, cantB)=>{
    let obj = {ubica, cantA, cantB};
    let datos = JSON.stringify(obj);
    fetch(`${api_url}rutes/printdata.php`,{
        method : 'POST',
        headers : {
            "Content-type": "application/json;"
        },
        body : datos
    })
    .then((response)=>response.json())
    .then(data => {
        
        let tpl = ''

        if (data.length >= 1) {
            // console.log(data);
            /**Creacion de PDF */
            
            const doc = new jsPDF();
            doc.setProperties({
                title: 'Carta01',
                subject: 'Cobranza del municipio',
                author: 'Rangel Diaz',
                keywords: 'cobranza, carta, 01, aviso',
                creator: 'RADL'
            });
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const deuda = new Intl.NumberFormat('es-MX').format((element['totaldeuda']*1).toFixed(2));
                const corriente = new Intl.NumberFormat('es-MX').format((element['corriente']*1).toFixed(2));
                const dap = new Intl.NumberFormat('es-MX').format((element['otros']*1).toFixed(2));
                const rezago = new Intl.NumberFormat('es-MX').format((element['rezago']*1).toFixed(2));
                const recargos = new Intl.NumberFormat('es-MX').format((element['recargos']*1).toFixed(2));
                // console.log(element['cta']);
                // const deuda = new Intl.NumberFormat('es-MX').format(element['totaldeuda']);
                doc.addImage(escudo.src, 'png', 140, 10, 60, 20);
                doc.addImage(escudo.src, escudo.formato, 90, 270, 30, 10);
                // doc.addImage(escudo.src, 'png', posicion a los lados, posicion Arriba o abajo, ancho, alto);
                doc.setFont("Verdana");
                doc.setFontSize(12);
                doc.text(10, 40, `Cta Predial: ${element['cta']}`);
                doc.setFontSize(14);
                doc.text(10, 45, `${element['causante']}`);
                doc.setFontSize(9);
                doc.text(10, 50, `Calle : ${element['calle']} NUM: ${element['numext']} ${element['numint']}, ${element['colonia']}` );
                doc.text(10, 55, `Colonia : ${element['colonia']}.`);
                doc.setFontSize(10);
                let loremipsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`;
                let lines = doc.splitTextToSize(loremipsum, 189);
                doc.text(10, 70, lines, {align: 'justify',lineHeightFactor: 1.5});
                doc.setFontSize(14);
                doc.text(30, 95, `El adeudo total presentado por concepto predial es de ${deuda}`, {'align': 'center'});
                doc.setFontSize(9);
                doc.text(30, 100, `Desgloce: `);
                doc.text(30, 105, `Corriente: ${corriente}`);
                doc.text(30, 110, `DAP: ${dap}`);
                doc.text(30, 115, `Saldo Vencido: ${rezago}`);
                doc.text(30, 120, `Recarogos: ${recargos}`);
                doc.setFontSize(14);
                doc.text(25, 135, `Debido a la campaña de descuento en 100% DE RECARGOS solo pague: `);
                doc.setFontSize(25);
                doc.text(90, 145, `$ ${new Intl.NumberFormat('es-MX').format((element['totaldeuda'] - element['recargos']).toFixed(2))}`);
                doc.setFontSize(10);
                doc.text(10, 155, lines, {align: 'justify',lineHeightFactor: 1.5});
                doc.text(10, 185, lines, {align: 'justify',lineHeightFactor: 1.5});
                doc.addPage();
            }
            doc.save("carta001.pdf");

        }else{
            console.log('Sin Datos');
        }


        // if (data[0][0]['code'] == '200') {
        //     tpl = data[0].map(respuesta=>`
        //   <h2 class="terminado-msg">${respuesta.code_msg}</h2>
        //   <div class="emojis-msg">
        //     <img src="./assets/img/FX005_1.png" alt="Gracias">
        //   </div>
        //   `);
        // } else {
        //     tpl = data[0].map(respuesta=>`
        //   <h2 class="terminado-msg">${respuesta.code_msg}</h2>
        //   <div class="emojis-msg">
        //     <img src="./assets/img/FX001_1.png" alt="No Guardado">
        //   </div>
        //   `);
        // }

        // divResp.innerHTML = tpl;
        // divResp.style.display = 'block';
        // inputData.value = '';
    })
    .catch(function(err){
        console.log(err);
    })

}