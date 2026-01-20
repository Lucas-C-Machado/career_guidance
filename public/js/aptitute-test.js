/**
 * APTITUTE-TEST.JS
 * Fluxo: Proteção -> Elegibilidade (CGPA) -> Teste -> Gravação no Firestore
 */

// 1. Dados das Questões
const questions = [
    { section: 'Critérios Acadêmicos', q: 'Qual o principal objetivo de um Statement of Purpose (SOP)?', options: ['Listar hobbies', 'Apresentar motivações e metas acadêmicas', 'Registrar dados financeiros'], correct: 1 },
    { section: 'Verbal', q: 'Qual é o sinônimo de "Efêmero"?', options: ['Duradouro', 'Passageiro', 'Forte', 'Lento'], correct: 1 },
    { section: 'Quantitativa', q: 'Se 2x + 5 = 15, qual o valor de x?', options: ['2', '5', '10', '15'], correct: 1 }
];

let currentQ = 0;
let score = 0;

// 2. Proteção de Rota e Verificação de Elegibilidade
// Usamos o observer para garantir que o 'user' esteja carregado
auth.onAuthStateChanged(user => {
    if (!user) {
        console.warn("Usuário não autenticado, redirecionando...");
        window.location.href = 'login-student.html';
    } else {
        console.log("Usuário logado:", user.email);
        checkElegibility();
    }
});

function checkElegibility() {
    const minRequired = parseFloat(localStorage.getItem('tempMinCgpa') || 0);
    const collegeName = localStorage.getItem('tempCollegeName') || "Instituição";
    
    // Procedimento operacional normal: Verificação de CGPA
    const studentCgpa = parseFloat(prompt(`Verificação de Elegibilidade para ${collegeName}:\nPor favor, confirme seu CGPA atual para prosseguir com o teste:`));

    if (isNaN(studentCgpa) || studentCgpa < minRequired) {
        alert(`Inscrição negada. Seu CGPA (${studentCgpa || 0}) é insuficiente para os requisitos desta faculdade (${minRequired}).`);
        window.location.href = 'colleges-list.html';
    } else {
        loadQuestion();
    }
}

// 3. Lógica do Teste (Interface)
function loadQuestion() {
    const q = questions[currentQ];
    const progress = (currentQ / questions.length) * 100;
    
    // Atualiza barra de progresso e textos
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = `${progress}%`;
    
    document.getElementById('sectionTitle').textContent = `Seção ${currentQ + 1}: ${q.section}`;
    document.getElementById('questionText').textContent = q.q;
    
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `
            <label style="display: block; padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; transition: background 0.2s; margin-bottom: 10px;">
                <input type="radio" name="answer" value="${i}" required style="margin-right: 10px;">
                ${opt}
            </label>
        `;

        // Efeito visual de seleção
        optionDiv.onclick = () => {
            document.querySelectorAll('#optionsContainer label').forEach(l => {
                l.style.background = 'white';
                l.style.borderColor = '#ddd';
            });
            const label = optionDiv.querySelector('label');
            label.style.background = '#f0f7ff';
            label.style.borderColor = '#003366';
        };
        container.appendChild(optionDiv);
    });

    // Altera o botão na última questão
    if (currentQ === questions.length - 1) {
        const nextBtn = document.getElementById('nextBtn');
        nextBtn.textContent = 'FINALIZAR E CONFIRMAR INSCRIÇÃO';
        nextBtn.style.background = '#28a745';
    }
}

// 4. Captura da Resposta
document.getElementById('testForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    
    if (!selected) return;

    if (parseInt(selected.value) === questions[currentQ].correct) {
        score += (100 / questions.length);
    }

    currentQ++;
    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        await processFinalRegistration();
    }
});

// 5. Gravação Final no Firestore (Onde ocorria o erro)
async function processFinalRegistration() {
    const finalScore = Math.round(score);
    const user = firebase.auth().currentUser; // Chamada direta ao SDK para garantir segurança
    const collegeName = localStorage.getItem('tempCollegeName');
    const collegeLoc = localStorage.getItem('tempCollegeLocation');

    // Feedback visual de carregamento
    const testContainer = document.getElementById('testContainer');
    testContainer.innerHTML = `
        <div style="text-align:center; padding: 50px;">
            <h2 style="color: #003366;">Processando Inscrição...</h2>
            <p>Salvando seus resultados no banco de dados.</p>
        </div>
    `;

    if (!user) {
        alert("Sessão expirada. Por favor, faça login novamente.");
        window.location.href = 'login-student.html';
        return;
    }

    try {
        // Garante que estamos usando a instância correta do db
        const firestoreDb = window.db || firebase.firestore();

        // Gravação na coleção 'registrations'
        await firestoreDb.collection('registrations').add({
            studentUid: user.uid,
            studentEmail: user.email,
            collegeName: collegeName || "Instituição não identificada",
            location: collegeLoc || "Local não identificado",
            status: finalScore >= 50 ? "eligible" : "pending_review",
            testScore: finalScore,
            appliedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("Sucesso: Inscrição salva no Firestore.");

        // Salva localmente para a página de conclusão
        localStorage.setItem('lastScore', finalScore);
        
        // Pequeno delay para garantir que o Firestore processou antes do redirecionamento
        setTimeout(() => {
            window.location.href = 'test-completion.html';
        }, 500);

    } catch (error) {
        console.error("ERRO AO SALVAR NO FIRESTORE:", error);
        alert("Erro técnico ao salvar sua inscrição: " + error.message);
        
        // Em caso de erro, permite tentar novamente resetando o container
        testContainer.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <h2 style="color: #ff4444;">Falha na Gravação</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()" class="btn-nav">Tentar Novamente</button>
            </div>
        `;
    }
}