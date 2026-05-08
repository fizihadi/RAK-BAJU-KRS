const mainChar = document.getElementById('main-character');
const targetText = document.getElementById('target-item');
const btnNext = document.getElementById('btn-seterusnya');

const steps = [
    { id: 'item-beret', nextId: 'item-tshirt', labelHtml: 'PERTAMA SEKALI, <span style="color: #ffb5c5;">BERET</span>', img: 'bajuGame1/baseModelBeret.png' },
    { id: 'item-tshirt', nextId: 'item-pants', labelHtml: 'SETERUSNYA, PAKAI <span style="color: #ffb5c5;">T-SHIRT</span>', img: 'bajuGame1/modelBaseTshirt.png' },
    { id: 'item-pants', nextId: 'item-belt', labelHtml: 'SELEPAS ITU, PAKAI <span style="color: #ffb5c5;">SELUAR UNIFORM</span>', img: 'bajuGame1/baseModelPants.png' },
    { id: 'item-belt', nextId: 'item-boots', labelHtml: 'KEMUDIAN, IKAT <span style="color: #ffb5c5;">TALI PINGGANG</span>', img: 'bajuGame1/modelBaseBelt.png' },
    { id: 'item-boots', nextId: null, labelHtml: 'AKHIR SEKALI, SARUNG <span style="color: #ffb5c5;">KASUT BUT</span>', img: 'bajuGame1/baseModelBoots.png' }
];

let currentStep = 0;
targetText.innerHTML = steps[0].labelHtml;

// Helper function to handle the "Wear" logic
// Gantikan fungsi wearItem dalam script.js anda
function wearItem(droppedId) {
    const step = steps[currentStep];

    if (droppedId === step.id) {
        // Tukar gambar karakter
        mainChar.src = step.img;
        
        // HANYA hilangkan gambar item yang betul, bukan semua slot
        document.getElementById(droppedId).style.visibility = "hidden";

        if (step.nextId) {
            currentStep++;
            const nextStep = steps[currentStep];
            
            // Unlock item seterusnya (buang filter grayscale)
            const nextEl = document.getElementById(nextStep.id);
            nextEl.classList.remove('locked');
            
            // Kemaskini arahan
            targetText.innerHTML = nextStep.labelHtml;
        } else {
            targetText.innerHTML = "<span style='color: #C5E6A6;'>SYABAS! UNIFORM LENGKAP.</span>";
            btnNext.classList.remove('locked');
            btnNext.style.opacity = "1";
        }
    }
}

// 1. DESKTOP DRAG LOGIC
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', e.target.id));
    
    // 2. MOBILE TAP LOGIC (Tap to wear)
    item.addEventListener('click', (e) => {
        wearItem(e.target.id);
    });
});

const dropZone = document.getElementById('character-drop-zone');
dropZone.addEventListener('dragover', (e) => e.preventDefault());
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('text');
    wearItem(droppedId);
});