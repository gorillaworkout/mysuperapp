import Vue from 'vue';
import { mount } from './index';

console.log('[Vue2] Client entry loading...');
console.log('[Vue2] Vue version:', Vue?.version);

const container = document.getElementById('app');
console.log('[Vue2] Container found:', !!container);

if (container) {
  try {
    mount(container);
    console.log('[Vue2] App mounted successfully');
  } catch (error) {
    console.error('[Vue2] Mount error:', error);
    container.innerHTML = '<div style="padding: 20px; color: red;">Error loading Vue 2 app. Check console.</div>';
  }
} else {
  console.error('[Vue2] Container #app not found');
}
