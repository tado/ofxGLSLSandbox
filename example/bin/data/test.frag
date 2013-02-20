#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main( void ) {
	vec2 p = gl_FragCoord.xy/resolution.xy;
	float z = smoothstep(-0.0, 0.1, cos(time*1.0)*0.2);
	gl_FragColor = vec4(p.x, p.y, z, 3.0);
}