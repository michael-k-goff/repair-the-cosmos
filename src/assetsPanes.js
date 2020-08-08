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
        "name":"Construction",
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
        "name":"Population Subpane", // Rename if other subpages under Population are developed
        "desc":"Population Subpane",
        "visible":(gameState)=>1,
        "pane":"Population"
    },
    {
        "name":"Civilization",
        "desc":"The size and development of your civilization overall.",
        "visible":(gameState)=>1,
        "pane":"Society"
    },
    {
        "name":"Politics",
        "desc":"Political instituations and structures.",
        "visible":(gameState)=>gameState.actionCount["Form a Tribe"],
        "pane":"Society"
    },
    {
        "name":"Religion",
        "desc":"Religious beliefs",
        "visible":(gameState)=>gameState.actionCount["Form a Tribe"],
        "pane":"Society"
    },
    {
        "name":"Art",
        "desc":"All forms of art.",
        "visible":(gameState)=>gameState.actionCount["Form a Tribe"],
        "pane":"Society"
    },
    {
        "name":"Urbanization",
        "desc":"Urban developments",
        "visible":(gameState)=>gameState.actionCount["Form a Chiefdom"],
        "pane":"Construction"
    },
    {
        "name":"Infrastructure",
        "desc":"Infrastructure",
        "visible":(gameState)=>gameState.actionCount["Train Tracker"],
        "pane":"Construction"
    },
    {
        "name":"Buildings",
        "desc":"Buildings",
        "visible":(gameState)=>1,
        "pane":"Construction"
    },
    {
        "name":"Space Development",
        "desc":"City and colony development in space",
        "visible":(gameState)=>gameState.actionCount["Build Space Colony"],
        "pane":"Construction"
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
    },
    {
        "name":"Manufactured Materials",
        "desc":"Manufactured materials.",
        "visible":(gameState)=>1,
        "pane":"Resources"
    },
    {
        "name":"Manufactured Goods",
        "desc":"Manufactured goods.",
        "visible":(gameState)=>1,
        "pane":"Resources"
    },
    {
        "name":"Trade",
        "desc":"Trade",
        "visible":(gameState)=>gameState.actionCount["Establish Barter Route"],
        "pane":"Resources"
    },
    {
        "name":"Military Subpane",
        "desc":"Military Subpane",
        "visible": (gameState)=>1,
        "pane":"Military"
    },
    {
        "name":"Homeworld",
        "desc":"Homeworld",
        "visible": (gameState)=>1,
        "pane":"Territory"
    },
    {
        "name":"Solar System",
        "desc":"Solar System",
        "visible": (gameState)=>gameState.actionCount["Build Multinational Federation"],
        "pane":"Territory"
    },
    {
        "name":"Home Galaxy",
        "desc":"Your home galaxy, e.g. the Milky Way.",
        "visible": (gameState)=>gameState.actionCount["Build Transtellar Colony"],
        "pane":"Territory"
    },
    {
        "name":"Universe",
        "desc":"The observable universe from your home galaxy.",
        "visible": (gameState)=>gameState.actionCount["Build Dyson Sphere"],
        "pane":"Territory"
    },
    {
        "name":"Cosmos",
        "desc":"The whole of all reality.",
        "visible": (gameState)=>gameState.actionCount["Build Distant Civilization"],
        "pane":"Territory"
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
        "name":"Animals",
        "desc":"The domesticated animals that are members of your civilization.",
        "visible":(gameState)=>gameState.actionCount["Hunt"],
        "pane":"Population Subpane"
    },
    {
        "name":"Health",
        "desc":"Health and physical characterists",
        "visible":(gameState)=>1,
        "pane":"Population Subpane"
    },
    {
        "name":"Home Region",
        "desc":"Territory near where your civilization was founded.",
        "visible":(gameState)=>1,
        "pane":"Homeworld"
    },
    {
        "name":"Home Continent",
        "desc":"Territory on and near your home continent.",
        "visible":(gameState)=>gameState.actionCount["Form a Tribe"],
        "pane":"Homeworld"
    },
    {
        "name":"New World",
        "desc":"Territory on distant continents and islands.",
        "visible":(gameState)=>gameState.actionCount["Build Duchy"],
        "pane":"Homeworld"
    },
    {
        "name":"Sky",
        "desc":"Territory in the atmosphere but high above ground.",
        "visible":(gameState)=>gameState.actionCount["Build Deep Space Colony"],
        "pane":"Homeworld"
    },
    {
        "name":"Underground",
        "desc":"Territory well below the ground or ocean surface.",
        "visible":(gameState)=>gameState.actionCount["Build Deep Space Colony"],
        "pane":"Homeworld"
    },
    {
        "name":"Earth Orbit",
        "desc":"Space in which satellites can maintain a stable orbit around Earth.",
        "visible":(gameState)=>gameState.actionCount["Build Multinational Federation"],
        "pane":"Solar System"
    },
    {
        "name":"Moon",
        "desc":"Territory on or around Earth's Moon.",
        "visible":(gameState)=>gameState.actionCount["Build Megacity"],
        "pane":"Solar System"
    },
    {
        "name":"Mars",
        "desc":"Territory on or around Mars.",
        "visible":(gameState)=>gameState.actionCount["Build Space Colony"],
        "pane":"Solar System"
    },
    {
        "name":"Venus",
        "desc":"Territory on or around Venus.",
        "visible":(gameState)=>gameState.actionCount["Build Space Colony"],
        "pane":"Solar System"
    },
    {
        "name":"Rocky Surface",
        "desc":"Territory on or around asteroids or Mercury.",
        "visible":(gameState)=>gameState.actionCount["Build Deep Space Colony"],
        "pane":"Solar System"
    },
    {
        "name":"Jupiter",
        "desc":"Territory on or around Juipter and its moons.",
        "visible":(gameState)=>gameState.actionCount["Build Deep Space Colony"],
        "pane":"Solar System"
    },
    {
        "name":"Saturn",
        "desc":"Territory on or around Saturn and its moons.",
        "visible":(gameState)=>gameState.actionCount["Build Deep Space Colony"],
        "pane":"Solar System"
    },
    {
        "name":"Ice Giants",
        "desc":"Territory on or around Uranus, Neptune, and their moons.",
        "visible":(gameState)=>gameState.actionCount["Build Deep Space Colony"],
        "pane":"Solar System"
    },
    {
        "name":"Kuiper Belt",
        "desc":"The Kuiper Belt: a region of icy/rocky objects beyond Neptune.",
        "visible":(gameState)=>gameState.actionCount["Build Deep Space Colony"],
        "pane":"Solar System"
    },
    {
        "name":"Solar Space",
        "desc":"Free space around the Sun, and also in the Sun.",
        "visible":(gameState)=>gameState.actionCount["Build Deep Space Colony"],
        "pane":"Solar System"
    },
    {
        "name":"Transtellar",
        "desc":"Space where there is not a stable orbit around any star.",
        "visible":(gameState)=>gameState.actionCount["Build Transtellar Colony"],
        "pane":"Home Galaxy"
    },
    {
        "name":"Nearby Star",
        "desc":"A star that is within about 100 light years of Earth and their stellar systems.",
        "visible":(gameState)=>gameState.actionCount["Build Transtellar Colony"],
        "pane":"Home Galaxy"
    },
    {
        "name":"Galactic Space",
        "desc":"Space within the Milky Way but more than 100 light years from Earth.",
        "visible":(gameState)=>gameState.actionCount["Build Dyson Sphere"],
        "pane":"Home Galaxy"
    },
    {
        "name":"Local Group",
        "desc":"Space outside of the Milky Way but within the Local Group of galaxies.",
        "visible":(gameState)=>gameState.actionCount["Build Dyson Sphere"],
        "pane":"Universe"
    },
    {
        "name":"Home Supercluster",
        "desc":"The Virgo Supercluster",
        "visible":(gameState)=>gameState.actionCount["Build Intergalactic Empire"],
        "pane":"Universe"
    },
    {
        "name":"Observable Universe",
        "desc":"All space that can be observed from Earth, extending about 14 billion parsecs in each direction.",
        "visible":(gameState)=>gameState.actionCount["Build Intergalactic Empire"],
        "pane":"Universe"
    },
    {
        "name":"Local Cosmic Bubble",
        "desc":"Space outside of the observable universe but within the stable region of space that is not underoing rapid cosmic inflation.",
        "visible":(gameState)=>gameState.actionCount["Build Distant Civilization"],
        "pane":"Cosmos"
    },
    {
        "name":"Multiverse",
        "desc":"The various cosmic bubbles and spacetime structures that make up the multiverse.",
        "visible":(gameState)=>gameState.actionCount["Build Distant Civilization"],
        "pane":"Cosmos"
    },
    {
        "name":"Ultimate Ensemble",
        "desc":"The whole of reality that can be described mathematically.",
        "visible":(gameState)=>gameState.actionCount["Build Distant Civilization"],
        "pane":"Cosmos"
    },
    {
        "name":"Farmed Food",
        "desc":"Food produced on farms.",
        "visible":(gameState)=>gameState.actionCount["Form a Chiefdom"],
        "pane":"Food"
    },
    {
        "name":"Wild Food",
        "desc":"Gather food from nature.",
        "visible":(gameState)=>1,
        "pane":"Food"
    },
    {
        "name":"Processed Food",
        "desc":"Food after you have done stuff to it.",
        "visible":(gameState)=>gameState.actionCount["Build Cookstove"],
        "pane":"Food"
    },
    {
        "name":"Dining",
        "desc":"Places to eat.",
        "visible":(gameState)=>gameState.actionCount["Form a Chiefdom"],
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
    },
    {
        "name":"Food Commodities",
        "desc":"Consumable commodities that are not necessarily food.",
        "visible":(gameState)=>1,
        "pane":"Food"
    },
    {
        "name":"Metals",
        "desc":"Mined metals and metal ores.",
        "visible":(gameState)=>1,
        "pane":"Raw Materials"
    },
    {
        "name":"Minerals",
        "desc":"Mineral raw materials.",
        "visible":(gameState)=>1,
        "pane":"Raw Materials"
    },
    {
        "name":"Organic Materials",
        "desc":"Organic raw materials.",
        "visible":(gameState)=>1,
        "pane":"Raw Materials"
    },
    {
        "name":"Energy",
        "desc":"Raw materials primarily for producing energy.",
        "visible":(gameState)=>1,
        "pane":"Raw Materials"
    },
    {
        "name":"Composites",
        "desc":"Composite manufactured materials.",
        "visible":(gameState)=>1,
        "pane":"Manufactured Materials"
    },
    {
        "name":"Building Materials",
        "desc":"Manufactured materials for primarily structural purposes.",
        "visible":(gameState)=>1,
        "pane":"Manufactured Materials"
    },
    {
        "name":"Exotic",
        "desc":"Exotic manufactured materials.",
        "visible":(gameState)=>1,
        "pane":"Manufactured Materials"
    },
    {
        "name":"Chemicals",
        "desc":"Synthetic chemicals.",
        "visible":(gameState)=>1,
        "pane":"Manufactured Materials"
    },
    {
        "name":"Nanotechnology",
        "desc":"High tech materials.",
        "visible":(gameState)=>1,
        "pane":"Manufactured Materials"
    },
    {
        "name":"Refined Organic Materials",
        "desc":"Organic materials that have been processed.",
        "visible":(gameState)=>1,
        "pane":"Manufactured Materials"
    },
    {
        "name":"Units",
        "desc":"All your military units",
        "visible":(gameState)=>gameState.actionCount["Explore Savannah"],
        "pane":"Military Subpane"
    }
]

export const resource_panes = top_panes.concat(subpanes, subsubpanes);
