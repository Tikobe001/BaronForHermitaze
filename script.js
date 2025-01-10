document.addEventListener('DOMContentLoaded', () => {
   const timeSpans = document.querySelectorAll('.time');

   timeSpans.forEach(span => {
        const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');

        span.textContent = `${hours}:${minutes}`;
   })
})