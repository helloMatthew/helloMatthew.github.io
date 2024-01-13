document.addEventListener('DOMContentLoaded', function () {
  let allCards = [];

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const cardsContainer = document.getElementById('cards');

      data.forEach((item, index) => {
        const card = createCard(item, index);
        allCards.push(card);
        cardsContainer.appendChild(card);
      });

      addFilterEventListeners(allCards);
      addSearchEventListener(allCards);
    })
    .catch(error => console.error('Error fetching data:', error));

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetCards);

    checkAndRenderResetButton();
});



function createCard(item, index) {
  const card = document.createElement('div');
  card.classList.add('card', 'group', 'bg-gradient-to-t', 'from-[#fff4f1]', 'to-[#FFF9F2]', 'rounded-lg', 'p-6', 'pb-2', 'mx-auto', 'transform', 'transition-transform', 'duration-500', 'border-solid', 'border-[1px]', 'border-t-[#FFF9F2]', 'border-b-[#fee4f1]', 'border-l-[#FFF9F2]', 'border-r-[#fee4f1]', 'md:shadow-lg', 'md:shadow-slate-100/50', 'hover:shadow-none');

  // REPO LINK
  const repoAnchorElement = document.createElement('a');
  repoAnchorElement.href = item.repo;
  repoAnchorElement.target = "_blank";
  repoAnchorElement.rel = "noopener noreferrer";

  const repoElement = document.createElement('p');
  repoElement.classList.add('repo', 'flex', 'justify-end', 'mb-2', '-mt-3', 'w-full');

  // REPO ICON
  const repoIconElement = document.createElement('img');
  repoIconElement.src = "github.svg";
  repoIconElement.alt = `GITHUB`;
  repoIconElement.classList.add('repo-icon', 'opacity-50', 'w-4', 'h-4', 'cursor-pointer', 'block', 'group-hover:opacity-100');
  
  const noRepoIconElement = document.createElement('p');
  noRepoIconElement.classList.add('no-repo', 'flex', 'justify-end', 'mb-2', '-mt-3', 'w-4', 'h-5', 'w-full');
  
  item.repo === "..." ? repoElement.appendChild(noRepoIconElement) : repoElement.appendChild(repoIconElement);

  // LIVE PROJECT SITE LINK
  const anchorElement = document.createElement('a');
  item.url === "..." ? null : anchorElement.href = item.url;
  anchorElement.textContent = `${item.linkText}`;
  anchorElement.target = "_blank";
  anchorElement.rel = "noopener noreferrer";
  anchorElement.classList.add('link', 'text-lg', 'text-right', 'pr-2','block', 'w-[100%]', 'leading-6', 'font-bold', 'text-[#C689BF]', 'hover:text-[#403FFC]', 'hover:duration-100', 'cursor-pointer', 'mx-auto'); 

  // TECH STACK LABELS
  const techStackElement = document.createElement('p');
  techStackElement.classList.add('techstack', 'group', 'text-sm', 'text-right', 'mb-1', 'text-gray-700');

  const techStacks = item.techstack.split(',').map(techStack => techStack.trim());

  techStacks.forEach(techStackText => {
    const techStackAnchorElement = document.createElement('a');
    techStackAnchorElement.setAttribute('data-type', 'techstack');
    techStackAnchorElement.classList.add('filter', 'techstack-item', 'group', 'mr-2', 'hover:text-gray-300');
    techStackAnchorElement.href = '#' + techStackText.toLowerCase(); 
    
    techStackAnchorElement.textContent = `| ${techStackText}`;

    techStackElement.appendChild(techStackAnchorElement);
  });

  // IMAGE
  const thumbnailElement = document.createElement('img');
  thumbnailElement.src = `https://eq-folio-thumbs.olk1.com/${item.thumbnail}`;
  thumbnailElement.alt = `ALT: ${item.linkText}`;
  thumbnailElement.classList.add('thumbnail', 'rounded-sm', 'w-full', 'mx-auto', 'saturate-150', 'mt-2', 'cursor-pointer', 'transform', 'transition-transform', 'duration-500', 'hover:scale-90', 'hover:duration-300', 'hover:delay-0', 'ease-out'); 

  // Add site link to image
  anchorElement.appendChild(thumbnailElement);

  // Add repo link to github svg
  repoAnchorElement.appendChild(repoElement);
  
  // Stacked according to card layout
  card.appendChild(repoAnchorElement);
  
  card.appendChild(techStackElement);

  card.appendChild(anchorElement);
  
  // CATEGORY LINK LABELS
  const categories = item.category.split(',').map(category => category.trim());

  categories.forEach(categoryText => {
    const categoryAnchorElement = document.createElement('a');
    categoryAnchorElement.setAttribute('data-type', 'category');
    categoryAnchorElement.href = '#' + categoryText.toLowerCase(); 
    
    categoryAnchorElement.textContent = categoryText;
    categoryAnchorElement.classList.add('filter', 'category-item', 'text-sm', 'inline-block', 'mr-2', 'mt-4', 'mb-2', 'font-normal', 'text-[#403FFC99]', 'hover:text-[#C689BF]');

    card.appendChild(categoryAnchorElement);
  });

  const cards = document.getElementById('cards');
  cards.appendChild(card);

  // Trigger reflow to apply the initial state and start the transition
  void card.offsetWidth;

  // Onload animation (increase card scale)
  card.classList.add('fade-in', 'scale-105', 'transform', 'transition-transform', 'duration-500', `delay-${index * 100}`);

  setTimeout(() => {
    // Reset card scale after 3 seconds
    card.classList.add('card', 'transform', 'transition-transform', 'duration-500', `delay-${index * 300}`, 'scale-100', 'hover:scale-100', 'hover:duration-10', 'hover:delay-0');
  }, 3000);

  return card;
}


const navElement = document.querySelector('nav');
const welcomeElement = document.querySelector('#welcome');

// FILTER LOGIC
function addFilterEventListeners(allCards) {
  const filterAnchors = document.querySelectorAll('.filter');

  filterAnchors.forEach(filterAnchor => {
    filterAnchor.addEventListener('click', () => {
      navElement.style.display = 'block';
      welcomeElement.style.display = 'block';

      const selectedValue = filterAnchor.textContent.toLowerCase();
      const selectedType = filterAnchor.dataset.type; 
      // ^^^ Assuming data-type attribute is set on category and techstack anchor elements
      filterCards(selectedType, selectedValue, allCards);

      // Toggle 'active' class on clicked filter link
      filterAnchors.forEach(anchor => anchor.classList.remove('active'));
      filterAnchor.classList.add('active');

      // Update reset button visibility based on active filter links
      checkAndRenderResetButton();
    });
  });
}



function filterCards(selectedType, selectedValue, allCards) {
  allCards.forEach(card => {
    const values = Array.from(card.querySelectorAll(`[data-type="${selectedType}"]`)).map(item => item.textContent.toLowerCase());

    if (selectedValue === 'all' || values.includes(selectedValue)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}



// Check if any filter link is active and render/hide reset button accordingly
function checkAndRenderResetButton() {
  const activeFilterLinks = document.querySelectorAll('.filter.active');

  if (activeFilterLinks.length > 0) {
    renderResetButton();
  } else {
    hideResetButton();
  }
}




// Reset all cards
function resetCards() {
  const allCards = document.querySelectorAll('.card');

  allCards.forEach(card => {
    card.style.display = 'block';
  });
  
  // Re-render nav/welcome
  navElement.style.display = 'block';
  welcomeElement.style.display = 'block';
  // Hide reset button after resetting
  hideResetButton();
}



const resetButtonContainer = document.getElementById('reset-container');
const resetButton = document.getElementById('reset');

function renderResetButton() {
  resetButton.style.display = 'block';
  if(window.innerWidth < 1023){
    resetButton.classList.add('mt-4');
    resetButtonContainer.classList.add('flex-col');
  }
}



function hideResetButton() {
  resetButton.style.display = 'none';
  resetButtonContainer.classList.remove('flex-col');
}



//  SEARCH LOGIC
function addSearchEventListener(allCards) {
  const searchInput = document.getElementById('search-input');
  const noResultsFound = document.getElementById('no-search-results');

  let timeoutId;

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // hide nav/welcome when the search contains min 3 keystrokes
    navElement.style.display = searchTerm.length >= 3 ? 'none' : 'block';
    welcomeElement.style.display = searchTerm.length >= 3 ? 'none' : 'block';

    const hasResults = searchCards('search', searchTerm, allCards);

    hasResults && renderResetButton();

    // Toggle the visibility of the "No Results Found" message
    noResultsFound.style.display = hasResults ? 'none' : 'block';

    clearTimeout(timeoutId);

    // 10-second timeout on no search results then show all cards
    timeoutId = setTimeout(() => {

      if(!hasResults){
        allCards.forEach(card => {
          card.style.display = 'block';
        });
      
      // Clear the input value if no result and still focused beyond 10s
      searchInput.value = '';
      }
      // Remove no results message
      noResultsFound.style.display = 'none';
    }, 10000);
    
    // No search results automatically show nav/message
    if(!hasResults){
      navElement.style.display = 'block';
      welcomeElement.style.display = 'block';
    }
  });

  searchInput.addEventListener('blur', () => {
    // Clear the input value when not focused
    searchInput.value = '';

  });
}



function searchCards(selectedType, selectedValue, allCards) {
  let hasResults = false; 

  allCards.forEach(card => {
    let values;

    if (selectedType === 'search') {
      // Match all cards text content against search term
      values = [card.textContent.toLowerCase()];
    } else {
      // For other types, use the existing logic
      values = Array.from(card.querySelectorAll(`[data-type="${selectedType}"]`)).map(item => item.textContent.toLowerCase());
    }

    if (selectedValue === 'all' || values.some(value => value.includes(selectedValue))) {
      card.style.display = 'block';
      hasResults = true;
    } else {
      card.style.display = 'none';
    }
  });

  hideResetButton();
  return hasResults;
}
