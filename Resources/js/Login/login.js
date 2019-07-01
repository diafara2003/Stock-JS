function validarDatos(e) {

    let usuario = document.getElementById('txtusuario').value;
    let password = document.getElementById('txtpassword').value;


    if (usuario == '' || password == '') {
        Swal.fire(
            'inicio de sesión',
            'los campos de usuario y contraseña son obligatorios',
            'error')
    } else {
        ConsultaAjax(`usuario/validar?user=${usuario}&password=${password}`, 'GET', function (response) {
            if (response != undefined && response.usuId == 0) {
                Swal.fire(
                    'inicio de sesión',
                    'El usuario no existe, por favor verifique.',
                    'error')
            }
            else {
                window.location.href = window.location.href.split('Views')[0]+'/Views/marco/inicio.html';
            }
        });
    }
}