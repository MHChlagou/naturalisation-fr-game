# Audit de validation du contenu de Cap Citoyen

Dernière mise à jour : 25 octobre 2026.

## Verdict

**La structure de la banque est contrôlée automatiquement, mais les 120 corrigés ne sont pas tous certifiés par une revue juridique et éditoriale indépendante.** L'application doit rester présentée comme un outil pédagogique indépendant, non officiel.

La validation technique contrôle notamment les identifiants uniques, la présence d'un thème, les choix de réponse, l'index de la bonne réponse, une explication, un élément « À retenir », une provenance, les sous-thèmes et les allocations de l'examen blanc. Ces contrôles garantissent la cohérence des données, pas l'exactitude juridique de chaque phrase.

## Références officielles à privilégier

1. [Liste officielle des questions de connaissance pour la naturalisation](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/questions-de-connaissance-pour-lexamen-civique-nationalite-francaise.html). Le ministère indique que l'examen civique est mis en place à compter du 1er janvier 2026 et publie les intitulés des questions de connaissance. Les mises en situation ne sont pas publiées comme une banque officielle de questions.
2. [Arrêté du 10 octobre 2025 sur le programme et les modalités de l'examen civique](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620/2026-10-06). Le cadre consulté prévoit 40 QCM, 45 minutes maximum et un seuil de réussite de 80 %.
3. [Procédures d'accès à la nationalité française, ministère de l'Intérieur](https://www.immigration.interieur.gouv.fr/devenir-francais/procedures-dacces-a-nationalite-francaise).
4. [Livret du citoyen, version de juillet 2026](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/livret-du-citoyen.html).
5. [Décret n° 2025-648 du 15 juillet 2025](https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte), notamment les dispositions transitoires.

## Résultat de l'audit structurel

- Banque totale : 120 questions pédagogiques originales.
- Plan de l'examen blanc : 40 questions, 20 questions de connaissance de la version initiale et 20 questions supplémentaires, selon le code de composition actuel.
- Répartition officielle par thème : Principes et valeurs 11 ; Système institutionnel et politique 6 ; Droits et devoirs 11 ; Histoire, géographie et culture 8 ; Vivre dans la société française 4.
- Sous-thèmes du plan : contrôlés par `scripts/validate.mjs`.
- Mises en situation : 12 exercices originaux, répartis entre les thèmes Principes et valeurs (6) et Droits et devoirs (6).
- Identifiants et intitulés : unicité contrôlée après normalisation.
- Choix : au moins deux choix non vides, sans doublons normalisés, et index de réponse correct dans les limites du tableau.
- Traçabilité : toutes les questions doivent avoir un lien HTTPS direct dans la question ou dans la table de sources.
- Statut : les questions ajoutées portent actuellement le statut `demo`. Ce statut ne signifie pas qu'elles ont été approuvées par une autorité ou validées individuellement par deux relecteurs.

## Points à ne pas confondre

- La liste officielle publique contient des questions de connaissance, mais pas une banque officielle de réponses à choix multiples. Les choix, corrigés, explications et mises en situation du jeu sont des contenus pédagogiques originaux.
- L'examen officiel mention « naturalisation » est un QCM de 40 questions, avec un seuil de réussite de 32/40 (80 %) et une durée maximale de 45 minutes, selon le texte de référence consulté. La simulation du jeu ne délivre aucune attestation.
- Le 1er janvier 2026 est la date de bascule à expliquer pour les demandes concernées, et non juillet 2026. La publication du nouveau Livret du citoyen en juillet 2026 est une mise à jour distincte.
- Le sélecteur de procédure est une aide d'orientation pédagogique, pas une détermination juridique individuelle. Il faut renvoyer les utilisateurs vers la préfecture ou les informations officielles pour leur dossier particulier.

## État de la revue question par question

Une revue exhaustive doit, pour chaque question, enregistrer :
- thème et sous-thème corrects ;
- réponse attendue vérifiée dans une source primaire ;
- distracteurs faux dans le contexte exact, sans ambiguïté ;
- explication cohérente avec le droit ou le fait à la date de référence ;
- « À retenir » exact et non trompeur ;
- URL directe qui s'ouvre et appuie réellement l'affirmation ;
- date de vérification ;
- seconde relecture indépendante ;
- droits de réutilisation contrôlés si un texte source est repris.

**État actuel : partiellement vérifié.** Les assertions structurelles et la répartition sont automatisées, et les principales références officielles sont documentées. Tous les liens n'ont pas encore fait l'objet d'une vérification automatique en direct et les 120 corrigés n'ont pas tous été soumis à une double relecture indépendante. Ne pas présenter le contenu comme « entièrement validé » avant d'avoir terminé ce travail.

## Références des règles d'examen

Le référentiel de l'arrêté prévoit les allocations suivantes :
- Principes et valeurs : 3 questions sur devise/symboles, 2 sur la laïcité et 6 mises en situation.
- Système institutionnel : 3 sur démocratie/droit de vote, 2 sur l'organisation de la République et 1 sur les institutions européennes.
- Droits et devoirs : 2 sur les droits fondamentaux, 3 sur les obligations/devoirs et 6 mises en situation.
- Histoire, géographie et culture : 3 sur périodes/personnages, 3 sur territoires/géographie et 2 sur patrimoine.
- Vivre dans la société : 1 sur installation/résidence, 1 sur accès aux soins, 1 sur travail et 1 sur autorité parentale/système éducatif.

Ces répartitions sont des contrôles de structure du plan de l'examen blanc, pas la preuve que tous les thèmes sont pédagogiquement exhaustifs.
