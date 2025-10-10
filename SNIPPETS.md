Snippets & Includes

Kurzüberblick
- Snippets liegen in `snippets/` (z. B. `snippets/header.html`, `snippets/home-hero.html`).
- Seiten binden Snippets per Platzhalter ein, z. B. `<div data-include="header"></div>`.
- Der Loader `assets/snippets.js` ersetzt Platzhalter automatisch und führt enthaltene Skripte aus.

Benutzung
- Header/Footer einmalig einbinden: `<div data-include="header"></div>` bzw. `<div data-include="footer"></div>`.
- Startseite: Abschnitte sind in einzelne Snippets zerlegt (z. B. `home-hero`, `home-pillars`, `home-cta` …). In `index.html` stehen nur noch Platzhalter.
- Portfolio: `portfolio-hero`, `portfolio-filter`, `portfolio-grid`, `portfolio-cta`.

Anpassen
- Inhalt ändern: Gewünschte Datei in `snippets/` bearbeiten. Alle Seiten, die den Snippet verwenden, aktualisieren sich automatisch beim Laden.
- Neue Snippets: Datei unter `snippets/<name>.html` anlegen und per `<div data-include="<name>"></div>` einbinden.

Templating (optional)
- Einfache Platzhalter werden aus `data-*` Attributen ersetzt. Beispiel: In Snippet `{{title}}` verwenden und im Platzhalter `<div data-include="head" data-title="Meine Seite"></div>` angeben. Aktuell nutzen die Seiten kein Head‑Snippet, Mechanik ist aber vorhanden.

Hinweise
- Inline‑Skripte in Snippets (z. B. Navigation/Portfolio‑Grid) werden vom Loader korrekt ausgeführt.
- Pfade sind relativ zum Projekt‑Root angelegt (z. B. `index.html#leistungen`, `assets/...`).
- Für zusätzliche Seiten einfach `<script src="assets/snippets.js" defer></script>` im `<head>` ergänzen und Header/Footer durch Platzhalter ersetzen.

