# Willow Video Widget

A fixed-position video widget for withwillow.ai. A small looping video bubble with a "Meet Willow" chat-message CTA. Clicking opens a fullscreen YouTube lightbox.

## Usage

Paste this into Webflow → Project Settings → Custom Code → Footer Code:

```html
<script src="https://cdn.jsdelivr.net/gh/eyal0s/willow-video-widget@v1.0.0/willow-widget.js" defer></script>
```

For live updates (cached up to 12h):

```html
<script src="https://cdn.jsdelivr.net/gh/eyal0s/willow-video-widget@main/willow-widget.js" defer></script>
```

## Configuration

Edit the `CONFIG` block at the top of `willow-widget.js`:

- `youtubeId` — YouTube video ID for the lightbox
- `bubbleMp4` — looping MP4 URL for the thumbnail bubble
- `ctaText` — chat-message text
- `bubbleSize` / `bubbleSizeMobile` — bubble diameter
- `offsetRight` / `offsetBottom` — position from screen edge

## Releasing a new version

```bash
git commit -am "Update widget"
git tag v1.0.1
git push origin main --tags
```

Then bump the version in the Webflow script tag.
