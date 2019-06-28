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

}

function eventos_AC(autocomplete_input) {

    autocomplete_input.keyup(function (e) {

        if ($(".resultAC").length == 0) {
            var intervalo_key = setInterval(function () {

                buscarAutocomplete(autocomplete_input, $(this).val);
                clearInterval(intervalo_key);
            }, 500)
        }

    });
    autocomplete_input.keydown(function (e) {
        if (e.keyCode == 40 || e.keyCode == 38) {
            var ACHover = $('.resultAC').find('div[class*="hover"]');

            if (ACHover != undefined && ACHover.length > 0) {
                $(ACHover).removeClass('hover');
                $(ACHover).next().addClass('hover');
                if (parseInt($(ACHover).attr('id')) >= 9)
                    $('.resultAC').scrollTop($('.resultAC').scrollTop() + 25);
                if (parseInt($(ACHover).attr('id')) + 1 == $('.resultAC').find('div[class*="option"]').length) {
                    $('.resultAC').scrollTop(0);
                    $($('.resultAC').find('div[class*="option"]')[0]).addClass('hover');
                }
            }
            else { $('.resultAC').find('div').first().addClass('hover'); }
        }
    });
    autocomplete_input.blur(function () {
      //  $('.resultAC').remove();
    });
    autocomplete_input.focus(function () {
        ACFocus = $(this);
    });
}

function buscarAutocomplete(autocomplete_input, texto) {
    renderizar_busqueda(autocomplete_input);
}


function renderizar_busqueda(autocomplete_input) {

    var _html = '<div class="resultAC">';
    for (let i = 0; i < tags.length; i++) {
        const element = tags[i];
        _html += '<div onclick="selected_option_AC()" class="option">' + element + '</div>';
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

function selected_option_AC(_input,selected) {
var d="";
}

autocomplete();