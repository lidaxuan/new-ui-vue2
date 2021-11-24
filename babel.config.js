module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "compact": true,
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '~theme',
      },
    ],
  ],

}
