
function consultar_entradas() {

    ConsultaAjax('entrada/Estado/0', 'GET', function (response) {
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
        html += '<td><a onclick="ver_entrada(' + element.enId + ')">' + element.enId + '</a></td>';
        html += '<td>' + element.enProveedor + '</td>';
        html += '<td>' + moment(element.enFecha).format("DD/MM/YYYY") + '</td>';
        if (element.enObservacion == '') {
            html += '<td>Sin comentarios</td>';
        } else {
            html += '<td>' + element.enObservacion + '</td>';
        }

        html += '<td>' + html_estado(element.enEstado) + '</td>';

        html += '<td class="text-center"><i class="fas fa-trash-alt" onclick="eliminar(this,' + element.enId + ')"></i></td>';
        html += '</td>';
    }

    document.getElementById('tbobydatos').innerHTML = html;
}

function html_estado(estado) {
    var _estado = '';

    switch (estado) {
        case -1:
            _estado = 'Rechazada';
            break;
        case 0:
            _estado = 'Generada';
            break;
        case 1:
            _estado = 'Aprobada';
            break;
    }

    return _estado;
}


function no_hay_datos() {
    var html = '<tr><td colspan="7" class="text-center"><h5 style="color: #b9b6b6">No hay datos</h5></td></tr>';
    document.getElementById('tbobydatos').innerHTML = html;
}

function ver_entrada(id) {
    var _url = window.location.href.toLowerCase().split('entries')[0] + 'entries/newentries.html?id=' + id;
    window.location.href = _url;
}

let eliminar_entrada = undefined, _this = undefined;
function eliminar(_td, id) {
    _this = $(_td).closest('tr');
    eliminar_entrada = id;
    $('#modaleliminar').modal('show');
}
function confirmarEliminar() {
    ConsultaAjax('entrada', 'DELETE', function (response) {

        if (response.codigo == -1) {
            eliminar_entrada = undefined;

            Swal.fire(
                'entrada',
                'Error al eliminar la entrada',
                'error');
            _this = undefined;
        } else {
            _this.remove();
            Swal.fire(
                'entrada',
                'Se elimino correctamente la entrada',
                'success');
        }

    }, eliminar_entrada);
}


(function () {
    consultar_entradas();
})();