# ♻️ RecycleHub

## 📌 Contexte du Projet
RecycleHub est une application de gestion du recyclage qui met en relation des particuliers et des collecteurs agréés appartenant à une entreprise souhaitant automatiser ses tâches.

Le projet est développé en **Single Page Application (SPA)** en utilisant **Angular** uniquement pour le front-end.

---

## 🚀 Fonctionnalités

### 1️⃣ Inscription & Connexion
- Inscription pour les particuliers avec :
  - Email et mot de passe
  - Nom et prénom
  - Adresse complète
  - Numéro de téléphone
  - Date de naissance
  - Photo de profil (optionnel)
- **Les collecteurs sont pré-enregistrés manuellement**
- Authentification basique sans distinction de type d'utilisateur
- Possibilité de **modifier ses informations** ou de **supprimer son compte**
- **Aucun administrateur** requis

### 2️⃣ Demande de Collecte
- Un particulier peut soumettre une demande avec :
  - Type de déchet (plastique, verre, papier, métal)
  - Photos des déchets (optionnel)
  - **Poids estimé (minimum 1000g obligatoire)**
  - Adresse de collecte
  - Date et créneau horaire souhaités (09h00 - 18h00)
  - Notes supplémentaires (optionnel)
- Suivi des demandes avec statut :
  - **En attente** (par défaut)
  - **Modifiable/supprimable** tant qu'elle est "En attente"
  - **Limite de 3 demandes simultanées** non validées ou rejetées
  - **Poids total max : 10 kg**

### 3️⃣ Processus de Collecte
- **Collecteur** :
  - Accès aux demandes disponibles dans sa ville
  - Sélectionne une demande "En attente"
  - Met à jour le statut de la collecte :
    - ✅ **En attente**
    - 🔄 **Occupée** (acceptée et en route)
    - 🚛 **En cours** (collecte en place)
    - ✅ **Validée** (collecte réussie)
    - ❌ **Rejetée**
  - Vérification sur place :
    - Type de déchets
    - Pesée et validation du poids réel
    - Prise de photos (optionnel)
    - Validation ou rejet de la transaction

### 4️⃣ Système de Points 🎯
- Attribution automatique après validation :
  - **Plastique** : 2 points/kg
  - **Verre** : 1 point/kg
  - **Papier** : 1 point/kg
  - **Métal** : 5 points/kg
- Conversion des points en bons d'achat :
  - **100 points** → **50 Dh**
  - **200 points** → **120 Dh**
  - **500 points** → **350 Dh**

---

## 🔧 Technologies Utilisées
- **Angular** (Version 19)
- **NgRx** (Gestion d'état)
- **RxJS/Observables**
- **Injection de dépendance**
- **Formulaires** (Reactive Forms ou Template Driven Forms)
- **Bootstrap** ou **Tailwind** (UI Design)
- **Guards, Resolvers** (Sécurisation & Pré-chargement)
- **Data Binding**
- **Services, Pipes, Parent/Child Components, Routing**
- **Persistance des données** (localstorage)
- **Validation des formulaires avec messages d’erreur**
- **Responsive Design** 📱💻

---

## 📜 Instructions d'Installation
```sh
# Cloner le projet
git clone https://github.com/kholoud001/RecycleHub.git

# Installer les dépendances
npm install

# Lancer le projet en développement
ng serve --open
```

---

## 📌 Auteur
🚀 **Kholoud SANAK** - [kholoud001](https://github.com/kholoud001)
