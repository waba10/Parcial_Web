tareas();

document.querySelector("#fTareas").addEventListener('submit',function(e){
    e.preventDefault();
    let url= '/users';
    let data={
        tarea: document.forms["#fTareas"]['tarea'].value,
        fecha: document.forms["#fTareas"]['fecha'].value
    };

    fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=> res.json())
        .catch(err=> console.log("Error", err))
        .then(function(response){
            tareas();
        })
});


document.querySelector("#formU").addEventListener('submit',function(e){
    e.preventDefault();
    let url= '/users/actualizar/'+document.forms["#formU"]['id'].value;
    let data={
        tarea: document.forms["#formU"]['tarea'].value,
        fecha: document.forms["#formU"]['fecha'].value
    };

    fetch(url,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=> res.json())
        .catch(err=> console.log("Error", err))
        .then(function(response){
            tareas();
        })
});

function tareas(){
    let tableTareas=document.querySelector("#llenar");
    let contenido="";

    fetch('/users/tareas')
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        JSON.parse(data).tareas.forEach(element=>{
            contenido= contenido + `<tr>
            <td>${element.tarea}</td>
            <td>${element.fecha}</td>
            <td>
                <a href="/users/delete/${element.id}" class="eliminar btn btn-danger"> Eliminar </a>
                <a href="/users/actualizar/${element.id}" class="actualizar btn btn-warning" data-toogle="modal" data-target="#exampleModal > Actualizar </a>
                            
            </td>

            </tr>`
        })
        tableTareas.innerHTML=contenido;

        let btns_eliminar= document.querySelectorAll('.eliminar');

        btns_eliminar.forEach(item=>{
            item.addEventListener("click", function(e){
                e.preventDefault();
                let url=this['href'];

                fetch(url,{
                    method:"DELETE"
                })
                .then(res=> res.json())
                
                .then(function(response){
                    tareas();
                })
            })
        });

        btns_actualizar('.actualizar');

        btns:actualizar.forEach(item=>{
            item.addEventListener("click", function(e){
                e.preventDefault();
                let url= this['href'];
                fetch(url,{
                    method: 'GET'
                })
                .then(function(response){
                    return response.text();
                })
                .then(function(data){
                    let formUpdate=document.querySelector("#formU");
                    formUpdate.idTarea.value=JSON.parse(data)._id;
                    formUpdate.tarea.value=JSON.parse(data).tarea;
                })
            })
        });

    })
}
