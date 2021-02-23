import {addLog, softCap} from "../gameLogic.js";

const resources_by_pane =
[
	{
		"pane": "Population",
		"resources": [

		]
	},
	{
		"pane": "Population Subpane",
		"resources": [

		]
	},
	{
		"pane":"Proto-Humans",
		"resources":[
			{
				"name":"Australopithecus", // Lower Paleolithic
				"prereqs":[],
				"obsolete":["Human"],
				"desc":"A genus of hominins that existed in Africa from around 4.2 to 1.9 million years ago."
			},
			{
				"name":"Homo habilis", // Lower Paleolithic
				"prereqs":["Australopithecus"],
				"desc":"A species of archaic human from the Early Pleistocene of East and South Africa about 2.3–1.65 million years ago."
			},
			{
				"name":"Homo erectus", // Lower Paleolithic
				"prereqs":["Homo habilis"],
				"desc":"An extinct species of archaic human from the Pleistocene, with its earliest occurrence about 2 million years ago."
			},
			{
				"name":"Homo ergaster", // Lower Paleolithic
				"prereqs":["Homo habilis"],
				"desc":"The fossil range of H. ergaster mainly covers the period of 1.8 to 1.7 million years ago, with a handful of older and younger specimens extending the range to about 2 and 1.5 million years ago respectively."
			},
			{
				"name":"Homo antecessor", // Lower Paleolithic
				"prereqs":["Homo ergaster"],
				"desc":"Homo antecessor is an archaic human species of the Lower Paleolithic, known to have been present in Western Europe (Spain, England and France) between about 1.2 million and 0.8 million years ago (Mya)."
			},
			{
				"name":"Homo heidelbergensis", // Lower Paleolithic
				"prereqs":["Homo ergaster"],
				"desc":"An extinct species or subspecies of archaic humans in the genus Homo, which radiated in the Middle Pleistocene from about 700,000 to 300,000 years ago."
			},
			{
				"name":"Denisovan", // Lower Paleolithic
				"prereqs":["Homo heidelbergensis"],
				"desc":"an extinct species or subspecies of archaic human that ranged across Asia during the Lower and Middle Paleolithic."
			},
			{
				"name": "Neanderthal", // Lower Paleolithic
				"prereqs":["Homo heidelbergensis"],
				"desc": "Neanderthals were a separate species of human that lived throughout Asia and went extinct about 40,000 years ago."
			},
			{
				"name": "Brain Size", // Lower Paleolithic
				"prereqs":["Australopithecus"],
				"desc": "During the Lower Paleolithic, homonid brains grew to their present size, which in Repair the Cosmos is 10."
			}
		]
	},
	{
		"pane":"Humans",
		"resources":[
			{
				"name": "Human", // Lower Paleolithic
				"prereqs":["Homo heidelbergensis"],
				"desc": "Your current population. The more the merrier."
			},
			{
				"name":"Race", // Neolithic
				"prereqs":["Chiefdom"],
				"desc":"A race is a grouping of humans based on shared physical or social qualities into categories generally viewed as distinct by society."
			}
		],
		"actions": [
			{
				"name":"Reproduce", // Lower Paleolithic
				"prereqs":["Australopithecus"]
			},
			{
				"name":"Fertility Dance", // Upper Paleolithic
				"prereqs":["Animistic Belief"]
			},
			{
				"name":"Marriage Ceremony", // Neolithic
				"prereqs":["Chiefdom"],
			},
			{
				"name":"Harvest Festival", // Bronze
				"prereqs":["Town","Village","Hamlet"]
			},
			{
				"name":"Population Growth", // Classical
				"prereqs":["Scythe"]
			},
			{
				"name":"Baby Boom", // Atomic
				"prereqs":["Multinational Federation"]
			},
			{
				"name":"Ectogenesis", // Transhuman
				"prereqs":["Deep Space Colony"]
			}
		]
	},
	{
		"pane": "Animals",
		"resources": [
			{
				"name": "Domesticated Dog", // Neolithic
				"prereqs":["Chiefdom"],
				"desc": "You should call him Spot."
			},
			{
				"name": "Poultry", // Neolithic
				"prereqs":["Farmer","Junglefowl Herd"],
				"desc": "Poultry herd"
			},
			{
				"name": "Cow", // Neolithic
				"prereqs":["Farmer","Auroch Herd"],
				"desc": "Just a plain ol' cow."
			},
			{
				"name": "Cat", // Neolithic
				"prereqs":["Dump"],
				"desc": "Cats domesticated humans as many as 7000-8000 years ago."
			},
			{
				"name": "Pig", // Neolithic
				"prereqs":["Farmer","Boar Herd"],
				"desc": "Domesticated from wild boar, separately in the Near East and China."
			},
			{
				"name": "Sheep", // Neolithic
				"prereqs":["Farmer","Mouflon Herd"],
				"desc": "Most likely domesticated from wild mouflon around 11000 to 9000 BC."
			},
			{
				"name":"Horse", // Neolithic
				"desc":"Horses are believed to be domesticated around 3500-4000 BC.",
				"prereqs":["Tarpan Herd","Settlement"]
			},
			{
				"name":"Pet", // Classical
				"prereqs":["Kitchen"]
			}
		],
		"actions":[
			{
				"name":"Breed Dog", // Neolithic
				"prereqs":["Domesticated Dog"]
			}
		]
	},
	{
		"pane":"Transhumans",
		"resources":[
			{
				"name":"Enhanced Intelligence", // Nanotech
				"prereqs":["DNA Storage"]
			},
			{
				"name":"Enhanced Lifespan", // Nanotech
				"prereqs":["Automated Factory","Enhanced Intelligence"]
			},
			{
				"name":"Disease Resistance", // Nanotech
				"prereqs":["DNA Storage"]
			},
			{
				"name":"Enhanced Strength", // Transhuman
				"prereqs":["Deep Space Colony","Enhanced Intelligence"]
			},
			{
				"name":"Enhanced Attractiveness", // Transhuman
				"prereqs":["Deep Space Colony","Enhanced Lifespan"]
			},
			{
				"name":"Cyborg", // Transhuman
				"prereqs":["Enhanced Strength","AI Factory"]
			},
			{
				"name":"Android", // Transhuman
				"prereqs":["Cyborg","Cold Fusion"]
			},
			{
				"name":"Em", // Transhuman
				"prereqs":["Artificial Superintelligence"]
			},
			{
				"name":"AI Agent", // Transhuman
				"prereqs":["Technological Singularity"]
			},
			{
				"name":"Hivemind", // Transhuman
				"prereqs":["Em"]
			},
			{
				"name":"Winged Human", // Transhuman
				"prereqs":["Floating City"]
			},
			{
				"name":"Gilled Human", // Transhuman
				"prereqs":["Ocean Floor City"]
			}
		]
	},
	{
		"pane":"Engineered Life",
		"resources":[
			{
				"name":"De-Extinct Animal", // Nanotech
				"prereqs":["DNA Storage"]
			},
			{
				"name":"Revived Dinosaur", // Nanotech
				"prereqs":["De-Extinct Animal","Automated Factory"]
			},
			{
				"name":"Mythological Creature", // Transhuman
				"prereqs":["Em","Revived Dinosaur"]
			}
		]
	},
	{
		"pane":"Posthumans",
		"resources":[
			{
				"name":"Aliens", // Interstellar
				"prereqs":["Super Earth"]
			},
			{
				"name":"Superintelligent Agent", // Interstellar
				"prereqs":["Aliens"]
			},
			{
				"name":"Matrioshka Brain", // Galactic
				"prereqs":["Dyson Sphere","Superintelligent Agent"]
			},
			{
				"name":"Cluster Brain", // Cosmic
				"prereqs":["Black Hole Jetstream Scoop"]
			},
			{
				"name":"Hyperintelligent Agent", // Transcendent
				"prereqs":["Quantonium"]
			}
		]
	},
	{
		"pane":"Explorers",
		"resources":[
			{
				"name": "Scout", // Upper Paleolithic
				"desc": "Scouts help you find new land.",
				"prereqs":["Tribe"]
			},
			{
				"name": "Tracker", // Neolithic
				"prereqs":["Settlement"],
				"desc": "The tracker helps better understand your territory and improve hunting."
			},
			{
				"name":"Sailor", // Early Modern
				"prereqs":["Caravel"]
			},
			{
				"name":"Explorer", // Early Modern
				"prereqs":["Commercial Seaport"]
			}
		]
	},
	{
		"pane":"Food Procurement",
		"resources":[
			{
				"name": "Gatherer", // Lower Paleolithic
				"desc": "Gatherers are needed to get more food.",
				"prereqs":["Australopithecus"]
			},
			{
				"name": "Hunter", // Upper Paleolithic
				"desc": "The hunter is more skilled than the gatherer and also takes on more risk.",
				"prereqs":["Tundra"]
			},
			{
				"name": "Fisher", // Upper Paleolithic
				"desc": "A fisher catches _Fish_. Do I have to explain everything?",
				"prereqs":["Island"]
			},
			{
				"name": "Trapper", // Upper Paleolithic
				"desc": "Trappers catch animals for their fur, which allows you to make clothing.",
				"prereqs":["Tribe"]
			},
			{
				"name":"Farmer", // Neolithic
				"prereqs":["Settlement"]
			}
		]
	},
	{
		"pane":"Craftsmen",
		"resources":[
			{
				"name": "Wood Worker", // Upper Paleolithic
				"desc": "Specialized in carving wood implements",
				"prereqs":["Wood Building"]
			},
			{
				"name": "Stone Worker", // Upper Paleolithic
				"desc": "Specialist in preparing stone tools",
				"prereqs":["Wood Building"]
			},
			{
				"name":"Metalworker", // Bronze
				"prereqs":["Metalworker's Workshop"]
			},
			{
				"name":"Weaver", // Bronze
				"prereqs":["Town"]
			},
			{
				"name":"Blacksmith", // Classical
				"prereqs":["Blacksmithing"]
			}
		]
	},
	{
		"pane":"Laborers",
		"resources":[
			{
				"name": "Slave", // Neolithic
				"prereqs":["Chiefdom"],
				"desc": "Your first slaves were captured from neighboring tribes."
			},
			{
				"name":"Peasant", // Middle
				"prereqs":["Principality"]
			},
			{
				"name":"Factory Worker", // Industrial
				"prereqs":["Factory"]
			},
			{
				"name":"Office Worker", // Machine
				"prereqs":["Skyscraper"]
			}
		],
		"actions":[
			{
				"name":"Perform Slave Work", // Neolithic
				"prereqs":["Slave"]
			}
		]
	},
	{
		"pane":"Entertainers",
		"resources":[
			{
				"name": "Story Teller", // Lower Paleolithic
				"desc": "Story telling is perhaps the oldest form of entertainment."
			},
			{
				"name":"Poet", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Artist", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Musician", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Actor", // Machine
				"prereqs":["Movie"]
			}
		]
	},
	{
		"pane":"Health Workers",
		"resources":[
			{
				"name": "Herbalist", // Upper Paleolithic
				"desc": "Herbalists help you find and apply Herbs faster and also make Herbs more effective.",
				"prereqs":["Animistic Belief"]
			},
			{
				"name": "Shaman", // Upper Paleolithic
				"desc": "Beyond their religious function, shamans provide medical services.",
				"prereqs":["Shamanistic Tradition"]
			},
			{
				"name":"Healer", // Neolithic
				"prereqs":["Sense of Purpose"]
			},
			{
				"name":"Surgeon", // Middle
				"prereqs":["Professor"]
			},
			{
				"name":"Doctor", // Early Modern
				"prereqs":["Surgeon","Anatomy"]
			},
			{
				"name":"Dentist", // Industrial
				"prereqs":["Grade School"]
			}
		]
	},
	{
		"pane":"Public Safety",
		"resources":[
			{
				"name":"Guard", // Neolithic
				"prereqs":["Settlement"]
			},
			{
				"name":"Police Officer", // Machine
				"prereqs":["Metropolis"]
			},
			{
				"name":"Firefighter", // Machine
				"prereqs":["Metropolis"]
			},
			{
				"name":"Judge", //  Early Modern
				"prereqs":["Colony"]
			},
			{
				"name":"Lawyer", // Early Modern
				"prereqs":["Colony"]
			}
		]
	},
	{
		"pane":"Educators",
		"resources":[
			{
				"name":"Scribe", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Orator", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Tutor", // Classical
				"prereqs":["Philosopher"]
			},
			{
				"name":"Philosopher", // Classical
				"prereqs":["Alphabetic Language"]
			},
			{
				"name":"Professor", // Middle
				"prereqs":["University"]
			},
			{
				"name":"Journalist", // Industrial
				"prereqs":["Typewriters"]
			}
		]
	},
	{
		"pane":"Knowledge Workers",
		"resources":[
			{
				"name":"Accountant", // Early Modern
				"prereqs":["Accounting"]
			},
			{
				"name":"Scientist", // Early Modern
				"prereqs":["Colony"]
			},
			{
				"name":"Engineer", // Industrial
				"prereqs":["Thermodynamics"]
			},
			{
				"name":"Programmer", // Atomic
				"prereqs":["Mainframe"]
			}
		]
	},
	{
		"pane":"Leaders",
		"resources":[
			{
				"name":"Noble", // Middle
				"prereqs":["Castle"]
			},
			{
				"name":"Manager", // Machine
				"prereqs":["Skyscraper"]
			}
		]
	},
	{
		"pane": "Health",
		"resources": [
			{
				"name": "Immune System", // Lower Paleolithic
				"desc": "Your Immune System slows illness, but does not cure it. More immunity gives you more time to apply a cure. It grows whenever someone dies of illness.",
				"suppress_maker":1
			},
			{
				"name": "Illness", // Lower Paleolithic
				"desc": "Illness is bad. If untreated, it will kill your population. It comes from harvesting certain kinds of food.",
				"suppress_maker":1,
				"prereqs":["Australopithecus"]
			},
			{
				"name": "Infant Mortality", // Lower Paleolithic
				"desc": "As brain size grows, delivery becomes more challenging, and more children die in childbirth. This stat is the percentage change that a child dies in birth. It decreases, to a point, with attempted births.",
				"suppress_maker":1,
				"prereqs":["Australopithecus"]
			},
			{
				"name": "Disease", // Upper Paleolithic
				"desc": "Denser urban populations and close proximinty to animals creates a disease risk.",
				"suppress_maker":1,
				"prereqs":["Wood Building"]
			},
			{
				"name": "Disease Resistance", // Upper Paleolithic
				"desc": "When people die of disease, the population develops immunity.",
				"suppress_maker":1,
				"prereqs":["Disease"]
			},
			{
				"name":"Outbreak", // Neolithic
				"prereqs":["Cow","Pig","Poultry","Sheep"]
			},
			{
				"name":"Epidemic", // Bronze
				"prereqs":["Hamlet"]
			},
			{
				"name":"Pandemic", // Classical
				"prereqs":["Sea"]
			},
			{
				"name":"Bioengineered Pandemic", // Information
				"prereqs":["Farm Analytics"]
			},
			{
				"name":"Injury", // Lower Paleolithic
				"prereqs":["Australopithecus"]
			},
			{
				"name":"Addiction", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Respiratory Disease", // Upper Paleolithic
				"prereqs":["Disease"]
			},
			{
				"name":"Heart Disease", // Neolithic
				"prereqs":["Wheat Farm","Barley Farm","Rice Farm","Maize Farm"]
			},
			{
				"name":"Dementia", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Mental Illness", // Classical
				"prereqs":["Alphabetic Language"]
			},
			{
				"name":"Cancer", // Industrial
				"prereqs":["Factory"]
			}
		],
		"actions": [
			{
				"name":"Succumb to Illness", // Lower Paleolithic
				"prereqs":["Australopithecus"]
			},
			{
				"name":"Use Herbs", // Lower Paleolithic
				"prereqs":["Australopithecus"],
				"cost":["Herbs","Illness"]
			},
			{
				"name":"Catch Illness", // Lower Paleolithic
				"prereqs":["Australopithecus"]
			},
			{
				"name":"Succumb to Disease", // Upper Paleolithic
				"prereqs":["Disease"]
			}
		]
	},
	{
		"pane":"Education",
		"resources":[
			{
				"name":"Literacy", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Mathematics Skill", // Bronze
				"prereqs":["Ancient Mathematics"]
			},
			{
				"name":"University", // Middle
				"prereqs":["Foundry","Church"]
			},
			{
				"name":"Grade School", // Industrial
				"prereqs":["Nation"]
			}
		]
	},
	{
		"pane":"Crime",
		"resources":[
			{
				"name":"Crime Rate", // Classical
				"prereqs":["Empire"]
			}
		]
	},
	{
		"pane":"Well-Being",
		"resources":[
			{
				"name":"Happiness", // Lower Paleolithic
				"prereqs":["Human"]
			},
			{
				"name":"Sense of Community", // Upper Paleolithic
				"prereqs":["Tribe"]
			},
			{
				"name":"Sense of Purpose", // Neolithic
				"prereqs":["Chiefdom"]
			},
			{
				"name":"Strong Family", // Bronze
				"prereqs":["Hamlet"]
			},
			{
				"name":"Autonomy", // Middle
				"prereqs":["Mansion"]
			}
		]
	},
	{
		"pane": "Territory",
		"resources": [

		]
	},
	{
		"pane": "Homeworld",
		"resources": [

		]
	},
	{
		"pane": "Home Region",
		"resources": [
			{
				"name": "Garden of Eden", // Lower Paleolithic
				"prereqs":[],
				"desc": "You have been kicked out. Repair the Cosmos."
			},
			{
				"name": "Savannah", // Lower Paleolithic
				"desc": "A good place for hunting and scavenging.",
				"prereqs":["Garden of Eden"]
			},
			{
				"name": "Forest", // Lower Paleolithic
				"desc": "Harder to move around here.",
				"prereqs":["Savannah", "Homo habilis"]
			},
			{
				"name": "Hills", // Lower Paleolithic
				"desc": "Food is scarcer but the hills are more defensible.",
				"prereqs":["Savannah", "Homo habilis"]
			},
			{
				"name": "Valley", // Lower Paleolithic
				"desc": "Ideal place for founding a civilization.",
				"prereqs":["Savannah", "Homo habilis"]
			},
			{
				"name": "River", // Lower Paleolithic
				"desc": "Great for fishing and trade.",
				"prereqs":["Forest", "Homo erectus"]
			},
			{
				"name": "Cave", // Lower Paleolithic
				"desc": "If you're going to be a band of cavepeople, you need a cave.",
				"prereqs":["Hills", "Homo erectus"]
			}
		]
	},
	{
		"pane":"Wild Plants",
		"resources":[
			{
				"name":"Grasses", // Upper Paleolithic
				"prereqs":["Scout"]
			},
			{
				"name":"Wild Fungi", // Upper Paleolithic
				"prereqs":["Scout"]
			}
		]
	},
	{
		"pane": "Animal Herds",
		"resources": [
			{
				"name":"Tarpan Herd", // Upper Paleolithic
				"desc":"Tarpans, now extinct, may have been the wild ancestors of domesticated horses.",
				"prereqs":["Scout"]
			},
			{
				"name":"Elephant Herd", // Upper Paleolithic
				"desc":"Elephants can be found in Sub-Saharan Africa and South and Southeast Asia.",
				"prereqs":["Scout"]
			},
			{
				"name":"Mammoth Herd", // Upper Paleolithic
				"desc":"Mammoths are of the same family as elephants and may have survived as late as 2000 BC.",
				"prereqs":["Scout","Tundra"]
			},
			{
				"name":"Mouflon Herd",
				"desc":"Mouflon are wild sheep and believed to be the ancestors to domesticated sheep.",
				"prereqs":["Scout"]
			},
			{
				"name":"Auroch Herd", // Upper Paleolithic
				"desc":"Aurochs were a species of wild cattle, now extinct.",
				"prereqs":["Scout"]
			},
			{
				"name":"Bison Herd", // Upper Paleolithic
				"desc":"Of the bovine family, two species of bison remain.",
				"prereqs":["Scout"]
			},
			{
				"name":"Boar Herd", // Upper Paleolithic
				"desc":"Wild boars are the ancestors of domesticated pigs.",
				"prereqs":["Scout"]
			},
			{
				"name":"Wolf Pack", // Upper Paleolithic
				"desc":"A pack of wolves, from which dogs were domesticated.",
				"prereqs":["Scout"]
			},
			{
				"name":"Junglefowl Herd", // Upper Paleolithic
				"desc":"Modern chickens were domesticated from junglefowl.",
				"prereqs":["Scout","Jungle"]
			},
			{
				"name":"Bear Pack", // Upper Paleolithic
				"desc":"Bears are dangerous predators but maybe a good meal.",
				"prereqs":["Scout","Tundra"]
			},
			{
				"name":"Lion Pack", // Upper Paleolithic
				"desc":"King of the jungle and a dangerous predator.",
				"prereqs":["Scout"]
			},
			{
				"name":"Orangutan Herd", // Upper Paleolithic
				"desc":"Orangutans are great apes native to Indonesia and Malaysia.",
				"prereqs":["Scout","Jungle"]
			},
			{
				"name":"Hyena Pack", // Lower Paleolithic
				"desc":"Competition for scavenging.",
				"prereqs":["Savannah"]
			},
			{
				"name":"Termite Mound", // Lower Paleolithic
				"desc":"Bon Appetit",
				"prereqs":["Hills"]
			},
		]
	},
	{
		"pane":"Environment",
		"resources":[
			{
				"name":"Desertification", // Neolithic
				"prereqs":["Pasture"]
			},
			{
				"name":"Biodiversity Loss", // Early Modern
				"prereqs":["Plains"]
			},
			{
				"name":"VOCs", // Industrial
				"prereqs":["Crude Oil"]
			},
			{
				"name":"Particulates", // Industrial
				"prereqs":["Factory"]
			},
			{
				"name":"Nitrous Oxide", // Industrial
				"prereqs":["Crude Oil"]
			},
			{
				"name":"Sulfur Dioxide", // Industrial
				"prereqs":["Factory"]
			},
			{
				"name":"Ozone Depletion", // Atomic
				"prereqs":["Manufacturing Plant"]
			},
			{
				"name":"Lead Pollution", // Bronze
				"prereqs":["Lead"]
			},
			{
				"name":"Global Warming", // Atomic
				"prereqs":["Manufacturing Plant"]
			},
			{
				"name":"Nitrogen Runoff", // Early Modern
				"prereqs":["Plains"]
			},
			{
				"name":"Heavy Metal Pollution", // Industrial
				"prereqs":["Greenhouse"]
			},
			{
				"name":"Radiation Exposure", // Atomic
				"prereqs":["Uranium"]
			},
			{
				"name":"Litter", // Neolithic
				"prereqs":["Masonry Building"]
			},
			{
				"name":"Soil Erosion", // Neolithic
				"prereqs":["Wheat Farm","Barley Farm","Rice Farm","Maize Farm"]
			},
			{
				"name":"Genetic Crossover", // Atomic
				"prereqs":["Genetics"]
			},
			{
				"name":"Ocean Acidification", // Atomic
				"prereqs":["Ecology","Global Warming"]
			},
			{
				"name":"Soil Acidification", // Industrial
				"prereqs":["Greenhouse"]
			},
			{
				"name":"Wildfire", // Bronze
				"prereqs":["Hamlet"]
			}
		]
	},
	{
		"pane": "Home Continent",
		"resources": [
			{
				"name": "Tundra", // Upper Paleolithic
				"desc": "Icy territory.",
				"prereqs":["Scout","Clothing"]
			},
			{
				"name": "Jungle", // Upper Paleolithic
				"desc": "Jungle, welcome to the jungle. Watch it bring you to your shun n-n-n-n-n-n-n-n knees, knees. Uh I, I wanna watch you bleed.",
				"prereqs":["Scout"]
			},
			{
				"name": "Island", // Upper Paleolithic
				"desc": "A small island near the shore.",
				"prereqs":["Raft","Scout"]
			},
			{
				"name": "Mountain", // Neolithic
				"prereqs":["Tracker"],
				"desc": "Settlement in high mountains."
			},
			{
				"name": "Desert", // Neolithic
				"prereqs":["Desertification"],
				"desc": "Much of the world's desert today is the result of depletion from farming and grazing."
			},
			{
				"name": "Pasture", // Neolithic
				"prereqs":["Cow","Pig","Poultry","Sheep"],
				"desc": "Grassland for grazing livestock."
			},
			{
				"name": "Lake", // Bronze
				"desc": "A small, easily navigable lake.",
				"prereqs":["Town"]
			},
			{
				"name": "Archipelago", // Bronze
				"desc": "A sequence of islands that are separated by short voyages.",
				"prereqs":["Lake","Longboat"]
			},
			{
				"name": "Oasis", // Bronze
				"desc": "A good spot for a settlement in the middle of the desert.",
				"prereqs":["Desert","Village"]
			},
			{
				"name": "Sea", // Classical
				"desc": "A small, easily navigable lake.",
				"prereqs":["Smith's Workshop"]
			},
			{
				"name": "Marsh", // Classical
				"desc": "A marsh is a wetland dominated by herbacious plant species.",
				"prereqs":["Sea"]
			},
			{
				"name": "Mountain Peak", // Middle
				"desc": "It wasn't easy reaching the top.",
				"prereqs":["Alchemy","Mountain"]
			}
		]
	},
	{
		"pane": "New World",
		"resources": [
			{
				"name": "Ocean", // Early Modern
				"desc": "Open ocean.",
				"prereqs":["Naval Engineering"]
			},
			{
				"name": "Boreal Forest", // Early Modern
				"desc": "Also called Taiga, a forest dominated by coniferous species. Located in the far North.",
				"prereqs":["Tropical Island"]
			},
			{
				"name": "Tropical Island", // Early Modern
				"desc": "A small, remote island near the equator.",
				"prereqs":["Caravel"]
			},
			{
				"name": "Plains", // Early Modern
				"desc": "Wide open, New World plains.",
				"prereqs":["Tropical Island"]
			},
			{
				"name": "Swamp", // Early Modern
				"desc": "A forested wetland.",
				"prereqs":["Tropical Island"]
			},
			{
				"name": "Arctic", // Industrial
				"desc": "Defined as the Northern region where there is midnight sun and polar night.",
				"prereqs":["Ironclad"]
			},
			{
				"name": "Rain Forest", // Industrial
				"desc": "New World jungle.",
				"prereqs":["Ironclad"]
			},
			{
				"name": "Peatland", // Industrial
				"desc": "Also called a mire or quagmire. Arises from incomplete decomposition of organic matter.",
				"prereqs":["Nation","Peat Burner"]
			},
			{
				"name": "Salt Flat", // Industrial
				"desc": "Flat terrain covered with salt. I like self-explanatory names.",
				"prereqs":["Railroad"]
			},
			{
				"name": "Barren Land", // Industrial
				"desc": "Land with little to no vegetation.",
				"prereqs":["Railroad"]
			},
			{
				"name": "Permafrost", // Industrial
				"desc": "Land with permanently frozen ground.",
				"prereqs":["Ironclad"]
			},
			{
				"name": "Dunes", // Industrial
				"desc": "Large mass of wind-blown sand.",
				"prereqs":["Railroad"]
			},
			{
				"name": "Antarctica", // Machine
				"desc": "Frozen land in the South.",
				"prereqs":["Battleship"]
			}
		]
	},
	{
		"pane": "Sky",
		"resources": [
			{
				"name": "Stratosphere", // Transhuman
				"desc": "The portion of the atmosphere about 10-50 kilometers above Earth's surface.",
				"prereqs":["Ocean Floor"]
			}
		]
	},
	{
		"pane": "Underground",
		"resources": [
			{
				"name": "Ocean Floor", // Transhuman
				"desc": "Location on the surface of the ocean floor.",
				"prereqs":["Arcology"]
			},
			{
				"name": "Ocean Trench", // Transhuman
				"desc": "Location in a deep oceanic trench.",
				"prereqs":["Ocean Floor"]
			},
			{
				"name": "Subterranean", // Interstellar
				"desc": "Deep in the Earth's crust.",
				"prereqs":["Transtellar Colony","Ocean Trench"]
			},
			{
				"name": "Mantle", // Interstellar
				"desc": "Territory beneath the Earth's crust.",
				"prereqs":["Subterranean"]
			}
		]
	},
	{
		"pane": "Solar System",
		"resources": [

		]
	},
	{
		"pane": "Earth Orbit",
		"resources": [
			{
				"name": "Low Earth Orbit", // Atomic
				"desc": "Orbit around Earth, below about 2000 km.",
				"prereqs":["Launch Site"]
			},
			{
				"name": "Medium Earth Orbit", // Atomic
				"desc": "Orbit around Earth, from 2000 km to geosynchronous orbit (~36000 km)",
				"prereqs":["Launch Site"]
			},
			{
				"name": "Geosynchronous Orbit", // Atomic
				"desc": "About 36000 above Earth's surface, satellites here have an orbital period of 24 hours and can stay at a stationary point in the sky.",
				"prereqs":["Launch Site"]
			},
			{
				"name": "Cislunar Space", // Atomic
				"desc": "Area beyond geosynchronous orbit but there objects can have stable Earth orbits.",
				"prereqs":["Launch Site"]
			}
		]
	},
	{
		"pane": "Moon",
		"resources": [
			{
				"name": "Lunar Mare", // Atomic
				"desc": "Basaltic plains on the moon.",
				"prereqs":["Laser"]
			},
			{
				"name": "Lunar Crater", // Atomic
				"desc": "Impact crater that may provide good shielding for a base.",
				"prereqs":["Laser"]
			},
			{
				"name": "Lunar Cave", // Atomic
				"desc": "Lava tubes in the Moon can be quite large and good places for cities.",
				"prereqs":["Laser"]
			},
			{
				"name": "Lunar Hill", // Atomic
				"desc": "A hill on the Moon.",
				"prereqs":["Laser"]
			}
		]
	},
	{
		"pane": "Mars",
		"resources": [
			{
				"name": "Martian Planum", // Information
				"desc": "Flat region on Mars.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Martian Mountain", // Information
				"desc": "A mountain on Mars.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Martian Mare", // Information
				"desc": "Mares were once thought to be seas.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Martian Crater", // Information
				"desc": "An impact crater on Mars.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Martian Canyon", // Information
				"desc": "A canyon on Mars. Valles Marineris is the largest canyon system in the Solar System and might be a good colonization target.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Martian Pole", // Information
				"desc": "Polar regions on Mars.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Terraformed Mars", // Interstellar
				"desc": "A section of Mars that has been terraformed to Earthlike conditions.",
				"prereqs":["Transtellar Factory","Mars City"]
			}
		]
	},
	{
		"pane": "Venus",
		"resources": [
			{
				"name": "Venus Clouds", // Information
				"desc": "Clouds in the upper region of Venus.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Venus Highlands", // Nanotech
				"desc": "High altitude territory on the surface of Venus",
				"prereqs":["Venus Floating City"]
			},
			{
				"name": "Venus Lowlands", // Nanotech
				"desc": "Low altitude territory on the surface of Venus",
				"prereqs":["Venus Floating City"]
			},
			{
				"name": "Terraformed Venus", // Interstellar
				"desc": "A section of Venus that has been terraformed to Earthlike conditions.",
				"prereqs":["Transtellar Factory","Venus Surface City"]
			}
		]
	},
	{
		"pane": "Rocky Surface",
		"resources": [
			{
				"name": "Mercury", // Nanotech
				"desc": "The closest planet to the Sun.",
				"prereqs":["Venus Clouds"]
			},
			{
				"name": "Asteroid", // Nanotech
				"desc": "A small object, concentrated heavily between Mars and Jupiter.",
				"prereqs":["Martian Planum","Martian Mountain","Martian Mare","Martian Crater","Martian Canyon","Martian Pole"]
			},
			{
				"name": "Ceres", // Nanotech
				"desc": "Ceres is the largest object in the Asteroid Belt.",
				"prereqs":["Asteroid"]
			}
		]
	},
	{
		"pane": "Jupiter",
		"resources": [
			{
				"name": "Jupiter Clouds", // Nanotech
				"desc": "The largest planet in the Solar System.",
				"prereqs":["Fusion Power Plant","Asteroid"]
			},
			{
				"name": "Io", // Nanotech
				"desc": "Io is a moon of Jupiter.",
				"prereqs":["Jupiter Clouds"]
			},
			{
				"name": "Europa", // Nanotech
				"desc": "Europa is a moon of Jupiter.",
				"prereqs":["Jupiter Clouds"]
			},
			{
				"name": "Ganymede", // Nanotech
				"desc": "Ganymede is a moon of Jupiter.",
				"prereqs":["Jupiter Clouds"]
			},
			{
				"name": "Callisto", // Nanotech
				"desc": "Callisto is a moon of Jupiter.",
				"prereqs":["Jupiter Clouds"]
			}
		]
	},
	{
		"pane": "Saturn",
		"resources": [
			{
				"name": "Saturn Clouds", // Nanotech
				"desc": "The second largest planet in the Solar System.",
				"prereqs":["Jupiter Clouds","Artificial General Intelligence"]
			},
			{
				"name": "Titan", // Nanotech
				"desc": "A moon of Saturn, Titan is rich in hydrocarbons.",
				"prereqs":["Saturn Clouds"]
			},
			{
				"name": "Enceladus", // Nanotech
				"desc": "Enceladus has active geyser systems as is of great interest for astrobiology.",
				"prereqs":["Saturn Clouds"]
			}
		]
	},
	{
		"pane": "Ice Giants",
		"resources": [
			{
				"name": "Uranus", // Nanotech
				"desc": "We're too sophisticated for a joke here.",
				"prereqs":["Saturn Clouds","Semiotic Communication"]
			},
			{
				"name": "Titania", // Nanotech
				"desc": "Titania is a moon of Uranus.",
				"prereqs":["Uranus"]
			},
			{
				"name": "Oberon", // Nanotech
				"desc": "Oberon is a moon of Uranus.",
				"prereqs":["Uranus"]
			},
			{
				"name": "Neptune", // Nanotech
				"desc": "The outermost gas planet.",
				"prereqs":["Saturn Clouds","Semiotic Communication"]
			},
			{
				"name": "Neptune Subsurface", // Transhuman
				"desc": "Territory beneath Neptune's surface. Might be a place for a city.",
				"prereqs":["Core Mine"]
			},
			{
				"name": "Triton", // Nanotech
				"desc": "Triton is a moon of Neptune and might be a captured Kuiper Belt Object.",
				"prereqs":["Neptune"]
			}
		]
	},
	{
		"pane": "Kuiper Belt",
		"resources": [
			{
				"name": "Pluto", // Transhuman
				"desc": "Pluto is a dwarf planet and one of the larget Kuiper Belt Objects.",
				"prereqs":["Kuiper Belt Object"]
			},
			{
				"name": "Kuiper Belt Object", // Transhuman
				"desc": "A small, rocky object beyond Neptune.",
				"prereqs":["Deep Space Colony","Transneptunian Space"]
			},
			{
				"name": "Sednoid", // Transhuman
				"desc": "Sednoids, such as Sedna, are object which may extend well beyond the Kuiper cliff.",
				"prereqs":["Starport"]
			},
			{
				"name": "Planet Nine", // Transhuman
				"desc": "Planet Nine is a hypothetical super-Earth planet in the outer reaches of the solar system.",
				"prereqs":["Sednoid"]
			}
		]
	},
	{
		"pane": "Solar Space",
		"resources": [
			{
				"name": "Sun", // Transhuman
				"desc": "Territory near the surface of the Sun.",
				"prereqs":["Venus Surface City"]
			},
			{
				"name": "Inner Solar System", // Information
				"desc": "Free space within the Asteroid Belt.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Outer Solar System", // Information
				"desc": "Free space beyond the Asteroid Belt and within the Kuiper Belt.",
				"prereqs":["Space Station"]
			},
			{
				"name": "Transneptunian Space", // Nanotech
				"desc": "Free space beyond the Kuiper Belt and within the Oort Cloud",
				"prereqs":["Uranus","Neptune"]
			},
			{
				"name": "Oort Cloud", // Interstellar
				"desc": "The outermost free space that can maintain stable orbits around the Sun.",
				"prereqs":["Transtellar Colony"]
			}
		]
	},
	{
		"pane": "Home Galaxy",
		"resources": [

		]
	},
	{
		"pane": "Transtellar",
		"resources": [
			{
				"name": "Transtellar Space", // Interstellar
				"desc": "Territory not near any star.",
				"prereqs":["Oort Cloud"]
			},
			{
				"name": "Rogue Planet", // Interstellar
				"desc": "There may be 100,000 rogue planets, or planets not in orbit around stars, for every star in the Milky Way.",
				"prereqs":["Transtellar Space"]
			},
			{
				"name": "Brown Dwarf", // Interstellar
				"desc": "A ball of hydrogen that is typically larger than Jupiter but still insufficient to sustain nuclear fusion.",
				"prereqs":["Transtellar Space"]
			}
		]
	},
	{
		"pane": "Nearby Star",
		"resources": [
			{
				"name": "Red Dwarf", // Interstellar
				"desc": "Red dwarfs are the smallest and most common types of star.",
				"prereqs":["Solar Civilization","Transtellar Space"]
			},
			{
				"name": "G-Type Star", // Interstellar
				"desc": "A star of about the same size and temperature as the Sun.",
				"prereqs":["Solar Civilization","Transtellar Space"]
			},
			{
				"name": "Red Giant", // Interstellar
				"desc": "A large, short-lived star.",
				"prereqs":["Solar Civilization","Transtellar Space"]
			},
			{
				"name": "Water Planet", // Interstellar
				"desc": "A planet entirely covered by ocean.",
				"prereqs":["Red Dwarf","G-Type Star","Red Giant"]
			},
			{
				"name": "Desert Planet", // Interstellar
				"desc": "A dry planet.",
				"prereqs":["Red Dwarf","G-Type Star","Red Giant"]
			},
			{
				"name": "Chthonian Planet", // Interstellar
				"desc": "A rocky planet very close to its host star.",
				"prereqs":["Red Dwarf","G-Type Star","Red Giant"]
			},
			{
				"name": "Hot Jupiter", // Interstellar
				"desc": "A Jupiter-sized gas planet close to its host star.",
				"prereqs":["Red Dwarf","G-Type Star","Red Giant"]
			},
			{
				"name": "Hot Neptune", // Interstellar
				"desc": "A Neptune-sized gas planet close to its host star.",
				"prereqs":["Red Dwarf","G-Type Star","Red Giant"]
			},
			{
				"name": "Super Earth", // Interstellar
				"desc": "A rocky planet larger than Earth.",
				"prereqs":["Red Dwarf","G-Type Star","Red Giant"]
			}
		]
	},
	{
		"pane": "Galactic Space",
		"resources": [
			{
				"name": "Orion Arm", // Interstellar
				"desc": "The Orion Arm is our sector of the Milky Way galaxy.",
				"prereqs":["Chthonian Planet"]
			},
			{
				"name": "Milky Way", // Galactic
				"desc": "Space throughout the galaxy.",
				"prereqs":["Matrioshka Brain"]
			},
			{
				"name": "Black Hole", // Galactic
				"desc": "Beyond the event horizon of a black hole, nothing can escape.",
				"prereqs":["Milky Way"]
			},
			{
				"name": "Neutron Star", // Galactic
				"desc": "Ultradense remnants of a large star that has exploded.",
				"prereqs":["Milky Way"]
			},
			{
				"name": "White Dwarf", // Galactic
				"desc": "Remnants of a nova.",
				"prereqs":["Milky Way"]
			},
			{
				"name": "Star Cluster", // Galactic
				"desc": "A dense region of gravitationally bound stars.",
				"prereqs":["Milky Way"]
			},
			{
				"name": "Nebula", // Galactic
				"desc": "The remains of a supernova.",
				"prereqs":["Milky Way"]
			},
			{
				"name": "Blue Supergiant", // Galactic
				"desc": "One of the largest, brightest, and hottest types of stars there is.",
				"prereqs":["Milky Way"]
			},
			{
				"name": "Galactic Core", // Galactic
				"desc": "The core of the Milky Way galaxy. A supermassive black hole lurks here.",
				"prereqs":["Artificial Planet"]
			}
		]
	},
	{
		"pane":"Galactic Discoveries",
		"resources":[
			{
				"name":"Interstellar Flora", // Interstellar
				"prereqs":["Water Planet","Super Earth"]
			},
			{
				"name":"Interstellar Fauna", // Interstellar
				"prereqs":["Interstellar Flora"]
			},
			{
				"name":"Abandoned Civilization", // Galactic
				"prereqs":["Star Cluster"]
			}
		]
	},
	{
		"pane": "Universe",
		"resources": [

		]
	},
	{
		"pane": "Local Group",
		"resources": [
			{
				"name": "Intergalactic Space", // Galactic
				"desc": "Space between galaxies. There are a few stars here.",
				"prereqs":["Wormhole","Atomic Assembler"]
			},
			{
				"name": "Dwarf Galaxy", // Galactic
				"desc": "A small galaxy. Small is relative.",
				"prereqs":["Intergalactic Space"]
			},
			{
				"name": "Elliptical Galaxy", // Galactic
				"desc": "Has an ellipsoidal shape.",
				"prereqs":["Intergalactic Space"]
			},
			{
				"name": "Spiral Galaxy", // Galactic
				"desc": "Has a spiral shape, like the Milky Way.",
				"prereqs":["Intergalactic Space"]
			}
		]
	},
	{
		"pane": "Home Supercluster",
		"resources": [
			{
				"name": "Virgo Supercluster", // Galactic
				"desc": "Space throughout the Virgo Supercluster.",
				"prereqs":["Intergalactic Space","Nucleonic Biology"]
			},
			{
				"name": "Galaxy Group", // Galactic
				"desc": "A gravitationally bound aggregation of up to 50 galaxies. Smaller than a cluster, but still nothing to sneeze at.",
				"prereqs":["Virgo Supercluster"]
			},
			{
				"name": "Galaxy Cluster", // Galactic
				"desc": "A structure of hundreds or thousands of galaxies. Examples include the Virgo Cluster, Formax Cluster, Hercules Cluster, and Coma Cluster.",
				"prereqs":["Virgo Supercluster"]
			}
		]
	},
	{
		"pane": "Observable Universe",
		"resources": [
			{
				"name": "Supercluster", // Cosmic
				"desc": "A distant supercluster, like the Virgo Supercluster.",
				"prereqs":["Quantum Assembler","Warp Ship"]
			},
			{
				"name": "Void", // Cosmic
				"desc": "A relatively empty section of the observable universe. There are still some galaxies here, though.",
				"prereqs":["Quantum Assembler","Warp Ship"]
			},
			{
				"name": "Quasar", // Cosmic
				"desc": "A quasar (quasi-stellar object) is an extremely luminous active galactic nucleus.",
				"prereqs":["Supercluster"]
			},
			{
				"name": "Blazar", // Transcendent
				"desc": "An active galactic nuclear with an extremely bright relativistic jet of ionized matter.",
				"prereqs":["Distant Bubble"]
			}
		]
	},
	{
		"pane":"Universal Discoveries",
		"resources":[
			{
				"name":"Abandoned Megastructure", // Cosmic
				"prereqs":["Intercluster Civilization"]
			}
		]
	},
	{
		"pane": "Cosmos",
		"resources": [

		]
	},
	{
		"pane": "Local Cosmic Bubble",
		"resources": [
			{
				"name": "Distant Space", // Transcendent
				"desc": "Space beyond the cosmic horizon and within the cosmic inflationary bubble.",
				"prereqs":["Distant Civilization"]
			},
			{
				"name": "Distant Past", // Transcendent
				"desc": "Space existing far in the past.",
				"prereqs":["Distant Space"]
			},
			{
				"name": "Distant Future", // Transcendent
				"desc": "Space existing far in the future.",
				"prereqs":["Distant Space"]
			}
		]
	},
	{
		"pane": "Multiverse",
		"resources": [
			{
				"name": "Distant Bubble", // Transcendent
				"desc": "Another pocket of non-inflating space at some unquantifiable distance.",
				"prereqs":["Distant Space"]
			},
			{
				"name": "Hyperspace", // Transcendent
				"desc": "'Space' with more than three non-compact spatial dimensions.",
				"prereqs":["Dimensional Portal"]
			},
			{
				"name": "Branespace", // Transcendent
				"desc": "High dimensional space as predicted by brane cosmology.",
				"prereqs":["Hyperspace"]
			},
			{
				"name": "Manifold", // Transcendent
				"desc": "Some bizarre manifold.",
				"prereqs":["Branespace"]
			},
			{
				"name": "Time Manifold", // Transcendent
				"desc": "A manifold of space-time with multiple time dimensions.",
				"prereqs":["Dimensional Portal"]
			},
			{
				"name": "Parallel Universe", // Transcendent
				"desc": "A universe like ours but different somehow.",
				"prereqs":["Hyperspace"]
			},
			{
				"name": "Subdimensional Universe", // Transcendent
				"desc": "A parallel universe that exists on a sub-Planck scale.",
				"prereqs":["Branespace"]
			}
		]
	},
	{
		"pane": "Ultimate Ensemble",
		"resources": [
			{
				"name": "Megaverse", // Transcendent
				"desc": "A physical structure that sits above the multiverse.",
				"prereqs":["Manifold"]
			},
			{
				"name": "Alternate Reality", // Transcendent
				"desc": "An unknown place with very different physical properties.",
				"prereqs":["Hypercomputer"]
			}
		]
	},
	{
		"pane":"Cosmic Discoveries",
		"resources":[
			{
				"name":"Space Whale", // Transcendent
				"prereqs":["Distant Bubble"]
			}
		]
	},
	{
		"pane":"Space Environment",
		"resources":[
			{
				"name":"Space Junk", // Nanotech
				"prereqs":["Orbital Factory"]
			},
			{
				"name":"Spacetime Breakdown", // Cosmic
				"prereqs":["Cluster Brain"]
			},
			{
				"name":"Vacuum Collapse", // Transcendent
				"prereqs":["Hyperspace"]
			}
		]
	},
	{
		"pane": "Resources",
		"resources": [
			{
				"name":"Money", // Bronze
				"prereqs":["Lake","Silver","Gold"]
			}
		],
		"actions":[

		]
	},
	{
		"pane": "Food",
		"resources": [

		]
	},
	{
		"pane":"Farms",
		"resources":[
			{
				"name": "Wheat Farm", // Neolithic
				"prereqs":["Domesticated Wheat"],
				"desc": "A farm for growing wheat."
			},
			{
				"name": "Barley Farm", // Neolithic
				"prereqs":["Domesticated Barley"],
				"desc": "A farm for growing barley."
			},
			{
				"name": "Rice Farm", // Neolithic
				"prereqs":["Domesticated Rice"],
				"desc": "A farm for growing rice."
			},
			{
				"name": "Maize Farm", // Neolithic
				"prereqs":["Domesticated Maize"],
				"desc": "A farm for growing maize (that's corn for you Yanks)."
			},
			{
				"name":"Vegetable Farm", // Neolithic
				"prereqs":["Irrigation Canals"]
			},
			{
				"name": "Orchard", // Neolithic
				"prereqs":["Irrigation Canals"],
				"desc": "Grow fresh fruit."
			},
			{
				"name":"Garden", // Bronze
				"prereqs":["Archipelago"]
			},
			{
				"name":"Greenhouse", // Industrial
				"prereqs":["Natural Gas"]
			},
			{
				"name":"Megafarm",// Machine
				"prereqs":["Synthetic Fertilizer"]
			},
			{
				"name":"Organic Farm", // Machine
				"prereqs":["Megafarm"]
			},
			{
				"name":"Hydroponics", // Atomic
				"prereqs":["Carbon Fiber","Recycling Plant"]
			},
			{
				"name":"Aquaponics", // Information
				"prereqs":["Hydroponics","Agricultural Robot"]
			},
			{
				"name":"Aeroponics", // Information
				"prereqs":["Aquaponics"]
			},
			{
				"name":"Vertical Farm", // Nanotech
				"prereqs":["Fusion Power Plant"]
			},
			{
				"name":"Protein Bioreactor", // Nanotech
				"prereqs":["Vertical Farm","Synfuel Generator"]
			}
		]
	},
	{
		"pane":"Farming Tools",
		"resources":[
			{
				"name":"Plow", // Bronze
				"prereqs":["Bronze Tools"]
			},
			{
				"name":"Scythe", // Classical
				"prereqs":["Sea"]
			},
			{
				"name":"Fertilizer", // Industrial
				"prereqs":["Greenhouse"]
			},
			{
				"name":"Synthetic Fertilizer", // Machine
				"prereqs":["Metropolis"]
			},
			{
				"name":"Pesticide", // Machine
				"prereqs":["Megafarm"]
			},
			{
				"name":"Tractor", // Machine
				"prereqs":["Megafarm","Car"]
			},
			{
				"name":"Agricultural Robot", // Information
				"prereqs":["Machine Learning","Megafarm"]
			}
		]
	},
	{
		"pane": "Farmed Food",
		"resources": [
			{
				"name": "Wheat", // Neolithic
				"prereqs":["Wheat Farm"],
				"desc": "Stockpile of wheat."
			},
			{
				"name": "Barley", // Neolithic
				"prereqs":["Barley Farm"],
				"desc": "Stockpile of barley."
			},
			{
				"name": "Rice", // Neolithic
				"prereqs":["Rice Farm"],
				"desc": "Stockpile of rice."
			},
			{
				"name": "Maize", // Neolithic
				"prereqs":["Maize Farm"],
				"desc": "Stockpile of maize."
			},
			{
				"name": "Fruit", // Neolithic
				"prereqs":["Orchard"],
				"desc": "Fresh fruit from an orchard."
			},
			{
				"name":"Vegetable", // Neolithic
				"prereqs":["Vegetable Farm"]
			},
			{
				"name": "Beef", // Neolithic
				"prereqs":["Cow"],
				"desc": "It's what's for dinner"
			},
			{
				"name": "Pork", // Neolithic
				"prereqs":["Pig"],
				"desc": "From pigs"
			},
			{
				"name": "Mutton", // Neolithic
				"prereqs":["Sheep"],
				"desc": "It's lamb from young sheep and mutton from older sheep."
			},
			{
				"name": "Poultry Meat", // Neolithic
				"prereqs":["Poultry"],
				"desc": "From chickens, turkeys, etc."
			},
			{
				"name":"Synthetic Protein", // Nanotech
				"prereqs":["Protein Bioreactor"]
			}
		]
	},
	{
		"pane": "Wild Food",
		"resources": [
			{
				"name": "Wild Mushrooms", // Lower Paleolithic
				"desc": "Wild mushrooms are good food.",
				"prereqs":["Forest", "Gatherer"]
			},
			{
				"name": "Carrion", // Lower Paleolithic
				"desc": "Not the most appetizing meal, but an important source of protein early in history.",
				"prereqs":["Savannah", "Gatherer"]
			},
			{
				"name": "Wild Grains", // Lower Paleolithic
				"desc": "Before domestication, cereals were harvested from the wild.",
				"prereqs":["Savannah", "Gatherer"]
			},
			{
				"name": "Wild Fruit", // Lower Paleolithic
				"desc": "A rare and delicious treat.",
				"prereqs":["Savannah", "Gatherer"]
			},
			{
				"name": "Nuts", // Lower Paleolithic
				"desc": "High protein food that doesn't fight back.",
				"prereqs":["Valley", "Gatherer"]
			},
			{
				"name": "Eggs", // Lower Paleolithic
				"desc": "Before animal husbandry is invented, you gather eggs from the wild.",
				"prereqs":["Hills", "Gatherer"]
			},
			{
				"name": "Berries", // Lower Paleolithic
				"desc": "Berries are delicious, but they will make you sick if you're not careful.",
				"prereqs":["River", "Gatherer"]
			},
			{
				"name": "Game Meat", // Upper Paleolithic
				"desc": "Meat from hunted animals.",
				"prereqs":["Hunter"]
			},
			{
				"name": "Megafauna Meat", // Upper Paleolithic
				"desc": "Meat from large animals. Be careful not to overhunt them.",
				"prereqs":["Hunter"]
			},
			{
				"name": "Fish", // Upper Paleolithic
				"desc": "Half the time you pull out old boots.",
				"prereqs":["Fisher"]
			}
		]
	},
	{
		"pane": "Nutrition",
		"resources": [
			{
				"name": "Food", // Lower Paleolithic
				"desc": "Food is your most basic resource and needed to grow your civilization."
			},
			{
				"name": "Protein", // Lower Paleolithic
				"desc": "Concentrated nutritional energy. It is essential for growing your strength and endurance."
			}
		],
		"actions": [
			{
				"name":"Eat Mushrooms", // Lower Paleolithic
				"grant":["Food","Knowledge of Mushrooms"],
				"cost":["Wild Mushrooms"]
			},
			{
				"name":"Eat Carrion", // Lower Paleolithic
				"grant":["Food","Protein"],
				"cost":["Carrion"]
			},
			{
				"name":"Eat Grains", // Lower Paleolithic
				"grant":["Food"],
				"cost":["Wild Grains"]
			},
			{
				"name":"Eat Fruit", // Lower Paleolithic
				"grant":["Food"],
				"cost":["Wild Fruit"]
			},
			{
				"name":"Eat Nuts", // Lower Paleolithic
				"grant":["Food","Protein"],
				"cost":["Nuts"]
			},
			{
				"name":"Eat Eggs", // Lower Paleolithic
				"grant":["Food","Protein"],
				"cost":["Eggs"]
			},
			{
				"name":"Eat Berries", // Lower Paleolithic
				"grant":["Food","Knowledge of Berries"],
				"cost":["Berries"]
			},
			{
				"name":"Eat Game Meat", // Upper Paleolithic
				"prereqs":["Game Meat"]
			},
			{
				"name":"Eat Megafauna Meat", // Upper Paleolithic
				"prereqs":["Megafauna Meat"]
			},
			{
				"name":"Eat Fish", // Upper Paleolithic
				"prereqs":["Fish"]
			},
			{
				"name":"Eat Cooked Meat", // Upper Paleolithic
				"prereqs":["Cooked Meat"]
			}
		]
	},
	{
		"pane": "Food Knowledge",
		"resources": [
			{
				"name": "Knowledge of Mushrooms", // Lower Paleolithic
				"desc": "Through some unfortunate trial and error, you are learning which mushrooms won't make you sick."
			},
			{
				"name": "Knowledge of Berries", // Lower Paleolithic
				"desc": "White and yellow, kill a fellow. Purple and blue, good for you. Red could be good, could be dead."
			},
			{
				"name": "Domesticated Wheat", // Neolithic
				"prereqs":["Farmer"],
				"desc": "This resource represents the quality of your bred genetic stock for wheat."
			},
			{
				"name": "Domesticated Barley", // Neolithic
				"prereqs":["Farmer"],
				"desc": "This resource represents the quality of your bred genetic stock for barley."
			},
			{
				"name": "Domesticated Rice", // Neolithic
				"prereqs":["Farmer"],
				"desc": "This resource represents the quality of your bred genetic stock for rice."
			},
			{
				"name": "Domesticated Maize", // Neolithic
				"prereqs":["Farmer"],
				"desc": "This resource represents the quality of your bred genetic stock for maize."
			},
			{
				"name":"Crop Rotation", // Middle
				"prereqs":["Forge"]
			},
			{
				"name":"Ag Extension", // Industrial
				"prereqs":["Greenhouse"]
			},
			{
				"name":"GMO Crops", // Information
				"prereqs":["Megacity","Genetics"]
			},
			{
				"name":"GMO Livestock", // Information
				"prereqs":["GMO Crops"]
			},
			{
				"name":"Farm Analytics", // Information
				"prereqs":["Agricultural Robot"]
			}
		]
	},
	{
		"pane": "Food Commodities",
		"resources": [
			{
				"name": "Herbs", // Lower Paleolithic
				"desc": "Cure illness. Use them on the Population tab.",
				"prereqs":["River"]
			},
			{
				"name": "Salt", // Bronze
				"desc": "Salt trade goes back to Neolithic times. It is used for flavoring and food preservation.",
				"prereqs":["Plow"]
			},
			{
				"name": "Cacao", // Bronze
				"desc": "The cacao tree is native to the Amazon basin. Consumption goes as far back as the Olmeca civilization.",
				"prereqs":["Plow","Jungle"]
			},
			{
				"name": "Spices", // Classical
				"desc": "The spice trade was developed in the Indian subcontinent and Middle East by as early as 2000 BC. Spices are used for flavoring and coloring food and for perfume, medicine, cosmetics, and ritual functions.",
				"prereqs":["Kitchen"]
			},
			{
				"name": "Tobacco", // Bronze
				"desc": "Cultivation of tobacco goes back to Mexico around 1400-1000 BC.",
				"prereqs":["Plow"]
			},
			{
				"name": "Tea", // Classical
				"desc": "Tea drinking goes back to Han China.",
				"prereqs":["Kitchen"]
			},
			{
				"name": "Coffee", // Early Modern
				"desc": "Coffee drinking goes back to the 15th century. Could there have been an Industrial Revolution without coffee? I don't think so.",
				"prereqs":["Commercial Seaport"]
			},
			{
				"name":"Flower", // Bronze
				"prereqs":["Plow"]
			}
		]
	},
	{
		"pane": "Processed Food",
		"resources": [
			{
				"name": "Cooked Meat", // Upper Paleolithic
				"desc": "Cooking meat makes it more nutritious and less likely to make you sick.",
				"prereqs":["Game Meat"]
			},
			{
				"name": "Milk", // Neolithic
				"prereqs":["Cow"],
				"desc": "Humans began drinking milk from other mammals during the Neolitic Revolution, as far back as 9000 BC in Mesopotamia."
			},
			{
				"name": "Cheese", // Neolithic
				"prereqs":["Milk"],
				"desc": "Cheese is known to the archeological records in 5500 BC, and maybe earlier."
			},
			{
				"name":"Flour", // Neolithic
				"prereqs":["Wheat","Granary"]
			},
			{
				"name": "Bread", // Neolithic
				"desc": "Evidence of starch consumption goes back 30,000 years, and bread became a mainstream food item in the Neolithic Revolution."
			},
			{
				"name":"Pasta", // Middle
				"prereqs":["Crop Rotation"]
			},
			{
				"name":"Alcohol", // Neolithic
				"prereqs":["Wheat","Barley","Rice","Maize"]
			},
			{
				"name":"Juice", // Bronze
				"prereqs":["Plow","Orchard"]
			}
		],
		"actions":[
			{
				"name":"Cook Game Meat", // Upper Paleolithic
				"prereqs":["Game Meat"]
			},
			{
				"name":"Cook Fish", // Upper Paleolithic
				"prereqs":["Fish"]
			},
			{
				"name":"Cook Megafauna Meat", // Upper Paleolithic
				"prereqs":["Megafauna Meat"]
			}
		]
	},
	{
		"pane":"Cooking",
		"resources":[
			{
				"name": "Cookstove", // Lower Paleolithic
				"desc": "Needed to cook food.",
				"prereqs":["Fire Pit"]
			},
			{
				"name": "Millstone", // Neolithic
				"prereqs":["Granary","Stone"],
				"desc": "For grinding grains and nuts."
			},
			{
				"name":"Kitchen", // Classical
				"prereqs":["Smith's Workshop"]
			}
		]
	},
	{
		"pane":"Cuisine",
		"resources":[
			{
				"name":"Pizza", // Industrial
				"prereqs":["Restaurant"]
			},
			{
				"name":"Hamburger", // Atomic
				"prereqs":["Franchise"]
			},
			{
				"name":"Sushi", // Industrial
				"prereqs":["Restaurant"]
			},
			{
				"name":"Ice Cream", // Machine
				"prereqs":["Refrigerator"]
			},
			{
				"name":"Taco", // Industrial
				"prereqs":["Restaurant"]
			},
			{
				"name":"Fine Cuisine", // Classical
				"prereqs":["Kitchen"]
			},
			{
				"name":"Frozen Dinner", // Atomic
				"prereqs":["Franchise","Supermarket"]
			}
		]
	},
	{
		"pane": "Dining",
		"resources": [
			{
				"name": "Dining Hall", // Neolithic
				"prereqs":["Granary","Masonry Building"],
				"desc": "A central place to serve meals."
			},
			{
				"name":"Cafe", // Early Modern
				"prereqs":["Coffee"]
			},
			{
				"name":"Restaurant", // Industrial
				"prereqs":["Grade School"]
			},
			{
				"name":"Franchise", // Atomic
				"prereqs":["Freeway"]
			},
			{
				"name":"Dark Kitchen", // Information
				"prereqs":["Farm Analytics"]
			}
		],
		"actions":[
			{
				"name":"Feast", // Neolithic
				"prereqs":["Dining Hall"]
			}
		]
	},
	{
		"pane":"Food Retail",
		"resources":[
			{
				"name":"Grocer", // Early Modern
				"prereqs":["Grain Warehouse"]
			},
			{
				"name":"Farmers Market", // Machine
				"prereqs":["Organic Farm"]
			},
			{
				"name":"Supermarket", // Machine
				"prereqs":["Megafarm"]
			}
		]
	},
	{
		"pane":"Food Distribution",
		"resources":[
			{
				"name": "Grain Storage", // Lower Paleolithic
				"desc": "Store grain in caves.",
				"prereqs":["Wild Grains","Cave Dwelling"]
			},
			{
				"name": "Granary", // Neolithic
				"prereqs":["Settlement"],
				"desc": "Ancient granaries are storehouses for grain, generally built with pottery."
			},
			{
				"name":"Grain Warehouse", // Early Modern
				"prereqs":["Peat Burner"]
			}
		]
	},
	{
		"pane": "Mining",
		"resources": [
			{
				"name":"Mining Pit", // Upper Paleolithic
				"prereqs":["Stone Building"]
			},
			{
				"name":"Mine", // Bronze
				"prereqs":["City","Mining Pit"]
			},
			{
				"name":"Shaft Mine", // Industrial
				"prereqs":["Company Town"]
			},
			{
				"name":"Modern Mine", // Atomic
				"prereqs":["Manufacturing Plant"]
			},
			{
				"name":"Deep Sea Mine", // Information
				"prereqs":["Modern Mine","Carbon Nanotubes"]
			},
			{
				"name":"Core Mine", // Transhuman
				"prereqs":["Ocean Floor City"]
			},
			{
				"name":"Digging Tools", // Neolithic
				"prereqs":["Slave"]
			},
			{
				"name":"Excavator", // Industrial
				"prereqs":["Shaft Mine"]
			}
		]
	},
	{
		"pane":"Energy Extraction",
		"resources":[
			{
				"name":"Oil Well", // Machine
				"prereqs":["Crude Oil","Metropolis"]
			},
			{
				"name":"Refinery", // Machine
				"prereqs":["Oil Pipeline","Assembly Plant"]
			},
			{
				"name":"Gas Well", // Machine
				"prereqs":["Natural Gas","Metropolis"]
			}
		]
	},
	{
		"pane":"Space Resources",
		"resources":[
			{
				"name":"Asteroid Mine", // Nanotech
				"prereqs":["Asteroid","Cloud Robotics"]
			},
			{
				"name":"Lunar Ice Mine", // Nanotech
				"prereqs":["Lunar Colony"]
			},
			{
				"name":"Lunar KREEP Mine", // Nanotech
				"prereqs":["Lunar Ice Mine","Automated Factory"]
			},
			{
				"name":"Martian Mine", // Nanotech
				"prereqs":["Martian Colony","Lunar Ice Mine"]
			},
			{
				"name":"Kuiper Belt Mine", // Transhuman
				"prereqs":["Kuiper Belt Outpost"]
			},
			{
				"name":"Jovian Scoop", // Interstellar
				"prereqs":["Planet Cloud"]
			},
			{
				"name":"Planet Disassembler", // Galactic
				"prereqs":["Dyson Sphere"]
			},
			{
				"name":"Star Scoop", // Galactic
				"prereqs":["Planet Disassembler"]
			},
			{
				"name":"Induced Supernova", // Cosmic
				"prereqs":["Black Hole Jetstream Scoop"]
			},
			{
				"name":"Black Hole Jetstream Scoop", // Cosmic
				"prereqs":["Intergalactic Empire"]
			},
			{
				"name":"Multiverse Mine", // Transcendent
				"prereqs":["Branespace"]
			}
		]
	},
	{
		"pane": "Metals",
		"resources": [
			{
				"name": "Copper", // Bronze
				"desc": "The earliest known copper working is observed around 5000 BC, inaugurating the Chalcolithic era.",
				"prereqs":["Mine"]
			},
			{
				"name": "Tin", // Bronze
				"desc": "The use of tin goes back to about 3000 BC, primary in bronze.",
				"prereqs":["Mine"]
			},
			{
				"name": "Iron", // Classical
				"desc": "Meteoric iron was in use by 3500 BC, but the smelting of iron was developed by the Hittites around 1500-1200 BC, inaugurating the Iron Age.",
				"prereqs":["Empire","Mine"]
			},
			{
				"name": "Lead", // Bronze
				"desc": "Lead deposits were worked in Asia Minor from 3000 BC, though lead was in use before then.",
				"prereqs":["Mine"]
			},
			{
				"name": "Zinc", // Bronze
				"desc": "Zinc is needed to make brass.",
				"prereqs":["Mine"]
			},
			{
				"name": "Silver", // Bronze
				"desc": "The origins of human usage of silver are unknown. Usage became widespread with the invention of cupellation, to separate silver from lead ore, in the 4th millennium BC.",
				"prereqs":["Mine"]
			},
			{
				"name": "Gold", // Bronze
				"desc": "Trace amounts of gold are found in Paleolithic caves. Smelting began in the 4th millennium BC.",
				"prereqs":["Mine"]
			},
			{
				"name": "Platinum", // Bronze
				"desc": "The earliest platinum working is associated with the La Tolita Culture in South America, 600 BC to AD 200.",
				"prereqs":["Mine"]
			},
			{
				"name": "Lithium", // Industrial
				"desc": "Petalite, an ore from which lithium was produced, was discovered in 1800. Uses include lithium greases for aircraft, thermonuclear weapons, and aluminum smelting. Batteries are a major emerging application.",
				"prereqs":["Shaft Mine"]
			},
			{
				"name": "Cobalt", // Industrial
				"desc": "Cobalt has been used to color glass since the Bronze Age, but the element was discovered in 1735 by Georg Brandt. Cobalt could gain new importance for energy storage.",
				"prereqs":["Shaft Mine"]
			},
			{
				"name": "Magnesium", // Machine
				"desc": "Magnesium has widespread application in aerospace and metallurgy.",
				"prereqs":["Assembly Plant","Shaft Mine"]
			},
			{
				"name": "Manganese", // Industrial
				"desc": "Manganese has been used to produce chlorine since the mid 18th century.",
				"prereqs":["Shaft Mine"]
			},
			{
				"name": "Nickel", // Industrial
				"desc": "Large-scale smelting of nickel began in 1848. Nickel is used primary in stainless steel and in other alloys.",
				"prereqs":["Shaft Mine"]
			},
			{
				"name": "Aluminum", // Machine
				"desc": "Industrial production of aluminum (aluminium) began in 1886 with the Hall-Héroult process. It is widely used across industrial applications.",
				"prereqs":["Assembly Plant","Shaft Mine"]
			},
			{
				"name": "Tungsten", // Machine
				"desc": "Tungsten gained strategic importance in the early 20th century for armaments.",
				"prereqs":["Assembly Plant","Shaft Mine"]
			},
			{
				"name": "Titanium", // Atomic
				"desc": "Modern titanium production began in 1925 with the iodide process. It is a high value material for aerospace and transportation applications.",
				"prereqs":["Modern Mine"]
			},
			{
				"name": "Rare Earth Elements", // Atomic
				"desc": "There are 17 elements that are classified as 'Rare Earth'. Aside from promethium, most are not particularly rare, but they are difficult to find in economical ore deposits.",
				"prereqs":["Modern Mine"]
			},
			{
				"name": "Silicon", // Atomic
				"desc": "Silicon is abundant in the Earth's crust and has been used in natural forms for thousands of years. The advent of silicon semiconducturs has inaugurated the Silicon Age.",
				"prereqs":["Modern Mine"]
			}
		]
	},
	{
		"pane": "Minerals",
		"resources": [
			{
				"name": "Rocks", // Lower Paleolithic
				"desc": "Plain old rocks.",
				"prereqs":["Gatherer","Savannah"]
			},
			{
				"name": "Obsidian", // Upper Paleolithic
				"desc": "Obsidian is a naturally occurring volcanic glass with usage in toolmaking going back to the Acheulean.",
				"prereqs":["Gatherer","Forest"]
			},
			{
				"name": "Rock Gatherer - Slave", // Neolithic
				"prereqs":["Slave"],
				"desc": "A slave that has been assigned to gather rocks."
			},
			{
				"name": "Flint", // Upper Paleolithic
				"desc": "Flint tools date to the late Paleolithic. It has subsequently been used in early firearms to ignite gunpowder and as a construction material.",
				"prereqs":["Mining Pit"]
			},
			{
				"name": "Clay", // Neolithic
				"prereqs":["Slave"],
				"desc": "Usage of clay for pottery dates back to the early Neolithic or earlier."
			},
			{
				"name": "Sand", // Neolithic
				"prereqs":["Slave"],
				"desc": "Sand was first used for grinding and polishing stone. Now sand is a widely used commodity in glassmaking, silicon refining, and other industries."
			},
			{
				"name": "Stone", // Neolithic
				"prereqs":["Slave","Settlement"],
				"desc": "In this context, Stone refers to material that is quarried."
			},
			{
				"name": "Diamond", // Classical
				"desc": "A rigid allotrope of carbon."
			},
			{
				"name": "Sapphire", // Classical
				"desc": "Consists of aluminum oxide and trace amounts of other elements.",
				"prereqs":["Empire","Mine"]
			},
			{
				"name": "Ruby", // Classical
				"desc": "A pink or red gemstone, a variety of corundum (aluminum oxide).",
				"prereqs":["Empire","Mine"]
			},
			{
				"name": "Marble", // Neolithic
				"prereqs":["Slave","Settlement"],
				"desc": "Marble is a prize material for sculptures and fine architecture."
			},
			{
				"name": "Pumice", // Upper Paleolithic
				"desc": "Pumice is a course textured, highly porous volcanic rock. Uses include traditional medicine, concrete, horticulture, and abrasive materials.",
				"prereqs":["Mining Pit"]
			},
			{
				"name": "Saltpeter", // Early Modern
				"desc": "Saltpeter was necessary in making gunpowder and fertilizers.",
				"prereqs":["Duchy"]
			},
			{
				"name": "Potash", // Middle
				"desc": "Potash has been used since AD 500 for bleaching textiles and making soap and glass.",
				"prereqs":["Crop Rotation"]
			},
			{
				"name": "Graphite", // Industrial
				"desc": "Graphite has been in use since ancient times, but use expanded greatly in the 19th century. Today graphite has several important industrial uses.",
				"prereqs":["Shaft Mine"]
			}
		]
	},
	{
		"pane": "Organic Materials",
		"resources": [
			{
				"name": "Wood", // Lower Paleolithic
				"desc": "Go ahead and waste it. This stuff grows on trees.",
				"prereqs":["Savannah","Gatherer"]
			},
			{
				"name": "Bones", // Lower Paleolithic
				"desc": "Animal bones.",
				"prereqs":["Gatherer","Savannah"]
			},
			{
				"name": "Furs", // Upper Paleolithic
				"desc": "Animal furs. Good for making clothing.",
				"prereqs":["Trapper"]
			},
			{
				"name": "Wood Gatherer - Slave", // Neolithic
				"prereqs":["Slave"],
				"desc": "A slave that has been assigned to gather wood."
			},
			{
				"name": "Cowry Shells", // Neolithic
				"prereqs":["Mud Path"],
				"desc": "Cowry shells were once used as a form of money."
			},
			{
				"name": "Bark", // Lower Paleolithic
				"desc": "Bark is the outer layer of a tree. In paleolithic times, bark was used to make adhesives.",
				"prereqs":["Gatherer","Forest"]
			},
			{
				"name": "Cotton", // Neolithic
				"prereqs":["Farmer","Cloth"],
				"desc": "Cotton has been in use since Neolithic times for clothing."
			},
			{
				"name": "Hemp", // Neolithic
				"prereqs":["Farmer","Cloth"],
				"desc": "Hemp was an early plant to be cultivated. It is used primarily for rope and fabric. Growing of hemp is difficult due to association with cannabis."
			},
			{
				"name": "Bamboo", // Neolithic
				"prereqs":["Farmer","Cloth"],
				"desc": "Bamboo is a versatile material. Cultivation goes back to around 5000 BC in China."
			},
			{
				"name": "Wax", // Neolithic
				"prereqs":["Workshop"],
				"desc": "Wax is used for candles, wood coating, and other purposes."
			},
			{
				"name": "Dye", // Neolithic
				"prereqs":["Workshop"],
				"desc": "The usage of dye to color clothing dates to the Neolithic, possibly earlier. Natural dyes are typically sourced from plants, especially roots, berries, bark, leaves, and wood, and to a lesser extent from animal and mineral sources. The first synthetic dye, mauve, was invented in 1856."
			},
			{
				"name": "Rubber", // Industrial
				"desc": "South America was the main source of rubber in the 19th century. Additional cultivation occured in the Congo Free State, India, Singapore, and Malaysia.",
				"prereqs":["Greenhouse"]
			},
			{
				"name":"Cloth", // Neolithic
				"prereqs":["Workshop"]
			}
		],
		"actions":[
			{
				"name":"Set Trap", // Upper Paleolithic
				"prereqs":["Tribe"]
			}
		]
	},
	{
		"pane": "Energy",
		"resources": [
			{
				"name": "Peat", // Early Modern
				"desc": "Peat is a natural accumulation of partially decayed organic matter.",
				"prereqs":["Colony"]
			},
			{
				"name": "Coal", // Middle
				"desc": "The usage of coal for smithing began in the High Middle Ages.",
				"prereqs":["Forge"]
			},
			{
				"name": "Crude Oil", // Industrial
				"desc": "Natural deposits of petroleum have been used since ancient times. Modern drilling began in 1859 with Edwin Drake's well.",
				"prereqs":["Railroad"]
			},
			{
				"name": "Natural Gas", // Industrial
				"desc": "Distribution of municipal natural gas began in 1836 in Philadelphia.",
				"prereqs":["Crude Oil"]
			},
			{
				"name": "Uranium", // Atomic
				"desc": "Uranium is widely used in nuclear weapons and nuclear power plants. Depleted uranium is also useful as a high density penetrator.",
				"prereqs":["Modern Mine"]
			},
			{
				"name": "Heavy Water", // Atomic
				"desc": "Heavy water is a type of water with a disproportionate amount of deuterium.",
				"prereqs":["Uranium"]
			},
			{
				"name": "Plutonium", // Atomic
				"desc": "Plutonium, atomic number 94, is found in trace quantities naturally. The first significant production occurred under the Manhattan Project.",
				"prereqs":["Uranium","Heavy Water"]
			},
			{
				"name": "Thorium", // Atomic
				"desc": "Applications of thorium date to the late 19th century. There is hope for thorium as an Earth-abundant alternative to uranium in nuclear power, and India in particular seeks to develop a large-scale thorium cycle by 2050.",
				"prereqs":["Nuclear Power Plant"]
			},
			{
				"name": "Helium-3", // Nanotech
				"desc": "Helium-3 is an isotope of helium with one neutron. It is of potential interest for aneutronic fusion.",
				"prereqs":["Lunar KREEP Mine"]
			}
		]
	},
	{
		"pane": "Manufactured Materials",
		"resources": [

		]
	},
	{
		"pane": "Composites",
		"resources": [
			{
				"name": "Ceramic", // Neolithic
				"prereqs":["Workshop","Pottery"],
				"desc": "Ceramics are a broad class of materials, with usage going back to 26000 years ago for sculpture."
			},
			{
				"name": "Bronze", // Bronze
				"desc": "The discovery of bronze allowed harder and more durable metal objects than previously possible.",
				"prereqs":["Tin","Copper","Lake"]
			},
			{
				"name": "Brass", // Bronze
				"desc": "Brass is a composite of copper and zinc.",
				"prereqs":["Copper","Zinc","Lake"]
			},
			{
				"name": "Glass", // Bronze
				"desc": "Glass-making is known from 3600 BC, probably first for beads.",
				"prereqs":["Sand","Lake"]
			},
			{
				"name": "Damascus Steel", // Classical
				"desc": "Damascus Steel, also known as Wootz Steel, originated in southern India around the 6th century BC.",
				"prereqs":["Smith's Workshop"]
			},
			{
				"name": "Crucible Steel", // Middle
				"desc": "Production dates to the 9th or 10th century AD. It is formed by slowly heating and cooling pure iron and carbon (typically in the form of charcoal) in a crucible.",
				"prereqs":["Foundry"]
			},
			{
				"name": "Steel", // Industrial
				"desc": "Modern steelmaking began with the Bessemer process in 1855. It is a foundational invention of the Industrial Revolution.",
				"prereqs":["Factory"]
			},
			{
				"name": "Stainless Steel", // Machine
				"desc": "Stainless steel is a chromium alloy of steel. It is resistant to rusting and has greater heat resistance than conventional steel.",
				"prereqs":["Steel","Industrial Park"]
			},
			{
				"name": "Fiberglass", // Atomic
				"desc": "Fiberglass is a common type of fiber-reinforced plastic using glass fiber. Mass production was invented in 1932.",
				"prereqs":["Industrial Park"]
			},
			{
				"name": "Reinforced Concrete", // Machine
				"desc": "Reinforced concrete came into widespared usage in civil engineering around the turn of the 20th century.",
				"prereqs":["Industrial Park","Civil Engineering"]
			},
			{
				"name": "Carbon Fiber", // Atomic
				"desc": "Carbon fibers are 5-10 micrometer thick fibers of mostly carbon. They are valuable in aerospace and high end textile applications, though expensive.",
				"prereqs":["Composite Tools"]
			},
			{
				"name": "Cermet", // Information
				"desc": "Cermets are composites of ceramics and metals. Development was spurred after World War II by the need for materials highly resistant to temperature and stress, particularly for jet engines.",
				"prereqs":["Manufacturing District"]
			},
			{
				"name": "Cross-laminated Timber", // Information
				"desc": "Cross-laminated timber is a new form of multilayered wood, of interested for low cost highrises.",
				"prereqs":["Manufacturing District"]
			}
		]
	},
	{
		"pane": "Building Materials",
		"resources": [
			{
				"name": "Brick", // Neolithic
				"prereqs":["Settlement"],
				"desc": "Bricks are the building blocks of masonry construction, traditionally composed of fired clay."
			},
			{
				"name": "Concrete", // Classical
				"desc": "The Romans used concrete extensively, leading to an architectural revolution. Pyroclastic rock and ash contribute to the durability of Roman concrete.",
				"prereqs":["Smith's Workshop"]
			},
			{
				"name": "Cement", // Neolithic
				"prereqs":["Workshop","Stone"],
				"desc": "Cement is the binder used to make concrete, or with finer aggregate, mortar for masonry."
			},
			{
				"name": "Nanotrusses", // Nanotech
				"desc": "Nanotrusses are materials that are extremely light, strong, flexible, and durable. They may eventually be used as building material.",
				"prereqs":["Automated Factory"]
			},
			{
				"name": "Computronium", // Interstellar
				"desc": "Computronium is a hypothesized form of programmable matter.",
				"prereqs":["Planet Cloud"]
			}
		]
	},
	{
		"pane": "Exotic",
		"resources": [
			{
				"name": "Antimatter", // Interstellar
				"desc": "Antimatter is matter that is composed of antiparticles. Antimatter has use today in positron emission tomography (PET). If antimatter can be produced and stored at scale, it may be useful for interstellar travel and for weaponry.",
				"prereqs":["Transtellar Factory"]
			},
			{
				"name": "AB Matter", // Galactic
				"desc": "AB Matter is a hypothetical form of matter with complex structure formed from nucleons rather than atoms.",
				"prereqs":["Galactic Core Base"]
			},
			{
				"name": "Neutronium", // Cosmic
				"desc": "Neutronium is a hypothetical material consisting of mostly neutrons or neutron-degenerate matter. It is extremely dense and composes the cores of neutron stars.",
				"prereqs":["Quasar"]
			},
			{
				"name": "Magmatter", // Cosmic
				"desc": "Magmatter is a hypothetical form of matter composed of exotic particles such as monopoles.",
				"prereqs":["Quasar"]
			},
			{
				"name": "Dark Matter", // Cosmic
				"desc": "Dark matter is hypothesized to exist due to observed gravitational effects that cannot be explained in terms of observed matter. It may have a range of distant future uses.",
				"prereqs":["Quasar"]
			},
			{
				"name": "Mirror Matter", // Cosmic
				"desc": "Mirror matter is a speculated counterpart to ordinary matter. It would interact with ordinary matter only through the weak force and gravity.",
				"prereqs":["Quasar"]
			},
			{
				"name": "Quantonium", // Transcendent
				"desc": "Quantonium is an unknown material hypothesized to be connected with higher dimensions.",
				"prereqs":["Branespace"]
			},
			{
				"name": "Unobtainium", // Transcendent
				"desc": "You can't get it, but it has the properties you want.",
				"prereqs":["Hypercomputer"]
			}
		]
	},
	{
		"pane": "Chemicals",
		"resources": [
			{
				"name": "Ammonia", // Machine
				"desc": "Ammonia--chemically NH3--is critical in making fertilizers and explosive. It was synthesized from air in 1909 via the Haber-Bosch process and first produced industrially during World War I.",
				"prereqs":["Synthetic Fertilizer"]
			},
			{
				"name": "Methanol", // Machine
				"desc": "Methanol--chemically CH3OH--is an widely used chemical. It is also of interest as an energy carrier.",
				"prereqs":["Synthetic Fertilizer"]
			},
			{
				"name": "Hydrogen", // Industrial
				"desc": "Hydrogen is the most common element in the universe, though not readily available in a free form due to its high reactivity. It came into use in the late 19th century in balloons. Hydrogen is also of great interest as a building block of a low-carbon energy system.",
				"prereqs":["Hydraulic Engineering"]
			},
			{
				"name": "Plastic", // Machine
				"desc": "Plastics refer to a wide range of malleable organic compounds. They are widely used and highly versatile.",
				"prereqs":["Industrial Park"]
			},
			{
				"name": "Nylon", // Machine
				"desc": "Nylon refers to a family of synthetic polymers that came into widespread usage in 1940.",
				"prereqs":["Plastic"]
			}
		]
	},
	{
		"pane": "Nanotechnology",
		"resources": [
			{
				"name": "Carbon Nanotubes", // Information
				"desc": "Carbon nanotubes are an emerging material. They are of great interest for their electrical conductivity and tensile strength.",
				"prereqs":["Industrial Robot"]
			},
			{
				"name": "Graphene", // Information
				"desc": "Graphene is an allotrope of carbon arranged in a 2D hexagonal lattice. Potential applications include electronics, biological engineering, filtration, lightweight/strong composite materials, photovoltaics, and energy storage.",
				"prereqs":["Deep Sea Mine"]
			},
			{
				"name": "Aerogel", // Information
				"desc": "An aerogel is an ultralight gel in which the liquid has been replaced by gas.",
				"prereqs":["Manufacturing District","Martian Canyon"]
			},
			{
				"name": "Diamond Nanothreads", // Nanotech
				"desc": "Diamond or carbon nanothreads are an allotrope of carbon. Their strength might make them suitable for building a space elevator.",
				"prereqs":["Nanotech Tools","Nanotrusses"]
			},
			{
				"name": "Plasteel", // Transhuman
				"desc": "Plasteel is a hypothetical substance with the strength of steel and flexiblity of plastic.",
				"prereqs":["AI Factory"]
			},
			{
				"name": "Claytronic Atoms", // Transhuman
				"desc": "Claytronics is a hypothetical concept of nanoscale computational matter.",
				"prereqs":["AI Factory"]
			}
		]
	},
	{
		"pane": "Refined Organic Materials",
		"resources": [
			{
				"name": "Leather", // Neolithic
				"prereqs":["Workshop","Cow"],
				"desc": "Leather is obtained from tanning animal rawhide or skins, especially cattle."
			},
			{
				"name": "Paper", // Classical
				"desc": "The invention of paper is attributed to Cai Lun in the 2nd century.",
				"prereqs":["Paved Road"]
			}
		]
	},
	{
		"pane":"Tools",
		"resources":[
			{
				"name": "Stone Tools", // Lower Paleolithic
				"desc": "The most basic stone tools.",
				"prereqs":["Rocks","Human"]
			},
			{
				"name": "Microlith", // Upper Paleolithic
				"desc": "Microliths are small stone tools typically used as spearpoints or arrowheads.",
				"prereqs":["Wood Building"]
			},
			{
				"name":"Copper Tools", // Bronze
				"prereqs":["Copper"]
			},
			{
				"name":"Bronze Tools", // Bronze
				"prereqs":["Bronze"]
			},
			{
				"name":"Iron Tools", // Classical
				"prereqs":["Blacksmith"]
			},
			{
				"name":"Steel Tools", // Middle
				"prereqs":["Crucible Steel"]
			},
			{
				"name":"Composite Tools", // Atomic
				"prereqs":["Manufacturing Plant"]
			},
			{
				"name":"Nanotech Tools", // Nanotech
				"prereqs":["Automated Factory"]
			}
		]
	},
	{
		"pane":"Machines",
		"resources":[
			{
				"name":"Sundial", // Bronze
				"prereqs":["Bronze Tools"]
			},
			{
				"name":"Geared Mechanism", // Classical
				"prereqs":["Seaport"]
			},
			{
				"name":"Water Clock", // Middle
				"prereqs":["Crop Rotation","Foundry"]
			},
			{
				"name":"Mechanical Clock", // Early Modern
				"prereqs":["Duchy"]
			},
			{
				"name":"Replaceable Parts", // Early Modern
				"prereqs":["Peat Burner"]
			},
			{
				"name":"Machine Tools", // Industrial
				"prereqs":["Nation"]
			},
			{
				"name":"Power Tools", // Atomic
				"prereqs":["Electric Appliances"]
			},
			{
				"name":"Laser", // Atomic
				"prereqs":["Nuclear Power Plant"]
			},
			{
				"name":"Industrial Robot", // Information
				"prereqs":["Machine Learning","Manufacturing District"]
			},
			{
				"name":"Superconductor", // Information
				"prereqs":["Megacity"]
			},
			{
				"name":"3D Printer", // Information
				"prereqs":["Industrial Robot"]
			}
		]
	},
	{
		"pane":"Textiles",
		"resources":[
			{
				"name": "Clothing", // Upper Paleolithic
				"desc": "Clothing is essential for living in any but temperature climates.",
				"prereqs":["Furs","Wood Building"]
			}
		]
	},
	{
		"pane":"Goods",
		"resources":[
			{
				"name": "Beads", // Upper Paleolithic
				"desc": "A form of currency and status.",
				"prereqs":["Barter Route"]
			},
			{
				"name": "Pottery", // Neolithic
				"prereqs":["Granary"],
				"desc": "Shards have been found as far back as 20,000 years ago."
			},
			{
				"name":"Furniture", // Classical
				"prereqs":["Cottage"]
			},
			{
				"name":"Typewriters", // Industrial
				"prereqs":["Factory"]
			}
		]
	},
	{
		"pane":"Vehicles",
		"resources":[
			{
				"name": "Raft", // Upper Paleolithic
				"desc": "A makeshift raft helps you get to nearby islands.",
				"prereqs":["Stone Building"]
			},
			{
				"name":"Travois", // Neolithic
				"prereqs":["Workshop"]
			},
			{
				"name":"Cart", // Bronze
				"prereqs":["Saddle"]
			},
			{
				"name":"Saddle", // Bronze
				"prereqs":["Bronze Tools","Horse","Road"]
			},
			{
				"name":"Ship", // Early Modern
				"prereqs":["Caravel"]
			},
			{
				"name":"Carriage", // Early Modern
				"prereqs":["Replaceable Parts"]
			},
			{
				"name":"Steamship", // Industrial
				"prereqs":["Machine Tools"]
			},
			{
				"name":"Train Car", // Industrial
				"prereqs":["Railroad"]
			},
			{
				"name":"Bicycle", // Machine
				"prereqs":["Assembly Plant","Aluminum"]
			},
			{
				"name":"Car", // Machine
				"prereqs":["Bicycle","Skyscraper"]
			},
			{
				"name":"Aircraft", // Machine
				"prereqs":["Car","Magnesium"]
			},
			{
				"name":"Jet Aircraft", // Atomic
				"prereqs":["Composite Tools"]
			},
			{
				"name":"Advanced Rocket", // Atomic
				"prereqs":["Multinational Federation"]
			},
			{
				"name":"Helicopter", // Atomic
				"prereqs":["Jet Aircraft"]
			},
			{
				"name":"Micromobility Device", // Information
				"prereqs":["Electric Car"]
			},
			{
				"name":"Electric Car", // Information
				"prereqs":["Manufacturing District","Rare Earth Elements"]
			},
			{
				"name":"Self-Driving Car", // Information
				"prereqs":["Electric Car","Satellite Network"]
			},
			{
				"name":"Hypersonic Aircraft", // Nanotech
				"prereqs":["Cloud Robotics"]
			},
			{
				"name":"Flying Car", // Nanotech
				"prereqs":["Megatower","Synfuel Generator"]
			},
			{
				"name":"Spaceship", // Transhuman
				"prereqs":["Starport"]
			},
			{
				"name":"Interstellar Spaceship", // Interstellar
				"prereqs":["Laser Highway"]
			},
			{
				"name":"Antigravity Car", // Interstellar
				"prereqs":["Flying Car","ACNP Power Plant"]
			},
			{
				"name":"Warp Ship", // Cosmic
				"prereqs":["Cluster Brain"]
			},
			{
				"name":"Hypership", // Transcendent
				"prereqs":["Quantonium"]
			}
		]
	},
	{
		"pane":"Consumer Goods",
		"resources":[
			{
				"name":"Toys", // Neolithic
				"prereqs":["Workshop"]
			},
			{
				"name":"Board Games", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Dishware", // Classical
				"prereqs":["Kitchen"]
			},
			{
				"name":"Ice Box", // Industrial
				"prereqs":["Telegraph Network"]
			},
			{
				"name":"Refrigerator", // Machine
				"prereqs":["Power Grid","Megafarm"]
			},
			{
				"name":"Radio", // Machine
				"prereqs":["Movie"]
			},
			{
				"name":"Electric Appliances", // Atomic
				"prereqs":["Mainframe"]
			},
			{
				"name":"Television", // Atomic
				"prereqs":["Mainframe","Radio Tower"]
			}
		]
	},
	{
		"pane": "Trade",
		"resources": [
			{
				"name": "Barter Route", // Upper Paleolithic
				"desc": "A most basic trade route. Allows collection of new resources.",
				"prereqs":["Trails"]
			}
		],
		"actions":[
			{
				"name":"Barter Furs", // Upper Paleolithic
				"prereqs":["Barter Route"]
			},
			{
				"name":"Barter Clothing", // Upper Paleolithic
				"prereqs":["Barter Route"]
			},
			{
				"name":"Barter Microlith", // Upper Paleolithic
				"prereqs":["Barter Route"]
			},
			{
				"name":"Barter Axe", // Upper Paleolithic
				"prereqs":["Barter Route"]
			},
			{
				"name":"Barter Spear", // Upper Paleolithic
				"prereqs":["Barter Route"]
			},
			{
				"name":"Barter Beads", // Upper Paleolithic
				"prereqs":["Barter Route"]
			},
			{
				"name":"Barter Stone Tools", // Upper Paleolithic
				"prereqs":["Barter Route"]
			},
			{
				"name":"Gather", // Lower Paleolithic
				"prereqs":["Gatherer"]
			},
			{
				"name":"Barter", // Upper Paleolithic
				"prereqs":["Barter Route"]
			},
			{
				"name":"Trade", // Neolithic
				"prereqs":["Mud Path"]
			},
			{
				"name":"Trading Voyage", // Early Modern
				"prereqs":["Commercial Seaport"]
			},
			{
				"name":"Free Trade Agreement", // Atomic
				"prereqs":["Computer Networking","Nuclear Power Plant","Logistics"]
			},
			{
				"name":"Interstellar Trade", // Interstellar
				"prereqs":["Interstellar Spaceship","Red Dwarf","G-Type Star","Red Giant"]
			},
			{
				"name":"Interdimensional Trade" // Transcendent
			}
		]
	},
	{
		"pane": "Construction",
		"resources": [

		]
	},
	{
		"pane":"Cities",
		"resources":[
			{
				"name": "Campsite", // Lower Paleolithic
				"desc": "A campsite to rest.",
				"prereqs":["Gatherer","Savannah","Human"]
			},
			{
				"name": "Settlement", // Neolithic
				"prereqs":["Megalith"],
				"desc": "A settled tribe in a fixed location and with permanent buildings."
			},
			{
				"name": "City", // Bronze
				"prereqs":["Human","Masonry Building","Obsidian Weapons","Traditionalism","Well"],
				"desc": "Key elements of cities are population density, specialization, and complex social structure."
			},
			{
				"name": "Town", // Bronze
				"desc": "A small town, not far from a larger city.",
				"prereqs":["City"]
			},
			{
				"name": "Village", // Bronze
				"desc": "A mostly agricultural village.",
				"prereqs":["City"]
			},
			{
				"name": "Hamlet", // Bronze
				"desc": "A small village, little more than a few families.",
				"prereqs":["City"]
			},
			{
				"name": "Metropolis", // Industrial
				"desc": "A modern metropolis.",
				"prereqs":["Romanticism","Shaft Mine","Greenhouse","Company Town","Steel"]
			},
			{
				"name": "Megacity", // Information
				"desc": "A metropolitan area that encompasses tens of millions of people.",
				"prereqs":["Neoliberal","Network Protocol","Neuroscience"]
			},
			{
				"name": "Arcology", // Transhuman
				"desc": "An arcology is a large, dense, mostly self-contained urban megastructure. No arcologies, as envisioned by the concept original Paolo Soleri, exist today, but some develoments such as the Las Vegas Strip, McMurdo Station, and Arcosanti show arcology features.",
				"prereqs":["Deep Space Colony"]
			},
			{
				"name": "Eperopolis", // Transhuman
				"desc": "A continent-sized city.",
				"prereqs":["Em","O'Neill Cylinder"]
			},
			{
				"name": "Ecumenopolis", // Interstellar
				"desc": "The entirely of the Earth's surface is now an integrated city.",
				"prereqs":["Molecular Assembler","Spacescraper","ACNP Power Plant"]
			}
		]
	},
	{
		"pane":"Urban Development",
		"resources":[
			{
				"name": "Imperial Capitol", // Classical
				"desc": "A large city that serves as the seat of empire.",
				"prereqs":["Empire"]
			},
			{
				"name": "City State", // Middle
				"desc": "A city that is politically independent.",
				"prereqs":["Vassal State"]
			},
			{
				"name": "Ghetto", // Middle
				"desc": "A section of a city that is reserved for ethnic or religious minorities.",
				"prereqs":["Castle"]
			},
			{
				"name": "Company Town", // Industrial
				"desc": "A town owned and run by a company. Typically for location-dependent facilities such as early factories, mines, etc. before fast transportation was developed.",
				"prereqs":["Railroad"]
			},
			{
				"name": "Suburb", // Machine
				"desc": "Low density development surrounding the core city. Develops around mass transit or automobiles.",
				"prereqs":["Car"]
			},
			{
				"name": "Exurb", // Atomic
				"desc": "Low density residential development, generally automobile-oriented.",
				"prereqs":["Freeway"]
			},
			{
				"name": "Office Park", // Machine
				"desc": "A large suburban development of office space.",
				"prereqs":["Car"]
			},
			{
				"name": "New Urbanist City", // Information
				"desc": "New Urbanism is a design philosophy which promotes walkability and mixed used development. Seaside, Florida is a prominent example.",
				"prereqs":["Micromobility Device"]
			}
		]
	},
	{
		"pane":"Exotic Cities",
		"resources":[
			{
				"name": "Reclaimed Island", // Information
				"desc": "Land reclamation is employed to create new real estate in high value, land-constrained coastal cities, such as Hong Kong and Singapore.",
				"prereqs":["Industrial Robot"]
			},
			{
				"name": "Ocean City", // Information
				"desc": "A city built on modular floating platforms that can traverse the oceans freely. The Seasteading Institute is one organization attempting to develop such projects.",
				"prereqs":["Reclaimed Island"]
			},
			{
				"name": "Ocean Floor City", // Transhuman
				"desc": "A city on the ocean floor.",
				"prereqs":["Ocean Floor","Plasteel"]
			},
			{
				"name":"Floating City", // Transhuman
				"prereqs":["Stratosphere","Claytronic Atoms"]
			}
		]
	},
	{
		"pane":"Transportation",
		"resources":[
			{
				"name": "Trails", // Upper Paleolithic
				"desc": "Trails facilitate hunting, resource gathering, and trade.",
				"prereqs":["Negotiation"]
			},
			{
				"name":"Mud Path", // Neolithic
				"prereqs":["Tracker"]
			},
			{
				"name":"Road", // Bronze
				"prereqs":["Lake","Mud Path"]
			},
			{
				"name":"Paved Road", // Classical
				"prereqs":["Road","Concrete","Seaport"]
			},
			{
				"name":"Railroad", // Industrial
				"prereqs":["Machine Tools"]
			},
			{
				"name":"Highway", // Machine
				"prereqs":["Car"]
			},
			{
				"name":"Bike Highway", // Information
				"prereqs":["Micromobility Device"]
			},
			{
				"name":"Freeway", // Atomic
				"prereqs":["Multinational Federation","Highway"]
			},
			{
				"name":"High Speed Rail", // Atomic
				"prereqs":["Highway","Modern Skyscraper"]
			},
			{
				"name":"Maglev", // Information
				"prereqs":["Deep Sea Mine","Self-Driving Car"]
			},
			{
				"name":"Vactrain", // Nanotech
				"prereqs":["Flying Car","Hypersonic Aircraft"]
			},
			{
				"name":"Gravity Train", // Transhuman
				"prereqs":["Stratospheric Tower"]
			},
			{
				"name":"Laser Highway", // Interstellar
				"prereqs":["Solar Civilization","Transtellar Space"]
			},
			{
				"name":"Wormhole", // Galactic
				"prereqs":["Galactic Core Base"]
			}
		]
	},
	{
		"pane":"Ports",
		"resources":[
			{
				"name":"Seaport", // Classical
				"prereqs":["Sea"]
			},
			{
				"name":"Commercial Seaport", // Early Modern
				"prereqs":["Boreal Forest","Plains","Swamp"]
			},
			{
				"name":"Railway Station", // Industrial
				"prereqs":["Railroad"]
			},
			{
				"name":"Airport", // Machine
				"prereqs":["Aircraft"]
			},
			{
				"name":"International Airport", // Atomic
				"prereqs":["Jet Aircraft"]
			},
			{
				"name":"Launch Site", // Atomic
				"prereqs":["Mainframe","Manufacturing Plant"]
			},
			{
				"name":"Spaceport", // Information
				"prereqs":["Armed Satellite"]
			},
			{
				"name":"Docking Bay", // Nanotech
				"prereqs":["Hypersonic Aircraft"]
			},
			{
				"name":"Starport", // Transhuman
				"prereqs":["Stratospheric Tower","Core Mine"]
			},
			{
				"name":"Teleport Station", // Interstellar
				"prereqs":["Solar Civilization","Jovian Scoop"]
			},
			{
				"name":"Dimensional Portal", // Transcendent
				"prereqs":["Distant Past","Distant Future"]
			}
		]
	},
	{
		"pane":"Communication",
		"resources":[
			{
				"name":"Courier Service", // Bronze
				"prereqs":["Road"]
			},
			{
				"name":"Printing Press", // Early Modern
				"prereqs":["Duchy"]
			},
			{
				"name":"Semaphore Network", // Early Modern
				"prereqs":["Commercial Seaport"]
			},
			{
				"name":"Telegraph Network", // Industrial
				"prereqs":["Railroad"]
			},
			{
				"name":"Telephone Network", // Machine
				"prereqs":["Telegraph Network","Metropolis"]
			},
			{
				"name":"Radio Tower", // Machine
				"prereqs":["Radio"]
			},
			{
				"name":"Television Tower", // Atomic
				"prereqs":["Television"]
			},
			{
				"name":"Cellular Network", // Atomic
				"prereqs":["Operating System"]
			},
			{
				"name":"Fiber Optic Cable", // Information
				"prereqs":["World Wide Web"]
			},
			{
				"name":"Satellite Network", // Information
				"prereqs":["World Wide Web","Inner Solar System","Martian Pole"]
			},
			{
				"name":"Photonic Network", // Nanotech
				"prereqs":["Orbital Factory"]
			},
			{
				"name":"Neutrino Network", // Galactic
				"prereqs":["Galaxy Group"]
			},
			{
				"name":"Tachyon Network", // Cosmic
				"prereqs":["Supercluster"]
			}
		]
	},
	{
		"pane":"Water",
		"resources":[
			{
				"name":"Well", // Neolithic
				"prereqs":["Irrigation Canals"]
			},
			{
				"name":"Irrigation Canals", // Neolithic
				"prereqs":["Farmer","Slave"]
			},
			{
				"name":"Aquaduct", // Classical
				"prereqs":["Paved Road"]
			},
			{
				"name":"Water Treatment Plant", // Industrial
				"prereqs":["Greenhouse"]
			},
			{
				"name":"Desalination Plant", // Atomic
				"prereqs":["Ecology"]
			},
			{
				"name":"Atmospheric Water Generator", // Nanotech
				"prereqs":["Megatower"]
			}
		]
	},
	{
		"pane":"Energy Production",
		"resources":[
			{
				"name": "Fire Pit", // Lower Paleolithic
				"desc": "Mastering fire was a major accomplishment for your people.",
				"prereqs":["Campsite"]
			},
			{
				"name":"Charcoal Burner", // Upper Paleolithic
				"prereqs":["Stone Building","Fire Pit"]
			},
			{
				"name":"Watermill", // Classical
				"prereqs":["Aquaduct"]
			},
			{
				"name":"Windmill", // Middle
				"prereqs":["Crop Rotation","Foundry"]
			},
			{
				"name":"Peat Burner", // Early Modern
				"prereqs":["Peat"]
			},
			{
				"name":"Coal Burner", // Industrial
				"prereqs":["Factory","Coal"]
			},
			{
				"name":"Coal Power Plant", // Machine
				"prereqs":["Coal Burner","Metropolis","Electromagnetism"]
			},
			{
				"name":"Hydroelectric Plant", // Machine
				"prereqs":["River","Metropolis","Electromagnetism"]
			},
			{
				"name":"Oil Power Plant", // Machine
				"prereqs":["Oil Pipeline","Electromagnetism"]
			},
			{
				"name":"Gas Power Plant", // Machine
				"prereqs":["Gas Pipeline","Electromagnetism"]
			},
			{
				"name":"Biomass Power Plant", // Machine
				"prereqs":["Megafarm"]
			},
			{
				"name":"Incineration Plant", // Atomic
				"prereqs":["Ecology"]
			},
			{
				"name":"Wind Turbine", // Atomic
				"prereqs":["Ecology"]
			},
			{
				"name":"Solar PV Farm", // Information
				"prereqs":["Solar Thermal Farm","Rare Earth Elements"]
			},
			{
				"name":"Solar Thermal Farm", // Information
				"prereqs":["Superconductor"]
			},
			{
				"name":"Geothermal Plant", // Atomic
				"prereqs":["Ecology","Oil Pipeline"]
			},
			{
				"name":"Wave Turbine", // Information
				"prereqs":["Ocean City"]
			},
			{
				"name":"Tidal Generator", // Information
				"prereqs":["Reclaimed Island"]
			},
			{
				"name":"OTEC Power Plant", // Information
				"prereqs":["Ocean City"]
			},
			{
				"name":"Osmotic Power Plant", // Information
				"prereqs":["Reclaimed Island"]
			},
			{
				"name":"Nuclear Power Plant", // Atomic
				"prereqs":["Uranium","Manufacturing Plant"]
			},
			{
				"name":"Advanced Nuclear Plant", // Information
				"prereqs":["Nuclear Power Plant","Machine Learning","Particle Accelerator","Thorium"]
			},
			{
				"name":"Microwave Plant", // Nanotech
				"prereqs":["Space Colony"]
			},
			{
				"name":"Fusion Power Plant", // Nanotech
				"prereqs":["Space Colony","Graphene"]
			},
			{
				"name":"Cold Fusion", // Transhuman
				"prereqs":["Stratospheric Tower"]
			},
			{
				"name":"ACNP Power Plant", // Interstellar
				"prereqs":["Antimatter"]
			},
			{
				"name":"Quantum Vacuum Plant", // Cosmic
				"prereqs":["Induced Supernova"]
			}
		]
	},
	{
		"pane":"Energy Distribution",
		"resources":[
			{
				"name":"District Heating", // Classical
				"prereqs":["Aquaduct"]
			},
			{
				"name":"District Cooling", // Atomic
				"prereqs":["Ecology"]
			},
			{
				"name":"Oil Pipeline", // Industrial
				"prereqs":["Oil Well"]
			},
			{
				"name":"Gas Pipeline", // Machine
				"prereqs":["Gas Well"]
			},
			{
				"name":"Hydrogen Pipeline", // Industrial
				"prereqs":["Hydrogen"]
			},
			{
				"name":"Power Grid", // Machine
				"prereqs":["Oil Power Plant","Gas Power Plant","Coal Power Plant","Hydroelectric Plant"]
			},
			{
				"name":"Grid Energy Storage", // Information
				"prereqs":["Smart Grid"]
			},
			{
				"name":"Smart Grid", // Information
				"prereqs":["Blockchain","Advanced Nuclear Plant"]
			},
			{
				"name":"HVDC Grid", // Information
				"prereqs":["Wind Turbine","Solar PV Farm"]
			},
			{
				"name":"Wireless Grid", // Nanotech
				"prereqs":["Megatower"]
			},
			{
				"name":"EMP Grid" // Nanotech
			},
			{
				"name":"Diesel Generator", // Machine
				"prereqs":["Power Grid"]
			},
			{
				"name":"Rooftop Solar PV", // Information
				"prereqs":["Solar PV Farm","Grid Energy Storage"]
			},
			{
				"name":"Synfuel Generator", // Nanotech
				"prereqs":["Fusion Power Plant"]
			}
		]
	},
	{
		"pane":"Matter",
		"resources":[
			{
				"name":"Dump", // Neolithic
				"prereqs":["Masonry Building"]
			},
			{
				"name":"Landfill", // Middle
				"prereqs":["Dump","Crop Rotation"]
			},
			{
				"name":"Waste Disposal", // Machine
				"prereqs":["Plastic"]
			},
			{
				"name":"Recycling Plant", // Atomic
				"prereqs":["Ecology"]
			},
			{
				"name":"Molecular Feed", // Interstellar
				"prereqs":["ACNP Power Plant"]
			}
		]
	},
	{
		"pane": "Buildings",
		"resources": [
			{
				"name":"Cave Dwelling", // Lower Paleolithic
				"prereqs":["Hills","Homo heidelbergensis"]
			},
			{
				"name":"Wood Building", // Upper Paleolithic
				"prereqs":["Tribe"]
			},
			{
				"name": "Tipi", // Upper Paleolithic
				"desc": "Another form of housing and public gathering.",
				"prereqs":["Wood Building"]
			},
			{
				"name":"Stone Building", // Upper Paleolithic
				"prereqs":["Wood Building"]
			},
			{
				"name":"Masonry Building", // Neolithic
				"prereqs":["Brick"]
			},
			{
				"name":"Castle", // Middle
				"prereqs":["Forge"]
			},
			{
				"name": "Skyscraper", // Machine
				"desc": "A building with a steel skeleton. The first such building was the Home Insurance Building in Chicago, built in 1885.",
				"prereqs":["Assembly Plant","Power Grid","Telephone Network"]
			},
			{
				"name": "Modern Skyscraper", // Atomic
				"desc": "Post-World War II skyscrapers are typically built with steel or reinforced concrete frames. Examples include the Seven Sisters, the Seagram Building, the World Trade Center, and the Sears (Willis) Tower.",
				"prereqs":["Reinforced Concrete","Multinational Federation"]
			},
			{
				"name": "Megatower", // Nanotech
				"desc": "A skyscraper that is at least 1000 meters tall. It may, though not necessarily, be built with materials that are yet to come into widespread architectural usage, such as carbon nanotubes.",
				"prereqs":["Nanotrusses"]
			},
			{
				"name": "Stratospheric Tower", // Transhuman
				"desc": "A tower at least 10 kilometers tall, reaching the stratosphere.",
				"prereqs":["Arcology","Plasteel"]
			},
			{
				"name": "Spacescraper", // Interstellar
				"desc": "A building at least 100 kilometers tall, reaching into space.",
				"prereqs":["ACNP Power Plant"]
			}
		]
	},
	{
		"pane":"Manufacturing",
		"resources":[
			{
				"name":"Workshop", // Neolithic
				"prereqs":["Masonry Building"],
				"desc":"An ancient workshop"
			},
			{
				"name":"Metalworker's Workshop", // Bronze
				"desc":"The ancient forge worked copper, silver, and gold.",
				"prereqs":["Silver","Gold","Copper"]
			},
			{
				"name":"Smith's Workshop", // Classical
				"desc":"This blacksmith works iron, a central component of the classical and medieval economy.",
				"prereqs":["Iron Tools"]
			},
			{
				"name":"Forge", // Middle
				"desc":"Medieval forges used charcoal for fuel. Blacksmithing was considered one of the seven Artes mechanicae (mechanical arts).",
				"prereqs":["Principality","Blacksmith"]
			},
			{
				"name":"Foundry", // Middle
				"desc":"A foundry is a factory that produces metal castings.",
				"prereqs":["Castle","Coal"]
			},
			{
				"name":"Cottage Industry", // Early Modern
				"desc":"A cottage industry is an industry—primarily manufacturing—which includes many producers, working from their homes, typically part-time. It was an element of the early stages of industrialization.",
				"prereqs":["Replaceable Parts"]
			},
			{
				"name":"Factory", // Industrial
				"desc":"As industrialization advanced, manufacturing began to be centralized in factories.",
				"prereqs":["Steamship"]
			},
			{
				"name":"Assembly Plant", // Machine
				"desc":"The assembly plant is run in accordance with the principles of scientific management.",
				"prereqs":["Metropolis","Factory"]
			},
			{
				"name":"Industrial Park", // Machine
				"prereqs":["Car"]
			},
			{
				"name":"Manufacturing Plant", // Atomic
				"desc":"A modern manufacturing plant, characterized by large scale and efficient design.",
				"prereqs":["Freeway"]
			},
			{
				"name":"Manufacturing District", // Information
				"desc":"The manufacturing district is a large-scale, highly integrated facility that extensively incorporates information technology.",
				"prereqs":["Megacity"]
			},
			{
				"name":"Automated Factory", // Nanotech
				"desc":"There are few or no onsite humans here.",
				"prereqs":["Natural Language Interface","Fusion Power Plant","Ambient Intelligence","Orbital Factory"]
			},
			{
				"name":"AI Factory", // Transhuman
				"desc":"This factory uses advanced artificial intelligence to dynamically reconfigure its production to market conditions.",
				"prereqs":["Arcology"]
			},
			{
				"name":"Molecular Assembler", // Interstellar
				"desc":"This factory builds products from the molecular level.",
				"prereqs":["Molecular Feed"]
			},
			{
				"name":"Atomic Assembler", // Galactic
				"desc":"Even more advanced than the molecular assembler, this factory operations with atomic presision.",
				"prereqs":["Galactic Core Base"]
			},
			{
				"name":"Quantum Assembler", // Cosmic
				"desc":"Using some sort of exotic quantum gravity principles that are discovered in the far future, this assembler operations at the quantum level.",
				"prereqs":["Quantum Vacuum Plant"]
			},
			{
				"name":"Materializer", // Transcendent
				"desc":"This factory produces matter directly from quantum fluctuations.",
				"prereqs":["Brane Factory"]
			}
		]
	},
	{
		"pane":"Offworld Manufacturing",
		"resources":[
			{
				"name":"Orbital Factory", // Nanotech
				"desc":"A factory in orbit around Earth.",
				"prereqs":["Microwave Plant"]
			},
			{
				"name":"Martian Factory", // Nanotech
				"desc":"A factory of Mars.",
				"prereqs":["Orbital Factory","Automated Factory","Martian Colony","Martian Mine"]
			},
			{
				"name":"Solar Factory", // Transhuman
				"desc":"A massive manufacturing plant in solar orbital space. It makes extensive use of solar power and captured asteroids for raw material.",
				"prereqs":["Sun"]
			},
			{
				"name":"Transtellar Factory", // Interstellar
				"desc":"A gargantuan factory that makes use of transtellar material for fusion energy and raw materials.",
				"prereqs":["Oort Cloud"]
			},
			{
				"name":"Brane Factory", // Transcendent
				"desc":"Interactions between branes can produce matter in different universes.",
				"prereqs":["Branespace"]
			}
		]
	},
	{
		"pane":"Housing",
		"resources":[

		]
	},
	{
		"pane":"Group Housing",
		"resources":[
			{
				"name":"Rowhouses", // Upper Paleolithic
				"desc":"Single family homes that share walls.",
				"prereqs":["Stone Building"]
			},
			{
				"name":"Tenements", // Middle
				"desc":"Low income apartments",
				"prereqs":["Castle"]
			},
			{
				"name":"Dormitory", // Early Modern
				"desc":"Boarding house, often for students.",
				"prereqs":["University","Ocean"]
			},
			{
				"name":"Apartments", // Industrial
				"desc":"Typically multistorey structure containing many housing units.",
				"prereqs":["Telegraph Network"]
			},
			{
				"name":"Penthouse", // Industrial
				"desc":"Fancy apartment at the top floor. Doubles as sketchy investment vehicle.",
				"prereqs":["Telegraph Network"]
			},
			{
				"name":"Arcology Housing", // Transhuman
				"desc":"The housing quarter of an arcology.",
				"prereqs":["Arcology"]
			}
		]
	},
	{
		"pane":"Single Family Housing",
		"resources":[
			{
				"name": "Wood Shelter", // Upper Paleolithic
				"desc": "A basic shelter for resting.",
				"prereqs":["Wood Building"]
			},
			{
				"name": "Stone Shelter", // Upper Paleolithic
				"desc": "The stone shelter is more durable than the wood shelter and a better home.",
				"prereqs":["Stone Building"]
			},
			{
				"name":"Dugout", // Upper Paleolithic
				"desc":"A house partially or complete dug into the ground or the side of a hill.",
				"prereqs":["Stone Building"]
			},
			{
				"name": "Stilt House", // Upper Paleolithic
				"desc": "Stilt houses are built to protect against flooding and vermin.",
				"prereqs":["Stone Building"]
			},
			{
				"name":"Igloo", // Upper Paleolithic
				"desc":"House made of snow/ice.",
				"prereqs":["Tundra"]
			},
			{
				"name":"Longhouse", // Neolithic
				"prereqs":["Wood","Settlement"],
				"desc":"Longhouses are long, timber-built houses that were common in Neolithic settlements."
			},
			{
				"name":"Roundhouse", // Bronze
				"desc":"Roundhouses were standard housing in some parts of the world from the Bronze Age.",
				"prereqs":["Town"]
			},
			{
				"name":"Cottage", // Classical
				"desc":"Small house.",
				"prereqs":["Sea"]
			},
			{
				"name":"Log Cabin", // Early Modern
				"desc":"A frontier house.",
				"prereqs":["Plains"]
			},
			{
				"name":"Prefabricated Houses", // Machine
				"desc":"Cheap, mass-produced housing.",
				"prereqs":["Industrial Park"]
			},
			{
				"name":"Single Family House", // Atomic
				"desc":"A modern, stand-alone house.",
				"prereqs":["Freeway"]
			},
			{
				"name":"Manor House", // Middle
				"desc":"The basic unit of feudal society.",
				"prereqs":["Castle"]
			},
			{
				"name":"Mansion", // Middle
				"desc":"Large, luxurious single family home.",
				"prereqs":["Castle"]
			}
		]
	},
	{
		"pane":"Mobile Housing",
		"resources":[
			{
				"name":"Trailer Park", // Machine
				"desc":"Camp for mobile homes.",
				"prereqs":["Car"]
			},
			{
				"name":"Houseboat", // Machine
				"desc":"A boat converted to a house and moored. Can be moved as needed.",
				"prereqs":["Car"]
			},
			{
				"name":"Seastead", // Information
				"desc":"Housing at the open sea.",
				"prereqs":["Ocean City"]
			},
			{
				"name":"Dronehouse", // Nanotech
				"desc":"Motorized, modular home that can fly and attach and detach itself to superstructures.",
				"prereqs":["Flying Car"]
			},
			{
				"name":"Cloud Nine", // Transhuman
				"desc":"Cloud Nine is the name Buckminster Fuller gave to his proposed airborne habitats created from giant geodesic spheres, which might be made to levitate by slightly heating the air inside above the ambient temperature.",
				"prereqs":["Eperopolis"]
			}
		]
	},
	{
		"pane": "Free Space Development",
		"resources": [
			{
				"name": "Space Station", // Information
				"desc": "Early monolithic space stations include the Salyut and Almaz classes and Skylab. They were followed by Mir, the International Space Station, and the Tiangong series. More research and commercial stations may follow in the 2020s.",
				"prereqs":["Megacity","Launch Site"]
			},
			{
				"name": "Space Colony", // Nanotech
				"desc": "A rotating habitat in orbit around Earth.",
				"prereqs":["Basic Income","Personalized Medicine","Wearable Computer","Decentralization","Aerogel","Inner Solar System","Cislunar Space","Graphene"]
			},
			{
				"name": "Deep Space Colony", // Transhuman
				"desc": "A rotating habitat in orbit around the Sun.",
				"prereqs":["Abiogenesis","Spaceship Commander","Mars City","Synthetic Protein"]
			},
			{
				"name": "O'Neill Cylinder", // Transhuman
				"desc": "A rotating space colony proposed by Gerard K. O'Neill.",
				"prereqs":["Artificial Superintelligence","Core Mine","Cold Fusion"]
			},
			{
				"name": "Kuiper Belt Outpost", // Transhuman
				"desc": "A city in the Kuiper Belt.",
				"prereqs":["Kuiper Belt Object"]
			},
			{
				"name": "Planet Cloud", // Interstellar
				"desc": "Using orbital rings and fast space launch, the planet cloud is an integrated city of Earth's surface, orbital space, and the Moon.",
				"prereqs":["Ecumenopolis","O'Neill Cylinder"]
			}
		]
	},
	{
		"pane":"Interplanetary Development",
		"resources":[
			{
				"name": "Lunar Base", // Information
				"desc": "Proposals to build a research base or colony on the Moon have yet to come to fruition. As of 2020, NASA's Project Artemis envisions a base will be established in the 2030s.",
				"prereqs":["Space Station","Lunar Crater"]
			},
			{
				"name": "Lunar Colony", // Nanotech
				"desc": "A city on the Moon. The colony houses a permanent population.",
				"prereqs":["Fusion Power Plant","Lunar Base"]
			},
			{
				"name": "Martian Colony", // Nanotech
				"desc": "A city on Mars.",
				"prereqs":["Martian Planum","Martian Mountain","Martian Mare","Martian Crater","Martian Canyon","Martian Pole","Lunar Colony"]
			},
			{
				"name": "Mars City", // Nanotech
				"desc": "A large, self-sufficient city on Mars.",
				"prereqs":["Martian Mine","Vactrain","Helium-3"]
			},
			{
				"name": "Venus Floating City", // Nanotech
				"desc": "A city that is suspended by buoyancy in the upper atmosphere of Venus.",
				"prereqs":["Venus Clouds","Lunar Colony"]
			},
			{
				"name": "Venus Surface City", // Transhuman
				"desc": "Advances in material sciences allow this city to thrive on the surface of Venus.",
				"prereqs":["Venus Floating City","Venus Highlands","O'Neill Cylinder"]
			},
			{
				"name": "Asteroid City", // Transhuman
				"desc": "A city in a hollowed out asteroid.",
				"prereqs":["Asteroid Base"]
			}
		]
	},
	{
		"pane":"Interstellar Development",
		"resources":[
			{
				"name": "Transtellar Colony", // Interstellar
				"desc": "A self-sufficient civilization outside of the Solar System.",
				"prereqs":["Solar Factory","Spaceship","Kuiper Belt Mine","Planetary Civilization"]
			},
			{
				"name": "Interstellar Colony", // Interstellar
				"desc": "A colony near a star other than the Sun. Initially it is the starship itself, parked into orbit and subsisting off the star's energy and local raw materials.",
				"prereqs":["Super Earth","Water Planet","Desert Planet"]
			},
			{
				"name": "Exoplanetary Base", // Interstellar
				"desc": "An outpost on the surface of an exoplanet.",
				"prereqs":["Desert Planet"]
			},
			{
				"name": "Dyson Sphere", // Galactic
				"desc": "A structure that encompasses a whole star and harvests most of its energy output. A bit excessive.",
				"prereqs":["Orion Arm","Terraformed Mars","Terraformed Venus","Teleport Station"]
			},
			{
				"name": "Galactic Core Base", // Galactic
				"desc": "An outpost near the core of the Milky Way.",
				"prereqs":["Galactic Core"]
			},
			{
				"name": "Artificial Planet", // Galactic
				"desc": "A habitable planet built from raw materials.",
				"prereqs":["Matrioshka Brain","Star Scoop"]
			}
		]
	},
	{
		"pane":"Intergalactic Development",
		"resources":[
			{
				"name": "Intergalactic Civilization", // Galactic
				"desc": "A daughter civilization outside of the home galaxy.",
				"prereqs":["Neutrino Network","Galaxy Cluster"]
			},
			{
				"name": "Intercluster Civilization", // Cosmic
				"desc": "A daughter civilization beyond the home supercluster.",
				"prereqs":["Tachyon Network"]
			}
		]
	},
	{
		"pane":"Interdimensional Development",
		"resources":[
			{
				"name": "High Dimensional City", // Transcendent
				"desc": "Three spatial dimensions are so 29th century.",
				"prereqs":["Quantonium"]
			}
		]
	},
	{
		"pane":"Calendar",
		"resources":[
			{
				"name":"Seasonal Patterns", // Upper Paleolithic
				"prereqs":["Language"]
			},
			{
				"name":"Lunar Cycles", // Neolithic
				"prereqs":["Megalith"]
			},
			{
				"name":"Lunar Calendar", // Bronze
				"prereqs":["Plow","Orator"]
			},
			{
				"name":"Solar Calendar", // Bronze
				"prereqs":["Plow","Orator"]
			}
		]
	},
	{
		"pane":"Spoken Language",
		"resources":[
			{
				"name": "Language", // Upper Paleolithic
				"desc": "The advent of language, which followed behavior modernity, is a critical step in devloping a more complex society.",
				"prereqs":["Negotiation"]
			},
			{
				"name": "Oral Tradition", // Neolithic
				"prereqs":["Temple"],
				"desc": "Under an oral tradition, history, law, and literature are passed from one generation to the next orally."
			}
		]
	},
	{
		"pane":"Written Language",
		"resources":[
			{
				"name":"Pictographic Language", // Upper Paleolithic
				"prereqs":["Language"]
			},
			{
				"name":"Ideographic Language", // Neolithic
				"prereqs":["Settlement"]
			},
			{
				"name":"Logographic Language", // Bronze
				"prereqs":["Lake"]
			},
			{
				"name":"Alphabetic Language", // Classical
				"prereqs":["Smith's Workshop"]
			},
			{
				"name":"Numeral System", // Classical
				"prereqs":["Alphabetic Language","Seaport"]
			},
			{
				"name":"Typography", // Industrial
				"prereqs":["Typewriters"]
			}
		]
	},
	{
		"pane":"Writing",
		"resources":[
			{
				"name":"Clay Tablet", // Bronze
				"prereqs":["Logographic Language","Clay"]
			},
			{
				"name":"Stone Tablet", // Bronze
				"prereqs":["Logographic Language","Stone"]
			},
			{
				"name":"Papyrus", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Paper Writing", // Middle
				"prereqs":["Professor","Paper"]
			},
			{
				"name":"Books", // Early Modern
				"prereqs":["Printing Press"]
			},
			{
				"name":"Newsprint", // Industrial
				"prereqs":["Typewriters"]
			}
		]
	},
	{
		"pane":"Semiotic Language",
		"resources":[
			{
				"name":"Semiotic Communication", // Nanotech
				"prereqs":["Artificial General Intelligence"]
			}
		]
	},
	{
		"pane":"Astronomy",
		"resources":[
			{
				"name":"Geocentrism", // Classical
				"prereqs":["Numeral System"]
			},
			{
				"name":"Observatory", // Early Modern
				"prereqs":["Celestial Mechanics"]
			},
			{
				"name":"Celestial Mechanics", // Early Modern
				"prereqs":["Physical Mechanics"]
			},
			{
				"name":"Observe Jovian Moons", // Early Modern
				"prereqs":["Observatory"]
			},
			{
				"name":"Radio Astronomy", // Machine
				"prereqs":["Atomic Physics","Radio"]
			},
			{
				"name":"Planetarium", // Atomic
				"prereqs":["Lunar Hill","Radio Astronomy"]
			},
			{
				"name":"Cosmology", // Atomic
				"prereqs":["Planetarium","Particle Physics"]
			},
			{
				"name":"Exoplanet Discovery", // Information
				"prereqs":["Astrobiology"]
			},
			{
				"name":"Neutrino Observatory", // Information
				"prereqs":["Exoplanet Discovery"]
			},
			{
				"name":"Gravity Wave Detector", // Information
				"prereqs":["Exoplanet Discovery"]
			}
		]
	},
	{
		"pane":"Earth Science",
		"resources":[
			{
				"name":"Cartography", // Early Modern
				"prereqs":["Duchy"]
			},
			{
				"name":"Geology", // Early Modern
				"prereqs":["Cartography","Colony"]
			},
			{
				"name":"Paleontology", // Early Modern
				"prereqs":["Geology"]
			},
			{
				"name":"Deep Sea Exploration", // Atomic
				"prereqs":["Particle Physics"]
			},
			{
				"name":"Ecology", // Atomic
				"prereqs":["Nuclear Power Plant"]
			}
		]
	},
	{
		"pane":"Physics",
		"resources":[
			{
				"name":"Physical Mechanics", // Early Modern
				"prereqs":["Calculus"]
			},
			{
				"name":"Thermodynamics", // Industrial
				"prereqs":["Hydrogen"]
			},
			{
				"name":"Electromagnetism", // Industrial
				"prereqs":["Thermodynamics"]
			},
			{
				"name":"Atomic Physics", // Machine
				"prereqs":["Abstract Mathematics"]
			},
			{
				"name":"Aerodynamics", // Machine
				"prereqs":["Abstract Mathematics","Aircraft"]
			},
			{
				"name":"Special Relativity", // Machine
				"prereqs":["Atomic Physics"]
			},
			{
				"name":"General Relativity", // Machine
				"prereqs":["Special Relativity"]
			},
			{
				"name":"Quantum Theory", // Machine
				"prereqs":["Special Relativity"]
			},
			{
				"name":"Particle Physics", // Atomic
				"prereqs":["Modern Skyscraper"]
			},
			{
				"name":"String Theory", // Information
				"prereqs":["Particle Accelerator"]
			},
			{
				"name":"Particle Accelerator", // Information
				"prereqs":["Superconductor"]
			},
			{
				"name":"Quantum Gravity", // Information
				"prereqs":["Particle Accelerator"]
			},
			{
				"name":"Unification Physics", // Transhuman
				"prereqs":["Stratospheric Tower"]
			}
		]
	},
	{
		"pane":"Biology",
		"resources":[
			{
				"name":"Microbiology", // Early Modern
				"prereqs":["Geology"]
			},
			{
				"name":"Botany", // Early Modern
				"prereqs":["Microbiology"]
			},
			{
				"name":"Zoology", // Industrial
				"prereqs":["Thermodynamics"]
			},
			{
				"name":"Biological Taxonomy", // Industrial
				"prereqs":["Zoology"]
			},
			{
				"name":"Theory of Evolution", // Industrial
				"prereqs":["Zoology"]
			},
			{
				"name":"Double Helix", // Atomic
				"prereqs":["Ecology"]
			},
			{
				"name":"Genetics", // Atomic
				"prereqs":["Double Helix"]
			},
			{
				"name":"Astrobiology", // Information
				"prereqs":["Particle Accelerator"]
			},
			{
				"name":"Abiogenesis", // Nanotech
				"prereqs":["Megatower","Astrobiology"]
			},
			{
				"name":"Alternative Biochemistry", // Transhuman
				"prereqs":["Stratospheric Tower"]
			},
			{
				"name":"Nucleonic Biology", // Galactic
				"prereqs":["AB Matter"]
			},
			{
				"name":"Abstract Biology", // Cosmic
				"prereqs":["Magmatter","Dark Matter"]
			}
		]
	},
	{
		"pane":"Mathematics",
		"resources":[
			{
				"name":"Counting", // Upper Paleolithic
				"prereqs":["Tribal Government"]
			},
			{
				"name":"Arithmetic", // Bronze
				"prereqs":["Ancient Mathematics"]
			},
			{
				"name":"Zero", // Classical
				"prereqs":["Numeral System"]
			},
			{
				"name":"Ancient Mathematics", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Geometry", // Classical
				"prereqs":["Numeral System"]
			},
			{
				"name":"Algebra", // Middle
				"prereqs":["Professor","Geometry"]
			},
			{
				"name":"Calculus", // Early Modern
				"prereqs":["Colony","Cartography"]
			},
			{
				"name":"Statistics", // Industrial
				"prereqs":["Grade School"]
			},
			{
				"name":"Abstract Mathematics", // Machine
				"prereqs":["Skyscraper"]
			},
			{
				"name":"Graph Theory", // Atomic
				"prereqs":["Abstract Mathematics","Mainframe"]
			},
			{
				"name":"Abstract Algebra", // Atomic
				"prereqs":["Modern Skyscraper"]
			},
			{
				"name":"Computer Science", // Atomic
				"prereqs":["Semiconductor"]
			}
		]
	},
	{
		"pane":"Chemistry",
		"resources":[
			{
				"name":"Alchemy", // Middle
				"prereqs":["Crop Rotation","Castle"]
			},
			{
				"name":"Periodic Table", // Industrial
				"prereqs":["Electromagnetism"]
			},
			{
				"name":"Organic Chemistry", // Industrial
				"prereqs":["Electromagnetism"]
			},
			{
				"name":"Biochemistry", // Atomic
				"prereqs":["Genetics"]
			},
			{
				"name":"Quantum Chemistry", // Information
				"prereqs":["Particle Accelerator"]
			}
		]
	},
	{
		"pane":"Medicine",
		"resources":[
			{
				"name":"Humorism", // Classical
				"prereqs":["Alphabetic Language","Seaport"]
			},
			{
				"name":"Anatomy", // Early Modern
				"prereqs":["Calculus"]
			},
			{
				"name":"Public Health", // Industrial
				"prereqs":["Statistics"]
			},
			{
				"name":"Neuroscience", // Atomic
				"prereqs":["Genetics"]
			},
			{
				"name":"Molecular Medicine", // Information
				"prereqs":["Materials Science"]
			},
			{
				"name":"Gene Therapy", // Information
				"prereqs":["Materials Science"]
			},
			{
				"name":"Personalized Medicine", // Information
				"prereqs":["Molecular Medicine","Gene Therapy"]
			}
		]
	},
	{
		"pane":"Economics",
		"resources":[
			{
				"name":"Accounting", // Early Modern
				"prereqs":["Duchy"]
			},
			{
				"name":"Mercantilism", // Early Modern
				"prereqs":["Commercial Seaport"]
			},
			{
				"name":"Microeconomics", // Early Modern
				"prereqs":["Mercantilism"]
			},
			{
				"name":"Macroeconomics", // Early Modern
				"prereqs":["Mercantilism"]
			},
			{
				"name":"Marxism", // Industrial
				"prereqs":["Nationalist"]
			},
			{
				"name":"Neo-Classical Economics", // Machine
				"prereqs":["Abstract Mathematics"]
			},
			{
				"name":"Keynesianism", // Machine
				"prereqs":["Neo-Classical Economics"]
			},
			{
				"name":"Monetarism", // Atomic
				"prereqs":["Marketing","Modern Skyscraper"]
			}
		]
	},
	{
		"pane":"Anthropology",
		"resources":[
			{
				"name":"History", // Classical
				"prereqs":["Alphabetic Language","Seaport"]
			},
			{
				"name":"Political Science", /// Early Modern
				"prereqs":["Cartography","Lawyer"]
			},
			{
				"name":"Psychology", // Machine
				"prereqs":["Abstract Mathematics"]
			},
			{
				"name":"Archaeology", // Machine
				"prereqs":["Psychology"]
			},
			{
				"name":"Linguistics", // Machine
				"prereqs":["Psychology"]
			},
			{
				"name":"Forensics", // Atomic
				"prereqs":["Genetics"]
			}
		]
	},
	{
		"pane":"Skills",
		"resources":[
			{
				"name":"Negotiation", // Upper Paleolithic
				"prereqs":["Tribal Government"]
			},
			{
				"name":"Deceit", // Upper Paleolithic
				"prereqs":["Tribal Government"]
			},
			{
				"name":"Blacksmithing", // Classical
				"prereqs":["Iron","Imperial Capitol"]
			},
			{
				"name":"Horseback Riding", // Classical
				"prereqs":["Paved Road"]
			},
			{
				"name":"Sailing", // Early Modern
				"prereqs":["Commercial Seaport"]
			},
			{
				"name":"Aviation", // Machine
				"prereqs":["Aircraft"]
			},
			{
				"name":"Marketing", // Atomic
				"prereqs":["Mainframe"]
			}
		]
	},
	{
		"pane":"Engineering",
		"resources":[
			{
				"name":"Construction Skill", // Neolithic
				"prereqs":["Masonry Building"]
			},
			{
				"name":"Naval Engineering", // Middle
				"prereqs":["University"]
			},
			{
				"name":"Hydraulic Engineering", // Industrial
				"prereqs":["Factory"]
			},
			{
				"name":"Mining Engineering", // Machine
				"prereqs":["Tungsten","Aluminum","Magnesium"]
			},
			{
				"name":"Civil Engineering", // Machine
				"prereqs":["Skyscraper"]
			},
			{
				"name":"Mechanical Engineering", // Machine
				"prereqs":["Civil Engineering"]
			},
			{
				"name":"Chemical Engineering", // Machine
				"prereqs":["Industrial Policy"]
			},
			{
				"name":"Logistics", // Atomic
				"prereqs":["Modern Skyscraper"]
			},
			{
				"name":"Electrical Engineering", // Atomic
				"prereqs":["Semiconductor"]
			},
			{
				"name":"Nuclear Engineering", // Atomic
				"prereqs":["Nuclear Power Plant"]
			},
			{
				"name":"Software Engineering", // Atomic
				"prereqs":["Machine Code"]
			},
			{
				"name":"Materials Science", // Information
				"prereqs":["Particle Accelerator","Carbon Nanotubes"]
			}
		]
	},
	{
		"pane":"Hardware",
		"resources":[
			{
				"name":"Tabulating Machine", // Machine
				"prereqs":["Industrial Park"]
			},
			{
				"name":"Vacuum Tubes", // Machine
				"prereqs":["Tabulating Machine"]
			},
			{
				"name":"Punch Cards", // Machine
				"prereqs":["Tabulating Machine"]
			},
			{
				"name":"Mainframe", // Atomic
				"prereqs":["Manufacturing Plant"]
			},
			{
				"name":"Semiconductor", // Atomic
				"prereqs":["Silicon","Mainframe"]
			},
			{
				"name":"Microprocessor", // Atomic
				"prereqs":["Operating System"]
			},
			{
				"name":"Personal Computer", // Atomic
				"prereqs":["Microprocessor"]
			},
			{
				"name":"Floppy Disks", // Atomic
				"prereqs":["Personal Computer"]
			},
			{
				"name":"Personal Electronics", // Atomic
				"prereqs":["Personal Computer"]
			},
			{
				"name":"Optical Storage", // Atomic
				"prereqs":["Personal Electronics","Floppy Disks"]
			},
			{
				"name":"Cell Phone", // Atomic
				"prereqs":["Personal Electronics"]
			},
			{
				"name":"Flash Memory", // Information
				"prereqs":["Optical Storage","World Wide Web"]
			},
			{
				"name":"Smartphone", // Information
				"prereqs":["Touchscreen"]
			},
			{
				"name":"Wearable Computer", // Information
				"prereqs":["Embedded Software","Augmented Reality"]
			},
			{
				"name":"Nanoelectronics", // Nanotech
				"prereqs":["Space Colony"]
			},
			{
				"name":"DNA Storage", // Nanotech
				"prereqs":["Nanoelectronics"]
			},
			{
				"name":"Optical Computer", // Nanotech
				"prereqs":["Cloud Robotics","Nanoelectronics"]
			},
			{
				"name":"Quantum Computer", // Nanotech
				"prereqs":["Neural Interface","Automated Factory"]
			},
			{
				"name":"Gravitronic Computer", // Galactic
				"prereqs":["Spiral Galaxy"]
			},
			{
				"name":"Hypercomputer", // Transcendent
				"prereqs":["Brane Factory"]
			}
		]
	},
	{
		"pane":"Programming",
		"resources":[
			{
				"name":"Machine Code", // Atomic
				"prereqs":["Mainframe"]
			},
			{
				"name":"Assembler", // Atomic
				"prereqs":["Machine Code"]
			},
			{
				"name":"Compiler", // Atomic
				"prereqs":["Semiconductor","Assembler"]
			},
			{
				"name":"Interpreter", // Information
				"prereqs":["Fiber Optic Cable"]
			},
			{
				"name":"Natural Language Program", // Nanotech
				"prereqs":["Optical Computer"]
			}
		]
	},
	{
		"pane":"Software",
		"resources":[
			{
				"name":"Operating System", // Atomic
				"prereqs":["Compiler"]
			},
			{
				"name":"Word Processor", // Atomic
				"prereqs":["Personal Computer"]
			},
			{
				"name":"Spreadsheet", // Atomic
				"prereqs":["Personal Computer"]
			},
			{
				"name":"Database", // Atomic
				"prereqs":["Personal Computer"]
			},
			{
				"name":"Embedded Software", // Information
				"prereqs":["Internet of Things"]
			},
			{
				"name":"Geographic Information System", // Information
				"prereqs":["Cloud Server"]
			}
		]
	},
	{
		"pane":"Human-Computer Interaction",
		"resources":[
			{
				"name":"Textual Interface", // Atomic
				"prereqs":["Personal Computer"]
			},
			{
				"name":"Graphical User Interface", // Atomic
				"prereqs":["Textual Interface"]
			},
			{
				"name":"Computer Peripherals", // Atomic
				"prereqs":["Microprocessor"]
			},
			{
				"name":"Touchscreen", // Information
				"prereqs":["Flash Memory","Machine Learning"]
			},
			{
				"name":"Voice Interface", // Information
				"prereqs":["Smartphone"]
			},
			{
				"name":"Augmented Reality", // Information
				"prereqs":["Voice Interface"]
			},
			{
				"name":"Natural Language Interface", // Nanotech
				"prereqs":["Natural Language Program"]
			},
			{
				"name":"Neural Interface", // Nanotech
				"prereqs":["DNA Storage","Natural Language Program"]
			}
		]
	},
	{
		"pane":"Networking",
		"resources":[
			{
				"name":"Computer Networking", // Atomic
				"prereqs":["Microprocessor"]
			},
			{
				"name":"Network Protocol", // Atomic
				"prereqs":["Computer Networking"]
			},
			{
				"name":"World Wide Web", // Information
				"prereqs":["Megacity","Network Protocol"]
			},
			{
				"name":"Web Browser", // Information
				"prereqs":["World Wide Web"]
			},
			{
				"name":"Social Network", // Information
				"prereqs":["Smartphone"]
			},
			{
				"name":"Cloud Server", // Information
				"prereqs":["Machine Learning"]
			},
			{
				"name":"Blockchain", // Information
				"prereqs":["Cloud Server"]
			},
			{
				"name":"Internet of Things", // Information
				"prereqs":["Cloud Server"]
			},
			{
				"name":"Semantic Web", // Information
				"prereqs":["Blockchain"]
			},
			{
				"name":"Mesh Network", // Nanotech
				"prereqs":["Artificial General Intelligence"]
			},
			{
				"name":"Cloud Robotics", // Nanotech
				"prereqs":["Space Colony"]
			},
			{
				"name":"Ambient Intelligence", // Nanotech
				"prereqs":["Optical Computer"]
			}
		]
	},
	{
		"pane":"Artificial Intelligence",
		"resources":[
			{
				"name":"Expert System", // Atomic
				"prereqs":["Personal Computer"]
			},
			{
				"name":"Bayesian Network", // Atomic
				"prereqs":["Expert System"]
			},
			{
				"name":"Machine Learning", // Information
				"prereqs":["Interpreter"]
			},
			{
				"name":"Evolutionary Algorithm", // Information
				"prereqs":["Internet of Things"]
			},
			{
				"name":"Deep Learning", // Information
				"prereqs":["Machine Learning"]
			},
			{
				"name":"Narrow AI", // Information
				"prereqs":["Evolutionary Algorithm"]
			},
			{
				"name":"Artificial General Intelligence", // Nanotech
				"prereqs":["Quantum Computer"]
			},
			{
				"name":"Artificial Superintelligence", // Transhuman
				"prereqs":["Unification Physics"]
			},
			{
				"name":"Technological Singularity", // Transhuman
				"prereqs":["Artificial Superintelligence"]
			}
		]
	},
	{
		"pane": "Society",
		"resources": [

		]
	},
	{
		"pane": "Scope",
		"resources": [
			{
				"name":"Band", // Lower Paleolithic
				"prereqs":["Human","Campsite"]
			},
			{
				"name": "Tribe", // Upper Paleolithic
				"desc": "An organized tribe, based on mutual interpersonal familiarity.",
				"prereqs":["Human", "Grain Storage", "Fire Pit"]
			},
			{
				"name": "Chiefdom", // Neolithic
				"desc": "A large, hierarchical society unified by a sense of tribal identity.",
				"prereqs":["Human","Stone Building","Island","Pictographic Language","Cave Painting"]
			},
			{
				"name":"Kingdom", // Bronze
				"prereqs":["Archipelago"]
			},
			{
				"name": "Empire", // Classical
				"desc": "An empire, consisting of multiple distinct cultures.",
				"prereqs":["Capitol City","Fort","Polytheism","Scriptures","Palace"]
			},
			{
				"name": "Nation", // Early Modern
				"desc": "A modern nation-state.",
				"prereqs":["Classicism","Representative Democracy","Man'O'War","Cottage Industry"]
			},
			{
				"name":"Planetary Civilization", // Transhuman
				"prereqs":["Eperopolis"]
			},
			{
				"name":"Solar Civilization", // Interstellar
				"prereqs":["Computronium"]
			},
			{
				"name":"Galactic Civilization", // Galactic
				"prereqs":["Galactic Core"]
			},
			{
				"name": "Intergalactic Empire", // Cosmic
				"desc": "A unified empires that spans galaxies.",
				"prereqs":["Intergalactic Civilization"]
			},
			{
				"name":"Cosmic Civilization" // Transcendent
			},
			{
				"name": "Simulation Transcendence", // Transcendent
				"desc": "A civilization that transcends reality.",
				"prereqs":["Unobtainium"]
			}
		]
	},
	{
		"pane":"Federation",
		"resources":[
			{
				"name":"Confederation", // Bronze
				"prereqs":["Kingdom"]
			},
			{
				"name":"Alliance", // Bronze
				"prereqs":["Kingdom"]
			},
			{
				"name": "Multinational Federation", // Atomic
				"desc": "A loose union of nations covering the world or a continent.",
				"prereqs":["Industrial Policy","Surrealism","Air Force Base","Radio"]
			},
			{
				"name":"Galactic Federation", // Galactic
				"prereqs":["Galactic Core"]
			}
		]
	},
	{
		"pane": "Substates",
		"resources": [
			{
				"name": "Vassal State", // Middle
				"desc": "A vassal state is not formally part of your empire but under your control.",
				"prereqs":["Cottage","Legend"]
			},
			{
				"name": "Principality", // Middle
				"desc": "A monarchical feudatory state.",
				"prereqs":["Plaza","History","Watermill","Paper"]
			},
			{
				"name": "Duchy", // Early Modern
				"desc": "A country ruled by a duke or duchess.",
				"prereqs":["Garrison","Paper Writing","Cathedral"]
			},
			{
				"name": "Colony", // Early Modern
				"desc": "A territory under your direct control but not considered part of the home territory. Here a colony is specifically one in the New World.",
				"prereqs":["Boreal Forest"]
			},
			{
				"name": "Special Economic Zone", // Atomic
				"desc": "A special economic zone is a city or region with separate business and trade laws. The Shenzhen Special Economic Zone, established in 1980 as part of Deng Xiaoping's economic reforms, is a prominent example.",
				"prereqs":["Logistics"]
			},
			{
				"name": "Charter City", // Information
				"desc": "A charter city is a political structure that allows a city a high degree of autonomy while still a member of a nation state.",
				"prereqs":["Seastead"]
			},
			{
				"name": "Distant Civilization", // Transcendent
				"desc": "A civilization beyond the cosmic horizon.",
				"prereqs":["Neutronium","Abstract Biology","Mirror Matter","Abandoned Megastructure"]
			}
		]
	},
	{
		"pane":"Form of Government",
		"resources":[
			{
				"name":"Tribal Government", // Upper Paleolithic
				"prereqs":["Tribe"]
			},
			{
				"name":"Chiefdom Government", // Neolithic
				"prereqs":["Chiefdom"]
			},
			{
				"name":"Despotism", // Bronze
				"prereqs":["Kingdom"]
			},
			{
				"name":"Monarchy", // Bronze
				"prereqs":["Kingdom"]
			},
			{
				"name":"Direct Democracy", // Classical
				"prereqs":["Philosopher","Seaport"]
			},
			{
				"name":"Imperial Rule", // Classical
				"prereqs":["Sea"]
			},
			{
				"name":"Theocracy", // Middle
				"prereqs":["Doctrinnaire"]
			},
			{
				"name":"Absolutism", // Early Modern
				"prereqs":["Duchy"]
			},
			{
				"name":"Constitutional Monarchy", // Early Modern
				"prereqs":["Political Science"]
			},
			{
				"name":"Representative Democracy", // Early Modern
				"prereqs":["Political Science"]
			},
			{
				"name":"Totalitarianism", // Atomic
				"prereqs":["Fascist","Communist","Multinational Federation"]
			},
			{
				"name":"Decentralization", // Information
				"prereqs":["Charter City","Blockchain"]
			},
			{
				"name":"Noocracy", // Transhuman
				"prereqs":["Hivemind","Planetary Civilization"]
			},
			{
				"name":"Singleton", // Transhuman
				"prereqs":["AI Agent"]
			}
		]
	},
	{
		"pane":"Ideology",
		"resources":[
			{
				"name":"Kinship", // Lower Paleolithic
				"prereqs":["Human"]
			},
			{
				"name":"Traditionalism", // Neolithic
				"prereqs":["Oral Tradition","Settlement"]
			},
			{
				"name":"Doctrinnaire", // Middle
				"prereqs":["Monastery"]
			},
			{
				"name":"Enlightenment", // Early Modern
				"prereqs":["Constitutional Monarchy"]
			},
			{
				"name":"Laissez Faire", // Industrial
				"prereqs":["Nationalist"]
			},
			{
				"name":"Nationalist", // Industrial
				"prereqs":["Nation"]
			},
			{
				"name":"Socialist", // Industrial
				"prereqs":["Marxism"]
			},
			{
				"name":"Communist", // Machine
				"prereqs":["Industrial Policy"]
			},
			{
				"name":"Fascist", // Machine
				"prereqs":["Industrial Policy","Psychology"]
			},
			{
				"name":"Neoliberal", // Atomic
				"prereqs":["Special Economic Zone"]
			},
			{
				"name":"Ecologism", // Information
				"prereqs":["Solar PV Farm"]
			},
			{
				"name":"Vocationism", // Nanotech
				"prereqs":["Artificial General Intelligence"]
			}
		]
	},
	{
		"pane":"Policy",
		"resources":[
			{
				"name":"Closed Borders" // Bronze
			},
			{
				"name":"State Charity", // Middle
				"prereqs":["Cathedral"]
			},
			{
				"name":"Regulated Immigration", // Early Modern
				"prereqs":["Representative Democracy"]
			},
			{
				"name":"Restricted Emigration", // Early Modern
				"prereqs":["Constitutional Monarchy"]
			},
			{
				"name":"Industrial Policy", // Machine
				"prereqs":["Industrial Park"]
			},
			{
				"name":"Drug Ban", // Machine
				"prereqs":["Industrial Policy"]
			},
			{
				"name":"Old Age Pension", // Machine
				"prereqs":["Industrial Policy"]
			},
			{
				"name":"Basic Income", // Information
				"prereqs":["Ecologism"]
			}
		]
	},
	{
		"pane":"Administration",
		"resources":[
			{
				"name":"Palace", // Bronze
				"prereqs":["Kingdom","Gold"]
			},
			{
				"name":"Civil Service", // Middle
				"prereqs":["Principality"]
			},
			{
				"name":"Capitol City", // Bronze
				"prereqs":["Kingdom"]
			},
			{
				"name":"Judiciary", // Early Modern
				"prereqs":["Constitutional Monarchy"]
			}
		]
	},
	{
		"pane": "Religions",
		"resources": [
			{
				"name": "Shamanistic Tradition", // Upper Paleolithic
				"desc": "Shamanistic beliefs center around a practitioner--a shaman--who is believed to communicate with the spirit world.",
				"prereqs":["Animistic Belief"]
			},
			{
				"name": "Druidic Tradition", // Upper Paleolithic
				"desc": "Druidism is a spiritual and legal tradition of ancient Celtic cultures.",
				"prereqs":["Language","Shamanistic Tradition"]
			},
			{
				"name": "Sun Worship", // Neolithic
				"prereqs":["Temple"],
				"desc": "Worship of the Sun."
			},
			{
				"name": "Moon Worship", // Neolithic
				"prereqs":["Temple","Lunar Cycles"],
				"desc": "Worship of the Moon."
			},
			{
				"name": "Ancestor Worship", // Neolithic
				"prereqs":["Temple"],
				"desc": "Worship of ancestors."
			},
			{
				"name": "Bull Worship", // Neolithic
				"prereqs":["Temple","Cow"],
				"desc": "Worship of bulls. There's no bull about it."
			},
			{
				"name": "Bear Worship", // Neolithic
				"prereqs":["Temple","Bear Pack"],
				"desc": "Worship of bears."
			},
			{
				"name":"Zoroastrianism", // Classical
				"prereqs":["Monotheism"]
			},
			{
				"name":"Judaism", // Classical
				"prereqs":["Zoroastrianism","Spiritual Realms"]
			},
			{
				"name":"Christianity", // Classical
				"prereqs":["Judaism","Imperial Rule"]
			},
			{
				"name":"Islam", // Middle
				"prereqs":["Monastery","Christianity"]
			},
			{
				"name":"Hinduism", // Bronze
				"prereqs":["Polytheism"]
			},
			{
				"name":"Buddhism", // Classical
				"prereqs":["Alphabetic Language","Hinduism"]
			},
			{
				"name":"Confucianism", // Classical
				"prereqs":["Alphabetic Language"]
			},
			{
				"name":"Taoism", // Classical
				"prereqs":["Confucianism"]
			}
		]
	},
	{
		"pane":"Religious Buildings",
		"resources":[
			{
				"name": "Graveyard", // Neolithic
				"prereqs":["Earthwork","Healer"],
				"desc": "People actually do die over time. Your _People_ are not fixed, the number is an abstraction of ... never mind."
			},
			{
				"name": "Temple", // Neolithic
				"prereqs":["Settlement"],
				"desc": "An ancient place of worship, often the focal point of a settlement."
			},
			{
				"name":"Church", // Middle
				"prereqs":["Monastery"]
			},
			{
				"name":"Monastery", // Middle
				"prereqs":["Principality"]
			},
			{
				"name":"Cathedral", // Middle
				"prereqs":["Castle","Church"]
			}
		]
	},
	{
		"pane":"Religious Beliefs",
		"resources":[
			{
				"name": "Animistic Belief", // Upper Paleolithic
				"desc": "Belief in the pervasiveness of spiritual essence in all things.",
				"prereqs":["Tribe"]
			},
			{
				"name":"Polytheism",  // Bronze
				"prereqs":["Scriptures"]
			},
			{
				"name":"Divine Incarnation", // Bronze
				"prereqs":["Scriptures"]
			},
			{
				"name":"Afterlife Belief", // Classical
				"prereqs":["Alphabetic Language"]
			},
			{
				"name":"Spiritual Realms", // Classical
				"prereqs":["Alphabetic Language"]
			},
			{
				"name":"Monotheism", // Classical
				"prereqs":["Alphabetic Language"]
			},
			{
				"name":"Reincarnation", // Bronze
				"prereqs":["Scriptures"]
			},
			{
				"name":"Soul", // Classical
				"prereqs":["Spiritual Realms","Afterlife Belief"]
			},
			{
				"name":"Fundamentalism", // Middle
				"prereqs":["Cathedral"]
			},
			{
				"name":"New Age", // Industrial
				"prereqs":["Socialist"]
			},
			{
				"name":"Syncretism", // Nanotech
				"prereqs":["Vocationism"]
			}
		]
	},
	{
		"pane":"Religious Practices",
		"resources":[
			{
				"name":"Sacrifice Ritual", // Bronze
				"prereqs":["Scriptures"]
			},
			{
				"name":"Scriptures", // Bronze
				"prereqs":["Orator","Scribe"]
			},
			{
				"name":"Dietary Regulation", // Bronze
				"prereqs":["Scriptures"]
			},
			{
				"name":"Sacrament", // Middle
				"prereqs":["Cathedral"]
			},
			{
				"name":"Vegetarianism", // Classical
				"prereqs":["Hinduism","Alphabetic Language"]
			},
			{
				"name":"Pilgrimage", // Middle
				"prereqs":["Castle","Church"]
			}
		]
	},
	{
		"pane":"Visual Art",
		"resources":[
			{
				"name": "Cave Painting", // Upper Paleolithic
				"desc": "An early cave painting",
				"prereqs":["Pictographic Language"]
			},
			{
				"name": "Rock Art", // Upper Paleolithic
				"desc": "Artwork carved into rock.",
				"prereqs":["Pictographic Language"]
			},
			{
				"name":"Woodcut", // Bronze
				"prereqs":["Scriptures"]
			},
			{
				"name":"Tapestry", // Classical
				"prereqs":["Plaza"]
			},
			{
				"name":"Oil Painting", // Early Modern
				"prereqs":["Duchy"]
			},
			{
				"name":"Mural", // Early Modern
				"prereqs":["Renaissance"]
			}
		]
	},
	{
		"pane":"Music",
		"resources":[
			{
				"name":"Prehistoric Song", // Upper Paleolithic
				"prereqs":["Tribe"]
			},
			{
				"name":"Folk Song", // Neolithic
				"prereqs":["Oral Tradition"]
			},
			{
				"name":"Sheet Music", // Classical
				"prereqs":["Plaza"]
			},
			{
				"name":"Chant", // Middle
				"prereqs":["Cathedral"]
			},
			{
				"name":"Electronic Music", // Atomic
				"prereqs":["Personal Computer"]
			}
		]
	},
	{
		"pane":"Monumental Building",
		"resources":[
			{
				"name": "Megalith", // Neolithic
				"prereqs":["Sense of Purpose"],
				"desc": "Megalith construction dates to the Mesolithic period with Gobleki Tepi around 9500 BC."
			},
			{
				"name": "Earthwork", // Neolithic
				"prereqs":["Sense of Purpose"],
				"desc": "Earthworks are ancient monuments build from or in the Earth, such as the Cahokia Mound or the Nazca Lines."
			},
			{
				"name":"Statue", // Bronze
				"prereqs":["Despotism"]
			},
			{
				"name":"Plaza", // Classical
				"prereqs":["Concrete","Seaport"]
			},
			{
				"name":"Formal Garden", // Middle
				"prereqs":["Castle"]
			},
			{
				"name":"Environmental Installation", // Atomic
				"prereqs":["Postmodernism","Ecology"]
			}
		]
	},
	{
		"pane":"Stories",
		"resources":[
			{
				"name":"Epic Poem", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Drama", // Classical
				"prereqs":["Plaza"]
			},
			{
				"name":"Legend", // Classical
				"prereqs":["Plaza"]
			},
			{
				"name":"Novel", // Industrial
				"prereqs":["Nationalist","Restaurant"]
			},
			{
				"name":"Musical", // Machine
				"prereqs":["Radio"]
			}
		]
	},
	{
		"pane":"Broadcast",
		"resources":[
			{
				"name":"Radio Play", // Machine
				"prereqs":["Radio"]
			},
			{
				"name":"Movie", // Machine
				"prereqs":["Skyscraper"]
			},
			{
				"name":"Soap Opera", // Atomic
				"prereqs":["Television Tower"]
			},
			{
				"name":"Sitcom", // Atomic
				"prereqs":["Television Tower"]
			},
			{
				"name":"Reality Show", // Information
				"prereqs":["Television Tower","Megacity"]
			}
		]
	},
	{
		"pane":"Electronic Art",
		"resources":[
			{
				"name":"Video Game", // Atomic
				"prereqs":["Personal Computer","Computer Peripherals"]
			},
			{
				"name":"Augmented Reality Game", // Information
				"prereqs":["Augmented Reality","Video Game"]
			},
			{
				"name":"Simulated Reality Game", // Transhuman
				"prereqs":["Hivemind"]
			}
		]
	},
	{
		"pane":"Artistic Style",
		"resources":[
			{
				"name":"Prehistoric Art", // Upper Paleolithic
				"prereqs":["Tribe"]
			},
			{
				"name":"Romanesque", // Middle
				"prereqs":["Formal Garden","Civil Service"]
			},
			{
				"name":"Gothic", // Middle
				"prereqs":["Formal Garden","Civil Service"]
			},
			{
				"name":"Renaissance", // Early Modern
				"prereqs":["Oil Painting"]
			},
			{
				"name":"Baroque", // Early Modern
				"prereqs":["Renaissance","Colony"]
			},
			{
				"name":"Classicism", // Early Modern
				"prereqs":["Baroque"]
			},
			{
				"name":"Romanticism", // Industrial
				"prereqs":["Marxism"]
			},
			{
				"name":"Realism", // Machine
				"prereqs":["Communist"]
			},
			{
				"name":"Impressionism", // Machine
				"prereqs":["Romanticism"]
			},
			{
				"name":"Cubism", // Machine
				"prereqs":["Realism","Impressionism"]
			},
			{
				"name":"Dada", // Machine
				"prereqs":["Cubism"]
			},
			{
				"name":"Surrealism", // Machine
				"prereqs":["Expressionism"]
			},
			{
				"name":"Expressionism", // Machine
				"prereqs":["Cubism"]
			},
			{
				"name":"Modern Art", // Atomic
				"prereqs":["Multinational Federation"]
			},
			{
				"name":"Pop Art", // Atomic
				"prereqs":["Modern Art"]
			},
			{
				"name":"Postmodernism", // Atomic
				"prereqs":["Pop Art"]
			}
		]
	},
	{
		"pane":"Tales",
		"resources":[
			{
				"name":"Myth", // Neolithic
				"prereqs":["Earthwork"]
			},
			{
				"name":"Nursery Rhyme", // Classical
				"prereqs":["Plaza"]
			},
			{
				"name":"Joke", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Urban Legend", // Bronze
				"prereqs":["Logographic Language"]
			},
			{
				"name":"Conspiracy Theory", // Bronze
				"prereqs":["Logographic Language"]
			}
		]
	},
	{
		"pane":"Hidden Knowledge",
		"resources":[
			{
				"name":"Philosopher's Stone", // Middle
				"prereqs":["Noble"]
			},
			{
				"name":"Fountain of Youth", // Middle
				"prereqs":["Noble"]
			},
			{
				"name":"Snake Oil", // Industrial
				"prereqs":["Laissez Faire","Greenhouse"]
			},
			{
				"name":"Perpetual Motion Machine", // Middle
				"prereqs":["Noble"]
			}
		]
	},
	{
		"pane": "Military",
		"resources": [

		]
	},
	{
		"pane": "Military Action",
		"resources": [

		],
		"actions":[
			{
				"name":"Fight", // Lower Paleolithic
				"prereqs_or":["Brute","Stone Thrower"]
			},
			{
				"name":"Raid", // Upper Paleolithic
				"prereqs":["Warrior", "Axeman"]
			},
			{
				"name":"Raid the Neanderthals", // Upper Paleolithic
				"prereqs":["Warrior", "Axeman"]
			},
			{
				"name":"Capture Slave", // Upper Paleolithic
				"prereqs":["Warrior", "Axeman"]
			},
			{
				"name":"War of Conquest", // Neolithic
				"prereqs":["Archer","Spearman"]
			},
			{
				"name":"Ritual War", // Classical
				"prereqs":["Alphabetic Language","Horseback Riding"]
			},
			{
				"name":"Religious War", // Middle
				"prereqs":["Knight","Crossbowman"]
			},
			{
				"name":"Imperial War", // Early Modern
				"prereqs":["Colony"]
			},
			{
				"name":"World War", // Machine
				"prereqs":["Carrier","Tank","Automatic Rifles","Propeller Fighter","Propeller Bomber"]
			},
			{
				"name":"Missile Attack", // Atomic
				"prereqs":["Missile Base"]
			},
			{
				"name":"Nuclear War", // Atomic
				"prereqs":["ICBM"]
			},
			{
				"name":"Interplanetary War", // Transhuman
				"prereqs":["Fusion Attack Ship"]
			},
			{
				"name":"Interstellar War", // Interstellar
				"prereqs":["Interstellar Colony","Teleport Station"]
			},
			{
				"name":"Cosmic War", // Transcendent
				"prereqs":["Cosmic Civilization"]
			}
		]
	},
	{
		"pane": "Units",
		"resources": [
			{
				"name": "Brute", // Lower Paleolithic
				"desc": "A basic brawler.",
				"prereq_resources":["Protein","Human"]
			},
			{
				"name": "Stone Thrower", // Lower Paleolithic
				"desc": "Does not live in a glass house.",
				"prereq_resources":["Protein","Human","Rocks"]
			},
			{
				"name": "Warrior", // Upper Paleolithic
				"desc": "A better trained warrior than the _Brute_.",
				"prereqs":["Spear"]
			},
			{
				"name": "Axeman", // Upper Paleolithic
				"desc": "Fights with an axe.",
				"prereqs":["Axe"]
			},
			{
				"name": "Spearman", // Neolithic
				"prereqs":["Walls"],
				"desc": "Fights with a spear."
			},
			{
				"name": "Archer", // Neolithic
				"prereqs":["Settlement"],
				"desc": "Archers were a staple of ancient warfare."
			},
			{
				"name":"Swordsman", // Bronze
				"prereqs":["Bronze Weapons","Bronze Armor"]
			},
			{
				"name":"Horse Archer", // Bronze
				"prereqs":["Horse","Archer"]
			},
			{
				"name":"Longbowman", // Middle
				"prereqs":["Forge"]
			},
			{
				"name":"Crossbowman", // Middle
				"prereqs":["Steel Armor"]
			},
			{
				"name":"Knight", // Middle
				"prereqs":["Steel Armor","Horse"]
			},
			{
				"name":"Ship Commander", // Early Modern
				"prereqs":["Carrack"]
			},
			{
				"name":"Musketman", // Early Modern
				"prereqs":["Matchlock Firearms"]
			},
			{
				"name":"Rifleman", // Early Modern
				"prereqs":["Rifles"]
			},
			{
				"name":"Cavalry", // Early Modern
				"prereqs":["Rifles","Horse"]
			},
			{
				"name":"Infantry", // Machine
				"prereqs":["Semiautomatic Rifles"]
			},
			{
				"name":"Tank Commander", // Machine
				"prereqs":["Tank"]
			},
			{
				"name":"Pilot", // Machine
				"prereqs":["Aircraft"]
			},
			{
				"name":"Missile Base Commander", // Atomic
				"prereqs":["Missile Base"]
			},
			{
				"name":"Spaceship Commander", // Nanotech
				"prereqs":["Ion Attack Ship"]
			},
			{
				"name":"Starship Commander", // Interstellar
				"prereqs":["Interstellar Spaceship"]
			}
		]
	},
	{
		"pane":"Military Construction",
		"resources":[
			{
				"name": "Walls", // Neolithic
				"prereqs":["Settlement"],
				"desc": "City walls for defense."
			},
			{
				"name":"Barracks", // Bronze
				"prereqs":["Swordsman"]
			},
			{
				"name":"Fort", // Bronze
				"prereqs":["Swordsman","Horse Archer"]
			},
			{
				"name":"Garrison", // Middle
				"prereqs":["Knight","Crossbowman","Longbowman"]
			},
			{
				"name":"Military Base", // Industrial
				"prereqs":["Nationalist"]
			},
			{
				"name":"Naval Base", // Industrial
				"prereqs":["Military Base"]
			},
			{
				"name":"Air Force Base", // Machine
				"prereqs":["Aviation"]
			},
			{
				"name":"Missile Base", // Atomic
				"prereqs":["Advanced Rocket","Nuclear Warhead"]
			},
			{
				"name":"Asteroid Base", // Transhuman
				"prereqs":["O'Neill Cylinder"]
			},
			{
				"name":"Rogue Planet Base", // Interstellar
				"prereqs":["Rogue Planet"]
			},
			{
				"name":"Nebula Base", // Galactic
				"prereqs":["Antimatter Attack Ship"]
			},
			{
				"name":"Void Base", // Cosmic
				"prereqs":["Void"]
			}
		]
	},
	{
		"pane":"Weapons",
		"resources":[
			{
				"name": "Axe", // Upper Paleolithic
				"desc": "Good for war or for cutting wood.",
				"prereqs":["Microlith"]
			},
			{
				"name": "Spear", // Upper Paleolithic
				"desc": "Good for hunting or cutting wood.",
				"prereqs":["Microlith"]
			},
			{
				"name":"Obsidian Weapons", // Neolithic
				"prereqs":["Archer","Spearman","Pumice"]
			},
			{
				"name":"Bronze Weapons", // Bronze
				"prereqs":["Bronze Tools"]
			},
			{
				"name":"Steel Weapons" // Clasical
			},
			{
				"name":"Laser Weapons", // Information
				"prereqs":["Manufacturing District"]
			}
		]
	},
	{
		"pane":"Armor",
		"resources":[
			{
				"name":"Bronze Armor", // Bronze
				"prereqs":["Bronze Tools"]
			},
			{
				"name":"Steel Armor", // Middle
				"prereqs":["Steel Tools"]
			},
			{
				"name":"Kevlar Armor", // Atomic
				"prereqs":["Composite Tools"]
			}
		]
	},
	{
		"pane":"Firearms",
		"resources":[
			{
				"name":"Gunpowder", // Early Modern
				"prereqs":["Saltpeter"]
			},
			{
				"name":"Matchlock Firearms", // Early Modern
				"prereqs":["Gunpowder"]
			},
			{
				"name":"Rifles", // Early Modern
				"prereqs":["Peat Burner"]
			},
			{
				"name":"Semiautomatic Rifles", // Machine
				"prereqs":["Assembly Plant"]
			},
			{
				"name":"Automatic Rifles", // Machine
				"prereqs":["Infantry"]
			}
		]
	},
	{
		"pane":"Bombs",
		"resources":[
			{
				"name":"Conventional Bomb", // Machine
				"prereqs":["Aircraft"]
			},
			{
				"name":"Nuclear Warhead", // Atomic
				"prereqs":["Jet Bomber"]
			},
			{
				"name":"Weaponized Asteroid", // Nanotech
				"prereqs":["Artificial General Intelligence","Ceres"]
			},
			{
				"name":"Antimatter Warhead", // Interstellar
				"prereqs":["Starship Commander","Antimatter"]
			}
		]
	},
	{
		"pane":"Missiles",
		"resources":[
			{
				"name":"Rocket", // Industrial
				"prereqs":["Military Base"]
			},
			{
				"name":"ICBM", // Atomic
				"prereqs":["Laser","Nuclear Warhead"]
			},
			{
				"name":"Relativistic Kill Missile", // Interstellar
				"prereqs":["Starship Commander"]
			}
		]
	},
	{
		"pane":"Land Vehicles",
		"resources":[
			{
				"name":"War Chariot", // Bronze
				"prereqs":["Horse Archer"]
			},
			{
				"name":"Tank", // Machine
				"prereqs":["Car","Tungsten"]
			},
			{
				"name":"Modern Armor", // Atomic
				"prereqs":["Kevlar Armor","Tank"]
			}
		]
	},
	{
		"pane":"Ships",
		"resources":[
			{
				"name":"War Raft", // Upper Paleolithic
				"prereqs":["Raft"]
			},
			{
				"name":"Longboat", // Bronze
				"prereqs":["Bronze Tools","Wood"]
			},
			{
				"name":"Carrack", // Early Modern
				"prereqs":["Caravel"]
			},
			{
				"name":"Caravel", // Early Modern
				"prereqs":["Ocean"]
			},
			{
				"name":"Man'O'War", // Early Modern
				"prereqs":["Frigate"]
			},
			{
				"name":"Frigate", // Early Modern
				"prereqs":["Rifles","Commercial Seaport","Ship"]
			},
			{
				"name":"Ironclad", // Industrial
				"prereqs":["Steamship"]
			},
			{
				"name":"Battleship", // Machine
				"prereqs":["Oil Pipeline"]
			},
			{
				"name":"Carrier", // Machine
				"prereqs":["Battleship","Aircraft"]
			},
			{
				"name":"Fusion Battleship", // Nanotech
				"prereqs":["Helium-3"]
			}
		]
	},
	{
		"pane":"Aircraft",
		"resources":[
			{
				"name":"Propeller Fighter", // Machine
				"prereqs":["Aviation"]
			},
			{
				"name":"Propeller Bomber", // Machine
				"prereqs":["Aviation"]
			},
			{
				"name":"Jet Fighter", // Atomic
				"prereqs":["Jet Aircraft"]
			},
			{
				"name":"Jet Bomber", // Atomic
				"prereqs":["Jet Aircraft"]
			},
			{
				"name":"Supersonic Fighter", // Information
				"prereqs":["Laser Weapons"]
			},
			{
				"name":"Supersonic Bomber", // Information
				"prereqs":["Laser Weapons"]
			},
			{
				"name":"Hypersonic Fighter", // Nanotech
				"prereqs":["Hypersonic Aircraft"]
			},
			{
				"name":"Hypersonic Bomber", // Nanotech
				"prereqs":["Hypersonic Aircraft"]
			},
			{
				"name":"Orbital Fighter", // Nanotech
				"prereqs":["Docking Bay","Flying Car"]
			},
			{
				"name":"Orbital Bomber", // Nanotech
				"prereqs":["Docking Bay","Flying Car"]
			}
		]
	},
	{
		"pane":"Spacecraft",
		"resources":[
			{
				"name":"Armed Satellite", // Information
				"prereqs":["Martian Mare","Cloud Server"]
			},
			{
				"name":"Ion Attack Ship", // Nanotech
				"prereqs":["Orbital Fighter","Orbital Bomber"]
			},
			{
				"name":"Fusion Attack Ship", // Transhuman
				"prereqs":["Spaceship"]
			},
			{
				"name":"ACNP Attack Ship", // Interstellar
				"prereqs":["Starship Commander"]
			},
			{
				"name":"Antimatter Attack Ship", // Galactic
				"prereqs":["Artificial Planet"]
			},
			{
				"name":"Neutronium Battlecruiser", // Cosmic
				"prereqs":["Neutronium"]
			}
		]
	},
	{
		"pane": "Cancel Actions",
		"resources": [

		]
	},
	{
		"pane": "Cancel Repeats",
		"resources": [

		]
	},
	{
		"pane": "Info & Settings",
		"resources": [

		]
	}
]

// Some helper functions to come first

let maker_name = new_resource => {
	return `Make ${new_resource.name}`
}

let flat_resources = [];
let flat_actions = [];

// First pass through all the resources and actions to create dictionaries
let dict_resources = {};
let dict_actions = {};
for (let i=0; i<resources_by_pane.length; i++) {
    for (let j=0; j<resources_by_pane[i].resources.length; j++) {
		let resource_name = resources_by_pane[i].resources[j].name;
		dict_resources[resource_name] = resources_by_pane[i].resources[j];
		dict_actions[maker_name(resources_by_pane[i].resources[j])] = resources_by_pane[i].resources[j];
		// Add in what makes this resource obsolete
		dict_resources[resource_name]["obsolete_by_resources"] = [];
		dict_resources[resource_name]["obsolete_by_actions"] = []
	}
	if (resources_by_pane[i].actions) {
		for (let j=0; j<resources_by_pane[i].actions.length; j++) {
			let action = resources_by_pane[i].actions[j];
			dict_actions[action.name] = action;
		}
	}
}

// Second pass through resources and actions to add obsolecenses
for (let i=0; i<resources_by_pane.length; i++) {
    for (let j=0; j<resources_by_pane[i].resources.length; j++) {
		if ("obsolete" in resources_by_pane[i].resources[j]) {
			let obs = resources_by_pane[i].resources[j].obsolete;
			for (let k=0; k<obs.length; k++) {
				dict_resources[obs[k]]["obsolete_by_resources"].push(resources_by_pane[i].resources[j].name);
			}
		}
	}
	if (resources_by_pane[i].actions) {
		for (let j=0; j<resources_by_pane[i].actions.length; j++) {
			if ("obsolete" in resources_by_pane[i].actions[j]) {
				let obs = resources_by_pane[i].actions[j].obsolete;
				for (let k=0; k<obs.length; k++) {
					dict_resources[obs[k]]["obsolete_by_actions"].push(resources_by_pane[i].actions[j].name);
				}
			}
		}
	}
}

// Set up a standard maker action
let build_maker_action = new_resource => {
	let act = {}
	for (var key in new_resource) {
		act[key] = new_resource[key]
	}
	if (!("effect" in act)) {
		act["effect"] = (modified, gameState) => {
            modified[new_resource.name] += 1;
            addLog(`Made 1 _${new_resource.name}_.`,gameState);
			for (let k=0; k<new_resource.obsolete_by_resources.length; k++) {
				modified[new_resource.obsolete_by_resources[k]] = 0;
			}
        }
	}
	if (!("info" in act)) {
		act["info"] = (rC)=>{
            let message = [`Make a _${new_resource.name}_.`];
            return message;
        }
	}
	act["name"] = maker_name(new_resource);
	act["pane"] = new_resource.pane;
	act["speed"] = rC=>1;
	act["canExecute"] = rC=>1;
	act["visible"] = rC=>1;
	return build_action(act)
}

var count=0; // For keeping track of certain kinds of actions

// Obsolescence function. Applies to an action
let Obsolete = (rC, more, action) => {
	if (action.obsolete && action.obsolete.length > 0) {
		for (let k=0; k<action.obsolete.length; k++) {
			if (more["actionCount"][maker_name(dict_resources[action.obsolete[k]])]) {
				return(true);
			}
		}
	}
	return false;
}

// The 'can_execute' parameter of an action
let action_visible = action => {
	return (rC, more) => {
		let variable_count = 0;
		let result_and = true;
		let result_or = false;
		if ("prereqs" in action) {
			variable_count += 1;
			for (let i=0; i<action.prereqs.length; i++) {
				if (!(more["actionCount"][maker_name(dict_resources[action.prereqs[i]])])) {
					result_and = false;
				}
			}
		}
		if ("prereqs_or" in action) {
			variable_count += 1;
			for (let i=0; i<action.prereqs_or.length; i++) {
				if (more["actionCount"][maker_name(dict_resources[action.prereqs_or[i]])]) {
					result_or = true;
				}
			}
		}
		else {
			result_or = true;
		}
		if ("cost" in action) {
			variable_count += 1;
			for (let i=0; i<action.cost.length; i++) {
				if (rC[action.cost[i]]<1) {
					return false;
				}
			}
		}
		if ("prereq_resources" in action) {
			variable_count += 1;
			for (let i=0; i<action.prereq_resources.length; i++) {
				if (rC[action.prereq_resources[i]]<1) {
					return false;
				}
			}
		}
		if (variable_count === 0) {
			return false;
		}
		return result_and && result_or && !Obsolete(rC, more, action);
	}
}

let action_can_execute = action => {
	return (rC,more) => {
		let variable_count = 0;
		let result_and = true;
		let result_or = false;
		if ("prereqs" in action) {
			variable_count += 1;
			for (let i=0; i<action.prereqs.length; i++) {
				if (!(rC[action.prereqs[i]]) && Obsolete(rC, more, action)) {
					result_and = false;
				}
			}
		}
		if ("prereqs_or" in action) {
			variable_count += 1;
			for (let i=0; i<action.prereqs_or.length; i++) {
				if (rC[action.prereqs_or[i]] && !(Obsolete(rC, more, action))) {
					result_or = true;
				}
			}
		}
		else {
			result_or = true;
		}
		if ("cost" in action) {
			variable_count += 1;
			for (let i=0; i<action.cost.length; i++) {
				if (rC[action.cost[i]]<1) {
					return false;
				}
			}
		}
		if ("prereq_resources" in action) {
			variable_count += 1;
			for (let i=0; i<action.prereq_resources.length; i++) {
				if (rC[action.prereq_resources[i]]<1) {
					return false;
				}
			}
		}
		if (action.obsolete && action.obsolete.length > 0) {
			for (let k=0; k<action.obsolete.length; k++) {
				if (rC[action.obsolete[k]]) {
					result_and = false;
				}
			}
		}
		if (variable_count === 0) {
			return false;
		}
		return result_and && result_or;
	}
}

let action_effect = (action) => {
	if (action.effect) {
		return action.effect;
	}
	return (modified, gameState) => {
		var variable_count = 0; // A crude way to keep track of relevent variables in the actions
		if (action.cost) {
			variable_count += 1;
			addLog(`Spent the following: `+action.cost.join(), gameState);
			for (let i=0; i<action.cost.length; i++) {
				modified[action.cost[i]] -= 1;
			}
		}
		if (action.grant) {
			variable_count += 1;
			addLog(`Received the following: `+action.grant.join(), gameState);
			for (let i=0; i<action.grant.length; i++) {
				modified[action.grant[i]] += 1;
			}
		}
		if (variable_count === 0) {
			addLog(`Performed Action: ${action.name}`, gameState);
		}
	}
}

// Set up a regular action
let build_action = action => {
	if (!("prereqs" in action)) {
		count += 1;
		if (count <= 10) {
			//console.log("No prereqs: "+action.name); // Appears in the browser, not the console.
		}
	}
	return {
		"name":action.name,
		"pane":action.pane,
		"effect":action_effect(action),
		"speed":rC=>1,
		"canExecute":action_can_execute(action),
		"visible":action_visible(action),
		"info":"info" in action ? action["info"] :(rC)=>{
			return [`Perform Action: ${action.name}`];
		}
	}
}

// Go through material by pane
for (let i=0; i<resources_by_pane.length; i++) {
    let pane = resources_by_pane[i].pane;
	// Add Resources
    for (let j=0; j<resources_by_pane[i].resources.length; j++) {
        let new_resource = resources_by_pane[i].resources[j];
        new_resource.pane = pane;
        flat_resources.push(new_resource);
		if (!new_resource.suppress_maker) {
			flat_actions.push(build_maker_action(new_resource));
		}
    }
	// Add Actions that are not makers rolled up into Resources
	if (resources_by_pane[i].actions) {
		for (let j=0; j<resources_by_pane[i].actions.length; j++) {
			let action = resources_by_pane[i].actions[j];
			action.pane = pane;
			flat_actions.push(build_action(action));
		}
	}
}

export const resources_export = flat_resources;
export const actions_export = flat_actions;
