$('path').click(function () { 
  let countryId = $(this).attr('id');
  let apiUrl = 'https://api.covid19api.com/summary';
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let countryData = data.Countries.find(country => country.CountryCode === countryId);
      if (countryData) {
        let totalConfirmed = countryData.TotalConfirmed;
        let totalDeaths = countryData.TotalDeaths;
        let countryName = countryData.Country
        console.log(countryId, totalConfirmed, totalDeaths,);
        
        let infoDiv = $('#country-info');
        infoDiv.empty(); 

        let nameElem = $('<h2>').text(countryName);
        let confirmedElem = $('<p>').text('Total confirmed cases: ' + totalConfirmed);
        let deathsElem = $('<p>').text('Total deaths: ' + totalDeaths);

        infoDiv.append(nameElem);
        infoDiv.append(confirmedElem);
        infoDiv.append(deathsElem);
      }
    })
    .catch(err => console.error(err));
});

/****************************************************/  
// var data = null;

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === this.DONE) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("GET", "https://api.collectapi.com/corona/countriesData");
// xhr.setRequestHeader("content-type", "application/json");
// xhr.setRequestHeader("authorization", "apikey 6tL7aLe95o0bT2ZQ8LZjpC:0v94swPwCmMpOD1pWkkUVA");

// xhr.send(data);
// console.log(xhr);
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '45d64cddacmsh0d048a5f2ce5abep194a3fjsn34c74e2464e9',
// 		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
// 	}
// };

// fetch('https://api.covid19api.com/summary')
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
  /*********************************************************/ 
  // fetch('./js/data.json').then(response => response.json())
  // .then(data => console.log(data)).catch(err => console.error(err));

/****************************************************/  
fetch('https://disease.sh/v3/covid-19/all')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let cases = data.cases;
    let deaths = data.deaths;
    let recovered = data.recovered;
    
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Deaths', 'Recovered', 'Cases'],
        datasets: [{
          label: '# of Votes',
          data: [deaths, recovered, cases],
          backgroundColor: [
            'rgba(245, 56, 90)',
            'rgba(45, 206, 153)',
            'rgba(123, 111, 255)'
          ],
          borderColor: [
            'rgba(245, 56, 90)',
            'rgba(45, 206, 153)',
            'rgba(123, 111, 255)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        cutoutPercentage: 50,
        animation: {
          animateScale: true
        }
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
/****************************************************/ 

