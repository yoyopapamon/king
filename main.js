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
                    background-color: var(--primary-color, #1A237E);
                    color: var(--secondary-color, #FFFFFF);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: 700;
                    box-shadow: inset 0 -4px 8px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2);
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

                /* Add styles for different number ranges for more visual variety */
                :host([number-range="1-10"]) .lotto-ball { background-color: #4CAF50; }
                :host([number-range="11-20"]) .lotto-ball { background-color: #2196F3; }
                :host([number-range="21-30"]) .lotto-ball { background-color: #FFC107; color: #333;}
                :host([number-range="31-40"]) .lotto-ball { background-color: #E91E63; }
                :host([number-range="41-45"]) .lotto-ball { background-color: #9C27B0; }

            </style>
            <div class="lotto-ball">
                ${number}
            </div>
        `;
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    lottoNumbersContainer.innerHTML = ''; // Clear previous numbers

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
        }, index * 200); // Staggered animation
    });
});
