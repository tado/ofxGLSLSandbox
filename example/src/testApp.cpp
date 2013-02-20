#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup(){
    glslSandbox = new ofxGLSLSandbox();
    
    // setup shader width and height
    glslSandbox->setResolution(512, 384);
    
    // load fragment shader file (must put in bin/data folder)
    glslSandbox->loadFile("shader");
}

//--------------------------------------------------------------
void testApp::update(){
    
}

//--------------------------------------------------------------
void testApp::draw(){
    glslSandbox->draw();
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    ofToggleFullscreen();
}

//--------------------------------------------------------------
void testApp::keyReleased(int key){

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void testApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void testApp::dragEvent(ofDragInfo dragInfo){ 

}