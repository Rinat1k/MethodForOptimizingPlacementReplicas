function editGraphModalWindowHandler()
{
    let modalWindow = document.getElementsByClassName("editGraphModalWindow");
    if (modalWindow[0].style.display=="none")
    {
        modalWindow[0].style.display = "block";
    }
    else 
    {
        modalWindow[0].style.display="none";
    }
    
}