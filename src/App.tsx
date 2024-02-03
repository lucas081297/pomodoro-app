import React from 'react';
import './App.css';
import { PomodoroTimer } from './components/pomodoroTimer';

function App() {
  return (
    <div className="container">
    <PomodoroTimer defaultPomodoroTime={5} shortRestTime={5} longRestTime={10} cycles={4}></PomodoroTimer>
    </div>
  );
}

export default App;
