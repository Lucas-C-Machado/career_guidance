/**
 * TEST-COMPLETION.JS - Versão Final
 * Objetivo: Exibir o resultado final e limpar dados temporários com segurança.
 */

auth.onAuthStateChanged(user => {
    // 1. Proteção de Rota
    if (!user) {
        window.location.href = 'login-student.html';
        return;
    }

    // 2. Recuperação de dados do localStorage
    // Buscamos 'testScore' (definido no teste) e 'selectedCollegeName' (definido na lista/seleção)
    const score = localStorage.getItem('testScore') || "0";
    const collegeName = localStorage.getItem('selectedCollegeName') || "sua instituição escolhida";

    // 3. Atualização da Interface
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (scoreDisplay) {
        scoreDisplay.textContent = score + "%";
    }

    // Mostrar o nome da faculdade no elemento correspondente
    const collegeInfo = document.getElementById('collegeInfo');
    if (collegeInfo) {
        collegeInfo.textContent = `Inscrição realizada para: ${collegeName}`;
    }

    // Removido Logger.log para evitar erros de referência
    console.log("Resultado processado com sucesso para:", user.email);
});

// 4. Lógica de Logout com animação de fade
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        // Feedback visual de saída (Efeito Fade)
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease';
        
        setTimeout(() => {
            // 5. Limpeza de Segurança
            // Removemos todos os itens temporários para que o próximo login esteja limpo
            const itemsToRemove = [
                'testScore', 
                'lastScore', 
                'selectedCollegeName', 
                'selectedCollegeId', 
                'minCgpaRequired',
                'tempCollegeName',
                'tempMinCgpa',
                'selectedCareer',
                'selectedLocation'
            ];
            
            itemsToRemove.forEach(item => localStorage.removeItem(item));
            
            // 6. Finaliza sessão no Firebase e redireciona
            auth.signOut().then(() => { 
                window.location.href = '../index.html'; 
            }).catch(err => {
                console.error("Erro ao deslogar:", err);
                window.location.href = '../index.html';
            });
        }, 400);
    });
}