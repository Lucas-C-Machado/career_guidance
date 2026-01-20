auth.onAuthStateChanged(user => {
    if (!user) window.location.href = 'login-student.html';
});

window.selectCareer = function(career) {
    // Salva exatamente o valor que está no seu Firestore (ex: "Administração")
    localStorage.setItem('selectedCareer', career);
    
    // Redireciona para a página de escolha entre Índia e Exterior
    window.location.href = 'location-selection.html';
};