<?php

/**
 * Curl Class
 *
 * @package	DATA iFX
 * @subpackage	Libraries
 * @category	Libraries
 * @author	Javier Rojas (jrojas@dataifx.com)
 * @link        http://dataifx.com
 */
class Curl {

    public function __construct() {
        
    }

    public function get($url, $fields) {
        
    }

    public function post($url, $fields) {

        $sesion = curl_init($url);
        /* definir tipo de peticion a realizar: POST */
        curl_setopt($sesion, CURLOPT_POST, true);
        /* Le pasamos los parametros definidos anteriormente */
        curl_setopt($sesion, CURLOPT_POSTFIELDS, $this->encodeField($fields));
        /* solo queremos que nos devuelva la respuesta */
        curl_setopt($sesion, CURLOPT_HEADER, false);
        curl_setopt($sesion, CURLOPT_RETURNTRANSFER, true);
        /* ejecutamos la peticion */
        $respuesta = curl_exec($sesion);
        /* cerramos conexion */
        curl_close($sesion);
        /* devolvemos la respuesta */
        $query = "{$url}?{$this->encodeField($fields)}";
//        drupal_set_message(kpr($query, true));
        return $respuesta;
    }

    protected function encodeField($fields) {
        foreach ($fields as $key => $value) {

            $pieces[] = "{$key}={$this->encode($value)}";
        }
        return implode('&', $pieces);
    }

    protected function encode($var) {
        $out = $var;
        switch (gettype($var)) {
            case 'boolean':
                $out = $var ? 'true' : 'false';
        }
        return urlencode($out);
    }

}
