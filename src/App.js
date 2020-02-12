import React, {useState} from 'react';
import './App.css';
import MenuPane from './components/MenuPane';
import ResourcePane from './components/ResourcePane';
import StoryPane from './components/StoryPane';
import InfoPane from './components/InfoPane';
import {useGameState} from './state_hook.js';
import { useInterval } from './useInterval';
import {updateActionProgress, gameSave, loadGame} from './gameLogic.js';

function App() {
    const [pane, setPane,
        resourceCount, setResourceCount,
        actionProgress, setActionProgress,
        hover, setHover,
        story, setStory,
        more
    ] = useGameState();
    const [saveCycle, setSaveCycle] = useState(0);
    const [justLoaded, setJustLoaded] = useState(1);
    const [lastFrameTime, setLastFrameTime] = useState(new Date().getTime());
    if (justLoaded) {
        setJustLoaded(0);
        loadGame(setResourceCount, setActionProgress, setStory, more, window);
    }
    // Game loop
    const ms = 30; // milliseconds per interval.
    useInterval(()=> {
        let curTime = new Date().getTime();
        setLastFrameTime(curTime)
        updateActionProgress(
            resourceCount, setResourceCount,
            actionProgress, setActionProgress,
            story, setStory, more,
            curTime - lastFrameTime);
        const newSaveCycle = (saveCycle+1)%10;
        setSaveCycle(newSaveCycle);
        if (newSaveCycle === 0) {
            gameSave(resourceCount, actionProgress, story, more, window);
        }
    },ms);
    return (
        <div className="App">
            <MenuPane
                pane={pane} setPane={setPane}
                resourceCount={resourceCount} setResourceCount={setResourceCount}
                hover={hover} setHover={setHover}
                setStory={setStory}
                actionProgress={actionProgress} setActionProgress={setActionProgress}
                more={more}
            />
            <ResourcePane
                pane={pane}
                resourceCount={resourceCount} setResourceCount={setResourceCount}
                actionProgress={actionProgress} setActionProgress={setActionProgress}
                hover={hover} setHover={setHover} setStory={setStory} more={more}
            />
            <StoryPane story={story} setStory={setStory} />
            <InfoPane hover={hover} setHover={setHover}
                actionProgress={actionProgress} setActionProgress={setActionProgress}
                resourceCount={resourceCount} setResourceCount={setResourceCount}
                more={more}
            />
        </div>
    );
}

export default App;
