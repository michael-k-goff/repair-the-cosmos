// Information on all panes. For now, considered indepdently of eras.

const top_panes = [
    {
        "name":"Population",
        "desc":"Manage your population, professions, etc.",
        "visible":(gameState)=>1,
        "pane":"top"
    },
    {
        "name":"Territory",
        "desc":"Explore and acquire new territory.",
        "visible":(gameState)=>gameState.actionCount["Train Scout"],
        "pane":"top"
    },
    {
        "name":"Resources",
        "desc":"Gather natural resources.",
        "visible":(gameState)=>gameState.actionCount["Train Gatherer"],
        "pane":"top"
    },
    {
        "name":"Buildings",
        "desc":"Build stuff.",
        "visible":(gameState)=>gameState.actionCount["Explore Savannah"],
        "pane":"top"
    },
    {
        "name":"Society",
        "desc":"Manage government, religion, etc.",
        "visible":(gameState)=>gameState.actionCount["Explore River"] && gameState.actionCount["Explore Valley"],
        "pane":"top"
    },
    {
        "name":"Military",
        "desc":"Take territory, resources, etc.",
        "visible":(gameState)=>gameState.actionCount["Explore Savannah"],
        "pane":"top"
    },
    {
        "name":"Cancel Actions",
        "desc":"Cancel all actions currently in progress.",
        "visible":(gameState)=>1,
        "pane":"special"
    },
    {
        "name":"Cancel Repeats",
        "desc":"Cancel all repeats. Actions in progress will be allowed to continue but will not repeat.",
        "visible":(gameState)=>1,
        "pane":"special"
    },
    {
        "name":"Info & Settings",
        "desc":"See general game info and settings.",
        "visible":(gameState)=>1,
        "pane":"special"
    }
]

const subpanes = [
    {
        "name":"Population Subpane",
        "desc":"Population Subpane",
        "visible":(gameState)=>1,
        "pane":"Population"
    },
    {
        "name":"Food",
        "desc":"Gather, produce, process, and eat food.",
        "visible":(gameState)=>1,
        "pane":"Resources"
    },
    {
        "name":"Raw Materials",
        "desc":"Gather raw materials.",
        "visible":(gameState)=>1,
        "pane":"Resources"
    }
]

const subsubpanes = [
    {
        "name":"Population ",
        "desc":"View and grow your overall population",
        "visible":(gameState)=>1,
        "pane":"Population Subpane"
    },
    {
        "name":"Specialists",
        "desc":"Train specialists",
        "visible":(gameState)=>1,
        "pane":"Population Subpane"
    },
    {
        "name":"Health",
        "desc":"Health and physical characterists",
        "visible":(gameState)=>1,
        "pane":"Population Subpane"
    },
    {
        "name":"Wild Food",
        "desc":"Gather food from nature.",
        "visible":(gameState)=>1,
        "pane":"Food"
    },
    {
        "name":"Nutrition",
        "desc":"Consumed Food.",
        "visible":(gameState)=>1,
        "pane":"Food"
    },
    {
        "name":"Food Knowledge",
        "desc":"Things you've learned about food from bitter (no pun intended) experience.",
        "visible":(gameState)=>1,
        "pane":"Food"
    }
]

export const resource_panes = top_panes.concat(subpanes, subsubpanes);
