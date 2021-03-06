const vertex = 
`
#version 150


uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;
uniform mat4 mvp;

in vec4 a_position;
in vec3 a_normal;
in vec2 a_texcoord;

out VertexData
{
    vec4 v_position;
    vec3 v_normal;
    vec2 v_texcoord;
} outData;

void main(void)
{
    // Some drivers don't like position being written here
    // with the tessellation stages enabled also.
    // Comment next line when Tess.Eval shader is enabled.
    gl_Position = mvp * a_position;

    outData.v_position = a_position;
    outData.v_normal = a_normal;
    outData.v_texcoord = a_texcoord;
}
`

export default vertex;