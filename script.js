// Game Database Database containing kid-friendly attributes
const wardrobeData = {
    tops: [
        { id: 't1', name: 'Pink Hoodie', emoji: '🧥', color: 'pink', style: 'casual' },
        { id: 't2', name: 'Suited Blazer', emoji: '👔', color: 'blue', style: 'formal' },
        { id: 't3', name: 'Yellow T-Shirt', emoji: '👕', color: 'yellow', style: 'casual' },
        { id: 't4', name: 'Sparkly Dress', emoji: '👗', color: 'purple', style: 'glam' },
        { id: 't5', name: 'Red Sweater', emoji: '🎽', color: 'red', style: 'sporty' }
    ],
    bottoms: [
        { id: 'b1', name: 'Blue Jeans', emoji: '👖', color: 'blue', style: 'casual' },
        { id: 'b2', name: 'Purple Skirt', emoji: '👗', color: 'purple', style: 'glam' },
        { id: 'b3', name: 'Comfy Sweatpants', emoji: '🩳', color: 'grey', style: 'sporty' },
        { id: 'b4', name: 'Khaki Trousers', emoji: '👖', color: 'yellow', style: 'formal' }
    ],
    shoes: [
        { id: 's1', name: 'Sneakers', emoji: '👟', color: 'white', style: 'sporty' },
        { id: 's2', name: 'Red High Heels', emoji: '👠', color: 'red', style: 'glam' },
        { id: 's3', name: 'Brown Boots', emoji: '🥾', color: 'brown', style: 'casual' },
        { id: 's4', name: 'Dress Shoes', emoji: '👞', color: 'black', style: 'formal' }
    ],
    accessories: [
        { id: 'a1', name: 'Cool Glasses', emoji: '🕶️', layer: 'glasses', color: 'black', style: 'casual' },
        { id: 'a2', name: 'Top Hat', emoji: '🎩', layer: 'hat', color: 'black', style: 'formal' },
        { id: 'a3', name: 'Winter Scarf', emoji: '🧣', layer: 'scarf', color: 'red', style: 'casual' },
        { id: 'a4', name: 'Bow Tie', emoji: '🎀', layer: 'bow', color: 'pink', style: 'glam' },
        { id: 'a5', name: 'Gold Crown', emoji: '👑', layer: 'hat', color: 'yellow', style: 'glam' },
        { id: 'a6', name: 'Red Tie', emoji: '👔', layer: 'tie', color: 'red', style: 'formal' }
    ]
};

// Track what the player is currently wearing
let currentOutfit = {
    tops: null,
    bottoms: null,
    shoes: null,
    hat: null,
    glasses: null,
    scarf: null,
    bow: null,
    tie: null
};

// Initial Setup
window.onload = () => {
    switchTab('tops');
};

function switchTab(category) {
    // Update active tab styling
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const grid = document.getElementById('closet-items');
    grid.innerHTML = '';

    // Render items belonging to the selected tab
    wardrobeData[category].forEach(item => {
        const card = document.createElement('div');
        card.className = 'closet-card';
        card.onclick = () => equipItem(category, item);
        card.innerHTML = `
            <span class="emoji">${item.emoji}</span>
            <span class="label">${item.name}</span>
        `;
        grid.appendChild(card);
    });
}

function equipItem(category, item) {
    if (category === 'accessories') {
        // Accessories have unique target slot layers
        currentOutfit[item.layer] = item;
        document.getElementById(`layer-${item.layer}`).innerText = item.emoji;
    } else {
        // Tops, bottoms, and shoes go directly to their matching slot
        currentOutfit[category] = item;
        
        let targetLayer = category === 'tops' ? 'layer-torso' : category === 'bottoms' ? 'layer-legs' : 'layer-shoes';
        document.getElementById(targetLayer).innerText = item.emoji;
    }
}

function startCatwalk() {
    const screen = document.getElementById('runway-screen');
    const model = document.getElementById('runway-model');
    const panel = document.getElementById('judges-panel');

    screen.classList.remove('hidden');
    panel.classList.add('hidden');
    model.classList.add('walk-animation');

    // After runway animation finishes (4 seconds), show judges results
    setTimeout(() => {
        model.classList.remove('walk-animation');
        calculateScores();
        panel.classList.remove('hidden');
    }, 4000);
}

function calculateScores() {
    // Gather all currently worn items into an easily parseable array
    const equipped = Object.values(currentOutfit).filter(item => item !== null);

    if (equipped.length === 0) {
        setJudgeResults('judge-1', 0, "You didn't put any clothes on!");
        setJudgeResults('judge-2', 0, "Is this minimalist art?");
        setJudgeResults('judge-3', 0, "No accessories to score.");
        return;
    }

    // 1. Color Matching Math (Bonus for matching dominant colors)
    const colors = equipped.map(i => i.color);
    const uniqueColors = new Set(colors).size;
    let colorScore = 10 - (uniqueColors * 1.5); 
    if (colorScore > 10) colorScore = 10;
    if (colorScore < 4) colorScore = 4; // Floor score for safety

    let colorFeedback = "Beautifully synchronized palette!";
    if (uniqueColors > 4) colorFeedback = "A bit messy, too many colors at once.";
    else if (uniqueColors <= 2) colorFeedback = "Incredibly bold color cohesion!";

    // 2. Individualistic Style Math (Mix-and-Match vs Uniform look)
    const styles = equipped.map(i => i.style);
    const uniqueStyles = new Set(styles).size;
    let styleScore = 5 + (uniqueStyles * 2); // Encourages interesting dynamic combos
    if (styleScore > 10) styleScore = 10;

    let styleFeedback = "Fascinating blend of diverse style trends!";
    if (uniqueStyles === 1) {
        styleScore = 8;
        styleFeedback = "Very clean, uniform theme execution.";
    }

    // 3. Accessory Counter Math
    const accessoriesCount = Object.keys(currentOutfit).filter(k => !['tops', 'bottoms', 'shoes'].includes(k) && currentOutfit[k] !== null).length;
    let accScore = 4;
    let accFeedback = "Needs a few more signature accessories.";

    if (accessoriesCount === 1 || accessoriesCount === 2) {
        accScore = 9;
        accFeedback = "Perfect balance of balanced accents!";
    } else if (accessoriesCount > 2) {
        accScore = 6;
        accFeedback = "A little over-accessorized, keep it simpler next time.";
    }

    // Display Results
    setJudgeResults('judge-1', Math.floor(colorScore), colorFeedback);
    setJudgeResults('judge-2', Math.floor(styleScore), styleFeedback);
    setJudgeResults('judge-3', Math.floor(accScore), accFeedback);
}

function setJudgeResults(id, score, feedback) {
    const card = document.getElementById(id);
    card.querySelector('.score').innerText = `${score}/10`;
    card.querySelector('.feedback').innerText = feedback;
}

function resetGame() {
    // Hide runway view
    document.getElementById('runway-screen').add('hidden');
    
    // Clear out active state variables
    currentOutfit = { tops: null, bottoms: null, shoes: null, hat: null, glasses: null, scarf: null, bow: null, tie: null };
    
    // Wipe visual canvas layout
    document.querySelectorAll('.accessory-layer, .clothing-layer').forEach(layer => layer.innerText = '');
}