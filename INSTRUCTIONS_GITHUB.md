# Guide pour publier votre code sur GitHub

Ce guide vous aidera à publier votre projet sur votre compte GitHub.

Suivez ces étapes dans l'ordre, en copiant et collant les commandes dans votre terminal.

---

### Étape 1 : Initialiser votre projet avec Git

*Cette étape prépare votre dossier pour le suivi avec Git. Si vous l'avez déjà fait, vous pouvez passer à l'étape 2.*

1.  **Ouvrez un terminal** dans le dossier de votre projet.
2.  **Initialisez Git** :
    ```bash
    git init -b main
    ```
3.  **Ajoutez tous les fichiers** pour qu'ils soient suivis :
    ```bash
    git add .
    ```
4.  **Créez un "commit"** (un instantané de votre projet) :
    ```bash
    git commit -m "Version initiale du projet RicStreaming"
    ```

---

### Étape 2 : Connecter votre projet à votre dépôt GitHub

*Cette étape connecte votre dossier local au dépôt que vous avez créé sur GitHub.com.*

1.  **Récupérez l'URL de votre dépôt GitHub**. Elle ressemble à `https://github.com/VOTRE_NOM/NOM_DU_PROJET.git`.

2.  **Supprimez toute ancienne connexion** pour éviter les erreurs (cette commande est sans danger) :
    ```bash
    git remote remove origin
    ```
    *(Il est normal que cette commande n'affiche rien).*

3.  **Ajoutez la nouvelle connexion** avec votre URL :
    *(Remplacez `[URL_DE_VOTRE_DÉPÔT]` par votre véritable URL GitHub)*.
    ```bash
    git remote add origin [URL_DE_VOTRE_DÉPÔT]
    ```

4.  **Vérifiez que la connexion est correcte** :
    ```bash
    git remote -v
    ```
    *Le terminal devrait afficher votre URL GitHub.*

---

### Étape 3 : Envoyer (push) votre code sur GitHub

*C'est l'étape finale qui envoie vos fichiers sur GitHub.*

1.  **Poussez votre code** vers le dépôt `origin` sur la branche `main` :
    ```bash
    git push -u origin main
    ```

    *Si GitHub vous demande votre nom d'utilisateur et votre mot de passe, utilisez votre nom d'utilisateur et un **Personal Access Token (PAT)** comme mot de passe. Les mots de passe de compte ne sont plus acceptés.*

---

Une fois ces étapes terminées, votre code sera visible sur votre page de dépôt GitHub. Vous avez réussi !
