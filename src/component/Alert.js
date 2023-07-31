import React, { useContext } from 'react'
import AlertContext from '../context/Alert/AlertContext';

export default function Alert(s) {
    const Context = useContext(AlertContext);
    const { alert } = Context;

    let capatalize = (message) => {
        return message.charAt(0).toUpperCase() + message.slice(1)
    }
    return (
        alert && <div style={{ position: "absolute", top: 0, left: "38%", transition: "ease-in-out 5s" }} className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capatalize(alert.type)} : </strong>{alert.message}
        </div>
    )
}
