#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup(){
    // create new ofxGLSLSandbox instance
    glslSandbox = new ofxGLSLSandbox();
    
    // setup shader width and height
    glslSandbox->setResolution(512, 320);
    
    // load fragment shader file (must put in bin/data folder)
    glslSandbox->loadFile("shader");
}

//--------------------------------------------------------------
void testApp::update(){

}

//--------------------------------------------------------------
void testApp::draw(){
    glslSandbox->draw();
    ofSetHexColor(0xffffff);
    ofDrawBitmapString("[f] Toggle fullscreen, [o] Open shader file on external editor, [r] Reload shader", 10, 15);
    ofDrawBitmapString(ofToString(ofGetFrameRate(), 4), 10, 30);
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    glslSandbox->keyPressed(key);
}

//--------------------------------------------------------------
void testApp::keyReleased(int key){

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y ){
    // update mouse position
    glslSandbox->mouseMoved(mouseX, mouseY);
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