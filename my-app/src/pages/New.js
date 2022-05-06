import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {useLocation} from 'react-router-dom'
function New() {
    const location = useLocation();
    const [title, setTitle] = useState("")
    const { quill, quillRef } = useQuill({
            modules: {
            toolbar: toolbar
        }
    })

    const handleChange = (event) => {
        setTitle(event.target.value)
        console.log(location.state)
    }
    return (
        <>
            <h1>Nuevo Capitulo</h1>
            <form>
                <label htmlFor="title">Titulo del Capitulo</label>
                <input type="text" placeholder="titulo" id="value" value={title} onChange={handleChange} />
                <div className="editor">
                    <div ref={quillRef}></div>
                </div>
                <button>Guardar</button>
            </form>
        </>
    )
}

export default New
