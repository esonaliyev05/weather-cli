import axios from "axios";
import { TOKEN_DICTIONARY , getKeyValue } from "./storage.service.js";

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if(!token) {
    throw new Error("API doesn't exist, -t [API_KEY] for saving token ");
  }

  const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather' , {
   params: {
    q: city,
    appid: token,
    lang: "en",
    units: 'metric',
   },


  })
   
  return data

//   const url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=a2c96b26f36e0755f0755aebe9e656b3`);
//   url.searchParams.append(`q`, city);
//   url.searchParams.append(`appid`, token);
//   url.searchParams.append('lang', 'en');
//   url.searchParams.append('units', 'metric');


//   https.get(url, (response) => {
//     let data = '';

//     // Ma'lumot kelganda uni qo'shish
//     response.on("data", (chunk) => {
//       data += chunk;
//     });

//     // Barcha ma'lumot kelgandan so'ng
//     response.on("end", () => {
//       try {
//         const weather = JSON.parse(data);
//         console.log(weather);
//       } catch (err) {
//         console.error("JSON parsing error:", err);
//       }
//     });

//     response.on("error", (err) => {
//       console.error("Response error:", err);
//     });
//   }).on("error", (err) => {
//     console.error("Request error:", err);

//   });
// };
}

export { getWeather };
