let url = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey = 'b0698cadd0c672be50760056bdb81292'; 

async function getWeatherData(city) {
  try {
    let response = await fetch(`${url}?q=${city}&appid=${apiKey}&units=metric`)
    if (response.status !== 200){
       throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function displayWeather(data) {
  let weatherDisplay = document.getElementById('display');
  weatherDisplay.style.backgroundColor ='rgba(230, 228, 228, 0.3)'
  weatherDisplay.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Weather Condition: ${data.weather[0].description}</p>
    
  `;
  
}

function displayError(message) {
  let errorDisplay = document.getElementById('errorDisplay');
  errorDisplay.textContent = message;
  errorDisplay.style.backgroundColor ='rgba(230, 228, 228, 0.3)'
  errorDisplay.style.paddingTop = '20px'
}

function clearDisplay() {
  document.getElementById('city').value = '';
  document.getElementById('display').innerHTML = '';
  document.getElementById('errorDisplay').textContent = '';
  document.getElementById('errorDisplay').style.backgroundColor = '';
}

let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let cityInput = document.getElementById('city')

btn1.addEventListener('click', async () => {
  let city = cityInput.value.trim();
  clearDisplay();
  if (city) {
    try {
      let weatherData = await getWeatherData(city);
      displayWeather(weatherData);
    } catch (error) {
      displayError(error.message);
    }
  } else {
    displayError('Please enter a city name');
  }
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('btn1').click();
  }
});

btn2.addEventListener('click', clearDisplay);




