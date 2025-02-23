import { awards } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
      autoRaf: true,
    });

const awardsListContainer = document.querySelector('.awards-list');
const awardPreview = document.querySelector('.award-preview');

const POSITIONS = {
    BOTTOM: 0,
    MIDDLE: -80,
    TOP: -160,
};

let lastMousePosition = { x: 0, y: 0 };
let activeAward = null;
let ticking = false;
let mouseTimeout = null;
let isMouseMoving = false;

awards.forEach((award) => {
    const awardElement = document.createElement('div');
    awardElement.className = "award";

    awardElement.innerHTML = `
        <div class="award-wrapper">
           <div class="award-name">
              <h1>${award.name}</h1>
              <h1>${award.type}</h1>
           </div>
           <div class="award-project">
               <h1>${award.project}</h1>
               <h1>${award.label}</h1>
           </div>
           <div class="award-name">
               <h1>${award.name}</h1>
               <h1>${award.type}</h1>
            </div>
        </div>
    `;

    awardsListContainer.appendChild(awardElement);
});

const awardElements = document.querySelectorAll('.award');

const animatePreview = () => {
    const awardsListRect = awardsList.getBoundingClientRect();
    if (
        lastMousePosition.x < awardsListRect.left ||
        lastMousePosition.x > awardsListRect.right ||
        lastMousePosition.y < awardsListRect.top ||
        lastMousePosition.y > awardsListRect.bottom
    ) {
        const previewImages = awardPreview.querySelectorAll('img');
        previewImages.forEach((img) => {
            gsap.to(img. {
                scale: 0,
                duratio: 0.4,
                ease: 'power2.out',
                onComplete: () => img.remove(),
            });
        });
    }
};

const updateAwards = () => {
    animatePreview();

    if(activeAward) {
        const rect = activeAward.getBoundingClientRect();
        const isStillOver = 
            lastMousePosition.x >= rect.left &&
            lastMousePosition.x <= rect.right &&
            lastMousePosition.y >= rect.top &&
            lastMousePosition.y <= rect.bottom;

        if (!isStillOver) {
            const wrapper = activeAward.querySelector('.award-wrapper');
            const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2;
            
            gsap.to(wrapper, {
                y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
                duration: 0.4,
                ease: 'power2.out',
            });
            activeAward = null;
        }
    }

    awardsElements.forEach((award, index) => {
        if (awards === activeAward) return;

        const rect = award.getBoundingClientRect();
        const isMouseOver = 
           lastMousePosition.x >= rect.left &&
           lastMousePosition.x <= rect.right &&
           lastMousePosition.y >= rect.top &&
           lastMousePosition.y <= rect.bottom;

        if (isMouseOver) {
            const wrapper = award.querySelector('.award-wrapper');
            const enteringFromTop = lastMousePosition.y < rect.top + rect.height / 2;

            gsap.to(wrapper, {
                y: POSITIONS.MIDDLE,
                duration: 0.4,
                ease: 'power2.out',
            });
            activeAward = award;
        }
    });
    
    ticking = false;
};

document.addEventListener('mousemove', (event) => {
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;

    isMouseMoving = true;
    if (mouseTimeout) {
        clearTimeout(mouseTimeout);
    }

    const awardsListRect = awardsList.getBoundingClientRect();
    const isInsideAwardsList =
        lastMousePosition.x >= awardsListRect.left &&
        lastMousePosition.x <= awardsListRect.right &&
        lastMousePosition.y >= awardsListRect.top &&
        lastMousePosition.y <= awardsListRect.bottom;

