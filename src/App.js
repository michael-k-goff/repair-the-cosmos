import React, {useState} from 'react';
import './App.css';
import MenuPane from './components/MenuPane';
import ResourcePane from './components/ResourcePane';
import StoryPane from './components/StoryPane';
import InfoPane from './components/InfoPane';
import { useInterval } from './useInterval';
import {updateActionProgress, gameSave, loadGame, useGameState} from './gameLogic.js';

function App() {
    const gameState = useGameState();
    const [saveCycle, setSaveCycle] = useState(0);
    const [justLoaded, setJustLoaded] = useState(1);
    const [lastFrameTime, setLastFrameTime] = useState(new Date().getTime());
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
    return (
        <div className="App">
            <MenuPane gameState={gameState}/>
            <ResourcePane gameState={gameState}/>
            <StoryPane story={gameState.story} />
            <InfoPane gameState={gameState}/>
        </div>
    );
}

export default App;
