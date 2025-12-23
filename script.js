const programsData = {
  'L2.PHY': {
    S1: [
      {
        name: "UE Fondamentale (UEF)",
        modules: [
          { id: "math3", label: "Math 3", coef: 3, credit: 5 },
          { id: "meca_ana", label: "M. Analytique", coef: 3, credit: 5 }
        ]
      },
      {
        name: "UE Méthodologie (UEM)",
        modules: [
          { id: "optique", label: "Optique", coef: 2, credit: 4 },
          { id: "vom", label: "V.O.M", coef: 2, credit: 4 },
          { id: "mna", label: "M.N.A", coef: 2, credit: 4 },
          { id: "probastat", label: "Proba-Stat", coef: 2, credit: 4 }
        ]
      },
      {
        name: "UE Découverte & Transversale",
        modules: [
          { id: "tp_vom", label: "TP V.O.M", coef: 1, credit: 1 },
          { id: "tp_optique", label: "TP Optique", coef: 1, credit: 1 },
          { id: "anglais", label: "Anglais", coef: 1, credit: 2 }
        ]
      }
    ],
    S2: [
      {
        name: "UE Fondamentale (UEF)",
        modules: [
          { id: "thermo", label: "Thermodynamique", coef: 3, credit: 5 },
          { id: "math4", label: "Math 4", coef: 2, credit: 4 },
          { id: "quantique", label: "M. Quantique", coef: 2, credit: 4 },
          { id: "elm", label: "Électromagnétisme", coef: 2, credit: 4 }
        ]
      },
      {
        name: "UE Méthodologie (UEM)",
        modules: [
          { id: "mdf", label: "M.D.F", coef: 2, credit: 4 },
          { id: "eln", label: "Électronique", coef: 2, credit: 4 },
          { id: "tp_thermo", label: "TP Thermo", coef: 1, credit: 1 }
        ]
      },
      {
        name: "UE Découverte & Transversale",
        modules: [
          { id: "astrophy", label: "Astrophysique", coef: 2, credit: 3 },
          { id: "anglais_s2", label: "Anglais", coef: 1, credit: 1 }
        ]
      }
    ]
  },
  'L3.PHY-ENG': {
    S1: [
      {
        name: "UE Fondamentale (UEF)",
        modules: [
          { id: "trans_chaleur1", label: "Transfert de chaleur 1", coef: 3, credit: 6 },
          { id: "thermo_appro", label: "Thermodynamique approfondie", coef: 3, credit: 6 },
          { id: "meca_fluides2_s1", label: "Mécanique des fluides 2", coef: 3, credit: 6 }
        ]
      },
      {
        name: "UE Méthodologie (UEM)",
        modules: [
          { id: "mna1", label: "MNA 1", coef: 2, credit: 4 },
          { id: "tp_thermo_l3", label: "TP THERMO", coef: 1, credit: 2 },
          { id: "phys_stat", label: "Physique statistique", coef: 1, credit: 2 }
        ]
      },
      {
        name: "UE Découverte & Transversale",
        modules: [
          { id: "phys_semi", label: "Physique semi-conducteurs", coef: 1, credit: 2 },
          { id: "entreprenariat", label: "Entreprenariat", coef: 1, credit: 2 }
        ]
      }
    ],
    S2: [
      {
        name: "UE Fondamentale (UEF)",
        modules: [
          { id: "trans_chaleur2", label: "Transfert de chaleur 2", coef: 3, credit: 6 },
          { id: "meca_fluides2_s2", label: "Mécanique des fluides 2", coef: 3, credit: 6 },
          { id: "thermo_app2", label: "Thermodynamique appliquée 2", coef: 3, credit: 6 }
        ]
      },
      {
        name: "UE Méthodologie (UEM)",
        modules: [
          { id: "mna2", label: "MNA 2", coef: 2, credit: 3 },
          { id: "tp_meca_fluides", label: "TP Mécanique des fluides", coef: 2, credit: 3 },
          { id: "tp_conv", label: "TP Conversion énergie", coef: 2, credit: 3 }
        ]
      },
      {
        name: "UE Découverte & Transversale",
        modules: [
          { id: "conv_energie", label: "Conversion d’énergie", coef: 1, credit: 2 },
          { id: "anglais_sc", label: "Anglais scientifique", coef: 1, credit: 1 }
        ]
      }
    ]
  }
};

let currentTemplate = 'L2.PHY'; // Default
let currentSemester = 'S1';
let customModuleCount = 5;

document.addEventListener('DOMContentLoaded', () => {
  const savedCount = localStorage.getItem('custom_count');
  if(savedCount) customModuleCount = parseInt(savedCount);

  setupEventListeners();
  
  switchTemplate('L2.PHY');
});

function setupEventListeners() {

  document.querySelectorAll('.tpl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tpl = e.target.getAttribute('data-template');
      switchTemplate(tpl, e.target);
    });
  });


  document.querySelectorAll('.switch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sem = e.target.getAttribute('data-semestre');
      switchSemester(sem, e.target);
    });
  });

  const btnClear = document.getElementById('btn-clear');
  if (btnClear) {
    btnClear.addEventListener('click', (e) => {
        e.preventDefault();
        clearData();
    });
  }

  const btnCalc = document.getElementById('btn-calc');
  if (btnCalc) {
    btnCalc.addEventListener('click', (e) => {
        e.preventDefault();
        calculate();
    });
  }
}

function switchTemplate(tpl, btnElement) {
    currentTemplate = tpl;
    
    document.querySelectorAll('.tpl-btn').forEach(btn => btn.classList.remove('active'));
    if(btnElement) {
        btnElement.classList.add('active');
    } else {

        document.querySelector(`.tpl-btn[data-template="${tpl}"]`).classList.add('active');
    }

    const semSwitcher = document.getElementById('semester-switcher');
    const actions = document.getElementById('action-buttons');
    const result = document.getElementById('result-container');
    
    // Hide result on switch
    result.style.display = 'none';
    document.body.classList.remove('custom-mode');

    if (tpl === 'Custom') {
        semSwitcher.style.display = 'none';
        actions.style.display = 'flex';
        document.body.classList.add('custom-mode');
        renderCustomForm();
        currentSemester = 'Custom';
    } 
    else {
        semSwitcher.style.display = 'flex';
        actions.style.display = 'flex';
        switchSemester('S1');
    }
}

function switchSemester(sem, btnElement) {
  if(currentTemplate === 'Custom') return; // Safety

  currentSemester = sem;

  document.querySelectorAll('.switch-btn').forEach(btn => btn.classList.remove('active'));
  if(btnElement) {
     btnElement.classList.add('active'); 
  } else {
     const btn = document.querySelector(`.switch-btn[data-semestre="${sem}"]`);
     if(btn) btn.classList.add('active');
  }

  document.getElementById('result-container').style.display = 'none';
  renderForm(sem);
}

function renderForm(semester) {
  const container = document.getElementById('form-container');
  container.innerHTML = ''; 


  const data = programsData[currentTemplate][semester];

  data.forEach(ue => {
    const ueDiv = document.createElement('div');
    ueDiv.className = 'ue-section';
    
    const title = document.createElement('div');
    title.className = 'ue-title';
    title.innerHTML = `<span>${ue.name}</span>`;
    ueDiv.appendChild(title);

    ue.modules.forEach(mod => {
      const group = document.createElement('div');
      group.className = 'input-group';
      
      group.innerHTML = `
        <div class="label-container">
            <label for="${mod.id}">
            ${mod.label} 
            <span class="meta">(Coef. ${mod.coef} | Crédits ${mod.credit})</span>
            </label>
        </div>
        
        <div class="input-wrapper">
          <input 
            type="number" 
            id="${mod.id}" 
            data-coef="${mod.coef}" 
            min="0" max="20" step="0.01" 
            placeholder="--"
          >
        </div>
      `;
      ueDiv.appendChild(group);
    });

    container.appendChild(ueDiv);
  });

  attachInputListeners();
  loadData(semester);
}

function renderCustomForm() {
  const container = document.getElementById('form-container');
  container.innerHTML = '';

  const ueDiv = document.createElement('div');
  ueDiv.className = 'ue-section';
  
  const title = document.createElement('div');
  title.className = 'ue-title';
  title.innerHTML = `<span>Modules Personnalisés</span>`;
  ueDiv.appendChild(title);

  for (let i = 1; i <= customModuleCount; i++) {
      const group = document.createElement('div');
      group.className = 'input-group';
      
      let removeBtnHTML = '';
      if (i === customModuleCount && customModuleCount > 5) {
          removeBtnHTML = `<button class="btn-remove" onclick="removeCustomModule()" title="Supprimer">-</button>`;
      }

      group.innerHTML = `
        <div class="label-container">
            <label for="custom_note_${i}">Module ${i}</label>
            ${removeBtnHTML}
        </div>
        
        <div class="input-wrapper coeff-wrapper">
           <input 
            type="number" 
            class="custom-input"
            id="custom_coef_${i}" 
            min="1" max="20" step="0.5" 
            value="1"
            placeholder="Coef"
          >
        </div>

        <div class="input-wrapper note-wrapper">
          <input 
            type="number" 
            class="custom-input"
            id="custom_note_${i}" 
            min="0" max="20" step="0.01" 
            placeholder="Note"
          >
        </div>
      `;
      ueDiv.appendChild(group);
  }

  container.appendChild(ueDiv);

  const controls = document.createElement('div');
  controls.className = 'custom-controls';
  controls.innerHTML = `<button class="btn-add" onclick="addCustomModule()" title="Ajouter un module">+</button>`;
  container.appendChild(controls);

  attachInputListeners();
  loadData('Custom');
}

window.addCustomModule = function() {
    customModuleCount++;
    localStorage.setItem('custom_count', customModuleCount);
    renderCustomForm();
}

window.removeCustomModule = function() {
    if (customModuleCount > 5) {
        const grades = JSON.parse(localStorage.getItem('grades_Custom') || '{}');
        delete grades[`custom_note_${customModuleCount}`];
        delete grades[`custom_coef_${customModuleCount}`];
        localStorage.setItem('grades_Custom', JSON.stringify(grades));

        customModuleCount--;
        localStorage.setItem('custom_count', customModuleCount);
        renderCustomForm();
    }
}

function attachInputListeners() {
  document.querySelectorAll('#form-container input').forEach(input => {
    input.addEventListener('input', (e) => handleInput(e.target));
  });
}

function handleInput(inputElement) {
  let value = parseFloat(inputElement.value);
  
  if (inputElement.id.includes('note') || (!inputElement.id.includes('coef') && !inputElement.id.includes('custom'))) {
      if (value > 20) inputElement.value = 20;
      else if (value < 0) inputElement.value = 0;
  }
  
  if (inputElement.value.includes('.') && inputElement.value.split('.')[1].length > 2) {
     inputElement.value = parseFloat(inputElement.value).toFixed(2);
  }

  saveData();
}

function saveData() {
  const inputs = document.querySelectorAll('#form-container input');
  const data = {};
  
  inputs.forEach(input => {
    if (input.value !== '') {
      data[input.id] = input.value;
    }
  });
  
  const key = currentTemplate === 'Custom' ? 'grades_Custom' : `grades_${currentTemplate}_${currentSemester}`;
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(semester) {
  const key = currentTemplate === 'Custom' ? 'grades_Custom' : `grades_${currentTemplate}_${semester}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    const data = JSON.parse(saved);
    for (const [id, value] of Object.entries(data)) {
      const input = document.getElementById(id);
      if (input) input.value = value;
    }
  }
}

function clearData() {
  const isCustom = currentTemplate === 'Custom';
  if(confirm("Voulez-vous vraiment effacer toutes les notes de ce semestre ?")) {
    const key = isCustom ? 'grades_Custom' : `grades_${currentTemplate}_${currentSemester}`;
    localStorage.removeItem(key);
    
    if(isCustom) renderCustomForm();
    else renderForm(currentSemester);
    
    document.getElementById('result-container').style.display = 'none';
  }
}

function calculate() {
  let totalPoints = 0;
  let totalCoef = 0;
  let totalCreditsAcquired = 0;
  const totalSemesterCredits = 30;
  const ueAverages = [];

  if (currentTemplate === 'Custom') {
      for(let i=1; i<=customModuleCount; i++) {
          const noteInput = document.getElementById(`custom_note_${i}`);
          const coefInput = document.getElementById(`custom_coef_${i}`);

          let note = parseFloat(noteInput ? noteInput.value : 0);
          let coef = parseFloat(coefInput ? coefInput.value : 1);

          if(isNaN(note)) note = 0;
          if(isNaN(coef)) coef = 0;

          totalPoints += note * coef;
          totalCoef += coef;
      }
      
      const generalAverage = totalCoef > 0 ? parseFloat((totalPoints / totalCoef).toFixed(2)) : 0;
      
      document.getElementById('final-score').textContent = generalAverage.toFixed(2);
      document.getElementById('final-score').className = 'big-score ' + (generalAverage >= 10 ? 'score-green' : 'score-red');
      
      document.getElementById('verdict').style.display = 'none';
      document.getElementById('credits-display').style.display = 'none';
      document.getElementById('details-section').style.display = 'none';
      
      const resultContainer = document.getElementById('result-container');
      resultContainer.style.display = 'block';
      resultContainer.scrollIntoView({ behavior: 'smooth' });
      return;
  }

  const data = programsData[currentTemplate][currentSemester];
  
  data.forEach(ue => {
    let uePoints = 0;
    let ueCoef = 0;
    let ueTotalMaxCredits = 0;
    let ueCreditsFromModules = 0; 

    ue.modules.forEach(mod => {
      const input = document.getElementById(mod.id);
      let val = parseFloat(input ? input.value : 0);
      if (isNaN(val)) val = 0; 
      
      uePoints += val * mod.coef;
      ueCoef += mod.coef;
      ueTotalMaxCredits += mod.credit;

      if (val >= 10) {
        ueCreditsFromModules += mod.credit;
      }
    });

    const ueAvg = ueCoef > 0 ? (uePoints / ueCoef) : 0;
    
    let creditsEarnedForUE = 0;
    let acquisitionMethod = "";

    if (ueAvg >= 10) {
        creditsEarnedForUE = ueTotalMaxCredits;
        acquisitionMethod = "UE Validée";
    } else {
        creditsEarnedForUE = ueCreditsFromModules;
        acquisitionMethod = "Par éléments";
    }

    totalCreditsAcquired += creditsEarnedForUE;

    ueAverages.push({
      name: ue.name,
      avg: ueAvg.toFixed(2),
      credits: creditsEarnedForUE,
      maxCredits: ueTotalMaxCredits,
      isValidated: ueAvg >= 10,
      method: acquisitionMethod
    });
    
    totalPoints += uePoints;
    totalCoef += ueCoef;
  });

  const generalAverage = totalCoef > 0 ? parseFloat((totalPoints / totalCoef).toFixed(2)) : 0;
  
  let finalCredits = totalCreditsAcquired;
  if (generalAverage >= 10) {
    finalCredits = totalSemesterCredits;
  }

  displayResult(generalAverage, ueAverages, finalCredits);
}

function displayResult(average, ueDetails, credits) {
  const resultContainer = document.getElementById('result-container');
  const scoreEl = document.getElementById('final-score');
  const verdictEl = document.getElementById('verdict');
  const creditsEl = document.getElementById('credits-display');
  const detailsSection = document.getElementById('details-section');
  const detailsGrid = document.getElementById('details-grid');

  verdictEl.style.display = 'block';
  creditsEl.style.display = 'inline-block';
  detailsSection.style.display = 'block';

  scoreEl.textContent = average.toFixed(2);
  scoreEl.className = 'big-score ' + (average >= 10 ? 'score-green' : 'score-red');
  
  if (average >= 10) {
    verdictEl.textContent = "Semestre Validé par Compensation ! 🎓";
    verdictEl.style.color = 'var(--success)';
  } else if (credits >= 30) {
    verdictEl.textContent = "Semestre Validé (Crédits acquis) 🎓";
    verdictEl.style.color = 'var(--success)';
  } else {
    verdictEl.textContent = "Semestre Non Validé - Session Rattrapage 📚";
    verdictEl.style.color = 'var(--danger)';
  }

  creditsEl.textContent = `Crédits acquis : ${credits} / 30`;
  creditsEl.style.color = credits >= 30 ? 'var(--success)' : (credits > 0 ? 'var(--text)' : 'var(--text-muted)');

  detailsGrid.innerHTML = '';
  ueDetails.forEach(ue => {
    const div = document.createElement('div');
    div.className = `detail-item ${ue.isValidated || average >= 10 ? 'validated' : ''}`;
    
    div.innerHTML = `
      <span class="detail-label">${ue.name}</span>
      <span class="detail-value ${ue.avg >= 10 ? 'score-green' : 'score-red'}">${ue.avg}</span>
      <span class="detail-credits">
        Crédits: ${ue.isValidated || average >= 10 ? ue.maxCredits : ue.credits}/${ue.maxCredits}
      </span>
    `;
    detailsGrid.appendChild(div);
  });

  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth' });
}
