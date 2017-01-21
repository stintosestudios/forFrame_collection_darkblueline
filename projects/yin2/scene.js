
scene({

    projectName : 'yin2',

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

            id : 'theidea',
            w : 600,
            h : 600,
            x : 480 / 2 - 300,
            y : 360 / 2 - 300,

            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5;

                pt.radian = Math.PI * 2 * this.percentDone;

                pt.w = 300 * bias;
                pt.h = 300;
                pt.x = 480 / 2 - pt.w / 2;
                pt.y = 360 / 2 - pt.h / 2;

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var points = 100,
                    i = 0,
                    bias = Math.abs(.5 - this.percentDone) / .5,
                    radian,
                    size = skin.part.w / 2,
                    dSize,
                    hSize = size / 2;

                    ctx.strokeStyle = 'rgba(0,255,255,1)';

                    ctx.fillStyle = 'rgba(0,255,255,1)';
                    ctx.lineWidth = 6;
                    ctx.beginPath();

                    // bottom half
                    i = points;
                    while (i > 0) {

                        radian = -Math.PI / 2 + Math.PI / points * i;

                        ctx.lineTo(

                            Math.cos(radian) * (hSize * bias) + size,
                            Math.sin(radian) * hSize + size + hSize);

                        i -= 1;

                    }

                    //ctx.stroke();
                    //ctx.beginPath();

                    // top half
                    i = 0;
                    while (i < points) {

                        radian = Math.PI / 2 + Math.PI / points * i;

                        ctx.lineTo(

                            Math.cos(radian) * (hSize * bias) + size,
                            Math.sin(radian) * hSize + hSize);

                        i += 1;

                    }

                    ctx.arc(size, size, size, Math.PI / 2 * 3, Math.PI / 2);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();

                    // containing circle
                    ctx.beginPath();
                    ctx.arc(size, size, size, 0, Math.PI * 2);
                    ctx.stroke();

                    // inner circles

                    dSize = bias * 25;

                    ctx.strokeStyle = '#000000';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 6;
                    ctx.beginPath();
                    ctx.arc(size, hSize, dSize, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fill();

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#00ffff';
                    ctx.beginPath();
                    ctx.arc(size, hSize * 3, dSize, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fill();

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
        autoGif.injectUI(playback, scene.state.maxFrame);

    }

});
