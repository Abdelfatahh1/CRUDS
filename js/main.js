let createBtn = document.querySelector(".create-btn");
let dataCreateFields = document.querySelectorAll(".data-create input");
let updateBtn = document.querySelector(".data-create .update-btn");
let titel = document.querySelector("[title]");
let price = document.querySelector("[price]");
let taxes = document.querySelector("[taxes]");
let ads = document.querySelector("[ads]");
let discount = document.querySelector("[discount]");
let count = document.querySelector("[count]");
let category = document.querySelector("[category]");
let totalPrice = document.querySelector(".total span");
let dataItem;
let dataRead = document.querySelector(".data-read");
let deleteBtn = document.querySelector(".data-delete button");
let deleteCount = document.querySelector(".data-delete button span");
let items = document.querySelector(".data-read .items");
let searchField = document.querySelector(".data-search .search input");
let searchTitleBtn = document.querySelector(
  ".data-search .search-btns .search-title",
);
let searchCategBtn = document.querySelector(
  ".data-search .search-btns .search-category",
);

// ......................................... CREATE .........................................

createBtn.addEventListener("click", () => {
  if (titel.value !== "" && price.value !== "" && category.value !== "") {
    if (count.value === "") {
      createData();
    } else {
      for (let i = 1; i <= +count.value; i++) {
        createData();
      }
    }
    showData();
    emptyInputs(dataCreateFields);
  }
});

function getPrice() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    totalPrice.textContent = `${result}`;
  }
}

function emptyInputs(fields) {
  fields.forEach((input) => {
    input.value = "";
    totalPrice.textContent = ``;
  });
}

function createData() {
  let dataObj = {
    title: titel.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: totalPrice.textContent,
  };
  dataItem.push(dataObj);
  localStorage.setItem("product", JSON.stringify(dataItem));
  deleteCount.innerHTML = `( ${dataItem.length} )`;
}

function showData() {
  document.querySelectorAll(".items .item").forEach((item) => {
    item.remove();
  });
  dataItem.forEach((item, index) => {
    let tr = document.createElement("tr");
    tr.className = "item";
    tr.innerHTML = `
                    <td id>${index + 1}</td>
                    <td title>${item.title}</td>
                    <td price>${item.price}</td>
                    <td taxes>${item.taxes}</td>
                    <td ads>${item.ads}</td>
                    <td discount>${item.discount}</td>
                    <td total>${item.total}</td>
                    <td category>${item.category}</td>
                    <td onclick="updateData(${index})" update><button>Update</button></td>
                    <td onclick="deleteItem(${index})" delete><button>Delete</button></td>
        `;
    items.appendChild(tr);
  });
}

// ......................................... UPDATE .........................................

function updateData(index) {
  let item = dataItem[index];
  updateBtn.classList.add("active");
  createBtn.classList.remove("active");
  titel.value = item.title;
  price.value = item.price;
  taxes.value = item.taxes;
  ads.value = item.ads;
  discount.value = item.discount;
  totalPrice.textContent = item.total;
  count.value = item.count;
  category.value = item.category;

  updateBtn.onclick = () => {
    if (titel.value !== "" && price.value !== "" && category.value !== "") {
      item.title = titel.value;
      item.price = price.value;
      item.taxes = taxes.value;
      item.ads = ads.value;
      item.discount = discount.value;
      item.count = count.value;
      item.category = category.value;
      item.total = totalPrice.textContent;
      let i = items.querySelectorAll(".item")[index];
      console.log(i);
      i.innerHTML = `
                        <span id>${index + 1}</span>
                        <span title>${item.title}</span>
                        <span price>${item.price}</span>
                        <span taxes>${item.taxes}</span>
                        <span ads>${item.ads}</span>
                        <span discount>${item.discount}</span>
                        <span total>${item.total}</span>
                        <span category>${item.category}</span>
                        <span onclick="updateData(${index})" update><button>Update</button></span>
                        <span onclick="deleteItem(${index})" delete><button>Delete</button></span>
            `;

      updateBtn.classList.remove("active");
      createBtn.classList.add("active");
      emptyInputs(dataCreateFields);
      localStorage.setItem("product", JSON.stringify(dataItem));
      count.style.display = "block";
    }
  };
  count.style.display = "none";
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// ......................................... DELETE .........................................

function deleteItem(index) {
  dataItem.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(dataItem));
  deleteCount.innerHTML = `( ${dataItem.length} )`;
  showData();
}

function deleteAll() {
  document.querySelectorAll(".items .item").forEach((item) => {
    item.remove();
  });
  dataItem.splice(0);
  localStorage.clear();
  deleteCount.innerHTML = `(${dataItem.length})`;
}
deleteBtn.onclick = deleteAll;

// ......................................... SEARCH .........................................

searchTitleBtn.onclick = function () {
  searchItem(`[title]`);
};

searchCategBtn.onclick = function () {
  searchItem(`[category]`);
};

function searchItem(type) {
  searchField.focus();
  searchField.value = "";
  document.querySelectorAll(".item").forEach((item) => {
    item.style.display = "grid";
  });
  searchField.placeholder = `Search by ${type}`;
  if (document.querySelectorAll(".item").length > 0) {
    searchField.onkeyup = function () {
      document.querySelectorAll(".item").forEach((item) => {
        item.style.display = "grid";
      });
      if (searchField.value !== "") {
        document.querySelectorAll(".item").forEach((item) => {
          if (
            !item
              .querySelector(type)
              .textContent.includes(searchField.value.toLowerCase())
          ) {
            item.style.display = "none";
          }
        });
      }
    };
  }
}

// ......................................... LOCALSTORAGE .........................................

if (localStorage.getItem("product")) {
  dataItem = JSON.parse(localStorage.getItem("product"));
  deleteCount.innerHTML = `( ${dataItem.length} )`;
  showData();
} else {
  dataItem = [];
}
