#ifdef GL_ES
precision mediump float;
#endif


uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float Sphere_radius;

vec3 getSurfacePosition(vec2 coord) {
    
    float mov_radius;
    vec2  screen_center;
    vec3  Sphere_center;

    float index;
    vec2  tmpv2;
    float acc;
    
    index = 1.0;
    
    mov_radius = min(resolution.x, resolution.y)*0.25;
    screen_center = resolution * 0.5;
    acc = 0.0;
    
    for (int k=0; k<5; k++) {
        index += 1.0;
        Sphere_center = vec3(screen_center.x + mov_radius * sin(time*index),
           screen_center.y + mov_radius * cos(time*(5.0-index)*1.013),
           0.0);
        
        tmpv2 = Sphere_center.xy - coord.xy;
        acc += Sphere_radius/length(tmpv2);
    }
    if (acc > 1.00) {
        acc = 1.0 - 1.0/acc;
        acc *= Sphere_radius;
        
        acc = (Sphere_radius * acc)/(Sphere_radius*0.30 + acc);
        acc = (Sphere_radius * acc)/(Sphere_radius*0.30 + acc);
        acc = (Sphere_radius * acc)/(Sphere_radius*0.20 + acc);
        
        } else {
          acc = -200.0;
      }
      
      return vec3(coord, acc);
  }

  void main( void ) {

    vec2 screen_center;

    vec3 ViewDirection;
    ViewDirection = vec3 (.0,.0,-1.0);
    
    float mov_radius;
    
    mov_radius = min(resolution.x, resolution.y)*0.25;  
    screen_center = resolution * 0.5;
    
    Sphere_radius = mov_radius*0.25;
    
    /* Light Vars */

    vec3 LightColor;
    vec3 SpecularLightColor[3];
    vec3 DiffuseLightColor[3];
    vec3 AmbientLightColor;
    
    float DiffuseLightIntensity;
    float SpecularLightIntensity;
    float AmbientLightIntensity;
    
    DiffuseLightColor[0] = vec3(1.0,0.3,0.2);
    SpecularLightColor[0] = vec3(0.5,0.7,0.8);
    
    DiffuseLightColor[1] = vec3(0.2,0.2,1.0);
    SpecularLightColor[1] = vec3(0.8,0.8,0.5);
    
    DiffuseLightColor[2] = vec3(0.6,1.0,0.2);
    SpecularLightColor[2] = vec3(0.4,0.5,0.8);
    
    AmbientLightColor = vec3(0.1,0.1,0.15);
    
    vec3 LightPosition[3];
    vec3 LightDirection;
    vec3 SpecularDirection;
    
    /***********************************************************/
    /* Geometry                                                */
    /***********************************************************/
    vec3  SurfaceNormal;
    vec3  SurfacePosition;
    vec3  Sphere_center;
    vec3  SurfDX;
    vec3  SurfDY;
    vec2  tmpv2;
    
    float dist_from_center;
    
    
    
    dist_from_center = .0;
    
    float index;
    float inv;
    float acc;
    
    inv = .0;
    acc = .0;
    index = 1.0;
    
    LightColor = vec3(0.0,0.0,0.0);
    
    SurfacePosition = getSurfacePosition(gl_FragCoord.xy);
    
    
    if (SurfacePosition.z > 0.0) { 
        SurfDX = getSurfacePosition(vec2(gl_FragCoord.x + 1.0, gl_FragCoord.y));
        SurfDY = getSurfacePosition(vec2(gl_FragCoord.x, gl_FragCoord.y+1.0));
        
        SurfDX.z *= 1.0;
        SurfDY.z *= 1.0;
        
        SurfaceNormal = normalize(cross(SurfDX - SurfacePosition, SurfDY - SurfacePosition));
        } else {
            SurfaceNormal = vec3(0.0,0.0,0.25);
        }

        
        /***********************************************************/
        
        LightColor = vec3(.0,.0,.0);
        
        LightPosition[0] = vec3(mouse.xy * resolution.xy, Sphere_radius*3.0);
        LightPosition[1] = vec3(screen_center.x + cos(time*0.92) * mov_radius,
            screen_center.y - cos(time*1.011)* mov_radius,
            Sphere_radius* 8.0 * cos(time*1.013));
        LightPosition[2] = vec3(screen_center.x + sin(time*1.019) * mov_radius,
            screen_center.y - sin(time*1.209) * mov_radius,
            Sphere_radius* 4.0 * (1.0 + cos(time*1.007)));
        
        for (int i=0; i<3; i++) {
            LightDirection = normalize(LightPosition[i] - SurfacePosition);
            
            /***********************************************************/
            /* Diffuse Light                                           */
            /***********************************************************/
            
            DiffuseLightIntensity = clamp(dot(LightDirection, SurfaceNormal),.0,1.0);
            
            /***********************************************************/
            /* Specular Light                                          */
            /***********************************************************/
            
            SpecularDirection = LightDirection - 2.0 * SurfaceNormal * dot(LightDirection, SurfaceNormal);
            
            SpecularLightIntensity = clamp(dot(ViewDirection, SpecularDirection),.0,1.0);
            
            SpecularLightIntensity *= SpecularLightIntensity*SpecularLightIntensity;
            SpecularLightIntensity *= SpecularLightIntensity*SpecularLightIntensity;
            SpecularLightIntensity *= SpecularLightIntensity*SpecularLightIntensity;
            SpecularLightIntensity *= SpecularLightIntensity*SpecularLightIntensity;

            LightColor += DiffuseLightColor[i] * DiffuseLightIntensity +
            SpecularLightColor[i] * SpecularLightIntensity;
            
            AmbientLightIntensity += clamp(DiffuseLightIntensity,.0,.5);
        }
        
        
        /***********************************************************/
        /* Ambient Light                                           */
        /***********************************************************/

        AmbientLightIntensity = 1.0 - AmbientLightIntensity;
        
        
        /***********************************************************/
        /* Lighting Finalizing                                     */
        /***********************************************************/
        
        LightColor += AmbientLightIntensity*AmbientLightColor;
        
        gl_FragColor = vec4(LightColor,1.0);
    }