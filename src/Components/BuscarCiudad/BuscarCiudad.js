import React,{useState} from 'react'
import { Form, Button, Row, Col } from "react-bootstrap"
import { cargandoData, fetchData, mostrarError } from '../../Redux/actionCreators'
import {connect} from "react-redux"
import axios from "axios"

const BuscarCiudad = ({cargandoDataLoader,cargarData,cargarError,data}) => {
    const [ciudad,setCiudad]=useState("Buenos Aires")

    const handleChange=(e)=>{
        setCiudad(e.target.value)
    }

    const getData=(ciudad="Buenos Aires")=>{
        axios.get(`${process.env.REACT_APP_API_KEY}&q=${ciudad}`)
            .then(response=>{cargarData(response.data)})
            .catch(error=>cargarError(error.message))
    } 

    return (
        <>
            {data.length===0?getData():null}
            <Row className="centrado">
                <Col xs={12} sm={6} md={12} lg={8}>
                    <Form className="centrado py-3 m-auto">
                        <Form.Control type="text" placeholder="Ciudad..." onChange={handleChange}/>
                        <Button 
                            variant="primary" 
                            type="button" 
                            onClick={()=>{
                                cargandoDataLoader()
                                getData(ciudad)
                            }}>
                            Cargar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
    
}

const mapStateToProps=(state)=>(
    {
        data:state.data,
    }
)
const mapDispatchToProps=(dispatch)=>(
    {
        cargarData(ciudad){
            dispatch(fetchData(ciudad))
        },
        cargandoDataLoader(){
            dispatch(cargandoData())
        },
        cargarError(error){
            dispatch(mostrarError(error))
        },
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(BuscarCiudad)
