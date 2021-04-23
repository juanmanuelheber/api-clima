import React from 'react'
import {Container} from "react-bootstrap"
import "./Pronostico.css"
import {connect} from "react-redux"
import Loader from '../Loader'
import DatosHoy from '../DatosHoy'
import DatosForecast from '../DatosForecast'
import DatosError from '../DatosError'
import SelectorUnidades from "../SelectorUnidades"

const Pronostico = ({cargado,data,dias,max,min,clima,icono,presion,humedad,viento,error,units}) => {

    const fecha=(fecha)=>{
        const date=new Date(Date.parse(fecha)).getDay()
        switch (date) {
            case 1:
                return "LUN";
            case 2:
                return "MAR";
            case 3:
                return "MIE";
            case 4:
                return "JUE";
            case 5:
                return "VIE";
            case 6:
                return "SAB";
            default:
                return "DOM";
        }
    }
    
    return (
        <>
        <Container fluid className="contenido h-100 centrado flex-wrap">
            {error!==""
            ?<DatosError />
            :!cargado
                ?<Loader />
                :<>
                    <div className="w-100">
                        <div className="text-center text-light">
                            <p className="m-0 font-weight-bold">{data.city.name}, {data.city.country}</p>
                        </div>
                        <SelectorUnidades />
                    </div>
                    {dias.map((e,index)=>
                        index===0
                        ?
                        <DatosHoy key={e} max={max[index]} min={min[index]} clima={clima[index]} icono={icono[index]} units={units} presion={presion} humedad={humedad} viento={viento}/>
                        :
                        <DatosForecast key={e} fecha={fecha(e)} max={max[index]} min={min[index]} icono={icono[index]} units={units}/>
                    )}
                    </>
            }
            
            </Container>
        </>
    )
}


const mapStateToProps=(state)=>(
    {
        cargado:state.cargado,
        data:state.data,
        dias:state.dias,
        max:state.tempMax,
        min:state.tempMin,
        clima:state.clima,
        icono:state.climaCodigo,
        presion:state.presion,
        viento:state.viento,
        humedad:state.humedad,
        error:state.error,
        units:state.units,
    }
)
const mapDispatchToProps=()=>(
    {}
)

export default connect(mapStateToProps,mapDispatchToProps)(Pronostico)
