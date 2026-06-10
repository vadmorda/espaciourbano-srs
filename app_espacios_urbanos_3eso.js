// app.js — Espacios urbanos 3º ESO (SRS)
// 57 preguntas: selección múltiple (3 opciones), respuesta corta y preguntas con imagen.
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
const STORAGE_KEY = "espacios_urbanos_3eso_srs_v1";

// =====================
// Imágenes libres / estables (sin SVG)
// =====================
const IMG = {
  urbanRural: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Madrid%20-%20Edificio%20Espa%C3%B1a%20y%20Torre%20de%20Madrid%20desde%20el%20Templo%20de%20Debod.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Madrid_-_Edificio_Espa%C3%B1a_y_Torre_de_Madrid_desde_el_Templo_de_Debod.jpg"
  },
  rural: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Campos%20de%20Castilla.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Campos_de_Castilla.jpg"
  },
  tallinn: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tallinn%20Old%20Town%20from%20Toompea.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Tallinn_Old_Town_from_Toompea.jpg"
  },
  cbd: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Zhujiang%20New%20Town%20Guangzhou%202020.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Zhujiang_New_Town_Guangzhou_2020.jpg"
  },
  paris: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Avenue%20des%20Champs-%C3%89lys%C3%A9es%20from%20Arc%20de%20Triomphe.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Avenue_des_Champs-%C3%89lys%C3%A9es_from_Arc_de_Triomphe.jpg"
  },
  suburbioRico: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Levittown%20Pennsylvania%20aerial%20view.jpg?width=1400",
    credit: "Wikimedia Commons (licencia/dominio según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Levittown_Pennsylvania_aerial_view.jpg"
  },
  slum: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Dharavi%20slum%20Mumbai.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Dharavi_slum_Mumbai.jpg"
  },
  toledo: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Toledo%20-%20Spain%20-%20View%20from%20the%20Parador.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Toledo_-_Spain_-_View_from_the_Parador.jpg"
  },
  palmanova: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Palmanova%20aerial%20view.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Palmanova_aerial_view.jpg"
  },
  montevideo: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Montevideo%20map%201868.jpg?width=1400",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Montevideo_map_1868.jpg"
  },
  tokyo: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo%20Skyline%20and%20Mount%20Fuji.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Tokyo_Skyline_and_Mount_Fuji.jpg"
  },
  cali: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Los%20Angeles%20Skyline%20Mountains2.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Los_Angeles_Skyline_Mountains2.jpg"
  },
  shanghai: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shanghai%20skyline%202018%28cropped%29.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Shanghai_skyline_2018(cropped).jpg"
  },
  ny: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Lower%20Manhattan%20from%20Jersey%20City%20November%202014%20panorama%202.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Lower_Manhattan_from_Jersey_City_November_2014_panorama_2.jpg"
  },
  london: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/City%20of%20London%20skyline%20from%20London%20City%20Hall%20-%20Oct%202008.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:City_of_London_skyline_from_London_City_Hall_-_Oct_2008.jpg"
  },
  europa: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%20satellite%20orthographic.jpg?width=1400",
    credit: "Wikimedia Commons/NASA (dominio público o licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Europe_satellite_orthographic.jpg"
  },
  madrid: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Madrid%20skyline%20-%20CTBA.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Madrid_skyline_-_CTBA.jpg"
  },
  barcelona: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Barcelona%20view%20from%20Tibidabo.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Barcelona_view_from_Tibidabo.jpg"
  },
  bilbao: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bilbao%20-%20Guggenheim%20Museum.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Bilbao_-_Guggenheim_Museum.jpg"
  },
  seville: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sevilla%20-%20Torre%20del%20Oro.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Sevilla_-_Torre_del_Oro.jpg"
  },
  generic: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shanghai%20skyline%202018%28cropped%29.jpg?width=1400",
    credit: "Wikimedia Commons/ONU (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Shanghai_skyline_2018(cropped).jpg"
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

// =====================
// Preguntas: 50 ítems con práctica de recuperación, discriminación y variantes
// =====================
const preguntas = [
  {id:"urb-rasgo-densidad", tipo:"multi", img:IMG.urbanRural, es:"¿Qué rasgo diferencia claramente al espacio urbano del rural?", hint:"Piensa en concentración de población.", opciones:["Alta densidad de población","Predominio del sector primario","Edificación baja y dispersa"], correcta:0, explicacion:"El espacio urbano concentra muchos habitantes en una superficie relativamente pequeña: tiene <strong>alta densidad</strong>."},
  {id:"urb-suelo", tipo:"multi", img:IMG.urbanRural, es:"En el espacio urbano predominan los usos del suelo…", hint:"Edificios, carreteras, infraestructuras.", opciones:["artificiales","agrarios","forestales"], correcta:0, explicacion:"En la ciudad predominan los usos <strong>artificiales</strong>: edificios, calles e infraestructuras."},
  {id:"urb-sector", tipo:"corta", img:IMG.urbanRural, es:"¿Qué sector económico sostiene principalmente la actividad urbana?", hint:"Dos palabras como máximo.", respuestas:["servicios","sector servicios","terciario","sector terciario"], explicacion:"La actividad urbana se apoya sobre todo en el <strong>sector servicios</strong>."},
  {id:"rur-densidad", tipo:"multi", img:IMG.rural, es:"El espacio rural se caracteriza por una densidad de población…", hint:"Lo contrario de la ciudad.", opciones:["baja","muy elevada","siempre creciente"], correcta:0, explicacion:"El espacio rural presenta <strong>baja densidad</strong> y sufre despoblamiento en muchas zonas."},
  {id:"limites-dificiles", tipo:"multi", img:IMG.urbanRural, es:"Hoy cuesta distinguir campo y ciudad porque se han extendido urbanismo, transportes y…", hint:"Tecnologías que homogeneizan formas de vida.", opciones:["TIC","glaciares","latifundios"], correcta:0, explicacion:"Las <strong>TIC</strong> y los transportes han difuminado los límites entre espacio rural y urbano."},
  {id:"ciudad-espana", tipo:"corta", img:IMG.madrid, es:"En España, ¿desde cuántos habitantes se considera ciudad una población?", hint:"Solo número.", respuestas:["10000","10 000","10.000"], explicacion:"En España, se considera ciudad toda población de más de <strong>10.000</strong> habitantes."},

  {id:"centro-historico-def", tipo:"multi", img:IMG.tallinn, es:"En una ciudad europea antigua, el centro histórico corresponde normalmente a…", hint:"Zona anterior a la industrialización.", opciones:["la ciudad previa al gran desarrollo industrial","la periferia de viviendas unifamiliares","los polígonos industriales recientes"], correcta:0, explicacion:"El centro histórico o casco antiguo ocupa la zona que existía antes del gran crecimiento urbano industrial."},
  {id:"centro-calles", tipo:"img-multi", img:IMG.tallinn, es:"Observa la imagen. ¿Qué tipo de calles son habituales en el centro histórico?", hint:"No hubo planificación previa clara.", opciones:["estrechas e irregulares","rectas y perpendiculares","radiales y concéntricas siempre"], correcta:0, explicacion:"Los cascos antiguos suelen tener calles <strong>estrechas e irregulares</strong>."},
  {id:"cbd-siglas", tipo:"corta", img:IMG.cbd, es:"¿Cómo se abrevia el Distrito Central de Negocios?", hint:"Tres letras.", respuestas:["cbd"], explicacion:"El Distrito Central de Negocios se abrevia <strong>CBD</strong>."},
  {id:"cbd-reconocer", tipo:"img-multi", img:IMG.cbd, es:"La imagen muestra rascacielos y edificios modernos: ¿qué zona urbana representa mejor?", hint:"Centro financiero.", opciones:["CBD","suburbio pobre","espacio rural"], correcta:0, explicacion:"Los CBD destacan en el skyline por la altura y modernidad de sus edificios."},
  {id:"ensanche-def", tipo:"multi", img:IMG.paris, es:"Los ensanches europeos del siglo XIX se reconocen por calles…", hint:"Planificación urbana.", opciones:["amplias, rectilíneas y perpendiculares","estrechas, sinuosas y sin orden","sin edificación ni servicios"], correcta:0, explicacion:"Los ensanches fueron planificados con avenidas amplias y rectas, que se cortan perpendicularmente."},
  {id:"periferia-zona", tipo:"multi", img:IMG.suburbioRico, es:"La periferia urbana es…", hint:"Anillo exterior.", opciones:["el anillo edificado más exterior y zona actual de crecimiento","el casco antiguo monumental","solo el ayuntamiento y el CBD"], correcta:0, explicacion:"La periferia es el anillo exterior de la ciudad y su zona de crecimiento actual."},
  {id:"suburbio-geografia", tipo:"multi", img:IMG.suburbioRico, es:"En Geografía urbana, un suburbio puede ser…", hint:"No significa siempre pobreza.", opciones:["una zona residencial periférica rica o pobre","solo un barrio de chabolas","solo un centro financiero"], correcta:0, explicacion:"En Geografía, suburbio designa zonas residenciales periféricas, desde barrios pobres hasta urbanizaciones de alta calidad."},
  {id:"slum", tipo:"img-corta", img:IMG.slum, es:"¿Qué palabra inglesa se usa para un barrio urbano muy pobre de autoconstrucción?", hint:"Una palabra.", respuestas:["slum"], explicacion:"Un <strong>slum</strong> es un barrio urbano pobre, con viviendas precarias o de autoconstrucción."},
  {id:"contrastes-periferia", tipo:"multi", img:IMG.slum, es:"La periferia de muchas grandes ciudades se caracteriza por…", hint:"Puede contener urbanizaciones de lujo y chabolas.", opciones:["fuertes contrastes sociales y residenciales","ausencia total de viviendas","solo edificios históricos"], correcta:0, explicacion:"La periferia puede albergar barrios de chabolas y urbanizaciones de alto standing."},
  {id:"ciudad-difusa", tipo:"multi", img:IMG.suburbioRico, es:"La ciudad difusa o dispersa se caracteriza por…", hint:"Modelo anglosajón desde mediados del siglo XX.", opciones:["baja densidad y predominio de viviendas unifamiliares o bloques bajos","alta densidad y rascacielos en todo el territorio","calles medievales estrechas"], correcta:0, explicacion:"La ciudad difusa presenta baja densidad, viviendas unifamiliares o bloques bajos y zonas verdes."},
  {id:"policentrica", tipo:"corta", img:IMG.suburbioRico, es:"¿Cómo se llama el modelo urbano con varios centros en la zona de expansión?", hint:"Una palabra.", respuestas:["policentrico","policéntrico","ciudad policentrica","ciudad policéntrica"], explicacion:"El crecimiento difuso favorece un modelo de ciudad <strong>policéntrico</strong>."},
  {id:"difusa-sostenibilidad", tipo:"multi", img:IMG.suburbioRico, es:"La ciudad difusa se considera menos sostenible porque aumenta sobre todo…", hint:"Suelo, energía y coche.", opciones:["el uso del transporte privado y el consumo de suelo","el número de calles medievales","la densidad peatonal del casco antiguo"], correcta:0, explicacion:"Este modelo exige más transporte privado, consume más suelo y usa servicios de forma menos eficiente."},

  {id:"plano-def", tipo:"multi", img:IMG.montevideo, es:"Un plano urbano es…", hint:"Representación a escala.", opciones:["una representación esquemática a escala de una localidad o parte de ella","una lista de habitantes de una ciudad","una fotografía sin escala del campo"], correcta:0, explicacion:"El plano urbano permite observar la forma y estructura de una localidad."},
  {id:"plano-permite", tipo:"multi", img:IMG.toledo, es:"Analizar un plano urbano ayuda a reconocer…", hint:"Origen, crecimiento, límites y funciones.", opciones:["emplazamiento, desarrollo y elementos que limitan la expansión","solo el clima anual","solo la edad de sus habitantes"], correcta:0, explicacion:"El plano revela el emplazamiento original, el crecimiento urbano, límites físicos y áreas funcionales."},
  {id:"irregular", tipo:"img-multi", img:IMG.toledo, es:"Calles sin orden, estrechas y sinuosas: ¿qué tipo de plano es?", hint:"Propio de muchos cascos antiguos.", opciones:["irregular","ortogonal","radioconcéntrico"], correcta:0, explicacion:"El <strong>plano irregular</strong> tiene calles desordenadas, de anchura y longitud variable."},
  {id:"radioconcentrico", tipo:"img-multi", img:IMG.palmanova, es:"Calles principales que parten de una plaza central y avenidas que rodean el centro: plano…", hint:"Radio + círculos.", opciones:["radioconcéntrico","ortogonal","lineal industrial"], correcta:0, explicacion:"El plano <strong>radioconcéntrico</strong> combina vías radiales y avenidas concéntricas."},
  {id:"ortogonal", tipo:"img-multi", img:IMG.montevideo, es:"Calles rectas que se cortan en perpendicular y forman manzanas: plano…", hint:"También llamado en damero.", opciones:["ortogonal o en damero","irregular","radioconcéntrico"], correcta:0, explicacion:"El plano <strong>ortogonal</strong> o en damero organiza la ciudad en cuadrícula."},
  {id:"manzanas", tipo:"corta", img:IMG.montevideo, es:"En el plano ortogonal, los edificios se agrupan en…", hint:"Una palabra.", respuestas:["manzanas"], explicacion:"En el plano ortogonal, los edificios se agrupan en <strong>manzanas</strong>."},

  {id:"area-metropolitana", tipo:"multi", img:IMG.tokyo, es:"Un área metropolitana está formada por…", hint:"Metrópoli + núcleos próximos.", opciones:["una gran ciudad y núcleos próximos que forman una unidad funcional","varias aldeas aisladas sin relaciones","un solo casco antiguo amurallado"], correcta:0, explicacion:"El área metropolitana integra una metrópoli y núcleos cercanos con intensas relaciones funcionales."},
  {id:"flujos-diarios", tipo:"multi", img:IMG.tokyo, es:"En un área metropolitana son intensos los flujos diarios de…", hint:"Trabajo, estudios, mercancías.", opciones:["población y mercancías","glaciares y volcanes","solo turistas internacionales"], correcta:0, explicacion:"Entre la ciudad central y los núcleos del área hay flujos diarios de población y mercancías."},
  {id:"conurbacion", tipo:"multi", img:IMG.tokyo, es:"Una conurbación aparece cuando…", hint:"Crecimiento físico conjunto.", opciones:["varias áreas metropolitanas se unen físicamente","una ciudad pierde todos sus barrios","el campo elimina la red urbana"], correcta:0, explicacion:"La conurbación se forma al unirse físicamente varias áreas metropolitanas surgidas de ciudades distintas."},
  {id:"megalopolis", tipo:"multi", img:IMG.cali, es:"La megalópolis se diferencia de la conurbación porque…", hint:"No es un continuo urbano.", opciones:["incluye espacios rurales intercalados entre zonas urbanizadas","siempre es una sola ciudad compacta","no contiene áreas metropolitanas"], correcta:0, explicacion:"La megalópolis reúne grandes áreas urbanas cuyas influencias contactan, pero no forma un continuo urbano."},
  {id:"sansan", tipo:"corta", img:IMG.cali, es:"¿Cómo se conoce la megalópolis de la costa de California entre San Francisco y San Diego?", hint:"Seis letras.", respuestas:["sansan","san san"], explicacion:"La megalópolis californiana se conoce como <strong>SanSan</strong>."},
  {id:"gran-tokio", tipo:"img-corta", img:IMG.tokyo, es:"¿Qué área metropolitana se cita como la más poblada del mundo?", hint:"Dos palabras.", respuestas:["gran tokio","tokio"], explicacion:"El texto cita el <strong>Gran Tokio</strong>, con más de 37 millones de habitantes."},

  {id:"urbanizacion-def", tipo:"multi", img:IMG.shanghai, es:"Urbanización es el proceso por el que…", hint:"La ciudad gana población frente al campo.", opciones:["el espacio urbano gana habitantes en detrimento del rural","el campo gana población frente a la ciudad","desaparecen todos los transportes"], correcta:0, explicacion:"La urbanización es el crecimiento del peso demográfico del espacio urbano frente al rural."},
  {id:"urb-1900", tipo:"corta", img:IMG.generic, es:"A comienzos del siglo XX, ¿qué porcentaje de población mundial vivía en ciudades?", hint:"Solo número.", respuestas:["13","13%","13 %"], explicacion:"A comienzos del siglo XX vivía en ciudades alrededor del <strong>13 %</strong> de la población mundial."},
  {id:"urb-actual", tipo:"multi", img:IMG.generic, es:"En la actualidad, la población urbana mundial supera aproximadamente el…", hint:"Más de la mitad.", opciones:["55 %","13 %","30 %"], correcta:0, explicacion:"Actualmente, más del <strong>55 %</strong> de la población mundial vive en ciudades."},
  {id:"urb-2050", tipo:"corta", img:IMG.generic, es:"Según la previsión citada, en 2050 la población urbana mundial rondará el…", hint:"Solo número.", respuestas:["68","68%","68 %"], explicacion:"Para 2050 se estima que la población urbana rondará el <strong>68 %</strong>."},
  {id:"industrializacion", tipo:"multi", img:IMG.shanghai, es:"La intensificación de la urbanización fue de la mano de la…", hint:"Fábricas y éxodo rural.", opciones:["industrialización","desertificación","glaciación"], correcta:0, explicacion:"La industrialización atrajo población rural hacia ciudades con fábricas."},
  {id:"crecimiento-africa-asia", tipo:"multi", img:IMG.generic, es:"La ONU estima que gran parte del crecimiento urbano futuro se concentrará en…", hint:"Continentes de mayor incremento.", opciones:["África y Asia","Oceanía y Antártida","Europa occidental solamente"], correcta:0, explicacion:"El texto señala que el 90 % del crecimiento urbano mundial se producirá en países de <strong>África y Asia</strong>."},
  {id:"espana-etapa-lenta", tipo:"multi", img:IMG.barcelona, es:"En España, la primera etapa de urbanización, desde mediados del XIX hasta los años cincuenta, fue…", hint:"Pocas ciudades industriales.", opciones:["lenta y concentrada en pocas ciudades","rapidísima y generalizada en todo el campo","posterior a 1980"], correcta:0, explicacion:"La primera etapa fue lenta y centrada en Barcelona, Bilbao, Madrid, Valencia y Zaragoza."},
  {id:"espana-exodo", tipo:"multi", img:IMG.madrid, es:"Entre 1960 y 1980, el crecimiento urbano español se aceleró por industrialización, turismo y…", hint:"Migración campo-ciudad.", opciones:["éxodo rural masivo","retorno masivo al campo","desaparición del transporte"], correcta:0, explicacion:"Entre 1960 y 1980 se produjo un <strong>éxodo rural masivo</strong>."},
  {id:"espana-1980", tipo:"multi", img:IMG.madrid, es:"Desde 1980, en España pierde intensidad el éxodo rural y crecen sobre todo…", hint:"Modelo de ciudad difusa.", opciones:["las periferias urbanas","los cascos antiguos solamente","las aldeas aisladas"], correcta:0, explicacion:"Desde 1980 crecen las periferias, formándose áreas metropolitanas según el modelo de ciudad difusa."},
  {id:"megaciudad-def", tipo:"corta", img:IMG.tokyo, es:"¿Cuántos millones de habitantes debe superar una megaciudad?", hint:"Solo número.", respuestas:["10","10 millones","diez","diez millones"], explicacion:"Una <strong>megaciudad</strong> supera los <strong>10 millones</strong> de habitantes."},
  {id:"megaciudades-1950", tipo:"multi", img:IMG.ny, es:"En 1950 solo existían dos megaciudades: Nueva York y…", hint:"Japón.", opciones:["Tokio","Lagos","Nueva Delhi"], correcta:0, explicacion:"En 1950 solo había dos megaciudades: <strong>Nueva York</strong> y <strong>Tokio</strong>."},

  {id:"red-jerarquica", tipo:"multi", img:IMG.ny, es:"La red urbana mundial es jerárquica porque…", hint:"Orden de importancia e influencia.", opciones:["las ciudades tienen distinta capacidad para influir sobre otras urbes y territorios","todas las ciudades tienen exactamente la misma influencia","solo existen ciudades pequeñas"], correcta:0, explicacion:"La jerarquía urbana ordena las ciudades según su capacidad de influencia."},
  {id:"ciudad-global-def", tipo:"multi", img:IMG.london, es:"Una ciudad global es aquella donde se toman decisiones con repercusión…", hint:"Escala planetaria.", opciones:["mundial o en gran parte del planeta","solo en un barrio","exclusivamente rural"], correcta:0, explicacion:"Las ciudades globales concentran decisiones y actividades con impacto económico, político y social mundial."},
  {id:"global-no-poblacion", tipo:"multi", img:IMG.ny, es:"La posición de una ciudad global depende principalmente de…", hint:"No solo habitantes.", opciones:["su capacidad de decisión, conexiones y funciones económicas","su número de habitantes únicamente","su altitud sobre el nivel del mar"], correcta:0, explicacion:"Una ciudad global no se define solo por población, sino por funciones de decisión, comunicación y economía."},
  {id:"global-rasgos", tipo:"multi", img:IMG.london, es:"¿Qué rasgo comparten las ciudades globales?", hint:"Multinacionales, finanzas, organismos.", opciones:["gran dinamismo económico y sedes de decisión","predominio exclusivo del sector primario","aislamiento respecto a otras ciudades"], correcta:0, explicacion:"Albergan sedes de multinacionales, instituciones financieras y organismos internacionales."},
  {id:"global-ejemplo", tipo:"corta", img:IMG.ny, es:"Escribe una ciudad global muy influyente citada en el tema.", hint:"Nueva York, Londres, París, Tokio o Hong Kong.", respuestas:["nueva york","londres","paris","parís","tokio","hong kong"], explicacion:"El tema cita como ciudades globales: Nueva York, Londres, París, Tokio y Hong Kong."},
  {id:"metropoli-continental", tipo:"multi", img:IMG.generic, es:"Una metrópoli continental influye sobre…", hint:"Ejemplo: El Cairo en África.", opciones:["un continente o gran parte de él","solo una comarca rural","una única calle"], correcta:0, explicacion:"Las metrópolis continentales ejercen influencia sobre un continente o gran parte de él."},

  {id:"pentagono", tipo:"multi", img:IMG.europa, es:"El pentágono europeo es…", hint:"Mayor concentración urbana y económica de Europa.", opciones:["la zona europea de mayor concentración urbana y económica","una ciudad española de más de 10.000 habitantes","un tipo de plano medieval"], correcta:0, explicacion:"El pentágono europeo concentra buena parte de la población, economía, finanzas y centros de decisión del continente."},
  {id:"pentagono-ciudades", tipo:"multi", img:IMG.europa, es:"¿Qué conjunto delimita aproximadamente el pentágono europeo?", hint:"Cinco ciudades clave.", opciones:["Londres, París, Hamburgo, Múnich y Milán","Madrid, Sevilla, Cádiz, Granada y Córdoba","Tokio, Nueva Delhi, Shanghái, Lagos y El Cairo"], correcta:0, explicacion:"El pentágono europeo se delimita aproximadamente por Londres, París, Hamburgo, Múnich y Milán."},
  {id:"espana-nacionales", tipo:"multi", img:IMG.madrid, es:"¿Qué dos ciudades encabezan la jerarquía urbana española como metrópolis nacionales?", hint:"Capital política y gran centro mediterráneo.", opciones:["Madrid y Barcelona","Valencia y Sevilla","Bilbao y Zaragoza"], correcta:0, explicacion:"<strong>Madrid</strong> y <strong>Barcelona</strong> son las metrópolis nacionales españolas."},
  {id:"madrid-funcion", tipo:"img-multi", img:IMG.madrid, es:"Madrid destaca en la red urbana española por ser…", hint:"Capital del Estado y nodo central.", opciones:["capital del Estado y nodo fundamental de comunicaciones","puerto mediterráneo principal","ciudad gallega policéntrica"], correcta:0, explicacion:"Madrid es capital del Estado, principal centro político-administrativo y nodo básico de comunicaciones."},
  {id:"barcelona-funcion", tipo:"img-multi", img:IMG.barcelona, es:"Barcelona destaca como…", hint:"Industria, economía, puerto, cultura y turismo.", opciones:["gran centro industrial, económico, portuario, cultural y turístico","solo ciudad pequeña local","capital administrativa del Estado"], correcta:0, explicacion:"Barcelona tiene fuerte peso industrial y económico, puerto mediterráneo y relaciones internacionales."},
  {id:"regionales", tipo:"multi", img:IMG.seville, es:"¿Cuál de estas ciudades aparece como metrópoli regional española?", hint:"También podrían ser Valencia, Bilbao, Zaragoza o Málaga.", opciones:["Sevilla","Lugo","Pontevedra"], correcta:0, explicacion:"Sevilla, Valencia, Bilbao, Zaragoza y Málaga se citan como metrópolis regionales."},
  {id:"subsistema-mediterraneo", tipo:"multi", img:IMG.barcelona, es:"El subsistema urbano mediterráneo incluye, entre otras, Barcelona, Valencia, Alicante, Murcia y…", hint:"Costa sur mediterránea.", opciones:["Málaga","Oviedo","Santander"], correcta:0, explicacion:"El subsistema mediterráneo incluye Barcelona, Valencia, Alicante, Murcia y Málaga."},
  {id:"subsistema-central", tipo:"corta", img:IMG.madrid, es:"¿En torno a qué ciudad se articula el subsistema urbano central español?", hint:"Una palabra.", respuestas:["madrid"], explicacion:"El subsistema urbano central se articula en torno a <strong>Madrid</strong>."},
  {id:"subsistema-cantabrico", tipo:"multi", img:IMG.bilbao, es:"El subsistema urbano cantábrico está vinculado tradicionalmente a la actividad…", hint:"Bilbao, Santander, Gijón, Oviedo.", opciones:["industrial y portuaria","agraria de secano exclusivamente","turística tropical"], correcta:0, explicacion:"El subsistema cantábrico ha estado vinculado tradicionalmente a la industria y los puertos."},
  {id:"comunicaciones", tipo:"multi", img:IMG.madrid, es:"Las infraestructuras de transporte articulan la red urbana porque facilitan…", hint:"Personas, mercancías, información y capitales.", opciones:["desplazamientos y relaciones entre ciudades","el aislamiento de las ciudades","la desaparición de servicios especializados"], correcta:0, explicacion:"Autovías, AVE, puertos y aeropuertos refuerzan los flujos y relaciones entre ciudades."}
];

if (preguntas.length !== 57) console.warn("⚠️ El test debería tener 57 preguntas. Tiene:", preguntas.length);

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
    const opcionesBarajadas = q.opciones
  .map((texto, i) => ({ texto, original: i }))
  .sort(() => Math.random() - 0.5);

q._opcionesBarajadas = opcionesBarajadas;

opcionesBarajadas.forEach((op, iOp) => {
  html += `<label class="option">
    <input type="radio" name="resp" value="${op.original}" ${respGuardada === op.original ? "checked" : ""}>
    <div class="option-text">${op.texto}</div>
  </label>`;
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

  if (!ok) {
    // Refuerzo inmediato: la misma idea reaparece al final de la sesión.
    colaRefuerzo.push(idxPregunta);
  }
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
  if (title) title.textContent = "Test SRS · Los espacios urbanos 3º ESO";
  const tagline = document.querySelector(".tagline");
  if (tagline) tagline.textContent = "Recuperación activa · repaso espaciado · memoria a largo plazo";
  const pills = document.querySelectorAll(".pill span:last-child");
  if (pills[0]) pills[0].textContent = "Ciudad · planos · urbanización · redes urbanas";
  if (pills[1]) pills[1].textContent = "57 preguntas";
  const prev = $("btn-prev"), next = $("btn-next");
  if (prev) prev.addEventListener("click", anterior);
  if (next) next.addEventListener("click", siguiente);
  construirOrden();
  renderPregunta();
});
