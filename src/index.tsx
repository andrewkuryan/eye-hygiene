import { render } from 'preact';

import { ConfigContext, defaultConfig } from '@/logic/Config';
import { ServiceContext, defaultService } from '@/service';
import App from '@/layout/App';

import './index.styl';

const app = document.getElementById('app');
if (app) {
  render(
    <ConfigContext.Provider value={defaultConfig}>
      <ServiceContext.Provider value={defaultService}>
        <App />
      </ServiceContext.Provider>
    </ConfigContext.Provider>,
    app,
  );
}
