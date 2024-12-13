# @tinylight-ui/video

---

## Installation

First, install `@tinylight-ui/media-player`.

```bash
pnpm install @tinylight-ui/media-player
```

Then, import it into your app:

```tsx
import { Video } from "@tinylight-ui/media-player";
```

## Usage

```tsx title="Video.tsx"
import { Video } from '@tinylight-ui/media-player';

export const Video = () => {
    return <Video src="https://www.w3schools.com/html/mov_bbb.mp4" poster="https://placehold.com/1920x1080/png" />
}
```