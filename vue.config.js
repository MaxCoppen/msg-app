module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,

      outputDir: './dist',

      builderOptions: {
        // General config :
        appId: "com.msg.app",
        productName: "Msg App",
        copyright: "© 2021 Max Coppen All Rights Reserved",

        // Windows config :
        win: {
          target: "nsis",
          icon: "build/icon.ico"
        }
      }
    }
  }
}