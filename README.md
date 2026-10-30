# Dr. Mostafa Atef Abdelwahab — Clinical Portfolio

Bilingual personal dental portfolio adapted from M7-Se7s/dentist-portfolio, with reuse authority confirmed by the user. This version is static HTML so it can run on GitHub Pages without the original owner's Firebase or Cloudinary accounts.

## Pages and features

English/Arabic home, profile, clinical cases, online CV and four case detail pages. Includes case filters and search, side-by-side and slider comparisons, full-screen image viewer, original-image links, printable CV, downloadable CV and certificate.

## Future edits

Edit content/portfolio.json. Put new media in assets/. Copy an existing case object, give it a unique lowercase-hyphenated id, provide English/Arabic text, and set each image view's source dimensions, crop and rotation. Do not add clinical details until supplied by the dentist. Run npm run build and npm run check, then commit and push.

editor.html is a browser-local content preparation tool. It is not a server-backed admin dashboard. It can save a local draft and export portfolio.json. Replace content/portfolio.json in the repository with the export and publish to update the website. New image files must be placed in assets/. Do not enter credentials in the editor.

Node.js 20+ is sufficient; no dependency installation, database or API key is required.

## GitHub Pages

Push to the desired account on main or master. Choose GitHub Actions as the source in the repository's Pages settings. The included workflow builds, verifies and deploys dist/. Relative links support both account-root and repository-project Pages hosting. The new GitHub account must be connected before the assistant can upload anything there.

.openai/hosting.json identifies a separate private review deployment. It does not select or publish to a GitHub account.

## Images

Original clinical files are retained byte-for-byte. SVG viewports crop and rotate the original image pixels for presentation, preserving clinical details. Originals are available on each case page. No generative changes were made to the teeth, restorations, gums or radiographic structures.

- Composite: uploaded left panel is explicitly After and right panel Before. Reordered and rotated upright.
- Scaling: the two unlabelled views are shown as a comparison. The current right/left Before/After ordering needs review by the dentist.
- Endodontics: the supplied lower panel is an instrument-stage radiograph, and the upper panel is the post-treatment view. The first label reads Before - treatment stage, rather than claiming it is an untreated diagnostic image.
- Surgery: one radiograph was supplied; no after image or operative outcome has been invented.
- Duplicate scaling upload excluded.

The portrait was edited with the built-in image tool for a white background, removal of the burgundy graduation stole and noise reduction. Review likeness and expression against the original before final public launch.

## Content

Profile, education, internship dates, languages, contacts and achievements come from the supplied CV. GP Dentist and the four achievement figures were explicitly approved by the user. No patient histories, tooth numbers, methods, materials, dates or license numbers were invented. The certificate documents Udent Endo-Resto Summit 2026, 2-3 April 2026, for 10 CPD credit hours.

The supplied CV PDF remains downloadable unchanged. The online CV presents its professional content. Add further clinical narratives and certificates when available.

## Checks

npm run check verifies built internal links/media, locale direction, case routes, full-image viewer presence, and removal of the original owner's contact and database references.
