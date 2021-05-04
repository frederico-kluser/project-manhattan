import * as drag from './drag';
import {ElementBuilder, elementIdGetter, Elements} from './elements';
import * as styleGeneral from '../styles/styleGeneral';

describe('function dragStartEventSetter', () => {
  it('execute functions', () => {
    expect.assertions(2);

    ElementBuilder(document.body, 'div');
    const element = Elements[elementIdGetter()].elementGetter();
    const eventMock = {
      target: element,
      which: 1,
    };

    const styleTagUpdaterSpied = jest.spyOn(styleGeneral, 'styleTagUpdater').mockImplementation();
    const dragStartEventSetterSpied = jest.spyOn(drag, 'dragStartEventSetter');

    drag.dragStartEventSetter(eventMock);

    expect(dragStartEventSetterSpied).toHaveBeenCalledTimes(1);
    expect(styleTagUpdaterSpied).toHaveBeenCalledTimes(1);
  });
});
