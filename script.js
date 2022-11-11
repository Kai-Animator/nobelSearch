'use strict'
//
// Color Styles
const primaryCol = 'gray-800'
const secondaryCol = 'gray-700'
const thirdCol = 'amber-300'
const fourthCol = 'gray-100'

// Body Container

const section = document.createElement('section')
section.className = `h-screen bg-${secondaryCol} flex`
document.body.appendChild(section)

// Aside Bar
//sideBar Container
const navBar = document.createElement('aside')
navBar.setAttribute('aria-label', 'Sidebar')
navBar.className = 'w-96 static'
section.appendChild(navBar)
//another Container for Flex
const divBar = document.createElement('div')
divBar.className = `py-4 px-3 bg-${primaryCol} rounded h-screen flex flex-col justify-center items-stretch overflow-hidden`
navBar.appendChild(divBar)
//Unorded List Container
const ulContainer = document.createElement('div')
ulContainer.className = `flex flex-col text-${thirdCol} text-xl text-center mb-32`
divBar.appendChild(ulContainer)

// Unorded List Container Items
//Category Title
const navUlH2 = document.createElement('h2')
navUlH2.innerHTML = 'Categories'
navUlH2.className = 'my-2 text-3xl mb-5 select-none'
ulContainer.appendChild(navUlH2)
//Unorded List
const ul = document.createElement('ul')
ul.className = 'space-y-2'
ulContainer.appendChild(ul)

//UnordedList List Items
//Find All Categories within the Data
function findCategories() {
  const categories = []
  for (const prize of nobels.prizes) {
    if (!categories.includes(prize.category)) {
      categories.push(prize.category)
    }
  }
  return categories
}

//Array of categories
const nobelCategories = findCategories()

//Initialize Array to record IDS of buttons for later use
const buttonIds = []

//Generate one button per Category Available
function generateCategoriesBtn() {
  //For each category available
  for (const category of nobelCategories) {
    //Create a list item
    const li = document.createElement('li')
    li.className = 'justify-self-stretch'
    ul.appendChild(li)

    //Create an A TAG to become a button
    const a = document.createElement('div')
    a.className = `flex justify-start items-center p-2 text-base bg-${thirdCol} font-normal text-gray-900 hover:scale-95 rounded-lg cursor-pointer onState`
    a.id = `${category}-button`
    buttonIds.push(a.id)
    li.appendChild(a)

    // Create Icon for the A Tag
    const i = document.createElement('i')
    if (category === 'medicine') {
      i.className = `fa-solid fa-stethoscope text-${primaryCol} pl-6`
    } else if (category === 'physics') {
      i.className = `fa-solid fa-atom text-${primaryCol} pl-6`
    } else if (category === 'chemistry') {
      i.className = `fa-solid fa-flask-vial text-${primaryCol} pl-6`
    } else if (category === 'peace') {
      i.className = `fa-solid fa-dove text-${primaryCol} pl-6`
    } else if (category === 'literature') {
      i.className = `fa-solid fa-book text-${primaryCol} pl-6`
    } else {
      i.className = `fa-solid fa-piggy-bank text-${primaryCol} pl-6`
    }
    a.appendChild(i)

    //Create text for the A Tag
    const span = document.createElement('span')
    span.className = `ml-3 text-xl text-bold text-${primaryCol} font-bold select-none`
    //UpperCase the first Letter of the Category
    const text = `${category[0].toUpperCase()}${category.substring(1)}`
    span.innerText = text
    a.appendChild(span)
  }
}

generateCategoriesBtn()

// noUiSlider Nav Item

const sliderNav = document.createElement('div')
const sliderContainer = document.createElement('div')
const sliderNavValues = document.createElement('div')
const navSliderH2 = document.createElement('h2')
navSliderH2.innerHTML = 'Year Filter'
navSliderH2.className = 'select-none'
sliderContainer.appendChild(navSliderH2)

sliderNav.id = 'slider'
sliderNav.className = 'my-2 w-full '
sliderNavValues.id = 'slider-values'
sliderNavValues.className = 'text-center text-gray-100 my-2 select-none'
sliderContainer.id = 'filter-card'
sliderContainer.className = `flex flex-col w-full items-center text-${thirdCol} text-xl text-center`
sliderContainer.appendChild(sliderNav)
sliderContainer.appendChild(sliderNavValues)
divBar.appendChild(sliderContainer)

// navBar Slider
var slider = document.getElementById('slider')
var sliderValues = document.getElementById('slider-values')

noUiSlider.create(slider, {
  start: [1925, 1990],
  connect: true,
  range: {
    min: 1901,
    max: 2018,
  },
})

let inputValues = []

slider.noUiSlider.on('update', function (values) {
  const newValues = []
  for (const value of values) {
    newValues.push(Math.round(value))
  }
  sliderValues.innerHTML = newValues.join(' - ')
  inputValues = newValues
})

// NavBar Search button
const searchButton = document.createElement('button')
searchButton.className = `p-2 text-base bg-${thirdCol} font-normal text-gray-900 rounded-lg hover:bg-${fourthCol} cursor-pointer justify-self-start h-24 mt-8 select-none`
searchButton.id = 'searchBtn'
divBar.appendChild(searchButton)

const searchIcon = document.createElement('i')
searchIcon.className = 'fa-brands fa-searchengin fa-3x'
searchButton.appendChild(searchIcon)

const searchH3 = document.createElement('h3')
searchH3.textContent = 'Search Nobels'
searchH3.className = 'font-bold text-2xl'
searchButton.appendChild(searchH3)

// MAIN AREA
//Everything Other Than SideBar
const main = document.createElement('section')
main.className = 'w-full overflow-y-auto flex flex-col px-8 mx-2 my-8 h-vh'
main.id = 'main-area'
section.appendChild(main)

//Nobel Prizes Main Title
const mainTitle = document.createElement('h1')
mainTitle.textContent = 'Nobel Prize Laureates'
mainTitle.className = `text-7xl text-${thirdCol} text-center mb-8 drop-shadow-lg select-none`

//Card Section Container
const cardsSection = document.createElement('section')
cardsSection.id = 'card-section'
cardsSection.className = 'rounded-md px-4 flex flex-col'
main.appendChild(mainTitle)
main.appendChild(cardsSection)

//Load Event Listeners

loadEventListeners()

function loadEventListeners() {
  for (const button of buttonIds) {
    const buttonEvent = document.querySelector(`#${button}`)
    buttonEvent.addEventListener('click', toggleState)
  }
  const searchBtnEvent = document.querySelector('#searchBtn')
  searchBtnEvent.addEventListener('click', generateCards)
}

//Events

function toggleState(e) {
  // Turn Button ON and OFF
  // Check if there is ON in the classes of the current Clicked Button
  for (const classItem of e.currentTarget.classList) {
    if (classItem === 'onState') {
      //IF THERE IS AND CLICKED SET OFF AND CHANGE COLOR
      e.currentTarget.classList.add(`bg-${thirdCol}/60`, 'offState')
      e.currentTarget.classList.remove(`bg-${thirdCol}`, 'onState')
    } else if (classItem === 'offState') {
      //IF IT IS OFF, SET IT ON AND CHANGE COLOR BRIGHTER
      e.currentTarget.classList.add(`bg-${thirdCol}`, 'onState')
      e.currentTarget.classList.remove(`bg-${thirdCol}/60`, 'offState')
    }
  }
}
function getYearsArray() {
  //GET THE YEARS FROM SLIDER RANGE VALUES
  let yearArray = []
  for (const laureate of nobels.prizes) {
    if (laureate.year >= inputValues[0] && laureate.year <= inputValues[1]) {
      //ONLY ADD NEW YEARS TO FINAL ARRAY
      if (!yearArray.includes(laureate.year)) {
        yearArray.push(laureate.year)
      }
    }
  }
  return yearArray
}

function clearAll() {
  //TO CLEAR ALL YEAR CARDS, CHECKED IF PARENT SECTION HAS CHILD, IF YES, DELETE ONE BY ONE UNTIL NONE
  while (cardsSection.firstChild) {
    cardsSection.removeChild(cardsSection.firstChild)
  }
}

function generateCards(e) {
  //CLEAR PREVIOUS RESULT BEFORE ADD NEW
  clearAll()

  //ADD ID # TO SEARCH USING querySelectorAll
  const nobelCategoriesId = buttonIds.map((element) => `#${element}`)

  //FOR EACH YEAR OFF SLIDER RANGE
  for (const year of getYearsArray()) {
    //CREATE CARD FOR YEAR
    const yearCardStyle = `flex flex-col h-fit bg-${primaryCol} rounded-lg shadow-lg mb-4 delete-item`
    const yearCard = document.createElement('div')
    yearCard.className = yearCardStyle
    cardsSection.appendChild(yearCard)

    // ADD TITLE TO CARD
    const yearTitle = document.createElement('h1')
    yearTitle.textContent = year
    yearTitle.className = `py-2 m-4 text-5xl text-${thirdCol} select-none`
    yearCard.appendChild(yearTitle)

    //ADD LINE TO CARD
    const yearBar = document.createElement('hr')
    yearBar.className = `my-2 h-px bg-${thirdCol} border-0 w-full`
    yearCard.appendChild(yearBar)

    //FOR EACH CATEGORY OF THAT YEAR
    for (const category of nobelCategoriesId) {
      //GET THE LI ELEMENT OF EACH CATEGORY
      const getCategoryToggle = document.querySelector(category)
      //CHECK IF THE BUTTON IS ON
      if (getCategoryToggle.classList.contains('onState')) {
        //IF YES GENERATE CARD FOR THAT CATEGORY
        const categoryCard = document.createElement('div')
        categoryCard.className = `bg-gray-600 m-4 rounded-md shadow flex flex-col h-fit pb-4 counter`
        yearCard.appendChild(categoryCard)

        //ADD TITLE CONTAINER
        const titleArea = document.createElement('div')
        titleArea.className =
          'flex py-5 h-1/4 justify-start items-center select-none '
        categoryCard.appendChild(titleArea)

        //ADD ICON TO CONTAINER -COPYING FROM BUTTON-
        const getCategoryIcon = getCategoryToggle.firstChild.cloneNode()
        getCategoryIcon.classList.add(`text-${thirdCol}`, 'fa-lg')
        getCategoryIcon.classList.remove('text-gray-800')
        titleArea.appendChild(getCategoryIcon)

        //ADD TEXT TO CONTAINER -COPYING FROM BUTTON-
        const getCategoryTitleName = getCategoryToggle.childNodes[1].innerHTML
        const getCategoryTitle = document.createElement('h2')
        getCategoryTitle.textContent = getCategoryTitleName
        getCategoryTitle.className = `text-${thirdCol} text-xl px-4`
        titleArea.appendChild(getCategoryTitle)

        //ADD LINE BREAK
        const categoryBar = document.createElement('hr')
        categoryBar.className = `h-px bg-${fourthCol} border-0 w-full`
        categoryCard.appendChild(categoryBar)

        //ADD EXTRA TEXT
        const laureatesText = document.createElement('h2')
        laureatesText.textContent = 'Laureates:'
        laureatesText.className = `text-${fourthCol} text-lg px-4 my-2 select-none`
        categoryCard.appendChild(laureatesText)

        //GENERATING EACH LAUREATE
        for (const prize of nobels.prizes) {
          //CHECK OVER ALL DOCUMENT IF THE YEAR AND THE CATEGORY MATCHES WITH FILTERED
          if (
            year === prize.year &&
            getCategoryTitleName.toLowerCase() === prize.category
          ) {
            //WHEN MATCHED CREATE A CARD FOR EACH PERSON
            let isEven = true
            for (const laureate of prize.laureates) {
              const laureateCard = document.createElement('div')
              laureateCard.className =
                'rounded mx-4 shadow my-1 flex flex-col items-start justify-start h-fit p-2'
                //JUST CHANGE COLOR OF CARD AFTER EACH OTHER
              if (isEven) {
                laureateCard.classList.add('bg-gray-900')
                laureateCard.classList.remove('bg-gray-700')
                isEven = false
              } else {
                laureateCard.classList.add('bg-gray-700')
                laureateCard.classList.remove('bg-gray-900')
                isEven = true
              }
              categoryCard.appendChild(laureateCard)

              //ADD PERSON NAME TO THE CARD
              const laureateFullName = `${laureate.firstname} ${laureate.surname}`
              const laureateName = document.createElement('h2')
              laureateName.textContent = laureateFullName
              laureateName.classList = `text-${thirdCol} mx-4 text-xl`
              laureateCard.appendChild(laureateName)

              //ADD MOTIVATION TO THE CARD
              const laureateMotivation = document.createElement('p')
              laureateMotivation.textContent = laureate.motivation
              laureateMotivation.className = 'text-white m-2'
              laureateCard.appendChild(laureateMotivation)
            }
          }
        }
      }
    }
  }
  // CHECK FOR EMPTY CARDS
  checkEmpty()
}

function checkEmpty() {
  //GET LIST OF ALL CARDS BEING DISPLAYED BASED ON THE CARD CLASS COUNTER
  const getAllCatCards = document.querySelectorAll('.counter')
  //FOR EACH CARD CHECK HOW MANY CHILDREN THERE ARE IF <= 3 ADD NEW TEXT
  for (const card of getAllCatCards) {
    if (card.children.length < 4) {
      //ADD SORRY TEXT
      const sorryText = document.createElement('p')
      sorryText.textContent =
        "There weren't any laureate in this category this year."
      sorryText.className = 'text-white m-2 text-center text-xl'
      card.appendChild(sorryText)
    }
  }
}

generateCards()
