// VERSION ACTUAL
// muestra en el visor los botones pulsados, guarda el valor en un array, 
// hace la sumatoria del array resultante.
// no se consideran las funciones de memoria
// solo maneja sumas y restas sin paréntesis

const datosIngresados = [];
const operacionesBtn = ['+', '-', '*', '/', '%', 'f!', 
'&radic;', '<sup>3</sup>&radic;', '<sup>n</sup>&radic;',
 '<sup>2</sup>', 'X<sup>3</sup>', 'X<sup>n</sup>', 
 'sen', 'cos', 'tag', 'log', 'Ln', 'e', 'tag',  '='];
const operacionesBasicas = ['+', '-', '*', '/', '%'];

const memoria = []; //para la funcion MR
const operacionResultante = [];
let idxOpRes = 0;
let resultado = document.getElementById("textoResultado");
let calculo = document.getElementById("textoCalculo");

let botones = document.querySelectorAll('button').forEach( 
        element => element.addEventListener('click',  
            function() { 

                            if( !(operacionesBtn.includes(element.textContent))){  
                                switch (element.textContent) {
                                    case "<-": // borra lo último ingresado
                                        resultado.textContent = resultado.textContent.slice(0,resultado.textContent.length-1);
                                        datosIngresados = resultado.textContent;
                                        console.log(datosIngresados);
                                        break;

                                    case "AC": // borra el contenido del visor
                                        resultado.replaceChildren();
                                        calculo.replaceChildren();
                                        idxOpRes = 0;
                                        datosIngresados.length = 0;
                                        operacionResultante.length = 0;
                                        console.log(datosIngresados);
                                        break;
                                    case "(" : // sin implementar
                                        resultado.textContent = resultado.textContent + element.textContent;
                                        operacionResultante[idxOpRes++] = element.textContent;
                                        datosIngresados.length = 0;
                                        console.log(datosIngresados);
                                        break;

                                    case ")": // sin implementar
                                        resultado.textContent = resultado.textContent + element.textContent;
                                        operacionResultante[idxOpRes++] = parseInt(datosIngresados.join(''));
                                        operacionResultante[idxOpRes++] = element.textContent;
                                        datosIngresados.length = 0;
                                        console.log(datosIngresados);
                                        break;

                                    default: // agrego datos como caracteres independientes
                                        resultado.textContent = resultado.textContent + element.textContent;
                                        calculo.textContent = calculo.textContent + element.textContent;
                                        datosIngresados.push(element.textContent);
                                        console.log(datosIngresados);
                                        break;
                                }

                            } else {
                                // Una vez ingresado un signo de operación, CONVIERTO en número los caracteres ingresados
                                // CONTROLAR EL CASO DE NÚMEROS NEGATIVOS!!
                               if (datosIngresados.length !== 0){
                                    if (datosIngresados.includes('.')){
                                        operacionResultante[idxOpRes++] = parseFloat(datosIngresados.join(''));
                                        } else {
                                            operacionResultante[idxOpRes++] = parseInt(datosIngresados.join(''));
                                    }
                                    datosIngresados.length = 0;
                               }
                               // fin convertir en número 


                               // Opero
                               if (operacionResultante.length > 1){
                                    console.log("Antes de operar  " + operacionResultante + ' idx ' + idxOpRes);
                                    operacionResultante[0] = operar(operacionResultante);
                                    calculo.textContent = calculo.textContent + ' = ' + operacionResultante[0]  + ' ';
                                    operacionResultante[1] = element.textContent;
                                    operacionResultante.pop();
                                    idxOpRes=2;
                                    resultado.textContent = operacionResultante[0] + operacionResultante[1];
                                    } else {
                                        operacionResultante[idxOpRes++] = element.textContent;
                                        resultado.textContent = resultado.textContent + element.textContent;
                                    }
                               // fin opero
                               
                               calculo.textContent = calculo.textContent + element.textContent;

                               if (element.textContent === "=") {
                                    resultado.textContent = resultado.textContent + element.textContent;
                                } else {
                                    datosIngresados.length = 0;
                                }
                            }
                        }
                    ) 
                )

function operar(operacionCompleta){
    let resultado = 0;
    operacionCompleta.forEach(
        function (item, index, array) {
            if (isNaN(item)){
                switch (item) {
                    case '+':
                        resultado = array[index-1] + array[index+1];
                        console.log(`Resultado ${resultado} y el numero es ${array}`);
                        break;
                    case '-':
                        resultado = array[index-1] - array[index+1];
                        console.log(`Resultado ${resultado} y el numero es ${array}`);
                        break;
                    case '*':
                        resultado = array[index-1] * array[index+1];
                        console.log(`Resultado ${resultado} y el numero es ${array}`);
                        break;
                    case '/':
                        resultado = array[index-1] / array[index+1];
                        console.log(`Resultado ${resultado} y el numero es ${array}`);
                        break;
                    default:
                        console.log(`Defaul Resultado ${resultado} y el numero es ${array}`);
                        break;
                }
            } else {
                // falta implementar
            }
    });
    
    return resultado;

}