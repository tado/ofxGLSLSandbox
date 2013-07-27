// Playing around with Lissajous curves.
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

const int num = 200;

void main( void ) {
    float sum = 0.0;
    
    float size = resolution.x / 800.0;
    
    for (int i = 0; i < num; ++i) {
        vec2 position = resolution / 4.0;
    float t = (float(i) + time) / 8.0;
    float c = float(i) * 4.0;
        position.x += tan(8.0 * t + c) * resolution.x * 0.2;
        position.y += sin(t) * resolution.y * .8;

        sum += size / length(gl_FragCoord.xy - position);
    }
    
    gl_FragColor = vec4(sum * 0.1, sum * 0.5, sum, 1);
}