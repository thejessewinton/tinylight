# @tinylight/video

---

## Installation

First, install `@tinylight/video`.

```bash
pnpm install @tinylight/video
```

Then, import it into your app:

```tsx
import { Video } from "@tinylight/video";
```

## Usage

```tsx title="Video.tsx"
import { Video } from '@tinylight/video';

export const Video = () => {
    return <Video src="https://www.w3schools.com/html/mov_bbb.mp4" poster="https://placehold.com/1920x1080/png" />
}
```