<? foreach ($files as $j => $file): ?>
    <div class="file">
        <?
        $matches = false;
        preg_match('/(?<=\.)(\w*)$/i', $file['filename'], $matches);
        $clases = (isset($matches[0]) && !empty($matches[0])) ? "icons-extension extension-{$matches[0]}" : "";

        print l($file['description'], file_create_url($file['uri']), array('attributes' => array('class' => $clases, 'title' => $file['description'], 'target' => '_blank')));
        ?>
    </div>
<? endforeach; ?>