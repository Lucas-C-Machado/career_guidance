/**
 * TEST-COMPLETION.JS - Versão Final (Sem necessidade de Índice)
 * Objetivo: Exibir a pontuação correta buscando do Firestore como fallback.
 */

auth.onAuthStateChanged(async (user) => {
    // 1. Proteção de Rota: Se não houver usuário, volta para o login
    if (!user) {
        window.location.href = 'login-student.html';
        return;
    }

    const scoreDisplay = document.getElementById('scoreDisplay');
    
    // 2. Tenta obter o valor imediato do localStorage
    let score = localStorage.getItem('testScore');

    // 3. Fallback: Se o localStorage estiver vazio ou em 0%, busca no Firestore
    // Usamos a lógica que não exige a criação de índices manuais no Firebase
    if (!score || score === "0") {
        console.log("LocalStorage vazio ou inconsistente. Buscando do Firestore...");
        try {
            const firestoreDb = window.db || firebase.firestore();
            
            // Busca simplificada: apenas o filtro de UID (não exige índice)
            const querySnapshot = await firestoreDb.collection('registrations')
                .where('studentUid', '==', user.uid)
                .get();

            if (!querySnapshot.empty) {
                // Transformamos os documentos em uma lista de dados
                const docs = querySnapshot.docs.map(doc => doc.data());

                // Ordenamos manualmente pelo campo 'appliedAt' (do mais novo para o mais antigo)
                docs.sort((a, b) => {
                    const timeA = a.appliedAt ? a.appliedAt.toMillis() : 0;
                    const timeB = b.appliedAt ? b.appliedAt.toMillis() : 0;
                    return timeB - timeA;
                });

                // Pegamos a pontuação do teste mais recente
                score = docs[0].testScore;
                
                // Sincronizamos o localStorage para evitar novas consultas
                localStorage.setItem('testScore', score);
            }
        } catch (error) {
            console.error("Erro ao recuperar dados do Firestore:", error);
        }
    }

    // 4. Atualização visual da Interface
    if (scoreDisplay) {
        const finalValue = (score !== null && score !== undefined) ? score : "0";
        scoreDisplay.textContent = `${finalValue}%`;
        
        // Aplica a cor baseada no desempenho
        const numScore = parseInt(finalValue);
        if (numScore >= 70) {
            scoreDisplay.style.color = "#28a745"; // Verde (Sucesso)
        } else if (numScore >= 50) {
            scoreDisplay.style.color = "#ffc107"; // Amarelo (Atenção)
        } else {
            scoreDisplay.style.color = "#dc3545"; // Vermelho (Insuficiente)
        }
    }

    console.log("Resultado final processado para:", user.email, "Score:", score);
});

// 5. Lógica de Logout
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        // Limpa dados sensíveis antes de sair
        localStorage.removeItem('testScore');
        auth.signOut().then(() => {
            window.location.href = '../index.html';
        }).catch(err => {
            console.error("Erro ao sair:", err);
            window.location.href = '../index.html';
        });
    });
}