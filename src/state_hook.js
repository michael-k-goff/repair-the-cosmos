// Custom hook. This is dummy code; replace later

import {resource_panes, resources} from './assets.js';

import {useState} from 'react';

// Initialize resources
export let init_resource_count = {};
for (var key in resources) {
    init_resource_count[resources[key][0]] = 0;
}
init_resource_count["People"] = 2; // Adam and Eve
init_resource_count["Garden of Eden"] = 1;

// Initialize other stuff
export const init_story = [
    "The Fall. Adam and Eve have been cast from the Garden. Your job is to guide them and their descendents to repair the cosmos.",
    "To start with, you need more people. Head over to the Population tab and be fruitful and multiply.",
    "Check the other tabs periodically for more actions as they become available."
]

export const init_hover = "Watch this space for more info.";

export const useGameState = () => {
    // Currently displayed pane
    const [pane, setPane] = useState(resource_panes[0][0]);

    // Counts of all resources
    const [resourceCount, setResourceCount] = useState(init_resource_count);

    // Progress toward completing actions
    const [actionProgress, setActionProgress] = useState({});

    // What is currently being overed over for the info box
    const [hover, setHover] = useState(init_hover);

    // Current story
    const [story, setStory] = useState(init_story)

    // Counts of how many times each action is performed
    const [actionCount, setActionCount] = useState({});

    // Staging area for actions done by click.
    const [staging, setStaging] = useState({})

    return [pane, setPane,
        resourceCount, setResourceCount,
        actionProgress, setActionProgress,
        hover, setHover,
        story, setStory,
        {
            "actionCount":actionCount, "setActionCount":setActionCount,
            "staging":staging, "setStaging":setStaging
        }
    ];
}
