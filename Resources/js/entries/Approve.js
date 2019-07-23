let objeto_entrada = {
    Identrada: -1,
    IdUsuario: 1,
    estado: -1
};

function consultar_entradas_aprobar() {
    ConsultaAjax('entrada/estado/0', 'GET', function (response) {
        if (response.length > 0) {
            renderizar_tabla(response);
        } else {
            no_hay_datos();
        }
    })
}



function no_hay_datos() {
    var html = '<tr><td colspan="6" class="text-center"><h5 style="color: #b9b6b6">No hay entradas por aprobar</h5></td></tr>';
    document.getElementById('tbobydatos').innerHTML = html;
}

function renderizar_tabla(data) {
    var html = '';

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        html += '<tr>';
        html += '<td><a onclick="imprimir_entrada(' + element.enId + ')">' + element.enId + '</a></td>';
        html += '<td>' + element.enProveedor + '</td>';
        html += '<td>' + moment(element.enFecha).format("DD/MM/YYYY") + '</td>';
        if (element.enObservacion == '') {
            html += '<td>Sin comentarios</td>';
        } else {
            html += '<td>' + element.enObservacion + '</td>';
        }

        html += '<td class="text-center"><i class="far fa-square" onclick="aprobar(this,' + element.enId + ')"></i></td>';
        html += '<td class="text-center"><i class="far fa-square" onclick="rechazar(this,' + element.enId + ')"></i></td>';
        html += '</td>';
    }

    document.getElementById('tbobydatos').innerHTML = html;
}

function aprobar(_this, identrada) {
    objeto_entrada.estado = 1;
    objeto_entrada.identrada = identrada;

    cambiarEstado(_this, 'Se aprobó la entrada correctamente');
}

function rechazar(_this, identrada) {
    objeto_entrada.estado = -1;
    objeto_entrada.identrada = identrada;

    cambiarEstado(_this, 'Se rechazó la entrada correctamente');
}


function cambiarEstado(_this, msn) {
    ConsultaAjax('entrada/cambiarEstado', 'PUT', function (response) {
        if (response.codigo == -1) {
            Swal.fire(
                'Aprobar entrada',
                response.mensaje,
                'error');
        } else {
            $(_this).closest('tr').remove();
            Swal.fire(
                'Aprobar entrada',
                msn,
                'success');
        }
    }, objeto_entrada);
}

function imprimir_entrada() {
    var url = window.location.href.split('#')[0].split('Entries')[0] + 'Entries/print.html?idea=-1';
    var imp = window.open(url, "", "width=880,height=780,status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=no,left=0,top=5");
}

(function () {
    consultar_entradas_aprobar();
})();