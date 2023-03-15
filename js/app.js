/****************************************************/  
/*****************map country statistics*******************/ 
/****************************************************/ 
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
        console.log(countryId, totalConfirmed, totalDeaths,countryName);
        
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
/*****************chart statisique*******************/ 
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

