import axios from 'axios'

export const register = newUser => {
    return axios
        .post("http://127.0.0.1:5000/users/register", {
            usuario: newUser.usuario,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered")
        })
}

export const login = user => {
    return axios
        .post("http://127.0.0.1:5000/users/login", {
            usuario: user.usuario,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const hist = newHist => {
    return axios
        .post("http://127.0.0.1:5000/hist", {
            userid: newHist.userid,
            titulo: newHist.titulo,
            descripcion: newHist.descripcion,
            valvar: newHist.valvar,
            nombrevar: newHist.nombrevar,
            firstnode: newHist.firstnode
        })
        .then(response => {
            console.log("Nueva historia")
        })
        .catch(err => {
            console.log(err)
        })
}

export const newCuad = newCuadro => {
    return axios
        .post("http://127.0.0.1:5000/cuadro", {
            histid: newCuad.histid,
            fathernode: newCuad.text,
            text: newCuad.text,
            KeyVals: newCuad.KeyVals,
            DecisionVals: newCuad.DecisionVals,
        })
        .then(response => {
            console.log("Nuevo cuadro")
        })
        .catch(err => {
            console.log(err)
        })
}

export const getCuad = getCuadro => {
    return axios
        .get(`http://127.0.0.1:5000/cuadro`, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push([val._id, val.histid, val.fathernode, val.text, val.KeyVals, val.DecisionVals])
            })

            return data
        })
        .catch(err => {
            console.log(err)
        })
}
