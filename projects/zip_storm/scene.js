
scene({

    projectName : 'zip_storm',

    maxFrame : 75,

    viewPort : {

        w : 480,
        h : 360

    },

    logo : {
        w : 128,
        h : 56,
        opacity : .4,
        skin : {
            imgIndex : 0,
            sx : 0,
            sy : 0,
            sw : 128,
            sh : 56
        }
    },

    // define some parts
    parts : [{
            id : 'background',

            w : 480,
            h : 360,
            x : 0,
            y : 0,

            skin : {

                appendRender : function (ctx) {

                    var x,
                    dx,
                    y,
                    size = 20,
                    offset = {

                        x : -480,
                        y : -360

                    };

                    ctx.translate(this.viewPort.w / 2, this.viewPort.h / 2);
                    ctx.rotate(Math.PI / 4);
                    ctx.strokeStyle = 'rgba(0,127,127,.4)';
                    ctx.lineWidth = 6;

                    // hora
                    y = offset.y;
                    while (y < 361 * 2 + offset.y) {

                        ctx.beginPath();
                        ctx.moveTo(0 + offset.x, y);
                        ctx.lineTo(480 * 2 + offset.x, y)
                        ctx.stroke();

                        y += 360 * 2 / size;

                    }

                    // vert
                    x = offset.x;
                    while (x < 481 * 2 + offset.x) {

                        dx = 480 * 2 / size * this.percentDone;

                        ctx.beginPath();
                        ctx.moveTo(x + dx, 0 + offset.y);
                        ctx.lineTo(x + dx, 360 * 2 + offset.y)
                        ctx.stroke();

                        x += 480 * 2 / size;

                    }

                }

            }

        },

        // using a closure
        (function () {

            var box = [],
            totalBox = 8;
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

                id : 'sliders',

                w : screenW,
                h : 360,

                x : 0,
                y : 0,

                forFrame : function (pt) {

                    var self = this;

                    box.forEach(function (bx, i) {

                        // the distance to go down
                        var d = 240,
                        a,
                        b,
                        per;

                        bx.x = deltaW * i + (deltaW / 2 - 10) + screenW * self.percentDone;

                        if (self.percentDone < .33) {

                            // the total percent of the slide down effect over total boxes
                            a = .3 / totalBox;
                            // max percent value
                            b = a * (i + 1);
                            // set the actual percent that will be used
                            per = self.percentDone / b;

                            // never go above 1
                            if (self.percentDone > b) {

                                per = 1;

                            }

                            // set the y value
                            bx.y = 370 - d * per;

                            if (String(i / 2).indexOf('.') != -1) {
                                bx.y = -110 + d * per;

                            }

                            return

                        } else {

                            //bx.y = -110 + d;

                            // set the y value
                            bx.y = 370 - d;

                            if (String(i / 2).indexOf('.') != -1) {
                                bx.y = -110 + d;

                            }

                            return

                        }

                    });

                },

                skin : {

                    appendRender : function (ctx, skin) {

                        var pt = skin.part;

                        ctx.strokeStyle = '#00ffff';
                        ctx.fillStyle = '#000000';

                        ctx.lineWidth = 6;

                        box.forEach(function (bx) {

                            ctx.fillRect(bx.x, bx.y, bx.w, bx.h);
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
