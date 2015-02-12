require.config({
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        react: 'libs/react',
        jsx : 'libs/jsx',
        JSXTransformer : 'libs/JSXTransformer',
        text : 'libs/text',
        howler : 'libs/howler.min'
    },
    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        underscore: {
            deps: [
            ],
            exports: '_'
        },
        react: {
            exports: 'React'
        },
        howler : {
            exports : 'Howl'
        }
    }
});
require(['jsx!router'], function (Router) {
    var r = new Router();

});