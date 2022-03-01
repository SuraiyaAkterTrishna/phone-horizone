const searchPhone = () => {
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   searchField.value = '';
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url)
   .then(res => res.json())
   .then(data => displaySearchResult(data.data.slice(0,20)));
}
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="mt-3 mx-auto d-block w-75" alt="phone-image">
            <div class="card-body mx-5">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}