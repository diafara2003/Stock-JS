function consultar() {
    ConsultaAjax('producto', 'GET', function (response) {
        if (response.length > 0) {
            renderizar_tabla(response);
        } else {
            no_hay_datos();
        }
    })
}

function renderizar_tabla(data) {
    var html = '';

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        html += '<tr>';
        html += '<td class="text-right">' + element.prodId + '</td>';
        html += '<td>' + element.prodNombre + '</td>';
        html += '<td>' + element.prodUm + '</td>';
        html += '<td>' + element.prodCategoria + '</td>';
        html += '<td class="text-right">' + element.prodPrecioCompra + '</td>';
        html += '<td class="text-right">' + element.prodPrecioVenta + '</td>';
        html += '<td class="text-right"><i class="fas fa-edit" onclick="editar(' + element.prodId + ')"></i><i class="fas fa-trash-alt" onclick="eliminar(this,' + element.prodId + ')"></i></td>';
        html += '</td>';
    }

    document.getElementById('tbobydatos').innerHTML = html;
}

function no_hay_datos() {
    var html = '<tr><td colspan="7" class="text-center"><h5 style="color: #b9b6b6">No hay datos</h5></td></tr>';
    document.getElementById('tbobydatos').innerHTML = html;
}

function editar(id) {

}
let eliminar_producto = undefined, _this = undefined;
function eliminar(_td, id) {
    _this = $(_td).closest('tr');
    eliminar_producto = id;
    $('#modaleliminar').modal('show');
}

function confirmarEliminar() {
    ConsultaAjax('producto', 'DELETE', function (response) {

        if (response.codigo == -1) {
            eliminar_producto = undefined;
            _this.remove();
            Swal.fire(
                'Producto',
                'Error al crear el producto',
                'error');
                _this = undefined;
        } else {
            Swal.fire(
                'Producto',
                'Se registro el producto correctamente',
                'success');
        }

    }, eliminar_producto)
}

(function () {
    consultar();
})();