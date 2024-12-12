// eslint-plugin-declarations.d.ts

declare module 'eslint-plugin-react-hooks' {
  const reactHooks: {
    configs: {
      recommended: {
        rules: Record<string, unknown>;
      };
    };
  };
  export default reactHooks;
}

declare module 'eslint-plugin-react-refresh' {
  const reactRefresh: {
    configs: {
      recommended: {
        rules: Record<string, unknown>;
      };
    };
  };
  export default reactRefresh;
}
