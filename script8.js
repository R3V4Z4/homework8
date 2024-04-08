"use strict";


let divElement = document.getElementById("api-container");
let btnLoadMore = document.getElementById("loadMore");
let btnLoadPrev = document.getElementById("loadprev");
let ulElementUsers = document.getElementById("users-ul");
let currentPage = 1;
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (item) {
      console.log(item);
      if (!item.ok) {
        throw "Server Error";
      }
      return item.json();
    })
    .then(function (response) {
      console.log(response); //mlsuli info rogroc JS
      const fragment = document.createDocumentFragment();

      response.data.forEach((element) => {
        let li = document.createElement("li");
        li.classList.add("li-item");

        let pDesc = document.createElement("p");
        pDesc.innerText = `${element.first_name} ${element.last_name}`;

        let imguser = document.createElement("img");
        // imguser.setAttribute("src", element.avatar);
        imguser.src = element.avatar;
        imguser.classList.add("image-user");

        li.appendChild(imguser);
        li.appendChild(pDesc);
        fragment.appendChild(li);
      });

      ulElementUsers.innerHTML = "";
      ulElementUsers.appendChild(fragment);
      totalPages = response.total_pages;
      if (currentPage === 1) {
        btnLoadPrev.classList.add("isDisable");
      } else {
        btnLoadPrev.classList.remove("isDisable");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function btnFnc() {
  if (currentPage === 1) {
    btnLoadPrev.classList.add("isDisable");
    // btnLoadPrev.style.display = 'none';
  } else {
    btnLoadPrev.classList.remove("isDisable");
  }

  if (currentPage === totalPages) {
    btnLoadMore.classList.add("isDisable");
  } else {
    btnLoadMore.classList.remove("isDisable");
  }
}

btnLoadPrev.addEventListener("click", function () {
  // currentPage = currentPage - 1;
  // currentPage -= 1;
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  getUsers(currentPage);
  btnFnc();
});

btnLoadMore.addEventListener("click", function () {
  // currentPage = currentPage + 1
  // currentPage += 1;
  if (currentPage === totalPages) {
    return;
  }
  currentPage++;
  getUsers(currentPage);
  btnFnc();
});

getUsers(currentPage);

