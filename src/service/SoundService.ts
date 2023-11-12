import { StaticObject } from './StaticService';

export interface SoundObject extends StaticObject {
  audioData: AudioBuffer;
}

class SoundService {
  private context: AudioContext | null = null;

  initContext = async () => {
    if (this.context === null) {
      this.context = new AudioContext();
    }
    await this.context.resume();
  };

  private getContext = () => {
    if (this.context === null) {
      this.context = new AudioContext();
    }
    return this.context;
  };

  loadFile = async (soundFile: StaticObject): Promise<SoundObject> => {
    const context = this.getContext();
    const response = await fetch(soundFile.url);
    const sample = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(sample);
    return { ...soundFile, audioData: audioBuffer };
  };

  play = (sound: SoundObject) => {
    const context = this.getContext();
    const sourceNode = context.createBufferSource();
    sourceNode.buffer = sound.audioData;
    sourceNode.connect(context.destination);
    sourceNode.start(0);
  };
}

export default SoundService;
