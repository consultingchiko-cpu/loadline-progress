import Loadline from 'loadline-progress';

Loadline.configure({ minimum: 0.15, showSpinner: false });
Loadline.start().inc(0.1).done();
const rendered: boolean = Loadline.isRendered();
void rendered;
