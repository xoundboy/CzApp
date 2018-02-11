import * as React from 'react';

export interface Props {
    input?: string;
    onSubmit: ((input: string) => void);
}

class InputView extends React.Component<Props, object> {
    render() {
        return (
            <div className="inputView">
                <input type="text" />
                <div>Input view</div>
            </div>
        );
    }
}

export default InputView;