export function loadModules () {
  const context = require.context('@/store/modules', true, /\.js$/);
  const modules = {};

  context.keys().forEach((key) => {
    if (key === './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = context(key).default;
  });

  return { context, modules };
}

export const { context, modules } = loadModules();