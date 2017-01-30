
var buildSway = function (argObj) {

    var state = {

        id_prefix : 'box_',
        bxCount : 13,
        baseSize : 32,
        sway1 : 32,
        sway2 : 128,
        offset : {
            x : -180,
            y : 0

        }

    },

    theParts = [],
    i = 0,
    hBaseSize;

    for (var prop in argObj) {

        state[prop] = argObj[prop];

    }

    hBaseSize = state.baseSize / 2;

    // build the parts
    while (i < state.bxCount) {

        theParts.push({

            id : state.id_prefix + i,
            w : state.baseSize,
            h : state.baseSize,

            forFrame : function (pt) {

                var bxIndex = pt.id.split('_')[1] - 0,
                delta = hBaseSize * (bxIndex / state.bxCount),
                size = state.baseSize - delta,
                deltaY = size,
                bias = 1 - Math.abs(this.percentDone - .5) / .5,
                n = 0;

                // find deltaY
                while (n < bxIndex) {

                    deltaY += state.baseSize - hBaseSize * (n / state.bxCount);

                    n += 1;
                }

                pt.w = size;
                pt.h = size;

                pt.x = this.viewPort.w / 2 - pt.w / 2 + (state.sway2 / state.bxCount * bxIndex) - bias * (state.sway1 / state.bxCount * bxIndex) + state.offset.x;
                pt.y = this.viewPort.h - deltaY + state.offset.y;

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, pt.w, pt.h);

                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(0, 0, pt.w, pt.h);

                }

            }

        });

        i += 1;

    };

    return theParts;

};

scene({

    projectName : 'sway_3',

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
    //parts : buildSway(),

    parts : (function () {

        var parts = [],

        build,

        options,

        defaults = {

            id_prefix : 'box_',
            bxCount : 13,
            baseSize : 32,
            sway1 : 32,
            sway2 : 128,
            offset : {
                x : -180,
                y : 0

            }

        };

        var i = 0,
        len = 6;
        while (i < len) {

            // clone the options object
            options = JSON.parse(JSON.stringify(defaults));

            // make unique changes to clone copy of defaults
            options.id_prefix = 'sway-' + i + '_';
            options.offset.x = 100 - 350 / len * i;
            options.baseSize = 35 - 20 / len * i;

            parts = parts.concat(buildSway(options));

            i += 1;

        }

        console.log(parts);

        return parts;

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
