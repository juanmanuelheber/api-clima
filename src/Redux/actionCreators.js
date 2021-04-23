
import { CARGANDO_DATA, CARGAR_DATA, MOSTRAR_ERROR } from "./actions"

const fetchData=(data)=>({
    type:CARGAR_DATA,
    data
})

const cargandoData=()=>({
    type:CARGANDO_DATA,
})

const mostrarError=(error)=>({
    type:MOSTRAR_ERROR,
    error
})

export {fetchData,cargandoData,mostrarError}