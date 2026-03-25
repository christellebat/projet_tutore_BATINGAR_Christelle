# Projet Tutoré - Automatisation OrangeHRM

## Contexte

Ce projet a été réalisé dans le cadre d’un projet tutoré avec une dominante automatisation.

L’objectif est de tester l’application OrangeHRM en combinant :

* conception de tests
* automatisation avec Cypress
* analyse des résultats

---

## Objectifs

* Vérifier les fonctionnalités principales
* Automatiser les parcours critiques
* Identifier les anomalies
* Produire des livrables QA professionnels

---

## Stack technique

* Cypress
* JavaScript
* Faker (données dynamiques)
* Markdown

---

## Structure du projet

```
cypress/
 ├── e2e/
 │   ├── employee.cy.js
 │   ├── searchEmployee.cy.js
 │   ├── deleteEmployee.cy.js
 │   ├── changePassword.cy.js
 │   └── logout.cy.js
 ├── fixtures/
 │   └── users.json
 └── support/
     ├── commands.js
     └── e2e.js
```

---

## Lancer les tests

### Mode interactif

```bash
npx cypress open
```

### Mode headless

```bash
npx cypress run
```

---

## Fonctionnalités testées

* Authentification (Login / Logout)
* Gestion des employés :

  * Ajout
  * Recherche
  * Suppression
* Changement de mot de passe

---

## Types de tests

* Tests positifs
* Tests négatifs
* Scénarios End-to-End (E2E)

---

## Anomalie détectée

### Changement de mot de passe

Le système accepte la modification mais ne sauvegarde pas le nouveau mot de passe.

➡️ Voir `Execution.md` pour le détail.

---

## 📊 Résultats

| Test            | Résultat |
| --------------- | -------- |
| Login           | OK       |
| Logout          | OK       |
| Ajout employé   | OK       |
| Recherche       | OK       |
| Suppression     | OK       |
| Change Password | KO       |

---

## Améliorations possibles

* Intégration CI/CD (GitHub Actions)
* Tests API
* Tests cross-browser
* Reporting avancé

---

## Auteur

Projet réalisé par : BATINGAR Christelle
