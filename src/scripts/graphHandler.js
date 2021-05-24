var network,edges,nodes;
class Node
{
    constructor(id,lambdaE,lambdaU,costS,costE,costU,de,du)
    {
        this.id = id;
        this.label = id.toString();//this.getLabel();
        this.lambdaE=lambdaE;
        this.lambdaU=lambdaU;
        this.costS=costS;
        this.costE=costE;
        this.costU=costU;
        this.vn=this.getVn(de,du)
    }
    getVn(de,du)
    {
        return this.lambdaE*de+this.lambdaU*du;
    }
    getLabel()
    {
        return getRandomArbitrary(0,255)+"."+getRandomArbitrary(0,255)+"."+getRandomArbitrary(0,255)+"."+getRandomArbitrary(0,255);
    }
}
class Edge
{
    constructor(id,cost,from,to)
    {
        this.id=id;
        this.cost=cost;
        this.from=from;
        this.to=to;
    }
}

function getRandomArbitrary(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

//Функция создания графа
function drawNodes()
{
  let countNumbers = document.getElementById("countNodes").value;
  let de=document.getElementById("de").value;
  let du=document.getElementById("du").value;
  let transferCost = document.getElementById("transferCost").value;
  var container = document.getElementById("network");
 
  nodes = new vis.DataSet();
  edges = new vis.DataSet();

  for(let i=0;i<countNumbers;i++)
  {
     nodes.add(new Node(i+1,0,0,0,0,0,0,0))
  }

  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    interaction: { hover: true },
  };
  network = new vis.Network(container, data, options);
  
  network.on("selectNode",(params)=>
  {
      let currentNode = nodes.get(network.getNodeAt(params.pointer.DOM));
      showNodeParameters(currentNode.id,currentNode.lambdaE,currentNode.lambdaU,currentNode.costS,currentNode.costE,currentNode.costU,currentNode.vn);
  });
}

//Функция добавления ребра в граф
function addEdge()
{ 
    console.log(network);
    let edgeId=document.getElementById("edgeId").value;
    let edgeCost=document.getElementById("edgeCost").value;
    let edgeFrom=document.getElementById("edgeFrom").value;
    let edgeTo=document.getElementById("edgeTo").value;
    try
    {
      edges.add(new Edge(edgeId,edgeCost,edgeFrom,edgeTo));
    } 
    catch (err)
    {
      console.log(err);
    }
}

//Функция изменения ребра
function updateEdge()
{
  try {
    edges.update({
      id: document.getElementById("edgeId").value,
      from: document.getElementById("edgeFrom").value,
      to: document.getElementById("edgeTo").value,
    });
  } 
  catch (err)
  {
    console.log(err);
  }
}

//Функция удаления ребра
function removeEdge()
 {
  try
  {
    edges.remove({ id: document.getElementById("edgeId").value });
  } 
  catch (err)
  {
    console.log(err);
  }
}

//Функция вывода таблицы критериев
function showNodeParameters(id,lambdaE,lambdaU,costS,costE,costU,vn)
{
 let table = document.createElement("div");
 table.innerHTML = '<table class="table" id="nodeParameters">'+
 ' <tbody>'+
  '<tr>'+
      '<td>Критерий</td>'+
      '<td>Значение</td>'+
  '</tr>'+
  '<tr>'+
      '<td>Id</td>'+
      '<td><input type="number" value='+id+'></td>'+
 ' </tr>'+
  '<tr>'+
      '<td>λ<sup>e</sup><sub>n</sub></td>'+
      '<td><input type="number" value='+lambdaE+'></td>'+
  '</tr>'+
  '<tr>'+
      '<td>λ<sup>u</sup><sub>n</sub></td>'+
      '<td><input type="number" value='+lambdaU+'></td>'+
  '</tr>'+
  '<tr>'+
      '<td>cost_S</td>'+
      '<td><input type="number" value='+costS+'></td>'+
  '</tr>'+
  '<tr>'+
      '<td>cost_E</td>'+
      '<td><input type="number" value='+costE+'></td>'+
  '</tr>'+
  '<tr>'+
      '<td>cost_U</td>'+
      '<td><input type="number" value='+costU+'></td>'+
  '</tr>'+
  '<tr>'+
      '<td>v<sub>n</sub></td>'+
     ' <td>'+vn+'</td>'+
  '</tr>'+
'</tbody>'+
'</table>';
document.getElementsByClassName("nodeParameters")[0].appendChild(table);
}
