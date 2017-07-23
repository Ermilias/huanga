app.models.Animator = (function(){
    var Observable = app.libs.Observable;
    function Animator(...sprites) {
        Observable.call(this);


    }
    Animator.prototype = Object.create(Observable.prototype);
    Animator.prototype.constructor = Animator;

    Animator.prototype.addSprites = function(...sprites) {
        for (sprite in sprites) {
            this.sprites[sprite.name] = sprite;
        }
        return this;
    }
    
    Animator.prototype.removeSprites = function(...sprites) {
        for (sprite in sprites) {
            delete this.sprites[sprite.name];
        }
        return this;
    }

    Animator.prototype.play = function(sprite, animation, speed) {
        speed = speed || sprite.animations[animation].speed;
    }
    
    Animator.prototype.stop = function(sprite, animation) {

    }



    return Animator;
}).call(this);