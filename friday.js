window.BELL_DATA=window.BELL_DATA||{};
const FRI=[
["Alliteration","Repetition of beginning consonant sounds in nearby words.","Wild winds whipped the windows.","The moon was a silver coin.","The leaves danced in the breeze.","The room was painfully quiet."],
["Allusion","A brief reference to a well-known person, story, event, place, or work.","He met the challenge like David facing Goliath.","The rain tapped on the roof.","Her smile was bright as the sun.","The backpack weighed a ton."],
["Antithesis","A contrast of ideas expressed in balanced or parallel structure.","We must learn to live together, not grow apart.","The stars whispered softly.","Time is a thief.","The hallway buzzed."],
["Apostrophe","Direct address to an absent person, abstract idea, or nonhuman thing as if it could respond.","O Time, slow down for just one day!","The city never sleeps.","The test was a mountain.","The bell rang loudly."],
["Assonance","Repetition of vowel sounds in nearby words.","The low moan rolled over the road.","Busy bees buzzed.","The sun smiled.","Crash! went the pan."],
["Consonance","Repetition of consonant sounds within or at the ends of nearby words.","The stroke of luck struck the clock.","Deep green trees.","Bright as fire.","The wind screamed."],
["Euphemism","A mild or indirect expression used in place of one that may sound harsh or unpleasant.","The company said several positions would be eliminated.","He ran like lightning.","The classroom was an oven.","Her eyes sparkled."],
["Hyperbole","Intentional exaggeration used for emphasis or effect.","I've told you a million times to charge your laptop.","The pencil rolled off the desk.","The night was dark.","She walked carefully."],
["Imagery","Language that appeals to the senses and helps the reader picture, hear, smell, taste, or feel something.","Warm cinnamon drifted through the kitchen as the crust crackled under the knife.","The plan was difficult.","He was worried.","They arrived."],
["Irony","A contrast between expectation and reality, or between what is said and what is meant.","The fire station burned down during Fire Prevention Week.","The river moved slowly.","The child laughed.","The road curved left."],
["Metaphor","A direct comparison that says one thing is another.","The classroom was a pressure cooker before the exam.","She ran as fast as a cheetah.","Buzz went the phone.","The moon shone."],
["Onomatopoeia","A word that imitates or suggests a sound.","The pan hit the floor with a clang.","The clouds were cotton.","Her voice was velvet.","The long road stretched ahead."],
["Oxymoron","Two apparently contradictory words placed together for effect.","The room fell into deafening silence.","The river rushed quickly.","The bright lamp glowed.","He whispered softly."],
["Paradox","A statement that seems contradictory but may reveal a truth.","The more we learn, the more we realize how much we do not know.","The door slammed shut.","He was as brave as a lion.","The rain whispered."],
["Personification","Giving human qualities or actions to something nonhuman.","The old house groaned in the wind.","The runner moved quickly.","The lake was deep.","The paper was white."],
["Pun","A play on words that uses multiple meanings or similar sounds for humor or effect.","The math teacher has too many problems.","The rain fell steadily.","Her smile was sunshine.","The leaves danced."],
["Simile","A comparison using like or as.","The hallway was as silent as a library after the announcement.","The hallway was a tunnel.","Bang! went the locker.","The clock stared at me."],
["Symbol","A person, object, place, or image that represents a larger idea beyond its literal meaning.","Throughout the story, the locked gate represents the character's fear of change.","The dog barked.","The soup was hot.","The bus arrived late."]
];
function makeFriday(e,i){
 const distract=[FRI[(i+3)%FRI.length][2],FRI[(i+7)%FRI.length][2],FRI[(i+11)%FRI.length][2]];
 return [e[0],e[1],[
 ["Identify It","mc","Which example best demonstrates <strong>"+e[0]+"</strong>?",[e[2],distract[0],distract[1],distract[2]]],
 ["Analyze the Effect","text","Explain what the "+e[0].toLowerCase()+" adds to this example: "+e[2]],
 ["Literal vs. Figurative","text","Rewrite the example in more literal language. What is lost when the figurative language is removed?"],
 ["Create It","text","Write one original example of "+e[0].toLowerCase()+"."],
 ["Connect to Reading","text","Describe a situation in a story, poem, speech, or article where an author could use "+e[0].toLowerCase()+" effectively. Explain the purpose."]
 ]];
}
window.BELL_DATA.friday=FRI.map(makeFriday);
