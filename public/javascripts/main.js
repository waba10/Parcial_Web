tareas();

document.querySelector('#fTareas').addEventListener('submit', function (e) {
    e.preventDefault();
    var url = '/api';
    var data = {
        nombre: document.forms["fTareas"]['nombre'].value,
        familia: document.forms["fTareas"]['familia'].value,
        descubrimiento: document.forms["fTareas"]['descubrimiento'].value
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:
        {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log("Error:", error))
        .then(function (response) {

            tareas();
        })
});


document.querySelector("#formU").addEventListener('submit', function (e) {
    e.preventDefault();
    let url = '/api/Bestiario/' + document.forms["formU"]['idTarea'].value;
    var data = {
        nombre: document.forms["formU"]['nombre'].value,
        familia: document.forms["formU"]['familia'].value,
        descubrimiento: document.forms["formU"]['descubrimiento'].value,
    };
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers:
        {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log("Error:", error))
        .then(function (response) {
            console.log("actualizado con exito");
            tareas();
        })
});

function tareas() {
    let tableTareas = document.querySelector("#llenar");
    let contenido = "";
    fetch('/api/Bestiario')
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            console.log(data);
            JSON.parse(data).tareas.forEach(element => {
                contenido = contenido + `<tr>
                <td>${element._id}</td>
                <td>${element.nombre}</td>
                <td>${element.familia}</td>
                <td>${element.descubrimiento}</td>
                <td>
                    <a href="/api/Bestiario/${element._id}" class="eliminar btn btn-danger">Eliminar</a>
                    <a href="/api/Bestiario/${element._id}" class="actualizar btn btn-warning" data-toggle="modal" data-target="#exampleModal">Actualizar</a>
                </td>
                <tr/>`
            });
            tableTareas.innerHTML = contenido;
            let btns_eliminar = document.querySelectorAll('.eliminar');
            btns_eliminar.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this['href'];
                    console.log(url);
                    fetch(url, {
                        method: "DELETE",
                    }).then(res => res.json())
                        .catch(error => console.log("Error:", error))
                        .then(function (response) {
                            console.log("sucess");
                            tareas();
                        })

                });
            })
            let btns_actualizar = document.querySelectorAll('.actualizar');

            btns_actualizar.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this['href'];
                    console.log(url);
                    fetch(url, { method: "GET" })
                        .then(function (response) {
                            return response.text();
                        })
                        .then(function (data) {
                            console.log(JSON.parse(data).tarea);
                            let formUpdate = document.querySelector('#formU');
                            formU.idTarea.value = JSON.parse(data)._id;
                            formU.nombre.value = JSON.parse(data).nombre;
                            formU.familia.value = JSON.parse(data).familia;
                            formU.descubrimiento.value=JSON.parse(data).descubrimiento;
                        });
                });
            });

        });
}
