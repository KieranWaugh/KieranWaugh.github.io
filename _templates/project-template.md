---
# ------------------------------------------------------------------
#  NEW PROJECT TEMPLATE
#  Easiest: use Pages CMS → Projects → "Add an entry".
#  To do it by hand instead:
#  1. Copy this file to:  Projects/my-project.md
#     (it will be published as /Projects/my-project.html)
#  2. Put images/videos in a folder such as Projects/My-Project/
#  3. Fill in the fields below and build the page from sections.
#  The page layout, nav bar, footer and "Back to all projects"
#  link are added automatically.
# ------------------------------------------------------------------
title: "Project Title"
short_title: "Short Title"           # used in the browser tab
subtitle: "One-sentence summary shown under the title and on the project card."

# Project listing
listed: true        # show on the All Projects page
featured: false     # also show on the homepage
order: 5            # position in the lists (lower = earlier)

# Page content: a list of sections, shown top to bottom.
sections:
  - type: image
    src: /Projects/My-Project/teaser.png
    alt: Project teaser
    size: full            # full | medium (60% width, centred)

  - type: text            # Markdown
    body: |
      ## Overview: The Problem & Solution

      **The Problem:** ...

      **The Solution:** ...

      ## My Role

      - **Interaction Design:** ...
      - **User Research:** ...

  - type: gallery         # 2–4 images side by side
    images:
      - { src: /Projects/My-Project/image-1.png, alt: Screenshot }
      - { src: /Projects/My-Project/image-2.png, alt: Screenshot }
      - { src: /Projects/My-Project/image-3.png, alt: Screenshot }

  - type: video
    src: /Projects/My-Project/video.mp4

# Publication links at the bottom (optional)
published_in: "the 20XX Conference Name (ABBR 'XX)"
paper: "/Uploads/Papers/Paper file name.pdf"
dataset: "https://zenodo.org/records/0000000"
doi: "10.1145/0000000.0000000"
---
