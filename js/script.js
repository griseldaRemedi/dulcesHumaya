// muestra en el visor los botones pulsados y guarda el valor en un array
// no se consideran las funciones de memoria
let botones = document.querySelectorAll('button').forEach( 
        element => element.addEventListener('click',  
            function() { 
                            const datosIngresados = [];
                            let resultado = document.getElementById("textoResultado");
                            if(element.textContent !== "="){  // final de ingreso de datos -> resolver la operación
                                switch (element.textContent) {
                                    case "<-": // borra lo último ingresado
                                        resultado.textContent = resultado.textContent.slice(0,resultado.textContent.length-1);
                                        datosIngresados = resultado.textContent;
                                        console.log(datosIngresados);
                                        break;
                                    case "C": // borra el visor
                                        resultado.textContent = "";
                                        datosIngresados = [];
                                        console.log(datosIngresados);
                                        break;
                                    default:
                                        resultado.textContent = resultado.textContent + element.textContent;
                                        datosIngresados.push(resultado.textContent);
                                        console.log(datosIngresados);
                                        break;
                                }
                            } else {
                                alert('Fin ingreso de datos');
                            }
                        }
                    ) 
                )

