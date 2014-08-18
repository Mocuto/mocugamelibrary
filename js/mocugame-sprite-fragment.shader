precision lowp float;
varying vec2 v_texCoord;
varying vec4 v_fade;
uniform sampler2D u_image;

varying float v_alpha;

void main() {
	vec4 texColor = texture2D(u_image, v_texCoord);
	vec4 color = vec4( 
		(texColor.r * (1.0 - v_fade.a)) + (v_fade.r * v_fade.a),
		(texColor.g * (1.0 - v_fade.a)) + (v_fade.g * v_fade.a),
		(texColor.b * (1.0 - v_fade.a)) + (v_fade.b * v_fade.a),
		texColor.a
	);
	gl_FragColor = vec4(color.r, color.g, color.b, v_alpha * color.a);
	//gl_FragColor = texture2D(u_image, v_texCoord);
}