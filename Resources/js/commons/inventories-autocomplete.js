

let ACFocus = undefined;
function autocomplete(id_input) {
    let autocomplete_input = $('#' + id_input);
    eventos_AC(autocomplete_input);

}

function eventos_AC(autocomplete_input) {

    autocomplete_input.keyup(function (e) {

        if ($(".resultAC").length == 0) {
            var intervalo_key = setInterval(function () {
                if (autocomplete_input.attr('busqueda') != 'true') {
                    let value = $(autocomplete_input).val();
                    buscarAutocomplete(autocomplete_input, value);
                }
                clearInterval(intervalo_key);
            }, 500)
        }

    });

    autocomplete_input.keydown(function (e) {

        var ACHover = $('.resultAC').find('div[class*="hover"]');
        var _height_ = $('.resultAC').find('div').first().outerHeight(true);
        var _height_container = $('.resultAC').outerHeight(true);
        var _search_page = parseInt(_height_container / _height_);

        if (e.keyCode == 9 || e.keyCode == 13) {

            $('.resultAC').find('div[class*="hover"]').click();
        }

        if (e.keyCode == 40 || e.keyCode == 38) {

            $(ACHover).removeClass('hover');

            if (e.keyCode == 40) {
                if (ACHover.length == 0
                    || parseInt(ACHover.attr('enumerable')) == ($('.resultAC').find('div').length - 1)) {
                    $('.resultAC').find('.option').first().addClass('hover');
                    $('.resultAC').scrollTop(0);
                } else {
                    $(ACHover).next().addClass('hover');
                }
                next_hover(_search_page, _height_);

            } else {

                if (ACHover.length == 0 || parseInt(ACHover.attr('enumerable')) == 0) {
                    last_tr_hover(_height_, _search_page);
                } else {

                    if ($(ACHover).prev().length == 0) {
                        last_tr_hover(_height_, _search_page);
                    } else {
                        $(ACHover).prev().addClass('hover');
                    }
                    last_hover(_search_page, _height_);

                }
            }
        }
    });

    autocomplete_input.blur(function () {
        //  $('.resultAC').remove();
    });
    autocomplete_input.focus(function () {
        if ($('.resultAC').length === 0) {
            ACFocus = $(this);
            ACFocus.removeAttr('busqueda');
        }
    });
}

function last_tr_hover(_height_, _search_page) {
    $('.resultAC').find('div').last().addClass('hover');
    $('.resultAC').scrollTop(_height_ * _search_page);
}

function next_hover(_search_page, _height_) {
    var numerable = parseInt($('.resultAC').find('div[class*="hover"]').attr('enumerable'));
    if (numerable >= _search_page) {
        var _top = $('.resultAC').scrollTop();
        $('.resultAC').scrollTop(_top + _height_);
    }
}

function last_hover(_search_page, _height_) {
    var numerable = parseInt($('.resultAC').find('div[class*="hover"]').attr('enumerable'));
    if (numerable >= _search_page) {
        var _top = $('.resultAC').scrollTop();
        $('.resultAC').scrollTop(_top - _height_);
    }
    if (numerable == 0) {
        $('.resultAC').scrollTop(0);
    }
}

function buscarAutocomplete(autocomplete_input, texto) {

    var _url_service = autocomplete_input.attr('webservice');
    // _url_service += texto;
     ConsultaAjax(_url_service, 'GET', function (response) {
         renderizar_busqueda(data, autocomplete_input);
     });

   
}

function renderizar_busqueda(data, autocomplete_input) {
    var _length = 12;
    var objectField = JSON.parse(autocomplete_input.attr('objectField'));
    if (data.length < 12) {
        _length = data.length;
    }
    var _html = '<div class="resultAC">';
    if (data.length > 0) {
        for (let i = 0; i < _length; i++) {

            const element = data[i];
            _html += "<div enumerable='" + i + "' onclick='selected_option_AC(this," + JSON.stringify(element).split("'").join('´').toString().split("&quot;").join('´').toString() + ")' class='option'>" + element[objectField.value] + "</div>";
        }
        _html += '</div>';
    } else {
        _html = "<div>" +
            " <span style='display:block; height:40px; padding:4px 0px; text-align:center'>No se encontraron registros</span>" +
            " </div>";
    }


    $('.resultAC').remove();
    $('body').append(_html);

    innerHeightTXT = $(autocomplete_input).innerHeight() + 3;
    topRelative = $(autocomplete_input).offset().top;
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

function selected_option_AC(_input, _selected_data) {
    ACFocus.val(_selected_data.value);
    fnSelected = ACFocus.attr('Fnselected');
    if (fnSelected != undefined) {
        if (fnSelected != undefined) {
            eval(fnSelected + '(' + JSON.stringify(_selected_data) + ',\'' + ACFocus[0].id + '\')');
        }
    }
    ACFocus.attr('busqueda', 'true')

    $('.resultAC').remove();
}
