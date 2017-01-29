
scene({

    projectName : 'sway',

    maxFrame : 50,

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
    parts : (function () {

        var theParts = [];

        var i = 0,
        len = 7;
        while (i < len) {

            theParts.push({

                id : 'box_' + i,
                w : 64,
                h : 64,

                forFrame : function (pt) {

                    var bxIndex = pt.id.split('_')[1] - 0,
                    delta = 32 * (bxIndex / len),
                    size = 64 - delta,
                    deltaY = size,
                    bias = 1 - Math.abs(this.percentDone - .5) / .5,
                    n = 0;

                    // find deltaY
                    while (n < bxIndex) {

                        deltaY += 64 - 32 * (n / len);

                        n += 1;
                    }

                    pt.w = size;
                    pt.h = size;

                    pt.x = this.viewPort.w / 2 - pt.w / 2 + (128 / len * bxIndex) - bias * (256 / len * bxIndex);
                    pt.y = this.viewPort.h - deltaY;

                },

                skin : {

                    appendRender : function (ctx, skin) {

                        var pt = skin.part;

                        ctx.strokeStyle = '#00ffff';
                        ctx.lineWidth = 3;
                        ctx.strokeRect(0, 0, pt.w, pt.h);

                    }

                }

            });

            i += 1;

        };

        return theParts;

    }
        ()),

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
