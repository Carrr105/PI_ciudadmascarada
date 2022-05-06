import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {getCuad, newCuad, hist} from  "../RutasFunciones"
import {Link, useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Reacts, {useEffect } from 'react';
import Button from '@mui/material/Button';
import * as React from 'react';
function Main() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  var lst = [];
  var x =1;


  useEffect(() => {
    getCuad().then(data=>{
      for (var i = 0; i < data.length; i++) {
        var item = {"text":data[i][3], "fathernode":data[i][1]};
        lst.push(item);
      }
      console.log(lst)
      const texto = document.getElementById("text");
      const descripcion = document.getElementById("desc");
      texto.innerHTML = lst[0].text;
      descripcion.innerHTML = lst[0].fathernode;
    })
  }, []);



  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const funcionx = () => {
    x++;
    console.log(x)
    if (5<x) {
      x = 0;
    }
    console.log(lst[x].text)
    const texto = document.getElementById("text");
    const descripcion = document.getElementById("desc");
    texto.innerHTML = lst[x].text;
    descripcion.innerHTML = lst[x].fathernode;
  };
  const funcionxs = () => {
    x--;
    console.log(x)
    if (x<0) {
      x = 0;
    }
    console.log(lst[x].text)
    const texto = document.getElementById("text");
    const descripcion = document.getElementById("desc");
    texto.innerHTML = lst[x].text;
    descripcion.innerHTML = lst[x].fathernode;
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
    console.log(serviceList)
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  const [title, setTitle] = useState("")
  const { quill, quillRef } = useQuill({
      modules: {
          toolbar: toolbar
      }
  })
  function handleChange(event) {
      setTitle(event.target.value)
  }


    return (
        <>

            <h1  className="text-center" style={{paddingTop:30}}>Titulo</h1>
            <h3 id="desc" class="text-center" style={{paddingTop:10}}>
            ola ola ola
            </h3>
            <div  id="text" class="text-center" style={{paddingTop:35, marginLeft:700, marginRight:700, marginBottom:100}}>

            <button onClick={() => {
                funcionx();
              //  window.location.assign("/new");
            } }>hola</button>
            </div>

            <div  style={{position:"fixed",left:0, bottom:0,width:2090,text_align:"center"}}>
            <BottomNavigation
            showLabels
            style={{backgroundColor:"#343a40"}}
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            >
            <Button  onClick={() => {
                  funcionxs();
              } } variant="contained"></Button>
            <BottomNavigationAction style={{color:"#54a9f7"}} label="Decision1" icon={<FiberManualRecordIcon />} />
            <BottomNavigationAction style={{color:"#54a9f7"}}  label="Decision2" icon={<FiberManualRecordIcon />} />
            <BottomNavigationAction style={{color:"#54a9f7"}}  label="Decision3" icon={<FiberManualRecordIcon />} />
             <Button   onClick={() => {
                   funcionx();
                 //  window.location.assign("/new");
               } } variant="contained">></Button>
            </BottomNavigation>
            </div>
        </>
    )
}

export default Main
