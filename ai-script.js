// My AI Assistant - JavaScript Logic
const aiResponses = {
    'hello': ['Hello there! 👋', 'Hi! How can I help?', 'Greetings!'],
    'time': [\Current time is: \\],
    'date': [\Today is: \\],
    'joke': [
        'Why do programmers prefer dark mode? Because light attracts bugs!',
        'What do you call a programmer from Finland? Nerdic.',
        'Why did the programmer quit his job? Because he didn\'t get arrays!'
    ],
    'help': ['I can respond to: hello, time, date, joke, help']
};

function getAIResponse(input) {
    input = input.toLowerCase().trim();
    
    for (const [keyword, responses] of Object.entries(aiResponses)) {
        if (input.includes(keyword)) {
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
        }
    }
    
    return "I'm still learning! Try: hello, time, date, joke, help";
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const chatOutput = document.getElementById('chat-output');
    
    if (input.value.trim() === '') return;
    
    // Add user message
    chatOutput.innerHTML += \
        <div class="chat-message user-message">
            <strong>You:</strong> \
        </div>
    \;
    
    // Get AI response
    const aiResponse = getAIResponse(input.value);
    
    // Add AI response with delay
    setTimeout(() => {
        chatOutput.innerHTML += \
            <div class="chat-message ai-message">
                <strong>AI:</strong> \
            </div>
        \;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }, 500);
    
    // Clear input
    input.value = '';
    input.focus();
}

// Allow Enter key to send message
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize with welcome message
document.addEventListener('DOMContentLoaded', function() {
    const chatOutput = document.getElementById('chat-output');
    chatOutput.innerHTML = \
        <div class="chat-message ai-message">
            <strong>AI:</strong> Hello! I'm your AI assistant. Ask me anything!
        </div>
    \;
});
