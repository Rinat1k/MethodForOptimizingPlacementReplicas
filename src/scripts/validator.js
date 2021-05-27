
//Функции валидации полей
//Валидация полей окна редактирования рёбр
function validateEditEdgeModalWindow()
{
     let inputFields = Array.from(document.getElementsByClassName("editEdgesField"));
     let result=  inputFields.map((element)=>{
        return element.value>0;
     });
     if (result.find(element => element==false)!=undefined)
     {
        document.getElementById("addEdgeBtn").disabled=true;
        document.getElementById("removeEdgeBtn").disabled=true;
        document.getElementById("updateEdgeBtn").disabled=true;
     }
    else
     {  
        document.getElementById("addEdgeBtn").disabled=false;
        document.getElementById("removeEdgeBtn").disabled=false;
        document.getElementById("updateEdgeBtn").disabled=false;
     }
}

//Валидация полей окна редактирования узлов
function validateEditNodeModalWindow()
{
     let inputFields = Array.from(document.getElementsByClassName("editNodesField"));
     let result=  inputFields.map((element)=>{
        return element.value>0;
     });
     if (result.find(element => element==false)!=undefined)
     {
        document.getElementById("addNodeBtn").disabled=true;
        document.getElementById("removeNodeBtn").disabled=true;
     }
    else
     {  
        document.getElementById("addNodeBtn").disabled=false;
        document.getElementById("removeNodeBtn").disabled=false;
     }
}

//Валидация поля создания графа
function validateDrawNodesInput()
{
    if (document.getElementById("countNodes").value>0)
    {
       document.getElementById("createGraphBtn").disabled=false;
    }
    else
    {
      document.getElementById("createGraphBtn").disabled=true;  
    }
}