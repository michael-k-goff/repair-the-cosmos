import React, {useState} from 'react';
import './App.css';
import MenuPane from './components/MenuPane';
import ResourcePane from './components/ResourcePane';
import StoryPane from './components/StoryPane';
import InfoBox from './components/InfoBox';
import { useInterval } from './useInterval';
import {updateActionProgress, gameSave, loadGame, initGameState} from './gameLogic.js';

let gameState = initGameState();

function App() {
    // Set up state
    const [saveCycle, setSaveCycle] = useState(0);
    const [justLoaded, setJustLoaded] = useState(1);
    const [lastFrameTime, setLastFrameTime] = useState(new Date().getTime());
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    // Reload game saved in browser local storage.
    if (justLoaded) {
        setJustLoaded(0);
        loadGame(gameState, window);
    }

    // Game loop
    const ms = 30; // milliseconds per interval.
    useInterval(()=> {
        let curTime = new Date().getTime();
        setLastFrameTime(curTime)
        updateActionProgress(gameState, curTime - lastFrameTime);
        const newSaveCycle = (saveCycle+1)%10;
        setSaveCycle(newSaveCycle);
        if (newSaveCycle === 0) {
            gameSave(gameState, window);
        }
    },ms);

    // General functions, such as for tracking mouse position
    const mouseMoveFunc = (e) => {
        setMouseX(e.pageX);
        setMouseY(e.pageY);
    }

    // Render component
    return (
        <div className="App" onMouseMove={mouseMoveFunc}>
            <MenuPane gameState={gameState}/>
            <ResourcePane pane={gameState.pane} subpane={gameState.subpane} gameState={gameState}/>
            <StoryPane story={gameState.story} gameState={gameState} />
            <InfoBox x={mouseX} y={mouseY} gameState={gameState}/>
        </div>
    );
}

export default App;
