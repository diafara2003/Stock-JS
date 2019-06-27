function mostrar_menu(_this) {
    if ($(_this).hasClass('oculto')) {
        $(_this).removeClass('oculto');
        $('.menu').show('swing');
        $('.container-do-work').removeClass('oculto-menu');
    }else{
        $(_this).addClass('oculto');
        $('.menu').hide('swing');
        $('.container-do-work').addClass('oculto-menu');
    }
}