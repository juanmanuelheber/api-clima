import React from 'react'
import {Container,Row,Col} from "react-bootstrap"
import "./Home.css"
import Pronostico from '../Pronostico'
import BuscarCiudad from '../BuscarCiudad'

const Home = () => {

    return (
        <>
            <Container fluid id="container-home">
                <Row className="h-100 centrado">
                    <Col xs={12} md={5} lg={6}>
                        <BuscarCiudad />
                    </Col>
                    <Col xs={12} md={7} lg={6} className="pronostico">
                        <Pronostico />
                    </Col>
                </Row>
            </Container>    
        </>
    )
    
}

export default Home
