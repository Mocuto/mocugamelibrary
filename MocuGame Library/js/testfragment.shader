varying vec2 v_texCoord;
uniform sampler2D u_image;

void main() {
	vec4 color = texture2D(u_image, v_texCoord);
	//gl_FragColor = vec4(color.r, color.g, color.b, 0.5);
	if (color.b == 0.0)
	{
		gl_FragColor = vec4(v_texCoord, color.b, color.a);
	}
	else {
		gl_FragColor = vec4(color.r, color.g, color.b, color.a);
	}
	

}