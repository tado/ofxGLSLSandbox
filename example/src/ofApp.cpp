#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    // create new ofxGLSLSandbox instance
    glslSandbox = new ofxGLSLSandbox();
    
    // setup shader width and height
    glslSandbox->setResolution(800, 480);
    
    // load fragment shader file (must put in bin/data folder)
    glslSandbox->loadFile("shader");
}

//--------------------------------------------------------------
void ofApp::update(){
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    // draw shader
    glslSandbox->draw();
    
    ofSetHexColor(0xffffff);
    ofDrawBitmapString("[f] Toggle fullscreen, [o] Open shader file on external editor, [r] Reload shader", 10, 15);
    ofDrawBitmapString(ofToString(ofGetFrameRate(), 4), 10, 30);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    // set key actions
    glslSandbox->keyPressed(key);
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){
    
}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){
    // update mouse position
    glslSandbox->mouseMoved(mouseX, mouseY);
}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){
    
}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){
    
}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){
    
}