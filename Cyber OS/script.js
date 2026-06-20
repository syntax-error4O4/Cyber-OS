var topZIndex = 10;

function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    if (timeText) {
        timeText.innerHTML = currentTime;
    }
}
setInterval(updateTime, 1000);
updateTime(); 




function bringToFront(windowElement) {
    topZIndex++;
    windowElement.style.zIndex = topZIndex;
}


document.querySelectorAll('.window').forEach(windowEl => {
    
    
    dragElement(windowEl);
    
    
    windowEl.addEventListener('mousedown', function() {
        bringToFront(windowEl);
    });
    
    
    const closeBtn = windowEl.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            windowEl.style.display = 'none';
        });
    }
});


document.querySelectorAll('.app-icon').forEach(iconEl => {
    iconEl.addEventListener('dblclick', function() {
        const targetId = iconEl.getAttribute('data-target');
        const targetWindow = document.getElementById(targetId);
        
        if (targetWindow) {
            targetWindow.style.display = 'block';
            bringToFront(targetWindow);
        }
    });
});


document.querySelectorAll('.menu-open-btn').forEach(menuBtn => {
    menuBtn.addEventListener('click', function() {
        const targetId = menuBtn.getAttribute('data-target');
        const targetWindow = document.getElementById(targetId);
        
        if (targetWindow) {
            targetWindow.style.display = 'block';
            bringToFront(targetWindow);
        }
    });
});


var selectedIconTracker = undefined;

function selectedIcon(element) {
    if (selectedIconTracker !== undefined) {
        selectedIconTracker.classList.remove("selected");
    }
    element.classList.add("selected");
    selectedIconTracker = element;
}


document.addEventListener("click", function(event) {
    var clickedAnApp = event.target.closest('.app-icon');
    
    if (!clickedAnApp && selectedIconTracker !== undefined) {
        selectedIconTracker.classList.remove("selected");
        selectedIconTracker = undefined;
    }
});


dragElement(document.getElementById("welcome-box"));
dragElement(document.getElementById("poetry-box"));
dragElement(document.getElementById("painterly-box"));
dragElement(document.getElementById("calculator-box"));
dragElement(document.getElementById("settings-box"));





function dragElement(element) {
  if (!element) return; 
  
  
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  
  if (document.getElementById(element.id + "-header")) { 
    
    document.getElementById(element.id + "-header").onmousedown = startDragging;
  } else {
    
    element.onmousedown = startDragging;
  }

  
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.target.closest('.canvas-container') || e.target.id === 'painterly-canvas') {return;}
    
    initialX = e.clientX;
    initialY = e.clientY;
    
    document.onmouseup = stopDragging;
    document.onmousemove = whileDragging; 
  }

  
  function whileDragging(e) { 
    e = e || window.event;
    e.preventDefault();
    
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    
    if (element.style.transform && element.style.transform !== "none") {
        element.style.transform = "none";
    }
    
    
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var biggestIndex=1
var topBar=document.querySelector("#top")

function handleWindowTap(element) {
  if (e.target.closest('.canvas-container') || e.target.id === 'painterly-canvas') {return;}
  if (!element); return; 
  biggestIndex++;
  element.style.zindex= biggestIndex;
  if(top){
    top.style.zIndex= biggestIndex+ 1;}
  if (typeof deselection==="function" && typeof selectedIconTracker!== undefined){
     deselection(selectedIconTracker);}
  
  }

function openWindow(element) {
  if (!element); return;
  element.style.display="block";
  biggestIndex++;
  element.style.zIndex= biggestIndex;

  if(top) {
    top.style.zIndex= biggestIndex+1;
  }
}

function addWindowTapHandling(element) {
  if (!element); return;
  element.addEventListener("mousedown", function(){
    handleWindowTap(element);
  })
}

addWindowTapHandling(document.getElementById("#welcpme-box"));
addWindowTapHandling(document.getElementById("poetry-box"));
addWindowTapHandling(document.getElementById("painterly-box"));
addWindowTapHandling(document.getElementById("calculator-box"));
addWindowTapHandling(document.getElementById("settings-box"));

//App 1- Archive of Prose//
const phrases=[
{  text: 'Sonder:',
   author: 'The realization that each passerby is living a life as complex and vivid as your own'},
{text: 'Defenestration:',
 author: 'The act of throwing someone of of a window'},
{text: 'Apricity:',
 author: 'The warmth of the sun in the winter'},
{text: 'Pronoia:',
 author: 'The belief that the universe is conspiring in the favor of one'},
{text: 'Schadenfruede:',
 author: 'The joy derived in the misfortune of others'},
{text: 'Arrogate:',
 author: 'To claim or seize without justification; to make undue claims to having'},
{text: 'Accismus:',
 author: 'The pretense of refusal of something one actually wants'},
{text: 'Quagmire:',
 author: 'An awkward, complex, or hazardous situation to escape from'},
{text: 'Ultracrepidarian:',
 author: 'Giving opinions on a subject beyound your knowledge'},
{text: 'Sequitur',
 author: 'The natural conclusion of an inference'},
{text:'Eunoia',
 author:'Beautiful thinking; a well mind'}];

let currentIndex=0;
const introView= document.getElementById("intro");
const phraseView= document.getElementById("p-view");
const phraseText= document.getElementById("p-text");
const authorName= document.getElementById("p-writer");
const proceedBtn= document.getElementById("proceed");
const navBtn= document.getElementById("nav-btn");
const prevBtn= document.getElementById("back-btn");
const nxtBtn= document.getElementById("next-btn");
  
function updateP(){
  const currentData= phrases[currentIndex];
  phraseText.innerText= currentData.text;
  authorName.innerText= currentData.author;
}

proceedBtn.addEventListener("click", function(){
  introView.style.display="none";
  proceedBtn.style.display="none";
  phraseView.style.display="block";
  if(navBtn) navBtn.style.display="flex";
  updateP();});

nxtBtn.addEventListener("click", function(){
  if(currentIndex< phrases.length-1){
    currentIndex++;
    updateP();}});

prevBtn.addEventListener("click", function(){
  if (currentIndex>0){
    currentIndex--;
    updateP();}})




//PAINTERLY LOGIC
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("painterly-canvas");
    const ctx = canvas.getContext("2d");
    const colourBtns = document.querySelectorAll(".colour-btn");
    const brushSlider = document.getElementById("brush-slider");
    const undoBtns = document.getElementById("undo-btn");
    const redoBtns = document.getElementById("redo-btn");

    let isDrawing = false;
    let currentColour = "#f4ebd0";
    let brushSize = 5;
    let undoStack = [];
    let redoStack = [];
    const maxHistoryState = 25;

    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle="#E67E22";
        ctx.lineWidth=4;
        ctx.strokeRect(0,0,canvas.width,canvas.height);
       if(undoStack.length=== 0) {
        saveHistoryState();}
        else{
            updateHistoryButtons();
        }
    }

    function saveHistoryState() {
    
    if (canvas.width > 0 && canvas.height > 0) {
        if (undoStack.length >= maxHistoryState) {
            undoStack.shift();
        }
        undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        redoStack = [];
        updateHistoryButtons();
    }
}

    function updateHistoryButtons() {
        if (undoBtns) undoBtns.disabled = undoStack.length <= 1;
        if (redoBtns) redoBtns.disabled = redoStack.length === 0;
    }

    
    function getPointerPos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX)) - rect.left,
            y: (e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY)) - rect.top
        };
    }

    
    function startDrawing(e) {
        isDrawing = true;
        const pos = getPointerPos(e);
        if (document.getElementById("brush-slider")){brushSize=Number(document.getElementById("brush-slider").value);}
        
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.strokeStyle = currentColour; 
        ctx.lineWidth = Number(document.getElementById("brush-slider").value) || 5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        ctx.lineWidth = Number(document.getElementById("brush-slider").value) || 5;
        const pos = getPointerPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    
    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
            saveHistoryState();
        }
    }

    
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stopDrawing);

    
    colourBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".active-colour")?.classList.remove("active-colour");
            btn.classList.add("active-colour");
            currentColour = btn.getAttribute("data-colour");
        });
    });

    
    if (brushSlider) { 
         brushSlider.addEventListener("mousedown", (e) => {
        e.stopPropagation(); 
    });

    brushSlider.addEventListener("click", () => {
        brushSlider.focus(); 
    });
        }
        
    
    if (undoBtns) {
        undoBtns.addEventListener("click", () => {
            if (undoStack.length > 1) {
                redoStack.push(undoStack.pop());
                const previousState = undoStack[undoStack.length - 1];
                ctx.putImageData(previousState, 0, 0);
                updateHistoryButtons();
            }
        });
    }

    if (redoBtns) {
        redoBtns.addEventListener("click", () => {
            if (redoStack.length > 0) {
                const nextState = redoStack.pop();
                undoStack.push(nextState);
                ctx.putImageData(nextState, 0, 0);
                updateHistoryButtons();
            }
        });
    }

    const observor= new ResizeObserver(enteries =>{
        for(let entry of enteries){
            if(entry.contentRect.width >0){
                resizeCanvas();}}});
            if (canvas.parentElement){
                observor.observe(canvas.parentElement);}

            if (canvas.parentElement){
                observor.observe(canvas.parentElement);}

    

});

//Calculator LOGIC
let currentInput=""
function press(value){
    currentInput+=value;
    document.getElementById("calc-display").value=currentInput;}

function clearDisplay(){
    currentInput="";
    document.getElementById("calc-display").value="";}

function calculate(){
    try{
        let result=eval(currentInput);
        document.getElementById("calc-display").value=result;
        currentInput=result.toString();}
    catch(error){
        document.getElementById("calc-display").value="System Overheat";
        currentInput="";}}

window.press=press;
window.clearDisplay= clearDisplay;
window.calculate= calculate;

//SETTINGS LOGIC
const flickerBtn= document.getElementById('flicker-btn');
const scanlineBtn= document.getElementById('scanline-btn');
const signalBtn= document.getElementById('signal-btn');
const scanlineOverlay= document.getElementById('scanline-overlay');
const flickerOverlay= document.getElementById('flicker-overlay');

flickerBtn.addEventListener('click', ()=>{flickerBtn.classList.toggle('active');
    if(flickerBtn.classList.contains('active')){
        flickerBtn.innerText="ON";
        flickerOverlay.style.opacity="1";
        flickerOverlay.style.animation="crt-flicker 0.15s infinite";}
    else{
        flickerBtn.innerText="OFF";
        flickerOverlay.style.opacity="0";
        document.body.style.animation="none";}});

let scanlineState=0;
scanlineBtn.addEventListener('click', ()=>{scanlineState=(scanlineState + 1) % 3;
    if(scanlineState=== 0){
        scanlineBtn.innerText="THIN";
        scanlineOverlay.style.backgroundSize="100% 4px, 6px 100%";}
        else if(scanlineState=== 1){
        scanlineBtn.innerText="THICK";
        scanlineOverlay.style.backgroundSize="100% 6px, 6px 100%";}
        else{
        scanlineBtn.innerText="OFF";
        scanlineOverlay.style.backgroundSize="0px 0px";}});

let signalState=0;
signalBtn.addEventListener('click', ()=>{signalState=(signalState + 1) % 3;
    if(signalState=== 0){
        signalBtn.innerText="HIGH";
        document.body.style.filter="none";}
        else if(signalState=== 1){
        signalBtn.innerText="MED";
        document.body.style.filter="blur(0.6px";}
        else{
        signalBtn.innerText="LOW";
        document.body.style.filter="blur(1.5px";}});

document.addEventListener("DOMContentLoaded", ()=>{
const petTalk=[
    "What do think of my home?",
    "Having fun?",
    "Just keeping you company!",
    "Do you know how to spell supercalifor-what was it again?"

];

const bubble= document.getElementById("speech-bubble")
function speech(){
    const randomSpeech= petTalk[Math.floor(Math.random()*petTalk.length)];
    bubble.innerText= randomSpeech;
    bubble.classList.add("show");
        setTimeout(()=>{bubble.classList.remove('show');}, 4500);
    
}
setInterval(speech, 30000);
setTimeout(speech, 2000);})