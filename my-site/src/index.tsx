import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'
import { Monitor } from './utils'
import './index.css'

window._monitor = new Monitor('','')
window._monitor.init()
window.onunload = window._monitor.onunload();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <RouterProvider  router={router}/>
  </div>
);


