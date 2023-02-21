const form = document.querySelector('form');
const resultContainer = document.querySelector('#result');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const dateInput = document.querySelector('#date');
  const date = dateInput.value.trim();

  // Make API request
  fetch(`/api/${date}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update result container
      resultContainer.innerHTML = `<code>${JSON.stringify(data)}</code>`;
    })
    .catch(error => {
      console.error('Error:', error);
      resultContainer.innerHTML = `<code>There was an error with your request. Please try again.</code>`;
    });
});
