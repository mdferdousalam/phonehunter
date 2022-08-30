const loadPhones = async (searchText, datalimit) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, datalimit);
};

const displayPhones = (phones, datalimit) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  // display 10 phones only conditions
  const showall = document.getElementById("showall");
  if (datalimit && phones.length > 10) {
    phones = phones.slice(0, 10);

    showall.classList.remove("d-none");
  } else {
    showall.classList.add("d-none");
  }

  // display no phones message condition
  const message = document.getElementById("no-found-message");
  if (phones.length === 0) {
    message.classList.remove("d-none");
  } else {
    message.classList.add("d-none");
  }
  // display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    
    <div class="card p-4 ">
              <img src="${phone.image}" class="card-img-top text-center p-8 " alt="..." />
              <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal"
                  data-bs-target="#phoneDetailModal" >Show Details</button>
              </div>
            </div>
    
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  // stop loader
  toggleSpiner(false);
};

// search process codes

const searchProcess = (datalimit) => {
  toggleSpiner(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  loadPhones(searchText, datalimit);
};

// handle Search Button click
document.getElementById("btn-search").addEventListener("click", function () {
  // loader start here
  searchProcess(10);
});

// search field Enter Key handler
document
  .getElementById("searchField")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchProcess(10);
    }
  });

// spiner togler code here

const toggleSpiner = (isloading) => {
  const loaderSection = document.getElementById("loader");
  if (isloading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// show all button code

document.getElementById("btn-show-all").addEventListener("click", function () {
  searchProcess();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id} `;
  const res = await fetch(url);
  const zubayer = await res.json();
  displayPhoneDetails(zubayer.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = ` ${phone.name} `;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `  
  
  <p><b>Release Date : </b> ${phone.releaseDate} </p>
  <p><b>Main Features : </b> <br>
    <B>Chipset : </B> ${phone.mainFeatures.chipSet} <br>
    <b>Display Size : </b> ${phone.mainFeatures.displaySize} <br>
    <b>Memory : </b> ${phone.mainFeatures.memory} <br>
    <b>Chipset : </b> ${phone.mainFeatures.chipSet} <br>
    </p>
  <p><b>Brand : </b>${phone.brand} </p>

  
  `;
};
// loadPhones();
