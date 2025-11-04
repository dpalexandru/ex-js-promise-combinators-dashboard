

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
    destination: destinazione,
    weather: meteoData,
    airport: aeroportoData
  };
}


//uso la funzione 
getDashboardData('london')
  .then(data => {
    const dest = data.destination[0];
    const meteo = data.weather[0];
    const apt = data.airport[0];

    console.log('Dashboard data:', data.destination[0].name);
    console.log(
      `${dest.name} is in ${dest.country}.\n` +
      `Today there are ${meteo.temperature} degrees and the weather is ${meteo.weather_description}.\n` +
      `The main airport is ${apt.name}.\n`
    );
  })
  .catch(console.error);