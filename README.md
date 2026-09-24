# kieranwaugh.com

Personal website, built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.
GitHub builds the site automatically whenever `main` is updated. You don't need a build step.

## Where things live

| To change…                                   | Edit                                   |
|----------------------------------------------|----------------------------------------|
| Name, subtitle, email, social links, CV path | `_config.yml`                          |
| Navigation bar items                         | `_config.yml` → `nav`                  |
| About Me paragraph                           | `index.html`                           |
| Interests                                    | `_data/interests.yml`                  |
| Experience / Education timelines             | `_data/experience.yml`, `_data/education.yml` |
| Publications (both pages)                    | `_data/publications.yml`               |
| Project pages                                | `Projects/<Name>/…` (front matter at the top of each file) |
| Header / footer / cite pop-up                | `_includes/`                           |
| Page structure                               | `_layouts/default.html`, `_layouts/project.html` |
| Styles / scripts                             | `style.css`, `script.js`               |

## Common tasks

**Add a publication:** copy an entry in `_data/publications.yml`, fill it in, and put the PDF in `Uploads/Papers/`.
Set `featured: true` to show it on the homepage too. The publications page groups entries by `year` automatically.

**Add a project:** follow the steps at the top of `_templates/project-template.md`.
Set `featured: true` to show it on the homepage, and use `order` to position it.

**Update the CV:** replace `Uploads/Files/Kieran_Waugh_CV.pdf` (same file name).

## Preview locally

One-time setup (macOS):

GitHub Pages builds with Ruby 3.3, so install that version (the newest Ruby, 4.x, is too new for the Jekyll version GitHub Pages uses):

```bash
brew install ruby@3.3
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
ruby -v            # should say 3.3.x
gem install bundler
bundle install
```

Then, each time:

```bash
bundle exec jekyll serve --livereload
```

Open http://localhost:4000. Pages refresh on save. Restart the server after editing `_config.yml`.
