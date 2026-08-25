# Vidyalaya UI — Design System

**v1.0 · School Management Web App**

A design language for a multi-role school app — students, teachers, parents, and admins share one system, each with their own accent. Grounded in the visual habits of an actual attendance register: rows, roll numbers, present/absent marks.

---

## 1. Foundations — Color

Ink navy carries structure and trust. Marigold is the single warm accent, reserved for highlights and the admin role. Status colors (leaf/signal/marigold) never double as decoration — they always pair with a label or icon, never color alone.

| Token | Hex | Role |
|---|---|---|
| Ink | `#1E2A4A` | Primary — nav, headings, dark surfaces |
| Ink Soft | `#33456F` | Secondary dark accents, links on dark |
| Paper | `#FAFAF8` | App background |
| Paper Dim | `#F0EFEA` | Card fills, subtle sections |
| Line | `#E1DFD6` | Borders, dividers |
| Marigold | `#F5A623` | Accent — highlights, admin role, CTA |
| Marigold Dim | `#FCE6BC` | Pending / warning fill |
| Leaf | `#2F9E5B` | Success / present |
| Leaf Dim | `#DCF2E4` | Success fill |
| Signal | `#D64545` | Error / absent |
| Signal Dim | `#FBDFDF` | Error fill |
| Slate | `#6B7280` | Secondary text |
| Slate Light | `#9AA1AC` | Tertiary text, placeholders (on dark) |

---

## 2. Foundations — Typography

| Role | Family | Notes |
|---|---|---|
| Display / Headings | Space Grotesk (600–700) | Anything a person orients by — names, page titles, nav |
| Body | Inter (400–600) | Reading, forms, descriptions |
| Data / Mono | JetBrains Mono (400–500) | Roll numbers, dates, IDs, percentages, timestamps |

**Scale**

| Style | Size | Family |
|---|---|---|
| Display | 36px / 700 | Space Grotesk |
| Heading | 22px / 600 | Space Grotesk |
| Body | 15px / 400 | Inter |
| Data | 14px / 500 | JetBrains Mono |
| Label / Caption | 11–12px / 500–600, uppercase, tracked | Inter or Mono |

---

## 3. Theming — Role Accents

One system, four roles. The ink navy shell never changes — only the accent dot and highlight color shift, so switching roles feels like changing a name tag, not a different app.

| Role | Accent | Focus |
|---|---|---|
| Student | Leaf `#2F9E5B` | Timetable, homework, attendance, grades |
| Teacher | Marigold `#F5A623` | Mark attendance, grade tests, post notices |
| Parent | Ink Soft `#3C4F7D` | Track one or more children, fees, notices |
| Admin | Signal `#D64545` | Staff, classes, fee structure, announcements |

---

## 4. Components

### Buttons
| Variant | Use |
|---|---|
| Primary (ink fill) | Main action — e.g. "Mark attendance" |
| Marigold fill | Promoted / high-visibility action — e.g. "Send notice" |
| Secondary (paper-dim fill) | Lower-emphasis action — e.g. "Save draft" |
| Ghost (outline) | Tertiary action — e.g. "Cancel" |
| Danger (signal fill) | Destructive action — e.g. "Remove student" |

Radius: `8px`. Font: Inter 600, 14px. Padding: `10px 18px`.

### Status Pills
Mono label + colored dot + tinted background. Never color-only.

- **Present** — Leaf dim bg, leaf dot, dark green text
- **Absent** — Signal dim bg, signal dot, dark red text
- **Pending** — Marigold dim bg, marigold dot, dark amber text

Radius: full (`20px`). Font: JetBrains Mono 500, 11px.

### Form Fields
- Label: Inter 500, 12px, slate
- Input/select: `10px 12px` padding, `8px` radius, `1px solid` line border, paper background
- One field per row, `14px` gap between fields

### Data Table
- Header row: Mono 500, 11px, uppercase, slate, bottom border
- Body rows: Inter 400, 13px, `10px` cell padding, bottom border, no border on last row
- Roll-number cells: Mono, slate

### Dashboard Shell (pattern)
Fixed ink-navy sidebar (220px) + main content area.
- Sidebar: brand mark, nav items (active item gets `rgba(255,255,255,0.08)` fill)
- Main: stat row (3-up grid of number + caption cards) followed by content cards
- Same shell serves every role — only sidebar items and stat labels change per role

### Signature Element — Attendance Register Strip
A grid of small squares (10 columns), one per school day, color-coded:
- Leaf = present
- Signal = absent
- Ink Soft = holiday

This is the one recurring, memorable visual motif — used in the student profile header, class-level attendance views, and reports. It mirrors the physical attendance register every Indian school already uses, just rendered as a UI component.

---

## 5. Usage Notes

- Radius scale: `4px` (chips/tags) · `8px` (buttons/inputs) · `10–12px` (cards) · full (pills)
- Borders: `1px solid var(--line)` (`#E1DFD6`) throughout — no heavier borders
- Status color is always paired with a mono label; never relied on alone (accessibility)
- Mono font is reserved for data, not for general UI text — keeps it feeling like "real numbers," not decoration
- Responsive: sidebar collapses to a bottom tab bar or hamburger below ~768px; stat row drops from 3-up to stacked

---

*Reference implementation: `design-system.html` (same tokens, live components)*