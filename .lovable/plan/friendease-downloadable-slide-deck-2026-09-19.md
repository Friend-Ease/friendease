# FriendEase downloadable slide deck

## Build
- Add a dedicated `/deck` presentation with seven 16:9 slides covering the problem, product promise, privacy model, preference setup, planning flow, ranked matches, and confirmation.
- Reuse the site’s family and venue imagery, sample data, typography, and blue/green visual system so the deck feels native to FriendEase.
- Add concise slide navigation, progress, keyboard controls, and a clear “Download PDF” action.
- Create a print layout that exports only the slides, one slide per landscape page, without navigation controls.
- Add a “View deck” entry in the site header so the presentation is easy to find.

## Quality checks
- Verify every slide visually at desktop and mobile sizes.
- Test next/previous navigation, keyboard navigation, and the PDF print view.
- Confirm the deck route includes its own title and social metadata.

## Technical details
- Build the presentation as a native React route using existing assets and design components.
- Use browser print-to-PDF for a pixel-faithful downloadable file, with dedicated `@media print` rules.
