import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"
import { CARGAR_DATA,CARGANDO_DATA, MOSTRAR_ERROR } from "./actions"
import {composeWithDevTools} from "redux-devtools-extension"

const initialStore={
    data:[],
    cargado:false,
    dias:[],
    tempMax:[],
    tempMin:[],
    clima:[],
    climaCodigo:[],
    presion:"",
    humedad:"",
    viento:"",
    error:"",
}

const masRepetido = ar => ar.reduce((acum, el) => {
    const count=ar.filter(e => e===el).length;
    return count > acum[1] ? el : acum;
}, ["", 0])

const getDateTime=(string)=>{
    return string.split(" ",2)
}

const rootReducer = (state=initialStore,action) => {
    switch (action.type) {
        case CARGAR_DATA:
            const dias=action.data.list.map(d=>getDateTime(d.dt_txt)[0])
            const unicoDias=[]
            dias.forEach(dia=>(
                !unicoDias.includes(dia)?unicoDias.push(dia):null
            ))
            const maxTemp=[]
            const minTemp=[]
            const clima=[]
            const climaCodigo=[]
            unicoDias.forEach(dia=>{
                let max=-100;
                let min=100;
                const climaDia=[]
                const climaDiaCodigo=[]
                action.data.list.forEach(d=>{
                    if (d.dt_txt.includes(dia)){
                        if (d.main.temp_max>max) max=d.main.temp_max
                        if (d.main.temp_min<min) min=d.main.temp_min
                        climaDia.push(d.weather[0].description)
                        climaDiaCodigo.push(d.weather[0].icon)
                    }
                });
                maxTemp.push(Math.round(max));
                minTemp.push(Math.round(min));
                clima.push(masRepetido(climaDia))
                climaCodigo.push(masRepetido(climaDiaCodigo))
                }
            )
            return {
                ...state,
                data:action.data,
                cargado:true,
                dias:unicoDias,
                tempMax:maxTemp,
                tempMin:minTemp,
                clima:clima,
                climaCodigo:climaCodigo,
                presion:action.data.list[0].main.pressure,
                humedad:action.data.list[0].main.humidity,
                viento:action.data.list[0].wind.speed,
            } 
        case CARGANDO_DATA:
            return {
                ...state,
                error:"",
                cargado:false,
            } 
        case MOSTRAR_ERROR:
            return{
                ...state,
                error:action.error,
            }
        default:
            return state
    }
}

export default createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))