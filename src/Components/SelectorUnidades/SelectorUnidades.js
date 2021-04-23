import React from 'react'
import {connect} from "react-redux"
import { cambiarUnidades } from "../../Redux/actionCreators"

const SelectorUnidades = ({units,cambiarUnidades}) => {

    const handleUnidades=(e)=>{
        cambiarUnidades(e.target.value)
    }
    
    return (
        <div className="d-flex justify-content-end">
            <button 
                type="button" 
                disabled={units==="celsius"}
                className={`btn-unit ${units==="celsius"?"activo":null}`} 
                onClick={handleUnidades} 
                value="celsius">°C</button>
            <button 
                type="button" 
                disabled={units!=="celsius"}
                className={`btn-unit ${units!=="celsius"?"activo":null}`} 
                onClick={handleUnidades} 
                value="fahrenheit">°F</button>
        </div>
    )
}


const mapStateToProps=(state)=>(
    {
        units:state.units,
    }
)
const mapDispatchToProps=(dispatch)=>(
    {
        cambiarUnidades(unit){
            dispatch(cambiarUnidades(unit))
        }
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(SelectorUnidades)
