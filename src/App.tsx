import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Outlet} from "react-router-dom";

function App() {
    const collected = useState()

  return (
    <body>
      <div>
         Hey Hey You
      </div>
      <h1>Let's use your personal data</h1>
        <button>
            <a href={'/liveform'}> That's live form</a>
        </button>

        <button>
            <a href={'/refform'}> That's another form</a>
        </button>
        <div className={'results_wrapper'}>
            Here there will be your results
        </div>

    </body>
  );
}

export default App;
