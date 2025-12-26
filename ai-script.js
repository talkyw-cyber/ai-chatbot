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

// Get AI response function
function getAIResponse(input) {
    const lang = detectLanguage(input);
    const inputLower = input.toLowerCase();
    
    // Check for specific responses
    for (const [key, data] of Object.entries(aiResponses)) {
        const isLangMatch = key.includes('_en') ? lang === 'en' : 
                           key.includes('_ar') ? lang === 'ar' : true;
        
        if (isLangMatch && data.keywords.some(keyword => inputLower.includes(keyword))) {
            if (data.response) {
                return typeof data.response === 'function' ? data.response() : data.response;
            } else if (data.responses) {
                const randomIndex = Math.floor(Math.random() * data.responses.length);
                return data.responses[randomIndex];
            }
        }
    }
    
    // Default responses based on language
    const defaultResponses = {
        en: "I'm still learning! Try: hello, time, date, joke, help (in English or Arabic)",
        ar: "أنا لا أزال أتعلم! جرب: مرحبا, الوقت, التاريخ, نكتة, مساعدة (بالعربية أو الإنجليزية)"
    };
    
    return defaultResponses[lang];
}

// Send message function
function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatOutput = document.getElementById('chat-output');
    
    if (!inputField || !chatOutput) {
        console.error('Could not find input or output elements');
        return;
    }
    
    const userMessage = inputField.value.trim();
    if (userMessage === '') return;
    
    // Add user message with RTL support for Arabic
    const isArabic = detectLanguage(userMessage) === 'ar';
    const messageDir = isArabic ? 'dir="rtl"' : '';
    
    chatOutput.innerHTML += 
        `<div class="chat-message user-message" ${messageDir}>
            <strong>You:</strong> ${userMessage}
        </div>`;
    
    // Get AI response
    const aiResponse = getAIResponse(userMessage);
    const aiIsArabic = detectLanguage(aiResponse) === 'ar';
    const aiDir = aiIsArabic ? 'dir="rtl"' : '';
    
    // Add AI response with delay
    setTimeout(function() {
        chatOutput.innerHTML += 
            `<div class="chat-message ai-message" ${aiDir}>
                <strong>AI:</strong> ${aiResponse}
            </div>`;
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
