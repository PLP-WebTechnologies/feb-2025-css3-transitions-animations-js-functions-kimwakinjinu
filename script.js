document.addEventListener('DOMContentLoaded', () => {
    const nameInputArea = document.getElementById('name-input-area');
    const personalizedGreeting = document.getElementById('personalized-greeting');
    const nameInput = document.getElementById('name-input');
    const saveNameBtn = document.getElementById('save-name-btn');
    const greetingText = document.getElementById('greeting-text');
    const clearNameBtn = document.getElementById('clear-name-btn');

    // Function to display the personalized greeting and trigger animation
    const displayGreeting = (name) => {
        nameInputArea.classList.add('hidden');
        personalizedGreeting.classList.remove('hidden');
        greetingText.textContent = `Hello, ${name}!`;

        // Trigger the animation by adding a class
        greetingText.classList.add('animate-greeting');

        // Remove the animation class after it finishes to allow re-triggering if needed
        greetingText.addEventListener('animationend', () => {
            greetingText.classList.remove('animate-greeting');
        }, { once: true }); // Use { once: true } to automatically remove the listener
    };

    // Function to save the name to localStorage
    const saveName = () => {
        const name = nameInput.value.trim();
        if (name) {
            localStorage.setItem('userName', name);
            displayGreeting(name);
        } else {
            alert('Please enter your name.'); // Simple feedback for empty input
        }
    };

    // Function to clear the name from localStorage and show input area
    const clearName = () => {
        localStorage.removeItem('userName');
        personalizedGreeting.classList.add('hidden');
        nameInputArea.classList.remove('hidden');
        nameInput.value = ''; // Clear the input field
        greetingText.textContent = ''; // Clear the greeting text
    };

    // Check localStorage on page load
    const checkLocalStorage = () => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            displayGreeting(storedName);
        } else {
            nameInputArea.classList.remove('hidden');
        }
    };

    // Event listeners
    saveNameBtn.addEventListener('click', saveName);
    clearNameBtn.addEventListener('click', clearName);

    // Allow saving name by pressing Enter in the input field
    nameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            saveName();
        }
    });

    // Initial check when the DOM is ready
    checkLocalStorage();
});

