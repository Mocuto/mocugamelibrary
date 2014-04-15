varying vec2 v_texCoord;
uniform vec4 u_color;
uniform sampler2D u_image;

uniform float u_alpha;

void main() {
	vec4 color = texture2D(u_image, v_texCoord);
	//gl_FragColor = vec4(color.r, color.g, color.b, 0.5);
	gl_FragColor = texture2D(u_image, v_texCoord);
}