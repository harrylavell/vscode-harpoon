import * as vscode from "vscode";
import ActiveProjectService from "./active-project-service";
import { getStateKey, State } from "../harpoon";

export default class WorkspaceService {
  private readonly stateKey: string;

  constructor(
    private readonly activeProjectService: ActiveProjectService,
    private readonly context: vscode.ExtensionContext,
    private readonly state: State
  ) {
    this.stateKey = getStateKey(state);
  }

  public async changeEditor(id: number) {
    const editor = this.activeProjectService.getEditor(id);
    if (!editor) {
      return;
    }
    const doc = await vscode.workspace.openTextDocument(editor.fileName.trim());
    return await vscode.window.showTextDocument(doc);
  }

  public saveWorkspace() {
    this.context[this.state].update(this.stateKey, this.activeProjectService.activeEditors);
  }
}