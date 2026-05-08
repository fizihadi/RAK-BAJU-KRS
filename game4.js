const mainChar = document.getElementById('main-character');
const targetText = document.getElementById('target-item');
const btnNext = document.getElementById('btn-seterusnya');

const steps = [
    { id: 'item-heckle', nextId: 'item-mafla', labelHtml: 'MULA MULA PAKAI, <span style="color: #ffb5c5;">HECKLE MERAH</span>', img: 'bajuGame1/modelHeckle.png' },
    { id: 'item-mafla', nextId: 'item-glove', labelHtml: 'SETERUSNYA, PAKAI <span style="color: #ffb5c5;">MAFLA</span>', img: 'bajuGame1/modelMafla.png' },
    { id: 'item-glove', nextId: null, labelHtml: 'AKHIR SEKALI, PAKAI <span style="color: #ffb5c5;">SARUNG TANGAN</span>', img: 'bajuGame1/modelKawadFull.png' },
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