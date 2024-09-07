
window.addEventListener("message", function(event) {
    if (event.data && event.data.payload && event.data.payload.text) {
        const userMessage = event.data.payload.text;

        // Only log user messages
        if (event.data.type === 'user_message') {
            logChatToGoogleSheets(userMessage, 'bot response pending...');
        }

        // When bot responds
        if (event.data.type === 'bot_response') {
            const botMessage = event.data.payload.text;
            logChatToGoogleSheets('User message already logged', botMessage);
        }
    }
});

// Function to log chat data to Google Sheets
function logChatToGoogleSheets(userMessage, botMessage) {
    fetch('YOUR_APPS_SCRIPT_WEB_APP_URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userMessage: userMessage,
            botMessage: botMessage
        })
    })
    .then(response => response.json())
    .then(data => console.log('Data logged to Google Sheets:', data))
    .catch(error => console.error('Error logging to Google Sheets:', error));
}
