const firebaseConfig = {
    apiKey: "AIzaSyBNq3pP1NHyhd1PfBTKmEFscM3q5ztJyfI", // Pegue no Console do Firebase
    authDomain: "career-guidance-d552b.firebaseapp.com",
    projectId: "career-guidance-d552b",
    storageBucket: "career-guidance-d552b.appspot.com",
    messagingSenderId: "360341764653", // Exemplo, pegue o seu real
    appId: "1:360341764653:web:abcdef12345" // Exemplo, pegue o seu real
};

// Inicializa o Firebase apenas se ainda não foi inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Apenas altere as linhas finais para garantir o escopo global
window.auth = firebase.auth();
window.db = firebase.firestore();

console.log("Conectado ao projeto: career-guidance-d552b");