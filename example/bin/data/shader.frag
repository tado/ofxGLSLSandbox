#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const float pi=3.1415926535;

vec3 color1=vec3(1.0,0.0,0.0);
vec3 color2=vec3(1.0,0.5,0.0);
vec2 size=resolution;
float scale=1.0;

const int num=4;

float wave(vec2 pos,float angle,float wavelength,float phase,int i){
    return sin(dot(pos,vec2(cos(angle),sin(angle)))*2.0*pi/wavelength+phase+float(i));
}

float wave2(vec2 pos,int i,float ls){
    vec2 me = vec2(size.x*0.4*cos(0.0737*time*(float(i+1)+0.34)+float(i)),size.y*0.4*sin(0.0876*time*(float(i+1)+0.56)+float(i)));
    vec2 diff = pos - me;
    float angle2 = atan(diff.y, diff.x); //cos(atan(diff.y, diff.x) + float(i)*pi/float(num) + 0.7*time);
    float dist = length(diff);
    return (3.0+float(i*2))*angle2+20.0*sin(6.0*dist/ls)*sin(0.5*time+(float(i+3)*2.34))+time;
}

void main(){
    vec2 pos=gl_FragCoord.xy/scale-size/2.0;

    float amp=0.0;
    float ls = length(size);
    for(int i=0;i<num;i++){
        amp+=wave2(pos,i,ls);
    }

    float y=gl_FragCoord.y/size.y;
    
    float c=sin(amp);//sin(pi*12.0*(amp+float(num))/float(num)/2.0);
    c=clamp(c,0.0,1.0);
    c=pow(c,0.2);
    vec3 color=color1+(color2-color1)*clamp((c+y)*0.6, 0.0, 1.0);
    gl_FragColor=vec4(color,1.0);
}
