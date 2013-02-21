#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup(){
    // create new ofxGLSLSandbox instance
    glslSandbox = new ofxGLSLSandbox();
    
    // setup shader width and height
    glslSandbox->setResolution(512, 320);
    
    // load fragment shader file (must put in bin/data folder)
    glslSandbox->loadFile("test");
}

//--------------------------------------------------------------
void testApp::update(){

}

//--------------------------------------------------------------
void testApp::draw(){
    glslSandbox->draw();
    ofSetHexColor(0xffffff);
    ofDrawBitmapString(ofToString(ofGetFrameRate(), 4), 10, 10);
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    switch (key) {
        case 'f':
            ofToggleFullscreen();
            break;
        default:
            break;
    }
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