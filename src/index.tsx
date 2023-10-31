import { render } from 'preact';

import App from '@/layout/App';

import './index.styl';

const app = document.getElementById('app');
if (app) {
  render(<App />, app);
}
