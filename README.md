# 🍯 حلويات أم نور — Halawyat Om Nour

Application React standalone pour vendre des douceurs marocaines authentiques.

---
## Vecel link : https://halawyat-om-nour-project.vercel.app/

## 🚀 Démarrage rapide

```bash
cd halawyat-om-nour
npm install
npm start
```

Ouvre **http://localhost:3000**

## 🏗️ Build production

```bash
npm run build
```

---

## 📱 Fonctionnalités

### Vitrine (Page publique — tout en arabe)
- Interface 100% arabe, direction RTL
- Hero animé avec bouton WhatsApp direct
- Barre de confiance (livraison, qualité, WhatsApp)
- Section produits vedettes ⭐
- Filtre par catégorie + recherche
- Chaque carte produit a un bouton **"اطلبي الآن"** qui ouvre WhatsApp avec un message pré-rempli
- Design féminin rose-doré
- 100% responsive mobile

### Admin Dashboard (`/admin`)
- Login sécurisé par mot de passe (`/admin/login`)
- Stats : total produits, valeur stock, alertes stock faible
- Tableau complet avec image, nom, catégorie, prix, stock, badge, vedette
- **Ajouter** produit — formulaire complet avec upload image
- **Modifier** produit — tous les champs
- **Supprimer** avec confirmation
- **Toggle vedette** ⭐ — met en avant sur la vitrine
- **Reset** aux produits démo
- Persistance via `localStorage`

---

## 🔐 Accès Admin

URL : `http://localhost:3000/admin/login`  
Mot de passe par défaut : **`omnour2024`**

> Pour changer le mot de passe : ouvrez `src/utils/data.js` et modifiez `ADMIN_PASSWORD`

---

## 📞 WhatsApp

Le numéro WhatsApp est configuré dans `src/utils/data.js` :
```js
export const WHATSAPP_NUMBER = '212613205033';
```

---

## 📁 Structure du projet

```
halawyat-om-nour/
├── public/
│   └── index.html          (HTML arabe, RTL)
├── src/
│   ├── App.js              (Router + Toaster)
│   ├── index.js / index.css
│   ├── context/
│   │   ├── ProductContext.js  (État global + localStorage)
│   │   └── AuthContext.js     (Login admin)
│   ├── utils/
│   │   └── data.js            (Produits + config WhatsApp + mdp)
│   ├── components/
│   │   ├── Layout.jsx/.css    (Navbar + Footer arabes)
│   │   ├── ProductCard.jsx/.css (Carte avec bouton WhatsApp)
│   │   ├── ProductModal.jsx/.css (Formulaire CRUD)
│   │   └── ConfirmDialog.jsx/.css
│   └── pages/
│       ├── ShopPage.jsx/.css      (Vitrine publique)
│       ├── AdminLoginPage.jsx/.css (Page de connexion)
│       └── AdminPage.jsx/.css     (Dashboard admin)
└── package.json
```

---

## 🎨 Design

- **Police** : Tajawal + Lateef (arabes, Google Fonts)
- **Couleurs** : Rose `#C8507A`, Or `#D4973A`, Crème `#FDF8F2`
- **Direction** : RTL (droite à gauche) partout
- **Mobile first** : responsive sur tous les écrans

---

*صُنع بحب لحلويات أم نور 🍯*
