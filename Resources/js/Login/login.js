function validarDatos(e) {

    let usuario = document.getElementById('txtusuario').value;
    let password = document.getElementById('txtpassword').value;


    if (usuario == '' || password == '') {
        Swal.fire(
            'inicio de sesión',
            'los campos de usuario y contraseña son obligatorios',
            'error'
        )
    }
}