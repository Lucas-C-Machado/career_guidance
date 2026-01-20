// Carrega dados persistidos do localStorage
const collegeName = localStorage.getItem('selectedCollegeName') || "Instituição";
const minCgpaRequired = parseFloat(localStorage.getItem('minCgpaRequired')) || 0;
const selectedCollegeId = localStorage.getItem('selectedCollegeId');

// Proteção de Rota e Inicialização de Interface
auth.onAuthStateChanged(user => {
    if (!user) {
        // Redireciona para login se não estiver autenticado
        window.location.href = 'login-student.html';
    } else {
        const titleElement = document.getElementById('collegeName');
        if (titleElement) {
            titleElement.textContent = collegeName;
        }
    }
});

const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const cgpa = parseFloat(registrationForm.cgpa.value);
        const sop = registrationForm.sop.value;
        const user = auth.currentUser;

        // 1. Verificação de Elegibilidade (Regra de Negócio)
        if (cgpa < minCgpaRequired) {
            alert(`Infelizmente você não atende ao critério de CGPA mínimo (${minCgpaRequired}) para esta instituição.`);
            // Logger removido para evitar erro de referência
            console.warn('Elegibilidade negada:', { collegeName, cgpa, minCgpaRequired });
            return;
        }

        if (user) {
            try {
                // 2. Gravação da Inscrição no Firestore
                await db.collection('registrations').add({
                    userId: user.uid,
                    userEmail: user.email,
                    collegeId: selectedCollegeId,
                    collegeName: collegeName,
                    cgpa: cgpa,
                    sop: sop,
                    status: 'eligible',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Logger removido para garantir que o redirecionamento ocorra
                console.log('Inscrição submetida com sucesso para:', collegeName);
                
                // Avança para a próxima etapa: Teste de Aptidão
                window.location.href = 'aptitude-test.html';

            } catch (err) {
                console.error("Erro ao registrar no Firestore:", err);
                alert("Erro ao salvar inscrição. Verifique sua conexão e tente novamente.");
            }
        } else {
            alert("Sessão expirada. Por favor, faça login novamente.");
            window.location.href = 'login-student.html';
        }
    });
}

// Logout
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        // Logger removido para evitar erro ao deslogar
        console.log("Usuário solicitou logout na tela de registro");
        
        auth.signOut().then(() => {
            window.location.href = 'login-student.html';
        }).catch(err => {
            console.error("Erro ao deslogar:", err);
        });
    });
}