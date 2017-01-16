
scene({

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

            id : 'cross',

            w : 480,
            h : 360,
            x : 0,
            y : 0,

            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5;

                //pt.radian = Math.PI * 2 * this.percentDone;
                pt.opacity = 1-bias;

            },

            skin : {
                appendRender : function (ctx) {

                    ctx.strokeStyle = 'rgba(0,255,255,.5)';
                    ctx.lineWidth = 6;

                    ctx.beginPath();
                    ctx.moveTo(240, 0);
                    ctx.lineTo(240, 360);
                    //ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, 180);
                    ctx.lineTo(480, 180);
                    //ctx.stroke();

                }
            }

        }, {

            id : 'theidea',
            w : 300,
            h : 300,
            x : 480 / 2 - 150,
            y : 360 / 2 - 150,

            forFrame : function (pt) {

                pt.radian = Math.PI * 2 * this.percentDone;

            },

            skin : {

                appendRender : function (ctx) {

                    var points = 100,
                    i = 0,
                    bias = Math.abs(.5 - this.percentDone) / .5,
                    radian;

                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 6;
                    ctx.beginPath();

                    // bottom half
                    i = 0;
                    while (i < points) {

                        radian = -Math.PI / 2 + Math.PI / points * i;

                        ctx.lineTo(

                            Math.cos(radian) * (75 * bias) + 150,
                            Math.sin(radian) * 75 + 150 + 75);

                        i += 1;

                    }

                    ctx.stroke();
                    ctx.beginPath();

                    // top half
                    i = 0;
                    while (i < points) {

                        radian = Math.PI / 2 + Math.PI / points * i;

                        ctx.lineTo(

                            Math.cos(radian) * (75 * bias) + 150,
                            Math.sin(radian) * 75 + 75);

                        i += 1;

                    }

                    //ctx.closePath();
                    ctx.stroke();

                }

            }

        }, {

            id : 'cirlces',

            w : 300,
            h : 300,
            x : 480 / 2 - 150,
            y : 360 / 2 - 150,
            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5;

                pt.radian = Math.PI * 2 * this.percentDone;
                pt.opacity = bias;

            },

            skin : {

                appendRender : function (ctx) {

                    var bias = Math.abs(.5 - this.percentDone) / .5,
                    size = bias * 37;

                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 6;
                    ctx.beginPath();
                    ctx.arc(150, 75, size, 0, Math.PI * 2);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(150, 225, size, 0, Math.PI * 2);
                    ctx.stroke();

                    // containing circle
                    ctx.beginPath();
                    ctx.arc(150, 150, 150, 0, Math.PI * 2);
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

    }

});
