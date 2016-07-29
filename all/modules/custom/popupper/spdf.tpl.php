<html>
    <head><title></title></head>
    <style>
        #fix-sup {
            background-color:white;
            opacity:0;
            height: 39px;
            left: 774px;
            position: absolute;
            width: 51px;
            z-indez:9999;
        }

        #fix-sup2 {
            background-color:white;
            opacity:0;
            height: 31px;
            left: 8px;
            position: absolute;
            width: 619px;
            z-indez:9999;
        }
        #fix-cont {
            background-color:white;
            opacity:0;
            height: 563px;
            left: 9px;
            position: absolute;
            top: 33px;
            width: 785px;
            z-indez:9999;
        }
    </style>
    <script src="https://www.google.com/jsapi" type="text/javascript">
        $(document).ready(function() {
            window.document.onContextMenu = function() {
                return false;
            }
            var wrapper = $("iframe");
            $("#fix-sup").css({
                top: (wrapper.position().top) + "px",
                left: (wrapper.position().left + wrapper.outerWidth() - 35) + "px"
            });
            $("#fix-cont").css({
                top: (wrapper.position().top + 35) + "px",
                left: (wrapper.position().left) + "px",
                width: (wrapper.width() - 15) + "px",
                height: (wrapper.outerHeight() - 54) + "px"
            });
        });
    </script>
    <body oncontextmenu="return false;">
        <div id="fix-sup"></div>
        <div id="fix-sup2"></div>
        <div id="fix-cont"></div>
        <iframe src="http://docs.google.com/gview?url=<?= $pdf ?>&embedded=true&toolbar=false" width="800" height="600"></iframe>
    </body>
</html>