let productos = [], proveedor = '',
    producto = {
        prodId: 0,
        prodNombre: '',
        prodUm: '',
        prodCategoria: '',
        prodPrecioCompra: 0,
        cantidad: 0
    };

function proveedor_entrada() {
    proveedor = document.getElementById('txtproveedor').value;

    if (proveedor == '') {
        $('#txtproveedor').addClass('obligatorio');
    }else{
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
        agregar_detalle_entrada();
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
    productos.push(producto);
}

function nuevo_tr(producto) {
    let _tr = '<tr>';
    _tr += '<td>' + producto.prodId + '</td>';
    _tr += '<td>' + producto.prodNombre + '</td>';
    _tr += '<td>' + producto.prodUm + '</td>';
    _tr += '<td class="text-right">' + Number(producto.cantidad).formatMoney(decimales, ',', '.'); + '</td>';
    _tr += '<td class="text-right">' + Number(producto.prodPrecioCompra).formatMoney(decimales, ',', '.'); + '</td>';
    _tr += '<td class="text-right">' + Numbrt(producto.cantidad * producto.prodPrecioCompra).formatMoney(decimales, ',', '.'); + '</td>';
    _tr += '</tr>';

    if (productos.length == 0) {
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

    } else {
        mostrar_mensaje('El cambpo de proveedor y los detalles de la entrada son obligatorios');
    }
}

function validar_datos_obligatorio() {
    var result = false;

    if (proveedor != '' && productos.length > 0) {
        result = true;
    }

    return result;
}

function mostrar_mensaje(msn) {
    document.getElementById('msn').textContent = msn;
    $('#modalmensaje').modal('show');
}

(function () {

    $("#txtproducto").attr('objectField', JSON.stringify({
        key: "prodId", value: "prodNombre"
    }));

    autocomplete('txtproducto');
})();