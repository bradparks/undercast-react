// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
require.config({
  paths : {
    backbone                : 'libs/backbone',
    underscore              : 'libs/underscore',
    jquery                  : 'libs/jquery',
    serialize               : 'libs/jquery.serializejson',
    json2                   : 'libs/json2',
    marionette              : 'libs/marionette.min',
    'backbone.wreqr'        : 'libs/backbone.wreqr',
    'backbone.babysitter'   : 'libs/backbone.babysitter',
    bootstrap               : 'libs/bootstrap.min',
    ejs                     : 'libs/ejs',
    moment                  : 'libs/moment',
    base_form_view				  : 'app/views/forms/base_form_view',
    signup_form_view        : 'app/views/forms/signup_form_view',
    show_view               : 'app/views/show',
    show_model              : 'app/models/show',
    undercast_model         : 'app/models/undercast',
    account_model				    : 'app/models/account',
    session_model           : 'app/models/session',
    jwplayer                : 'libs/jwplayer'
  },
  shim : {
    jquery : {
      exports : 'jQuery'
    },
    underscore : {
      exports : '_'
    },
    backbone : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    marionette : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports : 'Marionette'
    },
    bootstrap : {
      deps                : ['jquery']
    },
    serialize : {
      deps                : ['jquery']
    },
    ejs : {
            exports             : 'EJS'
    },
    jwplayer : { exports : 'jwplayer'}
  }
});
require(["marionette","bootstrap","serialize","index","broadcasts","posts","moment","jwplayer"], function () {});
