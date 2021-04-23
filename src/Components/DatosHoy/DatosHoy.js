import React from 'react'
import { Row, Col } from "react-bootstrap"
import "./hoy.css"

const DatosHoy = ({max,min,clima,icono,presion,humedad,viento,units}) => {
    return (
        <div className="text-center text-light w-100 mh-50">
            <Row>
                <Col xs={6} md={4} className="centrado">
                    <div>
                        <img className="clima-hoy" src={`/static/media/${icono}.svg`} alt="Clima"/>
                        <p className="text-capitalize text-center font-weight-bold">{clima}</p>
                    </div>
                </Col>
                <Col xs={6} md={4} className="centrado">
                    <div>
                        <p className="h2">{max}{units==="celsius"?"°C":"°F"}</p>
                        <p className="h5">{min}{units==="celsius"?"°C":"°F"}</p>
                    </div>
                </Col>
                <Col xs={12} md={4} className="centrado justify-content-end">
                    <div className="my-2 w-100">
                        <p className="my-1 text-nowrap extra">Viento: {viento}{units==="celsius"?"kmh":"mph"}</p>
                        <p className="my-1 text-nowrap extra">Presión: {presion}hPa</p>
                        <p className="my-1 text-nowrap extra">Humedad: {humedad}%</p>
                    </div>
                </Col>
            </Row>
           
            
        </div>
    )
}

export default DatosHoy
