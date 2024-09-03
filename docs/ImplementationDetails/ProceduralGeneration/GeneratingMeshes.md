---
title: Generating Meshes
tags:
    - TechnicalDetails
---

Unity has the [`MeshDataArray`](https://docs.unity3d.com/ScriptReference/Mesh.MeshDataArray.html) system for procedurally generating an array of meshes in a job compatible way.

To create new meshes:
```csharp
var data = Mesh.AllocateWritableMeshData(number_of_meshes);
// generate data, possibly in a job
Mesh.ApplyAndDisposeWritableMeshData(array_of_meshes);
```

To read from existing meshes:
```csharp
var data = Mesh.AcquireReadOnlyMeshData(a_mesh)
```

## Generating Data
Once you have a `MeshData` (one element from a `MeshDataArray`) you need to put some data into it.
```csharp
private static void ApplyToMeshData(Mesh.MeshData mesh, List<Vector3> vertices, List<int> indices)
{
```

A mesh may have submeshes. In this example we'll just have one submesh:
```csharp
// One sub-mesh with all the indices.
mesh.subMeshCount = 1;
```

The exact elements of each vertex need to be setup first. Here we're going to set **2** elements per vertex, a position (`float x 3`) and a texture coordinate (`float x 2`):
```csharp
var attrs = new NativeArray<VertexAttributeDescriptor>(2, Allocator.Temp)
{
	[0] = new VertexAttributeDescriptor(VertexAttribute.Position, VertexAttributeFormat.Float32, 3, 0),
	[1] = new VertexAttributeDescriptor(VertexAttribute.TexCoord0, VertexAttributeFormat.Float32, 2, 1)
};
mesh.SetVertexBufferParams(vertices.Count, attrs);
```

Now we're going to set the position data (texture coordinate data would be the same, so we'll skip it in this example):
```csharp
// Set position
var vp = mesh.GetVertexData<Vector3>(0); // Use the same stream index as above
vp.CopyFrom(vertices.ToArray());
```

Now we need to choose if the index buffer will use 16 bit or 32 bit indices. It's better to use 16 bit if possible (consumes less memory). It's easy to automatically use the smaller format when possible with this boilerplate:
```csharp
if (indices.Any(i => i > ushort.MaxValue))
{
	mesh.SetIndexBufferParams(indices.Count, IndexFormat.UInt32);
	mesh.GetIndexData<int>().CopyFrom(indices.ToArray());
}
else
{
	mesh.SetIndexBufferParams(indices.Count, IndexFormat.UInt16);
	mesh.GetIndexData<ushort>().CopyFrom(indices.Select(a => (ushort)a).ToArray());
}
```

Finally because all submeshes are sharing the same index and vertex buffer we need to tell it where each sub-mesh is in the index buffer. That's easy with just one mesh:
```csharp
mesh.SetSubMesh(index: 0, new SubMeshDescriptor(indexStart: 0, indexCount: indices.Count));
```

That's it! We can now apply this data to a mesh:
```csharp
var mesh = new Mesh();
Mesh.ApplyAndDisposeWritableMeshData(data, mesh);
mesh.bounds = CalculateSomeBounds();
return mesh;
```