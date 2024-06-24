let container = document.querySelector('.container');
let search = document.querySelector('.search-icon');
let temparature = document.querySelector('.temparature');
let cloudDetails = document.querySelector('.description');
let windSpeed = document.querySelector('.wind-kmh-nmbr');
let humidity = document.querySelector('.water-percents-nmbr');
let inputSearch = document.querySelector('.search');
let img = document.querySelector('.img');

let apiKey = '366efdde5b21155f3d5c65e761548e57';

search.addEventListener('click', () => {
  let city = inputSearch.value;
  if (city == '') return;

  axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then(res => {
      switch (res.data.weather[0].main) {
        case 'Clear':
          img.src = 'images/clear.png';
          inputSearch.value = '';
          break;
        case 'Rain':
          img.src = 'images/rain.png';
          cloudDetails.textContent = 'Rain';
          inputSearch.value = '';
          break;
        case 'Haze':
          img.src = 'images/mist.png';
          cloudDetails.textContent = 'Haze';
          inputSearch.value = '';
          break;
        case 'Snow':
          img.src = 'images/snow.png';
          cloudDetails.textContent = 'Snow';
          inputSearch.value = '';
          break;
        case 'Clouds':
          img.src = 'images/cloud.png';
          cloudDetails.textContent = 'Broken Clouds';
          inputSearch.value = '';
          break;
        default:
          img.src = 'images/404.png';
          cloudDetails.textContent = 'Enter Location';
          inputSearch.value = '';
          break;
      }

      temparature.innerHTML = `${res.data.main.temp}`;
      cloudDetails.innerHTML = `${res.data.weather[0].description}`;
      humidity.innerHTML = `${res.data.main.humidity}`;
      windSpeed.innerHTML = `${res.data.wind.speed}`;
    })
    .catch(() => {
      img.src = 'images/404.png';
      cloudDetails.textContent = `Location Not Found!`;
      temparature.innerHTML = `0`;

      humidity.innerHTML = `0`;
      windSpeed.innerHTML = `0`;
      inputSearch.value = '';
      temparature.disabled;
    });
});
