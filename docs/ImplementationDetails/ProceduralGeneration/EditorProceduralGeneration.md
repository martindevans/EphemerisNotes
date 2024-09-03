---
title: Editor Procedural Generation
tags:
    - TechnicalDetails
---

To procedurally generate content in the editor a [Scripted Importer](https://docs.unity3d.com/Manual/ScriptedImporters.html) is useful.

The parameters of the generation can be stored in JSON format in a file with a unique file extension. For example `*.procline` for procedurally generated lines:
```json
{
	"vertices": 512
}
```

In code a `Serializable` class should be created with the same structure to deserialize this into:
```csharp
[Serializable]
public class AssetData
{
	[SerializeField] public int vertices;
}
```

Finally an importer processes these files:
```csharp
[ScriptedImporter(1, "procline")]
public class ProceduralLineImporter
	: ScriptedImporter
{
	public override void OnImportAsset(AssetImportContext ctx)
	{
		var assetData = JsonUtility.FromJson<AssetData>(File.ReadAllText(ctx.assetPath));

		var mesh = GenerateMesh(assetData.vertices);

		ctx.AddObjectToAsset("mesh", mesh);
		ctx.SetMainObject(mesh);
	}
	private static Mesh GenerateMesh(int points)
	{
		todo: generate mesh!
	}
}
```

This same pattern can be used for any fixed procedural content generated in editor.

See [Generating Meshes](GeneratingMeshes.md) for more detail on how you might implement the `GenerateMesh` method.
