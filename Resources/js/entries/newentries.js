let proveedor = '',
    productos = [],
    encabezado = {
        EnProveedor: '',
        EnFecha: moment().format(),
        EnObservacion: '',
        EntradaDetalle: []
    },
    detalle = {
        EnDetId: 0,
        EndDetEntradaId: 0,
        EnDetProuctoId: 0,
        EnDetCantidad: 0,
        EnDetVrUnit: 0,
        EnDetPrcIva: 0,
        EnDetVrIva: 0,
        EnDetVrTotal: 0
    },
    producto = {
        prodId: 0,
        prodNombre: '',
        prodUm: '',
        prodCategoria: '',
        prodPrecioCompra: 0,
        cantidad: 0
    };

function proveedor_entrada() {
    encabezado.EnProveedor = document.getElementById('txtproveedor').value;

    if (encabezado.EnProveedor == '') {
        $('#txtproveedor').addClass('obligatorio');
    } else {
        $('#txtproveedor').removeClass('obligatorio');
    }
}


function agregarProducto() {
    producto.cantidad = parseFloat(document.getElementById('txtcantidad').value);

    if (isNaN(producto.cantidad)) {
        producto.cantidad = 0;
    }

    if (producto.prodId != 0 && producto.cantidad > 0) {
        $('#modalAgregar').modal('hide');
        nuevo_tr(producto);
        agregar_detalle_entrada(producto);
        producto = {
            prodId: 0,
            prodNombre: '',
            prodUm: '',
            prodCategoria: '',
            prodPrecioCompra: 0,
            cantidad: 0
        };
    }

}

function agregar_detalle_entrada(producto) {



    encabezado.EntradaDetalle.push({
        EnDetId: 0,
        EndDetEntradaId: 0,
        EnDetProuctoId: producto.prodId,
        EnDetCantidad: producto.cantidad,
        EnDetVrUnit: producto.prodPrecioCompra,
        EnDetPrcIva: 0,
        EnDetVrIva: 0,
        EnDetVrTotal: producto.cantidad * producto.prodPrecioCompra
    });
}

function nuevo_tr(producto) {
    let _tr = '<tr>';
    _tr += '<td>' + producto.prodId + '</td>';
    _tr += '<td>' + producto.prodNombre + '</td>';
    _tr += '<td>' + producto.prodUm + '</td>';
    _tr += '<td class="text-right">' + Number(producto.cantidad).formatMoney(decimales); + '</td>';
    _tr += '<td class="text-right">' + Number(producto.prodPrecioCompra).formatMoney(decimales); + '</td>';
    _tr += '<td class="text-right">' + Number(producto.cantidad * producto.prodPrecioCompra).formatMoney(decimales); + '</td>';
    _tr += '</tr>';

    if (encabezado.EntradaDetalle.length == 0) {
        document.getElementById('tbodydatos').innerHTML = _tr;
    } else {
        $('#tbodydatos').append(_tr);
    }

}

function SelectedProducto(selected) {
    producto.prodId = 0;
    if (selected != undefined) {
        producto = selected;
        cargar_datos_producto(selected);
    }
}

function cargar_datos_producto(producto) {
    document.getElementById('txtum').value = producto.prodUm;
    document.getElementById('txtunitario').value = producto.prodPrecioVenta;
}


function guardar_entrada() {
    if (validar_datos_obligatorio()) {
        ConsultaAjax('entrada', 'POST', function (response) {
            let type = 'sucess';
            if (response.codigo < 0) {
                type = "error;"
            }
            mostrar_mensaje(response.mensaje, type);
        }, encabezado);
    } else {
        mostrar_mensaje('El cambpo de proveedor y los detalles de la entrada son obligatorios', 'error');
    }
}

function validar_datos_obligatorio() {
    var result = false;

    if (encabezado.EnProveedor != '' && encabezado.EntradaDetalle.length > 0) {
        result = true;
    }

    return result;
}

function mostrar_mensaje(msn, type) {

    Swal.fire(
        'Creación de entrada',
        msn,
        type)
}

(function () {

    $("#txtproducto").attr('objectField', JSON.stringify({
        key: "prodId", value: "prodNombre"
    }));

    autocomplete('txtproducto');
})();