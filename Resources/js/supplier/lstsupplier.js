function consultar() {
    ConsultaAjax('tercero', 'GET', function (response) {
        if (response.length > 0) {
            renderizar_tabla(response);
        } else {
            no_hay_datos();
        }
    },undefined,true,function(){
        Swal.fire(
            'Proveedor',
            'Se presento un error al consultar los proveedores',
            'error');
    })
}

function renderizar_tabla(data) {
    var html = '';

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        html += '<tr>';
        html += '<td data-head="Código"><a  onclick="editar(' + element.terId + ')">' + element.terId + '</a></td>';
        html += '<td data-head="Nombre">' + element.terNombre + '</td>';
        html += '<td data-head="NIT">' + element.terNIT + '</td>';
        html += '<td data-head="Dirección">' + element.terDireccion + '</td>';
        html += '<td data-head="Telefono">' + element.terTelefono + '</td>';
        html += '<td data-head="Correo">' + element.terCorreo + '</td>';
        html += '<td data-head="Eliminar" class="text-center"><i class="fas fa-trash-alt" onclick="eliminar(this,' + element.terId + ')"></i></td>';
        html += '</td>';
    }

    document.getElementById('tbobydatos').innerHTML = html;
}

function no_hay_datos() {
    var html = '<tr><td colspan="7" class="text-center"><h5 style="color: #b9b6b6">No hay datos</h5></td></tr>';
    document.getElementById('tbobydatos').innerHTML = html;
}


function editar(id) {
    var _url = window.location.href.toLowerCase().split('supplier')[0] + 'supplier/newsupplier.html?id=' + id;
    window.location.href=_url;
}


let eliminar_producto = undefined, _this = undefined;
function eliminar(_td, id) {
    _this = $(_td).closest('tr');
    eliminar_producto = id;
    $('#modaleliminar').modal('show');
}

function confirmarEliminar() {
    ConsultaAjax('tercero', 'DELETE', function (response) {

        if (response.codigo == -1) {
            eliminar_producto = undefined;
           
            Swal.fire(
                'Proveedor',
                'Error al crear el proveedor',
                'error');
            _this = undefined;
        } else {
            _this.remove();
            Swal.fire(
                'Proveedor',
                'Se elimino el proveedor correctamente',
                'success');
        }

    }, eliminar_producto)
}


(function () {
    consultar();
})();
