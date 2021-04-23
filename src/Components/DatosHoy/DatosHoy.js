import React from 'react'
import { Row, Col } from "react-bootstrap"
import "./hoy.css"

const DatosHoy = ({max,min,clima,icono,presion,humedad,viento}) => {
    return (
        <div className="text-center text-light w-100 mh-50">
            <Row>
                <Col xs={4} sm={4} className="centrado">
                    <div>
                        <img className="clima-hoy" src={`/static/media/${icono}.svg`} alt="Clima"/>
                        <p className="text-capitalize text-center font-weight-bold">{clima}</p>
                    </div>
                </Col>
                <Col xs={3} sm={4} className="centrado">
                    <div>
                        <p className="h2">{max}°C</p>
                        <p className="h5">{min}°C</p>
                    </div>
                </Col>
                <Col xs={5} sm={4} className="centrado justify-content-end">
                    <div className="text-right mr-2">
                        <p className="my-1 text-nowrap">Viento: {viento}km/h</p>
                        <p className="my-1 text-nowrap">Presión: {presion}HP</p>
                        <p className="my-1 text-nowrap">Humedad: {humedad}%</p>
                    </div>
                </Col>
            </Row>
           
            
        </div>
    )
}

export default DatosHoy
