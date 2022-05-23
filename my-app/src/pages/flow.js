import { useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from 'react-flow-renderer';
import {getCuad, getCuadsID} from  "../RutasFunciones"
function Flow() {
var noditos = [];
var arquitos = [];

function getcuadritos(){
  var nodo =     {
        id: '4',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 150, y: 125 },
      }
initialNodes.push(nodo)
console.log(initialNodes)
}

useEffect(() => {
  var lst=[]
  getCuadsID(localStorage.getItem("histid")).then(data =>{
    console.log(localStorage.getItem("histid"))
    console.log("sss")
    var nodos = [];
    var arcos = [];
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        var nodo = {
          id: data[i].id,
          type: 'input',
          data: { label: data[i].titulo },
          position: { x: 250, y: 25 },
        }
      } else {
        var nodo = {
        id: data[i].id,
        data: { label: data[i].titulo },
        position: { x: 250, y: 25 },
      }}
      console.log(data[i])
      noditos.push(nodo)
    }
    var dataa = data.reverse()
    for (var i = 0; i < dataa.length; i++) {

      var arco = { id: String(i)+"-"+String(i+1), source: dataa[i].fathernode, target:dataa[i].id }
      arquitos.push(arco)
    }
   console.log(noditos)
   setNodes(noditos.reverse())
   setEdges(arquitos.reverse())
   console.log(arquitos)
  })

}, []);

  const initialNodes = [];
  const initialEdges = [];
  const onDragOver = (event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [datos] = useState();
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    return (
        <>

          <ReactFlow  onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} style={{ height: 1000, width:2000  }} nodes={nodes} edges={edges} fitView />

          <button onClick={getcuadritos} style={{ marginTop:20}} className="btn btn-outline-secondary">Guardar</button>
        </>
    )
}

export default Flow
