
function consultar_entradas(){

    ConsultaAjax('entrada', 'GET', function(response){
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
        html += '<td><a>' + element.enId + '</a></td>';
        html += '<td>' + element.enProveedor + '</td>';
        html += '<td>' +moment(element.enFecha ).format("DD/MM/YYYY") + '</td>';        
        html += '<td class="text-right">' +element.enObservacion + '</td>';        
        html += '<td class="text-right"><i class="fas fa-trash-alt" onclick="eliminar(this,' + element.enId + ')"></i></td>';
        html += '</td>';
    }

    document.getElementById('tbobydatos').innerHTML = html;
}


function no_hay_datos() {
    var html = '<tr><td colspan="7" class="text-center"><h5 style="color: #b9b6b6">No hay datos</h5></td></tr>';
    document.getElementById('tbobydatos').innerHTML = html;
}


(function(){
    consultar_entradas();
})();