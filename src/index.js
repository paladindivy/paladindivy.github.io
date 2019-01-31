import './styles.css';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-contrib-hls.js';

const player = videojs('player', {
  html5: {
    hlsjsConfig: {
      liveSyncDuration: 4,
    },
  },
});

player.src({
  src: 'https://stream.mux.com/n7k02zC6ghprVBZ9n3Fc6nwhrKHKaz9Z02.m3u8',
  type: 'application/x-mpegurl',
});

player.ready(() => {
  console.log('player ready');
  console.log(player.hls);
});
