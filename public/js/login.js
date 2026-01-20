/**
 * LOGIN.JS - Versão Final
 * Responsável pela autenticação e redirecionamento baseado no cargo (role).
 */

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Captura de valores com segurança
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            // 1. Autenticação no Firebase Auth
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // 2. Busca o perfil no Firestore para identificar se é Aluno ou Admin
            const userDoc = await db.collection('users').doc(user.uid).get();
            
            if (!userDoc.exists) {
                console.warn("Perfil não encontrado no Firestore.");
                // Se o usuário existe no Auth mas não no Firestore, envia para seleção por padrão
                window.location.href = 'career-selection.html';
                return;
            }

            const userData = userDoc.data();
            console.log(`Login bem-sucedido: ${user.email} (Role: ${userData.role})`);

            // 3. Redirecionamento baseado no cargo (Role)
            if (userData.role === 'admin') {
                // Se for administrador, vai para o painel de gerenciamento
                window.location.href = 'admin-dashboard.html';
            } else {
                // Se for estudante, inicia o fluxo de orientação de carreira
                window.location.href = 'career-selection.html';
            }

        } catch (error) {
            // Tratamento de erros de login
            console.error("Erro na autenticação:", error.code, error.message);
            
            let errorMessage = "Falha no login: Verifique suas credenciais.";
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = "Usuário não encontrado.";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Senha incorreta.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Muitas tentativas falhas. Tente novamente mais tarde.";
            }

            alert(errorMessage);
        }
    });
}