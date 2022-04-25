import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"

function NewStory() {

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
        
            <h1>Crea tu Historia</h1>  
                <label htmlFor="title">Titulo de la Historia</label>
                <input type="text" placeholder="Titulo" id="value" value={title} onChange={handleChange} /> <br />
                <form name="myForm" id="myForm" onsubmit="return validateForm()">
    <br/>
    
</form>

<button  name="BotonContinuar"
        onClick={() => {
          window.location.assign("/new");
        }}
      >
        Continuar
      </button>

      
      
        </>

        
        
    )

    
}



export default NewStory