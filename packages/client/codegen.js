module.exports = {
  schema: [{ 'http://localhost:4000/graphql': {} }],
  documents: ['./**/*.tsx', './**/*.ts'],
  overwrite: true,
  generates: {
    './generated/index.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactCommonImportFrom: '@apollo/client',
        apolloReactComponentsImportFrom: '@apollo/client',
        apolloReactHocImportFrom: '@apollo/client',
        apolloReactHooksImportFrom: '@apollo/client'
      }
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
};
