// Function to add new key-value input fields
function addDataTag() {
    const formFields = document.getElementById('formFields');

    // Create a new form group for the key
    const keyGroup = document.createElement('div');
    keyGroup.className = 'form-group';

    // Create the key label and input field
    const keyLabel = document.createElement('label');
    keyLabel.textContent = 'Key';
    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.name = 'key';
    keyInput.required = true;
    keyGroup.appendChild(keyLabel);
    keyGroup.appendChild(keyInput);

    // Create a new form group for the value
    const valueGroup = document.createElement('div');
    valueGroup.className = 'form-group';

    // Create the value label and input field
    const valueLabel = document.createElement('label');
    valueLabel.textContent = 'Value';
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.name = 'value';
    valueGroup.appendChild(valueLabel);
    valueGroup.appendChild(valueInput);

    // Append the new key and value groups to the form fields container
    formFields.appendChild(keyGroup);
    formFields.appendChild(valueGroup);
}

// Event listener for the "Add Data Tag" button
document.getElementById('addTagButton').addEventListener('click', addDataTag);

// Event listener for the form submission
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Collect all form data
    const keys = document.getElementsByName('key');
    const values = document.getElementsByName('value');
    const dataTags = {};

    for (let i = 0; i < keys.length; i++) {
        // Add the key to dataTags and set the value to an empty string if the value field is empty
        if (keys[i].value) {
            dataTags[keys[i].value] = values[i].value || '';
        }
    }

    // Prepare the API request data
    const requestData = {
        properties: {
            tags: dataTags
        }
    };

    // Perform the API request using Fetch
    fetch('https://api.onesignal.com/apps/5e605fcd-de88-4b0a-a5eb-5c18b84d52f3/users/by/external_id/MomentaDataTagId', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y2ZiNzkyMTktNDI0OC00ODc2LWIwNTEtM2VlMzQ1MjFiN2Fi',
            'Cookie': '__cf_bm=rI3c9XzVlBdViK2CVaRDiD4YhpvHpK26zVLWNfYkeAw-1722418712-1.0.1.1-lnRORoL4udD1LJRBXPVh0T63Cp4yQwC5tpnqSSZ_N_UfLIB3T8SA5YPeE5G8R6NsRVVP0aOnY5dz2ewCeY50OQ'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);

        // Display a confirmation message
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.textContent = 'Data Tags Submitted';
        confirmationMessage.style.display = 'block';
        confirmationMessage.style.color = '#28a745'; // Green color for success

        // Clear form fields
        document.getElementById('updateForm').reset();

        // Optional: Clear the dynamically added fields (if you want to remove them after submission)
        const formFields = document.getElementById('formFields');
        while (formFields.children.length > 2) { // Keep the initial key-value fields
            formFields.removeChild(formFields.lastChild);
        }
    })
    .catch((error) => {
        console.error('Error:', error);

        // Display an error message
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.textContent = 'Error submitting data tags';
        confirmationMessage.style.color = '#dc3545'; // Red color for error
        confirmationMessage.style.display = 'block';
    });
});
