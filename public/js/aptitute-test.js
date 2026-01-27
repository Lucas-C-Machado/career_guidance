/**
 * APTITUTE-TEST.JS - Versão Final Sincronizada
 */

const questions = [
    { section: 'Critérios Acadêmicos', q: 'Qual o principal objetivo de um Statement of Purpose (SOP)?', options: ['Listar hobbies', 'Apresentar motivações e metas acadêmicas', 'Registrar dados financeiros'], correct: 1 },
    { section: 'Verbal', q: 'Qual é o sinônimo de "Efêmero"?', options: ['Duradouro', 'Passageiro', 'Forte', 'Lento'], correct: 1 },
    { section: 'Quantitativa', q: 'Se 2x + 5 = 15, qual o valor de x?', options: ['2', '5', '10', '15'], correct: 1 }
];

let currentQ = 0;
let scoreAcertos = 0;

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'login-student.html';
    } else {
        checkElegibility();
    }
});

function checkElegibility() {
    const minRequired = parseFloat(localStorage.getItem('tempMinCgpa') || 0);
    const studentCgpa = parseFloat(prompt(`Confirme seu CGPA para prosseguir:`));

    if (isNaN(studentCgpa) || studentCgpa < minRequired) {
        alert(`CGPA insuficiente para os requisitos desta instituição.`);
        window.location.href = 'colleges-list.html';
    } else {
        loadQuestion();
    }
}

function loadQuestion() {
    const q = questions[currentQ];
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = `${(currentQ / questions.length) * 100}%`;
    
    document.getElementById('sectionTitle').textContent = `Seção ${currentQ + 1}: ${q.section}`;
    document.getElementById('questionText').textContent = q.q;
    
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `
            <label style="display: block; padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; margin-bottom: 10px;">
                <input type="radio" name="answer" value="${i}" required style="margin-right: 10px;">
                ${opt}
            </label>
        `;
        optionDiv.onclick = () => {
            document.querySelectorAll('#optionsContainer label').forEach(l => l.style.background = 'white');
            optionDiv.querySelector('label').style.background = '#f0f7ff';
        };
        container.appendChild(optionDiv);
    });

    if (currentQ === questions.length - 1) {
        document.getElementById('nextBtn').textContent = 'FINALIZAR INSCRIÇÃO';
        document.getElementById('nextBtn').style.background = '#28a745';
    }
}

document.getElementById('testForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    
    if (parseInt(selected.value) === questions[currentQ].correct) {
        scoreAcertos++;
    }

    currentQ++;
    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        await processFinalRegistration();
    }
});

async function processFinalRegistration() {
    const finalScore = Math.round((scoreAcertos / questions.length) * 100);
    const user = firebase.auth().currentUser;

    if (!user) return;

    try {
        const firestoreDb = window.db || firebase.firestore();

        // 1. Grava no Firestore (Fonte da Verdade)
        await firestoreDb.collection('registrations').add({
            studentUid: user.uid,
            studentEmail: user.email,
            testScore: finalScore,
            appliedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // 2. Salva localmente (Garantindo string)
        localStorage.setItem('testScore', finalScore.toString());
        
        console.log("Score salvo:", finalScore);

        // 3. Delay de 500ms para garantir que a escrita no disco e DB finalize
        setTimeout(() => {
            window.location.href = 'test-completion.html';
        }, 500);

    } catch (error) {
        console.error("Erro ao processar:", error);
        alert("Erro ao salvar resultados. Tente novamente.");
    }
}