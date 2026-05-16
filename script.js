// Character customization Asset Options
const customizationOptions = {
    skins: [
        { name: 'Light', filter: 'sepia(0.2) brightness(1.1)' },
        { name: 'Tan', filter: 'sepia(0.4) saturate(1.2) brightness(0.9)' },
        { name: 'Warm', filter: 'sepia(0.6) saturate(1.4) brightness(0.7)' },
        { name: 'Dark', filter: 'sepia(0.8) saturate(1.3) brightness(0.4) hue-rotate(-10deg)' }
    ],
    hairs: [
        { style: 'Short Crop', emoji: '💇‍♂️' },
        { style: 'Long Waves', emoji: '💇‍♀️' },
        { style: 'Curly Afro', emoji: '🧑‍🦱' },
        { style: 'Ponytail', emoji: '👱‍♀️' }
    ],
    hairColors: [
        { name: 'Blonde', filter: 'hue-rotate(15deg) saturate(1.5) brightness(1.3)' },
        { name: 'Brown', filter: 'hue-rotate(-20deg) sepia(0.8) brightness(0.6)' },
        { name: 'Black', filter: 'grayscale(1) brightness(0.2)' },
        { name: 'Pink', filter: 'hue-rotate(140deg) saturate(2)' }
    ],
    eyes: [
        { color: 'Blue', filter: 'hue-rotate(140deg) saturate(1.5)' },
        { color: 'Green', filter: 'hue-rotate(50deg) saturate(1.5)' },
        { color: 'Brown', filter: 'sepia(0.8) brightness(0.5)' }
    ]
};

// Wardrobe Asset Data Configuration
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
        { id: 'b3', name: 'Sweatpants', emoji: '🩳', color: 'grey', style: 'sporty' },
        { id: 'b4', name: 'Khaki Pants', emoji: '👖', color: 'yellow', style: 'formal' }
    ],
    shoes: [
        { id: 's1', name: 'Sneakers', emoji: '👟', color: 'white', style: 'sporty' },
        { id: 's2', name: 'High Heels', emoji: '👠', color: 'red', style: 'glam' },
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

// Character Tracking Configurations
let characterState = {
    gender: 'female',
    skinIndex: 0,
    hairIndex: 0,
    hairColorIndex: 0,
    eyeIndex: 0
};

let currentOutfit = { tops: null, bottoms: null, shoes: null, hat: null, glasses: null, scarf: null, bow: null, tie: null };

window.onload = () => {
    buildCharacterCreatorOptions();
    updatePreviewVisuals();
};

function buildCharacterCreatorOptions() {
    // Skins setup
    const skinRow = document.getElementById('skin-tones');
    customizationOptions.skins.forEach((s, idx) => {
        skinRow.innerHTML += `<button class="choice-btn ${idx===0?'active':''}" onclick="setCustomization('skinIndex', ${idx}, this)">${s.name}</button>`;
    });

    // Hair Style setup
    const hairRow = document.getElementById('hair-styles');
    customizationOptions.hairs.forEach((h, idx) => {
        hairRow.innerHTML += `<button class="choice-btn ${idx===0?'active':''}" onclick="setCustomization('hairIndex', ${idx}, this)">${h.style}</button>`;
    });

    // Hair Colors setup
    const hColorRow = document.getElementById('hair-colors');
    customizationOptions.hairColors.forEach((c, idx) => {
        hColorRow.innerHTML += `<button class="choice-btn ${idx===0?'active':''}" onclick="setCustomization('hairColorIndex', ${idx}, this)">${c.name}</button>`;
    });

    // Eyes setup
    const eyeRow = document.getElementById('eye-colors');
    customizationOptions.eyes.forEach((e, idx) => {
        eyeRow.innerHTML += `<button class="choice-btn ${idx===0?'active':''}" onclick="setCustomization('eyeIndex', ${idx}, this)">${e.color}</button>`;
    });
}

function setBody(gender) {
    characterState.gender = gender;
    // Update active button state
    event.target.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('preview-base').innerText = gender === 'female' ? '🧍‍♀️' : '🧍‍♂️';
    updatePreviewVisuals();
}

function setCustomization(key, val, element) {
    characterState[key] = val;
    element.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    element.classList.add('active');
    updatePreviewVisuals();
}

function updatePreviewVisuals() {
    const baseNode = document.getElementById('preview-base');
    const hairNode = document.getElementById('preview-hair');
    const eyeNode = document.getElementById('preview-eyes');

    baseNode.style.filter = customizationOptions.skins[characterState.skinIndex].filter;
    hairNode.innerText = customizationOptions.hairs[characterState.hairIndex].emoji;
    hairNode.style.filter = customizationOptions.hairColors[characterState.hairColorIndex].filter;
    eyeNode.style.filter = customizationOptions.eyes[characterState.eyeIndex].filter;
}

function goToWardrobe() {
    // Hide Character Creator view, Open Wardrobe view
    document.getElementById('creator-stage').classList.add('hidden');
    document.getElementById('main-stage').classList.remove('hidden');

    // Sync Preview Visual Styles to Wardrobe Canvas
    document.getElementById('char-base').innerText = document.getElementById('preview-base').innerText;
    document.getElementById('char-base').style.filter = document.getElementById('preview-base').style.filter;
    
    document.getElementById('char-hair').innerText = document.getElementById('preview-hair').innerText;
    document.getElementById('char-hair').style.filter = document.getElementById('preview-hair').style.filter;
    
    document.getElementById('char-eyes').style.filter = document.getElementById('preview-eyes').style.filter;

    switchTab('tops');
}

function switchTab(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const grid = document.getElementById('closet-items');
    grid.innerHTML = '';

    wardrobeData[category].forEach(item => {
        const card = document.createElement('div');
        card.className = 'closet-card';
        card.onclick = () => equipItem(category, item);
        card.innerHTML = `<span class="emoji">${item.emoji}</span><span class="label">${item.name}</span>`;
        grid.appendChild(card);
    });
}

function equipItem(category, item) {
    if (category === 'accessories') {
        currentOutfit[item.layer] = item;
        document.getElementById(`layer-${item.layer}`).innerText = item.emoji;
    } else {
        currentOutfit[category] = item;
        let targetLayer = category === 'tops' ? 'layer-torso' : category === 'bottoms' ? 'layer-legs' : 'layer-shoes';
        document.getElementById(targetLayer).innerText = item.emoji;
    }
}

function startCatwalk() {
    const screen = document.getElementById('runway-screen');
    const modelWrapper = document.getElementById('runway-model-wrapper');
    const panel = document.getElementById('judges-panel');

    // Sync exact character modifications into the runway screen
    document.getElementById('runway-base').innerText = document.getElementById('char-base').innerText;
    document.getElementById('runway-base').style.filter = document.getElementById('char-base').style.filter;
    document.getElementById('runway-hair').innerText = document.getElementById('char-hair').innerText;
    document.getElementById('runway-hair').style.filter = document.getElementById('char-hair').style.filter;
    document.getElementById('runway-eyes').style.filter = document.getElementById('char-eyes').style.filter;

    // Sync outfit data to runway positions
    const slots = ['hat', 'glasses', 'scarf', 'tie', 'bow', 'torso', 'legs', 'shoes'];
    slots.forEach(slot => {
        const outfitItem = slot === 'torso' ? currentOutfit.tops : slot === 'legs' ? currentOutfit.bottoms : slot === 'shoes' ? currentOutfit.shoes : currentOutfit[slot];
        document.getElementById(`r-layer-${slot}`).innerText = outfitItem ? outfitItem.emoji : '';
    });

    screen.classList.remove('hidden');
    panel.classList.add('hidden');
    modelWrapper.classList.add('walk-animation');

    setTimeout(() => {
        modelWrapper.classList.remove('walk-animation');
        calculateScores();
        panel.classList.remove('hidden');
    }, 4000);
}

function calculateScores() {
    const equipped = Object.values(currentOutfit).filter(item => item !== null);

    if (equipped.length === 0) {
        setJudgeResults('judge-1', 0, "No clothes? That's against the rules!");
        setJudgeResults('judge-2', 0, "Where is the fashion trend?");
        setJudgeResults('judge-3', 0, "Nothing to look at here.");
        return;
    }

    // 1. Color System Logic
    const colors = equipped.map(i => i.color);
    const uniqueColors = new Set(colors).size;
    let colorScore = 10 - (uniqueColors * 1.5);
    colorScore = Math.max(4, Math.min(10, colorScore));
    let colorFeedback = uniqueColors > 3 ? "A bit chaotic! Try fewer color patterns." : "Superb, beautifully balanced layout colors!";

    // 2. Individual Style System Logic
    const styles = equipped.map(i => i.style);
    const uniqueStyles = new Set(styles).size;
    let styleScore = uniqueStyles === 1 ? 8 : 5 + (uniqueStyles * 2);
    styleScore = Math.min(10, styleScore);
    let styleFeedback = uniqueStyles === 1 ? "Very clean, uniform style execution." : "A thrilling mix of unique cultural trends!";

    // 3. Accessory System Balance
    const accs = Object.keys(currentOutfit).filter(k => !['tops', 'bottoms', 'shoes'].includes(k) && currentOutfit[k] !== null).length;
    let accScore = accs === 0 ? 4 : (accs <= 2 ? 10 : 6);
    let accFeedback = accs === 0 ? "Needs a standalone statement accessory item." : (accs <= 2 ? "Flawless accessory coordination layout!" : "A little too cluttered near the head.");

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
    document.getElementById('runway-screen').classList.add('hidden');
    document.getElementById('main-stage').classList.add('hidden');
    document.getElementById('creator-stage').classList.remove('hidden');
    
    // Reset outfit records
    currentOutfit = { tops: null, bottoms: null, shoes: null, hat: null, glasses: null, scarf: null, bow: null, tie: null };
    document.querySelectorAll('.accessory-layer, .clothing-layer').forEach(l => l.innerText = '');
}
