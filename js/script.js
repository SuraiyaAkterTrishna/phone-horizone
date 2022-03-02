// get document by id
const searchResults = document.getElementById("search-results-area");
const phoneDetails = document.getElementById("phone-details");
//toggle spinner
const toggleSpinner = value => {
  document.getElementById("spinner").style.display = value;
}
// get search value
const findMobile = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value.toLowerCase();
  // clean previous error message
  phoneDetails.textContent = "";
  // clean previous search results
  searchResults.textContent = "";
  // clean input field
  searchField.value = "";
  // display spinner
  toggleSpinner('block');

  if (searchText == "") {
    // creating div for show error massage
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="alert alert-danger w-75 mx-auto text-center" role="alert">
        There are no search value — please enter a value!
    </div>
    `;
    phoneDetails.appendChild(div);
    // hide spinner
    toggleSpinner('none');
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhones(data.data.slice(0, 20)));
  }
};

// display all search phones
const displayPhones = (phones) => {
  // Error handling for missing phones
  if (phones.length === 0) {
    // creating div for show error massage
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="alert alert-danger w-75 mx-auto text-center" role="alert">
        There are no phone available — check it out!
    </div>
    `;
    phoneDetails.appendChild(div);
    // hide spinner
    toggleSpinner('none');
  } else {
    // show all searching phones dynamically
    phones.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="mt-3 mx-auto d-block w-75" alt="" />
            <div class="card-body mx-5 text-center">
                <h4 class="card-title">${phone.phone_name}</h4>
                <p class="card-text">
                  Brand: <span class="fw-bold">${phone.brand}</span>
                </p>
            </div>
            <a href="#phone-details" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-success w-75 mx-auto m-3">Details</a>
        </div>
      `;
      searchResults.appendChild(div);
      // hide spinner
      toggleSpinner('none');
    });
  }
};

// get specific phone details
const loadPhoneDetails = (id) => {
  // get api from phone id
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

// display details for specific phone
const displayPhoneDetails = (phone) => {
  // cleaning previous phone details
  phoneDetails.textContent = "";
  // creating div for show specific phone dynamically
  const div = document.createElement("div");
  div.classList.add("card");
  div.classList.add("col-md-10");
  div.classList.add("mx-auto");
  div.innerHTML = `
        <img src="${phone.image}" class="mt-3 mx-auto d-block w-75" alt="" />
        <div class="card-body">
          <h1 class="card-title">${phone.name} Full Specifications</h1>
          <div class="table-responsive">
            <table class="table table-bordered">
              <tbody>
              <tr>
              <td>First Release</td>
              <td>${phone.releaseDate ? phone.releaseDate  : "Release date not found!"}</td>
          </tr>
          <tr class="bg-secondary bg-opacity-10">
              <td>Main Features</td>
              <td></td>
          </tr>
          <tr>
              <td>Storage</td>
              <td>${phone.mainFeatures.storage}</td>
          </tr>
          <tr>
              <td>ChipSet</td>
              <td>${phone.mainFeatures.chipSet}</td>
          </tr>
          <tr>
              <td>Display Size</td>
              <td>${phone.mainFeatures.displaySize}</td>
          </tr>
          <tr>
              <td>Memory</td>
              <td>${phone.mainFeatures.memory}</td>
          </tr>
          <tr>
              <td>Sensors</td>
              <td>${phone.mainFeatures.sensors}</td>
          </tr>
          <tr class="bg-secondary bg-opacity-10">
              <td>Others</td>
              <td></td>
          </tr>
          <tr>
              <td>Bluetooth</td>
              <td>${phone?.others?.Bluetooth != undefined ? phone.others.Bluetooth : 'Bluetooth not found!'}</td>
          </tr>
          <tr>
              <td>GPS</td>
              <td>${phone?.others?.GPS != undefined ? phone.others.GPS : 'GPS not found!'}</td>
          </tr>
          <tr>
              <td>NFC</td>
              <td>${phone?.others?.NFC != undefined ? phone.others.NFC : 'NFC not found!'}</td>
          </tr>
          <tr>
              <td>Radio</td>
              <td>${phone?.others?.Radio != undefined ? phone.others.Radio : 'Radio not found!'}</td>
          </tr>
          <tr>
              <td>USB</td>
              <td>${phone?.others?.USB != undefined ? phone.others.USB : 'USB not found!'}</td>
          </tr>
          <tr>
              <td>WLAN</td>
              <td>${phone?.others?.WLAN != undefined ? phone.others.WLAN : 'WLAN not found!'}</td>
          </tr>
              </tbody>
            </table>
          </div>
        </div>
    `;
  phoneDetails.appendChild(div);
  // hide spinner
  toggleSpinner('none');
};
