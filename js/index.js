const sendButton = document.getElementById("botonEnviar");
const cityInput = document.getElementById("ciudad");
const previsionTiempo = document.getElementById("previsionTiempo");
const timeIcon = document.getElementById("timeIcon");

const fetchWithToken = (url, city, apikey) => {
    url+=`?q=${city}&appid=${apikey}&lang=es&units=metric`;
    return fetch(url)
}

 const initMap = (latitud, longitud) => {
    // The location of the city
    const city = {
        lat: latitud,
        lng: longitud
    };
    // The map, centered at City
    const map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: city
        });
    // The marker, positioned at City
    const marker = new google.maps.Marker({
        position: city,
        map: map
    });
};


sendButton.addEventListener("click", () => {
    const city = cityInput.value;
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const apikey = "397b21357f3619c26dd16978388bd7d9";

    fetchWithToken(url, city, apikey).then((response) => {
        response = response.json().then((response) => {
            console.log(response);
            const info = {
                city: response.name,
                latitud: response.coord.lat,
                longitud: response.coord.lon,
                description: response.weather[0].description,
                temperature: response.main.temp,
                icon: "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
            };
            console.log(info);
            initMap(info.latitud, info.longitud);
            
            const message = `El tiempo en ${info.city} es actualmente ${info.description} y la temperatura es de ${info.temperature} grados centígrados`;
            const image = `<img src="${info.icon}" alt="icono del tiempo">`;
            
            console.log(message);
            previsionTiempo.innerHTML = `<div class="alert alert-info" role="alert">
                                            ${message}<br>
                                            ${image}
                                        </div>`;
        });
    })
    .catch((error) => {
        console.log(error);
        const message = 'Ciudad no encontrada, intente nuevamente'
        previsionTiempo.innerHTML = `<div class="alert alert-danger" role="alert">
                                        ${message}
                                    </div>`;
    });
});