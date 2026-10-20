window.BELL_DATA=window.BELL_DATA||{};
const TUES_WORDS=[
{w:"infer",d:"to reach a conclusion from clues or evidence",ex:"Although the narrator never says she is worried, her repeated glances at the clock allow readers to infer that she is anxious.",syn:"conclude",ant:"state directly"},
{w:"scrutinize",d:"to examine very carefully",ex:"Before choosing an answer, Maya scrutinized the chart and checked every label.",syn:"inspect",ant:"glance at"},
{w:"hypothesis",d:"a possible explanation that can be tested or examined",ex:"The researcher formed a hypothesis about why students remembered the second passage more clearly.",syn:"proposed explanation",ant:"proven fact"},
{w:"integrity",d:"honesty and strong moral principles",ex:"The character shows integrity when he admits the mistake even though no one else saw it happen.",syn:"honesty",ant:"dishonesty"},
{w:"empathy",d:"the ability to understand or share another person's feelings",ex:"The memoir builds empathy by showing the fear and uncertainty the family experienced.",syn:"understanding",ant:"indifference"},
{w:"subtle",d:"not obvious; delicate or difficult to notice",ex:"The author gives a subtle clue by changing the narrator's tone in the final paragraph.",syn:"slight",ant:"obvious"},
{w:"prudent",d:"showing careful judgment about what to do",ex:"It was prudent to reread the question before changing an answer.",syn:"wise",ant:"reckless"},
{w:"wary",d:"careful or cautious because of possible danger or problems",ex:"Readers should be wary of a source that makes dramatic claims without evidence.",syn:"cautious",ant:"trusting"},
{w:"diligent",d:"showing steady, careful effort",ex:"A diligent reader returns to the passage and checks evidence instead of guessing.",syn:"hardworking",ant:"careless"},
{w:"inevitable",d:"certain to happen; unavoidable",ex:"After hours of dark clouds and thunder, the players knew a delay was inevitable.",syn:"unavoidable",ant:"preventable"},
{w:"adversity",d:"difficulty, hardship, or misfortune",ex:"The biography focuses on how the athlete responded to adversity after a serious injury.",syn:"hardship",ant:"advantage"},
{w:"compassion",d:"concern for another person's suffering and a desire to help",ex:"The nurse's compassion is shown when she stays after her shift to comfort the frightened child.",syn:"care",ant:"cruelty"},
{w:"intuitive",d:"understood or known without deliberate reasoning",ex:"The website's simple layout felt intuitive, so new users understood where to click.",syn:"instinctive",ant:"confusing"},
{w:"emulate",d:"to imitate someone or something in order to equal or improve upon it",ex:"The young writer tried to emulate the author's use of vivid imagery.",syn:"imitate",ant:"reject"},
{w:"conform",d:"to act according to a rule, standard, or expectation",ex:"The revised response had to conform to the directions in the prompt.",syn:"comply",ant:"resist"},
{w:"spurious",d:"false or not genuine, although it may appear believable",ex:"The article included a spurious statistic that could not be traced to any reliable source.",syn:"false",ant:"authentic"},
{w:"restrained",d:"controlled, moderate, or held back",ex:"Instead of shouting, the speaker used a restrained tone that made the criticism sound measured.",syn:"controlled",ant:"exaggerated"},
{w:"benevolent",d:"kind and generous; intending to do good",ex:"The novel presents the mentor as benevolent because she quietly helps students who need supplies.",syn:"kind",ant:"cruel"}
];
function makeTuesday(e,i){
 const d1=TUES_WORDS[(i+1)%TUES_WORDS.length],d2=TUES_WORDS[(i+5)%TUES_WORDS.length];
 return [e.w,"Test-Prep Word: "+e.w+" — "+e.d,[
 ["Meaning","mc","Which meaning best matches <strong>"+e.w+"</strong>?",[e.d,d1.d,d2.d,"a word used only for physical movement"]],
 ["Context","mc",e.ex+"<br><br>In this sentence, which choice is closest in meaning to <strong>"+e.w+"</strong>?",[e.syn,e.ant,d1.syn,d2.syn]],
 ["Synonym & Antonym","mcset",[
   ["Which choice is the closest synonym for <strong>"+e.w+"</strong>?",e.syn,e.ant],
   ["Which choice is the closest antonym for <strong>"+e.w+"</strong>?",e.ant,e.syn]
 ]],
 ["Use Context Clues","text","Explain which words, actions, or ideas in the example sentence help you understand the meaning of "+e.w+"."],
 ["Use It","text","Write one original sentence using "+e.w+" correctly. Make the meaning clear through context."]
 ]];
}
window.BELL_DATA.tuesday=TUES_WORDS.map(makeTuesday);
