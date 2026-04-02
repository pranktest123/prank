document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    const audio = document.getElementById('prank-audio');
    
    let audioPlayed = false;

    // The "Force Play" Audio Hack
    function forcePlayAudio() {
        if (!audioPlayed) {
            video.muted = false; 
            
            // Re-affirm video is playing
            if (video.paused) {
                video.play().catch(e => console.log('Video play error:', e));
            }
            
            audio.play().then(() => {
                audioPlayed = true;
                // Remove listeners immediately so it only triggers once
                window.removeEventListener('click', forcePlayAudio);
                window.removeEventListener('touchstart', forcePlayAudio);
                window.removeEventListener('scroll', forcePlayAudio);
                window.removeEventListener('mousemove', forcePlayAudio);
            }).catch(e => {
                console.log('Audio play blocked or pending:', e);
            });
        }
    }

    // Attach interaction events that fire upon the absolute millisecond the user touches or scrolls
    window.addEventListener('click', forcePlayAudio);
    window.addEventListener('touchstart', forcePlayAudio, { passive: true });
    window.addEventListener('scroll', forcePlayAudio, { passive: true });
    window.addEventListener('mousemove', forcePlayAudio);
    
    // Countdown Timer Logic (April 1, 2027)
    const deadline = new Date("April 1, 2027 00:00:00").getTime();
    const timerElement = document.getElementById('countdown-timer');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance <= 0) {
            timerElement.innerHTML = "EXPIRED";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        timerElement.innerHTML = `${days}d ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
    }

    // Initialize timer immediately, then update every second
    updateTimer();
    setInterval(updateTimer, 1000);
});
