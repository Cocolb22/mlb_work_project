# Initialisation du projet

## Backend

* Ouvrir le dossier backend dans une fenêtre du terminal
* Exécuter la commande `bundle install`
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
