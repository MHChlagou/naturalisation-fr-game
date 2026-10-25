# Audit de validation du contenu - Cap Citoyen

Dernière vérification documentaire : 25 octobre 2026  
Statut : **audit initial réalisé ; banque actuelle non validée pour une préparation exhaustive**.

## 1. Sources de référence à utiliser

Les contenus doivent être relus à partir des documents officiels les plus récents, dans cet ordre :

1. **Livret du citoyen - version PDF de juillet 2026**, publié par la Direction générale des étrangers en France (DGEF). C'est le livret courant identifié lors de l'audit. La page officielle a été mise à jour le 16 juillet 2026.  
   Page officielle : https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/livret-du-citoyen.html  
   PDF : https://www.immigration.interieur.gouv.fr/sites/dgef/files/medias/documents/2026-07/LIVRET%20DU%20CITOYEN%202026_0.pdf
2. **Arrêté du 3 juillet 2026 portant approbation du livret du citoyen**, en vigueur depuis le 17 juillet 2026. Il abroge l'arrêté du 4 février 2022 :  
   https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054426889/
3. **Arrêté du 10 octobre 2025 sur le programme et les modalités de l'examen civique** :  
   https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620/
4. **Liste officielle des questions de connaissance - mention naturalisation**, publiée par le ministère le 12 janvier 2026 :  
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

La version initiale contenait **14 questions**, et non 13 (correction d'un décompte précédent) : Principes et valeurs : 4 ; Système institutionnel et politique : 3 ; Droits et devoirs : 3 ; Histoire, géographie et culture : 2 ; Vivre dans la société : 2.

La branche de développement ajoute 26 exercices originaux, pour une banque de **40 questions pédagogiques** réparties selon les allocations de l'examen : 11 / 6 / 11 / 8 / 4. Les 12 mises en situation sont réparties en 6 dans « Principes et valeurs » et 6 dans « Droits et devoirs ». Le code vérifie ces nombres automatiquement.

**Limite importante :** ces 40 questions forment un examen blanc d'entraînement, pas une banque officielle. La liste ministérielle publique fournit les intitulés de questions de connaissance, sans les propositions ni les réponses officielles ; les mises en situation officielles ne sont pas publiées. Les réponses du jeu sont donc des corrigés pédagogiques originaux. Les sources sont liées depuis les corrections, mais la relecture indépendante et le test automatisé en CI doivent encore être confirmés avant de qualifier le contenu de totalement validé.

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

## 5. Règle transitoire : date de dépôt du dossier (point essentiel)

**Ne pas utiliser juillet 2026 comme date de bascule de l'examen civique.** Il faut distinguer la date d'entrée en vigueur de l'examen et celle du nouveau Livret du citoyen.

- Le décret n° 2025-648 du 15 juillet 2025 prévoit que les dispositions relatives à l'examen civique et au niveau de langue pour les demandes de naturalisation/réintégration s'appliquent aux demandes **déposées à compter du 1er janvier 2026** (article 11 et dispositions d'entrée en vigueur).
- En conséquence, pour une demande de naturalisation déposée **avant le 1er janvier 2026**, le jeu doit orienter l'utilisateur vers le parcours historique de préparation à l'entretien d'assimilation et ne pas lui présenter l'examen civique comme une exigence introduite pour les dossiers déposés à partir de 2026. Il faut néanmoins lui conseiller de vérifier les demandes de pièces ou instructions de sa préfecture et les règles applicables à son dossier individuel.
- Pour les demandes déposées **à compter du 1er janvier 2026**, le parcours doit présenter l'examen civique comme exigence applicable, en plus de la préparation à l'entretien d'assimilation lorsque celui-ci est prévu dans la procédure.
- Le nouveau Livret du citoyen approuvé par arrêté du 3 juillet 2026 est en vigueur depuis le 17 juillet 2026. Cette mise à jour du livret **ne remplace pas** la date de bascule du 1er janvier 2026 pour l'examen civique.

Sources primaires :
- Décret n° 2025-648 du 15 juillet 2025, notamment article 11 : https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte
- Procédures d'accès à la nationalité française (DGEF) : https://www.immigration.interieur.gouv.fr/devenir-francais/procedures-dacces-a-nationalite-francaise
- Arrêté du 3 juillet 2026 approuvant le nouveau livret : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054426889/

Ne pas donner de conseil juridique catégorique pour un dossier individuel : afficher la date de dépôt, préciser que le jeu donne une orientation pédagogique et fournir les sources officielles.

## 6. Vérification individuelle des 13 questions de démonstration

Vérification factuelle initiale effectuée le 25 octobre 2026. Cette vérification porte sur la réponse, l'explication et les distracteurs de la petite banque existante ; elle ne transforme pas ces exercices en questions officielles et ne suffit pas à constituer un examen blanc réglementaire complet.

| ID | Sujet | Résultat de vérification | Source de référence |
|---|---|---|---|
| p1 | Devise républicaine | Réponse correcte : « Liberté, Égalité, Fraternité ». Distracteurs non corrects comme devise officielle. | Constitution, art. 2 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| p2 | Laïcité dans les services publics | Réponse correcte sur la liberté de conscience et la neutralité de l'État/service public. Formulation simplifiée : la laïcité n'interdit pas toute expression religieuse à toute personne en toute circonstance. | Constitution, art. 1 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ ; Loi du 9 décembre 1905 : https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006070169/ |
| p3 | Refus de service en raison de la religion | Réponse correcte : égalité de traitement et neutralité de l'agent public. Exercice original, non officiel. | Code général de la fonction publique, art. L121-2 : https://www.legifrance.gouv.fr/codes/id/LEGITEXT000044416551/ |
| p4 | Drapeau national | Réponse correcte : bleu, blanc, rouge. Avec p1 (devise) et p10 (hymne), cela couvre les trois questions symboles/devise attendues dans le référentiel. | Constitution, art. 2 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| i1 | Vote de la loi | Réponse correcte : le Parlement. La formulation de l'explication distingue correctement proposition de loi/projet de loi et vote. | Constitution, art. 24 et 39 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| i2 | Durée du mandat présidentiel | Réponse correcte : cinq ans. | Constitution, art. 6 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| i3 | Inscription électorale | Réponse attendue : la mairie est un interlocuteur local pour l'inscription électorale. Reformulé comme question de connaissance, pas comme mise en situation. | Service-Public - vérifier l'inscription électorale : https://www.service-public.fr/particuliers/vosdroits/N47 |
| d1 | Égalité en droits | Réponse correcte : Déclaration des droits de l'homme et du citoyen de 1789. | DDHC de 1789, notamment art. 1 : https://www.legifrance.gouv.fr/contenu/menu/droit-national-en-vigueur/constitution/declaration-des-droits-de-l-homme-et-du-citoyen-de-1789 |
| d2 | Âge de l'instruction obligatoire | Réponse correcte : trois ans ; l'obligation d'instruction court jusqu'à seize ans. | Code de l'éducation, art. L131-1 : https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006071191/ |
| d3 | Danger immédiat | Réponse correcte comme principe général : alerter les secours appropriés. L'explication cite le 112 ; en France d'autres numéros spécialisés existent aussi. Exercice original, non officiel. | Service-Public - urgences : https://www.service-public.fr/particuliers/actualites/A15841 |
| h1 | Fête nationale | Réponse correcte : 14 juillet. L'explication mentionne les repères historiques associés. | Loi du 6 juillet 1880 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000877021/ |
| h2 | Capitale de la France | Réponse correcte : Paris. Les distracteurs proposés sont incorrects. | DGEF, Livret du citoyen, version juillet 2026 : https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/livret-du-citoyen.html |
| s1 | Déménagement et courrier | Réponse pratique raisonnable, mais ce n'est pas une règle générale d'assimilation et la formulation est plus proche d'un conseil de vie quotidienne. Exercice original, non officiel. | Service-Public - changement d'adresse : https://www.service-public.fr/particuliers/vosdroits/F14128 |
| s2 | Autorité parentale | Réponse générale : l'autorité parentale est en principe exercée par les parents, dans le cadre légal et sous réserve des situations particulières. | Code civil, art. 371-1 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049164413 |

### Questions ajoutées dans la banque de 40

| ID | Sujet / fait vérifié dans le corrigé pédagogique | Source associée |
|---|---|---|
| p5 | Neutralité des agents publics ; pas de prosélytisme envers les usagers. | https://www.legifrance.gouv.fr/codes/id/LEGITEXT000044416551/ |
| p6 | Liberté d'expression dans les limites de la loi. | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| p7 | Liberté de conscience et de religion. | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| p8 | Égalité femmes-hommes et non-discrimination ; qualification dépend des faits. | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| p9 | Critique pacifique du gouvernement protégée dans le cadre de la liberté d'expression. | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| p10 | Hymne national : La Marseillaise. | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| p11 | Principe de laïcité et régime général de la loi de 1905, avec réserve des dispositions particulières. | https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006069165/ |
| i4 | Âge de droit commun pour voter : 18 ans, sous réserve des autres conditions. | https://www.service-public.fr/particuliers/vosdroits/F1939 |
| i5 | Élections municipales : élection des conseillers municipaux. | https://www.service-public.fr/particuliers/vosdroits/N47 |
| i6 | Les citoyens élisent directement les députés du Parlement européen. | https://european-union.europa.eu/institutions-law-budget/institutions-and-bodies/search-all-eu-institutions-and-bodies/european-parliament_fr |
| d4 | Égalité devant la loi, sans distinctions injustifiées. | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| d5 | Respect des lois en vigueur et usage des voies légales de contestation. | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000571356/ |
| d6 | Les impôts contribuent au financement des services publics et dépenses collectives. | https://www.economie.gouv.fr/particuliers/impots |
| d7 | L'origine est un critère protégé contre les discriminations à l'embauche. | https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/ |
| d8 | Instruction obligatoire de 3 à 16 ans, avec modalités légales possibles hors établissement. | https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006071191/ |
| d9 | Une décision administrative peut être contestée par les voies de recours applicables et dans les délais. | https://www.service-public.fr/particuliers/vosdroits/F2474 |
| d10 | Le Défenseur des droits peut informer/orienter une personne estimant avoir subi une discrimination. | https://www.defenseurdesdroits.fr/ |
| d11 | Une contestation fiscale doit suivre la procédure applicable ; elle n'annule pas automatiquement toutes les obligations de paiement. | https://www.impots.gouv.fr/particulier/questions/comment-faire-une-reclamation |
| h3 | 1789 : Révolution française et Déclaration des droits de l'homme et du citoyen. | https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/livret-du-citoyen.html |
| h4 | La Constitution de la Ve République date de 1958. | https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/texte-integral-de-la-constitution-du-4-octobre-1958-en-vigueur |
| h5 | La mer Méditerranée borde le sud-est de la France métropolitaine. | https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/livret-du-citoyen.html |
| h6 | La Guadeloupe est un territoire français d'outre-mer ; les statuts ultramarins diffèrent selon les collectivités. | https://www.vie-publique.fr/fiches/19620-les-collectivites-territoriales |
| h7 | Le Louvre est un musée national majeur et un lieu du patrimoine culturel. | https://www.louvre.fr/decouvrir/le-palais |
| h8 | Le Mont-Saint-Michel est un site patrimonial remarquable en Normandie. | https://www.monuments-nationaux.fr/monuments/mont-saint-michel |
| s3 | La CPAM est un interlocuteur pour de nombreuses démarches d'Assurance maladie du régime général. | https://www.ameli.fr/assure |
| s4 | Le contrat de travail et les règles applicables encadrent la relation salariée. | https://www.service-public.fr/particuliers/vosdroits/N19871 |

**Limite de l'audit :** la banque a fait l'objet d'une première revue éditoriale et les questions sont rattachées à des sources, mais les liens n'ont pas tous été testés automatiquement en direct et aucune double validation indépendante n'a encore été réalisée. Les questions de situation p3, p5-p9 et d3, d7-d11 sont des exercices originaux, jamais présentés comme des questions officielles divulguées.

## 7. Séparation des parcours

Ne pas fusionner deux objectifs pédagogiques différents :

- **Examen civique actuel** : QCM de 40 questions, règles d'examen et programme applicables aux demandes concernées déposées à compter du 1er janvier 2026.
- **Préparation à l'entretien d'assimilation** : réflexion sur le parcours, les motivations, la connaissance de la société française et les principes républicains. Le livret du citoyen sert à préparer l'évaluation de l'assimilation et ne doit pas être traité comme une simple banque de QCM.

Le jeu doit demander la date de dépôt de la demande et orienter vers le parcours adapté sans se substituer à la préfecture.


## 8. Conditions de publication

Ne déclarer la banque « validée » que si :
1. les 40 questions de chaque session sont disponibles et uniques ;
2. les allocations par thème **et sous-thème** sont respectées ;
3. les 40 corrigés ont été vérifiés individuellement ;
4. toutes les sources sont traçables et les droits de réutilisation contrôlés ;
5. les tests automatisés et la relecture éditoriale sont passés ;
6. l'interface distingue les questions de connaissance officielles publiées des mises en situation originales.

Cet audit initial documente les exigences et l'état du prototype ; il ne prétend pas avoir certifié les 13 questions existantes.
