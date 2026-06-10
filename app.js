// app.js — Espacios urbanos 3º ESO (SRS)
// 58 preguntas: selección múltiple (3 opciones), respuesta brevísima y reconocimiento con imagen.
// Diseñado para práctica espaciada: fallos vuelven antes; aciertos se espacian en intervalos crecientes.


// === DIAGNÓSTICO: útil si se abre en navegador local ===
document.addEventListener("DOMContentLoaded", () => {
  const ind = document.getElementById("js-indicator");
  if (ind) ind.textContent = "JS cargado ✅ · Modo SRS activo";
});
window.addEventListener("error", (e) => {
  const box = document.getElementById("js-error");
  if (box) box.textContent = `ERROR JS: ${e.message}\n${e.filename || ""}\nLínea: ${e.lineno || "?"}`;
});

const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "espacios_urbanos_3eso_srs_v2";

// =====================
// Imágenes libres / estables (Wikimedia Commons; sin SVG)
// =====================
const IMG = {
  urbano: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Manhattan%20from%20Top%20of%20the%20Rock%20New%20York%20City.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Manhattan_from_Top_of_the_Rock_New_York_City.jpg"
  },
  rural: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Campos%20de%20Castilla.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Campos_de_Castilla.jpg"
  },
  casco: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Toledo%20old%20town%20from%20Parador.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Toledo_old_town_from_Parador.jpg"
  },
  cbd: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Canary%20Wharf%20Skyline%202018.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Canary_Wharf_Skyline_2018.jpg"
  },
  ensanche: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Eixample%20Barcelona%20aerial%20view.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Eixample_Barcelona_aerial_view.jpg"
  },
  periferia: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Suburbia%20by%20David%20Shankbone.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Suburbia_by_David_Shankbone.jpg"
  },
  chabolas: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Dharavi%20slum%20in%20Mumbai.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Dharavi_slum_in_Mumbai.jpg"
  },
  planoIrregular: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Medina%20of%20Fez%20-%20map.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Medina_of_Fez_-_map.jpg"
  },
  planoRadio: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Plan%20of%20Karlsruhe%201733.jpg?width=1400",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Plan_of_Karlsruhe_1733.jpg"
  },
  planoDamero: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Manhattan%20streets%20aerial%20view.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Manhattan_streets_aerial_view.jpg"
  },
  areaMetro: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Madrid%20Metropolitan%20Area%20Sentinel-2.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Madrid_Metropolitan_Area_Sentinel-2.jpg"
  },
  conurbacion: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Ruhr%20area%20map.png?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Ruhr_area_map.png"
  },
  megalopolis: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/US%20Northeast%20Megalopolis%20Cities%20Map.png?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:US_Northeast_Megalopolis_Cities_Map.png"
  },
  urbanizacion: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shanghai%20Skyline%202018%20-%20Pudong.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Shanghai_Skyline_2018_-_Pudong.jpg"
  },
  tokio: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo%20from%20the%20top%20of%20the%20SkyTree.JPG?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Tokyo_from_the_top_of_the_SkyTree.JPG"
  },
  nuevaYork: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Lower%20Manhattan%20from%20Jersey%20City%20September%202020%20HDR%20panorama.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Lower_Manhattan_from_Jersey_City_September_2020_HDR_panorama.jpg"
  },
  europa: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Blue%20Banana.svg.png?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Blue_Banana.svg"
  },
  madrid: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Madrid%20City%20Skyline%20-%20May%202020.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Madrid_City_Skyline_-_May_2020.jpg"
  },
  barcelona: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Barcelona%20Eixample%20aerial%20view.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Barcelona_Eixample_aerial_view.jpg"
  },
  transporte: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/AVE%20S-103%20Madrid-Atocha.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:AVE_S-103_Madrid-Atocha.jpg"
  }
};

// =====================
// Helpers de corrección
// =====================
function normalizar(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}
function esMulti(q) { return q.tipo === "multi" || q.tipo === "img-multi"; }
function esCorta(q) { return q.tipo === "corta" || q.tipo === "img-corta"; }
function coincideCorta(dado, esperados) {
  const d = normalizar(dado);
  return (esperados || []).some(e => normalizar(e) === d);
}
function barajar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function ahora() { return Date.now(); }
function dias(n) { return n * 24 * 60 * 60 * 1000; }

// Mezcla opciones sin perder la respuesta correcta.
function opcionesMezcladas(q) {
  if (!esMulti(q)) return [];
  if (!q._opcionesSesion) {
    q._opcionesSesion = barajar(q.opciones.map((texto, original) => ({ texto, original })));
  }
  return q._opcionesSesion;
}
function limpiarMezclas() { preguntas.forEach(q => delete q._opcionesSesion); }

// =====================
// Preguntas: 58 ítems para recuperación, discriminación y transferencia
// =====================
let preguntas = [
  {id:"u01-limites", tipo:"multi", img:IMG.urbano, es:"Hoy los límites entre espacio urbano y rural son menos claros sobre todo por…", hint:"Causa principal del texto.", opciones:["transportes y TIC","climas y ríos","solo monumentos históricos"], correcta:0, explicacion:"Los transportes extienden funciones urbanas y las TIC homogeneizan estilos de vida."},
  {id:"u02-densidad", tipo:"multi", img:IMG.urbano, es:"Una característica básica del espacio urbano es…", hint:"Contrástalo con el rural.", opciones:["alta densidad de población","gran superficie continua poco poblada","predominio del sector primario"], correcta:0, explicacion:"El espacio urbano concentra mucha población en poca superficie."},
  {id:"u03-usos", tipo:"multi", img:IMG.urbano, es:"En el espacio urbano predominan los usos del suelo…", hint:"Edificios, carreteras, infraestructuras.", opciones:["artificiales","agrarios","forestales"], correcta:0, explicacion:"Predominan edificios, vías e infraestructuras: usos artificiales."},
  {id:"u04-sector", tipo:"corta", img:IMG.urbano, es:"¿Qué sector económico sostiene principalmente la actividad urbana?", hint:"Dos palabras como máximo.", respuestas:["servicios","sector servicios"], explicacion:"La actividad urbana se apoya sobre todo en el sector servicios."},
  {id:"u05-rural", tipo:"img-multi", img:IMG.rural, es:"La imagen representa mejor un espacio…", hint:"Fíjate en baja densidad y gran superficie.", opciones:["rural","CBD","ensanche"], correcta:0, explicacion:"El espacio rural ocupa grandes superficies con menor densidad y menos usos artificiales."},
  {id:"u06-rural-sector", tipo:"multi", img:IMG.rural, es:"En el espacio rural ocupan gran parte del territorio las actividades del sector…", hint:"Agricultura, ganadería, pesca, minería.", opciones:["primario","financiero","tecnológico"], correcta:0, explicacion:"El sector primario ocupa mucho espacio rural, aunque no siempre genere más empleo o riqueza."},
  {id:"u07-ciudad", tipo:"multi", img:IMG.urbano, es:"Según el texto, ciudad y espacio urbano…", hint:"No son exactamente iguales.", opciones:["no son exactamente lo mismo","son siempre idénticos","solo existen en países ricos"], correcta:0, explicacion:"Una ciudad es una localidad dentro de un espacio urbanizado; un espacio urbanizado extenso puede albergar varias ciudades."},
  {id:"u08-criterio", tipo:"corta", img:IMG.urbano, es:"¿Qué criterio usan la mayoría de países para definir ciudad?", hint:"Una palabra.", respuestas:["cuantitativo"], explicacion:"El criterio más usado es cuantitativo: número de habitantes."},
  {id:"u09-espana", tipo:"corta", img:IMG.madrid, es:"En España, ¿desde cuántos habitantes se considera ciudad?", hint:"Solo número.", respuestas:["10000","10 000","10.000"], explicacion:"En España se considera ciudad toda población de más de 10.000 habitantes."},

  {id:"c10-centro", tipo:"multi", img:IMG.casco, es:"En ciudades europeas históricas, el centro suele corresponder al antiguo…", hint:"También llamado centro histórico.", opciones:["casco antiguo","suburbio difuso","polígono industrial"], correcta:0, explicacion:"El centro histórico o casco antiguo ocupa la ciudad previa a la industrialización."},
  {id:"c11-calles", tipo:"img-multi", img:IMG.casco, es:"Las calles estrechas e irregulares del centro histórico se explican por…", hint:"No hubo diseño previo claro.", opciones:["falta de planificación previa","trazado en damero moderno","urbanismo de baja densidad"], correcta:0, explicacion:"En muchos cascos antiguos el crecimiento fue espontáneo y sin planificación urbanística previa."},
  {id:"c12-cbd", tipo:"corta", img:IMG.cbd, es:"¿Qué siglas nombran el Distrito Central de Negocios?", hint:"Tres letras.", respuestas:["CBD"], explicacion:"CBD significa Central Business District o Distrito Central de Negocios."},
  {id:"c13-cbd-funcion", tipo:"img-multi", img:IMG.cbd, es:"La imagen encaja con un CBD porque predominan…", hint:"Rascacielos, oficinas, negocios.", opciones:["oficinas y actividad financiera","cultivos y pastos","viviendas de autoconstrucción"], correcta:0, explicacion:"El CBD concentra actividad comercial, financiera y oficinas."},
  {id:"c14-centro-funciones", tipo:"multi", img:IMG.casco, es:"En el centro urbano la función residencial suele ser…", hint:"Comparada con otras áreas.", opciones:["menor que en otras zonas","la única función existente","mayor que toda actividad comercial"], correcta:0, explicacion:"En el centro hay menos función residencial y mucha actividad comercial, financiera y cultural."},
  {id:"c15-ensanche", tipo:"img-corta", img:IMG.ensanche, es:"¿Cómo se llaman en muchas ciudades europeas los barrios planificados del siglo XIX?", hint:"Una palabra.", respuestas:["ensanche","ensanches"], explicacion:"Los ensanches tienen calles amplias, rectilíneas y planificadas."},
  {id:"c16-ensanche-trazado", tipo:"multi", img:IMG.ensanche, es:"Los ensanches se reconocen por calles más amplias y rectilíneas que se cortan…", hint:"Forma geométrica.", opciones:["perpendicularmente","sin ningún orden","solo en círculos"], correcta:0, explicacion:"Los ensanches suelen organizar calles rectas que se cruzan perpendicularmente."},
  {id:"c17-periferia", tipo:"multi", img:IMG.periferia, es:"La periferia urbana es…", hint:"Anillo exterior de crecimiento.", opciones:["el anillo edificado más exterior","el casco antiguo medieval","el distrito central de negocios"], correcta:0, explicacion:"La periferia es el área suburbana exterior y zona actual de crecimiento."},
  {id:"c18-contrastes", tipo:"img-multi", img:IMG.chabolas, es:"El texto señala que la periferia de muchas grandes ciudades puede tener fuertes…", hint:"Chabolas y urbanizaciones de alto standing.", opciones:["contrastes sociales y residenciales","murallas medievales homogéneas","solo centros financieros"], correcta:0, explicacion:"En la periferia pueden coexistir barrios pobres y urbanizaciones de alta calidad."},
  {id:"c19-suburbio", tipo:"multi", img:IMG.periferia, es:"En Geografía urbana, suburbio significa…", hint:"No siempre equivale a barrio pobre.", opciones:["zona residencial de la periferia","barrio histórico central","ciudad global"], correcta:0, explicacion:"Suburbio designa zonas residenciales periféricas, ricas o pobres."},
  {id:"c20-difusa", tipo:"multi", img:IMG.periferia, es:"La ciudad difusa se caracteriza por…", hint:"Modelo anglosajón de baja densidad.", opciones:["baja densidad y viviendas unifamiliares","calles estrechas medievales","máxima concentración en altura"], correcta:0, explicacion:"El crecimiento difuso presenta baja densidad, viviendas unifamiliares o bloques bajos y amplias zonas verdes."},
  {id:"c21-police", tipo:"multi", img:IMG.periferia, es:"Cuando surgen varios centros urbanos en la expansión de la ciudad hablamos de modelo…", hint:"Opuesto al centro-ciudad-periferia clásico.", opciones:["policéntrico","monocultivo","rural absoluto"], correcta:0, explicacion:"El modelo policéntrico tiene varios centros funcionales en el espacio urbanizado."},
  {id:"c22-sostenible", tipo:"multi", img:IMG.periferia, es:"La ciudad difusa se considera menos sostenible porque implica…", hint:"Suelo, energía, transporte.", opciones:["más transporte privado y consumo de suelo","menos desplazamientos y menos energía","solo calles peatonales compactas"], correcta:0, explicacion:"Consume más suelo y energía, y depende más del transporte privado."},

  {id:"p23-plano-def", tipo:"multi", img:IMG.planoDamero, es:"El plano urbano permite observar la forma y estructura de una localidad: edificios, calles, plazas y…", hint:"Elementos del espacio urbano.", opciones:["zonas verdes","placas tectónicas","fronteras estatales"], correcta:0, explicacion:"El plano urbano representa a escala la disposición de calles, edificios, plazas, zonas verdes, etc."},
  {id:"p24-irregular", tipo:"img-corta", img:IMG.planoIrregular, es:"¿Qué tipo de plano tiene calles sin orden, estrechas y sinuosas?", hint:"Una palabra.", respuestas:["irregular","plano irregular"], explicacion:"El plano irregular presenta calles desordenadas, de anchura y longitud variables."},
  {id:"p25-radio", tipo:"img-corta", img:IMG.planoRadio, es:"¿Qué tipo de plano tiene avenidas que parten de un centro y otras concéntricas?", hint:"Una palabra compuesta.", respuestas:["radioconcentrico","radiocentrico","plano radioconcentrico","plano radiocentrico"], explicacion:"El plano radioconcéntrico combina vías radiales y avenidas concéntricas."},
  {id:"p26-damero", tipo:"img-corta", img:IMG.planoDamero, es:"¿Qué tipo de plano forma una cuadrícula o damero?", hint:"Una palabra.", respuestas:["ortogonal","damero","plano ortogonal","plano en damero"], explicacion:"El plano ortogonal o en damero se organiza en calles rectas y perpendiculares."},
  {id:"p27-manzanas", tipo:"multi", img:IMG.planoDamero, es:"En el plano ortogonal los edificios se agrupan en…", hint:"Bloques urbanos.", opciones:["manzanas","arrabales","dorsales"], correcta:0, explicacion:"Las calles perpendiculares forman manzanas de forma y tamaño semejantes."},
  {id:"p28-planes", tipo:"multi", img:IMG.ensanche, es:"Los planes urbanísticos regulan…", hint:"Edificación, usos, trazado.", opciones:["qué se puede edificar, cómo y para qué uso","la temperatura de la ciudad","la lengua oficial del país"], correcta:0, explicacion:"Regulan espacios edificables, usos, características de construcción y trazado de calles."},
  {id:"p29-coexistencia", tipo:"multi", img:IMG.casco, es:"En una gran ciudad histórica suelen coexistir distintos tipos de planos porque…", hint:"Cada época construye con criterios distintos.", opciones:["se ha edificado en épocas diferentes","todas las calles se hicieron a la vez","no hay crecimiento urbano"], correcta:0, explicacion:"Las necesidades y criterios urbanísticos cambian con el tiempo."},

  {id:"g30-area", tipo:"img-multi", img:IMG.areaMetro, es:"Una gran ciudad o metrópoli unida funcionalmente a núcleos próximos forma un área…", hint:"Trabajo, estudios, servicios.", opciones:["metropolitana","rural continua","monumental"], correcta:0, explicacion:"El área metropolitana integra una ciudad central y núcleos próximos con intensos flujos diarios."},
  {id:"g31-flujos", tipo:"multi", img:IMG.areaMetro, es:"En un área metropolitana hay intensos flujos diarios de…", hint:"Desplazamientos y relaciones.", opciones:["población y mercancías","glaciares y volcanes","monumentos y murallas"], correcta:0, explicacion:"Las localidades dependen de la ciudad central para trabajo, estudios y servicios."},
  {id:"g32-conurbacion", tipo:"img-corta", img:IMG.conurbacion, es:"¿Cómo se llama el espacio formado por varias áreas metropolitanas que llegan a unirse físicamente?", hint:"Una palabra.", respuestas:["conurbacion","conurbación"], explicacion:"Una conurbación surge cuando varias áreas metropolitanas crecen hasta unirse físicamente."},
  {id:"g33-megalopolis", tipo:"img-corta", img:IMG.megalopolis, es:"¿Cuál es el espacio urbano más grande, con varias ciudades, áreas metropolitanas y conurbaciones?", hint:"Una palabra.", respuestas:["megalopolis","megalópolis"], explicacion:"La megalópolis es el mayor tipo de espacio urbano."},
  {id:"g34-mega-diferencia", tipo:"multi", img:IMG.megalopolis, es:"A diferencia de la conurbación, la megalópolis…", hint:"No todo está edificado.", opciones:["no forma un continuo urbano","es siempre una sola ciudad pequeña","carece de áreas metropolitanas"], correcta:0, explicacion:"En una megalópolis se intercalan espacios rurales entre zonas urbanizadas."},
  {id:"g35-sansan", tipo:"multi", img:IMG.megalopolis, es:"SanSan es la megalópolis que se extiende desde San Francisco hasta…", hint:"Costa de California.", opciones:["San Diego","Nueva Delhi","El Cairo"], correcta:0, explicacion:"SanSan enlaza San Francisco, San Diego y el área de Tijuana."},
  {id:"g36-europa-central", tipo:"multi", img:IMG.europa, es:"En Europa central se considera megalópolis el espacio densamente urbanizado entre Londres, Bruselas, París y ciudades de…", hint:"También Países Bajos.", opciones:["Alemania","Australia","Nigeria"], correcta:0, explicacion:"Incluye Londres, Bruselas, París y principales ciudades de Alemania y Países Bajos."},

  {id:"m37-urbanizacion", tipo:"multi", img:IMG.urbanizacion, es:"Urbanización es el proceso por el que el espacio urbano gana habitantes en detrimento del espacio…", hint:"Opuesto a urbano.", opciones:["rural","marino","polar"], correcta:0, explicacion:"La urbanización aumenta la población urbana frente a la rural."},
  {id:"m38-1900", tipo:"corta", img:IMG.urbanizacion, es:"A comienzos del siglo XX, ¿qué porcentaje de la población mundial vivía en ciudades?", hint:"Número con %.", respuestas:["13%","13 %","13"], explicacion:"A comienzos del siglo XX vivía en ciudades el 13% de la población mundial."},
  {id:"m39-actual", tipo:"multi", img:IMG.urbanizacion, es:"En la actualidad, más del porcentaje de población mundial urbana indicado en el texto es…", hint:"Más de la mitad.", opciones:["55 %","13 %","8 %"], correcta:0, explicacion:"Actualmente más del 55% de la población mundial vive en ciudades."},
  {id:"m40-2050", tipo:"corta", img:IMG.urbanizacion, es:"Según la estimación del texto, en 2050 la población urbana mundial rondará el…", hint:"Número con %.", respuestas:["68%","68 %","68"], explicacion:"Para 2050 se estima alrededor del 68%."},
  {id:"m41-industrial", tipo:"multi", img:IMG.urbanizacion, es:"La industrialización impulsó la urbanización porque provocó…", hint:"Movimiento campo-ciudad.", opciones:["migración masiva del campo a la ciudad","abandono total de las fábricas","descenso de los transportes"], correcta:0, explicacion:"Las fábricas atrajeron población rural hacia las ciudades."},
  {id:"m42-africa-asia", tipo:"multi", img:IMG.urbanizacion, es:"La ONU estima que gran parte del crecimiento urbano futuro se producirá en países de…", hint:"Continentes con mayor incremento.", opciones:["África y Asia","Oceanía y Antártida","Europa occidental únicamente"], correcta:0, explicacion:"El texto indica que el 90% del crecimiento urbano mundial se producirá en África y Asia."},
  {id:"m43-espana-etapa1", tipo:"multi", img:IMG.barcelona, es:"En España, entre mediados del siglo XIX y los años cincuenta, la urbanización fue…", hint:"Primera etapa.", opciones:["lenta y centrada en pocas ciudades","explosiva en todas las aldeas","nula por completo"], correcta:0, explicacion:"Fue lenta y se concentró en Barcelona, Bilbao, Madrid, Valencia y Zaragoza."},
  {id:"m44-exodo", tipo:"multi", img:IMG.madrid, es:"Entre 1960 y 1980 España vivió un éxodo rural masivo relacionado con industrialización, turismo y…", hint:"Facilitaron desplazamientos.", opciones:["desarrollo de los transportes","cierre total de ciudades","desaparición de periferias"], correcta:0, explicacion:"El desarrollo de los transportes favoreció el éxodo rural."},
  {id:"m45-1980", tipo:"multi", img:IMG.areaMetro, es:"Desde 1980 en España crecen especialmente las…", hint:"Modelo de ciudad difusa.", opciones:["periferias urbanas","ciudades amuralladas medievales","zonas rurales aisladas"], correcta:0, explicacion:"Desde 1980 pierde intensidad el éxodo rural y crecen las periferias, formando áreas metropolitanas."},
  {id:"m46-megaciudad", tipo:"corta", img:IMG.tokio, es:"¿Cómo se llama una ciudad que supera los 10 millones de habitantes?", hint:"Una palabra.", respuestas:["megaciudad","megaciudades"], explicacion:"Las megaciudades superan los 10 millones de habitantes."},
  {id:"m47-1950", tipo:"multi", img:IMG.tokio, es:"En 1950 solo existían dos megaciudades: Nueva York y…", hint:"Hoy sigue entre las mayores.", opciones:["Tokio","Zaragoza","Lyon"], correcta:0, explicacion:"En 1950 solo Nueva York y Tokio superaban ese umbral."},
  {id:"m48-tokio", tipo:"img-corta", img:IMG.tokio, es:"¿Cuál es la mayor megaciudad citada en el texto desde hace décadas?", hint:"Una palabra.", respuestas:["tokio","gran tokio"], explicacion:"El Gran Tokio es citado como la mayor megaciudad, con más de 37 millones."},

  {id:"r49-red", tipo:"multi", img:IMG.nuevaYork, es:"La red urbana mundial es jerárquica porque ordena ciudades según su capacidad para…", hint:"Influencia sobre otras urbes y territorios.", opciones:["influir sobre otras ciudades y territorios","producir solo alimentos","tener murallas antiguas"], correcta:0, explicacion:"La jerarquía urbana depende de la importancia de las relaciones e influencia de cada ciudad."},
  {id:"r50-global", tipo:"multi", img:IMG.nuevaYork, es:"Una ciudad global es aquella donde se toman decisiones con repercusiones…", hint:"Escala planetaria.", opciones:["mundiales o casi mundiales","solo de barrio","exclusivamente agrícolas"], correcta:0, explicacion:"Las ciudades globales influyen económica, política y socialmente en gran parte del planeta."},
  {id:"r51-habitantes", tipo:"multi", img:IMG.nuevaYork, es:"La posición de una ciudad global no viene determinada principalmente por…", hint:"Puede ser muy poblada, pero no es el criterio decisivo.", opciones:["el número de habitantes","sus funciones de decisión","sus flujos financieros"], correcta:0, explicacion:"Importan más las funciones, decisiones, conexiones y flujos que la población total."},
  {id:"r52-rasgos", tipo:"multi", img:IMG.nuevaYork, es:"Rasgo típico de una ciudad global:", hint:"Sedes de multinacionales e instituciones financieras.", opciones:["gran dinamismo económico y centros de decisión","aislamiento respecto a otras ciudades","baja conexión internacional"], correcta:0, explicacion:"Las ciudades globales albergan grandes empresas, instituciones financieras y organismos internacionales."},
  {id:"r53-cosmopolita", tipo:"corta", img:IMG.nuevaYork, es:"¿Cómo se llama una ciudad donde residen personas de distintas nacionalidades y culturas?", hint:"Una palabra.", respuestas:["cosmopolita","cosmopolitas"], explicacion:"Cosmopolita significa con población de distintas nacionalidades y culturas."},
  {id:"r54-ejemplos-globales", tipo:"multi", img:IMG.nuevaYork, es:"Según el texto, una de las ciudades globales más influyentes es…", hint:"Ejemplos: Nueva York, Londres, París, Tokio, Hong Kong.", opciones:["Nueva York","Salamanca","Córdoba"], correcta:0, explicacion:"Nueva York, Londres, París, Tokio y Hong Kong aparecen como ciudades globales muy influyentes."},
  {id:"r55-jerarquia", tipo:"multi", img:IMG.europa, es:"En la jerarquía urbana mundial, por debajo de las metrópolis globales están las metrópolis…", hint:"Influencia sobre un continente.", opciones:["continentales","locales pequeñas","rurales aisladas"], correcta:0, explicacion:"Tras las globales aparecen las continentales, nacionales, regionales y el resto de ciudades."},

  {id:"e56-red-europa", tipo:"multi", img:IMG.europa, es:"La red urbana europea es una de las más densas del mundo por la temprana…", hint:"Proceso económico histórico.", opciones:["industrialización","desertización","glaciación"], correcta:0, explicacion:"La temprana industrialización favoreció una red urbana europea densa y conectada."},
  {id:"e57-dorsal", tipo:"img-corta", img:IMG.europa, es:"¿Qué nombre recibe la zona más urbanizada y dinámica de Europa con forma curva?", hint:"Dos palabras.", respuestas:["banana azul","dorsal europea","eje europeo"], explicacion:"La Dorsal Europea o Banana Azul concentra población, riqueza, empresas e industrias."},
  {id:"e58-dorsal-ciudad", tipo:"multi", img:IMG.europa, es:"Una ciudad incluida en la Dorsal Europea es…", hint:"Londres, Bruselas, Ámsterdam, Róterdam, Fráncfort, Zúrich, Milán.", opciones:["Fráncfort","Nueva Delhi","Santiago de Chile"], correcta:0, explicacion:"Fráncfort forma parte de la Dorsal Europea y es sede del Banco Central Europeo."},
  {id:"e59-europa-ciudades", tipo:"multi", img:IMG.europa, es:"A diferencia de otros continentes, en Europa predominan las ciudades…", hint:"No depende tanto de megaciudades.", opciones:["medianas","solo megaciudades","sin funciones especializadas"], correcta:0, explicacion:"Europa destaca por muchas ciudades medianas bien conectadas y especializadas."},
  {id:"e60-global-europea", tipo:"multi", img:IMG.europa, es:"Según el texto, Londres destaca como ciudad global europea por…", hint:"Función principal.", opciones:["finanzas internacionales","agricultura cerealista","minería rural"], correcta:0, explicacion:"Londres destaca por su papel en las finanzas internacionales."},

  {id:"s61-subsistema", tipo:"multi", img:IMG.madrid, es:"Un subsistema urbano es una red específica donde las relaciones entre sus ciudades son…", hint:"Definición clave.", opciones:["muy intensas","inexistentes","solo rurales"], correcta:0, explicacion:"Un subsistema urbano agrupa ciudades con relaciones muy intensas entre sí."},
  {id:"s62-mono", tipo:"corta", img:IMG.madrid, es:"¿Cómo se llama el subsistema en el que una ciudad organiza y controla las relaciones?", hint:"Una palabra.", respuestas:["monocentrico","monocéntrico"], explicacion:"En el subsistema monocéntrico una ciudad organiza y controla buena parte de las relaciones."},
  {id:"s63-poli", tipo:"corta", img:IMG.barcelona, es:"¿Cómo se llama el subsistema organizado por varias ciudades?", hint:"Una palabra.", respuestas:["policentrico","policéntrico"], explicacion:"En un subsistema policéntrico varias ciudades articulan la red."},
  {id:"s64-madrid", tipo:"img-multi", img:IMG.madrid, es:"Madrid es ejemplo de subsistema urbano…", hint:"Zona central y conjunto del país.", opciones:["monocéntrico","insular","sin jerarquía"], correcta:0, explicacion:"Madrid organiza la zona central y ejerce influencia sobre todo el país."},
  {id:"s65-nacionales", tipo:"multi", img:IMG.barcelona, es:"Las metrópolis nacionales españolas son…", hint:"Influyen sobre todo el país.", opciones:["Madrid y Barcelona","Valladolid y Salamanca","Córdoba y Alicante"], correcta:0, explicacion:"Madrid y Barcelona son las metrópolis nacionales de la red urbana española."},
  {id:"s66-regionales", tipo:"multi", img:IMG.madrid, es:"Valencia, Sevilla, Zaragoza, Bilbao o Málaga son ejemplos de metrópolis…", hint:"Articulan espacios regionales.", opciones:["regionales","globales mundiales","pequeñas localidades"], correcta:0, explicacion:"Son metrópolis regionales porque concentran y articulan espacios regionales."},
  {id:"s67-medias", tipo:"multi", img:IMG.barcelona, es:"Valladolid, Alicante, Salamanca o Córdoba son ejemplos de…", hint:"Articulan el espacio provincial.", opciones:["ciudades medias","metrópolis globales","megalópolis"], correcta:0, explicacion:"Las ciudades medias articulan el espacio provincial."},
  {id:"s68-transporte", tipo:"img-multi", img:IMG.transporte, es:"Las infraestructuras de transporte son fundamentales porque…", hint:"Autovías, AVE, puertos, aeropuertos.", opciones:["articulan la red urbana","eliminan todas las ciudades","impiden los flujos"], correcta:0, explicacion:"Facilitan desplazamientos de personas y mercancías y refuerzan relaciones entre ciudades."}
];

preguntas = preguntas.filter(q => !new Set(["u07-ciudad","u08-criterio","c14-centro-funciones","c18-contrastes","c21-police","p23-plano-def","p28-planes","p29-coexistencia","g36-europa-central","m43-espana-etapa1"]).has(q.id));
if (preguntas.length < 50 || preguntas.length > 60) console.warn("⚠️ El test debería tener entre 50 y 60 preguntas. Tiene:", preguntas.length);

// =====================
// Estado SRS
// =====================
function estadoInicial() {
  const s = {};
  preguntas.forEach(q => s[q.id] = { box: 0, due: 0, aciertos: 0, fallos: 0, last: 0 });
  return s;
}
function cargarSRS() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...estadoInicial(), ...saved };
  } catch { return estadoInicial(); }
}
function guardarSRS() { localStorage.setItem(STORAGE_KEY, JSON.stringify(srs)); }
function intervaloPorCaja(box) {
  return [0, dias(1), dias(3), dias(7), dias(14), dias(30)][Math.min(box, 5)];
}
function programar(qid, correcto) {
  const item = srs[qid] || { box: 0, due: 0, aciertos: 0, fallos: 0, last: 0 };
  if (correcto) {
    item.box = Math.min((item.box || 0) + 1, 5);
    item.aciertos = (item.aciertos || 0) + 1;
    item.due = ahora() + intervaloPorCaja(item.box);
  } else {
    item.box = 0;
    item.fallos = (item.fallos || 0) + 1;
    item.due = ahora() + 5 * 60 * 1000; // vuelve pronto: práctica correctiva
  }
  item.last = ahora();
  srs[qid] = item;
  guardarSRS();
}
function vencidas() {
  const t = ahora();
  return preguntas.map((q, idx) => ({ q, idx, st: srs[q.id] || {} })).filter(x => (x.st.due || 0) <= t);
}

let srs = cargarSRS();
let modoSesion = "mixta";
let orden = [];
let indice = 0;
let respuestasUsuario = new Array(preguntas.length).fill(null);
let historialSesion = [];
let colaRefuerzo = [];

function construirOrden() {
  limpiarMezclas();
  const due = vencidas().map(x => x.idx);
  const newOnes = preguntas.map((q, idx) => ({ q, idx, st: srs[q.id] || {} })).filter(x => !(x.st.last)).map(x => x.idx);
  const weak = preguntas.map((q, idx) => ({ q, idx, st: srs[q.id] || {} }))
    .filter(x => (x.st.fallos || 0) > 0)
    .sort((a,b) => (b.st.fallos || 0) - (a.st.fallos || 0))
    .map(x => x.idx);

  let base = [];
  if (modoSesion === "vencidas") base = due;
  else if (modoSesion === "fallos") base = weak;
  else base = [...new Set([...due, ...newOnes, ...weak, ...preguntas.map((_,i)=>i)])];

  orden = barajar(base.slice()).slice(0, preguntas.length);
  if (!orden.length) orden = barajar(preguntas.map((_,i)=>i));
  indice = 0;
  respuestasUsuario = new Array(preguntas.length).fill(null);
  historialSesion = [];
  colaRefuerzo = [];
}

// =====================
// Render
// =====================
function actualizarProgreso() {
  const barra = $("progress-bar");
  const label = $("progress-label");
  if (!barra || !label) return;
  const total = orden.length || preguntas.length;
  const porcentaje = total ? ((indice + 1) / total) * 100 : 0;
  barra.style.width = porcentaje + "%";
  label.textContent = `Pregunta ${Math.min(indice + 1, total)} de ${total} · SRS`;
}
function pintarMeta(q) {
  const st = srs[q.id] || {box:0, aciertos:0, fallos:0};
  return `<div class="hint">Caja SRS: <strong>${st.box || 0}</strong> · Aciertos previos: ${st.aciertos || 0} · Fallos previos: ${st.fallos || 0}</div>`;
}
function renderPregunta() {
  if (!orden.length) construirOrden();
  actualizarProgreso();
  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];
  const cont = $("question-container");

  let html = `
    <div class="question-text">
      <span class="q-es">${q.es}</span>
      
    </div>
  `;
  if (q.img) {
    html += `
      <div class="q-image">
        <img src="${q.img.src}" alt="Imagen de apoyo" onerror="this.closest('.q-image').style.display='none';">
        <div class="q-credit">${q.img.credit} · <a href="${q.img.link}" target="_blank" rel="noopener">Fuente/licencia</a></div>
      </div>`;
  }
  if (esMulti(q)) {
    const respGuardada = respuestasUsuario[idxPregunta];
    html += `<div class="options">`;
    opcionesMezcladas(q).forEach((opObj, iOp) => {
      html += `<label class="option"><input type="radio" name="resp" value="${opObj.original}" ${respGuardada === opObj.original ? "checked" : ""}><div class="option-text">${opObj.texto}</div></label>`;
    });
    html += `</div>`;
  } else if (esCorta(q)) {
    const valor = respuestasUsuario[idxPregunta] ?? "";
    html += `<input id="short-answer" class="short-answer" type="text" value="${valor}" placeholder="Respuesta breve: 1–3 palabras o fecha"><div class="hint">Recupera de memoria antes de mirar apuntes.</div>`;
  }
  html += pintarMeta(q);
  cont.innerHTML = html;

  const prev = $("btn-prev"), next = $("btn-next");
  if (prev) prev.disabled = (indice === 0);
  if (next) next.textContent = (indice === orden.length - 1) ? "Terminar sesión" : "Siguiente ▶";
}

function guardarRespuestaActual() {
  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];
  if (esMulti(q)) {
    const marcada = document.querySelector("input[name='resp']:checked");
    if (!marcada) return false;
    respuestasUsuario[idxPregunta] = parseInt(marcada.value, 10);
    return true;
  }
  if (esCorta(q)) {
    const input = $("short-answer");
    if (!input) return false;
    const valor = input.value.trim();
    if (!valor) return false;
    respuestasUsuario[idxPregunta] = valor;
    return true;
  }
  return false;
}
function textoRespuestaUsuario(q, resp) {
  if (resp === null || resp === undefined) return "—";
  if (esMulti(q)) return q.opciones[resp] ?? "—";
  return String(resp);
}
function textoCorrecto(q) {
  if (esMulti(q)) return q.opciones[q.correcta];
  return (q.respuestas && q.respuestas[0]) ? q.respuestas[0] : "—";
}
function esCorrecta(q, resp) {
  if (resp === null || resp === undefined) return false;
  if (esMulti(q)) return resp === q.correcta;
  return coincideCorta(resp, q.respuestas);
}

function siguiente() {
  if (!guardarRespuestaActual()) {
    alert("Responde antes de continuar 🙂");
    return;
  }
  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];
  const resp = respuestasUsuario[idxPregunta];
  const ok = esCorrecta(q, resp);
  historialSesion.push({ idx: idxPregunta, q, resp, ok });
  programar(q.id, ok);

  if (!ok) colaRefuerzo.push(idxPregunta);
  indice++;
  if (indice >= orden.length) {
    if (colaRefuerzo.length) {
      orden = [...orden, ...barajar(colaRefuerzo.splice(0))];
      renderPregunta();
    } else {
      mostrarResultados();
    }
  } else {
    renderPregunta();
  }
}
function anterior() {
  if (indice === 0) return;
  indice--;
  renderPregunta();
}

function resumenSRS() {
  const st = Object.values(srs);
  const aprendidas = st.filter(x => (x.box || 0) >= 3).length;
  const debiles = st.filter(x => (x.fallos || 0) > (x.aciertos || 0)).length;
  const dueCount = vencidas().length;
  return { aprendidas, debiles, dueCount };
}
function mostrarResultados() {
  const test = $("test-card"), result = $("result-card");
  if (test) test.classList.add("hidden");
  if (result) result.classList.remove("hidden");

  const uniqueLast = [];
  const seen = new Set();
  for (let i = historialSesion.length - 1; i >= 0; i--) {
    const h = historialSesion[i];
    if (!seen.has(h.q.id)) { uniqueLast.unshift(h); seen.add(h.q.id); }
  }
  const correctas = uniqueLast.filter(h => h.ok).length;
  const fallos = uniqueLast.filter(h => !h.ok);
  const total = uniqueLast.length;
  const s = resumenSRS();

  let html = `
    <h2>Resultados de la sesión SRS</h2>
    <div class="summary">
      ✅ Aciertos finales: <strong>${correctas}</strong> / ${total}<br>
      ❌ Ideas aún débiles: <strong>${fallos.length}</strong><br>
      🧠 Tarjetas en caja 3 o superior: <strong>${s.aprendidas}</strong> / ${preguntas.length}<br>
      ⏰ Preguntas vencidas ahora: <strong>${s.dueCount}</strong>
    </div>
    <div class="summary" style="margin-top:10px">
      Regla de estudio: si fallas, vuelve pronto; si aciertas, se espaciará más. No releas: intenta <strong>recuperar</strong> la respuesta.
    </div>`;

  if (fallos.length > 0) {
    html += `<div class="summary" style="margin-top:12px"><strong>Fallos corregidos</strong>:</div><ul class="list-fails">`;
    fallos.forEach(({ q, resp }) => {
      html += `<li><span class="qtitle">${q.es}</span><span class="line">Tu respuesta: <strong>${textoRespuestaUsuario(q, resp)}</strong></span><span class="line">Correcta: <strong>${textoCorrecto(q)}</strong></span><span class="line">${q.explicacion ?? ""}</span><span class="pill-mini">Volverá pronto</span></li>`;
    });
    html += `</ul>`;
  }
  html += `<div class="summary" style="margin-top:14px;text-align:center;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="reiniciarSesion('fallos')">🔁 Practicar fallos</button>
      <button class="btn btn-primary" onclick="reiniciarSesion('vencidas')">⏰ Repasar vencidas</button>
      <button class="btn btn-ghost" onclick="reiniciarSesion('mixta')">🧠 Sesión mixta</button>
      <button class="btn btn-ghost" onclick="resetSRS()">Borrar progreso</button>
    </div>`;
  $("result-content").innerHTML = html;
}

function reiniciarSesion(modo) {
  modoSesion = modo || "mixta";
  construirOrden();
  $("result-card").classList.add("hidden");
  $("test-card").classList.remove("hidden");
  renderPregunta();
}
function resetSRS() {
  if (!confirm("¿Borrar todo el progreso SRS guardado en este navegador?")) return;
  localStorage.removeItem(STORAGE_KEY);
  srs = estadoInicial();
  reiniciarSesion("mixta");
}

// =====================
// Init
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("h1");
  if (title) title.textContent = "Test SRS · Los espacios urbanos · 3º ESO";
  const tagline = document.querySelector(".tagline");
  if (tagline) tagline.textContent = "Recuperación activa · repaso espaciado · memoria a largo plazo";
  const pills = document.querySelectorAll(".pill span:last-child");
  if (pills[0]) pills[0].textContent = "Ciudad · planos · urbanización · redes urbanas";
  if (pills[1]) pills[1].textContent = `${preguntas.length} preguntas`;
  const prev = $("btn-prev"), next = $("btn-next");
  if (prev) prev.addEventListener("click", anterior);
  if (next) next.addEventListener("click", siguiente);
  construirOrden();
  renderPregunta();
});
