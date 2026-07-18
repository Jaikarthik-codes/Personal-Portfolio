const themeSwitch = document.getElementById('checkbox');
const htmlEl = document.documentElement;
const glitchName = document.getElementById('glitch-name');
const spideySenseContainer = document.getElementById('spidey-sense-container');

// Check local storage for saved theme
const savedTheme = localStorage.getItem('spider-theme');
if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'spot') {
        themeSwitch.checked = true;
    }
}

// Theme toggle
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        htmlEl.setAttribute('data-theme', 'spot');
        localStorage.setItem('spider-theme', 'spot');
    } else {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem('spider-theme', 'dark');
    }
});

// TERMINAL LOGIC
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('terminal-output');
const termBody = document.getElementById('terminal-body');

const commands = {
    'help': 'Available commands: <br>- <span class="term-cmd">whoami</span>: Display bio<br>- <span class="term-cmd">education</span>: Display background<br>- <span class="term-cmd">projects</span>: Access project database<br>- <span class="term-cmd">skills</span>: List technical skills<br>- <span class="term-cmd">contact</span>: Show transmission info<br>- <span class="term-cmd">clear</span>: Clear terminal<br>- <span class="term-cmd">venom</span>: ???',
    'whoami': 'Jaikarthik Mylapur.<br>Backend & Machine Learning Engineer.<br>Specialty: Building scalable systems and intelligent models.',
    'education': 'Status: Exploring the multiverse of technology.<br>Location: Earth-1218 (India).',
    'projects': 'LOADING MULTIVERSE PROJECTS...<br>1. <span class="term-cmd">Project Alpha</span>: Scalable backend architecture.<br>2. <span class="term-cmd">Project Beta</span>: Predictive ML model.',
    'skills': 'SYSTEM CAPABILITIES:<br>Python, Node.js, TensorFlow, AWS, PostgreSQL, Docker, Redis, Git.',
    'contact': 'ESTABLISHING CONNECTION...<br>Let\'s collaborate on something amazing.<br>Ping me at: <span class="term-cmd">jaikarthik@spider-os.net</span>',
    'venom': 'WE ARE VENOM.',
    'clear': ''
};

if (termInput) {
    termInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const inputVal = this.value.trim().toLowerCase();
            this.value = '';
            
            if (inputVal === '') return;

            // Echo the command
            const echoLine = document.createElement('div');
            echoLine.className = 'term-line';
            echoLine.innerHTML = `<span class="term-prompt">guest@jaikarthik-os:~$</span> ${inputVal}`;
            termOutput.appendChild(echoLine);

            // Process command
            if (inputVal === 'clear') {
                termOutput.innerHTML = '';
            } else if (inputVal === 'venom') {
                document.body.classList.toggle('venom-mode');
                const resLine = document.createElement('div');
                resLine.className = 'term-line';
                resLine.innerHTML = document.body.classList.contains('venom-mode') ? commands['venom'] : 'SYMBIOTE DETACHED.';
                termOutput.appendChild(resLine);
            } else {
                const resLine = document.createElement('div');
                resLine.className = 'term-line';
                resLine.innerHTML = commands[inputVal] || `Command not found: ${inputVal}. Type <span class="term-cmd">help</span> for a list of commands.`;
                termOutput.appendChild(resLine);
            }

            // Scroll to bottom
            termBody.scrollTop = termBody.scrollHeight;
        }
    });
}

// Intro Font Glitch Effect on Page Load
const fonts = [
    '"Space Mono", monospace',
    'Courier New',
    'Arial, sans-serif',
    '"Times New Roman", serif',
    '"Impact", sans-serif',
    '"Comic Sans MS", cursive',
    'Georgia, serif',
    '"Courier", monospace'
];

let fontIterations = 0;
const maxFontIterations = 18;
const fontInterval = setInterval(() => {
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    glitchName.style.fontFamily = randomFont;
    fontIterations++;
    
    if (fontIterations >= maxFontIterations) {
        clearInterval(fontInterval);
        glitchName.style.fontFamily = '"Oswald", sans-serif'; // Settle on final comic font
    }
}, 70);

// Spidey Sense SVG lines
function createSenseLine(x, y, rotation) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    const container = document.createElement("div");
    container.classList.add("sense-anim-container");
    container.style.left = x;
    container.style.top = y;
    container.style.setProperty('--rot', `${rotation}deg`);

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.classList.add("sense-svg");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M 20 80 Q 35 40 50 60 T 80 20");

    svg.appendChild(path);
    container.appendChild(svg);
    spideySenseContainer.appendChild(container);
    
    setTimeout(() => {
        container.remove();
    }, 600);
}

function triggerSpideySense() {
    const positions = [
        { x: '10%', y: '10%', rot: -45 },
        { x: '90%', y: '10%', rot: 45 },
        { x: '0%', y: '50%', rot: -90 },
        { x: '100%', y: '50%', rot: 90 },
        { x: '20%', y: '90%', rot: -135 },
        { x: '80%', y: '90%', rot: 135 }
    ];
    
    const numLines = Math.floor(Math.random() * 3) + 2; 
    const shuffled = positions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numLines);
    
    selected.forEach(pos => {
        const randX = `calc(${pos.x} + ${Math.random() * 10 - 5}%)`;
        const randY = `calc(${pos.y} + ${Math.random() * 10 - 5}%)`;
        createSenseLine(randX, randY, pos.rot);
    });
}

// Spidey Sense trigger (lines + less aggressive burst)
setInterval(() => {
    if (Math.random() > 0.4) {
        triggerSpideySense();
        glitchName.classList.add('spidey-sense-burst');
        setTimeout(() => {
            glitchName.classList.remove('spidey-sense-burst');
        }, 300);
    }
}, 1500);

// Active link highlighting for navbar
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#home') {
            link.style.color = 'var(--glitch-red)';
        }
    });
});
