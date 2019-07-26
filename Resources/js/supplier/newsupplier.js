let tercero = {
    terId: -1,
    terNombre: '',
    terNIT: '',
    terDireccion: '',
    terTelefono: '',
    terCorreo: ''
}

function cargar_proveedor(id) {
    ConsultaAjax('tercero/' + id, 'GET', function (response) {
        tercero = response;

        document.getElementById('txtterNombre').value = tercero.terNombre;
        document.getElementById('txtTerNIT').value = tercero.terNIT;
        document.getElementById('txtterDireccion').value = tercero.terDireccion;
        document.getElementById('txtterTelefono').value = tercero.terTelefono;
        document.getElementById('txtterCorreo').value = tercero.terCorreo;

    })
}

function obtener_campos() {
    tercero.terNombre = document.getElementById('txtterNombre').value;
    tercero.terNIT = document.getElementById('txtTerNIT').value;
    tercero.terDireccion = document.getElementById('txtterDireccion').value;
    tercero.terTelefono = document.getElementById('txtterTelefono').value;
    tercero.terCorreo = document.getElementById('txtterCorreo').value;

}




function guardar() {
    obtener_campos();


    if (validar_campos()) {

        ConsultaAjax('tercero', 'POST', function (response) {
            if (response.codigo == -1) {
                Swal.fire(
                    'Nuevo proveedor',
                    'Error al crear el proveedor',
                    'error');
            } else {
                Swal.fire(
                    'Nuevo Proveedor',
                    'Se registro el proveedor correctamente',
                    'success');

                document.getElementById('txtterNombre').value = '';
                document.getElementById('txtTerNIT').value = '';
                document.getElementById('txtterDireccion').value = '';
                document.getElementById('txtterTelefono').value = '';
                document.getElementById('txtterCorreo').value = '';

            }
        }, tercero);
    }
}

function editar() {
    obtener_campos();

    if (validar_campos()) {
        ConsultaAjax('tercero', 'PUT', function (response) {
            if (response.codigo == -1) {
                Swal.fire(
                    'Editar proveedor',
                    response.mensaje,
                    'error');
            } else {
                Swal.fire(
                    'Editar proveedor',
                    'Se edito el proveedor correctamente',
                    'success');
            }
        }, tercero);
    }
}


function validar_campos() {
    let result = false;


    if (tercero.terNIT == ''
        || tercero.terDireccion == ''
        || tercero.terCorreo == ''
        || tercero.terNombre == 0
        || tercero.terTelefono == 0) {
        Swal.fire(
            'Proveedor',
            'todos los campos son obligatorios',
            'error');
    }
    else {
        result = true;
    }
    return result;
}

(function () {

    var qs = ObtenerQueryString().id;

    if (qs != undefined) {
        document.getElementById('tipopagina').textContent = "Editar proveedor";
        document.getElementById('btnguardar').style.display = "none";
        document.getElementById('btneditar').style.display = "block";
        cargar_proveedor(qs);
    }
})();
