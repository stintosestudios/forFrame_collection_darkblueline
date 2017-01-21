
scene({

    projectName : 'wave_sin',

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
    parts : [{
            id : 'sinwave',
            w : 480,
            h : 360,
            forFrame(pt) {},
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part,
                    bias = Math.abs(.5 - this.percentDone) / .5;

                    // red line
                    ctx.strokeStyle = 'rgba(0,255,255,.2)';
                    ctx.beginPath();
                    ctx.moveTo(10, 180);
                    ctx.lineTo(470, 180);
                    ctx.stroke();

                    var i = 0,
                    len = 50,
                    x,
                    y;

                    ctx.strokeStyle = 'rgba(0,255,255,.8)';
                    ctx.beginPath();
                    ctx.moveTo(10, 180);
                    while (i < len + 1) {

                        x = 10 + 460 / len * i;
                        y = 180 - 160 * bias * Math.sin(Math.PI * 2 * (i / len));
                        ctx.lineTo(x, y);

                        i += 1;

                    }

                    ctx.stroke();

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
        autoGif.injectUI(playback,scene.state.maxFrame);

    }

});
