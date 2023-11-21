import Const from '@/logic/Const';

const defaultPositionState = {
  duration: 0,
  playbackRate: 1,
  position: 0,
};

const defaultMetadata = {
  title: Const.APP_TITLE,
};

class TrayService {
  positionState: MediaPositionState = defaultPositionState;
  metadata: MediaMetadataInit = defaultMetadata;

  setPositionState = (positionState: MediaPositionState) => {
    const newPositionState = {
      ...this.positionState,
      ...positionState,
    };
    this.positionState = newPositionState;
    navigator.mediaSession.setPositionState(newPositionState);
  };

  setMetadata = (metadata: MediaMetadataInit) => {
    const newMetadata = {
      ...this.metadata,
      ...metadata,
    };
    this.metadata = newMetadata;
    navigator.mediaSession.metadata = new MediaMetadata(newMetadata);
  };

  setPlaybackState = (playbackState: MediaSessionPlaybackState) => {
    navigator.mediaSession.playbackState = playbackState;
  };

  private setHandler = (action: MediaSessionAction, handler: MediaSessionActionHandler) => {
    navigator.mediaSession.setActionHandler(action, handler);
  };

  setOnPlayHandler = (handler: MediaSessionActionHandler) => this.setHandler('play', handler);
  setOnStopHandler = (handler: MediaSessionActionHandler) => this.setHandler('stop', handler);
  setOnPauseHandler = (handler: MediaSessionActionHandler) => this.setHandler('pause', handler);
}

export default TrayService;
