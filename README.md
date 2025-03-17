# Setup

Afin de pouvoir exécuter le projet en local, les outils suivants sont nécessaires : 
- rbenv
- Ruby
- Node.js
- yarn 
- SQlite

Voici un lien pour faire un setup de votre machine suivant votre système d'exploitation (MacOS ou Ubuntu) : https://github.com/lewagon/setup/blob/master/README.fr.md 

## MacOS et Ubuntu
Suivez les instructions des paragraphes : 
- Homebrew (MacOS uniquement)
- rbenv (y compris "Installer des gems") 
- Ruby
- Node.js
- yarn
- SQLite

## Windows
Windows est moins adapté pour effectuer du développement. Sur MacOS et Ubuntu, les gestionnaires de paquets (`Homebrew` pour MacOS, `apt` pour Ubuntu) simplifient grandement l'installation et la maintenance des outils de développement, en évitant les problèmes de dépendances et en automatisant les mises à jour.
Le meilleur équivalent pour Windows (que je n'ai jamais utilisé) est Chocolatey. 

Voici 2 approches possibles pour faire un setup sur Windows : 

### 1. Avec Chocolatey 
Suivez les instructions du fichier `setup_windows.md`

### 2. Avec le Sous-système Windows pour Linux (WSL)
WSL est une fonctionnalité du système d’exploitation Windows qui vous permet d’exécuter un système de fichiers Linux, ainsi que des outils en ligne de commande et des applications gui Linux, directement sur Windows, en même temps que vos applications et votre bureau Windows traditionnels.. Pour en savoir plus sur WSL, consulte cette page : https://learn.microsoft.com/fr-fr/windows/wsl/faq.

Ouvrir ce lien : https://github.com/lewagon/setup/blob/master/windows.fr.md
Suivez les instructions des paragraphes : 
- Sous-système Windows pour Linux (WSL)
- Ubuntu
- Windows Terminal
- Associer ton navigateur par défaut à Ubuntu
- rbenv (y compris "Installer des gems") 
- Ruby
- Node.js
- yarn
- SQLite

## Backend

* Ouvrir le dossier backend dans une fenêtre du terminal
* Exécuter la commande `bundle install`
  * Si vous avez l'erreur `rbenv: version 3.3.4 is not installed`, suivez la partie **rbenv** de cette documentation : https://github.com/lewagon/setup/blob/master/README.fr.md (choisir votre système d'exploitation). Puis faite la commande `rbenv install 3.3.4`
  * Si le bundler n'est pas installé, exécuter la commande `gem install bundler` puis refaite la commande `bundle install`
* Exécuter la commande `rails db:create db:migrate db:seed` (cela créé la base de données en local et l'initialise avec le questionnaire, les questions et les réponses)

## Frontend

* Ouvrir le dossier frontend dans une fenêtre du terminal
* Exécuter les commandes `npm install -g yarn` et `yarn install`

# Lancement des serveurs

## Backend

Ouvrir le dossier backend dans une fenêtre du terminal et exécuter la commande `rails s`

## Frontend

Ouvrir le dossier frontend dans une fenêtre du terminal et exécuter la commande `yarn start`

Vous pouvez accéder à l'application en ouvrant votre navigateur et en allant à l'adresse `http://localhost:3000`

# Réinitialisation de la base de données :

Si vous souhaitez réinitialiser la base de données, par exemple après avoir effectué des tests :
* Ouvrir le dossier backend dans une fenêtre du terminal
* Exécuter la commande `rails db:reset`

ATTENTION : Cette commande supprime la base de données en local et la recrée : toutes les données utilisateur seront perdues !
