// This shader program get from GLSL sandbox http://glsl.heroku.com/
// http://glsl.heroku.com/e#6571.0

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;
uniform float time;

//Simple raymarching sandbox with camera

//Raymarching Distance Fields
//About http://www.iquilezles.org/www/articles/raymarchingdf/raymarchingdf.htm
//Also known as Sphere Tracing

//Util Start
vec2 ObjUnion(in vec2 obj0,in vec2 obj1){
    if (obj0.x<obj1.x)
        return obj0;
    else
        return obj1;
}
//Util End

//Scene Start

//Sphere
float sph( vec3 p, float s ) {
    return length(p)-s;
}

//Floor
vec2 obj0(in vec3 p){
    return vec2(p.y+31.0,1);
}
//Floor Color (checkerboard)
vec3 obj0_c(in vec3 p){
	vec3 pt = p;
	float twist = time*.4+p.y*.3;
	pt.x = p.x*cos(twist)+p.z*sin(twist);
	pt.z = p.x*sin(twist)-p.z*cos(twist);
    
	vec3 pt1 = pt;
	float twist2 = time*.3+p.x*.2;
	pt1.y = pt.y*cos(twist2)+pt.z*sin(twist2);
	pt1.z = pt.y*sin(twist2)-pt.z*cos(twist2);
	
	vec3 pr = pt1;
	pr.x = pt1.x*cos(time*.4)+pt1.y*sin(time*.4);
	pr.y = pt1.x*sin(time*.4)-pt1.y*cos(time*.4);
    
	if (fract(pr.x*.5)>.5)
        if (fract(pr.z*.5)>.5)
            return vec3(0,0,.7);
        else
            return vec3(.1,.1,.3);
        else
            if (fract(pr.z*.5)>.5)
                return vec3(0,0,.3);
            else
                return vec3(.2,.3,.7);
}

//IQs RoundBox (try other objects http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm)
vec2 obj1(in vec3 p){
	vec3 pt = p;
	float twist = time*.4+p.y*.3;
	pt.x = p.x*cos(twist)+p.z*sin(twist);
	pt.z = p.x*sin(twist)-p.z*cos(twist);
	
	vec3 pt1 = pt;
	float twist2 = time*.3+p.x*.2;
	pt1.y = pt.y*cos(twist2)+pt.z*sin(twist2);
	pt1.z = pt.y*sin(twist2)-pt.z*cos(twist2);
	
	vec3 pr = pt1;
	pr.x = pt1.x*cos(time*.4)+pt1.y*sin(time*.4);
	pr.y = pt1.x*sin(time*.4)-pt1.y*cos(time*.4);
    
	float rb = length(max(abs(pr)-vec3(2.1),0.0))-2.55;
	float modd = .85;
	vec3 p1 = mod(pr, modd)-modd*.5;
	float s = sph(p1, .5);
	//return vec2(min(rb, s),1);
	return vec2(max(rb, -s),0);
}

//RoundBox with simple solid color
vec3 obj1_c(in vec3 p){
	return vec3(1.0,0.5,0.2);
}

//Objects union
vec2 inObj(in vec3 p){
    return ObjUnion(obj0(p),obj1(p));
}

//Scene End

void main(void){
    vec2 vPos=-1.0+2.0*gl_FragCoord.xy/resolution.xy;
    
    //Camera animation
    vec3 vuv=vec3(0,1,0);//Change camere up vector here
    vec3 vrp=vec3(0,1,0); //Change camere view here
    vec3 prp=vec3(-sin(time*.2)*8.0,2,cos(time*.2)*8.0); //Change camera path position here
    
    //Camera setup
    vec3 vpn=normalize(vrp-prp);
    vec3 u=normalize(cross(vuv,vpn));
    vec3 v=cross(vpn,u);
    vec3 vcv=(prp+vpn);
    vec3 scrCoord=vcv+vPos.x*u*resolution.x/resolution.y+vPos.y*v;
    vec3 scp=normalize(scrCoord-prp);
    
    //Raymarching
    const vec3 e=vec3(0.025,0,0);
    const float maxd=60.0; //Max depth
    
    vec2 s=vec2(0.1,0.0);
    vec3 c,p,n;
    
    float f=1.0;
    for(int i=0;i<256;i++){
        if (abs(s.x)<.01||f>maxd) break;
        f+=s.x*.6;
        p=prp+scp*f;
        s=inObj(p);
    }
    
    if (f<maxd){
        if (s.y==0.0)
            c=obj0_c(p);
        else
            c=obj1_c(p);
        n=normalize(
                    vec3(s.x-inObj(p-e.xyy).x,
                         s.x-inObj(p-e.yxy).x,
                         s.x-inObj(p-e.yyx).x));
        float b=max(dot(n,normalize(prp-p)),0.0);
        gl_FragColor=vec4((b*c+pow(b,48.0))*(1.0-f*.01),1.0);//simple phong LightPosition=CameraPosition
    }
    else gl_FragColor=vec4(0,0,0,1); //background color
}