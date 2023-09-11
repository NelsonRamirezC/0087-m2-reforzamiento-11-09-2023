$(()=> {
    //HABILITAR TOOLTIPS DE BOOTSTRAP
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


    //CAPTURAR EL FORMULARIO
    const conversorDivisas = $("#conversorDivisas");

    conversorDivisas.on("submit", function(event){
        event.preventDefault();

        //CAPTURAR EL VALOR DEL INPUT DONDE SE INGRESA LA CANTIDAD A CONVERTIR
        let cantidad = $("#cantidad").val();
        console.log("Cantidad:", cantidad);

        //CAPTURAR EL INDICADOR DEL CUAL QUEREMOS REALIZAR LA CONVERSIÓN
        let selectorIndicador = $("#selectorIndicador").val();
        console.log("indicador", selectorIndicador);

        let urlApi = "https://mindicador.cl/api";

        fetch(urlApi)
        .then(function(response){
            return response.json();
        })
        .then(function(indicadores){
            //aquí recibimos todos los indicadores de la API.
            console.log(indicadores[selectorIndicador]);
            
            //CALCULAMOS LA DIVISA POR LA CANTIDAD INGRESADA

            let resultado = cantidad * indicadores[selectorIndicador].valor;

            //MOSTRAR RESULTADO EN FORMATO MONEDA CLP
            
            resultado = resultado.toLocaleString("es-CL", {style:"currency", currency:"CLP"});

            //ASIGNAMOS EL RESULTADO DE LA CONVERSIÓN AL SPAN DEL DOM
            let resultadoConversion = $("#resultadoConversion");
            resultadoConversion.text(resultado);
        })


    })

})
