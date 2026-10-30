# Update the portfolio

## Change your profile, contacts, experience or figures

1. Open this repository on GitHub.
2. Open `content/portfolio.json` and choose the pencil (Edit) button.
3. Edit the appropriate English (`en`) and Arabic (`ar`) values. Keep quotation marks, commas and braces intact.
4. Choose **Commit changes** and commit to the default branch.
5. Open the **Actions** tab. When **Publish portfolio** finishes successfully, refresh the website.

For an assisted edit, open `editor.html` on the website. Update the JSON, click **Validate & export content**, then upload the exported `portfolio.json` into the repository's `content` folder, replacing the existing file. Local drafts and exported files do not change the live website until committed.

## Replace the portrait or CV

Upload a replacement to `assets/` using GitHub's **Add file → Upload files**. Either keep the current name (`mostafa-portrait.png` or `mostafa-cv.pdf`), or change the top-level `portrait` or `cv` filename in `content/portfolio.json`. Commit the update.

## Add a new case

1. Prepare the case photographs. Use filenames without spaces, such as `case-05-before.jpg` and `case-05-after.jpg`.
2. Upload them to `assets/` and commit.
3. Copy one complete object from the `cases` array in `content/portfolio.json`. A new item must be separated from its neighbour by a comma.
4. Give the case a unique `id`, for example `posterior-composite-05`.
5. Add the English and Arabic `title` and `description`.
6. Choose a current category: `composite`, `prevention`, `endodontics`, or `surgery`.
7. Set `original` to a case photo filename. For each `views` entry, set `source`, the original image's pixel `width` and `height`, `crop`, and `rotation`.
8. For an uncropped image, use `crop: [0, 0, width, height]` and `rotation: 0`. For example, a 1200 × 900 photo uses `[0, 0, 1200, 900]`. Each before/after photo can have its own filename and dimensions.
9. Use two views for a before/after comparison, or one view for a single radiograph. Keep the correct stage labels in both languages.
10. Validate the JSON through the editor, export it, upload it into `content/portfolio.json`, and commit.

The build creates the English and Arabic detail pages and adds the case to the homepage, gallery and filters automatically. Do not invent clinical histories or outcomes, and use images cleared for publication.

## Add a certificate

Upload the certificate PDF and a preview image to `assets/`. Copy a `certificates` entry and update the title, date, hours, venue, `file` and `image`. Commit the JSON and files.

## If a deployment fails

Open **Actions → Publish portfolio → failed run** and inspect the build/check step. The existing published site remains available if a newer build fails. A missing comma, misspelled filename or out-of-bounds crop is a common cause. Correct it and commit again. To undo a change, restore the previous content through GitHub's file history and commit the restoration.

## Hosting configuration

For a root address `https://USERNAME.github.io/`, the repository must be named `USERNAME.github.io`, where USERNAME is the actual owning GitHub account. Choose **Settings → Pages → Source → GitHub Actions**. A differently named repository is normally published at `https://USERNAME.github.io/REPOSITORY/`. Do not overwrite an existing account website without first deciding whether to replace it or use a project repository.

The `.openai` directory belongs to the separate private review deployment and is unnecessary in a standalone GitHub export. No database keys, access tokens or passwords belong in the GitHub repository or content editor.
