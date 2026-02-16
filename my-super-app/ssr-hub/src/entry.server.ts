import type { RenderContext } from '@esmx/core';

export default async function serverEntry(rc: RenderContext) {
  await rc.commit();

  rc.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESMX Super App - Micro-Frontend Hub</title>
  ${rc.preload()}
  ${rc.css()}
</head>
<body>
  <div id="app"></div>
  ${rc.importmap()}
  ${rc.moduleEntry()}
  ${rc.modulePreload()}
</body>
</html>`;
}
