import { archivoFactura } from "./archivoFactura.js";
import { archivoPadron } from "./archivoPadron.js";
import { impPDF } from "./fpdfprinter.js";

const factura = document.querySelector('#factura');
const resFactura = document.querySelector('#respuesta-factura');
const padron = document.querySelector('#padron');
const resPadron = document.querySelector('#respuesta-padron');
const imprimir = document.querySelector('#printer');
const colonia = document.querySelector('#colonia');
const m_inicio = document.querySelector('#inicio');
const m_fin = document.querySelector('#fin');


imprimir.addEventListener('click', (e)=>{
    let ubicacion = colonia.value;
    let cant_inicio = m_inicio.value;
    let cant_fin = m_fin.value;
    impPDF(ubicacion, cant_inicio, cant_fin);
    // imprimirPDF($info);
})


padron.addEventListener('click', (e)=>{
    resPadron.style.display = 'none';
    
})

padron.addEventListener('change', (e)=>{
    archivoPadron(e, padron, resPadron)
})

factura.addEventListener('click', (e)=>{
    resFactura.style.display = 'none';
    
})

factura.addEventListener('change', (e)=>{
    archivoFactura(e, factura, resFactura);
})

