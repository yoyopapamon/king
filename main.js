class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        this.shadowRoot.innerHTML = `
            <style>
                .lotto-ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: var(--ball-bg, #1A237E);
                    color: #FFFFFF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: inherit;
                    font-size: 1.5rem;
                    font-weight: 700;
                    box-shadow: inset 0 -4px 8px rgba(0,0,0,0.3), 0 4px 8px var(--ball-shadow, rgba(0,0,0,0.2));
                    transform-style: preserve-3d;
                    transition: transform 0.5s ease, background-color 0.5s ease;
                    animation: appear 0.5s ease-out forwards;
                }

                @keyframes appear {
                    from {
                        opacity: 0;
                        transform: scale(0.5);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                :host([number-range="1-10"]) .lotto-ball { --ball-bg: #4CAF50; }
                :host([number-range="11-20"]) .lotto-ball { --ball-bg: #2196F3; }
                :host([number-range="21-30"]) .lotto-ball { --ball-bg: #FFC107; color: #333;}
                :host([number-range="31-40"]) .lotto-ball { --ball-bg: #E91E63; }
                :host([number-range="41-45"]) .lotto-ball { --ball-bg: #9C27B0; }

            </style>
            <div class="lotto-ball">
                ${number}
            </div>
        `;
    }
}

if (!customElements.get('lotto-ball')) {
    customElements.define('lotto-ball', LottoBall);
}

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';

        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Light Mode';
        }

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = 'Dark Mode';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = 'Light Mode';
            }
        });
    }

    // Lotto Generation Logic
    const generateBtn = document.getElementById('generate-btn');
    const lottoNumbersContainer = document.getElementById('lotto-numbers');

    if (generateBtn && lottoNumbersContainer) {
        generateBtn.addEventListener('click', () => {
            lottoNumbersContainer.innerHTML = ''; 

            const numbers = new Set();
            while(numbers.size < 6) {
                const randomNumber = Math.floor(Math.random() * 45) + 1;
                numbers.add(randomNumber);
            }

            const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

            sortedNumbers.forEach((number, index) => {
                setTimeout(() => {
                    const lottoBall = document.createElement('lotto-ball');
                    lottoBall.setAttribute('number', number);
                    
                    let range = '';
                    if (number <= 10) range = '1-10';
                    else if (number <= 20) range = '11-20';
                    else if (number <= 30) range = '21-30';
                    else if (number <= 40) range = '31-40';
                    else range = '41-45';
                    lottoBall.setAttribute('number-range', range);

                    lottoNumbersContainer.appendChild(lottoBall);
                }, index * 200);
            });
        });
    }
});
