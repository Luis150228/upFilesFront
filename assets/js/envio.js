import { archivoFactura } from "./archivoFactura.js";
import { archivoPadron } from "./archivoPadron.js";

const factura = document.querySelector('#factura');
const resFactura = document.querySelector('#respuesta-factura');
const padron = document.querySelector('#padron');
const resPadron = document.querySelector('#respuesta-padron');



factura.addEventListener('click', (e)=>{
    resFactura.style.display = 'none';
    
})

padron.addEventListener('click', (e)=>{
    resPadron.style.display = 'none';
    
})

factura.addEventListener('change', (e)=>{
    archivoFactura(e, factura, resFactura);
})

padron.addEventListener('change', (e)=>{
    archivoPadron(e, padron, resPadron)
})
