const seedColleges = [
    { name: 'IIT Delhi', area: 'Engenharia', location: 'Índia', rank: 2, fees: '220,000 INR', minCgpa: 8.5 },
    { name: 'IIT Bombay', area: 'Engenharia', location: 'Índia', rank: 1, fees: '210,000 INR', minCgpa: 9.0 },
    { name: 'BITS Pilani', area: 'Engenharia', location: 'Índia', rank: 5, fees: '450,000 INR', minCgpa: 8.0 },
    { name: 'Stanford University', area: 'Engenharia', location: 'Exterior', rank: 1, fees: '$55,000', minCgpa: 9.5 },
    { name: 'Oxford University', area: 'Engenharia', location: 'Exterior', rank: 3, fees: '£30,000', minCgpa: 9.0 },
    { name: 'IIM Ahmedabad', area: 'Administração', location: 'Índia', rank: 1, fees: '2,300,000 INR', minCgpa: 8.5 },
    { name: 'IIM Bangalore', area: 'Administração', location: 'Índia', rank: 2, fees: '2,100,000 INR', minCgpa: 8.0 },
    { name: 'Harvard Business School', area: 'Administração', location: 'Exterior', rank: 1, fees: '$75,000', minCgpa: 9.0 },
    { name: 'INSEAD', area: 'Administração', location: 'Exterior', rank: 2, fees: '€90,000', minCgpa: 8.5 },
    { name: 'MIT', area: 'Engenharia', location: 'Exterior', rank: 1, fees: '$58,000', minCgpa: 9.6 },
    { name: 'IIT Madras', area: 'Engenharia', location: 'Índia', rank: 3, fees: '200,000 INR', minCgpa: 8.0 },
    { name: 'USP', area: 'Engenharia', location: 'Exterior', rank: 1, fees: 'Gratuito', minCgpa: 8.0 },
    { name: 'Unicamp', area: 'Engenharia', location: 'Exterior', rank: 2, fees: 'Gratuito', minCgpa: 7.5 }
];

async function initializeDatabase() {
    const snapshot = await db.collection('colleges').limit(1).get();
    if (snapshot.empty) {
        console.log('Populando banco de dados com faculdades iniciais...');
        for (const college of seedColleges) {
            await db.collection('colleges').add({
                ...college,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        console.log('Banco de dados populado com sucesso!');
    }
}

initializeDatabase();
