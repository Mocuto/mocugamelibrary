mocu.OBJECT_TEXTURE_SRC = "OBJECT_TEXTURE_SRC"
mocu.VERTICES_PER_OBJECT = 6;

mocu.SHADER_TYPE_FRAGMENT = "x-shader/x-fragment";
mocu.SHADER_TYPE_VERTEX = "x-shader/x-vertex";

mocu.DEFAULT_VERTEX_SHADER = new mocu.Shader("js/mocugl/mocugame-vertex.shader", mocu.SHADER_TYPE_VERTEX);
mocu.DEFAULT_FRAGMENT_SHADER = new mocu.Shader("js/mocugl/mocugame-fragment.shader", mocu.SHADER_TYPE_FRAGMENT);
mocu.DEFAULT_SPRITE_VERTEX_SHADER = new mocu.Shader("js/mocugl/mocugame-sprite-vertex.shader", mocu.SHADER_TYPE_VERTEX);
mocu.DEFAULT_SPRITE_FRAGMENT_SHADER = new mocu.Shader("js/mocugl/mocugame-sprite-fragment.shader", mocu.SHADER_TYPE_FRAGMENT);
mocu.DEFAULT_BACKGROUND_FRAGMENT_SHADER = new mocu.Shader("js/mocugl/mocugame-background-fragment.shader", mocu.SHADER_TYPE_FRAGMENT);