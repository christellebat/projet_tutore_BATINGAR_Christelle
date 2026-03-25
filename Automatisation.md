# Automatisation des tests

##  Objectif

Automatiser les tests critiques de l’application OrangeHRM avec Cypress.

---

##  Stack technique

* Cypress
* JavaScript
* Faker
* Node.js

---

## Structure

```
cypress/
 ├── e2e/
 ├── fixtures/
 ├── support/
```

---

## Lancement

```bash
npx cypress open
```

```bash
npx cypress run
```

---

## Données

```json
{
  "validUser": {
    "username": "Admin",
    "password": "admin123"
  }
}
```

---

##  Exemple test

```js
cy.get('input[name="username"]').type('Admin');
cy.get('input[name="password"]').type('admin123');
cy.get('button[type="submit"]').click();
```

---

## Qualité du code

* Code modulaire
* Réutilisation des sélecteurs
* Bonne lisibilité
* Tests indépendants

---

##  Limites

* Dépendance à l’interface utilisateur
* Sensible aux changements UI
* Temps d’exécution élevé

---

## Améliorations

* CI/CD (GitHub Actions)
* Tests API
* Reporting avancé

---

## Conclusion

L’automatisation permet un gain de temps et une meilleure fiabilité des tests.
