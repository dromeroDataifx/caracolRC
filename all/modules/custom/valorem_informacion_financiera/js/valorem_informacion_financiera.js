var infoFinanciera = {				
	clases:{},
	activos:{},
	pasivos:{},
	patrimonios:{},
	sociedades:{},
	accionistas:{},
	pyg:{},
	general: {
		"top":0,
		"left":0,
		"paddingtop":0										
	},
	dataContainer: {},
	datos: {}
};

function querify( objectData ) {

	objectOu = {};
	
	if(typeof objectData.left != "undefined") { objectOu["left"] = objectData.left}
	if(typeof objectData.top != "undefined") { objectOu["top"] = objectData.top }
	if(typeof objectData.ancho != "undefined") { objectOu["width"] = objectData.ancho }
	if(typeof objectData.alto != "undefined") { objectOu["height"] = objectData.alto }
	if(typeof objectData.margintop != "undefined") { objectOu["margin-top"] = objectData.margintop }
	if(typeof objectData.marginleft != "undefined") { objectOu["margin-left"] = objectData.marginleft}
	if(typeof objectData.marginbottom != "undefined") { objectOu["margin-bottom"] = objectData.marginbottom }
	if(typeof objectData.marginright != "undefined") { objectOu["margin-right"] = objectData.marginright }
	if(typeof objectData.paddingtop != "undefined") { objectOu["padding-top"] = objectData.paddingtop }
	if(typeof objectData.paddingright != "undefined") { objectOu["padding-right"] = objectData.paddingright }
	if(typeof objectData.paddingbottom != "undefined") { objectOu["padding-bottom"] = objectData.paddingbottom }
	if(typeof objectData.paddingleft != "undefined") { objectOu["padding-left"] = objectData.paddingleft }

	return objectOu;

}
		
jQuery(document).ready(function() {

	jQuery("#pgybutton .data").html( jQuery("#pygcontent").html() );
	jQuery("#pygcontent").hide();
	jQuery("#sociedadesbutton .data").html( jQuery("#sociedadescontent").html(), function(){
		jQuery("#sociedadesbutton .data a").click( abrirSubgrupo );
	} );
	
	jQuery("#sociedadescontent").hide();
	jQuery("#pygcontent").hide();
	
	//Calculamos las dimensiones
	
	var segundaFila = 0;//49;
	
	infoFinanciera.dataContainer.elemento	= jQuery("#info-container");
	infoFinanciera.activos.valor			= infoFinanciera_data.clases["1"]["valor"];
	infoFinanciera.pasivos.valor			= infoFinanciera_data.clases["2"]["valor"];
	infoFinanciera.patrimonios.valor		= infoFinanciera_data.clases["3"]["valor"];
	
	infoFinanciera.clases.elemento 			= jQuery("#clases");
	infoFinanciera.clases.ancho 			= infoFinanciera.clases.elemento.width();
	infoFinanciera.clases.alto 				= infoFinanciera.clases.elemento.height();
	
	infoFinanciera.general.ancho			= infoFinanciera.clases.ancho;
	infoFinanciera.general.alto				= infoFinanciera.clases.alto;
	
	infoFinanciera.activos.elemento			= infoFinanciera.clases.elemento.find(".activos");
	infoFinanciera.pasivos.elemento			= infoFinanciera.clases.elemento.find(".pasivos");
	infoFinanciera.patrimonios.elemento		= infoFinanciera.clases.elemento.find(".patrimonios");
	infoFinanciera.sociedades.elemento		= infoFinanciera.clases.elemento.find(".sociedades");
	infoFinanciera.accionistas.elemento		= infoFinanciera.clases.elemento.find(".accionistas");
	infoFinanciera.pyg.elemento				= infoFinanciera.clases.elemento.find(".pyg");
	
	infoFinanciera.activos.marginright 		= parseInt( infoFinanciera.activos.elemento.css("margin-right").replace("px","") );
	infoFinanciera.pasivos.marginbottom 	= parseInt( infoFinanciera.pasivos.elemento.css("margin-bottom").replace("px","") );
	infoFinanciera.accionistas.marginright	= 1;
	
	infoFinanciera.activos.ancho 			= ((infoFinanciera.clases.ancho - infoFinanciera.activos.marginright) / 2) ;
	infoFinanciera.activos.paddingtop		= infoFinanciera.clases.alto / 2 - infoFinanciera.activos.elemento.find(".title").height() / 2;
	infoFinanciera.activos.alto 			= infoFinanciera.clases.alto - infoFinanciera.activos.paddingtop - 2 - segundaFila;
	infoFinanciera.activos.top				= 0;
	infoFinanciera.activos.left				= 0;
	infoFinanciera.activos.marginbottom		= 3;
	
	infoFinanciera.pasivos.ancho 			= infoFinanciera.activos.ancho-1;
	infoFinanciera.pasivos.alto 			= (infoFinanciera.clases.alto - segundaFila - infoFinanciera.pasivos.marginbottom) * (infoFinanciera.pasivos.valor / infoFinanciera.activos.valor);
	infoFinanciera.pasivos.paddingtop		= infoFinanciera.pasivos.alto / 2 - infoFinanciera.pasivos.elemento.find(".title").height() / 2;
	infoFinanciera.pasivos.alto 			= infoFinanciera.pasivos.alto - infoFinanciera.pasivos.paddingtop - 2;
	infoFinanciera.pasivos.top				= 0;
	infoFinanciera.pasivos.left				= infoFinanciera.activos.ancho + infoFinanciera.activos.marginright;
	
	infoFinanciera.patrimonios.ancho 		= infoFinanciera.activos.ancho;
	infoFinanciera.patrimonios.alto 		= (infoFinanciera.clases.alto - segundaFila - infoFinanciera.pasivos.marginbottom) * (infoFinanciera.patrimonios.valor / infoFinanciera.activos.valor);
	infoFinanciera.patrimonios.paddingtop	= infoFinanciera.patrimonios.alto / 2 - infoFinanciera.patrimonios.elemento.find(".title").height() / 2;
	infoFinanciera.patrimonios.alto			= infoFinanciera.patrimonios.alto - infoFinanciera.patrimonios.paddingtop - 2;
	infoFinanciera.patrimonios.top			= infoFinanciera.pasivos.alto + infoFinanciera.pasivos.marginbottom + infoFinanciera.pasivos.paddingtop;
	infoFinanciera.patrimonios.left			= infoFinanciera.activos.ancho + infoFinanciera.activos.marginright;
	
	infoFinanciera.sociedades.ancho 		= infoFinanciera.activos.ancho;
	infoFinanciera.sociedades.alto 			= 0;//46;
	infoFinanciera.sociedades.paddingtop	= infoFinanciera.sociedades.alto / 2 - infoFinanciera.sociedades.elemento.find(".title").height() / 2;
	infoFinanciera.sociedades.alto			= infoFinanciera.sociedades.alto - infoFinanciera.sociedades.paddingtop - 2;
	infoFinanciera.sociedades.top			= infoFinanciera.activos.alto + infoFinanciera.activos.marginbottom + infoFinanciera.activos.paddingtop;
	infoFinanciera.sociedades.left			= infoFinanciera.activos.left;
	
	
	infoFinanciera.accionistas.ancho 		= (infoFinanciera.patrimonios.ancho - infoFinanciera.accionistas.marginright) / 2;
	infoFinanciera.accionistas.alto 		= 0;//46;
	infoFinanciera.accionistas.paddingtop	= infoFinanciera.accionistas.alto / 2 - infoFinanciera.accionistas.elemento.find(".title").height() / 2;
	infoFinanciera.accionistas.alto			= infoFinanciera.accionistas.alto - infoFinanciera.accionistas.paddingtop - 2;
	infoFinanciera.accionistas.top			= infoFinanciera.activos.alto + infoFinanciera.activos.marginbottom + infoFinanciera.activos.paddingtop;
	infoFinanciera.accionistas.left			= infoFinanciera.activos.ancho + infoFinanciera.activos.marginright;	
	
	infoFinanciera.pyg.ancho 				= infoFinanciera.accionistas.ancho;
	infoFinanciera.pyg.alto 				= 0;//46; 
	infoFinanciera.pyg.paddingtop			= infoFinanciera.pyg.alto / 2 - infoFinanciera.pyg.elemento.find(".title").height() / 2;
	infoFinanciera.pyg.alto					= infoFinanciera.pyg.alto - infoFinanciera.pyg.paddingtop - 2;
	infoFinanciera.pyg.top					= infoFinanciera.activos.alto + infoFinanciera.activos.marginbottom + infoFinanciera.activos.paddingtop;
	infoFinanciera.pyg.left					= infoFinanciera.accionistas.left + infoFinanciera.accionistas.ancho + infoFinanciera.accionistas.marginright;
	
	
	
	var show_activos = Math.round(infoFinanciera.activos.valor / 1000000 );
	var show_pasivos = Math.round(infoFinanciera.pasivos.valor / 1000000 ); 
	var show_patrimonios = show_activos - show_pasivos;
	
	
	
	infoFinanciera.activos.elemento.find(".title .valor").html( goMoney( show_activos,".",".",",",false ) );
	infoFinanciera.pasivos.elemento.find(".title .valor").html( goMoney( show_pasivos,".",".",",",false ) );
	infoFinanciera.patrimonios.elemento.find(".title .valor").html( goMoney( show_patrimonios,".",".",",",false ) );
	
	infoFinanciera.pasivos.valor			= infoFinanciera_data.clases["2"]["valor"];
	infoFinanciera.patrimonios.valor		= infoFinanciera_data.clases["3"]["valor"];
	
	//Redimensionamos primera etapa
	
	infoFinanciera.clases.elemento.find(".activos").width( 	infoFinanciera.activos.ancho ).height( infoFinanciera.activos.alto 
		).css("padding-top",infoFinanciera.activos.paddingtop+"px").css("top",infoFinanciera.activos.top+"px").css("left",infoFinanciera.activos.left+"px");
	infoFinanciera.clases.elemento.find(".pasivos").width( 	infoFinanciera.pasivos.ancho ).height( infoFinanciera.pasivos.alto 
		).css("padding-top",infoFinanciera.pasivos.paddingtop+"px").css("top",infoFinanciera.pasivos.top+"px").css("left",infoFinanciera.pasivos.left+"px");
	infoFinanciera.clases.elemento.find(".patrimonios").width( 	infoFinanciera.patrimonios.ancho ).height( infoFinanciera.patrimonios.alto 
		).css("padding-top",infoFinanciera.patrimonios.paddingtop+"px").css("top",infoFinanciera.patrimonios.top+"px").css("left",infoFinanciera.patrimonios.left+"px");
	infoFinanciera.clases.elemento.find(".sociedades").width( 	infoFinanciera.sociedades.ancho ).height( infoFinanciera.sociedades.alto 
		).css("padding-top",infoFinanciera.sociedades.paddingtop+"px").css("top",infoFinanciera.sociedades.top+"px").css("left",infoFinanciera.sociedades.left+"px");
	infoFinanciera.clases.elemento.find(".accionistas").width( 	infoFinanciera.accionistas.ancho ).height( infoFinanciera.accionistas.alto 
		).css("padding-top",infoFinanciera.accionistas.paddingtop+"px").css("top",infoFinanciera.accionistas.top+"px").css("left",infoFinanciera.accionistas.left+"px");
	infoFinanciera.clases.elemento.find(".pyg").width( 	infoFinanciera.pyg.ancho ).height( infoFinanciera.pyg.alto 
		).css("padding-top",infoFinanciera.pyg.paddingtop+"px").css("top",infoFinanciera.pyg.top+"px").css("left",infoFinanciera.pyg.left+"px");
	
	
	
	//Eventos para las clases
	jQuery("#clases .clase").click(function(){
		
		var classContainer = jQuery(this);
				
		if( jQuery(this).hasClass("inside") ) return false;
		classContainer.parent().parent().find("h4").removeClass("opaco").removeClass("resaltado");
		
		jQuery("#clases .clase").css("z-index","1").removeClass("inside");
		classContainer.css("z-index","2").addClass("inside").animate( querify(infoFinanciera.general) , function() {
		
			var html_result = "";
			var count = 0;
			var items_por_pagina = 4;
			
			var relacion = classContainer.attr("rel");
			var items_current = ( ( relacion.toString().length == "2" )?infoFinanciera_data.cuentas:infoFinanciera_data.grupos );
			
			if( relacion == "PYG" ) {
				
				html_result = jQuery("#pygcontent").html();
				
			}
			
			if( relacion == "M" ||relacion == "A" ) {
				
				relacion = relacion + "1";
				
			}
			
			for( grupo in items_current ) {
				if( (" "+grupo).indexOf( relacion )== 1 ) {
					count++;
				
					if ( (count - 1) % items_por_pagina == 0 ) {
						html_result += "<div class='pc_item'>";
					}
				
						html_result += "<a class='row first pc_item' rel='"+grupo+"'>" +
								"<div class='subtitle'><h3>"+items_current[grupo]["nombre"]+"</h3>" +
								"<span class='valor'>"+goMoney( items_current[grupo]["valor"],".",".","," )+"</span></div>" +
							"<div class='content'></div></a>";
						
					if ( (count) % items_por_pagina == 0 ) {
						html_result += "</div>";
					}
				}
			}
			
			//En caso de que haya terminado en una cantidad de items no exacta
			if ( (count) % items_por_pagina != 0 ) {
				html_result += "</div>";
			}
			
			html_result = '<div id="presentation_container" class="data"><div class="iup inactive"></div><div class="iscroll-wrap"><div class="presentation_container_iscroll">'+html_result+'</div></div><div class="idown"></div></div><a class="back-button">atr&aacute;s</a>';
		
			classContainer.find(".content").html( html_result );
			
			/*
			 * Relacionado con el scroll
			*/
			
			//Desactivamos el down
			var co = classContainer.find(".presentation_container_iscroll");
			//jQuery(".idown").removeClass("inactive");
			if( co.parent().height() > co.height() ) {
				
				classContainer.find(".idown").addClass("inactive");
			}
			
			jQuery(".iup").bind('mousedown', iScrollUp );
			jQuery(".iup").bind('mouseup', function() { iWho = null;return false; } );
			jQuery(".iup").bind('click',function(){return false;});

			jQuery(".idown").bind('mousedown', iScrollDown );
			jQuery(".idown").bind('mouseup', function() { iWho = null;return false; } );
			jQuery(".idown").bind('click',function(){return false;});
					
			/*
			 * Fin Scroll
			*/
			
			/*
			 * Relacionado con el acordeon
			*/
			jQuery("#pygcontainer .detalle").slideUp("fast");
			
			jQuery("#pygcontainer .detalle").click(function() {
				return false;
			});
			
			jQuery("#pygcontainer h4:first").addClass("noopen");
			
			jQuery("#pygcontainer h4").click(function(){
				if( !jQuery(this).hasClass("noopen") ) {
					if( !jQuery(this).hasClass("active") ) {
						jQuery("#pygcontainer h4").removeClass("active");
						jQuery(this).addClass("active");
						jQuery("#pgybutton h5").slideUp("slow");
						jQuery("#pygcontainer .detalle[rel="+jQuery(this).attr("rel")+"]").slideDown("slow");
						jQuery("#pygcontainer .detalle:not( [rel="+jQuery(this).attr("rel")+"] )").slideUp("slow");
						
						//Elementos para resaltar
						jQuery("#pygcontainer h4").addClass("opaco").removeClass("resaltado");						
						jQuery(this).removeClass("opaco").addClass("resaltado");
						jQuery(this).prevAll("h4").eq(0).removeClass("opaco").addClass("resaltado");
						
					} else {
						jQuery("#pygcontainer h4").removeClass("active").removeClass("opaco").removeClass("resaltado");
						jQuery("#pgybutton h5").slideDown("slow");
						jQuery("#pygcontainer .detalle").slideUp("slow");
					}
				}
				return false;
			});
			
			jQuery("#pygcontainer h5").click( abrirSubgrupo );
						
			/*
			 * Fin del acordeon
			*/
			
			jQuery("#clases .clase .data a").click( abrirSubgrupo );			
			
			classContainer.find("a.back-button").click(function(){
				classContainer.find(".content").html("");
				classContainer.animate(  querify(infoFinanciera[ classContainer.attr("value") ]) );	
				classContainer.removeClass("inside")				
				return false;
			});
		});
		return false;
	});
	
	
	var abrirSubgrupo = function(){
	
		var classContainer = jQuery(this);
		
		if( !jQuery(this).hasClass("active-inside") ) {
		
			var datos = [];var datosNext = [];
			var subgrupo = jQuery(this).attr("rel");
			
			switch ( subgrupo.length ) {
				case 1:
					datos = infoFinanciera_data.grupos;
					datosNext = infoFinanciera_data.cuentas;
					break;
				case 2:				
					datos = infoFinanciera_data.cuentas;
					datosNext = infoFinanciera_data.subcuentas;
					break;
				case 4:
					datos = infoFinanciera_data.subcuentas;
					datosNext = [];
					break;				
				case 6:
					return false;
					datos = [];
					datosNext = [];
					break; 
			}
			
			classContainer.addClass("active-inside").find(".subtitle").addClass("active");
			classContainer.css("z-index",""+(jQuery(this).length+1)).css("position","absolute").animate( querify(infoFinanciera.general) , function() {
				
				var html_result = "";
				for( grupo in datos ) {
					if( (" "+grupo).indexOf( classContainer.attr("rel") )== 1 ) {
					
					
						/*
						 * Esto para calcular el número de items pertenecientes al siguiente escenario, si es 0, esto es indicado
						*/
						var tieneHijos = false;
						for( datoNext in datosNext ) {
							if( (" "+datoNext).indexOf( grupo )== 1 ) {
								tieneHijos = true;
								break;
							}
						}
					
						var claseHijos = (tieneHijos)?'':'nokids';
					
						html_result += "<a class='row "+claseHijos+" first' rel='"+grupo+"'>" +
								"<div class='subtitle "+claseHijos+" etapa"+subgrupo.length+"'><h3>"+datos[grupo]["nombre"]+"</h3>" +
								"<span class='valor'>"+goMoney( datos[grupo]["valor"],".",".","," )+"</span></div>" +
							"<div class='content'></div></a>";
					}
				}
				html_result = '<div class="data"><div class="iup inactive"></div><div class="iscroll-wrap"><div class="presentation_container_iscroll">'+html_result+'</div></div><div class="idown"></div></div><a class="back-button">atr&aacute;s</a>';	
				classContainer.find(".content").html( html_result );


				/*
				 * Relacionado con el scroll
				*/
				
				//Desactivamos el down
				var co = classContainer.find(".presentation_container_iscroll");
				//jQuery(".idown").removeClass("inactive");
				if( co.parent().height() > co.height() ) {
					
					classContainer.find(".idown").addClass("inactive");
				}
				
				jQuery(".iup").bind('mousedown', iScrollUp );
				jQuery(".iup").bind('mouseup', function() { iWho = null;return false; } );
				jQuery(".iup").bind('click',function(){return false;});

				jQuery(".idown").bind('mousedown', iScrollDown );
				jQuery(".idown").bind('mouseup', function() { iWho = null;return false; } );
				jQuery(".idown").bind('click',function(){return false;});
						
				/*
				 * Fin Scroll
				*/
				
				
				jQuery("#clases .clase .data a").not(".nokids").click( abrirSubgrupo );
				
				classContainer.find("a.back-button").click(function(){
					classContainer.find(".subtitle").removeClass("active")
					classContainer.removeClass("active-inside").css("position","static").css("height","auto").css("width","auto").find(".content").html("");
					return false;
				});
				
			
			});
		} else {
		
		}
		
		return false; 
	};
	
	/*
	 * Automatizacion Scroll
	*/
	
	var iMov = "+"; var iWho = null;
	var iScrollTasker = function() {
		if(iWho !=null) {
			if( (iMov=="+" && iWho.css("marginTop")=="0px")) {
				iWho.parent().parent().children(".iup").addClass("inactive");
			} else if(   iMov=="-" && parseInt(iWho.css("marginTop").replace("px",""))*-1+iWho.parent().height()>iWho.height()  ) {
				iWho.parent().parent().children(".idown").addClass("inactive");
			} else {
				if( iMov === "+" ) {
					iWho.parent().parent().children(".idown").removeClass("inactive");
				} else if( iMov==="-") {
					iWho.parent().parent().children(".iup").removeClass("inactive");
				}
				iWho.animate({"marginTop":iMov+"=10px"},0);
			}
		}
	}
	setInterval(iScrollTasker,100);
	
	var iScrollUp = function() {
	
		//jQuery(this).parent().find(".presentation_container_iscroll").animate({"marginTop":"-=20px"});
		iMov = "+";
		iWho = jQuery(this).parent().find(".presentation_container_iscroll");
		
		return false;		
	}
	
	var iScrollDown = function() {
	
		iMov = "-";
		iWho = jQuery(this).parent().find(".presentation_container_iscroll");
		//jQuery(this).parent().find(".presentation_container_iscroll").animate({"marginTop":"+=20px"});
		return false;
		
	}
	
});

var separadorMillon = "'";

/*function goMoney(numero,OseparadorDec,DseparadorMil,DseparadorDec) {

	var result = 0;
	if(numero) {
		var nums = numero.toString().split(OseparadorDec);
		var cabecera = format(nums[0]);
		var mantiza = "00";
		if(nums[1]) {
			mantiza = nums[1].substring(0, 2);
		}

		result = cabecera + DseparadorDec + mantiza;
	}
	return result;

};*/

function goMoney(numero,OseparadorDec,DseparadorMil,DseparadorDec, resume) {
	
	resume = (typeof resume == 'undefined')?true:resume;
	numero = (typeof numero == 'undefined')?"":numero;
	var result = numero;
	var tail = '';
	
	numero = numero.toString();
	while(  numero.indexOf(",") > 0  ) {
		numero = numero.replace(",",".");
	}
	
	if(numero && parseFloat(numero) ) {
		
		var milesmillones = 1000000; 
		//if( (numero > milesmillones || (-1)*numero > milesmillones )  && resume ) { //Este condicional solo formatea los valores mayores al limite
		if(resume) {
			numero = numero / milesmillones;
			tail = "MM";tail = ""; //Si lleva Miles de Millon coloca MM, o según sea la unidad cambiar
		}
		var nums = numero.toString().split(OseparadorDec);
		var cabecera = format(nums[0]);
		var mantiza = "00";
		if(nums[1]) {//Quitamos decimales
			mantiza = nums[1].substring(0, 2);
			mantiza = ""; //Quitamos decimales
		} else {
			mantiza = "";//Quitamos decimales
		}
		
		DseparadorDec = "";//Quitamos decimales
		result = cabecera + DseparadorDec + mantiza;
	} else {
		if( numero.length > 15 && resume ) {
			result = numero.substr(0,13);
			tail = "...";
		}
	}
	
	return result + tail;
	
};

function format(num)
{
	if(!isNaN(num) ){

		var negativo = false;
		if(num<0){
			negativo = true;
			num = num * -1;
		}

		var digitos = num.toString().split('').reverse();

		if(digitos.length==0){
			return 0;
		} else {
			num = parseInt(num);
			digitos = num.toString().split('').reverse();
		}

		var result = "";
		for(i = 0; i < digitos.length; i++) {
			result = digitos[i] + result;
			if((i+1)%3==0 && (i+1) < digitos.length) {
				if ((i+1)%6==0) {
					result = separadorMillon + result;
				} else {
					result = "." + result;
				}
			}
		}

		if(negativo) {
			result = "-"+result;
		}

		return result;
	}
	else{
		//alert('Solo se permiten numeros');
		return 0;
	}

};