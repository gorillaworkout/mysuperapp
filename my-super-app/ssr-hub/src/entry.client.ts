import { createApp } from './create-app';

const base = location.origin;

createApp({
    base,
    url: location.href
});
