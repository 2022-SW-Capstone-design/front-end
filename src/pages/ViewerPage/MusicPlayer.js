import ReactAudioPlayer from 'react-audio-player';

const MusicPlayer = ({ musicList }) => {
  const sampleMusicUrl = musicList[0].url;

  return <>
    <ReactAudioPlayer src={sampleMusicUrl} controls/>
  </>;
}

export default MusicPlayer;