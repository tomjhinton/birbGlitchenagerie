
const float PI = 3.1415926535897932384626433832795;
const float TAU = PI * 2.;
uniform vec3 uColor;
uniform vec3 uPosition;
uniform vec3 uRotation;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform vec2 uMouse;
uniform float uValueB;
uniform float uValueC;


varying vec2 vUv;
varying float vElevation;
varying float vTime;


void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (vTime * .25));
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (vTime * .25));
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (vTime * .25));

}


void uvRipple(inout vec2 uv, float intensity){

	vec2 p =-1.+2.*gl_FragCoord.xy / uResolution.xy-vec2(0,-.001);


    float cLength=length(p);

     uv= uv +(p/cLength)*cos(cLength*15.0-vTime*1.0)*intensity;

}


vec2 tile(vec2 st, float _zoom){
    st *= _zoom;

    return fract(st);
}




void coswarp2(inout vec2 trip, float warpsScale ){

  trip.xy += warpsScale * .1 * cos(3. * trip.yx + (vTime * .25));
  trip.xy += warpsScale * .05 * cos(11. * trip.yx + (vTime * .25));
  trip.xy += warpsScale * .025 * cos(17. * trip.yx + (vTime * .25));

}



void main(){
  float alpha = 1.;
  vec2 uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy ;
  uv = vUv;
  coswarp2(uv, uValueC);

  vec4 tex = texture2D(uTexture, uv);
  coswarp(tex.rgb, 3. * (uValueB * 2.));

    if(tex.rgb == vec3(0.)){
    tex.rgb = vec3(uv.x, uv.y, 1.);
  }
 gl_FragColor =  tex ;

}
