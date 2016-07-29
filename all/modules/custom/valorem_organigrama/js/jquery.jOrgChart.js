/**
 * jQuery org-chart/tree plugin.
 *
 * Author: Wes Nolte
 * http://www.tquila.com
 *
 * Based on the work of Mark Lee
 * http://www.capricasoftware.co.uk 
 *
 * This software is licensed under the Creative Commons Attribution-ShareAlike
 * 3.0 License.
 *
 * See here for license terms:
 * http://creativecommons.org/licenses/by-sa/3.0
 */
(function($) {

  $.fn.jOrgChart = function(options) {
    var opts = $.extend({}, $.fn.jOrgChart.defaults, options);
	var $appendTo = $(opts.chartElement);

    return this.each(function() {
      $this = $(this);
      var $container = $("<div class='" + opts.chartClass + "'/>");
      if($this.is("ul")) {
        buildNode($this.find("li:first"), $container, 0, opts);
      }
      else if($this.is("li")) {
        buildNode($this, $container, 0, opts);
      }
      $appendTo.append($container);
    });
  };

  $.fn.jOrgChart.defaults = {
	chartElement : 'body',
    depth      : -1,
    chartClass : "jOrgChart"
  };

  function buildNode($node, $appendTo, level, opts) {
	
    var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
    var $tbody = $("<tbody/>");

	// Construct the node container(s)
    var $nodeRow = $("<tr class='nivel"+level+"' />").addClass("node-cells");
    var $nodeCell = $("<td/>").addClass("node-cell").attr("colspan", 2);
    var $childNodes = $node.children("ul:first").children("li");
	
    if($childNodes.length > 1) {
      $nodeCell.attr("colspan", $childNodes.length * 2);
    }
	
	// Draw the node
	// Get the contents - any markup except li and ul allowed
	var $nodeContent = $node.clone().children("ul,li").remove().end().html();
    //var $heading = $("<h2>").text(nodeContent);
	
		var claseNodo = $nodeContent.toLowerCase();
		claseNodo = str_replace(" ","",claseNodo);
		claseNodo = str_replace("á","a",claseNodo);
		claseNodo = str_replace("é","e",claseNodo);
		claseNodo = str_replace("í","i",claseNodo);
		claseNodo = str_replace("ó","o",claseNodo);
		claseNodo = str_replace("ú","u",claseNodo);
		claseNodo = str_replace("ñ","n",claseNodo);
	
    $nodeDiv = $("<div>").addClass("node").addClass(claseNodo).append($nodeContent);

	if($childNodes.length == 0) {
		$nodeDiv.addClass("nochildren");
	}
	
	// Expand and contract nodes
    $nodeDiv.click(function() {
      var $this = $(this);
      var $tr = $this.closest("tr");
      $tr.nextAll("tr").fadeToggle("fast");

	  if($tr.hasClass('contracted')){
		$this.css('cursor','n-resize');
		$tr.addClass('expanded');
	  }else{
		$this.css('cursor','s-resize');
		$tr.addClass('contracted');
	  }
    });
	
    $nodeCell.append($nodeDiv);
    $nodeRow.append($nodeCell);
    $tbody.append($nodeRow);

    if($childNodes.length > 0) {
	  // if it can be expanded then change the cursor
	  $nodeDiv.css('cursor','n-resize').addClass('expanded');
	
	  // recurse until leaves found (-1) or to the level specified
      if(opts.depth == -1 || (level+1 < opts.depth)) { 
        var $downLineRow = $("<tr class='separador-nivel"+level+"' />");
        var $downLineCell = $("<td/>").attr("colspan", $childNodes.length*2);
        $downLineRow.append($downLineCell);
        
		// draw the connecting line from the parent node to the horizontal line 
		$downLine = $("<div></div>").addClass("line down");
		$downLineCell.append($downLine);
        $tbody.append($downLineRow);

        // Draw the horizontal lines
        var $linesRow = $("<tr  class='multiseparador-nivel"+level+"'  />");
        $childNodes.each(function() {
          var $left = $("<td/>").addClass("line left top");
          var $right = $("<td/>").addClass("line right top");
          $linesRow.append($left).append($right);
        });

		// horizontal line shouldn't extend beyond the first and last child branches
        $linesRow.find("td:first").removeClass("top");
        $linesRow.find("td:last").removeClass("top");
        $tbody.append($linesRow);
        var $childNodesRow = $("<tr/>");
		$childNodes.each(function() {
           var $td = $("<td class='node-container'/>");
           $td.attr("colspan", 2);
		   // recurse through children lists and items
           buildNode($(this), $td, level+1, opts);
           $childNodesRow.append($td);
        });
      }
      $tbody.append($childNodesRow);
    }

    $table.append($tbody);
    $appendTo.append($table);
  };
  
  function str_replace(origen,destino,cadena) {
	
	while(cadena.indexOf(origen)>-1) {
		cadena = cadena.replace(origen, destino);
	}
	
	return cadena
  }

})(jQuery);
