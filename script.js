function showForm(semester) {
  document.getElementById('gradeFormS1').style.display = semester === 'S1' ? 'block' : 'none';
  document.getElementById('gradeFormS2').style.display = semester === 'S2' ? 'block' : 'none';
}

document.getElementById("gradeFormS1").addEventListener("submit", function (event) {
  event.preventDefault();

  // Récupérer les valeurs des champs de notes
  var maths = parseFloat(document.getElementById("maths_S1").value);
  var Mécanique = parseFloat(document.getElementById("Mécanique_S1").value);
  var optique = parseFloat(document.getElementById("optique_S1").value);
  var VOM = parseFloat(document.getElementById("VOM_S1").value);
  var tpvom = parseFloat(document.getElementById("tpvom_S1").value);
  var tpoptique = parseFloat(document.getElementById("tpoptique_S1").value);
  var MNA = parseFloat(document.getElementById("MNA_S1").value);
  var probastat = parseFloat(document.getElementById("probastat_S1").value);
  var anglais = parseFloat(document.getElementById("anglais_S1").value);

  // Vérifier si les notes sont dans la plage valide
  var isValid = true;
  var maxGrade = 20;
  var minGrade = 0;

  var grades = [maths, Mécanique, optique, VOM, tpvom, tpoptique, MNA, probastat, anglais];
  for (var i = 0; i < grades.length; i++) {
    if (isNaN(grades[i]) || grades[i] < minGrade || grades[i] > maxGrade) {
      isValid = false;
      break;
    }
  }

  if (!isValid) {
    window.alert("Veuillez saisir des notes valides entre " + minGrade + " et " + maxGrade + ".");
    return;
  }

  // Calculer les moyennes des unités
  var moy_UEF = (maths * 3 + Mécanique * 3) / 6;
  var moy_UEM = (optique * 2 + VOM * 2 + MNA * 2 + probastat * 2) / 8;
  var moy_UED = (tpvom * 1 + tpoptique * 1) / 2;
  var moy_UET = (anglais * 1) / 1;

  // Calculer la moyenne du semestre
  var moy_semestre = (moy_UEF * 6 + moy_UEM * 8 + moy_UED * 2 + moy_UET * 1) / 17;

  // Afficher le résultat dans une fenêtre pop-up
  window.alert("La moyenne semestrielle est : " + moy_semestre.toFixed(2));
});

document.getElementById("gradeFormS2").addEventListener("submit", function (event) {
  event.preventDefault();

  // Récupérer les valeurs des champs de notes
  var maths = parseFloat(document.getElementById("maths_S2").value);
  var THERMO = parseFloat(document.getElementById("THERMO_S2").value);
  var QUANTIQUE = parseFloat(document.getElementById("QUANTIQUE_S2").value);
  var ELM = parseFloat(document.getElementById("ELM_S2").value);
  var tpthermo = parseFloat(document.getElementById("tpthermo_S2").value);
  var MDF = parseFloat(document.getElementById("MDF_S2").value);
  var ELN = parseFloat(document.getElementById("ELN_S2").value);
  var ASTROPHY = parseFloat(document.getElementById("ASTROPHY_S2").value);
  var anglais = parseFloat(document.getElementById("anglais_S2").value);

  // Vérifier si les notes sont dans la plage valide
  var isValid = true;
  var maxGrade = 20;
  var minGrade = 0;

  var grades = [maths, THERMO, QUANTIQUE, ELM, tpthermo, MDF, ELN, ASTROPHY, anglais];
  for (var i = 0; i < grades.length; i++) {
    if (isNaN(grades[i]) || grades[i] < minGrade || grades[i] > maxGrade) {
      isValid = false;
      break;
    }
  }

  if (!isValid) {
    window.alert("Veuillez saisir des notes valides entre " + minGrade + " et " + maxGrade + ".");
    return;
  }

  // Calculer les moyennes des unités
  var moy_UEF = (maths * 2 + THERMO * 3 + QUANTIQUE * 2 + ELM * 2) / 9;
  var moy_UEM = (tpthermo * 1 + MDF * 2 + ELN * 2) / 5;
  var moy_UED = (ASTROPHY * 2) / 2;
  var moy_UET = (anglais * 1) / 1;

  // Calculer la moyenne du semestre
  var moy_semestre = (moy_UEF * 9 + moy_UEM * 5 + moy_UED * 2 + moy_UET * 1) / 17;

  // Afficher le résultat dans une fenêtre pop-up
  window.alert("La moyenne semestrielle est : " + moy_semestre.toFixed(2));
});
