//get html elements

const personName = document.getElementById("name-input");
const feedBackName = document.getElementById("feebback-name");
const feedBackCountry = document.getElementById("feedback-country");
const submitButton = document.getElementById("submit")

submitButton.addEventListener("click", (e) => {
  const usename =personName.value;
  submitButton.setAttributeAttribute("disable", true)
  const response = fetch(`https://api.nationalize.io/?name=${usename}`);
  response.then(function (res) {
    res.json().then(function (data) {
      const { name, country } = data;
      let topcountry= country[0];
      
      const {country_id, probability}=  topcountry;
      feedBackName.innerText = name;
      feedBackCountry.innerText = `${country_id}, ${probability}`;
      
    });    
  });
  response.catch(e=>
    {
    feedBackName.innerText=`Oops, error occoured, try again later.`

  }
  )
    
  
});
