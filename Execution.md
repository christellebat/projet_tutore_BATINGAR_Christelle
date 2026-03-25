#  Rapport d'exécution

##  Résumé

| Test            | Résultat|
| --------------- | ------- |
| Login           |  OK     |
| Logout          |  OK     |
| Ajout employé   |  OK     |
| Recherche       |  OK     |
| Suppression     |  OK     |
| Change Password |  KO     |

---

## Analyse

* 5 tests réussis
* 1 test en échec

Taux de réussite : **83%**

---

#  Anomalie : Changement de mot de passe

## Données utilisées

```json
{
  "username": "Admin",
  "oldPassword": "admin123",
  "newPassword": "humain1234"
}
```

---

## Étapes détaillées (reproductibles)

1. Accéder à l’application

2. Se connecter :

   * Username : Admin
   * Password : admin123

3. Aller dans "Change Password"

4. Remplir :

   * Current : admin123
   * New : humain1234
   * Confirm : humain1234

5. Cliquer sur Save

---

## Résultat obtenu

Impossible de se reconnecter avec :

* Admin / humain1234

Message :
"Invalid credentials"

---

##  Test avec ancien mot de passe

Connexion réussie avec :

* Admin / admin123

---

## Résultat attendu

Le nouveau mot de passe doit être pris en compte.

---

##  Résultat réel

Le mot de passe n’est pas sauvegardé.

---

##  Gravité

CRITIQUE

---

##  Recommandations

* Corriger la sauvegarde du mot de passe
* Ajouter des tests backend
* Vérifier la base de données

---

## Conclusion

Les tests automatisés ont permis d’identifier une anomalie critique impactant la sécurité utilisateur.
