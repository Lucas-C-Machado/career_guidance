// js/login-student.js

// Alterado para 'loginStudentForm' para coincidir com o ID do seu HTML
document.getElementById('loginStudentForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const btn = document.querySelector('button[type="submit"]');

    // Feedback visual para o usuário
    btn.innerText = "VERIFICANDO...";
    btn.disabled = true;

    try {
        // Certifique-se de que 'auth' está definido no seu firebase-config.js
        // Se estiver usando firebase.auth(), troque para: await firebase.auth().signInWithEmailAndPassword(email, password);
        await firebase.auth().signInWithEmailAndPassword(email, password);
        
        console.log("Login bem-sucedido! Redirecionando...");
        
        // Redireciona para a página de seleção de carreira
        window.location.href = 'career-selection.html';
        
    } catch (error) {
        console.error("Erro detalhado:", error.code, error.message);
        
        // Tratamento de erros comuns
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            alert("E-mail ou senha incorretos.");
        } else if (error.code === 'auth/network-request-failed') {
            alert("Erro de conexão. Verifique sua internet.");
        } else {
            alert("Erro no login: " + error.message);
        }

        // Restaura o botão em caso de erro
        btn.innerText = "ENTRAR NO PORTAL";
        btn.disabled = false;
    }
});