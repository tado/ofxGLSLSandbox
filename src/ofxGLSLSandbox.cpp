//
//  ofxGLSLSandbox.cpp
//  myGLSLSandbox
//
//  Created by Tadokoro Atsushi on 2013/02/20.
//
//

#include "ofxGLSLSandbox.h"

ofxGLSLSandbox::ofxGLSLSandbox(int _width, int _height){
    width = _width;
    height = _height;
    fbo.allocate(width, height);
}

void ofxGLSLSandbox::setResolution(int _width, int _height){
    width = _width;
    height = _height;
    fbo.allocate(width, height);
}

void ofxGLSLSandbox::loadFile(const string& shaderfile){
    shader.load(shaderfile);
}

void ofxGLSLSandbox::openFile(const string& shaderfile){
    string command = "open ../../../data/" + shaderfile;
    system(command.c_str());
}

void ofxGLSLSandbox::draw(){
    float resolution[] = {width, height};
    float mousePoint[] = {mouse.x, mouse.y};
    float time = ofGetElapsedTimef();
    
    fbo.begin();
    shader.begin();
    shader.setUniform1f("time", time);
    shader.setUniform2fv("resolution", resolution);
    shader.setUniform2fv("mouse", mousePoint);
    ofRect(0, 0, ofGetWidth(), ofGetHeight());
    shader.end();
    fbo.end();
    
    fbo.draw(0, ofGetHeight(), ofGetWidth(), -ofGetHeight());
}

void ofxGLSLSandbox::keyPressed(int key){
    switch (key) {
        case 'f':
            ofToggleFullscreen();
            break;
        case 'o': // Open shader file on external editor.
            openFile("shader.frag");
            break;
        case 'r': // Reload shader
            loadFile("shader");
        default:
            break;
    }
}

void ofxGLSLSandbox::mouseMoved(int x, int y){
    mouse.x = float(x) / width * (width / ofGetWidth());
    mouse.y = 1.0 - float(y) / height * (height / ofGetHeight());
}