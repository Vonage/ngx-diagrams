import { BaseAction } from './base.action';
import { PointModel } from '../models/point.model';
import { NodeModel } from '../models/node.model';
import { LinkModel } from '../models/link.model';
import { DiagramEngineCore } from '../engine.core';
import { SelectionModel } from '../interfaces/move-selection.interface';
import { BaseModel, PortModel } from '../models';

export class MoveItemsAction extends BaseAction {
  selectionModels: SelectionModel[];
  moved: boolean;

  constructor(mouseX: number, mouseY: number, diagramEngine: DiagramEngineCore) {
    super(mouseX, mouseY);
    this.moved = false;
    const isNotLockedAndLink = (item: any): item is NodeModel | PointModel | PortModel => !diagramEngine.isModelLocked(item) && !(item instanceof LinkModel);

    const selectedItems = diagramEngine.getDiagramModel().getSelectedItems().filter(isNotLockedAndLink);

    // dont allow items which are locked to move and links which generate their position based on points.

    this.selectionModels = selectedItems.map(item => {
      const { x: initialX, y: initialY } = item.getCoords();
      return {
        model: item as BaseModel,
        initialX,
        initialY
      };
    });
  }
}