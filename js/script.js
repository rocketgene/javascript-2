const pagesUl = document.querySelector('ul.link-list');

 /**
 * Generate the portion of the page that contain's student's data.
 *
 * @param {array} list - An array of objects containing student data
 * @param {array} page - The number of pages to be displayed
 *
 */

function showPage (list, page) {
    let startIndex = page * 9 - 9;
    let endIndex = page * 9 - 1
    let studentListUl = document.querySelector('ul.student-list');
    let html = '';

    for (let i = startIndex; i < list.length; i++ ) {
        if (i < startIndex || i > endIndex) {
            break;
        } else {
            html += `
                <li class="student-item cf">
                    <div class="student-details">
                        <img class="avatar" src="${list[i]['picture']['large']}" alt="Profile Picture">
                        <h3>${list[i]['name']['first']} ${list[i]['name']['last']}</h3>
                        <span class="email">${list[i]['email']}</span>
                    </div>
                    <div class="joined-details">
                        <span class="date">Joined ${list[i]['registered']['date']}</span>
                    </div>
                </li>`;
        }
    }
    studentListUl.innerHTML = html;
}

/**
 * Generate the page buttons at the bottom.
 *
 * @param {array} list - An array of objects containing student data
 *
 */

function addPagination (list) {
    let pages = Math.ceil(list.length / 9);
    let html = '';

    //loop to generate page number buttons
    for (let i = 1; i <= pages; i++ ) {
        if (i === 1) {
            html += `
            <li>
                <button type="button" class="active">${i}</button>
            </li>`;
        } else {
            html += `
            <li>
                <button type="button">${i}</button>
            </li>`;
        }
    }
    
    //event handler to change pages when buttons clicked
    pagesUl.addEventListener("click", (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('button.active').className = ''; 
            e.target.className = 'active';
            let clickedPage = parseInt(e.target.textContent);
            showPage(list, clickedPage);
        }
    });

    showPage(list, 1);
    pagesUl.innerHTML += html;
}

//Add search bar

function addSearchBar () {
    document.querySelector('header').innerHTML += `
    <label for="search" class="student-search">
        <input id="search" placeholder="Search by name...">
        <button type="button" id="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>`;
}

// The searchFunc adds to this variable, which is then passed to addPagination
let searchList = [];

function searchFunc (searchInput, student) {

    //Clear previous page buttons and search list
    pagesUl.innerHTML = '';
    searchList = [];

    //Loop through 'data' array of objects to add to 'searchList' array 
    for (let i = 0; i < student.length; i++) {
      if (searchInput.value.length !== 0 && (student[i]['name']['first'].toLowerCase().includes(searchInput.value.toLowerCase()) || student[i]['name']['last'].toLowerCase().includes(searchInput.value.toLowerCase())) ) {
        searchList.push(student[i]);
      } else if (searchInput.value.length === 0) {
        searchList = data;
      } 
    }

    if (searchInput.value.length !== 0 && searchList.length === 0 ) {
        pagesUl.innerHTML = `No students found`;
    }

    console.log('searchList: ', searchList);
    addPagination(searchList);
  }

// Call functions for initial screen load
addPagination(data);
addSearchBar();


// Variables for search functions
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

// Event listeners for search bar

submit.addEventListener('click', (e) => {
    e.preventDefault();
    //if (e.target.tagName === 'SUBMIT') {}
    searchFunc(search, data);

});

search.addEventListener('keyup', () => {
    searchFunc(search, data);
});
