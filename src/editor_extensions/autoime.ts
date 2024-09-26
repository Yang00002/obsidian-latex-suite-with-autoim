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

export const autoIMEPlugin = ViewPlugin.fromClass(class {
	isinmath : boolean;
	cpath : string = "C:\\Users\\Public\\Downloads\\ime.exe";
	epath : string = "C:\\Users\\Public\\Downloads\\ime.exe 1";
	constructor(view: EditorView) {
		const settings = getLatexSuiteConfig(view);
		if(settings.autoIMEPath.length != 0)
		{
			this.cpath = settings.autoIMEPath;
			this.epath = settings.autoIMEPath + " 1";
		}
		this.isinmath = getstate(view);
		this.switchime();
	}

	update(update: ViewUpdate) {
		if (update.docChanged || update.selectionSet)
			{
				const s2 = getstate(update.view);
				if(this.isinmath != s2)
				{
					this.isinmath = s2;
					this.switchime();
				}
			}
	}

	private switchime():void{
		if(this.isinmath)
			{
				this.eime();
			}
			else
			{
				this.cime();
			}
	}

	private async cime() : Promise<string>{
		const output = await promisify(exec)(this.cpath);
		return output.stdout;
	}
	
	private async eime() : Promise<string>{
		const output = await promisify(exec)(this.epath);
		return output.stdout;
	}

});
