#  Exécution des tests

##  Objectif

Présenter les résultats des tests automatisés.

---

## Lancement des tests

```shell
npx cypress run
```

---

## Résultats

*  Tests réussis : 9
*  Tests échoués : 1

---

##  Détail des résultats

| Test                    |Résultat |
| ----------------------- | ------- |
| Login valide            |  OK     |
| Login invalide          |  OK     |
| Ajout employé           |  OK     |
| Champs vides            |  OK     |
| Nom trop long           |  OK     |
| Recherche               |  OK     |
| Recherche inexistante   |  OK     |
| Suppression             |  OK     |
| Logout                  |  OK     |
| Changement mot de passe |  KO     |

---

## Anomalie détectée

### Changement de mot de passe

* Le mot de passe est modifié
* Impossible de se reconnecter avec le nouveau
* L’ancien mot de passe ne fonctionne plus

 Impact critique

---


---

## Analyse

* Application globalement fonctionnelle
* Présence d’un bug critique

---

## Conclusion

Les tests automatisés ont permis :

* De valider les fonctionnalités principales
* De détecter une anomalie importante

---

## Références

* Conception.md
* Automatisation.md
* Rapport_anomalie.md
