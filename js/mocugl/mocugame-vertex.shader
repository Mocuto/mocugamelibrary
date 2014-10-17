attribute vec2 a_position;
uniform vec2 u_resolution;

uniform vec2 u_translate;
uniform vec2 u_globalTranslate;

uniform vec4 u_color;
varying vec2 v_texCoord;

void main() {

  //gl_Position = vec4(a_position, 0, 1);
	vec2 offset = vec2(1.0, -1.0);

	vec2 translate = u_translate + u_globalTranslate;

	vec2 position = ((( (a_position + u_translate) / u_resolution) * 2.0) - 1.0) * offset;
	gl_Position = vec4(position, 0, 1);

	v_texCoord = a_position;
}
