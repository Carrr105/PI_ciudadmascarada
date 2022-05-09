import React, { Component } from "react";
import {getCuad, newCuad, hist, getHist, getCuadsID} from  "../RutasFunciones"
import {Link, useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'


export default class StoriesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveStories = this.retrieveStories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllStories = this.removeAllStories.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Stories: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      id:"",
      usuario:"",
      reload:false
    };
  }




   refreshPage = () => {
     this.setState(
       {reload: true},
       () => this.setState({reload: false})
     )
   }
  componentDidMount() {
    this.retrieveStories();
    const token = localStorage.usertoken
    console.log(jwt_decode(token))
    const decoded = jwt_decode(token)

    this.setState({
        first_name: decoded.sub.usuario,
        email: decoded.sub.email
    })

  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveStories() {
    getHist().then(response => {
        this.setState({
          Stories: response
        });
      })
      .catch(e => {
        console.log(e);
      });

  }

  refreshList() {
    this.retrieveStories();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllStories() {

  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });


  }

  morir(event){
    var x = []
    getCuad().then(response => {

           for (var i = 0; i < response.length; i++) {
             x.push(response[i][2])
           }
           localStorage.setItem("editar",x)

           console.log(x)
           })
           .catch(e => {
             console.log(e);
           });

    localStorage.setItem("titulo",this.state.currentTutorial.titulo)
    localStorage.deleteItem("editar")
    console.log(localStorage.getItem("editar"))
    console.log(  localStorage.getItem("titulo"))

  }

  render() {
    const { searchTitle, Stories, currentTutorial, currentIndex } = this.state;

    return (

      <div className="list row" style={{margin: "auto", width: 1500, padding: 100}}>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Título"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6" style={{paddingRight: 10}}>
          <h4>Lista de historias</h4>

          <ul className="list-group">
            {Stories &&
              Stories.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.titulo}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllStories}
          >
            Remover
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Historia</h4>
              <div>
                <label>
                  <strong>Título:</strong>
                </label>{" "}
                {currentTutorial.titulo}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.descripcion}
              </div>
              <div>
              </div>

              <Link
                to={"/new"}
                onClick={this.morir.bind(this)}
                className="m-3 btn btn-sm btn-warning"
              >
                Editar
              </Link>
              <Link
                to={"/read"}
                className="m-3 btn btn-sm btn-success"
                style={{marginLeft:10}}
              >
                Leer
              </Link>
            </div>
          ) : (
            <div>
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
}
