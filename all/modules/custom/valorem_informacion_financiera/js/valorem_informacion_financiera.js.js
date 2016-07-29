var infoFinanciera = {				
	clases:{},
	activos:{},
	pasivos:{},
	patrimonios:{},
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
	
	//Calculamos las dimensiones
	
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
	
	infoFinanciera.activos.marginright 		= parseInt( infoFinanciera.activos.elemento.css("margin-right").replace("px","") );
	infoFinanciera.pasivos.marginbottom 	= parseInt( infoFinanciera.pasivos.elemento.css("margin-bottom").replace("px","") );
	
	
	infoFinanciera.activos.ancho 			= (infoFinanciera.clases.ancho - infoFinanciera.activos.marginright) / 2 - 2;
	infoFinanciera.activos.paddingtop		= infoFinanciera.clases.alto / 2 - infoFinanciera.activos.elemento.find(".title").height() / 2;
	infoFinanciera.activos.alto 			= infoFinanciera.clases.alto - infoFinanciera.activos.paddingtop - 2;
	infoFinanciera.activos.top				= 0;
	infoFinanciera.activos.left				= 0;
	
	infoFinanciera.pasivos.ancho 			= infoFinanciera.activos.ancho;
	infoFinanciera.pasivos.alto 			= (infoFinanciera.clases.alto - infoFinanciera.pasivos.marginbottom) * (infoFinanciera.pasivos.valor / infoFinanciera.activos.valor);
	infoFinanciera.pasivos.paddingtop		= infoFinanciera.pasivos.alto / 2 - infoFinanciera.pasivos.elemento.find(".title").height() / 2;
	infoFinanciera.pasivos.alto 			= infoFinanciera.pasivos.alto - infoFinanciera.pasivos.paddingtop - 2;
	infoFinanciera.pasivos.top				= 0;
	infoFinanciera.pasivos.left				= infoFinanciera.activos.ancho + infoFinanciera.activos.marginright;
	
	infoFinanciera.patrimonios.ancho 		= infoFinanciera.activos.ancho;
	infoFinanciera.patrimonios.alto 		= (infoFinanciera.clases.alto - infoFinanciera.pasivos.marginbottom) * (infoFinanciera.patrimonios.valor / infoFinanciera.activos.valor);
	infoFinanciera.patrimonios.paddingtop	= infoFinanciera.patrimonios.alto / 2 - infoFinanciera.patrimonios.elemento.find(".title").height() / 2;
	infoFinanciera.patrimonios.alto			= infoFinanciera.patrimonios.alto - infoFinanciera.patrimonios.paddingtop - 2;
	infoFinanciera.patrimonios.top			= infoFinanciera.pasivos.alto + infoFinanciera.pasivos.marginbottom + infoFinanciera.pasivos.paddingtop;
	infoFinanciera.patrimonios.left			= infoFinanciera.activos.ancho + infoFinanciera.activos.marginright;
	
	infoFinanciera.activos.elemento.find(".title .valor").html( goMoney( infoFinanciera.activos.valor,",",".","," ) );
	infoFinanciera.pasivos.elemento.find(".title .valor").html( goMoney( infoFinanciera.pasivos.valor,",",".","," ) );
	infoFinanciera.patrimonios.elemento.find(".title .valor").html( goMoney( infoFinanciera.patrimonios.valor,",",".","," ) );
	
	infoFinanciera.pasivos.valor			= infoFinanciera_data.clases["2"]["valor"];
	infoFinanciera.patrimonios.valor		= infoFinanciera_data.clases["3"]["valor"];
	
	//Redimensionamos primera etapa
	
	infoFinanciera.clases.elemento.find(".activos").width( 	infoFinanciera.activos.ancho ).height( infoFinanciera.activos.alto 
		).css("padding-top",infoFinanciera.activos.paddingtop+"px").css("top",infoFinanciera.activos.top+"px").css("left",infoFinanciera.activos.left+"px");
	infoFinanciera.clases.elemento.find(".pasivos").width( 	infoFinanciera.pasivos.ancho ).height( infoFinanciera.pasivos.alto 
		).css("padding-top",infoFinanciera.pasivos.paddingtop+"px").css("top",infoFinanciera.pasivos.top+"px").css("left",infoFinanciera.pasivos.left+"px");
	infoFinanciera.clases.elemento.find(".patrimonios").width( 	infoFinanciera.patrimonios.ancho ).height( infoFinanciera.patrimonios.alto 
		).css("padding-top",infoFinanciera.patrimonios.paddingtop+"px").css("top",infoFinanciera.patrimonios.top+"px").css("left",infoFinanciera.patrimonios.left+"px");
	
	//Eventos para las clases
	jQuery("#clases .clase").click(function(){
		var classContainer = jQuery(this);
		jQuery("#clases .clase").css("z-index","1").removeClass("inside");
		classContainer.css("z-index","2").addClass("inside").animate( querify(infoFinanciera.general) , function() {
		
			var html_result = "";
			for( grupo in infoFinanciera_data.grupos ) {
				if( (" "+grupo).indexOf( classContainer.attr("rel") )== 1 ) {
					html_result += "<a class='row first' rel='"+grupo+"'>" +
							"<div class='subtitle'><h3>"+infoFinanciera_data.grupos[grupo]["nombre"]+"</h3>" +
							"<span class='valor'>"+goMoney( infoFinanciera_data.grupos[grupo]["valor"],",",".","," )+"</span></div>" +
						"<div class='content'></div></a>";
				}
			}
			html_result = '<div class="data">'+html_result+'</div><a class="back-button">atr&aacute;s</a>';
		
			classContainer.find(".content").html( html_result );
			classContainer.find(".content .data").easySlider({
				prevText:'UP',
				nextText:'DOWN',
				orientation:'vertical'
			});
			
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
		
			var datos = null;
			var subgrupo = jQuery(this).attr("rel");
			
			switch ( subgrupo.length ) {
				case 2:				
					datos = infoFinanciera_data.cuentas;
					break;
				case 4:
					datos = infoFinanciera_data.subcuentas;
					break;				
				case 6:
					return false;
					datos = [];
					break; 
			}
			
			classContainer.addClass("active-inside").find(".subtitle").addClass("active");
			classContainer.css("z-index",""+(jQuery(this).length+1)).css("position","absolute").animate( querify(infoFinanciera.general) , function() {
				
				var html_result = "";
				for( grupo in datos ) {
					if( (" "+grupo).indexOf( classContainer.attr("rel") )== 1 ) {
						html_result += "<a class='row first' rel='"+grupo+"'>" +
								"<div class='subtitle etapa"+subgrupo.length+"'><h3>"+datos[grupo]["nombre"]+"</h3>" +
								"<span class='valor'>"+goMoney( datos[grupo]["valor"],",",".","," )+"</span></div>" +
							"<div class='content'></div></a>";
					}
				}
				html_result = '<div class="data">'+html_result+'</div><a class="back-button">atr&aacute;s</a>';			
				classContainer.find(".content").html( html_result );
				
				jQuery("#clases .clase .data a").click( abrirSubgrupo );
				
				classContainer.find("a.back-button").click(function(){
					classContainer.find(".subtitle").removeClass("active")
					classContainer.removeClass("active-inside").css("position","static").css("height","auto").css("width","auto").find(".content").html("");
					return false;
				});
				
			
			});
		}
		
		return false; 
	};
	
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
		
		var milesmillones = 1000000000; 
		if( (numero > milesmillones || (-1)*numero > milesmillones )  && resume ) {
			numero = numero / milesmillones;
			tail = "MM";
		}
		
		var nums = numero.toString().split(OseparadorDec);
		var cabecera = format(nums[0]);
		var mantiza = "00";
		if(nums[1]) {
			mantiza = nums[1].substring(0, 2);
		}
		
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