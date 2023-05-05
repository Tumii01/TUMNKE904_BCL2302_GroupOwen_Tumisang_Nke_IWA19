// Import data and constants
import { BOOKS_PER_PAGE, authors, genres, books } from './data.js'

// Set initial variables
const matches = books
const page = 1;


let startIndex = 0
let endIndex = 36
const extracted = books.slice(startIndex, endIndex)

// Get the menu element and create a fragment to append elements to
const menu = document.querySelector('[data-list-items]')
const fragment = document.createDocumentFragment()

// Loop through the extracted books and create an element for each
for (const { author, image, title, id, description, published } of extracted) {
  let element = document.createElement('button')
  element.classList = 'preview'
  element.dataset.id = id
  element.dataset.title = title
  element.dataset.description = description
  element.dataset.image = image
  element.dataset.subtitle = (`${authors[author]} (${(new Date(published)).getFullYear()})`)
  element.setAttribute('data-preview', id)
  element.innerHTML = /* html */ `
        <div><img
            class ="preview__image"
            src="${image}"
        /></div>
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>`
        
// Append the fragment to the menu
  fragment.appendChild(element)
}
menu.appendChild(fragment)





// Set up the "Show more" button
const showMore = document.querySelector('[data-list-button]');
showMore.innerHTML = /* html */[
  '<span>Show more</span>',
  `<span class="list__remaining">(${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>`,
].join('');
showMore.disabled = !(matches.length - page * BOOKS_PER_PAGE > 0);


// Add event listener to the "Show more" button
const showMoreButton = document.querySelector('[data-search-form]')
showMoreButton.addEventListener('click', () => {
  startIndex += 36
  endIndex += 36
  const startIndex1 = startIndex
  const endIndex1 = endIndex
  const extracted = books.slice(startIndex1, endIndex1)
  const fragment = document.createDocumentFragment()
  for (const { author, image, title, id, description, published } of extracted) {

    let element = document.createElement('button')
    element.classList = 'preview'
    element.dataset.id = id
    element.dataset.title = title
    element.dataset.description = description
    element.dataset.image = image
    element.dataset.subtitle = (`${authors[author]} (${(new Date(published)).getFullYear()})`)
    element.setAttribute('data-preview', id)
    element.innerHTML = /* html */ `
            <div><img
                class ="preview__image"
                src="${image}"
            /></div>
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
    fragment.appendChild(element)
  }
  // Append the new elements to the menu
  menu.appendChild(fragment)
  document.querySelector('[data-list-items]').appendChild(fragment);
})


// Show book information
const information = (event) => {
  const dataListActive = document.querySelector('[data-list-active]')
  const title = document.querySelector('[data-list-title]')
  const subtitle = document.querySelector('[data-list-subtitle]')
  const description = document.querySelector('[data-list-description]')
  const showImage = document.querySelector('[data-list-image]')
  const imageblur = document.querySelector('[data-list-blur]')

  // Update element values based on the dataset of the clicked element
  event.target.dataset.id ? dataListActive.style.display = 'block' : undefined;
  event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
  event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
  event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
  event.target.dataset.image ? showImage.setAttribute('src', event.target.dataset.image) : undefined;
  event.target.dataset.image ? imageblur.setAttribute('src', event.target.dataset.image) : undefined;
}

// Add a click event listener to the book list items
document.querySelector('[data-list-items]').addEventListener('click', information)
document.querySelector('[data-list-close]').addEventListener('click', () => {
  document.querySelector('[data-list-active]').style.display = 'none'
})



//Dark mode and light mode
const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
}

const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
}

// Select relevant HTML elements
const settingOverlay = document.querySelector('[data-header-settings]')
const themePopUp = document.querySelector('[data-settings-overlay]')
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveBtn = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")

const cancelModeBtn = document.querySelector('[data-settings-cancel]')

// Add a click event listener to the settings icon
settingOverlay.addEventListener('click', () => {
  themePopUp.open = true
})


// Add a click event listener to the save button of the settings overlay
saveBtn.addEventListener('click', (event) => {
  event.preventDefault()

  // Change the color scheme of the page based on the selected theme
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector('[data-settings-overlay]').open = false
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector('[data-settings-overlay]').open = false
  }
})


// Add a click event listener to the cancel button of the settings overlay
cancelModeBtn.addEventListener("click", () => {
  if (themePopUp.open = true) {
    themePopUp.close()
  }
})





//Search icon btn
const searchIcon = document.querySelector('[data-header-search]')
const searchOverlay = document.querySelector('[data-search-overlay]')

// Add a click event listener to the search icon
searchIcon.addEventListener("click", () => {
  searchOverlay.open = true;
})

//Search Filters

// Get the elements that will be used for searching books by genres and authors
const dataSearchGenres = document.querySelector('[data-search-genres]');
const dataSearchAuthors = document.querySelector('[data-search-authors]');

// Create an option element for "All Genres" and append it to the genres filter dropdown
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
dataSearchGenres.appendChild(allGenresOption);


// Loop through each genre in the genres object and create an option element for it, then append it to the genres filter dropdown
for (const [id, names] of Object.entries(genres)) {
  const element = document.createElement('option')
  element.value = id
  element.innerText = names
  dataSearchGenres.appendChild(element)
}


// Create an option element for "All Authors" and append it to the genres filter dropdow
const allAuthorsOption = document.createElement('option');
allAuthorsOption.value = 'any';
allAuthorsOption.innerText = 'All Authors';
dataSearchAuthors.appendChild(allAuthorsOption);


// Loop through each author in the authors object and create an option element for it, then append it to the authors filter dropdown
for (const [id, names] of Object.entries(authors)) {
  const element = document.createElement('option')
  element.value = id
  element.innerText = names
  dataSearchAuthors.appendChild(element)
}


// close button

// Get the cancel button element and add an event listener to it to close the search overlay when it is clicked
const cancelbtn = document.querySelector('[data-search-cancel]')
cancelbtn.addEventListener("click", () => {
  if (searchOverlay.open = true) {
    searchOverlay.close()
  }
})




// Search books
const dataSearchForm = document.querySelector('[data-search-form]')

// add event listener to search form
dataSearchForm.addEventListener('submit', (event)=>{
    event.preventDefault();

// hide book list
   document.querySelector('[data-list-items]').style.display = 'none'

// clear message area
   document.querySelector('[data-list-message]').innerHTML = ''
    
// get form data
   const formData = new FormData(event.target)
    const formTitle = formData.get('title');
    const formGenre = formData.get('genre');
    const formAuthor = formData.get('author');

// array to store filtered books   
const searchedBooks = [];

// loop through all books
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  // if genre and author are not selected, filter by title only
  if (formGenre === 'any' && formAuthor === 'any') {
   if (book.title.toLowerCase().includes(formTitle.toLowerCase())){
    searchedBooks.push(book);
   }
  }

  // if genre is not selected, filter by title and author
  if (formGenre === 'any') {
    if (book.title.toLowerCase().includes(formTitle.toLowerCase()) && book.author === formAuthor){
     searchedBooks.push(book);
    }
   }

   // if title is not entered, filter by author and genre
   if (formTitle === '') {
    if (book.author === formAuthor && book.genres.includes(formGenre)){
     searchedBooks.push(book);
    }
   }

   // if neither title nor author are selected, filter by genre only
   if (formTitle === '' && formAuthor === 'any' ) {
    if (book.genres.includes(formGenre)){
     searchedBooks.push(book);
    }
   }

   // display message if no books match filters
   if (searchedBooks.length > 0){
    document.querySelector('[data-list-message]').innerText = ''
    document.querySelector('[data-list-button]').disabled = true
    document.querySelector('[data-list-message]').style.marginTop = '-125px';
   } else{
    document.querySelector('[data-list-message]').innerText = 'No results found. Your filters might be too narrow.'
    document.querySelector('[data-list-button]').disabled = true
   }
}

// display filtered books
document.querySelector('[class="list__message"]').style.display = 'block'

// create fragment to hold filtered books
const fragment2 = document.createDocumentFragment()
    for (const {author ,image, title, id , description, published} of searchedBooks) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        preview.dataset.genre = genres

        // create preview button with book information
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`

// append preview button to fragment
        fragment2.appendChild(preview)
        }

// add filtered books to message area
    const booklist2 = document.querySelector('[class="list__message"]')
    booklist2.append(fragment2)
        document.querySelector('[data-search-form]').reset()
        document.querySelector("[data-search-overlay]").close()
    })

