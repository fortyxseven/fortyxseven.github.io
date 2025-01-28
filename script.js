const subjects = {
    S3: {
        fields: [
            { name: 'maths', label: 'Math 3', coeff: 3, credits: 6 },
            { name: 'Mécanique', label: 'Mécanique Analytique', coeff: 3, credits: 6 },
            { name: 'optique', label: 'Optique', coeff: 2, credits: 4 },
            { name: 'VOM', label: 'V.O.M', coeff: 2, credits: 4 },
            { name: 'MNA', label: 'Méthode Numérique', coeff: 2, credits: 3 },
            { name: 'probastat', label: 'Proba-Stat', coeff: 2, credits: 2 },
            { name: 'tpvom', label: 'TP V.O.M', coeff: 1, credits: 2 },
            { name: 'tpoptique', label: 'TP Optique', coeff: 1, credits: 2 },
            { name: 'anglais', label: 'Anglais', coeff: 1, credits: 1 }
        ],
        categories: {
            UEF: { subjects: ['maths', 'Mécanique', 'optique', 'VOM'], totalCredits: 20 },
            UEM: { subjects: ['MNA', 'tpvom', 'tpoptique'], totalCredits: 7 },
            UED: { subjects: ['probastat'], totalCredits: 2 },
            UET: { subjects: ['anglais'], totalCredits: 1 }
        }
    },
    S4: {
        fields: [
            { name: 'THERMO', label: 'Thermodynamique', coeff: 3, credits: 6 },
            { name: 'maths', label: 'Math 4', coeff: 2, credits: 4 },
            { name: 'QUANTIQUE', label: 'M.Quantique', coeff: 2, credits: 4 },
            { name: 'ELM', label: 'Électromagnétisme', coeff: 2, credits: 4 },
            { name: 'MDF', label: 'MDF', coeff: 2, credits: 3 },
            { name: 'ELN', label: 'Électronique', coeff: 2, credits: 3 },
            { name: 'ASTROPHY', label: 'Découverte', coeff: 2, credits: 3 },
            { name: 'tpthermo', label: 'TP Thermodynamique', coeff: 1, credits: 2 },
            { name: 'anglais', label: 'Anglais', coeff: 1, credits: 1 }
        ],
        categories: {
            UEF: { subjects: ['THERMO', 'maths', 'QUANTIQUE', 'ELM'], totalCredits: 18 },
            UEM: { subjects: ['MDF', 'tpthermo', 'ELN'], totalCredits: 8 },
            UED: { subjects: ['ASTROPHY'], totalCredits: 3 },
            UET: { subjects: ['anglais'], totalCredits: 1 }
        }
    }
};

let currentSemester = 'S3';

document.querySelectorAll('.sem-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentSemester = btn.dataset.semester;
        document.querySelectorAll('.sem-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadSemesterFields();
        document.getElementById('resultContainer').style.display = 'none';
    });
});

function loadSemesterFields() {
    const form = document.getElementById('semesterForm');
    form.innerHTML = subjects[currentSemester].fields.map(field => `
        <div class="input-group">
            <label>${field.label} (coeff ${field.coeff})</label>
            <input type="number" 
                   id="${field.name}_${currentSemester}" 
                   min="0" 
                   max="20" 
                   step="0.01" 
                   required>
        </div>
    `).join('') + `<button class="sem-btn" type="submit">Calculer</button>`;
}

document.getElementById('semesterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateAverage();
});

function calculateAverage() {
    const inputs = Array.from(document.querySelectorAll('#semesterForm input'));
    const grades = {};
    let isValid = true;

    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (isNaN(value) || value < 0 || value > 20) {
            isValid = false;
            input.classList.add('error');
        } else {
            grades[input.id.split('_')[0]] = value;
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        alert('Veuillez entrer des notes valides entre 0 et 20');
        return;
    }

    let moy_semestre, categoryResults = {};

    
    if (currentSemester === 'S3') {
        categoryResults.UEF = (grades.maths * 3 + grades.Mécanique * 3 + grades.optique * 2 + grades.VOM * 2) / 10;
        categoryResults.UEM = (grades.MNA * 2 + grades.tpvom * 1 + grades.tpoptique * 1) / 4;
        categoryResults.UED = grades.probastat;
        categoryResults.UET = grades.anglais;
        moy_semestre = (categoryResults.UEF * 10 + categoryResults.UEM * 4 + categoryResults.UED * 2 + categoryResults.UET * 1) / 17;
    } else {
        categoryResults.UEF = (grades.THERMO * 3 + grades.maths * 2 + grades.QUANTIQUE * 2 + grades.ELM * 2) / 9;
        categoryResults.UEM = (grades.MDF * 2 + grades.tpthermo * 1 + grades.ELN * 2) / 5;
        categoryResults.UED = grades.ASTROPHY;
        categoryResults.UET = grades.anglais;
        moy_semestre = (categoryResults.UEF * 9 + categoryResults.UEM * 5 + categoryResults.UED * 2 + categoryResults.UET * 1) / 17;
    }

    let totalCredits = 0;

    // Rule 1: 
    if (moy_semestre >= 10) {
        totalCredits = 30;
    } 
    // Rule 2: 
    else {
        Object.entries(subjects[currentSemester].categories).forEach(([cat, data]) => {
            const catAverage = categoryResults[cat];
            if (catAverage >= 10) {
                totalCredits += data.totalCredits;
            } else {
                data.subjects.forEach(subjectName => {
                    const subject = subjects[currentSemester].fields.find(f => f.name === subjectName);
                    if (grades[subjectName] >= 10) {
                        totalCredits += subject.credits;
                    }
                });
            }
        });
        totalCredits = Math.min(totalCredits, 30);
    }

    // Display results
    const averageElement = document.getElementById('averageValue');
    averageElement.textContent = moy_semestre.toFixed(2);
    averageElement.className = `result-number ${moy_semestre >= 10 ? 'pass' : 'fail'}`;
    
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('resultContainer').style.display = 'block';
}

loadSemesterFields();
