//
//  ofxGLSLSandbox.h
//  myGLSLSandbox
//
//  Created by Tadokoro Atsushi on 2013/02/20.
//
//

#pragma once
#include "ofMain.h"

class ofxGLSLSandbox {
    
public:
    ofxGLSLSandbox(int width = 512, int height = 384);
    void setResolution(int width, int height);
    void loadFile(const string& shaderfile);
    void draw();
    void mouseMoved(int x, int y );
        
    ofShader shader;
    ofFbo fbo;
    float width, height;
    ofVec2f mouse;
};