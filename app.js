document.getElementById("viewForecastBtn").addEventListener("click", async () => {
    try {
        const response = await fetch("/api/weather");
        const data = await response.json();

        if (data.forecast && data.forecast.length > 0) {
            let forecastHtml = "<h4>Weather Forecast</h4><ul class='list-group'>";
            
            data.forecast.forEach((day, index) => {
                forecastHtml += `<li class="list-group-item"><strong>Day ${index + 1}:</strong> ${day.condition}, ${day.temperature}°C</li>`;
            });

            forecastHtml += "</ul>";
            document.getElementById("forecastDisplay").innerHTML = forecastHtml;
        } else {
            document.getElementById("forecastDisplay").innerHTML = "<p>No forecast data available.</p>";
        }
    } catch (error) {
        console.error("Error fetching forecast:", error);
        document.getElementById("forecastDisplay").innerHTML = "<p>Error fetching forecast.</p>";
    }
});
