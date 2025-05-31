// Channel configuration - Replace with your actual m3u8 links
const channels = {
    channel1: {
        name: "News Channel",
        url: "https://bcovlive-a.akamaihd.net/r2d2c4ca5bf57456fb1d16255c1a535c8/eu-west-1/eu-west-1/6058004203001/profile_3/chunklist.m3u8" // Replace with actual URL
    },
    channel2: {
        name: "Sports Channel",
        url: "https://bcovlive-a.akamaihd.net/r2d2c4ca5bf57456fb1d16255c1a535c8/eu-west-1/eu-west-1/6058004203001/profile_3/chunklist.m3u8" // Replace with actual URL
    },
    channel3: {
        name: "Entertainment Channel",
        url: "https://bcovlive-a.akamaihd.net/r2d2c4ca5bf57456fb1d16255c1a535c8/eu-west-1/eu-west-1/6058004203001/profile_3/chunklist.m3u8" // Replace with actual URL
    }
};

// Initialize HLS.js for each channel
document.addEventListener('DOMContentLoaded', function() {
    // Check for theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Initialize all channels
    Object.keys(channels).forEach(channelId => {
        const videoElement = document.getElementById(channelId);
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(channels[channelId].url);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                videoElement.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            // For Safari
            videoElement.src = channels[channelId].url;
            videoElement.addEventListener('loadedmetadata', function() {
                videoElement.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            });
        }
    });
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
});

// Load HLS.js library dynamically
const hlsScript = document.createElement('script');
hlsScript.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
document.head.appendChild(hlsScript);