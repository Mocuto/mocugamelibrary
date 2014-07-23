precision mediump float;

varying vec2 v_texCoord;
uniform vec2 u_scrollPosition;
uniform vec4 u_color;
uniform float u_alpha;

uniform sampler2D u_image;

void main() {
	vec2 realTexCoord = vec2( mod( v_texCoord.x + u_scrollPosition.x, 1.0 ), mod(v_texCoord.y + u_scrollPosition.y, 1.0));

	vec4 color = texture2D(u_image, realTexCoord);

	gl_FragColor = vec4(color.r, color.g, color.b, color.a * u_alpha);
}