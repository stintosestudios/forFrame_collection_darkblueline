
var blob2d = function () {

    var parts = [];

    var size = 8,
    pxSize = 8,
    space = 1,
    offset = {

        x : 10,
        y : 30,

    },
    x,
    y,
    cx = size / 2,
    cy = size / 2,
    px = 0;
    while (px < size * size) {

        x = px % size;
        y = Math.floor(px / size);

        if (Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2)) < (size-1) / 2) {

            parts.push({

                id : 'blobpx_' + px,
                w : pxSize,
                h : pxSize,
                x : x * (pxSize + space) + offset.x,
                y : y * (pxSize + space) + offset.y,
                forFrame : function (pt) {},
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

    return parts;

};

scene({

    projectName : 'blob',

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

    parts : blob2d(),

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
