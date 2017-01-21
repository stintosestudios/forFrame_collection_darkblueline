
scene({

    projectName : 'slidedown_effect',

    maxFrame : 50,

    viewPort : {

        w : 480,
        h : 360

    },

    // define some parts
    parts : [

        // using a closure
        (function () {

            var box = [],
            totalBox = 4;
            i = 0,
            screenW = 480,
            deltaW = screenW / totalBox;
            while (i < totalBox) {

                box.push({

                    x : deltaW * i + (deltaW / 2 - 10),
                    y : -100,
                    w : 20,
                    h : 100

                });

                i += 1;

            }

            return {

                id : 'box',

                w : screenW,
                h : 360,

                x : 0,
                y : 0,

                forFrame : function (pt) {

                    //pt.x = -pt.w + (this.viewPort.w + pt.w) * this.percentDone;

                    var self = this;

                    box.forEach(function (bx, i) {

                        var d = 250,
                        a = 1 / totalBox,
                        b = a * (i+1),
                        per = self.percentDone / b;

                        if (self.percentDone > b) {

                            per = 1;

                        }

                        bx.y = -110 + d * per;

                        //bx.y = -110 + (590 * (i+1)) * self.percentDone;

                    });

                },

                skin : {

                    appendRender : function (ctx, skin) {

                        var pt = skin.part;

                        ctx.strokeStyle = '#00ffff';
                        //ctx.strokeRect(0, 0, pt.w, pt.h);

                        box.forEach(function (bx) {

                            ctx.strokeRect(bx.x, bx.y, bx.w, bx.h);

                        });

                    }

                }

            };

        }
            ())

    ],

    // define the forFrame movement
    forFrame : function () {}

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

scene.load(
    [
        '../mylogo_128.png'
    ],
    function (progress) {

    // uncomment to save as png
    if (progress === 1) {

        var playback = {

            appendRender : function (ctx) {},
            appendZ : 0,

            containerId : 'apparea',

            frameRate : 40
        };

        scene.injectUI(playback);
        autoGif.injectUI(playback, scene.state.maxFrame);

    }

});
