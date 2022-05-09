import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {Link, useLocation} from 'react-router-dom'
import {getCuad, newCuad, hist, getHist, getCuadsID} from  "../RutasFunciones"
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
    const [capitulos, setCapitulos] = useState("")
    const { quill, quillRef } = useQuill({
            modules: {
            toolbar: toolbar
        }
    })
    useEffect(() => {
      console.log(lst)
      handleChangeC(localStorage.getItem("editar"))
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
        console.log(location.state)
    }
    var ss = []
    function handleChangeC (p){
        setCapitulos(p)
        ss = p;
        console.log(p)
    }
    const vdf = [1,2,3,4]
    return (
        <>
        <div style={{marginLeft: 0, marginTop:50, marginRight:0 }} >
            <h1 >{localStorage.getItem("titulo")}</h1>
            <form >
                <label htmlFor="title" style={{ marginTop:20}} >Título del Capítulo</label>
                <div  style={{ marginRight:0, paddingRight:500, display:"block"}} >
                <input type="text" placeholder="titulo" id="value" value={title}  className="form-control" />
                </div>
                <div className="editor" style={{ marginTop:20, marginRight:100}}>
                    <div  style={{ paddingBottom:0}}ref={quillRef}></div>
                    <Button style= {{marginLeft:0, marginTop:10}} variant="contained">Nuevo Capitulo</Button>

                    <Button style= {{marginLeft:10, marginTop:10}} variant="contained">Capitulo Alterno</Button>
                    <ButtonGroup  style= {{marginLeft:210, marginTop:10}}color="secondary" aria-label="large secondary button group">
                    {buttons}
                    </ButtonGroup>

                </div>
                <button style={{ marginTop:20}} className="btn btn-outline-secondary">Guardar</button>

            </form>

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

                <ul className="list-group">
                  {  localStorage.getItem("editar").split(',').map((capitulo) => (
                      <li
                        className={
                          "list-group-item "
                        }
                    //    onClick={() => this.setActiveTutorial(tutorial, index)}
                      >
                        {capitulo }
                      </li>
                    ))}
                </ul>

                <button
                  className="m-3 btn btn-sm btn-danger"
                >
                  Remover
                </button>
              </div>


              </div>


        </div>

        </>
    )
}

export default New
