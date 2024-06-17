document.getElementById('createEnvelopeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('newEnvelopeName').value;
    const value = document.getElementById('newEnvelopeValue').value;
  
    fetch('/envelopes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, value })
    }).then(response => response.json())
      .then(data => alert(`Created envelope with ID ${data.id}`))
      .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('loadEnvelopes').addEventListener('click', function() {
    fetch('/envelopes')
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('envelopesList');
        list.innerHTML = '';
        data.forEach(envelope => {
          const item = document.createElement('li');
          item.textContent = `ID: ${envelope.id}, Name: ${envelope.name}, Value: ${envelope.value}`;
          list.appendChild(item);
        });
      })
      .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('updateEnvelopeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('updateEnvelopeId').value;
    const name = document.getElementById('updateEnvelopeName').value;
    const value = document.getElementById('updateEnvelopeValue').value;
    const transaction_type = document.getElementById('transactionType').value;
  
    fetch(`/envelopes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, value, transaction_type })
    }).then(response => response.text())
      .then(data => alert(data))
      .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('deleteEnvelopeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('deleteEnvelopeId').value;
  
    fetch(`/envelopes/${id}`, {
      method: 'DELETE'
    }).then(response => response.text())
      .then(data => alert(data))
      .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('transferFundsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const from = document.getElementById('fromEnvelopeId').value;
    const to = document.getElementById('toEnvelopeId').value;
    const value = document.getElementById('transferValue').value;
  
    fetch(`/envelopes/transfer/${from}/${to}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    }).then(response => response.text())
      .then(data => alert(data))
      .catch(error => console.error('Error:', error));
  });
  