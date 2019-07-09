let proveedor = '',
    is_edicion = false,
    productos = [],
    encabezado = {
        enProveedor: '',
        enFecha: moment().format(),
        enObservacion: '',
        entradaDetalle: []
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
    encabezado.enProveedor = document.getElementById('txtproveedor').value;

    if (encabezado.enProveedor == '') {
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
        nuevo_tr(producto, 0);
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



    encabezado.entradaDetalle.push({
        enDetId: 0,
        endDetEntradaId: 0,
        enDetProuctoId: producto.prodId,
        enDetCantidad: producto.cantidad,
        enDetVrUnit: producto.prodPrecioCompra,
        enDetPrcIva: 0,
        enDetVrIva: 0,
        enDetVrTotal: producto.cantidad * producto.prodPrecioCompra
    });
}

function nuevo_tr(producto, id) {
    let _tr = '<tr>';
    _tr += '<td>' + producto.prodId + '</td>';
    _tr += '<td>' + producto.prodNombre + '</td>';
    _tr += '<td>' + producto.prodUm + '</td>';
    _tr += '<td class="text-right">' + Number(producto.cantidad).formatMoney(decimales); + '</td>';
    _tr += '<td class="text-right">' + Number(producto.prodPrecioCompra).formatMoney(decimales); + '</td>';
    _tr += '<td class="text-right">' + Number(producto.cantidad * producto.prodPrecioCompra).formatMoney(decimales); + '</td>';
    _tr += '<td class="text-center"><i class="fas fa-trash-alt" onclick="eliminar(this,' + id + ')"></td>';
    _tr += '</tr>';

    if (encabezado.entradaDetalle.length == 0) {
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
                type = "error";
            }
            mostrar_mensaje(response.mensaje, type);
            cargar_entrada(response.codigo);
        }, encabezado);

    } else {
        mostrar_mensaje('El cambpo de proveedor y los detalles de la entrada son obligatorios', 'error');
    }
}

function validar_datos_obligatorio() {
    var result = false;

    if (encabezado.enProveedor != '' && encabezado.entradaDetalle.length > 0) {
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

function cargar_entrada(id) {
    ConsultaAjax('entrada/' + id, 'GET', function (response) {
        encabezado = response;

        document.getElementById('tbodydatos').innerHTML = "";
        $('#txtproveedor').removeClass('obligatorio');
        document.getElementById('txtproveedor').value = response.enProveedor;

        for (let i = 0; i < response.entradaDetalle.length; i++) {
            const element = response.entradaDetalle[i];
            producto = {};
            producto.cantidad = element.enDetCantidad;
            producto.prodId = element.enDetProuctoId;
            producto.prodUm = element.enDetProucto.prodUm;
            producto.prodNombre = element.enDetProucto.prodNombre;
            producto.prodPrecioCompra = element.enDetProucto.prodPrecioCompra;
            nuevo_tr(producto, element.enDetId);

        }
    });
}

(function () {

    $("#txtproducto").attr('objectField', JSON.stringify({
        key: "prodId", value: "prodNombre"
    }));

    autocomplete('txtproducto');

    var qs = ObtenerQueryString().id;

    if (qs != undefined) {
        is_edicion = true;
        document.getElementById('tipopagina').textContent = "Editar producto";
        cargar_entrada(qs);
    }

})();