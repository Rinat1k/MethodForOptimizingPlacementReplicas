var network,edges,nodes,resultPlacement;

class Node
{
    constructor(id,lambdaE,lambdaU,costS,costE,costU)
    {
        this.id = id;
        this.label = id.toString();//this.getLabel();
        this.lambdaE=lambdaE;
        this.lambdaU=lambdaU;
        this.costS=costS;
        this.costE=costE;
        this.costU=costU;
        this.vn=0;
  
        //визуальные свойства
        this.color={background: "#199be5", border:"black"};
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
        this.label="id:"+id+" cost:"+cost;
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
  document.getElementById("nodeParameters").style = "pointer-events: auto;";
  let countNumbers = document.getElementById("countNodes").value;
  var container = document.getElementById("network");
 
  nodes = new vis.DataSet();
  edges = new vis.DataSet();

  for(let i=0;i<countNumbers;i++)
  {
     nodes.add(new Node(i+1,getRandomArbitrary(0,100),getRandomArbitrary(0,100),getRandomArbitrary(0,100),getRandomArbitrary(0,100),getRandomArbitrary(0,100)))
  }

  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    interaction: { hover: true },
    //physics: false,
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
    let edgeId=document.getElementById("edgeId").value;
    let edgeCost=document.getElementById("edgeCost").value;

    let edgeFrom=document.getElementById("edgeFrom").value;
    let edgeTo=document.getElementById("edgeTo").value;
    
    if (graphElementIsExist(nodes,edgeFrom)&&graphElementIsExist(nodes,edgeTo))
    {
      try
      {
        edges.add(new Edge(edgeId,edgeCost,edgeFrom,edgeTo));
      } 
      catch (err)
      {
        alert(err);
      }
    }
}

//Функция изменения ребра
function updateEdge()
{
  let edgeId = document.getElementById("edgeId").value;
  if (graphElementIsExist(edges,edgeId))
  {
    let edgeFrom = document.getElementById("edgeFrom").value;
    let edgeTo = document.getElementById("edgeTo").value;
    let edgeCost = document.getElementById("edgeCost").value;
  
    let updateEdge = new Edge(edgeId,edgeCost,edgeFrom,edgeTo);
    try {
      edges.update(updateEdge);
    } 
    catch (err)
    {
      alert(err);
    }
  }
}

//Функция удаления ребра
function removeEdge()
{
  let edgeId = document.getElementById("edgeId").value;
  if (graphElementIsExist(edges,edgeId))
  {
    try
    {
      edges.remove({ id:edgeId });
    } 
    catch (err)
    {
      alert(err);
    }
  }
}

//Функция вывода таблицы критериев
function showNodeParameters(id,lambdaE,lambdaU,costS,costE,costU,vn)
{
    document.getElementById("inputId").value = id;
    document.getElementById("inputLambdaE").value=lambdaE;
    document.getElementById("inputLambdaU").value=lambdaU;
    document.getElementById("inputCostS").value=costS;
    document.getElementById("inputCostE").value=costE;
    document.getElementById("inputCostU").value=costU;
    document.getElementById("inputVn").value=vn;
    return;
}

//Функция добавления узла
function addNode()
{
    let nodeId = parseInt(document.getElementById("nodeId").value);
    try 
    {
      nodes.add(new Node(nodeId,0,0,0,0,0));
    } 
    catch (err)
    {
      alert(err);
    }
}

//Функция удаления узла
function removeNode()
{
  let nodeId =parseInt(document.getElementById("nodeId").value);
  if (graphElementIsExist(nodes,nodeId))
  {
    try
    {
      nodes.remove({id: nodeId});
    } 
    catch (err)
    {
      alert(err);
    }
  }
}

//Функция изменения характеристик узла
function updateNode()
{
    let actualData = Array.from(document.getElementsByClassName("criterialTable"));
    let id = parseInt(actualData[0].value);
    let lambdaE= parseInt(actualData[1].value);
    let lambdaU=parseInt(actualData[2].value);
    let costS=parseInt(actualData[3].value);
    let costE=parseInt(actualData[4].value);
    let costU=parseInt(actualData[5].value);
    //let updateNode = new Node(id,lambdaE,lambdaU,costS,costE,costU);
    try
    {
       for (let i=0;i<nodes.length;i++)
       {
          if  (nodes.get()[i].id==id)
          {
            nodes.get()[i].lambdaE=lambdaE;
            nodes.get()[i].lambdaU=lambdaU;
            nodes.get()[i].costS=costS;
            nodes.get()[i].costE=costE;
            nodes.get()[i].costU=costU;
          }  
       }
    } 
    catch (err)
    {
       alert(err);
    }
    updateVnInNodes();
}

//Функция проверки на существование узла или ребра
function graphElementIsExist(graphElement,id)
{
    if (graphElement.get().map(element=>element.id==id).find(element=>element==true)==undefined)
    {
      alert("Eror: Node with id "+id+" doesn't exist");
      return false;
    }
    else
    {
      return true;
    }
}

//Функция создания матрицы смежности на основе построенного графа
function getAdjacencyMatrix()
{
    let adjacencyMatrix = createArray(nodes.length,nodes.length)
    for(let i=0;i<edges.length;i++)
    {
        adjacencyMatrix[edges.get()[i].from-1][edges.get()[i].to-1] = parseInt(edges.get()[i].label.split(" ")[1].split(":")[1]);
        adjacencyMatrix[edges.get()[i].to-1][edges.get()[i].from-1] = parseInt(edges.get()[i].label.split(" ")[1].split(":")[1]);
    }
    for(let i=0;i<nodes.length;i++)
    {
      for(let j=0;j<nodes.length;j++)
      {
        if (adjacencyMatrix[i][j]==undefined)
        {
            adjacencyMatrix[i][j]=Infinity;
        }
        if (i==j)
        {
          adjacencyMatrix[i][j]=0;
        }
      }
    }
    return adjacencyMatrix;
}

//Функция, возвращающая матрицу кратчайших путей вершин (на основе алгоритма Флойда-Уоршела)
function getMinDist()
{
  let adjacencyMatrix=Array.from(getAdjacencyMatrix());
  let size = nodes.length;
  for (let k = 0; k < size; k++)
  {
    for (let i = 0; i < size; i++)
    {
      for (let j = 0; j < size; j++)
      {
        if (adjacencyMatrix[i][j] > adjacencyMatrix[i][k] + adjacencyMatrix[k][j])
        {
            adjacencyMatrix[i][j] = adjacencyMatrix[i][k] + adjacencyMatrix[k][j];
        }
      }
    }
  }
  return adjacencyMatrix;
}

//Функция создания n-мерного маассива
function createArray(length)
{
  var arr = new Array(length || 0),i = length;
  if (arguments.length > 1)
  {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }
  return arr;
}

//Реализация эвристического метода поиска узлов, на которых оптимально распологать реплики
function getOptimalNodes()
{
  let summ;
  let maxDelta=0;
  let delta;
  let xp=[];
  let tmpXpi;
  let p = parseInt(document.getElementById("pInput").value); //Количество медиан, то есть нужное количество узлов для реплик
  for (let i=0;i<p;i++)
  {
    xp.push(nodes.get()[i]);
  } //предполагаемое множество узлов с репликами
  let x=getX(xp); //множество {X/Xp} 
  let maxDeltaIndex=undefined;
  let testedNodes = [];

  for(let i=0;i<x.length;i++)
  {
    if (testedNodes.indexOf(x[i].id,0)!=-1) continue;
    maxDeltaIndex=undefined;
    for (let j=0;j<xp.length;j++)
    {
      tmpXpi=Array.from(xp);
      tmpXpi[j]=x[i];
      delta = getFxp(getSigmaXp(x,xp),getCostXp(x,xp))-getFxp(getSigmaXp(x,tmpXpi),getCostXp(x,tmpXpi));
      if (delta>maxDelta)
      {
        maxDeltaIndex=j;
        maxDelta=delta;
      }
    }
    testedNodes.push(x[i].id);
    if (maxDeltaIndex!=undefined)
    {
      xp[maxDeltaIndex]=x[i];
      testedNodes.push(xp[maxDeltaIndex].id);
      x=getX(xp);
      i=0;
    }
  }
  showResult(xp,getFxp(getSigmaXp(x,xp),getCostXp(x,xp)),getCostXp(x,xp),
             xp.map(node=>summ+=parseInt(node.costS), summ=0).reverse()[0],
             xp.map(node=>summ+=parseInt(node.costE), summ=0).reverse()[0],
             xp.map(node=>summ+=parseInt(node.costU), summ=0).reverse()[0]);
  resultPlacement = placementReplicOnNodes(xp);
}

//Функция расчёта суммы затрат на обмен информацией между узлами
function getSigmaXp(x,xp)
{
  let sigma=0;
  let trasferCost = parseInt(document.getElementById("transferCost").value);
  let minDistMatrix = getMinDist();
  for(let i=0;i<xp.length;i++)
  {
    for (let j=0;j<x.length;j++)
    {
       sigma+=x[j].vn*trasferCost*minDistMatrix[parseInt(xp[i].id)-1][parseInt(x[j].id)-1];
    }
  }
  return sigma;
}

//Функция расчёта стоимости функционаривания РСОД за единицу времени
function getCostXp(x,xp)
{
  let summ;
  let costSSumm = xp.map(node=>summ+=parseInt(node.costS), summ=0).reverse()[0];
  let costESumm = xp.map(node=>summ+=parseInt(node.costE), summ=0).reverse()[0];
  let costUSumm = xp.map(node=>summ+=parseInt(node.costU), summ=0).reverse()[0];
  let lambdaESumm = x.map(node=>summ+=parseInt(node.lambdaE), summ=0).reverse()[0];
  let lambdaUSumm = x.map(node=>summ+=parseInt(node.lambdaU), summ=0).reverse()[0];
  return (costSSumm+(costESumm*lambdaESumm)+(costUSumm*lambdaUSumm));
}


//Функция считающая функционал (значение целевой функции)
function getFxp(sigmaXp,costXp)
{
  return sigmaXp+costXp;
}

//Функция возвращающая массив вершин, которые не входят в массив преполагаемых серверов реплик
function getX(xp)
{
  let x =[];
  for (let i=0;i<nodes.length;i++)
  {
    let flag=1;
    for (let j=0;j<xp.length;j++)
    {
      if (nodes.get()[i].id==xp[j].id) flag=0;
    }
    if (flag==1)
    { 
      x.push(nodes.get()[i]);
    }
  }
  return x;
}

//Функция обновления значения vn
function updateVnInNodes()
{
  let de=document.getElementById("deInput").value;
  let du=document.getElementById("duInput").value;
  let p = document.getElementById("pInput").value;

  for (let i=0;i<nodes.length;i++)
  {
    nodes.get()[i].vn= nodes.get()[i].lambdaE*de+p*nodes.get()[i].lambdaU*du;
  }
}

//Функция установки значений в таблицу результатов
function showResult(xp,Fxp,sigma,costS,costE,costU)
{ 
  let tmpXp = "[";
  for (let i=0;i<xp.length;i++)
  {
    tmpXp+=xp[i].id + " ";
  }
  tmpXp+="]";
  document.getElementById("tdXp").innerText=tmpXp;
  document.getElementById("tdFxp").innerText=Fxp;
  document.getElementById("tdSigmaXp").innerText=sigma;
  document.getElementById("tdCostS").innerText=costS;
  document.getElementById("tdCostE").innerText=costE;
  document.getElementById("tdCostU").innerText=costU;
}


//Функция обновления рисунка графа
function graphRefresh()
{
  var container = document.getElementById("network");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    interaction: { hover: true },
    //physics: false,
  };
  network = new vis.Network(container, data, options);
} 

//Функция размещения реплик по узлам
function placementReplicOnNodes(xp)
{
  let fileNumbers = parseInt(document.getElementById("fileNumbersInput").value);
  let resultPlacement=createMatrix(xp.length,fileNumbers);
  for (let i=0;i<resultPlacement.length;i++)
  {
    for(let j=0;j<resultPlacement[i].length;j++)
    {
      resultPlacement[i][j]=xp[getRandomArbitrary(0,xp.length)].id;
    }
  }
  return resultPlacement;
}

//Функция обработки таблицы вывода распределения файлов
function resultPlacementHandler()
{
  let replicasNumbers=3;
  if (document.getElementById("fileIndex").value>resultPlacement.length||document.getElementById("fileIndex").value<0)
  {
    for (let i =0;i<replicasNumbers;i++)
    {
      document.getElementById("tdRepl"+(i+1)+"Location").innerHTML="-";
    }
  }
  for (let i =0;i<replicasNumbers;i++)
  {
    document.getElementById("tdRepl"+(i+1)+"Location").innerHTML = resultPlacement[document.getElementById("fileIndex").value-1][i];
  }
}

//Функция создания массива A=[MxN]
function createMatrix(m, n)
{
  var result = []
  for(var i = 0; i < n; i++) {
      result.push(new Array(m).fill(0))
  }
  return result
}