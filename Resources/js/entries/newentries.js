let productos = [], proveedor = '',
    producto = {
        ProdId: 0,
        ProdNombre: '',
        ProdUm: '',
        ProdCategoria: '',
        ProdPrecioCompra: 0,
        ProdPrecioVenta: 0
    };



function agregarProducto() {

}

function SelectedProducto(selected) {
    producto.ProdId = 0;
    if (selected != undefined) {
        producto.ProdId = selected.prodId;
    }
}


(function () {

    $("#txtproducto").attr('objectField', JSON.stringify({
        key: "prodId", value: "prodNombre"
    }));

    autocomplete('txtproducto');
})();