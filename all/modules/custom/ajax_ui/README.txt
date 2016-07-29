1.  Descripción
este modulo genera una interfaz unificada de ajax para facilitar el uso de las url que atienden el ajax
hace llamados de hooks declarados por este modulo

2.  HOOKs
aca se listan los hooks usados por este modulo
    2.1 hook_ajax_keys_process
    2.1.1 Descripcion
            obtiene de otros modulos los arguemntos que van a atender asi como las funciones que van a ejecutar cuando se encuentren esos argumentos
            es decir que se obitnen lo manejadores para el ajax
            keys:
            callback funcion que va a procesar los argumentos