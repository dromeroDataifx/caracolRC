<? foreach ($data as $fecha => $tipoInforme): ?>
    <? foreach ($tipoInforme as $nombre => $listas): ?>
        <h3><?= $nombre; ?></h3>
        <? foreach ($listas as $i => $tabla): ?>
            <table>
                <thead>
                    <tr><th colspan="2">Tabla <?= $i; ?></th></tr>
                    <tr>
                        <th><?= $fecha; ?></th>
                        <th>Millones de pesos</th>
                    </tr>
                </thead>
                <tbody>
                    <? foreach ($tabla as $row): ?>
                        <tr>
                            <th><?= $row['nombre']; ?></th>
                            <td><?= number_format($row['valor'] / 1000000, 2); ?></td>
                        </tr>
                    <? endforeach; ?>
                </tbody>
            </table>
        <? endforeach; ?>
    <? endforeach; ?>
<? endforeach; ?>