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
    mouse.x = width/2;
    mouse.y = height/2;
    
    shader.load("shader");
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

void ofxGLSLSandbox::mouseMoved(int x, int y){
    mouse.x = x;
    mouse.y = y;
}