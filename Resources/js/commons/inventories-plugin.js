
var decimales = 2;

if (!String.prototype.reverse) {
    String.prototype.reverse = function () {
        var result = "", revert = "", resultdecimal;
        var split_decimal = this.split('.');
        if (split_decimal[1] != undefined) {
            split_decimal = split_decimal[1];
            result = this.split('.')[1];

            for (var i = split_decimal.length; i > 0; i--) {
                var _position = split_decimal[i - 1];
                if (_position == '0') {
                    result = this.split('.')[1].substr(0, i - 1);
                } else {
                    break;
                }
            }
            if (result != '') {
                result = '.' + result;
            }
            return this.split('.')[0] + result;

        } else {
            return this;
        }

    }
}



Number.prototype.formatMoney = function (places, notReverse) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;

    let thousand = ",";
    let decimal = ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(10), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    var number_formated = negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand);
    //se valida si existe decimales
    var _decimal = ('' + number).split('.');
    var _format_decimal = "";

    if (_decimal.length == 2) {
        _format_decimal = "." + _decimal[1].substring(0, places);
    }

    if (_format_decimal == ',') {
        _format_decimal = '';
    }
    if (_format_decimal == '.') {
        for (var i = 0; i < places; i++) {
            _format_decimal += '0';
        }
    }

    if (decimal == -1) {
        notReverse = undefined;
    }

    if (notReverse == undefined)
        return (number_formated + _format_decimal).reverse();
    else
        return (number_formated + _format_decimal);
};

function QuitarFormatoNumerico(_number) {
    if (_number == null || _number == '') return '';
    return parseFloat(_number.toString().split(',').join(''));
}

//============================================================================================================
//FUNCION PARA HACER LLAMADOS A LOS API
//EJEMPLO :  onkeypress="return validateNumberPress(this,event);"
// METODO:url del servicio
// TYPE:verbo de solicitud (GET,POST,PUT,DELETE)
// callback: funcion de resultado de consulta API
// parametros:{} objeto para PUT y POST
// ASYC:creacion de nuevo hilo
// error:funcion de error de consulta
//============================================================================================================
function ConsultaAjax(metodo, type, callback, parametros, async, error) {
    $('.progress-bar').show();
    var progressBar = document.getElementById("progressAjax");
    var _url = 'http://localhost/InventoriesAPI/api/' + metodo;
    var req = new XMLHttpRequest();
    if (type == 'GET' || type == 'DELETE') {
        if (parametros != undefined) {
            if (parametros.length != undefined) {
                // for (var i = 0; i < parametros.length; i++) {
                _url += '/' + parametros;
                //}
            } else {
                _url += '/' + parametros;
            }

        }
    }

    req.open(type, _url, async == undefined ? true : async);

    req.onprogress = function (e) {
        if (progressBar != undefined || progressBar != null) {
            var pct = (e.loaded / e.total) * 100;
            $('.progress-bar').css('width', pct + '%');
        }

    }
    req.onloadend = function (pe) {
        if (progressBar != undefined || progressBar != null) {
            progressBar.value = pe.loaded;
        }
    }

    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                //   $('.progress-bar').hide();
                if (callback != undefined)
                    callback(JSON.parse(req.response));
            } else {
                $('body').css('cursor', 'default');
                console.error('Error: ' + req.responseText);
                //$('.progress-bar').addClass('progress-bar-danger');
                Swal.fire(
                    'Error',
                    'Se presento un error al consultar ',
                    'error');
                if (error != undefined)
                    error(req);
               
            }
        }
    };
    if (type != 'GET') {
        req.setRequestHeader("Content-type", "application/json");

        if (parametros != undefined)
            parametros = JSON.stringify(parametros);
        req.send(parametros);
        if (progressBar != undefined || progressBar != null) {
            $('.progress-bar').css('width', '10%');
        }
    } else {
        req.send(null);
        if (progressBar != undefined || progressBar != null) {
            $('.progress-bar').css('width', '10%');
        }
    }
}

//============================================================================================================
//FUNCION PARA VALIDAR SOLO NUMEROS
//EJEMPLO :  onkeypress="return validateNumberPress(this,event);"
// el:this
// e:event
//============================================================================================================
function validateNumberPress(el, e, decimales) {
    if (e.keyCode == 13 || e.keyCode == 32) {
        return false;

    }
    var _value_element = '';

    if (el.nodeName == 'INPUT') {
        _value_element = $(el).val();
    } else {
        _value_element = $(el).text();
    }
    var letra = String.fromCharCode(e.keyCode);
    if (letra != "." && decimales > 0) {
        if ($.isNumeric(_value_element + letra)) {
            if (decimales != undefined && decimales != 0) {
                //se valida la cantidad de decimales
                var _decimal = (_value_element + letra).split('.');

                if (_decimal.length == 2) {
                    if (_decimal[1].length > decimales) {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    } else {
        if ($.isNumeric(_value_element + letra)) {

            if (letra == '.' && decimales == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}


//============================================================================================================
//FUNCION PARA VALIDAR EL VALOR DE UN CAMPO PORCENTAJE QUE NO SEA MAYOR A 100
//el: this
// e:event
//============================================================================================================
function validateNumberPorcentaje(el, e) {



    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode != 46 && charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;

    var number
    if (el.tagName == 'DIV') {
        number = $(el).text() + String.fromCharCode(e.keyCode);
    }
    else {
        number = $(el).val() + String.fromCharCode(e.keyCode);
    }
    if (isNaN(number)) {
        return false;
    }

    if (number >= 0 && number > 100) {
        if (el.tagName == 'DIV') {
            $(el).text($(el).text());
        } else {
            $(el).val($(el).val())
        }
        return false;
    }
}

//============================================================================================================
//FUNCION PARA OBTENER DATOS POR QUERYSTRING
//resultado get.isEdit;
//============================================================================================================
function ObtenerQueryString() {
    var get = {
    };
    var loc = document.location.href;
    var getString = loc.split('?')[1];
    if (getString != undefined) {
        var GET = getString.split('&');
        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
    }
    return get;
}

//============================================================================================================
//FUNCION PARA OBTENER DATOS POR QUERYSTRING
//resultado get.isEdit;
//============================================================================================================
function Notificacion() {


}