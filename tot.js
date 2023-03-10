const states = setupGame()

validateGame(states)


let position = "0"
let items = []
render()

const ui = document.getElementById("game")


function render () {

    document.getElementById("textBox").innerText = states[position].text

    const buttonContainer = document.getElementById('buttons')
    buttonContainer.innerHTML = ''

    const options = states[position].options
    options.forEach(opt => {
        if (typeof opt.showIf === 'function') {
            if (!opt.showIf()) return
        }

        const button = document.createElement('button')
        button.innerText = opt.text
        button.classList.add('option')
        buttonContainer.appendChild(button)

        button.onclick = event => {
            if (opt.onSelect) opt.onSelect()
            goto(opt.destination)
        }
    })

    // console.log(items)
}


function goto (newPosition) {
    ui.style.opacity = 0
    setTimeout(() => {
        position = newPosition
        render()
        ui.style.opacity = 1
    }, 300)
}



function validateGame(gameStates) {
    const keys = Object.keys(gameStates)
    keys.forEach(key => {
        const step = gameStates[key]
        step.options.forEach(opt => {
            if (!opt.destination) console.warn(`${key}: Missing destination on ${JSON.stringify(opt)}`)
            if (!keys.includes(opt.destination)) console.warn(`${key}: Invalid destination key on ${JSON.stringify(opt)}`)
        })
    })
    console.log('done')
}



function setupGame () {
    return  {
        "0": {
            text:  "You are about to embark on an adventure with many choices and many endings. At each step in your journey, click one of the options below to continue. Best of luck on your quest.",
            options: [
                {
                    text: "Start Your Journey",
                    destination: "1",
                }
            ],
        },

        "1": {
            text:  "You clutch the map in your hand, ready to go find the gold of Teema, the legendary creature that none have bested. But first, you must choose your weapon.",
            options: [
                {
                    text: "A sword ",
                    destination: "2",
                    onSelect: () => items = ['sword'],
                },
                {
                    text: "A bow ",
                    destination: "2",
                    onSelect: () => items = ['bow'],
                },
            ],
        },

        "2": {
            text:  "As you walk out the door and start following the path, you notice a merchant with his caravan that seems to be going in the same direction as you, should you try and hitch a ride",
            options: [
                {
                    text: "Hitch a ride ",
                    destination: "3",
                },
                {
                    text: "Walk alone ",
                    destination: "25",
                },
            ],
        },

        "3": {
            text:  "The merchant is happy to take you along and he starts up a conversation of where he's going, talking about bringing a letter to some noble in Viper Village. He asks where you are going, you wonder not to reveal your goal and give away the secret of Teema's treasure.",
            options: [
                {
                    text: "Reveal your goal ",
                    destination: "4a",
                },
                {
                    text: "Keep the secret ",
                    destination: "4b",
                },
            ],
        },

        "4a": {
            text:  "The merchant says that he has heard the legend of Teema's gold and what treasures it holds but also of the danger on the way there. Not only are there many traps and various creatures, but the treasure itself is guarded by a dragon. You arrive at a crossroads, one towards your goal, the other, the merchant's path. You depart ways but first he asks if you would like to buy something and pay him back after you complete your quest.",
            options: [
                {
                    text: "Fire-proof shield ",
                    destination: "5",
                    onSelect: () => items.push('shield'),
                },
                {
                    text: "Bow ",
                    destination: "5",
                    onSelect: () => items.push('bow'),
                    showIf: () => !items.includes('bow'),
                },
                {
                    text: "Sword ",
                    destination: "5",
                    onSelect: () => items.push('sword'),
                    showIf: () => !items.includes('sword'),
                },
            ],
        },

        "4b": {
            text:  "You sit in silence as the merchant talks about the job he was hired for until you arrive at a crossroads, one towards your goal, the other, the merchant's path. You depart ways but first he asks if you would like to buy something and pay him back after you complete your quest.",
            options: [
                {
                    text: "Fire-proof shield ",
                    destination: "5",
                    onSelect: () => items.push('shield'),
                },
                {
                    text: "Bow ",
                    destination: "5",
                    onSelect: () => items.push('bow'),
                    showIf: () => !items.includes('bow'),
                },
                {
                    text: "Sword ",
                    destination: "5",
                    onSelect: () => items.push('sword'),
                    showIf: () => !items.includes('sword'),
                },
            ],
        },

        "5": {
            text:  "After departing from the merchant you hear rumbling in the treeline, it seems something big is coming right towards you. What will you do?",
            options: [
                {
                    text: "Hide ",
                    destination: "6",
                },
                {
                    text: "Stand your ground ",
                    destination: "7",
                },
            ],
        },

        "6": {
            text:  "You jump into a nearby bush and watch as a group of ox run past you, thank god you hid. You walk and get a little lost in the bushes and trees and trip over a root, causing you to fall out into a bright clearing. You look at your map and notice you have to go north, you pull out your compass and start walking. As you walk through the trees you find yourself in front of a large stone wall with various bricks sticking out. After inspection the bricks appear to have different symbols on them and you decide to try and push one.",
            options: [
                {
                    text: "Symbol of a dragon ",
                    destination: "8",
                },
                {
                    text: "Symbol of an arrow ",
                    destination: "20",
                },
                {
                    text: "Symbol of a bat",
                    destination: "15a",
                    showIf: () => !items.includes('bow'),
                },
                {
                    text: "Symbol of a bat",
                    destination: "15b",
                    showIf: () => items.includes('bow'),
                },
                {
                    text: "Symbol of a door ",
                    destination: "16",
                },
            ],
        },

        "7": {
            text:  "As you stand there you see that the rumbling was a pack of ox, they trample you into the ground and you are unable to get back up. Quest failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "5",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "8": {
            text:  "The ground starts shifting from below you and suddenly the floor falls from under you, causing you to fall and slide down a stone tunnel. You fall out of the slide and get up, now in a large room you see a pile of gold, the treasure of Teema, and on top of it, a dragon, staring directly at you. What will you do against it?",
            options: [
                {
                    text: "Run to cover ",
                    destination: "9",
                },
                {
                    text: "Charge at it ",
                    destination: "11",
                },
                {
                    text: "Stand still ",
                    destination: "12",
                },
                {
                    text: "Use fire-proof shield ",
                    destination: "13",
                    showIf: () => items.includes('shield'),
                },
                {
                    text: "Shoot the Dragon in the eye ",
                    destination: "14",
                    showIf: () => items.includes('bow'),
                },
            ],
        },

        "9": {
            text:  "You run to a pillar in an attempt to avoid the dragon but it swings at the pillar, destroying it and leaving you in the open. What will you do?",
            options: [
                {
                    text: "Run to cover ",
                    destination: "10",
                },
                {
                    text: "Charge at it ",
                    destination: "11",
                },
                {
                    text: "Use fire-proof shield ",
                    destination: "13",
                    showIf: () => items.includes('shield'),
                },
                {
                    text: "Shoot the Dragon in the eye ",
                    destination: "14",
                    showIf: () => items.includes('bow'),
                },
            ],
        },

        "10": {
            text:  "You run to another pillar but instead of breaking the pillar, the dragon breathes fire around the pillar. Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "9",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "11": {
            text:  "You run at it as it's caught off guard by your quick approach. You see an opening and swing your sword, slaying the beast. You are now able to take the treasure back to your village so everyone can live in luxury. Quest Completed!",
            options: [
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "12": {
            text:  "The dragon breathes fire at you and you are melted, your gear being added to the treasure pile. Quest failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "8",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "13": {
            text:  "You are able to block the dragon's fire breath with your shield and you start walking towards it slowly. As you get very close, the dragon's breath starts to melt the dragon itself, leaving you free to take the treasure back to your village for everyone to live in luxury. Quest completed!",
            options: [
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "14": {
            text:  "You hit the dragon right in the eye. It recoils in pain while trying to swing at you. One of the swings hit a rope on the wall that was holding up a platform. It drops, landing on the dragon. Quest Complete!",
            options: [
                {
                    text: "Restart ",
                    destination: "1",
                },
            ]
        },

        "15a": {
            text: "A horde of bats come out from gaps in the walls, they surround you, attacking while you aren't looking. You aren't able to hit them with your sword above you as they keep hitting you. Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "6",
                },
                {
                    text: "Restart ",
                    destination: "1",
                }
            ]
        },
        "15b": {
            text: "A horde of bats come out from gaps in the walls, flying towards you. You are able to take them out with your bow and a door opens in the wall. You walk through a narrow tunnel and down a set of stairs to find yourself behind the dragon as it's distracted. What do you do?",
            options: [
                {
                    text: "Sneak up ",
                    destination: "19",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Run at it ",
                    destination: "17",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Hide and watch it ",
                    destination: "18",
                }
            ]
        },

        "16": {
            text:  "A door opens in the wall. You walk through a narrow tunnel and down a set of stairs to find yourself behind the dragon as it's distracted. What do you do?",
            options: [
                {
                    text: "Sneak up ",
                    destination: "19",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Run at it ",
                    destination: "17",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Hide and watch it ",
                    destination: "18",
                },
            ],
        },

        "17": {
            text:  "When you run at the dragon, it spins around to look at you and you are swept off your feet by itś tail and it breathes fire on you as you lie on the ground. Quest Failed! ",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "16",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "18": {
            text:  "You sneak over to a pillar and hide behind, watching the dragon. The large amount of dust on the ground causes you to sneeze and the dragon slashes towards you, breaking the pillar, what will you do?",
            options: [
                {
                    text: "Run to cover ",
                    destination: "10",
                },
                {
                    text: "Charge at it ",
                    destination: "11",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Use fire-proof shield ",
                    destination: "13",
                    showIf: () => items.includes('shield'),
                },
                {
                    text: "Shoot the Dragon in the eye ",
                    destination: "14",
                    showIf: () => items.includes('bow'),
                },
            ],
        },

        "19": {
            text:  "You are able to successfully sneak up to the dragon, stabbing it with your sword and taking down the dragon. You are now able to take the treasure back to your village so everyone can live in luxury. Quest Completed!",
            options: [
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "20": {
            text:  "You notice the wall seeming to shift  and you hear clicking from behind the wall and small circle holes appear. What do you do?",
            options: [
                {
                    text: "Stand there ",
                    destination: "21",
                },
                {
                    text: "Run ",
                    destination: "22",
                },
                {
                    text: "Pull out shield ",
                    destination: "23",
                    showIf: () => items.includes('shield'),
                },
                {
                    text: "Inspect the holes ",
                    destination: "24",
                },
            ],
        },

        "21": {
            text:  "As you stand there, a volley of arrows fly out from the holes right towards you. Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "20",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "22": {
            text:  "As you run you see arrows fly past but they nearly miss, you turn back around to see that a door has opened in the wall. You walk through a narrow tunnel and down a set of stairs to find yourself behind the dragon as it's distracted. What do you do?",
            options: [
                {
                    text: "Sneak up ",
                    destination: "19",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Run at it ",
                    destination: "17",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Hide and watch it ",
                    destination: "18",
                },
            ],
        },

        "23": {
            text:  "You pull up your shield blocking the arrows. You peek out from your shield and see that a door has opened in the wall. You walk through a narrow tunnel and down a set of stairs to find yourself behind the dragon as it's distracted. What do you do?",
            options: [
                {
                    text: "Sneak up ",
                    destination: "19",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Run at it ",
                    destination: "17",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Hide and watch it ",
                    destination: "18",
                },
            ],
        },

        "24": {
            text:  "As you inspect the holes, an arrow flies out from one and hits you. Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "20",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "25": {
            text:  "You decline the merchant's offer to ride on his cart and go on your way, walking into the dark forest towards your goal. As you are walking through the forest you find yourself surrounded by darkness, not able to see where you are going. What do you do?",
            options: [
                {
                    text: "Continue walking the same way ",
                    destination: "26",
                },
                {
                    text: "Run back ",
                    destination: "27",
                },
                {
                    text: "Stand still ",
                    destination: "28",
                },
            ],
        },

        "26": {
            text:  "You keep walking the same way, making sure to walk in a straight line as to not get lost and after a bit of walking you find yourself outside the darkness. You see a cave leading downwards with odd engravings on the walls. Will you touch one?",
            options: [
                {
                    text: "Engraving of a skull",
                    destination: "32a",
                },
                {
                    text: "Engraving of fire ",
                    destination: "33",
                },
                {
                    text: "Engraving of a dragon ",
                    destination: "8",
                },
                {
                    text: "Engraving of a shield ",
                    destination: "34",
                    onSelect: () => items.push('shield'),
                },
            ],
        },

        "27": {
            text:  "You try to run back the other way but the darkness causes you to lose your way and you get stuck in the forest. Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "25",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "28": {
            text:  "You stand your ground in the darkness and as you do, a blue little moving light floats towards you. What do you do?",
            options: [
                {
                    text: "Hit it ",
                    destination: "30",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Grab it ",
                    destination: "29",
                },
                {
                    text: "Watch it ",
                    destination: "31",
                    onSelect: () => items.push('light'),
                },
            ]
        },

        "29": {
            text:  "As you grab the small light it is crushed in your hand but as it does, the darkness disappears and you see your path ahead. It leads you to a large stone wall with various bricks sticking out. After inspection the bricks appear to have different symbols on them and you decide to try and push one.",
            options: [
                {
                    text: "Symbol of a dragon ",
                    destination: "8",
                },
                {
                    text: "Symbol of an arrow ",
                    destination: "20",
                },
                {
                    text: "Symbol of a bat",
                    destination: "15a",
                    showIf: () => !items.includes('bow'),
                },
                {
                    text: "Symbol of a bat",
                    destination: "15b",
                    showIf: () => items.includes('bow'),
                },
                {
                    text: "Symbol of a door ",
                    destination: "16",
                },
            ],
        },

        "30": {
            text:  "You hit the light and it disappears, leaving you stranded in the dark. Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "28",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "31": {
            text:  "As you watch it as the light flies around you and then starts to move through the darkness. You follow it as your only source of light and it leads you out of the darkness to a cave entrance. ",
            options: [
                {
                    text: "Engraving of a skull ",
                    destination: "32b",
                },
                {
                    text: "Engraving of fire ",
                    destination: "33",
                },
                {
                    text: "Engraving of a dragon ",
                    destination: "8",
                },
                {
                    text: "Engraving of a shield ",
                    destination: "34",
                    onSelect: () => items.push('shield'),
                },
            ]
        },

        "32a": {
            text: "You suddenly feel as if you can't breathe and fall to the ground. Why would you touch that one? Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "26",
                },
                {
                    text: "Restart ",
                    destination: "1",
                }
            ]
        },

        "32b": {
            text: "You suddenly feel as if you can't breathe and fall to the ground. Why would you touch that one? Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "31",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ]
        },

        "33": {
            text:  "The path downwards through the cave lights up and you are able to start your walk down. As you are almost near the bottom you run into a pack of flying eyes. The eyes are unable to see as they are blinded by the light and you can walk past them. You take a staircase downwards and find yourself behind the dragon as it's distracted. What do you do?",
            options: [
                {
                    text: "Sneak up ",
                    destination: "19",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Run at it ",
                    destination: "17",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Hide and watch it ",
                    destination: "18",
                },
            ],
        },

        "34": {
            text:  "A shield appears on your arms and you are to start the trek downwards through the dark cave. As you are walking you are hit by something. You can barely make out a flying eye. What will you do?",
            options: [
                {
                    text: "Shoot it ",
                    destination: "36",
                    showIf: () => items.includes('bow'),
                },
                {
                    text: "Swing at it ",
                    destination: "35",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Use the light ",
                    destination: "37",
                    showIf: () => items.includes('light'),
                },
                {
                    text: "Use your shield ",
                    destination: "38",
                    showIf: () => items.includes('shield'),
                },
            ],
        },

        "35": {
            text:  "You are unable to hit it in the dark as it flies around you and it keeps hitting you. Quest Failed!",
            options: [
                {
                    text: "Go back 1 ",
                    destination: "34",
                },
                {
                    text: "Restart ",
                    destination: "1",
                },
            ],
        },

        "36": {
            text:  "You are able to hit the eye and walk onward. You take a staircase downwards and find yourself behind the dragon as it's distracted. What do you do?",
            options: [
                {
                    text: "Sneak up ",
                    destination: "19",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Run at it ",
                    destination: "17",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Hide and watch it ",
                    destination: "18",
                },
            ],
        },

        "37": {
            text:  "You let the light fly towards the eye, the eye is unable to see as it is blinded by the light and you can walk past it. You take a staircase downwards and find yourself behind the dragon as it's distracted. What do you do?",
            options: [
                {
                    text: "Sneak up ",
                    destination: "19",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Run at it ",
                    destination: "17",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Hide and watch it ",
                    destination: "18",
                },
            ],
        },

        "38": {
            text:  "You knock the eye out of the air and into the ground and you can walk past it. You take a staircase downwards and find yourself behind the dragon as it's distracted. What do you do?",
            options: [
                {
                    text: "Sneak up ",
                    destination: "19",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Run at it ",
                    destination: "17",
                    showIf: () => items.includes('sword'),
                },
                {
                    text: "Hide and watch it ",
                    destination: "18",
                },
            ],
        }

    }
}

