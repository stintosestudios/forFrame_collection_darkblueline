
scene({

    projectName : 'piston_hop_3',

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
            id : 'background',

            w : 480,
            h : 360,
            x : 0,
            y : 0,

            skin : {

                appendRender : function (ctx) {

                    var x,
                    dx,
                    y,
                    size = 4;

                    ctx.strokeStyle = 'rgba(0,127,127,.6)';
                    ctx.lineWidth = 3;

                    // hora
                    y = 0;
                    while (y < 361) {

                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        ctx.lineTo(480, y)
                        ctx.stroke();

                        y += 360 / size;

                    }

                    // vert
                    x = 0;
                    while (x < 481) {

                        dx = 480 / size * this.percentDone;

                        ctx.beginPath();
                        ctx.moveTo(x + dx, 0);
                        ctx.lineTo(x + dx, 360)
                        ctx.stroke();

                        x += 480 / size;

                    }

                }

            }

        },

        // wheel
        {

            id : 'piston_wheel',
            w : 100,
            h : 100,
            x : 180,

            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5;

                pt.y = 140 - 70 * (1 - bias);

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 3;

                    // wheel size based on part size
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2 * 0.75, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fill();

                }

            }

        },

        // wheel link
        {

            id : 'piston_wheel_link',

            w : 32,
            h : 32,

            forFrame : function (pt) {

                var ptWheel = this.parts['piston_wheel'],
                radian = Math.PI * 2 * this.percentDone + 1.57,
                cx,
                cy,
                linkRadius = ptWheel.w / 7;

                pt.w = ptWheel.w / 4;
                pt.h = ptWheel.w / 4;

                cx = ptWheel.x + ptWheel.w / 2 - pt.w / 2;
                cy = ptWheel.y + ptWheel.h / 2 - pt.h / 2;

                pt.x = cx + Math.cos(radian) * linkRadius;
                pt.y = cy + Math.sin(radian) * linkRadius;

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 3;

                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fill();

                }

            }

        },

        // piston shaft
        {

            id : 'piston_shaft',

            w : 32,
            h : 64,
            x : 400,
            y : 200,

            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5,

                ptWheel = this.parts['piston_wheel'],
                ptBar = this.parts['piston_bar'],

                linkRadius = ptWheel.w / 7;

                ptBar.w = ptWheel.w * 0.9;

                //pt.x = ptBar.w + ptWheel.w / 2 + ptWheel.x - linkRadius * Math.cos(Math.PI * bias);
                //pt.y = ptWheel.y + ptWheel.h / 2 - pt.h / 2;

                pt.x = ptWheel.w / 2 + ptWheel.x - pt.w / 2;
                pt.y = ptBar.h + ptWheel.y + ptWheel.h + linkRadius * Math.cos(Math.PI * (1 - bias)) + 15;

                pt.radian =  - .5 * (1 - bias);
            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 3;

                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.fillRect(0, 0, pt.w, pt.h);
                }

            }
        },

        // piston bar
        (function () {

            var theRadian = 0;

            return {

                id : 'piston_bar',

                w : 150,
                h : 16,

                forFrame : function (pt) {

                    // wheel link
                    var ptWL = this.parts['piston_wheel_link'],
                    ptSH = this.parts['piston_shaft'],
                    ptWheel = this.parts['piston_wheel'],
                    cx = ptWL.x + ptWL.w / 2,
                    cy = ptWL.y + ptWL.h / 2;

                    /*
                    theRadian = Math.atan2(
                    cy - ptSH.y - ptSH.h / 2,
                    cx - ptSH.x + ptSH.w / 2);

                    pt.x = cx;
                    pt.y = cy;
                     */

                    theRadian = Math.atan2(
                            cy - ptSH.y - ptSH.h / 2,
                            cx - (ptSH.x + ptSH.w / 2));

                    pt.x = cx + 8;
                    pt.y = cy;
                },

                skin : {

                    appendRender : function (ctx, skin) {

                        var pt = skin.part;

                        ctx.translate(0, -pt.h / 2);
                        ctx.rotate(theRadian - Math.PI);

                        ctx.strokeStyle = '#00ffff';
                        ctx.fillStyle = '#000000';
                        ctx.lineWidth = 3;

                        ctx.strokeRect(0, 0, pt.w, pt.h);
                        ctx.fillRect(0, 0, pt.w, pt.h);

                    }

                }

            };
        }
            ()),

        // left arm
        {

            id : 'left_arm',
            w : 16,
            h : 64,

            forFrame : function (pt) {

                var ptWheel = this.parts['piston_wheel'],
                cx = ptWheel.x + ptWheel.w / 2 - pt.w / 2,
                cy = ptWheel.y + ptWheel.h / 2 - pt.h / 2,
                bias = Math.abs(.5 - this.percentDone) / .5;

                var radian = Math.PI - .5 * (1 - bias);

                pt.radian = Math.PI / 2 - radian;
                pt.x = cx + Math.cos(radian) * (ptWheel.w * 0.68);
                pt.y = cy - Math.sin(radian) * (ptWheel.h * 0.68);

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 3;

                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.fillRect(0, 0, pt.w, pt.h);

                }

            }

        },

        // right arm
        {

            id : 'right_arm',
            w : 16,
            h : 64,

            forFrame : function (pt) {

                var ptWheel = this.parts['piston_wheel'],
                cx = ptWheel.x + ptWheel.w / 2 - pt.w / 2,
                cy = ptWheel.y + ptWheel.h / 2 - pt.h / 2,
                bias = Math.abs(.5 - this.percentDone) / .5;

                var radian = Math.PI - .5 * (1 - bias);

                pt.radian = Math.PI / 2 + radian;
                pt.x = cx - Math.cos(radian) * (ptWheel.w * 0.68);
                pt.y = cy - Math.sin(radian) * (ptWheel.h * 0.68);

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 3;

                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.fillRect(0, 0, pt.w, pt.h);

                }

            }

        },

        // head
        {

            id : 'head',
            w : 16,
            h : 64,

            forFrame : function (pt) {

                var ptWheel = this.parts['piston_wheel'],
                cx = ptWheel.x + ptWheel.w / 2 - pt.w / 2,
                cy = ptWheel.y + ptWheel.h / 2 - pt.h / 2,
                bias = Math.abs(.5 - this.percentDone) / .5;

                var radian = 1.2 + .8 * (1 - bias);

                pt.radian = Math.PI / 2 + radian;
                pt.x = cx - Math.cos(radian) * (ptWheel.w * 0.68);
                pt.y = cy - Math.sin(radian) * (ptWheel.h * 0.68);

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 3;

                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.fillRect(0, 0, pt.w, pt.h);

                }

            }

        },

        // right hand
        {

            id : 'right_hand',
            w : 16,
            h : 64,

            forFrame : function (pt) {

                var ptArmR = this.parts['right_arm'];

                pt.x = ptArmR.x + pt.w / 2 + ptArmR.w;
                pt.y = ptArmR.y - ptArmR.h / 2;

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 3;

                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.fillRect(0, 0, pt.w, pt.h);

                }

            }

        },

        // left hand
        {

            id : 'left_hand',
            w : 16,
            h : 64,

            forFrame : function (pt) {

                var ptArmL = this.parts['left_arm'];

                pt.x = ptArmL.x - pt.w / 2 - ptArmL.w;
                pt.y = ptArmL.y - ptArmL.h / 2;

            },

            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#000000';
                    ctx.lineWidth = 3;

                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.fillRect(0, 0, pt.w, pt.h);

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

            appendRender : function (ctx) {

                ctx.fillStyle = 'rgba(0,255,255,.2)';
                ctx.fillRect(0, 0, this.viewPort.w, this.viewPort.h);

            },
            appendZ : 0,

            containerId : 'apparea',

            frameRate : 40
        };

        scene.injectUI(playback);
        autoGif.injectUI(playback, scene.state.maxFrame);

    }

});
