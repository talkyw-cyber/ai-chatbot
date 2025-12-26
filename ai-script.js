// AI Assistant - Simple Version
console.log("AI script loaded");

// AI responses database
const aiResponses = {
    "hello": ["Hello there!", "Hi! How can I help?", "Greetings!"],
    "time": ["The current time is: " + new Date().toLocaleTimeString()],
    "date": ["Today is: " + new Date().toDateString()],
    "joke": [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "What do you call a programmer from Finland? Nerdic.",
        "Why did the programmer quit his job? He didn't get arrays!"
    ],
    "help": ["I can respond to: hello, time, date, joke, help"]
};

// Get AI response
function getAIResponse(input) {
    input = input.toLowerCase().trim();
    
    for (const keyword in aiResponses) {
        if (input.includes(keyword)) {
            const responses = aiResponses[keyword];
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
        }
    }
    
    return "I'm still learning! Try: hello, time, date, joke, help";
}

// Send message function
function sendMessage() {
    const inputField = document.getElementById("user-input");
    const chatOutput = document.getElementById("chat-output");
    
    if (!inputField || !chatOutput) {
        console.error("Could not find input or output elements");
        return;
    }
    
    const userMessage = inputField.value.trim();
    if (userMessage === "") return;
    
    // Add user message
    chatOutput.innerHTML += 
        '<div class="chat-message user-message">' +
        '<strong>You:</strong> ' + userMessage +
        '</div>';
    
    // Get AI response
    const aiResponse = getAIResponse(userMessage);
    
    // Add AI response with delay
    setTimeout(function() {
        chatOutput.innerHTML += 
            '<div class="chat-message ai-message">' +
            '<strong>AI:</strong> ' + aiResponse +
            '</div>';
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }, 500);
    
    // Clear input
    inputField.value = "";
    inputField.focus();
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, initializing AI");
    
    // Get elements
    const inputField = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatOutput = document.getElementById("chat-output");
    
    // Check if elements exist
    if (!inputField) console.error("Input field not found");
    if (!sendButton) console.error("Send button not found");
    if (!chatOutput) console.error("Chat output not found");
    
    // Add event listeners
    if (inputField) {
        inputField.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
        console.log("Enter key listener added");
    }
    
    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
        console.log("Button click listener added");
    }
    
    // Show welcome message
    if (chatOutput) {
        chatOutput.innerHTML = 
            '<div class="chat-message ai-message">' +
            '<strong>AI:</strong> Hello! I am your AI assistant. Ask me anything!' +
            '</div>';
    }
});
