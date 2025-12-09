# La Toast Family - Documentation Projet

> Agence de communication spécialisée food & gastronomie - Strasbourg

---

## 📋 Vue d'ensemble

**Type de projet** : Site vitrine agence créative
**Localisation** : Strasbourg, France
**Spécialisation** : Communication food & gastronomie
**Stack actuelle** : Vanilla JavaScript (HTML5, CSS3, JS pur)
**Stack future** : React + Supabase (migration prévue après validation design)

---

## 🎯 Services de l'Agence

1. **Community Management** - Gestion réseaux sociaux food
2. **Photos** - Shooting produits, plats, ambiance restaurant
3. **Vidéos** - Vidéos courtes, storytelling visuel

---

## 🏗️ Architecture du Projet

### État Actuel (Janvier 2025)

**Technologie** : Site statique vanilla JavaScript
- Aucune dépendance npm
- Aucun framework frontend
- Aucun build tool
- Code modulaire avec fichiers CSS/JS séparés par section

### Sections Complètes ✅

1. **Hero Section** (`css/hero.css` + `js/hero.js`)
   - Vidéo plein écran avec marge blanche 12px (effet cadre)
   - Corners arrondis 16px
   - Navigation avec logo Toast-V3.png (100px height)
   - Toggle son avec badge qui suit le curseur (disparaît après 2s, zone d'exclusion près des contrôles)
   - Headline : "Photo & Vidéo / pour restaurants." (Fraunces bold + italic semi-transparent)
   - Contrôles vidéo : play/pause + fullscreen (zone cliquable étendue)
   - Indicateur scroll en bas
   - Animations au load (fadeInDown nav, fadeInUp titre)

2. **Carousel Projets** (`css/styles.css` + `js/main.js`)
   - Fond noir
   - 5 cartes en layout "éventail" (fan)
   - Draggable horizontal avec momentum/velocity
   - Vidéo autoplay sur carte centrale uniquement
   - Curseurs personnalisés (main ouverte/fermée)
   - Éléments déco : doodles fourchette/couteau, blob orange
   - Navigation : dots cliquables
   - Support clavier (flèches gauche/droite)

3. **Services Section** (`css/services.css` + `js/services-carousel.js`)
   - Carousel horizontal avec 3 cards (Community Management, Photos, Vidéos)
   - Navigation par flèches et dots
   - Animations au scroll

4. **Testimonials Section** (`css/testimonials.css` + `js/testimonials.js`)
   - 6 témoignages clients
   - Carousel avec navigation
   - Cards avec avatars et infos client

5. **Team Section** (`css/team.css` + `js/team.js`) ✨ NOUVEAU
   - **Structure Flexbox 2 colonnes** avec gap personnalisable
   - **GROUP LEFT** :
     - 2 photos en diagonale (haute en haut à droite, carrée en bas à gauche)
     - Rotation automatique d'images (3 images par photo) avec fondu de 1s toutes les 3s
     - Images : `morgane.png` + 2 photos du dossier "LA TOAST FAMILY"
     - Images : `antoine.png` + 2 photos du dossier "LA TOAST FAMILY"
     - Sticker "Good Vibes" (orange) centré entre les photos
     - Ligne noeud SVG blanche avec rotation 47deg
   - **GROUP RIGHT** :
     - Forme verte SVG en arrière-plan (blob organique, 80% width)
     - Photo carrée au-dessus (50% width, décalée top: 140px, left: 150px)
     - Sticker poings bleu (21% width) en haut à droite
   - **JavaScript** : Rotation automatique d'images avec décalage de 500ms entre les groupes
   - **Responsive** : Colonnes se transforment en layout vertical sur mobile

6. **Marquee Section** (`css/marquee.css`)
   - 2 bandes diagonales défilantes (vitesse 90s)
   - Textes alternés avec stickers SVG du dossier "Work - Truus"
   - Stickers animés (float + rotation) : 45px desktop, 32px mobile
   - Overlap avec le footer (-100px margin-bottom)

7. **Footer** (`css/footer.css` + `js/footer-physics.js`)
   - Fond noir avec padding top 150px
   - Grid 2 colonnes : CTA email + Navigation
   - Sections : Explorer, Connecter, Legal
   - Année dynamique JavaScript : 2025 (auto-update)
   - Textes traduits en français
   - Status "Nous acceptons de nouveaux clients"
   - **Logos clients draggables** avec physique (gravité, rebonds, lancer)
   - Lien Pixel Drop : https://pixel-drop.com

8. **Flick Section** (`css/flick.css` + `js/flick.js`)
   - Carousel de projets draggable horizontal
   - Cards avec vidéos des vrais projets
   - Curseurs personnalisés (drag)
   - **Preview au hover** : stack d'images qui suit le curseur (nav = en bas, footer = en haut)

9. **Future Section** (`css/future.css`)
   - Titre avec SVG animés (cercle autour de "petits", ligne sous "Strasbourg")
   - Cards photos en layout décalé avec tags flottants
   - Animations hover sur les images

10. **Services Truus** (`css/services-truus.css`)
    - 3 services avec cards interactives
    - Micro-animations hover

11. **Clients Truus** (`css/clients-truus.css`)
    - Logos clients dans le footer (draggables avec physique)

12. **Fullwidth Image** (`css/fullwidth-image.css`)
    - Grande image avec overlay gradient
    - Texte en haut à droite
    - Animation Ken Burns sur l'image

### À faire 🚧

- **Animations scroll bidirectionnelles** : apparaît/disparaît au scroll (Team, Future, etc.)
- **Stickers** : en attente des nouveaux SVG

---

## 🎨 Design System

### Palette de Couleurs

```css
/* Couleurs principales */
--color-orange: #FF6B35;     /* Accent principal (brand Toast Family) */
--color-lime: #CCFF00;        /* Badges son, highlights */
--color-violet: #C9A6FF;      /* Labels, badges secondaires */
--color-blue: #7EB6FF;        /* Smiley déco, accents tertiaires */

/* Fonds */
--color-black: #000;          /* Sections sombres (carousel, services, footer) */
--color-white: #fff;          /* Sections claires (hero marge, about, contact) */
--color-gray-dark: #111;      /* Cards sur fond noir */
--color-gray-light: #F8F8F8;  /* Backgrounds clairs (info cards) */
```

### Typographie

**Font principale** : [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- Import : `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap')`
- Weights disponibles : 400, 500, 600, 700, 800
- Fallback : `-apple-system, sans-serif`

**Usage typographique** :
- Headlines : 700-800, clamp(40px, 6vw, 72px)
- Sous-titres : 600, 24-32px
- Body text : 400-500, 16-18px
- Labels/badges : 600, 13-14px

### Système d'Espacement (8px base)

```css
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 40px;
--spacing-xl: 60px;
--spacing-xxl: 100px;
```

### Border Radius

```css
--radius-sm: 12px;   /* Inputs, petits éléments */
--radius-md: 16px;   /* Badges, buttons */
--radius-lg: 20px;   /* Cards */
--radius-xl: 24px;   /* Images, containers */
```

### Transitions

```css
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.4s cubic-bezier(0.25, 1, 0.5, 1);
```

---

## 📁 Structure des Fichiers

```
/Users/akligoudjil/Projets local/Toast Family React/
├── index.html              # Entry point (une seule page HTML)
├── README.md               # Documentation GitHub (français)
├── claude.md               # Documentation projet (ce fichier)
│
├── css/
│   ├── styles.css          # Styles carousel projets (365 lignes)
│   ├── hero.css            # Styles hero section (334 lignes)
│   ├── about.css           # À créer - Section À propos
│   ├── services.css        # À créer - Section Services
│   ├── contact.css         # À créer - Section Contact
│   └── footer.css          # À créer - Footer
│
├── js/
│   ├── main.js             # Logique carousel (413 lignes)
│   ├── hero.js             # Logique hero (107 lignes)
│   ├── scroll-animations.js # À créer - Intersection Observer global
│   ├── services-cards.js   # À créer - Interactions cards services
│   └── contact-form.js     # À créer - Validation formulaire
│
└── assets/
    ├── cursors/
    │   ├── hand-open.svg   # Curseur hover (50x50px)
    │   └── hand-grab.svg   # Curseur drag (50x50px)
    │
    ├── icons/              # À créer - Icônes services SVG
    ├── team/               # À créer - Photos équipe
    └── decorations/        # À créer - Blobs, doodles SVG
```

---

## 🚀 Fonctionnalités Techniques

### Hero Section

**Technologies** :
- HTML5 `<video>` avec autoplay, loop, muted, playsinline
- API Fullscreen pour bouton fullscreen
- Intersection Observer pour scroll indicator
- Event listeners : click, mousemove, mouseenter, mouseleave

**Interactions** :
- Toggle son : clic sur vidéo ou bouton son
- Bouton son suit curseur, disparaît après 2s inactivité
- Play/pause : bouton contrôle
- Fullscreen : bouton contrôle
- Indicateur scroll : barre horizontale en bas

**Animations CSS** :
- Fade-in headline (opacity + translateY)
- Smiley rotation continue (360deg loop)
- Sparkle pulse (scale)

### Carousel Projets

**Technologies** :
- JavaScript vanilla (pas de library)
- RequestAnimationFrame pour animations fluides
- Touch events pour mobile (touchstart, touchmove, touchend)
- Mouse events pour desktop (mousedown, mousemove, mouseup)
- Keyboard events (ArrowLeft, ArrowRight)

**Physique du carousel** :
- Rotation : état global en degrés
- Velocity : calculée depuis mouvement souris/touch
- Friction : 0.92 (decay naturel)
- Momentum : continue après relâchement

**Layout "fan"** :
```javascript
const rotation = index * ROTATION_PER_CARD; // 72° par carte (360/5)
const fanRotation = rotation * FAN_ROTATION_MULTIPLIER; // 0.12 = léger tilt
const fanTranslate = rotation * FAN_TRANSLATE_MULTIPLIER; // Espacement horizontal
```

**Vidéo conditionnelle** :
- Seule la carte centrale (rotation % 360 proche de 0) a sa vidéo en play
- Les autres vidéos sont en pause
- Changement automatique au rotation

---

## 📐 Patterns de Développement

### Pattern CSS : Titre Mixed (Filled + Outline)

```html
<h1 class="headline-text">
  <span class="filled">on raconte</span><br>
  <span class="outline">vos histoires</span><br>
  <span class="filled underlined">gourmandes</span>
</h1>
```

```css
.filled {
  color: #000; /* ou #fff selon fond */
  -webkit-text-fill-color: #000;
}

.outline {
  color: transparent;
  -webkit-text-stroke: 2px #000;
  -webkit-text-fill-color: transparent;
}

.underlined {
  position: relative;
}

.underlined::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 8px;
  background: url('data:image/svg...'); /* Curve SVG */
}
```

### Pattern JS : Intersection Observer pour Animations

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target); // Trigger une seule fois
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

### Pattern JS : Curseur Personnalisé qui Suit la Souris

```javascript
const cursorElement = document.getElementById('cursor');
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursorElement.style.left = `${cursorX}px`;
  cursorElement.style.top = `${cursorY}px`;
});
```

---

## 🎬 Données Projets (Carousel)

Structure actuelle dans `js/main.js` :

```javascript
const projects = [
  {
    id: 1,
    image: 'https://...', // Placeholder Unsplash
    video: 'https://...', // Placeholder Mixkit
    brand: 'pâtisserie thierry',
    brandColor: '#D4A574',
    brandTextColor: '#000',
    title: 'la douceur',
    subtitle: 'en vidéo',
    category: 'vidéo',
    categoryIcon: '🎬',
    overlayText: ''
  },
  // ... 4 autres projets
];
```

**À faire** : Remplacer par vrais projets clients avec vidéos/photos réelles

---

## 🔄 Plan de Migration React (Futur)

### Phase 1 : Setup React + Vite
- `npm create vite@latest toast-family-react -- --template react`
- Configuration Tailwind ou styled-components (à décider)
- React Router pour navigation (SPA)

### Phase 2 : Composants
```
src/
├── components/
│   ├── Hero.jsx
│   ├── ProjectCarousel.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── hooks/
│   ├── useIntersectionObserver.js
│   ├── useDragCarousel.js
│   └── useVideoAutoplay.js
└── utils/
    └── animations.js
```

### Phase 3 : Supabase Backend
- Tables : `projects`, `clients`, `services`, `contact_submissions`
- Storage : Vidéos, images projets
- RLS (Row Level Security) pour admin
- API : Fetching dynamique des projets

### Phase 4 : Déploiement
- Hébergement : Vercel ou Netlify (recommandé)
- CI/CD : GitHub Actions
- Analytics : Plausible ou Vercel Analytics
- SEO : React Helmet, meta tags dynamiques

---

## ⚙️ Commandes (Futur - Après Migration React)

```bash
# Développement
npm run dev           # Lance dev server (Vite)

# Build production
npm run build         # Compile pour production
npm run preview       # Preview build local

# Déploiement
npm run deploy        # Deploy sur Vercel/Netlify
```

**Actuellement** : Pas de commandes - fichiers HTML/CSS/JS statiques servis directement.

---

## 🌐 Inspiration Design

**Référence principale** : [Truus.nl](https://truus.nl)
- Agence créative néerlandaise
- Vidéo hero plein écran
- Carousel de cartes draggable
- Typographie mixte filled/outline
- Animations subtiles mais impactantes

**Éléments repris** :
- Layout vidéo hero avec cadre blanc
- Carousel fan de cartes interactives
- Mix typographique créatif
- Curseurs personnalisés
- Doodles dessinés à la main (SVG)

---

## 📝 Todo Global

### Design
- [ ] Créer headline SVG créative (smiley intégré dans texte) dans Figma
- [ ] Optimiser curseurs personnalisés (style plus illustré)
- [ ] Définir animations scroll pour nouvelles sections

### Contenu
- [ ] Collecter vidéos food réelles (hero + carousel)
- [ ] Lister vrais projets clients (nom, catégorie, médias)
- [ ] Rédiger textes sections About, Services, Contact
- [ ] Obtenir photo d'équipe fun/décontractée

### Développement
- [ ] Implémenter section About (2-3h)
- [ ] Implémenter section Services (3-4h)
- [ ] Implémenter section Contact + formulaire (3-4h)
- [ ] Implémenter Footer (1-2h)
- [ ] Intégration globale : smooth scroll, responsive, polish (1-2h)

### Backend (Futur)
- [ ] Choisir service formulaire contact (EmailJS, Formspree, custom)
- [ ] Setup Supabase projet
- [ ] Migration React + intégration Supabase

---

## 🐛 Problèmes Connus

**Aucun problème connu actuellement** - Le code Hero + Carousel fonctionne parfaitement.

---

## 📞 Contact Projet

**Client** : La Toast Family
**Localisation** : Strasbourg, France
**Email** : hello@toastfamily.fr (fictif - à valider)
**Instagram** : [@toastfamily](https://instagram.com/toastfamily) (lien à mettre à jour)

---

## 📄 Licence

Projet propriétaire - © 2025 La Toast Family

---

## 🔔 Notifications & Refresh

**IMPORTANT** : Quand tu termines une tâche demandée par l'utilisateur, tu DOIS :

1. **Envoyer une notification push** :
```bash
curl -s -F "token=ay8n6dvpu4bs7bi22neg4arjoy9nt5" -F "user=u3oj144n5yjw4onxw6ray3rcpjd3gc" -F "message=Terminé" -F "sound=light-noting-1" https://api.pushover.net/1/messages.json
```

2. **Ouvrir/Rafraîchir la page dans le navigateur** :
```bash
open "/Users/akli/Projets Reacts/toast-family-website/index.html"
```

Ces deux commandes doivent être exécutées à chaque fin de tâche, sans exception.

---

## 📁 Organisation des Assets

**IMPORTANT** : Quand l'utilisateur ajoute des images/fichiers dans le dossier racine, **avant toute autre action** :

1. **Renommer** les fichiers si nécessaire (noms clairs, sans espaces ni caractères spéciaux)
2. **Ranger** dans le bon dossier selon le type :

```
assets/
├── cursors/      # Curseurs personnalisés SVG
├── icons/        # Icônes UI (audio, etc.)
├── images/
│   └── projects/ # Thumbnails des projets
├── lines/        # Lignes décoratives SVG
├── logo/         # Logo Toast Family
├── shapes/       # Formes décoratives SVG (blobs)
├── stickers/     # Stickers SVG (good-vibes, poings, etc.)
├── team/         # Photos de l'équipe
├── textures/     # Textures (grain, etc.)
└── videos/       # Vidéos (hero, projets)
```

3. **Mettre à jour** les chemins dans le code (HTML, CSS, JS) si les fichiers sont déjà référencés

---

**Dernière mise à jour** : 9 décembre 2025
**Maintenu par** : Claude Code (assistant IA) + Développeur client
