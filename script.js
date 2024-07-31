
function addDataTag() {
    const formFields = document.getElementById('formFields');


    const keyGroup = document.createElement('div');
    keyGroup.className = 'form-group';


    const keyLabel = document.createElement('label');
    keyLabel.textContent = 'Key';
    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.name = 'key';
    keyInput.required = true;
    keyGroup.appendChild(keyLabel);
    keyGroup.appendChild(keyInput);


    const valueGroup = document.createElement('div');
    valueGroup.className = 'form-group';


    const valueLabel = document.createElement('label');
    valueLabel.textContent = 'Value';
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.name = 'value';
    valueGroup.appendChild(valueLabel);
    valueGroup.appendChild(valueInput);


    formFields.appendChild(keyGroup);
    formFields.appendChild(valueGroup);
}


document.getElementById('addTagButton').addEventListener('click', addDataTag);


document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    

    const keys = document.getElementsByName('key');
    const values = document.getElementsByName('value');
    const dataTags = {};

    for (let i = 0; i < keys.length; i++) {
        if (keys[i].value) {
            dataTags[keys[i].value] = values[i].value || '';
        }
    }

    const requestData = {
        properties: {
            tags: dataTags
        }
    };

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

        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.textContent = 'Data Tags Submitted';
        confirmationMessage.style.display = 'block';
        confirmationMessage.style.color = '#28a745'; 
        
        document.getElementById('updateForm').reset();

        const formFields = document.getElementById('formFields');
        while (formFields.children.length > 2) { 
            formFields.removeChild(formFields.lastChild);
        }
    })
    .catch((error) => {
        console.error('Error:', error);

        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.textContent = 'Error submitting data tags';
        confirmationMessage.style.color = '#dc3545'; // Red color for error
        confirmationMessage.style.display = 'block';
    });
});
