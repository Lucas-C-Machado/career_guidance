/**
 * STUDENT-DETAILS.JS
 * Carrega informações do perfil e inscrições em tempo real.
 */

auth.onAuthStateChanged(user => {
    if (!user) {
        // Redireciona se não houver usuário logado
        window.location.href = 'login-student.html';
    } else {
        console.log("Usuário ativo para busca de dados:", user.uid);

        // 1. Carrega dados básicos do perfil (Coleção 'users')
        db.collection('users').doc(user.uid).get()
            .then(doc => {
                if (doc.exists) {
                    renderInfo(doc.data());
                } else {
                    // Fallback caso o documento de usuário não exista
                    renderInfo({ email: user.email, role: 'Estudante' });
                }
            })
            .catch(err => console.error("Erro ao carregar perfil:", err));

        // 2. ESCUTA EM TEMPO REAL: Inscrições e Resultados (Coleção 'registrations')
        // Usamos 'studentUid' para filtrar, conforme gravado no aptitute-test.js
        db.collection('registrations')
            .where('studentUid', '==', user.uid)
            .onSnapshot(snapshot => {
                console.log(`Atualização recebida: ${snapshot.size} inscrições encontradas.`);
                renderRegistrations(snapshot);
                renderTestResults(snapshot);
            }, error => {
                // Se a lista não aparecer, verifique se o console pede para criar um Índice
                console.error("Erro na escuta em tempo real do Firestore:", error);
                
                const divReg = document.getElementById('userRegistrations');
                if (divReg) {
                    divReg.innerHTML = `<p style="color:red;">Erro ao sincronizar dados. Verifique o console.</p>`;
                }
            });
    }
});

/**
 * Renderiza as informações pessoais no topo da página
 */
function renderInfo(data) {
    const infoDiv = document.getElementById('userInfo');
    if (!infoDiv) return;

    infoDiv.innerHTML = `
        <div class="data-item"><strong>Nome:</strong> <span>${data.name || 'Não informado'}</span></div>
        <div class="data-item"><strong>E-mail:</strong> <span>${data.email || 'N/A'}</span></div>
        <div class="data-item"><strong>Perfil:</strong> <span>${data.role || 'Estudante'}</span></div>
        <div class="data-item"><strong>Membro desde:</strong> <span>${data.createdAt ? data.createdAt.toDate().toLocaleDateString() : 'N/A'}</span></div>
    `;
}

/**
 * Renderiza a lista de faculdades inscritas
 */
function renderRegistrations(snapshot) {
    const div = document.getElementById('userRegistrations');
    if (!div) return;

    if (snapshot.empty) {
        div.innerHTML = '<p style="text-align:center; color:#666; padding: 10px;">Nenhuma inscrição realizada ainda.</p>';
        return;
    }

    div.innerHTML = snapshot.docs.map(doc => {
        const reg = doc.data();
        // Define a cor do badge com base no status gravado
        const badgeColor = reg.status === 'eligible' ? '#28a745' : '#f39c12';
        const statusText = reg.status === 'eligible' ? 'Elegível' : 'Pendente';

        return `
            <div class="data-item card-anim" style="border-left: 5px solid ${badgeColor};">
                <span><strong>Faculdade:</strong> ${reg.collegeName || 'N/A'}</span>
                <span class="badge" style="background: ${badgeColor}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem;">
                    ${statusText}
                </span>
            </div>
        `;
    }).join('');
}

/**
 * Renderiza o histórico de notas dos testes realizados
 */
function renderTestResults(snapshot) {
    const div = document.getElementById('userTests');
    if (!div) return;

    if (snapshot.empty) {
        div.innerHTML = '<p style="text-align:center; color:#666; padding: 10px;">Você ainda não possui testes registrados.</p>';
        return;
    }

    div.innerHTML = snapshot.docs.map(doc => {
        const data = doc.data();
        // CORREÇÃO: Mapeando 'testScore' e 'appliedAt'
        const score = data.testScore !== undefined ? data.testScore : '0';
        const date = data.appliedAt ? data.appliedAt.toDate().toLocaleDateString('pt-BR') : 'Recente';
        
        return `
            <div class="data-item card-anim">
                <span><strong>Pontuação:</strong> ${score}%</span>
                <span style="color: #888; font-size: 0.85rem;">${date}</span>
            </div>
        `;
    }).join('');
}

/**
 * Gerencia o botão de Logout
 */
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        if (confirm("Deseja realmente sair do portal?")) {
            auth.signOut().then(() => { 
                window.location.href = '../index.html'; 
            }).catch(err => console.error("Erro ao deslogar:", err));
        }
    });
}