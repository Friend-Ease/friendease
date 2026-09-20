# Working on FriendEase

## Setup

See [Running locally](README.md#running-locally) in the README. Short version: Node 22.12+, then `bun install && bun run dev` (or the npm equivalents). The app runs at http://localhost:8080. No environment variables.

## Where this code comes from

The team builds FriendEase in [Lovable](https://lovable.dev). This repository is an export of that project, so changes made here don't flow back to Lovable on their own. If you change code in one place, carry it to the other deliberately.

## Before you push

```bash
bun run lint
bun run format
```

## Routing

This is a TanStack Start app with file-based routing: every `.tsx` file in `src/routes/` is a route. `src/routes/routeTree.gen.ts` is generated — don't edit it by hand. Conventions are in [`src/routes/README.md`](src/routes/README.md).

## Where things live

- Sample venue data, and the place a real matching engine would go: `src/lib/venues.ts`
- The preference model: `src/routes/preferences.tsx`
- The deck: `src/routes/deck.tsx`, with print styles at the bottom of `src/styles.css`
