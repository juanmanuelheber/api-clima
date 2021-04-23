import React from 'react'
import { Row, Col } from "react-bootstrap"
import "./error.css"

const DatosError = () => {
    return (
        <div className="text-center text-light w-100 mh-50">
            <Row>
                <Col xs={12} className="centrado">
                    <div>
                        <img className="logo-error" src={`/static/media/error.svg`} alt="Clima"/>
                        <p className="my-3 text-center font-weight-bold">Ups! Parece que la ciudad que buscás no aparece...</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DatosError
