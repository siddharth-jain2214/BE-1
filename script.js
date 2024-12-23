const form = document.getElementById('registrationForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            body: data.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP status code: ${response.status}`);
        }

        const result = await response.json();
        console.log('Server response:', result);

        // Display the success message and reset the form
        alert(result.message);
        form.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again.');
    }
});
