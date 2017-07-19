app.models.Sprite = (function(){
    var Observable = app.libs.Observable;
    function Sprite(name, image, columns, rows, length) {
        this.setName(name)
            .setImage(image)
            .setColumns(columns)
            .setRows(rows)
            .setLength(length);
        Observable.call(this);


    }
    Sprite.prototype = Object.create(Observable.prototype);
    Sprite.prototype.constructor = Sprite;

    Sprite.prototype.setName = function(name) {
        this.name = name;
        return this;
    }

    Sprite.prototype.setImage = function(image) {
        this.image = image;
        return this;
    }

    Sprite.prototype.setColumns = function(columns) {
        this.columns = columns;
        return this;
    }

    Sprite.prototype.setRows = function(rows) {
        this.rows = rows;
        return this;
    }

    Sprite.prototype.setLength = function(length) {
        this.length = length;
        return this;
    }
    
    Sprite.prototype.addAnimation = function(name, length, start, end, speed) {
        this.animations[name] = {
            length: length,
            start: start,
            end: end,
            speed: speed
        };
        return this;
    }
    return Sprite;
}).call(this);