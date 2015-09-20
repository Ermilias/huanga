var app = {
    farmNum: 0,
    models: {},
    views: {},
    controllers: {},
    libs: {},
    startGlobal: function(){
        var model = new app.models.GlobalModel();
        var player = new app.models.PlayerModel();
        var mapMod = new app.models.MapModel();
        var view = new app.views.GlobalView(model);
        var controller = new app.controllers.GlobalController(model, view);
        model.attach(view);
        player.attach(view);
        view.attach(controller);

        var global = [player,mapMod,view,model,controller];
        return global;
    }
}
