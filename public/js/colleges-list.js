// Verificação de Autenticação
auth.onAuthStateChanged(user => {
    if (!user) window.location.href = 'login-student.html';
});

/**
 * Nova função que inicia o processo de inscrição
 * Em vez de gravar no banco, ela salva os dados temporariamente e leva ao teste
 */
function startEnrollmentProcess(collegeName, collegeLocation, minCgpa) {
    // 1. Salva os dados da faculdade escolhida para serem usados após o teste
    localStorage.setItem('tempCollegeName', collegeName);
    localStorage.setItem('tempCollegeLocation', collegeLocation);
    localStorage.setItem('tempMinCgpa', minCgpa);

    // 2. Redireciona para a página de teste/aptidão
    // Com base na sua lista de arquivos, o nome é aptitude-test.html
    window.location.href = 'aptitude-test.html';
}

async function loadColleges() {
    const selectedArea = localStorage.getItem('selectedCareer');
    const selectedLocation = localStorage.getItem('selectedLocation');

    const displayCareer = document.getElementById('displayCareer');
    const displayLocation = document.getElementById('displayLocation');
    
    if (displayCareer) displayCareer.innerText = selectedArea || "Não selecionado";
    if (displayLocation) displayLocation.innerText = selectedLocation || "Não selecionado";

    const container = document.getElementById('collegeContainer');

    if (!selectedArea || !selectedLocation) {
        container.innerHTML = "<p style='text-align:center;'>Por favor, selecione a área e o local primeiro.</p>";
        return;
    }

    try {
        const snapshot = await db.collection('colleges')
            .where("area", "==", selectedArea)
            .where("location", "==", selectedLocation)
            .get();

        container.innerHTML = ''; 

        if (snapshot.empty) {
            container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Nenhuma faculdade encontrada para ${selectedArea} em ${selectedLocation}.</p>`;
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement('div');
            card.className = "college-card";
            card.style = "background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-top: 5px solid #003366; display: flex; flex-direction: column; justify-content: space-between;";
            
            // Note que agora passamos o data.minCgpa para a função
            card.innerHTML = `
                <div>
                    <h3 style="color: #003366; margin-top: 0;">${data.name}</h3>
                    <p><strong>Local:</strong> ${data.location}</p>
                    <p><strong>Mensalidade:</strong> ${data.fees}</p>
                    <p><strong>CGPA Mínimo:</strong> ${data.minCgpa || 'N/A'}</p>
                    <p><strong>Rank:</strong> #${data.rank || 'N/A'}</p>
                </div>
                <button onclick="startEnrollmentProcess('${data.name}', '${data.location}', '${data.minCgpa || 0}')" 
                        style="width: 100%; background: #003366; color: white; border: none; padding: 12px; border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 15px;">
                    INICIAR AVALIAÇÃO
                </button>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar faculdades:", error);
        container.innerHTML = "<p>Erro ao conectar com o banco de dados.</p>";
    }
}

// Lógica de Logout
document.getElementById('btnLogout')?.addEventListener('click', () => {
    auth.signOut().then(() => {
        localStorage.clear();
        window.location.href = 'login-student.html';
    });
});

// Torna a função global
window.startEnrollmentProcess = startEnrollmentProcess;

window.onload = loadColleges;