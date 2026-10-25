# Audit de validation du contenu — Cap Citoyen

Dernière vérification documentaire : 25 octobre 2026  
Statut : **audit initial réalisé ; banque actuelle non validée pour une préparation exhaustive**.

## 1. Sources de référence à utiliser

Les contenus doivent être relus à partir des documents officiels les plus récents, dans cet ordre :

1. **Livret du citoyen — version PDF de juillet 2026**, publié par la Direction générale des étrangers en France (DGEF). C'est le livret courant identifié lors de l'audit. La page officielle a été mise à jour le 16 juillet 2026.  
   Page officielle : https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/livret-du-citoyen.html  
   PDF : https://www.immigration.interieur.gouv.fr/sites/dgef/files/medias/documents/2026-07/LIVRET%20DU%20CITOYEN%202026_0.pdf
2. **Arrêté du 3 juillet 2026 portant approbation du livret du citoyen**, en vigueur depuis le 17 juillet 2026. Il abroge l'arrêté du 4 février 2022 :  
   https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054426889/
3. **Arrêté du 10 octobre 2025 sur le programme et les modalités de l'examen civique** :  
   https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620/
4. **Liste officielle des questions de connaissance — mention naturalisation**, publiée par le ministère le 12 janvier 2026 :  
   https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/questions-de-connaissance-pour-lexamen-civique-nationalite-francaise.html
5. **Page Service-Public sur l'examen civique pour la naturalisation**, à utiliser pour contrôler les modalités pratiques :  
   https://www.service-public.gouv.fr/particuliers/vosdroits/F39426
6. Pour chaque règle de droit ou fait susceptible d'évoluer, vérifier également le texte de référence en vigueur sur Légifrance ou la page du service public compétent.

## 2. Format à respecter pour l'examen blanc

Le cadre réglementaire consulté prévoit :

- 40 questions à choix multiple, en français ;
- durée maximale de 45 minutes ;
- réussite à partir de 32 bonnes réponses sur 40 (80 %) ;
- une seule bonne réponse par question ; mauvaise réponse ou absence de réponse = 0 point ;
- cinq thèmes, avec cette répartition :
  - Principes et valeurs de la République : 11 ;
  - Système institutionnel et politique : 6 ;
  - Droits et devoirs : 11 ;
  - Histoire, géographie et culture : 8 ;
  - Vivre dans la société française : 4.
- Les questions de connaissance sont publiques. Les mises en situation de l'examen ne sont pas publiées comme une banque de questions officielles : celles proposées dans le jeu doivent être rédigées comme des exercices originaux, clairement signalés comme tels.

La répartition doit aussi respecter les sous-thèmes du référentiel, pas seulement les totaux par thème :
- Principes et valeurs : 3 questions sur devise/symboles, 2 sur la laïcité, 6 mises en situation.
- Système institutionnel : 3 sur démocratie/droit de vote, 2 sur l'organisation de la République, 1 sur les institutions européennes.
- Droits et devoirs : 2 sur les droits fondamentaux, 3 sur les obligations/devoirs des personnes résidant en France, 6 mises en situation.
- Histoire, géographie et culture : 3 sur périodes/personnages, 3 sur territoires/géographie, 2 sur patrimoine.
- Vivre dans la société : 1 question sur installation/résidence, 1 sur accès aux soins, 1 sur travail, 1 sur autorité parentale/système éducatif.

## 3. Résultat de l'audit de la version actuelle

La version examinée contient 13 questions de démonstration :
- Principes et valeurs : 4 ;
- Système institutionnel et politique : 3 ;
- Droits et devoirs : 3 ;
- Histoire, géographie et culture : 2 ;
- Vivre dans la société : 1.

**Conclusion : elle n'est pas suffisante pour valider un examen blanc de 40 questions.** Elle ne respecte pas les allocations réglementaires, et certaines références sont trop générales pour permettre une vérification indépendante (par exemple « référence pédagogique » ou « exercice original » sans référence précise). Le statut « demo » ne constitue pas une validation factuelle.

Les questions existantes ne doivent donc pas être présentées comme une banque officiellement validée. Les explications et réponses correctes doivent être vérifiées individuellement ; il ne suffit pas que le sujet apparaisse dans le livret.

## 4. Checklist obligatoire pour chaque question

Une question ne peut passer au statut `reviewed` qu'après vérification de tous les éléments suivants :

- [ ] Thème et sous-thème conformes au référentiel officiel.
- [ ] Intitulé clair, en français simple, sans ambiguïté.
- [ ] Réponse correcte contrôlée dans une source primaire à jour.
- [ ] Chaque distracteur est faux dans le contexte exact de la question, sans être trompeur.
- [ ] Explication pédagogique exacte et cohérente avec la réponse.
- [ ] « À retenir » court, exact et utile.
- [ ] Source précise, lien direct, éditeur/publicateur et date de vérification.
- [ ] Pour une mise en situation : mention explicite « exercice original, non officiel », scénario réaliste et une seule réponse défendable.
- [ ] Pour une règle datée (mandat, âge, nombre, loi, institution, statistique) : date de référence ou règle de mise à jour documentée.
- [ ] Relecture indépendante de la question et de son corrigé.
- [ ] Vérification de la réutilisation autorisée du texte source avant toute reproduction verbatim.

Champs de suivi recommandés : `status`, `themeId`, `subthemeId`, `kind`, `sourceTitle`, `sourceUrl`, `sourcePublisher`, `verifiedAt`, `reviewedBy`, `reviewNotes`.

Valeurs de statut proposées :
- `draft` : non relue ;
- `needs-review` : source ou corrigé à vérifier ;
- `reviewed` : contenu contrôlé, source traçable et corrigé revu ;
- `retired` : contenu obsolète ou contesté.

## 5. Séparation des parcours

Ne pas fusionner deux objectifs pédagogiques différents :

- **Examen civique actuel** : QCM de 40 questions, règles d'examen et programme applicables depuis le 1er janvier 2026.
- **Préparation à l'entretien d'assimilation / livret du citoyen** : réflexion sur le parcours, les motivations, la connaissance de la société française et les principes républicains. Le livret du citoyen sert à préparer l'évaluation de l'assimilation et ne doit pas être traité comme une simple banque de QCM.

Les conditions applicables peuvent dépendre de la procédure et évoluer. Le jeu doit afficher la date de dernière vérification et renvoyer aux pages officielles.

## 6. Conditions de publication

Ne déclarer la banque « validée » que si :
1. les 40 questions de chaque session sont disponibles et uniques ;
2. les allocations par thème **et sous-thème** sont respectées ;
3. les 40 corrigés ont été vérifiés individuellement ;
4. toutes les sources sont traçables et les droits de réutilisation contrôlés ;
5. les tests automatisés et la relecture éditoriale sont passés ;
6. l'interface distingue les questions de connaissance officielles publiées des mises en situation originales.

Cet audit initial documente les exigences et l'état du prototype ; il ne prétend pas avoir certifié les 13 questions existantes.
