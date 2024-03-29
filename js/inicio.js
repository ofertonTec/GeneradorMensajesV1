var mensajeMostrar = document.getElementById('mensajeGenerado');

//Lista de clientes

var lista = JSON.parse(localStorage.getItem("listaClientes"));
if (lista != null) {
    recorrerLista();
}

console.log("Lista cliente:" + lista);
function recorrerLista() {

    //Tabla
    var miTabla = document.getElementById('miTabla').getElementsByTagName('tbody')[0];
    while (miTabla.hasChildNodes()) {
        miTabla.removeChild(miTabla.firstChild);
    }
    var lista = JSON.parse(localStorage.getItem("listaClientes"));
    //Recorremos la lista
    lista.forEach(element => {
        //clase padre
        var tbody = document.getElementById('tBody');
        //Crear un tr
        var tr = document.createElement("tr");
        tr.id = "idTr";
        //Creando los td para cada atributo
        var codigoTd = document.createElement('td');
        var telefonoTd = document.createElement('td');
        var fechaTd = document.createElement('td');
        var descripcionTd = document.createElement('td');
        var tipoGestionTd = document.createElement('td');

        //Agregando el valor a los tds creados
        codigoTd.innerHTML = element.codigo;
        telefonoTd.innerHTML = element.telefono;
        fechaTd.innerHTML = element.fecha;
        descripcionTd.innerHTML = element.descripcion;
        if (element.tipoGestion == "TR") {
            tipoGestionTd.innerHTML = "TR: Seguimiento";
            tr.style.backgroundColor = "yellow";

        } else if (element.tipoGestion == "UR") {
            tipoGestionTd.innerHTML = "UR: Promesa Pago";
            tr.style.backgroundColor = "Lime";
        } else if (element.tipoGestion == "TU") {
            tipoGestionTd.innerHTML = "TU: Volver Llamar";
            tr.style.backgroundColor = "Teal";
        }

        //Agregando al al tr los elementos
        tr.appendChild(codigoTd);
        tr.appendChild(telefonoTd);
        tr.appendChild(fechaTd);
        tr.appendChild(descripcionTd);
        tr.appendChild(tipoGestionTd);

        //Incluyendo el tr al tbody
        tbody.appendChild(tr);
    });
}

//Formulario
document.getElementById('formulario').addEventListener('submit',
    function (event) {

        event.preventDefault();//evita que el formulario se envie automaticamente

        var entidad = document.getElementById('entidad').value;
        var tipoMensaje = document.getElementById('tipoMensaje').value;
        var nombresCom = document.getElementById('cliente').value;
        var fecha = document.getElementById('fecha').value;
        var telefono = document.getElementById('telefono').value;
        var monto = document.getElementById('monto').value;
        var tipo = document.getElementById('tipo').value;
        var numero = document.getElementById('numero').value;
        var codigo = document.getElementById('codigo').value;
        var descripcion = document.getElementById('descripcion').value;
        var tipoGestion = document.getElementById('tipoGestion').value;


        var nombresMayus = nombresCom.toUpperCase();
        var tipoMayus = tipo.toUpperCase();

        var cliente = {
            entidad: entidad,
            tipoMensaje: tipoMensaje,
            nombres: nombresMayus,
            fechaPago: fecha,
            telefono: telefono,
            montoPago: monto,
            tipoProducto: tipoMayus,
            numeroProducto: numero,
            codigo: codigo,
            descripcion: descripcion,
            tipoGestion: tipoGestion

        };
        mostrarMensaje(cliente);
    });
var mensaje = "";
function mostrarMensaje(cliente) {
    var iconoWhatsApp = document.getElementById('iconoWhatsApp');
    if (cliente.telefono != null) {
        iconoWhatsApp.style.display = "block";
    }
    var linkWhatsapp = document.getElementById('linkWhatsApp');
    var link = 'http://api.whatsapp.com/send?phone=51' + cliente.telefono
    linkWhatsapp.href = link
    var promesaInterbank = "Sr(a) *" + cliente.nombres + "* Según lo acordado telefónicamente usted se compromete a efectuar el pago correspondiente de S/. *" + cliente.montoPago + "* el día *" + cliente.fechaPago + "* del producto *" + cliente.tipoProducto + "*  Número de cuenta *" + cliente.numeroProducto + "*.\n"
        + "\nRealice el pago en la agencia del *Banco BBVA* más cercana, donde se dirige a ventanilla indicando el *código pago legal* 248 (Soles) o 249 (Dólares) adicionando el número de su DNI o RUC del titular de la cuenta."
        + "\n\nQuedo a la espera del envió del voucher a través de este medio, gracias."
        + "\n\n\n*Cuenta bancaria*"
        + "\n001104024900000023 - (Soles)"
        + "\n01140200490000002359 (Soles)"
        + "\n\n\n*Cuenta interbancaria*"
        + "\n001104024900000031 - (Dolares)"
        + "\n01140200490000003152 (Dolares)";
    var promesaVentanilla = "Sr(a) *" + cliente.nombres + "* Según lo acordado telefónicamente usted se compromete a efectuar el pago correspondiente a S/. *" + cliente.montoPago + "* el día *" + cliente.fechaPago + "* del producto *" + cliente.tipoProducto + "*  Número de cuenta *" + cliente.numeroProducto + "*.\n"
        + "\nRealice el pago en la agencia del *Banco BBVA* más cercana, donde se dirige a ventanilla indicando el *código pago legal* 248 (Soles) o 249 (Dólares) adicionando el número de su DNI o RUC del titular de la cuenta."
        + "\n\nQuedo a la espera del envió del voucher a través de este medio, gracias.";
    var vencida = "Sr(a) *" + cliente.nombres + "* le recordamos que tiene una promesa incumplida con   " + cliente.entidad + " por el monto de S/. *" + cliente.montoPago + "* .\n\nPara que Ud. no pierda los beneficios y su deuda no genere mayor interés, confírmenos su reprogramación para el día de *HOY*. \n\nGracias."

    var recordatorio = "Que tal Sr(a) *" + cliente.nombres + "* , " + cliente.entidad + " le recuerda que tiene un compromiso pendiente para el *" + cliente.fechaPago + "* , por el importe de S/.*" + cliente.montoPago + "* , evite el recálculo de su deuda pagando en la fecha establecida. \n\nCualquier inconveniente con su pago me informa para poder ayudarle. \n\nQuedo a la espera de la foto de su comprobante para el ajuste de su pago. \nSaludos Cordiales.";

    var campaña = cliente.nombres + ', *' + cliente.entidad + '*, tiene un Dscto Especial *PRE_APROBADO*, cancela tu Producto *' + cliente.tipoProducto + '* con *S/.' +
        cliente.montoPago + '* , Previa evaluación, \n\n*ACTIVALO* comunicándote por este medio.\n\nTramite su *CONSTANCIA DE NO ADEUDO* y Evite seguir manteniendo un reporte negativo en las centrales de riesgo.\n\nDscto válido hasta: *' + cliente.fechaPago + '*'

    var solucion = "*Banco BBVA*, estimado(a)  *" + cliente.nombres + "*  confiamos en que se encuentre bien.\nNos comunicamos respecto a la *deuda pendiente* que mantiene con el *Banco BBVA*. Valoramos su compromiso y estamos dispuestos a trabajar juntos para encontrar una solución mutuamente beneficiosa. \n\nEs importante mencionar que, de no recibir respuesta en un plazo razonable, nos veremos en la obligación de evaluar *medidas legales disponibles* para recuperar la deuda en su totalidad. Preferimos evitar este camino y llegar a un *acuerdo amigable* .\n\nLa resolución de esta deuda contribuirá a mejorar su *historial crediticio* y *acceso a futuros créditos*, por lo mismo le instamos a ponerse en contacto a la brevedad posible para discutir opciones de pago y resolver esta situación de manera efectiva.\n\n *Agradecemos su atención y cooperación*.";
    var relampago = "*Banco BBVA* tiene un descuento especial *pre aprobado*, cancela tu producto comunicándote por este medio.\n\nTramite su *constancia de no adeudo* y evite seguir manteniendo un reporte negativo en las centrales de riesgo.\n\nDescuento válido solo por 24 horas.";
    if (cliente.tipoMensaje == "promesa1") {
        mensaje = promesaVentanilla;
        mensajeMostrar.innerHTML = promesaVentanilla;
    } else if (cliente.tipoMensaje == "promesa2") {
        mensaje = promesaInterbank;
        mensajeMostrar.innerHTML = promesaInterbank;
    } else if (cliente.tipoMensaje == "campaña") {
        mensaje = campaña;
        mensajeMostrar.innerHTML = campaña;
    } else if (cliente.tipoMensaje == "recordatorio") {
        mensaje = recordatorio;
        mensajeMostrar.innerHTML = recordatorio;
    } else if (cliente.tipoMensaje == "vencida") {
        mensaje = vencida;
        mensajeMostrar.innerHTML = vencida;
    } else if (cliente.tipoMensaje == "solucion") {
        mensaje = solucion;
        mensajeMostrar.innerHTML = solucion;
    } else if (cliente.tipoMensaje == "relampago") {
        mensaje = relampago;
        mensajeMostrar.innerHTML = relampago;
    }
    if(cliente.tipoGestion !=""){
        cargarTabla(cliente);
    }
    
    document.getElementById('formulario').reset();
}
let btnCopiar = document.getElementById('copiarMensaje');
btnCopiar.addEventListener('click', function (e) {
    mensajeMostrar.select();
    try {
        var successful = document.execCommand('copy');

        if (successful) respuesta.innerHTML = 'Copiado!';
        else respuesta.innerHTML = 'Incapaz de copiar!';
    } catch (err) {
        rpta.innerHTML = 'Browser no soportado!';
    }
    let textArea = document.getElementById('mensaje')
    textArea.innerHTML = ""
});

function cargarTabla(cliente) {
    //Recuperar la lista de objetos
    var listaClientes = JSON.parse(localStorage.getItem('listaClientes')) || [];

    //Nuevo objeto a agregar
    var clienteAgendado =
    {
        codigo: cliente.codigo,
        telefono: cliente.telefono,
        fecha: cliente.fechaPago,
        descripcion: cliente.descripcion,
        tipoGestion: cliente.tipoGestion
    };
    var objetoYaIngresado = listaClientes.some(function (item) {
        return item["codigo"] === clienteAgendado.codigo;
    })
    if (!objetoYaIngresado) {
        listaClientes.push(clienteAgendado);
    }
    //Guardar la lista actualizada
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
    recorrerLista();

}

var tipoMensajeDiv = document.getElementById('tipoMensajeDiv');
var fechaDiv = document.getElementById('fechaDiv');
var telefonoDiv = document.getElementById('telefonoDiv');
var tipoProductoDiv = document.getElementById('tipoProductoDiv');
var numeroProductoDiv = document.getElementById('numeroProductoDiv');
var clienteDiv = document.getElementById('clienteDiv');
var montoDiv = document.getElementById('montoDiv');
var tipoGestionDiv = document.getElementById("tipoGestionDiv");
var codigoDiv= document.getElementById('codigoDiv');
var descripcionDiv = document.getElementById('descripcionDiv');

document.getElementById('tipoGestion').addEventListener('change', function (event) {
    var seleccionTipoGestion = event.target.value;
    if (seleccionTipoGestion == "TR" || seleccionTipoGestion == "TU") {
        tipoMensajeDiv.style.display = "none";
        tipoProductoDiv.style.display = "none";
        clienteDiv.style.display = "none";
        montoDiv.style.display = "none";
        numeroProductoDiv.style.display = "none";

    } else {
        tipoMensajeDiv.style.display = "block";
        tipoProductoDiv.style.display = "block";
        clienteDiv.style.display = "block";
        montoDiv.style.display = "block";
        numeroProductoDiv.style.display = "block";
    }
})

document.getElementById('tipoMensaje').addEventListener('change', function (event) {
    var opcionSeleccionada = event.target.value;//obtiene el valor de la opcion seleccionada


    if (opcionSeleccionada == 'recordatorio') {
        fechaDiv.style.display = 'block';
        tipoProductoDiv.style.display = 'none';
        numeroProductoDiv.style.display = 'none';

    } else if (opcionSeleccionada == "campaña") {
        fechaDiv.style.display = 'block';
        telefonoDiv.style.display = 'block';
        numeroProductoDiv.style.display = 'none';
    } else if (opcionSeleccionada == "vencida") {
        fechaDiv.style.display = 'none';
        numeroProductoDiv.style.display = "none";
        telefonoDiv.style.display = 'block';
        tipoProductoDiv.style.display = "none";
    } else if (opcionSeleccionada == "solucion") {
        tipoGestionDiv.style.display = "none";
        montoDiv.style.display="none";
        codigoDiv.style.display="none";
        tipoProductoDiv.style.display="none";
        numeroProductoDiv.style.display="none";
        fechaDiv.style.display="none";
        descripcionDiv.style.display="none";

    } else if (opcionSeleccionada == "relampago") {
        tipoGestionDiv.style.display = "none";
        montoDiv.style.display="none";
        codigoDiv.style.display="none";
        tipoProductoDiv.style.display="none";
        numeroProductoDiv.style.display="none";
        fechaDiv.style.display="none";
        descripcionDiv.style.display="none";
        clienteDiv.style.display="none";
        
    }else {
        fechaDiv.style.display = 'block';
        telefonoDiv.style.display = 'block';
        tipoProductoDiv.style.display = 'block';
        numeroProductoDiv.style.display = 'block';
        tipoGestionDiv.style.display="block";
        codigoDiv.style.display="block";
        descripcionDiv.style.display="block";
        clienteDiv.style.display="block";
    }
})
