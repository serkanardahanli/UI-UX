# 🚀 FlowQi Personal Dashboard

Een moderne, responsieve personal dashboard applicatie gebouwd met **React**, **Vite**, en **Tailwind CSS**. Perfect voor team management, project tracking, en persoonlijke productiviteit.

## ✨ Features

### 📊 Personal Dashboard
- **Live status tracking** - Werk status met real-time indicatoren
- **Team overzicht** - Zie wie er beschikbaar is en waar ze aan werken
- **Dagplanning** - Jouw agenda items met prioriteiten en locaties
- **Task management** - Interactieve task lijst met voortgang tracking
- **Mini kalender** - Met evenementen en belangrijke datums
- **Company events** - Team BBQs, meetings, en aankondigingen
- **Verjaardagen tracker** - Vergeet nooit meer een teamgenoot's verjaardag
- **Quick messaging** - Directe communicatie met teamleden
- **Notificaties** - Live updates en alerts

### 📋 Project Overview
- **Project statistieken** - Total projects, active, completed, team members
- **Geavanceerde filtering** - Filter op status, zoek functionaliteit
- **Project cards** - Gedetailleerde project informatie met:
  - Progress bars met real-time percentage
  - Team member avatars
  - Budget tracking (besteed vs. toegewezen)
  - Prioriteit labels (high, medium, low)
  - Status indicators (active, planning, completed)
  - Tags en technologie labels
- **Project details sidebar** - Uitgebreide informatie over geselecteerd project
- **Recent activity feed** - Real-time updates van team activiteiten
- **Quick actions** - Snelle toegang tot belangrijke functies

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Development**: Hot reload, ESLint

## 🚀 Installation & Setup

### Prerequisites
- Node.js (versie 16 of hoger)
- npm of yarn

### Quick Start

```bash
# Clone het project
git clone https://github.com/serkanardahanli/UI-UX.git
cd personal-dashboard

# Installeer dependencies
npm install

# Start development server
npm run dev
```

De applicatie draait nu op `http://localhost:5173`

### Production Build

```bash
# Build voor productie
npm run build

# Preview productie build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.jsx              # Main app component met navigatie
├── ProjectOverview.jsx  # Project management dashboard
├── main.jsx            # React entry point
├── index.css           # Tailwind imports
└── assets/             # Static assets
```

## 🎨 Tailwind Configuration

Het project gebruikt de volgende Tailwind setup:

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🔧 Customization

### Kleuren Theme
Het project gebruikt een **purple-based** kleurschema. Pas dit aan in:
- `bg-purple-600` voor primary buttons
- `text-purple-600` voor accenten
- `border-purple-200` voor borders

### Componenten
Alle componenten zijn modulair opgezet:
- **PersonalDashboard**: Persoonlijke productiviteit focus
- **ProjectOverview**: Team en project management
- **Navigation**: Eenvoudig schakelen tussen views

## 📱 Responsive Design

De dashboard is volledig responsive met:
- **Desktop**: 3-column layout met sidebar details
- **Tablet**: 2-column layout met aangepaste spacing
- **Mobile**: Single column met optimized touch targets

## 🎯 Browser Support

- Chrome (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Edge (laatste 2 versies)

## 🤝 Development

### Code Style
- **ESLint** configuratie voor consistent code
- **Prettier** formatting (optioneel)
- **Components**: Functionele components met hooks

### Git Workflow
```bash
# Feature development
git checkout -b feature/nieuwe-functie
git commit -m "feat: nieuwe functie toegevoegd"
git push origin feature/nieuwe-functie
```

## 📊 Performance

- **Vite** voor snelle development en builds
- **Tree shaking** voor optimale bundle size
- **Code splitting** ready (voor toekomstige uitbreidingen)
- **CSS purging** via Tailwind voor minimale CSS

## 🔮 Toekomstige Features

- [ ] **Dark mode** toggle
- [ ] **Real-time data** integratie
- [ ] **Notification center** met geschiedenis
- [ ] **Calendar integratie** (Google Calendar, Outlook)
- [ ] **Team chat** functionaliteit
- [ ] **Advanced reporting** en analytics
- [ ] **Mobile app** (React Native)
- [ ] **API integratie** voor echte data

## 📄 License

Dit project is gelicenseerd onder de MIT License.

## 🙋‍♂️ Support

Voor vragen of ondersteuning:
- Open een **GitHub issue**
- Contact: [jouw-email@example.com]

---

**Gebouwd met ❤️ door Serkan Ardahanli**

*FlowQi - Making productivity flow naturally*
