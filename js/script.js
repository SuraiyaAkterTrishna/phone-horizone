// phone search area
const searchPhone = () => {
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   searchField.value = '';
   const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url)
   .then(res => res.json())
   .then(data => displaySearchResult(data.data.slice(0,20)));
}
// phone search result
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="mt-3 mx-auto d-block w-75" alt="phone-image">
            <div class="card-body mx-5">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-success w-75 mx-auto m-3">Explore</button>
        </div>
        `;
        searchResult.appendChild(div);
    });
}
//single phone details area
const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}
// display phone details 
const displayPhoneDetails = phone => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="mt-3 mx-auto d-block" alt="phone-image">
    <div class="card-body table-responsive">
    <table class="table table-bordered table-hover">
    <tbody>
      <tr>
        <th scope="row">Name:</th>
        <td>${phone.name}</td>
      </tr>
      <tr>
        <th scope="row">Release Date:</th>
        <td>${phone.releaseDate?phone.releaseDate : 'No releade date found'}</td>
      </tr>
      <tr>
        <th scope="row">Chipset:</th>
        <td>${phone.mainFeatures.chipSet}</td>
      </tr>
      <tr>
        <th scope="row">Display Size:</th>
        <td>${phone.mainFeatures.displaySize}</td>
      </tr>
      <tr>
        <th scope="row">Memory:</th>
        <td>${phone.mainFeatures.memory}</td>
      </tr>
      <tr>
        <th scope="row">Sensors:</th>
        <td colspan="2" class="horizontal-align: middle">${phone.mainFeatures.sensors}</td>
      </tr>
      <tr>
        <th scope="row">Storage:</th>
        <td>${phone.mainFeatures.storage}</td>
      </tr>
    </tbody>
  </table>
    </div>`;

    phoneDetails.appendChild(div);
}