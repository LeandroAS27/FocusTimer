let trabalho = document.querySelector('#trabalho');
let intervaloLongo = document.querySelector("#intervalo-longo");
let intervaloCurto = document.querySelector("#intervalo-curto");
let botaoStart = document.getElementById("start");
let botaoStop = document.getElementById("stop");

let TempoTrabalho = 25;
let TempoIntervalo = 5;
let TempoIntervaloLongo = 20;
let seconds = 0;

let timerInterval;
let isPaused = false;
let workMinutes;
let reiniciar = false;

let currentMinutes;
let currentSeconds;

//Display

window.onload = () => {
    document.querySelector('#minutes').textContent = "00";
    document.querySelector('#seconds').textContent = "00";
}

//Trabalho display

trabalho.onclick = () => {
    document.querySelector('#minutes').textContent = TempoTrabalho;
    document.querySelector('#seconds').textContent = seconds + "0";

    trabalho.classList.toggle('active')
    if (intervaloLongo.classList.contains('active') || intervaloCurto.classList.contains('active')){
        intervaloLongo.classList.remove('active')
        intervaloCurto.classList.remove('active')
    }else if(!trabalho.classList.contains('active')){
        document.querySelector('#minutes').textContent = "00";
        document.querySelector('#seconds').textContent = "00";
    }
}

//Intervalo Curto display

intervaloCurto.onclick = () => {
    document.querySelector('#minutes').textContent = TempoIntervalo;
    document.querySelector('#seconds').textContent = seconds + "0";
    
    intervaloCurto.classList.toggle('active')
    if (trabalho.classList.contains('active')){
        trabalho.classList.remove('active')
    }else if(!intervaloCurto.classList.contains('active')){
        document.querySelector('#minutes').textContent = "00";
        document.querySelector('#seconds').textContent = "00";
    }
}

//Intervalo Longo display

intervaloLongo.onclick = () => {
    document.querySelector('#minutes').textContent = TempoIntervaloLongo;
    document.querySelector('#seconds').textContent = seconds + "0";

    intervaloLongo.classList.toggle('active')
    if (trabalho.classList.contains('active') || intervaloCurto.classList.contains('active')){
        trabalho.classList.remove('active')
        intervaloCurto.classList.remove('active')
    }else if(!intervaloLongo.classList.contains('active')){
        document.querySelector('#minutes').textContent = "00";
        document.querySelector('#seconds').textContent = "00";
    }
}




//Start Tempo

function start(){
    if (!isPaused){
        if (trabalho.classList.contains('active')){
            workMinutes = TempoTrabalho;
        } else if (intervaloCurto.classList.contains('active')){
            workMinutes = TempoIntervalo;
        } else if (intervaloLongo.classList.contains('active')){
            workMinutes = TempoIntervaloLongo;
        } else {
            alert("Selecione um modo para iniciar o timer")
            return;
        }
    }
        seconds = 0;
        //botaoStart.classList.remove("botao-ativado")
        botaoStart.classList.add('botao-ativado')
    

    let timerFunction = () => {
        // Atualiza os minutos e segundos na pagina
        document.querySelector('#minutes').textContent = workMinutes < 10 ? "0" + workMinutes : workMinutes;
        document.querySelector('#seconds').textContent = seconds < 10 ? "0" + seconds : seconds;
        
        currentMinutes = workMinutes;
        currentSeconds = seconds;
        //start
        seconds--; //Decrementa os segundos
        
        if(seconds < 0 ){ // se os segundos chegarem a 0
            workMinutes--; //Decrementa os minutos
            seconds = 59;   //Reseta os segundos para 59
        }

        if(workMinutes < 0){
            clearInterval(timerInterval);
            document.querySelector('#minutes').textContent = "00";
            document.querySelector('#seconds').textContent = "00";
            botaoStart.classList.remove("botao-ativado")
            alert('Hora da Pausa')
        }

    }

    timerInterval = setInterval(timerFunction, 1000);
}

function stop(){
    if (trabalho.classList.contains('active')) {
        workMinutes = TempoTrabalho;
    } else if (intervaloCurto.classList.contains('active')) {
        workMinutes = TempoIntervalo;
    } else if (intervaloLongo.classList.contains('active')) {
        workMinutes = TempoIntervaloLongo;
    } else {
        alert("Selecione um modo para reiniciar o timer");
        return;
    }
    if (isPaused){
        isPaused = false;
        botaoStop.textContent = "Pausar";
        timerInterval = setInterval(() => {
            document.querySelector('#minutes').textContent = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
            document.querySelector('#seconds').textContent = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;


            currentSeconds--;

            if (currentSeconds < 0) {
                currentMinutes--;
                currentSeconds = 59;
            }

            if (currentMinutes < 0) {
                clearInterval(timerInterval);
                document.querySelector('#minutes').textContent = "00";
                document.querySelector('#seconds').textContent = "00";
                botaoStart.classList.remove("botao-ativado");
                alert('Hora da Pausa');
            }
        }, 1000);
    } else {
        isPaused = true;
        clearInterval(timerInterval)
        botaoStop.textContent = "Retomar";
        botaoStart.classList.remove('botao-ativado')
    }
    
    botaoStop.classList.toggle("botao-pausado")
}


function restart(){
    if (trabalho.classList.contains('active')) {
        workMinutes = TempoTrabalho;
    } else if (intervaloCurto.classList.contains('active')) {
        workMinutes = TempoIntervalo;
    } else if (intervaloLongo.classList.contains('active')) {
        workMinutes = TempoIntervaloLongo;
    } else {
        alert("Selecione um modo para reiniciar o timer");
        return;
    }
        seconds = 0;
        document.querySelector('#minutes').textContent = workMinutes < 10 ? "0" + workMinutes : workMinutes;
        document.querySelector('#seconds').textContent = "00";

        clearInterval(timerInterval)
        isPaused = false;
        botaoStart.classList.remove("botao-ativado");
        botaoStop.classList.remove("botao-pausado");
}

// Light mode
let body = document.body
const icone = document.getElementById('ri-sun-line');
const backgroundIcone = document.getElementById('container-light')
icone.addEventListener('click', () => {
    icone.classList.toggle('ri-sun-line')
    icone.classList.toggle('ri-moon-line')

    if(icone.classList.contains('ri-moon-line')){
        document.body.style.background = "#021526"
        document.body.style.color = "#fff"
        backgroundIcone.style.background = "#012c4e"
    }else{
        document.body.style.background = "#0F67B1";
        document.body.style.color = "#000000"
        backgroundIcone.style.background = "#FAFFAF"
    }
})