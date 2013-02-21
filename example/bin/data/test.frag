#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
#define PI 3.14159
#define TWO_PI (PI*2.0)
#define N 80.0

void main( void ) {
    float res = resolution.x / 400.0;
    vec2 position = ( gl_FragCoord.xy) * res;// * resolution;
    float r = 0.0, g = 0.0, b = 0.0;
    for(float i = 0.0; i < N; i++) {
        float a = i * (TWO_PI/N) *(time+200.0)*0.02;
        r+= cos( ((position.x-resolution.x*res/2.0) * cos(a/res) + (position.y-resolution.y*res/2.0) * sin(a/res) + time*1.0)/res/res);
        g+= cos( ((position.x-resolution.x*res/2.0) * cos(a/res) + (position.y-resolution.y*res/2.0) * sin(a/res) + time*1.3)/res/res);
        b+= cos( ((position.x-resolution.x*res/2.0) * cos(a/res) + (position.y-resolution.y*res/2.0) * sin(a/res) + time*1.6)/res/res);
    }
    float d = 0.2;
    r/= N*d;
    g/= N*d;
    b/= N*d;
    gl_FragColor = vec4( vec3( r, g, b), 1.0 );
}