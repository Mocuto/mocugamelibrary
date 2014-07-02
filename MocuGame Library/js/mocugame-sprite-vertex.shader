attribute vec2 a_position;
attribute vec2 a_texCoord;

attribute vec2 a_translation;
attribute vec2 a_scale;
attribute vec2 a_rotation;

attribute vec2 a_cameraTranslation;
attribute float a_cameraZoom;

attribute vec4 a_fade;
attribute float a_alpha;

uniform vec2 u_resolution;

varying vec2 v_texCoord;
varying vec4 v_fade;
varying float v_alpha;

void main() {

	//gl_Position = vec4(a_position, 0, 1);
	vec2 offset = vec2(1.0, -1.0);

	vec2 translation = (a_translation + a_cameraTranslation);
	
	vec2 rotatedPosition = vec2(
		a_position.x * a_rotation.x + a_position.y * a_rotation.y,
		a_position.y * a_rotation.x - a_position.x * a_rotation.y);

	//vec2 position = ((( ( (rotatedPosition * u_scale * u_cameraZoom) + translate) / u_resolution) * 2.0) - 1.0) * offset;
	vec2 position = ((( ( (rotatedPosition * a_scale * a_cameraZoom) + translation) / u_resolution) * 2.0) - 1.0) * offset;
	gl_Position = vec4(position, 0, 1);

	v_texCoord = a_texCoord;
	v_fade = a_fade;
	v_alpha = a_alpha;
}
