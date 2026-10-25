# Déploiement GitHub Pages et vérifications de fonctionnement

## Décision d'hébergement

Cap Citoyen est une application statique publiée exclusivement sur GitHub Pages. Aucun serveur applicatif externe n'est nécessaire au fonctionnement actuel. Les questions, les parcours d'entraînement, la simulation d'entretien, la progression et les préférences restent gérés dans le navigateur.

Le répertoire `backend/` contient uniquement un prototype d'API non déployé. Il n'est pas appelé par la version publique. Ne pas configurer de clé API dans le frontend et ne pas ajouter de déploiement backend sans décision explicite.

- Application publique : https://mhchlagou.github.io/naturalisation-fr-game/
- Workflow Pages : [`.github/workflows/pages.yml`](../.github/workflows/pages.yml)
- Historique CI/CD : https://github.com/MHChlagou/naturalisation-fr-game/actions

## Comment le workflow fonctionne

Le site est une application HTML/CSS/JavaScript sans étape de compilation ni bundler. Le workflow vérifie les fichiers sources, puis publie les fichiers statiques du dépôt. Le terme « build » désigne donc ici la validation et la préparation du contenu statique, pas la génération d'un bundle.

1. **Déclenchement** : à chaque push sur `main`, à la demande manuelle, et à chaque pull request vers `main`.
2. **Validation** : installe Node.js 22, vérifie la syntaxe de `app.js` et lance `node scripts/validate.mjs`.
3. **Contrôles statiques** : la validation vérifie la structure HTML attendue, les fonctionnalités principales, les données des questions, les métadonnées de sources, les répartitions du plan d'examen, les ressources PWA et l'unicité des questions.
4. **Publication** : pour un push ou un lancement manuel réussi, configure GitHub Pages, charge le contenu statique et déploie avec `actions/deploy-pages`. Le job de déploiement ne s'exécute pas pour les pull requests.
5. **Smoke test après déploiement** : interroge l'URL publiée, vérifie que la page d'accueil contient les éléments essentiels et que les fichiers critiques répondent correctement. Ce test vérifie l'accessibilité HTTP et la présence des ressources, pas le rendu réel dans un navigateur.

Le déploiement dépend du succès du job de validation. Si une validation échoue, la nouvelle version n'est pas publiée.

## Vérifier une publication

1. Ouvrir [les exécutions GitHub Actions](https://github.com/MHChlagou/naturalisation-fr-game/actions).
2. Choisir la dernière exécution **Validate and deploy Cap Citoyen** associée au commit voulu.
3. Vérifier que **Validate static app** et **Deploy to GitHub Pages** sont au vert.
4. Vérifier que l'étape **Smoke test published site** réussit.
5. Ouvrir l'URL publiée en navigation privée ou après un rechargement forcé pour limiter l'effet du cache navigateur/service worker.

L'étape smoke test doit contrôler :
- réponse HTTP réussie de la page d'accueil ;
- présence du titre Cap Citoyen et des références aux styles, au script et au manifeste ;
- accessibilité des ressources essentielles : `app.js`, `styles.css`, `manifest.webmanifest`, `sw.js`, `questions-bank.js`, `questions-extra.js` et l'illustration SVG ;
- validité JSON du manifeste.

## Limites de vérification

Les contrôles automatisés détectent les erreurs de syntaxe, de structure, de données et de publication les plus évidentes. Le smoke test ne simule pas un utilisateur et ne prouve pas à lui seul que chaque interaction fonctionne sur tous les appareils.

Une vérification fonctionnelle manuelle reste nécessaire avant une version importante :
- accueil et navigation entre les vues ;
- entraînement, explications et navigation entre questions ;
- examen blanc, compte à rebours, score et résultats ;
- entraînement adaptatif, favoris, révisions et progression ;
- simulation d'entretien, minuteur de 15 minutes et rapport détaillé ;
- export/import/réinitialisation des données locales ;
- affichage mobile et clavier ;
- installation PWA et utilisation hors ligne après un premier chargement.

Les données enregistrées dans `localStorage` sont propres au navigateur et à l'appareil. Ne pas saisir de données personnelles sensibles dans les réponses libres.

## État de vérification initial

Le 25 octobre 2026, l'exécution GitHub Actions [40228138550](https://github.com/MHChlagou/naturalisation-fr-game/actions/runs/40228138550) a réussi sur le commit `a2fe53e03b14c5bd9346d9ca39077288542cd3db`. Les jobs **Validate static app** et **Deploy to GitHub Pages** ainsi que toutes leurs étapes ont terminé avec succès.

À cette date, cela confirme que les sources ont passé les contrôles configurés et que GitHub a terminé le déploiement de ce commit. Cela ne constitue pas une validation navigateur complète de l'application publique. L'environnement d'exécution utilisé pour cette vérification n'a pas pu joindre directement le domaine public ; le smoke test automatisé ajouté au workflow permettra de vérifier l'accès HTTP depuis le runner GitHub à chaque publication.
