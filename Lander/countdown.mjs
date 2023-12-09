export function startTimer(endTime) {
    const timerElement = document.getElementById('timer');
    const end = new Date(endTime);
  
    setInterval(() => {
      const now = new Date();
      const distance = end - now;
  
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      timerElement.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}