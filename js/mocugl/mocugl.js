MocuGame.OBJECT_TEXTURE_SRC = "OBJECT_TEXTURE_SRC"
MocuGame.VERTICES_PER_OBJECT = 6;

MocuGame.SHADER_TYPE_FRAGMENT = "x-shader/x-fragment";
MocuGame.SHADER_TYPE_VERTEX = "x-shader/x-vertex";

MocuGame.DEFAULT_VERTEX_SHADER = new MocuGame.MocuShader("js/mocugl/mocugame-vertex.shader", MocuGame.SHADER_TYPE_VERTEX);
MocuGame.DEFAULT_FRAGMENT_SHADER = new MocuGame.MocuShader("js/mocugl/mocugame-fragment.shader", MocuGame.SHADER_TYPE_FRAGMENT);
MocuGame.DEFAULT_SPRITE_VERTEX_SHADER = new MocuGame.MocuShader("js/mocugl/mocugame-sprite-vertex.shader", MocuGame.SHADER_TYPE_VERTEX);
MocuGame.DEFAULT_SPRITE_FRAGMENT_SHADER = new MocuGame.MocuShader("js/mocugl/mocugame-sprite-fragment.shader", MocuGame.SHADER_TYPE_FRAGMENT);
MocuGame.DEFAULT_BACKGROUND_FRAGMENT_SHADER = new MocuGame.MocuShader("js/mocugl/mocugame-background-fragment.shader", MocuGame.SHADER_TYPE_FRAGMENT);