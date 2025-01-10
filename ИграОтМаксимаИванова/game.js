document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.querySelector('.messages');
    const truthButton = document.querySelector('.truth-button');
    const lieButton = document.querySelector('.lie-button');
    let messageCount = 0;
    let riddleIndex = 0;
    let riddles = [];

    fetch('../riddle.json')
        .then(response => response.json())
        .then(data => {
            riddles = shuffleArray(data);
            startDialog()
         });

    function shuffleArray(array) {
         for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startDialog(){
         addMessage('Барон Мюнхгаузен:', 'Привет, давай поиграем, я буду рассказывать историю, а ты угадывать правда ли это или ложь!', 'from-munxauzen')
         addMessage('Вы:', 'Давай!!', 'from-me');
             setTimeout(() =>{
               nextRiddle()
            }, 1000)
    }

    function addMessage(sender, text, senderClass){
        const now = new Date()
       const hours = String(now.getHours()).padStart(2, '0');
       const minutes = String(now.getMinutes()).padStart(2, '0');

         const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(senderClass);

         messageDiv.innerHTML = `
           <span class="sender">${sender}</span>
            <p>${text}</p>
            <span class="time">${hours}:${minutes}</span>
         `

           messagesContainer.appendChild(messageDiv)
             messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 10);
     }
       function nextRiddle(){
        if(riddleIndex < 10 && riddleIndex < riddles.length){
        addMessage('Барон Мюнхгаузен:', riddles[riddleIndex].text, 'from-munxauzen');
        } else if (riddleIndex >= 10) {
             addMessage('Барон Мюнхгаузен:', 'Классно поиграли, приходи ещё!', 'from-munxauzen');
        }
    }

    function checkAnswer(answer){
         let messageText = null;
        if(riddles[riddleIndex].answer === answer){
            const successMessages = riddles[riddleIndex].success;
             const reactionMessages = riddles[riddleIndex].reaction
            messageText = `${reactionMessages[Math.floor(Math.random() * reactionMessages.length)]} ${successMessages[Math.floor(Math.random() * successMessages.length)]}`;
           } else {
                 const failureMessages = riddles[riddleIndex].failure;
                 messageText = failureMessages[Math.floor(Math.random() * failureMessages.length)]
        }
           addMessage('Вы:', `Это определённо ${answer ? 'правда' : 'ложь'}!`, 'from-me');
           addMessage('Барон Мюнхгаузен:', messageText, 'from-munxauzen');
        riddleIndex++;
             setTimeout(() =>{
               nextRiddle()
            }, 1000)
     }
         sendButton.addEventListener('click', () => {
            const messageText = messageInput.value.trim();
             if (messageText){
                 addMessage('Вы:', messageText, 'from-me')
             }
         })
        truthButton.addEventListener('click', () =>{
            checkAnswer(true)
        })
         lieButton.addEventListener('click', () =>{
            checkAnswer(false)
         })
});