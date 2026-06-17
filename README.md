# 🚆 Transport App (React Native + Expo)

Application mobile de consultation du réseau de transport en commun en temps réel.

---

## 📱 Fonctionnalités

### 🔐 Authentification
- Inscription / connexion utilisateur
- JWT stocké de manière sécurisée (expo-secure-store)
- Profil utilisateur modifiable

### 🚏 Arrêts
- Géolocalisation utilisateur
- Affichage des arrêts les plus proches
- Détail d’un arrêt :
  - lignes desservies
  - prochains départs
  - statut des véhicules
  - incidents en cours
- Refresh manuel + automatique

### 🧭 Itinéraires
- Recherche de trajet entre deux arrêts
- Affichage des correspondances
- Durée totale, horaires de départ/arrivée
- Détail des étapes (legs)

### 🚍 Véhicules (tracking temps réel)
- Position des véhicules par ligne
- Statut (à l’heure, retardé, supprimé)

---

## 🧱 Stack technique

- React Native (Expo)
- React Navigation (Tabs + Stack)
- Axios (API REST)
- Expo Location
- Expo Secure Store
- React Hook Form

---

## 🔐 Sécurité

- Authentification JWT (expire en 7 jours)
- Token envoyé via header : Authorization: Bearer <token>

---

## 🏗 Architecture

- `/screens` : écrans
- `/services` : appels API
- `/navigation` : navigation
- `/components` : composants UI
- `/hooks` : hooks personnalisés
- `/utils` : fonctions utilitaires

---

## 🚀 Lancement

```bash
npm install
npm start

Allez dans le fichier src/api/clients.ts et modifier la ligne 4 par :
const API_URL = 'http://ADDRESSE_IP_SERVEUR:3000';

---

## 👤 Comptes de test

- alice@mail.com / password123
- bob@mail.com / secret456
