attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec2 u_resolution;

uniform vec2 u_translate;
uniform vec2 u_globalTranslate;
uniform vec2 u_scale;
uniform vec2 u_rotate;

varying vec2 v_texCoord;

void main() {

	//gl_Position = vec4(a_position, 0, 1);
	vec2 offset = vec2(1.0, -1.0);

	vec2 translate = u_translate + u_globalTranslate;
	
	vec2 rotatedPosition = vec2(
		a_position.x * u_rotate.x + a_position.y * u_rotate.y,
		a_position.y * u_rotate.x - a_position.x * u_rotate.y);

	vec2 position = ((( ( (rotatedPosition * u_scale) + translate) / u_resolution) * 2.0) - 1.0) * offset;
	gl_Position = vec4(position, 0, 1);

	v_texCoord = a_texCoord;
}
