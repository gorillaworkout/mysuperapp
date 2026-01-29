import type { RenderContext } from '@esmx/core';

export default async (rc: RenderContext) => {
  await rc.commit();
  rc.html = '<!DOCTYPE html><html><head><title>Provider Package</title></head><body><h1>Provider Package - No SSR</h1></body></html>';
};