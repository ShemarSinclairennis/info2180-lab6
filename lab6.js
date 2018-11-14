
window.onload = function(){

    const searchbutton =document.getElementById("searchb");
    const getAlldefinitionButton =document.getElementById("searchall");
    const result = document.getElementById("result");

    searchbutton.addEventListener("click",search);
    getAlldefinitionButton.addEventListener("click",getAllDefinition);
    
    function search()
    {
      getDefinition(document.getElementById('searchinput').value);
    }
    
    function getDefinition(str)
    {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function(){
        if (request.readyState == XMLHttpRequest.DONE){
          if (request.status == 200){
            single(this.responseText);
          }else{
            alert('There was a issue found with your request');
          }  
        }
      };
      request.open('GET', 'request.php?q=' + str,true);
      request.send();
    }

    function getAllDefinition()
    {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function(){
        if (request.readyState == XMLHttpRequest.DONE){
          if (request.status == 200){
            result.innerHTML ='';
            const response = request.responseXML;
            resultsDisplay(response);
          }else{
            alert('There was a issue found with your request');
          }
        }
      };
      request.open('GET', 'request.php?q=&all=true' ,true);
      request.send();
    }

    function single(response){
      document.getElementById("result").innerHTML = response;
    }
    
    const resultsDisplay = xmlObj => {

        const defs = xmlObj.getElementsByTagName('definition');

        const list = document.createElement('ol');

        for (let i = 0; i < defs.length; i++) {

            const listItem = document.createElement('li');

            const title = defs[i].getAttribute('name');

            const author = defs[i].getAttribute('author');

            const definition = defs[i].innerHTML;

            listItem.innerHTML=`<h3>${title}</h3><p>${definition}</p><p>-${author}</p>`;

            list.appendChild(listItem);

        }

        result.appendChild(list);

    }

    
  };