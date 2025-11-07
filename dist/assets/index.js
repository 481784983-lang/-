window.TavernHelper = window.TavernHelper || {};

import('./extension.js').catch((error) => {
  console.error('状态栏扩展脚本加载失败', error);
});
