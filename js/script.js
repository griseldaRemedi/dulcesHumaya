// VERSION ACTUAL
// muestra en el visor los botones pulsados, los guarda el valor en un array, hece la sumatoria del array resultante.
// no se consideran las funciones de memoria
// solo maneja sumas y restas sin paréntesis

const datosIngresados = [];
const operacionesBtn = ['+', '-', '*', '/', '%', 'f!', 
'&radic;', '<sup>3</sup>&radic;', '<sup>n</sup>&radic;',
 '<sup>2</sup>', 'X<sup>3</sup>', 'X<sup>n</sup>', 
 'sen', 'cos', 'tag', 'log', 'Ln', 'e', 'tag',  '='];
const memoria = []; //para las funciones M+, M-, MR
const operacionResultante = [];
let idxOpRes = 0;
let operacion = "";

let botones = document.querySelectorAll('button').forEach( 
        element => element.addEventListener('click',  
            function() { 
                            let resultado = document.getElementById("textoResultado");

                            if( !(operacionesBtn.includes(element.textContent))){  
                                switch (element.textContent) {
                                    case "<-": // borra lo último ingresado
                                        resultado.textContent = resultado.textContent.slice(0,resultado.textContent.length-1);
                                        datosIngresados = resultado.textContent;
                                        console.log(datosIngresados);
                                        break;

                                    case "C": // borra el contenido del visor
                                        resultado.textContent = "";
                                        datosIngresados.length = 0;
                                        operacionResultante.length = 0;
                                        console.log(datosIngresados);
                                        break;
                                    case "(" :
                                        resultado.textContent = resultado.textContent + element.textContent;
                                        operacionResultante[idxOpRes++] = element.textContent;
                                        datosIngresados.length = 0;
                                        console.log(datosIngresados);
                                        break;

                                    case ")":
                                        resultado.textContent = resultado.textContent + element.textContent;
                                        operacionResultante[idxOpRes++] = parseInt(datosIngresados.join(''));
                                        operacionResultante[idxOpRes++] = element.textContent;
                                        datosIngresados.length = 0;
                                        console.log(datosIngresados);
                                        break;

                                    default: //agrego datos como caracteres independientes
                                        resultado.textContent = resultado.textContent + element.textContent;
                                        datosIngresados.push(element.textContent);
                                        console.log(datosIngresados);
                                        break;
                                }

                            } else {
                                // CONTROLAR! parse int o parse float s/tengan coma o no 
                                console.log('Datos ingresados antes del parseInt' + datosIngresados);
                               if (datosIngresados.length !== 0){
                                    operacionResultante[idxOpRes++] = parseInt(datosIngresados.join(''));
                                    datosIngresados.length = 0;
                               }
                               operacionResultante[idxOpRes++] = element.textContent;
                               resultado.textContent = resultado.textContent + element.textContent;

                                if (element.textContent === "=") {
                                    console.log('Operacion resultante: ' + operacionResultante);

                                    if(operacionResultante.includes('(') || operacionResultante.includes(')')){
                                            if ( (operacionResultante.filter(element => (element === '(') ).length) === (operacionResultante.filter(element => (element === ')') ).length) ) { // cantidad de paréntesis que abren y cierran es igual
                                                    // COMENZAR A OPERAR CON PARENTESIS
                                                    // si hay paréntesis modifico el array para que quede en la secuencia 
                                                    console.log(operacionResultante);
                                                    } else { // cantidad de parentesis inconsistente
                                                        alert('ERROR DE PARENTESIS: Verifica los paréntesis, deben abrir y cerrar. Vuelve a ingresar los datos. ' + operacionResultante); 
                                                        //PRÓXIMA VERSION: 
                                                        //borro el igual de datos ingresados y 
                                                        //manipulo operaciones resultantes para poder usar btn retroceder 
                                                        datosIngresados.length = 0;
                                                        operacionResultante.length = 0;                                                    }
                                            } else {
                                                    // COMENZAR A OPERAR SIN PARÉNTESIS
                                                    // si NO HAY paréntesis sigo la secuencia de las operaciones
                                                    operar(operacionResultante);
                                                    console.log(operacionResultante);
                                            }
                                } else {
                                    datosIngresados.length = 0;
                                }
                            }
                        }
                    ) 
                )

function operar(operacionCompleta){

    const opCompletaDef = [];
    /* armar nros negativos */
    operacionCompleta.forEach(
        function (item, index, array) {
            if (!isNaN(item)){
                if (array[index-1] === '+' || array[index-1] === '-' ){
                    opCompletaDef.push(Number(array[index-1] + array[index]));
                } else {
                    opCompletaDef.push(item);
                }
            } else {
                if ( (item !== '+') && (item !== '-') ){
                    opCompletaDef.push(item);
                }
            }
    });
        console.log(`Array de operacion: ${opCompletaDef}`);

    let acumulador = 0;
    opCompletaDef.forEach(element => {
        if (typeof element === 'number' ) acumulador = acumulador + element;
    });

    resultado.textContent = `El resultado es: ${acumulador}`; 

}