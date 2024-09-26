import { EditorView, ViewUpdate, ViewPlugin } from "@codemirror/view";
import { Context } from "src/utils/context";
import { exec } from "child_process";
import { promisify } from "util";
import { getLatexSuiteConfig } from "src/snippets/codemirror/config";

function getstate(view: EditorView) :boolean
{
	const ctx = Context.fromView(view);
	if (ctx.mode.inMath()) {
		return true;
	}
	return false;
}

export const autoIMPlugin = ViewPlugin.fromClass(class {
	isinmath : boolean;
	cpath : string = "C:\\Users\\Public\\Downloads\\im.exe";
	epath : string = "C:\\Users\\Public\\Downloads\\im.exe 1";
	constructor(view: EditorView) {
		const settings = getLatexSuiteConfig(view);
		if(settings.autoIMPath.length != 0)
		{
			this.cpath = settings.autoIMPath;
			this.epath = settings.autoIMPath + " 1";
		}
		this.isinmath = getstate(view);
		this.switchim();
	}

	update(update: ViewUpdate) {
		if (update.docChanged || update.selectionSet)
			{
				const s2 = getstate(update.view);
				if(this.isinmath != s2)
				{
					this.isinmath = s2;
					this.switchim();
				}
			}
	}

	private switchim():void{
		if(this.isinmath)
			{
				this.eim();
			}
			else
			{
				this.cim();
			}
	}

	private async cim() : Promise<string>{
		const output = await promisify(exec)(this.cpath);
		return output.stdout;
	}
	
	private async eim() : Promise<string>{
		const output = await promisify(exec)(this.epath);
		return output.stdout;
	}

});
