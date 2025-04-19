// Define words for each page
const pageWords = {
    about: {
        words: ['RamHacks', 'Library', 'Dorm', 'Alvarez','URI','Class'],
        color: '#eb7b7b' // Coral red for about page
    },
    experience: {
        words: ['Brown University', 'URI', 'PPSD', 'MESA', 'Hack@URI'],
        color: '#81a6f0' // Blue to match gradient
    },
    university: {
        words: ['R.E.S.P.E.C.T', 'providence', 'Hacks@URI', 'URI'],
        color: '#f0cb81' // Sky blue for university page
    }
};

// Determine current page
const currentPath = window.location.pathname;
let currentPage = 'about'; // default to about page

if (currentPath.includes('experience')) {
    currentPage = 'experience';
} else if (currentPath.includes('university')) {
    currentPage = 'university';
}

// Get the dynamic word element and set its color
const dynamicWord = document.getElementById('dynamic-word');
if (dynamicWord) {
    dynamicWord.style.color = pageWords[currentPage].color;
    dynamicWord.style.display = 'inline-block';
    dynamicWord.style.width = '600px';
    dynamicWord.style.textAlign = 'left';
    dynamicWord.style.whiteSpace = 'nowrap';
}

// Typing animation function
function typeWriter(words, element) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = words[wordIndex];
    let typingSpeed = 120;
    let deletingSpeed = 60;
    let pauseTime = 2000;
    let cursorVisible = true;
    
    // Add blinking cursor
    function blinkCursor() {
        cursorVisible = !cursorVisible;
        const cursor = cursorVisible ? '_' : ' ';
        element.textContent = currentWord.substring(0, charIndex) + cursor;
        setTimeout(blinkCursor, 500);
    }
    
    function type() {
        if (isDeleting) {
            // Deleting
            element.textContent = currentWord.substring(0, charIndex - 1) + '_';
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                currentWord = words[wordIndex];
                setTimeout(type, 500); // Pause before typing next word
                return;
            }

            setTimeout(type, deletingSpeed);
        } else {
            // Typing
            element.textContent = currentWord.substring(0, charIndex + 1) + '_';
            charIndex++;

            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, pauseTime); // Wait before starting to delete
                return;
            }

            setTimeout(type, typingSpeed);
        }
    }
    
    // Start both animations
    blinkCursor();
    type();
}

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const dynamicWord = document.getElementById('dynamic-word');
    if (dynamicWord) {
        typeWriter(pageWords[currentPage].words, dynamicWord);
    }
}); 