
function cargar_entrada(id) {
    ConsultaAjax('entrada/impresion/' + id, 'GET', function (response) {
        renderizar_encabezado(response, id);
        renderizar_detalles(response.detalles);
    })

}

function renderizar_encabezado(encabezado, id_ea) {
    document.getElementById('EnAFech').textContent = encabezado.enFecha;
    document.getElementById('EnAUsu').textContent = encabezado.usuario;
    document.getElementById('EnANo').textContent = id_ea;
    document.getElementById('TerNom').textContent = encabezado.terNombre;
    document.getElementById('TerNit').textContent = encabezado.terNIT;
    document.getElementById('TerDic').textContent = encabezado.terDireccion;
    document.getElementById('TerTel').textContent = encabezado.terFelefono;


    document.getElementById('lblSubtotal').textContent = Number(encabezado.enSubTotal).formatMoney(decimales);
    document.getElementById('lblIVA').textContent = Number(0).formatMoney(decimales);
    document.getElementById('lblTotal').textContent = Number(encabezado.enVrTotal).formatMoney(decimales);
}

function renderizar_detalles(detalle) {
    var _html = '';

    for (let i = 0; i < detalle.length; i++) {
        const element = detalle[i];

        _html += '<tr>';
        _html += '<td>' + element.prodId + '</td>';
        _html += '<td>' + element.prodNombre + '</td>';
        _html += '<td>' + element.prodUM + '</td>';
        _html += '<td class="text-right">' + Number(element.enDetCantidad).formatMoney(decimales) + '</td>';
        _html += '<td class="text-right">' + Number(element.enDetVrUnit).formatMoney(decimales) + '</td>';
        _html += '<td class="text-right">' + Number(element.enDetVrTotal).formatMoney(decimales) + '</td>';
        _html += '</tr>';
    }
    document.getElementById('tbodyDatos').innerHTML = _html;
}


(function () {
    id_entrada = ObtenerQueryString().idea;

    cargar_entrada(id_entrada);
})();
