# KuhnelAxel_P7_2710202

## Présentation du Projet :

Réalisation d'un réseau social interne pour l'entreprise Groupomania.

Vous pouvez utiliser le site pour partager du contenu entre collègues (Text et images). 

Le frontend a été réalisé avec React.Js et Firebase. 

Le Backend est une Api Node.Js utilisant le package Mysql2 pour communiquer avec une Database MySQL

## Etapes :
1 . Clonez le répertoire : `git clone ..... nomDeVotreDossier`. 

2 . Ouvrez le projet avec un éditeur de code (ex : Visual Studio Code). 

3 . Rendez vous dans les deux sous-dossiers : backend et frontend  `cd backend`  et  `cd frontend`  

4 . Installer le projet en éxecutant `npm install` dans chacun de ces deux dossiers. 

5 . Rendez vous dans le dossier db dans le dossier backend `cd backend/db`. 

6 . Installez Mysql sur votre ordinateur : tuto [ici](https://harshityadav95.medium.com/installing-mysql-in-ubuntu-linux-windows-subsystem-for-linux-from-scratch-d5771a4a2496). 

7 . Toujours dans le dossier db utiliser la commande `mysql -u root -p < create-db.sql` puis insérez votre mot de passe Mysql pour installer la base de donnée. 

8 . A la racine du dossier backend dans le fichier .env modifiez vos variables `DB_USER` ,  `DB_PASS` ,  `SECRET_JWT`.  

9 . Utilisez la commande `npm start` dans les deux dossier backend et frontend. 

10 . Une fenêtre navigateur s'ouvre et vous pouvez tester l'application. 

BONUS . Dans le fichier `frontend/src/components/AccountModule.js` vous pouvez modifiez les données firebase pour utiliser votre propre projet.
