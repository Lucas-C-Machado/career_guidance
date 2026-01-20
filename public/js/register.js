/**
 * SIGNUP.JS - Versão Final
 * Responsável por criar novos usuários e seus perfis no banco de dados.
 */

const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Captura de valores dos inputs
        const name = registerForm.name.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;

        // 1. Validação de Cliente (Senhas iguais)
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            // 2. Criação da conta no Firebase Auth (Email/Senha)
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            console.log("Conta criada com sucesso no Auth. Criando perfil no Firestore...");

            // 3. Criação do Perfil no Firestore (Essencial para o Login identificar o cargo)
            // Usamos .doc(user.uid) para que o ID do documento seja o mesmo ID do usuário no Auth
            await db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                role: 'student', // Define como estudante por padrão
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log("Perfil criado no Firestore para:", email);
            
            // 4. Feedback e Redirecionamento
            alert('Cadastro realizado com sucesso! Bem-vindo(a).');
            window.location.href = 'login-student.html';

        } catch (error) {
            console.error("Erro no processo de cadastro:", error.code);
            
            let msg = "Erro ao cadastrar. ";
            
            // Tratamento de erros específicos do Firebase Auth
            if (error.code === 'auth/email-already-in-use') {
                msg += "Este e-mail já está em uso por outra conta.";
            } else if (error.code === 'auth/weak-password') {
                msg += "A senha é muito fraca. Use pelo menos 6 caracteres.";
            } else if (error.code === 'auth/invalid-email') {
                msg += "O formato do e-mail é inválido.";
            } else {
                msg += error.message;
            }
            
            alert(msg);
        }
    });
}