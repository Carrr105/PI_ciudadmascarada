import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {getCuad, newCuad, hist} from  "../RutasFunciones"
import {Link, useNavigate} from 'react-router-dom'
function NewStory() {
    const navigate = useNavigate();



    var lst = {};
    const [serviceList, setServiceList] = useState([{ service: "" }]);
    var olawas = 1234567;
    const funcionx = (index) => {
      var vars = [];
      var arr = []
      console.log(vars)
      for (var i = 0; i < serviceList.length; i++) {
        vars.push(serviceList[i]["service"]);
        console.log(vars[i])
        arr[vars[i]] = 0
      }
      var items = {
        "titulo" : title,
        "userid" :  "itwjeirojt45345t354kt345kl45jtkl453lkt345",
        "descripcion" :  "dummy[4]",
        "valvar" :  arr,
        "nombrevar" :  "serviceList",
        "firstnode" :  "d123123sfñdasflñsdafg123lñsdfglñsdfg"
      };
      console.log(items);
      lst = arr;
      navigate('/new',{state:lst});
      hist(items)
    };

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
        <><><>

          <div style={{paddingRight: 700,paddingLeft: 795,paddingTop: 20}}>
            <h1>Crea tu Historia</h1>
            <input  type="text" style={{PaddingRight: 500}} placeholder="Titulo" id="value" value={title} onChange={handleChange} className="form-control" /> <br />
            <form  style={{margin: "auto", paddingRight:600}} name="myForm" id="myForm" onsubmit="return validateForm()">
                <br />

            </form>
</div>

        </><form className="App" autoComplete="off">
                <div className="form-field " style={{marginTop: 10, paddingLeft: 795, paddingRight:700, display:""}}>
                     <h3>Variables</h3>
                    {serviceList.map((singleService, index) => (
                        <div key={index} className="input-group-append">
                            <div className="first-division">
                                <input
                                    name="service"
                                    type="text"
                                    id="service"
                                    style={{marginRight: 349, marginTop:20}}
                                    placeholder="Variable"
                                    value={singleService.service}
                                    className="form-control"
                                    onChange={(e) => handleServiceChange(e, index)}
                                    required />
                                {serviceList.length - 1 === index && serviceList.length < 10 && (
                                    <button
                                        type="button"
                                        style={{marginTop:21}}
                                        onClick={handleServiceAdd}
                                        className="btn btn-dark "
                                    >
                                        <span>Variables</span>
                                    </button>
                                )}
                            </div>
                            <div className="second-division">
                                {serviceList.length !== 1 && (
                                    <button
                                        type="button"
                                        style={{marginTop:21}}
                                        onClick={() => handleServiceRemove(index)}
                                        className="btn btn-danger "
                                    >
                                        <span>X</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </form></>
            <a style={{margin: 100, paddingLeft: 795,paddingBottom: 300, display:"inline"}}></a>
            <button name="BotonContinuar" className="btn btn-warning" style={{marginTop: 70}}
                onClick={() => {
                    funcionx();
                  //  window.location.assign("/new");
                } }
            >
                Continuar
            </button></>

    );

  }

export default NewStory
