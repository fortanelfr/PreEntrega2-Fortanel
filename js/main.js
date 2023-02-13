/* 
Calculadora de las palabras con más repeticiones en un texto.
Este algoritmo puede ser de utilidad en el area de Procesamiento del Lenguaje Natural, para intentar resumir un texto
por medio de una grafica cloud word.
Es importante filtar los palabras vacias(stopwords) las cuales carecen de significado, como artículos, pronombres, preposiciones, etc. 
Tambien es impoportante eliminar caracteres especiales como saltos de linea, puntos y comas.
Esta calculadora puede procesar texto en ingles o español. 
El texto utilizado en las pruebas viene de las paginas
https://distintaslatitudes.net/archivo/el-rock-en-latinoamerica-una-posible-nota-introductoria
https://www.bbc.com/news/world-middle-east-64618187
*/


//La lista de stopwords se podria leer de un archivo txt
const stopwords = {
     ingles : ["a","about","above","after","again","against","all","am","an","and","any","are","aren't",
"as",
"at",
"be",
"because",
"been",
"before",
"being",
"below",
"between",
"both",
"but",
"by",
"can't",
"cannot",
"could",
"couldn't",
"did",
"didn't",
"do",
"does",
"doesn't",
"doing",
"don't",
"down",
"during",
"each",
"few",
"for",
"from",
"further",
"had",
"hadn't",
"has",
"hasn't",
"have",
"haven't",
"having",
"he",
"he'd",
"he'll",
"he's",
"her",
"here",
"here's",
"hers",
"herself",
"him",
"himself",
"his",
"how",
"how's",
"i",
"i'd",
"i'll",
"i'm",
"i've",
"if",
"in",
"into",
"is",
"isn't",
"it",
"it's",
"its",
"itself",
"let's",
"me",
"more",
"most",
"mustn't",
"my",
"myself",
"no",
"nor",
"not",
"of",
"off",
"on",
"once",
"only",
"or",
"other",
"ought",
"our",
"ours",
"ourselves",
"out",
"over",
"own",
"same",
"shan't",
"she",
"she'd",
"she'll",
"she's",
"should",
"shouldn't",
"so",
"some",
"such",
"than",
"that",
"that's",
"the",
"their",
"theirs",
"them",
"themselves",
"then",
"there",
"there's",
"these",
"they",
"they'd",
"they'll",
"they're",
"they've",
"this",
"those",
"through",
"to",
"too",
"under",
"until",
"up",
"very",
"was",
"wasn't",
"we",
"we'd",
"we'll",
"we're",
"we've",
"were",
"weren't",
"what",
"what's",
"when",
"when's",
"where",
"where's",
"which",
"while",
"who",
"who's",
"whom",
"why",
"why's",
"with",
"won't",
"would",
"wouldn't",
"you",
"you'd",
"you'll",
"you're",
"you've",
"your",
"yours",
"yourself",
               "yourselves"],
     español: ["un","a","del","hemos","más","que","se","y","de","en","un","al","no",
"una",
"unas",
"unos",
"uno",
"sobre",
"todo",
"también",
"tras",
"otro",
"algún",
"alguno",
"alguna",
"algunos",
"algunas",
"ser",
"es",
"soy",
"eres",
"somos",
"sois",
"estoy",
"esta",
"estamos",
"estais",
"estan",
"como",
"en",
"para",
"atras",
"porque",
"por qué",
"estado",
"estaba",
"ante",
"antes",
"siendo",
"ambos",
"pero",
"por",
"poder",
"puede",
"puedo",
"podemos",
"podeis",
"pueden",
"fui",
"fue",
"fuimos",
"fueron",
"hacer",
"hago",
"hace",
"hacemos",
"haceis",
"hacen",
"cada",
"fin",
"incluso",
"primero",
"desde",
"conseguir",
"consigo",
"consigue",
"consigues",
"conseguimos",
"consiguen",
"ir",
"voy",
"va",
"vamos",
"vais",
"van",
"vaya",
"gueno",
"ha",
"tener",
"tengo",
"tiene",
"tenemos",
"teneis",
"tienen",
"el",
"la",
"lo",
"las",
"los",
"su",
"aqui",
"mio",
"tuyo",
"ellos",
"ellas",
"nos",
"nosotros",
"vosotros",
"vosotras",
"si",
"dentro",
"solo",
"solamente",
"saber",
"sabes",
"sabe",
"sabemos",
"sabeis",
"saben",
"ultimo",
"largo",
"bastante",
"haces",
"muchos",
"aquellos",
"aquellas",
"sus",
"entonces",
"tiempo",
"verdad",
"verdadero",
"verdadera",
"cierto",
"ciertos",
"cierta",
"ciertas",
"intentar",
"intento",
"intenta",
"intentas",
"intentamos",
"intentais",
"intentan",
"dos",
"bajo",
"arriba",
"encima",
"usar",
"uso",
"usas",
"usa",
"usamos",
"usais",
"usan",
"emplear",
"empleo",
"empleas",
"emplean",
"ampleamos",
"empleais",
"valor",
"muy",
"era",
"eras",
"eramos",
"eran",
"modo",
"bien",
"cual",
"cuando",
"donde",
"mientras",
"quien",
"con",
"entre",
"sin",
"trabajo",
"trabajar",
"trabajas",
"trabaja",
"trabajamos",
"trabajais",
"trabajan",
"podria",
"podrias",
"podriamos",
"podrian",
"podriais",
"yo",
               "aquel"]};



function contar_palabras(texto){
    const palabras = Object.create(null);

    //Es de utilidad eliminar caracteres especiales como saltos de linea, puntos y comas.
    texto = texto.replace(/\n/g,' ');
    texto = texto.replace(/\./g,' ');
    texto = texto.replace(/\,/g,' ');
    texto = texto.replace(/\:/g,' ');
    texto = texto.replace(/\;/g,' ');
    texto.split(' ').forEach(palabra => {
    //Ignoramos los strings vacios
        if (!palabra == ""){
                //Para normalizar un poco los datos quitamos las mayusculas
                    palabra = palabra.toLowerCase() 
                    if (palabra in palabras) {
                            palabras[palabra] +=  1 
                    } else {
                            palabras[palabra] = 1
                    }
                }
        });
    return palabras
        
}



function eliminar_stopwords(palabras,idioma,remover){
    if (remover){
        //Verificamos si la palabra se encuentra en stopwords, en caso afirmativo se elimina
        const resultado = palabras.filter(word => !stopwords[idioma].includes(word));
        return resultado
    } else {
        const resultado = palabras
        return resultado
    }
}


function top_10(texto,idioma,remover=true){
    palabras = contar_palabras(texto)
    //Ordenamos las palabras por numero de apariciones, sin embargo, al imprimir por console.log el objeto se ordena por orden alfabetico
    const palabras_ordenas = Object.keys(palabras).sort(function(a,b){return palabras[b]-palabras[a]})

    const top_palabras = eliminar_stopwords(palabras_ordenas,idioma,remover);
    
    //En javascript podemos establecer la longitud de un objeto asignando un valor a su atributo length (No estoy seguro si es una buena practica pero funciona)
    top_palabras.length  = 10
    
    
    /*En el paso de ordenamiento se obtuvo las palabras ordenas por aparición, sin embargo, se perdio el numero de apariciones de la palabra
      en este paso recuperamos las apariciones
    */
    const resultado = Object.create(null);
    top_palabras.forEach(palabra => {
             resultado[palabra] = palabras[palabra]
   });

   return resultado
}




//Obtenemos el idioma
let idioma =  prompt('El texto ingresado puede estar en ingles o español, ¿Que idioma desea utilizar?');
console.log("El idioma seleccionado es: " + idioma);

if (idioma in stopwords){
    //Obtenemos el texto
    let texto =  prompt('Ingrese el texto');
    console.log("El texto ingresado es: " + texto);

    //Resultado sin quitar stopwords
    console.log("Las 10 palabras más repeticiones sin remover los stopwords son:");
    console.log(top_10(texto,idioma,false))

    //Resultado quitando las stopwords
    console.log("Las 10 palabras más comunes removiendo los stopwords son:");
    console.log(top_10(texto,idioma))    
} else {
    console.log("Por favor ingrese un idioma valido")
}

