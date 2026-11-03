# Art masters

Full-resolution originals. **Not served** — they are excluded from Vercel
deployments via `.vercelignore`.

The web-sized derivatives in `public/assets` are generated from these. The
hero still, for example:

```sh
for w in 960 1440 1920 2560; do
  magick design-assets/hero-fusional.png -resize ${w}x -strip -quality 72 \
    -define webp:method=6 public/assets/hero-still-${w}.webp
  magick design-assets/hero-fusional.png -resize ${w}x -strip PNG24:/tmp/h.png
  avifenc -q 52 -s 6 /tmp/h.png public/assets/hero-still-${w}.avif
done
magick design-assets/hero-fusional.png -resize 1440x -strip -quality 74 \
  -sampling-factor 4:2:0 -interlace Plane public/assets/hero-still-1440.jpg
```

`public/assets` is cached for a day with a week of stale-while-revalidate
(see `next.config.ts`), so **give a changed image a new filename.**
