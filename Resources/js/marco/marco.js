
const MENUS_OP = [
    {
        item: 'Productos', subItem: [
            { name: 'Crear Producto', path: '../Produts/newproduct.html' },
            { name: 'Consultar Prodcuto', path: '../Produts/products.html' },
            { name: 'Crear categoria', path: '/products' },
            { name: 'Consultar categoria', path: '/products' },
        ]

    },
    {
        item: 'Entrada de almacén', subItem: [
            { name: 'Crear entrada', path: '../Entries/newentries.html' },
            { name: 'Edición entrada', path: '../Entries/lstentries.html' },
            { name: 'Aprobación entrada', path: '../Entries/Approve.html' },
        ]

    },
    {
        item: 'Salida de almacén',
        subItem: [
            { name: 'Crear salida', path: '/entries' },
            { name: 'Edición salida', path: '/entries' },
        ]
    },
    {
        item: 'Informes',
        subItem: [
            { name: 'Informe de  salida', path: '/entries' },
            { name: 'Informe de entrada', path: '/entries' },
        ]
    }

];

function renderizar_menus() {

    var _html = '';
    for (let i = 0; i < MENUS_OP.length; i++) {
        const element = MENUS_OP[i];
        _html += '<div class="option-menu-item " onclick="activar_menu(this,\'' + element.item + '\')">' +
            '<a>' + element.item + ' </a>' +
            '<i class="fas fa-chevron-right"></i>' +
            '</div>';
        _html +=renderizar_sub_menu(element.item);

    }

    document.getElementById('DivMenu').innerHTML = _html;
}

function renderizar_sub_menu(idMenu) {
    var submenu = MENUS_OP.filter(c => { return c.item === idMenu })[0].subItem;
    var _html = '';

    for (let i = 0; i < submenu.length; i++) {
        const element = submenu[i];
        _html += ' <div class="sub-item-menu ' + idMenu.replace(/ /g, "") + '" style="display:none">' +
            '<div class="option-menu-item">' +
            '<a href="' + element.path + '">' + element.name + '</a>' +
            '</div>' +
            '</div>';

    }
    return _html;
}

function activar_menu(_this, idMenu) {
    if (!$(_this).hasClass('active-option')) {
        $('.option-menu').removeClass('active-option');

        $(_this).addClass('active-option');
        $(_this).find('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');

       // var _html = renderizar_sub_menu(idMenu);
       $('.' + idMenu.replace(/ /g, "")).show('linear');
       // $(_this).after(_html);

       
    } else {
        $(_this).removeClass('active-option');
        $('.' + idMenu.replace(/ /g, "")).hide('linear');
        $(_this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
        
    }

}


(function () {
    renderizar_menus();
})();
