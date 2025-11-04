

const link = "http://localhost:3333/"

async function getDashboardData(query) {
  // definisco le tre chiamate 
  const nome = fetch(`${link}destinations?search=${query}`)
  const meteo = fetch(`${link}weathers?search=${query}`)
  const aeroporto = fetch(`${link}airports?search=${query}`)

  // pomise.all
  const response = await Promise.all([nome, meteo, aeroporto]);
  // converto in json 
  const data = await Promise.all(response.map(res => res.json()));
  const [destinazione, meteoData, aeroportoData] = data;

  // creo oggetto data da restituire  
  return {
    city: destinazione[0].name,
    country: destinazione[0].country,
    temperature: meteoData[0].temperature,
    weather: meteoData[0].weather_description,
    airport: aeroportoData[0].name
  };
}


//uso la funzione 
getDashboardData('london')
  .then(data => {
    console.log('Dasboard data:', data);
    console.log(
      `${data.city} is in ${data.country}.\n` +
      `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
      `The main airport is ${data.airport}.\n`
    );
  })
  .catch(error => console.error(error));