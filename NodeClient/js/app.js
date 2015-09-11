var app = {
    farmNum: 0,
    models: {},
    views: {},
    controllers: {},
    libs: {},
    startGlobal: function(){
        var model = new app.models.GlobalModel();
        var view = new app.views.GlobalView(model);
        var controller = new app.controllers.GlobalController(model, view);
        model.attach(view);
        view.attach(controller);

        return model;
    }
}
