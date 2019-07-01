let producto = {
    prodId: 0,
    prodNombre: '',
    prodUm: '',
    prodCategoria: '',
    prodPrecioCompra: 0,
    prodPrecioVenta: 0
};

function guardar() {
    obtener_campos();

    if (validar_campos()) {

        ConsultaAjax('producto', 'POST', function (response) {
            if (response.codigo == -1) {
                Swal.fire(
                    'Nuevo producto',
                    'Error al crear el producto',
                    'error');
            } else {
                Swal.fire(
                    'Nuevo producto',
                    'Se registro el producto correctamente',
                    'success');

                document.getElementById('txtnombre').value = '';
                document.getElementById('txtum').value = '';
                document.getElementById('txtcategoria').value = '';
                document.getElementById('txtcompra').value = '';
                document.getElementById('txtventa').value = '';

            }
        }, producto);
    }
}

function editar() {
    obtener_campos();

    if (validar_campos()) {
        ConsultaAjax('producto', 'PUT', function (response) {
            if (response.codigo == -1) {
                Swal.fire(
                    'Editar producto',
                   response.mensaje,
                    'error');
            } else {
                Swal.fire(
                    'Editar producto',
                    'Se edito el producto correctamente',
                    'success');
            }
        }, producto);
    }
}

function cargar_producto(id) {
    ConsultaAjax('producto/' + id, 'GET', function (response) {
        producto = response;

        document.getElementById('txtnombre').value = producto.prodNombre;
        document.getElementById('txtum').value = producto.prodUm;
        document.getElementById('txtcategoria').value = producto.prodCategoria;
        document.getElementById('txtcompra').value = producto.prodPrecioCompra;
        document.getElementById('txtventa').value = producto.prodPrecioVenta;

    })
}

function obtener_campos() {
    producto.prodNombre = document.getElementById('txtnombre').value;
    producto.prodUm = document.getElementById('txtum').value;
    producto.prodCategoria = document.getElementById('txtcategoria').value;
    producto.prodPrecioCompra = parseFloat(document.getElementById('txtcompra').value);
    producto.prodPrecioVenta = parseFloat(document.getElementById('txtventa').value);

}

function validar_campos() {
    let result = false;
    if (isNaN(producto.prodPrecioCompra)) {
        producto.ProdPrecioCompra = 0;
    }
    if (isNaN(producto.prodPrecioVenta)) {
        producto.ProdPrecioVenta = 0;
    }

    if (producto.prodNombre == ''
        || producto.prodUm == ''
        || producto.prodCategoria == ''
        || producto.prodPrecioCompra == 0
        || producto.prodPrecioVenta == 0) {
        Swal.fire(
            'Nuevo producto',
            'todos los campos son obligatorios',
            'error');
    }
    else {
        result = true;
    }
    return result;
}

(function () {

    var qs = ObtenerQueryString().id;

    if (qs != undefined) {
        document.getElementById('tipopagina').textContent = "Editar producto";
        document.getElementById('btnguardar').style.display = "none";
        document.getElementById('btneditar').style.display = "block";
        cargar_producto(qs);
    }
})();
