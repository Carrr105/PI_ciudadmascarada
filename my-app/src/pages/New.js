import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {useLocation} from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
  <Button id="tres" onClick={() => {
        swals3();
    } } key="three">Decision3</Button>,
];
    const location = useLocation();
    const [title, setTitle] = useState("")
    const { quill, quillRef } = useQuill({
            modules: {
            toolbar: toolbar
        }
    })

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
    return (
        <>
        <div style={{marginLeft: 500, marginTop:50, marginRight:20 }} >
            <h1 >Nuevo Capitulo</h1>
            <form >
                <label htmlFor="title" style={{ marginTop:20}} >Título del Capítulo</label>
                <div  style={{ marginRight:0, paddingRight:700, display:"block"}} >
                <input type="text" placeholder="titulo" id="value" value={title} onChange={handleChange}  className="form-control" />
                </div>
                <div className="editor" style={{ marginTop:20, marginRight:700}}>
                    <div  style={{ paddingBottom:0}}ref={quillRef}></div>
                    <Button style= {{marginLeft:0, marginTop:10}} variant="contained">Nuevo Capitulo</Button>

                    <Button style= {{marginLeft:10, marginTop:10}} variant="contained">Capitulo Alterno</Button>
                    <ButtonGroup  style= {{marginLeft:188, marginTop:10}}color="secondary" aria-label="large secondary button group">
                    {buttons}
                    </ButtonGroup>

                </div>
                <button style={{ marginTop:20}} className="btn btn-outline-secondary">Guardar</button>

            </form>

        </div>

        </>
    )
}

export default New
