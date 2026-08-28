"""
Generates on-brand placeholder JPGs for every image slot in the site.
Each placeholder is clearly labeled with what real photo should replace it
and the recommended dimensions, so swapping later is unambiguous.

Run: python3 _tools/gen_placeholders.py
"""
from PIL import Image, ImageDraw, ImageFont
import os

BG = (15, 17, 21)          # --bg-primary
BORDER = (197, 168, 128)   # --accent-gold
TEXT = (243, 244, 246)     # --text-primary
SUBTEXT = (156, 163, 175)  # --text-secondary

SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def make_placeholder(path, width, height, title, subtitle, dims_label):
    img = Image.new("RGB", (width, height), BG)
    draw = ImageDraw.Draw(img)

    # Gold border frame
    border_w = max(2, width // 250)
    inset = border_w * 4
    draw.rectangle(
        [inset, inset, width - inset, height - inset],
        outline=BORDER, width=border_w
    )

    # Diagonal corner accents (subtle architectural motif)
    corner = min(width, height) // 12
    for cx, cy, dx, dy in [(inset, inset, 1, 1), (width-inset, inset, -1, 1),
                            (inset, height-inset, 1, -1), (width-inset, height-inset, -1, -1)]:
        draw.line([(cx, cy), (cx + dx*corner, cy)], fill=BORDER, width=border_w)
        draw.line([(cx, cy), (cx, cy + dy*corner)], fill=BORDER, width=border_w)

    # Title
    title_size = max(18, width // 22)
    font_title = ImageFont.truetype(SERIF_BOLD, title_size)
    bbox = draw.textbbox((0, 0), title, font=font_title)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    draw.text(((width-tw)/2, height/2 - th - 14), title, fill=TEXT, font=font_title)

    # Subtitle
    sub_size = max(12, width // 42)
    font_sub = ImageFont.truetype(SANS, sub_size)
    bbox2 = draw.textbbox((0, 0), subtitle, font=font_sub)
    sw, sh = bbox2[2]-bbox2[0], bbox2[3]-bbox2[1]
    draw.text(((width-sw)/2, height/2 + 6), subtitle, fill=SUBTEXT, font=font_sub)

    # Dimension label
    dim_size = max(11, width // 55)
    font_dim = ImageFont.truetype(SANS, dim_size)
    bbox3 = draw.textbbox((0, 0), dims_label, font=font_dim)
    dw, dh = bbox3[2]-bbox3[0], bbox3[3]-bbox3[1]
    draw.text(((width-dw)/2, height - inset - dh - 24), dims_label, fill=BORDER, font=font_dim)

    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "JPEG", quality=87)
    print("wrote", path)


# ---- Services (800x600, 4:3) ----
services = [
    ("vastu-planning", "Vastu Planning — 2D & 3D", "Floor plan / 3D layout photo"),
    ("elevation-design", "Elevation Design", "Building exterior / facade photo"),
    ("home-interior", "Complete Home Interior", "Full interior space photo"),
    ("modular-kitchen", "Modular Kitchen Design", "Kitchen installation photo"),
    ("living-room", "Living Room Design", "Living room photo"),
    ("bedroom-design", "Bedroom Design", "Bedroom interior photo"),
]
for slug, title, sub in services:
    make_placeholder(f"images/services/{slug}.jpg", 800, 600, title, sub, "Recommended: 1200x900px, JPG/WebP")

# ---- Projects (1200x900, 4:3) — hero + gallery shots per project ----
projects = {
    "villa-minimalia": [
        ("01-exterior", "Villa Minimalia", "Exterior — replace with hero shot"),
        ("02-living-room", "Villa Minimalia", "Living room"),
        ("03-facade-detail", "Villa Minimalia", "Facade detail"),
    ],
    "grand-living-suite": [
        ("01-living-area", "The Grand Living Suite", "Living area — hero shot"),
        ("02-dining", "The Grand Living Suite", "Dining space"),
        ("03-lighting-detail", "The Grand Living Suite", "Lighting detail"),
    ],
    "coastal-haven-villa": [
        ("01-exterior", "Coastal Haven Villa", "Exterior — hero shot"),
        ("02-courtyard", "Coastal Haven Villa", "Courtyard / open space"),
        ("03-interior", "Coastal Haven Villa", "Interior view"),
    ],
    "serene-bedroom-retreat": [
        ("01-bedroom", "Serene Bedroom Retreat", "Bedroom — hero shot"),
        ("02-wardrobe", "Serene Bedroom Retreat", "Wardrobe / storage detail"),
    ],
    "modern-modular-kitchen": [
        ("01-kitchen", "Modern Modular Kitchen", "Kitchen — hero shot"),
        ("02-detail", "Modern Modular Kitchen", "Hardware / finish detail"),
    ],
    "panjim-office-interior": [
        ("01-workspace", "Panjim Office Interior", "Workspace — hero shot"),
        ("02-reception", "Panjim Office Interior", "Reception / lobby"),
    ],
}
for folder, shots in projects.items():
    for slug, title, sub in shots:
        make_placeholder(f"images/projects/{folder}/{slug}.jpg", 1200, 900, title, sub,
                          "Recommended: 1600x1200px, JPG/WebP")

# ---- Open Graph share image (1200x630) ----
make_placeholder("images/og/social-share.jpg", 1200, 630,
                  "Prakash More & Associates",
                  "Architecture & Interior Design — North Goa",
                  "Recommended: 1200x630px, JPG")

print("All placeholders generated.")
