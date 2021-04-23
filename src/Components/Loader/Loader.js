import React from 'react'
import {Container,Row,Col} from "react-bootstrap"
import "./loader.css"

const Loader = () => {
    return (
        <>
            <Container className="centrado h-100">
                <Row>
                    <Col>
                        <img className="spiner" src={`/static/media/01d.svg`} alt="Cargando" />
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default Loader
