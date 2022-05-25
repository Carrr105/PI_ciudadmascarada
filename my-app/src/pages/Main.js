import { useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'react-flow-renderer';
import {getCuad} from  "../RutasFunciones"
function Main() {
var noditos = [];
var arquitos = [];

function custompositionX(nodessamelevel, i){
  return i*(1000/(nodessamelevel+1));
}

function custompositionY(level){
  return (level-1)*100;
}

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
  getCuad().then(data =>{
    console.log(data)
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

      var arco = { id: String(i)+"-"+String(i+1), source: dataa[i].id, target:dataa[i].fathernode }
      arquitos.push(arco)
    }
   console.log(noditos)
   setNodes(noditos)
   setEdges(arquitos)
   console.log(arquitos)
  })

}, []);

  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: custompositionX(1,1), y: custompositionY(1) },
    },

    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: custompositionX(2,1), y: custompositionY(2) },
    },
    {
      id: '4',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: custompositionX(2,2), y: custompositionY(2) },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: custompositionX(1,1), y: custompositionY(3) },
    },
  ];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ];
  const onDragOver = (event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [datos] = useState();
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    return (
        <>
          <ReactFlow  onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} style={{ height: 800 }} nodes={nodes} edges={edges} fitView />
          <button onClick={getcuadritos} style={{ marginTop:20}} className="btn btn-outline-secondary">Guardar</button>
        </>
    )
}

export default Main
