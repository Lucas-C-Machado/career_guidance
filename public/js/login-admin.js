/**
 * Lógica de Login Administrativo
 */
const loginForm = document.getElementById('loginAdminForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Captura direta pelos IDs para evitar erros de referência
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = loginForm.querySelector('button[type="submit"]');

        btn.innerText = "VERIFICANDO...";
        btn.disabled = true;

        // 1. Autenticação via Firebase Auth
        // Usando firebase.auth() caso a variável 'auth' não esteja global
        const authInstance = typeof auth !== 'undefined' ? auth : firebase.auth();
        const dbInstance = typeof db !== 'undefined' ? db : firebase.firestore();

        authInstance.signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // 2. Verificação de Perfil no Firestore
                const userDoc = await dbInstance.collection('users').doc(user.uid).get();
                const userData = userDoc.data();
                
                if (userData && userData.role === 'admin') {
                    console.log('Login administrativo confirmado:', user.email);
                    window.location.href = 'admin-dashboard.html';
                } else {
                    alert('Acesso negado. Este portal é exclusivo para administradores.');
                    authInstance.signOut();
                    btn.innerText = "ENTRAR NO PAINEL";
                    btn.disabled = false;
                }
            })
            .catch((error) => {
                console.error("Erro de Login:", error);
                alert('Credenciais inválidas ou erro de conexão.');
                btn.innerText = "ENTRAR NO PAINEL";
                btn.disabled = false;
            });
    });
}