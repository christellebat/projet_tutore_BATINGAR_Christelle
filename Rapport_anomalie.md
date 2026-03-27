# Rapport d’anomalie - Changement de mot de passe

## Informations générales

* Application : OrangeHRM
* Module : Gestion utilisateur
* Fonctionnalité : Changement de mot de passe
* Gravité : CRITIQUE
* Priorité : HAUTE

---

## Description de l’anomalie

Le système permet à l’utilisateur de modifier son mot de passe sans afficher d’erreur, mais le nouveau mot de passe n’est pas pris en compte lors de la reconnexion.

---

## Données utilisées

```json id="g9r4zz"
{
  "username": "Admin",
  "oldPassword": "admin123",
  "newPassword": "humain1234"
}
```

---

## Étapes de reproduction (très détaillées)

1. Accéder à l'application :
   https://opensource-demo.orangehrmlive.com

2. Saisir :

   * Username : Admin
   * Password : admin123

3. Cliquer sur "Login"

4. Une fois connecté :

   * Cliquer sur l’icône utilisateur (en haut à droite)
   * Cliquer sur "Change Password"

---

### Remplir le formulaire :

* Current Password → admin123
* New Password → humain1234
* Confirm Password → humain1234

5. Cliquer sur "Save"

---

##  Résultat observé

* Aucun message d’erreur affiché
* L’utilisateur pense que le mot de passe est modifié
* Déconnexion puis tentative de reconnexion impossible avec le nouveau mot de passe

Message affiché :
"Invalid credentials"

---

## Résultat attendu

Le système doit :

* enregistrer le nouveau mot de passe
* permettre la reconnexion avec celui-ci

---

## Vérification complémentaire

### Test avec nouveau mot de passe

* Username : Admin
* Password : humain1234

Résultat :  Échec

---

### Test avec ancien mot de passe

* Username : Admin
* Password : admin123

Résultat :  Succès

---

##  Analyse

* Le changement semble accepté côté UI
* Le backend ne persiste pas la modification
* Possible problème :

  * base de données non mise à jour
  * API non appelée
  * erreur silencieuse côté serveur

---

## Impact

* Fonction critique non fonctionnelle
* Problème de sécurité utilisateur
* Perte de confiance dans l’application

---

## Recommandations

* Vérifier la persistance en base de données
* Ajouter un message de confirmation réel
* Mettre en place des tests backend
* Ajouter des logs d’erreur

---

## Conclusion

Cette anomalie a été détectée grâce aux tests automatisés et représente un défaut critique du système nécessitant une correction immédiate.
