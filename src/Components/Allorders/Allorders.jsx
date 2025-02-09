
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Allorders() {
let navigate = useNavigate()
useEffect(()=>{
  navigate("/")
},[])
  };