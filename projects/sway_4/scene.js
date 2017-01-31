
var buildSway = function (argObj) {

    var state = {

        id_prefix : 'box_',
        bxCount : 13,
        baseSize : 32,
        sway1 : 32,
        sway2 : 128,
        styles : {

            fill : '#000000',
            stroke : '#00ff00',
            width : 3

        },
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

                    ctx.fillStyle = state.styles.fill;
                    ctx.fillRect(0, 0, pt.w, pt.h);

                    ctx.strokeStyle = state.styles.stroke;
                    ctx.lineWidth = state.styles.width;
                    ctx.strokeRect(0, 0, pt.w, pt.h);

                }

            }

        });

        i += 1;

    };

    return theParts;

},

swayCollection = function (argObj, rules) {

    var parts = [],
    build,
    options,
    defaults = {
        id_prefix : 'box_',
        bxCount : 13,
        baseSize : 32,
        sway1 : 32,
        sway2 : 128,
        styles : {

            fill : '#000000',
            stroke : '#00ff00'

        },
        offset : {
            x : -180,
            y : 0
        }
    },
    i = 0;

    // build sways
    while (i < argObj.len) {

        // clone the options object
        options = JSON.parse(JSON.stringify(defaults));

        argObj.i = i;

        // apply styles
        if (argObj.styles) {

            for (var prop in argObj.styles) {

                options.styles[prop] = argObj.styles[prop];

            }

        }

        rules.call(argObj, options);

        parts = parts.concat(buildSway(options));

        i += 1;

    }

    return parts;

};

scene({

    projectName : 'sway_4',

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

    parts : (function () {

        var parts = [];

        parts = parts.concat(parts, swayCollection({
                    len : 6,
                    styles : {
                        stroke : 'rgba(0,128,128,1)',
                        width : 6
                    }
                }, function (options) {

                    // make unique changes to clone copy of defaults
                    options.id_prefix = 'collection2-' + this.i + '_';
                    options.sway1 = 128;
                    options.sway2 = 64;
                    //options.offset.x = 0;

                    options.offset.x = 100 - 320 / this.len * this.i;
                    options.baseSize = 35 - 20 / this.len * this.i;

                }));

        parts = parts.concat(parts, swayCollection({
                    len : 10,
                    styles : {
                        stroke : 'rgba(0,32,32,.5)',
                        fill : 'rgba(0,200,200,.8)',
                        width : 3
                    }
                }, function (options) {

                    // make unique changes to clone copy of defaults
                    options.id_prefix = 'collection1-' + this.i + '_';
                    options.sway1 = 32 + 500 / this.len * this.i;
                    options.sway2 = 128;
                    options.offset.x = 100;

                    //options.offset.x = 220 - 250 / this.len * this.i;
                    options.baseSize = 35 - 20 / this.len * this.i;

                }));

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
