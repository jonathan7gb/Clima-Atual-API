const apiKey = "4f16fc51797de2c2c7f972211b375557";
const cidade = "Sao Paulo";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

fetch(url)
  .then((response) => {
    if (!response.ok) throw new Error("Erro ao buscar dados");
    return response.json();
  })
  .then((data) => {
    console.log(`A temperatura em ${data.name} é de ${data.main.temp}°C`);
  })
  .catch((error) => console.error("Erro:", error));