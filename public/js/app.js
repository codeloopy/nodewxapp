console.log('client file loaded successful');

const loader = document.getElementById('loader');
const errorMsg = document.getElementById('error');
const wxLocation = document.getElementById('location');
const wxResult = document.getElementById('weather');

const clearAll = () => {
  errorMsg.textContent = '';
    wxLocation.textContent = '';
    wxResult.textContent = '';
    
};


const findWX = location => {

  fetch(`/weather?address=${location}`)
  .then(response => {
    clearAll();
    loader.textContent = '';
    response.json().then(data => {
      if(data.error){
        errorMsg.textContent = data.error;
      }
      wxLocation.textContent = data.city;
      wxResult.textContent = data.forecast;
    });
  });
};

const wxForm = document.querySelector('form');
const search = document.querySelector('input');

wxForm.addEventListener('submit', (e) => {
  e.preventDefault();  //prevents browser from reloading the entire page
  clearAll();
  loader.textContent = 'Loading...';

  const location = search.value;
  findWX(location);
});