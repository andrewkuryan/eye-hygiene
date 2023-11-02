import { StaticObject } from './StaticService';

export interface SoundObject extends StaticObject {
  audioData: AudioBuffer;
}

class SoundService {
  loadFile = async (soundFile: StaticObject): Promise<SoundObject> => {
    const context = new AudioContext();
    const response = await fetch(soundFile.url);
    const sample = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(sample);
    return { ...soundFile, audioData: audioBuffer };
  };

  play = (sound: SoundObject) => {
    const context = new AudioContext();
    const sourceNode = context.createBufferSource();
    sourceNode.buffer = sound.audioData;
    sourceNode.connect(context.destination);
    sourceNode.start(0);
  };
}

export default SoundService;
