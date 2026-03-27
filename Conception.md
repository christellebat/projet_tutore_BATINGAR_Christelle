# Plan de test - OrangeHRM

##  Objectif

Vérifier les fonctionnalités principales de l’application OrangeHRM à travers des tests manuels et automatisés afin d'assurer sa qualité.

---

##  Environnement de test

* URL : https://opensource-demo.orangehrmlive.com
* Navigateur : Chrome
* Outil : Cypress
* OS : Windows

---

## TODO LIST

* [x] Préparer la liste des tests
* [x] Spécifier vos tests
* [x] Préparer vos besoins en terme de données de test
* [x] Comprendre l’environnement de test
* [x] Préparer le socle d'automatisation
* [x] Documenter l'automatisation
* [x] Concevoir les tests automatisés
* [x] Développer les tests
* [ ] Générer une analyse statique
* [x] Exécuter les tests
* [x] Analyser les résultats
* [x] Générer un rapport
* [x] Créer des anomalies

---
## Gestion des tests avec XRAY

Les cas de test ont été structurés pour être intégrés dans XRAY.

Chaque test possède :
- un identifiant unique
- un type (manuel / automatisé)
- des prérequis
- des résultats attendus



## Cas de test

| TEST ID | TEST NAME       | TEST DESCRIPTION / GOALS            | TEST TYPE | TEST TAG | PREREQUISITES    | ASSERTIONS         |
| ------- | --------------- | ----------------------------------- | --------- | -------- | ---------------- | ------------------ |
| TC-01   | Login Admin     | Connexion avec identifiants valides | Positif   | smoke    | Admin existant   | Accès dashboard    |
| TC-02   | Login KO        | Mauvais mot de passe                | Négatif   | auth     | Aucun            | Message erreur     |
| TC-03   | Ajouter employé | Création d’un employé               | Positif   | PIM      | Connecté         | Employé visible    |
| TC-04   | Champ vide      | Ajout sans prénom                   | Négatif   | PIM      | Connecté         | Message "Required" |
| TC-05   | Longueur max    | Nom trop long                       | Négatif   | PIM      | Connecté         | Erreur affichée    |
| TC-06   | Recherche OK    | Recherche employé existant          | Positif   | PIM      | Employé existant | Résultat visible   |
| TC-07   | Recherche KO    | Employé inexistant                  | Négatif   | PIM      | Aucun            | No Records Found   |
| TC-08   | Suppression     | Supprimer employé                   | E2E       | PIM      | Employé existant | Disparition        |
| TC-09   | Change Password | Modifier mot de passe               | E2E       | User     | Connecté         | BUG détecté        |

---

##  Couverture de test

| Fonctionnalité | Couverture |
| -------------- | ---------- |
| Login          | 100%       |
| Employés       | 90%        |
| Mot de passe   | 80%        |

---

##  Priorisation

| Fonctionnalité | Priorité |
| -------------- | -------- |
| Login          | Haute    |
| Employés       | Haute    |
| Mot de passe   | Critique |

---

##  Données de test

```json
{
  "username": "Admin",
  "password": "admin123"
}
```

```json
{
  "firstName": "PAN",
  "lastName": "Jeremie"
}
```

---

##  Risques

* Instabilité de l'application
* Données non persistantes
* Temps de réponse variable

---

## Critères de sortie

* Tous les tests critiques exécutés
* Les anomalies majeures identifiées
* Rapport final rédigé

---

##  Conclusion

Le plan couvre les fonctionnalités principales avec une approche orientée qualité et automatisation.
