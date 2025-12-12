const apiKey = "4f16fc51797de2c2c7f972211b375557";
const cidadePadrao = "Jaragua do Sul"; 
const urlPadrao = `https://api.openweathermap.org/data/2.5/weather?q=${cidadePadrao}&appid=${apiKey}&units=metric&lang=pt_br`;

const nomeCidade = document.getElementById("nomeCidade");
const paisCidade = document.getElementById("paisCidade");
const temperaturaCidade = document.getElementById("temperaturaCidade");
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
        const horaLocal = new Date((data.dt + data.timezone) * 1000); 

        const horas = horaLocal.getUTCHours();
        const minutos = horaLocal.getUTCMinutes();

        const horaFormatada = `${horas}:${minutos < 10 ? '0' + minutos : minutos}`;

        console.log(`Hora atual em ${data.name}: ${horaFormatada}`);
        horario.innerText = horaFormatada;

        if (data.timezone > 21600 && data.timezone < 64800) {
            iconeDia.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
            cardClima.classList.remove("noite");
            cardClima.classList.add("dia");
            header.classList.remove("noite");
            header.classList.add("dia");
            botaoSubmit.classList.remove("noite");
            botaoSubmit.classList.add("dia");
            tituloPesquisa.classList.remove("noite");
            tituloPesquisa.classList.add("dia");
            mensagemEspecial.innerText = "Aproveite seu Dia!"
        } else {
            cardClima.classList.add("noite");
            cardClima.classList.remove("dia");
            header.classList.add("noite");
            header.classList.remove("dia");
            botaoSubmit.classList.add("noite");
            botaoSubmit.classList.remove("dia");
            tituloPesquisa.classList.add("noite");
            tituloPesquisa.classList.remove("dia");
            iconeDia.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>';
            mensagemEspecial.innerText = "Boa noite! Durma bem."
        }
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
