import { ElementStates } from "../../types/element-states";
import { LinkedList, TPoint } from "./initList";

export const list = new LinkedList<TPoint>();
export const initItems = ['0', '34', '8', '1'];
for (let item of initItems) {
  list.appendTail({ value: item, state: ElementStates.Default });
}
