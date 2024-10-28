const graphic = document.querySelector("#graphic");
const currencyForm = document.querySelector("#currency-form");
const resultDiv = document.querySelector("#result");


const API_URL = "https://mindicador.cl/api/";
let chartInstance = null; //we make an instance for the chart


currencyForm.addEventListener("submit", queryAPI);


async function queryAPI(e) {
    e.preventDefault();
    // we take the values from the input and the select
    const inputAmount = document.querySelector("#input-amount").value;
    const selectedCurrency = document.querySelector("#currency").value;

    try {
        // we get the api with the selected currency
        const response = await fetch(API_URL + selectedCurrency);
        const result = await response.json();
        // we access to the most recent value in serie
        const currencyValue = result.serie[0].valor;
        // we get the conversion and use toFixed to get just 2 decimals
        const conversion = (inputAmount/currencyValue).toFixed(2);
        
        resultDiv.innerText = `${inputAmount} CLP son ${conversion} ${selectedCurrency.toUpperCase()}S`;

        showGraphic(result.serie);

        currencyForm.reset();
    } catch (error) {
        resultDiv.innerText = "Failed at getting the data. Try again."
        console.log(error);
    }
};


function showGraphic(serie) {
    const graphic2D = graphic.getContext("2d");

    if(chartInstance){
        chartInstance.destroy(); //if we have already a chart, destroy it
    }

    // we make a new array of the first 10 elements of the serie (last 10 days), we use split T to delete the hours from de format ISO ("YYYY-MM-DD*--it deletes from here--*THH:MM:SS")
    const tagDays = serie.slice(0, 10).map(day => day.fecha.split("T")[0]); 
    // same as the tagDays but with the values of those days
    const values = serie.slice(0, 10).map(day => day.valor);

    // create an instance for the chart and make the graphic
    chartInstance = new Chart(graphic2D, {
        type: 'line', //type of chart
        data: { // what is going to show
            labels: tagDays, //tags from x axis
            datasets: [{  //an array that defines the data series to be graphed
                label: 'Value in the past 10 days',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        }
    });
}