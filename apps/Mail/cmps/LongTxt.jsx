const MAX_CHARS_COUNT = 100;

export class LongTxt extends React.Component {
    state = { 
        description: '', 
        isLongTxtShown: false
    } 
    toggleIsLongTxtShown = () => {
        const { isLongTxtShown } = this.state

        this.setState({ isLongTxtShown: !isLongTxtShown }, () => {
        });
    }

    render() {
        const { description } = this.props
        const { isLongTxtShown } = this.state

        let text = description;
        return (
            <p>
                {isLongTxtShown ? text : text.substring(0, 96) + '...'}
                <span onClick={this.toggleIsLongTxtShown}>{isLongTxtShown ? ' [Read Less]' : ' [Read More]'}</span>
            </p>
        )
       
    }
}