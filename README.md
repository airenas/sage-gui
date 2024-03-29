[![Node.js CI](https://github.com/airenas/sage-gui/actions/workflows/node.js.yml/badge.svg)](https://github.com/airenas/sage-gui/actions/workflows/node.js.yml) [![Snyk vulnerabilities Tests](https://github.com/airenas/sage-gui/actions/workflows/snyk.yml/badge.svg)](https://github.com/airenas/sage-gui/actions/workflows/snyk.yml)

# sage-gui

Voice-to-voice bot GUI


## Project Setup

```sh
make init
```

## Build docker image

```sh
cd build/docker && make dbuild
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit # or `npm run test:unit:ci` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

## License

Copyright © 2022, [Airenas Vaičiūnas](https://github.com/airenas).

Released under [The 3-Clause BSD License](LICENSE).

---