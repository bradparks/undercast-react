// Router.js
define(['backbone','react', 'jsx!components/post','jsx!components/admin' ], function(Backbone,React,Post,Admin){
    "use strict";
    
    var rootNode = document.getElementById('content');
    var Router = Backbone.Router.extend({
        initialize: function(){
            Backbone.history.start({ pushState: true });
        },
        routes: {
            '': 'index',
            'admin' : 'getAdmin',
            ':user/:post_id': 'getPost',
            'signup' : 'getSignup',
        },
        'index': function(){
            console.log("INDEX");
        },
        'getAdmin' : function(){
           React.renderComponent(<Admin />,document.getElementById("content"));
        },
        'getPost': function(user,post_id){
            var data = {username: user, id: post_id};
            React.renderComponent(<Post data={data} />,document.getElementById('content'));
        	
        },
        'getSignup' : function(){

        },
        'getShows' : function(){
        	setView(new ShowsView());
        }
    });
    return Router;
})