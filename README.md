# webservco/sveltekit-sandbox

A SvelteKit sandbox project.

SvelteKit experiments in one app: tutorial exercises, forms, email and password login, translations and a service worker.

- Requires: Node.js, [ddev](https://ddev.com/) for the database
- Includes: SvelteKit 2 with the Node adapter, [Skeleton](https://www.skeleton.dev/) 2 and Tailwind CSS, [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) 1, [Lucia](https://lucia-auth.com/) 2, [Superforms](https://superforms.rocks/) 1 and Zod, mysql2, highlight.js, unplugin-icons
- Related: `webservco/app-skeleton` (a SvelteKit project template with newer Lucia and Superforms versions)

---

## Installation

```shell
git clone git@github.com:webservco/sveltekit-sandbox.git
cd sveltekit-sandbox
npm install
# Start the database.
ddev start
```

Create the tables with the queries in [src/lib/server/storage/database/structure/](src/lib/server/storage/database/structure/).

---

## Usage

```shell
# Start the development server and open it in the browser.
npm run dev -- --open
```

| Page | Purpose |
| --- | --- |
| `/` | Home page. |
| `/about` | A translated message. |
| `/dice` | Fetches a dice roll from the `/dice/roll` endpoint. |
| `/visitCounter` | Counts visits in a cookie. |
| `/notes` | Notes kept in local storage. |
| `/todo` | Todo list kept in memory per visitor cookie. Form actions wait 3 seconds to show the pending state. |
| `/items` | Item list and detail pages from static data. |
| `/user/address` | Superforms form that saves to the `address` table. The name must contain "Test". |
| `/user/auth` | Sign up, log in and log out. |

### Translations

Messages are in `messages/en.json` and `messages/hu.json`. Hungarian is the source language. `/`, `/about`, `/dice` and `/visitCounter` also answer with a language prefix: `/en/about` shows the English text, `/about` the Hungarian one.

---

## Configuration

Keys read from `.env.development`:

```ini
DB_HOST=127.0.0.1
DB_PORT=32811
DB_USER=db
DB_PASSWORD=db
DB_NAME=db
```

---

## Notes

The ddev config no longer sets a fixed database port, so `DB_PORT` is probably out of date. `ddev describe` shows the current one.

The app itself runs on the host with `npm run dev`, and ddev only provides the database. Serving the app through ddev was tried, but form posts failed with "Cross-site POST form submissions are forbidden".

The address form inserts into `db.address`, so the database must be named `db`.

Lucia 2 and Superforms 1 are old major versions. `webservco/app-skeleton` uses Lucia 3 and Superforms 2.

`npm run test` fails because the Playwright test looks for a "Hoard-R" heading.

---

## Development

```shell
# Check code style and types.
npm run lint && npm run check
# Fix code style.
npm run format
# Run unit tests.
npm run test:unit
```

---

## License

[MIT](LICENSE.md)
