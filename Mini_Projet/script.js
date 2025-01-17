
var admins = [
    { username: 'aya', email: 'aya@gmail.com', password: 'aya' },
    { username: 'admin', email: 'admin@gmail.com', password: 'admin' }
    // Administrateurs préexistants
];

function loginForm(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Afficher un message de temporisation avant de vérifier
    document.getElementById('message').textContent = "Vérification en cours...";

    setTimeout(() => {
        // Vérification des informations d'identification après quelques secondes
        validerUtilisateur(username, email, password)
            .then((message) => {
                // Si connexion réussie
                document.getElementById('message').textContent = message;
                // Réinitialiser le message après 3 secondes
                setTimeout(() => {
                    document.getElementById('message').textContent = '';
                }, 3000);
                // Rediriger vers la page suivante
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                // Si erreur de connexion
                document.getElementById('message').textContent = error;
                setTimeout(() => {
                    document.getElementById('message').textContent = '';
                }, 3000);
            });
    }, 2000); // Délai de 2 secondes avant de vérifier
}

function validerUtilisateur(username, email, password) {
    return new Promise((resolve, reject) => {
        // Recherche de l'utilisateur dans la liste des administrateurs
        const admin = admins.find(admin => admin.username === username && admin.email === email && admin.password === password);
        if (admin) {
            resolve(`Connexion réussie! Bienvenue ${username}`);
        } else {
            reject('Nom d\'utilisateur, adresse email ou mot de passe incorrect.');
        }
    });
}

// Fonction de déconnexion avec confirmation
function logout() {
    // Afficher un message de confirmation avant de rediriger
    const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmLogout) {
        // Si l'utilisateur confirme, rediriger vers la page de connexion
        window.location.href = 'login.html';  // Remplacez par l'URL de votre page de connexion
    } else {
        // Si l'utilisateur annule, ne rien faire
        console.log("Déconnexion annulée.");
    }
}