import React from 'react'
import "../ProtectedAuth/ProtectedAuth.module.css"
import { Navigate } from 'react-router-dom'
export default function ProtectedAuth(props) {
  
  if(localStorage.getItem("UserToken")){
    return <Navigate to="/"></Navigate>
  }else{
    return props.children
  }
}
