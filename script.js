const apiKey = "4f16fc51797de2c2c7f972211b375557";
const cidadePadrao = "Jaragua do Sul"; 
const urlPadrao = `https://api.openweathermap.org/data/2.5/weather?q=${cidadePadrao}&appid=${apiKey}&units=metric&lang=pt_br`;

const nomeCidade = document.getElementById("nomeCidade");
const paisCidade = document.getElementById("paisCidade");
const temperaturaCidade = document.getElementById("temperaturaCidade");
const sensacaoTermica = document.getElementById("sensacaoTermica");
const cardClima = document.getElementById("cardClima");
const inputCidade = document.getElementById("cidadeInput");
const iconeDia = document.getElementById("iconeDia");
const horario = document.getElementById("horario");
const header = document.getElementById("header");
const botaoSubmit = document.getElementById("botaoSubmit");
const tituloPesquisa = document.getElementById("tituloPesquisa");
const mensagemEspecial = document.getElementById("mensagemEspecial");
const pesquisa = document.querySelector("form");

function atualizarClima(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Cidade não encontrada");
      return response.json();
    })
    .then((data) => {
        nomeCidade.innerText = data.name;
        paisCidade.innerText = data.sys.country;
        temperaturaCidade.innerText = data.main.temp;
        sensacaoTermica.innerText = data.main.feels_like;
        const horaLocal = new Date((data.dt + data.timezone) * 1000); 

        const horas = horaLocal.getUTCHours();
        const minutos = horaLocal.getUTCMinutes();

        const horaFormatada = `${horas}:${minutos < 10 ? '0' + minutos : minutos}`;

        console.log(`Hora atual em ${data.name}: ${horaFormatada}`);
        horario.innerText = horaFormatada;
  
        let iconDia = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
        let iconNoite = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>';
        let iconChuva = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-rain-wind-icon lucide-cloud-rain-wind"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m9.2 22 3-7"/><path d="m9 13-3 7"/><path d="m17 13-3 7"/></svg>';

        const tempoAtualUnix = data.dt;
        const nascerDoSolUnix = data.sys.sunrise;
        const porDoSolUnix = data.sys.sunset;

        const ehDia = tempoAtualUnix >= nascerDoSolUnix && tempoAtualUnix < porDoSolUnix;

        let iconeBase = ehDia ? iconDia : iconNoite;
        let classePeriodo = ehDia ? "dia" : "noite";
        let mensagem = ehDia ? "Aproveite seu Dia!" : "Boa noite! Durma bem.";

        let estaChovendo = false;
        if (data.weather && data.weather.length > 0) {
            const condicaoPrincipal = data.weather[0].main;

            if (['Rain', 'Drizzle', 'Thunderstorm', 'Snow', 'Mist', 'Fog'].includes(condicaoPrincipal)) {
                estaChovendo = true;
            }
        }

        if (estaChovendo) {
            iconeDia.innerHTML = iconeBase + " " + iconChuva;
        } else {
            iconeDia.innerHTML = iconeBase;
        }

        cardClima.classList.remove("dia", "noite");
        cardClima.classList.add(classePeriodo);

        header.classList.remove("dia", "noite");
        header.classList.add(classePeriodo);

        botaoSubmit.classList.remove("dia", "noite");
        botaoSubmit.classList.add(classePeriodo);

        tituloPesquisa.classList.remove("dia", "noite");
        tituloPesquisa.classList.add(classePeriodo);

        mensagemEspecial.innerText = mensagem;
    })
    .catch((error) => console.error("Erro:", error));
}

window.addEventListener("load", () => {
  atualizarClima(urlPadrao);
});

pesquisa.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const cidade = inputCidade.value.trim();

  if (cidade === "") {
    alert("Digite uma cidade válida");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`;

  atualizarClima(url);
});
