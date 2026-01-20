// Recupera o ID da faculdade selecionada no localStorage
const collegeId = localStorage.getItem('selectedCollegeId');

// Proteção Imediata: Se não houver ID (ex: acesso direto pela URL), volta para a lista
if (!collegeId) {
    window.location.href = 'college-list.html';
}

// Controle de Autenticação do Firebase
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'login-student.html';
    } else {
        loadDetails();
    }
});

/**
 * Carrega os detalhes da faculdade do Firestore
 */
async function loadDetails() {
    const container = document.getElementById('collegeDetails');
    
    // Verificação de segurança para o container
    if (!container) return;

    try {
        const doc = await db.collection('colleges').doc(collegeId).get();
        
        if (doc.exists) {
            const college = doc.data();
            
            // Substituído Logger.log por console.log para evitar erros de referência
            console.log("Visualizando faculdade:", college.name);

            // Preenchimento dinâmico do HTML com os dados do Firebase
            container.innerHTML = `
                <div class="college-header">
                    <h2>${college.name}</h2>
                </div>
                <div class="details-grid">
                    <div class="details-column">
                        <p><strong>Área:</strong> ${college.area}</p>
                        <p><strong>Localização:</strong> ${college.location}</p>
                        <p><strong>Classificação Mundial:</strong> #${college.rank || 'N/A'}</p>
                    </div>
                    <div class="details-column">
                        <p><strong>Mensalidade Estimada:</strong> ${college.fees || 'Consultar'}</p>
                        <p><strong>CGPA Mínimo:</strong> ${college.minCgpa || 'N/A'}</p>
                        <p><strong>Instalações:</strong> ${college.facilities || 'Moradia, Suporte, Bolsas'}</p>
                    </div>
                </div>
                <div class="action-area" style="margin-top: 30px; text-align: center;">
                    <button class="btn btn-primary" onclick="proceedToRegistration()">
                        Iniciar Processo de Inscrição
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="error-msg">
                    <p>Faculdade não encontrada em nossa base de dados.</p>
                    <a href="college-list.html" class="btn">Voltar para a Lista</a>
                </div>`;
        }
    } catch (error) {
        console.error("Erro ao carregar detalhes do Firestore:", error);
        container.innerHTML = "<p>Erro ao conectar com o servidor. Tente novamente mais tarde.</p>";
    }
}

/**
 * Função global para navegação para a próxima etapa
 */
window.proceedToRegistration = function() {
    // Logger removido para garantir que o redirecionamento funcione
    console.log("Redirecionando para registro: ", collegeId);
    window.location.href = 'college-registration.html';
}

// Evento de Logout
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        // Logger removido aqui também
        auth.signOut().then(() => {
            window.location.href = 'login-student.html';
        }).catch(err => {
            console.error("Erro ao deslogar:", err);
        });
    });
}