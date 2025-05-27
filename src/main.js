//get html elements

const personName = document.getElementById("name-input");
const feedBackName = document.getElementById("feebback-name");
const feedBackCountry = document.getElementById("feedback-country");
const submitButton = document.getElementById("submit");

//function to clean data
function cleanData(country_id,probability) {
  var getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });
  const countryName = getCountryNames.of(country_id);
  const percentage = (probability * 100).toFixed(2);
  feedBackCountry.innerText += `County ${countryName}, Certainity ${percentage}% \n`;
  
}

submitButton.addEventListener("click", (e) => {
  const usename = personName.value;
  submitButton.setAttribute("disable", true);
  const response = fetch(`https://api.nationalize.io/?name=${usename}`);
  response.then(function (res) {
    res.json().then(function (data) {
      const { name, country } = data;
      
      for(let i=0; i<country.length; i++){
        const { country_id, probability } = country[i];
        country.shift();
        cleanData(country_id,probability);
        
      }
      
      feedBackName.innerText = `${name} is either from: `;
    });
  });
  response.catch((e) => {
    feedBackName.innerText = `Oops, error occoured, try again later.`;
  });
});
