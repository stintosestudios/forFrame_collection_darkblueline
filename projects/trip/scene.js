
scene({

    maxFrame : 25,

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

            id : 'base',
            w : 420,
            h : 120,

            forFrame : function (pt) {

                pt.x = this.viewPort.w / 2 - pt.w / 2;
                pt.y = this.viewPort.h / 2 - pt.h / 2;
                //pt.radian = Math.PI * 2 * this.percentDone;

            },
            skin : {

                appendRender : function (ctx, skin) {

                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(0, 0, skin.part.w, skin.part.h);

                    var x,
                    y,
                    pt = skin.part,
                    bias;

                    // upper part
                    x = 0;
                    while (x <= 10) {

                        bias = (.5 - x / 10) / .5;

                        ctx.beginPath();
                        ctx.moveTo(pt.w / 10 * x, 0);
                        ctx.lineTo(pt.w / 2 - pt.w / 4 * bias, pt.h / 5 * 2);
                        ctx.stroke();

                        x += 1;
                    }

                    ctx.beginPath();
                    ctx.moveTo(pt.w / 2 - pt.w / 4 * 1, pt.h / 5 * 2);
                    ctx.lineTo(pt.w / 2 + pt.w / 4 * 1, pt.h / 5 * 2);
                    ctx.stroke();

                    // lower part
                    x = 0;
                    while (x <= 10) {

                        bias = (.5 - x / 10) / .5;

                        ctx.beginPath();
                        ctx.moveTo(pt.w / 10 * x, pt.h);
                        ctx.lineTo(pt.w / 2 - pt.w / 4 * bias, pt.h / 5 * 3);
                        ctx.stroke();

                        x += 1;
                    }

                    ctx.beginPath();
                    ctx.moveTo(pt.w / 2 - pt.w / 4 * 1, pt.h / 5 * 3);
                    ctx.lineTo(pt.w / 2 + pt.w / 4 * 1, pt.h / 5 * 3);
                    ctx.stroke();

                }

            }

        }, {

            id : 'overlay',
            w : 420,
            h : 120,

            forFrame : function (pt) {

                pt.x = this.viewPort.w / 2 - pt.w / 2;
                pt.y = this.viewPort.h / 2 - pt.h / 2;
                //pt.radian = Math.PI * 2 * this.percentDone;

            },
            skin : {

                appendRender : function (ctx, skin) {

                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 3;

                    var i,
                    pt = skin.part,
                    bias,
                    part = 1 / 4,
                    per;

                    // upper
                    i = 0;
                    while (i < 4) {

                        per = part * this.percentDone + part * i;

                        ctx.beginPath();
                        ctx.moveTo(pt.w / 2 - pt.w / 4 * (2 - 1 * per), pt.h / 5 * 2 * per);
                        ctx.lineTo(pt.w / 2 + pt.w / 4 * (2 - 1 * per), pt.h / 5 * 2 * per);
                        ctx.stroke();
                        i += 1;

                    }

                    // lower
                    i = 0;
                    while (i < 4) {

                        per = part * this.percentDone + part * i;

                        ctx.beginPath();
                        ctx.moveTo(pt.w / 2 - pt.w / 4 * (2 - 1 * per), pt.h / 5 * (5 - 2 * per));
                        ctx.lineTo(pt.w / 2 + pt.w / 4 * (2 - 1 * per), pt.h / 5 * (5 - 2 * per));
                        ctx.stroke();
                        i += 1;

                    }

                }

            }

        }

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

    }

});
