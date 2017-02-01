
var distance = function (x1, y1, x2, y2) {

    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

},

blob2d = function (method) {

    var parts = [],

    state = {
        size : 16,
        pxSize : 8,
        space : 1,
        offset : {

            x : 10,
            y : 30

        }
    },
    x = 0,
    y = 0,
    cx = state.size / 2,
    cy = state.size / 2,
    px = 0;

    // build the parts
    while (px < state.size * state.size) {

        x = px % state.size;
        y = Math.floor(px / state.size);

        if (distance(x, y, cx, cy) < (state.size - 1) / 2) {

            parts.push({

                id : 'blobpx_' + px,
                w : state.pxSize,
                h : state.pxSize,
                //x : x * (state.pxSize + state.space) + state.offset.x,
                //y : y * (state.pxSize + state.space) + state.offset.y,

                forFrame : function (pt) {

                    state.cx = cx;
                    state.cy = cy;
                    state.px = pt.id.split('_')[1];
                    state.bias = 1 - Math.abs(.5 - this.percentDone) / .5;
                    state.x = state.px % state.size;
                    state.y = Math.floor(state.px / state.size);
                    state.d = distance(state.x, state.y, state.cx, state.cy);

                    method.call(this, pt, state);

                    pt.x = state.x * (state.pxSize + state.space) + state.offset.x;
                    pt.y = state.y * (state.pxSize + state.space) + state.offset.y;

                },
                skin : {

                    appendRender : function (ctx, skin) {

                        var pt = skin.part;

                        ctx.fillStyle = '#00ffff';
                        ctx.fillRect(0, 0, pt.w, pt.h);

                    }

                }

            });

        }

        px += 1;
    }

    // return the parts
    return parts;

};

//
scene({

    projectName : 'blob_1',

    maxFrame : 10,

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

    parts : blob2d(function (pt, s) {

        //s.offset.x = 5 * s.bias * s.px / 10 + 100 * s.bias;
        console.log(s.px / 100);
        s.pxSize = 8;
        s.space = 0;
        s.offset.x = this.viewPort.w / 2 - s.size * s.pxSize / 2;
        s.offset.y = s.px / (s.size * 2) * s.size * s.bias - (s.size + 1) * s.pxSize / 2 + this.viewPort.h / 2 - (s.size + 1) * s.pxSize / 2 * s.bias;
        pt.opacity = 1 - s.d / (s.size / 2);

    }),

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
