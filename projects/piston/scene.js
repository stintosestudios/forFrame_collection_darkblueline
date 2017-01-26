
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
            x : 25,
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

                //  additional data that is to be shared with other parts
                pt.local = {

                    radian : radian

                };

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

        }, {

            id : 'piston_shaft',

            w : 64,
            h : 16,
            x : 400,
            y : 200,

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    // the part area
                    ctx.strokeStyle = '#ff0000';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(0, 0, pt.w, pt.h);

                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 3;

                    ctx.strokeRect(0, 0, pt.w, pt.h);

                }

            }
        }, {

            id : 'piston_bar',

            w : 300,
            h : 16,

            forFrame : function (pt) {

                // wheel link
                var ptWL = this.parts['piston_wheel_link'],
                ptSH = this.parts['piston_shaft'],
                ptWheel = this.parts['piston_wheel'],
                //cx = ptWL.x + ptWL.w / 2 - pt.h / 2,
                //cy = ptWL.y + ptWL.h / 2 - pt.h / 2;
                cx = ptWL.x + ptWL.w / 2,
                cy = ptWL.y + ptWL.h / 2;

                pt.radian = Math.atan2(cy - (ptSH.y+ptSH.h/2), cx - (ptSH.x + ptSH.w/2));
                pt.x = cx;
                pt.y = cy;

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

                    ctx.strokeRect(0, 0, pt.w, pt.h);

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
