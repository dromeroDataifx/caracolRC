<?php

Class Token {

    CONST ESTADO_NO_USADO = 0;
    CONST ESTADO_USADO = 1;

    private $tokenHash;
    private $data;
    private $state;
    private $created;
    private $updated;

    public function __construct($data = array()) {
        $this->setHash(Token::buildTokenHash($data));
        $this->setData($data);
        $this->setState(Token::ESTADO_NO_USADO);
        $this->setCreated(time());
        $this->setUpdated(time());
    }

    public function setData($data) {
        $this->data = $data;
    }

    public function getData() {
        return $this->data;
    }

    public function setState($state) {
        $this->state = $state;
    }

    public function getState() {
        return $this->state;
    }

    protected function setHash($hash) {
        $this->tokenHash = $hash;
    }

    public function getHash() {
        return $this->tokenHash;
    }

    protected function setCreated($created) {
        $this->created = $created;
    }

    public function getCreated() {
        return $this->created;
    }

    protected function setUpdated($updated) {
        $this->updated = $updated;
    }

    public function getUpdated() {
        return $this->updated;
    }

    /**
     * almacen ael token actual
     */
    public function save() {
        $query = db_select('token_invite_generator_tokens', 'tokens');
        $query->fields('tokens');
        $query->where('hash=:hash', array(':hash' => $this->getHash()));

        $time = time();
        $result = $query->execute();
        $exist = $result->rowCount() > 0;
        if ($exist) {
            $query = db_update('token_invite_generator_tokens');
            $query->fields(array(
                'data' => serialize($this->getData()),
                'state' => $this->getState(),
                'updated' => $time
            ));
            $query->condition('hash', $this->getHash());
            $query->execute();
        } else {
            $query = db_insert('token_invite_generator_tokens');
            $query->fields(array(
                'hash' => $this->getHash(),
                'data' => serialize($this->getData()),
                'state' => $this->getState(),
                'created' => $time,
                'updated' => $time
            ));

            $query->execute();
            $this->setCreated($time);
            $params = $this->getData();
            $params['hash'] = $this->getHash();            
            drupal_mail('token_invite_generator', 'invite', $params['email'], 'es', $params);
        }
        $this->setUpdated($time);
    }

    /**
     * almacen ael token actual
     */
    public function load($hash) {
        $query = db_select('token_invite_generator_tokens', 'tokens');
        $query->fields('tokens');
        $query->where('hash=:hash', array(':hash' => $hash));
        $result = $query->execute();
        if ($result->rowCount() > 0) {
            $row = $result->fetchObject();
            $this->setHash($hash);
            $this->setData(unserialize($row->data));
            $this->setState($row->state);
            $this->setCreated($row->created);
            $this->setUpdated($row->updated);
        }
    }

    /**
     * construye un id unico para el token solicitado
     */
    public static function buildTokenHash($data) {
        $preHash = '';
        $time = time();
        if (is_array($data) && !empty($data)) {
            foreach ($data as $key => $value)
                $segments[] = "{$key}={$value}";
            $preHash = implode('~', $segments) . rand($time - 100000, $time);
            return sha1($preHash);
        } else
            return false;
    }

}
