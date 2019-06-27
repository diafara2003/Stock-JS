var tags = [
    "Delhi",
    "Ahemdabad",
    "Punjab",
    "Uttar Pradesh",
    "Himachal Pradesh",
    "Karnatka",
    "Kerela",
    "Maharashtra",
    "Gujrat",
    "Rajasthan",
    "Bihar",
    "Tamil Nadu",
    "Haryana"
];

let ACFocus = undefined;
function autocomplete() {
    let autocomplete_input = $('#txtproveedor');
    eventos_AC(autocomplete_input);
    renderizar_busqueda();
}

function eventos_AC(autocomplete_input) {

    autocomplete_input.keyup(function () {

    });
    autocomplete_input.keydown(function () {

    });
    autocomplete_input.blur(function () {

    });
    autocomplete_input.focus(function () {
        ACFocus = $(this);
    });
}

function renderizar_busqueda() {

    var _html = '<div class="resultAC">';
    for (let i = 0; i < tags.length; i++) {
        const element = tags[i];
        _html += '<div class="option">' + element + '</div>';
    }
    _html += '</div>';


    $('body').append(_html);

    innerHeightTXT = $('#txtproveedor').innerHeight() + 3;
    topRelative = $('#txtproveedor').offset().top;
    positionTop = true;

    $(".resultAC").css({
        top: (topRelative + innerHeightTXT),
        left: $('#txtproveedor').offset().left - $(window).scrollLeft(),
        width: $('#txtproveedor').innerWidth(),
        display: "block",
        "box-shadow": (positionTop ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" : "0 -4px 8px 0 rgba(0, 0, 0, 0.2), 0 -6px 20px 0 rgba(0, 0, 0, 0.19)"),
        "position": "fixed",
        "z-index": "999"
    });

}

autocomplete();