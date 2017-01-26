
scene({

    projectName : 'piston',

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

            id : 'piston_wheel',
            w : 200,
            h : 200,
            x : 100,
            y : 100,

            forFrame : function (pt) {},

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    // the part area
                    ctx.strokeStyle = '#ff0000';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(0, 0, pt.w, pt.h);

                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 3;

                    // wheel size based on part size
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2 * 0.75, 0, Math.PI * 2);
                    ctx.stroke();

                }

            }

        }, {

            id : 'piston_wheel_link',

            w : 32,
            h : 32,

            forFrame : function (pt) {

                var ptWheel = this.parts['piston_wheel'],
                radian = Math.PI * 2 * this.percentDone,
                cx = ptWheel.x + ptWheel.w / 2 - pt.w / 2,
                cy = ptWheel.y + ptWheel.h / 2 - pt.h / 2;
				
				//pt.radian = radian;
				

                pt.x = cx + Math.cos(radian) * 25;
                pt.y = cy + Math.sin(radian) * 25;

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    // the part area
                    ctx.strokeStyle = '#ff0000';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(0, 0, pt.w, pt.h);

                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 3;

                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.stroke();

                }

            }

        },

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
