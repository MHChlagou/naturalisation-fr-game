# Rapport d'audit fonctionnel - Cap Citoyen

Date : 25 octobre 2026  
Application : https://mhchlagou.github.io/naturalisation-fr-game/  
Workflow de référence : https://github.com/MHChlagou/naturalisation-fr-game/actions/runs/40233296186  
Commit applicatif testé : `ca3f6964cec35bab01f783239a24d90be8a05ef4`

## Résultat

**14 tests Playwright sur 14 réussis**, exécutés avec Chromium headless contre l'URL réellement publiée sur GitHub Pages. Durée rapportée par Playwright : 29,4 secondes.

Les deux jobs GitHub Actions, validation statique et déploiement GitHub Pages, sont terminés avec succès. Le smoke test HTTP post-déploiement a également réussi.

## Couverture automatisée

1. Accueil, métadonnées principales et navigation entre les vues.
2. Orientation selon la date de dépôt, avant et à partir du 1er janvier 2026.
3. Quiz : choix d'une réponse, correction, favoris, incertitude et progression.
4. Mini-leçons et démarrage de l'entraînement adaptatif.
5. Examen blanc complet de 40 questions et écran de résultats.
6. Simulation d'entretien sur 10 sujets, minuteur, auto-évaluation et rapport détaillé.
7. Export JSON et réinitialisation de la progression.
8. Mise en page à 375 px et absence de débordement horizontal majeur.
9. Conservation de la progression après rechargement.
10. Import d'une sauvegarde valide et rejet d'un fichier invalide.
11. Récupération après un contenu JSON corrompu dans le stockage local.
12. Activation du service worker, puis navigation et démarrage d'un quiz hors ligne après mise en cache.
13. Expiration du chronomètre de l'examen : les questions non répondues comptent comme incorrectes et les résultats s'affichent.
14. Absence de date de dossier : message de validation et aucune navigation prématurée.

Les tests échouent également si une erreur JavaScript non gérée est détectée durant un scénario.

## Correctifs réalisés pendant l'audit

- Le chargement de la progression locale normalise les données et ignore les identifiants de questions ou thèmes inconnus.
- L'import de sauvegarde vérifie le format, la version et la structure des données avant de remplacer la progression.
- Le cache du service worker a été incrémenté de `cap-citoyen-v13` à `cap-citoyen-v14` pour forcer le rafraîchissement des ressources après les correctifs.
- Le test de hors-ligne a confirmé que l'application et un quiz peuvent s'ouvrir après un premier chargement et une mise en cache réussie.

## Ce que ce rapport ne certifie pas

- Il ne s'agit pas d'un test complet sur tous les navigateurs et tous les appareils. Les tests navigateur ont été exécutés sous Chromium ; Safari/iOS, Firefox et des appareils Android physiques restent à tester.
- Le contrôle mobile vérifie un viewport de 375 px, mais ne constitue pas une certification complète de responsive design.
- L'accessibilité n'a pas encore fait l'objet d'un audit complet au clavier et avec lecteurs d'écran.
- Les tests ne prouvent pas l'exactitude éditoriale de chacune des 120 questions. La structure et les allocations sont validées automatiquement, mais la revue factuelle indépendante de tous les corrigés et de toutes les sources reste à terminer. Voir [l'audit du contenu](CONTENT_VALIDATION.md).
- L'installation PWA sur l'écran d'accueil et la mise à jour du cache sur des appareils réels restent à vérifier manuellement.

## Hébergement et confidentialité

Le site public reste exclusivement déployé sur GitHub Pages. Le prototype backend du dépôt n'est ni déployé ni appelé par l'application publique. La progression et les réponses d'entraînement sont stockées localement dans le navigateur ; ce rapport ne vérifie pas les sauvegardes entre appareils.

## Conclusion

Les parcours principaux, les cas limites ajoutés, la persistance, l'import/export et un parcours hors ligne ont réussi dans Chromium sur la version publique testée. La version peut être considérée comme **validée pour ces scénarios automatisés**, mais pas comme certifiée sans défaut ni comme ayant un contenu juridique intégralement relu.
