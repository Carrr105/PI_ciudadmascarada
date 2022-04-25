import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"

function NewStory() {
    const [serviceList, setServiceList] = useState([{ service: "" }]);

    const handleServiceChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...serviceList];
      list[index][name] = value;
      setServiceList(list);
    };
  
    const handleServiceRemove = (index) => {
      const list = [...serviceList];
      list.splice(index, 1);
      setServiceList(list);
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
        <><><>

            <h1>Crea tu Historia</h1>
            <label htmlFor="title">Titulo de la Historia</label>
            <input type="text" placeholder="Titulo" id="value" value={title} onChange={handleChange} /> <br />
            <form name="myForm" id="myForm" onsubmit="return validateForm()">
                <br />

            </form>


        </><form className="App" autoComplete="off">
                <div className="form-field">
                    <label htmlFor="service">Variables</label>
                    {serviceList.map((singleService, index) => (
                        <div key={index} className="services">
                            <div className="first-division">
                                <input
                                    name="service"
                                    type="text"
                                    id="service"
                                    value={singleService.service}
                                    onChange={(e) => handleServiceChange(e, index)}
                                    required />
                                {serviceList.length - 1 === index && serviceList.length < 10 && (
                                    <button
                                        type="button"
                                        onClick={handleServiceAdd}
                                        className="add-btn"
                                    >
                                        <span>Agregar Variable</span>
                                    </button>
                                )}
                            </div>
                            <div className="second-division">
                                {serviceList.length !== 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleServiceRemove(index)}
                                        className="remove-btn"
                                    >
                                        <span>Borrar variable</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </form></><button name="BotonContinuar"
                onClick={() => {
                    window.location.assign("/new");
                } }
            >
                Continuar
            </button></>

    );
    
  }

export default NewStory