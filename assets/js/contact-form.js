document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.php-email-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitButton = form.querySelector('button[type="submit"]');
      const loadingMessage = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');
      
      // Reset messages
      loadingMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';
      submitButton.disabled = true;

      // Get form data
      const formData = new FormData(form);

      // Submit to Formspree
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        if (data.ok) {
          loadingMessage.style.display = 'none';
          sentMessage.style.display = 'block';
          form.reset();
        } else {
          throw new Error('Form submission failed.');
        }
      })
      .catch(error => {
        loadingMessage.style.display = 'none';
        errorMessage.textContent = 'Form submission failed. Please try again later.';
        errorMessage.style.display = 'block';
      })
      .finally(() => {
        submitButton.disabled = false;
      });
    });
  }
}); 