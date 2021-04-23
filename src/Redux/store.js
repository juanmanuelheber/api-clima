import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"
import { CARGAR_DATA,CARGANDO_DATA, MOSTRAR_ERROR, CAMBIAR_UNIDADES } from "./actions"
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
    units:"",
}

const masRepetido = ar => ar.reduce((acum, el) => {
    const count=ar.filter(e => e===el).length;
    return count > acum[1] ? el : acum;
}, ["", 0])

const getDateTime=(string)=>{
    return string.split(" ",2)
}

const convertirFahrenheit=(array)=>{
    return array.map(e=>Math.round(e*9/5+32))
}
const convertirCelsius=(array)=>{
    return array.map(e=>Math.round(5/9*(e-32)))
}
const convertirMillas=(vel)=>{
    return Math.round(vel/1.609*100)/100
}
const convertirKm=(vel)=>{
    return Math.round(vel*1.609*100)/100
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
                viento:Math.round(action.data.list[0].wind.speed*3.6*100)/100,
                units:"celsius",
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
        case CAMBIAR_UNIDADES:
            let gradosMin=[]
            let gradosMax=[]
            let viento=0
            if (action.units==="fahrenheit"){
                gradosMin=convertirFahrenheit(state.tempMin)
                gradosMax=convertirFahrenheit(state.tempMax)
                viento=convertirMillas(state.viento)
            }else{
                gradosMin=convertirCelsius(state.tempMin)
                gradosMax=convertirCelsius(state.tempMax)
                viento=convertirKm(state.viento)
            }
            return{
                ...state,
                units:action.units,
                tempMin:gradosMin,
                tempMax:gradosMax,
                viento:viento,
            }
        default:
            return state
    }
}

export default createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))