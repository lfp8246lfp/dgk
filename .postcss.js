modules.exports = {
    "plugins": {
        "postcss-import":{},
        "postcss-url":{},
        "autoprefixer":{},
        "postcss-pxtorem":{
            "rootValue":750,
            "propList":["*"],
            "selectorBlackList":["mint-"]

        }
    }
}