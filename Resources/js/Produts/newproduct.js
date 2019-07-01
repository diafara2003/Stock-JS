let producto = {
    ProdId: 0,
    ProdNombre: '',
    ProdUm: '',
    ProdCategoria: '',
    ProdPrecioCompra: 0,
    ProdPrecioVenta: 0
};

function guardar() {
    obtener_campos();
    validar_campos();
}


function obtener_campos() {
    producto.ProdNombre = document.getElementById('txtnombre').value;
    producto.ProdUm = document.getElementById('txtum').value;
    producto.ProdCategoria = document.getElementById('txtcategoria').value;
    producto.ProdPrecioCompra = parseFloat(document.getElementById('txtcompra').value);
    producto.ProdPrecioVenta = parseFloat(document.getElementById('txtventa').value);

}

function validar_campos() {

    if (isNaN(producto.ProdPrecioCompra)) {
        producto.ProdPrecioCompra = 0;
    }
    if (isNaN(producto.ProdPrecioVenta)) {
        producto.ProdPrecioVenta = 0;
    }

    if (producto.ProdNombre == ''
        || producto.ProdUm == ''
        || producto.ProdCategoria == ''
        || producto.ProdPrecioCompra == 0
        || producto.ProdPrecioVenta == 0) {
        Swal.fire(
            'Nuevo producto',
            'todos los campos son obligatorios',
            'error');
    }
    else {
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
