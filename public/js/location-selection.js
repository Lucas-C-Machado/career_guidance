/**
 * Proteção de Rota e Lógica de Navegação
 */
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'login-student.html';
    }
});

/**
 * Salva a localização e avança
 */
window.confirmarDestino = function(local) {
    localStorage.setItem('selectedLocation', local);
    window.location.href = 'colleges-list.html';
};

/**
 * Lógica do Botão Sair
 */
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        auth.signOut().then(() => {
            localStorage.clear();
            window.location.href = 'login-student.html';
        }).catch(err => {
            console.error("Erro ao sair:", err);
        });
    });
}