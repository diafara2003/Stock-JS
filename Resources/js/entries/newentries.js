let proveedor = '',
    is_edicion = false,
    productos = [],
    encabezado = {
        enProveedor: -1,
        enFecha: moment().format(),
        enObservacion: '',
        entradaDetalle: [],
        EnUsuarioCrea: 0,
        EnUsuarioModifica: 0
    },
    detalle = {
        enDetId: 0,
        endDetEntradaId: 0,
        enDetProuctoId: -1,
        enDetCantidad: 0,
        enDetVrUnit: 0,
        enDetPrcIva: 0,
        enDetVrIva: 0,
        enDetVrTotal: 0,
        enDetProucto: {
            prodId: -1,
            prodNombre: '',
            prodUM: '',
            prodCategoria: '',
            prodPrecioCompra: 0,
            cantidad: 0
        }
    }


function Selectedercero(selected) {
    encabezado.enProveedor = -1;
    if (selected != undefined) {
        producto = selected;
        encabezado.enProveedor = selected.terId;
    }
}

function proveedor_entrada() {
    encabezado.enProveedor = document.getElementById('txtproveedor').value;

    if (encabezado.enProveedor == '') {
        $('#txtproveedor').addClass('obligatorio');
    } else {
        $('#txtproveedor').removeClass('obligatorio');
    }
}


function set_objeto_detalle() {
    detalle.enDetCantidad = parseFloat(document.getElementById('txtcantidad').value);

    if (isNaN(detalle.enDetCantidad)) {
        detalle.enDetCantidad = 0;
    }

    detalle.enDetVrUnit = parseFloat(document.getElementById('txtunitario').value);

    if (isNaN(detalle.enDetVrUnit)) {
        detalle.enDetVrUnit = 0;
    }

    detalle.enDetVrTotal = detalle.enDetCantidad * detalle.enDetVrUnit;
}

function agregarProducto() {

    set_objeto_detalle();

    if (detalle.enDetProuctoId != -1 && detalle.enDetCantidad > 0) {
        $('#modalAgregar').modal('hide');

        nuevo_tr(detalle);
        agregar_detalle_entrada(detalle);
        limpiar_modal();
    }

}

function limpiar_modal() {
    document.getElementById('txtproducto').value = '';
    document.getElementById('txtum').value = '';
    document.getElementById('txtcantidad').value = '';
    document.getElementById('txtunitario').value = '';
}

function agregar_detalle_entrada(producto) {

    encabezado.entradaDetalle.push(producto);

    detalle = {
        enDetId: 0,
        endDetEntradaId: 0,
        enDetProuctoId: -1,
        enDetCantidad: 0,
        enDetVrUnit: 0,
        enDetPrcIva: 0,
        enDetVrIva: 0,
        enDetVrTotal: 0,
        enDetProucto: {
            prodId: -1,
            prodNombre: '',
            prodUM: '',
            prodCategoria: '',
            prodPrecioCompra: 0,
            cantidad: 0
        }

    }
}

function nuevo_tr(detalle) {
    let _tr = '<tr>';
    _tr += '<td data-head="Producto">' + detalle.enDetProuctoId + '</td>';
    _tr += '<td data-head="Descripción">' + detalle.enDetProucto.prodNombre + '</td>';
    _tr += '<td data-head="Unidad de medida">' + detalle.enDetProucto.prodUM + '</td>';
    _tr += '<td data-head="Cantidad" class="text-right">' + Number(detalle.enDetCantidad).formatMoney(decimales); + '</td>';
    _tr += '<td data-head="Valor unitario" class="text-right">' + Number(detalle.enDetVrUnit).formatMoney(decimales); + '</td>';
    _tr += '<td data-head="Valor Total	" class="text-right">' + Number(detalle.enDetVrTotal).formatMoney(decimales); + '</td>';
    _tr += '<td data-head="Eliminar" class="text-center"><i class="fas fa-trash-alt" onclick="eliminar(this,' + detalle.enDetId + ')"></td>';
    _tr += '</tr>';
    $('#tbodydatos').append(_tr);

    if ($('.sin-registro').length > 0) {
        $('.sin-registro').remove();
    }

    // if (encabezado.entradaDetalle.length == 0) {
    //     document.getElementById('tbodydatos').innerHTML = _tr;
    // } else {
    //     $('#tbodydatos').append(_tr);
    // }

}

function SelectedProducto(selected) {
    detalle.enDetProuctoId = -1;
    if (selected != undefined) {
        producto = selected;
        detalle.enDetProucto = selected;
        detalle.enDetProuctoId = selected.prodId;
        cargar_datos_producto(selected);
    }
}

function cargar_datos_producto(producto) {
    document.getElementById('txtum').value = producto.prodUM;
    document.getElementById('txtunitario').value = producto.prodPrecioCompra;
}

function eliminar(_this, id) {
    ConsultaAjax('EntradaDetalle', 'DELETE', function (response) {

        if (response.codigo == -1) {
            Swal.fire(
                'entrada',
                'Error al eliminar el producto',
                'error');

        } else {
            $(_this).closest('tr').remove();
            Swal.fire(
                'entrada',
                'Se elimino correctamente el producto',
                'success');
        }

    }, id);
}


function guardar_entrada() {
    if (validar_datos_obligatorio()) {
        _TYPE = "POST";

        ConsultaAjax('entrada', _TYPE, function (response) {
            let type = 'success';
            if (response.codigo < 0) {
                //       type = "error";
            } else {
                cargar_entrada(response.codigo);
            }
            mostrar_mensaje("Se guardó los cambio correctamente", type);
            //  
        }, encabezado);

    } else {
        mostrar_mensaje('El campo de proveedor y los detalles de la entrada son obligatorios', 'error');
    }
}

function validar_datos_obligatorio() {
    var result = false;

    if (encabezado.enProveedor != '' && encabezado.entradaDetalle.length > 0) {
        result = true;
    }

    if (encabezado.enId > 0) {
        result = true;
    }

    return result;
}

function mostrar_mensaje(msn, type) {

    Swal.fire(
        'Entrada de almacén',
        msn,
        type)
}

function cargar_entrada(id) {
    $('#txtproveedor').attr('disabled','disabled');
    $('#txtproveedor').css('background-color','#ebebeb');
    ConsultaAjax('entrada/' + id, 'GET', function (response) {
        encabezado = response;
        //

        document.getElementById('tbodydatos').innerHTML = "";
        $('#txtproveedor').removeClass('obligatorio');
        document.getElementById('txtproveedor').value = response.terceroEntrada.terNombre ;

        for (let i = 0; i < response.entradaDetalle.length; i++) {
            const element = response.entradaDetalle[i];

            nuevo_tr(element);

        }
        encabezado.entradaDetalle = [];
        let session = JSON.parse(localStorage.getItem("sesion-inventories-app"));

        encabezado.EnUsuarioModifica = session.usuId;
    });
}

function add_comentario() {
    
    Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Ingrese comentarios para la entrada',
        confirmButtonText:'Agregar Comentario',
        width:'600px',
        showCancelButton: false
    }).then((result) => {
        encabezado.enObservacion=result.value;
    });

  
}

(function () {

    $("#txtproducto").attr('objectField', JSON.stringify({
        key: "prodId", value: "prodNombre"
    }));

    $("#txtproveedor").attr('objectField', JSON.stringify({
        key: "terId", value: "terNombre"
    }));
    let session = JSON.parse(localStorage.getItem("sesion-inventories-app"));

    encabezado.EnUsuarioCrea = session.usuId;
    autocomplete('txtproducto');
    autocomplete('txtproveedor');

    var qs = ObtenerQueryString().id;

    if (qs != undefined) {
        is_edicion = true;
        document.getElementById('tipopagina').textContent = "Editar entrada";
        cargar_entrada(qs);
    }

})();