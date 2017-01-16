

var sinWave = function (bias) {

    var i = 0,
    points = [],
    len = 100,
    r = 0,
    rLen = 3,
    xOffset;

    bias = bias === undefined ? 1 : bias;

    // get the points
    while (r < rLen) {

        xOffset = 460 / rLen * r;

        points.push({
            x : 10 + xOffset,
            y : 180
        });

        i = 0;
        while (i < len + 1) {

            points.push({
                x : 10 + 460 / (len * rLen) * i + xOffset,
                y : 180 - 50 * bias * Math.sin(Math.PI * 2 * (i / len))
            });

            i += 1;

        }

        r += 1;
    }

    return points;

},

// (use with call in a forFrame)
setCircle = function (pt, circleIndex, circleLen, offset) {

    var bias = Math.abs(.5 - this.percentDone) / .5,
    radian,
    points = sinWave(),
    pointIndex,
    pointPer,
    radius,
    cx = this.viewPort.w / 2 - pt.w / 2,
    cy = this.viewPort.h / 2 - pt.h / 2;

    offset = offset === undefined ? 0 : offset;

    radian = Math.PI * 2 * this.percentDone + Math.PI * 2 / circleLen * (circleIndex - 1);

    radian += Math.PI * 2 * offset;

    pointIndex = Math.floor(points.length * this.percentDone) + (points.length / 2 * (circleLen - 1));

    pointIndex += Math.floor(points.length * offset);

    if (pointIndex >= points.length) {

        pointIndex = pointIndex % points.length;

    }

    pointPer = (points[pointIndex].y - (180 - 50)) / 100;

    radius = 32 + 96 * pointPer;

    //radius = 32 + 96;
    pt.x = cx + Math.cos(radian) * radius;
    pt.y = cy + Math.sin(radian) * radius;

};

scene({

    maxFrame : 100,

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
                    bias = Math.abs(.5 - this.percentDone) / .5,
                    points;

                    ctx.lineWidth = 6;

                    // center line
                    //ctx.strokeStyle = 'rgba(0,255,255,1)';
                    //ctx.beginPath();
                    //ctx.moveTo(10, 180);
                    //ctx.lineTo(470, 180);
                    //ctx.stroke();

                    points = sinWave(bias);

                    ctx.strokeStyle = 'rgba(0,255,255,.5)';
                    ctx.beginPath();
                    points.forEach(function (point) {

                        ctx.lineTo(point.x, point.y);

                    });
                    ctx.stroke();

                }

            }

        }, {
            id : 'circle_1_1',
            w : 50,
            h : 50,
            forFrame(pt) {

                setCircle.call(this, pt, 1, 3);

            },
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,0,0,1)';
                    ctx.fillStyle = 'rgba(0,255,255,1)';
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();

                }
            }

        }, {
            id : 'circle_1_2',
            w : 50,
            h : 50,
            forFrame(pt) {

                setCircle.call(this, pt, 2, 3);

            },
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,0,0,1)';
                    ctx.fillStyle = 'rgba(0,255,255,1)';
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
            }

        }, {
            id : 'circle_1_3',
            w : 50,
            h : 50,
            forFrame(pt) {

                setCircle.call(this, pt, 3, 3);

            },
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,0,0,1)';
                    ctx.fillStyle = 'rgba(0,255,255,1)';
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
            }

        }, {
            id : 'circle_2_1',
            w : 50,
            h : 50,
            forFrame(pt) {

                setCircle.call(this, pt, 1, 3, .5);

            },
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,255,255,1)';
                    ctx.fillStyle = 'rgba(0,0,0,1)';
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
            }

        }, {
            id : 'circle_2_2',
            w : 50,
            h : 50,
            forFrame(pt) {

                setCircle.call(this, pt, 2, 3, .5);

            },
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,255,255,1)';
                    ctx.fillStyle = 'rgba(0,0,0,1)';
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
            }

        }, {
            id : 'circle_2_3',
            w : 50,
            h : 50,
            forFrame(pt) {

                setCircle.call(this, pt, 3, 3, .5);

            },
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,255,255,1)';
                    ctx.fillStyle = 'rgba(0,0,0,1)';
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.closePath();
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

    }

});
