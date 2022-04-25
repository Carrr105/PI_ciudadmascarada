import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"

function New() {
    const [title, setTitle] = useState("")
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar
        }
    })

    const handleChange = (event) => {
        setTitle(event.target.value)
    }
    return (
        <>
            <h1>Nuevo Titulo</h1>
            <form>
                <label htmlFor="title">Titulo</label>
                <input type="text" placeholder="titulo" id="value" value={title} onChange={handleChange} />
                <div className="editor">
                    <div ref={quillRef}></div>
                </div>
                <button>Enviar</button>
            </form>
        </>
    )
}

export default New
