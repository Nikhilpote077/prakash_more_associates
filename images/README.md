# Image Guide — Prakash More & Associates

Every image in this site lives in a clearly named folder so you (or anyone helping you)
can replace placeholders without touching any code. **Just replace the file — keep the
exact same filename and folder location — and the site updates automatically.**

Placeholder images are dark, gold-bordered graphics with a text label describing exactly
what photo belongs there and the recommended size. Replace them with real photography at
the same (or larger) resolution, same filename, same format (.jpg).

## Folder map

```
images/
├── branding/              Logo & favicon set — do not rename these files
│   ├── logo.svg / logo.jpeg
│   ├── favicon.svg, favicon.ico
│   └── favicon-*.png, apple-touch-icon.png, android-chrome-*.png
│
├── team/
│   └── principal-prakash-more.jeg   → Replace with a real portrait of Prakash More
│
├── hero/                  Full-width banner images, one per page
│   ├── home-hero-n.jpg       Wide shot for the homepage hero (1920x1080+)
│   ├── about-hero.jpg      About page banner (1920x700)
│   ├── portfolio-hero.jpg  Portfolio page banner (1920x700)
│   └── contact-hero.jpg    Contact page banner (1920x500)
│
├── services/               One image per service card (800x600, shown at ~1200x900)
│   ├── vastu-planning.jpg
│   ├── elevation-design.jpg
│   ├── home-interior.jpg
│   ├── modular-kitchen.jpg
│   ├── living-room.jpg
│   └── bedroom-design.jpg
│
├── projects/               One subfolder per portfolio project.
│   │                       Add/remove numbered files as needed — the gallery
│   │                       on portfolio.html reads directly from these folders.
│   ├── villa-minimalia/
│   │   ├── 01-exterior.jpg       (this is used as the cover/thumbnail image)
│   │   ├── 02-living-room.jpg
│   │   └── 03-facade-detail.jpg
│   ├── grand-living-suite/
│   ├── coastal-haven-villa/
│   ├── serene-bedroom-retreat/
│   ├── modern-modular-kitchen/
│   └── panjim-office-interior/
│
└── og/
    └── social-share.jpg   Image shown when the site is shared on WhatsApp/
                            Facebook/LinkedIn/Twitter (1200x630, required)
```

## Adding a brand-new project to the portfolio

1. Create a new folder: `images/projects/your-project-slug/`
2. Add your photos as `01-xxx.jpg`, `02-xxx.jpg`, etc. (the `01-` image becomes the cover)
3. Add a matching entry in `portfolio.html` (a short project-card block — copy an
   existing one and update the title, category, location, and image paths)

## Notes

- Keep all images in `.jpg` or `.webp` format for best performance.
- Recommended real-photo sizes are printed on each placeholder image itself.
- Don't delete a placeholder before you have its replacement ready — the site will
  show a broken image otherwise.
