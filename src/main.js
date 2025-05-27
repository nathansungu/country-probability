//get html elements

const personName = document.getElementById("name-input");
const feedBackName = document.getElementById("feebback-name");
const feedBackCountry = document.getElementById("feedback-country");
const submitButton = document.getElementById("submit");

//function to clean data
function cleanData(country_id, probability) {
  var getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });
  const countryName = getCountryNames.of(country_id);
  const percentage = (probability * 100).toFixed(2);
  feedBackCountry.innerText += ` ${countryName}:  Certainity ${percentage}% \n`;
}
//function enable button
function enableButtonFunction() {
  submitButton.removeAttribute("disabled");
  submitButton.innerText = "Search";
}

submitButton.addEventListener("click", (e) => {
  const usename = personName.value;
  feedBackName.innerText = "";
  feedBackCountry.innerText = "";
  submitButton.setAttribute("disabled", true);
  if (!usename) {
    feedBackCountry.innerText = "Provide a name to proced";
    enableButtonFunction();
    return feedBackCountry;
  }
  submitButton.innerText = "Wait ....";
  const response = fetch(`https://api.nationalize.io/?name=${usename}`);
  response.then(function (res) {
    const fetchresults = res.json().then(function (data) {
      const { name, country } = data;

      for (let i = 0; i < country.length; i++) {
        const { country_id, probability } = country[i];
        country.shift();
        cleanData(country_id, probability);
      }

      feedBackName.innerText = `${name} is either from: `;
      enableButtonFunction();
    });
    fetchresults.catch((e) => {
      feedBackName.innerText = "Oops! Out of trials for the day";
      enableButtonFunction();
    });
  });
  response.catch((e) => {
    feedBackName.innerText = `Oops! Error occoured, try again later.`;
    enableButtonFunction();
  });
});
