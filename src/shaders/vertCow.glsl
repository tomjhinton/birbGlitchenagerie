
uniform vec2 uMouse;
uniform float uTime;
varying float vTime;
varying vec2 vUv;
uniform vec2 uFrequency;
uniform vec3 uPosition;
uniform vec3 uRotation;
// uniform float wrapAmountUniform;

uniform float uValueA;

#define M_PI 3.14159265


vec3 anglesToSphereCoord(vec2 a, float r)
{
    return vec3(
    	r * sin(a.y) * sin(a.x),
      r * cos(a.y),
      r * sin(a.y) * cos(a.x)
    );
}

void main()	{
	vec2 angles = M_PI * vec2(2. * uv.x * (uValueA * 2.), uv.y - 1.);
  vec3 sphPos = anglesToSphereCoord(angles, 2.6 * (uValueA * 2.));
  vec3 wrapPos = mix(position, sphPos, ((sin(uTime)+1.)/2.));

  gl_Position = projectionMatrix * modelViewMatrix * vec4( wrapPos, 1.0 );

  vUv = uv;
  vTime = uTime;
}
