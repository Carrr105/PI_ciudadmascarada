import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {Link, useLocation} from 'react-router-dom'
import {getCuad, newCuad, hist, getHist, getCuadsID, updateCuad} from  "../RutasFunciones"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Reacts, {useEffect } from 'react';
import Swal from 'sweetalert2'
import ButtonGroup from '@mui/material/ButtonGroup';


function New() {
  var buttons = [
  <Button id="uno" onClick={() => {
        swals1();
    } } key="one">Decision1</Button>,
  <Button id="dos" onClick={() => {
        swals2();
    } } key="two">Decision2</Button>,
  <Button id="tres" onClick={a } key="three">Decision3</Button>,
];
    const location = useLocation();
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [capitulos, setCapitulos] = useState([""])
    const [capitulo, setCapitulo] = useState([""])
    const { quill, quillRef } = useQuill({
            modules: {
            toolbar: toolbar
        }
    })

    function setActiveCapitulo(historia, index){
      setCindex(index)
      //setCapitulo(historia)
      console.log("-----------------")
      console.log(historia)
    }

    function nuevoCap(){
      console.log("nuevo cap")
      var histid = localStorage.getItem("histid")
      console.log("yo soy el nodo padre: "+ localStorage.getItem("firstnode"))
      var item = {
        "_id" : localStorage.getItem("firstnode"),
        histid: histid,
        titulo: title,
        fathernode: localStorage.getItem("fathernode"),
        text: quill.getText(),
        KeyVals: [],
        DecisionVals: []
      }
      updateCuad(item).then(data=>{
        localStorage.setItem("fathernode", localStorage.getItem("firstnode"))
        var items = {
          histid: histid,
          titulo: title,
          fathernode: localStorage.getItem("fathernode"),
          text:quill.getText(),
          KeyVals:[],
          DecisionVals:[]
        }
        newCuad(items).then(data=>{
          console.log("ahora yo soy el nuevo nodo padre: "+ data.result)
          localStorage.setItem("firstnode", data.result)

        })
      })
    //  window.location.reload()
    }

    function altCap(){
      console.log("nuevo cap alterno")
      var histid = localStorage.getItem("histid")
      console.log("yo soy el nodo padre: "+ localStorage.getItem("firstnode"))
      var item = {
        "_id" : localStorage.getItem("firstnode"),
        histid: histid,
        titulo: title,
        fathernode: localStorage.getItem("fathernode"),
        text: quill.getText(),
        KeyVals: [],
        DecisionVals: []
      }
      updateCuad(item).then(data=>{
        var items = {
          histid: histid,
          titulo: title,
          fathernode: localStorage.getItem("fathernode"),
          text:quill.getText(),
          KeyVals:[],
          DecisionVals:[]
        }
        newCuad(items).then(data=>{
          console.log("ahora yo soy el nuevo nodo padre: "+ data.result)
          localStorage.setItem("firstnode", data.result)

        })
      })
    //  window.location.reload()
    }
    const [isBusy, setBusy] = useState(true)
    const [cindex, setCindex] = useState(-1)
    useEffect( () => {
      console.log(localStorage.getItem("editar"))
      handleChangeC(localStorage.getItem("editar"))
      getCuadsID(localStorage.getItem("histid")).then(data =>{
        setCapitulos(data.slice(1))
        console.log(data)
        setBusy(false);
      })
    }, []);

    function a(){
      console.log(capitulos)
    }
var lst = localStorage.getItem("editar")
    const swals1 = (t) => {
      (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html:
          '<input id="swal-input2" class="swal2-input">'+ "<a>"+ "</a>"+
          '<select className="form-select" name="select">' +
          '<option value="Variable 1">Variable 1</option>'+
          '<option value="variable 2" selected>Variable2 2</option>'+
          '<option value="Variable 3">Variable 3</option>'+
          '</select>',
        focusConfirm: false,
        preConfirm: () => {
          return [

          ]
        }
      })

      if (formValues) {
        const uno = document.getElementById("uno");
        uno.innerHTML = document.getElementById('swal-input1').value;
      }

      })()
    }


    const swals2 = (t) => {
      (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html:
          '<input id="swal-input2" class="swal2-input">'+ "<a>"+ "</a>"+
          '<select className="form-select" name="select">' +
          '<option value="Variable 1">Variable 1</option>'+
          '<option id="dos" value="variable 2" selected>Variable2 2</option>'+
          '<option value="Variable 3">Variable 3</option>'+
          '</select>',
        focusConfirm: false,
        preConfirm: () => {
          return [

          ]
        }
      })

      if (formValues) {
        const dos = document.getElementById("dos");
        dos.innerHTML = document.getElementById('swal-input1').value;
      }

      })()
    }
    const swals3 = (t) => {
      (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html:
          '<input id="swal-input2" class="swal2-input">'+ "<a>"+ "</a>"+
          '<select className="form-select" name="select">' +
          '<option value="Variable 1">Variable 1</option>'+
          '<option value="variable 2" selected>Variable2 2</option>'+
          '<option value="Variable 3">Variable 3</option>'+
          '</select>',
        focusConfirm: false,
        preConfirm: () => {
          return [

          ]
        }
      })

      if (formValues) {
        const tres = document.getElementById("tres");
        tres.innerHTML = document.getElementById('swal-input1').value;
      }

      })()
    }


    const handleChange = (event) => {
        setTitle(event.target.value)
        console.log(title)
    }
    const handleChangeText = (event) => {
        setText(event.target.value)
        console.log(quillRef)
    }
    var ss = []
    function handleChangeC (p){
        setCapitulos(p)
        ss = p;
        console.log(p)
    }

    return (
        <>
        <div style={{marginLeft: 0, marginTop:50, marginRight:0 }} >
            <h1 >{localStorage.getItem("titulo")}</h1>
            <form >
                <label htmlFor="title" style={{ marginTop:20}} >Título del Capítulo</label>
                <div  style={{ marginRight:0, paddingRight:500, display:"block"}} >
                <input type="text" placeholder="titulo" id="value" onChange={handleChange}  className="form-control" />
                </div>
                <div className="editor"  onChange={handleChangeText} style={{ marginTop:20, marginRight:100}}>
                    <div style={{ paddingBottom:0}} onChange={handleChangeText} ref={quillRef}></div>
                    <Button onClick={nuevoCap} style= {{marginLeft:0, marginTop:10}} variant="contained">Nuevo Capitulo</Button>

                    <Button onClick={altCap} style= {{marginLeft:10, marginTop:10}} variant="contained">Capitulo Alterno</Button>
                    <ButtonGroup  style= {{marginLeft:210, marginTop:10}}color="secondary" aria-label="large secondary button group">
                    {buttons}
                    </ButtonGroup>

                </div>


            </form>
            <button style={{ marginTop:20}} className="btn btn-outline-secondary">Guardar</button>
            <div className="list row" style={{margin: "auto", width: 1500, padding: 100}}>
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Título"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6" style={{paddingRight: 10}}>
                <h4>Lista de capitulos</h4>
                { isBusy ? <div> esperando </div> :
                (<ul className="list-group">
                  {capitulos  ?   capitulos.map((capitulo,index) => (  <li onClick={() => setActiveCapitulo(capitulo, index)} key={index} className={ "list-group-item " + (index === cindex ? "active" : "")}  >{capitulo.titulo }  </li>  )) : [].map((capitulo) => (  <li  className={"list-group-item "}  >{capitulo.titulo }  </li>  ))}
                </ul>)
                }
              </div>


              </div>


        </div>

        </>
    )
}

export default New
