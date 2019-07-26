function validarDatos(e) {

    let usuario = document.getElementById('txtusuario').value;
    let password = document.getElementById('txtpassword').value;


    if (usuario == '' || password == '') {
        Swal.fire(
            'inicio de sesión',
            'los campos de usuario y contraseña son obligatorios',
            'error')
    } else {
        
        ConsultaAjaxLogin(`usuario/validar?user=${usuario}&password=${password}`, 'GET', function (response) {
            if (response != undefined && response.usuId == 0) {
                Swal.fire(
                    'inicio de sesión',
                    'El usuario no existe, por favor verifique.',
                    'error')
            }
            else {
                localStorage.setItem("sesion-inventories-app", Generar_objeto_sesion(response));
                window.location.href = window.location.href.split('Views')[0] + 'Views/marco/inicio.html';
            }
        });
    }
}

function Generar_objeto_sesion(response) {
    return JSON.stringify(response);

}


function ConsultaAjaxLogin(metodo, type, callback, parametros, async, error) {
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