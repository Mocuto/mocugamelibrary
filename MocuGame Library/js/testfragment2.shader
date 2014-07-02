﻿varying vec2 v_texCoord;
uniform sampler2D u_image;
uniform float u_amount;
uniform vec2 u_spriteSize;

void main() {
	vec4 color = texture2D(u_image, v_texCoord);
	//gl_FragColor = vec4(color.r, color.g, color.b, 0.5);

	float average = (color.r + color.g + color.b) / 3.0;
	vec2 onePixel = vec2(1.0, 1.0) / u_spriteSize;

	gl_FragColor = vec4( ((1.0-u_amount) * color.r) +  (u_amount * average),
						 ((1.0-u_amount) * color.g) +  (u_amount * average),
						 ((1.0-u_amount) * color.b) +  (u_amount * average), color.a);
}