var app = {
    models: {},
    views: {},
    controllers: {},
    libs: {},
    global: {
        models: {},
        views: {},
        controllers: {},
        socket: {},
    },

    startGlobal: function(host,port) {
        if(typeof host !== undefined){
            port = port || 80;
            this.global.socket = io(host + ':' + port);
        }
        var model = this.global.models.model = new app.models.GlobalModel('GlobalModel');
        var formModel = this.global.models.formModel = new app.models.FormModel('FormModel');
        var player = this.global.models.player = new app.models.PlayerModel('PlayerModel');
        var map = this.global.models.map = new app.models.MapModel('MapModel');
        var view = this.global.views.view = new app.views.GlobalView('GlobalView', model);
        var controller = this.global.controllers.controller = new app.controllers.GlobalController(model, view);
        controller.addModel(formModel);
        controller.addModel(map);
        model.attach(view);
        player.attach(view);
        formModel.attach(view);
        view.attach(controller);

        return this.global;
    }
};
