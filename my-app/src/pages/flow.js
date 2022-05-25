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
import dagre from 'dagre'

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

  function custompositionX(nodessamelevel, i){
    return i*(1000/(nodessamelevel));
  }

  function custompositionY(level){
    return (level)*100;
  }

  useEffect(() => {
    var lst=[]
    getCuadsID(localStorage.getItem("histid")).then(data =>{
      console.log(localStorage.getItem("histid"))
      console.log("sss")
      var nodos = [];
      var arcos = [];
      var samelevelX;
      var icountX;
      var levelcountY;
      icountX=1;
      levelcountY = 1;
      samelevelX = 1;
      for (var i = 0; i < data.length; i++) {
        if (i == 0) {
          var nodo = {
            id: data[i].id,
            type: 'input',
            data: { label: data[i].titulo },
            position: { x: 0, y: custompositionY(levelcountY) },
          }
          levelcountY++;
        } else {
            if (data[i].fathernode != data[i-1].fathernode){
              levelcountY++;
              icountX=0;
              samelevelX=0;
              for (var j = i; j < data.length; j++){
                if (data[j].fathernode == data[i].fathernode){
                  samelevelX++;
                }
              }
            }
            else{
              icountX++;
            }
          
          var nodo = {
          id: data[i].id,
          data: { label: data[i].titulo },
          position: { x: custompositionX(samelevelX, icountX), y: custompositionY(levelcountY) },
        }
      }
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