# Personal Developer Portfolio

A modern, responsive, and interactive personal developer portfolio created with **HTML5**, **CSS3**, and **vanilla JavaScript**.

---

## 🌟 Key Features

1. **Top-Left 3-Lines Navigation Menu**:
   - Animated 3-line hamburger icon on the top-left corner that morphs into a close icon (`✕`).
   - Slide-out glassmorphic side drawer with links to all required sections:
     - **Projects**
     - **Education**
     - **Achievements**
     - **Skills**
     - **Contact**
   - Active scroll indicator (`IntersectionObserver`) highlighting the current section as you browse.
   - Accessible navigation with keyboard navigation (`Esc` to close) and backdrop blur overlay.

2. **Interactive Hero Image & Name by its Side**:
   - **Interactive 3D Tilt Card**: Moves and rotates dynamically with mouse movement with dynamic glare reflection and click feedback.
   - **Scalable Vector Avatar**: Crisp custom SVG avatar with glowing gradient borders and floating tech status badges.
   - **Hero Details Beside the Image**:
     - Prominent name display (**Ayaz**) with gradient styling.
     - Animated typewriter subtitle cycling across roles.
     - Quick action buttons (*Explore Projects*, *Contact Me*, *View Skills*).
     - Live metrics counter and direct social links.

3. **Skills Section**:
   - Grouped into *Frontend Development*, *Backend & APIs*, and *Tools & Architecture*.
   - Includes modern technology badges and animated skill proficiency bars.

4. **Projects Showcase**:
   - Responsive cards with mini browser window illustrations, metadata, tech pills, and action links for *Live Preview* and *Code*.

5. **Education Timeline**:
   - Vertical timeline layout with milestone dots, dates, degree descriptions, and academic highlights.

6. **Achievements**:
   - Milestone cards featuring awards, hackathon victories, open-source milestones, and leadership recognition with vibrant trophy badges.

7. **Interactive Contact Section**:
   - Direct contact info cards (Email, Location, Work Status).
   - Interactive form with real-time field validation, animated submit state, and confirmation feedback.

---

## 📁 File Structure

```text
portfolio/
├── portfolio.html # Semantic HTML5 markup for all sections
├── style.css      # Modern dark-theme CSS with custom properties & responsive queries
├── script.js      # Interactive 3D tilt, hamburger drawer, typewriter & form handling
└── README.md      # Documentation & quick start guide
```

---

## 🚀 How to Run

Simply open [`portfolio.html`](file:///Users/ayaz/portfolio/portfolio.html) in any modern web browser:

- **macOS Finder**: Double-click `portfolio.html` or run:
  ```bash
  open portfolio.html
  ```
- **Local HTTP Server (Optional)**:
  ```bash
  python3 -m http.server 8000
  ```
  Then visit `http://localhost:8000/portfolio.html` in your browser.

---

## 🎨 Customization

- **Name & Titles**: Edit the name in `portfolio.html` within `<h1 class="hero-title">` and the typewriter roles array inside `script.js`.
- **Contact Details**: Update the email `ayaz@example.com` and social links in `portfolio.html`.
- **Colors & Accents**: Modify the CSS variables at the top of [`style.css`](file:///Users/ayaz/portfolio/style.css) (e.g. `--accent-primary`, `--accent-secondary`, `--bg-primary`).

