
// Function to get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, "0") + ":" + 
           now.getMinutes().toString().padStart(2, "0");
}
// 🤖 Bilingual AI Chatbot (English & Arabic)
console.log("Bilingual AI script loaded");

// Language detection function
function detectLanguage(text) {
    // Check if text contains Arabic characters
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text) ? 'ar' : 'en';
}

// Bilingual AI responses database
const aiResponses = {
    en: {
        keywords: ['hello', 'hi', 'hey'],
        responses: [
            "Hello there! 👋",
            "Hi! How can I help you today?",
            "Greetings! I'm your AI assistant."
        ]
    },
    ar: {
        keywords: ['مرحبا', 'اهلا', 'السلام'],
        responses: [
            "مرحبا! 👋",
            "أهلاً وسهلاً! كيف يمكنني مساعدتك؟",
            "السلام عليكم! أنا مساعدك الذكي."
        ]
    },
    time_en: {
        keywords: ['time', 'what time', 'clock'],
        response: () => `Current time is: ${new Date().toLocaleTimeString('en-US')}`
    },
    time_ar: {
        keywords: ['الوقت', 'الساعة', 'كم الساعة'],
        response: () => `الوقت الحالي هو: ${new Date().toLocaleTimeString('ar-EG')}`
    },
    date_en: {
        keywords: ['date', 'today', 'what date'],
        response: () => `Today is: ${new Date().toDateString()}`
    },
    date_ar: {
        keywords: ['التاريخ', 'اليوم', 'تاريخ اليوم'],
        response: () => `تاريخ اليوم هو: ${new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
    },
    joke_en: {
        keywords: ['joke', 'tell joke', 'funny'],
        responses: [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "What do you call a programmer from Finland? Nerdic.",
            "Why did the programmer quit his job? He didn't get arrays!"
        ]
    },
    joke_ar: {
        keywords: ['نكتة', 'ضحك', 'طرفة'],
        responses: [
            "لماذا يستخدم المبرمجون الوضع الداكن؟ لأن الضوء يجذب الحشرات (البق)!",
            "ماذا تسمي مبرمجاً من فنلندا؟ نيرديك.",
            "لماذا ترك المبرمج وظيفته؟ لأنه لم يفهم المصفوفات!"
        ]
    },
    help_en: {
        keywords: ['help', 'what can you do', 'help me'],
        response: "I can respond to: hello, time, date, joke, help (in both English & Arabic)"
    },
    help_ar: {
        keywords: ['مساعدة', 'ساعدني', 'ماذا تستطيع'],
        response: "يمكنني الرد على: مرحبا, الوقت, التاريخ, نكتة, مساعدة (باللغتين الإنجليزية والعربية)"
    }
};

// Get AI response
    const aiResponse = getAIResponse(userMessage);
    const aiIsArabic = detectLanguage(aiResponse) === "ar";
    const aiDir = aiIsArabic ? 'dir="rtl"' : "";
    
    // Show typing indicator
    const typingId = "typing-" + Date.now();
    chatOutput.innerHTML += 
        \`<div class="chat-message ai-message ai-typing" \${aiDir} id="\${typingId}">
            <strong>AI:</strong> Thinking 
            <span class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </span>
        </div>\`;
    chatOutput.scrollTop = chatOutput.scrollHeight;
    
    // Add AI response with delay
    setTimeout(function() {
        // Remove typing indicator
        const typingElement = document.getElementById(typingId);
        if (typingElement) {
            typingElement.remove();
        }
        
        // Add AI response
        chatOutput.innerHTML += 
            \`<div class="chat-message ai-message" \${aiDir}>
                <strong>AI:</strong> \${aiResponse}
            </div>\`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }, 500);
    
    // Clear input
    inputField.value = '';
    inputField.focus();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing bilingual AI');
    
    // Get elements
    const inputField = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatOutput = document.getElementById('chat-output');
    
    // Add event listeners
    if (inputField) {
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Show bilingual welcome message
    if (chatOutput) {
        chatOutput.innerHTML = 
            `<div class="chat-message ai-message">
                <strong>AI:</strong> Hello! / مرحباً! I'm your bilingual AI assistant. Ask me in English or Arabic!
            </div>`;
    }
});



