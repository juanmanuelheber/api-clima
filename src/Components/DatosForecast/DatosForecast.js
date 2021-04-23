import React from 'react'
import "./forecast.css"

const DatosForecast = ({fecha,max,min,icono}) => {
    return (
        <div className="text-center text-light forecast">
            <p className="m-0">{fecha}</p>
            <img src={`/static/media/${icono}.svg`} alt="Clima" className="w-50"/>
            <p className="h4">{max}</p>
            <p className="h6">{min}</p>
        </div>
    )
}

export default DatosForecast
