# La Toast Family - Site Web

Site vitrine pour La Toast Family, agence de communication food & gastronomie à Strasbourg.

## Structure du projet

```
toast-family-carousel/
├── index.html              # Page principale (Hero + Carousel)
├── css/
│   ├── styles.css          # Styles généraux + section carousel
│   └── hero.css            # Styles de la hero section
├── js/
│   ├── main.js             # Logique du carrousel
│   └── hero.js             # Logique de la hero (vidéo, son)
├── assets/
│   ├── cursors/            # Icônes de curseur personnalisées
│   │   ├── hand-open.svg
│   │   └── hand-grab.svg
│   └── images/             # Images des projets (à ajouter)
└── README.md
```

## Sections

### 1. Hero Section
- Vidéo plein écran avec marge blanche (cadre)
- Navigation : projets | logo | instagram
- Icône son qui suit le curseur (disparaît après 2s)
- Headline créatif (à personnaliser dans VS Code/Figma)
- Contrôles vidéo : play/pause, fullscreen

### 2. Projects Carousel
- Carrousel de cartes style "éventail"
- Drag pour naviguer
- Vidéo autoplay sur la carte centrale
- Curseur personnalisé

## Personnalisation

### Changer les curseurs
Remplace les fichiers SVG dans `assets/cursors/` par tes propres icônes :
- `hand-open.svg` : curseur au survol
- `hand-grab.svg` : curseur pendant le drag

Tu peux utiliser des PNG aussi, il suffit de changer l'extension dans `index.html`.

### Modifier les projets
Édite le tableau `projects` dans `js/main.js` :

```javascript
{
  id: 1,
  image: 'url-de-l-image.jpg',
  video: 'url-de-la-video.mp4',
  brand: 'nom du client',
  brandColor: '#FF6B35',
  brandTextColor: '#fff',
  title: 'titre principal',
  subtitle: 'sous-titre coloré',
  category: 'vidéo',
  categoryIcon: '🎬',
  overlayText: ''  // Texte affiché sur la carte (optionnel)
}
```

### Ajuster l'éventail
Dans `js/main.js`, modifie ces constantes :

```javascript
const FAN_ROTATION_MULTIPLIER = 0.12;  // Rotation des cartes (plus petit = plus serré)
const FAN_TRANSLATE_MULTIPLIER = 1.0;  // Espacement horizontal
```

### Couleurs
Les couleurs principales sont dans `css/styles.css` :
- `#FF6B35` : Orange accent (La Toast Family)
- `#C9A6FF` : Violet du label "glisser"
- `#000` : Fond noir

## Lancer le projet

Ouvre simplement `index.html` dans ton navigateur, ou utilise un serveur local :

```bash
# Avec Python
python -m http.server 8000

# Avec Node/npx
npx serve

# Avec VS Code
# Installe l'extension "Live Server" et clique sur "Go Live"
```

## À faire

- [ ] Remplacer les images/vidéos par les vrais projets
- [ ] Personnaliser les icônes de curseur
- [ ] Ajouter le vrai logo La Toast Family
- [ ] Ajuster les couleurs selon la charte graphique
