
scene({

    projectName : 'crab',

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

            id : 'lower_center',
            w : 256,
            h : 32,

            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5;

                pt.x = this.viewPort.w / 2 - pt.w / 2;
                pt.y = this.viewPort.h / 2 - pt.h / 2;
                pt.radian = .2 - .4 * bias;

            },
            skin : {

                appendRender : function (ctx, skin) {

                    ctx.strokeStyle = '#00ffff';
                    ctx.strokeRect(0, 0, skin.part.w, skin.part.h);

                }

            }

        }, {

            id : 'lower_right',
            w : 32,
            h : 100,

            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5,
                radian = .2 - .4 * bias,
                cx = this.viewPort.w / 2 - pt.w / 2,
                cy = this.viewPort.h / 2 - pt.h / 2;

                pt.x = cx + Math.cos(radian) * 128;
                pt.y = cy + Math.sin(radian) * 128 + 64;

            },
            skin : {

                appendRender : function (ctx, skin) {

                    ctx.strokeStyle = '#00ffff';
                    ctx.strokeRect(0, 0, skin.part.w, skin.part.h);

                    ctx.translate(0, -32);
                    ctx.rotate(Math.PI);
                    ctx.strokeRect(-skin.part.w, 0, skin.part.w, skin.part.h);

                }

            }

        }, {

            id : 'lower_left',
            w : 32,
            h : 100,

            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5,
                radian = .2 - .4 * bias,
                cx = this.viewPort.w / 2 - pt.w / 2,
                cy = this.viewPort.h / 2 - pt.h / 2;

                pt.x = cx - Math.cos(radian) * 128;
                pt.y = cy - Math.sin(radian) * 128 + 64;

            },
            skin : {

                appendRender : function (ctx, skin) {

                    ctx.strokeStyle = '#00ffff';
                    ctx.strokeRect(0, 0, skin.part.w, skin.part.h);

                    ctx.translate(0, -32);
                    ctx.rotate(Math.PI);
                    ctx.strokeRect(-skin.part.w, 0, skin.part.w, skin.part.h);

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
