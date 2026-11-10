# 🦎 Jurassic Feed

Application de suivi d'animaux, pensée d'abord pour le smartphone : escargots, araignées, serpents, isopodes, mantes, scorpions, phasmes, lézards, amphibiens, mais aussi chiens, chats, oiseaux et rongeurs.

👉 **Utiliser l'application : https://mycslelahein.github.io/jurassic-feed/**

## Fonctions

- **Fiches animaux** : espèce, sexe, naissance, origine, acquisition, photo, habitat, matériel
- **Journal** : repas, eau, mues, poids, taille, nettoyage, santé, reproduction, température et humidité
- **Adaptée à chaque animal** : mue, ponte et éclosion pour les exotiques et les oiseaux ; chaleurs, gestation, mise bas et sevrage pour les mammifères (chiens, chats, rongeurs, lapins…)
- **Fiches d'élevage** conseillées par catégorie, toutes modifiables
- **Suivi vétérinaire** : motif, diagnostic, médicaments, prix, vétérinaire, prochain rendez-vous, et total des frais par animal
- **Rappels** : tous les X jours ou certains jours de la semaine, avec notifications
- **Agenda** des mues, pontes, éclosions, mises bas, rendez-vous et événements planifiés
- **Généalogie** et lignées
- **Courbes et statistiques** : poids, taille, température, humidité, frais vétérinaires
- Thème sombre ou clair

## Installation sur téléphone

Ouvre le lien ci-dessus dans Chrome (Android), puis menu ⋮ → **Installer l'application**. Elle s'ouvre ensuite comme une vraie application, avec son icône, et fonctionne hors connexion.

## Tes données

- Elles sont enregistrées sur ton appareil et fonctionnent sans connexion.
- Avec la connexion Google, elles sont aussi synchronisées automatiquement dans un espace personnel (Firebase) : tu retrouves ton suivi sur tous tes appareils, toujours dans son dernier état.
- Chaque compte ne peut lire que ses propres données.
- Tu peux à tout moment faire une sauvegarde dans un fichier (Réglages → Sauvegarde) et la restaurer ailleurs.

## Notifications

Active-les dans Réglages → Notifications et choisis l'heure du rappel. L'application indique chaque jour les tâches à faire ou en retard.

## Mises à jour

L'application se met à jour toute seule dès que de nouveaux fichiers sont publiés. La version est visible dans Réglages → Application.

## Technique

Une seule page web (HTML, CSS et JavaScript), sans framework, installable (PWA), avec Firebase (connexion Google et Firestore) pour la synchronisation. Pour utiliser ta propre copie, remplace la configuration Firebase dans `index.html`.

## Licence

Projet personnel, tous droits réservés. Contacte le propriétaire du dépôt pour toute réutilisation.
