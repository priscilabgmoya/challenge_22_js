/**
 * un hospital quiere que le hagamos una aplicacion inteligente donde el paciente ponga sus datos, su dolencia y 
 * determine que tipo de estudio debe realizarse. Dolencia: Dolor abdominal.
 * 
 * a tener en cuenta: a las mujeres embarazadas no se le puede hacer una tomografia o
 *  una placa porque puede tener efectos teratogénicos.
 */

const dolencia_estudio = [
    ["dolor abdominal", "ecografia"],
    ["dolor de pecho", "electrocardiograma"],
    ["cortado", "sutura"],
    ["problema de vista", "fondo de ojo"],
    ["quebradura", "radiografia"],
    ["dolor en la mama", "tomografia"],
    ["embarazada", "no se le puede hacer una tomografia o una radiografia porque puede tener efectos teratogénicos"],
    ["desconoce", "consulte a su medico"]
];
const frase_nombreApellido = 'ingrese Nombre y Apellido del paciente';
const frase_sexo = 'ingrese sexo del paciente \n M --> masculino \n F --> Femenino';
const frase_dolencia = 'Ingrese dolencia del paciente';
let listaPaciente = [], paciente, nombre_apellido = "", sexo = "", dolencia = "", esta_embarazada = false, confirmacion = true;

while (confirmacion) {
    paciente = [];
    nombre_apellido = prompt(frase_nombreApellido);
    verificarNombreApellido(nombre_apellido, paciente);
    sexo = prompt(frase_sexo).toLocaleUpperCase();
    agregaSexoPaciente(sexo, paciente);
    dolencia = prompt(frase_dolencia).toLocaleLowerCase();
    agregarDolencia(dolencia, paciente);
    listaPaciente.push(paciente);
    confirmacion = confirm('¿Desea Continuar?');
}
mostrarListaPaciente(); 

function verificarNombreApellido(nombreApellido, array) {
    if (nombreApellido.length >0) {
        array.push(nombreApellido);
        return;
    }
    alert('Ingrese un nombre correcto');
    return verificarNombreApellido(prompt(frase_nombreApellido), array);
}

function agregaSexoPaciente(sexo, array) {
    if (sexo.length == 1) {
        array.push(sexo);
        if (sexo == "F") {
            esta_embarazada = confirm('¿Se encuentra Embarazada?');
            array.push(esta_embarazada);
        };
        return;
    }
    alert('Ingrese un sexo correcto');
    return agregaSexoPaciente(prompt(frase_sexo), array);
}

function agregarDolencia(dolencia, array) {
    if (dolencia.length >0) {
        let dolenciaEncontrada = dolencia_estudio.find(element => element[0] == dolencia);
        if (dolenciaEncontrada !== undefined) {
            if (array[1] == 'F' && array[2] == true && (dolenciaEncontrada[0] == dolencia_estudio[4][0] || dolenciaEncontrada[0] == dolencia_estudio[5][0])) {
                array.push(dolenciaEncontrada[0]);
                array.push(dolencia_estudio[6][1]); 
                alert(`${dolencia_estudio[6][1]}`);
            } else if ((array[1] == 'F' && array[2] == false) || array[1] == 'M' || ( array[1] == 'F' && array[2] == true )) {
                array.push(dolenciaEncontrada[0]);
                array.push(dolenciaEncontrada[1]);
                alert(`El estudio que se tiene que realizar es: ${dolenciaEncontrada[1]}`);
            }
        } else {
            array.push(dolencia);
            array.push(dolencia_estudio[dolencia_estudio.length - 1][1]);
            alert(`Dolencia no encontrada!...${dolencia_estudio[dolencia_estudio.length - 1][1]}`);
        }
        return;
    }
    alert('Ingrese una dolencia correcta');
    return agregarDolencia(prompt(frase_dolencia), array);
}

function mostrarListaPaciente(){
    document.write("<h1>Listado de Pacientes: </h1>");
    document.write("<ul>");
    for (let index = 0; index < listaPaciente.length; index++) {
        if(listaPaciente[index][1] == 'F'){
            document.write(`<li>Paciente: ${listaPaciente[index][0]}  - sexo: ${listaPaciente[index][1]} - ¿Esta Embarazada?: ${listaPaciente[index][2]} - Dolor: ${listaPaciente[index][3]} - Resultado: ${listaPaciente[index][4]} </li>`);
        }else{
            document.write(`<li>Paciente: ${listaPaciente[index][0]} - sexo: ${listaPaciente[index][1]} - Dolor: ${listaPaciente[index][2]} - Resultado: ${listaPaciente[index][3]} </li>`);
        }
    }
    document.write("</ul>");
}
