

const link = "http://localhost:3333/"

async function getDashboardData(query) {
  // definisco le tre chiamate 
  const nome = fetch(`${link}destinations?search=${query}`)
  const meteo = fetch(`${link}weathers?search=${query}`)
  const aeroporto = fetch(`${link}airports?search=${query}`)

  // pomise.all
  try {
    const response = await Promise.allSettled([nome, meteo, aeroporto]);
    // filtro per riuscite converto in json 
    const fulfilled = response
      .filter(r => r.status === "fulfilled")
      .map(r => r.value);

    const data = await Promise.all(fulfilled.map(res => res.json()));
    const [destinazione, meteoData, aeroportoData] = data;



    response.forEach((r, i) => {
      if (r.value.status == 404) {
        const nomeChiamata = ["destinations", "weathers", "airports"][i];
        console.warn(`Errore nella chiamata ${nomeChiamata}`);
      }
    });


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
getDashboardData('vienna')
  .then(data => {

    let frase = ""

    if (data.city && data.country) {
      frase += `${data.city} is in ${data.country}.\n`
    }

    if (data.temperature && data.weather) {
      frase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
    }
    if (data.airport) {
      frase += `The main airport is ${data.airport}.\n`
    }

    console.log('Dasboard data:', data);
    console.log(frase);
  })
  .catch(error => console.error(error));


