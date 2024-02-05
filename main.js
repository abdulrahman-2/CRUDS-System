let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.querySelector(".total-price");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.querySelector(".create");

let mood = "create";
let temp;

// Get Total Price
function totalPrice() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;

    total.innerHTML = result;
    document.querySelector(".total").style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    document.querySelector(".total").style.backgroundColor = "#a00d02";
  }
}

// Create Product & Save Data In LocalStorage
let products;
if (localStorage.getItem("product") !== null) {
  products = JSON.parse(localStorage.getItem("product"));
} else {
  products = [];
}

createBtn.onclick = () => {
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    let newproduct = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };

    if (mood === `create`) {
      if (newproduct.count > 1) {
        for (let i = 0; i < newproduct.count; i++) {
          products.push(newproduct);
        }
      } else {
        products.push(newproduct);
      }
    } else {
      products[temp] = newproduct;
      mood = "create";
      createBtn.innerHTML = `Create`;
      count.style.display = "block";
    }

    // Save Data In LocalStorage
    localStorage.setItem("product", JSON.stringify(products));

    showProducts();
    clearInputValue();
    search.value = "";
  } else {
    if (title.value == "") {
      alert("Please Enter The Title");
    } else if (price.value == "") {
      alert("Please Enter The Price");
    } else if (category.value == "") {
      alert("Please Enter The Category");
    } else if (count.value > 100) {
      alert("Count Must Be Lower Than Or Equel 100");
    }
  }
};

// Clear Input Value
function clearInputValue() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  document.querySelector(".total").style.backgroundColor = "#a00d02";
}

// Show Product
function showProducts() {
  let content = "";
  for (let i = 0; i < products.length; i++) {
    content += `
    <tr>
      <td>${i + 1}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td>
      <td>${products[i].discount}</td>
      <td>${products[i].total}</td>
      <td>${products[i].category}</td>
      <td><button onclick="updateProduct(${i})" class="update">update</button></td>
      <td><button onclick="deleteProduct(${i})" class="delete">delete</button></td>
    </tr>
  `;
  }
  document.querySelector(".tbody").innerHTML = content;

  let deleteAllBtn = document.querySelector(".delete-all");
  if (products.length > 0) {
    deleteAllBtn.innerHTML = `
        <button onclick="deleteAll()">Delete All Product (${products.length})</button>
      `;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}
showProducts();

// Count Product

// Delete Product
function deleteProduct(index) {
  // delete form products array
  products.splice(index, 1);

  // update localStorage
  localStorage.product = JSON.stringify(products);
  showProducts();
}

function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showProducts();
  mood = "create";
  createBtn.innerHTML = `Create`;
  count.style.display = "block";
  clearInputValue();
}

// Update Product
function updateProduct(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  totalPrice();
  category.value = products[index].category;

  createBtn.innerHTML = `Update`;
  count.style.display = "none";

  mood = "update";
  temp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  search.value = "";
}

// Search Product
let searchMood = "title";
function searchByMood(id) {
  let search = document.getElementById("search");
  if (id == "by-title") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  search.value = "";
  showProducts();
}

function searchProduct(value) {
  let content = "";
  for (let i = 0; i < products.length; i++) {
    if (searchMood == "title") {
      if (products[i].title.includes(value.toLowerCase())) {
        content += `
          <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" class="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="delete">delete</button></td>
          </tr>
        `;
      }
    } else {
      if (products[i].category.includes(value.toLowerCase())) {
        content += `
          <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" class="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="delete">delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.querySelector(".tbody").innerHTML = content;
}
// Clean Data Product
