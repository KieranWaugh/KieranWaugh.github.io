# kieranwaugh.com

Personal website, built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.
GitHub builds the site automatically whenever `main` is updated. You don't need a build step.

## Editing in the browser (Pages CMS)

Go to https://app.pagescms.org, sign in with GitHub and open this repository.
Every save is a commit, and GitHub Pages republishes the site a minute or two later.

- **Homepage, Publications, Experience, Education, Site settings:** forms
- **Projects:** every project page. Each page is built from sections (text, image, image grid, video) that you add and drag to reorder
- **Media:** upload project images/videos (`Projects/`), other images (`Uploads/Images`), papers (`Uploads/Papers`) and files such as the CV (`Uploads/Files`)

The CMS is configured in `.pages.yml`. Note: saving a data file from the CMS rewrites it, so comments in that file are removed.

## Where things live

| To change…                                   | Edit                                   |
|----------------------------------------------|----------------------------------------|
| Name, subtitle, email, social links, CV path | `_config.yml`                          |
| Navigation bar items                         | `_config.yml` → `nav`                  |
| About Me, interests, contact intro           | `_data/home.yml`                       |
| Experience / Education timelines             | `_data/experience.yml`, `_data/education.yml` |
| Publications (both pages)                    | `_data/publications.yml`               |
| Project pages                                | `Projects/**/*.md` (settings and `sections` at the top of each file) |
| Header / footer / cite pop-up                | `_includes/`                           |
| Page structure / how sections look           | `_layouts/default.html`, `_layouts/project.html` |
| Styles / scripts                             | `style.css`, `script.js`               |

## Common tasks

**Add a publication:** copy an entry in `_data/publications.yml`, fill it in, and put the PDF in `Uploads/Papers/`.
Set `featured: true` to show it on the homepage too. The publications page groups entries by `year` automatically.

**Add a project:** in Pages CMS use Projects → Add an entry, or by hand follow the steps at the top of `_templates/project-template.md`.
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
