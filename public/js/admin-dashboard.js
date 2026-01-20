// js/admin-dashboard.js

const db = firebase.firestore();
const auth = firebase.auth();

// Função para carregar as faculdades na tabela
function loadColleges() {
    const tableBody = document.getElementById('collegeTableBody');
    
    db.collection('colleges').orderBy('name').onSnapshot((snapshot) => {
        tableBody.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const row = `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.area}</td>
                    <td>${data.location}</td>
                    <td style="text-align: center;">
                        <button class="btn-danger" onclick="deleteCollege('${doc.id}')">Remover</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    });
}

// Lógica para Adicionar Faculdade
document.getElementById('addCollegeForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const collegeData = {
        name: document.getElementById('name').value,
        area: document.getElementById('area').value,
        location: document.getElementById('location').value,
        rank: parseInt(document.getElementById('rank').value),
        fees: document.getElementById('fees').value,
        minCgpa: parseFloat(document.getElementById('minCgpa').value),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        await db.collection('colleges').add(collegeData);
        alert('Faculdade adicionada com sucesso!');
        document.getElementById('addCollegeForm').reset();
        // Logger removido daqui para evitar o erro "Logger is not defined"
        console.log('Sucesso: Faculdade adicionada'); 
    } catch (error) {
        console.error("Erro ao adicionar:", error);
        alert('Erro ao adicionar faculdade.');
    }
});

// Lógica para Remover Faculdade
window.deleteCollege = async (id) => {
    if (confirm('Tem certeza que deseja remover esta instituição?')) {
        try {
            await db.collection('colleges').doc(id).delete();
            // Logger removido daqui para evitar o erro ao excluir
            console.log('Sucesso: Faculdade removida');
        } catch (error) {
            console.error("Erro ao remover:", error);
            alert('Erro ao remover faculdade.');
        }
    }
};

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = '../index.html';
    });
});

// Inicialização
loadColleges();