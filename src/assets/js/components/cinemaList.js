/*var xhr = new XMLHttpRequest();
xhr.open('GET', 'assets/cinema-data.json', false);
xhr.send();

if (xhr.status != 200) {
    alert(xhr.status + ':' + xhr.statusText);
} else {
    var data = JSON.parse(xhr.responseText);
}*/

var displayDiv = document.getElementById("displayDiv");

function getJsonAsync(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, false);

        xhr.onload = () => {
            if (xhr.status === 200) {
                // Запрос выполнился успешно
                resolve(xhr.response);
            } else {
                // Запрос не выполнился, обрабатываем ошибку
                reject("Не получилось загрузить RSS");
            }
        };
        xhr.onerror = () => {
            // Запрос не выполнился, обрабатываем ошибку
            reject("Не получилось загрузить RSS");
        };

        xhr.send();
    })
}

getJsonAsync("assets/cinema-data.json").then(json => {
    let data = JSON.parse(json);

    let dataSort = shuffle(data);

    document.getElementById('all').innerHTML = `
    ${dataSort.map(cinemaTemplate).join('')}
    `;
    document.getElementById('new').innerHTML = `
    ${data.filter(cinema => cinema.status === "New").map(cinemaTemplate).join('')}
    `;
}).catch(error => {
    displayDiv.innerHTML = error;
});

getJsonAsync("assets/cinema-data.json").then(json => {
    let data = JSON.parse(json);

    document.getElementById('rec').innerHTML = `
    ${data.filter(cinema => cinema.status === "Recommendation").map(cinemaTemplate).join('')}
    `;
    document.getElementById('new').innerHTML = `
    ${data.filter(cinema => cinema.status === "New").map(cinemaTemplate).join('')}
    `;
}).catch(error => {
    displayDiv.innerHTML = error;
});


/*
let dataNew = data.filter(cinema => cinema.status === "New");
let dataLast = data.filter(cinema => cinema.status === "Last");
let dataRec = data.filter(cinema => cinema.status === "Recommendation");



document.getElementById('new').innerHTML =`
        ${dataNew.map(cinemaTemplate).join('')}
        `;
document.getElementById('last').innerHTML = `
        ${dataLast.map(cinemaTemplate).join('')}
        `;
document.getElementById('rec').innerHTML = `
        ${dataRec.map(cinemaTemplate).join('')}
        `;
*/



function cinemaTemplate(cinema) {
        return `
            
            <div class="content__item" >
            <img class="content__img" src="${cinema.image}" width="205" height="307" alt="content">
            <div class="content__text">
                <div class="content__line">${cinema.name}</div>
                <div class="content__line">${cinema.year}</div>
                <div class="content__line">${cinema.director}</div>
            </div>

            </div> 
        `;
}

function shuffle(arr){
    var j, temp;
    for(var i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}




