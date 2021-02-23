// Information on all panes. For now, considered indepdently of eras.

const pane_dict = [
    {
        "name":"Population",
        "desc":"People, animals, and demography",
        "pane":"top",
        "subpanes":[
            {
                "name":"Human Life",
                "desc":"Living creatures that comprise your society",
                "subpanes":[
                    {
                        "name":"Proto-Humans",
                        "desc":"Ancestor and peer species to modern humans.",
                        "visible":(gameState)=>1
                    },
                    {
                        "name":"Humans",
                        "desc":"View and grow your overall population.",
                        "visible":(gameState)=>1
                    },
                    {
                        "name":"Transhumans",
                        "desc":"Modified humans.",
                        "visible":(gameState)=>1
                    },
                    {
                        "name":"Posthumans",
                        "desc":"Entities that entirely transcended humanity.",
                        "visible":(gameState)=>1
                    }
                ]
            },
            {
                //"visible":(gameState)=>0,
                "name":"Animal Life",
                "subpanes":[
                    {
                        "name":"Animals",
                        "desc":"The domesticated animals that are members of your civilization.",
                        "visible":gameState=>1
                    },
                    {
                        "name":"Engineered Life",
                        "visible":gameState=>1
                    }
                ]
            },
            {
                "name":"Specialists",
                "desc":"Train specialists",
                "visible":(gameState)=>1,
                "subpanes":[
                    {
                        "name":"Explorers"
                    },
                    {
                        "name":"Food Procurement"
                    },
                    {
                        "name":"Craftsmen"
                    },
                    {
                        "name":"Laborers"
                    },
                    {
                        "name":"Entertainers"
                    },
                    {
                        "name":"Health Workers"
                    },
                    {
                        "name":"Public Safety"
                    },
                    {
                        "name":"Educators"
                    },
                    {
                        "name":"Knowledge Workers"
                    },
                    {
                        "name":"Leaders"
                    }
                ]
            },
            {
                "name":"Demographics",
                "desc":"Health and physical characteristics",
                "visible":(gameState)=>1,
                "subpanes":[
                    {
                        "name":"Health"
                    },
                    {
                        "name":"Education"
                    },
                    {
                        "name":"Crime"
                    },
                    {
                        "name":"Well-Being"
                    }
                ]
            }
        ]
    },
    {
        "name":"Territory",
        //"visible":(gameState)=>0,
        "desc":"Explore and acquire new territory.",
        "pane":"top",
        "subpanes":[
            {
                "name":"Homeworld",
                "desc":"Homeworld",
                "subpanes":[
                    {
                        "name":"Home Region",
                        "desc":"Territory near where your civilization was founded.",
                        "visible":(gameState)=>1,
                        "pane":"Homeworld"
                    },
                    {
                        "name":"Home Continent",
                        "desc":"Territory on and near your home continent.",
                        "visible":(gameState)=>1,
                        "pane":"Homeworld"
                    },
                    {
                        "name":"New World",
                        "desc":"Territory on distant continents and islands.",
                        "visible":(gameState)=>1,
                        "pane":"Homeworld"
                    },
                    {
                        "name":"Sky",
                        "desc":"Territory in the atmosphere but high above ground.",
                        "visible":(gameState)=>1,
                        "pane":"Homeworld"
                    },
                    {
                        "name":"Underground",
                        "desc":"Territory well below the ground or ocean surface.",
                        "visible":(gameState)=>1,
                        "pane":"Homeworld"
                    }
                ]
            },
            {
                "name":"Homeworld Environment",
                "subpanes":[
                    {
                        "name":"Wild Plants"
                    },
                    {
                        "name":"Animal Herds",
                        "desc":"Wild animals in your territory.",
                        "visible":(gameState)=>1
                    },
                    {
                        "name":"Environment"
                    }
                ]
            },
            {
                "name":"Solar System",
                "desc":"Solar System",
                "subpanes":[
                    {
                        "name":"Earth Orbit",
                        "desc":"Space in which satellites can maintain a stable orbit around Earth.",
                        "visible":(gameState)=>gameState.actionCount["Make Multinational Federation"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Moon",
                        "desc":"Territory on or around Earth's Moon.",
                        "visible":(gameState)=>gameState.actionCount["Make Multinational Federation"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Mars",
                        "desc":"Territory on or around Mars.",
                        "visible":(gameState)=>gameState.actionCount["Make Megacity"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Venus",
                        "desc":"Territory on or around Venus.",
                        "visible":(gameState)=>gameState.actionCount["Make Megacity"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Rocky Surface",
                        "desc":"Territory on or around asteroids or Mercury.",
                        "visible":(gameState)=>gameState.actionCount["Make Space Colony"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Jupiter",
                        "desc":"Territory on or around Juipter and its moons.",
                        "visible":(gameState)=>gameState.actionCount["Make Space Colony"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Saturn",
                        "desc":"Territory on or around Saturn and its moons.",
                        "visible":(gameState)=>gameState.actionCount["Make Space Colony"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Ice Giants",
                        "desc":"Territory on or around Uranus, Neptune, and their moons.",
                        "visible":(gameState)=>gameState.actionCount["Make Space Colony"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Kuiper Belt",
                        "desc":"The Kuiper Belt: a region of icy/rocky objects beyond Neptune.",
                        "visible":(gameState)=>gameState.actionCount["Make Space Colony"],
                        "pane":"Solar System"
                    },
                    {
                        "name":"Solar Space",
                        "desc":"Free space around the Sun, and also in the Sun.",
                        "visible":(gameState)=>gameState.actionCount["Make Megacity"],
                        "pane":"Solar System"
                    }
                ]
            },
            {
                "name":"Home Galaxy",
                "desc":"Your home galaxy, e.g. the Milky Way.",
                "subpanes":[
                    {
                        "name":"Transtellar",
                        "desc":"Space where there is not a stable orbit around any star.",
                        "visible":(gameState)=>gameState.actionCount["Make Transtellar Colony"],
                        "pane":"Home Galaxy"
                    },
                    {
                        "name":"Nearby Star",
                        "desc":"A star that is within about 100 light years of Earth and their stellar systems.",
                        "visible":(gameState)=>gameState.actionCount["Make Transtellar Colony"],
                        "pane":"Home Galaxy"
                    },
                    {
                        "name":"Galactic Space",
                        "desc":"Space within the Milky Way but more than 100 light years from Earth.",
                        "visible":(gameState)=>1,
                        "pane":"Home Galaxy"
                    },
                    {
                        "name":"Galactic Discoveries"
                    }
                ]
            },
            {
                "name":"Universe",
                "desc":"The observable universe from your home galaxy.",
                "subpanes":[
                    {
                        "name":"Local Group",
                        "desc":"Space outside of the Milky Way but within the Local Group of galaxies.",
                        "visible":(gameState)=>gameState.actionCount["Make Dyson Sphere"],
                        "pane":"Universe"
                    },
                    {
                        "name":"Home Supercluster",
                        "desc":"The Virgo Supercluster",
                        "visible":(gameState)=>1,
                        "pane":"Universe"
                    },
                    {
                        "name":"Observable Universe",
                        "desc":"All space that can be observed from Earth, extending about 14 billion parsecs in each direction.",
                        "visible":(gameState)=>gameState.actionCount["Make Intergalactic Empire"],
                        "pane":"Universe"
                    },
                    {
                        "name":"Universal Discoveries"
                    }
                ]
            },
            {
                "name":"Cosmos",
                "desc":"The whole of all reality.",
                "subpanes":[
                    {
                        "name":"Local Cosmic Bubble",
                        "desc":"Space outside of the observable universe but within the stable region of space that is not underoing rapid cosmic inflation.",
                        "visible":(gameState)=>gameState.actionCount["Make Distant Civilization"],
                        "pane":"Cosmos"
                    },
                    {
                        "name":"Multiverse",
                        "desc":"The various cosmic bubbles and spacetime structures that make up the multiverse.",
                        "visible":(gameState)=>gameState.actionCount["Make Distant Civilization"],
                        "pane":"Cosmos"
                    },
                    {
                        "name":"Ultimate Ensemble",
                        "desc":"The whole of reality that can be described mathematically.",
                        "visible":(gameState)=>gameState.actionCount["Make Distant Civilization"],
                        "pane":"Cosmos"
                    },
                    {
                        "name":"Cosmic Discoveries"
                    }
                ]
            },
            {
                "name":"Space Environment"
            }
        ]
    },
    {
        "name":"Resources",
        "desc":"Gather natural resources.",
        "pane":"top",
        "subpanes":[
            {
                "name":"Food",
                "desc":"Gather, produce, process, and eat food.",
                "subpanes":[
                    {
                        "name":"Farms"
                    },
                    {
                        "name":"Farming Tools"
                    },
                    {
                        "name":"Farmed Food",
                        "desc":"Food produced on farms.",
                        "visible":(gameState)=>gameState.actionCount["Make Chiefdom"],
                        "pane":"Food"
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
                    },
                    {
                        "name":"Food Commodities",
                        "desc":"Consumable commodities that are not necessarily food.",
                        "visible":(gameState)=>1,
                        "pane":"Food"
                    }
                ]
            },
            {
                "name":"Prepared Food",
                "subpanes":[
                    {
                        "name":"Processed Food",
                        "desc":"Food after you have done stuff to it.",
                        "visible":(gameState)=>gameState.actionCount["Make Cookstove"]
                    },
                    {
                        "name":"Cooking"
                    },
                    {
                        "name":"Cuisine"
                    },
                    {
                        "name":"Dining",
                        "desc":"Places to eat.",
                        "visible":(gameState)=>gameState.actionCount["Make Chiefdom"]
                    },
                    {
                        "name":"Food Retail"
                    },
                    {
                        "name":"Food Distribution"
                    }
                ]
            },
            {
                "name":"Resource Extraction",
                "subpanes":[
                    {
                        "name":"Mining"
                    },
                    {
                        "name":"Energy Extraction"
                    },
                    {
                        "name":"Space Resources"
                    }
                ]
            },
            {
                "name":"Raw Materials",
                "desc":"Gather raw materials.",
                "subpanes":[
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
                    }
                ]
            },
            {
                "name":"Manufactured Materials",
                "desc":"Manufactured materials.",
                "subpanes":[
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
                    }
                ]
            },
            {
                "name":"Manufactured Goods",
                "desc":"Manufactured goods.",
                "subpanes":[
                    {
                        "name":"Tools"
                    },
                    {
                        "name":"Machines"
                    },
                    {
                        "name":"Textiles"
                    },
                    {
                        "name":"Goods" // Consider something more specific here
                    },
                    {
                        "name":"Vehicles"
                    },
                    {
                        "name":"Consumer Goods"
                    }
                ]
            },
            {
                "name":"Trade",
                "desc":"Trade"
            }
        ]
    },
    {
        "name":"Construction",
        "desc":"Build stuff.",
        "pane":"top",
        "subpanes":[
            {
                "name":"Urbanization",
                "desc":"Urban developments",
                "subpanes":[
                    {
                        "name":"Cities"
                    },
                    {
                        "name":"Urban Development"
                    },
                    {
                        "name":"Exotic Cities"
                    },
                    {
                        "name":"Buildings",
                        "desc":"Buildings"
                    }
                ]
            },
            {
                "name":"Infrastructure",
                "desc":"Infrastructure",
                "subpanes":[
                    {
                        "name":"Transportation"
                    },
                    {
                        "name":"Ports"
                    },
                    {
                        "name":"Communication"
                    },
                    {
                        "name":"Water"
                    },
                    {
                        "name":"Energy Production"
                    },
                    {
                        "name":"Energy Distribution"
                    },
                    {
                        "name":"Matter"
                    }
                ]
            },
            {
                "name":"Industry",
                "desc":"Make stuff",
                "subpanes":[
                    {
                        "name":"Manufacturing",
                        "desc":"Basic workshops, factories, etc."
                    },
                    {
                        "name":"Offworld Manufacturing"
                    }
                ]
            },
            {
                "name":"Housing",
                "desc":"Places to live",
                "subpanes":[
                    {
                        "name":"Group Housing",
                        "desc":"Housing for extended families or multiple families"
                    },
                    {
                        "name":"Single Family Housing",
                        "desc":"Typically detached structures"
                    },
                    {
                        "name":"Mobile Housing",
                        "desc":"Housing that can move"
                    }
                ]
            },
            {
                "name":"Space Development",
                "desc":"City and colony development in space",
                "subpanes":[
                    {
                        "name":"Free Space Development"
                    },
                    {
                        "name":"Interplanetary Development"
                    },
                    {
                        "name":"Interstellar Development"
                    },
                    {
                        "name":"Intergalactic Development"
                    },
                    {
                        "name":"Interdimensional Development"
                    }
                ]
            }
        ]
    },
    {
        "name":"Knowledge",
        "desc":"Scientific and folk knowledge",
        "pane":"top",
        "subpanes":[
            {
                "name":"Wisdom",
                "subpanes":[
                    {
                        "name":"Calendar"
                    }
                ]
            },
            {
                "name":"Language",
                "subpanes":[
                    {
                        "name":"Spoken Language"
                    },
                    {
                        "name":"Written Language"
                    },
                    {
                        "name":"Writing"
                    },
                    {
                        "name":"Semiotic Language"
                    }
                ]
            },
            {
                "name":"Hard Science",
                "subpanes":[
                    {
                        "name":"Astronomy"
                    },
                    {
                        "name":"Earth Science"
                    },
                    {
                        "name":"Physics"
                    },
                    {
                        "name":"Biology"
                    },
                    {
                        "name":"Mathematics"
                    },
                    {
                        "name":"Chemistry"
                    },
                    {
                        "name":"Medicine"
                    }
                ]
            },
            {
                "name":"Social Science",
                "subpanes":[
                    {
                        "name":"Economics"
                    },
                    {
                        "name":"Anthropology"
                    }
                ]
            },
            {
                "name":"Skills"
            },
            {
                "name":"Engineering"
            },
            {
                "name":"Computation",
                "subpanes":[
                    {
                        "name":"Hardware"
                    },
                    {
                        "name":"Programming"
                    },
                    {
                        "name":"Software"
                    },
                    {
                        "name":"Human-Computer Interaction"
                    },
                    {
                        "name":"Networking"
                    },
                    {
                        "name":"Artificial Intelligence"
                    }
                ]
            }
        ]
    },
    {
        "name":"Society",
        "desc":"Manage government, religion, etc.",
        "pane":"top",
        "subpanes":[
            {
                "name":"Civilization",
                "desc":"The size and development of your civilization overall.",
                "subpanes":[
                    {
                        "name":"Scope"
                    },
                    {
                        "name":"Federation"
                    },
                    {
                        "name":"Substates"
                    }
                ]
            },
            {
                "name":"Government",
                "desc":"Political instituations and structures.",
                "subpanes":[
                    {
                        "name":"Form of Government"
                    },
                    {
                        "name":"Ideology"
                    },
                    {
                        "name":"Policy"
                    },
                    {
                        "name":"Administration"
                    }
                ]
            },
            {
                "name":"Religion",
                "desc":"Religious beliefs",
                "subpanes":[
                    {
                        "name":"Religions"
                    },
                    {
                        "name":"Religious Buildings"
                    },
                    {
                        "name":"Religious Beliefs"
                    },
                    {
                        "name":"Religious Practices"
                    }
                ]
            },
            {
                "name":"Art",
                "desc":"All forms of art.",
                "subpanes":[
                    {
                        "name":"Visual Art"
                    },
                    {
                        "name":"Music"
                    },
                    {
                        "name":"Monumental Building"
                    },
                    {
                        "name":"Stories"
                    },
                    {
                        "name":"Broadcast"
                    },
                    {
                        "name":"Electronic Art"
                    },
                    {
                        "name":"Artistic Style"
                    }
                ]
            },
            {
                "name":"Folklore",
                "subpanes":[
                    {
                        "name":"Tales"
                    },
                    {
                        "name":"Hidden Knowledge"
                    }
                ]
            }
        ]
    },
    {
        "name":"Military",
        "desc":"Take territory, resources, etc.",
        "pane":"top",
        "subpanes":[
            {
                "name":"Military Action"
            },
            {
                "name":"Units",
                "desc":"All your military units"
            },
            {
                "name":"Military Construction"
            },
            {
                "name":"Military Equipment",
                "subpanes":[
                    {
                        "name":"Weapons"
                    },
                    {
                        "name":"Armor"
                    },
                    {
                        "name":"Firearms"
                    },
                    {
                        "name":"Bombs"
                    },
                    {
                        "name":"Missiles"
                    }
                ]
            },
            {
                "name":"Military Vehicles",
                "subpanes": [
                    {
                        "name":"Land Vehicles"
                    },
                    {
                        "name":"Ships"
                    },
                    {
                        "name":"Aircraft"
                    },
                    {
                        "name":"Spacecraft"
                    }
                ]
            }
        ]
    },
    {
        "name":"Cancel Actions",
        "desc":"Cancel all actions currently in progress.",
        "pane":"special"
    },
    {
        "name":"Cancel Repeats",
        "desc":"Cancel all repeats. Actions in progress will be allowed to continue but will not repeat.",
        "pane":"special"
    },
    {
        "name":"Info & Settings",
        "desc":"See general game info and settings.",
        "pane":"special"
    }
]

// Build up the pane data to match old format
let flat_pane_dict = [];

let flatten_pane_dict = (pd, parent_pane={}) => {
    for (let i=0; i<pd.length; i++) {
        if (!pd[i].visible) { // This block should be included for the real version
            pd[i]["visible"] = (pane_data => gameState => 1)(pd[i]);
        }
        //pd[i]["visible"] = (pane_data => gameState => 1)(pd[i]);
        if (parent_pane.name && !pd[i].pane) {
            pd[i].pane = parent_pane.name;
        }
        flat_pane_dict.push(pd[i]);

        if (pd[i].subpanes) {
            flatten_pane_dict(pd[i].subpanes, pd[i])
        }
    }
}

flatten_pane_dict(pane_dict);

export const resource_panes = flat_pane_dict;
//export const resource_panes = top_panes.concat(subpanes, subsubpanes);
