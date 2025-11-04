

const link = "http://localhost:3333/"

async function getDashboardData(query) {
  // definisco le tre chiamate 
  const nome = fetch(`${link}destinations?search=${query}`)
  const meteo = fetch(`${link}weathers?search=${query}`)
  const aeroporto = fetch(`${link}airports?search=${query}`)

  // pomise.all
  try {
    const response = await Promise.all([nome, meteo, aeroporto]);
    // converto in json 
    const data = await Promise.all(response.map(res => res.json()));
    const [destinazione, meteoData, aeroportoData] = data;
    // creo oggetto data da restituire  

    const citta = destinazione[0]
    const temperatura = meteoData[0];
    const aeroportod = aeroportoData[0]



    return {
      city: citta ? citta.name : null,
      country: citta ? citta.country : null,
      temperature: temperatura ? temperatura.temperature : null,
      weather: temperatura ? temperatura.weather_description : null,
      airport: aeroportod ? aeroportod.name : null
    };

  } catch (error) {
    throw new Error(`Richiesta al server fallita: ${error.message}`);
  }


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


console.log("fine codice")