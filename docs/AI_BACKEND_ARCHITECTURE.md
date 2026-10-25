# Cap Citoyen: architecture cible pour le coaching par IA

## Objectif

Ajouter une analyse sémantique facultative des réponses d'entretien, sans exposer de clé fournisseur dans l'application GitHub Pages. Cette architecture est une proposition documentée, pas un backend déjà déployé.

## Architecture

```text
Navigateur (GitHub Pages)
  | HTTPS, réponse envoyée uniquement après action explicite
  v
API FastAPI
  | validation Pydantic, limites de taille, rate limiting
  v
Service de coaching
  | contexte pédagogique contrôlé + critères de feedback
  v
Fournisseur LLM via clé conservée côté serveur
```

Le mode local actuel doit rester utilisable sans compte, sans réseau et sans appel à un modèle. L'IA doit être une option distincte, clairement identifiée.

## API proposée

### `POST /api/v1/interview/feedback`

Exemple de requête:

```json
{
  "topic_id": "motivations",
  "question": "Pourquoi souhaites-tu acquérir la nationalité française ?",
  "answer": "Réponse rédigée par la personne...",
  "language": "fr"
}
```

Réponse structurée attendue:

```json
{
  "summary": "La réponse exprime une motivation, mais peut être précisée.",
  "criteria": [
    {"id": "relevance", "status": "partial", "feedback": "Réponds directement à la question."},
    {"id": "structure", "status": "good", "feedback": "Les idées sont faciles à suivre."},
    {"id": "example", "status": "missing", "feedback": "Ajoute un exemple réel si tu en as un."}
  ],
  "follow_up_question": "Peux-tu préciser ce que cela représente pour toi ?",
  "disclaimer": "Retour pédagogique non officiel. Aucun avis sur l'éligibilité ou l'issue de la demande."
}
```

Les champs de réponse doivent être validés par un modèle Pydantic. Le client ne doit jamais afficher du HTML fourni par le modèle: afficher le texte comme texte, avec échappement.

## Contrôles de sécurité et de confidentialité

- Conserver les clés LLM dans des variables d'environnement ou un gestionnaire de secrets côté serveur, jamais dans le JavaScript, le dépôt ou les réponses API.
- Exiger HTTPS en production et limiter les origines CORS à l'origine publique autorisée.
- Limiter la taille des réponses, le nombre de requêtes par utilisateur et le temps d'exécution; renvoyer des erreurs HTTP documentées.
- Ne pas journaliser le texte des réponses ni les données personnelles dans les logs par défaut. Journaliser seulement les métriques techniques nécessaires.
- Ne pas enregistrer les réponses dans une base par défaut. Si une sauvegarde est ajoutée plus tard, demander un consentement distinct, documenter la durée de conservation et offrir la suppression.
- Ne pas demander de nom complet, adresse, numéro de dossier, données de santé ou autres informations sensibles. Afficher un rappel avant l'envoi de ne pas inclure ces données.
- Traiter les réponses utilisateur comme des données non fiables, jamais comme des instructions système.
- Ne pas demander au modèle de noter les chances d'obtenir la nationalité, de vérifier la sincérité ou de prendre une décision administrative.
- Retourner une erreur de repli permettant de continuer le parcours sans IA si le fournisseur est indisponible.

## Critères de feedback

Le modèle doit donner des suggestions constructives sur:
1. La pertinence par rapport à la question.
2. La clarté et la structure.
3. La présence d'un exemple personnel uniquement lorsque c'est utile.
4. La précision des repères civiques quand la question porte sur un fait vérifiable.
5. Une question de relance, sans présenter une réponse-type comme la seule réponse correcte.

Le modèle doit distinguer les faits vérifiables des motivations personnelles. Il ne doit pas inventer d'expériences à la place de l'utilisateur.

## Déploiement suggéré

- API: FastAPI + Pydantic, conteneur non privilégié, dépendances verrouillées.
- Hébergement: plateforme HTTPS avec secrets serveur, quotas et métriques.
- Observabilité: latence, taux d'erreur, limites atteintes et consommation estimée, sans enregistrer le contenu des réponses.
- Tests: validation de schéma, prompt injection, entrées trop longues, texte vide, indisponibilité du fournisseur, limites de débit et vérification qu'aucun secret n'est exposé dans les fichiers statiques.

## État

- [x] Parcours local avec timer et bilan détaillé.
- [x] Architecture cible documentée.
- [ ] Implémenter l'API FastAPI et ses tests.
- [ ] Choisir l'hébergeur et le fournisseur de modèle.
- [ ] Ajouter l'option IA côté interface après déploiement et tests de confidentialité.
