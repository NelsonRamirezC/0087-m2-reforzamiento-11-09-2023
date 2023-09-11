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

            //INVOCAMOS LA FUNCIÓN QUE BUSCA EL HISTORICO DE LA DIVISA
            consultarHistorico(selectorIndicador);
        })


    })



    //CONSULTAR HISTORICO DE LA DIVISA

    function consultarHistorico(divisa){

        let urlApi = "https://mindicador.cl/api/"+divisa;
        fetch(urlApi)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let arraySerie = data.serie;

            let dataPointsGrafico = arraySerie.map(serie => {
                let objeto = {
                    x: new Date(serie.fecha),
                    y: serie.valor
                }
                return objeto
            })

            /* { x: 1501048673000, y: 35.939 } */
            cargarGrafico(dataPointsGrafico);
        })

    }


    function cargarGrafico(valores){
        console.log(valores)
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Variación mensual divisa"
            },
            axisX: {
                title: "Fecha"
            },
            axisY: {
                title: "Valor",
                suffix: " CLP",
                includeZero: true
            },
            data: [{
                type: "line",
                name: "Variación mensual DIVISA",
                connectNullData: true,
                //nullDataLineDashType: "solid",
                xValueType: "dateTime",
                xValueFormatString: "DD MMM",
                yValueFormatString: "#,##0.##\" CLP\"",
                dataPoints: valores
            }]
        });
        chart.render();
    }

})
