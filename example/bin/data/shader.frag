//Just added some history for effect... Stuthelotusguy
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D bb;

void main( void ) {
    float radius = .1;
    vec2 lightDir = mouse - (gl_FragCoord.xy / resolution.xy);
    lightDir.x *= resolution.x / resolution.y;
    float D = length(lightDir);

    vec2 L = normalize(lightDir);


    float md = max(D - radius, 0.) / radius + 1.;
    float at = 1. / (md*md);
    at = (at - .25)/(1.-.25);
    at = max(at, 0.);
    
    gl_FragColor = vec4(vec3(at), 1.) + 0.975 * texture2D(bb, (gl_FragCoord.xy / resolution.xy));
    
}